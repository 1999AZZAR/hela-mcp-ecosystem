/**
 * HeLa MCP Ecosystem — Interactive Landing Page Application
 */

const INVENTORY = {
  "hela-mitosis": {
    "alias": "HeLa Mitosis",
    "source": "chaining-mcp-server",
    "scope": "core",
    "role": "backbone-orchestration",
    "entry": "dist/index.js",
    "runtime": "node",
    "desc": "Intelligent orchestrator, dynamic peer discovery, sequential thinking, task decomposition."
  },
  "hela-genome": {
    "alias": "HeLa Genome",
    "source": "Project-Guardian-mcp-server",
    "scope": "core",
    "role": "backbone-state",
    "entry": "dist/index.js",
    "runtime": "node",
    "desc": "Living SQLite knowledge graph, cross-session memory, task & milestone tracking."
  },
  "hela-membrane": {
    "alias": "HeLa Membrane",
    "source": "filesystem-mcp-server",
    "scope": "core",
    "role": "workspace",
    "entry": "dist/index.js",
    "runtime": "node",
    "desc": "Sandboxed filesystem operations, deep directory search, file watching, and archives."
  },
  "hela-nucleus": {
    "alias": "HeLa Nucleus",
    "source": "terminal-mcp-server",
    "scope": "core",
    "role": "execution",
    "entry": "build/index.js",
    "runtime": "node",
    "desc": "Isolated terminal execution, command sanitization, and RTK token optimization."
  },
  "hela-ribosome": {
    "alias": "HeLa Ribosome",
    "source": "menager-mcp-server",
    "scope": "core",
    "role": "process-harness",
    "entry": "build/index.js",
    "runtime": "node",
    "desc": "Polyglot interactive PTY multiplexing, Regex hooks, and process lifecycle teardown."
  },
  "hela-enzyme": {
    "alias": "HeLa Enzyme",
    "source": "research-assistant-mcp-server",
    "scope": "core",
    "role": "knowledge",
    "entry": "dist/index.js",
    "runtime": "node",
    "desc": "Unified Google Custom Search and Wikipedia caching, fact-checking, and summarization."
  },
  "hela-cytosol": {
    "alias": "HeLa Cytosol",
    "source": "Browser-Agent",
    "scope": "core",
    "role": "interaction",
    "entry": "src/server.js",
    "runtime": "node",
    "desc": "Playwright browser automation, accessibility trees, DOM perception, and screenshots."
  },
  "hela-phenotype": {
    "alias": "HeLa Phenotype",
    "source": "the-designer",
    "scope": "specialized",
    "role": "design",
    "entry": "dist/index.js",
    "runtime": "node",
    "desc": "UI/UX design tokens, OKLCH palettes, Tailwind CSS synthesis, and 8-state components."
  },
  "hela-receptor": {
    "alias": "HeLa Receptor",
    "source": "scrcpy-mcp",
    "scope": "specialized",
    "role": "mobile",
    "entry": "dist/server.js",
    "runtime": "node",
    "desc": "Physical Android device control, ADB bridge, XML view hierarchy inspection, and UI tapping."
  },
  "hela-plastid": {
    "alias": "HeLa Plastid",
    "source": "ll3m-agent",
    "scope": "specialized",
    "role": "3d",
    "entry": "dist/index.js",
    "runtime": "node",
    "desc": "Autonomous Blender procedural 3D modeling, materials, lighting, and rendering."
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
    "name": "Web Dev + Verification",
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

  return "// Select a client and profile above.";
}

document.addEventListener("DOMContentLoaded", () => {
  const profileSelect = document.getElementById("profileSelect");
  const clientSelect = document.getElementById("clientSelect");
  const codeOutput = document.getElementById("configCode");
  const copyBtn = document.getElementById("copyConfigBtn");

  function updateOutput() {
    if (!profileSelect || !clientSelect || !codeOutput) return;
    const prof = profileSelect.value;
    const client = clientSelect.value;
    codeOutput.textContent = renderConfig(prof, client);
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
        setTimeout(() => {
          copyBtn.textContent = orig;
        }, 2000);
      });
    });
  }

  // Hero Copy Button
  const heroCopyBtn = document.getElementById("heroCopyBtn");
  const heroCmd = document.getElementById("heroCmd");
  if (heroCopyBtn && heroCmd) {
    heroCopyBtn.addEventListener("click", () => {
      navigator.clipboard.writeText(heroCmd.textContent.trim()).then(() => {
        const orig = heroCopyBtn.textContent;
        heroCopyBtn.textContent = "Copied!";
        setTimeout(() => {
          heroCopyBtn.textContent = orig;
        }, 2000);
      });
    });
  }
});
