import {
  SITE,
  LOCALES,
  NAV,
  EXPERIENCE,
  EDUCATION,
  LANGUAGES_META,
  JSON_LD_KNOWS_ABOUT,
  HOW_I_WORK_KEYS,
  TRACK,
  casesBySection,
  featuredCases,
  pagedCases,
  caseById,
  caseHref,
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
  return `<div class="mb-12 md:mb-16 reveal" data-reveal>
    <div class="flex items-center gap-3 text-faint">
      <span class="font-mono text-xs">${esc(index)}</span>
      <span class="hairline w-10"></span>
      <span class="eyebrow">${esc(eyebrow)}</span>
    </div>
    <h2 class="pf-section-title mt-5 text-balance">${esc(title)}</h2>
    ${description ? `<p class="mt-4 max-w-prose text-[1.05rem] leading-relaxed text-muted">${esc(description)}</p>` : ""}
  </div>`;
}

function iconSun() {
  return `<svg aria-hidden="true" viewBox="0 0 24 24" class="h-[18px] w-[18px] transition-all duration-300 ease-precision dark:-rotate-90 dark:scale-0" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"></path></svg>`;
}

function iconMoon() {
  return `<svg aria-hidden="true" viewBox="0 0 24 24" class="absolute h-[18px] w-[18px] rotate-90 scale-0 transition-all duration-300 ease-precision dark:rotate-0 dark:scale-100" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"></path></svg>`;
}

function langSwitch(locale, extraClass = "", siblingPath = "") {
  const t = copy(locale);
  const items = LOCALES.map((code) => {
    const current = code === locale;
    return `<a href="/portfolio/${code}${siblingPath}" hreflang="${code}"${current ? ' aria-current="true"' : ""} class="rounded-[3px] px-2 py-1 uppercase tracking-wide transition-colors duration-150 ${current ? "bg-accent/15 text-accent" : "text-muted hover:text-fg"}"><span class="sr-only">${esc(t.common.localeName[code])}: </span>${code}</a>`;
  }).join("");
  return `<div class="pf-lang inline-flex items-center rounded-card border border-line bg-bg-elevated p-0.5 font-mono text-xs ${extraClass}" role="group" aria-label="${attr(t.common.langSwitchAria)}">${items}</div>`;
}

function navItems(locale, numbered = false, homePrefix = "") {
  const t = copy(locale);
  return NAV.map((item, i) => {
    const label = t.nav[item.key];
    const href = item.href ?? `${homePrefix}#${item.id}`;
    const extra = numbered
      ? `<span class="font-mono text-xs text-faint">${String(i + 1).padStart(2, "0")}</span>`
      : "";
    const cls = numbered
      ? "flex items-center justify-between py-3 text-base text-fg"
      : "pf-nav-link";
    return `<li><a href="${attr(href)}" class="${cls}" data-nav="${attr(item.id ?? item.key)}"><span>${esc(label)}</span>${extra}</a></li>`;
  }).join("");
}

function renderNav(locale, { siblingPath = "", homePrefix = "" } = {}) {
  const t = copy(locale);
  const brandHref = homePrefix || "#top";
  const contactHref = homePrefix ? `${homePrefix}#contact` : "#contact";
  return `<header class="pf-header fixed inset-x-0 top-0 z-50" data-site-header>
  <nav aria-label="${attr(t.nav.ariaPrimary)}" class="container flex items-center justify-between gap-4">
    <a href="${attr(brandHref)}" class="pf-brand">
      <span class="pf-brand-mark" aria-hidden="true"><span></span></span>
      <span class="hidden sm:inline">${esc(SITE.name)}</span>
    </a>
    <ul class="hidden items-center gap-0.5 md:flex">${navItems(locale, false, homePrefix)}</ul>
    <div class="flex items-center gap-2">
      <a href="${attr(contactHref)}" class="pf-nav-cta hidden lg:inline-flex">${esc(t.nav.talk)}</a>
      ${langSwitch(locale, "hidden sm:inline-flex", siblingPath)}
      <button type="button" data-theme-toggle aria-label="${attr(t.theme.toDark)}" class="pf-icon-btn group relative">${iconSun()}${iconMoon()}</button>
      <button type="button" data-menu-toggle aria-label="${attr(t.nav.toggleMenu)}" aria-expanded="false" class="pf-icon-btn md:hidden">
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
      ${navItems(locale, true, homePrefix)}
      <li><a href="${attr(contactHref)}" class="pf-nav-cta mt-2 flex w-full items-center justify-center">${esc(t.nav.talk)}</a></li>
      <li class="mt-3 flex justify-center pb-1">${langSwitch(locale, "", siblingPath)}</li>
    </ul>
  </div>
</header>`;
}

