import { el, clear } from '../utils/dom.js';
import { State } from '../core/State.js';
import { AppRegistry } from '../core/AppRegistry.js';
import { bus } from '../core/EventBus.js';
import { ICONS } from '../utils/icons.js';

let open = false;

const RECOMMENDED = ['slotmachine', 'musicfestival', 'examples', 'soundcloud', 'timetofly', 'multiagent', 'github', 'settings'];

export function mountStartMenu() {
  const menu = document.getElementById('start-menu');
  render(menu);

  bus.on('start:toggle', () => {
    open = !open;
    menu.hidden = !open;
    if (open) {
      bus.emit('flyout:close');
      render(menu);
      menu.querySelector('input')?.focus();
    }
  });

  bus.on('start:close', () => {
    open = false;
    menu.hidden = true;
  });

  bus.on('state:change', () => {
    if (open) render(menu);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && open) bus.emit('start:close');
    // Win-key style: Ctrl+Escape or Meta opens start
    if ((e.key === 'Meta' || (e.ctrlKey && e.key === 'Escape')) && !e.repeat) {
      // Meta alone is unreliable in browsers; Ctrl+Esc works
      if (e.ctrlKey && e.key === 'Escape') {
        e.preventDefault();
        bus.emit('start:toggle');
      }
    }
  });

  document.addEventListener('mousedown', (e) => {
    if (!open) return;
    if (e.target.closest('#start-menu') || e.target.closest('[data-action="start"]')) return;
    bus.emit('start:close');
  });
}

function render(menu) {
  clear(menu);
  const state = State.get();
  let filter = '';

  const searchWrap = el('div', { className: 'start-search' });
  const input = el('input', {
    type: 'search',
    placeholder: 'Nach Apps, Einstellungen und Dokumenten suchen',
    autocomplete: 'off',
  });
  searchWrap.append(input);

  const sectionPinned = el('div', { className: 'start-section' });
  const sectionAll = el('div', { className: 'start-section', style: { paddingTop: '0' } });
  const gridPinned = el('div', { className: 'start-grid' });
  const gridAll = el('div', { className: 'start-grid' });

  sectionPinned.append(
    el('div', { className: 'start-section-title' }, el('span', { text: 'Angeheftet' })),
    gridPinned
  );
  sectionAll.append(
    el('div', { className: 'start-section-title' }, el('span', { text: 'Alle Apps' })),
    gridAll
  );

  const footer = el('div', { className: 'start-footer' },
    el('button', {
      className: 'start-user',
      type: 'button',
      onClick: () => {
        bus.emit('start:close');
        AppRegistry.launch('settings', { section: 'system' });
      },
    },
      el('div', { className: 'start-avatar', text: (state.userName || 'B')[0].toUpperCase() }),
      el('span', { text: state.userName || 'Benutzer' })
    ),
    el('div', { style: { display: 'flex', gap: '4px' } },
      el('button', {
        className: 'start-power',
        type: 'button',
        title: 'Einstellungen',
        text: '⚙️',
        onClick: () => {
          bus.emit('start:close');
          AppRegistry.launch('settings');
        },
      }),
      el('button', {
        className: 'start-power',
        type: 'button',
        title: 'Sperren / Neu starten (Simulation)',
        text: ICONS.power,
        onClick: () => {
          bus.emit('start:close');
          showPowerMenu();
        },
      })
    )
  );

  function appButton(app) {
    const btn = el('button', {
      className: 'start-app',
      type: 'button',
      title: app.name,
    },
      el('div', { className: 'start-app-icon', text: app.icon }),
      el('div', { className: 'start-app-name', text: app.name })
    );
    btn.addEventListener('click', () => {
      bus.emit('start:close');
      AppRegistry.launch(app.id);
    });
    return btn;
  }

  function paintApps() {
    clear(gridPinned);
    clear(gridAll);
    const q = filter.trim().toLowerCase();
    const installed = AppRegistry.installed()
      .filter((a) => !q || a.name.toLowerCase().includes(q) || a.id.includes(q) || (a.description || '').toLowerCase().includes(q))
      .sort((a, b) => a.name.localeCompare(b.name, 'de'));

    // Pinned / recommended
    const pinIds = State.get().pinnedTaskbar.filter((id) => id !== 'start');
    const recIds = [...new Set([...pinIds, ...RECOMMENDED])].filter((id) => State.isInstalled(id));
    const recApps = recIds
      .map((id) => AppRegistry.get(id))
      .filter(Boolean)
      .filter((a) => !q || a.name.toLowerCase().includes(q) || a.id.includes(q));

    if (!q) {
      for (const app of recApps.slice(0, 12)) gridPinned.append(appButton(app));
      if (!recApps.length) {
        gridPinned.append(el('div', {
          style: { gridColumn: '1 / -1', color: 'var(--text-secondary)', padding: '8px', fontSize: '12px' },
          text: 'Keine angehefteten Apps',
        }));
      }
    } else {
      sectionPinned.style.display = 'none';
    }
    if (!q) sectionPinned.style.display = '';

    if (!installed.length) {
      gridAll.append(el('div', {
        style: { gridColumn: '1 / -1', color: 'var(--text-secondary)', padding: '12px' },
        text: 'Keine Apps gefunden',
      }));
    } else {
      for (const app of installed) gridAll.append(appButton(app));
    }
  }

  input.addEventListener('input', () => {
    filter = input.value;
    paintApps();
  });

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const first = gridAll.querySelector('.start-app') || gridPinned.querySelector('.start-app');
      first?.click();
    }
  });

  paintApps();
  menu.append(searchWrap, sectionPinned, sectionAll, footer);
}

function showPowerMenu() {
  bus.emit('ui:toast', { title: 'Energieoptionen', body: 'Neustart simuliert — Session bleibt aktiv.' });
  // Soft "restart": re-show boot briefly
  const root = document.getElementById('app-root');
  if (!root) return;
  const overlay = document.createElement('div');
  overlay.className = 'boot-screen';
  overlay.innerHTML = `
    <div class="boot-logo" aria-hidden="true">
      <svg viewBox="0 0 88 88" width="72" height="72">
        <rect x="0" y="0" width="40" height="40" fill="#fff" rx="2"/>
        <rect x="48" y="0" width="40" height="40" fill="#fff" rx="2"/>
        <rect x="0" y="48" width="40" height="40" fill="#fff" rx="2"/>
        <rect x="48" y="48" width="40" height="40" fill="#fff" rx="2"/>
      </svg>
    </div>
    <div class="boot-spinner"></div>`;
  document.body.append(overlay);
  setTimeout(() => {
    overlay.classList.add('fade-out');
    setTimeout(() => overlay.remove(), 450);
    bus.emit('ui:toast', { title: 'Willkommen zurück', body: 'System neu gestartet (Simulation).' });
  }, 1200);
}

export function isStartOpen() {
  return open;
}
