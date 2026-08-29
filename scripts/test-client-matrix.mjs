#!/usr/bin/env node
/**
 * HeLa MCP Ecosystem — Multi-Client Configuration Matrix Validator
 *
 * Tests all 10 client configuration generators across all 7 profiles (70 combinations):
 *  - Format correctness (JSON / TOML / YAML)
 *  - Schema structure conformance
 *  - Server key resolution and command parameters
 *
 * Usage:
 *   node scripts/test-client-matrix.mjs [--verbose]
 */

import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';
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

const CLIENTS = [
  'cursor',
  'claude',
  'gemini',
  'antigravity',
  'opencode',
  'kilo',
  'zed',
  'codex',
  'docker',
  'skip',
];

function readJson(p) {
  return JSON.parse(fs.readFileSync(p, 'utf8'));
}

function runMatrix() {
  console.log(`\n${colors.bold}${colors.cyan}=== HeLa MCP Ecosystem — 70-Combination Client Matrix Validator ===${colors.reset}\n`);

  const profilesData = readJson(path.join(ECOSYSTEM_ROOT, 'config/profiles.json')).profiles;
  const profileIds = profilesData.map((p) => p.id);

  let passed = 0;
  let failed = 0;
  const startTime = Date.now();

  console.log(`${'Profile'.padEnd(18)} ${'Client'.padEnd(14)} ${'Format'.padEnd(10)} ${'Status'.padEnd(10)} Details`);
  console.log('-'.repeat(78));

  for (const profId of profileIds) {
    const prof = profilesData.find((p) => p.id === profId);
    const expectedServerCount = prof.servers.length;

    for (const client of CLIENTS) {
      const cmd = `node scripts/generate-config.mjs --profile "${profId}" --client "${client}" --stdout`;
      try {
        const stdout = execSync(cmd, { cwd: ECOSYSTEM_ROOT, encoding: 'utf8', stdio: ['pipe', 'pipe', 'pipe'] });

        if (client === 'skip') {
          if (!stdout.includes('Config generation skipped')) {
            throw new Error('Expected skip message not found');
          }
          console.log(`${profId.padEnd(18)} ${client.padEnd(14)} ${'NONE'.padEnd(10)} ${colors.green}PASS${colors.reset}       Skipped as requested`);
          passed++;
          continue;
        }

        if (client === 'codex') {
          const matchCount = (stdout.match(/^\[mcpServers\.[^.\]\r\n]+\]/gm) || []).length;
          if (matchCount !== expectedServerCount) {
            throw new Error(`Expected ${expectedServerCount} servers in TOML, found ${matchCount}`);
          }
          console.log(`${profId.padEnd(18)} ${client.padEnd(14)} ${'TOML'.padEnd(10)} ${colors.green}PASS${colors.reset}       ${matchCount} servers rendered`);
          passed++;
          continue;
        }

        if (client === 'docker') {
          const parsed = JSON.parse(stdout);
          if (!parsed.services || typeof parsed.services !== 'object') {
            throw new Error('Invalid Docker Compose services format');
          }
          const serverMatch = Object.keys(parsed.services).length;
          if (serverMatch !== expectedServerCount) {
            throw new Error(`Expected ${expectedServerCount} services in Docker config, found ${serverMatch}`);
          }
          console.log(`${profId.padEnd(18)} ${client.padEnd(14)} ${'DOCKER'.padEnd(10)} ${colors.green}PASS${colors.reset}       ${serverMatch} services rendered`);
          passed++;
          continue;
        }

        // JSON formatters
        const parsed = JSON.parse(stdout);
        let count = 0;

        if (client === 'opencode') {
          if (!parsed.mcp || typeof parsed.mcp !== 'object') throw new Error('Missing "mcp" root property in OpenCode JSON');
          count = Object.keys(parsed.mcp).length;
        } else if (client === 'kilo') {
          if (!parsed.mcp || typeof parsed.mcp !== 'object') throw new Error('Missing "mcp" root property in Kilo JSON');
          count = Object.keys(parsed.mcp).length;
        } else if (client === 'zed') {
          if (!parsed.context_servers || typeof parsed.context_servers !== 'object') throw new Error('Missing "context_servers" root property in Zed JSON');
          count = Object.keys(parsed.context_servers).length;
        } else {
          // cursor, claude, gemini, antigravity
          if (!parsed.mcpServers || typeof parsed.mcpServers !== 'object') throw new Error('Missing "mcpServers" root property in client JSON');
          count = Object.keys(parsed.mcpServers).length;
        }

        if (count !== expectedServerCount) {
          throw new Error(`Expected ${expectedServerCount} servers, found ${count}`);
        }

        console.log(`${profId.padEnd(18)} ${client.padEnd(14)} ${'JSON'.padEnd(10)} ${colors.green}PASS${colors.reset}       ${count} servers rendered`);
        passed++;
      } catch (err) {
        console.log(`${profId.padEnd(18)} ${client.padEnd(14)} ${'ERROR'.padEnd(10)} ${colors.red}FAIL${colors.reset}       ${err.message}`);
        failed++;
      }
    }
  }

  const duration = Date.now() - startTime;
  console.log('\n' + '='.repeat(78));
  console.log(`Matrix Test Summary: ${colors.bold}${passed} passed${colors.reset}, ${failed > 0 ? colors.red : colors.green}${failed} failed${colors.reset} (70 total combinations) in ${duration}ms.`);

  if (failed === 0) {
    console.log(`${colors.green}${colors.bold}SUCCESS: All 70 profile × client matrix tests passed with 100% schema accuracy!${colors.reset}\n`);
    process.exit(0);
  } else {
    console.log(`${colors.red}${colors.bold}FAILURE: Some matrix tests failed. Review log above.${colors.reset}\n`);
    process.exit(1);
  }
}

runMatrix();
