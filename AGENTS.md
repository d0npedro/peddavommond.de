# Agent instructions — peddavommond.de

**Read this file first** before changing code. Applies to Claude, Cursor, Copilot, Codex, Grok, and any other coding agent.

## What this project is

- Public site: **https://www.peddavommond.de**
- **Root UX = streaming/social hub** (`public/index.html` + `public/hub/`). Windows 11 desktop stays at `/win11/`.
- Desktop apps **launch other products** (own git repos / deploys). The shell does not re-implement them.
- **PeddaOS is rejected** — no custom OS branding. Stay **Windows-11-near**.

## Source of truth docs

| Doc | Topic |
|-----|--------|
| `docs/WINDOWS-DESKTOP.md` | Shell, catalog, how to add apps |
| `docs/MEDIA-HOST.md` | Optional All-Inkl audio catalog |
| `docs/INFRASTRUCTURE.md` | Domains, Vercel, All-Inkl, audit |
| `docs/SECRETSTORE.md` | Secrets workflow |
| `README.md` | Human overview |

## Credentials (mandatory)

**SECRETSTORE only** (LAN `192.168.2.50:8787`). See `docs/SECRETSTORE.md`.

- List names first, fetch one secret at a time.
- Never print secret values in chat or commits.
- Never invent API keys; never use random env files as the vault.
- PUT to secretstore only when the user explicitly asks.

```bash
./scripts/secretstore.sh health
./scripts/secretstore.sh names
eval "$(./scripts/secretstore.sh export resend_api_key RESEND_API_KEY)"
source ./scripts/load-ops-env.sh
```

## Code map (edit here)

| Path | Do |
|------|-----|
| `public/win11/js/apps/catalog.js` | Add/remove **project** apps (Slotmachine, socials, Agent Collective, …) |
| `scripts/embed-multi-agent.mjs` | Build/embed Agent Collective SPA → `public/multi-agent/` |
| `vercel.json` `/musicfestival` | Proxy Option A → `musicfestival-nine.vercel.app` (Herd the Ravers) |
| `public/win11/js/main.js` | Boot, install defaults, pin migration |
| `public/win11/js/core/State.js` | Theme, default desktop/taskbar, localStorage key `pvm-win11-state-v1` |
| `public/win11/js/apps/ExternalApp.js` | iframe + open-in-tab launcher |
| `vercel.json` | Redirects/rewrites, static build settings |
| `scripts/prepare-static-deploy.mjs` | Production static prepare (`vercel-build`) |
| `public/index.html` | Root hub landing (streaming + social tiles, Windows 11 tile) |
| `public/hub/` | Hub logos and banner from the streaming-platforms zip |
| `app/` | Next/vinext routes (`/listen`) — SSR not used in current prod static mode |
| Root `*.html` | Social hubs; copied into `public/` by vercel-build |

## Production deploy (current truth)

Vercel project: **`peddavommond-router`**

- Framework preset historically **Other**, static **`public/`**.
- **Build:** `npm run vercel-build` (see `package.json` + `vercel.json`).
- vinext/`dist` worker output previously caused **site-wide 404** — do not switch prod back to vinext without verifying routes.
- Domain aliases: `peddavommond.de`, `www.peddavommond.de`.

```bash
npm run vercel-build
vercel --prod --yes
# or: git push origin main  (if Vercel Git integration is connected)
```

## Local checks before PR/push

```bash
npm run vercel-build
# optional: npx serve public -l 8080  → open /win11/
# optional: node public/win11/js/utils/formula.test.js  (if testing excel formulas)
```

CI: `.github/workflows/ci.yml`.

## Hard rules

1. Do **not** reintroduce PeddaOS. Keep the Win11 shell at `/win11/`; root `/` is the hub landing.
2. Do **not** commit secrets, `.env*`, PEM private keys, or `work/` dumps.
3. Prefer **small, focused diffs**; don’t rewrite the whole shell for a single new app.
4. New product = **own repo** when substantial; only add a **catalog entry** (+ optional vercel rewrite) here.
5. Iframes may fail (`X-Frame-Options`) — always keep “open in new tab” path.
6. Shell needs **HTTP(S)** (ES modules); never rely on `file://`.

## Scope of this repo (ops)

Also acts as control-center notes for websites/Vercel/DNS under `D:\Projects`.  
App code for Slotmachine, peddabot, verschenke-musik, etc. lives in **their** repos — not here.
