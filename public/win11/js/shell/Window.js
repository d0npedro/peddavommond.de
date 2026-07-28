import { windowControlIcons } from '../utils/icons.js';

const icons = windowControlIcons();

export function createWindowElement(meta, handlers) {
  const root = document.createElement('div');
  root.className = 'window focused';
  root.dataset.windowId = meta.id;
  root.setAttribute('role', 'dialog');
  root.setAttribute('aria-label', meta.title);

  const titlebar = document.createElement('div');
  titlebar.className = 'window-titlebar';

  const iconEl = document.createElement('div');
  iconEl.className = 'window-titlebar-icon';
  iconEl.textContent = meta.icon || '📦';

  const titleEl = document.createElement('div');
  titleEl.className = 'window-title';
  titleEl.textContent = meta.title;

  const controls = document.createElement('div');
  controls.className = 'window-controls';

  const btnMin = button('window-btn min', icons.min, 'Minimieren', handlers.onMinimize);
  const btnMax = button('window-btn max', icons.max, 'Maximieren', () => {
    handlers.onMaximize();
    syncMaxButton();
  });
  const btnClose = button('window-btn close', icons.close, 'Schließen', handlers.onClose);
  controls.append(btnMin, btnMax, btnClose);

  titlebar.append(iconEl, titleEl, controls);

  const content = document.createElement('div');
  content.className = 'window-content no-pad';

  root.append(titlebar, content);

  for (const dir of ['n', 's', 'e', 'w', 'ne', 'nw', 'se', 'sw']) {
    const h = document.createElement('div');
    h.className = `resize-handle resize-${dir}`;
    h.dataset.dir = dir;
    root.append(h);
    bindResize(h, meta, handlers, dir);
  }

  root.addEventListener('mousedown', () => handlers.onFocus());

  let dragging = false;
  let sx = 0;
  let sy = 0;
  let ox = 0;
  let oy = 0;

  titlebar.addEventListener('mousedown', (e) => {
    if (e.target.closest('.window-btn')) return;
    if (e.button !== 0) return;
    handlers.onFocus();

    // Dragging while maximized: restore then drag
    if (meta.maximized) {
      const ratioX = e.clientX / window.innerWidth;
      handlers.onMaximize();
      syncMaxButton();
      const newW = meta.width;
      ox = Math.max(0, e.clientX - newW * ratioX);
      oy = Math.max(0, e.clientY - 18);
      handlers.onMove(ox, oy);
    } else {
      ox = meta.x;
      oy = meta.y;
    }

    dragging = true;
    sx = e.clientX;
    sy = e.clientY;
    root.classList.add('dragging');
    e.preventDefault();
  });

  titlebar.addEventListener('dblclick', (e) => {
    if (e.target.closest('.window-btn')) return;
    handlers.onMaximize();
    syncMaxButton();
  });

  const onMove = (e) => {
    if (!dragging) return;
    const nx = ox + (e.clientX - sx);
    const ny = oy + (e.clientY - sy);
    handlers.onMove(nx, ny);

    // Snap preview at top edge
    if (e.clientY <= 4) root.classList.add('snap-top');
    else root.classList.remove('snap-top');
  };

  const onUp = (e) => {
    if (!dragging) return;
    dragging = false;
    root.classList.remove('dragging', 'snap-top');
    // Snap maximize when released at top
    if (e.clientY <= 8 && !meta.maximized) {
      handlers.onMaximize();
      syncMaxButton();
    }
  };

  window.addEventListener('mousemove', onMove);
  window.addEventListener('mouseup', onUp);

  function syncMaxButton() {
    const maximized = meta.maximized;
    btnMax.innerHTML = maximized ? icons.restore : icons.max;
    btnMax.title = maximized ? 'Verkleinern' : 'Maximieren';
    btnMax.setAttribute('aria-label', btnMax.title);
  }

  meta._syncMaxButton = syncMaxButton;
  meta.setTitle = (text) => {
    meta.title = text;
    titleEl.textContent = text;
    root.setAttribute('aria-label', text);
  };

  return { root, content, titleEl, btnMax, syncMaxButton };
}

function button(cls, svg, label, onClick) {
  const b = document.createElement('button');
  b.className = cls;
  b.type = 'button';
  b.title = label;
  b.setAttribute('aria-label', label);
  b.innerHTML = svg;
  b.addEventListener('click', (e) => {
    e.stopPropagation();
    onClick();
  });
  return b;
}

function bindResize(handle, meta, handlers, dir) {
  let active = false;
  let sx;
  let sy;
  let sw;
  let sh;
  let ox;
  let oy;

  handle.addEventListener('mousedown', (e) => {
    if (meta.maximized) return;
    active = true;
    sx = e.clientX;
    sy = e.clientY;
    sw = meta.width;
    sh = meta.height;
    ox = meta.x;
    oy = meta.y;
    e.preventDefault();
    e.stopPropagation();
    handlers.onFocus();
  });

  window.addEventListener('mousemove', (e) => {
    if (!active) return;
    const dx = e.clientX - sx;
    const dy = e.clientY - sy;
    let w = sw;
    let h = sh;
    let x = ox;
    let y = oy;
    if (dir.includes('e')) w = sw + dx;
    if (dir.includes('s')) h = sh + dy;
    if (dir.includes('w')) {
      w = sw - dx;
      x = ox + dx;
    }
    if (dir.includes('n')) {
      h = sh - dy;
      y = oy + dy;
    }
    if (w < 280) {
      if (dir.includes('w')) x = ox + (sw - 280);
      w = 280;
    }
    if (h < 180) {
      if (dir.includes('n')) y = oy + (sh - 180);
      h = 180;
    }
    handlers.onResize(w, h, x, y);
  });

  window.addEventListener('mouseup', () => {
    active = false;
  });
}