function renderHeroDiagram(t) {
  const L = t.hero.diagramLabels;
  return `<figure class="pf-diagram pf-system-board reveal" data-reveal>
    <div class="pf-system-board__bar">
      <span>${esc(t.hero.diagramTitle)}</span>
      <span>${esc(L.goal)} → ${esc(L.human)}</span>
    </div>
    <svg class="pf-diagram-svg" viewBox="0 0 360 250" role="img" aria-labelledby="hero-diagram-title hero-diagram-desc">
      <title id="hero-diagram-title">${esc(t.hero.diagramTitle)}</title>
      <desc id="hero-diagram-desc">${esc(t.hero.diagramAlt)}</desc>
      <g fill="none" stroke="currentColor" stroke-width="1.15" class="pf-diagram-edges">
        <path class="pf-diagram-edge" d="M180 42 V70"/>
        <path class="pf-diagram-edge" d="M180 110 V138"/>
        <path class="pf-diagram-edge" d="M88 158 H160"/>
        <path class="pf-diagram-edge" d="M200 158 H272"/>
        <path class="pf-diagram-edge" d="M180 178 V200"/>
      </g>
      <g class="pf-diagram-nodes">
        <rect class="pf-diagram-node" x="110" y="12" width="140" height="30" rx="5"/>
        <text x="180" y="32" text-anchor="middle">${esc(L.goal)}</text>
        <rect class="pf-diagram-node pf-diagram-node--accent" x="96" y="70" width="168" height="40" rx="5"/>
        <text x="180" y="95" text-anchor="middle">${esc(L.orchestrator)}</text>
        <rect class="pf-diagram-node" x="16" y="138" width="72" height="40" rx="5"/>
        <text x="52" y="163" text-anchor="middle">${esc(L.tools)}</text>
        <rect class="pf-diagram-node" x="144" y="138" width="72" height="40" rx="5"/>
        <text x="180" y="163" text-anchor="middle">${esc(L.model)}</text>
        <rect class="pf-diagram-node" x="272" y="138" width="72" height="40" rx="5"/>
        <text x="308" y="163" text-anchor="middle">${esc(L.eval)}</text>
        <rect class="pf-diagram-node pf-diagram-node--signal" x="120" y="200" width="120" height="36" rx="5"/>
        <text x="180" y="223" text-anchor="middle">${esc(L.human)}</text>
      </g>
    </svg>
    <figcaption class="sr-only">${esc(t.hero.diagramAlt)}</figcaption>
  </figure>`;
}

function renderProofStrip(t) {
  const chips = (t.hero.proofChips ?? [])
    .map(
      (chip) => `<div class="pf-proof-chip">
        <p class="pf-proof-label">${esc(chip.label)}</p>
        <p class="pf-proof-body">${esc(chip.body)}</p>
      </div>`,
    )
    .join("");
  return `<div class="pf-proof-strip reveal" data-reveal>${chips}</div>`;
}

function renderHero(locale) {
  const t = copy(locale);
  return `<section id="top" class="pf-hero">
    <div aria-hidden="true" class="pointer-events-none absolute inset-0 -z-10">
      <div class="blueprint-grid grid-mask absolute inset-0"></div>
    </div>
    <div class="container pf-hero-grid">
      <div>
        <p class="pf-name reveal" data-reveal>${esc(SITE.name)}</p>
        <p class="pf-role reveal" data-reveal>${esc(t.hero.role)}</p>
        <p class="eyebrow mt-3 reveal" data-reveal>${esc(t.hero.eyebrow)}</p>
        <h1 class="pf-hero-title mt-5 text-balance reveal" data-reveal>${esc(t.hero.h1)}</h1>
        <p class="pf-hero-lede mt-5 reveal" data-reveal>${esc(t.hero.tagline)}</p>
        <p class="pf-trust reveal" data-reveal>${esc(t.hero.trust)}</p>
        <div class="mt-8 pf-cta-row reveal" data-reveal>
          <a href="#cases" class="pf-cta pf-cta--primary">${esc(t.hero.ctaPrimary)}</a>
          <a href="${attr(SITE.cvPath)}" class="pf-cta pf-cta--secondary">${esc(t.hero.ctaSecondary)}</a>
        </div>
        <p class="pf-location reveal" data-reveal>${esc(t.hero.location)}</p>
      </div>
      ${renderHeroDiagram(t)}
    </div>
    <div class="container mt-12 md:mt-14">
      ${renderProofStrip(t)}
      <p class="pf-domains mt-6 reveal" data-reveal>${esc(t.hero.contextLine)}</p>
    </div>
  </section>`;
}

function renderValue(locale) {
  const t = copy(locale);
  const cards = t.value.items
    .map(
      (item, i) => `<article class="panel p-5 pf-value-card reveal" data-reveal>
        <p class="font-mono text-xs text-accent">${String(i + 1).padStart(2, "0")}</p>
        <h3 class="mt-3 text-base font-semibold text-fg">${esc(item.title)}</h3>
        <p class="mt-2 text-sm leading-relaxed text-muted">${esc(item.body)}</p>
      </article>`,
    )
    .join("");
  return `<section id="value" class="container scroll-mt-24 py-20 md:py-24">
    ${heading(t.value)}
    <div class="pf-value-grid">${cards}</div>
  </section>`;
}

