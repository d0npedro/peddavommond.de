import { de } from "./i18n-de.mjs";
import { en } from "./i18n-en.mjs";

export const I18N = { de, en };

export function copy(locale) {
  return I18N[locale] ?? I18N.de;
}
