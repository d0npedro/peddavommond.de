import { el, clear } from '../utils/dom.js';
import { State, WALLPAPERS } from '../core/State.js';
import { AppRegistry } from '../core/AppRegistry.js';
import { bus } from '../core/EventBus.js';
import { FileSystem } from '../core/FileSystem.js';
import { WindowManager } from '../core/WindowManager.js';

const SECTIONS = [
  { id: 'system', label: 'System', icon: '🖥️', keywords: 'info speicher gerät name volume' },
  { id: 'personalization', label: 'Personalisierung', icon: '🎨', keywords: 'theme farbe wallpaper hintergrund dunkel hell akzent' },
  { id: 'apps', label: 'Apps', icon: '📦', keywords: 'programme installiert deinstallieren store' },
  { id: 'privacy', label: 'Datenschutz', icon: '🔒', keywords: 'kamera mikrofon standort diagnose sicherheit' },
];

const ACCENTS = ['#0078d4', '#8764b8', '#038387', '#00cc6a', '#e3008c', '#c239b3', '#ea005e', '#d13438', '#ff8c00', '#567c73'];

export function mountSettings(host, meta, opts = {}) {
  let section = opts.section || 'system';
  let search = '';

  const shell = el('div', { className: 'app-shell' });
  const nav = el('div', { className: 'app-nav' });
  const main = el('div', { className: 'app-main' });
  shell.append(nav, main);
  host.append(shell);

  function renderNav() {
    clear(nav);
    nav.append(el('div', { style: { fontWeight: 700, padding: '8px 12px 12px', fontSize: '18px' }, text: 'Einstellungen' }));

    const searchInput = el('input', {
      type: 'search',
      placeholder: 'Einstellungen durchsuchen',
      value: search,
      style: {
        width: 'calc(100% - 16px)',
        margin: '0 8px 12px',
        padding: '8px 10px',
        borderRadius: '20px',
        border: '1px solid var(--border)',
        background: 'var(--bg-card)',
        outline: 'none',
      },
    });
    searchInput.addEventListener('input', () => {
      search = searchInput.value;
      renderNav();
    });
    nav.append(searchInput);

    const q = search.trim().toLowerCase();
    const sections = SECTIONS.filter((s) =>
      !q || s.label.toLowerCase().includes(q) || s.keywords.includes(q) || s.id.includes(q)
    );

    for (const s of sections) {
      const btn = el('button', {
        className: 'app-nav-item' + (section === s.id ? ' active' : ''),
        type: 'button',
      },
        el('span', { text: s.icon }),
        el('span', { text: s.label })
      );
      btn.onclick = () => {
        section = s.id;
        paint();
      };
      nav.append(btn);
    }

    if (!sections.length) {
      nav.append(el('div', {
        style: { padding: '12px', color: 'var(--text-secondary)', fontSize: '12px' },
        text: 'Keine Kategorie gefunden',
      }));
    }
  }

  function paint() {
    renderNav();
    clear(main);
    if (section === 'system') renderSystem(main);
    else if (section === 'personalization') renderPersonalization(main);
    else if (section === 'apps') renderApps(main);
    else if (section === 'privacy') renderPrivacy(main);
    meta?.setTitle?.(`Einstellungen — ${SECTIONS.find((s) => s.id === section)?.label || ''}`);
  }

  bus.on('state:change', () => paint());
  paint();
}

function storageEstimate() {
  try {
    let total = 0;
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      total += (k?.length || 0) + (localStorage.getItem(k)?.length || 0);
    }
    return `${(total / 1024).toFixed(1)} KB localStorage`;
  } catch {
    return 'n/v';
  }
}

