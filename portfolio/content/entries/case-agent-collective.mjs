/** @type {import('../schema.mjs').Entry} */
export default {
  "id": "case-agent-collective",
  "honesty": "independent-rnd",
  "order": 40,
  "priority": 94,
  "title": {
    "de": "Agent Collective",
    "en": "Agent Collective"
  },
  "summary": {
    "de": "Ein deterministischer Multi-Agent-Simulator macht Zustände, Quality Gates und Eskalationen sichtbar — bewusst ohne LLM-Backend, damit Orchestrierung und Fehlermodi testbar bleiben.",
    "en": "A deterministic multi-agent simulator makes states, quality gates and escalations visible — deliberately without an LLM backend, so orchestration and failure modes stay testable."
  },
  "period": {
    "date": "2026"
  },
  "topics": [
    "multi-agent",
    "deterministic",
    "independent-rnd",
    "no-llm"
  ],
  "stack": [
    "TypeScript",
    "Deterministic State Machine",
    "React Flow",
    "Vitest",
    "React 19"
  ],
  "result": {
    "de": "Live-Dashboard, Vitest/CI, schrittweise ausführbare Systemzustände. Qualitativ beobachtet: Failure Recovery und Observability sind prüfbar. Keine erfundenen Durchsatz- oder Dokument-KPIs. Kein LLM.",
    "en": "Live dashboard, Vitest/CI, step-executable system states. Qualitatively observed: failure recovery and observability are inspectable. No invented throughput or document KPIs. No LLM."
  },
  "media": {
    "preview": "https://raw.githubusercontent.com/d0npedro/multi-agent/main/docs/screenshots/hero.png",
    "alt": {
      "de": "Dashboard: Live-Graph, Metriken und Task Board",
      "en": "Dashboard: live graph, metrics and task board"
    }
  },
  "links": [
    {
      "kind": "repo",
      "href": "https://github.com/d0npedro/multi-agent"
    },
    {
      "kind": "demo",
      "href": "https://multi-agent-six-murex.vercel.app"
    },
    {
      "kind": "embed",
      "href": "/multi-agent/"
    }
  ],
  "relations": {
    "roles": [
      "role-agentic-ai-consulting"
    ],
    "cases": [
      "case-graph-mastermind"
    ],
    "cv": []
  },
  "chapters": {
    "ausgangslage": {
      "de": "Independent Applied AI R&D, 2026. Prozessautomation braucht sichtbare Zustände, Validation und einen menschlichen Ausweg — nicht eine Chatoberfläche, die Systemverhalten versteckt.",
      "en": "Independent Applied AI R&D, 2026. Process automation needs visible states, validation and a human escape hatch — not a chat UI that hides system behaviour."
    },
    "schnitt": {
      "de": "TypeScript-State-Machine mit sechs Rollen, Workflow-Graph, Failure Injection, Recovery und seeded RNG. Bewusst kein reales LLM.",
      "en": "TypeScript state machine with six roles, workflow graph, failure injection, recovery and seeded RNG. Deliberately no real LLM."
    },
    "umsetzung": {
      "de": "Input / Aufgabe → Rollen in der Engine → Structured State → Validation / Failure Injection → automatischer Schritt oder Human Review → Audit. Reine TypeScript-Engine besitzt den Weltzustand.",
      "en": "Input / task → roles in the engine → structured state → validation / failure injection → automatic step or human review → audit. Pure TypeScript engine owns world state."
    },
    "nachweis": {
      "de": "Evaluation über Vitest und reproduzierbare seeded Runs. Failure Injection und Recovery sitzen in der Engine. Daten sind synthetisch. Business-Kennzahlen werden nicht erfunden.",
      "en": "Evaluation via Vitest and reproducible seeded runs. Failure injection and recovery live in the engine. Data is synthetic. Business metrics are not invented."
    },
    "ergebnis": {
      "de": "Live-Dashboard und prüfbare Orchestrierung. Kein LLM-Backend, kein Kundenbetrieb.",
      "en": "Live dashboard and inspectable orchestration. No LLM backend, no client operations."
    }
  },
  "show": {
    "room": true,
    "tiles": true,
    "timeline": true,
    "casePage": true
  },
  "type": "case"
};
