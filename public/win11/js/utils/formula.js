/**
 * Excel-like formula engine
 * Supports: numbers, strings, cell refs (A1), ranges (A1:B3),
 * SUM, AVERAGE, IF, VLOOKUP, basic arithmetic + comparisons
 */

const COL_RE = /^([A-Z]+)(\d+)$/i;

export function colToIndex(col) {
  let n = 0;
  const s = col.toUpperCase();
  for (let i = 0; i < s.length; i++) n = n * 26 + (s.charCodeAt(i) - 64);
  return n - 1;
}

export function indexToCol(index) {
  let n = index + 1;
  let s = '';
  while (n > 0) {
    const r = (n - 1) % 26;
    s = String.fromCharCode(65 + r) + s;
    n = Math.floor((n - 1) / 26);
  }
  return s;
}

export function parseRef(ref) {
  const m = String(ref).trim().match(COL_RE);
  if (!m) return null;
  return { col: colToIndex(m[1]), row: parseInt(m[2], 10) - 1, key: m[1].toUpperCase() + m[2] };
}

/**
 * @param {Record<string, string>} cells - raw cell map A1 -> value/formula
 * @param {string} formula - with or without leading =
 * @param {Set<string>} [stack] - cycle detection
 */
export function evaluate(cells, formula, stack = new Set()) {
  if (formula == null || formula === '') return '';
  const raw = String(formula);
  if (!raw.startsWith('=')) {
    const num = Number(raw);
    if (raw.trim() !== '' && !Number.isNaN(num) && Number.isFinite(num)) return num;
    return raw;
  }

  const expr = raw.slice(1).trim();
  try {
    return evalExpr(expr, cells, stack);
  } catch (e) {
    if (e.message === '#CYCLE!') return '#CYCLE!';
    if (e.message.startsWith('#')) return e.message;
    return '#ERROR!';
  }
}

function getCellValue(cells, key, stack) {
  const k = key.toUpperCase();
  if (stack.has(k)) throw new Error('#CYCLE!');
  const next = new Set(stack);
  next.add(k);
  const raw = cells[k];
  if (raw == null || raw === '') return 0;
  if (String(raw).startsWith('=')) return evaluate(cells, raw, next);
  const num = Number(raw);
  if (raw.trim() !== '' && !Number.isNaN(num)) return num;
  return raw;
}

function expandRange(a, b) {
  const ra = parseRef(a);
  const rb = parseRef(b);
  if (!ra || !rb) throw new Error('#REF!');
  const keys = [];
  const c0 = Math.min(ra.col, rb.col);
  const c1 = Math.max(ra.col, rb.col);
  const r0 = Math.min(ra.row, rb.row);
  const r1 = Math.max(ra.row, rb.row);
  for (let r = r0; r <= r1; r++) {
    for (let c = c0; c <= c1; c++) {
      keys.push(indexToCol(c) + (r + 1));
    }
  }
  return keys;
}

function toNumber(v) {
  if (typeof v === 'number') return v;
  if (v === true) return 1;
  if (v === false) return 0;
  if (v == null || v === '') return 0;
  const n = Number(v);
  return Number.isNaN(n) ? 0 : n;
}