function ownershipMeta(item, t) {
  const meta = item.ownership;
  if (!meta) return "";
  const chips = [
    [t.caseMeta.status, t.caseMeta.statusValues[meta.status]],
    [t.caseMeta.timeframe, item.period],
    [t.caseMeta.team, t.caseMeta.teamValues[meta.team]],
    [t.caseMeta.data, t.caseMeta.dataValues[meta.data]],
    [t.caseMeta.code, t.caseMeta.codeValues[meta.code]],
    [t.caseMeta.result, t.caseMeta.resultValues[meta.result]],
  ]
    .filter(([, value]) => value)
    .map(
      ([label, value]) =>
        `<span class="pf-meta-chip"><span class="pf-meta-label">${esc(label)}</span> ${esc(value)}</span>`,
    )
    .join("");
  return `<dl class="pf-meta">${chips}</dl>`;
}

function caseLinks(item, t, extra = "") {
  const labels = { repo: t.caseFields.repo, demo: t.caseFields.demo, embed: t.caseFields.embed, live: t.caseFields.live };
  const links = (item.links ?? [])
    .map((link) => {
      const label = link.label ?? labels[link.kind] ?? link.kind;
      const external = link.href.startsWith("http");
      return `<a href="${attr(link.href)}"${external ? ' target="_blank" rel="noopener noreferrer"' : ""}>${esc(label)}</a>`;
    })
    .join("");
  if (!links && !extra) return "";
  return `<div class="pf-links">${links}${extra}</div>`;
}

