/** @type {import('../schema.mjs').Entry} */
export default {
  "id": "case-dz-bank-okvp",
  "honesty": "client",
  "order": 60,
  "priority": 70,
  "title": {
    "de": "DZ BANK OKVP",
    "en": "DZ BANK OKVP"
  },
  "summary": {
    "de": "Migration der Fiducia-&-GAD-Vertriebsplattformen auf OKVP: entkoppelte Features, OpenShift-Pipelines, Observability. Kein AI-Bestandteil.",
    "en": "Migration of Fiducia & GAD sales platforms onto OKVP: decoupled features, OpenShift pipelines, observability. No AI component."
  },
  "period": {
    "date": "2020"
  },
  "topics": [
    "banking",
    "platform",
    "observability"
  ],
  "stack": [
    "Java",
    "Spring",
    "Angular",
    "Kafka",
    "OpenShift 4",
    "Consul",
    "Prometheus",
    "Grafana",
    "Dynatrace"
  ],
  "result": {
    "de": "Entkoppelte Features, kontrollierte Delivery, produktionsnahe Observability. Beobachtet in der Delivery. Keine veröffentlichten Performance-Metriken.",
    "en": "Decoupled features, controlled delivery, near-production observability. Observed in delivery. No published performance metrics."
  },
  "relations": {
    "roles": [
      "role-java-backend"
    ],
    "cases": [
      "case-deutschlandcard"
    ],
    "cv": [
      "cv-adesso-dz-bank-okvp"
    ]
  },
  "chapters": {
    "ausgangslage": {
      "de": "DZ BANK / adesso, 2020. Vertriebsplattformen von Fiducia & GAD sollten auf die neue SDK-/Microservice-Plattform OKVP.",
      "en": "DZ BANK / adesso, 2020. Fiducia & GAD sales platforms were to move onto the new SDK/microservice platform OKVP."
    },
    "schnitt": {
      "de": "Entkopplung in unabhängig auslieferbare „Features“; Multi-Stage-Pipelines auf OpenShift; Observability mit Prometheus, Grafana und Dynatrace.",
      "en": "Decoupling into independently shippable “Features”; multi-stage OpenShift pipelines; observability with Prometheus, Grafana and Dynatrace."
    },
    "umsetzung": {
      "de": "OKVP zerlegt gewachsene Plattformen in Features. Delivery über OpenShift; Service Discovery über Consul.",
      "en": "OKVP splits grown platforms into features. Delivery via OpenShift; service discovery via Consul."
    },
    "nachweis": {
      "de": "Kein AI-/LLM-Bestandteil. Bewertung über unabhängig auslieferbare Features, Pipelines und Observability.",
      "en": "No AI/LLM component. Assessed via independently shippable features, pipelines and observability."
    },
    "ergebnis": {
      "de": "Entkoppelte Features, kontrollierte Delivery. Keine veröffentlichten Performance-Metriken.",
      "en": "Decoupled features, controlled delivery. No published performance metrics."
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
