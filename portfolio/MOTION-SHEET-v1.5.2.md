# Motion Sheet v1.5.2 — craft proof + custom-only lock

**Owner:** Motion Craft · **Consumer:** Design Implement
**Status:** Canonical. Supersedes v1.4, v1.5, and v1.5.1.
**Date:** 2026-09-23 (Europe/Berlin)

Do not implement a second scroll sample. `#sample-graph` as its own beat is dead.

## Spine

`#hero` → `#offer` → `#cases` → `#sample-collective` **only** → `#record` → `#contact` → `#craft-credit`

- Graph = in-case expand only
- Collective = the only scroll sample
- Nav never animates

## Impl lock — custom-written only

**Forbidden:** Three.js · GSAP · Framer Motion · Anime.js · Lottie-as-scroll · other black-box animation/3D frameworks.

**Allowed:** Custom vanilla JS/CSS or own small in-repo modules.

Modules on this page:

- `portfolio/motion/stage-reveal.js` — stage title and hairline, once
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
