import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Private Transmission — Pedda vom Mond",
  description: "Eine persönliche Auswahl aus dem Orbit von Pedda vom Mond.",
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

const tracks = [
  {
    number: "01",
    title: "Uschi hat morgen ein Date",
    mood: "Nachtfahrt / Puls",
    url: "https://soundcloud.com/dj-peet-sounds/uschi-hat-morgen-ein-date",
  },
  {
    number: "02",
    title: "Bridges Not Walls",
    mood: "Weite / Verbindung",
    url: "https://soundcloud.com/dj-peet-sounds/bridges-not-walls",
  },
  {
    number: "03",
    title: "Das Richtige fühlt sich richtig an",
    mood: "Gefühl / Bewegung",
    url: "https://soundcloud.com/dj-peet-sounds/das-richtige-fuhlt-sich-richtig-an",
  },
  {
    number: "04",
    title: "Tor zur vierten Dimension",
    mood: "Psychosis / Ritual",
    url: "https://soundcloud.com/dj-peet-sounds/tor-zur-vierten-dimension-merged-psychosis-ii",
  },
];

function playerUrl(trackUrl: string) {
  const params = new URLSearchParams({
    url: trackUrl,
    color: "#d8ff32",
    auto_play: "false",
    hide_related: "true",
    show_comments: "false",
    show_user: "false",
    show_reposts: "false",
    show_teaser: "false",
    visual: "false",
  });

  return `https://w.soundcloud.com/player/?${params.toString()}`;
}

type ListenPageProps = {
  searchParams: Promise<{ for?: string | string[] }>;
};

export default async function ListenPage({ searchParams }: ListenPageProps) {
  const query = await searchParams;
  const rawRecipient = Array.isArray(query.for) ? query.for[0] : query.for;
  const recipient = rawRecipient?.trim().slice(0, 42);

  return (
    <main className="listen-page">
      <div className="noise" aria-hidden="true" />
      <header className="listen-nav">
        <a className="wordmark" href="/" aria-label="Zur Hauptseite">
          PEDDA<span>/</span>VOM<span>/</span>MOND
        </a>
        <p>PRIVATE TRANSMISSION / 04 TRACKS</p>
      </header>

      <section className="listen-intro">
        <p className="eyebrow">
          {recipient ? `ÜBERTRAGUNG FÜR ${recipient}` : "PERSÖNLICHE ÜBERTRAGUNG"}
        </p>
        <h1>
          KOPFHÖRER
          <br />
          <span>AUF.</span> WELT AUS.
        </h1>
        <p>
          Vier Stücke, vier Umlaufbahnen. Kein Algorithmus, keine Ablenkung –
          nur eine kleine Auswahl, die ich dir zeigen wollte.
        </p>
        <a className="listen-jump" href="#tracks">
          Wiedergabe öffnen <span aria-hidden="true">↓</span>
        </a>
      </section>

      <section className="track-room" id="tracks">
        <div className="track-room-head">
          <p className="section-number">AUSWAHL / 001</p>
          <p>
            Die Player laden direkt von SoundCloud. Du kannst jeden Track hier
            starten, pausieren und vorspulen.
          </p>
        </div>

        <div className="track-stack">
          {tracks.map((track) => (
            <article className="track" key={track.url}>
              <div className="track-meta">
                <span>{track.number}</span>
                <div>
                  <h2>{track.title}</h2>
                  <p>{track.mood}</p>
                </div>
              </div>
              <iframe
                title={`${track.title} – Webplayer`}
                width="100%"
                height="166"
                scrolling="no"
                frameBorder="no"
                allow="autoplay"
                loading="lazy"
                src={playerUrl(track.url)}
              />
            </article>
          ))}
        </div>
      </section>

      <section className="listen-outro">
        <p className="eyebrow">ENDE DER ÜBERTRAGUNG</p>
        <h2>NOCH NICHT GENUG MOND?</h2>
        <a
          className="primary-link light"
          href="https://soundcloud.com/dj-peet-sounds"
          target="_blank"
          rel="noreferrer"
        >
          Mehr hören <span aria-hidden="true">↗</span>
        </a>
      </section>

      <footer>
        <p>© {new Date().getFullYear()} PEDDA VOM MOND</p>
        <p>DIESER LINK WAR FÜR DICH BESTIMMT</p>
      </footer>
    </main>
  );
}
