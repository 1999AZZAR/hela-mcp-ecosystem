/**
 * HeLa MCP Ecosystem — Interactive Developer Workbench Application
 */

const INVENTORY = {
  "hela-mitosis": {
    "alias": "HeLa Mitosis",
    "source": "chaining-mcp-server",
    "scope": "core",
    "role": "Orchestrator Backbone",
    "entry": "dist/index.js",
    "desc": "Dynamic peer discovery, sequential reasoning, prompt templates"
  },
  "hela-genome": {
    "alias": "HeLa Genome",
    "source": "Project-Guardian-mcp-server",
    "scope": "core",
    "role": "State & Memory Backbone",
    "entry": "dist/index.js",
    "desc": "Living SQLite knowledge graph, decision memory, task tracking"
  },
  "hela-membrane": {
    "alias": "HeLa Membrane",
    "source": "filesystem-mcp-server",
    "scope": "core",
    "role": "Workspace Filesystem",
    "entry": "dist/index.js",
    "desc": "Sandboxed filesystem operations, file search & archives"
  },
  "hela-nucleus": {
    "alias": "HeLa Nucleus",
    "source": "terminal-mcp-server",
    "scope": "core",
    "role": "Execution Boundary",
    "entry": "build/index.js",
    "desc": "Isolated command execution, subshell containment, RTK optimization"
  },
  "hela-ribosome": {
    "alias": "HeLa Ribosome",
    "source": "menager-mcp-server",
    "scope": "core",
    "role": "Process Harness",
    "entry": "build/index.js",
    "desc": "Polyglot interactive PTY multiplexing, Regex hooks & teardown"
  },
  "hela-enzyme": {
    "alias": "HeLa Enzyme",
    "source": "research-assistant-mcp-server",
    "scope": "core",
    "role": "Knowledge Synthesis",
    "entry": "dist/index.js",
    "desc": "Unified Google Search & cached Wikipedia fact-checking"
  },
  "hela-cytosol": {
    "alias": "HeLa Cytosol",
    "source": "Browser-Agent",
    "scope": "core",
    "role": "Browser Interaction",
    "entry": "src/server.js",
    "desc": "Playwright browser automation & accessibility tree perception"
  },
  "hela-phenotype": {
    "alias": "HeLa Phenotype",
    "source": "the-designer",
    "scope": "specialized",
    "role": "Design & Tokens",
    "entry": "dist/index.js",
    "desc": "UI/UX design system tokens, OKLCH palettes, Tailwind synthesis"
  },
  "hela-receptor": {
    "alias": "HeLa Receptor",
    "source": "scrcpy-mcp",
    "scope": "specialized",
    "role": "Mobile Automation",
    "entry": "dist/server.js",
    "desc": "Android device control, ADB bridge & XML view inspection"
  },
  "hela-plastid": {
    "alias": "HeLa Plastid",
    "source": "ll3m-agent",
    "scope": "specialized",
    "role": "3D Blender Modeling",
    "entry": "dist/index.js",
    "desc": "Autonomous Blender procedural 3D modeling & render pipeline"
  }
};

const PROFILES = {
  "dev-workspace": {
    "name": "Dev Workspace (Full Desktop)",
    "servers": ["hela-mitosis", "hela-genome", "hela-membrane", "hela-nucleus", "hela-ribosome", "hela-enzyme", "hela-phenotype", "hela-cytosol"]
  },
  "headless-server": {
    "name": "Headless Server (Core 7)",
    "servers": ["hela-mitosis", "hela-genome", "hela-membrane", "hela-nucleus", "hela-ribosome", "hela-enzyme", "hela-phenotype"]
  },
  "research": {
    "name": "Research Terminal",
    "servers": ["hela-mitosis", "hela-genome", "hela-enzyme", "hela-membrane", "hela-cytosol"]
  },
  "web-devops": {
    "name": "Web Dev & Verification",
    "servers": ["hela-mitosis", "hela-genome", "hela-membrane", "hela-nucleus", "hela-phenotype", "hela-cytosol"]
  },
  "android-testing": {
    "name": "Android Mobile QA",
    "servers": ["hela-mitosis", "hela-genome", "hela-nucleus", "hela-receptor", "hela-enzyme"]
  },
  "3d-modeling": {
    "name": "Blender 3D Modeling",
    "servers": ["hela-mitosis", "hela-genome", "hela-plastid", "hela-membrane", "hela-nucleus"]
  },
  "all": {
    "name": "All (Full 10-MCP Stack)",
    "servers": Object.keys(INVENTORY)
  }
};

