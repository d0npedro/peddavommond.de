import {
  SITE,
  EXPERIENCE,
  EDUCATION,
  LANGUAGES_META,
  JSON_LD_KNOWS_ABOUT,
  HOW_I_WORK_KEYS,
  TRACK,
  casesBySection,
  featuredCases,
  FLAGSHIP_IDS,
  pagedCases,
  caseById,
  caseHref,
} from "./shared.mjs";
import { copy } from "./content.mjs";
import { offerChip, stageEntryNav, stageTopbar } from "./render-stage1.mjs";

/** Next export = layout/utilities. Token + component layer is portfolio.css (copied to public/). */
const NEXT_LAYOUT_CSS = "/portfolio/de/_next/static/css/76323045a7107f6a.css";
const PORTFOLIO_CSS = "/portfolio/portfolio.css?v=paper-20260924b";
const STAGE_CSS = "/portfolio/stage1.css?v=paper-20260924b";

function stylesheets() {
  return `<link rel="stylesheet" href="${NEXT_LAYOUT_CSS}"/>
<link rel="stylesheet" href="${PORTFOLIO_CSS}"/>
<link rel="stylesheet" href="${STAGE_CSS}"/>`;
}

function pageScripts() {
  return `<script src="/portfolio/motion/stage-reveal.js" defer></script>
<script src="/portfolio/motion/craft-mark.js" defer></script>
<script src="/portfolio/app.js" defer></script>`;
}

