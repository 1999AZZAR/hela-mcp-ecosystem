/**
 * HeLa MCP Ecosystem — Master Developer Platform Engine
 * Powered by canonical specs from docs/architecture.md, docs/workflows.md, docs/profiles.md
 */

const INVENTORY = {
  "hela-mitosis": {
    "alias": "HeLa Mitosis",
    "source": "chaining-mcp-server",
    "scope": "core",
    "role": "Orchestrator Backbone",
    "entry": "dist/index.js",
    "toolsCount": 18,
    "tools": ["analyze_with_sequential_thinking", "sequentialthinking", "workflow_orchestrator", "llm_decompose_task", "llm_query", "llm_summarize", "search_prompts", "get_prompt", "list_mcp_servers", "validate_tool_chain"],
    "desc": "Cognitive division & orchestration backbone. Dynamic peer tool discovery, step-by-step reasoning, task decomposition, and 42 domain prompt templates.",
    "sampleRpc": {
      "method": "tools/call",
      "params": {
        "name": "analyze_with_sequential_thinking",
        "arguments": { "thought": "Evaluate database migration constraints", "thoughtNumber": 1, "totalThoughts": 3 }
      }
    }
  },
  "hela-genome": {
    "alias": "HeLa Genome",
    "source": "Project-Guardian-mcp-server",
    "scope": "core",
    "role": "State & Memory Backbone",
    "entry": "dist/index.js",
    "toolsCount": 34,
    "tools": ["initialize_memory", "create_entity", "create_relation", "add_observation", "search_nodes", "open_node", "get_session_context", "sync_central_memory", "execute_sql", "query_data", "inspect_untrusted_text", "scan_project_secrets"],
    "desc": "Living SQLite knowledge graph (memory.db) with FTS5 search, entity-relation tracking, cross-session context restoration, and decision memory.",
    "sampleRpc": {
      "method": "tools/call",
      "params": {
        "name": "add_observation",
        "arguments": { "entityName": "milestone:v1.0.0", "contents": ["Verified 70-combination client matrix with 100% schema accuracy"] }
      }
    }
  },
  "hela-membrane": {
    "alias": "HeLa Membrane",
    "source": "filesystem-mcp-server",
    "scope": "core",
    "role": "Workspace Filesystem",
    "entry": "dist/index.js",
    "toolsCount": 16,
    "tools": ["read_file", "write_file", "copy_file", "move_file", "delete_file", "get_file_info", "create_directory", "list_directory", "find_files", "search_in_files", "watch_file", "archive_files", "extract_archive"],
    "desc": "Sandboxed filesystem boundary. Deep recursive directory search, file watching, binary inspection, and archive manipulation.",
    "sampleRpc": {
      "method": "tools/call",
      "params": {
        "name": "read_file",
        "arguments": { "path": "/workspace/src/index.ts" }
      }
    }
  },
  "hela-nucleus": {
    "alias": "HeLa Nucleus",
    "source": "terminal-mcp-server",
    "scope": "core",
    "role": "Execution Boundary",
    "entry": "build/index.js",
    "toolsCount": 5,
    "tools": ["execute_command", "transfer_file", "terminal_ls", "terminal_grep", "terminal_cat"],
    "desc": "Isolated command execution, subshell containment, environment sanitization, and RTK token optimization.",
    "sampleRpc": {
      "method": "tools/call",
      "params": {
        "name": "execute_command",
        "arguments": { "command": "npm test", "cwd": "/workspace" }
      }
    }
  },
  "hela-ribosome": {
    "alias": "HeLa Ribosome",
    "source": "menager-mcp-server",
    "scope": "core",
    "role": "Process Harness",
    "entry": "build/index.js",
    "toolsCount": 11,
    "tools": ["session_spawn", "session_resize", "session_wait", "session_write", "session_read", "session_hook", "session_close", "session_signal", "session_info", "session_prune", "session_list"],
    "desc": "Polyglot interactive PTY session multiplexing, Regex-driven automated hooks, and process lifecycle teardown.",
    "sampleRpc": {
      "method": "tools/call",
      "params": {
        "name": "session_spawn",
        "arguments": { "sessionId": "build-101", "command": "mvn clean install -T 4" }
      }
    }
  },
  "hela-enzyme": {
    "alias": "HeLa Enzyme",
    "source": "research-assistant-mcp-server",
    "scope": "core",
    "role": "Knowledge Synthesis",
    "entry": "dist/index.js",
    "toolsCount": 28,
    "tools": ["google_search", "wikipedia_search", "wikipedia_get_summary", "fact_checker", "academic_search", "content_summarizer", "extract_content", "research_assistant", "keyword_extraction"],
    "desc": "Unified Google Search and Wikipedia caching, academic paper search, automated fact-checking, and content extraction.",
    "sampleRpc": {
      "method": "tools/call",
      "params": {
        "name": "wikipedia_search",
        "arguments": { "query": "Model Context Protocol JSON-RPC" }
      }
    }
  },
  "hela-cytosol": {
    "alias": "HeLa Cytosol",
    "source": "Browser-Agent",
    "scope": "core",
    "role": "Browser Interaction",
    "entry": "src/server.js",
    "toolsCount": 93,
    "tools": ["browser_navigate", "browser_click", "browser_fill_form", "browser_screenshot", "browser_get_page_markdown", "browser_get_accessibility_tree", "browser_intercept", "browser_extract_schema"],
    "desc": "Full Playwright browser automation, DOM accessibility tree perception, network request interception, and screenshot capture.",
    "sampleRpc": {
      "method": "tools/call",
      "params": {
        "name": "browser_navigate",
        "arguments": { "url": "https://modelcontextprotocol.io" }
      }
    }
  },
  "hela-phenotype": {
    "alias": "HeLa Phenotype",
    "source": "the-designer",
    "scope": "specialized",
    "role": "Design & Tokens",
    "entry": "dist/index.js",
    "toolsCount": 29,
    "tools": ["generate_rules", "generate_tokens", "palette_fetch", "brand_fetch_design_md", "generate_tailwind_config", "generate_8state_component", "audit_accessibility", "evaluate_style"],
    "desc": "UI/UX design system tokens, OKLCH palettes, brand-clone patterns (Linear, Raycast, Stripe), Tailwind CSS synthesis, and 8-state components.",
    "sampleRpc": {
      "method": "tools/call",
      "params": {
        "name": "generate_tokens",
        "arguments": { "theme_name": "Aurora" }
      }
    }
  },
  "hela-receptor": {
    "alias": "HeLa Receptor",
    "source": "scrcpy-mcp",
    "scope": "specialized",
    "role": "Mobile Automation",
    "entry": "dist/server.js",
    "toolsCount": 46,
    "tools": ["start_session", "device_list", "device_info", "ui_dump", "ui_find_element", "tap", "swipe", "input_text", "key_event", "screenshot", "screen_record_start", "app_install", "shell_exec"],
    "desc": "Android physical and emulated device automation via ADB bridge, structural XML view hierarchy inspection, and UI tapping.",
    "sampleRpc": {
      "method": "tools/call",
      "params": {
        "name": "ui_dump",
        "arguments": { "format": "xml" }
      }
    }
  },
  "hela-plastid": {
    "alias": "HeLa Plastid",
    "source": "ll3m-agent",
    "scope": "specialized",
    "role": "3D Blender Modeling",
    "entry": "dist/index.js",
    "toolsCount": 15,
    "tools": ["generate_modeling_plan", "execute_blender_code", "get_scene_summary", "render_output", "save_blend", "get_screenshot", "get_fast_feedback"],
    "desc": "Autonomous Blender procedural 3D modeling, material shaders, studio lighting setups, and automated rendering pipeline.",
    "sampleRpc": {
      "method": "tools/call",
      "params": {
        "name": "generate_modeling_plan",
        "arguments": { "prompt": "Modern ergonomic mesh chair" }
      }
    }
  }
};

