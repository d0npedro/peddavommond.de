import {
  SITE,
  LOCALES,
  METRICS,
  ERAS,
  NAV,
  CASES,
  EXPERIENCE,
  EDUCATION,
  STACK_GROUPS,
  INDUSTRIES,
  LANGUAGES_META,
  JSON_LD_KNOWS_ABOUT,
  stackCount,
  casesBySection,
} from "./shared.mjs";
import { copy } from "./content.mjs";

export function esc(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function attr(value) {
  return esc(value);
}

function heading({ index, eyebrow, title, description }) {
  return `<div class="mb-12 md:mb-16 pf-visible">
    <div class="flex items-center gap-3 text-faint">
      <span class="font-mono text-xs">${esc(index)}</span>
      <span class="hairline w-10"></span>
      <span class="eyebrow">${esc(eyebrow)}</span>
    </div>
    <h2 class="mt-4 max-w-prose text-balance text-3xl font-semibold tracking-tight text-fg sm:text-4xl md:text-[2.75rem] md:leading-[1.05]">${esc(title)}</h2>
    ${description ? `<p class="mt-4 max-w-prose text-base leading-relaxed text-muted">${esc(description)}</p>` : ""}
  </div>`;
}

function iconSun() {
  return `<svg aria-hidden="true" viewBox="0 0 24 24" class="h-[18px] w-[18px] transition-all duration-300 ease-precision dark:-rotate-90 dark:scale-0" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"></path></svg>`;
}

function iconMoon() {
  return `<svg aria-hidden="true" viewBox="0 0 24 24" class="absolute h-[18px] w-[18px] rotate-90 scale-0 transition-all duration-300 ease-precision dark:rotate-0 dark:scale-100" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"></path></svg>`;
}

function langSwitch(locale, extraClass = "") {
  const t = copy(locale);
  const items = LOCALES.map((code) => {
    const current = code === locale;
    return `<a href="/portfolio/${code}" hreflang="${code}"${current ? ' aria-current="true"' : ""} class="rounded-[3px] px-2 py-1 uppercase tracking-wide transition-colors duration-150 ${current ? "bg-accent/15 text-accent" : "text-muted hover:text-fg"}"><span class="sr-only">${esc(t.common.localeName[code])}: </span>${code}</a>`;
  }).join("");
  return `<div class="inline-flex items-center rounded-card border border-line bg-bg-elevated p-0.5 font-mono text-xs ${extraClass}" role="group" aria-label="${attr(t.common.langSwitchAria)}">${items}</div>`;
}

function navItems(locale, numbered = false) {
  const t = copy(locale);
  return NAV.map((item, i) => {
    const label = t.nav[item.key];
    const href = item.href ?? `#${item.id}`;
    const extra = numbered
      ? `<span class="font-mono text-xs text-faint">${String(i + 1).padStart(2, "0")}</span>`
      : "";
    const cls = numbered
      ? "flex items-center justify-between py-3 text-base text-fg"
      : "relative rounded-card px-3 py-2 text-sm transition-colors duration-200 text-muted hover:text-fg";
    return `<li><a href="${attr(href)}" class="${cls}" data-nav="${attr(item.id ?? item.key)}"><span>${esc(label)}</span>${extra}</a></li>`;
  }).join("");
}

function renderNav(locale) {
  const t = copy(locale);
  return `<header class="fixed inset-x-0 top-0 z-50 transition-colors duration-300 border-b border-transparent bg-transparent" data-site-header>
  <nav aria-label="${attr(t.nav.ariaPrimary)}" class="container flex h-16 items-center justify-between gap-4">
    <a href="#top" class="group flex items-center gap-2.5 font-mono text-sm tracking-tight text-fg">
      <span class="grid h-7 w-7 place-items-center rounded-[3px] border border-accent/60 text-accent"><span class="h-2 w-2 animate-pulse-node rounded-[1px] bg-accent"></span></span>
      <span class="hidden sm:inline"><span class="text-fg">peter</span><span class="text-faint">.henrichs</span></span>
    </a>
    <ul class="hidden items-center gap-1 md:flex">${navItems(locale)}</ul>
    <div class="flex items-center gap-2">
      <a href="#contact" class="hidden rounded-card border border-line bg-bg-elevated px-3.5 py-2 font-mono text-xs tracking-wide text-fg transition-colors hover:border-accent hover:text-accent lg:inline-block">${esc(t.nav.contact)}</a>
      ${langSwitch(locale, "hidden sm:inline-flex")}
      <button type="button" data-theme-toggle aria-label="${attr(t.theme.toDark)}" class="group relative inline-flex h-9 w-9 items-center justify-center rounded-card border border-line bg-bg-elevated text-muted transition-colors duration-200 hover:border-accent hover:text-accent focus-visible:text-accent">${iconSun()}${iconMoon()}</button>
      <button type="button" data-menu-toggle aria-label="${attr(t.nav.toggleMenu)}" aria-expanded="false" class="grid h-9 w-9 place-items-center rounded-card border border-line bg-bg-elevated text-fg md:hidden">
        <span class="relative block h-3.5 w-4">
          <span class="absolute left-0 top-0 h-0.5 w-full bg-current transition-transform duration-200" data-burger="top"></span>
          <span class="absolute left-0 top-[7px] h-0.5 w-full bg-current transition-opacity duration-200" data-burger="mid"></span>
          <span class="absolute bottom-0 left-0 h-0.5 w-full bg-current transition-transform duration-200" data-burger="bot"></span>
        </span>
      </button>
    </div>
  </nav>
  <div data-mobile-menu class="overflow-hidden border-t border-line bg-bg/95 backdrop-blur-md transition-[max-height,opacity] duration-300 md:hidden max-h-0 opacity-0">
    <ul class="container flex flex-col py-3">
      ${navItems(locale, true)}
      <li><a href="#contact" class="mt-2 flex items-center justify-center rounded-card border border-accent/50 py-3 font-mono text-sm text-accent">${esc(t.nav.contact)}</a></li>
      <li class="mt-3 flex justify-center pb-1">${langSwitch(locale)}</li>
    </ul>
  </div>
</header>`;
}

function renderHero(locale) {
  const t = copy(locale);
  const metrics = METRICS.map((m, i) => {
    return `<div class="group relative bg-bg-elevated px-4 py-5 transition-colors duration-200 hover:bg-bg-sunken">
      <span aria-hidden="true" class="absolute left-0 top-0 h-px w-0 bg-accent transition-[width] duration-500 ease-precision group-hover:w-full"></span>
      <dt class="font-mono text-2xl font-semibold text-fg sm:text-3xl"><span class="pf-metric-value">${esc(m.value)}</span></dt>
      <dd class="mt-1 text-xs leading-snug text-muted">${esc(t.hero.metricLabels[i])}</dd>
    </div>`;
  }).join("");
  const langs = LANGUAGES_META.map((row) => {
    const item = row[locale];
    return `<span class="text-muted">${esc(item.name)}<span class="text-faint"> · ${esc(item.level)}</span></span>`;
  }).join("");
  return `<section id="top" class="relative isolate overflow-hidden border-b border-line pb-20 pt-32 sm:pb-24 sm:pt-36 md:pb-32 md:pt-44">
    <div aria-hidden="true" class="pointer-events-none absolute inset-0 -z-10">
      <div class="blueprint-grid grid-mask absolute inset-0 animate-fade-grid"></div>
      <div class="blueprint-grid-fine grid-mask absolute inset-0 opacity-40"></div>
      <div class="absolute left-1/2 top-0 h-[420px] w-[820px] -translate-x-1/2 rounded-full bg-accent/10 blur-[120px] dark:bg-accent/[0.14]"></div>
    </div>
    <div class="container">
      <div class="flex items-center gap-3 text-faint pf-visible">
        <span class="relative flex h-2 w-2"><span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60"></span><span class="relative inline-flex h-2 w-2 rounded-full bg-accent"></span></span>
        <span class="eyebrow">${esc(t.hero.eyebrow)}</span>
      </div>
      <h1 class="mt-6 text-balance text-[2.6rem] font-semibold leading-[1.02] tracking-tight text-fg sm:text-6xl md:text-7xl pf-visible">${esc(SITE.name)}</h1>
      <p class="pf-role pf-visible">${esc(t.hero.role)}</p>
      <p class="mt-8 max-w-2xl text-lg leading-relaxed text-muted pf-visible">${esc(t.hero.tagline)}</p>
      <p class="pf-proof pf-visible">${esc(t.hero.proof)}</p>
      <div class="mt-9 pf-cta-row pf-visible">
        <a href="#ai-cases" class="scan-sweep group inline-flex items-center gap-2 rounded-card border border-accent bg-accent px-5 py-3 text-sm font-medium text-white transition-transform duration-200 hover:-translate-y-0.5 dark:text-bg">${esc(t.hero.ctaPrimary)}</a>
        <a href="${attr(SITE.cvPath)}" class="inline-flex items-center gap-2 rounded-card border border-line bg-bg-elevated px-5 py-3 text-sm font-medium text-fg transition-colors duration-200 hover:border-accent hover:text-accent">${esc(t.hero.ctaSecondary)}</a>
        <a href="#contact" class="inline-flex items-center gap-2 rounded-card px-3 py-3 text-sm font-medium text-muted hover:text-accent">${esc(t.hero.ctaTertiary)}</a>
      </div>
      <dl class="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-card border border-line bg-line sm:grid-cols-4 pf-visible">${metrics}</dl>
      <div class="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-xs text-faint pf-visible">
        <span class="eyebrow">${esc(t.hero.languagesLabel)}</span>${langs}
      </div>
    </div>
  </section>`;
}

function renderArc(locale) {
  const t = copy(locale);
  const cards = ERAS.map((era, i) => {
    const copyEra = t.arc.eras[i];
    const current = era.id === "ai";
    return `<article class="panel tick-corner relative p-6 transition-colors duration-300 pf-visible${current ? " border-signal/50" : ""}">
      <div class="flex items-center justify-between">
        <span class="font-mono text-xs text-accent">${String(i + 1).padStart(2, "0")}</span>
        ${current ? `<span class="inline-flex items-center gap-1.5 font-mono text-[0.65rem] uppercase tracking-label text-signal"><span class="relative flex h-2 w-2"><span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-signal opacity-60"></span><span class="relative inline-flex h-2 w-2 rounded-full bg-signal"></span></span>${esc(t.arc.nowLabel)}</span>` : `<span class="relative z-10 grid h-3 w-3 place-items-center rounded-full border border-accent bg-bg"><span class="h-1.5 w-1.5 rounded-full bg-accent"></span></span>`}
      </div>
      <p class="mt-4 font-mono text-xs tracking-wide text-faint">${esc(era.years)}</p>
      <h3 class="mt-1.5 text-lg font-semibold text-fg">${esc(copyEra.title)}</h3>
      <p class="mt-3 text-sm leading-relaxed text-muted">${esc(copyEra.blurb)}</p>
    </article>`;
  }).join("");
  return `<section id="arc" class="container scroll-mt-24 py-20 md:py-28">
    ${heading(t.arc)}
    <div class="relative grid gap-4 md:grid-cols-3">
      <div aria-hidden="true" class="absolute left-0 right-0 top-[52px] hidden h-px bg-gradient-to-r from-transparent via-line to-transparent md:block"></div>
      ${cards}
    </div>
  </section>`;
}

function caseLinks(item, t) {
  if (!item.links?.length) return "";
  const labels = { repo: t.caseFields.repo, demo: t.caseFields.demo, embed: t.caseFields.embed, live: t.caseFields.live };
  return `<div class="pf-links">${item.links
    .map((link) => {
      const label = link.label ?? labels[link.kind] ?? link.kind;
      const external = link.href.startsWith("http");
      return `<a href="${attr(link.href)}"${external ? ' target="_blank" rel="noopener noreferrer"' : ""}>${esc(label)}</a>`;
    })
    .join("")}</div>`;
}

function renderCaseCard(item, locale, wide = false) {
  const t = copy(locale);
  const c = t.cases[item.id];
  const fields = [
    ["problem", t.caseFields.problem],
    ["decision", t.caseFields.decision],
    ["outcome", t.caseFields.outcome],
  ];
  const fieldHtml = fields
    .filter(([key]) => c[key])
    .map(
      ([key, label]) => `<div class="pf-field"><p class="eyebrow mb-2">${esc(label)}</p><p class="text-sm leading-relaxed text-fg/85">${esc(c[key])}</p></div>`,
    )
    .join("");
  const highlights = (c.highlights ?? [])
    .map((h) => `<li class="flex gap-2.5 text-sm text-fg/85"><span class="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-accent"></span><span>${esc(h)}</span></li>`)
    .join("");
  return `<article class="panel tick-corner relative p-6 md:p-8 pf-case-card${wide ? " pf-case-card--wide" : ""}">
    <div class="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs text-faint">
      <span class="text-accent">${esc(item.period)}</span>
      <span class="text-line">|</span>
      <span>${esc(c.domain)}</span>
    </div>
    <h3 class="mt-3 text-2xl font-semibold tracking-tight text-fg">${esc(item.name)}</h3>
    <p class="mt-1 text-sm text-muted">${esc(item.client)}</p>
    ${c.honesty ? `<p class="pf-honesty">${esc(c.honesty)}</p>` : ""}
    ${fieldHtml}
    ${c.role ? `<div class="pf-field"><p class="eyebrow mb-2">${esc(t.caseFields.role)}</p><p class="text-sm leading-relaxed text-fg/85">${esc(c.role)}</p></div>` : ""}
    ${c.transfer ? `<div class="pf-field"><p class="eyebrow mb-2">${esc(t.caseFields.transfer)}</p><p class="text-sm leading-relaxed text-muted">${esc(c.transfer)}</p></div>` : ""}
    ${highlights ? `<ul class="mt-4 space-y-2">${highlights}</ul>` : ""}
    <div class="mt-auto pt-4 flex flex-wrap gap-1.5">${item.tech.map((tag) => `<span class="rounded-[3px] bg-bg-sunken px-2 py-1 font-mono text-[0.7rem] text-muted">${esc(tag)}</span>`).join("")}</div>
    ${caseLinks(item, t)}
  </article>`;
}

function renderSecondaryCase(item, locale) {
  const t = copy(locale);
  const c = t.cases[item.id];
  return `<article class="panel p-5">
    <p class="font-mono text-[0.7rem] text-faint">${esc(item.period)} · ${esc(c.domain)}</p>
    <h3 class="mt-1.5 text-base font-semibold text-fg">${esc(item.name)}</h3>
    <p class="mt-2 text-sm text-muted">${esc(c.outcome ?? c.problem)}</p>
    ${caseLinks(item, t)}
  </article>`;
}

function renderAiCases(locale) {
  const t = copy(locale);
  const cards = casesBySection("ai").map((item) => renderCaseCard(item, locale)).join("");
  return `<section id="ai-cases" class="container scroll-mt-24 py-20 md:py-28">
    ${heading(t.aiCases)}
    <div class="pf-case-grid">${cards}</div>
  </section>`;
}

function renderEnterprise(locale) {
  const t = copy(locale);
  const featured = casesBySection("enterprise").map((item) => renderCaseCard(item, locale, true)).join("");
  const secondary = casesBySection("secondary").map((item) => renderSecondaryCase(item, locale)).join("");
  return `<section id="enterprise" class="scroll-mt-24 border-y border-line bg-bg-sunken/40 py-20 md:py-28">
    <div class="container">
      ${heading(t.enterpriseCases)}
      <div class="grid gap-4">${featured}</div>
      <div class="mt-12">
        <p class="eyebrow mb-3">${esc(t.enterpriseCases.secondaryEyebrow)}</p>
        <p class="mb-6 max-w-prose text-sm text-muted">${esc(t.enterpriseCases.secondaryNote)}</p>
        <div class="pf-secondary">${secondary}</div>
      </div>
    </div>
  </section>`;
}

function renderCompetencies(locale) {
  const t = copy(locale);
  const pillars = t.competencies.pillars
    .map(
      (p) => `<article class="panel p-5 pf-pillar"><h3 class="text-sm font-semibold text-fg">${esc(p.title)}</h3><p class="mt-2 text-sm leading-relaxed text-muted">${esc(p.body)}</p></article>`,
    )
    .join("");
  return `<div class="container scroll-mt-24 pt-20 md:pt-28">
    ${heading(t.competencies)}
    <div class="pf-pillars">${pillars}</div>
  </div>`;
}

function renderStack(locale) {
  const t = copy(locale);
  const filters = Object.entries(t.stack.filters)
    .map(([id, label], i) => {
      const on = i === 0;
      return `<button type="button" data-stack-filter="${attr(id)}" aria-pressed="${on}" class="rounded-card border px-3.5 py-2 font-mono text-xs tracking-wide transition-colors duration-200 ${on ? "border-accent bg-accent/10 text-accent" : "border-line bg-bg-elevated text-muted hover:border-accent/50 hover:text-fg"}">${esc(label)}</button>`;
    })
    .join("");
  const featured = STACK_GROUPS.filter((g) => g.featured);
  const more = STACK_GROUPS.filter((g) => !g.featured);
  const groupHtml = (group) => {
    const label = t.stack.groups[group.id];
    const items = group.items
      .map((item) => `<span data-eras="${attr(item.eras.join(" "))}" class="group inline-flex items-center gap-1.5 rounded-[3px] border border-line bg-bg px-2 py-1 font-mono text-[0.72rem] text-muted transition-colors duration-150 hover:border-accent/60 hover:text-fg">${esc(item.name)}</span>`)
      .join("");
    return `<div class="panel flex flex-col p-5${group.featured ? " pf-stack-featured" : ""}" data-stack-group>
      <div class="flex items-baseline justify-between"><h3 class="text-sm font-semibold text-fg">${esc(label.label)}</h3><span class="font-mono text-[0.7rem] text-faint">${String(group.items.length).padStart(2, "0")}</span></div>
      <p class="mt-1 text-xs text-faint">${esc(label.hint)}</p>
      <div class="mt-4 flex flex-wrap gap-1.5">${items}</div>
    </div>`;
  };
  return `<section id="stack" class="scroll-mt-24 pb-20 md:pb-28">
    ${renderCompetencies(locale)}
    <div class="container pt-16 md:pt-20">
      ${heading(t.stack)}
      <div class="mb-10 flex flex-wrap gap-2" role="group" aria-label="${attr(t.stack.filterAria)}">
        ${filters}
        <span class="ml-auto self-center font-mono text-xs text-faint" data-stack-count>${esc(t.stack.countTemplate.replace("{n}", String(stackCount())))}</span>
      </div>
      <div class="grid gap-4 md:grid-cols-2">${featured.map(groupHtml).join("")}</div>
      <div class="pf-stack-more">
        <p class="eyebrow mb-4">${esc(t.stack.moreLabel)}</p>
        <div class="grid gap-4 md:grid-cols-2 xl:grid-cols-3">${more.map(groupHtml).join("")}</div>
      </div>
    </div>
  </section>`;
}

function renderIndustries(locale) {
  const t = copy(locale);
  const chips = t.industries.names
    .map((name) => `<span class="scan-sweep rounded-card border border-line bg-bg-elevated px-4 py-2.5 text-sm text-fg transition-colors duration-200 hover:border-accent hover:text-accent">${esc(name)}</span>`)
    .join("");
  const health = INDUSTRIES.healthTags
    .map((tag) => `<span class="rounded-[3px] bg-bg-sunken px-2 py-1 font-mono text-[0.72rem] text-muted">${esc(tag)}</span>`)
    .join("");
  return `<section id="industries" class="container scroll-mt-24 pb-20 md:pb-28">
    <div class="mb-8">
      <p class="eyebrow">${esc(t.industries.eyebrow)}</p>
      <h2 class="mt-3 max-w-prose text-2xl font-semibold tracking-tight text-fg">${esc(t.industries.title)}</h2>
    </div>
    <div class="flex flex-wrap gap-2.5">${chips}</div>
    <div class="mt-10">
      <div class="hairline mb-6"></div>
      <p class="eyebrow mb-4">${esc(t.industries.healthLabel)}</p>
      <div class="flex flex-wrap gap-1.5">${health}</div>
    </div>
  </section>`;
}

function renderExperience(locale) {
  const t = copy(locale);
  const filters = Object.entries(t.experience.filters)
    .map(([id, label], i) => {
      const on = i === 0;
      return `<button type="button" data-exp-filter="${attr(id)}" aria-pressed="${on}" class="rounded-card border px-3.5 py-2 font-mono text-xs tracking-wide transition-colors duration-200 ${on ? "border-accent bg-accent/10 text-accent" : "border-line bg-bg-elevated text-muted hover:border-accent/50 hover:text-fg"}">${esc(label)}</button>`;
    })
    .join("");
  const items = EXPERIENCE.map((item, i) => {
    const entry = t.experience.entries[item.id];
    const open = i === 0;
    const tasks = (entry.tasks ?? [])
      .map((task) => `<li class="flex gap-2.5 text-sm text-fg/85"><span class="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-accent"></span><span>${esc(task)}</span></li>`)
      .join("");
    const tags = item.tech
      .map((tag) => `<span class="rounded-[3px] bg-bg-sunken px-2 py-1 font-mono text-[0.7rem] text-muted">${esc(tag)}</span>`)
      .join("");
    return `<li class="relative pl-8 md:grid md:grid-cols-[8.5rem_1fr] md:gap-0 md:pl-0" data-exp-item data-era="${attr(item.era)}">
      <div class="hidden pt-4 pr-6 text-right md:block"><span class="font-mono text-xs leading-tight text-faint">${esc(item.period)}</span></div>
      <span class="absolute left-0 top-[1.4rem] z-10 grid h-3.5 w-3.5 place-items-center rounded-full border border-line bg-bg md:left-[8.5rem]${open ? " border-accent" : ""}"><span class="h-1.5 w-1.5 rounded-full ${open ? "bg-accent" : "bg-accent"}"></span></span>
      <div class="md:pl-8">
        <button type="button" aria-expanded="${open}" data-exp-toggle class="panel scan-sweep group w-full px-5 py-4 text-left transition-colors duration-200 ${open ? "border-accent/60" : "hover:border-accent/40"}">
          <span class="font-mono text-[0.7rem] tracking-wide text-faint md:hidden">${esc(item.period)}</span>
          <div class="flex items-start justify-between gap-4">
            <div>
              <h3 class="text-base font-semibold text-fg">${esc(entry.role)}</h3>
              <p class="mt-0.5 text-sm text-muted">${esc(item.company)}</p>
            </div>
            <span class="mt-1 shrink-0 text-faint${open ? " rotate-45" : ""}" aria-hidden="true"><svg viewBox="0 0 16 16" class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><path d="M8 3v10M3 8h10"></path></svg></span>
          </div>
          ${entry.project ? `<p class="mt-2 text-sm text-fg/90"><span class="text-accent">▸ </span>${esc(entry.project)}</p>` : ""}
          <div class="exp-body pt-4"${open ? "" : " hidden"}>
            <p class="max-w-prose text-sm leading-relaxed text-muted">${esc(entry.mission)}</p>
            ${item.compact ? `<p class="mt-3 text-xs text-faint">${esc(t.experience.compactNote)}</p>` : ""}
            ${tasks ? `<ul class="mt-4 space-y-1.5">${tasks}</ul>` : ""}
            ${tags ? `<div class="mt-4 flex flex-wrap gap-1.5">${tags}</div>` : ""}
          </div>
        </button>
      </div>
    </li>`;
  }).join("");
  return `<section id="work" class="scroll-mt-24 border-y border-line bg-bg-sunken/40 py-20 md:py-28">
    <div class="container">
      ${heading(t.experience)}
      <div class="mb-10 flex flex-wrap gap-2" role="group" aria-label="${attr(t.experience.filterAria)}">${filters}</div>
      <div class="relative">
        <div aria-hidden="true" class="absolute left-[7px] top-2 bottom-2 w-px bg-line md:left-[calc(8.5rem+7px)]"></div>
        <ul class="space-y-3">${items}</ul>
      </div>
      <div class="mt-8 font-mono text-xs text-faint" data-exp-count>${esc(t.experience.countTemplate.replace("{shown}", String(EXPERIENCE.length)).replace("{total}", String(EXPERIENCE.length)).replace("{era}", t.experience.eraNames.all))}</div>
    </div>
  </section>`;
}

function renderEducation(locale) {
  const t = copy(locale);
  const items = EDUCATION.map((item) => {
    const focus = t.education.focus[item.focusKey] ?? null;
    const focusHtml = focus
      ? `<ul class="mt-3 grid gap-1.5 sm:grid-cols-2">${focus
          .map((line) => `<li class="flex gap-2 text-sm text-fg/80"><span class="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-accent"></span><span>${esc(line)}</span></li>`)
          .join("")}</ul>`
      : "";
    return `<article class="panel grid gap-3 p-5 md:grid-cols-[10rem_1fr] md:gap-6">
      <div class="flex items-start gap-2.5">
        <span class="mt-1 h-2 w-2 shrink-0 rounded-full ${item.kind === "continuing" ? "bg-signal" : "bg-accent"}"></span>
        <span class="font-mono text-xs leading-tight text-faint">${esc(item.period)}</span>
      </div>
      <div>
        <h3 class="text-base font-semibold text-fg">${esc(item.title)}</h3>
        <p class="mt-0.5 text-sm text-muted">${esc(item.institution)}${item.location ? ` · ${esc(item.location)}` : ""}</p>
        ${focusHtml}
      </div>
    </article>`;
  }).join("");
  return `<section id="education" class="scroll-mt-24 border-t border-line bg-bg-sunken/40 py-20 md:py-28">
    <div class="container">
      ${heading({ ...t.education, description: "" })}
      <div class="space-y-3">${items}</div>
    </div>
  </section>`;
}

function renderFooter(locale) {
  const t = copy(locale);
  return `<footer id="contact" class="relative scroll-mt-24 overflow-hidden border-t border-line bg-bg">
    <div aria-hidden="true" class="blueprint-grid grid-mask pointer-events-none absolute inset-0 opacity-60"></div>
    <div class="container relative py-20 md:py-28">
      <p class="eyebrow">${esc(t.footer.eyebrow)}</p>
      <h2 class="mt-4 max-w-2xl text-balance text-3xl font-semibold tracking-tight text-fg sm:text-4xl">${esc(t.footer.title)}</h2>
      <p class="mt-4 max-w-prose text-muted">${esc(t.footer.body)}</p>
      <div class="mt-10 pf-contact-row">
        <a class="primary" href="mailto:${attr(SITE.email)}">${esc(t.footer.email)} · ${esc(SITE.email)}</a>
        <a class="secondary" href="${attr(SITE.linkedin)}" target="_blank" rel="noopener noreferrer">${esc(t.footer.linkedin)}</a>
        <a class="secondary" href="${attr(SITE.github)}" target="_blank" rel="noopener noreferrer">${esc(t.footer.github)}</a>
        <a class="secondary" href="${attr(SITE.cvPath)}">${esc(t.footer.cv)}</a>
      </div>
      <p class="mt-4 max-w-prose text-xs text-faint">${esc(t.footer.cvNote)}</p>
      <div class="hairline my-12"></div>
      <div class="flex flex-col items-start justify-between gap-4 font-mono text-xs text-faint sm:flex-row sm:items-center">
        <span>© ${SITE.year} ${esc(SITE.name)}</span>
        <span class="hidden sm:inline">${esc(t.footer.roleLine)}</span>
        <span>DE · EN · ES</span>
      </div>
    </div>
  </footer>`;
}

function jsonLd(locale) {
  const t = copy(locale);
  const data = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: SITE.name,
    jobTitle: t.meta.jobTitle,
    description: t.meta.personDescription,
    email: SITE.email,
    url: `${SITE.origin}/portfolio/${locale}`,
    sameAs: [SITE.linkedin, SITE.github],
    knowsLanguage: ["German", "English", "Spanish"],
    knowsAbout: JSON_LD_KNOWS_ABOUT,
  };
  return JSON.stringify(data);
}

function themeBoot() {
  return `<script>!function(){try{var d=document.documentElement,c=d.classList;c.remove('light','dark');var e=localStorage.getItem('theme');if('system'===e||(!e&&false)){var t='(prefers-color-scheme: dark)',m=window.matchMedia(t);if(m.media!==t||m.matches){d.style.colorScheme='dark';c.add('dark')}else{d.style.colorScheme='light';c.add('light')}}else if(e){c.add(e||'')}else{c.add('dark')}if(e==='light'||e==='dark'||!e)d.style.colorScheme=e||'dark'}catch(e){}}()</script>`;
}

export function renderPage(locale) {
  const t = copy(locale);
  const url = `${SITE.origin}/portfolio/${locale}`;
  const og = `${SITE.origin}/portfolio/${locale}/opengraph-image.png`;
  return `<!DOCTYPE html>
<html lang="${locale}" class="__variable_3f18cd __variable_f3e80d">
<head>
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1"/>
<title>${esc(t.meta.title)}</title>
<meta name="description" content="${attr(t.meta.description)}"/>
<meta name="application-name" content="Peter Henrichs · Portfolio"/>
<meta name="author" content="${attr(SITE.name)}"/>
<meta name="keywords" content="${attr(t.meta.keywords)}"/>
<meta name="creator" content="${attr(SITE.name)}"/>
<meta name="robots" content="index, follow"/>
<link rel="canonical" href="${attr(url)}"/>
<link rel="alternate" hreflang="de-DE" href="${SITE.origin}/portfolio/de"/>
<link rel="alternate" hreflang="en-US" href="${SITE.origin}/portfolio/en"/>
<link rel="alternate" hreflang="x-default" href="${SITE.origin}/portfolio/de"/>
<meta property="og:title" content="${attr(t.meta.title)}"/>
<meta property="og:description" content="${attr(t.meta.description)}"/>
<meta property="og:url" content="${attr(url)}"/>
<meta property="og:site_name" content="Peter Henrichs · Portfolio"/>
<meta property="og:locale" content="${locale === "de" ? "de_DE" : "en_US"}"/>
<meta property="og:image" content="${attr(og)}"/>
<meta property="og:image:width" content="1200"/>
<meta property="og:image:height" content="630"/>
<meta property="og:image:alt" content="${attr(t.meta.ogAlt)}"/>
<meta property="og:type" content="website"/>
<meta name="twitter:card" content="summary_large_image"/>
<meta name="twitter:title" content="${attr(t.meta.title)}"/>
<meta name="twitter:description" content="${attr(t.meta.description)}"/>
<meta name="twitter:image" content="${attr(og)}"/>
<meta name="theme-color" media="(prefers-color-scheme: light)" content="#f6f7f9"/>
<meta name="theme-color" media="(prefers-color-scheme: dark)" content="#080a0e"/>
<link rel="icon" href="/portfolio/${locale}/icon.png" type="image/png" sizes="32x32"/>
<link rel="stylesheet" href="/portfolio/de/_next/static/css/76323045a7107f6a.css"/>
<link rel="stylesheet" href="/portfolio/portfolio.css"/>
</head>
<body class="min-h-screen bg-bg font-sans antialiased">
${themeBoot()}
<a href="#main" class="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:panel focus:px-4 focus:py-2 focus:text-sm">${esc(t.common.skipToContent)}</a>
${renderNav(locale)}
<main id="main">
<script type="application/ld+json">${jsonLd(locale)}</script>
${renderHero(locale)}
${renderArc(locale)}
${renderAiCases(locale)}
${renderEnterprise(locale)}
${renderStack(locale)}
${renderIndustries(locale)}
${renderExperience(locale)}
${renderEducation(locale)}
</main>
${renderFooter(locale)}
<script src="/portfolio/app.js" defer></script>
</body>
</html>`;
}

export function renderCv(locale) {
  const t = copy(locale);
  const featured = CASES.filter((c) => c.featured)
    .map((item) => {
      const c = t.cases[item.id];
      return `<article class="panel p-5 mb-3"><h3 class="font-semibold text-fg">${esc(item.name)}</h3><p class="text-sm text-muted">${esc(c.domain)}</p><p class="mt-2 text-sm">${esc(c.outcome)}</p></article>`;
    })
    .join("");
  const jobs = EXPERIENCE.map((item) => {
    const entry = t.experience.entries[item.id];
    return `<article class="mb-4"><p class="font-mono text-xs text-faint">${esc(item.period)}</p><h3 class="font-semibold text-fg">${esc(entry.role)} — ${esc(item.company)}</h3>${entry.project ? `<p class="text-sm text-muted">${esc(entry.project)}</p>` : ""}<p class="mt-1 text-sm">${esc(entry.mission)}</p></article>`;
  }).join("");
  return `<!DOCTYPE html>
<html lang="${locale}" class="__variable_3f18cd __variable_f3e80d">
<head>
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1"/>
<title>${esc(t.cv.title)}</title>
<meta name="description" content="${attr(t.cv.intro)}"/>
<meta name="robots" content="noindex"/>
<link rel="stylesheet" href="/portfolio/de/_next/static/css/76323045a7107f6a.css"/>
<link rel="stylesheet" href="/portfolio/portfolio.css"/>
</head>
<body class="min-h-screen bg-bg font-sans antialiased">
${themeBoot()}
<div class="cv-page">
  <p class="eyebrow">${esc(t.hero.eyebrow)}</p>
  <h1 class="mt-3 text-4xl font-semibold tracking-tight text-fg">${esc(SITE.name)}</h1>
  <p class="pf-role">${esc(t.cv.subtitle)}</p>
  <p class="mt-4 text-muted">${esc(t.cv.intro)}</p>
  <div class="cv-actions">
    <button type="button" onclick="window.print()" class="scan-sweep inline-flex items-center rounded-card border border-accent bg-accent px-5 py-3 text-sm font-medium text-white dark:text-bg">${esc(t.cv.print)}</button>
    <a href="/portfolio/${locale}" class="inline-flex items-center rounded-card border border-line bg-bg-elevated px-5 py-3 text-sm">${esc(t.cv.back)}</a>
    <a href="mailto:${attr(SITE.email)}" class="inline-flex items-center rounded-card border border-line px-5 py-3 text-sm">${esc(SITE.email)}</a>
    <a href="${attr(SITE.linkedin)}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center rounded-card border border-line px-5 py-3 text-sm">LinkedIn</a>
    <a href="${attr(SITE.github)}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center rounded-card border border-line px-5 py-3 text-sm">GitHub</a>
  </div>
  <h2 class="mt-8 text-xl font-semibold">${esc(t.aiCases.eyebrow)} / ${esc(t.enterpriseCases.eyebrow)}</h2>
  <div class="mt-4">${featured}</div>
  <h2 class="mt-10 text-xl font-semibold">${esc(t.experience.eyebrow)}</h2>
  <div class="mt-4">${jobs}</div>
  <p class="cv-todo">${esc(t.cv.todo)}</p>
</div>
</body>
</html>`;
}

export function renderSitemap() {
  const now = new Date().toISOString();
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
<url>
<loc>${SITE.origin}/portfolio/de</loc>
<xhtml:link rel="alternate" hreflang="de" href="${SITE.origin}/portfolio/de" />
<xhtml:link rel="alternate" hreflang="en" href="${SITE.origin}/portfolio/en" />
<lastmod>${now}</lastmod>
<changefreq>monthly</changefreq>
<priority>0.8</priority>
</url>
<url>
<loc>${SITE.origin}/portfolio/en</loc>
<lastmod>${now}</lastmod>
<changefreq>monthly</changefreq>
<priority>0.6</priority>
</url>
</urlset>
`;
}
