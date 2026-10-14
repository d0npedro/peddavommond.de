# Portfolio source

Content-driven DE/EN portfolio for Peter Henrichs.

The original Next.js app lived at `H:\toolz\peetPortfolio` and was committed here only as a static export. This folder is now the source of truth for copy, cases, and information architecture.

```bash
npm run portfolio:build
npm run portfolio:verify
```

`npm run vercel-build` runs both.

Do not invent AI experience. Graph-Mastermind is an agent package for coding agents. Agent Collective is a deterministic multi-agent simulator (no LLM).

Public default positioning is Variant C: **Senior AI Consultant & Agentic Software Engineer** (Enterprise Engineering × Agentic AI × Transformation).

Keep the credibility split explicit: paid Professional Experience, Independent Applied AI R&D / public systems, and AI Transformation Perspective (what transfers). Independent R&D is not client delivery and not a hobby disclaimer. Do not invent KPIs or an LLM backend for the deterministic Agent Collective simulator. The landing spine is Klar/direkt: `#hero` → `#offer` → `#cases` → `#sample-collective` (the only touchable sample) → `#record` → `#contact` → `#craft-credit`. The Graph contract expands inside the Graph case. Scroll motion is a local choreography on Anime.js v4.5.0 (MIT, vendored in `portfolio/vendor/`, not an npm dependency) — see `MOTION-SHEET-v1.5.2.md`.

Stage 1 pages (same slugs in DE and EN) are generated from `portfolio/content/`: `/rollen/agentic-ai/` (`#angebot`), `/rollen/java-backend/`, `/lebenslauf/`, `/lebenslauf/<id>/`, `/kontakt/`. `npm run portfolio:validate` fails the build when an entry breaks the schema, invents a KPI, or fills a placeholder.

## Visual system — dark stage

Two stylesheets load on every generated page:

1. The frozen Next export (`public/portfolio/de/_next/static/css/76323045a7107f6a.css`) — Tailwind utilities and leftover layout classes.
2. `portfolio/portfolio.css` — **token + component source of truth**. `scripts/build-portfolio.mjs` copies it to `public/portfolio/portfolio.css` (this is what production serves). The HTML link is cache-busted (`?v=stage-…`) and loads second. `portfolio/stage1.css` loads third.

Tokens are declared on `html` / `html.light` so they beat the export’s `:root` / `.dark`. Every surface, chip, and CTA should consume these — do not add one-off hex in markup.

The only theme is a dark stage in the rhythm of [anime.js](https://animejs.com/): near-black field, off-white display type, one red mark. The start page and Stage 1 pages share `--s1-*` tokens from `portfolio.css`. There is no theme toggle and no `html.dark` palette. Bronze (`--signal`) is reserved for honesty / Independent R&D chips and failure states.

Landing motion uses the vendored Anime.js v4.5.0 bundle through `portfolio/motion/stage-reveal.js` (`onScroll({ sync: true })`). The choreography is local. Three.js, GSAP, Framer Motion, and Lottie stay out. `prefers-reduced-motion: reduce` shows a static page and does not split text.

Pages do not add `class="dark"`, and nothing reads a stored theme.

### Dark stage

| Token | RGB | Hex | Contrast notes |
| --- | --- | --- | --- |
| `--bg` | `3 3 3` | `#030303` | stage |
| `--bg-elevated` | `37 36 35` | `#252423` | sheet |
| `--bg-sunken` | `26 25 24` | `#1A1918` | well |
| `--fg` | `246 244 242` | `#F6F4F2` | display |
| `--muted` | `181 178 176` | `#B5B2B0` | body |
| `--faint` | `168 165 162` | `#A8A5A2` | meta |
| `--line` | `58 56 54` | `#3A3836` | hairline |
| `--accent` | `255 75 75` | `#FF4B4B` | mark; 6.36:1 on stage |
| `--accent-rule` | `255 75 75` | `#FF4B4B` | playhead and short rules |
| `--accent-soft` | `58 28 28` | `#3A1C1C` | wash |
| `--signal` | `224 164 92` | `#E0A45C` | bronze; honesty / fail |
| `--on-accent` | `26 25 24` | `#1A1918` | text on the red or light control |
| `--grid-rgb` / `--grid-opacity` | `246 244 242` / `0.14` | | hero dot grid |

Display type is Helvetica Neue / Arial at 700, tight leading. JetBrains Mono stays on labels, chips, and meta. Theme-color meta: `#030303`.