const PROFILES = {
  "dev-workspace": {
    "name": "Dev Workspace (Full Desktop)",
    "target": "Desktop / Full-Stack Workstation",
    "servers": ["hela-mitosis", "hela-genome", "hela-membrane", "hela-nucleus", "hela-ribosome", "hela-enzyme", "hela-phenotype", "hela-cytosol"],
    "totalTools": 234,
    "desc": "Complete workstation environment with full-stack coding, browser testing, knowledge graphs, interactive PTY, and UI design token synthesis."
  },
  "headless-server": {
    "name": "Headless Server (Core 7)",
    "target": "CI/CD / Cloud VPS / Remote Server",
    "servers": ["hela-mitosis", "hela-genome", "hela-membrane", "hela-nucleus", "hela-ribosome", "hela-enzyme", "hela-phenotype"],
    "totalTools": 141,
    "desc": "Hardened server profile with zero GUI dependencies (no Playwright/Chromium, ADB, or Blender required). Instant startup."
  },
  "research": {
    "name": "Research Terminal",
    "target": "Literature & Knowledge Synthesis",
    "servers": ["hela-mitosis", "hela-genome", "hela-enzyme", "hela-membrane", "hela-cytosol"],
    "totalTools": 189,
    "desc": "Specialized in academic discovery, fact-checking, web crawling, and knowledge graph mapping."
  },
  "web-devops": {
    "name": "Web Dev & Verification",
    "target": "Frontend / DevOps / QA Automation",
    "servers": ["hela-mitosis", "hela-genome", "hela-membrane", "hela-nucleus", "hela-phenotype", "hela-cytosol"],
    "totalTools": 195,
    "desc": "Tailored for frontend feature development, Tailwind CSS token synthesis, live DOM inspection, and Playwright verification."
  },
  "android-testing": {
    "name": "Android Mobile QA",
    "target": "Mobile QA Engineers",
    "servers": ["hela-mitosis", "hela-genome", "hela-nucleus", "hela-receptor", "hela-enzyme"],
    "totalTools": 131,
    "desc": "Dedicated Android hardware testing with ADB bridge, structural XML view hierarchy parsing, and touch automation."
  },
  "3d-modeling": {
    "name": "Blender 3D Modeling",
    "target": "3D Designers / Game Devs",
    "servers": ["hela-mitosis", "hela-genome", "hela-plastid", "hela-membrane", "hela-nucleus"],
    "totalTools": 88,
    "desc": "Specialized in autonomous Blender procedural 3D modeling, material generation, and camera rendering pipelines."
  },
  "all": {
    "name": "All (Full 10-MCP Stack)",
    "target": "Unrestricted Master Agent",
    "servers": Object.keys(INVENTORY),
    "totalTools": 295,
    "desc": "The complete 10-server ecosystem with all 295 active tools enabled across all specialized capabilities."
  }
};

