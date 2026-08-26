import { bus } from './EventBus.js';
import { EXAMPLE_APP_IDS } from '../apps/examples-apps.js';

/** Separate key so peddavommond desktop state ≠ lab browser-win-11 */
const STORAGE_KEY = 'pvm-win11-state-v1';

const DEFAULT = {
  theme: 'dark',
  accent: '#0078d4',
  wallpaper: 'night',
  volume: 60,
  wifi: true,
  bluetooth: false,
  notifications: true,
  location: false,
  camera: true,
  microphone: true,
  diagnostics: false,
  installedApps: [
    'settings', 'store', 'explorer', 'word', 'excel',
    'solitaire', 'minesweeper', 'tictactoe', 'calculator', 'music',
    'paint', 'terminal', 'weather',
    'slotmachine', 'musicfestival', 'examples', 'soundcloud', 'soundcloud-hub', 'spotify', 'youtube',
    'twitch', 'facebook', 'linkedin', 'timetofly', 'story',
    'multiagent', 'github', 'peddabot', 'verschenkemusik', 'code', 'moeglichkeitensystem',
  ],
  pinnedTaskbar: ['start', 'explorer', 'moeglichkeitensystem', 'slotmachine', 'soundcloud', 'music', 'settings'],
  desktopIcons: [
    'explorer', 'recycle', 'moeglichkeitensystem', 'slotmachine', 'musicfestival', 'examples',
    ...EXAMPLE_APP_IDS,
    'soundcloud',
    'timetofly', 'multiagent', 'github', 'music', 'settings',
  ],
  userName: 'Pedda',
};

function load() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...DEFAULT };
    return { ...DEFAULT, ...JSON.parse(raw) };
  } catch {
    return { ...DEFAULT };
  }
}

function save(state) {
  try {
    const { _dirty, ...persist } = state;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(persist));
  } catch (e) {
    console.warn('State save failed', e);
  }
}

let state = load();

export const State = {
  get() {
    return state;
  },

  getKey(key) {
    return state[key];
  },

  set(patch) {
    state = { ...state, ...patch };
    save(state);
    bus.emit('state:change', { patch, state });
    for (const key of Object.keys(patch)) {
      bus.emit(`state:${key}`, state[key]);
    }
    return state;
  },

  update(key, value) {
    return this.set({ [key]: value });
  },

  isInstalled(appId) {
    return state.installedApps.includes(appId);
  },

  installApp(appId) {
    if (this.isInstalled(appId)) return;
    const installedApps = [...state.installedApps, appId];
    const desktopIcons = state.desktopIcons.includes(appId)
      ? state.desktopIcons
      : [...state.desktopIcons, appId];
    this.set({ installedApps, desktopIcons });
    bus.emit('store:install', appId);
  },

  uninstallApp(appId) {
    const protectedApps = ['settings', 'store', 'explorer'];
    if (protectedApps.includes(appId)) return false;
    this.set({
      installedApps: state.installedApps.filter((id) => id !== appId),
      pinnedTaskbar: state.pinnedTaskbar.filter((id) => id !== appId),
      desktopIcons: state.desktopIcons.filter((id) => id !== appId),
    });
    bus.emit('store:uninstall', appId);
    return true;
  },

  reset() {
    state = { ...DEFAULT };
    save(state);
    bus.emit('state:change', { patch: state, state });
    bus.emit('state:reset');
  },

  applyTheme() {
    document.documentElement.dataset.theme = state.theme;
    document.documentElement.style.setProperty('--accent', state.accent);
    document.documentElement.style.setProperty('--accent-hover', shade(state.accent, -12));
    document.documentElement.style.setProperty('--accent-press', shade(state.accent, -24));
  },
};

function shade(hex, percent) {
  const n = hex.replace('#', '');
  const num = parseInt(n.length === 3 ? n.split('').map((c) => c + c).join('') : n, 16);
  let r = (num >> 16) + Math.round(2.55 * percent);
  let g = ((num >> 8) & 0xff) + Math.round(2.55 * percent);
  let b = (num & 0xff) + Math.round(2.55 * percent);
  r = Math.max(0, Math.min(255, r));
  g = Math.max(0, Math.min(255, g));
  b = Math.max(0, Math.min(255, b));
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
}

export const WALLPAPERS = {
  default: 'linear-gradient(160deg, #0c4a6e 0%, #075985 40%, #0369a1 70%, #0ea5e9 100%)',
  bloom: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
  sunrise: 'linear-gradient(160deg, #ff9a9e 0%, #fad0c4 50%, #fad0c4 100%)',
  forest: 'linear-gradient(160deg, #134e4a 0%, #0f766e 40%, #14b8a6 100%)',
  night: 'linear-gradient(160deg, #0f172a 0%, #1e3a5f 50%, #312e81 100%)',
  glow: 'radial-gradient(ellipse at 30% 20%, #38bdf8 0%, transparent 50%), radial-gradient(ellipse at 70% 80%, #a78bfa 0%, transparent 50%), #0c4a6e',
  abstract: 'linear-gradient(45deg, #ff6b6b, #feca57, #48dbfb, #ff9ff3)',
};

export default State;
