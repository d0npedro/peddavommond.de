/** Shared, locale-independent portfolio data. Do not invent AI claims here. */

export const SITE = {
  name: "Peter Henrichs",
  handle: "peter.henrichs",
  email: "peter.henrichs@web.de",
  linkedin: "https://www.linkedin.com/in/peter-henrichs/",
  github: "https://github.com/d0npedro",
  cvPath: "/portfolio/cv/",
  origin: "https://peddavommond.de",
  year: 2026,
  city: "Köln",
  country: { de: "Deutschland", en: "Germany" },
  location: { de: "Köln · Deutschlandweit / Remote", en: "Cologne · Germany-wide / Remote" },
  updated: "2026-09-22",
};

export const LOCALES = ["de", "en"];
export const DEFAULT_LOCALE = "de";

export const METRICS = [
  { value: "10+", key: "years" },
  { value: "9", key: "industries" },
  { value: "15+", key: "engagements" },
  { value: "6", key: "portals" },
];

export const ERAS = [
  { id: "builder", years: "2013 – 2017" },
  { id: "enterprise", years: "2018 – 2025" },
  { id: "ai", years: "2026" },
];

export const NAV = [
  { id: "cases", key: "cases" },
  { id: "offer", key: "offer" },
  { id: "contact", key: "contact" },
  { href: "/portfolio/cv/", key: "cv" },
];

/** Exactly three lead cases on the landing page. */
export const FLAGSHIP_IDS = [
  "graph-mastermind",
  "agent-collective",
  "deutschlandcard",
];

export const HOW_I_WORK_KEYS = [
  "evaluation",
  "hitl",
  "security",
  "observability",
];

/** Career trajectory: Engineer → Agentic AI → Consulting. Max five milestones. */
export const TRACK = [
  {
    id: "builder",
    period: "2013 – 2017",
    company: "ella Verlag",
    era: "engineer",
  },
  {
    id: "enterprise",
    period: "2018 – 2022",
    company: "adesso · NextGen · binaris",
    caseIds: ["dz-bank-okvp", "bitmarck-bitgo"],
    era: "engineer",
  },
  {
    id: "deutschlandcard",
    period: "2023 – 2026",
    company: "direct services Gütersloh GmbH",
    caseIds: ["deutschlandcard"],
    era: "engineer",
  },
  {
    id: "agentic",
    period: "2026",
    company: "Independent R&D",
    caseIds: ["graph-mastermind", "agent-collective"],
    era: "ai",
  },
  {
    id: "consulting",
    period: "2026",
    company: "KI-Manager · AI Automation",
    era: "consulting",
  },
];

export const TRUST_DOMAIN_KEYS = ["banking", "public", "health", "loyalty", "insurance", "automotive"];

