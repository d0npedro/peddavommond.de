/**
 * Lebenslauf timeline — vanilla JS.
 * Year rail (drag, keyboard, role=slider) stays in sync with an
 * IntersectionObserver scroll-spy. Deep dive is a dialog on the
 * timeline URL via pushState; the same URL is also a static page.
 * No animation library. prefers-reduced-motion skips transitions.
 */
let releaseTrap = null;

const bootEl = document.getElementById("timeline-boot");
if (!bootEl) {
  /* Timeline module is only meaningful next to its boot payload. */
} else {
  const boot = JSON.parse(bootEl.textContent);
  if (boot.mode === "dive") initStaticDive(boot);
  else initTimeline(boot);
}

function reducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function transition(fn) {
  if (!reducedMotion() && typeof document.startViewTransition === "function") {
    document.startViewTransition(fn);
  } else {
    fn();
  }
}

function esc(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function mark(value) {
  return esc(value).replace(/\[([^\]\n]{1,80})\]/g, '<mark class="ph-token">[$1]</mark>');
}

function safeUrl(href) {
  const value = String(href ?? "");
  if (value.startsWith("/") || value.startsWith("https://") || value.startsWith("http://") || value.startsWith("mailto:")) {
    return value;
  }
  return "";
}

const FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

function focusables(root) {
  return [...root.querySelectorAll(FOCUSABLE)].filter((el) => !el.closest("[hidden]") && el.getAttribute("aria-hidden") !== "true");
}

function trapFocus(root, onEscape) {
  releaseTrap?.();
  const onKey = (ev) => {
    if (ev.key === "Escape") {
      ev.preventDefault();
      onEscape();
      return;
    }
    if (ev.key !== "Tab") return;
    const nodes = focusables(root);
    if (!nodes.length) return;
    const first = nodes[0];
    const last = nodes[nodes.length - 1];
    if (ev.shiftKey && document.activeElement === first) {
      ev.preventDefault();
      last.focus();
    } else if (!ev.shiftKey && document.activeElement === last) {
      ev.preventDefault();
      first.focus();
    }
  };
  document.addEventListener("keydown", onKey);
  releaseTrap = () => {
    document.removeEventListener("keydown", onKey);
    releaseTrap = null;
  };
}

function initStaticDive(boot) {
  const root = document.getElementById("deep-dive");
  if (!root) return;
  const leave = () => {
    window.location.assign(boot.returnHref);
  };
  trapFocus(root, leave);
  root.querySelector("[data-close]")?.addEventListener("click", (ev) => {
    if (ev.metaKey || ev.ctrlKey || ev.shiftKey || ev.altKey || ev.button !== 0) return;
    ev.preventDefault();
    leave();
  });
  const close = root.querySelector("#dd-close");
  close?.focus();
}

