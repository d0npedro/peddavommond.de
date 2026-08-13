/**
 * peddavommond.de — Windows 11 shell (project launcher)
 * Apps = interne Routen + externe Deploys (eigene Git-Repos)
 */
import { State } from './core/State.js';
import { bus } from './core/EventBus.js';
import { AppRegistry } from './core/AppRegistry.js';
import { FileSystem } from './core/FileSystem.js';
import { initErrorRecovery } from './core/ErrorRecovery.js';
import { toast } from './utils/dom.js';

import { mountDesktop } from './shell/Desktop.js';
import { mountTaskbar } from './shell/Taskbar.js';
import { mountStartMenu } from './shell/StartMenu.js';
import { initContextMenu } from './shell/ContextMenu.js';

import { mountSettings } from './apps/Settings.js';
import { mountStore } from './apps/Store.js';
import { mountExplorer } from './apps/Explorer.js';
import { mountWord } from './apps/Word.js';
import { mountExcel } from './apps/Excel.js';
import { mountSolitaire } from './apps/Solitaire.js';
import { mountMinesweeper } from './apps/Minesweeper.js';
import { mountTicTacToe } from './apps/TicTacToe.js';
import { mountCalculator } from './apps/Calculator.js';
import { mountPaint } from './apps/Paint.js';
import { mountTerminal } from './apps/Terminal.js';
import { mountWeather } from './apps/Weather.js';
import { mountMusicPlayer } from './apps/MusicPlayer.js';
import { mountExternalApp, mountOpenExternal } from './apps/ExternalApp.js';
import { APP_CATALOG } from './apps/catalog.js';

function registerBuiltin(def) {
  AppRegistry.register(def);
}

function registerCatalogApps() {
  for (const app of APP_CATALOG) {
    const openExternal = app.launch === 'external' || app.openInNewTab;
    AppRegistry.register({
      id: app.id,
      name: app.name,
      icon: app.icon,
      category: app.category || 'apps',
      description: app.description,
      installable: app.installable !== false,
      builtIn: false,
      defaultWidth: app.defaultWidth || 920,
      defaultHeight: app.defaultHeight || 680,
      singleInstance: app.singleInstance !== false,
      mount: (host, meta, opts) => {
        const url = opts.url || app.url;
        if (openExternal) {
          mountOpenExternal(host, meta, { url, title: app.name });
          return;
        }
        mountExternalApp(host, meta, {
          url,
          title: app.name,
          repo: app.repo,
          openUrl: app.openUrl || app.url,
          openExternal: opts.openExternal,
        });
      },
    });
  }
}

function registerApps() {
  registerBuiltin({
    id: 'settings',
    name: 'Einstellungen',
    icon: '⚙️',
    category: 'system',
    description: 'System, Personalisierung, Apps und Datenschutz.',
    installable: false,
    builtIn: true,
    defaultWidth: 920,
    defaultHeight: 640,
    mount: mountSettings,
  });

  registerBuiltin({
    id: 'store',
    name: 'Microsoft Store',
    icon: '🛍️',
    category: 'system',
    description: 'Apps und Projekte freischalten.',
    installable: false,
    builtIn: true,
    defaultWidth: 960,
    defaultHeight: 680,
    mount: mountStore,
  });

  registerBuiltin({
    id: 'explorer',
    name: 'Datei-Explorer',
    icon: '📁',
    category: 'system',
    description: 'Dateien und Ordner.',
    installable: false,
    builtIn: true,
    defaultWidth: 900,
    defaultHeight: 600,
    mount: mountExplorer,
  });

  registerBuiltin({
    id: 'word',
    name: 'Word',
    icon: '📄',
    category: 'productivity',
    description: 'Texteditor.',
    defaultWidth: 880,
    defaultHeight: 640,
    singleInstance: false,
    mount: mountWord,
  });

  registerBuiltin({
    id: 'excel',
    name: 'Excel',
    icon: '📊',
    category: 'productivity',
    description: 'Tabellen mit Formeln.',
    defaultWidth: 960,
    defaultHeight: 640,
    singleInstance: false,
    mount: mountExcel,
  });

  registerBuiltin({
    id: 'solitaire',
    name: 'Solitaire',
    icon: '🃏',
    category: 'games',
    description: 'Klondike Solitaire.',
    defaultWidth: 920,
    defaultHeight: 680,
    mount: mountSolitaire,
  });

  registerBuiltin({
    id: 'minesweeper',
    name: 'Minesweeper',
    icon: '💣',
    category: 'games',
    description: 'Minesweeper.',
    defaultWidth: 520,
    defaultHeight: 620,
    mount: mountMinesweeper,
  });

  registerBuiltin({
    id: 'tictactoe',
    name: 'Tic-Tac-Toe',
    icon: '⭕',
    category: 'games',
    description: 'Drei gewinnt.',
    defaultWidth: 420,
    defaultHeight: 520,
    mount: mountTicTacToe,
  });

  registerBuiltin({
    id: 'calculator',
    name: 'Rechner',
    icon: '🧮',
    category: 'utilities',
    description: 'Taschenrechner.',
    defaultWidth: 360,
    defaultHeight: 480,
    mount: mountCalculator,
  });

  registerBuiltin({
    id: 'music',
    name: 'Medienplayer',
    icon: '🎵',
    category: 'media',
    description: 'WAV/MP3 Player.',
    defaultWidth: 480,
    defaultHeight: 640,
    singleInstance: true,
    mount: mountMusicPlayer,
  });

  registerBuiltin({
    id: 'paint',
    name: 'Paint',
    icon: '🎨',
    category: 'creativity',
    description: 'Zeichnen.',
    defaultWidth: 800,
    defaultHeight: 560,
    mount: mountPaint,
  });

  registerBuiltin({
    id: 'terminal',
    name: 'Terminal',
    icon: '⌨️',
    category: 'utilities',
    description: 'Kommandozeile (Sim).',
    defaultWidth: 720,
    defaultHeight: 480,
    mount: mountTerminal,
  });

  registerBuiltin({
    id: 'weather',
    name: 'Wetter',
    icon: '🌤️',
    category: 'news',
    description: 'Wetter-Widget.',
    defaultWidth: 420,
    defaultHeight: 560,
    mount: mountWeather,
  });

  registerCatalogApps();
}

