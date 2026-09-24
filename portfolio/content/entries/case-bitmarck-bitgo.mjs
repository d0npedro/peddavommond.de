/** @type {import('../schema.mjs').Entry} */
export default {
  "id": "case-bitmarck-bitgo",
  "honesty": "client",
  "order": 70,
  "priority": 69,
  "title": {
    "de": "BITMARCK bitGo_Web",
    "en": "BITMARCK bitGo_Web"
  },
  "summary": {
    "de": "Regulierte GKV-Online-Geschäftsstelle: Legacy-Entkopplung, REST zu Bestandssystemen, 2FA für besonders geschützte Daten. Kein AI-Bestandteil.",
    "en": "Regulated GKV online service office: legacy decoupling, REST to existing systems, 2FA for especially protected data. No AI component."
  },
  "period": {
    "from": "2019",
    "to": "2020"
  },
  "topics": [
    "gkv",
    "security",
    "legacy"
  ],
  "stack": [
    "Spring Boot",
    "Spring Security",
    "OAuth2",
    "FirstSpirit",
    "Thymeleaf",
    "REST"
  ],
  "result": {
    "de": "Technische Neustrukturierung mit Zwei-Faktor-Authentifizierung und entkoppelten Schnittstellen. Beobachtet in der Delivery. Keine öffentlichen Durchsatzzahlen.",
    "en": "Technical restructuring with two-factor authentication and decoupled interfaces. Observed in delivery. No public throughput numbers."
  },
  "relations": {
    "roles": [
      "role-java-backend"
    ],
    "cases": [
      "case-deutschlandcard"
    ],
    "cv": [
      "cv-adesso-bitmarck-bitgo"
    ]
  },
  "chapters": {
    "ausgangslage": {
      "de": "BITMARCK Technik, 2019–2020. Digitale Kanäle gesetzlicher Krankenkassen im Zusammenspiel mit BITMARCK_21c|ng.",
      "en": "BITMARCK Technik, 2019–2020. Digital channels of statutory health insurers interacting with BITMARCK_21c|ng."
    },
    "schnitt": {
      "de": "Module aus der Legacy-Landschaft entkoppeln; REST; Zwei-Faktor-Authentifizierung; konfigurierbares Frontend statt monolithischem Redesign.",
      "en": "Decouple modules from the legacy landscape; REST; two-factor authentication; configurable frontend instead of a monolithic redesign."
    },
    "umsetzung": {
      "de": "bitGo_Web sitzt vor BITMARCK_21c|ng und Legacy-Bestand. REST und Zwei-Faktor-Authentifizierung koppeln die Online-Geschäftsstelle an sensible Daten.",
      "en": "bitGo_Web sits in front of BITMARCK_21c|ng and legacy stock. REST and two-factor authentication couple the online service office to sensitive data."
    },
    "nachweis": {
      "de": "Kein AI-/LLM-Bestandteil. Bewertung über Zwei-Faktor-Authentifizierung, REST an Bestand und konfigurierbares Frontend.",
      "en": "No AI/LLM component. Assessed via two-factor authentication, REST to stock systems and configurable frontend."
    },
    "ergebnis": {
      "de": "Neustrukturierung mit Zwei-Faktor-Authentifizierung. Keine öffentlichen Durchsatzzahlen.",
      "en": "Restructuring with two-factor authentication. No public throughput numbers."
    }
  },
  "show": {
    "room": false,
    "tiles": true,
    "timeline": true,
    "casePage": true
  },
  "type": "case"
};
