import type { Metadata } from "next";
import { headers } from "next/headers";
import { loadMediaCatalog } from "../../lib/media-catalog";
import { ListenPlayer } from "./ListenPlayer";

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

type ListenPageProps = {
  searchParams: Promise<{ for?: string | string[] }>;
};

async function resolveOrigin(): Promise<string | undefined> {
  try {
    const h = await headers();
    const host = h.get("x-forwarded-host") ?? h.get("host");
    const proto = h.get("x-forwarded-proto") ?? "https";
    if (host) return `${proto}://${host}`;
  } catch {
    /* build-time */
  }
  return process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : process.env.NEXT_PUBLIC_SITE_URL;
}

export default async function ListenPage({ searchParams }: ListenPageProps) {
  const query = await searchParams;
  const rawRecipient = Array.isArray(query.for) ? query.for[0] : query.for;
  const recipient = rawRecipient?.trim().slice(0, 42);

  const origin = await resolveOrigin();
  const { catalog, source, catalogUrl } = await loadMediaCatalog(origin);
  const count = catalog.tracks.length;
  const nativeCount = catalog.tracks.filter((t) => t.src).length;

  return (
    <main className="listen-page">
      <div className="noise" aria-hidden="true" />
      <header className="listen-nav">
        <a className="wordmark" href="/" aria-label="Zur Hauptseite">
          PEDDA<span>/</span>VOM<span>/</span>MOND
        </a>
        <p>
          PRIVATE TRANSMISSION / {String(count).padStart(2, "0")} TRACKS
          {nativeCount > 0 ? ` · ${nativeCount} HOST` : ""}
        </p>
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
          {count} Stücke, {count} Umlaufbahnen. Kein Algorithmus, keine Ablenkung –
          nur eine kleine Auswahl, die ich dir zeigen wollte.
          {nativeCount > 0
            ? " Host-Audio streamt direkt vom Media-Server."
            : " Aktuell über SoundCloud — Host-MP3s folgen über den Media-Katalog."}
        </p>
        <a className="listen-jump" href="#tracks">
          Wiedergabe öffnen <span aria-hidden="true">↓</span>
        </a>
      </section>

      <section className="track-room" id="tracks">
        <div className="track-room-head">
          <p className="section-number">AUSWAHL / 001</p>
          <p>
            Playlist kommt aus dem Media-Katalog
            {catalogUrl ? " (geladen)" : " (Fallback)"}. Tracks mit Datei auf dem
            Webspace laufen nativ; sonst greift SoundCloud. Downloads nur wenn
            freigeschaltet.
          </p>
        </div>

        <ListenPlayer catalog={catalog} source={source} catalogUrl={catalogUrl} />
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
