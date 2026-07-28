import { el } from '../utils/dom.js';
import { bus } from '../core/EventBus.js';

/**
 * Mount an external or internal URL inside a window (iframe),
 * with fallback if the target blocks embedding.
 */
export function mountExternalApp(host, meta, opts = {}) {
  const url = opts.url || opts.href || 'about:blank';
  const title = opts.title || meta?.title || 'App';
  const allow = opts.allow || 'autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture';

  const wrap = el('div', {
    className: 'external-app',
    style: {
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      minHeight: 0,
      background: 'var(--bg-card)',
    },
  });

  const bar = el('div', {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      padding: '6px 10px',
      borderBottom: '1px solid var(--border)',
      background: 'var(--bg-solid)',
      flexShrink: 0,
    },
  });

  const urlLabel = el('div', {
    style: {
      flex: 1,
      minWidth: 0,
      fontSize: '12px',
      color: 'var(--text-secondary)',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      fontFamily: 'var(--font-mono)',
    },
    text: url,
  });

  const openBtn = el('button', {
    className: 'btn btn-primary',
    type: 'button',
    text: 'Im Tab öffnen',
    onClick: () => window.open(url, '_blank', 'noopener,noreferrer'),
  });

  bar.append(urlLabel, openBtn);

  const frameWrap = el('div', {
    style: { flex: 1, minHeight: 0, position: 'relative' },
  });

  const iframe = el('iframe', {
    src: url,
    title,
    allow,
    referrerPolicy: 'no-referrer-when-downgrade',
    style: {
      width: '100%',
      height: '100%',
      border: '0',
      display: 'block',
      background: '#fff',
    },
  });

  // Some sites refuse iframe — show hint after a short delay if still blank-looking
  const hint = el('div', {
    className: 'external-app-hint',
    style: {
      display: 'none',
      position: 'absolute',
      inset: 0,
      placeItems: 'center',
      textAlign: 'center',
      padding: '24px',
      background: 'var(--bg-card)',
      color: 'var(--text)',
      zIndex: 2,
    },
  },
    el('p', { style: { marginBottom: '12px', maxWidth: '360px' }, text: 'Diese App lässt sich möglicherweise nicht einbetten (X-Frame-Options).' }),
    el('button', {
      className: 'btn btn-primary',
      type: 'button',
      text: 'Trotzdem im neuen Tab öffnen',
      onClick: () => window.open(url, '_blank', 'noopener,noreferrer'),
    }),
  );

  iframe.addEventListener('error', () => {
    hint.style.display = 'grid';
  });

  // Optional: double-click title opens external (handled by bar button)
  if (opts.openExternal) {
    window.open(url, '_blank', 'noopener,noreferrer');
    bus.emit('ui:toast', { title: title, body: 'Im neuen Tab geöffnet' });
  }

  frameWrap.append(iframe, hint);
  wrap.append(bar, frameWrap);
  host.append(wrap);

  meta?.setTitle?.(title);
}

/** Convenience: open only in new tab (no iframe) */
export function mountOpenExternal(host, meta, opts = {}) {
  const url = opts.url || opts.href;
  const title = opts.title || meta?.title || 'Link';

  const wrap = el('div', {
    className: 'app-error',
    style: { height: '100%' },
  },
    el('h3', { text: title }),
    el('p', { text: 'Diese App öffnet sich in einem neuen Browser-Tab.' }),
    el('button', {
      className: 'btn btn-primary',
      type: 'button',
      text: 'Jetzt öffnen',
      onClick: () => window.open(url, '_blank', 'noopener,noreferrer'),
    }),
  );
  host.append(wrap);

  if (url) {
    window.open(url, '_blank', 'noopener,noreferrer');
  }
  meta?.setTitle?.(title);
}
