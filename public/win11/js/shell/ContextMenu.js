import { el, clear } from '../utils/dom.js';

export function showContextMenu(x, y, items) {
  const menu = document.getElementById('context-menu');
  clear(menu);
  menu.hidden = false;

  for (const item of items) {
    if (item.sep) {
      menu.append(el('div', { className: 'ctx-sep' }));
      continue;
    }
    const btn = el('button', {
      className: 'ctx-item',
      type: 'button',
      disabled: !!item.disabled,
      text: item.label,
    });
    btn.addEventListener('click', () => {
      hideContextMenu();
      item.action?.();
    });
    menu.append(btn);
  }

  // Position within viewport
  menu.style.left = '0px';
  menu.style.top = '0px';
  const rect = menu.getBoundingClientRect();
  const left = Math.min(x, window.innerWidth - rect.width - 8);
  const top = Math.min(y, window.innerHeight - rect.height - 8);
  menu.style.left = Math.max(8, left) + 'px';
  menu.style.top = Math.max(8, top) + 'px';
}

export function hideContextMenu() {
  const menu = document.getElementById('context-menu');
  if (menu) menu.hidden = true;
}

export function initContextMenu() {
  document.addEventListener('click', (e) => {
    if (!e.target.closest('#context-menu')) hideContextMenu();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') hideContextMenu();
  });
}
