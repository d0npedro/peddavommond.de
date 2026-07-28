import { el, clear } from '../utils/dom.js';
import { State, WALLPAPERS } from '../core/State.js';
import { AppRegistry } from '../core/AppRegistry.js';
import { bus } from '../core/EventBus.js';
import { showContextMenu } from './ContextMenu.js';
import { ICONS } from '../utils/icons.js';

export function mountDesktop() {
  const desktop = document.getElementById('desktop');
  render(desktop);

  bus.on('state:change', () => render(desktop));
  bus.on('store:install', () => render(desktop));
  bus.on('store:uninstall', () => render(desktop));
  bus.on('state:wallpaper', () => applyWallpaper(desktop));
  bus.on('state:theme', () => applyWallpaper(desktop));

  desktop.addEventListener('click', (e) => {
    if (e.target === desktop || e.target.classList.contains('desktop-icons')) {
      desktop.querySelectorAll('.desktop-icon.selected').forEach((n) => n.classList.remove('selected'));
      bus.emit('start:close');
      bus.emit('flyout:close');
    }
  });

  desktop.addEventListener('contextmenu', (e) => {
    if (e.target.closest('.desktop-icon')) return;
    e.preventDefault();
    showContextMenu(e.clientX, e.clientY, [
      { label: 'Ansicht aktualisieren', action: () => render(desktop) },
      { sep: true },
      { label: 'Sortieren nach Name', action: () => {
        const icons = [...State.get().desktopIcons].sort((a, b) => {
          const na = a === 'recycle' ? 'Papierkorb' : (AppRegistry.get(a)?.name || a);
          const nb = b === 'recycle' ? 'Papierkorb' : (AppRegistry.get(b)?.name || b);
          return na.localeCompare(nb, 'de');
        });
        State.update('desktopIcons', icons);
      } },
      { sep: true },
      { label: 'Anzeige-Einstellungen', action: () => AppRegistry.launch('settings', { section: 'system' }) },
      { label: 'Personalisierung', action: () => AppRegistry.launch('settings', { section: 'personalization' }) },
      { sep: true },
      { label: 'Datei-Explorer öffnen', action: () => AppRegistry.launch('explorer') },
      { label: 'Terminal öffnen', action: () => {
        if (State.isInstalled('terminal')) AppRegistry.launch('terminal');
        else bus.emit('ui:toast', { title: 'Terminal', body: 'Zuerst im Microsoft Store installieren.' });
      } },
    ]);
  });

  // Keyboard: select/open focused desktop icon
  desktop.tabIndex = 0;
  desktop.addEventListener('keydown', (e) => {
    const icons = [...desktop.querySelectorAll('.desktop-icon')];
    if (!icons.length) return;
    const idx = icons.findIndex((n) => n.classList.contains('selected'));
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
      e.preventDefault();
      const next = icons[Math.min(icons.length - 1, Math.max(0, idx) + 1)] || icons[0];
      icons.forEach((n) => n.classList.remove('selected'));
      next.classList.add('selected');
      next.focus();
    } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
      e.preventDefault();
      const prev = icons[Math.max(0, (idx < 0 ? 0 : idx) - 1)];
      icons.forEach((n) => n.classList.remove('selected'));
      prev.classList.add('selected');
      prev.focus();
    } else if (e.key === 'Enter' && idx >= 0) {
      icons[idx].dispatchEvent(new MouseEvent('dblclick', { bubbles: true }));
    }
  });
}

function applyWallpaper(desktop) {
  const state = State.get();
  const wp = WALLPAPERS[state.wallpaper] || WALLPAPERS.default;
  desktop.style.setProperty('--wallpaper', wp);
}

function render(desktop) {
  applyWallpaper(desktop);
  clear(desktop);
  const iconsWrap = el('div', { className: 'desktop-icons' });

  for (const id of State.get().desktopIcons) {
    if (id === 'recycle') {
      iconsWrap.append(makeIcon({
        id: 'recycle',
        name: 'Papierkorb',
        icon: ICONS.recycle,
        onOpen: () => bus.emit('ui:toast', { title: 'Papierkorb', body: 'Der Papierkorb ist leer.' }),
      }));
      continue;
    }
    if (!State.isInstalled(id)) continue;
    const app = AppRegistry.get(id);
    if (!app) continue;
    iconsWrap.append(makeIcon({
      id: app.id,
      name: app.name,
      icon: app.icon,
      onOpen: () => AppRegistry.launch(app.id),
    }));
  }

  desktop.append(iconsWrap);
}

function makeIcon({ id, name, icon, onOpen }) {
  const node = el('button', {
    className: 'desktop-icon',
    type: 'button',
    dataset: { appId: id },
    title: name,
  },
    el('div', { className: 'desktop-icon-img', text: icon }),
    el('div', { className: 'desktop-icon-label', text: name })
  );

  let lastTap = 0;

  node.addEventListener('click', (e) => {
    e.stopPropagation();
    node.parentElement?.querySelectorAll('.desktop-icon.selected').forEach((n) => n.classList.remove('selected'));
    node.classList.add('selected');

    // Touch-friendly double-tap open
    const now = Date.now();
    if (now - lastTap < 350) onOpen();
    lastTap = now;
  });

  node.addEventListener('dblclick', (e) => {
    e.stopPropagation();
    onOpen();
  });

  node.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') onOpen();
  });

  node.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    e.stopPropagation();
    const pins = State.get().pinnedTaskbar;
    const pinned = pins.includes(id);
    const items = [
      { label: 'Öffnen', action: onOpen },
      { sep: true },
    ];
    if (id !== 'recycle') {
      items.push({
        label: pinned ? 'Von Taskleiste lösen' : 'An Taskleiste anheften',
        action: () => {
          if (pinned) State.update('pinnedTaskbar', pins.filter((p) => p !== id));
          else State.update('pinnedTaskbar', [...pins, id]);
          bus.emit('ui:toast', {
            title: pinned ? 'Gelöst' : 'Angeheftet',
            body: name,
          });
        },
      });
      items.push({
        label: 'Vom Desktop entfernen',
        action: () => {
          State.update('desktopIcons', State.get().desktopIcons.filter((x) => x !== id));
        },
      });
    }
    if (id !== 'recycle' && id !== 'settings' && id !== 'store' && id !== 'explorer') {
      items.push({ sep: true });
      items.push({
        label: 'Deinstallieren',
        action: () => {
          if (State.uninstallApp(id)) {
            bus.emit('ui:toast', { title: 'Deinstalliert', body: name });
          }
        },
      });
    }
    showContextMenu(e.clientX, e.clientY, items);
  });

  return node;
}
