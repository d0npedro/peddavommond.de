/**
 * Stage 1 pages: roles, scrubbable Lebenslauf, static deep dives, contact.
 * Same URL slugs in DE and EN (the live case pages already share slugs).
 * Paper pages. Content comes from portfolio/content. Packages on the
 * Agentic AI role are the live offer copy.
 */
import { copy } from "./content.mjs";
import { byId, timelineEntries } from "./content/index.mjs";
import { offerHref, offerLabel } from "./offer-link.mjs";
import { SITE, caseById, caseHref } from "./shared.mjs";

const NEXT_LAYOUT_CSS = "/portfolio/de/_next/static/css/76323045a7107f6a.css";
const PORTFOLIO_CSS = "/portfolio/portfolio.css?v=paper-20260924b";
const STAGE_CSS = "/portfolio/stage1.css?v=paper-20260924b";

const CHAPTER_KEYS = ["ausgangslage", "schnitt", "umsetzung", "nachweis", "ergebnis"];

const ROLE_SLUG = {
  "role-agentic-ai-consulting": "agentic-ai",
  "role-java-backend": "java-backend",
};

export function roleHref(locale, slug) {
  return `/portfolio/${locale}/rollen/${slug}/`;
}

export function timelineHref(locale) {
  return `/portfolio/${locale}/lebenslauf/`;
}

export function diveHref(locale, id) {
  return `/portfolio/${locale}/lebenslauf/${id}/`;
}

export function contactHref(locale) {
  return `/portfolio/${locale}/kontakt/`;
}

const UI = {
  de: {
    navLabel: "Portfolio",
    roleShort: "Agentic AI",
    javaShort: "Java Backend",
    timelineNav: "Lebenslauf",
    contactNav: "Kontakt",
    lang: "Sprache",
    skip: "Zum Inhalt springen",
    timelineTitle: "Lebenslauf",
    timelineLede:
      "Stationen, Cases und Experimente — scrubbar nach Jahr. Independent R&D und Kundenarbeit getrennt gekennzeichnet.",
    menu: "Menü",
    engagementTitle: "Einsatz",
    contactCta: "Kontakt",
    stations: "Lebenslauf · Stationen",
    placeholderNote:
      "Eckige Klammern sind offene Platzhalter. Sie bleiben stehen, bis eine echte Angabe mit Quelle da ist.",
    yearRail: "Jahr-Schiene",
    chooseYear: "Jahr wählen",
    openDive: "Deep Dive öffnen",
    close: "Schließen",
    backTimeline: "Zurück zum Lebenslauf",
    source: "Quelle",
    placeholder: "Platzhalter",
    tasks: "Aufgaben",
    casePage: "Zur Case-Seite",
    contactTitle: "Kontakt",
    contactLede: "Peter Henrichs · Köln. E-Mail, LinkedIn und GitHub.",
    email: "E-Mail",
    fits: "Passt",
    notFits: "Passt nicht",
    related: "Verknüpft",
    roleKicker: "Rolle",
    honesty: {
      "independent-rnd": "Independent R&D",
      client: "Kundenarbeit",
      employment: "Anstellung",
    },
    type: { role: "Rolle", case: "Case", experiment: "Experiment", cv: "CV" },
    chapters: {
      ausgangslage: "Ausgangslage",
      schnitt: "Schnitt",
      umsetzung: "Umsetzung",
      nachweis: "Nachweis",
      ergebnis: "Ergebnis",
    },
    linkKind: { repo: "Repository", demo: "Live-Demo", anchor: "Link" },
  },
  en: {
    navLabel: "Portfolio",
    roleShort: "Agentic AI",
    javaShort: "Java Backend",
    timelineNav: "Career",
    contactNav: "Contact",
    lang: "Language",
    skip: "Skip to content",
    timelineTitle: "Career",
    timelineLede:
      "Stations, cases and experiments — scrubbable by year. Independent R&D and client work are labeled separately.",
    menu: "Menu",
    engagementTitle: "Engagement",
    contactCta: "Contact",
    stations: "Career · stations",
    placeholderNote:
      "Square brackets are open placeholders. They stay until a real figure with a source exists.",
    yearRail: "Year rail",
    chooseYear: "Choose year",
    openDive: "Open deep dive",
    close: "Close",
    backTimeline: "Back to the career timeline",
    source: "Source",
    placeholder: "Placeholder",
    tasks: "Tasks",
    casePage: "Full case page",
    contactTitle: "Contact",
    contactLede: "Peter Henrichs · Cologne. Email, LinkedIn and GitHub.",
    email: "Email",
    fits: "Fits",
    notFits: "Does not fit",
    related: "Related",
    roleKicker: "Role",
    honesty: {
      "independent-rnd": "Independent R&D",
      client: "Client work",
      employment: "Employment",
    },
    type: { role: "Role", case: "Case", experiment: "Experiment", cv: "CV" },
    chapters: {
      ausgangslage: "Starting point",
      schnitt: "Cut",
      umsetzung: "Implementation",
      nachweis: "Evidence",
      ergebnis: "Result",
    },
    linkKind: { repo: "Repository", demo: "Live demo", anchor: "Link" },
  },
};

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