export function esc(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** Approved H1, broken only for display. Joined beats must equal the i18n string. */
const PROMISE_LINES = new Map([
  [
    "Ich baue Agenten-Schichten in laufende Enterprise-Systeme — prüfbar, mit Human-in-the-Loop.",
    [
      { before: "Ich baue ", keep: "Agenten-Schichten" },
      { before: "in laufende ", keep: "Enterprise-Systeme —" },
      { before: "prüfbar, mit ", keep: "Human-in-the-Loop." },
    ],
  ],
  [
    "I build agent layers into running enterprise systems — reviewable, with human-in-the-loop.",
    [
      "I build agent layers",
      { before: "into running enterprise ", keep: "systems —" },
      { before: "reviewable, with ", keep: "human-in-the-loop." },
    ],
  ],
]);

function renderPromise(text) {
  const lines = PROMISE_LINES.get(text);
  if (!lines) return esc(text);
  const visible = lines
    .map((line) => (typeof line === "string" ? line : `${line.before}${line.keep}`))
    .join(" ");
  if (visible !== text) {
    throw new Error("hero promise lines drifted from the approved sentence");
  }
  return lines
    .map((line) => {
      const inner =
        typeof line === "string"
          ? esc(line)
          : `${esc(line.before)}<span class="pf-keep">${esc(line.keep)}</span>`;
      return `<span class="pf-hero-beat">${inner}</span>`;
    })
    .join(" ");
}

function label(value, name) {
  if (typeof value !== "string" || value.trim() === "" || value.includes("[object Object]")) {
    throw new Error(`${name} must be a plain string label`);
  }
  return esc(value);
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

function renderHeroDiagram(t) {
  const L = t.hero.diagramLabels;
  return `<figure class="pf-diagram pf-system-board reveal" data-reveal>
    <div class="pf-system-board__bar">
      <span>${esc(L.goal)} → ${esc(L.orchestrator)}</span>
      <span>${esc(L.eval)} → ${esc(L.human)}</span>
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
  return `<section id="hero" class="pf-hero pf-stage pf-stage--hero">
    <div class="container pf-stage-center">
      <p class="pf-hero-chip">${esc(SITE.name)} · ${esc(t.hero.role)}</p>
      <h1 class="pf-hero-title">${renderPromise(t.hero.h1)}</h1>
      <div class="pf-cta-row">
        <a href="#offer" class="pf-cta pf-cta--primary">${esc(t.hero.ctaPrimary)}</a>
      </div>
      ${stageEntryNav(locale)}
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
  const spot = t.selectedCases.spots[item.id];
  const ownershipKind = item.ownership?.status === "production" ? "prod" : "lab";
  let action = "";
  if (item.id === "graph-mastermind") {
    action = renderContractExpand(locale);
  } else if (item.id === "agent-collective") {
    action = `<p class="pf-case-action"><a class="pf-case-open" href="#sample-collective">${esc(spot.sample)}</a></p>`;
  } else if (item.hasPage) {
    action = `<p class="pf-case-action"><a class="pf-case-open" href="${attr(caseHref(locale, item.id))}">${esc(c.landingCta || t.casePage.openCase)}</a></p>`;
  }
  return `<article class="pf-case-card pf-case-card--${ownershipKind} pf-spot">
    <div class="pf-enter" data-reveal>
      <span class="pf-hairline" aria-hidden="true"></span>
      <h3 class="pf-case-title">${esc(spot.title)}</h3>
    </div>
    <p class="pf-chip pf-chip--signal">${esc(spot.chip)}</p>
    <p class="pf-spot-idea">${esc(spot.idea)}</p>
    <p class="pf-spot-line">${esc(spot.body)}</p>
    ${action}
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
  const leads = featuredCases();
  const leadHtml = leads.map((item) => renderCaseCard(item, locale)).join("");
  return `<section id="cases" class="pf-cases scroll-mt-24">
    <div class="container">
      <div class="pf-enter" data-reveal>
        <span class="pf-hairline" aria-hidden="true"></span>
        <h2 class="pf-stage-title">${esc(t.selectedCases.beatTitle)}</h2>
      </div>
      <p class="pf-stage-lede">${esc(t.selectedCases.lead)}</p>
      <div class="pf-spots">${leadHtml}</div>
    </div>
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
  return `<aside class="pf-archive">
    <h2 class="pf-archive-title">${esc(t.consulting.title)}</h2>
    <p>${esc(t.consulting.body)}</p>
  </aside>`;
}

function renderCredentials(locale) {
  const t = copy(locale);
  const highlights = (t.credentials.highlights ?? [])
    .map(
      (item) => `<article class="pf-archive-item">
        <h3>${esc(item.title)}</h3>
        <p class="pf-archive-meta">${esc(item.meta)}</p>
      </article>`,
    )
    .join("");
  return `<section id="credentials" class="pf-archive">
    <h2 class="pf-archive-title">${esc(t.credentials.title)}</h2>
    <div class="pf-archive-list">${highlights}</div>
    <div class="pf-contact-row">
      <a class="secondary" href="${attr(SITE.cvPath)}">${esc(t.credentials.cv)}</a>
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
      (p) => `<li class="pf-archive-item"><h3>${esc(p.title)}</h3><p>${esc(p.body)}</p></li>`,
    )
    .join("");
  return `<div class="pf-archive-skills">
    <h3 class="pf-archive-title">${esc(t.competencies.title)}</h3>
    <ul class="pf-archive-list">${pillars}</ul>
  </div>`;
}

function renderFurtherMandates(locale) {
  const t = copy(locale);
  const secondary = casesBySection("secondary").map((item) => renderSecondaryCase(item, locale)).join("");
  return `<div class="pf-archive-more">
    <p class="pf-archive-meta">${esc(t.selectedCases.secondaryEyebrow)}</p>
    <p>${esc(t.selectedCases.secondaryNote)}</p>
    <div class="pf-archive-list">${secondary}</div>
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
    return `<li class="pf-archive-item">
      <p class="pf-archive-meta">${esc(item.period)} · ${esc(item.company)}</p>
      <h3>${esc(copyItem.title)}</h3>
      <p>${esc(copyItem.body)}</p>
      ${related ? `<p class="pf-track-links">${related}</p>` : ""}
    </li>`;
  }).join("");
  return `<section id="work" class="pf-archive">
    <div>
      <h2 class="pf-archive-title">${esc(t.track.title)}</h2>
      <ol class="pf-archive-list">${items}</ol>
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
  return `<section id="about" class="pf-archive">
    <h2 class="pf-archive-title">${esc(t.about.title)}</h2>
    <p class="max-w-prose text-base leading-relaxed text-muted">${esc(t.about.body)}</p>
    <p class="mt-6 flex flex-wrap gap-x-5 gap-y-2 font-mono text-xs text-faint">
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
    return `<article class="pf-archive-item">
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
  return `<section id="education" class="pf-archive">
    <h2 class="pf-archive-title">${esc(t.education.title)}</h2>
    <div class="pf-archive-list">${items}</div>
  </section>`;
}

function renderFooter(locale) {
  const t = copy(locale);
  return `<section id="contact" class="pf-footer relative scroll-mt-24">
    <div class="container relative py-20 md:py-28">
      <div class="pf-enter" data-reveal>
        <span class="pf-hairline" aria-hidden="true"></span>
        <h2 class="pf-footer-title">${esc(t.footer.title)}</h2>
      </div>
      <p class="pf-location">${esc(t.footer.lead)}</p>
      <p class="pf-contact-echo">${esc(t.footer.echo)}</p>
      <div class="mt-10 pf-contact-row pf-contact-row--checkout">
        <a class="pf-cta pf-cta--primary" href="mailto:${attr(SITE.email)}">${esc(SITE.email)}</a>
        <a class="secondary" href="${attr(SITE.linkedin)}" target="_blank" rel="noopener noreferrer">${esc(t.footer.linkedin)}</a>
        <a class="secondary" href="${attr(SITE.github)}" target="_blank" rel="noopener noreferrer">${esc(t.footer.github)}</a>
        <a class="secondary" href="${attr(SITE.cvPath)}">${esc(t.footer.cv)}</a>
        <a class="secondary" href="/portfolio/${locale}/kontakt/">${esc(locale === "de" ? "Kontaktseite" : "Contact page")}</a>
      </div>
      <div class="hairline my-12"></div>
      <div class="flex flex-col items-start justify-between gap-4 font-mono text-xs text-faint sm:flex-row sm:items-center">
        <span>© ${SITE.year} ${esc(SITE.name)}</span>
        <span class="hidden sm:inline">${esc(t.footer.roleLine)}</span>
      </div>
    </div>
  </section>`;
}

function renderCraftCredit(locale) {
  const craft = copy(locale).craft;
  const modules = craft.modules.map((name) => `<code>${esc(name)}</code>`).join(" · ");
  return `<section id="craft-credit" class="pf-craft scroll-mt-24">
    <div class="container pf-stage-narrow">
      <p class="pf-craft-copy">${esc(craft.body)}</p>
      <p class="pf-craft-modules">${modules}</p>
      <p class="pf-honesty-chips"><span class="pf-chip">${esc(craft.chip)}</span></p>
      <figure class="pf-craft-mark" data-craft-mark>
        <svg viewBox="0 0 240 24" width="240" height="24" aria-hidden="true" focusable="false">
          <path d="M4 12 H236" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="round"></path>
        </svg>
        <figcaption class="pf-craft-tech">${esc(craft.technique)}</figcaption>
      </figure>
    </div>
  </section>`;
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
<html lang="${locale}" class="__variable_3f18cd __variable_f3e80d light paper">
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
<meta name="theme-color" content="#F4F0E8"/>
<link rel="icon" href="/portfolio/${locale}/icon.png" type="image/png" sizes="32x32"/>
${stylesheets()}
</head>
<body class="min-h-screen bg-bg font-sans antialiased">
<a class="skip" href="#main">${esc(t.common.skipToContent)}</a>
${stageTopbar(locale, siblingPath)}
<main id="main" class="pf-case-page">
<script type="application/ld+json">${caseJsonLd(locale, item, c, url)}</script>
<article class="container pb-16 pt-8 md:pb-20">
  <p class="eyebrow">${esc(t.casePage.caseStudy)}</p>
  <p class="mt-4 font-mono text-xs text-faint"><a href="${attr(home)}" class="hover:text-accent">${esc(t.casePage.back)}</a> · ${esc(item.period)} · ${esc(c.domain)}</p>
  <h1 class="pf-case-page-title mt-4 text-balance">${esc(c.landingTitle || item.name)}</h1>
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
${pageScripts()}
</body>
</html>`;
}

