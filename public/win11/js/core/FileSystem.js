import { bus } from './EventBus.js';

const FS_KEY = 'win11-sim-fs-v1';

function uid() {
  return 'n_' + Math.random().toString(36).slice(2, 10) + Date.now().toString(36);
}

function folder(name, children = [], extra = {}) {
  return {
    id: uid(),
    name,
    type: 'folder',
    children,
    modified: Date.now(),
    ...extra,
  };
}

function file(name, content = '', mime = 'text/plain', extra = {}) {
  return {
    id: uid(),
    name,
    type: 'file',
    content,
    mime,
    modified: Date.now(),
    size: content.length,
    ...extra,
  };
}

function seed() {
  const desktop = folder('Desktop', [
    file('Willkommen.txt', 'Willkommen bei der Windows 11 Browser-Simulation!\n\nDoppelklicke Icons, öffne das Startmenü und entdecke die Apps.', 'text/plain'),
    file('Notizen.txt', 'Meine Notizen\n=============\n- Store-Apps installieren\n- Excel-Formeln testen\n- Minesweeper highscore knacken', 'text/plain'),
  ], { special: 'desktop' });

  const documents = folder('Documents', [
    file('Bericht.docx', 'Jahresbericht 2026\n\nDies ist ein Beispieldokument für den Word-Editor.', 'application/word'),
    file('Budget.xlsx', JSON.stringify({
      cells: {
        A1: 'Position', B1: 'Januar', C1: 'Februar', D1: 'Summe',
        A2: 'Miete', B2: '900', C2: '900', D2: '=SUM(B2:C2)',
        A3: 'Essen', B3: '350', C3: '380', D3: '=SUM(B3:C3)',
        A4: 'Transport', B4: '80', C4: '95', D4: '=SUM(B4:C4)',
        A5: 'Gesamt', B5: '=SUM(B2:B4)', C5: '=SUM(C2:C4)', D5: '=SUM(D2:D4)',
      },
    }), 'application/excel'),
    folder('Projekte', [
      file('README.md', '# Projekte\n\nOrdner für Projektnotizen.', 'text/markdown'),
    ]),
  ], { special: 'documents' });

  const downloads = folder('Downloads', [
    file('setup-hinweis.txt', 'In dieser Simulation werden Apps über den Microsoft Store installiert.', 'text/plain'),
  ], { special: 'downloads' });

  const pictures = folder('Pictures', [
    file('Wallpaper-Idee.txt', 'Wähle unter Einstellungen → Personalisierung ein Hintergrundbild.', 'text/plain'),
  ], { special: 'pictures' });

  const music = folder('Music', [
    file('Playlist.txt', '1. Ambient Focus\n2. Lo-Fi Beats\n3. Coding Jazz\n4. Sunrise Keys\n\nDoppelklick auf .wav-Dateien öffnet den Medienplayer.', 'text/plain'),
    file('Ambient Focus.wav', 'assets/music/ambient-focus.wav', 'audio/wav', {
      src: 'assets/music/ambient-focus.wav',
      artist: 'Win11 Sim',
    }),
    file('Lo-Fi Beats.wav', 'assets/music/lofi-beats.wav', 'audio/wav', {
      src: 'assets/music/lofi-beats.wav',
      artist: 'Win11 Sim',
    }),
    file('Coding Jazz.wav', 'assets/music/coding-jazz.wav', 'audio/wav', {
      src: 'assets/music/coding-jazz.wav',
      artist: 'Win11 Sim',
    }),
    file('Sunrise Keys.wav', 'assets/music/sunrise-keys.wav', 'audio/wav', {
      src: 'assets/music/sunrise-keys.wav',
      artist: 'Win11 Sim',
    }),
  ], { special: 'music' });

  const root = folder('This PC', [
    desktop,
    documents,
    downloads,
    pictures,
    music,
  ], { special: 'root', id: 'root' });

  // Fix root id after folder() generates random
  root.id = 'root';
  return root;
}

function load() {
  try {
    const raw = localStorage.getItem(FS_KEY);
    if (!raw) return seed();
    return JSON.parse(raw);
  } catch {
    return seed();
  }
}

function persist(tree) {
  try {
    localStorage.setItem(FS_KEY, JSON.stringify(tree));
  } catch (e) {
    console.warn('FS persist failed', e);
  }
}

let tree = load();

function walk(node, fn, parent = null, path = []) {
  fn(node, parent, path);
  if (node.type === 'folder' && node.children) {
    for (const child of node.children) {
      walk(child, fn, node, [...path, node.name]);
    }
  }
}

function findById(id, node = tree) {
  if (node.id === id) return node;
  if (node.type === 'folder') {
    for (const c of node.children || []) {
      const f = findById(id, c);
      if (f) return f;
    }
  }
  return null;
}

function findParent(id, node = tree, parent = null) {
  if (node.id === id) return parent;
  if (node.type === 'folder') {
    for (const c of node.children || []) {
      const p = findParent(id, c, node);
      if (p !== undefined && p !== null) return p;
      if (p === null && c.id === id) return node;
    }
  }
  return undefined;
}

function findBySpecial(special, node = tree) {
  if (node.special === special) return node;
  if (node.type === 'folder') {
    for (const c of node.children || []) {
      const f = findBySpecial(special, c);
      if (f) return f;
    }
  }
  return null;
}

function getPath(id) {
  let path = [];
  walk(tree, (node, parent, p) => {
    if (node.id === id) path = [...p, node.name];
  });
  return path;
}

