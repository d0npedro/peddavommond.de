# peddavommond.de

**Streaming hub** at `/` plus a **Windows-11 desktop shell** at `/win11/` that launches Pedda vom Mond projects (each usually its own git repo + deploy).

Live: [https://www.peddavommond.de/](https://www.peddavommond.de/) · Desktop: [/win11/](https://www.peddavommond.de/win11/)

> **PeddaOS is rejected.** Do not invent a custom OS brand. Stay Windows-11-near.

## Architecture

```text
/                 Streaming hub (public/index.html + public/hub/)
/win11/           Windows 11 SPA (public/win11)
                     │
                     ├─ Desktop / Taskbar / Start
                     └─ App click
                           ├─ iframe  → /soundcloud, /slotmachine, …
                           └─ new tab → GitHub, etc.

Other hubs:  /soundcloud  /spotify  /youtube  /listen (SSR when vinext works)
Ops docs:    docs/
```

| Path | Role |
|------|------|
| `public/index.html` | Root streaming/social hub |
| `public/hub/` | Hub banner and platform logos |
| `public/win11/` | Desktop shell (static SPA, ES modules) |
| `public/win11/js/apps/catalog.js` | **Project app registry** |
| `public/win11/js/apps/ExternalApp.js` | iframe + “open in tab” |
| `vercel.json` | Static production build + rewrites |
| `scripts/prepare-static-deploy.mjs` | Vercel `vercel-build` |
| `docs/WINDOWS-DESKTOP.md` | Shell contract |
| `AGENTS.md` | **Read first** for any coding agent |

## Local development

```bash
# Static desktop (matches production)
npx serve public -l 8080
# open http://localhost:8080/  (hub) and /win11/ (desktop)

# Full vinext/Next app (listen SSR, etc.)
npm install
npm run dev
```

Production on Vercel uses **static export** (`npm run vercel-build` → `public/`), not the vinext worker output (that currently 404s on this project’s Vercel settings).

```bash
npm run vercel-build   # prepare public/
vercel --prod          # or push to main if Git integration is linked
```

## Add a new project app

1. Deploy the project (own repo / Vercel).
2. Optional route in `vercel.json` (redirect/rewrite).
3. Entry in `public/win11/js/apps/catalog.js`.
4. Optional desktop pin in `public/win11/js/core/State.js` / `main.js` `ensureProjectAppsInstalled()`.

## CI

GitHub Actions: `.github/workflows/ci.yml` — install, static prepare, path checks.

## Agents

Read **`AGENTS.md`** (and `CLAUDE.md` / `.github/copilot-instructions.md`).  
Secrets: Homelab Secretstore only — never commit keys.

## License / content

Artist site content © Pedda vom Mond / DJ Peet.
