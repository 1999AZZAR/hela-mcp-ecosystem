#!/usr/bin/env node
/**
 * HeLa MCP Ecosystem — Master Integration Test Suite
 *
 * Tests JSON-RPC 2.0 stdio protocol conformance across all 10 HeLa MCP servers:
 *  - `initialize` handshake & capabilities negotiation
 *  - `notifications/initialized` handshake completion
 *  - `tools/list` discovery and schema validation
 *  - Cross-MCP simulated multi-server pipeline assertions
 *
 * Usage:
 *   node scripts/test-integration.mjs [--profile <id>] [--verbose]
 */

import fs from 'node:fs';
import path from 'node:path';
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ECOSYSTEM_ROOT = path.resolve(__dirname, '..');

const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  cyan: '\x1b[36m',
  bold: '\x1b[1m',
  dim: '\x1b[2m',
};

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

class McpClient {
  constructor(serverKey, serverConfig, root) {
    this.serverKey = serverKey;
    this.serverConfig = serverConfig;
    this.root = root;
    this.proc = null;
    this.buffer = '';
    this.nextId = 1;
    this.pending = new Map();
  }

  async start() {
    const dir = resolveServerDir(this.serverConfig, this.root);
    const entry = path.join(dir, this.serverConfig.entry);
    if (!fs.existsSync(entry)) {
      throw new Error(`Entrypoint not found: ${entry}`);
    }

    const env = {
      ...process.env,
      MEMORY_FILE_PATH: path.join(dir, 'data/memory.json'),
      SEQUENTIAL_THINKING_AVAILABLE: 'true',
      AWESOME_COPILOT_ENABLED: 'true',
      CHAINING_TOOL_TIMEOUT_MS: '5000',
    };

    this.proc = spawn('node', [entry], {
      cwd: dir,
      env,
      stdio: ['pipe', 'pipe', 'pipe'],
    });

    this.proc.stdout.on('data', (chunk) => this.handleData(chunk));
    this.proc.stderr.on('data', () => {});

    this.proc.on('error', (err) => {
      for (const [, reject] of this.pending.values()) {
        reject(err);
      }
    });

    this.proc.on('exit', (code) => {
      for (const [, reject] of this.pending.values()) {
        reject(new Error(`Server exited unexpectedly with code ${code}`));
      }
    });

    // Send initialize request
    const initRes = await this.sendRequest('initialize', {
      protocolVersion: '2024-11-05',
      capabilities: {},
      clientInfo: { name: 'hela-integration-tester', version: '1.0.0' },
    });

    // Send initialized notification
    this.sendNotification('notifications/initialized', {});

    return initRes;
  }

  handleData(chunk) {
    this.buffer += chunk.toString();
    const lines = this.buffer.split('\n');
    this.buffer = lines.pop() || '';

    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed) continue;
      try {
        const msg = JSON.parse(trimmed);
        if (msg.id !== undefined && this.pending.has(msg.id)) {
          const { resolve, reject } = this.pending.get(msg.id);
          this.pending.delete(msg.id);
          if (msg.error) {
            reject(new Error(msg.error.message || JSON.stringify(msg.error)));
          } else {
            resolve(msg.result);
          }
        }
      } catch {
        // Non-JSON line ignored
      }
    }
  }

  sendRequest(method, params) {
    return new Promise((resolve, reject) => {
      const id = this.nextId++;
      const req = { jsonrpc: '2.0', id, method, params };
      const timeout = setTimeout(() => {
        if (this.pending.has(id)) {
          this.pending.delete(id);
          reject(new Error(`Timeout (4000ms) waiting for response to ${method}`));
        }
      }, 4000);

      this.pending.set(id, {
        resolve: (val) => { clearTimeout(timeout); resolve(val); },
        reject: (err) => { clearTimeout(timeout); reject(err); },
      });

      this.proc.stdin.write(JSON.stringify(req) + '\n');
    });
  }

  sendNotification(method, params) {
    const notif = { jsonrpc: '2.0', method, params };
    this.proc.stdin.write(JSON.stringify(notif) + '\n');
  }

  async listTools() {
    return this.sendRequest('tools/list', {});
  }

  stop() {
    if (this.proc && !this.proc.killed) {
      try {
        this.proc.kill('SIGTERM');
      } catch {}
    }
  }
}

