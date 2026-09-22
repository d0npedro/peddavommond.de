/**
 * Craft mark — one authored SVG stroke draw. Not a product sample.
 * prefers-reduced-motion: the line stays fully drawn.
 */
(() => {
  const root = document.querySelector("[data-craft-mark]");
  const path = root?.querySelector("path");
  if (!root || !path || typeof path.getTotalLength !== "function") return;

  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce || !("IntersectionObserver" in window)) {
    path.style.strokeDashoffset = "0";
    return;
  }

  const length = path.getTotalLength();
  path.style.strokeDasharray = String(length);
  path.style.strokeDashoffset = String(length);

  const io = new IntersectionObserver(
    (entries, observer) => {
      if (!entries.some((entry) => entry.isIntersecting)) return;
      observer.disconnect();
      const start = performance.now();
      const duration = 900;
      const tick = (now) => {
        const t = Math.min(1, (now - start) / duration);
        const eased = 1 - (1 - t) ** 3;
        path.style.strokeDashoffset = String(length * (1 - eased));
        if (t < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    },
    { threshold: 0.6 },
  );
  io.observe(root);
})();