const WORKFLOWS = {
  "workflow-a": {
    "title": "Workflow A: Autonomous Feature Engineering",
    "profiles": ["dev-workspace", "headless-server"],
    "components": ["hela-genome", "hela-mitosis", "hela-membrane", "hela-nucleus"],
    "desc": "Full-stack code modification with context restoration, step-by-step reasoning, workspace edits, and test execution.",
    "sequence": [
      { "step": 1, "target": "HeLa Genome", "tool": "get_session_context", "purpose": "Restore architectural constraints & dependencies from memory.db" },
      { "step": 2, "target": "HeLa Mitosis", "tool": "analyze_with_sequential_thinking", "purpose": "Decompose feature requirements into atomic implementation steps" },
      { "step": 3, "target": "HeLa Membrane", "tool": "write_file", "purpose": "Apply minimal, production-ready code changes to workspace" },
      { "step": 4, "target": "HeLa Nucleus", "tool": "execute_command", "purpose": "Run automated test suite (e.g. npm test or pytest)" },
      { "step": 5, "target": "HeLa Genome", "tool": "add_observation", "purpose": "Commit task completion and new relations to knowledge graph" }
    ]
  },
  "workflow-b": {
    "title": "Workflow B: Deep Research & Architecture Synthesis",
    "profiles": ["research", "dev-workspace"],
    "components": ["hela-enzyme", "hela-cytosol", "hela-mitosis", "hela-genome", "hela-membrane"],
    "desc": "Aggregated search across Wikipedia and Google, live web scraping via Playwright, and knowledge graph ingestion.",
    "sequence": [
      { "step": 1, "target": "HeLa Enzyme", "tool": "wikipedia_search / google_search", "purpose": "Query technical literature and API reference documentation" },
      { "step": 2, "target": "HeLa Cytosol", "tool": "browser_navigate -> browser_get_page_markdown", "purpose": "Extract structured documentation from target URLs" },
      { "step": 3, "target": "HeLa Mitosis", "tool": "llm_summarize", "purpose": "Synthesize comparative analysis of architectural trade-offs" },
      { "step": 4, "target": "HeLa Genome", "tool": "create_entity + add_observation", "purpose": "Store technical entities and observations in memory.db" },
      { "step": 5, "target": "HeLa Membrane", "tool": "write_file", "purpose": "Save markdown summary document to workspace docs/" }
    ]
  },
  "workflow-c": {
    "title": "Workflow C: UI Design Synthesis & Browser Verification",
    "profiles": ["web-devops", "dev-workspace"],
    "components": ["hela-phenotype", "hela-membrane", "hela-nucleus", "hela-cytosol", "hela-genome"],
    "desc": "Automated design token generation, OKLCH palette synthesis, live dev server launch, and DOM visual verification.",
    "sequence": [
      { "step": 1, "target": "HeLa Phenotype", "tool": "generate_tokens / palette_fetch", "purpose": "Generate OKLCH color tokens, typography scales, and Tailwind config" },
      { "step": 2, "target": "HeLa Membrane", "tool": "write_file", "purpose": "Create component JSX and tailwind.config.js" },
      { "step": 3, "target": "HeLa Nucleus", "tool": "execute_command", "purpose": "Spawn local development web server" },
      { "step": 4, "target": "HeLa Cytosol", "tool": "browser_navigate -> browser_screenshot", "purpose": "Verify DOM accessibility tree and take rendered screenshot" },
      { "step": 5, "target": "HeLa Genome", "tool": "add_observation", "purpose": "Record verified design milestone and snapshot reference in memory.db" }
    ]
  },
  "workflow-d": {
    "title": "Workflow D: Mobile Device Automation & UI Testing",
    "profiles": ["android-testing", "all"],
    "components": ["hela-genome", "hela-nucleus", "hela-receptor"],
    "desc": "Hardware Android bridge, XML view hierarchy inspection, and physical interaction without token-heavy screenshot loops.",
    "sequence": [
      { "step": 1, "target": "HeLa Receptor", "tool": "device_list", "purpose": "Discover connected physical/emulated Android devices via ADB" },
      { "step": 2, "target": "HeLa Receptor", "tool": "start_session", "purpose": "Initialize scrcpy control stream and input handler" },
      { "step": 3, "target": "HeLa Receptor", "tool": "ui_dump", "purpose": "Inspect structural XML/axtree view hierarchy token-efficiently" },
      { "step": 4, "target": "HeLa Receptor", "tool": "tap / input_text", "purpose": "Execute touch coordinates and automated form inputs" },
      { "step": 5, "target": "HeLa Genome", "tool": "add_observation", "purpose": "Commit test execution results and state to SQLite memory graph" }
    ]
  },
  "workflow-e": {
    "title": "Workflow E: Interactive PTY Process Orchestration",
    "profiles": ["dev-workspace", "headless-server"],
    "components": ["hela-ribosome", "hela-nucleus", "hela-genome"],
    "desc": "Long-running build management, interactive REPLs, and Regex-driven lifecycle automation.",
    "sequence": [
      { "step": 1, "target": "HeLa Ribosome", "tool": "session_spawn", "purpose": "Spawn interactive background PTY process (e.g. build tool, REPL)" },
      { "step": 2, "target": "HeLa Ribosome", "tool": "session_read", "purpose": "Stream bounded stdout/stderr output chunks" },
      { "step": 3, "target": "HeLa Ribosome", "tool": "session_hook", "purpose": "Attach Regex patterns to trigger automated responses on match" },
      { "step": 4, "target": "HeLa Ribosome", "tool": "session_close", "purpose": "Gracefully terminate process and clean up PTY harness" },
      { "step": 5, "target": "HeLa Genome", "tool": "add_observation", "purpose": "Record process build logs and exit status in memory.db" }
    ]
  },
  "workflow-f": {
    "title": "Workflow F: Autonomous Blender 3D Procedural Modeling",
    "profiles": ["3d-modeling", "all"],
    "components": ["hela-genome", "hela-mitosis", "hela-plastid", "hela-membrane"],
    "desc": "High-fidelity procedural 3D modeling, material generation, lighting, and rendering directly in Blender.",
    "sequence": [
      { "step": 1, "target": "HeLa Plastid", "tool": "generate_modeling_plan", "purpose": "Decompose 3D prompt into phased procedural Blender scripts" },
      { "step": 2, "target": "HeLa Plastid", "tool": "execute_blender_code", "purpose": "Execute Python script to create geometry, materials, and lighting" },
      { "step": 3, "target": "HeLa Plastid", "tool": "render_output", "purpose": "Render high-resolution PNG snapshot from camera perspective" },
      { "step": 4, "target": "HeLa Plastid", "tool": "save_blend", "purpose": "Save binary .blend file into workspace assets/" },
      { "step": 5, "target": "HeLa Genome", "tool": "add_observation", "purpose": "Record 3D asset metadata and render path in memory.db" }
    ]
  }
};

