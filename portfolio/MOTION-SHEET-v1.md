# Motion Sheet v1 — peddavommond.de/portfolio
**Owner:** Motion Craft · **Consumer:** Design Implement · **Bar:** felt premium, never carnival
**Basis:** Live IA on peddavommond.de/portfolio (DE+EN). Revise if Art Direction / Product UX lock a different story.
**Date:** 2026-09-22 (Europe/Berlin)

## 0. Global tokens
| Token | Value |
|---|---|
| Duration enter | 480–560ms |
| Duration exit | 280–320ms (prefer leave-in-place) |
| Duration micro | 160–200ms |
| Duration sample | 220–280ms |
| Easing enter | cubic-bezier(0.22, 1, 0.36, 1) |
| Easing exit | cubic-bezier(0.4, 0, 1, 1) |
| Easing micro | cubic-bezier(0.25, 0.1, 0.25, 1) |
| Enter offset Y | 12–16px (never >20px) |
| Enter opacity | 0 → 1 (no blur) |
| Stagger | 40–60ms, max 4 items |
| Intersection | threshold 0.18, once; rootMargin 0px 0px -8% 0px |
| Scrub | OFF by default |

Hard no-gos: bounce/spring/elastic/spin/3D flips; parallax >1 layer; letter scramble; auto carousels; confetti; cursor blobs; moving body copy while reading; stagger >6; decorative infinite loops; text opacity <0.4 mid-transition.

## 1. Scroll map (all once unless noted; no reverse exit)
01 Hero H1+lede — once/load; H1 560ms, lede +80ms; no bg motion
02 Thesis — single block once
03 Agent Collective sample — chrome once; ticks = interaction (see §3); optional progress-rail scrub only, never agent rows
04 Drei Arbeiten — title once; ≤3 cards stagger
05 Graph-Mastermind — title+folded once; expand = interaction
06 Placement 3 roles — title once; cards stagger; no count-up
07 Principles ×4 — title once; stagger; no icon pulse
08 Career arc ×5 — title once; stagger first 4 then stop; connector draw once ≤600ms, not scrubbed
09 Proofs — cards once
10 Skills ×5 — title once; stagger; no skill-bar fills
11 About — block once
12 Education — once (or first 2 only); less motion late page
CV/links — instant, off story

NOTE: Product UX LOCKED beats 0–8 (#top → #contact) supersede this older 01–12 stage list on conflict. Map motion tokens onto UX beats. Collapse career/skills/about/education into #record with reduced late-page motion. Prefer merge/cut of thesis (#builds) if it duplicates hero.

## 2. Focus / hover
focus-visible: 2px ring, offset 2px, ≥3:1, 160ms, no scale
Hover cards: border/opacity 160–200ms; optional −2px Y desktop only
Press: scale 0.98 / 100ms
Mobile: no hover-dependent reveals; ≥44×44 touch

## 3. Sample affordances
Collective: Tick 0 visible after chrome; discrete step 220–280ms label crossfade; large play/step targets; no fake latency/typing dots.
Contract accordion: height 240–280ms + chevron 180°; no typewriter; checklist toggles ≤80ms, do not imply saved run.
Role/case: desktop −2px hover; mobile tap expand; no swipe carousels.

## 4. Mobile
No scrub ≤768px; stagger 0–40ms; Y 8–12px; no scroll-jacking / touchmove preventDefault for motion.

## 5. prefers-reduced-motion: reduce
Instant opacity/transform; stagger off; timeline final; accordion instant; tick instant; hover lift off; sample autoplay off (tap only).

## 6. Impl notes
CSS-first; one Reveal{once,delay,y}; no Framer/GSAP scrub unless AD demands later; reserve CLS space for panel+accordion; DE/EN identical timings.

## 7. Status
v1 shippable vs live IA. AD/UX delta → Motion Craft issues v1.1 deltas only.

Questions on ambiguity → ask Motion Craft, don’t improvise motion.