function renderCaseCard(item, locale) {
  const t = copy(locale);
  const c = t.cases[item.id];
  const pageHref = item.hasPage ? caseHref(locale, item.id) : null;
  const titleText = c.landingTitle || item.name;
  const title = pageHref
    ? `<a href="${attr(pageHref)}" class="pf-case-title-link">${esc(titleText)}</a>`
    : esc(titleText);
  const open = pageHref
    ? `<a class="pf-case-open" href="${attr(pageHref)}">${esc(c.landingCta || t.casePage.openCase)}</a>`
    : "";
  const ownershipKind = item.ownership?.status === "production" ? "prod" : "lab";
  return `<article class="panel relative p-6 md:p-7 pf-case-card pf-case-card--${ownershipKind} reveal" data-reveal>
    ${c.badge ? `<p class="pf-badge pf-badge--${ownershipKind}">${esc(c.badge)}</p>` : ""}
    <div class="pf-case-kicker">
      <span>${esc(item.period)}</span>
      <span aria-hidden="true">·</span>
      <span>${esc(item.name)}</span>
    </div>
    <h3 class="pf-case-title">${title}</h3>
    ${c.oneLiner ? `<p class="mt-3 text-sm leading-relaxed text-muted">${esc(c.oneLiner)}</p>` : ""}
    ${c.honesty ? `<p class="pf-honesty">${esc(c.honesty)}</p>` : ""}
    ${ownershipMeta(item, t)}
    ${c.contribution ? `<div class="pf-field"><p class="eyebrow mb-2">${esc(t.caseFields.contribution)}</p><p class="text-sm leading-relaxed text-fg/85">${esc(c.contribution)}</p></div>` : ""}
    ${c.evalStatus === "in-progress" ? `<p class="pf-eval-note">${esc(t.casePage.evalInProgress)} — ${esc(t.casePage.evalInProgressNote)}</p>` : ""}
    ${caseLinks(item, t, open)}
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

function renderSelectedCases(locale) {
  const t = copy(locale);
  const leadHtml = featuredCases()
    .map((item) => renderCaseCard(item, locale))
    .join("");
  return `<section id="cases" class="container scroll-mt-24 py-20 md:py-24">
    ${heading(t.selectedCases)}
    <p class="pf-note reveal" data-reveal>${esc(t.selectedCases.rndNote)}</p>
    <p class="pf-note reveal" data-reveal>${esc(t.selectedCases.clientNote)}</p>
    <div class="pf-case-grid mt-8">${leadHtml}</div>
  </section>`;
}

function renderHowIWork(locale) {
  const t = copy(locale);
  const items = HOW_I_WORK_KEYS.map((key) => {
    const item = t.howIWork.items[key];
    return `<article class="panel p-5 reveal" data-reveal>
      <h3 class="text-sm font-semibold text-fg">${esc(item.title)}</h3>
      <p class="mt-2 text-sm leading-relaxed text-muted">${esc(item.body)}</p>
    </article>`;
  }).join("");
  return `<div class="container pt-16 md:pt-20">
    ${heading(t.howIWork)}
    <div class="pf-how">${items}</div>
  </div>`;
}

function renderConsulting(locale) {
  const t = copy(locale);
  return `<aside class="container pt-12 md:pt-16">
    <article class="panel p-6 md:p-8">
      <p class="eyebrow">${esc(t.consulting.eyebrow)}</p>
      <h3 class="mt-3 text-xl font-semibold text-fg">${esc(t.consulting.title)}</h3>
      <p class="mt-3 max-w-prose text-sm leading-relaxed text-muted">${esc(t.consulting.body)}</p>
    </article>
  </aside>`;
}

function renderCredentials(locale) {
  const t = copy(locale);
  const highlights = (t.credentials.highlights ?? [])
    .map(
      (item) => `<article class="panel p-5 reveal" data-reveal>
        <h3 class="text-base font-semibold text-fg">${esc(item.title)}</h3>
        <p class="mt-1 font-mono text-xs text-faint">${esc(item.meta)}</p>
      </article>`,
    )
    .join("");
  return `<section id="credentials" class="container scroll-mt-24 pt-20 md:pt-24">
    ${heading(t.credentials)}
    <div class="grid gap-4 sm:grid-cols-2 mb-8">${highlights}</div>
    <div class="pf-contact-row">
      <a class="primary" href="${attr(SITE.cvPath)}">${esc(t.credentials.cv)}</a>
      <a class="secondary" href="${attr(SITE.github)}" target="_blank" rel="noopener noreferrer">${esc(t.credentials.github)}</a>
      <a class="secondary" href="${attr(SITE.linkedin)}" target="_blank" rel="noopener noreferrer">${esc(t.footer.linkedin)}</a>
    </div>
    <p class="mt-6 max-w-prose text-sm text-muted">${esc(t.credentials.educationNote)}</p>
  </section>`;
}

function renderCompetencies(locale) {
  const t = copy(locale);
  const pillars = t.competencies.pillars
    .map(
      (p) => `<article class="panel p-5 pf-pillar reveal" data-reveal><h3 class="text-sm font-semibold text-fg">${esc(p.title)}</h3><p class="mt-2 text-sm leading-relaxed text-muted">${esc(p.body)}</p></article>`,
    )
    .join("");
  return `<div class="container scroll-mt-24 pt-20 md:pt-28">
    ${heading(t.competencies)}
    <div class="pf-pillars">${pillars}</div>
  </div>`;
}

function renderApproach(locale) {
  return `<section id="approach" class="scroll-mt-24 pb-16 md:pb-20">
    ${renderHowIWork(locale)}
    ${renderCompetencies(locale)}
    ${renderConsulting(locale)}
  </section>`;
}

function renderFurtherMandates(locale) {
  const t = copy(locale);
  const secondary = casesBySection("secondary").map((item) => renderSecondaryCase(item, locale)).join("");
  return `<div class="container pt-12 md:pt-16">
    <p class="eyebrow mb-3">${esc(t.selectedCases.secondaryEyebrow)}</p>
    <p class="mb-6 max-w-prose text-sm text-muted">${esc(t.selectedCases.secondaryNote)}</p>
    <div class="pf-secondary">${secondary}</div>
  </div>`;
}

function renderTrack(locale) {
  const t = copy(locale);
  const items = TRACK.map((item) => {
    const copyItem = t.track.items[item.id];
    const related = (item.caseIds ?? [])
      .map((id) => {
        const relatedCase = caseById(id);
        if (!relatedCase) return "";
        return `<a class="pf-track-link" href="${attr(caseHref(locale, id))}">${esc(relatedCase.name)}</a>`;
      })
      .join("");
    return `<article class="panel p-5 reveal" data-reveal>
      <p class="font-mono text-xs text-faint">${esc(item.period)} · ${esc(item.company)}</p>
      <h3 class="mt-2 text-base font-semibold text-fg">${esc(copyItem.title)}</h3>
      <p class="mt-2 text-sm leading-relaxed text-muted">${esc(copyItem.body)}</p>
      ${related ? `<p class="pf-track-links">${related}</p>` : ""}
    </article>`;
  }).join("");
  return `<section id="work" class="pf-section-band scroll-mt-24 py-20 md:py-24">
    <div class="container">
      ${heading(t.track)}
      <div class="pf-track">${items}</div>
      <div class="mt-8 pf-contact-row">
        <a class="secondary" href="${attr(SITE.cvPath)}">${esc(t.track.more)}</a>
      </div>
      ${renderFurtherMandates(locale)}
    </div>
  </section>`;
}

function renderAbout(locale) {
  const t = copy(locale);
  const langs = LANGUAGES_META.map((row) => {
    const item = row[locale];
    return `<span>${esc(item.name)}<span class="text-faint"> · ${esc(item.level)}</span></span>`;
  }).join("");
  return `<section id="about" class="container scroll-mt-24 py-20 md:py-24">
    ${heading(t.about)}
    <p class="max-w-prose text-base leading-relaxed text-muted reveal" data-reveal>${esc(t.about.body)}</p>
    <p class="mt-6 flex flex-wrap gap-x-5 gap-y-2 font-mono text-xs text-faint reveal" data-reveal>
      <span class="eyebrow">${esc(t.hero.languagesLabel)}</span>${langs}
    </p>
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
  return `<section id="education" class="pf-section-band scroll-mt-24 py-20 md:py-28">
    <div class="container">
      ${heading({ ...t.education, description: "" })}
      <div class="space-y-3">${items}</div>
    </div>
  </section>`;
}