export const CASES = [
  {
    id: "graph-mastermind",
    section: "lab",
    featured: true,
    flagship: true,
    name: "Graph-Mastermind",
    client: "Public reference · d0npedro",
    period: "2026",
    era: "ai",
    ownership: {
      status: "lab",
      team: "solo",
      data: "synthetic",
      code: "public",
      result: "observed",
    },
    tech: [
      "Agent Contracts",
      "React",
      "TypeScript",
      "d3-force",
      "CI / Typecheck",
    ],
    hasPage: true,
    links: [
      { kind: "repo", href: "https://github.com/d0npedro/graph-mastermind" },
      { kind: "demo", href: "https://graph-mastermind.vercel.app" },
    ],
    screenshots: [
      {
        src: "https://raw.githubusercontent.com/d0npedro/graph-mastermind/main/docs/screenshots/overview.png",
        altKey: "overview",
      },
      {
        src: "https://raw.githubusercontent.com/d0npedro/graph-mastermind/main/docs/screenshots/detail.png",
        altKey: "detail",
      },
      {
        src: "https://raw.githubusercontent.com/d0npedro/graph-mastermind/main/docs/screenshots/search.png",
        altKey: "search",
      },
    ],
  },
  {
    id: "agent-collective",
    section: "lab",
    featured: true,
    flagship: true,
    name: "Agent Collective",
    client: "Public reference · d0npedro",
    period: "2026",
    era: "ai",
    ownership: {
      status: "lab",
      team: "solo",
      data: "synthetic",
      code: "public",
      result: "observed",
    },
    tech: [
      "TypeScript",
      "Deterministic State Machine",
      "React Flow",
      "Vitest",
      "React 19",
    ],
    hasPage: true,
    links: [
      { kind: "repo", href: "https://github.com/d0npedro/multi-agent" },
      { kind: "demo", href: "https://multi-agent-six-murex.vercel.app" },
      { kind: "embed", href: "/multi-agent/" },
    ],
    screenshots: [
      {
        src: "https://raw.githubusercontent.com/d0npedro/multi-agent/main/docs/screenshots/hero.png",
        altKey: "hero",
      },
      {
        src: "https://raw.githubusercontent.com/d0npedro/multi-agent/main/docs/screenshots/graph-live.png",
        altKey: "graph",
      },
      {
        src: "https://raw.githubusercontent.com/d0npedro/multi-agent/main/docs/screenshots/events.png",
        altKey: "events",
      },
    ],
  },
  {
    id: "deutschlandcard",
    section: "enterprise",
    featured: true,
    flagship: true,
    hasPage: true,
    relatedIds: ["dz-bank-okvp", "bitmarck-bitgo"],
    name: "DeutschlandCard",
    client: "direct services Gütersloh GmbH",
    period: "2023 – 2026",
    era: "enterprise",
    ownership: {
      status: "production",
      team: "team",
      data: "real",
      code: "private",
      result: "observed",
    },
    tech: [
      "Spring Boot",
      "Spring Cloud",
      "Azure AD B2C",
      "Kubernetes",
      "Terraform",
      "Oracle OCI",
      "Airflow",
    ],
  },
  {
    id: "dz-bank-okvp",
    section: "enterprise",
    featured: false,
    flagship: false,
    hasPage: true,
    name: "DZ BANK OKVP",
    client: "DZ BANK AG · adesso AG",
    period: "2020",
    era: "enterprise",
    ownership: {
      status: "production",
      team: "team",
      data: "real",
      code: "private",
      result: "observed",
    },
    tech: [
      "Java",
      "Spring",
      "Angular",
      "Kafka",
      "OpenShift 4",
      "Consul",
      "Prometheus",
      "Grafana",
      "Dynatrace",
    ],
  },
  {
    id: "bitmarck-bitgo",
    section: "enterprise",
    featured: false,
    flagship: false,
    hasPage: true,
    name: "BITMARCK bitGo_Web",
    client: "BITMARCK Technik GmbH",
    period: "2019 – 2020",
    era: "enterprise",
    ownership: {
      status: "production",
      team: "team",
      data: "real",
      code: "private",
      result: "observed",
    },
    tech: [
      "Spring Boot",
      "Spring Security",
      "OAuth2",
      "FirstSpirit",
      "Thymeleaf",
      "REST",
    ],
  },
  {
    id: "maerz-ihe-box",
    section: "secondary",
    featured: false,
    name: "März IHE BOX",
    client: "März Internetwork Services AG",
    period: "2021",
    era: "enterprise",
    tech: [
      "InterSystems IRIS for Health",
      "HL7 / FHIR",
      "ObjectScript",
      "Ensemble",
      "HealthShare",
      "Docker",
    ],
  },
  {
    id: "bwi-lzs",
    section: "secondary",
    featured: false,
    name: "Luftwaffe LZS",
    client: "BWI GmbH · Luftfahrtamt der Bundeswehr",
    period: "2021",
    era: "enterprise",
    tech: [
      "IBM DB2",
      "SAP",
      "OpenUI5",
      "Olingo",
      "OData V4",
      "PDFBox",
      "Apache HTTPD",
    ],
  },
  {
    id: "ego-workshop",
    section: "secondary",
    featured: false,
    name: "e.GO Workshop Service",
    client: "Valtech Mobility GmbH · binaris",
    period: "2018",
    era: "enterprise",
    tech: [
      "Spring Boot",
      "Java",
      "Kubernetes",
      "Docker",
      "Gradle",
      "SonarQube",
    ],
  },
  {
    id: "ella-portals",
    section: "secondary",
    featured: false,
    name: "ella Verlag Portals",
    client: "ella Verlag Elke Latuperisa e.K.",
    period: "2013 – 2017",
    era: "builder",
    tech: [
      "HTML5",
      "CSS3",
      "JavaScript",
      "jQuery",
      "Joomla",
      "WordPress",
    ],
    links: [
      { kind: "live", label: "packaging-journal.de", href: "https://packaging-journal.de" },
      { kind: "live", label: "reisenexclusiv.com", href: "https://reisenexclusiv.com" },
      { kind: "live", label: "pack-finder.de", href: "https://pack-finder.de" },
      { kind: "live", label: "duitsland-magazine.nl", href: "https://duitsland-magazine.nl" },
      { kind: "live", label: "weihnachtsmarkt-magazin.de", href: "https://weihnachtsmarkt-magazin.de" },
      { kind: "live", label: "ella-verlag.de", href: "https://ella-verlag.de" },
    ],
  },
];

