# Windows-11-Desktop (peddavommond.de)

**PeddaOS ist verworfen.** Die Domain-Startseite ist der **Streaming-Hub**. Der **Windows-11-nahe Desktop** bleibt unter `/win11/` als Launcher für Projekte.

## Idee

```text
https://www.peddavommond.de/
        │
        ├─ Hub-Kacheln → Spotify, YouTube, Socials, …
        └─ Windows-11-Kachel
              ▼
https://www.peddavommond.de/win11/
        │
        ├─ Desktop-Icons / Startmenü / Taskleiste
        └─ App-Klick
              ├─ iframe → interne Route (/multi-agent/, …)
              ├─ iframe → externes Deploy (/slotmachine → Vercel)
              └─ neuer Tab → z.B. GitHub
```

Jedes größere Produkt bleibt **eigenes Git-Repo + eigenes Deploy**.  
Dieser Desktop **hosted** die Apps nicht; er **startet** sie.

## Code

| Pfad | Rolle |
|------|--------|
| `public/index.html` | Domain-Root: Streaming-Hub |
| `public/hub/` | Banner und Plattform-Logos |
| `public/win11/` | Statische Win11-SPA (ES Modules) |
| `public/win11/js/apps/catalog.js` | **Projekt-Apps** (Slotmachine, Socials, …) |
| `public/win11/js/apps/ExternalApp.js` | iframe + „Im Tab öffnen“ |
| `public/win11/js/main.js` | Registry + Boot |
| `app/page.tsx` | vinext-only; production root is `public/index.html` |

Lab-Kopie der Shell: `D:\Projects\browser-win-11` (optional, unabhängig).

## Eingebettete SPAs

| Path | Quelle | Build |
|------|--------|--------|
| `/multi-agent/` | [d0npedro/multi-agent](https://github.com/d0npedro/multi-agent) Agent Collective | **Embed:** `scripts/embed-multi-agent.mjs` → `public/multi-agent/` |
| `/musicfestival/` | [d0npedro/musicfestival](https://github.com/d0npedro/musicfestival) Herd the Ravers | **Option A proxy** in `vercel.json` → https://musicfestival-nine.vercel.app/musicfestival/ (prefix kept; game project strips assets) |

Standalone: https://multi-agent-six-murex.vercel.app · https://musicfestival-nine.vercel.app/  
Handover musicfestival: `docs/HANDOVER-peddavommond.de.md` (Option A recommended).

## Neue App hinzufügen

1. Projekt deployen (Vercel o.ä.).
2. Optional Redirect/Rewrite in `vercel.json` (wie `/slotmachine`).
3. Eintrag in `public/win11/js/apps/catalog.js`:

```js
{
  id: 'meinprojekt',
  name: 'Mein Projekt',
  icon: '✨',
  description: '…',
  category: 'lab',
  launch: 'iframe',           // oder 'external'
  url: '/meinprojekt',        // oder https://….vercel.app
  repo: 'https://github.com/d0npedro/…',
  featured: true,
}
```

4. Optional Desktop/Pins in `State.js` DEFAULT bzw. `ensureProjectAppsInstalled()` in `main.js`.

## localStorage

Key: `pvm-win11-state-v1` (getrennt von der Lab-Sim).

## Bekannte Grenzen

- Manche Sites blockieren iframes (`X-Frame-Options`) → Button **Im Tab öffnen**.
- Shell braucht HTTP(S), nicht `file://`.
- Große Binaries weiterhin nicht ins Shell-Repo.

## Verworfene Konzepte

- **PeddaOS** (eigenes Sci-Fi-OS-Branding) — nicht umsetzen.
- Scroll-Marketing-Landing als **Root** — Root ist der Streaming-Hub; Desktop unter `/win11/`; alte Hubs bleiben unter `/soundcloud`, `/origin`, …
