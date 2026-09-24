/** @type {import('../schema.mjs').Entry} */
export default {
  "id": "experiment-backend-change-loop",
  "type": "experiment",
  "honesty": "independent-rnd",
  "order": 310,
  "priority": 19,
  "placeholder": true,
  "title": {
    "de": "Backend-Änderung: Proposal → Review",
    "en": "Backend change: proposal → review"
  },
  "summary": {
    "de": "Placeholder: Zeit von Proposal bis reviewbarem Diff in einem [Stack]-Backend — früher [Dauer], heute [Dauer] (KI-beschleunigt, weiterhin reviewpflichtig).",
    "en": "Placeholder: time from proposal to reviewable diff in a [Stack] backend — before [Duration], after [Duration] (AI-accelerated, still review-required)."
  },
  "period": {
    "date": { "de": "[Jahr]", "en": "[Year]" }
  },
  "topics": [
    "java",
    "ai-augmented",
    "placeholder"
  ],
  "stack": [
    "[Stack]",
    "Java"
  ],
  "result": {
    "de": "Früher [Dauer], heute [Dauer]. Quelle ausstehend: [Arbeitgeber] / [Messmethode].",
    "en": "Before [Duration], after [Duration]. Source pending: [Employer] / [Measurement method]."
  },
  "relations": {
    "roles": [
      "role-java-backend"
    ],
    "cases": [],
    "cv": []
  },
  "show": {
    "room": false,
    "tiles": false,
    "timeline": true,
    "casePage": false
  }
};
