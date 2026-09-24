/** @type {import('../schema.mjs').Entry} */
export default {
  "id": "case-deutschlandcard",
  "honesty": "client",
  "order": 50,
  "priority": 93,
  "title": {
    "de": "DeutschlandCard — Cloud, Identity, Integration",
    "en": "DeutschlandCard — Cloud, Identity, Integration"
  },
  "summary": {
    "de": "Bezahlte Cloudifizierung des bundesweiten Loyalty-Programms: Azure AD B2C, Terraform, Kubernetes. Enterprise-Boden für spätere AI-Integration — der Case selbst ist kein AI-Projekt.",
    "en": "Paid cloudification of the nationwide loyalty program: Azure AD B2C, Terraform, Kubernetes. Enterprise ground for later AI integration — the case itself is not an AI project."
  },
  "period": {
    "from": "2023",
    "to": "2026"
  },
  "topics": [
    "loyalty",
    "cloud",
    "identity",
    "enterprise"
  ],
  "stack": [
    "Spring Boot",
    "Spring Cloud",
    "Azure AD B2C",
    "Kubernetes",
    "Terraform",
    "Oracle OCI",
    "Airflow"
  ],
  "result": {
    "de": "Services in einer skalierbaren Azure-Umgebung; bestehende Schnittstellen weiter nutzbar. Beobachtet in der Delivery, nicht öffentlich gemessen. Keine Volumen- oder Latenzzahlen (NDA).",
    "en": "Services in a scalable Azure environment; existing interfaces remain usable. Observed in delivery, not publicly measured. No volume or latency numbers (NDA)."
  },
  "relations": {
    "roles": [
      "role-java-backend",
      "role-agentic-ai-consulting"
    ],
    "cases": [
      "case-dz-bank-okvp",
      "case-bitmarck-bitgo"
    ],
    "cv": [
      "cv-direct-services-deutschlandcard"
    ]
  },
  "chapters": {
    "ausgangslage": {
      "de": "Bundesweites Loyalty-Programm (direct services Gütersloh, 2023–2026). Partner-Onboarding, Echtzeit-Punkte und Kampagnen mussten in eine kontrollierbare Cloud.",
      "en": "Nationwide loyalty program (direct services Gütersloh, 2023–2026). Partner onboarding, realtime points and campaigns had to move into a controllable cloud."
    },
    "schnitt": {
      "de": "Cloudifizierung nach Azure; individuelle Azure-AD-B2C-Login-Journey; Infrastruktur über Terraform — statt eines Big-Bang-Schnitts.",
      "en": "Cloudification to Azure; custom Azure AD B2C login journey; infrastructure via Terraform — instead of a big-bang cut."
    },
    "umsetzung": {
      "de": "Spring-Boot-/Cloud-Services, Azure AD B2C, Terraform, Kubernetes/Azure. Partner-APIs bleiben anschlussfähig.",
      "en": "Spring Boot / Cloud services, Azure AD B2C, Terraform, Kubernetes/Azure. Partner APIs stay connectable."
    },
    "nachweis": {
      "de": "Kein AI-/LLM-Bestandteil. Bewertung über Identity, reproduzierbare Infrastruktur und weiter nutzbare Partner-APIs.",
      "en": "No AI/LLM component. Assessed via identity, reproducible infrastructure and still-usable partner APIs."
    },
    "ergebnis": {
      "de": "Skalierbare Azure-Umgebung, beobachtete Delivery. Keine Volumen-/Latenzzahlen (NDA).",
      "en": "Scalable Azure environment, observed delivery. No volume/latency numbers (NDA)."
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
