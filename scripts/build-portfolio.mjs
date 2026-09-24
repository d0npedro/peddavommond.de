/**
 * Generate the content-driven portfolio from portfolio/*.
 * Replaces the compiled Next.js index.html for DE/EN while keeping
 * the existing CSS, fonts, and Open Graph images.
 */
import { mkdir, writeFile, copyFile, readdir } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { LOCALES, DEFAULT_LOCALE, pagedCases } from "../portfolio/shared.mjs";
import { renderPage, renderCv, renderSitemap, renderCasePage } from "../portfolio/render.mjs";
import { assertPortfolioContent } from "../portfolio/content/check.mjs";
import { timelineEntries } from "../portfolio/content/index.mjs";
import {
  renderContactPage,
  renderDeepDivePage,
  renderRolePage,
  renderTimelinePage,
  sitemapEntries,
} from "../portfolio/render-stage1.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const pub = join(root, "public", "portfolio");

async function write(path, contents) {
  await mkdir(dirname(path), { recursive: true });
  await writeFile(path, contents);
  console.log("wrote", path.replace(root + "/", ""));
}

async function main() {
  assertPortfolioContent();
  for (const locale of LOCALES) {
    await write(join(pub, locale, "index.html"), renderPage(locale));
    for (const item of pagedCases()) {
      await write(join(pub, locale, "cases", item.id, "index.html"), renderCasePage(locale, item.id));
    }
    await write(join(pub, locale, "rollen", "agentic-ai", "index.html"), renderRolePage(locale, "agentic-ai"));
    await write(join(pub, locale, "rollen", "java-backend", "index.html"), renderRolePage(locale, "java-backend"));
    await write(join(pub, locale, "lebenslauf", "index.html"), renderTimelinePage(locale));
    for (const entry of timelineEntries()) {
      await write(join(pub, locale, "lebenslauf", entry.id, "index.html"), renderDeepDivePage(locale, entry.id));
    }
    await write(join(pub, locale, "kontakt", "index.html"), renderContactPage(locale));
  }
  await write(join(pub, "cv", "index.html"), renderCv(DEFAULT_LOCALE));
  const sitemap = renderSitemap(sitemapEntries());
  await write(join(pub, "de", "sitemap.xml"), sitemap);
  await write(join(pub, "en", "sitemap.xml"), sitemap);
  await copyFile(join(root, "portfolio", "app.js"), join(pub, "app.js"));
  const motionSrc = join(root, "portfolio", "motion");
  const motionDest = join(pub, "motion");
  await mkdir(motionDest, { recursive: true });
  for (const name of await readdir(motionSrc)) {
    if (!name.endsWith(".js")) continue;
    await copyFile(join(motionSrc, name), join(motionDest, name));
    console.log("wrote", `public/portfolio/motion/${name}`);
  }
  // Production token layer. HTML links /portfolio/portfolio.css after the Next export.
  await copyFile(join(root, "portfolio", "portfolio.css"), join(pub, "portfolio.css"));
  await copyFile(join(root, "portfolio", "stage1.css"), join(pub, "stage1.css"));
  console.log("wrote public/portfolio/stage1.css");
  console.log("portfolio static pages ready");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