/** Berufserfahrung only — Weiterbildungen live in Education, not as first proof. */
export const EXPERIENCE = [
  {
    id: "direct-services-deutschlandcard",
    period: "02/2023 – 11/2026",
    start: "2023-02",
    company: "direct services Gütersloh GmbH",
    tech: [
      "Spring Boot",
      "Spring Cloud",
      "Azure AD B2C",
      "Azure Cloud Services",
      "Kubernetes",
      "Terraform",
      "Oracle OCI",
      "Docker",
      "CI/CD",
      "Maven",
      "GIT",
      "REST",
      "Airflow",
      "Scrum",
      "Java",
    ],
    era: "enterprise",
  },
  {
    id: "aleri",
    period: "10/2022 – 02/2023",
    start: "2022-10",
    company: "aleri GmbH",
    tech: ["Java", "Spring Boot"],
    era: "enterprise",
    compact: true,
  },
  {
    id: "nextgen-itzbund-push",
    period: "11/2021 – 09/2022",
    start: "2021-11",
    company: "The NextGen GmbH",
    tech: [
      "Spring Boot",
      "Spring Cloud",
      "Spring Security",
      "Spring Batch",
      "Maven",
      "GIT",
      "REST",
      "OpenAPI",
      "Docker",
      "Scrum",
      "Test Automation",
      "Java",
    ],
    era: "enterprise",
  },
  {
    id: "nextgen-bwi-lzs",
    period: "04/2021 – 10/2021",
    start: "2021-04",
    company: "The NextGen GmbH",
    tech: [
      "Apache HTTPD",
      "Apache Tomcat",
      "IBM DB2",
      "SAP",
      "OpenUI5",
      "Olingo",
      "PDFBox",
      "OData V4",
      "REST",
      "Jenkins",
      "GIT",
    ],
    era: "enterprise",
  },
  {
    id: "nextgen-maerz-ihe",
    period: "01/2021 – 03/2021",
    start: "2021-01",
    company: "The NextGen GmbH",
    tech: [
      "InterSystems IRIS for Health",
      "IRIS Data Platform",
      "Ensemble",
      "Caché",
      "HealthShare",
      "HL7 / FHIR",
      "ObjectScript",
      "Docker",
      "REST",
      "Jenkins",
      "GIT",
    ],
    era: "enterprise",
  },
  {
    id: "adesso-dz-bank-okvp",
    period: "06/2020 – 12/2020",
    start: "2020-06",
    company: "adesso AG",
    tech: [
      "Java",
      "Spring",
      "Angular",
      "Kafka",
      "OpenShift 4",
      "Minishift",
      "Kubernetes",
      "Docker",
      "Jenkins",
      "Consul",
      "Prometheus",
      "Grafana",
      "Dynatrace",
      "SonarQube",
      "GIT",
    ],
    era: "enterprise",
  },
  {
    id: "adesso-amp",
    period: "03/2020 – 05/2020",
    start: "2020-03",
    company: "adesso AG",
    tech: [
      "Spring Boot",
      "Spring Cloud",
      "Docker Swarm",
      "REST",
      "Java",
      "Thymeleaf",
      "Bootstrap",
      "Maven",
      "Gradle",
      "Jenkins",
      "Bitbucket",
      "GIT",
      "Scrum",
      "HTML",
    ],
    era: "enterprise",
  },
  {
    id: "adesso-bitmarck-bitgo",
    period: "06/2019 – 02/2020",
    start: "2019-06",
    company: "adesso AG",
    tech: [
      "Spring Boot",
      "Spring Security",
      "REST",
      "Java",
      "OAuth2",
      "FirstSpirit",
      "Thymeleaf",
      "Bootstrap",
      "JavaScript",
      "JSP",
      "Maven",
      "Gradle",
      "Jenkins",
      "GIT",
      "Scrum",
      "HTML",
    ],
    era: "enterprise",
  },
  {
    id: "binaris-crm",
    period: "04/2019 – 05/2019",
    start: "2019-04",
    company: "binaris Informatik GmbH",
    tech: ["Angular", "Java", "Docker"],
    era: "enterprise",
  },
  {
    id: "binaris-domea",
    period: "09/2018 – 05/2019",
    start: "2018-09",
    company: "binaris Informatik GmbH",
    tech: [
      "Java",
      "JavaEE",
      "Spring Boot",
      "Maven",
      "Jenkins",
      "GIT",
      "SonarQube",
      "Docker",
      "DOMEA",
    ],
    era: "enterprise",
  },
  {
    id: "binaris-ego",
    period: "05/2018 – 08/2018",
    start: "2018-05",
    company: "binaris Informatik GmbH (for Valtech Mobility GmbH)",
    tech: [
      "Spring Boot",
      "Java",
      "Kubernetes",
      "Docker",
      "Jenkins",
      "Gradle",
      "SonarQube",
      "GIT",
    ],
    era: "enterprise",
  },
  {
    id: "ella-verlag",
    period: "04/2013 – 12/2017",
    start: "2013-04",
    company: "ella Verlag Elke Latuperisa e.K.",
    tech: [
      "HTML5",
      "CSS3",
      "JavaScript",
      "jQuery",
      "Joomla",
      "WordPress",
      "Windows Server 2012",
    ],
    era: "builder",
  },
];