function renderFooter(locale) {
  const t = copy(locale);
  return `<footer id="contact" class="pf-footer relative scroll-mt-24">
    <div aria-hidden="true" class="blueprint-grid grid-mask pointer-events-none absolute inset-0 opacity-50"></div>
    <div class="container relative py-20 md:py-28">
      <p class="eyebrow">${esc(t.footer.eyebrow)}</p>
      <h2 class="pf-footer-title mt-4 text-balance">${esc(t.footer.title)}</h2>
      <p class="mt-4 max-w-prose text-muted">${esc(t.footer.body)}</p>
      <div class="mt-10 pf-contact-row pf-contact-row--checkout">
        <a class="primary" href="mailto:${attr(SITE.email)}">${esc(t.hero.ctaTertiary)} · ${esc(SITE.email)}</a>
        <a class="secondary" href="${attr(SITE.linkedin)}" target="_blank" rel="noopener noreferrer">${esc(t.footer.linkedin)}</a>
        <a class="secondary" href="${attr(SITE.github)}" target="_blank" rel="noopener noreferrer">${esc(t.footer.github)}</a>
        <a class="secondary" href="${attr(SITE.cvPath)}">${esc(t.footer.cv)}</a>
      </div>
      <p class="mt-4 max-w-prose text-xs text-faint">${esc(t.footer.cvNote)}</p>
      <p class="mt-6 max-w-prose text-xs text-muted"><span class="eyebrow">${esc(t.privacy.label)}</span> ${esc(t.privacy.body)}</p>
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
  const pageUrl = `${SITE.origin}/portfolio/${locale}`;
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfilePage",
        "@id": `${pageUrl}#profile`,
        url: pageUrl,
        name: t.meta.title,
        dateModified: SITE.updated,
        inLanguage: locale,
        mainEntity: { "@id": `${pageUrl}#person` },
      },
      {
        "@type": "Person",
        "@id": `${pageUrl}#person`,
        name: SITE.name,
        jobTitle: t.meta.jobTitle,
        description: t.meta.personDescription,
        email: SITE.email,
        url: pageUrl,
        sameAs: [SITE.linkedin, SITE.github],
        knowsLanguage: ["German", "English", "Spanish"],
        knowsAbout: JSON_LD_KNOWS_ABOUT,
        address: {
          "@type": "PostalAddress",
          addressLocality: locale === "de" ? SITE.city : "Cologne",
          addressCountry: "DE",
        },
        homeLocation: SITE.location[locale],
      },
    ],
  };
  return JSON.stringify(data);
}

function themeBoot() {
  return `<script>!function(){try{var d=document.documentElement,c=d.classList;c.remove('light','dark');var e=localStorage.getItem('theme');if('system'===e||(!e&&false)){var t='(prefers-color-scheme: dark)',m=window.matchMedia(t);if(m.media!==t||m.matches){d.style.colorScheme='dark';c.add('dark')}else{d.style.colorScheme='light';c.add('light')}}else if(e){c.add(e||'')}else{c.add('dark')}if(e==='light'||e==='dark'||!e)d.style.colorScheme=e||'dark'}catch(e){}}()</script>`;
}

function caseJsonLd(locale, item, copyCase, url) {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: item.name,
    headline: copyCase.pageTitle,
    description: copyCase.pageDescription,
    inLanguage: locale,
    author: {
      "@type": "Person",
      name: SITE.name,
      email: SITE.email,
      url: `${SITE.origin}/portfolio/${locale}`,
      sameAs: [SITE.linkedin, SITE.github],
    },
    url,
    sameAs: (item.links ?? []).filter((l) => l.href.startsWith("http")).map((l) => l.href),
  });
}

function renderCaseSection(label, body) {
  if (!body) return "";
  return `<section class="pf-case-block">
    <h2 class="eyebrow">${esc(label)}</h2>
    <p class="mt-3 max-w-prose text-base leading-relaxed text-fg/90">${esc(body)}</p>
  </section>`;
}

function renderEvalMetrics(copyCase, t) {
  const rows = copyCase.evalMetrics ?? [];
  if (!rows.length && copyCase.evalStatus !== "in-progress") return "";
  const table = rows.length
    ? `<table class="pf-eval-table">
      <thead><tr><th>${esc(t.caseFields.evaluation)}</th><th>${esc(t.casePage.evalToMeasure)}</th></tr></thead>
      <tbody>${rows
        .map((row) => `<tr><th scope="row">${esc(row.metric)}</th><td>${esc(row.note)}</td></tr>`)
        .join("")}</tbody>
    </table>`
    : "";
  const note =
    copyCase.evalStatus === "in-progress"
      ? `<p class="pf-eval-note">${esc(t.casePage.evalInProgress)} — ${esc(t.casePage.evalInProgressNote)}</p>`
      : "";
  return `<section class="pf-case-block">${note}${table}</section>`;
}

