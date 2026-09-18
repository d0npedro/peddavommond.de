export const en = {
  meta: {
    title: "Peter Henrichs — Senior AI Consultant & Agentic Software Engineer",
    description:
      "Senior AI Consultant and software engineer with 12+ years of enterprise experience. Focus on Agentic AI, LLM-assisted software engineering, AI Automation, Java/Spring, cloud, and integration in regulated IT landscapes.",
    ogAlt: "Peter Henrichs — Senior AI Consultant & Agentic Software Engineer",
    keywords:
      "Peter Henrichs,Senior AI Consultant,Agentic Software Engineer,Agentic AI,LLM-assisted Software Engineering,AI Automation,Java,Spring Boot,Azure,Kubernetes,Terraform,Enterprise Integration",
    jobTitle: "Senior AI Consultant & Agentic Software Engineer",
    personDescription:
      "Peter Henrichs is a Senior AI Consultant and Agentic Software Engineer. Seniority comes from 12+ years of enterprise software engineering; Agentic AI, LLM-assisted engineering and AI Automation are the current specialization on top of that foundation.",
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
    aiCases: "AI Cases",
    enterprise: "Enterprise",
    experience: "Experience",
    competencies: "Competencies",
    cv: "CV",
    contact: "Contact",
  },
  theme: {
    toLight: "Switch to light mode",
    toDark: "Switch to dark mode",
  },
  hero: {
    eyebrow: "Enterprise Engineering × Agentic AI × Transformation",
    role: "Senior AI Consultant & Agentic Software Engineer",
    tagline:
      "12+ years of enterprise software engineering — now focused on LLM-assisted development, agentic systems, and AI Automation. I connect Java/Spring, cloud, and integration architecture with the question of how AI reaches existing organizations safely, traceably, and in production.",
    proof:
      "12+ years Enterprise Engineering · Agentic AI & Automation · Java/Spring · Cloud/Kubernetes/Terraform · Banking · Health · Public Sector",
    ctaPrimary: "View AI cases",
    ctaSecondary: "Download CV",
    ctaTertiary: "Contact",
    metricLabels: [
      "Years in software development",
      "Regulated industries delivered in",
      "Enterprise engagements",
      "Live web portals owned",
    ],
    languagesLabel: "Languages",
  },
  arc: {
    index: "00",
    eyebrow: "The through-line",
    title: "One arc, three eras — the AI layer sits on top of the backend years.",
    description:
      "Seniority is not new. The specialization is: robust Java/Spring enterprise delivery (public sector, banking, health insurance, media, automotive) → cloudification (Azure, Kubernetes, Terraform) → Agentic AI, LLM-assisted engineering, and AI Automation on top of production systems.",
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
  aiCases: {
    index: "01",
    eyebrow: "Selected AI & Agentic Work",
    title: "Public, inspectable agent work — precise, not inflated.",
    description:
      "Two reference projects you can verify. Graph-Mastermind is an agent package for coding agents. Agent Collective is a deterministic multi-agent simulator — deliberately without an LLM backend.",
  },
  enterpriseCases: {
    index: "02",
    eyebrow: "Enterprise Transformation",
    title: "Where AI has to land later: identity, cloud, legacy, regulation.",
    description:
      "Three engagements with high transfer into enterprise AI: loyalty cloud and identity, banking migration with lead-dev ownership, GKV modernization under data protection. Further mandates stay secondary.",
    secondaryEyebrow: "Further mandates",
    secondaryNote:
      "Healthcare interoperability, defense-adjacent licensing, automotive, and publishing — available, but not equal homepage weight.",
  },
  caseFields: {
    problem: "Problem",
    decision: "Decision / trade-off",
    outcome: "Outcome",
    role: "My role",
    evidence: "Evidence",
    ownWork: "Own work",
    transfer: "Why this matters for enterprise AI",
    repo: "Repository",
    demo: "Live demo",
    embed: "On this site",
    live: "Live",
  },
  cases: {
    "graph-mastermind": {
      domain: "Agentic Software Engineering · Repository Intelligence",
      honesty: "Agent package for coding agents — no prescribed LLM.",
      problem:
        "Complex repository structure is spread across file trees, imports, and docs. Unfamiliar or grown codebases are hard to grasp quickly.",
      decision:
        "Reusable agent package: a coding agent receives an explicit work and acceptance contract via AGENT.md, SPEC.md, and CHECKLIST.md. It inspects the target repository, derives components and relationships, and produces an interactive architecture view. Contract, data model, visualization runtime, and UI stay separate. No specific LLM is required.",
      outcome:
        "Public agent package, live demo, tests, typecheck, CI, and a reproducible production build. Qualitative: inspectable artifacts instead of a black-box analysis.",
      role: "Design and delivery of the reusable agent workflow and the reference application.",
      transfer:
        "In large organizations, calling a capable model is rarely the hard part. Agents must understand existing systems, follow explicit rules, produce traceable artifacts, and finish in a verifiable way.",
      highlights: [
        "Agent contract from AGENT.md / SPEC.md / CHECKLIST.md",
        "Generic application to unfamiliar repositories",
        "React/TypeScript + d3-force, tests and CI as acceptance",
      ],
    },
    "agent-collective": {
      domain: "Testable Multi-Agent Orchestration · Simulator",
      honesty:
        "Deterministic multi-agent simulator — no LLM backend, no tool-calling stack.",
      problem:
        "Multi-agent demos often hide system behavior behind chat UIs. State, failure, resources, and recovery stay invisible.",
      decision:
        "TypeScript state machine with six roles, a workflow graph, failure injection, recovery, and a seeded RNG for reproducible runs. The simulation layer is separated from the UI. Deliberately no real LLM, so orchestration and failure modes stay testable.",
      outcome:
        "Live dashboard, Vitest/CI, step-wise system states. Qualitative: failure recovery and observability are inspectable, not just claimed.",
      role: "Design and delivery of the testable engine, workflow graph, and live dashboard.",
      transfer:
        "Strong for orchestration, reliability, evaluation, and human-understandable agent systems — as a reference model, not a production LLM platform.",
      highlights: [
        "Deterministic engine, reproducible seeded runs",
        "Failure injection and recovery",
        "Embedded on this site at /multi-agent/",
      ],
    },
    deutschlandcard: {
      domain: "Loyalty · Cloud · Identity",
      honesty: "No AI/LLM component in the published case.",
      problem:
        "Backend and interface architecture for partner onboarding, realtime point transactions, and personalized campaigns had to move into a scalable cloud environment.",
      decision:
        "Cloudify onto Azure; custom Azure AD B2C login journey; infrastructure via Terraform so identity, delivery, and existing partner APIs stay controllable — not a big-bang cutover.",
      outcome:
        "Services in a scalable Azure environment; existing interfaces remain usable. No public volume or latency figures (NDA).",
      role: "Developer — login journey, Terraform automation, service cloudification.",
      transfer:
        "This identity, API, cloud, and governance reality is exactly where AI agents later have to be embedded.",
      highlights: [
        "Custom login journey on Azure AD B2C",
        "Terraform-automated cloud infrastructure",
        "Cloudification without a big-bang partner-API cutover",
      ],
    },
    "dz-bank-okvp": {
      domain: "Banking · Platform Engineering · Observability",
      honesty: "No AI/LLM component in the published case.",
      problem:
        "Grown Fiducia & GAD sales platforms had to move onto a new SDK/microservice platform (OKVP).",
      decision:
        "Decouple into independently shippable “Features”; multi-stage pipelines on OpenShift; observability with Prometheus, Grafana, and Dynatrace. Lead-dev/DevOps ownership rather than feature delivery only.",
      outcome:
        "Decoupled features, controlled delivery, production-grade observability. No published performance metrics.",
      role: "DevOps / developer / lead-dev.",
      transfer:
        "A senior AI architect needs to understand deployment, monitoring, and failure modes of production systems — not only prompts.",
      highlights: [
        "Independently decoupleable microservices (“Features”)",
        "Multi-stage OpenShift build pipelines",
        "Observability: Prometheus, Grafana, Dynatrace",
      ],
    },
    "bitmarck-bitgo": {
      domain: "Statutory health insurance · Legacy modernization · Security",
      honesty: "No AI/LLM component in the published case.",
      problem:
        "Digital channels of statutory health insurers as an online Geschäftsstelle interacting with BITMARCK_21c|ng — legacy, sensitive data, high security requirements.",
      decision:
        "Decouple modules from the legacy landscape; REST interfaces to existing systems; 2FA for especially protected data; configurable frontend for insurer editors instead of a monolithic redesign.",
      outcome:
        "Technical restructuring with 2FA and decoupled interfaces. No public throughput figures.",
      role: "Consultant / developer — backend, REST, legacy decoupling, 2FA.",
      transfer:
        "Permissions, legacy, and sensitive data are often the real AI-transformation problem — not the model.",
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
    index: "03",
    eyebrow: "What I bring to AI transformation",
    title: "Agentic AI on an enterprise foundation — not the other way around.",
    description:
      "Five priorities up front. The full shipped stack below — weighted, not a flat tag cloud.",
    pillars: [
      {
        title: "Agentic AI & Automation",
        body: "Agent contracts, repository intelligence, testable multi-agent orchestration, LLM-assisted engineering. Publicly evidenced, without model or MCP claims.",
      },
      {
        title: "Enterprise Integration",
        body: "Java/Spring, REST, identity, messaging, FHIR — systems that already exist, not greenfield demos.",
      },
      {
        title: "Cloud & Platform",
        body: "Azure, Kubernetes, OpenShift, Terraform, CI/CD, observability. Delivery that survives production.",
      },
      {
        title: "Security & Governance",
        body: "GDPR, EU AI Act, 2FA, fine-grained authorization, regulated data. Guardrails before speed.",
      },
      {
        title: "Legacy Modernization",
        body: "Decoupling, migration without a big bang, interfaces that stay usable. This is where many AI programs fail.",
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
    eyebrow: "Domains delivered in",
    title: "Mostly regulated environments — plus automotive and publishing.",
    names: [
      "Banking",
      "Statutory health insurance (GKV)",
      "Public administration",
      "Insurance",
      "Financial services",
      "Automotive",
      "Media / publishing",
      "Landscape architecture",
      "Dentistry / dental billing",
    ],
    healthLabel: "Health-domain surface area",
  },
  experience: {
    index: "05",
    eyebrow: "Experience · newest first",
    title: "Enterprise stations — the deep dive under the cases.",
    description:
      "2013 through 2026 in productive engagements. 2026 continuing education lives under Education, not as the first experience proof.",
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
      "Media roots, web-programming craft — and a 2026 specialization in Agentic AI and AI Automation.",
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
    eyebrow: "End of transmission",
    title:
      "Building something that has to be correct — at scale, under regulation, with AI that has to integrate?",
    body: "Seniority from 12+ years of enterprise engineering. The specialization is new: agentic systems, LLM-assisted development, and AI Automation — so they work inside real organizations.",
    email: "Email",
    linkedin: "LinkedIn",
    github: "GitHub",
    cv: "CV (HTML)",
    cvNote:
      "HTML CV for print or Save as PDF. A separate PDF can later be added under /portfolio/cv/. No invented Drive URLs.",
    roleLine: "Senior AI Consultant · Agentic Software Engineer",
  },
  cv: {
    title: "CV — Peter Henrichs",
    subtitle: "Senior AI Consultant & Agentic Software Engineer",
    print: "Print / save as PDF",
    back: "Back to portfolio",
    intro:
      "12+ years of enterprise software engineering. Current specialization: Agentic AI, LLM-assisted development, and AI Automation — on a foundation of Java/Spring, cloud, and regulated integration.",
    todo: "TODO: optionally place a PDF at public/portfolio/cv/Peter-Henrichs-CV.pdf and keep this HTML path as fallback. Do not invent Drive URLs.",
  },
};