export const EDUCATION = [
  {
    period: "08/2026 – 09/2026",
    title: "Weiterbildung AI-Automation",
    institution: "STARTPLATZ Köln GmbH",
    kind: "continuing",
    focusKey: 0,
  },
  {
    period: "03/2026 – 07/2026",
    title: "Weiterbildung zum KI-Manager",
    institution: "Akademie für die Deutsche Wirtschaft GmbH",
    kind: "continuing",
    focusKey: 1,
  },
  {
    period: "11/2011 – 03/2013",
    title: "Webprogrammierer",
    institution: "Deutsche POP",
    location: "Köln",
    kind: "education",
  },
  {
    period: "10/2010 – 09/2011",
    title: "Medienassistent Bild und Ton",
    institution: "bm – Gesellschaft für Bildung in Medienberufen mbH",
    location: "Köln",
    kind: "education",
  },
];

export const STACK_GROUPS = [
  {
    id: "agentic",
    featured: true,
    items: [
      { name: "Agentic AI", eras: ["ai"] },
      { name: "LLM-assisted Software Engineering", eras: ["ai"] },
      { name: "Agent Contracts (AGENT.md / SPEC / CHECKLIST)", eras: ["ai"] },
      { name: "Repository Intelligence", eras: ["ai"] },
      { name: "Multi-Agent Orchestration (deterministic)", eras: ["ai"] },
      { name: "AI Automation", eras: ["ai"] },
      { name: "Prompt Engineering", eras: ["ai"] },
      { name: "Prompt Automation", eras: ["ai"] },
      { name: "TypeScript / React", eras: ["ai"] },
    ],
  },
  {
    id: "enterprise",
    featured: true,
    items: [
      { name: "Spring Boot", eras: ["enterprise"] },
      { name: "Spring Cloud", eras: ["enterprise"] },
      { name: "Spring Security", eras: ["enterprise"] },
      { name: "REST / OpenAPI / Swagger", eras: ["enterprise"] },
      { name: "OAuth2 / Azure AD B2C", eras: ["enterprise"] },
      { name: "Microservices", eras: ["enterprise"] },
      { name: "Kafka", eras: ["enterprise"] },
      { name: "HL7 / FHIR", eras: ["enterprise"] },
      { name: "Requirements Engineering", eras: ["builder", "enterprise"] },
    ],
  },
  {
    id: "cloud",
    featured: true,
    items: [
      { name: "Azure Cloud Services", eras: ["enterprise"] },
      { name: "Kubernetes", eras: ["enterprise"] },
      { name: "OpenShift 4 / Minishift", eras: ["enterprise"] },
      { name: "Docker / Docker Swarm", eras: ["enterprise"] },
      { name: "Terraform", eras: ["enterprise"] },
      { name: "Jenkins / CI/CD", eras: ["enterprise"] },
      { name: "Prometheus / Grafana", eras: ["enterprise"] },
      { name: "Dynatrace", eras: ["enterprise"] },
      { name: "Oracle OCI", eras: ["enterprise"] },
    ],
  },
  {
    id: "governance",
    featured: true,
    items: [
      { name: "DSGVO / GDPR compliance", eras: ["ai"] },
      { name: "EU AI Act", eras: ["ai"] },
      { name: "Identity / 2FA / RBAC", eras: ["enterprise"] },
      { name: "GKV / 21c|ng · eGK · KV", eras: ["enterprise"] },
      { name: "Fine-grained Authorization", eras: ["enterprise"] },
      { name: "Change Management", eras: ["ai"] },
      { name: "AI Strategy & Governance", eras: ["ai"] },
    ],
  },
  {
    id: "engineering",
    featured: false,
    items: [
      { name: "Java (SE / JEE)", eras: ["builder", "enterprise"] },
      { name: "JavaScript / jQuery", eras: ["builder", "enterprise"] },
      { name: "PHP", eras: ["builder"] },
      { name: "ObjectScript", eras: ["enterprise"] },
      { name: "XSLT", eras: ["builder", "enterprise"] },
      { name: "SQL", eras: ["builder", "enterprise"] },
      { name: "Integration tests", eras: ["builder", "enterprise"] },
      { name: "Test automation", eras: ["enterprise"] },
      { name: "SonarQube / quality gates", eras: ["enterprise"] },
      { name: "Clean Code", eras: ["enterprise"] },
      { name: "Acceptance tests", eras: ["builder", "enterprise"] },
      { name: "Load / performance testing", eras: ["builder", "enterprise"] },
      { name: "Cypress", eras: ["enterprise"] },
      { name: "Reviews & inspections", eras: ["builder", "enterprise"] },
      { name: "Software metrics", eras: ["builder", "enterprise"] },
      { name: "GIT", eras: ["enterprise"] },
      { name: "Maven / Gradle", eras: ["builder", "enterprise"] },
    ],
  },
  {
    id: "integration-health",
    featured: false,
    items: [
      { name: "RabbitMQ", eras: ["enterprise"] },
      { name: "Airflow", eras: ["enterprise"] },
      { name: "InterSystems IRIS / Ensemble / Caché", eras: ["enterprise"] },
      { name: "HealthShare", eras: ["enterprise"] },
      { name: "IHE (Medical ECM)", eras: ["enterprise"] },
      { name: "Terminologieserver", eras: ["enterprise"] },
      { name: "Dental billing systems", eras: ["enterprise"] },
      { name: "IBM DB2 / Oracle DB / MySQL", eras: ["builder", "enterprise"] },
      { name: "SAP", eras: ["enterprise"] },
      { name: "OData V4 / Olingo", eras: ["enterprise"] },
      { name: "Spring Batch", eras: ["enterprise"] },
      { name: "Client/Server & Web Portal architectures", eras: ["builder", "enterprise"] },
      { name: "Component-based / OOP design", eras: ["builder", "enterprise"] },
    ],
  },
  {
    id: "frontend-cms",
    featured: false,
    items: [
      { name: "Angular", eras: ["enterprise"] },
      { name: "OpenUI5", eras: ["enterprise"] },
      { name: "Thymeleaf / JSP", eras: ["enterprise"] },
      { name: "Bootstrap", eras: ["enterprise"] },
      { name: "HTML5 / CSS3", eras: ["builder", "enterprise"] },
      { name: "UML / ArchiMate", eras: ["builder", "enterprise"] },
      { name: "FirstSpirit", eras: ["enterprise"] },
      { name: "Joomla / WordPress", eras: ["builder"] },
      { name: "DOMEA", eras: ["enterprise"] },
      { name: "Consul", eras: ["enterprise"] },
      { name: "Apache HTTPD / Tomcat", eras: ["builder", "enterprise"] },
      { name: "Complex API Integration", eras: ["ai", "enterprise"] },
      { name: "AI-Agent Frameworks", eras: ["ai"] },
      { name: "Autonomous Automation Pipelines", eras: ["ai"] },
    ],
  },
];

