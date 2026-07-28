import { el, clear } from '../utils/dom.js';
import { FileSystem } from '../core/FileSystem.js';
import { bus } from '../core/EventBus.js';
import { AppRegistry } from '../core/AppRegistry.js';
import { showContextMenu } from '../shell/ContextMenu.js';

export function mountExplorer(host, meta, opts = {}) {
  const root = FileSystem.special('root') || FileSystem.getTree();
  let currentId = opts.folderId || root.id;
  let selectedId = null;
  let viewMode = 'icons'; // icons | list
  let filter = '';
  const history = [currentId];
  let histIndex = 0;

  const wrap = el('div', { className: 'explorer' });
  const sidebar = el('div', { className: 'explorer-sidebar' });
  const body = el('div', { className: 'explorer-body' });
  const toolbar = el('div', { className: 'explorer-toolbar' });
  const breadcrumb = el('div', { className: 'explorer-breadcrumb' });
  const files = el('div', { className: 'explorer-files' });
  const status = el('div', { className: 'explorer-status' });

  body.append(toolbar, breadcrumb, files, status);
  wrap.append(sidebar, body);
  host.append(wrap);

  function setTitle() {
    const node = FileSystem.find(currentId);
    const name = node?.name === 'This PC' ? 'Dieser PC' : (node?.name || 'Explorer');
    meta?.setTitle?.(`${name} — Datei-Explorer`);
  }

  function navigate(id, { push = true } = {}) {
    if (!FileSystem.find(id)) return;
    currentId = id;
    selectedId = null;
    filter = '';
    if (push) {
      history.splice(histIndex + 1);
      history.push(id);
      histIndex = history.length - 1;
    }
    paint();
    setTitle();
  }

  function goBack() {
    if (histIndex <= 0) return;
    histIndex--;
    currentId = history[histIndex];
    selectedId = null;
    paint();
    setTitle();
  }

  function goForward() {
    if (histIndex >= history.length - 1) return;
    histIndex++;
    currentId = history[histIndex];
    selectedId = null;
    paint();
    setTitle();
  }

  function goUp() {
    const parent = FileSystem.parent(currentId);
    if (parent) navigate(parent.id);
  }

  function paint() {
    paintSidebar();
    paintToolbar();
    paintBreadcrumb();
    paintFiles();
  }

  function paintSidebar() {
    clear(sidebar);
    const items = [
      { id: root.id, label: 'Dieser PC', icon: '💻' },
      { special: 'desktop', label: 'Desktop', icon: '🖥️' },
      { special: 'documents', label: 'Dokumente', icon: '📑' },
      { special: 'downloads', label: 'Downloads', icon: '⬇️' },
      { special: 'pictures', label: 'Bilder', icon: '🖼️' },
      { special: 'music', label: 'Musik', icon: '🎵' },
    ];
    for (const it of items) {
      const node = it.special ? FileSystem.special(it.special) : FileSystem.find(it.id);
      if (!node) continue;
      const active = currentId === node.id;
      const btn = el('button', {
        className: 'explorer-side-item' + (active ? ' active' : ''),
        type: 'button',
      },
        el('span', { text: it.icon }),
        el('span', { text: it.label })
      );
      btn.onclick = () => navigate(node.id);
      sidebar.append(btn);
    }
  }

  function paintToolbar() {
    clear(toolbar);

    const nav = el('div', { className: 'explorer-nav-btns' },
      el('button', {
        className: 'btn',
        type: 'button',
        text: '←',
        title: 'Zurück',
        disabled: histIndex <= 0,
        onClick: goBack,
      }),
      el('button', {
        className: 'btn',
        type: 'button',
        text: '→',
        title: 'Vorwärts',
        disabled: histIndex >= history.length - 1,
        onClick: goForward,
      }),
      el('button', {
        className: 'btn',
        type: 'button',
        text: '↑',
        title: 'Nach oben',
        disabled: !FileSystem.parent(currentId),
        onClick: goUp,
      }),
    );

    const search = el('input', {
      type: 'search',
      className: 'explorer-search',
      placeholder: 'Suchen…',
      value: filter,
      onInput: (e) => {
        filter = e.target.value;
        paintFiles();
      },
    });

    const viewBtn = el('button', {
      className: 'btn',
      type: 'button',
      text: viewMode === 'icons' ? '☰ Liste' : '▦ Icons',
      title: 'Ansicht wechseln',
      onClick: () => {
        viewMode = viewMode === 'icons' ? 'list' : 'icons';
        paintFiles();
        paintToolbar();
      },
    });

    const newFolder = el('button', {
      className: 'btn',
      type: 'button',
      text: 'Neuer Ordner',
      onClick: () => createFolder(),
    });

    const newFile = el('button', {
      className: 'btn',
      type: 'button',
      text: 'Neue Datei',
      onClick: () => createFile(),
    });

    toolbar.append(nav, search, viewBtn, newFolder, newFile);
  }

  function paintBreadcrumb() {
    clear(breadcrumb);
    const crumbs = FileSystem.breadcrumbs(currentId);
    crumbs.forEach((node, i) => {
      if (i > 0) breadcrumb.append(el('span', { className: 'bc-sep', text: '›' }));
      const label = node.name === 'This PC' ? 'Dieser PC' : node.name;
      const btn = el('button', {
        className: 'bc-item' + (i === crumbs.length - 1 ? ' current' : ''),
        type: 'button',
        text: label,
        onClick: () => navigate(node.id),
      });
      breadcrumb.append(btn);
    });
  }

  function getVisibleList() {
    let list = FileSystem.list(currentId);
    if (filter.trim()) {
      const q = filter.trim().toLowerCase();
      // Prefer deep search when typing
      const deep = FileSystem.search(q, currentId);
      if (deep.length) list = deep;
      else list = list.filter((n) => n.name.toLowerCase().includes(q));
    }
    return list;
  }

  function paintFiles() {
    clear(files);
    files.className = 'explorer-files' + (viewMode === 'list' ? ' list-view' : '');
    const list = getVisibleList();
    const folders = list.filter((n) => n.type === 'folder').length;
    const fileCount = list.length - folders;
    status.textContent = filter
      ? `${list.length} Treffer`
      : `${list.length} Element(e) · ${folders} Ordner · ${fileCount} Dateien`;

    if (!list.length) {
      files.append(el('div', {
        className: 'explorer-empty',
        text: filter ? 'Keine Treffer.' : 'Dieser Ordner ist leer. Rechtsklick für Aktionen.',
      }));
      return;
    }

    for (const node of list) {
      files.append(makeItem(node));
    }
  }

  function makeItem(node) {
    const modified = node.modified
      ? new Date(node.modified).toLocaleString('de-DE', { dateStyle: 'short', timeStyle: 'short' })
      : '';
    const size = node.type === 'file'
      ? formatSize(node.size ?? (node.content?.length || 0))
      : '';

    const item = el('button', {
      className: 'explorer-item' + (selectedId === node.id ? ' selected' : ''),
      type: 'button',
    },
      el('div', { className: 'explorer-item-icon', text: FileSystem.iconFor(node) }),
      el('div', { className: 'explorer-item-name', text: node.name }),
      viewMode === 'list' ? el('div', { className: 'explorer-item-meta', text: size }) : null,
      viewMode === 'list' ? el('div', { className: 'explorer-item-meta', text: modified }) : null,
    );

    item.onclick = (e) => {
      e.stopPropagation();
      selectedId = node.id;
      paintFiles();
    };

    item.ondblclick = () => openNode(node);

    item.oncontextmenu = (e) => {
      e.preventDefault();
      e.stopPropagation();
      selectedId = node.id;
      showContextMenu(e.clientX, e.clientY, [
        { label: 'Öffnen', action: () => openNode(node) },
        { label: 'Öffnen mit Word', action: () => AppRegistry.launch('word', { fileId: node.id, forceNew: true }), disabled: node.type === 'folder' },
        { label: 'Öffnen mit Excel', action: () => AppRegistry.launch('excel', { fileId: node.id, forceNew: true }), disabled: node.type === 'folder' },
        {
          label: 'Im Medienplayer öffnen',
          action: () => AppRegistry.launch('music', { fileId: node.id, autoplay: true }),
          disabled: node.type === 'folder' || !(node.mime?.startsWith('audio/') || /\.wav$/i.test(node.name) || node.src),
        },
        { sep: true },
        { label: 'Umbenennen', action: () => renameNode(node) },
        { label: 'Löschen', action: () => deleteNode(node) },
        { sep: true },
        { label: 'Eigenschaften', action: () => {
          bus.emit('ui:toast', {
            title: node.name,
            body: `${node.type === 'folder' ? 'Ordner' : 'Datei'}${size ? ' · ' + size : ''}${modified ? ' · ' + modified : ''}`,
          });
        } },
      ]);
    };

    return item;
  }

  function createFolder() {
    const name = prompt('Ordnername:', 'Neuer Ordner');
    if (!name) return;
    try {
      const node = FileSystem.createFolder(currentId, name);
      selectedId = node.id;
      paint();
    } catch (e) {
      bus.emit('ui:toast', { title: 'Fehler', body: e.message });
    }
  }

  function createFile() {
    const name = prompt('Dateiname:', 'Notiz.txt');
    if (!name) return;
    try {
      let mime = 'text/plain';
      if (/\.docx?$/i.test(name)) mime = 'application/word';
      if (/\.xlsx?$/i.test(name)) mime = 'application/excel';
      const content = mime === 'application/excel' ? JSON.stringify({ cells: { A1: '' } }) : '';
      const node = FileSystem.createFile(currentId, name, content, mime);
      selectedId = node.id;
      paint();
    } catch (e) {
      bus.emit('ui:toast', { title: 'Fehler', body: e.message });
    }
  }

  function renameNode(node) {
    const n = prompt('Neuer Name:', node.name);
    if (!n) return;
    try {
      FileSystem.rename(node.id, n);
      paint();
    } catch (err) {
      bus.emit('ui:toast', { title: 'Fehler', body: err.message });
    }
  }

  function deleteNode(node) {
    if (!confirm(`„${node.name}“ wirklich löschen?`)) return;
    try {
      FileSystem.remove(node.id);
      selectedId = null;
      paint();
    } catch (err) {
      bus.emit('ui:toast', { title: 'Fehler', body: err.message });
    }
  }

  function openNode(node) {
    if (node.type === 'folder') {
      navigate(node.id);
      return;
    }
    if (node.mime === 'application/word' || /\.(docx|doc|rtf)$/i.test(node.name)) {
      AppRegistry.launch('word', { fileId: node.id, forceNew: true, title: node.name + ' — Word' });
    } else if (node.mime === 'application/excel' || /\.(xlsx|xls|csv)$/i.test(node.name)) {
      AppRegistry.launch('excel', { fileId: node.id, forceNew: true, title: node.name + ' — Excel' });
    } else if (
      node.mime?.startsWith('audio/') ||
      /\.wav$/i.test(node.name) ||
      node.src ||
      /^assets\/.+\.wav$/i.test(node.content || '')
    ) {
      AppRegistry.launch('music', { fileId: node.id, autoplay: true, title: node.name + ' — Medienplayer' });
    } else {
      AppRegistry.launch('word', { fileId: node.id, forceNew: true, title: node.name });
    }
  }

  files.addEventListener('click', () => {
    selectedId = null;
    paintFiles();
  });

  files.addEventListener('contextmenu', (e) => {
    if (e.target.closest('.explorer-item')) return;
    e.preventDefault();
    showContextMenu(e.clientX, e.clientY, [
      { label: 'Neuer Ordner', action: createFolder },
      { label: 'Neue Textdatei', action: createFile },
      { sep: true },
      { label: 'Aktualisieren', action: paint },
    ]);
  });

  // Keyboard shortcuts inside explorer
  wrap.tabIndex = 0;
  wrap.addEventListener('keydown', (e) => {
    if (e.key === 'Backspace' && !e.target.matches('input')) {
      e.preventDefault();
      goUp();
    } else if (e.key === 'F2' && selectedId) {
      const node = FileSystem.find(selectedId);
      if (node) renameNode(node);
    } else if (e.key === 'Delete' && selectedId) {
      const node = FileSystem.find(selectedId);
      if (node) deleteNode(node);
    } else if (e.key === 'Enter' && selectedId) {
      const node = FileSystem.find(selectedId);
      if (node) openNode(node);
    }
  });

  bus.on('fs:change', () => paint());
  paint();
  setTitle();
}

function formatSize(n) {
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`;
  return `${(n / (1024 * 1024)).toFixed(1)} MB`;
}