function initTimeline(boot) {
  const entries = boot.entries ?? [];
  const byId = Object.fromEntries(entries.map((entry) => [entry.id, entry]));
  const years = [...new Set(entries.map((entry) => entry.year).filter((year) => /^\d{4}$/.test(year)))];
  const listEl = document.getElementById("entry-list");
  const previewEl = document.getElementById("preview");
  const railEl = document.getElementById("year-rail");
  const scrubEl = document.getElementById("mobile-scrub");
  const diveEl = document.getElementById("deep-dive");
  const shell = document.getElementById("timeline-app");
  if (!listEl || !previewEl || !railEl || !scrubEl || !diveEl) return;

  let activeId = entries[0]?.id ?? null;
  let lockSpy = false;
  let lockTimer = 0;
  let spyFrame = 0;
  const baseTitle = document.title;
  const mobileQuery = window.matchMedia("(max-width: 959px)");

  function entryYear(entry) {
    return entry?.year && /^\d{4}$/.test(entry.year) ? entry.year : "";
  }

  function holdSpy() {
    lockSpy = true;
    window.clearTimeout(lockTimer);
    lockTimer = window.setTimeout(() => {
      lockSpy = false;
    }, reducedMotion() ? 40 : 700);
  }

  function previewHTML(entry, { inline = false } = {}) {
    if (!entry) return "";
    const honesty = boot.honesty[entry.honesty] ?? entry.honesty;
    const type = boot.types[entry.type] ?? entry.type;
    const stack = (entry.stack ?? []).map((item) => `<li>${mark(item)}</li>`).join("");
    const media = entry.media?.src
      ? `<img class="preview-media" src="${esc(safeUrl(entry.media.src))}" alt="${esc(entry.media.alt ?? "")}" loading="lazy" decoding="async"/>`
      : "";
    const result = entry.result
      ? `<div class="result">${mark(entry.result.text)}${
          entry.result.source ? `<span class="src">${esc(boot.sourceLabel)}: ${esc(entry.result.source)}</span>` : ""
        }</div>`
      : "";
    const flag = entry.placeholder ? `<p class="placeholder-flag">${esc(boot.placeholderLabel)}</p>` : "";
    const head = inline
      ? ""
      : `<p class="kicker">${esc(type)} · ${esc(honesty)} · ${mark(entry.periodLabel)}</p>
${flag}
<h2>${mark(entry.title)}</h2>`;
    const open = inline
      ? ""
      : `<a class="btn" href="${esc(entry.diveHref)}" data-open-dive="${esc(entry.id)}">${esc(boot.openLabel)}</a>`;
    return `${head}
${media}
<p class="body">${mark(entry.summary)}</p>
${stack ? `<ul class="stack">${stack}</ul>` : ""}
${result}
${open}`;
  }

  function renderPreview() {
    previewEl.innerHTML = previewHTML(byId[activeId]);
  }

  let hoverLock = false;

  function updateInline() {
    listEl.querySelectorAll(".preview-inline").forEach((node) => node.remove());
    if (!mobileQuery.matches || !activeId) return;
    holdSpy();
    const card = listEl.querySelector(`[data-id="${CSS.escape(activeId)}"]`);
    if (!card) return;
    const pane = document.createElement("div");
    pane.className = "preview-inline";
    pane.innerHTML = previewHTML(byId[activeId], { inline: true });
    card.append(pane);
  }

  function setCurrent(id) {
    listEl.querySelectorAll(".entry-card").forEach((card) => {
      if (card.dataset.id === id) card.setAttribute("aria-current", "true");
      else card.removeAttribute("aria-current");
    });
  }

  function updateRailVisual(year) {
    const known = years.includes(year);
    const idx = known ? years.indexOf(year) : -1;
    const thumb = railEl.querySelector(".rail-thumb");
    const label = railEl.querySelector(".year-label");
    const range = scrubEl.querySelector("#scrub-range");
    const scrubLabel = scrubEl.querySelector(".year-label");
    if (known) {
      const top = (idx / Math.max(years.length - 1, 1)) * 100;
      if (thumb) thumb.style.top = `${top}%`;
      if (label) label.textContent = year;
      if (scrubLabel) scrubLabel.textContent = year;
      if (range) range.value = String(idx);
      railEl.setAttribute("aria-valuenow", year);
      railEl.setAttribute("aria-valuetext", year);
      range?.setAttribute("aria-valuetext", year);
    } else {
      railEl.removeAttribute("aria-valuenow");
      railEl.setAttribute("aria-valuetext", boot.placeholderLabel);
    }
  }

  function setActive(id, { scrollList = false } = {}) {
    if (!byId[id]) return;
    const changed = id !== activeId;
    activeId = id;
    setCurrent(id);
    if (changed) {
      renderPreview();
      updateInline();
    }
    updateRailVisual(entryYear(byId[id]));
    if (scrollList) {
      const card = listEl.querySelector(`[data-id="${CSS.escape(id)}"]`);
      if (card) {
        holdSpy();
        card.scrollIntoView({ block: "start", behavior: reducedMotion() ? "auto" : "smooth" });
      }
    }
  }

  function scrubToYear(year) {
    if (!years.includes(year)) return;
    const first = entries.find((entry) => entry.year === year);
    updateRailVisual(year);
    if (first) setActive(first.id, { scrollList: true });
  }

  function renderRail() {
    if (!years.length) return;
    const min = years[years.length - 1];
    const max = years[0];
    railEl.tabIndex = 0;
    railEl.setAttribute("role", "slider");
    railEl.setAttribute("aria-orientation", "vertical");
    railEl.setAttribute("aria-valuemin", min);
    railEl.setAttribute("aria-valuemax", max);
    railEl.setAttribute("aria-label", boot.yearRailLabel);
    railEl.innerHTML = `<div class="year-label">${esc(max)}</div>
<div class="rail-track">
  <div class="rail-thumb"></div>
  <div class="rail-years">${years
    .map((year, index) => {
      const top = (index / Math.max(years.length - 1, 1)) * 100;
      return `<span style="top:${top}%">${esc(year)}</span>`;
    })
    .join("")}</div>
</div>`;

    const track = railEl.querySelector(".rail-track");
    let dragging = false;
    const yearFromClientY = (clientY) => {
      const rect = track.getBoundingClientRect();
      const ratio = rect.height ? Math.min(1, Math.max(0, (clientY - rect.top) / rect.height)) : 0;
      const index = Math.round(ratio * (years.length - 1));
      return years[index];
    };
    track.addEventListener("pointerdown", (ev) => {
      dragging = true;
      track.setPointerCapture?.(ev.pointerId);
      scrubToYear(yearFromClientY(ev.clientY));
    });
    track.addEventListener("pointermove", (ev) => {
      if (!dragging) return;
      scrubToYear(yearFromClientY(ev.clientY));
    });
    const endDrag = () => {
      dragging = false;
    };
    track.addEventListener("pointerup", endDrag);
    track.addEventListener("pointercancel", endDrag);

    railEl.addEventListener("keydown", (ev) => {
      const current = railEl.getAttribute("aria-valuenow") || years[0];
      const index = Math.max(0, years.indexOf(current));
      const go = (next) => {
        ev.preventDefault();
        scrubToYear(next);
      };
      if (ev.key === "ArrowDown" || ev.key === "PageDown" || ev.key === "ArrowRight") go(years[Math.min(years.length - 1, index + 1)]);
      else if (ev.key === "ArrowUp" || ev.key === "PageUp" || ev.key === "ArrowLeft") go(years[Math.max(0, index - 1)]);
      else if (ev.key === "Home") go(years[0]);
      else if (ev.key === "End") go(years[years.length - 1]);
    });

    scrubEl.innerHTML = `<span class="year-label">${esc(max)}</span>
<input id="scrub-range" type="range" min="0" max="${years.length - 1}" value="0" aria-label="${esc(boot.chooseYear)}" aria-valuetext="${esc(max)}"/>`;
    scrubEl.querySelector("#scrub-range").addEventListener("input", (ev) => {
      scrubToYear(years[Number(ev.target.value)]);
    });
    updateRailVisual(entryYear(byId[activeId]) || years[0]);
  }

  function diveMarkup(entry) {
    const honesty = boot.honesty[entry.honesty] ?? entry.honesty;
    const type = boot.types[entry.type] ?? entry.type;
    const stack = (entry.stack ?? []).map((item) => `<li>${mark(item)}</li>`).join("");
    const media = entry.media?.src
      ? `<img class="preview-media" src="${esc(safeUrl(entry.media.src))}" alt="${esc(entry.media.alt ?? "")}" loading="lazy" decoding="async"/>`
      : "";
    const result = entry.result
      ? `<div class="result">${mark(entry.result.text)}${
          entry.result.source ? `<span class="src">${esc(boot.sourceLabel)}: ${esc(entry.result.source)}</span>` : ""
        }</div>`
      : "";
    const tasks = (entry.tasks ?? []).length
      ? `<section class="chapter"><h2>${esc(boot.tasksLabel)}</h2><ul>${entry.tasks.map((line) => `<li>${mark(line)}</li>`).join("")}</ul></section>`
      : "";
    const chapters = entry.chapters
      ? Object.entries(entry.chapters)
          .map(
            ([key, text]) =>
              `<section class="chapter"><h2>${esc(boot.chapterLabels[key] ?? key)}</h2><p>${mark(text)}</p></section>`,
          )
          .join("")
      : "";
    const links = [];
    if (entry.caseHref) links.push(`<a href="${esc(entry.caseHref)}">${esc(boot.caseLabel)}</a>`);
    for (const link of entry.links ?? []) {
      const href = safeUrl(link.href);
      if (!href) continue;
      links.push(
        `<a href="${esc(href)}" target="_blank" rel="noopener noreferrer">${esc(boot.linkKind[link.kind] ?? link.kind ?? href)}</a>`,
      );
    }
    const flag = entry.placeholder ? `<p class="placeholder-flag">${esc(boot.placeholderLabel)}</p>` : "";
    const company = entry.company ? ` · ${mark(entry.company)}` : "";
    return `<div class="dd-bar">
  <a class="brand" href="${esc(boot.homeHref)}">${esc(boot.homeLabel)}</a>
  <div class="lang" role="group" aria-label="${esc(boot.langLabel)}">
    <a href="/portfolio/de/lebenslauf/${esc(entry.id)}/" hreflang="de"${boot.locale === "de" ? ' aria-current="true"' : ""}>DE</a>
    <a href="/portfolio/en/lebenslauf/${esc(entry.id)}/" hreflang="en"${boot.locale === "en" ? ' aria-current="true"' : ""}>EN</a>
  </div>
  <a class="pf-offer-chip" href="${esc(boot.offerHref)}">${esc(boot.offerLabel)}</a>
  <button type="button" class="btn ghost" id="dd-close" data-close>${esc(boot.closeLabel)}</button>
</div>
<article class="dd-body">
  <p class="meta">${esc(type)} · ${esc(honesty)} · ${mark(entry.periodLabel)}${company}</p>
  ${flag}
  <h1 id="dd-title">${mark(entry.title)}</h1>
  ${media}
  <p class="lede">${mark(entry.summary)}</p>
  ${stack ? `<ul class="stack">${stack}</ul>` : ""}
  ${result}
  ${tasks}
  ${chapters}
  ${links.length ? `<p class="link-row">${links.join("")}</p>` : ""}
</article>`;
  }

  function pathId() {
    const match = window.location.pathname.match(/\/lebenslauf\/([^/]+)\/?$/);
    if (!match) return "";
    const id = decodeURIComponent(match[1]);
    return byId[id] ? id : "";
  }

  function showDive(id) {
    const entry = byId[id];
    if (!entry) return;
    const apply = () => {
      diveEl.innerHTML = diveMarkup(entry);
      diveEl.hidden = false;
      diveEl.setAttribute("open", "");
      diveEl.setAttribute("role", "dialog");
      diveEl.setAttribute("aria-modal", "true");
      diveEl.setAttribute("aria-labelledby", "dd-title");
      shell?.setAttribute("inert", "");
      document.body.classList.add("dive-open");
      document.title = `${entry.title} — ${baseTitle}`;
      const close = diveEl.querySelector("#dd-close");
      close?.addEventListener("click", () => closeDive());
      trapFocus(diveEl, () => closeDive());
      close?.focus();
    };
    transition(apply);
  }

  function hideDive() {
    if (diveEl.hidden) return;
    const apply = () => {
      diveEl.hidden = true;
      diveEl.removeAttribute("open");
      diveEl.removeAttribute("role");
      diveEl.removeAttribute("aria-modal");
      diveEl.innerHTML = "";
      shell?.removeAttribute("inert");
      document.body.classList.remove("dive-open");
      document.title = baseTitle;
      releaseTrap?.();
      listEl.querySelector(`[data-id="${CSS.escape(activeId ?? "")}"]`)?.focus();
    };
    transition(apply);
  }

  function openDive(id) {
    if (!byId[id]) return;
    setActive(id);
    const url = boot.base + id + "/";
    const here = window.location.pathname.replace(/\/$/, "") + "/";
    if (here !== url) history.pushState({ dive: id }, "", url);
    showDive(id);
  }

  function closeDive() {
    if (history.state?.dive) {
      history.back();
      return;
    }
    hideDive();
  }

  listEl.addEventListener("pointerover", (ev) => {
    const card = ev.target.closest(".entry-card");
    if (!card || !listEl.contains(card) || !card.dataset.id) return;
    hoverLock = true;
    setActive(card.dataset.id);
  });
  listEl.addEventListener("pointerleave", () => {
    hoverLock = false;
  });
  listEl.addEventListener("focusin", (ev) => {
    const card = ev.target.closest(".entry-card");
    if (!card?.dataset.id) return;
    setActive(card.dataset.id);
  });

  listEl.addEventListener("click", (ev) => {
    const trigger = ev.target.closest("[data-id], [data-open-dive]");
    if (!trigger || !listEl.contains(trigger)) return;
    if (ev.metaKey || ev.ctrlKey || ev.shiftKey || ev.altKey || ev.button !== 0) return;
    const id = trigger.getAttribute("data-open-dive") || trigger.getAttribute("data-id");
    if (!id || !byId[id]) return;
    ev.preventDefault();
    openDive(id);
  });

  previewEl.addEventListener("click", (ev) => {
    const trigger = ev.target.closest("[data-open-dive]");
    if (!trigger) return;
    if (ev.metaKey || ev.ctrlKey || ev.shiftKey || ev.altKey || ev.button !== 0) return;
    ev.preventDefault();
    openDive(trigger.getAttribute("data-open-dive"));
  });

  function setupSpy() {
    if (!("IntersectionObserver" in window)) return;
    const cards = [...listEl.querySelectorAll(".entry-card")];
    const ratios = new Map();
    const observer = new IntersectionObserver(
      (observed) => {
        for (const item of observed) {
          ratios.set(item.target, item.isIntersecting ? item.intersectionRatio : 0);
        }
        if (spyFrame) return;
        spyFrame = window.requestAnimationFrame(() => {
          spyFrame = 0;
          if (lockSpy || hoverLock || !diveEl.hidden) return;
          let best = null;
          let bestRatio = 0;
          for (const card of cards) {
            const ratio = ratios.get(card) ?? 0;
            if (ratio > bestRatio) {
              bestRatio = ratio;
              best = card;
            }
          }
          if (best?.dataset.id && best.dataset.id !== activeId) setActive(best.dataset.id);
        });
      },
      { rootMargin: "-20% 0px -55% 0px", threshold: [0.25, 0.5, 0.75] },
    );
    cards.forEach((card) => observer.observe(card));
  }

  window.addEventListener("popstate", () => {
    const id = pathId();
    if (id) {
      setActive(id);
      showDive(id);
    } else hideDive();
  });

  mobileQuery.addEventListener?.("change", () => updateInline());
  window.addEventListener("resize", () => updateInline());

  renderRail();
  setupSpy();
  updateInline();

  const hashId = decodeURIComponent(window.location.hash.replace(/^#/, ""));
  if (hashId && byId[hashId]) {
    setActive(hashId, { scrollList: true });
    document.getElementById(hashId)?.focus({ preventScroll: true });
  }

  const initial = pathId();
  if (initial) openDive(initial);
}
