# Motion Sheet v1.4 — JOINT LOCK (AD + Product UX)
**Owner:** Motion Craft · **Consumer:** Design Implement · **Bar:** felt premium, never carnival  
**Status:** **CO-SIGN CLOSED** — Art Direction + Product UX aligned. This is the **only** file Design Implement should follow.  
**Live:** https://www.peddavommond.de/portfolio  
**Date:** 2026-09-22 (Europe/Berlin)  
**Supersedes:** v1–v1.3 (history only).

---

## Locked section order

`#top` → `#builds` (optional: **merge/cut** if duplicates hero) → `#sample-collective` → **case spotlights** (tall sequential: Graph-Mastermind → Agent Collective → enterprise/loyalty) → `#sample-graph` → `#offer` → `#record` (collapsed) → `#contact`

**Do not** keep `#approach` as its own scroll beat. Fold Evaluation / HITL / Security / Observability **under `#offer`** or delete as a stage.

---

## 0. Global tokens

| Token | Value |
|---|---|
| Stage title enter | 480–560ms · opacity + Y 12–16px (mobile 8–12) · **once** |
| Hairline enter | 400–480ms · opacity (+ optional scaleX 0.92→1) |
| Sample internal | 220–280ms |
| Micro (focus/CTA) | 160–200ms |
| Easing enter | `cubic-bezier(0.22, 1, 0.36, 1)` |
| Easing micro | `cubic-bezier(0.25, 0.1, 0.25, 1)` |
| Scrub | **OFF** |
| Reverse exit | **OFF** |
| Nav / sticky | **Never animate** |

**Hard no-gos:** neon purple/cyan AI gradients; multi-accent rainbow; KPI/number counters; scan-sweep / corner ticks; agency 3-up hover-lift grids; parallax that fights reading; chat-bubble / typing-demo on Collective; accordion bounce; card zoom/lift; decorative motion over broken chrome (`[object Object]` = **Implementation P0**, fix before motion on that surface).

---

## 1. Beat map — enter vs static

| Beat | Enter | Static |
|---|---|---|
| `#top` | One **teal fill** CTA micro only | One promise (“Die Schicht…”) + name/role |
| `#builds` | Cut/merge if duplicate; else title once | Honesty split body; bronze chips static |
| `#sample-collective` | **Panel stays present** (no fly-in). Internal Schritt/Zurück/(Play) only | Honesty chips, captions |
| Cases (sequential) | Per spotlight: **title + hairline once** on IO | Case body · air = layout only |
| `#sample-graph` | **Panel stays present**. Tab content crossfade **or instant** | Contract body |
| `#offer` | Stage title once; package chrome restrained or static | Package copy · approach one-liners folded here |
| `#record` | Collapsed shell once; expand = simple (no bounce) | Career/credentials/skills/about/education |
| `#contact` | none | Promise echo + `peter.henrichs@web.de` |

---

## 2. Cases (locked)

- Tall **sequential** spotlights only — order: Graph-Mastermind → Agent Collective → enterprise/loyalty  
- One idea each + air between (margin, not motion)  
- **Zero** agency 3-up grid · **zero** hover-lift  
- Enter: title + hairline once per stage · no zoom  

---

## 3. Sample affordances

**Collective:** Schritt / Zurück (+ Play if present) ≥44×44; statuses update in place 220–280ms; no autoplay; no chat vibes.  

**Graph:** tabs AGENT.md / CHECKLIST / Runtime; crossfade or instant; checkboxes 44px; **no accordion bounce**.  

**CTA:** primary = teal fill only; secondary = outline.  

---

## 4. Focus

`:focus-visible` — 2px ring, 2px offset, contrast ≥3:1, 160ms, no scale. Mobile: no hover-only; taps ≥44×44.

---

## 5. `prefers-reduced-motion: reduce`

Stage reveals → instant opacity. Samples fully usable with instant state. No scrub theatre.

---

## 6. Impl notes

1. Primitives: `StageTitleReveal`, `HairlineReveal`, `SampleState` — samples must not share a fly-in wrapper.  
2. One IO per case spotlight; no stagger grid.  
3. CLS: reserve space for collective + graph.  
4. DE|EN identical motion.  
5. **Single source of truth:** this file (`MOTION-SHEET-v1.4.md` / `MOTION-SHEET.md`).

---

## 7. Co-sign

| Role | Status |
|---|---|
| Product UX | IA locked (prior) |
| Art Direction | **CO-SIGN** — locks with UX map (2026-09-22) |
| Motion Craft | Sheet stamped **joint closed** |
| Design Implement | Implement **this file only** |