export function offerChip(locale) {
  return `<a class="pf-offer-chip" href="${esc(offerHref(locale))}">${esc(offerLabel(locale))}</a>`;
}

export function stageEntryNav(locale) {
  const ui = UI[locale];
  const items = [
    [roleHref(locale, "agentic-ai"), "Agentic AI Consulting"],
    [roleHref(locale, "java-backend"), "Senior Backend Java"],
    [timelineHref(locale), ui.timelineNav],
  ];
  const links = items
    .map(([href, label]) => `<a class="pf-entry-link" href="${esc(href)}">${esc(label)}</a>`)
    .join("");
  const label = locale === "de" ? "Einstiege" : "Entries";
  return `<nav class="pf-entry-row" aria-label="${esc(label)}">${links}</nav>`;
}

function periodLabel(entry, locale) {
  if (entry.periodLabel) return entry.periodLabel;
  const p = entry.period ?? {};
  if (p.from && p.to) return `${p.from} – ${p.to}`;
  if (p.date) {
    if (typeof p.date === "object") return String(p.date[locale] ?? p.date.de ?? "");
    return String(p.date);
  }
  return "";
}

function isInternalSource(source) {
  return /\.mjs|\(main\)|\bportfolio\//.test(String(source ?? ""));
}

function roleEyebrow(locale, entry) {
  if (entry.packages?.length) {
    return locale === "de" ? "Consultant · Pakete" : "Consulting · Packages";
  }
  const line = entry.engagement?.[locale] ?? "";
  const head = line.split(/[,.]/)[0].trim();
  return head || (locale === "de" ? "Rolle" : "Role");
}

function yearOf(entry) {
  const p = entry.period ?? {};
  const raw = p.to || p.from || p.date || "";
  const year = String(raw).slice(0, 4);
  return /^\d{4}$/.test(year) ? year : "";
}

function casePageHref(locale, entry) {
  if (!entry.show?.casePage || !entry.id.startsWith("case-")) return "";
  const slug = entry.id.slice("case-".length);
  if (!caseById(slug)?.hasPage) return "";
  return caseHref(locale, slug);
}

function livePackages(locale) {
  const live = copy(locale).offer.packages;
  const entry = byId("role-agentic-ai-consulting")?.packages ?? [];
  if (live.length !== 3 || entry.length !== 3) {
    throw new Error("expected the three live offer packages");
  }
  live.forEach((pkg, index) => {
    const src = entry[index];
    const same =
      pkg.name === src.name[locale] &&
      pkg.scope === src.scope[locale] &&
      pkg.ideal === src.ideal[locale] &&
      pkg.engagement === src.engagement[locale] &&
      pkg.deliverables.length === src.deliverables[locale].length &&
      pkg.deliverables.every((line, i) => line === src.deliverables[locale][i]);
    if (!same) {
      throw new Error(`offer package ${index} drifted from role-agentic-ai-consulting (${locale})`);
    }
  });
  return live;
}

function siblingFor(kind, id) {
  if (kind === "timeline") return "/lebenslauf/";
  if (kind === "contact") return "/kontakt/";
  if (kind === "dive") return `/lebenslauf/${id}/`;
  if (kind === "role") return `/rollen/${id}/`;
  return "/";
}

