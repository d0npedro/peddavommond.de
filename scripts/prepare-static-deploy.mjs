/**
 * Production static export for Vercel.
 * vinext SSR output currently 404s on this project (Framework "Other" / worker).
 * Desktop shell + HTML hubs ship from public/.
 */
import { cp, mkdir, readdir, writeFile, access } from "node:fs/promises";
import { join, extname } from "node:path";

const root = process.cwd();
const pub = join(root, "public");

async function exists(p) {
  try {
    await access(p);
    return true;
  } catch {
    return false;
  }
}

async function main() {
  await mkdir(pub, { recursive: true });

  // Root marketing / hub HTML pages → public (vercel rewrites)
  const entries = await readdir(root, { withFileTypes: true });
  for (const ent of entries) {
    if (!ent.isFile()) continue;
    if (extname(ent.name).toLowerCase() !== ".html") continue;
    if (ent.name === "index.html") continue; // root index handled below
    await cp(join(root, ent.name), join(pub, ent.name));
    console.log("copied", ent.name);
  }

  if (!(await exists(join(pub, "win11", "index.html")))) {
    throw new Error("public/win11/index.html missing — desktop shell not present");
  }

  // Site root → Windows 11 desktop
  const indexHtml = `<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8" />
  <meta http-equiv="refresh" content="0;url=/win11/" />
  <link rel="canonical" href="/win11/" />
  <title>Pedda vom Mond</title>
  <script>location.replace("/win11/");</script>
</head>
<body>
  <p><a href="/win11/">Desktop öffnen</a></p>
</body>
</html>
`;
  await writeFile(join(pub, "index.html"), indexHtml, "utf8");
  console.log("wrote public/index.html → /win11/");
  console.log("static deploy ready");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
