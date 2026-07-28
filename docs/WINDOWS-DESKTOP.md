# Windows-11-Desktop (peddavommond.de)

**PeddaOS ist verworfen.** Die Startseite ist ein **Windows-11-naher Desktop**, der als Launcher für Projekte dient.

## Idee

```text
https://www.peddavommond.de/
        │
        ▼ redirect
https://www.peddavommond.de/win11/
        │
        ├─ Desktop-Icons / Startmenü / Taskleiste
        └─ App-Klick
              ├─ iframe → interne Route (/soundcloud, /listen, …)
              ├─ iframe → externes Deploy (/slotmachine → Vercel)
              └─ neuer Tab → z.B. GitHub
```

Jedes größere Produkt bleibt **eigenes Git-Repo + eigenes Deploy**.  
Dieser Desktop **hosted** die Apps nicht; er **startet** sie.

## Code

| Pfad | Rolle |
|------|--------|
| `public/win11/` | Statische Win11-SPA (ES Modules) |
| `public/win11/js/apps/catalog.js` | **Projekt-Apps** (Slotmachine, Socials, …) |
| `public/win11/js/apps/ExternalApp.js` | iframe + „Im Tab öffnen“ |
| `public/win11/js/main.js` | Registry + Boot |
| `app/page.tsx` | `redirect('/win11/')` |

Lab-Kopie der Shell: `D:\Projects\browser-win-11` (optional, unabhängig).

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
- Scroll-Marketing-Landing als **Root** — Root ist der Desktop; alte Hubs bleiben unter `/soundcloud`, `/origin`, …
