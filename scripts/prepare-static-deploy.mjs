/**
 * Production static export for Vercel.
 * vinext SSR output currently 404s on this project (Framework "Other" / worker).
 * Hub landing at public/index.html + desktop shell + HTML hubs ship from public/.
 * Also embeds Agent Collective at /multi-agent/.
 * Herd the Ravers: Option A proxy in vercel.json → musicfestival-nine.vercel.app
 * (not embedded — see musicfestival docs/HANDOVER-peddavommond.de.md).
 */
import { cp, mkdir, readdir, rm, access } from "node:fs/promises";
import { join, extname } from "node:path";
import { spawnSync } from "node:child_process";

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

function runNode(script) {
  const r = spawnSync(process.execPath, [script], {
    cwd: root,
    stdio: "inherit",
    env: process.env,
  });
  if (r.status !== 0) {
    throw new Error(`${script} failed (exit ${r.status})`);
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
    // Skip Claude/artifact bundles and local drafts — they are not site pages.
    if (ent.name.includes(" - ") || ent.name.startsWith("_")) continue;
    await cp(join(root, ent.name), join(pub, ent.name));
    console.log("copied", ent.name);
  }

  if (!(await exists(join(pub, "win11", "index.html")))) {
    throw new Error("public/win11/index.html missing — desktop shell not present");
  }

  if (!(await exists(join(pub, "index.html")))) {
    throw new Error("public/index.html missing — hub landing not present");
  }
  if (!(await exists(join(pub, "hub", "banner.png")))) {
    throw new Error("public/hub/banner.png missing — hub assets not present");
  }
  console.log("kept public/index.html as streaming hub landing");

  // Agent Collective → public/multi-agent/ (embed)
  runNode(join(root, "scripts", "embed-multi-agent.mjs"));

  // Herd the Ravers is NOT embedded. Option A: vercel.json rewrites proxy
  // /musicfestival/* → https://musicfestival-nine.vercel.app/musicfestival/*
  // Remove any stale local copy so static files cannot shadow the proxy.
  const musicfestivalDir = join(pub, "musicfestival");
  if (await exists(musicfestivalDir)) {
    await rm(musicfestivalDir, { recursive: true, force: true });
    console.log("removed public/musicfestival/ (proxy Option A, no local embed)");
  }

  console.log("static deploy ready");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
