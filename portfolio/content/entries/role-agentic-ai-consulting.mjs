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
    "de": "Ich prüfe, welche Anwendungsfälle für KI-Agenten sich in einer laufenden Systemlandschaft lohnen, schneide sie gegen das, was schon da ist, und lege vor dem Bau fest, wer abnimmt und woran man Erfolg misst. Umgesetzt wird mit Vertrag, sichtbarem Zustand und menschlicher Abnahme.",
    "en": "I work out which AI-agent use cases pay off in a running system landscape, cut them against what is already there, and settle before anyone builds who signs off and how success is measured. Delivery comes with a contract, visible state, and human acceptance."
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
      "Zahlen versprechen, bevor es eine Messbasis gibt."
    ],
    "en": [
      "Tool pitches without a written boundary against the existing system.",
      "Autonomous agents without acceptance and Human-in-the-Loop.",
      "Promising numbers before there is a way to measure them."
    ]
  },
  "deliverables": {
    "de": [
      "Bewertete Use-Case-Liste: Nutzen, Machbarkeit, Daten- und Rechtelage, Risiko — mit Reihenfolge und Begründung",
      "Use-Case-Schnitt: wo ein Agent handeln darf und wo das bestehende System den Prozess schon trägt",
      "Schriftliche Liste dessen, was nicht gebaut wird",
      "Zielarchitektur mit Integrationspunkten (APIs, Identität, Pipelines), Abnahme und Human-in-the-Loop",
      "Agent-Vertrag (Aufgabe, Artefakt, Abnahme) in der Form der öffentlichen Pakete",
      "Prüfbarer Zustand oder Checkliste — ein Chatprotokoll ist keine Abnahme",
      "Betriebsmodell: wer freigibt, wer eingreift, wann ein Mensch übernimmt — keine autonome Organisation",
      "Erfolgskriterien vor dem Bau: Messgrößen wie Abnahmequote, Review-Aufwand und Regressionen — Zahlen erst, wenn gemessen",
      "Governance-Rahmen aus regulierter Delivery (Berechtigungen, DSGVO) plus EU-AI-Act-Orientierung"
    ],
    "en": [
      "Assessed use-case list: value, feasibility, data and access situation, risk — in order, with reasons",
      "Use-case cut: where an agent may act vs where the existing system already carries the process",
      "A written list of what will not be built",
      "Target architecture with integration points (APIs, identity, pipelines), acceptance, and human-in-the-loop",
      "Agent contract (task, artifact, acceptance) in the form of the public packages",
      "Inspectable state or a checklist — a chat transcript is not acceptance",
      "Operating model: who approves, who steps in, when a human takes over — not an autonomous organization",
      "Success criteria before building: measures such as acceptance rate, review effort, and regressions — numbers only once measured",
      "Governance frame from regulated delivery (permissions, GDPR) plus EU AI Act orientation"
    ]
  },
  "approach": {
    "de": [
      "Bewerten: Anwendungsfälle sammeln und nach Nutzen, Machbarkeit gegen die vorhandenen Systeme, Daten- und Rechtelage und Risiko einordnen. Ergebnis ist eine Reihenfolge mit Begründung.",
      "Schneiden: festlegen, wo ein Agent handelt, wo das bestehende System den Prozess schon trägt und was bewusst nicht gebaut wird.",
      "Zielarchitektur: Anbindung an vorhandene APIs, Identität und Pipelines. Abnahme und Human-in-the-Loop gehören in die Architektur, nicht in einen späteren Nachtrag. Die Arbeitsverträge (AGENT.md, SPEC.md, CHECKLIST.md) sind wiederverwendbar, siehe Graph-Mastermind.",
      "Betrieb und Verantwortung: wer freigibt, wer eingreift, wann ein Mensch übernimmt. Berechtigungen und DSGVO aus regulierter Delivery, EU AI Act als Rahmen.",
      "Erfolg messbar machen: Messgrößen vor dem Bau festlegen, etwa Abnahmequote, Review-Aufwand, Regressionen und Kosten pro akzeptierter Änderung. Zahlen gibt es erst, wenn sie gemessen sind."
    ],
    "en": [
      "Assess: collect use cases and rank them by value, feasibility against the systems in place, data and access situation, and risk. The result is an order with reasons.",
      "Cut: decide where an agent acts, where the existing system already carries the process, and what will deliberately not be built.",
      "Target architecture: connect to existing APIs, identity, and pipelines. Acceptance and human-in-the-loop belong in the architecture, not in a later add-on. The work contracts (AGENT.md, SPEC.md, CHECKLIST.md) are reusable; see Graph-Mastermind.",
      "Operations and ownership: who approves, who steps in, when a human takes over. Permissions and GDPR from regulated delivery, the EU AI Act as the frame.",
      "Make success measurable: fix the measures before building, such as acceptance rate, review effort, regressions, and cost per accepted change. Numbers only once they are measured."
    ]
  },
  "result": {
    "de": "Beratung und Entwicklung in Kundenprojekten von 2018 bis 2022 (Krankenkassen, Gesundheitswesen, Behörden, Automotive), Lead-Dev/DevOps in einer Bankmigration 2020, Weiterbildung zum KI-Manager 2026. Agenten-Arbeit bisher als Independent R&D, nicht als Kundenlieferung.",
    "en": "Consulting and development in client projects from 2018 to 2022 (health insurers, healthcare, government, automotive), lead dev/DevOps on a banking migration in 2020, AI Manager continuing education in 2026. Agent work so far as Independent R&D, not client delivery.",
    "source": "portfolio/shared.mjs EXPERIENCE + EDUCATION (main)"
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
        "de": "Anwendungsfälle bewerten und gegen die Systeme schneiden, die schon laufen, bevor gebaut wird. Schriftliche Grenze statt Tool-Pitch.",
        "en": "Assess use cases and cut them against the systems that already run, before anyone builds. A written boundary, not a tool pitch."
      },
      "deliverables": {
        "de": [
          "Bewertete Use-Case-Liste: Nutzen, Machbarkeit, Daten- und Rechtelage, Risiko — mit Reihenfolge und Begründung",
          "Use-Case-Schnitt: wo ein Agent handeln darf und wo das bestehende System den Prozess schon trägt",
          "Schriftliche Liste dessen, was nicht gebaut wird"
        ],
        "en": [
          "Assessed use-case list: value, feasibility, data and access situation, risk — in order, with reasons",
          "Use-case cut: where an agent may act vs where the existing system already carries the process",
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
          "Zielarchitektur mit Integrationspunkten (APIs, Identität, Pipelines), Abnahme und Human-in-the-Loop",
          "Agent-Vertrag (Aufgabe, Artefakt, Abnahme) in der Form der öffentlichen Pakete",
          "Prüfbarer Zustand oder Checkliste — ein Chatprotokoll ist keine Abnahme"
        ],
        "en": [
          "Target architecture with integration points (APIs, identity, pipelines), acceptance, and human-in-the-loop",
          "Agent contract (task, artifact, acceptance) in the form of the public packages",
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
          "Betriebsmodell: wer freigibt, wer eingreift, wann ein Mensch übernimmt — keine autonome Organisation",
          "Erfolgskriterien vor dem Bau: Messgrößen wie Abnahmequote, Review-Aufwand und Regressionen — Zahlen erst, wenn gemessen",
          "Governance-Rahmen aus regulierter Delivery (Berechtigungen, DSGVO) plus EU-AI-Act-Orientierung"
        ],
        "en": [
          "Operating model: who approves, who steps in, when a human takes over — not an autonomous organization",
          "Success criteria before building: measures such as acceptance rate, review effort, and regressions — numbers only once measured",
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
      "cv-adesso-bitmarck-bitgo",
      "cv-nextgen-bwi-lzs"
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