function langSwitch(locale, siblingPath) {
  const ui = UI[locale];
  const link = (code) => {
    const current = code === locale ? ' aria-current="true"' : "";
    return `<a href="/portfolio/${code}${siblingPath}" hreflang="${code}"${current}>${code.toUpperCase()}</a>`;
  };
  return `<div class="lang" role="group" aria-label="${esc(ui.lang)}">${link("de")}${link("en")}</div>`;
}

function navLinks(locale, current) {
  const ui = UI[locale];
  const item = (href, label, key) => {
    const here = current === key ? ' aria-current="page"' : "";
    return `<a href="${esc(href)}"${here}>${esc(label)}</a>`;
  };
  return `${item(roleHref(locale, "agentic-ai"), ui.roleShort, "agentic-ai")}
    ${item(roleHref(locale, "java-backend"), ui.javaShort, "java-backend")}
    ${item(timelineHref(locale), ui.timelineNav, "timeline")}
    ${item(contactHref(locale), ui.contactNav, "contact")}`;
}

export function stageTopbar(locale, siblingPath = "/", current) {
  return topbar(locale, siblingPath, { current });
}

function topbar(locale, siblingPath, { current } = {}) {
  const ui = UI[locale];
  const links = navLinks(locale, current);
  return `<header class="topbar">
  <a class="brand" href="/portfolio/${locale}/">${esc(SITE.name)}</a>
  <nav class="top-links top-links-wide" aria-label="${esc(ui.navLabel)}">${links}</nav>
  <details class="nav-fold">
    <summary>${esc(ui.menu)}</summary>
    <nav class="top-links" aria-label="${esc(ui.navLabel)}">${links}</nav>
  </details>
  <div class="top-tools">
    ${langSwitch(locale, siblingPath)}
    ${offerChip(locale)}
  </div>
</header>`;
}

export function stageFooter(locale) {
  const ui = UI[locale];
  return `<footer class="s1-footer"><p><code>timeline.js</code> · <a href="${esc(contactHref(locale))}">${esc(ui.contactNav)}</a></p></footer>`;
}

function pageShell({ locale, title, description, canonicalPath, siblingPath, current, body, boot, extraClass = "", showTopbar = true, showFooter = false }) {
  const ui = UI[locale];
  const url = `${SITE.origin}${canonicalPath}`;
  const bootTag = boot
    ? `<script type="application/json" id="timeline-boot">${JSON.stringify(boot).replace(/</g, "\\u003c")}</script>`
    : "";
  const script = boot ? `<script type="module" src="/portfolio/motion/timeline.js"></script>` : "";
  return `<!DOCTYPE html>
<html lang="${locale}" class="__variable_3f18cd __variable_f3e80d stage1${extraClass ? ` ${extraClass}` : ""}">
<head>
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1"/>
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}"/>
<meta name="author" content="${esc(SITE.name)}"/>
<meta name="robots" content="index, follow"/>
<link rel="canonical" href="${esc(url)}"/>
<link rel="alternate" hreflang="de" href="${SITE.origin}/portfolio/de${siblingPath}"/>
<link rel="alternate" hreflang="en" href="${SITE.origin}/portfolio/en${siblingPath}"/>
<link rel="alternate" hreflang="x-default" href="${SITE.origin}/portfolio/de${siblingPath}"/>
<meta property="og:title" content="${esc(title)}"/>
<meta property="og:description" content="${esc(description)}"/>
<meta property="og:url" content="${esc(url)}"/>
<meta property="og:type" content="website"/>
<meta property="og:locale" content="${locale === "de" ? "de_DE" : "en_US"}"/>
<meta name="theme-color" content="#F4F0E8"/>
<link rel="icon" href="/portfolio/${locale}/icon.png" type="image/png" sizes="32x32"/>
<link rel="stylesheet" href="${NEXT_LAYOUT_CSS}"/>
<link rel="stylesheet" href="${PORTFOLIO_CSS}"/>
<link rel="stylesheet" href="${STAGE_CSS}"/>
</head>
<body class="stage1-body">
${boot ? `<script>document.documentElement.classList.add("js")</script>` : ""}
${showTopbar ? `<a class="skip" href="#main">${esc(ui.skip)}</a>` : ""}
${showTopbar ? topbar(locale, siblingPath, { current }) : ""}
${body}
${showFooter ? stageFooter(locale) : ""}
${bootTag}
${script}
</body>
</html>`;
}

