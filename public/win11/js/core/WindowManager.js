import { bus } from './EventBus.js';
import { createWindowElement } from '../shell/Window.js';

let zCounter = 100;
const windows = new Map(); // id -> meta

function nextZ() {
  return ++zCounter;
}

export const WindowManager = {
  list() {
    return [...windows.values()];
  },

  get(id) {
    return windows.get(id);
  },

  findByApp(appId) {
    return [...windows.values()].filter((w) => w.appId === appId);
  },

  open({ appId, title, icon, mount, width = 820, height = 560, singleInstance = false }) {
    if (singleInstance) {
      const existing = this.findByApp(appId).find((w) => !w.closed);
      if (existing) {
        this.restore(existing.id);
        this.focus(existing.id);
        return existing;
      }
    }

    const id = 'win_' + Math.random().toString(36).slice(2, 9);
    const openCount = windows.size;
    const x = 48 + (openCount % 8) * 28;
    const y = 32 + (openCount % 8) * 28;

    const meta = {
      id,
      appId,
      title,
      icon,
      x,
      y,
      width,
      height,
      maximized: false,
      minimized: false,
      focused: true,
      closed: false,
      z: nextZ(),
      mount,
      el: null,
      contentEl: null,
      preMax: null,
    };

    const { root, content } = createWindowElement(meta, {
      onFocus: () => this.focus(id),
      onClose: () => this.close(id),
      onMinimize: () => this.minimize(id),
      onMaximize: () => this.toggleMaximize(id),
      onMove: (nx, ny) => this.move(id, nx, ny),
      onResize: (nw, nh, nx, ny) => this.resize(id, nw, nh, nx, ny),
    });

    meta.el = root;
    meta.contentEl = content;
    windows.set(id, meta);

    const layer = document.getElementById('windows-layer');
    layer.append(root);
    this._applyGeometry(meta);
    this.focus(id);

    try {
      mount(content, meta);
    } catch (err) {
      console.error('App mount failed', err);
      content.innerHTML = '';
      const box = document.createElement('div');
      box.className = 'app-error';
      box.innerHTML = `<h3>App konnte nicht geladen werden</h3><p>${err.message}</p>`;
      const btn = document.createElement('button');
      btn.textContent = 'Erneut versuchen';
      btn.onclick = () => {
        content.innerHTML = '';
        try {
          mount(content, meta);
        } catch (e2) {
          bus.emit('error:app', { appId, error: e2 });
        }
      };
      box.append(btn);
      content.append(box);
      bus.emit('error:app', { appId, error: err });
    }

    bus.emit('window:open', meta);
    bus.emit('window:change');
    return meta;
  },

  _applyGeometry(meta) {
    const el = meta.el;
    if (!el) return;
    if (meta.maximized) {
      el.classList.add('maximized');
      el.style.left = '0';
      el.style.top = '0';
      el.style.width = '100%';
      el.style.height = '100%';
    } else {
      el.classList.remove('maximized');
      el.style.left = meta.x + 'px';
      el.style.top = meta.y + 'px';
      el.style.width = meta.width + 'px';
      el.style.height = meta.height + 'px';
    }
    el.style.zIndex = String(meta.z);
    el.classList.toggle('minimized', meta.minimized);
    el.classList.toggle('focused', meta.focused);
  },

  focus(id) {
    for (const w of windows.values()) {
      w.focused = w.id === id;
      if (w.el) w.el.classList.toggle('focused', w.focused);
    }
    const meta = windows.get(id);
    if (!meta || meta.closed) return;
    meta.z = nextZ();
    meta.el.style.zIndex = String(meta.z);
    if (meta.minimized) this.restore(id);
    bus.emit('window:focus', meta);
    bus.emit('window:change');
  },

  move(id, x, y) {
    const meta = windows.get(id);
    if (!meta || meta.maximized) return;
    meta.x = Math.max(-meta.width + 80, x);
    meta.y = Math.max(0, y);
    this._applyGeometry(meta);
  },

  resize(id, width, height, x, y) {
    const meta = windows.get(id);
    if (!meta || meta.maximized) return;
    meta.width = Math.max(280, width);
    meta.height = Math.max(180, height);
    if (typeof x === 'number') meta.x = x;
    if (typeof y === 'number') meta.y = y;
    this._applyGeometry(meta);
  },

  minimize(id) {
    const meta = windows.get(id);
    if (!meta) return;
    meta.minimized = true;
    meta.focused = false;
    this._applyGeometry(meta);
    bus.emit('window:minimize', meta);
    bus.emit('window:change');
  },

  restore(id) {
    const meta = windows.get(id);
    if (!meta) return;
    meta.minimized = false;
    this._applyGeometry(meta);
    bus.emit('window:restore', meta);
    bus.emit('window:change');
  },

  toggleMaximize(id) {
    const meta = windows.get(id);
    if (!meta) return;
    if (!meta.maximized) {
      meta.preMax = { x: meta.x, y: meta.y, width: meta.width, height: meta.height };
      meta.maximized = true;
    } else {
      meta.maximized = false;
      if (meta.preMax) {
        Object.assign(meta, meta.preMax);
        meta.preMax = null;
      }
    }
    this._applyGeometry(meta);
    meta._syncMaxButton?.();
    bus.emit('window:maximize', meta);
    bus.emit('window:change');
  },

  close(id) {
    const meta = windows.get(id);
    if (!meta) return;
    meta.closed = true;
    meta.el?.remove();
    windows.delete(id);
    bus.emit('window:close', meta);
    bus.emit('window:change');
  },

  closeApp(appId) {
    for (const w of this.findByApp(appId)) this.close(w.id);
  },

  toggleFromTaskbar(appId, launchFn) {
    const open = this.findByApp(appId);
    if (!open.length) {
      launchFn();
      return;
    }
    const focused = open.find((w) => w.focused && !w.minimized);
    if (focused) {
      this.minimize(focused.id);
    } else {
      const target = open.find((w) => w.minimized) || open[0];
      this.restore(target.id);
      this.focus(target.id);
    }
  },
};

export default WindowManager;
