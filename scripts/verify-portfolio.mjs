import { readFile } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const failures = [];

function assert(cond, message) {
  if (!cond) failures.push(message);
}

async function check(locale) {
  const html = await readFile(join(root, "public/portfolio", locale, "index.html"), "utf8");
  const prefix = `[${locale}]`;

  assert(html.includes("Senior AI Consultant &amp; Agentic Software Engineer") || html.includes("Senior AI Consultant & Agentic Software Engineer"), `${prefix} missing stable role title`);
  assert(!html.includes("Senior Software Engineer &amp; KI-Manager"), `${prefix} still has old title`);
  assert(!html.includes("offen für Senior-Backend") && !html.includes("Available for senior backend"), `${prefix} still has split availability line`);
  assert(!html.includes("roleWords") && !html.includes("Backend-Spezialist"), `${prefix} still rotates old role words`);
  assert(html.includes(">10+</span>") || html.includes(">10+</span") || html.includes("10+"), `${prefix} hero metric 10+ missing from SSR`);
  assert(!html.includes(">0<!-- -->+") && !html.includes(">0+</"), `${prefix} still has 0+ SSR metrics`);
  assert(html.includes("graph-mastermind.vercel.app"), `${prefix} missing Graph-Mastermind demo`);
  assert(html.includes("github.com/d0npedro/graph-mastermind"), `${prefix} missing Graph-Mastermind repo`);
  assert(html.includes("github.com/d0npedro/multi-agent"), `${prefix} missing Agent Collective repo`);
  assert(html.includes("multi-agent-six-murex.vercel.app") || html.includes("/multi-agent/"), `${prefix} missing Agent Collective demo`);
  assert(html.includes("ph@d0npedro.com"), `${prefix} missing email`);
  assert(html.includes("linkedin.com/in/peter-henrichs"), `${prefix} missing LinkedIn`);
  assert(html.includes("github.com/d0npedro"), `${prefix} missing GitHub`);
  assert(html.includes("/portfolio/cv/"), `${prefix} missing CV path`);
  assert(!html.includes("keine Lücken") && !html.includes("no gaps, no invented"), `${prefix} still has defensive copy`);
  assert(!html.includes("Sieben Einsätze, sieben regulierte") && !html.includes("Seven engagements, seven regulated"), `${prefix} still has misleading seven-domains line`);
  assert(!html.includes("Schwenk in die KI-Führung") && !html.includes("pivot into AI leadership"), `${prefix} still overclaims AI leadership pivot`);
  assert(html.indexOf("id=\"ai-cases\"") < html.indexOf("id=\"work\""), `${prefix} AI cases should appear before experience`);
  assert(html.indexOf("Graph-Mastermind") < html.indexOf("id=\"work\""), `${prefix} Graph-Mastermind should appear before experience`);
  assert(!html.includes("Weiterbildung AI-Automation</h3>") || html.indexOf("id=\"work\"") < html.indexOf("id=\"education\""), `${prefix} experience/education order`);
  const workSlice = html.slice(html.indexOf('id="work"'), html.indexOf('id="education"'));
  assert(!workSlice.includes("Weiterbildung AI-Automation") && !workSlice.includes("Weiterbildung zum KI-Manager"), `${prefix} Weiterbildung still listed as Berufserfahrung`);
  assert(html.includes("Agentic AI"), `${prefix} missing Agentic AI in content/schema`);
  assert(html.includes("LLM-assisted Software Engineering") || html.includes("LLM-gestützte"), `${prefix} missing LLM-assisted engineering term`);
  assert(!html.includes("MCP") || /MCP claims|MCP-Claims|ohne Modell/.test(html), `${prefix} should not claim MCP as a skill`);
}

async function checkCv() {
  const html = await readFile(join(root, "public/portfolio/cv/index.html"), "utf8");
  assert(html.includes("Senior AI Consultant"), "CV missing role");
  assert(html.includes("ph@d0npedro.com"), "CV missing email");
  assert(html.includes("Graph-Mastermind"), "CV missing Graph-Mastermind");
}

const [de, en] = await Promise.all([
  readFile(join(root, "public/portfolio/de/index.html"), "utf8"),
  readFile(join(root, "public/portfolio/en/index.html"), "utf8"),
]);
assert(de.includes("AI Cases ansehen") || de.includes("AI Cases"), "DE primary CTA missing");
assert(en.includes("View AI cases") || en.includes("AI cases"), "EN primary CTA missing");

await check("de");
await check("en");
await checkCv();

if (failures.length) {
  console.error("portfolio verify failed:\n- " + failures.join("\n- "));
  process.exit(1);
}
console.log("portfolio verify ok");
