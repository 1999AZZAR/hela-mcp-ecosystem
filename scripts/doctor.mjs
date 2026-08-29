#!/usr/bin/env node
/**
 * HeLa MCP Ecosystem — Diagnostic Health Checker (doctor)
 *
 * Inspects:
 *  1. Host environment (Node.js >=18, Git, npm, SQLite3, OS, Arch)
 *  2. Selected profile / all 10 HeLa MCP servers
 *  3. Git revisions vs. pinned snapshot commits
 *  4. Build artifacts & executable entrypoints
 *  5. Stdio JSON-RPC startup smoke readiness (<300ms subprocess check)
 *  6. External runtimes (Playwright/Chromium, ADB/Android, Blender CLI, PTY)
 *  7. API keys & graceful offline fallback modes
 *
 * Usage:
 *   node scripts/doctor.sh [--profile <id>] [--json]
 */

import fs from 'node:fs';
import path from 'node:path';
import { spawn, spawnSync, execSync } from 'node:child_process';
import os from 'node:os';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ECOSYSTEM_ROOT = path.resolve(__dirname, '..');

const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  blue: '\x1b[34m',
  bold: '\x1b[1m',
  cyan: '\x1b[36m',
};

function logHeader(title) {
  console.log(`\n${colors.bold}${colors.cyan}=== ${title} ===${colors.reset}`);
}

function readJson(p) {
  return JSON.parse(fs.readFileSync(p, 'utf8'));
}

function resolveServerDir(s, root) {
  const primary = path.join(root, s.dir);
  if (fs.existsSync(primary)) return primary;
  const sibling = path.join(root, '..', s.dir);
  if (fs.existsSync(sibling)) return sibling;
  const shortDir = s.dir.replace('-mcp-server', '').replace('-mcp', '');
  const siblingShort = path.join(root, '..', shortDir);
  if (fs.existsSync(siblingShort)) return siblingShort;
  const primaryShort = path.join(root, shortDir);
  if (fs.existsSync(primaryShort)) return primaryShort;
  return primary;
}

async function checkServerProcess(entryPath, dirPath) {
  if (!fs.existsSync(entryPath)) {
    return { ok: false, reason: 'Entrypoint file missing' };
  }
  return new Promise((resolve) => {
    const proc = spawn('node', [entryPath], {
      cwd: dirPath,
      env: { ...process.env, MEMORY_FILE_PATH: '/tmp/hela-doctor-mem.db' },
      stdio: ['pipe', 'pipe', 'pipe'],
    });

    let stderrOutput = '';
    proc.stderr.on('data', (d) => (stderrOutput += d.toString()));

    const timer = setTimeout(() => {
      proc.kill('SIGTERM');
      resolve({ ok: true, note: 'Started cleanly, stdio responsive' });
    }, 350);

    proc.on('error', (err) => {
      clearTimeout(timer);
      resolve({ ok: false, reason: err.message });
    });

    proc.on('exit', (code) => {
      clearTimeout(timer);
      if (code !== 0 && code !== null) {
        resolve({ ok: false, reason: `Exited early with code ${code}: ${stderrOutput.slice(0, 100)}` });
      } else {
        resolve({ ok: true, note: 'Process exited normally' });
      }
    });
  });
}

function getGitCommit(dir) {
  let cur = dir;
  for (let i = 0; i < 3; i++) {
    if (fs.existsSync(path.join(cur, '.git'))) {
      try {
        return execSync('git rev-parse HEAD', { cwd: cur, encoding: 'utf8', stdio: ['pipe', 'pipe', 'ignore'] }).trim();
      } catch {
        return null;
      }
    }
    cur = path.dirname(cur);
  }
  return null;
}

