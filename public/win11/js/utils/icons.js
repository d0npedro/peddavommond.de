/** App icons as emoji / SVG snippets for simplicity & offline use */

export const ICONS = {
  start: '🪟',
  settings: '⚙️',
  store: '🛍️',
  explorer: '📁',
  word: '📄',
  excel: '📊',
  solitaire: '🃏',
  minesweeper: '💣',
  tictactoe: '⭕',
  calculator: '🧮',
  music: '🎵',
  notepad: '📝',
  recycle: '🗑️',
  folder: '📂',
  file: '📃',
  image: '🖼️',
  music: '🎵',
  pc: '💻',
  download: '⬇️',
  documents: '📑',
  pictures: '🖼️',
  wifi: '📶',
  wifiOff: '📴',
  volume: '🔊',
  volumeMute: '🔇',
  battery: '🔋',
  power: '⏻',
  user: '👤',
  search: '🔍',
};

export function winLogoSvg(size = 22, color = 'currentColor') {
  return `<svg class="taskbar-start-icon" width="${size}" height="${size}" viewBox="0 0 88 88" fill="${color}" aria-hidden="true">
    <rect x="0" y="0" width="40" height="40" rx="2"/>
    <rect x="48" y="0" width="40" height="40" rx="2"/>
    <rect x="0" y="48" width="40" height="40" rx="2"/>
    <rect x="48" y="48" width="40" height="40" rx="2"/>
  </svg>`;
}

export function windowControlIcons() {
  return {
    min: `<svg viewBox="0 0 10 10"><rect y="4.5" width="10" height="1"/></svg>`,
    max: `<svg viewBox="0 0 10 10"><rect x="0.5" y="0.5" width="9" height="9" fill="none" stroke="currentColor" stroke-width="1"/></svg>`,
    restore: `<svg viewBox="0 0 10 10"><rect x="2.5" y="0.5" width="7" height="7" fill="none" stroke="currentColor" stroke-width="1"/><rect x="0.5" y="2.5" width="7" height="7" fill="none" stroke="currentColor" stroke-width="1"/></svg>`,
    close: `<svg viewBox="0 0 10 10"><path d="M1 1l8 8M9 1L1 9" stroke="currentColor" stroke-width="1.2"/></svg>`,
  };
}
