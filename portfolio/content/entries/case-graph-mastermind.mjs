/** @type {import('../schema.mjs').Entry} */
export default {
  "id": "case-graph-mastermind",
  "honesty": "independent-rnd",
  "order": 30,
  "priority": 95,
  "title": {
    "de": "Graph-Mastermind",
    "en": "Graph-Mastermind"
  },
  "summary": {
    "de": "Ein agentischer Engineering-Workflow analysiert bestehende Repositories, plant Änderungen, arbeitet mit Entwicklungswerkzeugen und Tests und lässt kritische Ergebnisse separat evaluieren.",
    "en": "An agentic engineering workflow analyses existing repositories, plans changes, works with development tools and tests, and has critical results evaluated separately."
  },
  "period": {
    "date": "2026"
  },
  "topics": [
    "agentic-ai",
    "repository-intelligence",
    "independent-rnd"
  ],
  "stack": [
    "Agent Contracts",
    "React",
    "TypeScript",
    "d3-force",
    "CI / Typecheck"
  ],
  "result": {
    "de": "Öffentliches Agent-Paket, Live-Demo, Tests, Typecheck, CI und reproduzierbarer Production-Build. Qualitativ beobachtet: nachvollziehbare Artefakte statt Black-Box-Analyse.",
    "en": "Public agent package, live demo, tests, typecheck, CI and reproducible production build. Qualitatively observed: inspectable artifacts instead of black-box analysis."
  },
  "media": {
    "preview": "https://raw.githubusercontent.com/d0npedro/graph-mastermind/main/docs/screenshots/overview.png",
    "alt": {
      "de": "Force-Layout der Referenz-App: Kantenlabels und Toolbar",
      "en": "Force layout of the reference app: edge labels and toolbar"
    }
  },
  "links": [
    {
      "kind": "repo",
      "href": "https://github.com/d0npedro/graph-mastermind"
    },
    {
      "kind": "demo",
      "href": "https://graph-mastermind.vercel.app"
    }
  ],
  "relations": {
    "roles": [
      "role-agentic-ai-consulting"
    ],
    "cases": [
      "case-agent-collective"
    ],
    "cv": []
  },
  "chapters": {
    "ausgangslage": {
      "de": "Independent Applied AI R&D, 2026. In großen, historisch gewachsenen Softwaresystemen fließt erhebliche Entwicklungszeit in Codeverständnis, Fehlerlokalisierung und die Absicherung von Änderungen.",
      "en": "Independent Applied AI R&D, 2026. In large, historically grown software systems, substantial engineering time goes into understanding code, locating faults, and securing changes."
    },
    "schnitt": {
      "de": "Wiederverwendbares Agent-Paket: ein Coding Agent erhält über AGENT.md, SPEC.md und CHECKLIST.md einen expliziten Arbeits- und Abnahmevertrag. Ein bestimmtes LLM wird bewusst nicht vorausgesetzt.",
      "en": "Reusable agent package: a coding agent receives an explicit work and acceptance contract via AGENT.md, SPEC.md and CHECKLIST.md. A specific LLM is deliberately not prescribed."
    },
    "umsetzung": {
      "de": "Aufgabe / Issue → Planner-Vertrag → Repository-Kontext und Tools → Artefakt (Graph / Architekturansicht) → Tests und Checkliste → menschliche Bewertung. Kein Backend, keine autonomen Schreibzugriffe.",
      "en": "Task / issue → planner contract → repository context and tools → artifact (graph / architecture view) → tests and checklist → human review. No backend, no autonomous writes."
    },
    "nachweis": {
      "de": "Evaluation läuft. Abnahme heute über CHECKLIST.md, Typecheck, Tests und CI. Quantitative Kennzahlen erst, sobald ein reproduzierbarer Eval-Harness steht.",
      "en": "Evaluation in progress. Acceptance today via CHECKLIST.md, typecheck, tests and CI. Quantitative metrics only once a reproducible eval harness exists."
    },
    "ergebnis": {
      "de": "Öffentliches Agent-Paket mit Live-Demo. Qualitativ beobachtet: nachvollziehbare Artefakte.",
      "en": "Public agent package with live demo. Qualitatively observed: inspectable artifacts."
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
