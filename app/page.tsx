const channels = [
  {
    label: "SoundCloud",
    code: "01",
    note: "Das Rohsignal",
    href: "https://soundcloud.com/dj-peet-sounds",
  },
  {
    label: "Spotify",
    code: "02",
    note: "Die offizielle Umlaufbahn",
    href: "https://open.spotify.com/intl-de/artist/6Q87E6kJQ0f3Su4ZLVq5GY",
  },
  {
    label: "YouTube",
    code: "03",
    note: "Beweise in Bewegung",
    href: "https://www.youtube.com/peddavommond",
  },
];

export default function Home() {
  return (
    <main>
      <div className="noise" aria-hidden="true" />
      <header className="nav">
        <a className="wordmark" href="#top" aria-label="Pedda vom Mond – Anfang">
          PEDDA<span>/</span>VOM<span>/</span>MOND
        </a>
        <div className="nav-status">
          <span className="status-dot" aria-hidden="true" />
          SIGNAL EMPFANGEN
        </div>
      </header>

      <section className="hero" id="top">
        <div className="orbit orbit-one" aria-hidden="true" />
        <div className="orbit orbit-two" aria-hidden="true" />
        <div className="moon" aria-hidden="true">
          <span className="crater crater-one" />
          <span className="crater crater-two" />
          <span className="crater crater-three" />
        </div>

        <p className="eyebrow">ÜBERTRAGUNG 47.913° N — 12.482° E</p>
        <h1>
          DU BIST NICHT
          <br />
          <span>ZUFÄLLIG</span> HIER.
        </h1>
        <p className="hero-copy">
          Irgendwo zwischen Bass, Mondstaub und einer Idee, die man nicht mehr
          loswird, sendet <strong>Pedda vom Mond</strong>.
        </p>
        <a className="primary-link" href="#signal">
          Signal entschlüsseln <span aria-hidden="true">↓</span>
        </a>

        <p className="side-note" aria-hidden="true">
          KEIN GENRE
          <br />
          KEIN PLANET
          <br />
          KEIN ZUFALL
        </p>
      </section>

      <div className="ticker" aria-hidden="true">
        <div>
          MONDSTAUB • NACHTFAHRT • PSYTRANCE • GLITCH • GEFÜHL • NEUGIER •
          MONDSTAUB • NACHTFAHRT • PSYTRANCE • GLITCH • GEFÜHL • NEUGIER •
        </div>
      </div>

      <section className="manifesto" id="signal">
        <div className="section-number">01 / DAS SIGNAL</div>
        <div className="manifesto-copy">
          <p>Es beginnt nicht mit einer Biografie.</p>
          <h2>
            ES BEGINNT MIT
            <br />
            EINEM <em>DRUCK</em> IM RAUM.
          </h2>
          <p className="body-copy">
            Tracks wie Fundstücke aus einer anderen Umlaufbahn. Visuals, die
            länger nachleuchten als geplant. Geschichten mit kaputten Kapiteln.
            Und immer diese Frage: Was passiert, wenn man noch einen Schritt
            weitergeht?
          </p>
        </div>
        <div className="signal-card">
          <div className="signal-meta">
            <span>LIVE FEED</span>
            <span>128—140 BPM</span>
          </div>
          <div className="wave" aria-label="Animierte Darstellung eines Audiosignals">
            {Array.from({ length: 28 }, (_, index) => (
              <i key={index} style={{ "--i": index } as React.CSSProperties} />
            ))}
          </div>
          <p>Wenn du es hörst, ist es schon zu spät.</p>
        </div>
      </section>

      <section className="transmission">
        <p className="eyebrow">AKTUELLE ÜBERTRAGUNG</p>
        <div className="transmission-grid">
          <div>
            <p className="giant-index">47</p>
            <p className="coordinate">KRATER / UNBEKANNT</p>
          </div>
          <div className="transmission-copy">
            <h2>TIME TO FLY</h2>
            <p>
              Eine Tür steht offen. Dahinter: zu viel Himmel, zu wenig
              Schwerkraft und ein Bassfundament, das keine Rückkehr vorsieht.
            </p>
            <a
              className="text-link"
              href="https://soundcloud.com/dj-peet-sounds"
              target="_blank"
              rel="noreferrer"
            >
              Jetzt eintauchen <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      </section>

      <section className="channels">
        <div className="section-number">02 / WÄHLE DEINEN KANAL</div>
        <div className="channel-list">
          {channels.map((channel) => (
            <a
              className="channel"
              href={channel.href}
              target="_blank"
              rel="noreferrer"
              key={channel.label}
            >
              <span className="channel-code">{channel.code}</span>
              <span className="channel-name">{channel.label}</span>
              <span className="channel-note">{channel.note}</span>
              <span className="channel-arrow" aria-hidden="true">
                ↗
              </span>
            </a>
          ))}
        </div>
      </section>

      <section className="final-call">
        <p className="eyebrow">LETZTE WARNUNG</p>
        <h2>
          BLEIB NEUGIERIG.
          <br />
          DER MOND HÖRT MIT.
        </h2>
        <a
          className="primary-link light"
          href="https://www.youtube.com/peddavommond"
          target="_blank"
          rel="noreferrer"
        >
          Empfang starten <span aria-hidden="true">↗</span>
        </a>
      </section>

      <footer>
        <p>© {new Date().getFullYear()} PEDDA VOM MOND</p>
        <p>GESENDET VON IRGENDWO DA OBEN</p>
      </footer>
    </main>
  );
}