const DEMO_WAVS = [
  { name: 'Ambient Focus.wav', src: 'assets/music/ambient-focus.wav' },
  { name: 'Lo-Fi Beats.wav', src: 'assets/music/lofi-beats.wav' },
  { name: 'Coding Jazz.wav', src: 'assets/music/coding-jazz.wav' },
  { name: 'Sunrise Keys.wav', src: 'assets/music/sunrise-keys.wav' },
];

export const FileSystem = {
  getTree() {
    return tree;
  },

  /** Ensure demo .wav library exists (for upgrades / old localStorage) */
  ensureMusicLibrary() {
    const music = findBySpecial('music');
    if (!music || music.type !== 'folder') return;
    let changed = false;
    for (const track of DEMO_WAVS) {
      const exists = (music.children || []).some(
        (c) => c.name === track.name || c.src === track.src || c.content === track.src
      );
      if (exists) continue;
      music.children.push(file(track.name, track.src, 'audio/wav', {
        src: track.src,
        artist: 'Win11 Sim',
      }));
      changed = true;
    }
    if (changed) {
      music.modified = Date.now();
      persist(tree);
      bus.emit('fs:change', { type: 'ensure-music' });
    }
  },

  reset() {
    tree = seed();
    persist(tree);
    bus.emit('fs:change', { type: 'reset' });
  },

  find(id) {
    return findById(id);
  },

  special(name) {
    return findBySpecial(name);
  },

  path(id) {
    return getPath(id);
  },

  parent(id) {
    return findParent(id) || null;
  },

  /** Breadcrumb nodes from root to id (inclusive) */
  breadcrumbs(id) {
    const crumbs = [];
    let cur = findById(id);
    while (cur) {
      crumbs.unshift(cur);
      cur = findParent(cur.id) || null;
    }
    return crumbs;
  },

  search(query, folderId = null) {
    const q = String(query || '').trim().toLowerCase();
    if (!q) return [];
    const start = folderId ? findById(folderId) : tree;
    const results = [];
    walk(start, (node) => {
      if (node.id === start.id) return;
      if (node.name.toLowerCase().includes(q)) results.push(node);
    });
    return results.slice(0, 50);
  },

  list(folderId) {
    const node = findById(folderId);
    if (!node || node.type !== 'folder') return [];
    return [...(node.children || [])].sort((a, b) => {
      if (a.type !== b.type) return a.type === 'folder' ? -1 : 1;
      return a.name.localeCompare(b.name, 'de');
    });
  },

  createFolder(parentId, name) {
    const parent = findById(parentId);
    if (!parent || parent.type !== 'folder') throw new Error('Invalid parent');
    const n = name.trim() || 'Neuer Ordner';
    let final = n;
    let i = 1;
    while (parent.children.some((c) => c.name === final)) {
      final = `${n} (${i++})`;
    }
    const node = folder(final);
    parent.children.push(node);
    parent.modified = Date.now();
    persist(tree);
    bus.emit('fs:change', { type: 'create', node });
    return node;
  },

  createFile(parentId, name, content = '', mime = 'text/plain') {
    const parent = findById(parentId);
    if (!parent || parent.type !== 'folder') throw new Error('Invalid parent');
    let final = name.trim() || 'Neue Datei.txt';
    let i = 1;
    const base = final;
    while (parent.children.some((c) => c.name === final)) {
      const dot = base.lastIndexOf('.');
      if (dot > 0) final = `${base.slice(0, dot)} (${i++})${base.slice(dot)}`;
      else final = `${base} (${i++})`;
    }
    const node = file(final, content, mime);
    parent.children.push(node);
    parent.modified = Date.now();
    persist(tree);
    bus.emit('fs:change', { type: 'create', node });
    return node;
  },

  writeFile(id, content) {
    const node = findById(id);
    if (!node || node.type !== 'file') throw new Error('Not a file');
    node.content = content;
    node.size = content.length;
    node.modified = Date.now();
    persist(tree);
    bus.emit('fs:change', { type: 'write', node });
    return node;
  },

  rename(id, name) {
    const node = findById(id);
    if (!node || node.special === 'root') throw new Error('Cannot rename');
    node.name = name.trim() || node.name;
    node.modified = Date.now();
    persist(tree);
    bus.emit('fs:change', { type: 'rename', node });
    return node;
  },

  remove(id) {
    const parent = findParent(id);
    if (!parent) throw new Error('Cannot delete root');
    const node = findById(id);
    if (node?.special && ['desktop', 'documents', 'downloads', 'pictures', 'music'].includes(node.special)) {
      throw new Error('Systemordner können nicht gelöscht werden');
    }
    parent.children = parent.children.filter((c) => c.id !== id);
    parent.modified = Date.now();
    persist(tree);
    bus.emit('fs:change', { type: 'delete', id });
    return true;
  },

  iconFor(node) {
    if (node.type === 'folder') {
      if (node.special === 'desktop') return '🖥️';
      if (node.special === 'documents') return '📑';
      if (node.special === 'downloads') return '⬇️';
      if (node.special === 'pictures') return '🖼️';
      if (node.special === 'music') return '🎵';
      return '📂';
    }
    if (node.mime === 'application/word' || node.name.endsWith('.docx')) return '📄';
    if (node.mime === 'application/excel' || node.name.endsWith('.xlsx')) return '📊';
    if (node.mime?.startsWith('audio/') || /\.wav$/i.test(node.name)) return '🎵';
    if (node.mime?.startsWith('image/')) return '🖼️';
    if (node.name.endsWith('.md')) return '📝';
    return '📃';
  },
};

export default FileSystem;