function renderRelatedCases(locale, item) {
  const t = copy(locale);
  const ids = item.relatedIds ?? [];
  if (!ids.length) return "";
  const links = ids
    .map((id) => {
      const related = caseById(id);
      const c = t.cases[id];
      if (!related || !c) return "";
      return `<a class="panel p-4 pf-case-more-link" href="${attr(caseHref(locale, id))}">
        <p class="font-mono text-[0.7rem] text-faint">${esc(related.period)}</p>
        <p class="mt-1 font-semibold text-fg">${esc(related.name)}</p>
        <p class="mt-1 text-sm text-muted">${esc(c.domain)}</p>
      </a>`;
    })
    .join("");
  return `<section class="pf-case-block">
    <h2 class="eyebrow">${esc(t.casePage.related)}</h2>
    <div class="pf-case-more-grid mt-4">${links}</div>
  </section>`;
}

function renderArchitecture(copyCase, t, tech) {
  const steps = (copyCase.architectureSteps ?? [])
    .map((step, i) => {
      const arrow =
        i < copyCase.architectureSteps.length - 1
          ? `<span class="pf-arch-arrow" aria-hidden="true">→</span>`
          : "";
      return `<li><span>${esc(step)}</span>${arrow}</li>`;
    })
    .join("");
  return `<section class="pf-case-block">
    <h2 class="eyebrow">${esc(t.caseFields.architecture)}</h2>
    ${copyCase.architecture ? `<p class="mt-3 max-w-prose text-base leading-relaxed text-fg/90">${esc(copyCase.architecture)}</p>` : ""}
    ${steps ? `<ol class="pf-arch-flow">${steps}</ol>` : ""}
    <div class="mt-5 flex flex-wrap gap-1.5">${tech.map((tag) => `<span class="rounded-[3px] bg-bg-sunken px-2 py-1 font-mono text-[0.7rem] text-muted">${esc(tag)}</span>`).join("")}</div>
  </section>`;
}

function renderEvidence(item, copyCase, t) {
  const shots = (item.screenshots ?? [])
    .map((shot) => {
      const alt = copyCase.screenshotAlts?.[shot.altKey] ?? item.name;
      return `<figure class="pf-shot"><a href="${attr(shot.src)}" target="_blank" rel="noopener noreferrer"><img src="${attr(shot.src)}" alt="${attr(alt)}" loading="lazy" width="1200" height="750"/></a><figcaption>${esc(alt)}</figcaption></figure>`;
    })
    .join("");
  return `<section class="pf-case-block" id="evidence">
    <h2 class="eyebrow">${esc(t.caseFields.evidence)}</h2>
    ${caseLinks(item, t)}
    ${shots ? `<div class="pf-shots">${shots}</div>` : `<p class="mt-4 max-w-prose text-sm text-muted">${esc(t.casePage.noPublicShots)}</p>`}
  </section>`;
}

function renderCaseNav(locale, currentId) {
  const t = copy(locale);
  const others = pagedCases()
    .filter((item) => item.id !== currentId)
    .map((item) => {
      const c = t.cases[item.id];
      return `<a class="panel p-4 pf-case-more-link" href="${attr(caseHref(locale, item.id))}">
        <p class="font-mono text-[0.7rem] text-faint">${esc(item.section === "lab" ? t.casePage.moreAi : t.casePage.moreEnterprise)}</p>
        <p class="mt-1 font-semibold text-fg">${esc(item.name)}</p>
        <p class="mt-1 text-sm text-muted">${esc(c.domain)}</p>
      </a>`;
    })
    .join("");
  return `<nav class="pf-case-more" aria-label="${attr(t.casePage.next)}">
    <p class="eyebrow mb-4">${esc(t.casePage.next)}</p>
    <div class="pf-case-more-grid">${others}</div>
  </nav>`;
}

