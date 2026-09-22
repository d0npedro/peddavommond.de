export const de = {
  meta: {
    title: "Peter Henrichs | Senior AI Consultant & Agentic Software Engineer",
    description:
      "Senior AI Consultant und Software Engineer mit über 10 Jahren Enterprise-Erfahrung. Fokus auf LLMs, AI Agents, Automation und Enterprise Integration.",
    ogAlt: "Peter Henrichs | Senior AI Consultant & Agentic Software Engineer · Köln",
    keywords:
      "Peter Henrichs,Köln,Senior AI Consultant,Agentic Software Engineer,Agentic AI,LLMs,AI Agents,Automation,Enterprise Engineering,Java,Spring,Cloud",
    jobTitle: "Senior AI Consultant & Agentic Software Engineer",
    personDescription:
      "Peter Henrichs ist Senior AI Consultant und Agentic Software Engineer in Köln. Die Seniorität stammt aus mehr als zehn Jahren Enterprise Software Engineering; Agentic AI, LLMs und Automation sind die aktuelle Spezialisierung darauf — nicht an ihrer Stelle.",
  },
  common: {
    skipToContent: "Zum Inhalt springen",
    langSwitchAria: "Sprache wechseln",
    localeName: { de: "Deutsch", en: "Englisch" },
  },
  nav: {
    ariaPrimary: "Hauptnavigation",
    toggleMenu: "Menü umschalten",
    profile: "Profil",
    cases: "Cases",
    offer: "Anbieten",
    experience: "Erfahrung",
    cv: "CV",
    contact: "Kontakt",
    talk: "Gespräch starten",
  },
  theme: {
    toLight: "Zu hellem Modus wechseln",
    toDark: "Zu dunklem Modus wechseln",
  },
  hero: {
    eyebrow: "Enterprise Engineering × Agentic AI × Transformation",
    role: "Senior AI Consultant & Agentic Software Engineer",
    h1: "Die Schicht zwischen System und Agent.",
    location: "Köln · Deutschlandweit / Remote",
    tagline:
      "Agentische Workflows, die an bestehende Unternehmenssoftware andocken — mit Vertrag, sichtbarem Zustand und menschlicher Abnahme.",
    proof:
      "ENTWICKLUNG · 10+ Jahre Enterprise-Systeme · AGENTIC AI · LLMs · Agents · Automatisierung · INTEGRATION · APIs · Cloud · bestehende IT · BERATUNG · Use Cases · Architektur · Transformation",
    proofChips: [
      { label: "ENTWICKLUNG", body: "10+ Jahre Enterprise-Systeme" },
      { label: "AGENTIC AI", body: "LLMs · Agents · Automatisierung" },
      { label: "INTEGRATION", body: "APIs · Cloud · bestehende IT" },
      { label: "BERATUNG", body: "Use Cases · Architektur · Transformation" },
    ],
    contextLine: "adesso · Finanzwesen · Öffentlicher Sektor · Gesundheitswesen · Loyalty",
    trust:
      "10+ Jahre Enterprise Engineering. Jetzt angewandt auf Agentic AI — nicht umgekehrt.",
    ctaPrimary: "Arbeit anfassen",
    ctaSecondary: "Lebenslauf",
    ctaTertiary: "Über AI & Agents sprechen",
    diagramTitle: "Agentisches System — Ziel, Orchestrierung, Bewertung, Mensch",
    diagramAlt:
      "Systemdiagramm: ein Ziel geht an einen Orchestrator, der Tools und Modell anspricht. Evaluation und menschliche Prüfung begrenzen Autonomie.",
    diagramLabels: {
      goal: "Ziel",
      orchestrator: "Orchestrierung",
      model: "Modell",
      tools: "Tools",
      eval: "Bewertung",
      human: "Mensch",
    },
    metricLabels: [
      "Jahre Softwareentwicklung",
      "Regulierte Branchen umgesetzt",
      "Enterprise-Projekte",
      "Live-Webportale verantwortet",
    ],
    languagesLabel: "Sprachen",
  },
  builds: {
    eyebrow: "Was ich baue",
    title: "Eine prüfbare Schicht auf dem System, das schon läuft.",
    body: "Aufgabe, Artefakt, Abnahme. Agentic AI Solution Consulting, Enterprise AI Integration und AI-Augmented Software Engineering sind dieselbe Schicht — Beratung, Anbindung, Engineering — nicht drei Produkte und keine Demo neben der IT.",
    split:
      "Independent R&D ist öffentlich prüfbar und kein Kundenbetrieb. Bezahlte Enterprise-Arbeit bleibt bei dem, was geliefert wurde — auch wenn dort kein AI-Bestandteil war.",
  },
  samples: {
    collective: {
      eyebrow: "Anfassbar · Independent R&D",
      title: "Zustand, den man Schritt für Schritt sieht.",
      body: "Agent Collective ist ein deterministischer Multi-Agent-Simulator ohne LLM-Backend. Dieses Panel spielt den öffentlichen Tick-Vertrag nach: Ereignisse, Aufgabe, Arbeit, Übergabe, Review. Kein Chat, keine Kennzahlen.",
      badge: "Independent R&D · deterministisch · kein LLM-Backend",
      step: "Schritt",
      reset: "Zurück",
      failLabel: "Agent-Failure",
      tickLabel: "Tick",
      note: "Wiedergabe des öffentlichen Vertrags aus dem Repository. Nicht die Live-Engine. Keine erfundenen Durchsatz- oder Latenzzahlen.",
      shown:
        "Gezeigt: Coder, Critic, Monitor. Das Default-Kollektiv hat zusätzlich Researcher, Trader und Creative.",
      review: [
        {
          tick: "0",
          phase: "Pause",
          detail: "Uhr steht bei Tick 0. Seeded Run, kein Backend, kein Modellaufruf.",
          agents: [
            { role: "Coder", status: "idle" },
            { role: "Critic", status: "idle" },
            { role: "Monitor", status: "idle" },
          ],
        },
        {
          tick: "1",
          phase: "Ereignisse",
          detail: "Warteschlange der externen Ereignisse wird angewandt. In diesem Schritt ist sie leer.",
          agents: [
            { role: "Coder", status: "idle" },
            { role: "Critic", status: "idle" },
            { role: "Monitor", status: "idle" },
          ],
        },
        {
          tick: "1",
          phase: "Aufgaben",
          detail: "Aufgaben entstehen passend zur Rolle: code für Coder, review für Critic. Beansprucht wird erst im nächsten Tick.",
          agents: [
            { role: "Coder", status: "idle" },
            { role: "Critic", status: "idle" },
            { role: "Monitor", status: "idle" },
          ],
        },
        {
          tick: "2",
          phase: "Arbeit",
          detail: "Coder hat die code-Aufgabe. Fortschritt liegt in der Engine, nicht in einem Chat.",
          agents: [
            { role: "Coder", status: "working" },
            { role: "Critic", status: "idle" },
            { role: "Monitor", status: "idle" },
          ],
        },
        {
          tick: "3",
          phase: "Übergabe",
          detail: "Handoff über eine Kante. Critic arbeitet die review-Aufgabe — das sichtbare Gate. Kein LLM bewertet es.",
          agents: [
            { role: "Coder", status: "communicating" },
            { role: "Critic", status: "working" },
            { role: "Monitor", status: "idle" },
          ],
        },
        {
          tick: "4",
          phase: "Mensch",
          detail: "Critique ist zugestellt. Ein Mensch interpretiert. Keine automatische Abnahme.",
          agents: [
            { role: "Coder", status: "idle" },
            { role: "Critic", status: "idle" },
            { role: "Monitor", status: "idle" },
          ],
        },
      ],
      fail: [
        {
          tick: "5",
          phase: "Agent-Failure",
          detail: "Dokumentiertes Ereignis: der gewählte Agent verliert die Aufgabe und geht auf failed. Keine erfundenen Ausfallquoten.",
          agents: [
            { role: "Coder", status: "failed" },
            { role: "Critic", status: "idle" },
            { role: "Monitor", status: "idle" },
          ],
        },
        {
          tick: "6",
          phase: "Recovery",
          detail: "Recovery über die nächsten Ticks. Der Zustand bleibt sichtbar. Steuerung bleibt beim Menschen.",
          agents: [
            { role: "Coder", status: "recovering" },
            { role: "Critic", status: "idle" },
            { role: "Monitor", status: "idle" },
          ],
        },
      ],
    },
    graph: {
      eyebrow: "Anfassbar · Independent R&D",
      title: "Ein Vertrag, den man aufklappen kann.",
      body: "Graph-Mastermind ist ein Agent-Paket für Coding Agents. AGENT.md, CHECKLIST.md und der Runtime-Vertrag sind das Artefakt. Ein bestimmtes LLM ist nicht vorgeschrieben.",
      badge: "Independent R&D · Agent-Paket · kein festgeschriebenes LLM",
      llmLine:
        "LLM-gestützte Entwicklung nur, wenn ein Coding Agent den Vertrag ausführt. Ohne Modell- oder MCP-Claims.",
      scratch:
        "Lokale Merkhilfe. Ein Haken speichert keinen Lauf und ist kein Kundenergebnis. Evaluation läuft — quantitative Kennzahlen gibt es nicht.",
      pipeline: ["Aufgabe", "AGENT.md", "Graph", "CHECKLIST", "Mensch"],
      tabs: [
        {
          id: "agent",
          label: "AGENT.md",
          kind: "code",
          caption: "Auszug aus dem öffentlichen Vertrag. Nicht der vollständige Prompt.",
          body: "# Graph-Mastermind — Arbeitsanweisung\n\nRolle: Repo-Analytiker + Graph-Modellierer + Frontend-Umsetzer.\nAuftrag: Repository analysieren, Graph ableiten, SPA bauen.\nTypecheck und Production-Build grün machen.\n\nHarte Verbote:\n- Kein Auth.\n- Kein Pflicht-Backend.\n- Keine erfundenen Module, solange echter Kontext da ist.",
        },
        {
          id: "check",
          label: "CHECKLIST",
          kind: "checks",
          caption: "Abnahme-Ausschnitt aus CHECKLIST.md. Offen heißt: nicht als Lauf behauptet.",
          items: [
            "Repo wurde gescannt (Baum, Manifeste, Docs)",
            "Keine erfundenen Module, solange echter Kontext existierte",
            "Kein React-State auf Simulation-Ticks",
            "tsc --noEmit grün",
            "Production-Build grün",
          ],
        },
        {
          id: "runtime",
          label: "Runtime",
          kind: "code",
          caption: "Runtime-Vertrag der Referenz-App. Die UI hält nur, was ein Mensch umschaltet.",
          body: "tick  →  dirty = true\nrAF   →  zeichnen, wenn dirty\nidle  →  Loop schläft, bis ein Event weckt\n\nMensch prüft das Artefakt.\nEin Modell ist nicht Teil des Vertrags.",
        },
      ],
    },
  },
  offer: {
    eyebrow: "Für Agenturen",
    title: "Wie man mich anbietet",
    intro:
      "Drei Rollenpakete zum Platzieren, zum Beispiel bei adesso. Scope, Liefergegenstände, passende Lage, Einsatzform. Keine erfundenen Kundenergebnisse, keine Tagessätze.",
    deliverables: "Liefergegenstände",
    ideal: "Passt zu",
    engagement: "Einsatz",
    packages: [
      {
        name: "Senior AI Consultant",
        scope:
          "Use Cases gegen Systeme, Identität und Datenqualität schneiden, bevor gebaut wird. Beratung mit schriftlicher Grenze, nicht ein Tool-Pitch.",
        deliverables: [
          "Use-Case-Schnitt: wo ein Agent handeln darf und wo das bestehende System den Prozess schon trägt",
          "Architekturskizze mit Abnahme, Human-in-the-Loop und expliziten Grenzen",
          "Schriftliche Liste dessen, was nicht gebaut wird",
        ],
        ideal:
          "Organisationen mit laufender IT, die AI einordnen müssen, bevor sie implementieren. Typische Lagen aus der bisherigen Lieferung: Finanzwesen, öffentlicher Sektor, Gesundheitswesen, Loyalty — als Erfahrungsboden, nicht als behauptetes AI-Mandat bei diesen Kunden.",
        engagement:
          "Über die Agentur: Architektur-Begleitung auf Zeit oder Vermittlung in ein Kundenteam. Kein eigener Freelancer-Retainer, keine freien Slots.",
      },
      {
        name: "Agentic Engineer",
        scope:
          "Agentische Workflows bauen: Vertrag, Tool-Grenzen, Tests, sichtbarer Zustand. Anbindung an vorhandene APIs und, wo das System schon so liegt, an Java und Spring.",
        deliverables: [
          "Agent-Vertrag (Aufgabe, Artefakt, Abnahme) in der Form der öffentlichen Pakete",
          "Integrationsschnitt an vorhandene APIs, Identität und Pipelines",
          "Prüfbarer Zustand oder Checkliste — ein Chatprotokoll ist keine Abnahme",
        ],
        ideal:
          "Teams, die einen Prototyp in eine wartbare Schicht überführen. Nicht: ein ungebundenes Modellprodukt ohne Systemgrenze.",
        engagement:
          "Engineering-Einsatz im Team der Agentur oder des Kunden. Graph-Mastermind und Agent Collective sind Independent R&D und Referenz, kein mitgeliefertes Kundenprodukt. Agent Collective hat kein LLM-Backend.",
      },
      {
        name: "Transformation Lead",
        scope:
          "Zwischen Fach, Delivery und Governance übersetzen. Reihenfolge: Boden (Systeme, Rechte, Daten), dann die Agentenschicht.",
        deliverables: [
          "Priorisierte Use-Case-Liste, beurteilt gegen die Landschaft, die existiert",
          "Betriebsmodell: Vertrag, Abnahme, Human-in-the-Loop — keine autonome Organisation",
          "Governance-Rahmen aus regulierter Delivery (Berechtigungen, DSGVO) plus EU-AI-Act-Einordnung aus der Spezialisierung 2026",
        ],
        ideal:
          "Programme, die Modernisierung und AI zusammen denken. Nicht: Vorstands-KPI-Theater oder ein Mandat, das öffentlich nicht existiert.",
        engagement:
          "Programm-Begleitung über die Agentur. Die Seniorität kommt aus Enterprise-Engineering, unter anderem adesso, Banking, GKV und Loyalty — nicht aus einem AI-Vorstand.",
      },
    ],
  },
  record: {
    summary: "Werdegang, Nachweise, Profil",
    note: "Erreichbar, nicht Teil der Scroll-Geschichte. Stationen, Ausbildung und weitere Mandate stehen hier und im Lebenslauf.",
  },
  value: {
    index: "02",
    eyebrow: "Wo ich Wirkung erzeuge",
    title: "Einsatzfelder — konkret, ohne Marketingsprache.",
    description:
      "Ich verstehe das System, das heute existiert. Ich verstehe, was aktuelle AI realistisch leisten kann. Und ich kann beides verbinden.",
    items: [
      {
        title: "Agentic AI Solution Consulting",
        body: "Use Cases finden, Agent-Architektur entwerfen, Prototypen und Integrationen begleiten — mit Vertrag, Abnahme und klaren Grenzen.",
      },
      {
        title: "Enterprise AI Integration",
        body: "AI an APIs, Backend, Identität und bestehende Systeme anbinden. Der Boden ist die laufende IT, nicht ein Greenfield-Chat.",
      },
      {
        title: "AI-Augmented Software Engineering",
        body: "Coding Agents, Repository-Analyse, Tests und Refactoring-Workflows — menschliche Prüfung bleibt Teil der Architektur.",
      },
      {
        title: "AI Transformation & Use Cases",
        body: "Business-Potenzial, Machbarkeit und vorhandene Landschaft zusammenbringen. Keine Vorstands-Fiction, keine erfundenen KPIs.",
      },
      {
        title: "AI Platform & Modernization",
        body: "Cloud, Microservices, CI/CD und Identity so schneiden, dass eine spätere AI-Schicht darauf landen kann.",
      },
    ],
  },
  about: {
    index: "07",
    eyebrow: "Über mich",
    title: "Kurz, damit die Cases die Arbeit tragen.",
    body: "Ich komme aus der Softwareentwicklung und beschäftige mich seit Jahren damit, komplexe Systeme verständlicher, wartbarer und automatisierbarer zu machen. LLMs und agentische Systeme sind für mich deshalb kein isolierter Technologietrend, sondern die nächste Evolutionsstufe von Software Engineering und Prozessautomatisierung. Ich arbeite aus Köln — deutschlandweit und remote.",
  },
  track: {
    index: "03",
    eyebrow: "Karrierebogen",
    title: "Engineer → Agentic AI → Beratung. Fünf Stationen, nicht der Lebenslauf.",
    description:
      "Die Seniorität beginnt nicht 2026. Agentic AI sitzt auf bezahlter Enterprise-Lieferung — Banking, öffentlicher Sektor, Gesundheitswesen, Loyalty. Details und NDA-Grenzen stehen in den Cases und im CV.",
    more: "Alle Stationen im Lebenslauf",
    items: {
      builder: {
        title: "Entwicklung & Verantwortung",
        body: "Sechs Live-Portale end-to-end: Aufbau, Betrieb, Intranet. Die Grundlage für spätere Systemverantwortung.",
      },
      enterprise: {
        title: "Enterprise Engineering",
        body: "Regulierte Landschaften bei adesso, NextGen und binaris: Banking-Migration, GKV-Security, Behörden-APIs, Healthcare-Interoperabilität.",
      },
      deutschlandcard: {
        title: "Komplexe Systeme in Produktion",
        body: "Cloud, Identity und Integration im bundesweiten Loyalty-Programm. Der Enterprise-Boden, auf den Agents später landen müssen.",
      },
      agentic: {
        title: "Agentic AI — Independent R&D",
        body: "Öffentliche Systeme für gewachsene Codebasen und prüfbare Multi-Agent-Orchestrierung. Kein Kundenbetrieb, kein erfundenes LLM-Backend.",
      },
      consulting: {
        title: "Consulting- und Leadership-Pfad",
        body: "KI-Manager und AI Automation stützen die Spezialisierung. Sie ersetzen keine Enterprise-Seniorität und keine bezahlte AI-Kundenlieferung.",
      },
    },
  },
  arc: {
    index: "00",
    eyebrow: "Beweis · der rote Faden",
    title:
      "Ein Bogen, drei Ären — die AI-Schicht liegt auf den Backend-Jahren, nicht an ihrer Stelle.",
    description:
      "Die Seniorität ist nicht neu. Die Spezialisierung ist neu: robuste Java/Spring-Enterprise-Delivery (öffentlicher Sektor, Banken, Krankenversicherung, Medien, Automotive) → Cloudifizierung (Azure, Kubernetes, Terraform) → LLMs, AI Agents und Automation auf bestehenden Produktionssystemen.",
    nowLabel: "jetzt",
    eras: [
      {
        title: "Builder & technischer Projektleiter",
        blurb:
          "Portale, CMS, Intranet und Betrieb im Verlagswesen. Sechs Live-Webmagazine end-to-end verantwortet.",
      },
      {
        title: "Enterprise Engineering",
        blurb:
          "Öffentlicher Sektor, wehrnahe Lizenzierung, Gesundheit (IHE / FHIR / GKV), zahnärztliche Abrechnung, Bankenmigration, Loyalty-Plattformen. Java, Spring, Security, Integration, Cloud.",
      },
      {
        title: "Agentic AI & Transformation",
        blurb:
          "Öffentliche Agent-Pakete und Multi-Agent-Simulation, AI Automation und Governance (DSGVO / EU AI Act) — aufgesetzt auf 12+ Jahre Produktionssysteme. Kein Bruch, sondern die nächste Schicht.",
      },
    ],
  },
  selectedCases: {
    index: "01",
    eyebrow: "Ausgewählte AI- & Engineering-Cases",
    beatTitle: "Drei Arbeiten.",
    title: "Drei Cases — Lab und Enterprise getrennt gekennzeichnet.",
    rndLine: "Independent R&D — öffentlich prüfbar, kein Kundenbetrieb.",
    clientLine: "Kundenarbeit unter NDA: nur die eigene Rolle und freigabefähige Technik.",
    description:
      "Graph-Mastermind und Agent Collective sind unabhängige, öffentlich prüfbare Systeme. DeutschlandCard ist bezahlte Enterprise-Lieferung. DZ BANK und BITMARCK stehen im Track Record, nicht als vierte und fünfte gleichwertige Karte.",
    rndNote:
      "Independent R&D — eigenständig konzipiert und umgesetzt. Technische Ergebnisse und Projektstatus werden bewusst von produktiven Kundenprojekten getrennt dargestellt.",
    clientNote:
      "Kundenarbeit — aufgrund von Vertraulichkeitsvereinbarungen sind Kunden- und Systemdetails teilweise abstrahiert. Beschrieben werden ausschließlich meine eigene Rolle und freigabefähige technische Inhalte.",
    secondaryEyebrow: "Weitere Mandate",
    secondaryNote:
      "Gesundheitswesen-Interoperabilität, wehrnahe Lizenzierung, Automotive und Verlagswesen — im Track Record und CV, nicht mit gleichem Startseiten-Gewicht.",
  },
  lab: {
    index: "03",
    eyebrow: "Independent Applied AI R&D",
    title: "Öffentliche Systeme, eigenständig konzipiert — kein Kundeneinsatz, kein Hobby-Disclaimer.",
    description:
      "Graph-Mastermind und Agent Collective belegen, wie ich Agentenverträge, Evaluation, Failure Handling und Observability konstruiere. Independent R&D: prüfbar, versioniert, mit Tests — und ausdrücklich keine Kundenlieferung.",
    perspectiveEyebrow: "Perspektive AI Transformation",
    perspectiveTitle: "Was sich ins Unternehmen übertragen lässt — und was hier nicht behauptet wird.",
    perspective:
      "Übertragbar: Governance, Security, Human-in-the-Loop, Kostengrenzen, Evaluation und klare Tool-Grenzen. Nicht behauptet: ein produktives LLM-Backend, ein Kunden-Agenten-Betrieb oder gemessene Board-KPIs, die öffentlich nicht existieren.",
    items: [
      {
        id: "graph-mastermind",
        label: "Independent R&D · Agentic AI",
        body: "Agent-Paket für Coding Agents. Vertrag, Graph und UI sind getrennt; ein bestimmtes Modell wird nicht vorausgesetzt.",
      },
      {
        id: "agent-collective",
        label: "Independent R&D · AI Automation",
        body: "Multi-Agent-Simulator ohne LLM-Backend. Orchestrierung, Failure Injection und Recovery bleiben testbar.",
      },
    ],
  },
  howIWork: {
    index: "04",
    eyebrow: "Wie ich AI-Systeme baue",
    title: "Evaluation, Human-in-the-loop, Security, Observability.",
    description:
      "Vier Prinzipien. Jedes ist in öffentlichen Repos oder in regulierter Enterprise-Delivery beobachtbar. Keine erfundenen Framework-Namen.",
    items: {
      evaluation: {
        title: "Evaluation",
        line: "Abnahme über Tests, CI und prüfbaren Zustand. Zahlen erst mit einem reproduzierbaren Harness.",
        body: "Abnahme über Tests, CI, Checklisten und beobachtbare Zustände. Kein Modellaufruf ohne prüfbares Artefakt. Quantitative Kennzahlen erst, wenn ein reproduzierbarer Harness steht.",
      },
      hitl: {
        title: "Human-in-the-Loop",
        line: "Agents liefern Artefakte. Ein Mensch nimmt ab.",
        body: "Agents liefern Artefakte zur menschlichen Bewertung. Keine autonomen Schreibzugriffe, keine automatisch vertrauenswürdigen Entscheidungen.",
      },
      security: {
        title: "Sicherheit",
        line: "Identity, Berechtigungen, synthetische Demos. Auslieferung vor Geschwindigkeit.",
        body: "2FA, RBAC, Identity und DSGVO aus Enterprise-Delivery. Öffentliche Demos nutzen synthetische oder dokumentierte Beispieldaten. Verantwortliche Auslieferung vor Geschwindigkeit.",
      },
      observability: {
        title: "Observability",
        line: "Was man nicht sehen kann, skaliert nicht.",
        body: "Prometheus, Grafana, Dynatrace in der Banklieferung; schrittweise Snapshots im Simulator. Verhalten muss sichtbar sein, bevor es skaliert.",
      },
    },
  },
  consulting: {
    eyebrow: "Beratung & Governance",
    title: "Was sich aus echter Delivery übertragen lässt — ohne Board-Fiction.",
    body: "Use Cases dort priorisieren, wo Systeme, Identität und Datenqualität schon tragen. Betriebsmodell: Agents mit Vertrag und Abnahme, nicht als autonome Organisation. Governance aus regulierter Delivery (Berechtigungen, sensible Daten, DSGVO) plus EU-AI-Act-Rahmen aus der Spezialisierung — keine erfundenen Vorstandsmandate, keine erfundenen AI-KPIs.",
  },
  credentials: {
    index: "05",
    eyebrow: "Nachweise",
    title: "KI-Manager und AI Automation stützen die Spezialisierung — sie tragen sie nicht.",
    description:
      "Weiterbildung 2026 und öffentliche Repos belegen den Fokus. Die Seniorität steht in der Enterprise-Erfahrung. Nachweise ersetzen keine bezahlte AI-Kundenlieferung.",
    cv: "Lebenslauf",
    github: "GitHub",
    highlights: [
      { title: "KI-Manager", meta: "2026 · Akademie für die Deutsche Wirtschaft" },
      { title: "AI Automation", meta: "2026 · STARTPLATZ Köln" },
    ],
    educationNote: "Ausbildung und Weiterbildung folgen darunter. Sie sind Nachweise, nicht der primäre Erfahrungsbeweis.",
  },
  privacy: {
    label: "Daten- und Entscheidungshaltung",
    body: "Öffentliche Demos nutzen synthetische oder dokumentierte Beispieldaten. KI-Ausgaben sind keine automatisch vertrauenswürdigen Entscheidungen. Kritische Pfade brauchen Validierung und Human-in-the-Loop.",
  },
  caseFields: {
    problem: "Problem / Geschäftskontext",
    context: "Kontext",
    decision: "Entscheidung / Trade-off",
    outcome: "Wirkung",
    role: "Rolle & Verantwortung",
    evidence: "Belege",
    ownWork: "Eigener Anteil",
    contribution: "Mein Anteil",
    transfer: "Enterprise-Übertragbarkeit",
    architecture: "Architektur",
    evaluation: "Evaluation, Guardrails, Failure Handling",
    repo: "Repository",
    demo: "Live-Demo",
    embed: "Auf dieser Site",
    live: "Live",
  },
  caseMeta: {
    status: "Status",
    timeframe: "Zeitraum",
    team: "Team",
    data: "Daten",
    code: "Code",
    result: "Ergebnis",
    statusValues: {
      production: "Produktion",
      prototype: "Prototyp",
      lab: "Independent R&D",
      rnd: "Independent R&D",
      research: "Research",
    },
    teamValues: {
      solo: "Solo",
      team: "Team",
    },
    dataValues: {
      real: "echte Daten (nicht öffentlich)",
      anon: "anonymisiert",
      synthetic: "synthetisch / Demo",
    },
    codeValues: {
      public: "öffentlich",
      excerpt: "Auszug",
      private: "privat / NDA",
    },
    resultValues: {
      measured: "gemessen",
      observed: "beobachtet",
      pending: "ausstehend",
    },
  },
  casePage: {
    back: "Zurück zum Portfolio",
    caseStudy: "Fallstudie",
    openCase: "Case ansehen",
    screenshots: "Screenshots",
    noPublicShots: "Keine öffentlichen Screenshots — Client-NDA; Evidence bleibt qualitativ und über die Projektbeschreibung belegt.",
    next: "Weitere Cases",
    moreAi: "AI Cases",
    evalInProgress: "Evaluation läuft",
    evalInProgressNote:
      "Die Architektur steht; quantitative Ergebnisse werden erst veröffentlicht, sobald eine reproduzierbare Messbasis vorliegt.",
    evalToMeasure: "künftig messen",
    related: "Zugehörige Mandate",
    moreEnterprise: "Enterprise Cases",
  },
  cases: {
    "graph-mastermind": {
      domain: "Agentic Software Engineering · Repository Intelligence",
      badge: "Independent R&D · Agentic AI",
      landingTitle: "Agentic Engineering für gewachsene Codebasen",
      landingCta: "Agentic-AI-Case ansehen",
      oneLiner:
        "Ein agentischer Engineering-Workflow analysiert bestehende Repositories, plant Änderungen, arbeitet mit Entwicklungswerkzeugen und Tests und lässt kritische Ergebnisse separat evaluieren.",
      honesty: "Independent R&D — Agent-Paket für Coding Agents, kein festgeschriebenes LLM, kein Kundenbetrieb.",
      pageTitle: "Agentic Engineering für gewachsene Codebasen | Peter Henrichs",
      pageDescription:
        "Independent R&D: agentischer Workflow für gewachsene Repositories. AGENT.md, SPEC.md und CHECKLIST.md als Arbeitsvertrag. Kein vorgeschriebenes LLM, keine erfundenen KPIs.",
      context:
        "Independent Applied AI R&D, 2026. In großen, historisch gewachsenen Softwaresystemen fließt erhebliche Entwicklungszeit in Codeverständnis, Fehlerlokalisierung und die Absicherung von Änderungen.",
      problem:
        "Ziel war nicht „Code von einem LLM schreiben zu lassen“, sondern einen kontrollierbaren Engineering-Prozess für komplexe Aufgaben zu entwerfen. Repository-Strukturen liegen über Dateibäume, Imports und Dokumentation verteilt.",
      contribution:
        "Architektur des Workflows, Agentenrollen, Tool-Integration, Modell-/Kontextstrategie, Evaluationsschleifen und technische Implementierung — Solo, eigenständig konzipiert und umgesetzt.",
      decision:
        "Wiederverwendbares Agent-Paket: ein Coding Agent erhält über AGENT.md, SPEC.md und CHECKLIST.md einen expliziten Arbeits- und Abnahmevertrag. Er untersucht das Zielrepository, leitet Komponenten und Beziehungen ab und erzeugt eine interaktive Architekturansicht. Vertrag, Datenmodell, Visualisierungsruntime und UI bleiben getrennt. Ein bestimmtes LLM wird bewusst nicht vorausgesetzt.",
      architecture:
        "Aufgabe / Issue → Planner-Vertrag (AGENT.md / SPEC.md / CHECKLIST.md) → Repository-Kontext und Tools → Artefakt (Graph / Architekturansicht) → Tests und Checkliste → menschliche Bewertung. Kein Backend, kein vorgeschriebenes LLM, keine autonomen Schreibzugriffe.",
      architectureSteps: [
        "Aufgabe / Issue",
        "Planner / Vertrag",
        "Repo-Kontext + Tools",
        "Artefakt + Checks",
        "Menschliche Prüfung",
      ],
      outcome:
        "Öffentliches Agent-Paket, Live-Demo, Tests, Typecheck, CI und reproduzierbarer Production-Build. Qualitativ beobachtet: nachvollziehbare Artefakte statt Black-Box-Analyse. Keine erfundenen Nutzungs- oder Business-KPIs.",
      role: "Solo — Konzeption und Umsetzung des wiederverwendbaren Agent-Workflows und der Referenzanwendung. Independent R&D, kein Kundeneinsatz.",
      evaluation:
        "Evaluation läuft. Abnahme heute über CHECKLIST.md, Typecheck, Tests und CI. Der Agent liefert einen prüfbaren Graphen — ein Mensch bewertet das Ergebnis (Human-in-the-Loop). Quantitative Kennzahlen werden erst veröffentlicht, sobald ein reproduzierbarer Eval-Harness steht.",
      evalStatus: "in-progress",
      evalMetrics: [
        { metric: "Time-to-reproduce", note: "Zeit, bis ein Fehler reproduzierbar ist" },
        { metric: "Failing-test-first rate", note: "Anteil der Bugs mit reproduzierendem Test" },
        { metric: "Patch acceptance", note: "Anteil akzeptierter Agentenänderungen" },
        { metric: "Human review time", note: "menschlicher Review-Aufwand" },
        { metric: "Regression rate", note: "neu verursachte Fehler" },
        { metric: "Token / Cost per accepted change", note: "Wirtschaftlichkeit" },
      ],
      transfer:
        "Derselbe Ansatz lässt sich auf Legacy-Modernisierung, Incident Analysis, Testgenerierung und kontrollierte Code-Migration übertragen. Nicht behauptet: produktiver Einsatz bei einem Kunden oder ein vorgeschriebenes LLM.",
      highlights: [
        "Agentenvertrag aus AGENT.md / SPEC.md / CHECKLIST.md",
        "Generische Anwendung auf fremde Repositories",
        "React/TypeScript + d3-force, Tests und CI als Abnahme",
      ],
      screenshotAlts: {
        overview: "Force-Layout der Referenz-App: Kantenlabels und Toolbar",
        detail: "Detailpanel an einem ausgewählten Knoten",
        search: "Suche dimmt Nicht-Treffer, Runtime-Schicht bleibt lesbar",
      },
    },
    "agent-collective": {
      domain: "AI Automation · Testbare Multi-Agent-Orchestrierung",
      badge: "Independent R&D · deterministisch · kein LLM-Backend",
      landingTitle: "Nachvollziehbare Multi-Agent-Orchestrierung",
      landingCta: "Orchestrierungs-Case ansehen",
      oneLiner:
        "Ein deterministischer Multi-Agent-Simulator macht Zustände, Quality Gates und Eskalationen sichtbar — bewusst ohne LLM-Backend, damit Orchestrierung und Fehlermodi testbar bleiben.",
      honesty:
        "Deterministischer Multi-Agent-Simulator — kein LLM-Backend, kein Tool-Calling-Stack, kein Kundenbetrieb.",
      pageTitle: "Prüfbare Multi-Agent-Orchestrierung für Prozesse | Peter Henrichs",
      pageDescription:
        "Independent R&D: deterministischer Multi-Agent-Simulator ohne LLM-Backend. State-Machine, Failure Injection, Recovery, Vitest. Keine erfundenen Automations-KPIs.",
      context:
        "Independent Applied AI R&D, 2026. Prozessautomation braucht sichtbare Zustände, Validation und einen menschlichen Ausweg — nicht eine Chatoberfläche, die Systemverhalten versteckt.",
      problem:
        "Multi-Agent-Demos verstecken Zustände, Fehler, Ressourcen und Recovery häufig hinter Chat-UIs. Ohne prüfbare Orchestrierung bleibt unklar, wann ein Schritt automatisch laufen darf und wann ein Mensch eingreifen muss.",
      contribution:
        "Workflow-Architektur, Rollenmodell, Failure Injection, Quality Gates in der Engine, Observability über Snapshots und die technische Implementierung — Solo, eigenständig konzipiert und umgesetzt.",
      decision:
        "TypeScript-State-Machine mit sechs Rollen, Workflow-Graph, Failure Injection, Recovery und seeded RNG für reproduzierbare Runs. Die Simulationsschicht ist von der UI getrennt. Bewusst kein reales LLM, damit Orchestrierung und Fehlermodi testbar bleiben.",
      architecture:
        "Input / Aufgabe → Rollen in der Engine → Structured State → Validation / Failure Injection → automatischer Schritt oder Human Review → Audit / Observability. Reine TypeScript-Engine besitzt den Weltzustand; die UI rendert nur. Kein LLM, keine erfundenen Extraktionsraten.",
      architectureSteps: [
        "Input / Aufgabe",
        "Rollen / Engine",
        "Structured State",
        "Validation",
        "Action oder Human",
      ],
      outcome:
        "Live-Dashboard, Vitest/CI, schrittweise ausführbare Systemzustände. Qualitativ beobachtet: Failure Recovery und Observability sind prüfbar, nicht nur behauptet. Keine erfundenen Durchsatz- oder Dokument-KPIs.",
      role: "Solo — Konzeption und Umsetzung der testbaren Engine, des Workflow-Graphen und des Live-Dashboards. Independent R&D, kein Kundeneinsatz.",
      evaluation:
        "Evaluation über Vitest und reproduzierbare seeded Runs. Failure Injection und Recovery sitzen in der Engine, nicht in der UI. Bewusst kein LLM und kein Tool-Calling. Steuerung und Interpretation liegen beim Menschen (HITL). Daten sind synthetisch. Business-Kennzahlen werden nicht erfunden.",
      evalStatus: "observed-qualitative",
      evalMetrics: [
        { metric: "Reproduzierbare Runs", note: "seeded RNG, Vitest ohne Browser — vorhanden, nicht als Kunden-KPI ausgewiesen" },
        { metric: "Failure-Recovery-Sichtbarkeit", note: "ob ein injizierter Fehler beobachtbar und behandelbar ist" },
        { metric: "Human-Escalation-Pfad", note: "wann Steuerung beim Menschen bleibt" },
        { metric: "Automationsgrad", note: "künftig messen, sobald ein produktiver Prozess angebunden ist" },
      ],
      transfer:
        "Übertragbar: Orchestrierung, Reliability, Validation, Human-in-the-loop und beobachtbare Agentensysteme. Nicht behauptet: produktive LLM-Plattform, Dokument-Extraktion oder Kundenbetrieb.",
      highlights: [
        "Deterministische Engine, reproduzierbare seeded Runs",
        "Failure Injection und Recovery",
        "Auf dieser Site unter /multi-agent/ eingebettet",
      ],
      screenshotAlts: {
        hero: "Dashboard: Live-Graph, Metriken und Task Board",
        graph: "Knotengraph mit idle- und working-Agenten",
        events: "Externe Events: Shortage, Markt, gezielter Agent-Failure",
      },
    },
    deutschlandcard: {
      domain: "Loyalty · Cloud · Identity",
      badge: "Berufliche Nachweise · Enterprise",
      landingTitle: "Cloud, Identität, Integration",
      landingCta: "Enterprise-Case ansehen",
      oneLiner:
        "Bezahlte Cloudifizierung des bundesweiten Loyalty-Programms: Azure AD B2C, Terraform, Kubernetes. Genau dieser Identity-/API-/Cloud-Boden ist der Burggraben für spätere AI-Integration — der Case selbst ist kein AI-Projekt.",
      honesty: "Kein AI-/LLM-Bestandteil im veröffentlichten Case. Keine Volumen- oder Latenzzahlen (NDA).",
      contribution:
        "Login-Journey auf Azure AD B2C, Terraform-Automatisierung und Cloudifizierung von Services — Entwickler im Team, bezahlte Lieferung.",
      pageTitle: "DeutschlandCard — Cloud, Identity, Terraform | Peter Henrichs",
      pageDescription:
        "Enterprise-Cloudifizierung des bundesweiten Bonusprogramms: Azure AD B2C, Terraform, Kubernetes. Kein AI-Bestandteil, keine erfundenen Volumenkennzahlen.",
      context:
        "Bundesweites Loyalty-Programm (direct services Gütersloh, 2023–2026). Partner-Onboarding, Echtzeit-Punkte und Kampagnen mussten in eine kontrollierbare Cloud, ohne bestehende Partner-Schnittstellen abzuschneiden.",
      problem:
        "Backend- und Schnittstellenarchitektur für Partner-Onboarding, Echtzeit-Punktetransaktionen und personalisierte Kampagnen musste in eine skalierbare Cloud-Umgebung.",
      decision:
        "Cloudifizierung nach Azure; individuelle Azure-AD-B2C-Login-Journey; Infrastruktur über Terraform, damit Identity, Delivery und bestehende Partner-Schnittstellen kontrollierbar bleiben — statt eines Big-Bang-Schnitts.",
      architecture:
        "Spring-Boot-/Cloud-Services, Azure AD B2C als Identity-Schicht, Terraform für reproduzierbare Infrastruktur, Kubernetes/Azure als Laufzeit. Partner-APIs bleiben anschlussfähig — Cloudifizierung statt Big-Bang-Schnitt.",
      architectureSteps: [
        "Partner-APIs",
        "Spring Cloud Services",
        "Azure AD B2C",
        "Terraform / Kubernetes / Azure",
      ],
      outcome:
        "Services in einer skalierbaren Azure-Umgebung; bestehende Schnittstellen weiter nutzbar. Beobachtet in der Delivery, nicht öffentlich gemessen. Keine Volumen- oder Latenzzahlen (NDA).",
      role: "Entwickler im Team — Login-Journey, Terraform-Automatisierung, Cloudifizierung von Services. Bezahlte Enterprise-Lieferung.",
      evaluation:
        "Keine öffentlichen AI-Evaluationsmetriken — der Case hat keinen AI-/LLM-Bestandteil. Bewertung über Identity (Azure AD B2C), reproduzierbare Infrastruktur (Terraform) und weiter nutzbare Partner-APIs. Kritische Zugänge bleiben in bestehenden Berechtigungs- und Betriebswegen.",
      transfer:
        "Übertragbar: Identity, APIs, Cloud und Governance sind der Boden, in den Agents später eingebettet werden müssen. Der Case selbst ist kein AI-Projekt und wird nicht als solches dargestellt.",
      highlights: [
        "Individuelle Login-Journey auf Azure AD B2C",
        "Terraform-automatisierte Cloud-Infrastruktur",
        "Cloudifizierung ohne Big-Bang-Ablösung der Partner-APIs",
      ],
    },
    "dz-bank-okvp": {
      domain: "Banking · Platform Engineering · Observability",
      honesty: "Kein AI-/LLM-Bestandteil im veröffentlichten Case.",
      contribution:
        "Lead-Dev/DevOps im Team: Entkopplung in unabhängig auslieferbare Features, OpenShift-Pipelines, Observability. Bezahlte Lieferung.",
      pageTitle: "DZ BANK OKVP — Lead-Dev, Migration, Observability | Peter Henrichs",
      pageDescription:
        "Migration der Fiducia-&-GAD-Vertriebsplattformen auf OKVP: entkoppelte Features, OpenShift-Pipelines, Prometheus/Grafana/Dynatrace. Kein AI-Bestandteil.",
      context:
        "DZ BANK / adesso, 2020. Vertriebsplattformen von Fiducia & GAD sollten auf die neue SDK-/Microservice-Plattform OKVP — mit Lead-Dev-Verantwortung für Entkopplung, Delivery und Betriebssichtbarkeit.",
      problem:
        "Gewachsene Vertriebsplattformen von Fiducia & GAD mussten auf eine neue SDK-/Microservice-Plattform (OKVP).",
      decision:
        "Entkopplung in unabhängig auslieferbare „Features“; Multi-Stage-Pipelines auf OpenShift; Observability mit Prometheus, Grafana und Dynatrace. Lead-Dev-/DevOps-Verantwortung statt reiner Feature-Lieferung.",
      architecture:
        "OKVP zerlegt gewachsene Vertriebsplattformen in unabhängig auslieferbare Features. Delivery über mehrstufige OpenShift-Pipelines; Service Discovery über Consul; Observability mit Prometheus, Grafana und Dynatrace.",
      architectureSteps: [
        "Fiducia & GAD Plattformen",
        "OKVP Features",
        "OpenShift / Consul",
        "Prometheus / Grafana / Dynatrace",
      ],
      outcome:
        "Entkoppelte Features, kontrollierte Delivery, produktionsnahe Observability. Beobachtet in der Delivery. Keine veröffentlichten Performance-Metriken.",
      role: "DevOps / Entwickler / Lead-Dev im Team. Bezahlte Enterprise-Lieferung.",
      evaluation:
        "Keine öffentlichen AI-Metriken — kein AI-/LLM-Bestandteil. Bewertung über unabhängig auslieferbare Features, Multi-Stage-Pipelines und Observability (Prometheus, Grafana, Dynatrace). Fehlermodi sind Betriebssicht, nicht Prompt-Sicht.",
      transfer:
        "Übertragbar: wer Agents in Produktion bringen will, muss Deployment, Monitoring und Fehlermodi bestehender Systeme verstehen. Der Case selbst ist kein AI-Projekt.",
      highlights: [
        "Unabhängig entkoppelbare Microservices („Features“)",
        "Mehrstufige OpenShift-Build-Pipelines",
        "Observability: Prometheus, Grafana, Dynatrace",
      ],
    },
    "bitmarck-bitgo": {
      domain: "GKV · Legacy-Modernisierung · Security",
      honesty: "Kein AI-/LLM-Bestandteil im veröffentlichten Case.",
      contribution:
        "Berater/Entwickler im Team: Backend, REST zu Bestandssystemen, Legacy-Entkopplung, 2FA für besonders geschützte Daten. Bezahlte Lieferung.",
      pageTitle: "BITMARCK bitGo_Web — GKV-Modernisierung, Security, 2FA | Peter Henrichs",
      pageDescription:
        "Regulierte GKV-Online-Geschäftsstelle: Legacy-Entkopplung, REST zu Bestandssystemen, 2FA für besonders geschützte Daten. Kein AI-Bestandteil.",
      context:
        "BITMARCK Technik, 2019–2020. Digitale Kanäle gesetzlicher Krankenkassen (Online-Geschäftsstelle) im Zusammenspiel mit BITMARCK_21c|ng: Legacy, besonders geschützte Daten, hohe Sicherheitsanforderungen.",
      problem:
        "Digitale Kanäle gesetzlicher Krankenkassen als Online-Geschäftsstelle im Zusammenspiel mit BITMARCK_21c|ng — Legacy, sensible Daten, hohe Sicherheitsanforderungen.",
      decision:
        "Module aus der Legacy-Landschaft entkoppeln; REST-Schnittstellen zu Bestandssystemen; 2FA für besonders geschützte Daten; konfigurierbares Frontend für Kassen-Redakteure statt eines monolithischen Redesigns.",
      architecture:
        "bitGo_Web sitzt vor BITMARCK_21c|ng und Legacy-Bestand. REST-Schnittstellen und 2FA koppeln die Online-Geschäftsstelle an sensible Daten, ohne den Monolithen in einem Wurf zu ersetzen. Das Frontend ist für Kassen-Redakteure konfigurierbar.",
      architectureSteps: [
        "Kassen-Redakteure",
        "bitGo_Web + 2FA",
        "REST zu Bestand",
        "21c|ng / Legacy",
      ],
      outcome:
        "Technische Neustrukturierung mit 2FA und entkoppelten Schnittstellen. Beobachtet in der Delivery. Keine öffentlichen Durchsatzzahlen.",
      role: "Berater / Entwickler im Team — Backend, REST, Legacy-Entkopplung, 2FA. Bezahlte Enterprise-Lieferung.",
      evaluation:
        "Keine öffentlichen AI-Metriken — kein AI-/LLM-Bestandteil. Bewertung über 2FA für besonders geschützte Daten, REST an Bestandssysteme und ein konfigurierbares Frontend statt eines monolithischen Schnitts. Kritische Pfade bleiben in bestehenden Sicherheitswegen.",
      transfer:
        "Übertragbar: Berechtigungen, Legacy und sensible Daten sind oft das eigentliche Problem von AI Transformation — nicht das Modell. Der Case selbst ist kein AI-Projekt.",
      highlights: [
        "2FA für besonders geschützte Daten und Formulare",
        "REST-Schnittstellen in eine Legacy-Landschaft",
        "Konfigurierbares Frontend für Kassen-Redakteure",
      ],
    },
    "maerz-ihe-box": {
      domain: "Healthcare-ECM · Interoperabilität",
      problem:
        "Konsistente, patientenzentrierte und datenschutzgerechte Kommunikation zwischen heterogenen Healthcare-Systemen.",
      decision:
        "IHE-nahe Integrations- und Terminologiearbeit mit InterSystems IRIS, HL7/FHIR und Docker — Semantik und Systemgrenzen vor Schnelligkeit.",
      outcome:
        "Produktionsnahe Healthcare-Integrations- und Terminologiearbeit, u. a. mit Fraunhofer.",
      highlights: [
        "Interoperabilitäts-Schnittstellen zwischen Gesundheitssystemen",
        "Docker-Container und eigene Compose-Skripte",
        "Betrieb des semantischen Servers mit Fraunhofer",
      ],
    },
    "bwi-lzs": {
      domain: "Wehrnahe Lizenzierung · Authorization",
      problem:
        "Zentrale Verwaltung von Lizenz-, Nutzungs- und Dokumentdaten für Luftfahrtpersonal mit selektiven Rechten bis auf Datenfeldebene.",
      decision:
        "Modulare Architektur und feingranulare Autorisierung statt grober Rollen — wer darf welches Feld lesen oder schreiben?",
      outcome:
        "Funktionale Integration in bestehende Bundeswehr-IT und datenfeine Berechtigungslogik.",
      highlights: [
        "Selektives Lesen/Schreiben bis auf Datenelement-Ebene",
        "Schnittstellen in die IT-Landschaft der Bundeswehr",
        "Weiterentwicklung des Frontend-Webservers",
      ],
    },
    "ego-workshop": {
      domain: "Automotive · E-Fahrzeug",
      problem: "Werkstattabwicklung für Kunde und Werkstatt vereinfachen.",
      decision:
        "Java-Microservice-Architektur, containerisiert auf Kubernetes — Betriebsfähigkeit vor Feature-Breite.",
      outcome: "Containerisierte Workshop-Services für das Elektroauto e.GO.",
      highlights: [
        "Werkstatt-Service auf Java-Webservice-Architektur",
        "Java-Anwendungen in einer Microservice-Architektur",
        "Containerisierte Auslieferung auf Kubernetes",
      ],
    },
    "ella-portals": {
      domain: "Medien / Verlagswesen · Verantwortung",
      problem:
        "Aufbau, Betrieb und Weiterentwicklung mehrerer Verlagsprodukte und interner Prozesse.",
      decision:
        "End-to-end-Verantwortung über Entwicklung, Design, Betrieb und interne IT — Verantwortung statt nur Auslieferung.",
      outcome:
        "Sechs langfristig betriebene Webangebote plus individuelle Subscriptions-, Webpaper-, Datenbank- und Intranetlösungen.",
      highlights: [
        "Sechs Live-Portale end-to-end verantwortet",
        "Individuelle Abo-Formulare, Web-Paper, Firmendatenbanken",
        "Individuelles Intranet für interne Abläufe",
      ],
    },
  },
  competencies: {
    index: "04",
    eyebrow: "Fähigkeiten",
    title: "Fünf Gruppen — nicht eine Skill-Wand.",
    line: "Strategie, Architektur, Agentic Engineering, Umsetzung, Governance.",
    description:
      "Strategie, Architektur, Agentic Engineering, Umsetzung, Governance. Der detaillierte Stack ist Nachweis, nicht Identität — und steht nicht auf der Startseite.",
    pillars: [
      {
        title: "Strategie",
        body: "Use Cases dort, wo Systeme, Identität und Datenqualität schon tragen. AI als Schicht auf bestehender Landschaft — nicht als Tool-erste Identität.",
      },
      {
        title: "Architektur",
        body: "Java/Spring, REST, Identity, Messaging, Cloud. Systeme, die schon da sind, nicht Greenfield-Demos.",
      },
      {
        title: "Agentic Engineering",
        body: "Agent-Verträge, Repository-Intelligence, testbare Multi-Agent-Orchestrierung, LLM-gestützte Entwicklung. Öffentlich belegbar, ohne Modell- oder MCP-Claims.",
      },
      {
        title: "Umsetzung",
        body: "CI/CD, Terraform, Kubernetes, OpenShift, Lead-Dev-Ownership. Entkopplung ohne Big Bang. Was in Produktion überlebt.",
      },
      {
        title: "Governance",
        body: "DSGVO, EU AI Act, 2FA, feingranulare Berechtigungen, HITL, regulierte Daten. Guardrails vor Geschwindigkeit.",
      },
    ],
  },
  stack: {
    index: "04",
    eyebrow: "Tech-Stack · in Projekten bewährt",
    title: "Nach Funktion gewichtet, nach Ära filterbar.",
    description:
      "Seit 2010. Nichts Angestrebtes — jeder Eintrag ist in einem Produktionsprojekt, Portal-Aufbau oder öffentlichen Referenzrepo ausgeliefert.",
    filterAria: "Tech-Stack nach Ära filtern",
    filters: {
      all: "Alles",
      builder: "2013–17 · Builder",
      enterprise: "2018–25 · Enterprise",
      ai: "2026 · Agentic AI",
    },
    countTemplate: "{n} Technologien",
    moreLabel: "Weitere ausgelieferte Technologien",
    groups: {
      agentic: {
        label: "Agentic AI & Automation",
        hint: "Aktuelle Spezialisierung — öffentlich belegbar",
      },
      enterprise: {
        label: "Enterprise-Architektur & Integration",
        hint: "Services, APIs, Identity, Messaging",
      },
      cloud: {
        label: "Cloud & Platform Engineering",
        hint: "Build, Ship, Run, Observe",
      },
      governance: {
        label: "Governance & Regulated Systems",
        hint: "Recht, Identity, sensible Domänen",
      },
      engineering: {
        label: "Software Engineering",
        hint: "Sprachen, Tests, Quality Gates",
      },
      "integration-health": {
        label: "Integration & Health",
        hint: "Messaging, Interoperabilität, reguliertes Gesundheitswesen",
      },
      "frontend-cms": {
        label: "Frontend, CMS & weitere Auslieferung",
        hint: "Oberflächen und ergänzende Plattformen",
      },
    },
  },
  industries: {
    eyebrow: "Enterprise-Domänen",
    title: "Regulierte und operative Landschaften — ohne Logo-Tapete.",
    line: "adesso · Finanzwesen · Öffentlicher Sektor · Gesundheitswesen · Loyalty",
    names: [
      "Banken",
      "Öffentlicher Sektor",
      "Gesundheitswesen / GKV",
      "Loyalty",
      "Versicherung",
      "Automotive",
    ],
    healthLabel: "Gesundheitswesen (Detail, nachgeordnet)",
  },
  experience: {
    index: "02",
    eyebrow: "Berufserfahrung · bezahlte Enterprise-Arbeit",
    title: "Berufliche Stationen — der Deep-Dive im CV, hier nur der Kontext.",
    description:
      "2013 bis 2026 in produktiven, bezahlten Einsätzen. Das ist Berufserfahrung. Graph-Mastermind und Agent Collective stehen im Lab, nicht in dieser Liste. Weiterbildungen 2026 stehen unter Nachweise, nicht als erster Jobbeweis.",
    filterAria: "Berufserfahrung nach Ära filtern",
    filters: {
      all: "Alle Stationen",
      enterprise: "Enterprise · 2018–26",
      builder: "Builder · 2013–17",
    },
    eraNames: {
      all: "alle Ären",
      enterprise: "2018–2026 · Enterprise",
      builder: "2013–2017 · Builder",
    },
    compactNote: "Kompakte Station — Einsatz belegt; kein öffentliches Projektdossier.",
    countTemplate: "{shown} / {total} Stationen · {era}",
    entries: {
      "direct-services-deutschlandcard": {
        role: "Entwickler",
        project: "DeutschlandCard — bundesweites Bonusprogramm",
        mission:
          "Backend- und Schnittstellen-Architektur für Partner-Onboarding, Echtzeit-Punktetransaktionen und personalisierte Kampagnen weiterentwickeln — für Performance, Sicherheit und Skalierbarkeit.",
        tasks: [
          "Individuelle Login-Journey auf Azure AD B2C",
          "Terraform-Skripte für automatisierte Cloud-Infrastruktur",
          "Cloudifizierung der DeutschlandCard-Services in eine skalierbare Azure-Umgebung",
        ],
      },
      aleri: {
        role: "Entwickler",
        mission: "Backend-Entwicklungseinsatz.",
        tasks: [],
      },
      "nextgen-itzbund-push": {
        role: "Berater / Fullstack-Entwickler",
        project: "ITZBund — Mobile-Push-App",
        mission: "APIs zwischen mobilen Endgeräten und behördlichen Fachverfahren.",
        tasks: ["Jenkins Shared Libraries", "OAuth2-Authentifizierungs-Workflow"],
      },
      "nextgen-bwi-lzs": {
        role: "Berater / Fullstack-Entwickler",
        project: "BWI / Luftwaffe — Zentrales Lizenzierungssystem (LZS)",
        mission:
          "Zentrales Abrufen / Anlegen / Ändern / Löschen von Lizenzen für Luftfahrtpersonal beim Luftfahrtamt der Bundeswehr — Meta-, Nutzungsdaten und Dokumente, mit feingranularem RBAC bis auf Datenelement-Ebene.",
        tasks: [
          "Schnittstellen in die IT-Landschaft der Bundeswehr",
          "Weiterentwicklung des Frontend-Webservers",
          "Modulare Architektur mit selektivem Lesen/Schreiben bis auf das einzelne Datenelement",
        ],
      },
      "nextgen-maerz-ihe": {
        role: "Berater / Entwickler",
        project: "März Internetwork Services AG — März IHE BOX",
        mission:
          "Medizinisches Enterprise Content Management (IHE): eine schnelle, vollständige, konsistente, patientenzentrierte und datenschutzkonforme Architektur für Kommunikation und Archiv im Gesundheitswesen.",
        tasks: [
          "Interoperabilitäts-Schnittstellen zwischen Gesundheits-Softwaresystemen",
          "Docker-Container und eigene Compose-Skripte",
          "Betrieb des semantischen (Terminologie-)Servers in enger Zusammenarbeit mit Fraunhofer",
        ],
      },
      "adesso-dz-bank-okvp": {
        role: "DevOps / Entwickler / Lead-Dev",
        project: "DZ BANK AG — Migration der Vertriebsplattformen (OKVP, Kundenfokus 2020)",
        mission:
          "Vertriebsplattformen von Fiducia & GAD auf das neue OKVP migrieren; SDK-basierte Komponenten mit fachlicher Steuerung durch die DZ BANK.",
        tasks: [
          "Code, der Frontend-Daten ins Backend übernimmt und per REST an bestehende Systeme übergibt",
          "Redesign kleiner, unabhängig entkoppelbarer Microservices („Features“)",
          "OpenShift-Umgebungsmanagement und mehrstufige Build-Pipelines",
        ],
      },
      "adesso-amp": {
        role: "Berater / Entwickler",
        project: "adesso AMP — adesso Microservice Platform",
        mission:
          "Fachliche Werkzeuge und Delivery-Know-how für Microservice-Architekturen, mit wiederverwendbaren Infrastruktur-Beispielen.",
        tasks: [
          "Beispielanwendungen planen, bauen und dokumentieren, die in späteren Projekten wiederverwendbar sind",
        ],
      },
      "adesso-bitmarck-bitgo": {
        role: "Berater / Entwickler",
        project: "BITMARCK / BMT_bitGo — Online-Geschäftsstelle der GKV",
        mission:
          "Digitale Kanäle gesetzlicher Krankenkassen als Online-Geschäftsstelle im Zusammenspiel mit BITMARCK_21c|ng; bitGo_Web vereint Geschäftsstelle und KV über einen technischen Redesign.",
        tasks: [
          "Backend-Informationsverarbeitung und REST-Schnittstellen zu Bestandssystemen",
          "Entkopplung und Redesign von Modulen aus einer Legacy-Landschaft",
          "2FA für besonders geschützte Daten und Formulare",
          "Vollständig konfigurierbares Frontend für Redakteure der Krankenkassen",
        ],
      },
      "binaris-crm": {
        role: "Berater / Entwickler",
        project: "Internes CRM-Tool für das Recruiting",
        mission: "Ein CRM-Tool für das eigene Recruiting des Unternehmens.",
        tasks: ["Automatisierte Build-Pipeline"],
      },
      "binaris-domea": {
        role: "Berater / Entwickler",
        project:
          "Elektronisches Fachverfahren für die öffentliche Verwaltung (Papier → E-Akte / DOMEA)",
        mission:
          "Die öffentliche Verwaltung von Papier auf elektronische Akten in JEE-basierten Fachanwendungen überführen.",
        tasks: [
          "Bestandskunden zu JEE-basierten Fachanwendungen in der öffentlichen Verwaltung beraten",
          "Java-Anwendungen entwerfen und implementieren",
          "Schnittstellen zu Bestandssystemen (z. B. zur Registratur einer Bundesbehörde)",
        ],
      },
      "binaris-ego": {
        role: "Entwickler / Berater",
        project: "Werkstatt-Backend für das Elektroauto „e.GO“",
        mission: "Die Werkstattabwicklung für Kunde und Werkstatt vereinfachen.",
        tasks: [
          "Konzeption und Entwicklung eines Werkstatt-Service auf einer Java-Webservice-Architektur",
          "Java-Anwendungen in einer Microservice-Architektur",
        ],
      },
      "ella-verlag": {
        role: "Techn. Projektleiter / Entwickler / Designer / Berater",
        project: "Große Webportale aufbauen und weiterentwickeln",
        mission:
          "Sechs Live-Webmagazine end-to-end verantworten und ausbauen — Aufbau, Design, individuelle Apps, Intranet und der komplette IT-Betrieb.",
        tasks: [
          "Individuelle Web-Apps: Abo-Formulare, Web-Paper, Firmendatenbanken für Vertrieb und Agenturen",
          "Individuelles Intranet zur Optimierung interner Abläufe",
          "Installation und Wartung aller Firmencomputer",
          "Erster Ansprechpartner für Software, Hardware, Netzwerk, Internet und Kommunikation",
        ],
      },
    },
  },
  education: {
    index: "06",
    eyebrow: "Ausbildung & Weiterbildung",
    title:
      "Medien-Wurzeln, Web-Programmier-Handwerk — und 2026 die Spezialisierung. Nachweise, nicht der primäre Jobbeweis.",
    focus: [
      [
        "Architektur und Implementierung autonomer, KI-gestützter System-Workflows",
        "Messbare Reduktion manuellen Aufwands",
        "KI-Agenten-Frameworks und komplexe API-Integrationen",
        "Prompt-Automation; performante, skalierbare Automations-Pipelines",
      ],
      [
        "Strategische Integration und Steuerung von KI in Unternehmen",
        "Technische Grundlagen und praktische Use Cases",
        "End-to-End-Leitung von KI-Projekten; Prompt Engineering",
        "Rechtlich / ethischer Rahmen: DSGVO, EU AI Act",
        "Change-Management und skalierbare KI-Strategien",
      ],
    ],
  },
  footer: {
    eyebrow: "Gespräch",
    title: "Ein Gespräch über AI & Agents.",
    body: "Lebenslauf, LinkedIn und GitHub liegen bereit. Agenturen platzieren über die drei Rollenpakete. Kein Freelancer-Retainer, keine freien Slots.",
    email: "E-Mail",
    linkedin: "LinkedIn",
    github: "GitHub",
    cv: "Lebenslauf (HTML)",
    cvNote:
      "HTML-Lebenslauf zum Drucken oder als PDF speichern. Eine separate PDF-Datei kann später unter /portfolio/cv/ ergänzt werden.",
    roleLine: "Senior AI Consultant & Agentic Software Engineer",
    personalNote: "",
  },
  cv: {
    title: "Lebenslauf — Peter Henrichs",
    subtitle: "Senior AI Consultant & Agentic Software Engineer",
    print: "Drucken / als PDF speichern",
    back: "Zurück zum Portfolio",
    intro:
      "10+ Jahre Enterprise Software Engineering in Köln. Jetzt angewandt auf Agentic AI, LLMs und Automation — auf dem Fundament von Java/Spring, Cloud und regulierter Integration.",
    todo:
      "TODO: optionales PDF unter public/portfolio/cv/Peter-Henrichs-CV.pdf ablegen und diesen HTML-Pfad als Fallback behalten. Keine erfundenen Drive-URLs.",
  },
};