function callFn(name, args, cells, stack) {
  const n = name.toUpperCase();
  if (n === 'SUM') {
    return args.flat().reduce((a, b) => a + toNumber(b), 0);
  }
  if (n === 'AVERAGE') {
    const flat = args.flat().map(toNumber);
    if (!flat.length) return 0;
    return flat.reduce((a, b) => a + b, 0) / flat.length;
  }
  if (n === 'IF') {
    const [cond, t, f] = args;
    return cond ? t : (f !== undefined ? f : false);
  }
  if (n === 'VLOOKUP') {
    // VLOOKUP(lookup, range, colIndex, [rangeLookup])
    const lookup = args[0];
    const rangeArg = args[1];
    const colIndex = toNumber(args[2]);
    const rangeKeys = rangeArg?.__rangeKeys || (Array.isArray(rangeArg) ? null : null);
    if (!rangeKeys?.length) throw new Error('#N/A');
    const refs = rangeKeys.map(parseRef).filter(Boolean);
    if (!refs.length) throw new Error('#N/A');
    const minCol = Math.min(...refs.map((r) => r.col));
    const maxCol = Math.max(...refs.map((r) => r.col));
    const minRow = Math.min(...refs.map((r) => r.row));
    const maxRow = Math.max(...refs.map((r) => r.row));
    const width = maxCol - minCol + 1;
    if (colIndex < 1 || colIndex > width) throw new Error('#REF!');

    for (let r = minRow; r <= maxRow; r++) {
      const key = indexToCol(minCol) + (r + 1);
      const val = getCellValue(cells, key, stack);
      const matched =
        String(val) === String(lookup) ||
        (val !== '' && lookup !== '' && !Number.isNaN(Number(val)) && !Number.isNaN(Number(lookup)) && toNumber(val) === toNumber(lookup));
      if (matched) {
        const resultKey = indexToCol(minCol + colIndex - 1) + (r + 1);
        return getCellValue(cells, resultKey, stack);
      }
    }
    throw new Error('#N/A');
  }
  if (n === 'ABS') return Math.abs(toNumber(args[0]));
  if (n === 'ROUND') {
    const p = toNumber(args[1] ?? 0);
    const m = 10 ** p;
    return Math.round(toNumber(args[0]) * m) / m;
  }
  if (n === 'MIN') return Math.min(...args.flat().map(toNumber));
  if (n === 'MAX') return Math.max(...args.flat().map(toNumber));
  if (n === 'COUNT') return args.flat().filter((v) => v !== '' && v != null && !Number.isNaN(Number(v))).length;
  throw new Error('#NAME?');
}

/** Tokenizer + recursive descent */
function evalExpr(input, cells, stack) {
  const tokens = tokenize(input);
  let i = 0;

  function peek() {
    return tokens[i];
  }
  function next() {
    return tokens[i++];
  }
  function expect(type) {
    const t = next();
    if (!t || t.type !== type) throw new Error('#ERROR!');
    return t;
  }

  function parseComparison() {
    let left = parseAdd();
    while (peek() && ['=', '<>', '<=', '>=', '<', '>'].includes(peek().type)) {
      const op = next().type;
      const right = parseAdd();
      if (op === '=') left = left == right; // eslint-disable-line eqeqeq
      else if (op === '<>') left = left != right; // eslint-disable-line eqeqeq
      else if (op === '<') left = toNumber(left) < toNumber(right);
      else if (op === '>') left = toNumber(left) > toNumber(right);
      else if (op === '<=') left = toNumber(left) <= toNumber(right);
      else if (op === '>=') left = toNumber(left) >= toNumber(right);
    }
    return left;
  }

  function parseAdd() {
    let left = parseMul();
    while (peek() && (peek().type === '+' || peek().type === '-')) {
      const op = next().type;
      const right = parseMul();
      left = op === '+' ? toNumber(left) + toNumber(right) : toNumber(left) - toNumber(right);
    }
    return left;
  }

  function parseMul() {
    let left = parseUnary();
    while (peek() && (peek().type === '*' || peek().type === '/')) {
      const op = next().type;
      const right = parseUnary();
      left = op === '*' ? toNumber(left) * toNumber(right) : toNumber(left) / (toNumber(right) || 1);
    }
    return left;
  }

  function parseUnary() {
    if (peek()?.type === '-') {
      next();
      return -toNumber(parseUnary());
    }
    if (peek()?.type === '+') {
      next();
      return parseUnary();
    }
    return parsePrimary();
  }

  function parsePrimary() {
    const t = peek();
    if (!t) throw new Error('#ERROR!');

    if (t.type === 'number') {
      next();
      return t.value;
    }
    if (t.type === 'string') {
      next();
      return t.value;
    }
    if (t.type === 'bool') {
      next();
      return t.value;
    }
    if (t.type === 'ident') {
      next();
      // function call or bare name
      if (peek()?.type === '(') {
        next();
        const args = [];
        if (peek()?.type !== ')') {
          args.push(parseArg());
          while (peek()?.type === ',') {
            next();
            args.push(parseArg());
          }
        }
        expect(')');
        return callFn(t.value, args, cells, stack);
      }
      // cell ref
      if (COL_RE.test(t.value)) {
        return getCellValue(cells, t.value, stack);
      }
      throw new Error('#NAME?');
    }
    if (t.type === '(') {
      next();
      const v = parseComparison();
      expect(')');
      return v;
    }
    throw new Error('#ERROR!');
  }

  function parseArg() {
    // range A1:B2
    if (peek()?.type === 'ident' && tokens[i + 1]?.type === ':') {
      const a = next().value;
      next(); // :
      if (peek()?.type !== 'ident') throw new Error('#REF!');
      const b = next().value;
      const keys = expandRange(a, b);
      const values = keys.map((k) => getCellValue(cells, k, stack));
      values.__rangeKeys = keys;
      return values;
    }
    return parseComparison();
  }

  const result = parseComparison();
  if (i < tokens.length) {
    // trailing range sugar: already handled in parseArg
  }
  return result;
}

