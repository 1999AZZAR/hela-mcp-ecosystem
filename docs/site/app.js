/**
 * HeLa MCP Ecosystem — Master Documentation & Developer Platform
 * Powered by canonical specs from docs/architecture.md, docs/workflows.md, docs/profiles.md
 */

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

const INVENTORY = {
  "hela-mitosis": {
    "alias": "HeLa Mitosis",
    "source": "chaining-mcp-server",
    "scope": "core",
    "role": "Orchestrator Backbone",
    "entry": "dist/index.js",
    "toolsCount": 18,
    "tools": ["analyze_with_sequential_thinking", "sequentialthinking", "workflow_orchestrator", "llm_decompose_task", "llm_query", "llm_summarize", "search_prompts", "get_prompt", "list_mcp_servers", "validate_tool_chain"],
    "desc": "Cellular division & orchestration backbone. Dynamic peer tool discovery, step-by-step reasoning, task decomposition, and 42 domain prompt templates."
  },
  "hela-genome": {
    "alias": "HeLa Genome",
    "source": "Project-Guardian-mcp-server",
    "scope": "core",
    "role": "State & Memory Backbone",
    "entry": "dist/index.js",
    "toolsCount": 34,
    "tools": ["initialize_memory", "create_entity", "create_relation", "add_observation", "search_nodes", "open_node", "get_session_context", "sync_central_memory", "execute_sql", "query_data", "inspect_untrusted_text", "scan_project_secrets"],
    "desc": "Living SQLite knowledge graph (memory.db) with FTS5 search, entity-relation tracking, cross-session context restoration, and decision memory."
  },
  "hela-membrane": {
    "alias": "HeLa Membrane",
    "source": "filesystem-mcp-server",
    "scope": "core",
    "role": "Workspace Filesystem",
    "entry": "dist/index.js",
    "toolsCount": 16,
    "tools": ["read_file", "write_file", "copy_file", "move_file", "delete_file", "get_file_info", "create_directory", "list_directory", "find_files", "search_in_files", "watch_file", "archive_files", "extract_archive"],
    "desc": "Sandboxed filesystem boundary. Deep recursive directory search, file watching, binary inspection, and archive manipulation."
  },
  "hela-nucleus": {
    "alias": "HeLa Nucleus",
    "source": "terminal-mcp-server",
    "scope": "core",
    "role": "Execution Boundary",
    "entry": "build/index.js",
    "toolsCount": 5,
    "tools": ["execute_command", "transfer_file", "terminal_ls", "terminal_grep", "terminal_cat"],
    "desc": "Isolated command execution, subshell containment, environment sanitization, and RTK token optimization."
  },
  "hela-ribosome": {
    "alias": "HeLa Ribosome",
    "source": "menager-mcp-server",
    "scope": "core",
    "role": "Process Harness",
    "entry": "build/index.js",
    "toolsCount": 11,
    "tools": ["session_spawn", "session_resize", "session_wait", "session_write", "session_read", "session_hook", "session_close", "session_signal", "session_info", "session_prune", "session_list"],
    "desc": "Polyglot interactive PTY session multiplexing, Regex-driven automated hooks, and process lifecycle teardown."
  },
  "hela-enzyme": {
    "alias": "HeLa Enzyme",
    "source": "research-assistant-mcp-server",
    "scope": "core",
    "role": "Knowledge Synthesis",
    "entry": "dist/index.js",
    "toolsCount": 28,
    "tools": ["google_search", "wikipedia_search", "wikipedia_get_summary", "fact_checker", "academic_search", "content_summarizer", "extract_content", "research_assistant", "keyword_extraction", "content_sentiment_analysis"],
    "desc": "Unified Google Search and Wikipedia caching, academic paper search, automated fact-checking, and content extraction."
  },
  "hela-cytosol": {
    "alias": "HeLa Cytosol",
    "source": "Browser-Agent",
    "scope": "core",
    "role": "Browser Interaction",
    "entry": "src/server.js",
    "toolsCount": 93,
    "tools": ["browser_navigate", "browser_click", "browser_fill_form", "browser_screenshot", "browser_get_page_markdown", "browser_get_accessibility_tree", "browser_intercept", "browser_generate_playwright_test", "browser_extract_schema", "browser_ocr"],
    "desc": "Full Playwright browser automation, DOM accessibility tree perception, network request interception, and screenshot capture."
  },
  "hela-phenotype": {
    "alias": "HeLa Phenotype",
    "source": "the-designer",
    "scope": "specialized",
    "role": "Design & Tokens",
    "entry": "dist/index.js",
    "toolsCount": 29,
    "tools": ["generate_rules", "generate_tokens", "palette_fetch", "brand_fetch_design_md", "generate_tailwind_config", "generate_8state_component", "audit_accessibility", "evaluate_style", "generate_motion_snippet"],
    "desc": "UI/UX design system tokens, OKLCH palettes, brand-clone patterns (Linear, Vercel, Stripe), Tailwind CSS synthesis, and 8-state components."
  },
  "hela-receptor": {
    "alias": "HeLa Receptor",
    "source": "scrcpy-mcp",
    "scope": "specialized",
    "role": "Mobile Automation",
    "entry": "dist/server.js",
    "toolsCount": 46,
    "tools": ["start_session", "device_list", "device_info", "ui_dump", "ui_find_element", "tap", "swipe", "input_text", "key_event", "screenshot", "screen_record_start", "app_install", "shell_exec"],
    "desc": "Android physical and emulated device automation via ADB bridge, structural XML view hierarchy inspection, and UI tapping."
  },
  "hela-plastid": {
    "alias": "HeLa Plastid",
    "source": "ll3m-agent",
    "scope": "specialized",
    "role": "3D Blender Modeling",
    "entry": "dist/index.js",
    "toolsCount": 15,
    "tools": ["generate_modeling_plan", "execute_blender_code", "get_scene_summary", "render_output", "save_blend", "get_screenshot", "get_fast_feedback", "execute_staged_refinement"],
    "desc": "Autonomous Blender procedural 3D modeling, material shaders, studio lighting setups, and automated rendering pipeline."
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
});
