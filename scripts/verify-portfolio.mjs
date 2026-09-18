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
    html.includes("Senior AI Consultant &amp; Agentic Software Engineer") ||
      html.includes("Senior AI Consultant & Agentic Software Engineer"),
    `${prefix} missing Variant C role title`,
  );
  assert(html.includes("Peter Henrichs | Senior AI Consultant &amp; Agentic Software Engineer") || html.includes("Peter Henrichs | Senior AI Consultant & Agentic Software Engineer"), `${prefix} missing SEO title with pipe`);
  assert(!html.includes("Senior Software Engineer &amp; KI-Manager"), `${prefix} still has old title`);
  assert(!html.includes("Senior AI Consultant · Agentic AI · Enterprise Systems"), `${prefix} still has iteration-4 Variant A role`);
  assert(!html.includes("Ich bringe AI Agents in reale Unternehmenssysteme."), `${prefix} still has Variant A DE H1`);
  assert(!html.includes("I bring AI agents into real enterprise systems."), `${prefix} still has Variant A EN H1`);
  assert(!html.includes("offen für Senior-Backend") && !html.includes("Available for senior backend"), `${prefix} still has split availability line`);
  assert(!html.includes("roleWords") && !html.includes("Backend-Spezialist"), `${prefix} still rotates old role words`);
  assert(html.includes("10+"), `${prefix} 10+ years proof missing from SSR`);
  assert(!html.includes(">0<!-- -->+") && !html.includes(">0+</"), `${prefix} still has 0+ SSR metrics`);
  assert(/Köln|Cologne/.test(html) && /Remote/.test(html), `${prefix} missing Köln/Cologne and Remote in hero`);
  assert(html.includes("ENGINEERING") && html.includes("AGENTIC AI") && html.includes("INTEGRATION") && html.includes("CONSULTING"), `${prefix} missing Variant C proof chips`);
  assert(html.includes("AI Agents") || html.includes("AI agents"), `${prefix} missing AI Agents in copy/schema`);
  assert(html.includes("Java"), `${prefix} missing Java in capabilities`);
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
    html.includes("Strategy") && html.includes("Architecture") && html.includes("Agentic Engineering") && html.includes("Delivery") && html.includes("Governance"),
    `${prefix} missing capability groups`,
  );
  assert(html.includes("Healthcare") && html.includes("Loyalty") && html.includes("adesso"), `${prefix} missing compact enterprise contexts`);
  assert(html.includes("Finance") && html.includes("Public Sector"), `${prefix} missing Finance / Public Sector context line`);
  assert(
    html.includes('id="cases"') &&
      html.includes('id="value"') &&
      html.includes('id="work"') &&
      html.includes('id="approach"') &&
      html.includes('id="credentials"') &&
      html.includes('id="about"'),
    `${prefix} missing IA section ids`,
  );
  assert(html.indexOf('id="cases"') < html.indexOf('id="value"'), `${prefix} selected cases should appear before where I create value`);
  assert(html.indexOf('id="value"') < html.indexOf('id="work"'), `${prefix} value should appear before career trajectory`);
  assert(html.indexOf('id="work"') < html.indexOf('id="approach"'), `${prefix} trajectory should appear before capabilities`);
  assert(html.indexOf('id="approach"') < html.indexOf('id="credentials"'), `${prefix} capabilities should appear before credentials`);
  assert(html.includes("Agentic AI Solution Consulting") && html.includes("Enterprise AI Integration") && html.includes("AI-Augmented Software Engineering"), `${prefix} missing consulting fields`);
  assert(html.includes("ProfilePage") && html.includes("jobTitle") && html.includes("knowsAbout") && html.includes("sameAs"), `${prefix} missing Person/ProfilePage JSON-LD`);
  assert(html.includes("dateModified"), `${prefix} missing dateModified`);
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
assert(en.includes("Selected AI &amp; Engineering Cases") || en.includes("Selected AI & Engineering Cases"), "EN primary CTA missing");
assert(de.includes("Lebenslauf"), "DE secondary CTA should be Lebenslauf");
assert(en.includes(">CV<") || en.includes("CV</a>"), "EN secondary CTA should be CV");
assert(de.includes("Ich verbinde über 10 Jahre Enterprise Software Engineering mit Agentic AI"), "DE H1 missing Variant C lead");
assert(en.includes("I design AI-augmented systems that connect LLMs, agents and automation"), "EN H1 missing Variant C lead");
assert(de.includes("Jetzt angewandt auf Agentic AI") || de.includes("nicht umgekehrt"), "DE trust line missing");
assert(en.includes("Now applied to Agentic AI"), "EN trust line missing");
assert(de.includes("Über AI &amp; Agents sprechen") || de.includes("Über AI & Agents sprechen") || de.includes("Gespräch über AI"), "DE talk CTA missing");
assert(de.includes("Agentic-AI-Case ansehen"), "DE Graph-Mastermind CTA should be information-rich");
assert(en.includes("View the agentic-engineering case"), "EN Graph-Mastermind CTA should be information-rich");
assert(!de.includes("Hennrichs") && !en.includes("Hennrichs"), "audit misspelling leaked");
assert(JSON.stringify(FLAGSHIP_IDS) === JSON.stringify(["graph-mastermind", "agent-collective", "deutschlandcard"]), "lead cases must map to existing real projects");
assert(!de.includes("enterprise-integration") && !en.includes("enterprise-integration"), "fabricated enterprise-integration product still on landing");
assert((de.match(/pf-case-card/g) || []).length === 3, "DE landing must show exactly 3 lead case cards");
assert((en.match(/pf-case-card/g) || []).length === 3, "EN landing must show exactly 3 lead case cards");

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
