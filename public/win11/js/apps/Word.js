import { el } from '../utils/dom.js';
import { FileSystem } from '../core/FileSystem.js';
import { bus } from '../core/EventBus.js';

export function mountWord(host, meta, opts = {}) {
  let fileId = opts.fileId || null;
  let fileName = 'Dokument.docx';
  let dirty = false;

  if (fileId) {
    const f = FileSystem.find(fileId);
    if (f) fileName = f.name;
  }

  const app = el('div', { className: 'word-app' });
  const ribbon = el('div', { className: 'word-ribbon' });
  const pageWrap = el('div', { className: 'word-page-wrap' });
  const page = el('div', {
    className: 'word-page selectable',
    contenteditable: 'true',
    spellcheck: true,
    'data-placeholder': 'Beginne zu schreiben…',
    role: 'textbox',
    'aria-label': 'Dokument',
  });
  const statusBar = el('div', {
    className: 'word-status',
    style: {
      padding: '4px 12px',
      borderTop: '1px solid var(--border)',
      background: 'var(--bg-solid)',
      fontSize: '12px',
      color: 'var(--text-secondary)',
      display: 'flex',
      gap: '16px',
    },
  });

  if (fileId) {
    const f = FileSystem.find(fileId);
    if (f?.content) {
      if (f.content.includes('<') && f.content.includes('>')) {
        page.innerHTML = f.content;
      } else {
        page.innerHTML = escapeHtml(f.content).replace(/\n/g, '<br>');
      }
    }
  }

  function markDirty() {
    dirty = true;
    updateChrome();
  }

  function updateChrome() {
    const words = (page.innerText || '').trim().split(/\s+/).filter(Boolean).length;
    const chars = (page.innerText || '').length;
    statusBar.innerHTML = '';
    statusBar.append(
      el('span', { text: dirty ? '● Nicht gespeichert' : 'Gespeichert' }),
      el('span', { text: `${words} Wörter` }),
      el('span', { text: `${chars} Zeichen` }),
      el('span', { text: fileName }),
    );
    meta?.setTitle?.(`${dirty ? '• ' : ''}${fileName} — Word`);
  }

  function cmd(command, value = null) {
    page.focus();
    try {
      document.execCommand(command, false, value);
      markDirty();
    } catch (e) {
      console.warn(e);
    }
  }

  const tools = [
    { label: 'B', title: 'Fett (Ctrl+B)', fn: () => cmd('bold'), style: { fontWeight: '700' } },
    { label: 'I', title: 'Kursiv (Ctrl+I)', fn: () => cmd('italic'), style: { fontStyle: 'italic' } },
    { label: 'U', title: 'Unterstrichen (Ctrl+U)', fn: () => cmd('underline'), style: { textDecoration: 'underline' } },
    { label: 'S', title: 'Durchgestrichen', fn: () => cmd('strikeThrough'), style: { textDecoration: 'line-through' } },
    { sep: true },
    { label: 'H1', title: 'Überschrift', fn: () => cmd('formatBlock', 'h1') },
    { label: 'H2', title: 'Unterüberschrift', fn: () => cmd('formatBlock', 'h2') },
    { label: '¶', title: 'Absatz', fn: () => cmd('formatBlock', 'p') },
    { sep: true },
    { label: '•', title: 'Aufzählung', fn: () => cmd('insertUnorderedList') },
    { label: '1.', title: 'Nummerierung', fn: () => cmd('insertOrderedList') },
    { sep: true },
    { label: '⟸', title: 'Linksbündig', fn: () => cmd('justifyLeft') },
    { label: '≡', title: 'Zentriert', fn: () => cmd('justifyCenter') },
    { label: '⟹', title: 'Rechtsbündig', fn: () => cmd('justifyRight') },
    { sep: true },
    { label: 'A+', title: 'Größer', fn: () => cmd('increaseFontSize') },
    { label: 'A−', title: 'Kleiner', fn: () => cmd('decreaseFontSize') },
  ];

  for (const t of tools) {
    if (t.sep) {
      ribbon.append(el('div', { className: 'sep' }));
      continue;
    }
    ribbon.append(el('button', {
      className: 'ribbon-btn',
      type: 'button',
      title: t.title,
      text: t.label,
      style: t.style || {},
      onClick: t.fn,
    }));
  }

  ribbon.append(el('div', { className: 'sep' }));

  const fontSelect = el('select', {
    title: 'Schriftart',
    style: { padding: '4px 6px', borderRadius: '4px', border: '1px solid var(--border)', background: 'var(--bg-card)' },
    onChange: (e) => cmd('fontName', e.target.value),
  });
  for (const f of ['Segoe UI', 'Arial', 'Georgia', 'Times New Roman', 'Courier New', 'Verdana']) {
    fontSelect.append(el('option', { value: f, text: f }));
  }
  ribbon.append(fontSelect);

  ribbon.append(el('input', {
    type: 'color',
    value: '#1a1a1a',
    title: 'Textfarbe',
    style: { width: '32px', height: '28px', border: 'none', background: 'transparent', cursor: 'pointer' },
    onInput: (e) => cmd('foreColor', e.target.value),
  }));

  ribbon.append(el('input', {
    type: 'color',
    value: '#ffff00',
    title: 'Hervorhebung',
    style: { width: '32px', height: '28px', border: 'none', background: 'transparent', cursor: 'pointer' },
    onInput: (e) => cmd('hiliteColor', e.target.value),
  }));

  ribbon.append(el('div', { className: 'sep' }));

  ribbon.append(el('button', {
    className: 'btn',
    type: 'button',
    text: 'Rückgängig',
    onClick: () => cmd('undo'),
  }));
  ribbon.append(el('button', {
    className: 'btn',
    type: 'button',
    text: 'Wiederholen',
    onClick: () => cmd('redo'),
  }));

  const saveBtn = el('button', {
    className: 'btn btn-primary',
    type: 'button',
    text: 'Speichern',
    style: { marginLeft: '8px' },
    onClick: save,
  });
  ribbon.append(saveBtn);

  pageWrap.append(page);
  app.append(ribbon, pageWrap, statusBar);
  host.append(app);

  page.addEventListener('input', markDirty);
  updateChrome();

  function save() {
    const html = page.innerHTML;
    try {
      if (fileId) {
        FileSystem.writeFile(fileId, html);
      } else {
        const docs = FileSystem.special('documents');
        const name = prompt('Dateiname:', fileName) || fileName;
        const finalName = /\.(docx|txt|html)$/i.test(name) ? name : name + '.docx';
        const node = FileSystem.createFile(docs.id, finalName, html, 'application/word');
        fileId = node.id;
        fileName = node.name;
      }
      dirty = false;
      updateChrome();
      bus.emit('ui:toast', { title: 'Gespeichert', body: fileName });
    } catch (e) {
      localStorage.setItem('win11-word-draft', page.innerText);
      bus.emit('ui:toast', { title: 'Entwurf lokal gesichert', body: e.message });
    }
  }

  host.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 's') {
      e.preventDefault();
      save();
    }
  });
}

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}
