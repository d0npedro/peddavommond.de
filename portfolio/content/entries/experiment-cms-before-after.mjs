/** @type {import('../schema.mjs').Entry} */
export default {
  "id": "experiment-cms-before-after",
  "type": "experiment",
  "honesty": "independent-rnd",
  "order": 300,
  "priority": 20,
  "placeholder": true,
  "title": {
    "de": "Webseite mit [CMS]: früher / heute",
    "en": "Website with [CMS]: before / after"
  },
  "summary": {
    "de": "Placeholder-Experiment: Webseite mit [CMS] — früher [Dauer], heute [Dauer]. Noch keine gemessenen Zahlen; Stage-1-Platzhalter für Timeline.",
    "en": "Placeholder experiment: website with [CMS] — before [Duration], after [Duration]. No measured numbers yet; Stage-1 placeholder for the timeline."
  },
  "period": {
    "date": "[Jahr]"
  },
  "topics": [
    "before-after",
    "cms",
    "placeholder"
  ],
  "stack": [
    "[CMS]",
    "[Stack]"
  ],
  "result": {
    "de": "Früher [Dauer], heute [Dauer]. [Ergebnis] — Platzhalter, keine erfundenen Zahlen.",
    "en": "Before [Duration], after [Duration]. [Result] — placeholder, no invented numbers."
  },
  "relations": {
    "roles": [],
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
