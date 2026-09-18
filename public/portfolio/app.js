(() => {
  const root = document.documentElement;
  const header = document.querySelector("[data-site-header]");
  const themeBtn = document.querySelector("[data-theme-toggle]");
  const menuBtn = document.querySelector("[data-menu-toggle]");
  const mobileMenu = document.querySelector("[data-mobile-menu]");

  function currentTheme() {
    return root.classList.contains("light") ? "light" : "dark";
  }

  function applyTheme(next) {
    root.classList.remove("light", "dark");
    root.classList.add(next);
    root.style.colorScheme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {
      /* ignore */
    }
    if (themeBtn) {
      const toLight = themeBtn.getAttribute("data-to-light") || themeBtn.getAttribute("aria-label");
      themeBtn.setAttribute("aria-label", next === "dark" ? (themeBtn.dataset.toLight || toLight) : (themeBtn.dataset.toDark || toLight));
    }
  }

  if (themeBtn) {
    themeBtn.dataset.toLight = themeBtn.getAttribute("aria-label") || "";
    themeBtn.addEventListener("click", () => {
      applyTheme(currentTheme() === "dark" ? "light" : "dark");
    });
  }

  function setMenu(open) {
    if (!mobileMenu || !menuBtn) return;
    menuBtn.setAttribute("aria-expanded", String(open));
    mobileMenu.classList.toggle("max-h-0", !open);
    mobileMenu.classList.toggle("opacity-0", !open);
    mobileMenu.classList.toggle("max-h-96", open);
    mobileMenu.classList.toggle("opacity-100", open);
    document.body.style.overflow = open ? "hidden" : "";
    const top = menuBtn.querySelector("[data-burger=top]");
    const mid = menuBtn.querySelector("[data-burger=mid]");
    const bot = menuBtn.querySelector("[data-burger=bot]");
    top?.classList.toggle("translate-y-[7px]", open);
    top?.classList.toggle("rotate-45", open);
    mid?.classList.toggle("opacity-0", open);
    bot?.classList.toggle("-translate-y-[7px]", open);
    bot?.classList.toggle("-rotate-45", open);
  }

  if (menuBtn) {
    menuBtn.addEventListener("click", () => {
      setMenu(menuBtn.getAttribute("aria-expanded") !== "true");
    });
    mobileMenu?.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => setMenu(false)));
    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape") setMenu(false);
    });
  }

  const onScroll = () => header?.classList.toggle("pf-scrolled", window.scrollY > 16);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  document.querySelectorAll("[data-exp-toggle]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const body = btn.querySelector(".exp-body");
      const open = btn.getAttribute("aria-expanded") === "true";
      btn.setAttribute("aria-expanded", String(!open));
      btn.classList.toggle("border-accent/60", !open);
      body?.toggleAttribute("hidden", open);
      btn.querySelector(".shrink-0")?.classList.toggle("rotate-45", !open);
    });
  });

  const expItems = [...document.querySelectorAll("[data-exp-item]")];
  const expCount = document.querySelector("[data-exp-count]");
  const expFilters = [...document.querySelectorAll("[data-exp-filter]")];
  const expNames = {
    all: expCount?.textContent || "",
  };

  function applyExpFilter(id) {
    let shown = 0;
    expItems.forEach((item) => {
      const match = id === "all" || item.dataset.era === id;
      item.classList.toggle("is-hidden", !match);
      if (match) shown += 1;
    });
    expFilters.forEach((btn) => {
      const on = btn.dataset.expFilter === id;
      btn.setAttribute("aria-pressed", String(on));
      btn.className = on
        ? "rounded-card border px-3.5 py-2 font-mono text-xs tracking-wide transition-colors duration-200 border-accent bg-accent/10 text-accent"
        : "rounded-card border px-3.5 py-2 font-mono text-xs tracking-wide transition-colors duration-200 border-line bg-bg-elevated text-muted hover:border-accent/50 hover:text-fg";
    });
    if (expCount) {
      expCount.textContent = expCount.textContent
        .replace(/\d+\s*\/\s*\d+/, `${shown} / ${expItems.length}`);
    }
  }

  expFilters.forEach((btn) => {
    btn.addEventListener("click", () => applyExpFilter(btn.dataset.expFilter));
  });

  const stackFilters = [...document.querySelectorAll("[data-stack-filter]")];
  const stackCount = document.querySelector("[data-stack-count]");
  const tags = [...document.querySelectorAll("[data-eras]")];

  function applyStackFilter(id) {
    let visible = 0;
    tags.forEach((tag) => {
      const eras = (tag.dataset.eras || "").split(/\s+/);
      const match = id === "all" || eras.includes(id);
      tag.classList.toggle("is-hidden", !match);
      if (match) visible += 1;
    });
    stackFilters.forEach((btn) => {
      const on = btn.dataset.stackFilter === id;
      btn.setAttribute("aria-pressed", String(on));
      btn.className = on
        ? "rounded-card border px-3.5 py-2 font-mono text-xs tracking-wide transition-colors duration-200 border-accent bg-accent/10 text-accent"
        : "rounded-card border px-3.5 py-2 font-mono text-xs tracking-wide transition-colors duration-200 border-line bg-bg-elevated text-muted hover:border-accent/50 hover:text-fg";
    });
    if (stackCount) {
      stackCount.textContent = stackCount.textContent.replace(/\d+/, String(visible));
    }
  }

  stackFilters.forEach((btn) => {
    btn.addEventListener("click", () => applyStackFilter(btn.dataset.stackFilter));
  });
})();
