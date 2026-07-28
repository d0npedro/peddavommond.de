# Lunar Media Host

> **Hinweis:** Die Site-Haupt-UX ist der **Windows-11-Desktop** (`docs/WINDOWS-DESKTOP.md`), nicht „PeddaOS“.  
> Dieser Media-Host ist optional für `/listen` und den Desktop-Medienplayer.

Audio-Bytes liegen auf **All-Inkl-Webspace**. Apps (diese Site, Win11-Shell, …) konsumieren nur HTTPS-URLs und optional eine `tracks.json`.

## Architektur

| Schicht | Host | Inhalt |
|--------|------|--------|
| UI | Vercel (`peddavommond.de`) | `/listen`, Landing, Embeds |
| Media | All-Inkl (z. B. `medienvommond.de`) | `.mp3` / `.wav`, `catalog/tracks.json` |
| Katalog | `GET …/catalog/tracks.json` | Playlist ohne Redeploy der App |

```text
Browser ──► Vercel App (/listen)
              │
              ├── fetch tracks.json  ──► All-Inkl (oder /catalog/tracks.json same-origin)
              └── <audio src> / Download ──► All-Inkl /audio/*
```

## Ordner auf dem Webspace

```text
/
  .htaccess                 ← aus media-host/.htaccess
  audio/
    uschi-hat-morgen-ein-date.mp3
    bridges-not-walls.mp3
    …
  catalog/
    tracks.json             ← aus media-host/catalog/tracks.json.example
```

## Upload (All-Inkl)

1. KAS / WebFTP oder SSH (siehe `docs/SSH-ALLINKL.md`).
2. Dateien nach `audio/` und `catalog/tracks.json` legen.
3. `.htaccess` ins Document-Root des Media-Hosts.
4. Im Browser testen:
   - `https://medienvommond.de/audio/<datei>.mp3` → spielt / download
   - `https://medienvommond.de/catalog/tracks.json` → JSON sichtbar
5. CORS prüfen (DevTools → Network → Response Headers: `Access-Control-Allow-Origin`).

## Env (Vercel / lokal)

```bash
# Absolute URL zum Katalog. Leer = same-origin /catalog/tracks.json
NEXT_PUBLIC_MEDIA_CATALOG_URL=https://medienvommond.de/catalog/tracks.json
```

In Vercel Project Settings → Environment Variables setzen, dann Redeploy.

Lokal: `.env.local` (siehe `.env.example`).

## Catalog-Contract (`tracks.json`)

```ts
type MediaCatalog = {
  version: number;
  updatedAt?: string;
  artist?: string;
  tracks: MediaTrack[];
};

type MediaTrack = {
  id: string;
  title: string;
  artist?: string;
  mood?: string;
  /** Absolute HTTPS URL zu .mp3 oder .wav — aktiviert nativen Player */
  src?: string;
  format?: "mp3" | "wav" | string;
  /** true → Download-Button in der UI */
  download?: boolean;
  /** Optional SoundCloud-Permalink (Fallback-Embed / Outro-Link) */
  soundcloud?: string;
};
```

### Regeln

- `src` muss **HTTPS** und öffentlich erreichbar sein.
- Ohne `src`, aber mit `soundcloud` → SoundCloud-Embed (Fallback).
- Katalog nicht erreichbar → eingebaute Fallback-Liste (SoundCloud only).
- Keine Secrets im JSON; keine relativen Pfade ohne festen Media-Host.

## CORS (Produktion enger)

Nach dem Testen `Access-Control-Allow-Origin "*"` ersetzen durch:

```apache
Header set Access-Control-Allow-Origin "https://www.peddavommond.de"
```

Mehrere Origins: oft nur eine Domain pro Header — dann entweder `*` mit Einschränkung über Referrer-Logik, oder getrennte Subdomains, oder Proxy. Für simple Public-Media ist `*` oft ok.

## `/listen`-Verhalten

1. Server lädt Katalog (`NEXT_PUBLIC_MEDIA_CATALOG_URL` oder `/catalog/tracks.json`).
2. Client: nativer Player für Tracks mit `src`.
3. Tracks ohne `src` aber mit `soundcloud`: iframe-Embed.
4. Download nur wenn `download === true` und `src` gesetzt.

## Contract für `browser-win-11` (Win11-Sim)

Der Medienplayer in `D:\Projects\browser-win-11` soll **dieselbe** Katalog-URL lesen:

| Item | Wert |
|------|------|
| Config | z. B. `window.__MEDIA_CATALOG_URL` oder Konstante `MEDIA_CATALOG_URL` |
| Default | gleiche URL wie `NEXT_PUBLIC_MEDIA_CATALOG_URL` |
| Formate | `mp3`, `wav` über `track.src` |
| Download | Link zu `track.src` wenn `download: true` |
| Offline | bestehende Demo-WAVs als Fallback wenn fetch scheitert |

Empfohlene Player-Logik:

1. `fetch(catalogUrl)` → `tracks[]`
2. Playlist = alle Tracks mit `src`
3. Badge MP3/WAV aus `format` oder Dateiendung
4. CORS muss Media-Host → Vercel-Origin des Win11-Deployments erlauben

## Checkliste Abnahme

- [x] `media-host/.htaccess` + `tracks.json.example`
- [x] `docs/MEDIA-HOST.md`
- [x] `/listen` mit Katalog + nativem Player + Fallback
- [x] Download-Button wenn freigeschaltet
- [x] `NEXT_PUBLIC_MEDIA_CATALOG_URL` in `.env.example`
- [x] Win11-Contract in diesem Doc

## Nicht ins Git

- Echte großen `.mp3` / `.wav` Binaries
- FTP/SSH-Passwörter (Secretstore)
