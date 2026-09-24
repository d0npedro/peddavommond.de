/**
 * Content-Loader: lädt alle Entry-Module und validiert sie.
 * Stage 2 (Tiles/Case-Pages) und Stage 3 (3D-Room) lesen dieselben Entries
 * über show.* und relations — ohne Restrukturierung.
 */
import { validateAll } from "./schema.mjs";

import roleAgenticAiConsulting from "./entries/role-agentic-ai-consulting.mjs";
import roleJavaBackend from "./entries/role-java-backend.mjs";
import cvDirectServicesDeutschlandcard from "./entries/cv-direct-services-deutschlandcard.mjs";
import cvAleri from "./entries/cv-aleri.mjs";
import cvNextgenItzbundPush from "./entries/cv-nextgen-itzbund-push.mjs";
import cvNextgenBwiLzs from "./entries/cv-nextgen-bwi-lzs.mjs";
import cvNextgenMaerzIhe from "./entries/cv-nextgen-maerz-ihe.mjs";
import cvAdessoDzBankOkvp from "./entries/cv-adesso-dz-bank-okvp.mjs";
import cvAdessoAmp from "./entries/cv-adesso-amp.mjs";
import cvAdessoBitmarckBitgo from "./entries/cv-adesso-bitmarck-bitgo.mjs";
import cvBinarisCrm from "./entries/cv-binaris-crm.mjs";
import cvBinarisDomea from "./entries/cv-binaris-domea.mjs";
import cvBinarisEgo from "./entries/cv-binaris-ego.mjs";
import cvEllaVerlag from "./entries/cv-ella-verlag.mjs";
import caseGraphMastermind from "./entries/case-graph-mastermind.mjs";
import caseAgentCollective from "./entries/case-agent-collective.mjs";
import caseDeutschlandcard from "./entries/case-deutschlandcard.mjs";
import caseDzBankOkvp from "./entries/case-dz-bank-okvp.mjs";
import caseBitmarckBitgo from "./entries/case-bitmarck-bitgo.mjs";
import caseMaerzIheBox from "./entries/case-maerz-ihe-box.mjs";
import caseBwiLzs from "./entries/case-bwi-lzs.mjs";
import caseEgoWorkshop from "./entries/case-ego-workshop.mjs";
import caseEllaPortals from "./entries/case-ella-portals.mjs";
import experimentCmsBeforeAfter from "./entries/experiment-cms-before-after.mjs";
import experimentBackendChangeLoop from "./entries/experiment-backend-change-loop.mjs";
import experimentAgentContractHarness from "./entries/experiment-agent-contract-harness.mjs";

/** @type {import('./schema.mjs').Entry[]} */
export const entries = [
  roleAgenticAiConsulting,
  roleJavaBackend,
  cvDirectServicesDeutschlandcard,
  cvAleri,
  cvNextgenItzbundPush,
  cvNextgenBwiLzs,
  cvNextgenMaerzIhe,
  cvAdessoDzBankOkvp,
  cvAdessoAmp,
  cvAdessoBitmarckBitgo,
  cvBinarisCrm,
  cvBinarisDomea,
  cvBinarisEgo,
  cvEllaVerlag,
  caseGraphMastermind,
  caseAgentCollective,
  caseDeutschlandcard,
  caseDzBankOkvp,
  caseBitmarckBitgo,
  caseMaerzIheBox,
  caseBwiLzs,
  caseEgoWorkshop,
  caseEllaPortals,
  experimentCmsBeforeAfter,
  experimentBackendChangeLoop,
  experimentAgentContractHarness
];

export const SITE = {
  "name": "Peter Henrichs",
  "email": "peter.henrichs@web.de",
  "linkedin": "https://www.linkedin.com/in/peter-henrichs/",
  "github": "https://github.com/d0npedro",
  "origin": "https://peddavommond.de",
  "city": "Köln",
  "heroH1": {
    "de": "Ich baue Agenten-Schichten in laufende Enterprise-Systeme — prüfbar, mit Human-in-the-Loop.",
    "en": "I build agent layers into running enterprise systems — reviewable, with human-in-the-loop."
  }
};

export function byId(id) {
  return entries.find((e) => e.id === id) ?? null;
}

export function byType(type) {
  return entries.filter((e) => e.type === type);
}

export function forShow(flag) {
  return entries.filter((e) => e.show?.[flag]);
}

export function timelineEntries() {
  return forShow("timeline").slice().sort((a, b) => {
    const ay = yearKey(a);
    const by = yearKey(b);
    if (ay !== by) return by - ay;
    return (a.order ?? 0) - (b.order ?? 0);
  });
}

function yearKey(e) {
  const p = e.period ?? {};
  if (p.to) return Number(String(p.to).slice(0, 4)) || 0;
  if (p.from) return Number(String(p.from).slice(0, 4)) || 0;
  if (p.date) {
    const raw = typeof p.date === "string" ? p.date : p.date.de || p.date.en || "";
    const n = Number(String(raw).replace(/\D/g, "").slice(0, 4));
    return Number.isFinite(n) ? n : 0;
  }
  return 0;
}

export function validate() {
  return validateAll(entries);
}

export default { entries, SITE, byId, byType, forShow, timelineEntries, validate };