function tokenize(input) {
  const tokens = [];
  let i = 0;
  const s = input;

  while (i < s.length) {
    const c = s[i];
    if (/\s/.test(c)) {
      i++;
      continue;
    }
    if (c === '"' || c === "'") {
      const q = c;
      i++;
      let str = '';
      while (i < s.length && s[i] !== q) {
        str += s[i++];
      }
      i++; // close
      tokens.push({ type: 'string', value: str });
      continue;
    }
    if (/[0-9.]/.test(c)) {
      let n = '';
      while (i < s.length && /[0-9.]/.test(s[i])) n += s[i++];
      tokens.push({ type: 'number', value: parseFloat(n) });
      continue;
    }
    if (/[A-Za-z_]/.test(c)) {
      let id = '';
      while (i < s.length && /[A-Za-z0-9_]/.test(s[i])) id += s[i++];
      if (id.toUpperCase() === 'TRUE') tokens.push({ type: 'bool', value: true });
      else if (id.toUpperCase() === 'FALSE') tokens.push({ type: 'bool', value: false });
      else tokens.push({ type: 'ident', value: id });
      continue;
    }
    // multi-char ops
    if (s.startsWith('<>', i)) {
      tokens.push({ type: '<>' });
      i += 2;
      continue;
    }
    if (s.startsWith('<=', i)) {
      tokens.push({ type: '<=' });
      i += 2;
      continue;
    }
    if (s.startsWith('>=', i)) {
      tokens.push({ type: '>=' });
      i += 2;
      continue;
    }
    if ('+-*/(),:=<>'.includes(c)) {
      tokens.push({ type: c });
      i++;
      continue;
    }
    throw new Error('#ERROR!');
  }
  return tokens;
}

/** Recalculate all formula cells → display map */
export function recalculateAll(cells) {
  const display = {};
  for (const [key, raw] of Object.entries(cells)) {
    if (raw == null || raw === '') {
      display[key] = '';
      continue;
    }
    if (String(raw).startsWith('=')) {
      const v = evaluate(cells, raw);
      display[key] = formatValue(v);
    } else {
      display[key] = raw;
    }
  }
  return display;
}

function formatValue(v) {
  if (typeof v === 'number') {
    if (!Number.isFinite(v)) return '#DIV/0!';
    if (Number.isInteger(v)) return String(v);
    return String(Math.round(v * 1e10) / 1e10);
  }
  if (typeof v === 'boolean') return v ? 'TRUE' : 'FALSE';
  return String(v);
}