function jsonIsland(id, value) {
  return `<script type="application/json" id="${attr(id)}">${JSON.stringify(value).replace(/</g, "\\u003c")}</script>`;
}

function renderAgentList(agents) {
  return agents
    .map(
      (agent) =>
        `<li class="pf-agent"><span class="pf-agent-role">${esc(agent.role)}</span><span class="pf-agent-status" data-status="${attr(agent.status)}">${esc(agent.status)}</span></li>`,
    )
    .join("");
}

function renderCollectiveSample(locale) {
  const s = copy(locale).samples.collective;
  const first = s.review[0];
  return `<section id="sample-collective" class="pf-stage scroll-mt-24">
    <div class="container pf-sample">
      <div class="pf-sample-copy">
        <div class="pf-enter" data-reveal>
          <span class="pf-hairline" aria-hidden="true"></span>
          <h2 class="pf-stage-title">${esc(s.title)}</h2>
        </div>
        <p class="pf-stage-lede">${esc(s.body)}</p>
        <p class="pf-honesty-chips">
          <span class="pf-chip pf-chip--signal">${esc(s.badge)}</span>
        </p>
        <p class="pf-stage-lede">${esc(s.shown)}</p>
      </div>
      <div class="pf-touch" data-touch="collective">
        <div class="pf-touch-bar">
          <p class="pf-badge pf-badge--lab">${esc(s.badge)}</p>
          <p class="pf-touch-tick"><span>${esc(s.tickLabel)}</span> <span data-tick>${esc(first.tick)}</span></p>
        </div>
        <p class="pf-touch-phase" data-phase>${esc(first.phase)}</p>
        <ul class="pf-agents" data-agents>${renderAgentList(first.agents)}</ul>
        <p class="pf-touch-detail" data-detail aria-live="polite">${esc(first.detail)}</p>
        <div class="pf-touch-actions">
          <button type="button" class="pf-touch-btn" data-action="step">${label(s.step, "samples.collective.step")}</button>
          <button type="button" class="pf-touch-btn" data-action="fail" aria-pressed="false">${label(s.failLabel, "samples.collective.failLabel")}</button>
          <button type="button" class="pf-touch-btn" data-action="reset">${label(s.reset, "samples.collective.reset")}</button>
        </div>
        <p class="pf-touch-note">${esc(s.note)}</p>
        ${jsonIsland("pf-collective-frames", { review: s.review, fail: s.fail })}
      </div>
    </div>
  </section>`;
}

