/** @type {import('../schema.mjs').Entry} */
export default {
  "id": "role-agentic-ai-consulting",
  "type": "role",
  "honesty": "employment",
  "order": 10,
  "priority": 100,
  "title": {
    "de": "Senior AI Consultant & Agentic Software Engineer",
    "en": "Senior AI Consultant & Agentic Software Engineer"
  },
  "summary": {
    "de": "Agentische Workflows, die an bestehende Unternehmenssoftware andocken — mit Vertrag, sichtbarem Zustand und menschlicher Abnahme.",
    "en": "Agentic workflows that dock onto existing enterprise software — with a contract, visible state, and human acceptance."
  },
  "topics": [
    "agentic-ai",
    "consulting",
    "enterprise-integration",
    "governance"
  ],
  "stack": [
    "Agent Contracts",
    "LLMs",
    "TypeScript",
    "Java / Spring",
    "Azure / Kubernetes",
    "DSGVO / EU AI Act"
  ],
  "fits": {
    "de": [
      "Organisationen mit laufender IT, die AI einordnen müssen, bevor sie implementieren.",
      "Teams, die einen Prototyp in eine wartbare Schicht überführen.",
      "Programme, die Modernisierung und AI zusammen denken."
    ],
    "en": [
      "Organizations with running IT that need AI framed before implementation.",
      "Teams turning a prototype into a maintainable layer.",
      "Programs that treat modernization and AI as one sequence."
    ]
  },
  "notFits": {
    "de": [
      "Tool-Pitch ohne schriftliche Grenze zum bestehenden System.",
      "Autonome Agents ohne Abnahme und Human-in-the-Loop.",
      "Erfundene Board-KPIs oder Vorstands-Fiction ohne Delivery-Boden."
    ],
    "en": [
      "Tool pitches without a written boundary against the existing system.",
      "Autonomous agents without acceptance and Human-in-the-Loop.",
      "Invented board KPIs or executive fiction without a delivery ground."
    ]
  },
  "deliverables": {
    "de": [
      "Use-Case-Schnitt: wo ein Agent handeln darf und wo das bestehende System den Prozess schon trägt",
      "Architekturskizze mit Abnahme, Human-in-the-Loop und expliziten Grenzen",
      "Agent-Vertrag (Aufgabe, Artefakt, Abnahme) in der Form der öffentlichen Pakete",
      "Integrationsschnitt an vorhandene APIs, Identität und Pipelines",
      "Priorisierte Use-Case-Liste gegen die Landschaft, die existiert",
      "Governance-Rahmen aus regulierter Delivery (Berechtigungen, DSGVO) plus EU-AI-Act-Orientierung"
    ],
    "en": [
      "Use-case cut: where an agent may act vs where the existing system already carries the process",
      "Architecture sketch with acceptance, Human-in-the-Loop, and explicit limits",
      "Agent contract (task, artifact, acceptance) in the form of the public packages",
      "Integration cut against existing APIs, identity, and pipelines",
      "Prioritized use-case list judged against the landscape that exists",
      "Governance frame from regulated delivery (permissions, GDPR) plus EU AI Act orientation"
    ]
  },
  "engagement": {
    "de": "Über die Agentur — Architektur-Begleitung auf Zeit, Engineering-Einsatz im Team der Agentur oder des Kunden, oder Programm-Begleitung. Kein Freelancer-Retainer, keine freien Slots.",
    "en": "Through the agency — time-boxed architecture support, engineering seat on the agency or client team, or program accompaniment. No freelancer retainer, no open slots."
  },
  "packages": [
    {
      "id": "senior-ai-consultant",
      "name": {
        "de": "Senior AI Consultant",
        "en": "Senior AI Consultant"
      },
      "scope": {
        "de": "Use Cases gegen bestehende Systeme schneiden, bevor gebaut wird. Schriftliche Grenze — kein Tool-Pitch.",
        "en": "Cut use cases against systems that already run, before anyone builds. Written boundary — not a tool pitch."
      },
      "deliverables": {
        "de": [
          "Use-Case-Schnitt: wo ein Agent handeln darf und wo das bestehende System den Prozess schon trägt",
          "Architekturskizze mit Abnahme, Human-in-the-Loop und expliziten Grenzen",
          "Schriftliche Liste dessen, was nicht gebaut wird"
        ],
        "en": [
          "Use-case cut: where an agent may act vs where the existing system already carries the process",
          "Architecture sketch with acceptance, Human-in-the-Loop, and explicit limits",
          "A written list of what will not be built"
        ]
      },
      "ideal": {
        "de": "Organisationen mit laufender IT, die AI einordnen müssen, bevor sie implementieren.",
        "en": "Organizations with running IT that need AI framed before implementation."
      },
      "engagement": {
        "de": "Über die Agentur — Architektur-Begleitung auf Zeit oder Vermittlung in ein Kundenteam.",
        "en": "Through the agency — time-boxed architecture support or placement into a client team."
      }
    },
    {
      "id": "agentic-engineer",
      "name": {
        "de": "Agentic Engineer",
        "en": "Agentic Engineer"
      },
      "scope": {
        "de": "Agent-Workflows mit Vertrag, Tool-Grenzen, Tests und sichtbarem Zustand. Anbindung an vorhandene APIs.",
        "en": "Agent workflows with a contract, tool limits, tests, and visible state. Wired to existing APIs."
      },
      "deliverables": {
        "de": [
          "Agent-Vertrag (Aufgabe, Artefakt, Abnahme) in der Form der öffentlichen Pakete",
          "Integrationsschnitt an vorhandene APIs, Identität und Pipelines",
          "Prüfbarer Zustand oder Checkliste — ein Chatprotokoll ist keine Abnahme"
        ],
        "en": [
          "Agent contract (task, artifact, acceptance) in the form of the public packages",
          "Integration cut against existing APIs, identity, and pipelines",
          "Inspectable state or a checklist — a chat transcript is not acceptance"
        ]
      },
      "ideal": {
        "de": "Teams, die einen Prototyp in eine wartbare Schicht überführen.",
        "en": "Teams turning a prototype into a maintainable layer."
      },
      "engagement": {
        "de": "Engineering-Einsatz im Team der Agentur oder des Kunden. Graph-Mastermind und Agent Collective sind Independent R&D — kein mitgeliefertes Kundenprodukt.",
        "en": "Engineering seat on the agency or client team. Graph-Mastermind and Agent Collective are Independent R&D — not a bundled client product."
      }
    },
    {
      "id": "transformation-lead",
      "name": {
        "de": "Transformation Lead",
        "en": "Transformation Lead"
      },
      "scope": {
        "de": "Fach, Delivery und Governance übersetzen. Zuerst Boden (Systeme, Rechte, Daten), dann die Agentenschicht.",
        "en": "Translate between business, delivery, and governance. Ground first (systems, rights, data), then the agent layer."
      },
      "deliverables": {
        "de": [
          "Priorisierte Use-Case-Liste gegen die Landschaft, die existiert",
          "Betriebsmodell: Vertrag, Abnahme, Human-in-the-Loop — keine autonome Organisation",
          "Governance-Rahmen aus regulierter Delivery (Berechtigungen, DSGVO) plus EU-AI-Act-Orientierung"
        ],
        "en": [
          "Prioritized use-case list judged against the landscape that exists",
          "Operating model: contract, acceptance, human-in-the-loop — not an autonomous organization",
          "Governance frame from regulated delivery (permissions, GDPR) plus EU AI Act orientation"
        ]
      },
      "ideal": {
        "de": "Programme, die Modernisierung und AI zusammen denken.",
        "en": "Programs that treat modernization and AI as one sequence."
      },
      "engagement": {
        "de": "Programm-Begleitung über die Agentur.",
        "en": "Program accompaniment through the agency."
      }
    }
  ],
  "relations": {
    "cases": [
      "case-graph-mastermind",
      "case-agent-collective",
      "case-deutschlandcard"
    ],
    "roles": [
      "role-java-backend"
    ],
    "cv": [
      "cv-direct-services-deutschlandcard",
      "cv-adesso-dz-bank-okvp",
      "cv-adesso-bitmarck-bitgo"
    ]
  },
  "links": [
    {
      "kind": "anchor",
      "href": "#angebot",
      "label": {
        "de": "Direkt zum Angebot",
        "en": "Straight to the offer"
      }
    }
  ],
  "show": {
    "room": true,
    "tiles": true,
    "timeline": false,
    "casePage": false
  }
};
