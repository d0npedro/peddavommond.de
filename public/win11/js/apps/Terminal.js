import { el } from '../utils/dom.js';
import { State } from '../core/State.js';
import { AppRegistry } from '../core/AppRegistry.js';

export function mountTerminal(host) {
  const wrap = el('div', {
    className: 'selectable',
    style: {
      height: '100%',
      background: '#0c0c0c',
      color: '#cccccc',
      fontFamily: 'var(--font-mono)',
      fontSize: '13px',
      display: 'flex',
      flexDirection: 'column',
      padding: '8px 12px',
    },
  });

  const out = el('div', {
    style: { flex: 1, overflow: 'auto', whiteSpace: 'pre-wrap', marginBottom: '8px' },
  });

  const line = el('div', {
    style: { display: 'flex', gap: '8px', alignItems: 'center' },
  });
  const prompt = el('span', { text: 'PS C:\\Users\\Benutzer>', style: { color: '#3b78ff', flexShrink: 0 } });
  const input = el('input', {
    type: 'text',
    style: {
      flex: 1,
      background: 'transparent',
      border: 'none',
      outline: 'none',
      color: '#cccccc',
      font: 'inherit',
    },
    spellcheck: false,
    autocomplete: 'off',
  });
  line.append(prompt, input);
  wrap.append(out, line);
  host.append(wrap);
  input.focus();

  function print(text) {
    out.textContent += text + '\n';
    out.scrollTop = out.scrollHeight;
  }

  print('Windows PowerShell Simulation');
  print('Tippe "help" für Befehle.\n');

  const history = [];
  let histIdx = -1;

  input.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (!history.length) return;
      histIdx = Math.min(history.length - 1, histIdx + 1);
      input.value = history[history.length - 1 - histIdx] || '';
      return;
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      histIdx = Math.max(-1, histIdx - 1);
      input.value = histIdx < 0 ? '' : history[history.length - 1 - histIdx] || '';
      return;
    }
    if (e.key !== 'Enter') return;
    const cmd = input.value.trim();
    print(`PS C:\\Users\\Benutzer> ${cmd}`);
    input.value = '';
    histIdx = -1;
    if (cmd) history.push(cmd);
    run(cmd);
  });

  function run(cmd) {
    const [base, ...args] = cmd.split(/\s+/);
    const c = (base || '').toLowerCase();
    if (!c) return;
    if (c === 'help') {
      print('Befehle: help, clear, date, whoami, echo, apps, open <app>, theme, ver, cls');
    } else if (c === 'clear' || c === 'cls') {
      out.textContent = '';
    } else if (c === 'date') {
      print(new Date().toString());
    } else if (c === 'whoami') {
      print(State.get().userName || 'Benutzer');
    } else if (c === 'echo') {
      print(args.join(' '));
    } else if (c === 'apps') {
      print(AppRegistry.installed().map((a) => a.id).join(', '));
    } else if (c === 'open') {
      const id = args[0];
      if (!id) print('Usage: open <appId>');
      else {
        AppRegistry.launch(id);
        print(`Opening ${id}…`);
      }
    } else if (c === 'theme') {
      const next = State.get().theme === 'dark' ? 'light' : 'dark';
      State.update('theme', next);
      State.applyTheme();
      print(`Theme: ${next}`);
    } else if (c === 'ver') {
      print('Microsoft Windows [Version 11.0.Sim.1]');
    } else {
      print(`Der Befehl "${base}" ist entweder falsch geschrieben oder konnte nicht gefunden werden.`);
    }
  }

  wrap.addEventListener('click', () => input.focus());
}