function renderGraphPanels(tabs) {
  return tabs
    .map((tab, index) => {
      const hidden = index === 0 ? "" : " hidden";
      const body =
        tab.kind === "checks"
          ? `<ul class="pf-checks">${tab.items
              .map(
                (item) =>
                  `<li><label><input type="checkbox"/> <span>${esc(item)}</span></label></li>`,
              )
              .join("")}</ul>`
          : `<pre class="pf-snippet">${esc(tab.body)}</pre>`;
      return `<div role="tabpanel" class="pf-tabpanel" id="panel-${attr(tab.id)}" data-panel="${attr(tab.id)}" aria-labelledby="tab-${attr(tab.id)}"${hidden}>
        <p class="pf-touch-note">${esc(tab.caption)}</p>
        ${body}
      </div>`;
    })
    .join("");
}

function renderContractExpand(locale) {
  const s = copy(locale).samples.graph;
  const tabs = s.tabs
    .map((tab, index) => {
      const selected = index === 0;
      return `<button type="button" class="pf-tab" role="tab" id="tab-${attr(tab.id)}" data-tab="${attr(tab.id)}" aria-selected="${selected ? "true" : "false"}" aria-controls="panel-${attr(tab.id)}" tabindex="${selected ? "0" : "-1"}">${esc(tab.label)}</button>`;
    })
    .join("");
  return `<details class="pf-contract">
    <summary class="pf-case-open">${esc(s.expand)}</summary>
    <div class="pf-contract-body" data-touch="contract">
      <p class="pf-chip pf-chip--signal">${esc(s.status)}</p>
      <p class="pf-contract-kicker">${esc(s.kicker)}</p>
      <div class="pf-tabs" role="tablist" aria-label="${attr(s.expand)}">${tabs}</div>
      ${renderGraphPanels(s.tabs)}
      <p class="pf-touch-note">${esc(s.scratch)}</p>
    </div>
  </details>`;
}