export const INDUSTRIES = {
  healthTags: [
    "eGK",
    "Kassenärztliche Vereinigung",
    "GKV / Meldungen",
    "GKV / Leistungserbringer",
    "GKV / Leistung",
    "GKV / 21C",
    "Terminologieserver",
    "Zahnärztliche Abrechnung",
  ],
};

export const LANGUAGES_META = [
  { de: { name: "Deutsch", level: "Muttersprache" }, en: { name: "German", level: "Native" } },
  { de: { name: "Englisch", level: "Fließend" }, en: { name: "English", level: "Fluent" } },
  { de: { name: "Spanisch", level: "Verhandlungssicher" }, en: { name: "Spanish", level: "Negotiation level" } },
];

export const JSON_LD_KNOWS_ABOUT = [
  "Agentic AI",
  "Agentic Software Engineering",
  "Large Language Models",
  "AI Agents",
  "AI Automation",
  "Enterprise Software Architecture",
  "Enterprise Integration",
  "AI Transformation",
  "Java",
  "Spring",
  "Cloud Computing",
];

export function stackCount() {
  return STACK_GROUPS.reduce((n, g) => n + g.items.length, 0);
}

export function featuredCases() {
  return FLAGSHIP_IDS.map((id) => CASES.find((c) => c.id === id)).filter(Boolean);
}

export function labCases() {
  return CASES.filter((c) => c.section === "lab");
}

export function pagedCases() {
  return CASES.filter((c) => c.hasPage);
}

export function caseById(id) {
  return CASES.find((c) => c.id === id) ?? null;
}

export function caseHref(locale, id) {
  return `/portfolio/${locale}/cases/${id}/`;
}

export function casesBySection(section) {
  return CASES.filter((c) => c.section === section);
}
