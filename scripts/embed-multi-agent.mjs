/**
 * Embed Agent Collective (d0npedro/multi-agent) under public/multi-agent/.
 * Build with Vite base /multi-agent/ so asset URLs match the public path.
 *
 * Source resolution (first match):
 *   1. MULTI_AGENT_PATH env
 *   2. Sibling ../multi-agent (local monorepo layout)
 *   3. Shallow clone of https://github.com/d0npedro/multi-agent into .cache/multi-agent
 *
 * Skip: MULTI_AGENT_SKIP=1
 */
import { spawnSync } from "node:child_process";
import { access, cp, mkdir, rm, writeFile } from "node:fs/promises";
import { join } from "node:path";

const root = process.cwd();
const outDir = join(root, "public", "multi-agent");
const cacheDir = join(root, ".cache", "multi-agent");
const repoUrl = "https://github.com/d0npedro/multi-agent.git";
const basePath = "/multi-agent/";

async function exists(p) {
  try {
    await access(p);
    return true;
  } catch {
    return false;
  }
}

function run(cmd, args, cwd, opts = {}) {
  // Windows: npm/git are cmd shims — shell required for reliable spawn.
  // Args are fixed literals only (no user input).
  const r = spawnSync(cmd, args, {
    cwd,
    stdio: "inherit",
    shell: process.platform === "win32",
    env: { ...process.env, ...opts.env },
  });
  if (r.error) throw r.error;
  if (r.status !== 0) {
    throw new Error(`${cmd} ${args.join(" ")} failed (exit ${r.status})`);
  }
}

async function resolveSource() {
  if (process.env.MULTI_AGENT_PATH) {
    const p = process.env.MULTI_AGENT_PATH;
    if (!(await exists(join(p, "package.json")))) {
      throw new Error(`MULTI_AGENT_PATH set but package.json missing: ${p}`);
    }
    console.log("multi-agent source: MULTI_AGENT_PATH", p);
    return p;
  }

  const sibling = join(root, "..", "multi-agent");
  if (await exists(join(sibling, "package.json"))) {
    console.log("multi-agent source: sibling", sibling);
    return sibling;
  }

  console.log("multi-agent source: clone", repoUrl);
  await mkdir(join(root, ".cache"), { recursive: true });
  if (await exists(join(cacheDir, ".git"))) {
    run("git", ["-C", cacheDir, "fetch", "--depth", "1", "origin", "main"]);
    run("git", ["-C", cacheDir, "checkout", "FETCH_HEAD"]);
  } else {
    await rm(cacheDir, { recursive: true, force: true });
    run("git", ["clone", "--depth", "1", "--branch", "main", repoUrl, cacheDir]);
  }
  return cacheDir;
}

async function main() {
  if (process.env.MULTI_AGENT_SKIP === "1") {
    console.log("multi-agent embed skipped (MULTI_AGENT_SKIP=1)");
    return;
  }

  const src = await resolveSource();

  // Fresh install + subpage build (base /multi-agent/)
  run("npm", ["ci"], src);
  run("npm", ["run", "build:subpage"], src);

  const dist = join(src, "dist");
  if (!(await exists(join(dist, "index.html")))) {
    throw new Error(`multi-agent dist/index.html missing after build: ${dist}`);
  }

  // Sanity: assets must be prefixed for the public path
  const { readFile } = await import("node:fs/promises");
  const html = await readFile(join(dist, "index.html"), "utf8");
  if (!html.includes(`${basePath}assets/`)) {
    throw new Error(
      `dist/index.html missing asset prefix ${basePath}assets/ — refuse to embed broken base path`,
    );
  }

  await rm(outDir, { recursive: true, force: true });
  await mkdir(outDir, { recursive: true });
  await cp(dist, outDir, { recursive: true });

  // Marker for ops / debugging (not required by the SPA)
  await writeFile(
    join(outDir, ".embed-meta.json"),
    JSON.stringify(
      {
        source: src,
        base: basePath,
        embeddedAt: new Date().toISOString(),
        repo: repoUrl,
      },
      null,
      2,
    ),
    "utf8",
  );

  console.log("embedded multi-agent → public/multi-agent/ (base", basePath + ")");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
