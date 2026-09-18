/**
 * Generate the content-driven portfolio from portfolio/*.
 * Replaces the compiled Next.js index.html for DE/EN while keeping
 * the existing CSS, fonts, and Open Graph images.
 */
import { mkdir, writeFile, copyFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { LOCALES, DEFAULT_LOCALE, pagedCases } from "../portfolio/shared.mjs";
import { renderPage, renderCv, renderSitemap, renderCasePage } from "../portfolio/render.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const pub = join(root, "public", "portfolio");

async function write(path, contents) {
  await mkdir(dirname(path), { recursive: true });
  await writeFile(path, contents);
  console.log("wrote", path.replace(root + "/", ""));
}

async function main() {
  for (const locale of LOCALES) {
    await write(join(pub, locale, "index.html"), renderPage(locale));
    for (const item of pagedCases()) {
      await write(join(pub, locale, "cases", item.id, "index.html"), renderCasePage(locale, item.id));
    }
  }
  await write(join(pub, "cv", "index.html"), renderCv(DEFAULT_LOCALE));
  await write(join(pub, "de", "sitemap.xml"), renderSitemap());
  await write(join(pub, "en", "sitemap.xml"), renderSitemap());
  await copyFile(join(root, "portfolio", "app.js"), join(pub, "app.js"));
  await copyFile(join(root, "portfolio", "portfolio.css"), join(pub, "portfolio.css"));
  console.log("portfolio static pages ready");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
