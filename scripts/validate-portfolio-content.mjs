import { assertPortfolioContent } from "../portfolio/content/check.mjs";

try {
  const stats = assertPortfolioContent();
  console.log(`portfolio content ok (${stats.entries} entries, ${stats.timeline} on the timeline)`);
} catch (err) {
  console.error("portfolio content invalid:\n" + err.message);
  process.exit(1);
}
