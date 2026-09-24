/**
 * Content-Schema für Portfolio-Einträge (Stage 1–3).
 * Vanilla Validator, keine Dependencies.
 *
 * Typen: 'role' | 'case' | 'experiment' | 'cv'
 * Honesty: 'independent-rnd' | 'client' | 'employment'
 *
 * Regeln:
 * - Pflichtfelder je Typ (siehe validateEntry)
 * - DE/EN-Parität für bilinguale Felder
 * - Jedes result.{de,en}, das Ziffern enthält, braucht result.source
 */

export const HONESTY = Object.freeze([
  "independent-rnd",
  "client",
  "employment",
]);

export const TYPES = Object.freeze(["role", "case", "experiment", "cv"]);

const BILINGUAL_KEYS = ["title", "summary", "engagement"];
const BILINGUAL_LIST_KEYS = ["fits", "notFits", "deliverables", "tasks"];
const CHAPTER_KEYS = [
  "ausgangslage",
  "schnitt",
  "umsetzung",
  "nachweis",
  "ergebnis",
];

const HAS_DIGIT = /\d/;

/**
 * @param {unknown} entry
 * @returns {{ok:boolean, errors:string[]}}
 */
export function validateEntry(entry) {
  const errors = [];
  if (!entry || typeof entry !== "object") {
    return { ok: false, errors: ["entry must be an object"] };
  }
  const e = /** @type {Record<string, any>} */ (entry);

  if (!e.id || typeof e.id !== "string") errors.push("id required (string)");
  if (!TYPES.includes(e.type))
    errors.push("type must be one of " + TYPES.join("|"));
  if (!HONESTY.includes(e.honesty))
    errors.push("honesty must be one of " + HONESTY.join("|"));
  if (!e.show || typeof e.show !== "object")
    errors.push("show required ({room,tiles,timeline,casePage})");

  for (const k of BILINGUAL_KEYS) {
    if (e[k] != null) checkBilingual(e[k], k, errors);
  }
  if (!e.title) errors.push("title{de,en} required");
  if (!e.summary) errors.push("summary{de,en} required");

  for (const k of BILINGUAL_LIST_KEYS) {
    if (e[k] != null) checkBilingualList(e[k], k, errors);
  }

  if (e.result != null) {
    if (typeof e.result !== "object") errors.push("result must be object");
    else {
      checkBilingual(e.result, "result", errors);
      const de = String(e.result.de ?? "");
      const en = String(e.result.en ?? "");
      if ((HAS_DIGIT.test(de) || HAS_DIGIT.test(en)) && !e.result.source) {
        errors.push(
          "result contains digits but result.source is missing (no invented KPIs)"
        );
      }
    }
  }

  if (e.type === "role") {
    for (const k of ["fits", "notFits", "deliverables"]) {
      if (!e[k]) errors.push("role." + k + "{de[],en[]} required");
    }
    if (!e.engagement) errors.push("role.engagement{de,en} required");
  }

  if (e.type === "case" && e.chapters) {
    for (const ck of CHAPTER_KEYS) {
      if (e.chapters[ck] != null)
        checkBilingual(e.chapters[ck], "chapters." + ck, errors);
    }
  }

  if (e.type === "cv") {
    if (!e.company) errors.push("cv.company required");
    if (!e.period) errors.push("cv.period required");
  }

  if (e.media?.alt) checkBilingual(e.media.alt, "media.alt", errors);

  return { ok: errors.length === 0, errors };
}

/**
 * @param {unknown[]} entries
 * @returns {{ok:boolean, errors:string[], byId:Record<string,string[]>}}
 */
export function validateAll(entries) {
  const byId = {};
  const errors = [];
  const ids = new Set();
  for (const entry of entries) {
    const r = validateEntry(entry);
    const id = entry?.id ?? "(missing-id)";
    if (ids.has(id)) {
      errors.push("duplicate id: " + id);
      byId[id] = [...(byId[id] ?? []), "duplicate id"];
    }
    ids.add(id);
    if (!r.ok) {
      byId[id] = r.errors;
      for (const err of r.errors) errors.push(id + ": " + err);
    }
  }
  for (const entry of entries) {
    const rel = entry?.relations;
    if (!rel) continue;
    for (const group of ["cases", "roles", "cv"]) {
      for (const ref of rel[group] ?? []) {
        if (!ids.has(ref)) {
          const msg =
            entry.id +
            ": relations." +
            group +
            " references missing id '" +
            ref +
            "'";
          errors.push(msg);
          byId[entry.id] = [...(byId[entry.id] ?? []), msg];
        }
      }
    }
  }
  return { ok: errors.length === 0, errors, byId };
}

function checkBilingual(v, label, errors) {
  if (!v || typeof v !== "object") {
    errors.push(label + " must be {de,en}");
    return;
  }
  if (typeof v.de !== "string" || !v.de.trim())
    errors.push(label + ".de required (non-empty string)");
  if (typeof v.en !== "string" || !v.en.trim())
    errors.push(label + ".en required (non-empty string)");
}

function checkBilingualList(v, label, errors) {
  if (!v || typeof v !== "object") {
    errors.push(label + " must be {de:string[],en:string[]}");
    return;
  }
  if (!Array.isArray(v.de) || !Array.isArray(v.en)) {
    errors.push(label + " must be {de:string[],en:string[]}");
    return;
  }
  if (v.de.length !== v.en.length) {
    errors.push(
      label +
        ": DE/EN list length mismatch (" +
        v.de.length +
        " vs " +
        v.en.length +
        ")"
    );
  }
}

export default { validateEntry, validateAll, TYPES, HONESTY };