function ensureProjectAppsInstalled() {
  const featured = APP_CATALOG.filter((a) => a.featured).map((a) => a.id);
  const must = [
    'settings', 'store', 'explorer', 'music', 'calculator',
    ...APP_CATALOG.map((a) => a.id),
  ];
  let installed = [...State.get().installedApps];
  let changed = false;
  for (const id of must) {
    if (!installed.includes(id)) {
      installed.push(id);
      changed = true;
    }
  }
  if (changed) State.update('installedApps', installed);

  // Desktop: featured projects first
  const desktop = State.get().desktopIcons || [];
  const desiredDesktop = [
    'explorer',
    'recycle',
    'moeglichkeitensystem',
    'slotmachine',
    'listen',
    'soundcloud',
    'timetofly',
    'github',
    'settings',
  ];
  if (!desktop.includes('slotmachine') || !desktop.includes('moeglichkeitensystem')) {
    State.update('desktopIcons', desiredDesktop);
  }

  const pins = State.get().pinnedTaskbar || [];
  if (!pins.includes('moeglichkeitensystem')) {
    const nextPins = ['start', 'explorer', 'moeglichkeitensystem', 'slotmachine', 'listen', 'music', 'settings'];
    State.update('pinnedTaskbar', nextPins);
  }

  void featured;
}

function wireGlobalUi() {
  bus.on('ui:toast', ({ title, body }) => {
    if (State.get().notifications !== false) toast(title, body || '');
  });

  document.addEventListener('contextmenu', (e) => {
    if (e.target.closest('.word-page, .excel-app, input, textarea, [contenteditable=true]')) return;
  });
}

export function boot(opts = {}) {
  State.applyTheme();
  registerApps();
  FileSystem.ensureMusicLibrary();
  ensureProjectAppsInstalled();

  mountDesktop();
  mountTaskbar();
  mountStartMenu();
  initContextMenu();
  wireGlobalUi();

  if (!opts.recovery) {
    const bootScreen = document.getElementById('boot-screen');
    const appRoot = document.getElementById('app-root');
    setTimeout(() => {
      bootScreen?.classList.add('fade-out');
      if (appRoot) appRoot.hidden = false;
      setTimeout(() => bootScreen?.remove(), 500);
      bus.emit('ui:toast', {
        title: 'Willkommen',
        body: 'Desktop bereit — Apps sind deine Projekte (z. B. Slotmachine).',
      });
    }, opts.fast ? 200 : 900);
  } else {
    document.getElementById('app-root').hidden = false;
    document.getElementById('boot-screen')?.remove();
  }
}

initErrorRecovery(() => boot({ recovery: true, fast: true }));

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => boot());
} else {
  boot();
}

window.__win11 = { boot, State, AppRegistry, bus, APP_CATALOG };
