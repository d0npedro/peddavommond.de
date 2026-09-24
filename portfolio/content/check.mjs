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
  "experiment-cms-before-after": ["[CMS]", "[Jahr]", "[Dauer]", "[Ergebnis]", "[Stack]", "[Duration]"],
  "experiment-backend-change-loop": ["[Jahr]", "[Dauer]", "[Arbeitgeber]", "[Messmethode]", "[Stack]", "[Duration]", "[Employer]"],
  "experiment-agent-contract-harness": ["[Jahr]", "[Metrik]", "[Messbasis]", "[Ergebnis]", "[Eval-Harness]", "[Metric]", "[Result]"],
};

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

  for (const [id, tokens] of Object.entries(PLACEHOLDERS)) {
    const raw = JSON.stringify(byId(id));
    for (const token of tokens) {
      if (!raw.includes(token)) errors.push(`${id} lost placeholder ${token}`);
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
