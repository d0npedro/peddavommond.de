/**
 * Build/CI gate for portfolio/content.
 * A bad entry, a filled-in placeholder, or a drifted identity fails the process.
 */
import { SITE as SHARED } from "../shared.mjs";
import { de } from "../i18n-de.mjs";
import { en } from "../i18n-en.mjs";
import { validateEntry } from "./schema.mjs";
import { SITE, byId, byType, entries, timelineEntries, validate } from "./index.mjs";

const LOCKED_H1 = {
  de: "Ich baue Agenten-Schichten in laufende Enterprise-Systeme — prüfbar, mit Human-in-the-Loop.",
  en: "I build agent layers into running enterprise systems — reviewable, with human-in-the-loop.",
};

const PLACEHOLDERS = {
  de: {
    "experiment-cms-before-after": ["[CMS]", "[Jahr]", "[Dauer]", "[Ergebnis]", "[Stack]"],
    "experiment-backend-change-loop": ["[Jahr]", "[Dauer]", "[Arbeitgeber]", "[Messmethode]", "[Stack]"],
    "experiment-agent-contract-harness": ["[Jahr]", "[Metrik]", "[Messbasis]", "[Ergebnis]", "[Eval-Harness]"],
  },
  en: {
    "experiment-cms-before-after": ["[CMS]", "[Year]", "[Duration]", "[Result]", "[Stack]"],
    "experiment-backend-change-loop": ["[Year]", "[Duration]", "[Employer]", "[Measurement method]", "[Stack]"],
    "experiment-agent-contract-harness": ["[Year]", "[Metric]", "[Measurement basis]", "[Result]", "[Eval-Harness]"],
  },
};

const GERMAN_ONLY_TOKENS = ["[Jahr]", "[Dauer]", "[Ergebnis]", "[Metrik]", "[Arbeitgeber]", "[Messmethode]", "[Messbasis]"];

function localeText(value, locale, out) {
  if (typeof value === "string") {
    out.push(value);
    return;
  }
  if (Array.isArray(value)) {
    for (const item of value) localeText(item, locale, out);
    return;
  }
  if (!value || typeof value !== "object") return;
  if (typeof value.de === "string" || typeof value.en === "string") {
    if (typeof value[locale] === "string") out.push(value[locale]);
    for (const [key, child] of Object.entries(value)) {
      if (key === "de" || key === "en") continue;
      localeText(child, locale, out);
    }
    return;
  }
  for (const child of Object.values(value)) localeText(child, locale, out);
}

export function assertPortfolioContent() {
  const errors = [];
  const result = validate();
  if (!result.ok) errors.push(...result.errors);

  if (entries.length !== 26) errors.push(`expected 26 entries, got ${entries.length}`);
  if (byType("role").length !== 2) errors.push("expected 2 roles");
  if (byType("cv").length !== 12) errors.push("expected 12 cv entries");
  if (byType("case").length !== 9) errors.push("expected 9 cases");
  if (byType("experiment").length !== 3) errors.push("expected 3 experiments");
  if (timelineEntries().length !== 24) errors.push("expected 24 timeline entries");

  if (SITE.name !== "Peter Henrichs" || SHARED.name !== "Peter Henrichs") {
    errors.push("name lock drifted");
  }
  if (SITE.email !== "peter.henrichs@web.de" || SHARED.email !== "peter.henrichs@web.de") {
    errors.push("email lock drifted");
  }
  if (SITE.linkedin !== SHARED.linkedin || SITE.github !== SHARED.github) {
    errors.push("contact links drifted from portfolio/shared.mjs");
  }
  if (SITE.heroH1.de !== LOCKED_H1.de || SITE.heroH1.en !== LOCKED_H1.en) {
    errors.push("content hero H1 drifted");
  }
  if (de.hero.h1 !== LOCKED_H1.de || en.hero.h1 !== LOCKED_H1.en) {
    errors.push("i18n hero H1 drifted");
  }

  const collective = byId("case-agent-collective");
  const blob = JSON.stringify(collective);
  if (!/ohne LLM/.test(collective.summary.de) || !/without an LLM/i.test(collective.summary.en)) {
    errors.push("Agent Collective must stay described as having no LLM");
  }
  if (/LLM-driven|powered by an LLM|GPT-|OpenAI API/i.test(blob)) {
    errors.push("Agent Collective must not be described as LLM-driven");
  }

  for (const locale of ["de", "en"]) {
    for (const [id, tokens] of Object.entries(PLACEHOLDERS[locale])) {
      const parts = [];
      localeText(byId(id), locale, parts);
      const blob = parts.join("\n");
      for (const token of tokens) {
        if (!blob.includes(token)) errors.push(`${id} ${locale} lost placeholder ${token}`);
      }
      if (locale === "en") {
        for (const token of GERMAN_ONLY_TOKENS) {
          if (blob.includes(token)) errors.push(`${id} EN still has German placeholder ${token}`);
        }
      }
    }
  }

  const bad = validateEntry({
    id: "synthetic-bad",
    type: "experiment",
    honesty: "independent-rnd",
    title: { de: "x", en: "x" },
    summary: { de: "y", en: "y" },
    show: { timeline: true },
    result: { de: "Dauer 12 Tage", en: "Duration 12 days" },
  });
  if (bad.ok) errors.push("validator accepted a digit result without result.source");

  if (errors.length) {
    throw new Error(errors.join("\n"));
  }
  return { entries: entries.length, timeline: timelineEntries().length };
}
