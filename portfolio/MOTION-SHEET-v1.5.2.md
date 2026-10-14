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

## Impl lock

**Forbidden:** Three.js · GSAP · Framer Motion · Lottie · importing the `animejs` package name.

**Allowed:** Anime.js v4.5.0 MIT, vendored at `portfolio/vendor/anime.esm.min.js`, driven by local choreography in `portfolio/motion/stage-reveal.js`. ScrollObserver `sync: true` scrubs transform and opacity. Pins, split text, and shape travel reverse on scroll up.

Modules on this page:

- `portfolio/motion/stage-reveal.js` — scroll-scrubbed headlines, shapes, grids, pins
- `portfolio/motion/craft-mark.js` — static SVG line when motion is off
- `portfolio/vendor/anime.esm.min.js` — pinned Anime.js v4.5.0 bundle

## Timing (carried from v1.5)

| Token | Value |
|---|---|
| Stage title enter | 480–560ms · opacity + Y 12–16px (mobile 8–12) · once |
| Hairline enter | 400–480ms · opacity |
| Sample internal | 220–280ms |
| Micro | 160–200ms |
| Easing enter | `cubic-bezier(0.22, 1, 0.36, 1)` |
| Scrub | ON — `onScroll({ sync: true })`, transform and opacity only |
| Reverse exit | ON — scroll position seeks the animation |

## `#craft-credit`

One authored effect. Technique label stays visible. `prefers-reduced-motion` leaves the stroke fully drawn. Not a second Collective, not a logo wall, not a performance claim.

## Collective trust gate

No decorative Collective motion. Step, failure, and reset update state in place. The failure control uses a plain string label (`Fehler zeigen` / `Show failure`).
