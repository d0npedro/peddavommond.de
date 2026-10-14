/**
 * Scroll-scrubbed stage. Anime.js v4.5.0 (MIT), vendored at
 * /portfolio/vendor/anime.esm.min.js. Choreography is local.
 *
 * Scroll position seeks every animation (onScroll sync). Scrolling back
 * reverses it. Pins add runway only under html.motion. Reduced motion
 * leaves the server-rendered page untouched.
 */
const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const home = document.getElementById("hero");

if (reduce || !home) {
  document.documentElement.classList.add("is-static");
  document.querySelectorAll("[data-reveal], #hero").forEach((node) => node.classList.add("is-visible"));
} else {
  document.documentElement.classList.add("motion");
  const { animate, onScroll, stagger, splitText } = await import("../vendor/anime.esm.min.js");
  mount(animate, onScroll, stagger, splitText);
}

function mount(animate, onScroll, stagger, splitText) {
  const held = [];
  const linked = [];

  const topbar = () => {
    const raw = getComputedStyle(document.documentElement).getPropertyValue("--topbar");
    const value = parseFloat(raw);
    return Number.isFinite(value) ? value : 68;
  };

  const layoutPins = () => {
    const available = window.innerHeight - topbar();
    for (const id of ["cases", "sample-collective"]) {
      const section = document.getElementById(id);
      const sticky = section?.querySelector(".pf-pin-sticky");
      if (!section || !sticky) continue;
      section.classList.remove("pf-pin-on");
      const fits = id === "cases" || sticky.getBoundingClientRect().height <= available + 16;
      if (fits && window.innerWidth >= 1100) section.classList.add("pf-pin-on");
    }
  };

  const thresholds = (section) =>
    section.classList.contains("pf-pin-on") || section.id === "hero"
      ? { enter: "start start", leave: "end end" }
      : { enter: "end start", leave: "start end" };

  const scrub = (targets, params, section, override, onUpdate) => {
    if (!targets || section == null) return;
    if (typeof targets !== "string" && targets.length === 0) return;
    const scroll = onScroll({
      target: section,
      sync: true,
      ...(override || thresholds(section)),
      onUpdate,
    });
    held.push(scroll);
    linked.push({ scroll, section, override: override || null });
    animate(targets, {
      ease: "linear",
      duration: 1000,
      ...params,
      autoplay: scroll,
    });
  };

  const splitHeadline = (el) => {
    if (!el || el.dataset.split === "1") return [];
    el.dataset.split = "1";
    el.classList.add("pf-chars");
    const split = splitText(el, { chars: true, accessible: true, includeSpaces: true });
    return split.chars ?? [];
  };

  layoutPins();

  const hero = document.getElementById("hero");
  document.querySelectorAll("#hero .pf-hero-beat").forEach((beat, index) => {
    scrub(
      splitHeadline(beat),
      {
        y: [0, index === 1 ? 18 : -20, 0],
        rotate: [0, index === 1 ? 8 : -7, 0],
        delay: stagger(18, { start: index * 140 }),
      },
      hero,
    );
  });

  const heroEngine = '[data-engine="hero"]';
  scrub(`${heroEngine} .pf-grid`, { x: [0, 72], y: [0, -48] }, hero);
  scrub(
    `${heroEngine} .pf-shape--a`,
    { x: [0, 64, -12], y: [0, -36, 16], rotate: [0, 180, 360], scale: [1, 0.4, 1], opacity: [1, 0.2, 1] },
    hero,
  );
  scrub(
    `${heroEngine} .pf-shape--b`,
    { x: [0, -48, 20], y: [0, 28, -12], rotate: [0, -120, -240], scale: [1, 1.35, 0.8] },
    hero,
  );
  scrub(
    `${heroEngine} .pf-shape--c`,
    { x: [0, -28, 36], y: [0, 20, -8], scale: [0.3, 1.2, 0.65], opacity: [0.15, 1, 0.3] },
    hero,
  );
  scrub(`${heroEngine} .pf-shape--d`, { x: [0, 40, 0], y: [0, -32, 10], scale: [1, 1.8, 1] }, hero);
  scrub("#hero .pf-wash", { opacity: [0, 0.08, 0] }, hero);

  const offer = document.getElementById("offer");
  scrub(splitHeadline(offer?.querySelector(".pf-stage-title")), { y: [0, -22, 0], rotate: [0, -5, 0], delay: stagger(12) }, offer);
  scrub('[data-engine="offer"] .pf-grid', { x: [0, -56], y: [0, 24] }, offer);
  scrub(
    '[data-engine="offer"] .pf-shape--a',
    { x: [0, 120, 40], rotate: [0, 90, 200], scale: [0.7, 1.1, 0.85], opacity: [1, 0.35, 1] },
    offer,
  );
  scrub(
    '[data-engine="offer"] .pf-shape--c',
    { x: [0, -80, 24], scale: [0.4, 1, 0.55], opacity: [0.2, 1, 0.25], rotate: [0, 40, 0] },
    offer,
  );
  scrub('[data-engine="offer"] .pf-shape--b', { x: [0, 60], y: [0, -18], rotate: [0, 140] }, offer);
  scrub('[data-engine="offer"] .pf-shape--d', { x: [0, 160, 20], y: [0, 10, -8], scale: [1, 0.5, 1.2] }, offer);
  document.querySelectorAll("#offer .pf-scrub-bar").forEach((bar) => {
    scrub(bar, { scaleX: [0, 1] }, bar.closest(".pf-offer"), { enter: "end start", leave: "center center" });
  });
  const approach = document.getElementById("approach");
  scrub("#approach .pf-principle", { x: [0, 26, 0], delay: stagger(90) }, approach);

  const cases = document.getElementById("cases");
  const casesInner = cases?.querySelector(".container");
  const casesSticky = cases?.querySelector(".pf-pin-sticky");
  const placeCases = (self) => {
    if (!casesInner || !casesSticky) return;
    if (!cases.classList.contains("pf-pin-on") || cases.classList.contains("pf-pin-open")) {
      casesInner.style.transform = "";
      return;
    }
    const delta = Math.max(0, casesSticky.scrollHeight - casesSticky.clientHeight);
    casesInner.style.transform = `translate3d(0, ${(-delta * self.progress).toFixed(2)}px, 0)`;
  };
  cases?.querySelector("details")?.addEventListener("toggle", () => {
    const open = Boolean(cases.querySelector("details[open]"));
    cases.classList.toggle("pf-pin-open", open);
    if (open && casesInner) casesInner.style.transform = "";
  });

  scrub(splitHeadline(cases?.querySelector(".pf-stage-title")), { y: [0, -18, 0], rotate: [0, 4, 0], delay: stagger(12) }, cases);
  document.querySelectorAll("#cases .pf-case-title").forEach((title, index) => {
    scrub(
      splitHeadline(title),
      {
        y: [0, index === 1 ? 16 : -20, 0],
        rotate: [0, index % 2 ? 6 : -6, 0],
        delay: stagger(14, { start: index * 320 }),
      },
      cases,
    );
  });
  scrub('[data-engine="cases"] .pf-grid', { x: [0, 48], y: [0, -36, 0] }, cases, null, placeCases);
  scrub(
    '[data-engine="cases"] .pf-shape--a',
    { x: [0, 90, 180, 24], y: [0, -16, 12, 0], rotate: [0, 120, 240, 360], scale: [0.55, 1, 0.45, 1] },
    cases,
  );
  scrub(
    '[data-engine="cases"] .pf-shape--c',
    { x: [0, -40, 30, 0], scale: [0.25, 0.8, 1.15, 0.5], opacity: [0.2, 1, 0.45, 1], rotate: [0, 20, -10, 0] },
    cases,
  );
  scrub('[data-engine="cases"] .pf-shape--b', { x: [0, 70, -20], rotate: [0, -160, -300], scale: [1, 0.6, 1] }, cases);
  scrub('[data-engine="cases"] .pf-shape--d', { x: [0, 140, 40], y: [0, -20, 8], scale: [1, 1.6, 0.8] }, cases);
  document.querySelectorAll("#cases .pf-case-card").forEach((card, index) => {
    scrub(card, { y: [0, index % 2 ? 14 : -14, 0] }, cases);
  });

  const sample = document.getElementById("sample-collective");
  scrub(
    splitHeadline(sample?.querySelector(".pf-stage-title")),
    { y: [0, -18, 0], rotate: [0, -4, 0], delay: stagger(12) },
    sample,
  );
  scrub(
    '[data-engine="sample"] .pf-shape',
    { y: [0, -22, 0], rotate: [0, 180, 360], scale: [0.85, 1.05, 0.85], delay: stagger(140) },
    sample,
  );
  scrub('[data-engine="sample"] .pf-grid', { x: [0, -64], y: [0, 20] }, sample);

  const record = document.getElementById("record");
  scrub(
    splitHeadline(record?.querySelector(".pf-record-title")),
    { y: [0, -16, 0], rotate: [0, 3, 0], delay: stagger(14) },
    record,
  );

  const contact = document.getElementById("contact");
  scrub(
    splitHeadline(contact?.querySelector(".pf-footer-title")),
    { y: [0, -20, 0], rotate: [0, -5, 0], delay: stagger(20) },
    contact,
  );

  const craft = document.getElementById("craft-credit");
  scrub("[data-craft-rule]", { scaleX: [0, 1] }, craft, { enter: "end start", leave: "center center" });

  document.querySelectorAll("[data-wash]").forEach((wash) => {
    const section = wash.closest("section");
    if (!section || section.id === "hero") return;
    scrub(wash, { opacity: [0, 0.06, 0] }, section);
  });

  const syncLayout = () => {
    layoutPins();
    for (const item of linked) {
      const next = item.override || thresholds(item.section);
      item.scroll._params.enter = next.enter;
      item.scroll._params.leave = next.leave;
      item.scroll.refresh();
    }
  };

  let resizeTick = 0;
  window.addEventListener(
    "resize",
    () => {
      if (resizeTick) return;
      resizeTick = requestAnimationFrame(() => {
        resizeTick = 0;
        syncLayout();
      });
    },
    { passive: true },
  );
}
