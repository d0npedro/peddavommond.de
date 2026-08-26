import { el, clear } from '../utils/dom.js';
import { State } from '../core/State.js';
import { AppRegistry } from '../core/AppRegistry.js';
import { bus } from '../core/EventBus.js';

const META = {
  paint: { rating: 4.6, downloads: '12 Tsd.', price: 'Kostenlos' },
  terminal: { rating: 4.8, downloads: '8 Tsd.', price: 'Kostenlos' },
  weather: { rating: 4.2, downloads: '45 Tsd.', price: 'Kostenlos' },
  solitaire: { rating: 4.7, downloads: '2 Mio.', price: 'Kostenlos' },
  minesweeper: { rating: 4.5, downloads: '1 Mio.', price: 'Kostenlos' },
  tictactoe: { rating: 4.1, downloads: '500 Tsd.', price: 'Kostenlos' },
  word: { rating: 4.4, downloads: '900 Tsd.', price: 'Kostenlos' },
  excel: { rating: 4.5, downloads: '850 Tsd.', price: 'Kostenlos' },
  calculator: { rating: 4.9, downloads: '5 Mio.', price: 'Kostenlos' },
  music: { rating: 4.7, downloads: '3 Mio.', price: 'Kostenlos' },
};

export function mountStore(host, meta) {
  const shell = el('div', { className: 'app-shell' });
  const nav = el('div', { className: 'app-nav' });
  const main = el('div', { className: 'app-main' });
  shell.append(nav, main);
  host.append(shell);

  let tab = 'home';
  let query = '';
  let installing = new Set();

  const tabs = [
    { id: 'home', label: 'Start', icon: '🏠' },
    { id: 'apps', label: 'Apps', icon: '📱' },
    { id: 'games', label: 'Spiele', icon: '🎮' },
    { id: 'library', label: 'Bibliothek', icon: '📚' },
  ];

  function paint() {
    clear(nav);
    clear(main);
    nav.append(el('div', { style: { fontWeight: 700, padding: '8px 12px 16px', fontSize: '18px' }, text: 'Microsoft Store' }));
    for (const t of tabs) {
      const b = el('button', {
        className: 'app-nav-item' + (tab === t.id ? ' active' : ''),
        type: 'button',
      }, el('span', { text: t.icon }), el('span', { text: t.label }));
      b.onclick = () => { tab = t.id; paint(); };
      nav.append(b);
    }

    const search = el('input', {
      type: 'search',
      placeholder: 'Apps und Spiele suchen',
      value: query,
      style: {
        width: 'calc(100% - 16px)',
        margin: '8px',
        padding: '8px 12px',
        borderRadius: '20px',
        border: '1px solid var(--border)',
        background: 'var(--bg-card)',
        outline: 'none',
      },
    });
    search.oninput = (e) => {
      query = e.target.value;
      paintMain();
    };
    nav.append(search);

    paintMain();
    meta?.setTitle?.('Microsoft Store');
  }

  function paintMain() {
    clear(main);
    if (tab === 'home') renderHome(main);
    else if (tab === 'apps') renderCatalog(main, (a) => !isGame(a.id));
    else if (tab === 'games') renderCatalog(main, (a) => isGame(a.id));
    else renderLibrary(main);
  }

  function isGame(id) {
    const app = AppRegistry.get(id);
    return app?.category === 'games' || ['solitaire', 'minesweeper', 'tictactoe'].includes(id);
  }

  function allStoreItems() {
    const fromRegistry = AppRegistry.catalog().map((a) => ({
      id: a.id,
      name: a.name,
      icon: a.icon,
      description: a.description || `${a.name} für Windows 11 Simulation`,
      category: a.category || 'Apps',
    }));
    const map = new Map();
    for (const a of fromRegistry) map.set(a.id, a);
    return [...map.values()];
  }

  function filtered(items) {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter((a) =>
      a.name.toLowerCase().includes(q) ||
      a.description.toLowerCase().includes(q) ||
      a.id.includes(q) ||
      (a.category || '').toLowerCase().includes(q)
    );
  }

  function renderHome(mainEl) {
    mainEl.append(
      el('div', { className: 'store-hero' },
        el('h2', { text: 'Willkommen im Microsoft Store' }),
        el('p', { text: 'Apps und Spiele installieren — Status wird lokal gespeichert. Tippe oben zum Suchen.' }),
      )
    );

    const featured = filtered(allStoreItems()).slice(0, 6);
    mainEl.append(el('h3', { style: { marginBottom: '12px' }, text: query ? 'Suchergebnisse' : 'Empfohlen' }));
    mainEl.append(cardGrid(featured));

    if (!query) {
      mainEl.append(el('h3', { style: { margin: '24px 0 12px' }, text: 'Beliebte Spiele' }));
      mainEl.append(cardGrid(allStoreItems().filter((a) => isGame(a.id))));
    }
  }

  function renderCatalog(mainEl, filterFn = () => true) {
    mainEl.append(el('h2', { text: tab === 'games' ? 'Spiele' : 'Apps' }));
    mainEl.append(el('p', { className: 'subtitle', text: 'Tippe auf Installieren, um Apps freizuschalten' }));
    const items = filtered(allStoreItems().filter(filterFn));
    if (!items.length) {
      mainEl.append(el('p', { text: 'Keine Treffer.' }));
      return;
    }
    mainEl.append(cardGrid(items));
  }

  function renderLibrary(mainEl) {
    mainEl.append(el('h2', { text: 'Bibliothek' }));
    mainEl.append(el('p', { className: 'subtitle', text: 'Deine installierten Apps' }));
    const items = filtered(allStoreItems().filter((a) => State.isInstalled(a.id)));
    if (!items.length) {
      mainEl.append(el('p', { text: query ? 'Keine Treffer.' : 'Noch nichts installiert — schau unter Apps oder Spiele.' }));
      return;
    }
    mainEl.append(cardGrid(items));
  }

  function cardGrid(items) {
    const grid = el('div', { className: 'store-grid' });
    for (const app of items) {
      const installed = State.isInstalled(app.id);
      const protectedApp = ['settings', 'store', 'explorer'].includes(app.id);
      const busy = installing.has(app.id);
      const m = META[app.id] || { rating: 4.0, downloads: '—', price: 'Kostenlos' };

      const btn = el('button', {
        className: 'btn' + (installed ? '' : ' btn-primary'),
        type: 'button',
        text: busy ? 'Installiere…' : installed ? (protectedApp ? 'Installiert' : 'Deinstallieren') : 'Installieren',
        disabled: (installed && protectedApp) || busy,
      });

      btn.onclick = () => {
        if (installed) {
          if (State.uninstallApp(app.id)) {
            bus.emit('ui:toast', { title: 'Deinstalliert', body: app.name });
            paintMain();
          }
          return;
        }
        if (!AppRegistry.get(app.id)) {
          bus.emit('ui:toast', { title: 'Fehler', body: 'App nicht verfügbar' });
          return;
        }
        // Simulated install progress
        installing.add(app.id);
        paintMain();
        setTimeout(() => {
          State.installApp(app.id);
          const pins = State.get().pinnedTaskbar;
          if (!pins.includes(app.id) && pins.length < 12) {
            State.update('pinnedTaskbar', [...pins, app.id]);
          }
          installing.delete(app.id);
          bus.emit('ui:toast', { title: 'Installiert', body: `${app.name} ist bereit` });
          paintMain();
        }, 700 + Math.random() * 600);
      };

      const openBtn = installed
        ? el('button', {
          className: 'btn',
          type: 'button',
          text: 'Öffnen',
          onClick: () => AppRegistry.launch(app.id),
        })
        : null;

      grid.append(
        el('div', { className: 'store-card' },
          el('div', { className: 'store-card-icon', text: app.icon }),
          el('h3', { text: app.name }),
          el('p', { text: app.description }),
          el('div', {
            style: { fontSize: '11px', color: 'var(--text-secondary)', display: 'flex', gap: '8px', flexWrap: 'wrap' },
            text: `★ ${m.rating} · ${m.downloads} · ${m.price}`,
          }),
          el('div', { style: { fontSize: '11px', color: 'var(--text-secondary)' }, text: app.category }),
          el('div', { style: { display: 'flex', gap: '6px', marginTop: '4px' } }, btn, openBtn)
        )
      );
    }
    return grid;
  }

  bus.on('state:change', () => paintMain());
  paint();
}
