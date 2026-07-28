import { el } from '../utils/dom.js';

export function mountPaint(host) {
  const wrap = el('div', {
    style: {
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      background: 'var(--bg-card)',
    },
  });

  let color = '#000000';
  let size = 4;
  let drawing = false;

  const toolbar = el('div', {
    className: 'excel-toolbar',
  });

  const colorInput = el('input', { type: 'color', value: color, onInput: (e) => { color = e.target.value; } });
  const sizeInput = el('input', {
    type: 'range', min: 1, max: 40, value: size,
    onInput: (e) => { size = Number(e.target.value); },
  });
  const clearBtn = el('button', {
    className: 'btn',
    type: 'button',
    text: 'Löschen',
    onClick: () => {
      const ctx = canvas.getContext('2d');
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    },
  });

  toolbar.append(
    el('span', { text: 'Farbe' }), colorInput,
    el('span', { text: 'Stärke', style: { marginLeft: '8px' } }), sizeInput,
    clearBtn
  );

  const canvas = el('canvas', {
    style: {
      flex: '1',
      width: '100%',
      cursor: 'crosshair',
      background: '#fff',
      touchAction: 'none',
    },
  });

  wrap.append(toolbar, canvas);
  host.append(wrap);

  function resize() {
    const rect = canvas.getBoundingClientRect();
    const tmp = document.createElement('canvas');
    tmp.width = canvas.width;
    tmp.height = canvas.height;
    tmp.getContext('2d').drawImage(canvas, 0, 0);
    canvas.width = Math.max(300, rect.width);
    canvas.height = Math.max(200, rect.height);
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(tmp, 0, 0);
  }

  requestAnimationFrame(resize);

  function pos(e) {
    const r = canvas.getBoundingClientRect();
    const src = e.touches ? e.touches[0] : e;
    return { x: src.clientX - r.left, y: src.clientY - r.top };
  }

  function draw(e) {
    if (!drawing) return;
    const ctx = canvas.getContext('2d');
    const p = pos(e);
    ctx.lineWidth = size;
    ctx.lineCap = 'round';
    ctx.strokeStyle = color;
    ctx.lineTo(p.x, p.y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(p.x, p.y);
  }

  canvas.addEventListener('mousedown', (e) => {
    drawing = true;
    const ctx = canvas.getContext('2d');
    const p = pos(e);
    ctx.beginPath();
    ctx.moveTo(p.x, p.y);
  });
  canvas.addEventListener('mousemove', draw);
  window.addEventListener('mouseup', () => {
    drawing = false;
    canvas.getContext('2d').beginPath();
  });

  canvas.addEventListener('touchstart', (e) => {
    e.preventDefault();
    drawing = true;
    const ctx = canvas.getContext('2d');
    const p = pos(e);
    ctx.beginPath();
    ctx.moveTo(p.x, p.y);
  }, { passive: false });
  canvas.addEventListener('touchmove', (e) => {
    e.preventDefault();
    draw(e);
  }, { passive: false });
  canvas.addEventListener('touchend', () => {
    drawing = false;
    canvas.getContext('2d').beginPath();
  });
}
