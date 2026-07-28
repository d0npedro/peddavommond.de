import { el, clear } from '../utils/dom.js';
import { State } from '../core/State.js';
import { bus } from '../core/EventBus.js';
import { ICONS } from '../utils/icons.js';
import { AppRegistry } from '../core/AppRegistry.js';

let flyoutOpen = false;

export function mountSystemTray(trayHost) {
  renderTray(trayHost);

  setInterval(() => updateClock(trayHost), 1000);
  bus.on('state:change', () => {
    renderTray(trayHost);
    if (flyoutOpen) renderFlyout();
  });

  bus.on('flyout:close', () => {
    flyoutOpen = false;
    document.getElementById('qs-flyout')?.remove();
  });

  document.addEventListener('mousedown', (e) => {
    if (!flyoutOpen) return;
    if (e.target.closest('#qs-flyout') || e.target.closest('[data-action="tray"]')) return;
    bus.emit('flyout:close');
  });
}

function renderTray(host) {
  const state = State.get();
  clear(host);

  const wifi = el('span', {
    className: 'tray-item',
    title: state.wifi ? 'WLAN verbunden' : 'WLAN aus',
    text: state.wifi ? ICONS.wifi : ICONS.wifiOff,
  });

  const vol = el('span', {
    className: 'tray-item',
    title: `Lautstärke ${state.volume}%`,
    text: state.volume === 0 ? ICONS.volumeMute : ICONS.volume,
  });

  const clock = el('button', {
    className: 'tray-item tray-clock',
    type: 'button',
    dataset: { action: 'tray' },
    title: 'Datum und Uhrzeit',
  });
  fillClock(clock);

  host.append(wifi, vol, clock);

  host.onclick = (e) => {
    e.stopPropagation();
    bus.emit('start:close');
    flyoutOpen = !flyoutOpen;
    if (flyoutOpen) renderFlyout();
    else document.getElementById('qs-flyout')?.remove();
  };
}

function fillClock(elClock) {
  const now = new Date();
  const time = now.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' });
  const date = now.toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' });
  elClock.innerHTML = `<span>${time}</span><span class="date">${date}</span>`;
}

function updateClock(host) {
  const clock = host.querySelector('.tray-clock');
  if (clock) fillClock(clock);
}

function renderFlyout() {
  document.getElementById('qs-flyout')?.remove();
  const state = State.get();
  const fly = el('div', { id: 'qs-flyout', className: 'flyout' });

  const grid = el('div', { className: 'qs-grid' },
    tile('WLAN', state.wifi ? ICONS.wifi : ICONS.wifiOff, state.wifi, () => State.update('wifi', !State.get().wifi)),
    tile('Bluetooth', '🅱️', state.bluetooth, () => State.update('bluetooth', !State.get().bluetooth)),
    tile('Flugmodus', '✈️', false, () => bus.emit('ui:toast', { title: 'Flugmodus', body: 'Nur Simulation' })),
    tile('Benachrichtigungen', '🔔', state.notifications, () => State.update('notifications', !State.get().notifications)),
  );

  const volRow = el('div', { className: 'qs-slider' },
    el('div', { className: 'label', style: { marginBottom: '6px', fontSize: '12px' }, text: `Lautstärke: ${state.volume}%` }),
    el('input', {
      type: 'range',
      min: 0,
      max: 100,
      value: state.volume,
      onInput: (e) => State.update('volume', Number(e.target.value)),
    })
  );

  const actions = el('div', { style: { display: 'flex', gap: '8px', marginTop: '12px' } },
    el('button', {
      className: 'btn',
      type: 'button',
      text: 'Einstellungen',
      onClick: () => {
        bus.emit('flyout:close');
        AppRegistry.launch('settings');
      },
    }),
    el('button', {
      className: 'btn',
      type: 'button',
      text: state.theme === 'dark' ? 'Hell' : 'Dunkel',
      onClick: () => {
        const next = State.get().theme === 'dark' ? 'light' : 'dark';
        State.update('theme', next);
        State.applyTheme();
      },
    })
  );

  fly.append(grid, volRow, actions);
  document.getElementById('app-root').append(fly);
}

function tile(label, icon, on, onClick) {
  return el('button', {
    className: 'qs-tile' + (on ? ' on' : ''),
    type: 'button',
    onClick,
  },
    el('span', { text: icon, style: { fontSize: '18px' } }),
    el('span', { className: 'label', text: label })
  );
}
