#!/usr/bin/env node
/**
 * Build, pack and install this package into its consumers, without publishing.
 *
 * Uses `npm pack` rather than `npm link` deliberately: pack produces the exact
 * tarball npm would publish, so it honours `"files"` and a missing file fails
 * here instead of after release. `npm link` symlinks the whole working tree —
 * everything resolves locally and can still 404 once published — and gives the
 * package its own node_modules, which means a second copy of zod and schema
 * identity checks that mysteriously stop matching.
 *
 * Installs with `--no-save`, so a consumer's package.json and lockfile are left
 * alone. A plain `npm install` in the consumer puts the registry version back;
 * `--restore` does it for you.
 *
 * Usage
 *   node scripts/local-release.js                 build, pack, install everywhere
 *   node scripts/local-release.js --check         ... then run each consumer's typecheck
 *   node scripts/local-release.js --skip-build    reuse the current dist/
 *   node scripts/local-release.js --to ../Other   override the consumer list (repeatable)
 *   node scripts/local-release.js --restore       reinstall the registry version
 *
 * Consumers default to the siblings below and can be overridden with the
 * TAIGER_MODEL_CONSUMERS env var (path-separator delimited) or --to.
 */

const { execSync } = require('child_process');
const fs = require('fs');
const os = require('os');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const pkg = require(path.join(ROOT, 'package.json'));

const DEFAULT_CONSUMERS = [
  '../TaiGerPortalService',
  '../TaiGerPortalStaticWebsite'
];

/** Each consumer's own type-check command, run only with `--check`. */
const CHECK_COMMANDS = {
  TaiGerPortalService: 'npx tsc --noEmit',
  TaiGerPortalStaticWebsite: 'npx tsc -b'
};

// ---------------------------------------------------------------- args
const argv = process.argv.slice(2);
const has = (flag) => argv.includes(flag);

const explicitTargets = [];
for (let i = 0; i < argv.length; i += 1) {
  if (argv[i] === '--to' && argv[i + 1]) {
    explicitTargets.push(argv[i + 1]);
    i += 1;
  } else if (argv[i].startsWith('--to=')) {
    explicitTargets.push(argv[i].slice('--to='.length));
  }
}

const fromEnv = (process.env.TAIGER_MODEL_CONSUMERS || '')
  .split(path.delimiter)
  .filter(Boolean);

const consumers = (
  explicitTargets.length ? explicitTargets : fromEnv.length ? fromEnv : DEFAULT_CONSUMERS
).map((p) => path.resolve(ROOT, p));

// ---------------------------------------------------------------- helpers
const run = (cmd, cwd) => {
  console.log(`\n$ ${cmd}\n  (in ${cwd})`);
  execSync(cmd, { cwd, stdio: 'inherit', shell: true });
};

const label = (dir) => path.basename(dir);

const assertConsumer = (dir) => {
  if (!fs.existsSync(path.join(dir, 'package.json'))) {
    throw new Error(`Not a package: ${dir}`);
  }
};

// ---------------------------------------------------------------- restore
if (has('--restore')) {
  for (const dir of consumers) {
    assertConsumer(dir);
    // Re-resolve from the registry using whatever range the consumer declares,
    // rather than pinning to whatever happened to be packed locally.
    run(`npm install ${pkg.name}@${pkg.version} --no-save`, dir);
  }
  console.log(`\nRestored ${pkg.name}@${pkg.version} from the registry.`);
  process.exit(0);
}

// ---------------------------------------------------------------- build + pack
if (!has('--skip-build')) {
  run('npm run build', ROOT);
}

// Pack into a temp dir so the repo never accumulates stray .tgz files.
const outDir = fs.mkdtempSync(path.join(os.tmpdir(), 'taiger-model-pack-'));
run(`npm pack --pack-destination "${outDir}"`, ROOT);

const [tarball] = fs.readdirSync(outDir).filter((f) => f.endsWith('.tgz'));
if (!tarball) {
  throw new Error(`npm pack produced no tarball in ${outDir}`);
}
const tarballPath = path.join(outDir, tarball);
console.log(`\nPacked ${tarball}`);

// ---------------------------------------------------------------- install
const failures = [];

for (const dir of consumers) {
  assertConsumer(dir);
  console.log(`\n=== ${label(dir)} ===`);
  // --no-save: this is a test install, not a dependency change. The consumer's
  // package.json and lockfile keep pointing at the registry.
  run(`npm install "${tarballPath}" --no-save`, dir);

  if (has('--check')) {
    const check = CHECK_COMMANDS[label(dir)];
    if (!check) {
      console.log(`  (no check command registered for ${label(dir)} — skipped)`);
      continue;
    }
    try {
      run(check, dir);
      console.log(`  ${label(dir)}: OK`);
    } catch {
      failures.push(label(dir));
      console.error(`  ${label(dir)}: FAILED`);
    }
  }
}

// ---------------------------------------------------------------- report
console.log(
  `\n${pkg.name}@${pkg.version} installed into ${consumers.length} consumer(s) from a local pack.`
);
console.log('Undo with: node scripts/local-release.js --restore');

if (failures.length) {
  console.error(`\nType-check failed in: ${failures.join(', ')}`);
  process.exit(1);
}