function renderOffer(locale) {
  const o = copy(locale).offer;
  const packages = o.packages
    .map((pkg, index) => {
      const items = pkg.deliverables.map((line) => `<li>${esc(line)}</li>`).join("");
      return `<article class="pf-offer">
        <div class="pf-offer-name">
          <p class="pf-offer-index">${String(index + 1).padStart(2, "0")}</p>
          <h3>${esc(pkg.name)}</h3>
        </div>
        <div>
          <p class="pf-offer-scope">${esc(pkg.scope)}</p>
          <dl class="pf-offer-dl">
            <div><dt>${esc(o.deliverables)}</dt><dd><ul>${items}</ul></dd></div>
            <div><dt>${esc(o.ideal)}</dt><dd>${esc(pkg.ideal)}</dd></div>
            <div><dt>${esc(o.engagement)}</dt><dd>${esc(pkg.engagement)}</dd></div>
          </dl>
        </div>
      </article>`;
    })
    .join("");
  return `<section id="offer" class="pf-stage scroll-mt-24">
    <div class="container">
      <div class="pf-enter" data-reveal>
        <span class="pf-hairline" aria-hidden="true"></span>
        <h2 class="pf-stage-title">${esc(o.title)}</h2>
      </div>
      <p class="pf-stage-lede">${esc(o.intro)}</p>
      <div class="pf-offers">${packages}</div>
      ${renderApproachFold(locale)}
    </div>
  </section>`;
}

function renderApproachFold(locale) {
  const t = copy(locale);
  const items = HOW_I_WORK_KEYS.map((key) => {
    const item = t.howIWork.items[key];
    return `<li class="pf-principle"><span class="pf-principle-name">${esc(item.title)}</span><span class="pf-principle-line">${esc(item.line)}</span></li>`;
  }).join("");
  return `<div id="approach" class="pf-method">
    <ol class="pf-principles">${items}</ol>
  </div>`;
}

function renderRecord(locale) {
  const t = copy(locale);
  const stations = TRACK.map((item) => {
    const copyItem = t.track.items[item.id];
    const related = (item.caseIds ?? [])
      .map((id) => {
        const relatedCase = caseById(id);
        if (!relatedCase?.hasPage) return "";
        return `<a class="pf-track-link" href="${attr(caseHref(locale, id))}">${esc(relatedCase.name)}</a>`;
      })
      .filter(Boolean)
      .join("");
    return `<li class="pf-station">
      <p class="pf-archive-meta">${esc(item.period)} · ${esc(item.company)}</p>
      <h3>${esc(copyItem.title)}</h3>
      <p>${esc(copyItem.body)}</p>
      ${related ? `<p class="pf-track-links">${related}</p>` : ""}
    </li>`;
  }).join("");
  return `<section id="record" class="pf-record scroll-mt-24">
    <div class="container">
      <details data-record>
        <summary class="pf-shell" data-reveal><h2 class="pf-record-title">${esc(t.record.summary)}</h2></summary>
        <div class="pf-record-body">
          <p class="pf-stage-lede">${esc(t.record.note)}</p>
          <ol class="pf-stations">${stations}</ol>
          <p class="pf-contact-row"><a class="secondary" href="${attr(SITE.cvPath)}">${esc(t.hero.ctaSecondary)}</a></p>
        </div>
      </details>
    </div>
  </section>`;
}

