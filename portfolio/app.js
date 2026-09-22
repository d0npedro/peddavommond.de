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

  const navLinks = [...document.querySelectorAll("[data-nav]")].filter((link) => {
    const id = link.getAttribute("data-nav");
    return id && document.getElementById(id);
  });
  const watched = navLinks
    .map((link) => document.getElementById(link.getAttribute("data-nav")))
    .filter(Boolean);
  function setActiveNav(id) {
    navLinks.forEach((link) => {
      link.classList.toggle("is-active", link.getAttribute("data-nav") === id);
    });
  }
  if (watched.length && "IntersectionObserver" in window) {
    const spy = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target?.id) setActiveNav(visible.target.id);
      },
      { rootMargin: "-28% 0px -58% 0px", threshold: [0.15, 0.35, 0.6] },
    );
    watched.forEach((section) => spy.observe(section));
  }

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

  const revealNodes = [...document.querySelectorAll("[data-reveal]")];
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduceMotion || !("IntersectionObserver" in window)) {
    revealNodes.forEach((node) => node.classList.add("is-visible"));
  } else {
    const io = new IntersectionObserver(
      (entries, observer) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.15 },
    );
    revealNodes.forEach((node) => io.observe(node));
  }

  function paintCollective(root, data, mode, index) {
    const frame = data[mode][index];
    const tick = root.querySelector("[data-tick]");
    const phase = root.querySelector("[data-phase]");
    const detail = root.querySelector("[data-detail]");
    const list = root.querySelector("[data-agents]");
    if (tick) tick.textContent = frame.tick;
    if (phase) phase.textContent = frame.phase;
    if (detail) detail.textContent = frame.detail;
    if (!list) return;
    list.replaceChildren();
    for (const agent of frame.agents) {
      const li = document.createElement("li");
      li.className = "pf-agent";
      const role = document.createElement("span");
      role.className = "pf-agent-role";
      role.textContent = agent.role;
      const status = document.createElement("span");
      status.className = "pf-agent-status";
      status.dataset.status = agent.status;
      status.textContent = agent.status;
      li.append(role, status);
      list.append(li);
    }
  }

  document.querySelectorAll("[data-touch='collective']").forEach((root) => {
    const island = root.querySelector("#pf-collective-frames");
    if (!island) return;
    let data;
    try {
      data = JSON.parse(island.textContent || "");
    } catch {
      return;
    }
    if (!data.review?.length || !data.fail?.length) return;
    let mode = "review";
    let index = 0;
    const failBtn = root.querySelector("[data-action='fail']");
    root.querySelector("[data-action='step']")?.addEventListener("click", () => {
      const frames = data[mode];
      index = (index + 1) % frames.length;
      paintCollective(root, data, mode, index);
    });
    failBtn?.addEventListener("click", () => {
      mode = "fail";
      index = 0;
      failBtn.setAttribute("aria-pressed", "true");
      paintCollective(root, data, mode, index);
    });
    root.querySelector("[data-action='reset']")?.addEventListener("click", () => {
      mode = "review";
      index = 0;
      failBtn?.setAttribute("aria-pressed", "false");
      paintCollective(root, data, mode, index);
    });
  });

  document.querySelectorAll("[data-touch='contract']").forEach((root) => {
    const tabs = [...root.querySelectorAll("[data-tab]")];
    const panels = [...root.querySelectorAll("[data-panel]")];
    function select(id) {
      tabs.forEach((tab) => {
        const on = tab.dataset.tab === id;
        tab.setAttribute("aria-selected", String(on));
        tab.tabIndex = on ? 0 : -1;
      });
      panels.forEach((panel) => {
        panel.hidden = panel.dataset.panel !== id;
      });
    }
    tabs.forEach((tab) => {
      tab.addEventListener("click", () => select(tab.dataset.tab));
      tab.addEventListener("keydown", (event) => {
        const current = tabs.indexOf(tab);
        if (current < 0) return;
        let next = current;
        if (event.key === "ArrowRight") next = (current + 1) % tabs.length;
        else if (event.key === "ArrowLeft") next = (current - 1 + tabs.length) % tabs.length;
        else if (event.key === "Home") next = 0;
        else if (event.key === "End") next = tabs.length - 1;
        else return;
        event.preventDefault();
        const target = tabs[next];
        select(target.dataset.tab);
        target.focus();
      });
    });
  });

  const record = document.querySelector("[data-record]");
  function openRecordForHash() {
    if (!record) return;
    const id = (location.hash || "").slice(1);
    if (!id) return;
    if (record.querySelector("#" + (window.CSS && CSS.escape ? CSS.escape(id) : id))) {
      record.open = true;
    }
  }
  openRecordForHash();
  window.addEventListener("hashchange", openRecordForHash);
})();
