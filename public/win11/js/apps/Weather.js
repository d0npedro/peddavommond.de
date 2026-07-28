import { el } from '../utils/dom.js';

const CITIES = {
  Berlin: { temp: 18, cond: 'Teilweise bewölkt', icon: '⛅', hum: 62, wind: 14 },
  München: { temp: 16, cond: 'Leichter Regen', icon: '🌧️', hum: 78, wind: 10 },
  Hamburg: { temp: 15, cond: 'Bewölkt', icon: '☁️', hum: 80, wind: 22 },
  Wien: { temp: 21, cond: 'Sonnig', icon: '☀️', hum: 45, wind: 8 },
  Zürich: { temp: 17, cond: 'Wechselhaft', icon: '🌤️', hum: 55, wind: 12 },
};

export function mountWeather(host) {
  let city = 'Berlin';

  const wrap = el('div', {
    style: {
      height: '100%',
      padding: '24px',
      background: 'linear-gradient(160deg, #0ea5e9, #6366f1)',
      color: '#fff',
      overflow: 'auto',
    },
  });

  function paint() {
    wrap.innerHTML = '';
    const data = CITIES[city];
    const select = el('select', {
      style: {
        padding: '8px 12px',
        borderRadius: '8px',
        border: 'none',
        marginBottom: '20px',
        background: 'rgba(255,255,255,0.9)',
        color: '#111',
      },
      onChange: (e) => { city = e.target.value; paint(); },
    });
    for (const name of Object.keys(CITIES)) {
      const opt = el('option', { value: name, text: name });
      if (name === city) opt.selected = true;
      select.append(opt);
    }

    wrap.append(
      select,
      el('div', { style: { fontSize: '18px', opacity: 0.9 }, text: city }),
      el('div', { style: { fontSize: '64px', margin: '8px 0' }, text: data.icon }),
      el('div', { style: { fontSize: '56px', fontWeight: 300 }, text: `${data.temp}°` }),
      el('div', { style: { fontSize: '20px', marginBottom: '24px' }, text: data.cond }),
      el('div', {
        style: {
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '12px',
          maxWidth: '360px',
        },
      },
        tile('Luftfeuchtigkeit', `${data.hum}%`),
        tile('Wind', `${data.wind} km/h`),
        tile('Gefühlt', `${data.temp - 1}°`),
        tile('UV-Index', '3'),
      ),
      el('p', {
        style: { marginTop: '24px', opacity: 0.75, fontSize: '12px' },
        text: 'Simulierte Daten — kein echter Wetterdienst.',
      })
    );
  }

  function tile(label, value) {
    return el('div', {
      style: {
        background: 'rgba(255,255,255,0.15)',
        borderRadius: '12px',
        padding: '12px 16px',
      },
    },
      el('div', { style: { fontSize: '12px', opacity: 0.85 }, text: label }),
      el('div', { style: { fontSize: '18px', fontWeight: 600 }, text: value })
    );
  }

  host.append(wrap);
  paint();
}
