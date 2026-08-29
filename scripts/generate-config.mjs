#!/usr/bin/env node
/**
 * mcp-ecosystem — Config Generator
 * Emits target MCP client configurations for a chosen profile + backend.
 *
 * Usage:
 *   node scripts/generate-config.mjs <profileId> --backend <cursor|claude|opencode|zed|docker|print> [--root <path>] [--out <file>]
 *
 * Resolves every profile server against inventory.json and renders the config
 * with absolute paths derived from --root (defaults to the ecosystem root).
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ECOSYSTEM_ROOT = path.resolve(__dirname, '..');

function readJson(p) {
  return JSON.parse(fs.readFileSync(p, 'utf8'));
}

function readInventory() {
  return readJson(path.join(ECOSYSTEM_ROOT, 'config/inventory.json')).inventory;
}

function readProfiles() {
  return readJson(path.join(ECOSYSTEM_ROOT, 'config/profiles.json')).profiles;
}

function parseArgs(argv) {
  const args = {
    profile: null,
    backend: null,
    root: ECOSYSTEM_ROOT,
    out: null,
    openrouterKey: process.env.OPENROUTER_API_KEY || null,
    githubToken: process.env.GITHUB_TOKEN || null,
    googleKey: process.env.GOOGLE_API_KEY || null,
    googleCseId: process.env.GOOGLE_CSE_ID || null,
  };
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === '--backend') args.backend = argv[++i];
    else if (arg === '--root') args.root = argv[++i];
    else if (arg === '--out') args.out = argv[++i];
    else if (arg === '--openrouter-key' || arg === '--openrouter') args.openrouterKey = argv[++i];
    else if (arg === '--github-token' || arg === '--github') args.githubToken = argv[++i];
    else if (arg === '--google-key' || arg === '--google') args.googleKey = argv[++i];
    else if (arg === '--google-cse-id' || arg === '--cse') args.googleCseId = argv[++i];
    else if (args.profile === null) args.profile = arg;
  }
  return args;
}

function resolveServers(profile, inventory) {
  const resolved = [];
  const seen = new Set();
  for (const id of profile.servers) {
    if (seen.has(id)) continue;
    seen.add(id);
    const info = inventory[id];
    if (!info) {
      console.error(`[warn] Profile "${profile.id}" references unknown server "${id}". Skipping.`);
      continue;
    }
    resolved.push({ id, ...info });
  }
  return resolved;
}

function entryArgs(server, root) {
  if (!server.entry) return [];
  return [path.join(root, server.dir, server.entry)];
}

function buildServerEnv(s, root, options = {}) {
  const env = {};
  for (const key of (s.env || [])) {
    if (key === 'MEMORY_FILE_PATH') {
      env[key] = path.join(root, s.dir, 'data/memory.json');
    } else if (key === 'CHAINING_TOOL_TIMEOUT_MS') {
      env[key] = '10000';
    } else if (key === 'CHAINING_LLM_ENABLED') {
      env[key] = options.openrouterKey ? 'true' : 'false';
    } else if (key === 'CHAINING_LLM_MODEL') {
      env[key] = 'openrouter/free';
    } else if (key === 'CHAINING_LLM_BASE_URL') {
      env[key] = 'https://openrouter.ai/api/v1';
    } else if (key === 'OPENROUTER_API_KEY') {
      if (options.openrouterKey) env[key] = options.openrouterKey;
    } else if (key === 'GITHUB_TOKEN') {
      if (options.githubToken) env[key] = options.githubToken;
    } else if (key === 'GOOGLE_API_KEY') {
      if (options.googleKey) env[key] = options.googleKey;
    } else if (key === 'GOOGLE_CSE_ID') {
      if (options.googleCseId) env[key] = options.googleCseId;
    } else if (key === 'WIKIPEDIA_CACHE_MAX') {
      env[key] = '100';
    } else if (key === 'WIKIPEDIA_CACHE_TTL') {
      env[key] = '300000';
    } else if (key === 'WIKIPEDIA_DEFAULT_LANGUAGE') {
      env[key] = 'en';
    } else if (/_AVAILABLE$|_ENABLED$/.test(key)) {
      env[key] = 'true';
    } else {
      env[key] = 'your-' + key.toLowerCase().replace(/_/g, '-');
    }
  }
  return env;
}

function renderOpencode(servers, root, options) {
  const mcp = {};
  for (const s of servers) {
    const name = s.id.replace('-mcp-server', '').replace('-mcp', '');
    const entry = s.entry ? path.join(root, s.dir, s.entry) : null;
    const block = {
      type: 'local',
      enabled: !!entry,
      command: entry ? [s.runtime || 'node', entry] : [],
    };
    const env = buildServerEnv(s, root, options);
    if (Object.keys(env).length) block.environment = env;
    mcp[name] = block;
  }
  return JSON.stringify({ mcp }, null, 2);
}

function renderKilo(servers, root, options) {
  const mcp = {};
  for (const s of servers) {
    const name = s.id.replace('-mcp-server', '').replace('-mcp', '');
    const entry = s.entry ? path.join(root, s.dir, s.entry) : null;
    const block = {
      type: 'local',
      enabled: true,
      command: entry ? [s.runtime || 'node', entry] : [],
    };
    const env = buildServerEnv(s, root, options);
    if (Object.keys(env).length) block.environment = env;
    mcp[name] = block;
  }
  return JSON.stringify({ mcp }, null, 2);
}

function renderNode(servers, root, keyName = 'mcpServers', options) {
  const serversObj = {};
  for (const s of servers) {
    const name = s.id.replace('-mcp-server', '').replace('-mcp', '');
    const env = buildServerEnv(s, root, options);
    serversObj[name] = {
      command: s.runtime || 'node',
      args: entryArgs(s, root),
      ...(Object.keys(env).length ? { env } : {}),
    };
  }
  return JSON.stringify({ [keyName]: serversObj }, null, 2);
}

function renderCodexToml(servers, root, options) {
  const lines = ['# Generated Codex / ChatGPT MCP Server Configuration\n'];
  for (const s of servers) {
    const name = s.id.replace('-mcp-server', '').replace('-mcp', '');
    const entry = s.entry ? path.join(root, s.dir, s.entry) : '';
    lines.push(`[mcpServers.${name}]`);
    lines.push(`command = "${s.runtime || 'node'}"`);
    lines.push(`args = ["${entry}"]`);
    const env = buildServerEnv(s, root, options);
    if (Object.keys(env).length > 0) {
      lines.push(`[mcpServers.${name}.env]`);
      for (const [k, v] of Object.entries(env)) {
        lines.push(`${k} = "${v}"`);
      }
    }
    lines.push('');
  }
  return lines.join('\n');
}

function renderDocker(servers) {
  const services = {};
  servers.forEach((s, i) => {
    services[s.id] = {
      build: { context: `../${s.dir}`, dockerfile: 'Dockerfile' },
      ports: [`${3000 + i + 1}:${3000 + i + 1}`],
      networks: ['mcp-network'],
    };
  });
  return JSON.stringify(
    {
      version: '3.8',
      services,
      networks: { 'mcp-network': { driver: 'bridge' } },
    },
    null,
    2
  );
}

function renderPrint(servers, root) {
  const lines = servers.map((s) => {
    const tag = s.needsGui ? ' [GUI]' : s.needsDevice ? ' [DEVICE]' : '';
    return `  - ${s.id}${tag}  ${s.runtime || 'node'} ${entryArgs(s, root).join(' ') || '(manual)'}`;
  });
  return ['Profile servers:', ...lines].join('\n');
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  if (!args.profile || !args.backend) {
    console.error('Usage: node scripts/generate-config.mjs <profileId> --backend <cursor|claude|gemini|antigravity|opencode|kilo|zed|codex|docker|print> [--root <path>] [--out <file>]');
    process.exit(1);
  }

  const profiles = readProfiles();
  const profile = profiles.find((p) => p.id === args.profile);
  if (!profile) {
    console.error(`Unknown profile "${args.profile}". Available: ${profiles.map((p) => p.id).join(', ')}`);
    process.exit(1);
  }

  const inventory = readInventory();
  const servers = resolveServers(profile, inventory);
  const root = path.resolve(args.root);

  let out;
  switch (args.backend) {
    case 'cursor':
    case 'claude':
    case 'gemini':
    case 'antigravity':
      out = renderNode(servers, root, 'mcpServers', args) + '\n';
      break;
    case 'zed':
      out = renderNode(servers, root, 'context_servers', args) + '\n';
      break;
    case 'opencode':
      out = renderOpencode(servers, root, args) + '\n';
      break;
    case 'kilo':
      out = renderKilo(servers, root, args) + '\n';
      break;
    case 'codex':
      out = renderCodexToml(servers, root, args) + '\n';
      break;
    case 'docker':
      out = renderDocker(servers) + '\n';
      break;
    case 'print':
      out = renderPrint(servers, root) + '\n';
      break;
    default:
      console.error(`Unknown backend "${args.backend}". Use cursor|claude|gemini|antigravity|opencode|kilo|zed|codex|docker|print.`);
      process.exit(1);
  }

  if (args.out) {
    fs.mkdirSync(path.dirname(path.resolve(args.out)), { recursive: true });
    fs.writeFileSync(path.resolve(args.out), out);
    console.log(`Wrote ${path.resolve(args.out)}`);
  } else {
    process.stdout.write(out);
  }
}

main();
