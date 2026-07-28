import { el } from '../utils/dom.js';

export function mountCalculator(host) {
  let display = '0';
  let stored = null;
  let op = null;
  let fresh = true;

  const app = el('div', { className: 'calc-app' });
  const screen = el('div', { className: 'calc-display', text: display });
  const grid = el('div', { className: 'calc-grid' });

  const keys = [
    ['C', '±', '%', '÷'],
    ['7', '8', '9', '×'],
    ['4', '5', '6', '−'],
    ['1', '2', '3', '+'],
    ['0', '.', '='],
  ];

  function update() {
    screen.textContent = display;
  }

  function inputNum(n) {
    if (fresh) {
      display = n === '.' ? '0.' : n;
      fresh = false;
    } else {
      if (n === '.' && display.includes('.')) return;
      if (display === '0' && n !== '.') display = n;
      else display += n;
    }
    update();
  }

  function setOp(next) {
    const cur = parseFloat(display);
    if (stored != null && op && !fresh) {
      stored = compute(stored, cur, op);
      display = String(stored);
    } else {
      stored = cur;
    }
    op = next;
    fresh = true;
    update();
  }

  function compute(a, b, operator) {
    switch (operator) {
      case '+': return a + b;
      case '−': return a - b;
      case '×': return a * b;
      case '÷': return b === 0 ? NaN : a / b;
      default: return b;
    }
  }

  function equals() {
    if (op == null || stored == null) return;
    const cur = parseFloat(display);
    const result = compute(stored, cur, op);
    display = Number.isFinite(result) ? String(Math.round(result * 1e10) / 1e10) : 'Error';
    stored = null;
    op = null;
    fresh = true;
    update();
  }

  for (const row of keys) {
    for (const k of row) {
      const btn = el('button', {
        type: 'button',
        text: k,
        className: k === '=' ? 'eq' : '÷×−+'.includes(k) ? 'op' : '',
        style: k === '0' ? { gridColumn: 'span 2' } : {},
      });
      btn.onclick = () => {
        if (k >= '0' && k <= '9' || k === '.') inputNum(k);
        else if (k === 'C') {
          display = '0';
          stored = null;
          op = null;
          fresh = true;
          update();
        } else if (k === '±') {
          if (display !== '0') display = display.startsWith('-') ? display.slice(1) : '-' + display;
          update();
        } else if (k === '%') {
          display = String(parseFloat(display) / 100);
          update();
        } else if (k === '=') equals();
        else setOp(k);
      };
      grid.append(btn);
    }
  }

  app.append(screen, grid);
  host.append(app);
}