const TERMINAL_OUTPUTS = {
  "doctor": `$ ./setup.sh doctor
=== HeLa MCP Ecosystem — Diagnostic Report ===
Node.js:     ✓ v20+ LTS
Git:         ✓ 2.25+
SQLite3:     ✓ Ready (WAL mode active)

=== Component Health (All 10 Servers) ===
Component          Scope        Entrypoint   Diagnostics
-----------------------------------------------------------------
HeLa Mitosis       core         present      [READY] Stdio JSON-RPC OK
HeLa Genome        core         present      [READY] Stdio JSON-RPC OK
HeLa Membrane      core         present      [READY] Stdio JSON-RPC OK
HeLa Nucleus       core         present      [READY] Stdio JSON-RPC OK
HeLa Ribosome      core         present      [READY] Stdio JSON-RPC OK
HeLa Enzyme        core         present      [READY] Stdio JSON-RPC OK
HeLa Cytosol       core         present      [READY] Stdio JSON-RPC OK
HeLa Phenotype     specialized  present      [READY] Stdio JSON-RPC OK
HeLa Receptor      specialized  present      [READY] Stdio JSON-RPC OK
HeLa Plastid       specialized  present      [READY] Stdio JSON-RPC OK

SUCCESS: All required HeLa MCP servers and dependencies are healthy!`,

  "matrix": `$ npm run test:matrix
=== 70-Combination Client Matrix Validator ===

Profile            Client         Format     Status     Details
-----------------------------------------------------------------
dev-workspace      cursor         JSON       PASS       8 servers
dev-workspace      claude         JSON       PASS       8 servers
dev-workspace      gemini         JSON       PASS       8 servers
dev-workspace      antigravity    JSON       PASS       8 servers
dev-workspace      opencode       JSON       PASS       8 servers
dev-workspace      kilo           JSON       PASS       8 servers
dev-workspace      zed            JSON       PASS       8 servers
dev-workspace      codex          TOML       PASS       8 servers
dev-workspace      docker         DOCKER     PASS       8 services
... (60 more combinations) ...

Matrix Test Summary: 70 passed, 0 failed in 3.1s.
SUCCESS: 100% schema accuracy across all client backends!`,

  "integration": `$ npm test
=== HeLa Master Integration Test Suite ===

Section 1: Individual Server Handshake & Tools Discovery
-----------------------------------------------------------------
 ✓ HeLa Mitosis       [18 tools] (202ms)
 ✓ HeLa Genome        [34 tools] (425ms)
 ✓ HeLa Membrane      [16 tools] (178ms)
 ✓ HeLa Nucleus       [5 tools]  (138ms)
 ✓ HeLa Ribosome      [11 tools] (176ms)
 ✓ HeLa Enzyme        [28 tools] (332ms)
 ✓ HeLa Cytosol       [93 tools] (501ms)
 ✓ HeLa Phenotype     [29 tools] (184ms)
 ✓ HeLa Receptor      [46 tools] (233ms)
 ✓ HeLa Plastid       [15 tools] (178ms)

Section 2: Cross-MCP Workflow Synergies
-----------------------------------------------------------------
 ✓ Backbone Synergy: Mitosis (reasoning) + Genome (state)
 ✓ Research Synergy: Enzyme (search) + Cytosol (browser)
 ✓ Workspace Synergy: Membrane (FS) + Nucleus (exec) + Ribosome (PTY)

Summary: 13 passed, 0 failed across 10 servers (295 tools) in 2.5s.`
};

