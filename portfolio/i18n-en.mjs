export const en = {
  meta: {
    title: "Peter Henrichs | Senior AI Consultant & Agentic Software Engineer",
    description:
      "Senior AI Consultant and software engineer with 10+ years of enterprise experience. Focus on LLMs, AI agents, automation, and enterprise integration.",
    ogAlt: "Peter Henrichs | Senior AI Consultant & Agentic Software Engineer · Cologne",
    keywords:
      "Peter Henrichs,Cologne,Senior AI Consultant,Agentic Software Engineer,Agentic AI,LLMs,AI Agents,Automation,Enterprise Engineering,Java,Spring,Cloud",
    jobTitle: "Senior AI Consultant & Agentic Software Engineer",
    personDescription:
      "Peter Henrichs is a Senior AI Consultant and Agentic Software Engineer based in Cologne. Seniority comes from 10+ years of enterprise software engineering; Agentic AI, LLMs, and automation are the current specialization on that foundation — not instead of it.",
  },
  common: {
    skipToContent: "Skip to content",
    langSwitchAria: "Switch language",
    localeName: { de: "German", en: "English" },
  },
  nav: {
    ariaPrimary: "Primary",
    toggleMenu: "Toggle menu",
    profile: "Profile",
    cases: "Cases",
    offer: "Offer",
    experience: "Experience",
    cv: "CV",
    contact: "Contact",
    talk: "Start a conversation",
  },
  theme: {
    toLight: "Switch to light mode",
    toDark: "Switch to dark mode",
  },
  hero: {
    eyebrow: "Enterprise Engineering × Agentic AI × Transformation",
    role: "Senior AI Consultant & Agentic Software Engineer",
    h1: "I build agent layers into running enterprise systems — reviewable, with human-in-the-loop.",
    location: "Cologne · Germany-wide / Remote",
    tagline:
      "Agentic workflows that dock onto enterprise software already in production — with a contract, visible state, and human acceptance.",
    proof:
      "ENGINEERING · 10+ years enterprise systems · AGENTIC AI · LLMs · Agents · Automation · INTEGRATION · APIs · Cloud · Existing IT · CONSULTING · Use Cases · Architecture · Transformation",
    proofChips: [
      { label: "ENGINEERING", body: "10+ years enterprise systems" },
      { label: "AGENTIC AI", body: "LLMs · Agents · Automation" },
      { label: "INTEGRATION", body: "APIs · Cloud · Existing IT" },
      { label: "CONSULTING", body: "Use Cases · Architecture · Transformation" },
    ],
    contextLine: "adesso · Finance · Public Sector · Healthcare · Loyalty",
    trust:
      "10+ years of enterprise engineering. Now applied to Agentic AI — not the other way around.",
    ctaPrimary: "Touch the work",
    ctaSecondary: "CV",
    ctaTertiary: "Talk about AI & agents",
    diagramTitle: "Agentic system — goal, orchestration, evaluation, human",
    diagramAlt:
      "System diagram: a goal reaches an orchestrator that talks to tools and a model. Evaluation and human review bound autonomy.",
    diagramLabels: {
      goal: "Goal",
      orchestrator: "Orchestrator",
      model: "Model",
      tools: "Tools",
      eval: "Eval",
      human: "Human",
    },
    metricLabels: [
      "Years in software development",
      "Regulated industries delivered in",
      "Enterprise engagements",
      "Live web portals owned",
    ],
    languagesLabel: "Languages",
  },
  builds: {
    eyebrow: "What I build",
    title: "An inspectable layer on the system that already runs.",
    body: "Task, artifact, acceptance. Agentic AI Solution Consulting, Enterprise AI Integration, and AI-Augmented Software Engineering are the same layer — consulting, integration, engineering — not three products and not a demo beside the IT.",
    split:
      "Independent R&D is publicly inspectable and is not client delivery. Paid enterprise work stays with what was actually delivered — including when that delivery had no AI component.",
  },
  samples: {
    collective: {
      eyebrow: "Touchable · Independent R&D",
      title: "State you can step through.",
      body: "Agent Collective is a deterministic multi-agent simulator with no LLM backend. This panel replays the public tick contract: events, task, work, handoff, review. No chat, no metrics.",
      badge: "Independent R&D · deterministic · no LLM backend",
      step: "Step",
      reset: "Reset",
      failLabel: "Show failure",
      tickLabel: "Tick",
      note: "Replay of the public contract from the repository. Not the live engine. No invented throughput or latency figures.",
      shown: "Shown: Coder, Critic, Monitor. The default collective also has Researcher, Trader, and Creative.",
      review: [
        {
          tick: "0",
          phase: "Paused",
          detail: "Clock paused at tick 0. Seeded run, no backend, no model call.",
          agents: [
            { role: "Coder", status: "idle" },
            { role: "Critic", status: "idle" },
            { role: "Monitor", status: "idle" },
          ],
        },
        {
          tick: "1",
          phase: "Events",
          detail: "Queued external events are applied. On this step the queue is empty.",
          agents: [
            { role: "Coder", status: "idle" },
            { role: "Critic", status: "idle" },
            { role: "Monitor", status: "idle" },
          ],
        },
        {
          tick: "1",
          phase: "Tasks",
          detail: "Tasks spawn to match roles: code for Coder, review for Critic. Claiming happens on the next tick.",
          agents: [
            { role: "Coder", status: "idle" },
            { role: "Critic", status: "idle" },
            { role: "Monitor", status: "idle" },
          ],
        },
        {
          tick: "2",
          phase: "Work",
          detail: "Coder claimed the code task. Progress lives in the engine, not in a chat.",
          agents: [
            { role: "Coder", status: "working" },
            { role: "Critic", status: "idle" },
            { role: "Monitor", status: "idle" },
          ],
        },
        {
          tick: "3",
          phase: "Handoff",
          detail: "Handoff along an edge. Critic works the review task — the visible gate. No LLM scores it.",
          agents: [
            { role: "Coder", status: "communicating" },
            { role: "Critic", status: "working" },
            { role: "Monitor", status: "idle" },
          ],
        },
        {
          tick: "4",
          phase: "Human",
          detail: "Critique is delivered. A human interprets it. No automatic acceptance.",
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
          phase: "Agent failure",
          detail: "Documented event: the selected agent drops its task and moves to failed. No invented outage rates.",
          agents: [
            { role: "Coder", status: "failed" },
            { role: "Critic", status: "idle" },
            { role: "Monitor", status: "idle" },
          ],
        },
        {
          tick: "6",
          phase: "Recovery",
          detail: "Recovery over the following ticks. State stays visible. Control stays with the human.",
          agents: [
            { role: "Coder", status: "recovering" },
            { role: "Critic", status: "idle" },
            { role: "Monitor", status: "idle" },
          ],
        },
      ],
    },
    graph: {
      eyebrow: "Touchable · Independent R&D",
      title: "A contract you can open.",
      body: "Graph-Mastermind is an agent package for coding agents. AGENT.md, CHECKLIST.md, and the runtime contract are the artifact. No specific LLM is prescribed.",
      badge: "Independent R&D · agent package · no prescribed LLM",
      llmLine:
        "LLM-assisted engineering only when a coding agent executes the contract. No model or MCP claims.",
      scratch:
        "Local scratch pad. A tick does not record a run and is not a client result. Evaluation in progress — there are no quantitative figures.",
      pipeline: ["Task", "AGENT.md", "Graph", "CHECKLIST", "Human"],
      tabs: [
        {
          id: "agent",
          label: "AGENT.md",
          kind: "code",
          caption: "Excerpt from the public contract. The source file is German. Not the full prompt.",
          body: "# Graph-Mastermind — Arbeitsanweisung\n\nRolle: Repo-Analytiker + Graph-Modellierer + Frontend-Umsetzer.\nAuftrag: Repository analysieren, Graph ableiten, SPA bauen.\nTypecheck und Production-Build grün machen.\n\nHarte Verbote:\n- Kein Auth.\n- Kein Pflicht-Backend.\n- Keine erfundenen Module, solange echter Kontext da ist.",
        },
        {
          id: "check",
          label: "CHECKLIST",
          kind: "checks",
          caption: "Acceptance excerpt from CHECKLIST.md. Unchecked means: not claimed as a finished run.",
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
          caption: "Runtime contract of the reference app. The UI holds only what a human toggles.",
          body: "tick  →  dirty = true\nrAF   →  draw if dirty\nidle  →  loop sleeps until an event wakes it\n\nA human reviews the artifact.\nA model is not part of the contract.",
        },
      ],
    },
  },
  offer: {
    eyebrow: "For agencies",
    title: "How to offer me",
    intro:
      "Three role packages ready to place, for example at adesso. Scope, deliverables, where it fits, engagement. No invented client outcomes, no day rates.",
    deliverables: "Deliverables",
    ideal: "Fits",
    engagement: "Engagement",
    packages: [
      {
        name: "Senior AI Consultant",
        scope:
          "Cut use cases against systems, identity, and data quality before anything is built. Consulting with a written boundary, not a tool pitch.",
        deliverables: [
          "Use-case cut: where an agent may act, and where the existing system already carries the process",
          "Architecture sketch with acceptance, Human-in-the-Loop, and explicit limits",
          "A written list of what will not be built",
        ],
        ideal:
          "Organizations with running IT that need AI assessed before it is implemented. Landscapes from prior delivery — finance, public sector, healthcare, loyalty — are the experience base, not a claimed AI mandate at those clients.",
        engagement:
          "Through the agency: time-bounded architecture accompaniment, or placement into a client team. No freelancer retainer of my own, no free slots.",
      },
      {
        name: "Agentic Engineer",
        scope:
          "Build agentic workflows: contract, tool boundaries, tests, visible state. Connect them to existing APIs and, where the system already is, to Java and Spring.",
        deliverables: [
          "Agent contract (task, artifact, acceptance) in the form of the public packages",
          "Integration cut against existing APIs, identity, and pipelines",
          "Inspectable state or a checklist — a chat transcript is not acceptance",
        ],
        ideal:
          "Teams turning a prototype into a maintainable layer. Not an unbound model product with no system boundary.",
        engagement:
          "Engineering seat on the agency’s or the client’s team. Graph-Mastermind and Agent Collective are Independent R&D references, not a product included in the engagement. Agent Collective has no LLM backend.",
      },
      {
        name: "Transformation Lead",
        scope:
          "Translate between the business, delivery, and governance. Order of work: ground (systems, permissions, data), then the agent layer.",
        deliverables: [
          "Prioritized use-case list judged against the landscape that exists",
          "Operating model: contract, acceptance, Human-in-the-Loop — not an autonomous organization",
          "Governance frame from regulated delivery (permissions, GDPR) plus an EU AI Act orientation from the 2026 specialization",
        ],
        ideal:
          "Programs that treat modernization and AI as one sequence. Not board-KPI theatre or a mandate that does not exist in public.",
        engagement:
          "Program accompaniment through the agency. Seniority comes from enterprise engineering, including adesso, banking, statutory health, and loyalty — not from an AI board seat.",
      },
    ],
  },
  record: {
    summary: "Career, credentials, profile",
    note: "Reachable, not part of the scroll story. Stations, education, and further mandates live here and in the CV.",
  },
  value: {
    index: "02",
    eyebrow: "Where I create value",
    title: "Where I can be put to work — concrete, no marketese.",
    description:
      "I understand the system that exists today. I understand what current AI can realistically do. And I can connect the two.",
    items: [
      {
        title: "Agentic AI Solution Consulting",
        body: "Find use cases, design agent architecture, and accompany prototypes and integrations — with a contract, acceptance, and explicit bounds.",
      },
      {
        title: "Enterprise AI Integration",
        body: "Connect AI to APIs, backends, identity, and existing systems. The ground is running IT, not a greenfield chat.",
      },
      {
        title: "AI-Augmented Software Engineering",
        body: "Coding agents, repository analysis, tests, and refactoring workflows — human review stays part of the architecture.",
      },
      {
        title: "AI Transformation & Use Cases",
        body: "Join business potential, feasibility, and the landscape that already exists. No board-level fiction, no invented KPIs.",
      },
      {
        title: "AI Platform & Modernization",
        body: "Shape cloud, microservices, CI/CD, and identity so a later AI layer can land on them.",
      },
    ],
  },
  about: {
    index: "07",
    eyebrow: "About",
    title: "Short, so the cases carry the work.",
    body: "I come from software engineering and have spent years making complex systems easier to understand, maintain, and automate. LLMs and agentic systems are therefore not an isolated technology trend for me, but the next evolution of software engineering and process automation. I work from Cologne — Germany-wide and remote.",
  },
  track: {
    index: "03",
    eyebrow: "Career trajectory",
    title: "Engineer → Agentic AI → Consulting. Five stations, not the CV.",
    description:
      "Seniority does not start in 2026. Agentic AI sits on paid enterprise delivery — banking, public sector, healthcare, loyalty. Details and NDA limits live on the case pages and in the CV.",
    more: "All stations in the CV",
    items: {
      builder: {
        title: "Engineer & ownership",
        body: "Six live portals end to end: build, operations, intranet. The base for later system ownership.",
      },
      enterprise: {
        title: "Enterprise engineering",
        body: "Regulated landscapes at adesso, NextGen, and binaris: banking migration, statutory-health security, government APIs, healthcare interoperability.",
      },
      deutschlandcard: {
        title: "Complex systems in production",
        body: "Cloud, identity, and integration on the nationwide loyalty program. The enterprise ground agents later have to land on.",
      },
      agentic: {
        title: "Agentic AI — Independent R&D",
        body: "Public systems for grown codebases and inspectable multi-agent orchestration. Not client operations, not an invented LLM backend.",
      },
      consulting: {
        title: "Consulting and leadership path",
        body: "AI Manager and AI Automation support the specialization. They do not replace enterprise seniority or paid AI client delivery.",
      },
    },
  },
  arc: {
    index: "00",
    eyebrow: "Proof · the through-line",
    title: "One arc, three eras — the AI layer sits on top of the backend years.",
    description:
      "Seniority is not new. The specialization is: robust Java/Spring enterprise delivery (public sector, banking, health insurance, media, automotive) → cloudification (Azure, Kubernetes, Terraform) → LLMs, AI Agents, and Automation on top of production systems.",
    nowLabel: "now",
    eras: [
      {
        title: "Builder & technical project lead",
        blurb:
          "Portals, CMS, intranet and operations in publishing. Owned six live web magazines end to end.",
      },
      {
        title: "Enterprise Engineering",
        blurb:
          "Public sector, defense-adjacent licensing, health (IHE / FHIR / GKV), dental billing, banking migration, loyalty platforms. Java, Spring, security, integration, cloud.",
      },
      {
        title: "Agentic AI & Transformation",
        blurb:
          "Public agent packages and multi-agent simulation, AI Automation and governance (GDPR / EU AI Act) — layered on 12+ years of production systems. Continuity, not a break.",
      },
    ],
  },
  selectedCases: {
    index: "01",
    eyebrow: "Selected AI & Engineering Cases",
    beatTitle: "Three pieces of work.",
    title: "Three cases — lab and enterprise labeled separately.",
    rndLine: "Independent R&D — publicly inspectable, not client delivery.",
    clientLine: "Client work under NDA: only my role and releasable technical content.",
    description:
      "Graph-Mastermind and Agent Collective are independent, publicly inspectable systems. DeutschlandCard is paid enterprise delivery. DZ BANK and BITMARCK live in the track record, not as a fourth and fifth equal card.",
    rndNote:
      "Independent R&D — conceived and delivered independently. Technical results and project status are deliberately kept separate from productive client work.",
    clientNote:
      "Client work — customer and system details are partly abstracted under NDA. Only my own role and releasable technical content are described.",
    secondaryEyebrow: "Further mandates",
    secondaryNote:
      "Healthcare interoperability, defense-adjacent licensing, automotive, and publishing — in the track record and CV, not equal homepage weight.",
  },
  lab: {
    index: "03",
    eyebrow: "Independent Applied AI R&D",
    title: "Public systems conceived independently — not client delivery, not a hobby disclaimer.",
    description:
      "Graph-Mastermind and Agent Collective show how I construct agent contracts, evaluation, failure handling, and observability. Independent R&D: inspectable, versioned, tested — and explicitly not client delivery.",
    perspectiveEyebrow: "AI Transformation Perspective",
    perspectiveTitle: "What transfers into the enterprise — and what is not claimed here.",
    perspective:
      "Transferable: governance, security, human-in-the-loop, cost bounds, evaluation, and explicit tool boundaries. Not claimed: a production LLM backend, a client agent platform, or measured board KPIs that do not exist in public.",
    items: [
      {
        id: "graph-mastermind",
        label: "Independent R&D · Agentic AI",
        body: "Agent package for coding agents. Contract, graph, and UI stay separate; no specific model is required.",
      },
      {
        id: "agent-collective",
        label: "Independent R&D · AI Automation",
        body: "Multi-agent simulator with no LLM backend. Orchestration, failure injection, and recovery stay testable.",
      },
    ],
  },
  howIWork: {
    index: "04",
    eyebrow: "How I build AI systems",
    title: "Evaluation, human-in-the-loop, security, observability.",
    description:
      "Four principles. Each is observable in public repos or in regulated enterprise delivery. No invented framework names.",
    items: {
      evaluation: {
        title: "Evaluation",
        line: "Acceptance via tests, CI, and inspectable state. Numbers only once a reproducible harness exists.",
        body: "Acceptance via tests, CI, checklists, and inspectable state. No model call without a verifiable artifact. Quantitative numbers only once a reproducible harness exists.",
      },
      hitl: {
        title: "Human-in-the-Loop",
        line: "Agents produce artifacts. A human accepts them.",
        body: "Agents produce artifacts for human review. No autonomous writes, no automatically trusted decisions.",
      },
      security: {
        title: "Security",
        line: "Identity, permissions, synthetic demos. Responsible delivery before speed.",
        body: "2FA, RBAC, identity, and GDPR from enterprise delivery. Public demos use synthetic or documented sample data. Responsible deployment before speed.",
      },
      observability: {
        title: "Observability",
        line: "What you cannot see does not scale.",
        body: "Prometheus, Grafana, Dynatrace in banking delivery; stepwise snapshots in the simulator. Behavior has to be visible before it scales.",
      },
    },
  },
  consulting: {
    eyebrow: "Consulting & Governance",
    title: "What transfers from real delivery — without board-level fiction.",
    body: "Prioritize use cases where systems, identity, and data quality already exist. Operating model: agents with a contract and acceptance, not an autonomous organization. Governance from regulated delivery (permissions, sensitive data, GDPR) plus an EU AI Act frame from the specialization — no invented board mandates, no invented AI KPIs.",
  },
  credentials: {
    index: "05",
    eyebrow: "Credentials",
    title: "KI-Manager and AI Automation support the specialization — they do not carry it.",
    description:
      "2026 continuing education and public repos evidence the focus. Seniority lives in the enterprise record. Credentials do not replace paid AI client delivery.",
    cv: "CV",
    github: "GitHub",
    highlights: [
      { title: "KI-Manager", meta: "2026 · Akademie für die Deutsche Wirtschaft" },
      { title: "AI Automation", meta: "2026 · STARTPLATZ Köln" },
    ],
    educationNote: "Education and continuing education follow below. They are credentials, not the primary experience proof.",
  },
  privacy: {
    label: "Data and decision posture",
    body: "Public demos use synthetic or documented sample data. AI outputs are not automatically trusted decisions. Critical paths need validation and human-in-the-loop.",
  },
  caseFields: {
    problem: "Problem / business context",
    context: "Context",
    decision: "Decision / trade-off",
    outcome: "Outcome",
    role: "Role & ownership",
    evidence: "Evidence",
    ownWork: "Own work",
    contribution: "My contribution",
    transfer: "Enterprise transferability",
    architecture: "Architecture",
    evaluation: "Evaluation, guardrails, failure handling",
    repo: "Repository",
    demo: "Live demo",
    embed: "On this site",
    live: "Live",
  },
  caseMeta: {
    status: "Status",
    timeframe: "Timeframe",
    team: "Team",
    data: "Data",
    code: "Code",
    result: "Result",
    statusValues: {
      production: "Production",
      prototype: "Prototype",
      lab: "Independent R&D",
      rnd: "Independent R&D",
      research: "Research",
    },
    teamValues: {
      solo: "Solo",
      team: "Team",
    },
    dataValues: {
      real: "real data (not public)",
      anon: "anonymized",
      synthetic: "synthetic / demo",
    },
    codeValues: {
      public: "public",
      excerpt: "excerpt",
      private: "private / NDA",
    },
    resultValues: {
      measured: "measured",
      observed: "observed",
      pending: "pending",
    },
  },
  casePage: {
    back: "Back to portfolio",
    caseStudy: "Case study",
    openCase: "View case",
    screenshots: "Screenshots",
    noPublicShots: "No public screenshots — client NDA; evidence stays qualitative and grounded in the engagement description.",
    next: "More cases",
    moreAi: "AI cases",
    evalInProgress: "Evaluation in progress",
    evalInProgressNote:
      "The architecture is in place; quantitative results are published only once a reproducible measurement baseline exists.",
    evalToMeasure: "to measure",
    related: "Related engagements",
    moreEnterprise: "Enterprise cases",
  },
  cases: {
    "graph-mastermind": {
      domain: "Agentic Software Engineering · Repository Intelligence",
      badge: "Independent R&D · Agentic AI",
      landingTitle: "Agentic engineering for grown codebases",
      landingCta: "View the agentic-engineering case",
      oneLiner:
        "An agentic engineering workflow inspects existing repositories, plans changes, works with development tools and tests, and keeps critical results under separate evaluation.",
      honesty: "Independent R&D — agent package for coding agents, no prescribed LLM, no client operations.",
      pageTitle: "Agentic engineering for grown codebases | Peter Henrichs",
      pageDescription:
        "Independent R&D: agentic workflow for grown repositories. AGENT.md, SPEC.md and CHECKLIST.md as the work contract. No prescribed LLM, no invented KPIs.",
      context:
        "Independent Applied AI R&D, 2026. In large, historically grown software systems, substantial engineering time goes into understanding code, locating defects, and safeguarding changes.",
      problem:
        "The goal was not “have an LLM write code”, but to design a controllable engineering process for complex work. Repository structure is spread across file trees, imports, and docs.",
      contribution:
        "Workflow architecture, agent roles, tool integration, model/context strategy, evaluation loops, and the technical implementation — solo, conceived and delivered independently.",
      decision:
        "Reusable agent package: a coding agent receives an explicit work and acceptance contract via AGENT.md, SPEC.md, and CHECKLIST.md. It inspects the target repository, derives components and relationships, and produces an interactive architecture view. Contract, data model, visualization runtime, and UI stay separate. No specific LLM is required.",
      architecture:
        "Task / issue → planner contract (AGENT.md / SPEC.md / CHECKLIST.md) → repository context and tools → artifact (graph / architecture view) → tests and checklist → human review. No backend, no prescribed LLM, no autonomous writes.",
      architectureSteps: [
        "Task / issue",
        "Planner / contract",
        "Repo context + tools",
        "Artifact + checks",
        "Human review",
      ],
      outcome:
        "Public agent package, live demo, tests, typecheck, CI, and a reproducible production build. Qualitatively observed: inspectable artifacts instead of a black-box analysis. No invented usage or business KPIs.",
      role: "Solo — design and delivery of the reusable agent workflow and the reference application. Independent R&D, not a client engagement.",
      evaluation:
        "Evaluation in progress. Acceptance today via CHECKLIST.md, typecheck, tests, and CI. The agent delivers an inspectable graph — a human reviews the result (human-in-the-loop). Quantitative numbers will be published only once a reproducible eval harness exists.",
      evalStatus: "in-progress",
      evalMetrics: [
        { metric: "Time-to-reproduce", note: "time until a defect is reproducible" },
        { metric: "Failing-test-first rate", note: "share of bugs with a reproducing test" },
        { metric: "Patch acceptance", note: "share of accepted agent changes" },
        { metric: "Human review time", note: "human review effort" },
        { metric: "Regression rate", note: "newly introduced defects" },
        { metric: "Token / cost per accepted change", note: "economics" },
      ],
      transfer:
        "The same approach transfers to legacy modernization, incident analysis, test generation, and controlled code migration. Not claimed: production use at a client, or a prescribed LLM.",
      highlights: [
        "Agent contract from AGENT.md / SPEC.md / CHECKLIST.md",
        "Generic application to unfamiliar repositories",
        "React/TypeScript + d3-force, tests and CI as acceptance",
      ],
      screenshotAlts: {
        overview: "Force layout of the reference app: edge labels and toolbar",
        detail: "Detail panel on a selected node",
        search: "Search dims non-matches; the runtime layer stays readable",
      },
    },
    "agent-collective": {
      domain: "AI Automation · Testable multi-agent orchestration",
      badge: "Independent R&D · Deterministic · no LLM backend",
      landingTitle: "Inspectable multi-agent orchestration",
      landingCta: "View the orchestration case",
      oneLiner:
        "A deterministic multi-agent simulator makes state, quality gates, and escalations visible — deliberately with no LLM backend, so orchestration and failure modes stay testable.",
      honesty:
        "Deterministic multi-agent simulator — no LLM backend, no tool-calling stack, no client operations.",
      pageTitle: "Inspectable multi-agent orchestration for processes | Peter Henrichs",
      pageDescription:
        "Independent R&D: deterministic multi-agent simulator with no LLM backend. State machine, failure injection, recovery, Vitest. No invented automation KPIs.",
      context:
        "Independent Applied AI R&D, 2026. Process automation needs visible state, validation, and a human off-ramp — not a chat UI that hides system behavior.",
      problem:
        "Multi-agent demos often hide state, failure, resources, and recovery behind chat UIs. Without inspectable orchestration it stays unclear when a step may run automatically and when a human must intervene.",
      contribution:
        "Workflow architecture, role model, failure injection, quality gates in the engine, observability via snapshots, and the technical implementation — solo, conceived and delivered independently.",
      decision:
        "TypeScript state machine with six roles, a workflow graph, failure injection, recovery, and a seeded RNG for reproducible runs. The simulation layer is separated from the UI. Deliberately no real LLM, so orchestration and failure modes stay testable.",
      architecture:
        "Input / task → roles in the engine → structured state → validation / failure injection → automatic step or human review → audit / observability. A pure TypeScript engine owns world state; the UI only renders. No LLM, no invented extraction rates.",
      architectureSteps: [
        "Input / task",
        "Roles / engine",
        "Structured state",
        "Validation",
        "Action or human",
      ],
      outcome:
        "Live dashboard, Vitest/CI, step-wise system states. Qualitatively observed: failure recovery and observability are inspectable, not just claimed. No invented throughput or document KPIs.",
      role: "Solo — design and delivery of the testable engine, workflow graph, and live dashboard. Independent R&D, not a client engagement.",
      evaluation:
        "Evaluation via Vitest and reproducible seeded runs. Failure injection and recovery live in the engine, not the UI. Deliberately no LLM and no tool-calling. Control and interpretation stay with the human (HITL). Data is synthetic. Business metrics are not invented.",
      evalStatus: "observed-qualitative",
      evalMetrics: [
        { metric: "Reproducible runs", note: "seeded RNG, Vitest without a browser — present, not claimed as a client KPI" },
        { metric: "Failure-recovery visibility", note: "whether an injected failure is observable and treatable" },
        { metric: "Human-escalation path", note: "when control stays with the human" },
        { metric: "Automation share", note: "to measure once a productive process is attached" },
      ],
      transfer:
        "Transferable: orchestration, reliability, validation, human-in-the-loop, and inspectable agent systems. Not claimed: a production LLM platform, document extraction, or client operations.",
      highlights: [
        "Deterministic engine, reproducible seeded runs",
        "Failure injection and recovery",
        "Embedded on this site at /multi-agent/",
      ],
      screenshotAlts: {
        hero: "Dashboard: live graph, metrics, and task board",
        graph: "Node graph with idle and working agents",
        events: "External events: shortage, market shift, targeted agent failure",
      },
    },
    deutschlandcard: {
      domain: "Loyalty · Cloud · Identity",
      badge: "Professional Track Record · Enterprise",
      landingTitle: "Cloud, identity, integration",
      landingCta: "View the enterprise case",
      oneLiner:
        "Paid cloudification of the nationwide loyalty program: Azure AD B2C, Terraform, Kubernetes. That identity/API/cloud ground is the moat for later AI integration — the case itself is not an AI project.",
      honesty: "No AI/LLM component in the published case. No volume or latency figures (NDA).",
      contribution:
        "Login journey on Azure AD B2C, Terraform automation, and service cloudification — developer on a team, paid delivery.",
      pageTitle: "DeutschlandCard — cloud, identity, Terraform | Peter Henrichs",
      pageDescription:
        "Enterprise cloudification of the nationwide loyalty program: Azure AD B2C, Terraform, Kubernetes. No AI component, no invented volume metrics.",
      context:
        "Nationwide loyalty program (direct services Gütersloh, 2023–2026). Partner onboarding, realtime points, and campaigns had to move into a controllable cloud without cutting existing partner APIs.",
      problem:
        "Backend and interface architecture for partner onboarding, realtime point transactions, and personalized campaigns had to move into a scalable cloud environment.",
      decision:
        "Cloudify onto Azure; custom Azure AD B2C login journey; infrastructure via Terraform so identity, delivery, and existing partner APIs stay controllable — not a big-bang cutover.",
      architecture:
        "Spring Boot / Cloud services, Azure AD B2C as the identity layer, Terraform for reproducible infrastructure, Kubernetes/Azure as the runtime. Partner APIs stay attachable — cloudification instead of a big-bang cut.",
      architectureSteps: [
        "Partner APIs",
        "Spring Cloud services",
        "Azure AD B2C",
        "Terraform / Kubernetes / Azure",
      ],
      outcome:
        "Services in a scalable Azure environment; existing interfaces remain usable. Observed in delivery, not publicly measured. No volume or latency figures (NDA).",
      role: "Developer on a team — login journey, Terraform automation, service cloudification. Paid enterprise delivery.",
      evaluation:
        "No public AI evaluation metrics — the case has no AI/LLM component. Assessment via identity (Azure AD B2C), reproducible infrastructure (Terraform), and partner APIs that stay usable. Critical access stays in existing permission and operations paths.",
      transfer:
        "Transferable: identity, APIs, cloud, and governance are the ground agents later have to land on. The case itself is not an AI project and is not presented as one.",
      highlights: [
        "Custom login journey on Azure AD B2C",
        "Terraform-automated cloud infrastructure",
        "Cloudification without a big-bang partner-API cutover",
      ],
    },
    "dz-bank-okvp": {
      domain: "Banking · Platform Engineering · Observability",
      honesty: "No AI/LLM component in the published case.",
      contribution:
        "Lead-dev/DevOps on a team: decoupling into independently shippable features, OpenShift pipelines, observability. Paid delivery.",
      pageTitle: "DZ BANK OKVP — lead-dev, migration, observability | Peter Henrichs",
      pageDescription:
        "Migration of Fiducia & GAD sales platforms onto OKVP: decoupled features, OpenShift pipelines, Prometheus/Grafana/Dynatrace. No AI component.",
      context:
        "DZ BANK / adesso, 2020. Fiducia & GAD sales platforms were to move onto the new SDK/microservice platform OKVP — with lead-dev ownership for decoupling, delivery, and operational visibility.",
      problem:
        "Grown Fiducia & GAD sales platforms had to move onto a new SDK/microservice platform (OKVP).",
      decision:
        "Decouple into independently shippable “Features”; multi-stage pipelines on OpenShift; observability with Prometheus, Grafana, and Dynatrace. Lead-dev/DevOps ownership rather than feature delivery only.",
      architecture:
        "OKVP splits grown sales platforms into independently shippable features. Delivery via multi-stage OpenShift pipelines; service discovery via Consul; observability with Prometheus, Grafana, and Dynatrace.",
      architectureSteps: [
        "Fiducia & GAD platforms",
        "OKVP features",
        "OpenShift / Consul",
        "Prometheus / Grafana / Dynatrace",
      ],
      outcome:
        "Decoupled features, controlled delivery, production-grade observability. Observed in delivery. No published performance metrics.",
      role: "DevOps / developer / lead-dev on a team. Paid enterprise delivery.",
      evaluation:
        "No public AI metrics — no AI/LLM component. Assessment via independently shippable features, multi-stage pipelines, and observability (Prometheus, Grafana, Dynatrace). Failure modes are an operations view, not a prompt view.",
      transfer:
        "Transferable: anyone who wants agents in production needs to understand deployment, monitoring, and failure modes of existing systems. The case itself is not an AI project.",
      highlights: [
        "Independently decoupleable microservices (“Features”)",
        "Multi-stage OpenShift build pipelines",
        "Observability: Prometheus, Grafana, Dynatrace",
      ],
    },
    "bitmarck-bitgo": {
      domain: "Statutory health insurance · Legacy modernization · Security",
      honesty: "No AI/LLM component in the published case.",
      contribution:
        "Consultant/developer on a team: backend, REST to existing systems, legacy decoupling, 2FA for especially protected data. Paid delivery.",
      pageTitle: "BITMARCK bitGo_Web — GKV modernization, security, 2FA | Peter Henrichs",
      pageDescription:
        "Regulated statutory-health online Geschäftsstelle: legacy decoupling, REST to existing systems, 2FA for especially protected data. No AI component.",
      context:
        "BITMARCK Technik, 2019–2020. Digital channels of statutory health insurers (online Geschäftsstelle) interacting with BITMARCK_21c|ng: legacy, especially protected data, high security requirements.",
      problem:
        "Digital channels of statutory health insurers as an online Geschäftsstelle interacting with BITMARCK_21c|ng — legacy, sensitive data, high security requirements.",
      decision:
        "Decouple modules from the legacy landscape; REST interfaces to existing systems; 2FA for especially protected data; configurable frontend for insurer editors instead of a monolithic redesign.",
      architecture:
        "bitGo_Web sits in front of BITMARCK_21c|ng and legacy systems. REST interfaces and 2FA connect the online Geschäftsstelle to sensitive data without replacing the monolith in one cut. The frontend is configurable for insurer editors.",
      architectureSteps: [
        "Insurer editors",
        "bitGo_Web + 2FA",
        "REST to existing systems",
        "21c|ng / legacy",
      ],
      outcome:
        "Technical restructuring with 2FA and decoupled interfaces. Observed in delivery. No public throughput figures.",
      role: "Consultant / developer on a team — backend, REST, legacy decoupling, 2FA. Paid enterprise delivery.",
      evaluation:
        "No public AI metrics — no AI/LLM component. Assessment via 2FA for especially protected data, REST to existing systems, and a configurable frontend instead of a monolithic cut. Critical paths stay in existing security paths.",
      transfer:
        "Transferable: permissions, legacy, and sensitive data are often the real AI-transformation problem — not the model. The case itself is not an AI project.",
      highlights: [
        "2FA for especially protected data and forms",
        "REST interfaces into a legacy landscape",
        "Configurable frontend for insurer editors",
      ],
    },
    "maerz-ihe-box": {
      domain: "Healthcare ECM · Interoperability",
      problem:
        "Consistent, patient-centered, privacy-compliant communication between heterogeneous healthcare systems.",
      decision:
        "IHE-aligned integration and terminology work with InterSystems IRIS, HL7/FHIR, and Docker — semantics and system boundaries before speed.",
      outcome:
        "Production-near healthcare integration and terminology work, including cooperation with Fraunhofer.",
      highlights: [
        "Interop interfaces between healthcare systems",
        "Docker containers and custom Compose scripts",
        "Semantic server operations with Fraunhofer",
      ],
    },
    "bwi-lzs": {
      domain: "Defense-adjacent licensing · Authorization",
      problem:
        "Central management of license, usage, and document data for aviation personnel with selective rights down to the data-field level.",
      decision:
        "Modular architecture and fine-grained authorization instead of coarse roles — who may read or write which field?",
      outcome:
        "Functional integration into existing Bundeswehr IT and field-level permission logic.",
      highlights: [
        "Selective read/write down to data-element level",
        "Interfaces into the Bundeswehr IT landscape",
        "Evolution of the frontend web server",
      ],
    },
    "ego-workshop": {
      domain: "Automotive · EV",
      problem: "Simplify workshop handling for customer and garage.",
      decision:
        "Java microservice architecture, containerized on Kubernetes — operability before feature breadth.",
      outcome: "Containerized workshop services for the e.GO electric car.",
      highlights: [
        "Workshop service on a Java webservice architecture",
        "Java applications in a microservice architecture",
        "Containerized delivery on Kubernetes",
      ],
    },
    "ella-portals": {
      domain: "Media / publishing · Ownership",
      problem:
        "Build, operate, and evolve several publishing products and internal processes.",
      decision:
        "End-to-end ownership across development, design, operations, and internal IT — ownership rather than delivery only.",
      outcome:
        "Six long-running web properties plus custom subscription, web-paper, database, and intranet solutions.",
      highlights: [
        "Six live portals owned end to end",
        "Custom subscription forms, web paper, company databases",
        "Custom intranet for internal workflows",
      ],
    },
  },
  competencies: {
    index: "04",
    eyebrow: "Capabilities",
    title: "Five groups — not a skill wall.",
    line: "Strategy, Architecture, Agentic Engineering, Delivery, Governance.",
    description:
      "Strategy, Architecture, Agentic Engineering, Delivery, Governance. The detailed stack is evidence, not identity — and it does not sit on the landing page.",
    pillars: [
      {
        title: "Strategy",
        body: "Use cases where systems, identity, and data quality already exist. AI as a layer on the existing landscape — not a tool-first identity.",
      },
      {
        title: "Architecture",
        body: "Java/Spring, REST, identity, messaging, cloud. Systems that already exist, not greenfield demos.",
      },
      {
        title: "Agentic Engineering",
        body: "Agent contracts, repository intelligence, testable multi-agent orchestration, LLM-assisted engineering. Publicly evidenced, without model or MCP claims.",
      },
      {
        title: "Delivery",
        body: "CI/CD, Terraform, Kubernetes, OpenShift, lead-dev ownership. Decoupling without a big bang. What survives production.",
      },
      {
        title: "Governance",
        body: "GDPR, EU AI Act, 2FA, fine-grained authorization, HITL, regulated data. Guardrails before speed.",
      },
    ],
  },
  stack: {
    index: "04",
    eyebrow: "Tech stack · proven in delivery",
    title: "Weighted by function, filterable by era.",
    description:
      "Since 2010. Nothing aspirational — every entry shipped in a production engagement, portal build, or public reference repo.",
    filterAria: "Filter tech stack by era",
    filters: {
      all: "Everything",
      builder: "2013–17 · Builder",
      enterprise: "2018–25 · Enterprise",
      ai: "2026 · Agentic AI",
    },
    countTemplate: "{n} technologies",
    moreLabel: "Further shipped technologies",
    groups: {
      agentic: {
        label: "Agentic AI & Automation",
        hint: "Current specialization — publicly evidenced",
      },
      enterprise: {
        label: "Enterprise Architecture & Integration",
        hint: "Services, APIs, identity, messaging",
      },
      cloud: {
        label: "Cloud & Platform Engineering",
        hint: "Build, ship, run, observe",
      },
      governance: {
        label: "Governance & Regulated Systems",
        hint: "Legal, identity, sensitive domains",
      },
      engineering: {
        label: "Software Engineering",
        hint: "Languages, tests, quality gates",
      },
      "integration-health": {
        label: "Integration & Health",
        hint: "Messaging, interoperability, regulated healthcare",
      },
      "frontend-cms": {
        label: "Frontend, CMS & other delivery",
        hint: "Surfaces and complementary platforms",
      },
    },
  },
  industries: {
    eyebrow: "Enterprise domains",
    title: "Regulated and operational landscapes — no logo wallpaper.",
    line: "adesso · Finance · Public Sector · Healthcare · Loyalty",
    names: [
      "Banking",
      "Public Sector",
      "Healthcare / GKV",
      "Loyalty",
      "Insurance",
      "Automotive",
    ],
    healthLabel: "Healthcare detail (secondary)",
  },
  experience: {
    index: "02",
    eyebrow: "Professional Experience · paid enterprise work",
    title: "Career stations — the deep dive lives in the CV; here only the context.",
    description:
      "2013 through 2026 in productive, paid engagements. This is professional experience. Graph-Mastermind and Agent Collective live in the Lab, not in this list. 2026 continuing education lives under Credentials, not as the first job proof.",
    filterAria: "Filter experience by era",
    filters: {
      all: "All stations",
      enterprise: "Enterprise · 2018–26",
      builder: "Builder · 2013–17",
    },
    eraNames: {
      all: "all eras",
      enterprise: "2018–2026 · Enterprise",
      builder: "2013–2017 · Builder",
    },
    compactNote: "Compact station — engagement on record; no public project dossier.",
    countTemplate: "{shown} / {total} stations shown · {era}",
    entries: {
      "direct-services-deutschlandcard": {
        role: "Entwickler",
        project: "DeutschlandCard — nationwide loyalty program",
        mission:
          "Evolve backend and interface architecture for partner onboarding, realtime point transactions and personalized campaigns — for performance, security and scalability.",
        tasks: [
          "Custom Login Journey on Azure AD B2C",
          "Terraform scripts for automated cloud infrastructure",
          "Cloudification of DeutschlandCard services into a scalable Azure environment",
        ],
      },
      aleri: {
        role: "Entwickler",
        mission: "Backend development engagement.",
        tasks: [],
      },
      "nextgen-itzbund-push": {
        role: "Berater / Entwickler Fullstack",
        project: "ITZBund — Mobile Push App",
        mission: "APIs between mobile devices and government specialist procedures (Fachverfahren).",
        tasks: ["Jenkins Shared Libraries", "OAuth2 authentication workflow"],
      },
      "nextgen-bwi-lzs": {
        role: "Berater / Entwickler Fullstack",
        project: "BWI / Luftwaffe — Zentrales Lizenzierungssystem (LZS)",
        mission:
          "Central retrieve / enter / update / delete of licenses for aviation personnel at the Luftfahrtamt der Bundeswehr — meta, usage data and documents, with fine-grained RBAC down to data-element level.",
        tasks: [
          "Interfaces into the Bundeswehr IT landscape",
          "Evolution of the frontend web server",
          "Modular architecture with selective read/write down to the data element",
        ],
      },
      "nextgen-maerz-ihe": {
        role: "Berater / Entwickler",
        project: "März Internetwork Services AG — März IHE BOX",
        mission:
          "Medical Enterprise Content Management (IHE): a fast, complete, consistent, patient-centered and privacy-compliant architecture for healthcare communication and archive.",
        tasks: [
          "Interop interfaces between healthcare software systems",
          "Docker containers and custom Compose scripts",
          "Semantic (terminology) server operations, in close cooperation with Fraunhofer",
        ],
      },
      "adesso-dz-bank-okvp": {
        role: "DevOps / Entwickler / Lead-Dev",
        project: "DZ BANK AG — OKVP sales platform migration (Kundenfokus 2020)",
        mission:
          "Migrate sales platforms of Fiducia & GAD onto the new OKVP; build SDK-based components with business steering by DZ BANK.",
        tasks: [
          "Code that takes frontend data into the backend and hands it to existing systems via REST",
          "Redesign of small, independently decoupleable microservices (“Features”)",
          "OpenShift environment management and multi-stage build pipelines",
        ],
      },
      "adesso-amp": {
        role: "Berater / Entwickler",
        project: "adesso AMP — adesso Microservice Platform",
        mission:
          "Domain tools plus delivery know-how for microservice architectures, with reusable infrastructure samples.",
        tasks: [
          "Plan, build and document sample applications reusable in later engagements",
        ],
      },
      "adesso-bitmarck-bitgo": {
        role: "Berater / Entwickler",
        project: "BITMARCK / BMT_bitGo — GKV online Geschäftsstelle",
        mission:
          "Digital channels of statutory health insurers as an online Geschäftsstelle interacting with BITMARCK_21c|ng; bitGo_Web unifies Geschäftsstelle and KV via a technical redesign.",
        tasks: [
          "Backend information processing and REST interfaces to existing systems",
          "Decoupling and redesign of modules from a legacy landscape",
          "2FA for especially protected data and forms",
          "Fully configurable frontend for insurer editors",
        ],
      },
      "binaris-crm": {
        role: "Berater / Entwickler",
        project: "Internal CRM tool for recruiting",
        mission: "A CRM tool for the company's own recruiting.",
        tasks: ["Automated build pipeline"],
      },
      "binaris-domea": {
        role: "Berater / Entwickler",
        project: "Electronic Fachverfahren for public administration (paper → e-records / DOMEA)",
        mission:
          "Move public administration from paper to electronic records on JEE-based Fachanwendungen.",
        tasks: [
          "Advise existing clients on JEE-based Fachanwendungen in public administration",
          "Design and implement Java applications",
          "Interfaces to existing systems (e.g. the Registratur of a federal office)",
        ],
      },
      "binaris-ego": {
        role: "Entwickler / Berater",
        project: "Workshop backend for the electric car “e.GO”",
        mission: "Simplify workshop handling for the customer and the garage.",
        tasks: [
          "Concept and development of a workshop service on a Java webservice architecture",
          "Java applications in a microservice architecture",
        ],
      },
      "ella-verlag": {
        role: "Techn. Projektleiter / Entwickler / Designer / Berater",
        project: "Build and evolve large web portals",
        mission:
          "Own and grow six live web magazines end to end — build, design, custom apps, intranet and the full IT operation.",
        tasks: [
          "Custom web apps: subscription forms, web paper, company databases for sales and agencies",
          "Custom intranet to optimize internal workflows",
          "Install and maintain all company computers",
          "First contact for software, hardware, network, internet and communications",
        ],
      },
    },
  },
  education: {
    index: "06",
    eyebrow: "Education & continuing education",
    title:
      "Media roots, web-programming craft — and a 2026 specialization. Credentials, not the primary job proof.",
    focus: [
      [
        "Architecture and implementation of autonomous, AI-supported system workflows",
        "Measurable reduction of manual effort",
        "AI-agent frameworks and complex API integrations",
        "Prompt automation; performant, scalable automation pipelines",
      ],
      [
        "Strategic integration and management of AI in companies",
        "Technical foundations and practical use cases",
        "End-to-end leadership of AI projects; Prompt Engineering",
        "Legal / ethical frame: GDPR (DSGVO), EU AI Act",
        "Change management and scalable AI strategies",
      ],
    ],
  },
  footer: {
    eyebrow: "Conversation",
    title: "A conversation about AI & agents.",
    body: "CV, LinkedIn, and GitHub are ready. Agencies place him through the three role packages. No freelancer retainer, no free slots.",
    email: "Email",
    linkedin: "LinkedIn",
    github: "GitHub",
    cv: "CV (HTML)",
    cvNote:
      "HTML CV for print or Save as PDF. A separate PDF can later be added under /portfolio/cv/. No invented Drive URLs.",
    roleLine: "Senior AI Consultant & Agentic Software Engineer",
    personalNote: "",
  },
  cv: {
    title: "CV — Peter Henrichs",
    subtitle: "Senior AI Consultant & Agentic Software Engineer",
    print: "Print / save as PDF",
    back: "Back to portfolio",
    intro:
      "10+ years of enterprise software engineering in Cologne. Now applied to Agentic AI, LLMs, and automation — on a foundation of Java/Spring, cloud, and regulated integration.",
    todo: "TODO: optionally place a PDF at public/portfolio/cv/Peter-Henrichs-CV.pdf and keep this HTML path as fallback. Do not invent Drive URLs.",
  },
};