function listBlock(locale, items, title) {
  if (!items?.length) return "";
  const lis = items.map((line) => `<li>${mark(line)}</li>`).join("");
  return `<section class="block"><h2>${esc(title)}</h2><ul>${lis}</ul></section>`;
}

function resultBlock(locale, entry) {
  const result = entry?.result;
  if (!result?.[locale]) return "";
  const ui = UI[locale];
  let source = "";
  if (entry.id === "role-java-backend") {
    source = `<span class="src">${esc(ui.source)}: <a href="${esc(timelineHref(locale))}">${esc(ui.stations)}</a></span>`;
  } else if (result.source && !isInternalSource(result.source)) {
    source = `<span class="src">${esc(ui.source)}: ${esc(result.source)}</span>`;
  }
  return `<div class="result">${mark(result[locale])}${source}</div>`;
}

function relatedBlock(locale, entry) {
  const ui = UI[locale];
  const rel = entry.relations ?? {};
  const links = [];
  for (const id of rel.cases ?? []) {
    const item = byId(id);
    const href = item ? casePageHref(locale, item) : "";
    if (item && href) links.push(`<li><a href="${esc(href)}">${mark(item.title[locale])}</a></li>`);
  }
  for (const id of rel.cv ?? []) {
    const item = byId(id);
    if (item?.show?.timeline) links.push(`<li><a href="${esc(diveHref(locale, id))}">${mark(item.title[locale])}</a></li>`);
  }
  for (const id of rel.roles ?? []) {
    const slug = ROLE_SLUG[id];
    const item = byId(id);
    if (item && slug) links.push(`<li><a href="${esc(roleHref(locale, slug))}">${mark(item.title[locale])}</a></li>`);
  }
  if (!links.length) return "";
  return `<section class="block"><h2>${esc(ui.related)}</h2><ul class="related">${links.join("")}</ul></section>`;
}

function packagesBlock(locale) {
  const offer = copy(locale).offer;
  const packages = livePackages(locale)
    .map((pkg, index) => {
      const items = pkg.deliverables.map((line) => `<li>${mark(line)}</li>`).join("");
      return `<article class="package">
  <p class="pkg-index">${String(index + 1).padStart(2, "0")}</p>
  <div>
    <h3>${mark(pkg.name)}</h3>
    <p>${mark(pkg.scope)}</p>
    <dl>
      <div><dt>${esc(offer.deliverables)}</dt><dd><ul>${items}</ul></dd></div>
      <div><dt>${esc(offer.ideal)}</dt><dd>${mark(pkg.ideal)}</dd></div>
      <div><dt>${esc(offer.engagement)}</dt><dd>${mark(pkg.engagement)}</dd></div>
    </dl>
  </div>
</article>`;
    })
    .join("");
  return `<section id="angebot" class="packages" tabindex="-1">
  <p class="kicker">${esc(offer.eyebrow)}</p>
  <h2>${mark(offer.title)}</h2>
  <p class="lede">${mark(offer.intro)}</p>
  ${packages}
</section>`;
}

export function renderRolePage(locale, slug) {
  const ui = UI[locale];
  const id = Object.entries(ROLE_SLUG).find(([, value]) => value === slug)?.[0];
  const entry = byId(id);
  if (!entry) throw new Error(`Unknown role slug: ${slug}`);
  const offer = copy(locale).offer;
  const javaEngagement = slug === "java-backend"
    ? `<section id="einsatz" class="block" tabindex="-1">
  <h2>${esc(ui.engagementTitle)}</h2>
  <p>${mark(entry.engagement[locale])}</p>
  ${listBlock(locale, entry.fits?.[locale], ui.fits)}
  <p class="contact-line"><a class="btn" href="${esc(contactHref(locale))}">${esc(ui.contactCta)}</a></p>
</section>`
    : "";
  const bodyInner = `
<main id="main" class="sheet">
  <p class="kicker">${esc(roleEyebrow(locale, entry))}</p>
  <h1>${mark(entry.title[locale])}</h1>
  <p class="lede">${mark(entry.summary[locale])}</p>
  ${slug === "agentic-ai" && entry.engagement ? `<p class="engagement">${mark(entry.engagement[locale])}</p>` : ""}
  ${slug === "agentic-ai" ? listBlock(locale, entry.fits?.[locale], ui.fits) : ""}
  ${javaEngagement}
  ${listBlock(locale, entry.notFits?.[locale], ui.notFits)}
  ${listBlock(locale, entry.deliverables?.[locale], offer.deliverables)}
  ${slug === "agentic-ai" ? packagesBlock(locale) : ""}
  ${resultBlock(locale, entry)}
  ${slug === "agentic-ai" ? `<p class="contact-line"><a href="mailto:${esc(SITE.email)}">${esc(SITE.email)}</a></p>` : ""}
  ${relatedBlock(locale, entry)}
</main>`;
  const description = entry.summary[locale];
  return pageShell({
    locale,
    title: `${entry.title[locale]} — ${SITE.name}`,
    description,
    canonicalPath: roleHref(locale, slug),
    siblingPath: siblingFor("role", slug),
    current: slug,
    body: bodyInner,
  });
}