function renderSystem(main) {
  const s = State.get();
  const openWins = WindowManager.list().length;

  main.append(
    el('h2', { text: 'System' }),
    el('p', { className: 'subtitle', text: 'Anzeige, Info und Geräteverhalten' }),
    el('div', { className: 'card' },
      row('Gerätename', 'WIN11-SIM-PC', null),
      row('Prozessor', navigator.hardwareConcurrency
        ? `${navigator.hardwareConcurrency} Kerne (Host)`
        : 'Browser Engine', null),
      row('Plattform', navigator.platform || 'Web', null),
      row('Browser', navigator.userAgent.split(' ').slice(-2).join(' '), null),
      row('Offene Fenster', String(openWins), null),
      row('Lokaler Speicher', storageEstimate(), null),
    ),
    el('div', { className: 'card' },
      row('Benutzername', 'Wird im Startmenü angezeigt', el('input', {
        type: 'text',
        value: s.userName,
        style: fieldStyle(),
        onChange: (e) => State.update('userName', e.target.value || 'Benutzer'),
      })),
      row('Lautstärke', `${s.volume}%`, el('input', {
        type: 'range',
        min: 0,
        max: 100,
        value: s.volume,
        style: { width: '140px', accentColor: 'var(--accent)' },
        onInput: (e) => State.update('volume', Number(e.target.value)),
      })),
      row('WLAN', s.wifi ? 'Verbunden (simuliert)' : 'Aus', toggle(s.wifi, (v) => State.update('wifi', v))),
      row('Benachrichtigungen', 'Toasts im Systemtray', toggle(s.notifications, (v) => State.update('notifications', v))),
    ),
    el('div', { className: 'card' },
      row('Virtuelles Dateisystem zurücksetzen', 'Demo-Dateien wiederherstellen', el('button', {
        className: 'btn',
        type: 'button',
        text: 'Zurücksetzen',
        onClick: () => {
          if (!confirm('Dateisystem auf Demo-Inhalt zurücksetzen?')) return;
          FileSystem.reset();
          bus.emit('ui:toast', { title: 'Dateisystem', body: 'Zurückgesetzt auf Demo-Inhalt' });
        },
      })),
      row('Alle Einstellungen zurücksetzen', 'Theme, Apps, Pins', el('button', {
        className: 'btn btn-danger',
        type: 'button',
        text: 'Reset',
        onClick: () => {
          if (confirm('Alle Einstellungen zurücksetzen?')) {
            State.reset();
            State.applyTheme();
            bus.emit('ui:toast', { title: 'Einstellungen', body: 'Auf Standard zurückgesetzt' });
          }
        },
      })),
    ),
  );
}

function renderPersonalization(main) {
  const s = State.get();
  main.append(
    el('h2', { text: 'Personalisierung' }),
    el('p', { className: 'subtitle', text: 'Hintergrund, Farben und Design' }),
  );

  main.append(el('div', { className: 'card' },
    el('div', { style: { fontWeight: 600, marginBottom: '12px' }, text: 'Modus' }),
    el('div', { style: { display: 'flex', gap: '8px', flexWrap: 'wrap' } },
      el('button', {
        className: 'btn' + (s.theme === 'light' ? ' btn-primary' : ''),
        type: 'button',
        text: '☀ Hell',
        onClick: () => { State.update('theme', 'light'); State.applyTheme(); },
      }),
      el('button', {
        className: 'btn' + (s.theme === 'dark' ? ' btn-primary' : ''),
        type: 'button',
        text: '🌙 Dunkel',
        onClick: () => { State.update('theme', 'dark'); State.applyTheme(); },
      }),
    )
  ));

  main.append(el('div', { className: 'card' },
    el('div', { style: { fontWeight: 600, marginBottom: '12px' }, text: 'Akzentfarbe' }),
    el('div', { className: 'color-swatches' },
      ...ACCENTS.map((c) => el('button', {
        className: 'swatch' + (s.accent === c ? ' active' : ''),
        type: 'button',
        style: { background: c },
        title: c,
        onClick: () => { State.update('accent', c); State.applyTheme(); },
      }))
    ),
    el('div', { style: { marginTop: '12px', display: 'flex', alignItems: 'center', gap: '10px' } },
      el('label', { text: 'Eigene Farbe', style: { fontSize: '12px', color: 'var(--text-secondary)' } }),
      el('input', {
        type: 'color',
        value: s.accent,
        onInput: (e) => { State.update('accent', e.target.value); State.applyTheme(); },
      })
    )
  ));

  main.append(el('div', { className: 'card' },
    el('div', { style: { fontWeight: 600, marginBottom: '12px' }, text: 'Hintergrundbild' }),
    el('div', { className: 'wallpaper-grid' },
      ...Object.entries(WALLPAPERS).map(([id, css]) => el('button', {
        className: 'wallpaper-opt' + (s.wallpaper === id ? ' active' : ''),
        type: 'button',
        style: { background: css },
        title: id,
        onClick: () => State.update('wallpaper', id),
      }))
    )
  ));
}

