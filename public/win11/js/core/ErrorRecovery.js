import { bus } from './EventBus.js';
import { toast } from '../utils/dom.js';

let errorCount = 0;
const MAX_AUTO = 5;

export function initErrorRecovery(bootFn) {
  window.addEventListener('error', (event) => {
    console.error('[Win11] Uncaught error:', event.error || event.message);
    handle(event.error || new Error(event.message), bootFn);
  });

  window.addEventListener('unhandledrejection', (event) => {
    console.error('[Win11] Unhandled rejection:', event.reason);
    handle(event.reason instanceof Error ? event.reason : new Error(String(event.reason)), bootFn);
  });

  bus.on('error:app', ({ appId, error }) => {
    toast('App-Fehler', `${appId}: ${error?.message || 'Unbekannter Fehler'}`);
  });

  bus.on('error:recovered', () => {
    toast('Wiederhergestellt', 'Die Oberfläche wurde automatisch repariert.');
  });
}

function handle(error, bootFn) {
  errorCount++;
  bus.emit('error:caught', { error, count: errorCount });

  const desktop = document.getElementById('desktop');
  const taskbar = document.getElementById('taskbar');
  const root = document.getElementById('app-root');

  const shellBroken = !root || !desktop || !taskbar || !document.body.contains(desktop);

  if (shellBroken && errorCount <= MAX_AUTO) {
    console.warn('[Win11] Shell broken — attempting recovery…');
    try {
      ensureShellDom();
      bootFn?.({ recovery: true });
      bus.emit('error:recovered', { error });
    } catch (e) {
      console.error('[Win11] Recovery failed', e);
      toast('Kritischer Fehler', 'Bitte Seite neu laden.');
    }
  } else if (errorCount <= MAX_AUTO) {
    // Non-shell errors: just notify once per burst
    if (errorCount <= 3) {
      toast('Fehler abgefangen', error?.message || 'Ein Fehler wurde abgefangen.');
    }
  }
}

function ensureShellDom() {
  let root = document.getElementById('app-root');
  if (!root) {
    root = document.createElement('div');
    root.id = 'app-root';
    root.className = 'app-root';
    document.body.append(root);
  }
  root.hidden = false;

  const parts = [
    ['desktop', 'desktop'],
    ['windows-layer', 'windows-layer'],
    ['taskbar', 'taskbar'],
    ['start-menu', 'start-menu'],
    ['context-menu', 'context-menu'],
    ['notification-host', 'notification-host'],
  ];

  for (const [id, cls] of parts) {
    if (!document.getElementById(id)) {
      const d = document.createElement('div');
      d.id = id;
      d.className = cls;
      if (id === 'start-menu' || id === 'context-menu') d.hidden = true;
      root.append(d);
    }
  }
}

export default { initErrorRecovery };
