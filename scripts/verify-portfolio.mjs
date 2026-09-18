import { readFile, access } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { pagedCases, caseHref, SITE, FLAGSHIP_IDS } from "../portfolio/shared.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const failures = [];
const CASE_IDS = pagedCases().map((c) => c.id);

function assert(cond, message) {
  if (!cond) failures.push(message);
}

async function check(locale) {
  const html = await readFile(join(root, "public/portfolio", locale, "index.html"), "utf8");
  const prefix = `[${locale}]`;

  assert(
    html.includes("Senior AI Consultant · Agentic AI · Enterprise Systems") ||
      html.includes("Senior AI Consultant · Agentic AI · Enterprise Systems"),
    `${prefix} missing Variant A role title`,
  );
  assert(html.includes("Peter Henrichs | Senior AI Consultant"), `${prefix} missing SEO title with pipe`);
  assert(!html.includes("Senior Software Engineer &amp; KI-Manager"), `${prefix} still has old title`);
  assert(!html.includes("Senior AI Consultant &amp; Agentic Software Engineer"), `${prefix} still has iteration-3 compound title`);
  assert(!html.includes("offen für Senior-Backend") && !html.includes("Available for senior backend"), `${prefix} still has split availability line`);
  assert(!html.includes("roleWords") && !html.includes("Backend-Spezialist"), `${prefix} still rotates old role words`);
  assert(html.includes("10+"), `${prefix} hero metric 10+ missing from SSR`);
  assert(!html.includes(">0<!-- -->+") && !html.includes(">0+</"), `${prefix} still has 0+ SSR metrics`);
  assert(/Köln|Cologne/.test(html) && /Remote/.test(html), `${prefix} missing Köln/Cologne and Remote in hero`);
  assert(html.includes("AI Agents"), `${prefix} missing AI Agents in proof strip`);
  assert(html.includes("Java"), `${prefix} missing Java in proof strip`);
  assert(html.includes("graph-mastermind.vercel.app"), `${prefix} missing Graph-Mastermind demo`);
  assert(html.includes("github.com/d0npedro/graph-mastermind"), `${prefix} missing Graph-Mastermind repo`);
  assert(html.includes("github.com/d0npedro/multi-agent"), `${prefix} missing Agent Collective repo`);
  assert(html.includes("multi-agent-six-murex.vercel.app") || html.includes("/multi-agent/"), `${prefix} missing Agent Collective demo`);
  assert(html.includes("peter.henrichs@web.de"), `${prefix} missing email`);
  assert(!html.includes("ph@d0npedro.com"), `${prefix} still has old hiring email`);
  assert(!/Hennrichs/.test(html), `${prefix} misspelled personal name`);
  const emails = html.match(/[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/g) ?? [];
  for (const email of emails) {
    assert(email === "peter.henrichs@web.de", `${prefix} unexpected email ${email}`);
  }
  assert(html.includes("linkedin.com/in/peter-henrichs"), `${prefix} missing LinkedIn`);
  assert(html.includes("github.com/d0npedro"), `${prefix} missing GitHub`);
  assert(html.includes("/portfolio/cv/"), `${prefix} missing CV path`);
  assert(!html.includes("keine Lücken") && !html.includes("no gaps, no invented"), `${prefix} still has defensive copy`);
  assert(!html.includes("Sieben Einsätze, sieben regulierten") && !html.includes("Seven engagements, seven regulated"), `${prefix} still has misleading seven-domains line`);
  assert(!html.includes("Schwenk in die KI-Führung") && !html.includes("pivot into AI leadership"), `${prefix} still overclaims AI leadership pivot`);
  assert(!/n8n/i.test(html), `${prefix} should not use n8n as identity`);
  assert(!/book a slot|freie Slots|free slots|Retainer-Platz/i.test(html) || /kein Freelancer|No freelancer/.test(html), `${prefix} freelancer/slot pitch leaked`);
  assert(html.includes("Independent R&amp;D") || html.includes("Independent R&D"), `${prefix} missing Independent R&D credibility label`);
  assert(!html.includes("Independent Lab"), `${prefix} still uses hobby-adjacent Independent Lab label`);
  assert(
    html.includes("How I build AI systems") || html.includes("Wie ich AI-Systeme baue"),
    `${prefix} missing How I build AI systems`,
  );
  assert(html.includes("Human-in-the-Loop"), `${prefix} missing HITL`);
  assert(
    html.includes("Strategy") && html.includes("Architecture") && html.includes("Agentic Engineering") && html.includes("Governance"),
    `${prefix} missing capability groups`,
  );
  assert(html.includes("Banking") && html.includes("Healthcare") && html.includes("Loyalty"), `${prefix} missing compact enterprise domains`);
  assert(
    html.includes('id="cases"') &&
      html.includes('id="impact"') &&
      html.includes('id="work"') &&
      html.includes('id="approach"') &&
      html.includes('id="credentials"') &&
      html.includes('id="about"'),
    `${prefix} missing IA section ids`,
  );
  assert(html.indexOf('id="impact"') < html.indexOf('id="cases"'), `${prefix} impact should appear before cases`);
  assert(html.indexOf('id="cases"') < html.indexOf('id="work"'), `${prefix} cases should appear before experience`);
  assert(html.indexOf('id="work"') < html.indexOf('id="approach"'), `${prefix} track record should appear before how I build`);
  assert(html.indexOf('id="approach"') < html.indexOf('id="credentials"'), `${prefix} how I build should appear before credentials`);
  assert(html.indexOf("Graph-Mastermind") < html.indexOf("DeutschlandCard"), `${prefix} Graph-Mastermind should lead flagships`);
  assert(html.indexOf("Graph-Mastermind") < html.indexOf('id="work"'), `${prefix} Graph-Mastermind should appear before experience`);
  const workSlice = html.slice(html.indexOf('id="work"'), html.indexOf('id="approach"'));
  assert(!workSlice.includes("Weiterbildung AI-Automation") && !workSlice.includes("Weiterbildung zum KI-Manager"), `${prefix} Weiterbildung still listed as Berufserfahrung`);
  assert(html.includes("Agentic AI"), `${prefix} missing Agentic AI in content/schema`);
  assert(html.includes("LLM-assisted") || html.includes("LLM-gestützte"), `${prefix} missing LLM-assisted engineering term`);
  assert(!html.includes("MCP") || /MCP claims|MCP-Claims|ohne Modell/.test(html), `${prefix} should not claim MCP as a skill`);
  assert(!html.includes("PeddaVomMond") && !html.includes("Hans Feger"), `${prefix} unexpected entertainment branding`);
  for (const id of FLAGSHIP_IDS) {
    assert(html.includes(caseHref(locale, id)), `${prefix} homepage missing lead-case deep-link to ${id}`);
  }
  for (const id of CASE_IDS) {
    assert(html.includes(caseHref(locale, id)), `${prefix} homepage missing deep-link to ${id}`);
  }
}

async function checkCv() {
  const html = await readFile(join(root, "public/portfolio/cv/index.html"), "utf8");
  assert(html.includes("Senior AI Consultant"), "CV missing role");
  assert(html.includes("peter.henrichs@web.de"), "CV missing email");
  assert(!html.includes("ph@d0npedro.com"), "CV still has old hiring email");
  assert(html.includes("Graph-Mastermind"), "CV missing Graph-Mastermind");
}

const [de, en] = await Promise.all([
  readFile(join(root, "public/portfolio/de/index.html"), "utf8"),
  readFile(join(root, "public/portfolio/en/index.html"), "utf8"),
]);
assert(de.includes("AI Cases ansehen"), "DE primary CTA missing");
assert(en.includes("View AI cases"), "EN primary CTA missing");
assert(de.includes("Profil / CV öffnen"), "DE secondary CTA should open profile/CV");
assert(en.includes("Open profile / CV"), "EN secondary CTA should open profile/CV");
assert(de.includes("Ich bringe AI Agents in reale Unternehmenssysteme."), "DE H1 missing");
assert(en.includes("I bring AI agents into real enterprise systems."), "EN H1 missing");
assert(de.includes("Über AI &amp; Agents sprechen") || de.includes("Über AI & Agents sprechen"), "DE talk CTA missing");
  assert(!de.includes("Hennrichs") && !en.includes("Hennrichs"), "audit misspelling leaked");
  assert(JSON.stringify(FLAGSHIP_IDS) === JSON.stringify(["graph-mastermind", "agent-collective", "deutschlandcard"]), "lead cases must map to existing real projects");
  assert(!de.includes("enterprise-integration") && !en.includes("enterprise-integration"), "fabricated enterprise-integration product still on landing");

async function exists(path) {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
}

async function checkCase(locale, id) {
  const rel = join("public/portfolio", locale, "cases", id, "index.html");
  const path = join(root, rel);
  assert(await exists(path), `missing case page ${rel}`);
  const html = await readFile(path, "utf8");
  const prefix = `[${locale}/${id}]`;
  assert(html.includes("peter.henrichs@web.de"), `${prefix} missing email`);
  assert(!html.includes("ph@d0npedro.com"), `${prefix} still has old hiring email`);
  assert(html.includes("Senior AI Consultant"), `${prefix} missing positioning`);
  const hasProblem = html.includes(">Problem<") || html.includes("Problem");
  const hasDecision = html.includes("Entscheidung") || html.includes("Decision");
  const hasOutcome = html.includes("Wirkung") || html.includes("Outcome");
  assert(hasProblem && hasDecision && hasOutcome, `${prefix} missing Problem/Decision/Outcome schema`);
  assert(html.includes("Rolle") || html.includes("Role"), `${prefix} missing role section`);
  assert(html.includes("Architektur") || html.includes("Architecture"), `${prefix} missing architecture section`);
  assert(html.includes("Evaluation") || html.includes("Guardrails"), `${prefix} missing evaluation / guardrails`);
  assert(html.includes("Mein Anteil") || html.includes("My contribution"), `${prefix} missing contribution`);
  assert(/Independent R&amp;D|Independent R&D|Produktion|Production/.test(html), `${prefix} missing ownership status`);
  assert(/Solo|Team/.test(html), `${prefix} missing team metadata`);
  if (id === "graph-mastermind") {
    assert(html.includes("github.com/d0npedro/graph-mastermind"), `${prefix} missing repo`);
    assert(html.includes("graph-mastermind.vercel.app"), `${prefix} missing demo`);
    assert(html.includes("raw.githubusercontent.com/d0npedro/graph-mastermind"), `${prefix} missing public screenshot`);
    assert(html.includes("AGENT.md"), `${prefix} missing agent contract`);
    assert(/Evaluation in progress/.test(html), `${prefix} should mark quantitative eval as in progress`);
  }
  if (id === "agent-collective") {
    assert(html.includes("github.com/d0npedro/multi-agent"), `${prefix} missing repo`);
    assert(html.includes("multi-agent-six-murex.vercel.app"), `${prefix} missing demo`);
    assert(html.includes("/multi-agent/"), `${prefix} missing on-site embed`);
    assert(/kein LLM|no LLM|ohne LLM/i.test(html), `${prefix} must state there is no LLM backend`);
    assert(!/GPT-|OpenAI API|Claude API|LLM-powered|powered by an LLM/i.test(html), `${prefix} must not invent an LLM backend`);
    assert(html.includes("raw.githubusercontent.com/d0npedro/multi-agent"), `${prefix} missing public screenshot`);
  }
  if (id === "deutschlandcard" || id === "dz-bank-okvp" || id === "bitmarck-bitgo") {
    assert(/Kein AI|No AI/.test(html), `${prefix} must not invent client AI work`);
  }
  assert(!html.includes("enterprise-integration"), `${prefix} fabricated enterprise-integration product leaked`);
}

async function checkSitemap() {
  const xml = await readFile(join(root, "public/portfolio/de/sitemap.xml"), "utf8");
  assert(xml.includes(`${SITE.origin}/portfolio/de`), "sitemap missing DE home");
  assert(xml.includes(`${SITE.origin}/portfolio/en`), "sitemap missing EN home");
  for (const id of CASE_IDS) {
    assert(xml.includes(`${SITE.origin}${caseHref("de", id)}`), `sitemap missing DE ${id}`);
    assert(xml.includes(`${SITE.origin}${caseHref("en", id)}`), `sitemap missing EN ${id}`);
  }
}

await check("de");
await check("en");
await checkCv();
for (const locale of ["de", "en"]) {
  for (const id of CASE_IDS) {
    await checkCase(locale, id);
  }
}
await checkSitemap();

if (failures.length) {
  console.error("portfolio verify failed:\n- " + failures.join("\n- "));
  process.exit(1);
}
console.log("portfolio verify ok");