const TERMINAL_OUTPUTS = {
  "doctor": `$ ./setup.sh doctor
=== HeLa MCP Ecosystem — Diagnostic Report ===
Node.js:     ✓ v20+ LTS (Node.js engine ready)
Git:         ✓ 2.25+ (Repository clean)
SQLite3:     ✓ Ready (WAL mode active, zero locking)

=== Component Health (All 10 Servers) ===
Component          Scope        Entrypoint   Diagnostics
-----------------------------------------------------------------
HeLa Mitosis       core         present      [READY] Stdio JSON-RPC OK (18 tools)
HeLa Genome        core         present      [READY] Stdio JSON-RPC OK (34 tools)
HeLa Membrane      core         present      [READY] Stdio JSON-RPC OK (16 tools)
HeLa Nucleus       core         present      [READY] Stdio JSON-RPC OK (5 tools)
HeLa Ribosome      core         present      [READY] Stdio JSON-RPC OK (11 tools)
HeLa Enzyme        core         present      [READY] Stdio JSON-RPC OK (28 tools)
HeLa Cytosol       core         present      [READY] Stdio JSON-RPC OK (93 tools)
HeLa Phenotype     specialized  present      [READY] Stdio JSON-RPC OK (29 tools)
HeLa Receptor      specialized  present      [READY] Stdio JSON-RPC OK (46 tools)
HeLa Plastid       specialized  present      [READY] Stdio JSON-RPC OK (15 tools)

SUCCESS: All required HeLa MCP servers and dependencies are healthy!`,

  "matrix": `$ npm run test:matrix
=== 70-Combination Client Matrix Validator ===

Profile            Client         Format     Status     Details
-----------------------------------------------------------------
dev-workspace      cursor         JSON       PASS       8 servers rendered
dev-workspace      claude         JSON       PASS       8 servers rendered
dev-workspace      gemini         JSON       PASS       8 servers rendered
dev-workspace      antigravity    JSON       PASS       8 servers rendered
dev-workspace      opencode       JSON       PASS       8 servers rendered
dev-workspace      kilo           JSON       PASS       8 servers rendered
dev-workspace      zed            JSON       PASS       8 servers rendered
dev-workspace      codex          TOML       PASS       8 servers rendered
dev-workspace      docker         DOCKER     PASS       8 services rendered
... (60 more client-profile combinations) ...

==============================================================================
Matrix Test Summary: 70 passed, 0 failed (70 total combinations) in 3064ms.
SUCCESS: All 70 profile × client matrix tests passed with 100% schema accuracy!`,

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

function renderWorkflow(wfKey) {
  const wf = WORKFLOWS[wfKey];
  if (!wf) return "";

  let html = `
    <div class="wf-detail-card">
      <div class="wf-header">
        <h3>${wf.title}</h3>
        <span class="wf-profiles">Profiles: ${wf.profiles.join(", ")}</span>
      </div>
      <p class="wf-desc">${wf.desc}</p>

      <div class="wf-steps-list">
        <h4>Step-by-Step Tool Invocation Pipeline</h4>
  `;

  wf.sequence.forEach((s) => {
    html += `
      <div class="wf-step-item">
        <div class="step-num">${s.step}</div>
        <div class="step-content">
          <div class="step-title">
            <strong>${s.target}</strong>
            <code>${s.tool}</code>
          </div>
          <div class="step-purpose">${s.purpose}</div>
        </div>
      </div>
    `;
  });

  html += `
      </div>
    </div>
  `;

  return html;
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

  function copyToClipboard(text, btn) {
    const orig = btn.textContent;
    function showSuccess() {
      btn.textContent = "COPIED ✓";
      setTimeout(() => { btn.textContent = orig; }, 2000);
    }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(showSuccess).catch(() => {
        fallbackCopy(text);
        showSuccess();
      });
    } else {
      fallbackCopy(text);
      showSuccess();
    }
  }

  function fallbackCopy(text) {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.focus();
    ta.select();
    try {
      document.execCommand("copy");
    } catch (e) {}
    document.body.removeChild(ta);
  }

  // Wire all copy buttons across the application
  document.querySelectorAll(".copy-mini").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      if (btn.id === "copyConfigBtn" && codeOutput) {
        copyToClipboard(codeOutput.textContent, btn);
        return;
      }
      if (btn.id === "heroCopyBtn" && heroCmd) {
        copyToClipboard(heroCmd.textContent.trim(), btn);
        return;
      }
      const parent = btn.closest(".quick-bar, .code-pane-header, .trouble-card");
      if (parent) {
        const target = parent.querySelector(".quick-cmd, pre code, .trouble-fix");
        if (target) {
          copyToClipboard(target.textContent.trim(), btn);
        }
      }
    });
  });

  // Terminal Simulator Tabs
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

  // Workflows Interactive Tabs
  const wfContainer = document.getElementById("workflowDisplay");
  const wfTabs = document.querySelectorAll(".wf-tab-btn");
  if (wfContainer && wfTabs.length > 0) {
    wfContainer.innerHTML = renderWorkflow("workflow-a");
    wfTabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        wfTabs.forEach((t) => t.classList.remove("active"));
        tab.classList.add("active");
        const wfId = tab.getAttribute("data-wf");
        wfContainer.innerHTML = renderWorkflow(wfId);
      });
    });
  }

  // Interactive Node Graph Inspector
  const nodeInspector = document.getElementById("nodeInspector");
  const cellNodes = document.querySelectorAll(".cell-node");
  if (nodeInspector && cellNodes.length > 0) {
    function renderInspector(node) {
      cellNodes.forEach((n) => n.classList.remove("active"));
      node.classList.add("active");
      let rawId = node.getAttribute("data-cell") || node.getAttribute("data-node");
      if (!rawId) return;
      const id = rawId.startsWith("hela-") ? rawId : "hela-" + rawId;
      const s = INVENTORY[id];
      if (s) {
        nodeInspector.innerHTML = `
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px; border-bottom:1px solid rgba(255,255,255,0.1); padding-bottom:10px;">
            <div>
              <strong style="color:var(--archival-code-fg); font-size:1.05rem; font-family:var(--font-sans);">${s.alias}</strong>
              <span style="font-family:var(--font-mono); font-size:0.75rem; color:var(--archival-code-muted); margin-left:8px;">(<code>${id}</code> // ${s.source})</span>
            </div>
            <span class="badge-core" style="font-size:0.72rem;">${s.toolsCount} Active Tools</span>
          </div>
          <p style="color:var(--archival-code-muted); margin-bottom:14px; font-family:var(--font-sans); font-size:0.9rem; line-height:1.55;">${s.desc}</p>
          <div style="margin-bottom:12px;">
            <strong style="color:var(--archival-code-accent); text-transform:uppercase; font-size:0.72rem; letter-spacing:0.08em; font-family:var(--font-mono);">Tools Catalog:</strong>
            <span style="color:var(--archival-code-fg); font-size:0.82rem; margin-left:8px; font-family:var(--font-mono); line-height:1.6;">${s.tools.join(", ")}</span>
          </div>
          <div style="margin-top:14px; color:var(--archival-code-muted); font-size:0.72rem; text-transform:uppercase; letter-spacing:0.08em; font-family:var(--font-mono);">Sample Stdio JSON-RPC Handshake:</div>
          <pre style="background:var(--archival-code-surface); border:1px solid rgba(255,255,255,0.08); padding:12px; border-radius:4px; margin-top:6px; color:#EFE9DC; overflow-x:auto; font-size:0.82rem; font-family:var(--font-mono);">${JSON.stringify(s.sampleRpc, null, 2)}</pre>
        `;
      }
    }

    cellNodes.forEach((node) => {
      node.addEventListener("click", () => renderInspector(node));
    });

    const activeNode = document.querySelector(".cell-node.active") || cellNodes[0];
    if (activeNode) renderInspector(activeNode);
  }

  // Command Palette (⌘K) Modal
  const cmdBackdrop = document.getElementById("cmdPalette");
  const cmdInput = document.getElementById("cmdInput");
  const cmdResults = document.getElementById("cmdResults");
  const openCmdBtns = document.querySelectorAll(".open-cmd-palette");

  function openPalette() {
    if (cmdBackdrop && cmdInput) {
      cmdBackdrop.style.display = "flex";
      cmdInput.value = "";
      filterCommands("");
      cmdInput.focus();
    }
  }

  function closePalette() {
    if (cmdBackdrop) {
      cmdBackdrop.style.display = "none";
    }
  }

  openCmdBtns.forEach((btn) => btn.addEventListener("click", openPalette));

  if (cmdBackdrop) {
    cmdBackdrop.addEventListener("click", (e) => {
      if (e.target === cmdBackdrop) closePalette();
    });
  }

  window.addEventListener("keydown", (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
      e.preventDefault();
      if (cmdBackdrop && cmdBackdrop.style.display === "flex") {
        closePalette();
      } else {
        openPalette();
      }
    }
    if (e.key === "Escape") {
      closePalette();
    }
  });

  function filterCommands(query) {
    if (!cmdResults) return;
    const q = query.toLowerCase().trim();
    let matches = [];

    // Collect tools
    Object.keys(INVENTORY).forEach((k) => {
      const s = INVENTORY[k];
      s.tools.forEach((t) => {
        if (!q || t.toLowerCase().includes(q) || s.alias.toLowerCase().includes(q)) {
          matches.push({ title: `${s.alias} · ${t}`, tag: "tool", link: `architecture.html#${k}` });
        }
      });
    });

    // Collect pages
    const pages = [
      { title: "Workbench (Home)", tag: "page", link: "index.html" },
      { title: "Architecture & Dual-Backbone", tag: "page", link: "architecture.html" },
      { title: "Cross-MCP Workflows A–F", tag: "page", link: "workflows.html" },
      { title: "Agent Profiles & Matrix", tag: "page", link: "profiles.html" },
      { title: "Showcases & Terminal Casts", tag: "page", link: "showcase.html" },
      { title: "Diagnostics & Troubleshooting", tag: "page", link: "troubleshooting.html" }
    ];

    pages.forEach((p) => {
      if (!q || p.title.toLowerCase().includes(q)) {
        matches.push(p);
      }
    });

    cmdResults.innerHTML = matches.slice(0, 10).map((m) => `
      <div class="cmd-item" onclick="window.location.href='${m.link}'">
        <span>${m.title}</span>
        <span class="cmd-item-tag">${m.tag}</span>
      </div>
    `).join("");
  }

  if (cmdInput) {
    cmdInput.addEventListener("input", (e) => {
      filterCommands(e.target.value);
    });
  }
});