function renderConfig(profileKey, clientKey) {
  const prof = PROFILES[profileKey] || PROFILES["dev-workspace"];
  const serverKeys = prof.servers;
  const root = "/absolute/path/to/hela-mcp-ecosystem";

  if (clientKey === "cursor" || clientKey === "claude" || clientKey === "gemini" || clientKey === "antigravity") {
    const mcpServers = {};
    for (const k of serverKeys) {
      const s = INVENTORY[k];
      const name = k.replace("-mcp-server", "").replace("-mcp", "");
      const dir = s.source === "ll3m-agent" ? "ll3m-agent/brain" : s.source;
      mcpServers[name] = {
        command: "node",
        args: [`${root}/${dir}/${s.entry}`]
      };
    }
    return JSON.stringify({ mcpServers }, null, 2);
  }

  if (clientKey === "opencode" || clientKey === "kilo") {
    const mcp = {};
    for (const k of serverKeys) {
      const s = INVENTORY[k];
      const name = k.replace("-mcp-server", "").replace("-mcp", "");
      const dir = s.source === "ll3m-agent" ? "ll3m-agent/brain" : s.source;
      mcp[name] = {
        type: "local",
        enabled: true,
        command: ["node", `${root}/${dir}/${s.entry}`]
      };
    }
    return JSON.stringify({ mcp }, null, 2);
  }

  if (clientKey === "zed") {
    const context_servers = {};
    for (const k of serverKeys) {
      const s = INVENTORY[k];
      const name = k.replace("-mcp-server", "").replace("-mcp", "");
      const dir = s.source === "ll3m-agent" ? "ll3m-agent/brain" : s.source;
      context_servers[name] = {
        command: "node",
        args: [`${root}/${dir}/${s.entry}`]
      };
    }
    return JSON.stringify({ context_servers }, null, 2);
  }

  if (clientKey === "codex") {
    const lines = ["# Generated Codex / ChatGPT MCP Server Configuration"];
    for (const k of serverKeys) {
      const s = INVENTORY[k];
      const name = k.replace("-mcp-server", "").replace("-mcp", "");
      const dir = s.source === "ll3m-agent" ? "ll3m-agent/brain" : s.source;
      lines.push(`\n[mcpServers.${name}]\ncommand = "node"\nargs = ["${root}/${dir}/${s.entry}"]`);
    }
    return lines.join("\n");
  }

  if (clientKey === "docker") {
    const services = {};
    serverKeys.forEach((k, i) => {
      const s = INVENTORY[k];
      services[k] = {
        build: { context: `../${s.source}`, dockerfile: "Dockerfile" },
        ports: [`${3000 + i + 1}:${3000 + i + 1}`],
        networks: ["mcp-network"]
      };
    });
    return JSON.stringify({
      version: "3.8",
      services,
      networks: { "mcp-network": { driver: "bridge" } }
    }, null, 2);
  }

  return "// Select a client and profile.";
}

document.addEventListener("DOMContentLoaded", () => {
  // Configurator
  const profileSelect = document.getElementById("profileSelect");
  const clientSelect = document.getElementById("clientSelect");
  const codeOutput = document.getElementById("configCode");
  const copyBtn = document.getElementById("copyConfigBtn");

  function updateOutput() {
    if (!profileSelect || !clientSelect || !codeOutput) return;
    codeOutput.textContent = renderConfig(profileSelect.value, clientSelect.value);
  }

  if (profileSelect && clientSelect) {
    profileSelect.addEventListener("change", updateOutput);
    clientSelect.addEventListener("change", updateOutput);
    updateOutput();
  }

  if (copyBtn && codeOutput) {
    copyBtn.addEventListener("click", () => {
      navigator.clipboard.writeText(codeOutput.textContent).then(() => {
        const orig = copyBtn.textContent;
        copyBtn.textContent = "Copied!";
        setTimeout(() => { copyBtn.textContent = orig; }, 2000);
      });
    });
  }

  // Hero Quick Copy
  const heroCopyBtn = document.getElementById("heroCopyBtn");
  const heroCmd = document.getElementById("heroCmd");
  if (heroCopyBtn && heroCmd) {
    heroCopyBtn.addEventListener("click", () => {
      navigator.clipboard.writeText(heroCmd.textContent.trim()).then(() => {
        const orig = heroCopyBtn.textContent;
        heroCopyBtn.textContent = "Copied!";
        setTimeout(() => { heroCopyBtn.textContent = orig; }, 2000);
      });
    });
  }

  // Interactive Workbench Terminal Tabs
  const termBody = document.getElementById("terminalBody");
  const tabs = document.querySelectorAll(".term-tab");
  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      tabs.forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");
      const key = tab.getAttribute("data-tab");
      if (termBody && TERMINAL_OUTPUTS[key]) {
        termBody.textContent = TERMINAL_OUTPUTS[key];
      }
    });
  });
});
