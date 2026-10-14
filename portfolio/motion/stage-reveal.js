/**
 * Stage enter — once. Custom vanilla. No animation library.
 * Titles and hairlines reveal on intersection; nav never moves.
 * The scroll playhead and hero engine run on transform only, and the
 * engine loop stops while the hero is off screen.
 */
(() => {
  const nodes = [...document.querySelectorAll("[data-reveal]")];
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const hero = document.getElementById("hero");

  if (reduce || !("IntersectionObserver" in window)) {
    nodes.forEach((node) => node.classList.add("is-visible"));
    hero?.classList.add("is-visible");
    document.documentElement.classList.add("is-static");
    return;
  }

  hero?.classList.add("is-visible");

  const io = new IntersectionObserver(
    (entries, observer) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    },
    { threshold: 0.18, rootMargin: "0px 0px -8% 0px" },
  );

  const viewBottom = window.innerHeight * 0.92;
  nodes.forEach((node) => {
    if (node.getBoundingClientRect().top < viewBottom) node.classList.add("is-visible");
    else io.observe(node);
  });

  document.documentElement.classList.add("motion");

  const cursor = document.createElement("div");
  cursor.className = "pf-scroll-cursor";
  cursor.setAttribute("aria-hidden", "true");
  document.body.appendChild(cursor);

  const engine = document.querySelector("[data-engine]");
  let raf = 0;
  let engineOn = false;

  const paint = () => {
    raf = 0;
    const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    const progress = Math.min(1, Math.max(0, window.scrollY / max));
    cursor.style.transform = `scaleX(${progress})`;
    if (engine && engineOn) {
      engine.style.setProperty("--py", (window.scrollY / Math.max(1, window.innerHeight)).toFixed(4));
    }
  };

  const schedule = () => {
    if (!raf) raf = requestAnimationFrame(paint);
  };

  window.addEventListener("scroll", schedule, { passive: true });
  paint();

  if (engine && hero) {
    const watch = new IntersectionObserver(([entry]) => {
      engineOn = entry.isIntersecting;
      if (engineOn) schedule();
    });
    watch.observe(hero);
  }
})();