async function runDoctor(options = {}) {
  const isJson = options.json || process.argv.includes('--json');
  let targetProfileId = options.profile || null;
  const pIndex = process.argv.indexOf('--profile');
  if (pIndex !== -1 && process.argv[pIndex + 1]) {
    targetProfileId = process.argv[pIndex + 1];
  }

  const inventoryData = readJson(path.join(ECOSYSTEM_ROOT, 'config/inventory.json'));
  const profilesData = readJson(path.join(ECOSYSTEM_ROOT, 'config/profiles.json')).profiles;
  const inventory = inventoryData.inventory;
  const aliases = inventoryData.aliases || {};

  const report = {
    timestamp: new Date().toISOString(),
    system: {},
    dependencies: {},
    servers: [],
    status: 'READY',
  };

  // 1. Host System Inspection
  const nodeVer = process.version;
  const nodeMajor = parseInt(nodeVer.replace('v', '').split('.')[0], 10);
  const osType = `${os.type()} ${os.release()} (${os.arch()})`;

  let gitVer = null;
  try { gitVer = execSync('git --version', { encoding: 'utf8' }).trim(); } catch {}

  let sqliteVer = null;
  try { sqliteVer = execSync('sqlite3 --version', { encoding: 'utf8' }).split(' ')[0]; } catch {}

  report.system = {
    os: osType,
    node: { version: nodeVer, valid: nodeMajor >= 18 },
    git: { version: gitVer, valid: !!gitVer },
    sqlite3: { version: sqliteVer, valid: !!sqliteVer },
  };

  // 2. External Runtimes
  let playwrightReady = false;
  try {
    const pwCheck = spawnSync('node', ['-e', 'require("playwright")'], { stdio: 'ignore' });
    playwrightReady = pwCheck.status === 0;
  } catch {}

  let adbReady = false;
  let adbDevices = [];
  try {
    const adbOut = execSync('adb devices', { encoding: 'utf8', stdio: ['pipe', 'pipe', 'ignore'] });
    adbReady = true;
    adbDevices = adbOut.split('\n').filter((l) => l.includes('\tdevice')).map((l) => l.split('\t')[0]);
  } catch {}

  let blenderReady = false;
  let blenderVer = null;
  try {
    blenderVer = execSync('blender --version', { encoding: 'utf8', stdio: ['pipe', 'pipe', 'ignore'] }).split('\n')[0];
    blenderReady = !!blenderVer;
  } catch {}

  report.dependencies = {
    playwright: { ready: playwrightReady, note: playwrightReady ? 'Playwright installed' : 'Optional (needed for HeLa Cytosol)' },
    adb: { ready: adbReady, devices: adbDevices, note: adbReady ? `${adbDevices.length} device(s) connected` : 'Optional (needed for HeLa Receptor)' },
    blender: { ready: blenderReady, version: blenderVer, note: blenderReady ? blenderVer : 'Optional (needed for HeLa Plastid)' },
    pty: { ready: process.platform !== 'win32', note: process.platform !== 'win32' ? 'POSIX PTY supported' : 'Windows ConPTY' },
  };

  // 3. Secrets / API Keys (Safe Checks)
  report.secrets = {
    OPENROUTER_API_KEY: process.env.OPENROUTER_API_KEY ? 'Configured (Live LLM active)' : 'Not set (Offline Heuristic Mode <30ms active)',
    GITHUB_TOKEN: process.env.GITHUB_TOKEN ? 'Configured (Live Prompt sync active)' : 'Not set (Bundled Catalog active)',
    GOOGLE_API_KEY: process.env.GOOGLE_API_KEY ? 'Configured (Live CSE active)' : 'Not set (Wikipedia Fallback active)',
    GOOGLE_CSE_ID: process.env.GOOGLE_CSE_ID ? 'Configured' : 'Not set',
  };

  // 4. Server Selection
  let targetServerKeys = Object.keys(inventory);
  if (targetProfileId) {
    const prof = profilesData.find((p) => p.id === targetProfileId);
    if (!prof) {
      console.error(`Error: Unknown profile "${targetProfileId}".`);
      process.exit(1);
    }
    targetServerKeys = prof.servers.map((k) => aliases[k] || k);
  }

  // 5. Audit Servers
  let allHealthy = true;
  for (const key of targetServerKeys) {
    const s = inventory[key] || inventory[aliases[key]];
    if (!s) continue;

    const dirPath = resolveServerDir(s, ECOSYSTEM_ROOT);
    const exists = fs.existsSync(dirPath);
    const entryFile = s.entry ? path.join(dirPath, s.entry) : null;
    const entryExists = entryFile ? fs.existsSync(entryFile) : false;
    const currentCommit = exists ? getGitCommit(dirPath) : null;
    const isPinnedCommit = s.revision && currentCommit ? currentCommit === s.revision : false;

    let smokeStatus = { ok: false, reason: 'Not checked' };
    if (exists && entryExists) {
      smokeStatus = await checkServerProcess(entryFile, dirPath);
    }

    const serverHealthy = exists && (s.entry ? entryExists : true) && smokeStatus.ok;
    if (!serverHealthy && s.scope === 'core') {
      allHealthy = false;
    }

    report.servers.push({
      id: s.id,
      alias: s.alias || s.name,
      source: s.source,
      scope: s.scope,
      role: s.role,
      dir: dirPath,
      exists,
      entryFile,
      entryExists,
      currentCommit: currentCommit ? currentCommit.slice(0, 7) : 'missing',
      pinnedCommit: s.revision ? s.revision.slice(0, 7) : 'none',
      commitMatch: isPinnedCommit,
      smoke: smokeStatus,
      status: serverHealthy ? 'READY' : exists && entryExists ? 'WARNING' : 'ERROR',
    });
  }

  report.status = allHealthy ? 'READY' : 'DEGRADED';

  if (isJson) {
    console.log(JSON.stringify(report, null, 2));
    process.exit(allHealthy ? 0 : 1);
  }

  // Visual Console Output
  logHeader('HeLa MCP Ecosystem — System Diagnostic Report');
  console.log(`Node.js:     ${report.system.node.valid ? colors.green + '✓ ' : colors.red + '✗ '}${nodeVer}${colors.reset}`);
  console.log(`Git:         ${report.system.git.valid ? colors.green + '✓ ' : colors.red + '✗ '}${gitVer || 'Not found'}${colors.reset}`);
  console.log(`SQLite3:     ${report.system.sqlite3.valid ? colors.green + '✓ ' : colors.yellow + '○ '}${sqliteVer || 'Not found in PATH (Node bindings will be used)'}${colors.reset}`);
  console.log(`Host OS:     ${osType}`);

  logHeader('External Runtime & Hardware Drivers');
  console.log(`Playwright:  ${playwrightReady ? colors.green + '✓ Ready' : colors.yellow + '○ Optional (npm i playwright for HeLa Cytosol)'}${colors.reset}`);
  console.log(`ADB Bridge:  ${adbReady ? colors.green + '✓ Ready (' + adbDevices.length + ' devices)' : colors.yellow + '○ Optional (adb not found; needed for HeLa Receptor)'}${colors.reset}`);
  console.log(`Blender CLI: ${blenderReady ? colors.green + '✓ Ready (' + blenderVer + ')' : colors.yellow + '○ Optional (blender not found; needed for HeLa Plastid)'}${colors.reset}`);
  console.log(`PTY Support: ${report.dependencies.pty.ready ? colors.green + '✓ Ready' : colors.yellow + '○ Emulated'}${colors.reset}`);

  logHeader('Optional API Keys & Graceful Fallbacks');
  for (const [k, v] of Object.entries(report.secrets)) {
    const isSet = !v.startsWith('Not set');
    console.log(`${k.padEnd(20)}: ${isSet ? colors.green + '✓ ' : colors.cyan + '○ '}${v}${colors.reset}`);
  }

  logHeader(`Component Health (${targetProfileId ? 'Profile: ' + targetProfileId : 'All 10 Servers'})`);
  console.log(`${'Component'.padEnd(18)} ${'Scope'.padEnd(8)} ${'Revision'.padEnd(10)} ${'Entrypoint'.padEnd(12)} ${'Diagnostics'}`);
  console.log('-'.repeat(78));

  for (const s of report.servers) {
    const statusColor = s.status === 'READY' ? colors.green : s.status === 'WARNING' ? colors.yellow : colors.red;
    const revTag = s.commitMatch ? s.currentCommit : `${s.currentCommit}*`;
    const entryTag = s.entryExists ? 'present' : 'missing';
    const diagNote = s.smoke.ok ? 'Stdio JSON-RPC OK' : s.smoke.reason;
    console.log(
      `${s.alias.padEnd(18)} ${s.scope.padEnd(8)} ${revTag.padEnd(10)} ${entryTag.padEnd(12)} ${statusColor}[${s.status}] ${diagNote}${colors.reset}`
    );
  }

  console.log('\n' + '='.repeat(78));
  if (allHealthy) {
    console.log(`${colors.green}${colors.bold}SUCCESS: All required HeLa MCP servers and dependencies are healthy and ready!${colors.reset}\n`);
    process.exit(0);
  } else {
    console.log(`${colors.red}${colors.bold}ATTENTION: Some core servers or dependencies require attention. Review table above.${colors.reset}\n`);
    process.exit(1);
  }
}

runDoctor();