export function renderCasePage(locale, id) {
  const item = caseById(id);
  if (!item?.hasPage) {
    throw new Error(`Unknown case page: ${id}`);
  }
  const t = copy(locale);
  const c = t.cases[id];
  const url = `${SITE.origin}${caseHref(locale, id)}`;
  const title = c.pageTitle || `${item.name} — ${t.hero.role}`;
  const description = c.pageDescription || c.problem;
  const og = `${SITE.origin}/portfolio/${locale}/opengraph-image.png`;
  const home = `/portfolio/${locale}`;
  const siblingPath = `/cases/${id}/`;
  const highlights = (c.highlights ?? [])
    .map((h) => `<li class="flex gap-2.5 text-sm text-fg/85"><span class="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-accent"></span><span>${esc(h)}</span></li>`)
    .join("");
  return `<!DOCTYPE html>
<html lang="${locale}" class="__variable_3f18cd __variable_f3e80d">
<head>
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1"/>
<title>${esc(title)}</title>
<meta name="description" content="${attr(description)}"/>
<meta name="application-name" content="Peter Henrichs · Portfolio"/>
<meta name="author" content="${attr(SITE.name)}"/>
<meta name="robots" content="index, follow"/>
<link rel="canonical" href="${attr(url)}"/>
<link rel="alternate" hreflang="de-DE" href="${SITE.origin}${caseHref("de", id)}"/>
<link rel="alternate" hreflang="en-US" href="${SITE.origin}${caseHref("en", id)}"/>
<link rel="alternate" hreflang="x-default" href="${SITE.origin}${caseHref("de", id)}"/>
<meta property="og:title" content="${attr(title)}"/>
<meta property="og:description" content="${attr(description)}"/>
<meta property="og:url" content="${attr(url)}"/>
<meta property="og:site_name" content="Peter Henrichs · Portfolio"/>
<meta property="og:locale" content="${locale === "de" ? "de_DE" : "en_US"}"/>
<meta property="og:image" content="${attr(og)}"/>
<meta property="og:image:width" content="1200"/>
<meta property="og:image:height" content="630"/>
<meta property="og:image:alt" content="${attr(title)}"/>
<meta property="og:type" content="article"/>
<meta name="twitter:card" content="summary_large_image"/>
<meta name="twitter:title" content="${attr(title)}"/>
<meta name="twitter:description" content="${attr(description)}"/>
<meta name="twitter:image" content="${attr(og)}"/>
<meta name="theme-color" media="(prefers-color-scheme: light)" content="#F4F0E8"/>
<meta name="theme-color" media="(prefers-color-scheme: dark)" content="#10151E"/>
<link rel="icon" href="/portfolio/${locale}/icon.png" type="image/png" sizes="32x32"/>
<link rel="stylesheet" href="/portfolio/de/_next/static/css/76323045a7107f6a.css"/>
<link rel="stylesheet" href="/portfolio/portfolio.css"/>
</head>
<body class="min-h-screen bg-bg font-sans antialiased">
${themeBoot()}
<a href="#main" class="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:panel focus:px-4 focus:py-2 focus:text-sm">${esc(t.common.skipToContent)}</a>
${renderNav(locale, { siblingPath, homePrefix: home })}
<main id="main" class="pf-case-page">
<script type="application/ld+json">${caseJsonLd(locale, item, c, url)}</script>
<article class="container pb-20 pt-28 md:pb-28 md:pt-32">
  <p class="eyebrow">${esc(t.casePage.caseStudy)}</p>
  <p class="mt-4 font-mono text-xs text-faint"><a href="${attr(home)}" class="hover:text-accent">${esc(t.casePage.back)}</a> · ${esc(item.period)} · ${esc(c.domain)}</p>
  <h1 class="pf-hero-title mt-4 text-balance">${esc(c.landingTitle || item.name)}</h1>
  <p class="mt-2 text-muted">${esc(item.name)}${item.client ? ` · ${esc(item.client)}` : ""}</p>
  ${c.badge ? `<p class="pf-badge pf-badge--${item.ownership?.status === "production" ? "prod" : "lab"}">${esc(c.badge)}</p>` : ""}
  ${c.honesty ? `<p class="pf-honesty">${esc(c.honesty)}</p>` : ""}
  ${ownershipMeta(item, t)}
  ${renderCaseSection(t.caseFields.context, c.context)}
  ${renderCaseSection(t.caseFields.problem, c.problem)}
  ${renderCaseSection(t.caseFields.role, c.role)}
  ${renderCaseSection(t.caseFields.contribution, c.contribution)}
  ${renderCaseSection(t.caseFields.decision, c.decision)}
  ${renderArchitecture(c, t, item.tech)}
  ${renderCaseSection(t.caseFields.evaluation, c.evaluation)}
  ${renderEvalMetrics(c, t)}
  ${renderCaseSection(t.caseFields.outcome, c.outcome)}
  ${highlights ? `<ul class="mt-2 space-y-2">${highlights}</ul>` : ""}
  ${renderEvidence(item, c, t)}
  ${renderRelatedCases(locale, item)}
  ${renderCaseSection(t.caseFields.transfer, c.transfer)}
  <p class="mt-10 max-w-prose text-sm text-muted"><span class="eyebrow">${esc(t.privacy.label)}</span> ${esc(t.privacy.body)}</p>
  ${renderCaseNav(locale, id)}
</article>
</main>
${renderFooter(locale)}
<script src="/portfolio/app.js" defer></script>
</body>
</html>`;
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
<meta name="theme-color" media="(prefers-color-scheme: light)" content="#F4F0E8"/>
<meta name="theme-color" media="(prefers-color-scheme: dark)" content="#10151E"/>
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
${renderSelectedCases(locale)}
${renderValue(locale)}
${renderTrack(locale)}
${renderApproach(locale)}
${renderCredentials(locale)}
${renderEducation(locale)}
${renderAbout(locale)}
</main>
${renderFooter(locale)}
<script src="/portfolio/app.js" defer></script>
</body>
</html>`;
}

export function renderCv(locale) {
  const t = copy(locale);
  const featured = featuredCases()
    .map((item) => {
      const c = t.cases[item.id];
      const href = item.hasPage ? caseHref(locale, item.id) : `/portfolio/${locale}`;
      return `<article class="panel p-5 mb-3"><h3 class="font-semibold text-fg"><a href="${attr(href)}" class="pf-case-title-link">${esc(item.name)}</a></h3><p class="text-sm text-muted">${esc(c.domain)}</p><p class="mt-2 text-sm">${esc(c.outcome)}</p></article>`;
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
<meta name="theme-color" media="(prefers-color-scheme: light)" content="#F4F0E8"/>
<meta name="theme-color" media="(prefers-color-scheme: dark)" content="#10151E"/>
<link rel="stylesheet" href="/portfolio/de/_next/static/css/76323045a7107f6a.css"/>
<link rel="stylesheet" href="/portfolio/portfolio.css"/>
</head>
<body class="min-h-screen bg-bg font-sans antialiased">
${themeBoot()}
<header class="pf-header fixed inset-x-0 top-0 z-50" data-site-header>
  <nav aria-label="${attr(t.nav.ariaPrimary)}" class="container flex items-center justify-between gap-4">
    <a href="/portfolio/${locale}" class="pf-brand">
      <span class="pf-brand-mark" aria-hidden="true"><span></span></span>
      <span class="hidden sm:inline">${esc(SITE.name)}</span>
    </a>
    <div class="flex items-center gap-2">
      <a href="/portfolio/${locale}" class="pf-nav-cta">${esc(t.cv.back)}</a>
      <button type="button" data-theme-toggle aria-label="${attr(t.theme.toDark)}" class="pf-icon-btn group relative">${iconSun()}${iconMoon()}</button>
    </div>
  </nav>
</header>
<div class="cv-page">
  <p class="eyebrow">${esc(t.hero.eyebrow)}</p>
  <h1 class="pf-hero-title mt-3">${esc(SITE.name)}</h1>
  <p class="pf-role">${esc(t.cv.subtitle)}</p>
  <p class="mt-4 text-muted">${esc(t.cv.intro)}</p>
  <div class="cv-actions">
    <button type="button" onclick="window.print()" class="pf-cta pf-cta--primary">${esc(t.cv.print)}</button>
    <a href="/portfolio/${locale}" class="pf-cta pf-cta--secondary">${esc(t.cv.back)}</a>
    <a href="mailto:${attr(SITE.email)}" class="pf-cta pf-cta--secondary">${esc(SITE.email)}</a>
    <a href="${attr(SITE.linkedin)}" target="_blank" rel="noopener noreferrer" class="pf-cta pf-cta--secondary">LinkedIn</a>
    <a href="${attr(SITE.github)}" target="_blank" rel="noopener noreferrer" class="pf-cta pf-cta--secondary">GitHub</a>
  </div>
  <p class="mt-2 text-sm text-muted">${esc(t.hero.location)}</p>
  <h2 class="mt-8 text-xl font-semibold">${esc(t.selectedCases.eyebrow)}</h2>
  <div class="mt-4">${featured}</div>
  <h2 class="mt-10 text-xl font-semibold">${esc(t.experience.eyebrow)}</h2>
  <div class="mt-4">${jobs}</div>
  <p class="cv-todo">${esc(t.cv.todo)}</p>
</div>
<script src="/portfolio/app.js" defer></script>
</body>
</html>`;
}

