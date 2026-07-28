export type MediaTrack = {
  id: string;
  title: string;
  artist?: string;
  mood?: string;
  /** Absolute HTTPS URL to .mp3 / .wav */
  src?: string;
  format?: "mp3" | "wav" | string;
  download?: boolean;
  soundcloud?: string;
};

export type MediaCatalog = {
  version: number;
  updatedAt?: string;
  artist?: string;
  tracks: MediaTrack[];
};

export type CatalogLoadResult = {
  catalog: MediaCatalog;
  source: "remote" | "same-origin" | "fallback";
  catalogUrl: string | null;
  error?: string;
};

/** Built-in SoundCloud-only fallback when catalog cannot be loaded */
export const FALLBACK_CATALOG: MediaCatalog = {
  version: 1,
  updatedAt: "2026-07-28",
  artist: "Pedda vom Mond / DJ Peet",
  tracks: [
    {
      id: "uschi",
      title: "Uschi hat morgen ein Date",
      artist: "DJ Peet",
      mood: "Nachtfahrt / Puls",
      soundcloud: "https://soundcloud.com/dj-peet-sounds/uschi-hat-morgen-ein-date",
    },
    {
      id: "bridges",
      title: "Bridges Not Walls",
      artist: "DJ Peet",
      mood: "Weite / Verbindung",
      soundcloud: "https://soundcloud.com/dj-peet-sounds/bridges-not-walls",
    },
    {
      id: "das-richtige",
      title: "Das Richtige fühlt sich richtig an",
      artist: "DJ Peet",
      mood: "Gefühl / Bewegung",
      soundcloud:
        "https://soundcloud.com/dj-peet-sounds/das-richtige-fuhlt-sich-richtig-an",
    },
    {
      id: "tor",
      title: "Tor zur vierten Dimension",
      artist: "DJ Peet",
      mood: "Psychosis / Ritual",
      soundcloud:
        "https://soundcloud.com/dj-peet-sounds/tor-zur-vierten-dimension-merged-psychosis-ii",
    },
  ],
};

export function getConfiguredCatalogUrl(): string | null {
  const raw = process.env.NEXT_PUBLIC_MEDIA_CATALOG_URL?.trim();
  if (!raw) return null;
  try {
    const u = new URL(raw);
    if (u.protocol !== "https:" && u.protocol !== "http:") return null;
    return u.toString();
  } catch {
    return null;
  }
}

function isTrack(value: unknown): value is MediaTrack {
  if (!value || typeof value !== "object") return false;
  const t = value as Record<string, unknown>;
  return typeof t.id === "string" && typeof t.title === "string";
}

export function normalizeCatalog(data: unknown): MediaCatalog | null {
  if (!data || typeof data !== "object") return null;
  const c = data as Record<string, unknown>;
  if (!Array.isArray(c.tracks)) return null;
  const tracks = c.tracks.filter(isTrack).map((t) => ({
    id: t.id,
    title: t.title,
    artist: typeof t.artist === "string" ? t.artist : undefined,
    mood: typeof t.mood === "string" ? t.mood : undefined,
    src: typeof t.src === "string" && t.src.length > 0 ? t.src : undefined,
    format: typeof t.format === "string" ? t.format : undefined,
    download: Boolean(t.download),
    soundcloud: typeof t.soundcloud === "string" ? t.soundcloud : undefined,
  }));
  if (!tracks.length) return null;
  return {
    version: typeof c.version === "number" ? c.version : 1,
    updatedAt: typeof c.updatedAt === "string" ? c.updatedAt : undefined,
    artist: typeof c.artist === "string" ? c.artist : undefined,
    tracks,
  };
}

export function soundcloudEmbedUrl(trackUrl: string): string {
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

export function trackNumber(index: number): string {
  return String(index + 1).padStart(2, "0");
}

export function formatBadge(track: MediaTrack): string {
  if (track.format) return track.format.toUpperCase();
  if (track.src) {
    if (/\.wav(\?|$)/i.test(track.src)) return "WAV";
    if (/\.mp3(\?|$)/i.test(track.src)) return "MP3";
    return "AUDIO";
  }
  if (track.soundcloud) return "SC";
  return "—";
}

/**
 * Load catalog: configured remote URL → same-origin /catalog/tracks.json → fallback.
 */
export async function loadMediaCatalog(
  origin?: string,
): Promise<CatalogLoadResult> {
  const remote = getConfiguredCatalogUrl();
  const candidates: { url: string; source: CatalogLoadResult["source"] }[] = [];

  if (remote) {
    candidates.push({ url: remote, source: "remote" });
  }

  if (origin) {
    candidates.push({
      url: new URL("/catalog/tracks.json", origin).toString(),
      source: "same-origin",
    });
  } else {
    // relative fetch works on server when we have absolute later; client can use path
    candidates.push({ url: "/catalog/tracks.json", source: "same-origin" });
  }

  let lastError: string | undefined;

  for (const { url, source } of candidates) {
    try {
      const res = await fetch(url, {
        next: { revalidate: 120 },
        headers: { Accept: "application/json" },
      });
      if (!res.ok) {
        lastError = `${url} → HTTP ${res.status}`;
        continue;
      }
      const json: unknown = await res.json();
      const catalog = normalizeCatalog(json);
      if (!catalog) {
        lastError = `${url} → invalid catalog shape`;
        continue;
      }
      return { catalog, source, catalogUrl: url };
    } catch (e) {
      lastError = e instanceof Error ? e.message : String(e);
    }
  }

  return {
    catalog: FALLBACK_CATALOG,
    source: "fallback",
    catalogUrl: null,
    error: lastError,
  };
}
