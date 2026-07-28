import { el, clear } from '../utils/dom.js';
import { FileSystem } from '../core/FileSystem.js';
import { bus } from '../core/EventBus.js';
import { indexToCol, recalculateAll, evaluate } from '../utils/formula.js';

const ROWS = 30;
const COLS = 12;

export function mountExcel(host, meta, opts = {}) {
  let cells = {};
  let fileId = opts.fileId || null;
  let fileName = 'Mappe.xlsx';
  let selected = 'A1';
  let display = {};

  if (fileId) {
    const f = FileSystem.find(fileId);
    if (f) {
      fileName = f.name;
      try {
        const data = JSON.parse(f.content || '{}');
        cells = data.cells || {};
      } catch {
        cells = {};
      }
    }
  } else {
    // demo sheet
    cells = {
      A1: 'Artikel', B1: 'Menge', C1: 'Preis', D1: 'Summe',
      A2: 'Äpfel', B2: '4', C2: '1.2', D2: '=B2*C2',
      A3: 'Bananen', B3: '6', C3: '0.8', D3: '=B3*C3',
      A4: 'Orangen', B4: '3', C4: '1.5', D4: '=B4*C4',
      A5: 'Gesamt', D5: '=SUM(D2:D4)',
      A6: 'Durchschnitt', D6: '=AVERAGE(D2:D4)',
      A8: 'Lookup-Demo',
      A9: 'Code', B9: 'Name',
      A10: 'A1', B10: 'Alpha',
      A11: 'B2', B11: 'Beta',
      A12: 'C3', B12: 'Gamma',
      A14: 'Suche', B14: 'B2', C14: '=VLOOKUP(B14,A10:B12,2)',
      A15: 'IF-Demo', B15: '=IF(D5>10,"Hoch","Niedrig")',
    };
  }

  const app = el('div', { className: 'excel-app' });
  const toolbar = el('div', { className: 'excel-toolbar' });
  const fx = el('div', { className: 'excel-fx' });
  const fxLabel = el('div', { className: 'excel-fx-label', text: 'fx' });
  const cellLabel = el('div', {
    style: { minWidth: '40px', fontFamily: 'var(--font-mono)', fontWeight: 600, fontSize: '12px' },
    text: selected,
  });
  const fxInput = el('input', {
    type: 'text',
    spellcheck: false,
    value: cells[selected] || '',
  });
  fx.append(cellLabel, fxLabel, fxInput);

  let dirty = false;

  const insertBtns = el('div', { style: { display: 'flex', gap: '4px', flexWrap: 'wrap' } },
    el('button', {
      className: 'btn', type: 'button', text: 'Σ SUM', title: 'SUM einfügen',
      onClick: () => insertFormula('=SUM()'),
    }),
    el('button', {
      className: 'btn', type: 'button', text: 'AVG', title: 'AVERAGE einfügen',
      onClick: () => insertFormula('=AVERAGE()'),
    }),
    el('button', {
      className: 'btn', type: 'button', text: 'IF', title: 'IF einfügen',
      onClick: () => insertFormula('=IF(,,)'),
    }),
    el('button', {
      className: 'btn', type: 'button', text: 'VLOOKUP', title: 'VLOOKUP einfügen',
      onClick: () => insertFormula('=VLOOKUP(,,2)'),
    }),
    el('button', {
      className: 'btn', type: 'button', text: 'Löschen', title: 'Zelle leeren',
      onClick: () => {
        delete cells[selected];
        dirty = true;
        paint();
        selectCell(selected);
      },
    }),
  );

  const saveBtn = el('button', {
    className: 'btn btn-primary',
    type: 'button',
    text: 'Speichern',
    onClick: save,
  });

  const helpBtn = el('button', {
    className: 'btn',
    type: 'button',
    text: 'Hilfe',
    onClick: () => bus.emit('ui:toast', {
      title: 'Formeln',
      body: 'SUM, AVERAGE, IF, VLOOKUP, MIN, MAX, COUNT, ABS, ROUND · Pfeiltasten · F2 · Enter',
    }),
  });

  toolbar.append(fx, insertBtns, helpBtn, saveBtn);

  function insertFormula(tpl) {
    cells[selected] = tpl;
    dirty = true;
    paint();
    selectCell(selected);
    const td = sheetWrap.querySelector(`td[data-cell="${selected}"]`);
    if (td) startEdit(td, selected);
  }

  function markDirty() {
    dirty = true;
    meta?.setTitle?.(`• ${fileName} — Excel`);
  }

  const sheetWrap = el('div', { className: 'excel-sheet-wrap' });
  const status = el('div', { className: 'excel-status' });

  app.append(toolbar, sheetWrap, status);
  host.append(app);

  if (meta?.el) {
    const titleEl = meta.el.querySelector('.window-title');
    if (titleEl) titleEl.textContent = `${fileName} — Excel`;
  }

  function recompute() {
    display = recalculateAll(cells);
  }

  function paint() {
    recompute();
    clear(sheetWrap);
    const table = el('table', { className: 'excel-table' });
    const thead = el('thead');
    const hr = el('tr', {}, el('th', { className: 'corner', text: '' }));
    for (let c = 0; c < COLS; c++) {
      hr.append(el('th', { text: indexToCol(c) }));
    }
    thead.append(hr);
    table.append(thead);

    const tbody = el('tbody');
    for (let r = 0; r < ROWS; r++) {
      const tr = el('tr', {}, el('th', { className: 'row-hdr', text: String(r + 1) }));
      for (let c = 0; c < COLS; c++) {
        const key = indexToCol(c) + (r + 1);
        const td = el('td', {
          className: selected === key ? 'selected' : '',
          dataset: { cell: key },
        });
        const shown = display[key] ?? '';
        td.textContent = shown;
        td.title = cells[key] || '';

        td.addEventListener('mousedown', (e) => {
          e.preventDefault();
          selectCell(key);
        });

        td.addEventListener('dblclick', () => {
          selectCell(key);
          startEdit(td, key);
        });

        tr.append(td);
      }
      tbody.append(tr);
    }
    table.append(tbody);
    sheetWrap.append(table);
    updateStatus();
  }

  function selectCell(key) {
    selected = key;
    cellLabel.textContent = key;
    fxInput.value = cells[key] || '';
    sheetWrap.querySelectorAll('td.selected').forEach((n) => n.classList.remove('selected'));
    sheetWrap.querySelector(`td[data-cell="${key}"]`)?.classList.add('selected');
  }

  function commitFx() {
    const v = fxInput.value;
    if (v === '') delete cells[selected];
    else cells[selected] = v;
    markDirty();
    paint();
    selectCell(selected);
  }

  fxInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      commitFx();
    }
  });
  fxInput.addEventListener('blur', () => {
    // only commit if still matching
  });
  fxInput.addEventListener('change', commitFx);

  function startEdit(td, key) {
    const input = el('input', {
      type: 'text',
      value: cells[key] || '',
    });
    clear(td);
    td.append(input);
    input.focus();
    input.select();

    const finish = (commit) => {
      if (commit) {
        const v = input.value;
        if (v === '') delete cells[key];
        else cells[key] = v;
        markDirty();
      }
      paint();
      selectCell(key);
    };

    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        finish(true);
        // move down
        const m = key.match(/^([A-Z]+)(\d+)$/i);
        if (m) selectCell(m[1].toUpperCase() + (parseInt(m[2], 10) + 1));
      } else if (e.key === 'Escape') {
        finish(false);
      } else if (e.key === 'Tab') {
        e.preventDefault();
        finish(true);
      }
    });
    input.addEventListener('blur', () => finish(true));
  }

  function updateStatus() {
    clear(status);
    const raw = cells[selected] || '';
    let preview = '';
    if (raw.startsWith('=')) {
      preview = String(evaluate(cells, raw));
    }
    status.append(
      el('span', { text: `Zelle ${selected}` }),
      el('span', { text: raw ? `Inhalt: ${raw}` : 'Leer' }),
      preview !== '' ? el('span', { text: `= ${preview}` }) : null
    );
  }

  function save() {
    const payload = JSON.stringify({ cells });
    try {
      if (fileId) {
        FileSystem.writeFile(fileId, payload);
      } else {
        const docs = FileSystem.special('documents');
        const name = prompt('Dateiname:', fileName) || fileName;
        const node = FileSystem.createFile(
          docs.id,
          name.endsWith('.xlsx') ? name : name + '.xlsx',
          payload,
          'application/excel'
        );
        fileId = node.id;
        fileName = node.name;
      }
      dirty = false;
      meta?.setTitle?.(`${fileName} — Excel`);
      bus.emit('ui:toast', { title: 'Gespeichert', body: fileName });
    } catch (e) {
      bus.emit('ui:toast', { title: 'Fehler', body: e.message });
    }
  }

  host.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 's') {
      e.preventDefault();
      save();
    }
    // arrow navigation when not editing
    if (document.activeElement?.tagName === 'INPUT') return;
    const m = selected.match(/^([A-Z]+)(\d+)$/i);
    if (!m) return;
    let col = m[1].toUpperCase();
    let row = parseInt(m[2], 10);
    const colIdx = col.split('').reduce((n, ch) => n * 26 + (ch.charCodeAt(0) - 64), 0) - 1;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      selectCell(col + Math.min(ROWS, row + 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      selectCell(col + Math.max(1, row - 1));
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      if (colIdx > 0) selectCell(indexToCol(colIdx - 1) + row);
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      if (colIdx < COLS - 1) selectCell(indexToCol(colIdx + 1) + row);
    } else if (e.key === 'F2' || e.key === 'Enter') {
      e.preventDefault();
      const td = sheetWrap.querySelector(`td[data-cell="${selected}"]`);
      if (td) startEdit(td, selected);
    } else if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
      const td = sheetWrap.querySelector(`td[data-cell="${selected}"]`);
      if (td) {
        cells[selected] = e.key;
        startEdit(td, selected);
        // put caret at end — startEdit uses full value
      }
    }
  });

  paint();
  selectCell('A1');
}