export function renderSitemap() {
  const now = new Date().toISOString();
  const pages = [
    { de: `${SITE.origin}/portfolio/de`, en: `${SITE.origin}/portfolio/en`, priority: "0.8" },
    ...pagedCases().map((item) => ({
      de: `${SITE.origin}${caseHref("de", item.id)}`,
      en: `${SITE.origin}${caseHref("en", item.id)}`,
      priority: item.section === "ai" ? "0.7" : "0.65",
    })),
  ];
  const urls = pages
    .flatMap((page) => [
      `<url>
<loc>${page.de}</loc>
<xhtml:link rel="alternate" hreflang="de" href="${page.de}" />
<xhtml:link rel="alternate" hreflang="en" href="${page.en}" />
<lastmod>${now}</lastmod>
<changefreq>monthly</changefreq>
<priority>${page.priority}</priority>
</url>`,
      `<url>
<loc>${page.en}</loc>
<xhtml:link rel="alternate" hreflang="de" href="${page.de}" />
<xhtml:link rel="alternate" hreflang="en" href="${page.en}" />
<lastmod>${now}</lastmod>
<changefreq>monthly</changefreq>
<priority>${page.priority === "0.8" ? "0.6" : page.priority}</priority>
</url>`,
    ])
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls}
</urlset>
`;
}
