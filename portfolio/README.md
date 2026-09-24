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

Keep the credibility split explicit: paid Professional Experience, Independent Applied AI R&D / public systems, and AI Transformation Perspective (what transfers). Independent R&D is not client delivery and not a hobby disclaimer. Do not invent KPIs or an LLM backend for the deterministic Agent Collective simulator. The landing spine is Klar/direkt: `#hero` → `#offer` → `#cases` → `#sample-collective` (the only touchable sample) → `#record` → `#contact` → `#craft-credit`. The Graph contract expands inside the Graph case. Motion is custom vanilla JS in `portfolio/motion/` — see `MOTION-SHEET-v1.5.2.md`.

Stage 1 pages (same slugs in DE and EN) are generated from `portfolio/content/`: `/rollen/agentic-ai/` (`#angebot`), `/rollen/java-backend/`, `/lebenslauf/`, `/lebenslauf/<id>/`, `/kontakt/`. `npm run portfolio:validate` fails the build when an entry breaks the schema, invents a KPI, or fills a placeholder.

## Visual system — Enterprise AI decision surface

Two stylesheets load on every generated page:

1. The frozen Next export (`public/portfolio/de/_next/static/css/76323045a7107f6a.css`) — fonts, Tailwind utilities, leftover layout classes.
2. `portfolio/portfolio.css` — **token + component source of truth**. `scripts/build-portfolio.mjs` copies it to `public/portfolio/portfolio.css` (this is what production serves). The HTML link is cache-busted (`?v=trust-…`) and loads second.

Tokens are declared on `html` / `html.light` / `html.dark` so they beat the export’s `:root` / `.dark`. Every surface, chip, and CTA should consume these — do not add one-off hex in markup.

Light paper is the only theme. The start page and Stage 1 pages share `--s1-*` tokens from `portfolio.css`. Small text and controls use `#2F6E79`. `#4AA8B8` is limited to decorative rules. There is no dark-mode toggle. Bronze (`--signal`) is reserved for honesty / Independent R&D chips and failure states.

Pages do not add `class="dark"`, and nothing reads a stored theme. The old `.dark` token block is unused.

### Dark (unused) — charcoal navy / ink

| Token | RGB | Hex | Contrast notes |
| --- | --- | --- | --- |
| `--bg` | `16 21 30` | `#10151E` | canvas (not `#000`) |
| `--bg-elevated` | `23 30 42` | `#171E2A` | cards / nav sheets |
| `--bg-sunken` | `12 16 23` | `#0C1017` | wells / band fills |
| `--fg` | `238 242 246` | `#EEF2F6` | 16.3:1 on canvas |
| `--muted` | `180 188 200` | `#B4BCC8` | 9.6:1 body |
| `--faint` | `142 152 166` | `#8E98A6` | 6.3:1 meta |
| `--line` | `44 54 68` | `#2C3644` | hairline |
| `--accent` | `74 168 184` | `#4AA8B8` | teal–azure; 6.6:1 text |
| `--accent-soft` | `24 48 58` | `#18303A` | wash / diagram fill |
| `--signal` | `196 146 74` | `#C4924A` | bronze honesty |
| `--on-accent` | `16 21 30` | `#10151E` | 6.6:1 on accent CTA |
| `--grid-rgb` / `--grid-opacity` | `148 168 188` / `0.045` | | quiet blueprint |

### Light — warm paper / cool stone

| Token | RGB | Hex | Contrast notes |
| --- | --- | --- | --- |
| `--bg` | `244 240 232` | `#F4F0E8` | paper |
| `--bg-elevated` | `250 247 241` | `#FAF7F1` | sheet |
| `--bg-sunken` | `232 226 216` | `#E8E2D8` | stone |
| `--fg` | `20 23 30` | `#14171E` | 15.78:1 on paper |
| `--muted` | `90 86 80` | `#5A5650` | 6.41:1 body |
| `--faint` | `90 98 112` | `#5A6270` | 5.41:1 meta |
| `--line` | `212 207 196` | `#D4CFC4` | decorative hairline |
| `--accent` | `47 110 121` | `#2F6E79` | accent-ink; 5.09:1 text, 5.79:1 white on it |
| `--accent-rule` | `74 168 184` | `#4AA8B8` | decorative rules only; 2.44:1 |
| `--accent-soft` | `214 232 232` | `#D6E8E8` | wash |
| `--signal` | `138 85 30` | `#8A551E` | bronze; 5.44:1 |
| `--on-accent` | `255 255 255` | `#FFFFFF` | on ink or accent-ink controls |
| `--grid-rgb` / `--grid-opacity` | `36 32 26` / `0.04` | | quiet blueprint |

Body type on paper pages is 18px. Inter for prose; JetBrains Mono only for labels, chips, and meta. Theme-color meta: `#F4F0E8`.