function entryCard(locale, entry, { current = false } = {}) {
  const ui = UI[locale];
  const year = yearOf(entry);
  const flag = entry.placeholder ? `<span class="placeholder-flag">${esc(ui.placeholder)}</span>` : "";
  const company = entry.company ? `<p class="company">${mark(entry.company)}</p>` : "";
  const here = current ? ' aria-current="true"' : "";
  return `<a class="entry-card" id="${esc(entry.id)}" href="${esc(diveHref(locale, entry.id))}" data-id="${esc(entry.id)}" data-year="${esc(year)}"${here}>
  <p class="meta"><span>${esc(ui.type[entry.type] ?? entry.type)}</span><span class="honesty-${esc(entry.honesty)}">${esc(ui.honesty[entry.honesty] ?? entry.honesty)}</span><span>${mark(periodLabel(entry, locale))}</span>${flag}</p>
  <p class="title">${mark(entry.title[locale])}</p>
  ${company}
</a>`;
}

function previewInner(locale, entry) {
  const ui = UI[locale];
  const stack = (entry.stack ?? []).map((item) => `<li>${mark(item)}</li>`).join("");
  const media = entry.media?.preview
    ? `<img class="preview-media" src="${esc(entry.media.preview)}" alt="${esc(entry.media.alt?.[locale] ?? "")}" loading="lazy" decoding="async"/>`
    : "";
  return `<p class="kicker">${esc(ui.type[entry.type] ?? entry.type)} · ${esc(ui.honesty[entry.honesty] ?? entry.honesty)} · ${mark(periodLabel(entry, locale))}</p>
<h2>${mark(entry.title[locale])}</h2>
${media}
<p class="body">${mark(entry.summary[locale])}</p>
${stack ? `<ul class="stack">${stack}</ul>` : ""}
${resultBlock(locale, entry)}
<a class="btn" href="${esc(diveHref(locale, entry.id))}" data-open-dive="${esc(entry.id)}">${esc(ui.openDive)}</a>`;
}