function renderApps(main) {
  main.append(
    el('h2', { text: 'Apps' }),
    el('p', { className: 'subtitle', text: `${AppRegistry.installed().length} installierte Anwendungen` }),
  );

  const list = el('div', { className: 'card' });
  for (const app of AppRegistry.installed().sort((a, b) => a.name.localeCompare(b.name, 'de'))) {
    const pins = State.get().pinnedTaskbar;
    const pinned = pins.includes(app.id);
    const onDesktop = State.get().desktopIcons.includes(app.id);

    const actions = el('div', { style: { display: 'flex', gap: '6px', flexWrap: 'wrap' } },
      el('button', {
        className: 'btn',
        type: 'button',
        text: 'Öffnen',
        onClick: () => AppRegistry.launch(app.id),
      }),
      el('button', {
        className: 'btn',
        type: 'button',
        text: pinned ? 'Lösen' : 'Anheften',
        onClick: () => {
          State.update(
            'pinnedTaskbar',
            pinned ? pins.filter((p) => p !== app.id) : [...pins, app.id]
          );
        },
      }),
      el('button', {
        className: 'btn',
        type: 'button',
        text: onDesktop ? 'Desktop −' : 'Desktop +',
        onClick: () => {
          const icons = State.get().desktopIcons;
          State.update(
            'desktopIcons',
            onDesktop ? icons.filter((x) => x !== app.id) : [...icons, app.id]
          );
        },
      }),
    );

    if (app.installable !== false && !['settings', 'store', 'explorer'].includes(app.id)) {
      actions.append(el('button', {
        className: 'btn',
        type: 'button',
        text: 'Deinstallieren',
        onClick: () => {
          if (State.uninstallApp(app.id)) {
            bus.emit('ui:toast', { title: 'Deinstalliert', body: app.name });
          }
        },
      }));
    }

    list.append(row(`${app.icon} ${app.name}`, app.description || app.id, actions));
  }
  main.append(list);

  main.append(el('button', {
    className: 'btn btn-primary',
    type: 'button',
    text: 'Microsoft Store öffnen',
    style: { marginTop: '8px' },
    onClick: () => AppRegistry.launch('store'),
  }));
}

function renderPrivacy(main) {
  const s = State.get();
  main.append(
    el('h2', { text: 'Datenschutz & Sicherheit' }),
    el('p', { className: 'subtitle', text: 'Berechtigungen (simuliert — keine echten Gerätezugriffe)' }),
    el('div', { className: 'card' },
      row('Standort', 'Apps dürfen den Standort nutzen', toggle(s.location, (v) => State.update('location', v))),
      row('Kamera', 'Kamerazugriff für Apps', toggle(s.camera, (v) => State.update('camera', v))),
      row('Mikrofon', 'Mikrofonzugriff für Apps', toggle(s.microphone, (v) => State.update('microphone', v))),
      row('Diagnosedaten', 'Optionale Diagnosedaten senden', toggle(s.diagnostics, (v) => State.update('diagnostics', v))),
      row('Bluetooth', 'Geräte in der Nähe', toggle(s.bluetooth, (v) => State.update('bluetooth', v))),
    ),
    el('div', { className: 'card' },
      el('p', {
        style: { fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.5' },
        text: 'Hinweis: Diese Simulation speichert Einstellungen und Dateien nur lokal in localStorage deines Browsers. Es werden keine Daten an Server gesendet.',
      })
    ),
  );
}

function fieldStyle() {
  return {
    padding: '6px 10px',
    borderRadius: '4px',
    border: '1px solid var(--border)',
    background: 'var(--bg-card)',
    width: '180px',
  };
}

function row(title, meta, control) {
  return el('div', { className: 'card-row' },
    el('div', {},
      el('div', { text: title }),
      meta ? el('div', { className: 'meta', text: meta }) : null
    ),
    control || el('span', {})
  );
}

function toggle(checked, onChange) {
  const label = el('label', { className: 'toggle' });
  const input = el('input', { type: 'checkbox', checked });
  input.addEventListener('change', () => onChange(input.checked));
  label.append(input, el('span'));
  return label;
}
