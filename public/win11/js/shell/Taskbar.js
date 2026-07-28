import { el, clear } from '../utils/dom.js';
import { State } from '../core/State.js';
import { AppRegistry } from '../core/AppRegistry.js';
import { WindowManager } from '../core/WindowManager.js';
import { bus } from '../core/EventBus.js';
import { winLogoSvg } from '../utils/icons.js';
import { mountSystemTray } from './SystemTray.js';
import { showContextMenu } from './ContextMenu.js';

export function mountTaskbar() {
  const bar = document.getElementById('taskbar');
  render(bar);

  bus.on('window:change', () => render(bar));
  bus.on('state:change', () => render(bar));
  bus.on('store:install', () => render(bar));
  bus.on('store:uninstall', () => render(bar));
}

function render(bar) {
  clear(bar);
  const state = State.get();
  const windows = WindowManager.list();

  const center = el('div', { className: 'taskbar-center' });

  const startBtn = el('button', {
    className: 'taskbar-btn',
    type: 'button',
    title: 'Start',
    dataset: { action: 'start' },
    html: winLogoSvg(22, 'var(--accent)'),
  });
  startBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    bus.emit('start:toggle');
  });
  center.append(startBtn);

  // Search shortcut
  const searchBtn = el('button', {
    className: 'taskbar-btn',
    type: 'button',
    title: 'Suche',
  }, el('span', { className: 'icon', text: '🔍' }));
  searchBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    bus.emit('start:close');
    bus.emit('start:toggle');
    setTimeout(() => document.querySelector('#start-menu input')?.focus(), 50);
  });
  center.append(searchBtn);

  const pinned = state.pinnedTaskbar.filter((id) => id !== 'start');
  const openAppIds = [...new Set(windows.map((w) => w.appId))];
  const ordered = [...pinned];
  for (const id of openAppIds) {
    if (!ordered.includes(id) && State.isInstalled(id)) ordered.push(id);
  }

  for (const appId of ordered) {
    if (!State.isInstalled(appId)) continue;
    const app = AppRegistry.get(appId);
    if (!app) continue;

    const appWins = windows.filter((w) => w.appId === appId);
    const isOpen = appWins.length > 0;
    const isFocused = appWins.some((w) => w.focused && !w.minimized);

    const btn = el('button', {
      className: 'taskbar-btn' + (isOpen ? ' open' : '') + (isFocused ? ' focused active' : ''),
      type: 'button',
      title: app.name,
    },
      el('span', { className: 'icon', text: app.icon })
    );

    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      bus.emit('start:close');
      bus.emit('flyout:close');
      WindowManager.toggleFromTaskbar(appId, () => AppRegistry.launch(appId));
    });

    btn.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const pins = State.get().pinnedTaskbar;
      const isPinned = pins.includes(appId);
      const items = [
        { label: `${app.name} öffnen`, action: () => AppRegistry.launch(appId) },
      ];
      if (isOpen) {
        items.push({
          label: appWins.length > 1 ? 'Alle Fenster schließen' : 'Fenster schließen',
          action: () => WindowManager.closeApp(appId),
        });
      }
      items.push({ sep: true });
      items.push({
        label: isPinned ? 'Von Taskleiste lösen' : 'An Taskleiste anheften',
        action: () => {
          if (isPinned) {
            State.update('pinnedTaskbar', pins.filter((p) => p !== appId));
            bus.emit('ui:toast', { title: 'Von Taskleiste gelöst', body: app.name });
          } else {
            State.update('pinnedTaskbar', [...pins, appId]);
            bus.emit('ui:toast', { title: 'An Taskleiste angeheftet', body: app.name });
          }
        },
      });
      const onDesktop = State.get().desktopIcons.includes(appId);
      items.push({
        label: onDesktop ? 'Vom Desktop entfernen' : 'Auf Desktop legen',
        action: () => {
          const icons = State.get().desktopIcons;
          State.update(
            'desktopIcons',
            onDesktop ? icons.filter((x) => x !== appId) : [...icons, appId]
          );
        },
      });
      showContextMenu(e.clientX, e.clientY, items);
    });

    center.append(btn);
  }

  const tray = el('div', { className: 'taskbar-tray', dataset: { action: 'tray' } });
  mountSystemTray(tray);

  bar.append(center, tray);
}
