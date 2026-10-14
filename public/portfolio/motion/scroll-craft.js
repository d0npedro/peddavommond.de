/**
 * Award-portfolio scroll craft.
 * GSAP 3.12.7 + ScrollTrigger and Lenis 1.1.20, vendored, standard license.
 * prefers-reduced-motion: this file does nothing and the page stays static.
 * Motion is transform and opacity only. No custom cursor on coarse pointers.
 */
(() => {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const fine = window.matchMedia("(hover: hover) and (pointer: fine) and (min-width: 960px)");
  if (reduce || !window.gsap || !window.ScrollTrigger) {
    document.documentElement.classList.remove("pf-motion");
    return;
  }

  const gsap = window.gsap;
  const ScrollTrigger = window.ScrollTrigger;
  gsap.registerPlugin(ScrollTrigger);

  const desktop = () => fine.matches;
  const onTimeline = Boolean(document.getElementById("timeline-boot"));

  function splitMasks() {
    document.querySelectorAll(".pf-mask").forEach((mask) => {
      if (mask.dataset.lined) return;
      if (mask.closest(".pf-hero-beat")) {
        mask.dataset.lined = "true";
        return;
      }
      const inner = mask.querySelector(":scope > .pf-mask-in");
      if (!inner) return;
      const text = inner.textContent.replace(/\s+/g, " ").trim();
      if (!text) return;
      const words = text.split(" ");
      inner.replaceChildren();
      words.forEach((word, index) => {
        if (index) inner.appendChild(document.createTextNode(" "));
        const span = document.createElement("span");
        span.className = "pf-word";
        span.textContent = word;
        inner.appendChild(span);
      });
      const groups = [];
      let group = [];
      let top = null;
      inner.querySelectorAll(".pf-word").forEach((span) => {
        const next = span.offsetTop;
        if (top === null || Math.abs(next - top) <= 3) {
          group.push(span.textContent);
          top = next;
        } else {
          groups.push(group);
          group = [span.textContent];
          top = next;
        }
      });
      if (group.length) groups.push(group);
      mask.dataset.lined = "true";
      if (groups.length <= 1) {
        inner.textContent = text;
        return;
      }
      const parent = mask.parentNode;
      groups.forEach((line) => {
        const next = document.createElement("span");
        next.className = "pf-mask";
        next.dataset.lined = "true";
        const lineInner = document.createElement("span");
        lineInner.className = "pf-mask-in";
        lineInner.textContent = line.join(" ");
        next.appendChild(lineInner);
        parent.insertBefore(next, mask);
      });
      mask.remove();
    });
  }

  function rise(targets, extra) {
    return gsap.fromTo(targets, { y: 0, yPercent: 110 }, {
      y: 0,
      yPercent: 0,
      ...extra,
    });
  }

  function revealHeading(heading, trigger, scrub) {
    const inners = heading.querySelectorAll(".pf-mask-in");
    if (!inners.length) return;
    if (scrub) {
      rise(inners, {
        ease: "none",
        scrollTrigger: {
          trigger,
          start: "top bottom",
          end: "top 50%",
          scrub: 0.4,
        },
      });
      return;
    }
    rise(inners, {
      duration: 1.15,
      ease: "power4.out",
      stagger: 0.08,
      scrollTrigger: {
        trigger: trigger || heading,
        start: "top 86%",
        once: true,
      },
    });
  }

  function mountReveals(spacer) {
    const hero = document.querySelectorAll("#hero .pf-mask-in");
    if (hero.length) {
      rise(hero, {
        duration: 1.2,
        ease: "power4.out",
        stagger: 0.1,
        delay: 0.05,
      });
    }
    document.querySelectorAll("h2, h3").forEach((heading) => {
      if (heading.closest("#hero")) return;
      const contact = heading.closest("#contact");
      if (contact && spacer) {
        revealHeading(heading, spacer, true);
        return;
      }
      revealHeading(heading, heading, false);
    });
    gsap.utils.toArray(".pf-hairline").forEach((line) => {
      gsap.fromTo(line, { scaleX: 0, opacity: 0 }, {
        scaleX: 1,
        opacity: 1,
        duration: 0.8,
        ease: "power3.out",
        transformOrigin: "left center",
        scrollTrigger: { trigger: line, start: "top 90%", once: true },
      });
    });
  }

  function mountPins() {
    if (!desktop()) return;
    [
      [".pf-offer-pin", ".pf-offer-sticky"],
      [".pf-cases-pin", ".pf-cases-sticky"],
    ].forEach(([rootSel, pinSel]) => {
      const root = document.querySelector(rootSel);
      const pin = document.querySelector(pinSel);
      if (!root || !pin) return;
      ScrollTrigger.create({
        trigger: root,
        start: "top top+=92",
        end: "bottom bottom",
        pin,
        pinSpacing: false,
        invalidateOnRefresh: true,
      });
    });
  }

  function mountParallax() {
    if (!desktop()) return;
    gsap.utils.toArray(".pf-parallax-in").forEach((el) => {
      gsap.fromTo(el, { yPercent: -8 }, {
        yPercent: 8,
        ease: "none",
        scrollTrigger: {
          trigger: el.closest(".pf-parallax") || el,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    });
    const panel = document.querySelector("#sample-collective .pf-touch");
    if (panel) {
      gsap.fromTo(panel, { y: 28 }, {
        y: -18,
        ease: "none",
        scrollTrigger: {
          trigger: "#sample-collective",
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }
    document.querySelectorAll(".pf-offer").forEach((card, index) => {
      const distance = 18 + (index % 3) * 10;
      gsap.fromTo(card, { y: distance }, {
        y: -distance * 0.35,
        ease: "none",
        scrollTrigger: {
          trigger: card,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    });
  }

  function mountMagnet() {
    if (!desktop()) return;
    document.querySelectorAll(".pf-cta--primary, .pf-touch-btn").forEach((el) => {
      const xTo = gsap.quickTo(el, "x", { duration: 0.45, ease: "power3.out" });
      const yTo = gsap.quickTo(el, "y", { duration: 0.45, ease: "power3.out" });
      el.addEventListener("mousemove", (event) => {
        const rect = el.getBoundingClientRect();
        const dx = event.clientX - (rect.left + rect.width / 2);
        const dy = event.clientY - (rect.top + rect.height / 2);
        if (Math.hypot(dx, dy) > Math.max(rect.width, rect.height) * 0.85) return;
        xTo(dx * 0.28);
        yTo(dy * 0.28);
      });
      el.addEventListener("mouseleave", () => {
        xTo(0);
        yTo(0);
      });
    });
  }

  function mountCursor() {
    if (!desktop()) return;
    const cursor = document.createElement("div");
    cursor.className = "pf-cursor";
    cursor.setAttribute("aria-hidden", "true");
    const dot = document.createElement("span");
    cursor.appendChild(dot);
    document.body.appendChild(cursor);
    document.documentElement.classList.add("pf-cursor-on");
    const xTo = gsap.quickTo(cursor, "x", { duration: 0.4, ease: "power3.out" });
    const yTo = gsap.quickTo(cursor, "y", { duration: 0.4, ease: "power3.out" });
    window.addEventListener("mousemove", (event) => {
      xTo(event.clientX);
      yTo(event.clientY);
      cursor.style.opacity = "1";
    }, { passive: true });
    document.addEventListener("mouseover", (event) => {
      const hot = event.target instanceof Element && event.target.closest("a, button, summary, label");
      dot.classList.toggle("is-hot", Boolean(hot));
    });
    document.addEventListener("mouseleave", () => {
      cursor.style.opacity = "0";
    });
  }

  function mountContactSheet() {
    const contact = document.querySelector("#contact.pf-footer");
    const main = document.querySelector("main");
    if (!contact || !main || !desktop()) return null;
    const spacer = document.createElement("div");
    spacer.className = "pf-contact-spacer";
    spacer.setAttribute("aria-hidden", "true");
    contact.before(spacer);
    contact.classList.add("is-sheet");
    const place = () => {
      spacer.style.height = `${contact.offsetHeight}px`;
    };
    place();
    const observer = new ResizeObserver(place);
    observer.observe(contact);
    return spacer;
  }

  function mountLenis() {
    if (onTimeline || !desktop() || typeof window.Lenis !== "function") return null;
    const lenis = new window.Lenis({
      lerp: 0.1,
      smoothWheel: true,
      syncTouch: false,
      wheelMultiplier: 0.92,
      anchors: { offset: -80 },
    });
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    return lenis;
  }

  document.querySelectorAll("pre, [role='dialog'], .pf-snippet").forEach((el) => {
    el.setAttribute("data-lenis-prevent", "");
  });

  const boot = () => {
    splitMasks();
    const spacer = mountContactSheet();
    const lenis = mountLenis();
    if (lenis && typeof lenis.resize === "function") lenis.resize();
    mountPins();
    mountReveals(spacer);
    mountParallax();
    mountMagnet();
    mountCursor();
    ScrollTrigger.refresh();
    document.querySelectorAll(".pf-parallax img").forEach((img) => {
      if (!img.complete) {
        img.addEventListener("load", () => ScrollTrigger.refresh(), { once: true });
      }
    });
    fine.addEventListener("change", () => {
      if (!fine.matches && lenis) lenis.destroy();
      ScrollTrigger.refresh();
    });
  };

  const start = () => {
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => requestAnimationFrame(boot));
    } else {
      boot();
    }
  };
  start();
})();
