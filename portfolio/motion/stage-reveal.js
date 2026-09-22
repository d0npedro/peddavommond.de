/**
 * Stage enter — once. Custom vanilla. No animation library.
 * Titles and hairlines reveal on intersection; nav never moves.
 */
(() => {
  const nodes = [...document.querySelectorAll("[data-reveal]")];
  if (!nodes.length) return;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce || !("IntersectionObserver" in window)) {
    nodes.forEach((node) => node.classList.add("is-visible"));
    return;
  }
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
  nodes.forEach((node) => io.observe(node));
})();