function publicEntry(locale, entry) {
  return {
    id: entry.id,
    type: entry.type,
    honesty: entry.honesty,
    placeholder: Boolean(entry.placeholder),
    title: entry.title[locale],
    summary: entry.summary[locale],
    periodLabel: periodLabel(entry, locale),
    year: yearOf(entry),
    company: entry.company ?? "",
    stack: entry.stack ?? [],
    tasks: entry.tasks?.[locale]?.filter(Boolean) ?? [],
    result: entry.result
      ? {
          text: entry.result[locale],
          source: entry.result.source && !isInternalSource(entry.result.source) ? entry.result.source : "",
        }
      : null,
    media: entry.media?.preview
      ? { src: entry.media.preview, alt: entry.media.alt?.[locale] ?? "" }
      : null,
    chapters: entry.chapters
      ? Object.fromEntries(CHAPTER_KEYS.filter((key) => entry.chapters[key]).map((key) => [key, entry.chapters[key][locale]]))
      : null,
    caseHref: casePageHref(locale, entry),
    diveHref: diveHref(locale, entry.id),
    links: (entry.links ?? [])
      .filter((link) => link.href && link.href !== "#angebot" && /^https?:\/\//.test(link.href))
      .map((link) => ({ href: link.href, kind: link.kind || "link" })),
  };
}

function bootPayload(locale, mode, entry) {
  const ui = UI[locale];
  const base = {
    mode,
    locale,
    base: timelineHref(locale),
    offerHref: offerHref(locale),
    offerLabel: offerLabel(locale),
    closeLabel: ui.close,
    openLabel: ui.openDive,
    caseLabel: ui.casePage,
    sourceLabel: ui.source,
    placeholderLabel: ui.placeholder,
    tasksLabel: ui.tasks,
    yearRailLabel: ui.yearRail,
    chooseYear: ui.chooseYear,
    chapterLabels: ui.chapters,
    honesty: ui.honesty,
    types: ui.type,
    linkKind: ui.linkKind,
    homeLabel: SITE.name,
    homeHref: `/portfolio/${locale}/`,
    langLabel: ui.lang,
  };
  if (mode === "dive") {
    return { ...base, id: entry.id, returnHref: `${timelineHref(locale)}#${entry.id}` };
  }
  return { ...base, entries: timelineEntries().map((item) => publicEntry(locale, item)) };
}

export function renderTimelinePage(locale) {
  const ui = UI[locale];
  const items = timelineEntries();
  const first = items[0];
  const cards = items.map((entry, index) => entryCard(locale, entry, { current: index === 0 })).join("");
  const hasPlaceholder = items.some((entry) => entry.placeholder);
  const body = `<div id="timeline-app">
  <div class="mobile-scrub" id="mobile-scrub"></div>
  <div class="layout">
    <main id="main" class="list-pane">
      <h1>${esc(ui.timelineTitle)}</h1>
      <p class="lede">${esc(ui.timelineLede)}</p>
      ${hasPlaceholder ? `<p class="placeholder-note">${esc(ui.placeholderNote)}</p>` : ""}
      <div id="entry-list">${cards}</div>
    </main>
    <aside class="preview-pane" id="preview" aria-live="polite">${first ? previewInner(locale, first) : ""}</aside>
    <div class="year-rail" id="year-rail"></div>
  </div>
</div>
<div class="deep-dive" id="deep-dive" hidden></div>`;
  return pageShell({
    locale,
    title: `${ui.timelineTitle} — ${SITE.name}`,
    description: ui.timelineLede,
    canonicalPath: timelineHref(locale),
    siblingPath: siblingFor("timeline"),
    current: "timeline",
    body,
    boot: bootPayload(locale, "timeline"),
    showFooter: true,
  });
}

function chapterBlocks(locale, entry) {
  if (!entry.chapters) return "";
  const ui = UI[locale];
  return CHAPTER_KEYS.filter((key) => entry.chapters[key])
    .map(
      (key) => `<section class="chapter"><h2>${esc(ui.chapters[key] ?? key)}</h2><p>${mark(entry.chapters[key][locale])}</p></section>`,
    )
    .join("");
}

function linkRow(locale, entry) {
  const ui = UI[locale];
  const links = [];
  const page = casePageHref(locale, entry);
  if (page) links.push(`<a href="${esc(page)}">${esc(ui.casePage)}</a>`);
  for (const link of entry.links ?? []) {
    if (!link.href || !/^https?:\/\//.test(link.href)) continue;
    const label = ui.linkKind[link.kind] ?? link.kind ?? link.href;
    links.push(`<a href="${esc(link.href)}" target="_blank" rel="noopener noreferrer">${esc(label)}</a>`);
  }
  if (!links.length) return "";
  return `<p class="link-row">${links.join("")}</p>`;
}

export function renderDeepDivePage(locale, id) {
  const ui = UI[locale];
  const entry = byId(id);
  if (!entry?.show?.timeline) throw new Error(`No deep dive for ${id}`);
  const stack = (entry.stack ?? []).map((item) => `<li>${mark(item)}</li>`).join("");
  const tasks = (entry.tasks?.[locale] ?? []).filter(Boolean);
  const taskBlock = tasks.length
    ? `<section class="chapter"><h2>${esc(ui.tasks)}</h2><ul>${tasks.map((line) => `<li>${mark(line)}</li>`).join("")}</ul></section>`
    : "";
  const media = entry.media?.preview
    ? `<img class="preview-media" src="${esc(entry.media.preview)}" alt="${esc(entry.media.alt?.[locale] ?? "")}" loading="lazy" decoding="async"/>`
    : "";
  const flag = entry.placeholder ? `<p class="placeholder-flag">${esc(ui.placeholder)}</p>` : "";
  const company = entry.company ? ` · ${mark(entry.company)}` : "";
  const body = `<div id="deep-dive" class="deep-dive is-static" role="dialog" aria-modal="true" aria-labelledby="dd-title" open>
  <a class="skip" href="#dd-title">${esc(ui.skip)}</a>
  <div class="dd-bar">
    <a class="brand" href="/portfolio/${locale}/">${esc(SITE.name)}</a>
    ${langSwitch(locale, siblingFor("dive", id))}
    ${offerChip(locale)}
    <a class="btn ghost" id="dd-close" data-close href="${esc(timelineHref(locale))}#${esc(id)}">${esc(ui.close)}</a>
  </div>
  <article id="main" class="dd-body">
    <p class="meta">${esc(ui.type[entry.type] ?? entry.type)} · ${esc(ui.honesty[entry.honesty] ?? entry.honesty)} · ${mark(periodLabel(entry, locale))}${company}</p>
    ${flag}
    <h1 id="dd-title">${mark(entry.title[locale])}</h1>
    ${media}
    <p class="lede">${mark(entry.summary[locale])}</p>
    ${stack ? `<ul class="stack">${stack}</ul>` : ""}
    ${resultBlock(locale, entry)}
    ${taskBlock}
    ${chapterBlocks(locale, entry)}
    ${linkRow(locale, entry)}
    <p class="back-row"><a href="${esc(timelineHref(locale))}#${esc(id)}">${esc(ui.backTimeline)}</a></p>
    ${stageFooter(locale)}
  </article>
</div>`;
  return pageShell({
    locale,
    title: `${entry.title[locale]} — ${ui.timelineTitle} — ${SITE.name}`,
    description: entry.summary[locale],
    canonicalPath: diveHref(locale, id),
    siblingPath: siblingFor("dive", id),
    current: "timeline",
    body,
    boot: bootPayload(locale, "dive", entry),
    extraClass: "stage1-dive",
    showTopbar: false,
  });
}

export function renderContactPage(locale) {
  const ui = UI[locale];
  const body = `<main id="main" class="sheet sheet-narrow">
  <p class="kicker">${esc(ui.contactNav)}</p>
  <h1>${esc(ui.contactTitle)}</h1>
  <p class="lede">${esc(ui.contactLede)}</p>
  <ul class="contact-list">
    <li><span>${esc(ui.email)}</span><a href="mailto:${esc(SITE.email)}">${esc(SITE.email)}</a></li>
    <li><span>LinkedIn</span><a href="${esc(SITE.linkedin)}" target="_blank" rel="noopener noreferrer">${esc(SITE.linkedin)}</a></li>
    <li><span>GitHub</span><a href="${esc(SITE.github)}" target="_blank" rel="noopener noreferrer">${esc(SITE.github)}</a></li>
  </ul>
</main>`;
  return pageShell({
    locale,
    title: `${ui.contactTitle} — ${SITE.name}`,
    description: ui.contactLede,
    canonicalPath: contactHref(locale),
    siblingPath: siblingFor("contact"),
    current: "contact",
    body,
  });
}

export function sitemapEntries() {
  const roles = ["agentic-ai", "java-backend"];
  const pages = [
    ...roles.map((slug) => ({
      de: `${SITE.origin}${roleHref("de", slug)}`,
      en: `${SITE.origin}${roleHref("en", slug)}`,
      priority: "0.7",
    })),
    {
      de: `${SITE.origin}${timelineHref("de")}`,
      en: `${SITE.origin}${timelineHref("en")}`,
      priority: "0.7",
    },
    {
      de: `${SITE.origin}${contactHref("de")}`,
      en: `${SITE.origin}${contactHref("en")}`,
      priority: "0.5",
    },
    ...timelineEntries().map((entry) => ({
      de: `${SITE.origin}${diveHref("de", entry.id)}`,
      en: `${SITE.origin}${diveHref("en", entry.id)}`,
      priority: "0.4",
    })),
  ];
  return pages;
}