export function renderPage(locale) {
  const t = copy(locale);
  const url = `${SITE.origin}/portfolio/${locale}`;
  const og = `${SITE.origin}/portfolio/${locale}/opengraph-image.png`;
  return `<!DOCTYPE html>
<html lang="${locale}" class="__variable_3f18cd __variable_f3e80d light paper">
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
<meta name="theme-color" content="#F4F0E8"/>
<link rel="icon" href="/portfolio/${locale}/icon.png" type="image/png" sizes="32x32"/>
${stylesheets()}
</head>
<body class="min-h-screen bg-bg font-sans antialiased">
<a class="skip" href="#main">${esc(t.common.skipToContent)}</a>
${stageTopbar(locale, "/")}
<main id="main">
<script type="application/ld+json">${jsonLd(locale)}</script>
${renderHero(locale)}
${renderOffer(locale)}
${renderSelectedCases(locale)}
${renderCollectiveSample(locale)}
${renderRecord(locale)}
</main>
${renderFooter(locale)}
${renderCraftCredit(locale)}
${pageScripts()}
</body>
</html>`;
}

export function renderCv(locale) {
  const t = copy(locale);
  const more = pagedCases()
    .filter((item) => !FLAGSHIP_IDS.includes(item.id))
    .map((item) => `<li><a href="${attr(caseHref(locale, item.id))}">${esc(item.name)}</a></li>`)
    .join("");
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
<html lang="${locale}" class="__variable_3f18cd __variable_f3e80d light">
<head>
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1"/>
<title>${esc(t.cv.title)}</title>
<meta name="description" content="${attr(t.cv.intro)}"/>
<meta name="robots" content="noindex"/>
<meta name="theme-color" content="#F4F0E8"/>
${stylesheets()}
</head>
<body class="min-h-screen bg-bg font-sans antialiased">
<header class="pf-header fixed inset-x-0 top-0 z-50" data-site-header>
  <nav aria-label="${attr(t.nav.ariaPrimary)}" class="container flex items-center justify-between gap-4">
    <a href="/portfolio/${locale}" class="pf-brand">
      <span class="pf-brand-mark" aria-hidden="true"><span></span></span>
      <span class="hidden sm:inline">${esc(SITE.name)}</span>
    </a>
    <div class="flex flex-wrap items-center justify-end gap-2">
      ${offerChip(locale)}
      <a href="/portfolio/${locale}" class="pf-nav-cta pf-nav-cta--always">${esc(t.cv.back)}</a>
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
  <h2 class="mt-10 text-xl font-semibold">${esc(t.selectedCases.secondaryEyebrow)}</h2>
  <ul class="mt-4">${more}</ul>
  <h2 class="mt-10 text-xl font-semibold">${esc(t.experience.eyebrow)}</h2>
  <div class="mt-4">${jobs}</div>
  <p class="cv-todo">${esc(t.cv.todo)}</p>
</div>
${pageScripts()}
</body>
</html>`;
}

export function renderSitemap(extra = []) {
  const now = new Date().toISOString();
  const pages = [
    { de: `${SITE.origin}/portfolio/de`, en: `${SITE.origin}/portfolio/en`, priority: "0.8" },
    ...pagedCases().map((item) => ({
      de: `${SITE.origin}${caseHref("de", item.id)}`,
      en: `${SITE.origin}${caseHref("en", item.id)}`,
      priority: item.section === "ai" ? "0.7" : "0.65",
    })),
    ...extra,
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