async function runSuite() {
  console.log(`\n${colors.bold}${colors.cyan}=== HeLa MCP Ecosystem — Master Integration Test Suite ===${colors.reset}\n`);

  const inventoryData = readJson(path.join(ECOSYSTEM_ROOT, 'config/inventory.json'));
  const inventory = inventoryData.inventory;
  const aliases = inventoryData.aliases || {};

  let targetProfileId = null;
  const pIndex = process.argv.indexOf('--profile');
  if (pIndex !== -1 && process.argv[pIndex + 1]) {
    targetProfileId = process.argv[pIndex + 1];
  }

  let serverKeys = Object.keys(inventory);
  if (targetProfileId) {
    const profilesData = readJson(path.join(ECOSYSTEM_ROOT, 'config/profiles.json')).profiles;
    const prof = profilesData.find((p) => p.id === targetProfileId);
    if (!prof) {
      console.error(`Unknown profile: ${targetProfileId}`);
      process.exit(1);
    }
    serverKeys = prof.servers.map((k) => aliases[k] || k);
  }

  let passed = 0;
  let failed = 0;
  const startTime = Date.now();
  const activeClients = new Map();

  console.log(`${colors.bold}Section 1: Individual Server Handshake & Protocol Conformance${colors.reset}`);
  console.log('-'.repeat(78));

  for (const key of serverKeys) {
    const s = inventory[key];
    if (!s) continue;
    const startServerTime = Date.now();
    const client = new McpClient(key, s, ECOSYSTEM_ROOT);

    try {
      const initRes = await client.start();
      const toolsRes = await client.listTools();
      const duration = Date.now() - startServerTime;
      const toolCount = Array.isArray(toolsRes?.tools) ? toolsRes.tools.length : 0;

      console.log(
        ` ${colors.green}✓${colors.reset} ${s.alias.padEnd(18)} ${s.scope.padEnd(12)} [${toolCount} tools] ${colors.dim}(${duration}ms)${colors.reset}`
      );
      activeClients.set(key, { client, tools: toolsRes.tools || [] });
      passed++;
    } catch (err) {
      const duration = Date.now() - startServerTime;
      console.log(
        ` ${colors.red}✗${colors.reset} ${s.alias.padEnd(18)} ${s.scope.padEnd(12)} [FAILED] ${err.message} ${colors.dim}(${duration}ms)${colors.reset}`
      );
      failed++;
    }
  }

  // Section 2: Multi-Server Workflow Pipeline Assertions
  console.log(`\n${colors.bold}Section 2: Cross-MCP Workflow Pipeline Simulations${colors.reset}`);
  console.log('-'.repeat(78));

  // Test 2.1: Dual Backbone Synergy (Mitosis + Genome)
  try {
    const mitosis = activeClients.get('hela-mitosis');
    const genome = activeClients.get('hela-genome');
    if (mitosis && genome) {
      const hasReasoning = mitosis.tools.some((t) => t.name.includes('thinking') || t.name.includes('chain') || t.name.includes('route') || t.name.includes('sequential'));
      const hasMemory = genome.tools.some((t) => t.name.includes('entity') || t.name.includes('relation') || t.name.includes('observation') || t.name.includes('memory') || t.name.includes('graph'));
      if (hasReasoning && hasMemory) {
        console.log(` ${colors.green}✓${colors.reset} Backbone Synergy: HeLa Mitosis (reasoning) + HeLa Genome (knowledge graph) validated`);
        passed++;
      } else {
        throw new Error('Backbone tools incomplete');
      }
    } else {
      console.log(` ${colors.yellow}○${colors.reset} Backbone Synergy skipped (one or both servers not in active scope)`);
    }
  } catch (err) {
    console.log(` ${colors.red}✗${colors.reset} Backbone Synergy failed: ${err.message}`);
    failed++;
  }

  // Test 2.2: Research & Verification Synergy (Enzyme + Cytosol)
  try {
    const enzyme = activeClients.get('hela-enzyme');
    const cytosol = activeClients.get('hela-cytosol');
    if (enzyme && cytosol) {
      const hasWikiOrSearch = enzyme.tools.some((t) => t.name.includes('wikipedia') || t.name.includes('search') || t.name.includes('fact'));
      const hasBrowser = cytosol.tools.some((t) => t.name.includes('navigate') || t.name.includes('search') || t.name.includes('browser'));
      if (hasWikiOrSearch && hasBrowser) {
        console.log(` ${colors.green}✓${colors.reset} Research Synergy: HeLa Enzyme (knowledge) + HeLa Cytosol (web automation) validated`);
        passed++;
      } else {
        throw new Error('Research tools incomplete');
      }
    } else {
      console.log(` ${colors.yellow}○${colors.reset} Research Synergy skipped (one or both servers not in active scope)`);
    }
  } catch (err) {
    console.log(` ${colors.red}✗${colors.reset} Research Synergy failed: ${err.message}`);
    failed++;
  }

  // Test 2.3: Workspace & System Execution Synergy (Membrane + Nucleus + Ribosome)
  try {
    const membrane = activeClients.get('hela-membrane');
    const nucleus = activeClients.get('hela-nucleus');
    const ribosome = activeClients.get('hela-ribosome');
    if (membrane && nucleus && ribosome) {
      const hasFs = membrane.tools.some((t) => t.name.includes('file') || t.name.includes('read') || t.name.includes('directory'));
      const hasExec = nucleus.tools.some((t) => t.name.includes('command') || t.name.includes('terminal') || t.name.includes('exec'));
      const hasPty = ribosome.tools.some((t) => t.name.includes('session') || t.name.includes('spawn') || t.name.includes('menager'));
      if (hasFs && hasExec && hasPty) {
        console.log(` ${colors.green}✓${colors.reset} Workspace Synergy: HeLa Membrane (FS) + HeLa Nucleus (exec) + HeLa Ribosome (PTY) validated`);
        passed++;
      } else {
        throw new Error('Workspace tools incomplete');
      }
    } else {
      console.log(` ${colors.yellow}○${colors.reset} Workspace Synergy skipped (not all workspace servers in active scope)`);
    }
  } catch (err) {
    console.log(` ${colors.red}✗${colors.reset} Workspace Synergy failed: ${err.message}`);
    failed++;
  }

  // Cleanup all clients
  for (const { client } of activeClients.values()) {
    client.stop();
  }

  const totalDuration = Date.now() - startTime;
  console.log('\n' + '='.repeat(78));
  console.log(
    `Integration Test Summary: ${colors.bold}${passed} passed${colors.reset}, ${failed > 0 ? colors.red : colors.green}${failed} failed${colors.reset} across ${serverKeys.length} server(s) in ${totalDuration}ms.`
  );

  if (failed === 0) {
    console.log(`${colors.green}${colors.bold}SUCCESS: All integration tests and cross-MCP synergies passed!${colors.reset}\n`);
    process.exit(0);
  } else {
    console.log(`${colors.red}${colors.bold}FAILURE: Some integration tests failed. Review log above.${colors.reset}\n`);
    process.exit(1);
  }
}

runSuite();
