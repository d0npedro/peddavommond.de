/** Quick link shared by every portfolio page. Same slugs in DE and EN. */

export function offerHref(locale) {
  return `/portfolio/${locale}/rollen/agentic-ai/#angebot`;
}

export function offerLabel(locale) {
  return locale === "de" ? "Direkt zum Angebot" : "Straight to the offer";
}
