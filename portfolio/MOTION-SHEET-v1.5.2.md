# Motion Sheet v1.5.2 — craft proof

**Owner:** Motion Craft · **Consumer:** Design Implement
**Status:** Spine still canonical. The custom-only library lock is retired.
**Date:** 2026-09-23 (Europe/Berlin); library note 2026-10-14

## Libraries

Landing and case pages load vendored **GSAP 3.12.7** (standard license, with ScrollTrigger) and **Lenis 1.1.20**. Files live in `portfolio/vendor/` and are copied to `public/portfolio/vendor/`. No motion CDN at runtime. Three.js, Framer Motion, Anime.js, and Lottie stay out. `prefers-reduced-motion` is a static page: no Lenis, no pin, no custom cursor. Scroll motion animates transform and opacity. The craft mark remains one SVG stroke draw.

Do not implement a second scroll sample. `#sample-graph` as its own beat is dead.

## Spine

`#hero` → `#offer` → `#cases` → `#sample-collective` **only** → `#record` → `#contact` → `#craft-credit`

- Graph = in-case expand only
- Collective = the only scroll sample
- Nav never animates

## Impl

**Out:** Three.js · Framer Motion · Anime.js · Lottie-as-scroll.

**In:** Vendored GSAP 3 + ScrollTrigger and Lenis, and the modules below.

Modules on this page:

- `portfolio/motion/scroll-craft.js` — Lenis, line masks, pin, parallax, magnetic controls, desktop cursor, contact sheet
- `portfolio/motion/stage-reveal.js` — fallback title reveal when GSAP does not run
- `portfolio/motion/craft-mark.js` — one SVG stroke-dashoffset draw in `#craft-credit`

## Timing (carried from v1.5)

| Token | Value |
|---|---|
| Stage title enter | 480–560ms · opacity + Y 12–16px (mobile 8–12) · once |
| Hairline enter | 400–480ms · opacity |
| Sample internal | 220–280ms |
| Micro | 160–200ms |
| Easing enter | `cubic-bezier(0.22, 1, 0.36, 1)` |
| Scrub | OFF |
| Reverse exit | OFF |

## `#craft-credit`

One authored effect. Technique label stays visible. `prefers-reduced-motion` leaves the stroke fully drawn. Not a second Collective, not a logo wall, not a performance claim.

## Collective trust gate

No decorative Collective motion. Step, failure, and reset update state in place. The failure control uses a plain string label (`Fehler zeigen` / `Show failure`).
