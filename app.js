/**
 * HeLa MCP Ecosystem — Documentation Engine
 * Canonical data: config/inventory.json (mirrored here for static hosting).
 * Covers: client configurator, command palette, copy buttons.
 */

const INVENTORY = {
  "hela-mitosis": {
    "alias": "HeLa Mitosis", "source": "chaining-mcp", "scope": "core",
    "role": "Orchestrator Backbone", "entry": "dist/index.js", "toolsCount": 22,
    "tools": ["analyze_with_sequential_thinking", "sequentialthinking", "workflow_orchestrator", "llm_decompose_task", "llm_query", "llm_summarize", "search_prompts", "get_prompt", "list_mcp_servers", "validate_tool_chain"],
    "desc": "Cognitive division and orchestration backbone. Peer discovery, step-by-step reasoning, task decomposition, prompt templates."
  },
  "hela-genome": {
    "alias": "HeLa Genome", "source": "project-mcp", "scope": "core",
    "role": "State and Memory Backbone", "entry": "dist/index.js", "toolsCount": 34,
    "tools": ["initialize_memory", "create_entity", "create_relation", "add_observation", "search_nodes", "open_node", "get_session_context", "sync_central_memory", "execute_sql", "query_data", "inspect_untrusted_text", "scan_project_secrets"],
    "desc": "Living SQLite knowledge graph with FTS5 search, entity tracking, and session restoration."
  },
  "hela-membrane": {
    "alias": "HeLa Membrane", "source": "filesystem-mcp", "scope": "core",
    "role": "Workspace Filesystem", "entry": "dist/index.js", "toolsCount": 16,
    "tools": ["read_file", "write_file", "copy_file", "move_file", "delete_file", "get_file_info", "create_directory", "list_directory", "find_files", "search_in_files", "watch_file", "archive_files", "extract_archive"],
    "desc": "Sandboxed filesystem boundary. Recursive search, watching, archives."
  },
  "hela-nucleus": {
    "alias": "HeLa Nucleus", "source": "terminal-mcp", "scope": "core",
    "role": "Execution Boundary", "entry": "build/index.js", "toolsCount": 5,
    "tools": ["execute_command", "transfer_file", "terminal_ls", "terminal_grep", "terminal_cat"],
    "desc": "Isolated command execution with RTK token optimization."
  },
  "hela-ribosome": {
    "alias": "HeLa Ribosome", "source": "menager-mcp", "scope": "core",
    "role": "Process Harness", "entry": "build/index.js", "toolsCount": 28,
    "tools": ["session_spawn", "session_write", "session_read", "session_hook", "session_wait", "session_close", "agent_spawn", "agent_send", "agent_fork", "agent_list", "opencode_models", "opencode_server_spawn"],
    "desc": "PTY multiplexing plus native opencode agent orchestration."
  },
  "hela-enzyme": {
    "alias": "HeLa Enzyme", "source": "researcher-mcp", "scope": "core",
    "role": "Knowledge Synthesis", "entry": "dist/index.js", "toolsCount": 29,
    "tools": ["google_search", "wikipedia_search", "wikipedia_get_summary", "fact_checker", "academic_search", "content_summarizer", "extract_content", "research_brief", "keyword_extraction"],
    "desc": "Google + Wikipedia research with caching, fact-checking, and one-call briefs."
  },
  "hela-cytosol": {
    "alias": "HeLa Cytosol", "source": "browser-mcp", "scope": "core",
    "role": "Browser Interaction", "entry": "src/server.js", "toolsCount": 93,
    "tools": ["browser_navigate", "browser_click", "browser_fill_form", "browser_screenshot", "browser_get_page_markdown", "browser_get_accessibility_tree", "browser_intercept", "browser_extract_schema"],
    "desc": "Playwright automation with AX-tree perception and intercepts."
  },
  "hela-phenotype": {
    "alias": "HeLa Phenotype", "source": "designer-mcp", "scope": "specialized",
    "role": "Design and Tokens", "entry": "dist/index.js", "toolsCount": 29,
    "tools": ["generate_rules", "generate_tokens", "palette_fetch", "brand_fetch_design_md", "generate_tailwind_config", "generate_8state_component", "audit_accessibility", "evaluate_style"],
    "desc": "OKLCH tokens, brand references, Tailwind synthesis, 8-state components."
  },
  "hela-receptor": {
    "alias": "HeLa Receptor", "source": "scrcpy-mcp", "scope": "specialized",
    "role": "Mobile Automation", "entry": "dist/server.js", "toolsCount": 46,
    "tools": ["start_session", "device_list", "device_info", "ui_dump", "ui_find_element", "tap", "swipe", "input_text", "key_event", "screenshot", "screen_record_start", "app_install", "shell_exec"],
    "desc": "Android automation over ADB with XML hierarchy inspection."
  },
  "hela-plastid": {
    "alias": "HeLa Plastid", "source": "ll3m-mcp", "scope": "specialized",
    "role": "3D Blender Modeling", "entry": "brain/dist/index.js", "toolsCount": 15,
    "tools": ["generate_modeling_plan", "execute_blender_code", "get_scene_summary", "render_output", "save_blend", "get_screenshot", "get_fast_feedback"],
    "desc": "Procedural Blender modeling, materials, lighting, rendering."
  }
};

const PROFILES = {
  "dev-workspace": { "name": "Dev Workspace (Full Desktop)", "servers": ["hela-mitosis", "hela-genome", "hela-membrane", "hela-nucleus", "hela-ribosome", "hela-enzyme", "hela-phenotype", "hela-cytosol"] },
  "headless-server": { "name": "Headless Server (Core 7)", "servers": ["hela-mitosis", "hela-genome", "hela-membrane", "hela-nucleus", "hela-ribosome", "hela-enzyme", "hela-phenotype"] },
  "research": { "name": "Research Terminal", "servers": ["hela-mitosis", "hela-genome", "hela-enzyme", "hela-membrane", "hela-cytosol"] },
  "web-devops": { "name": "Web Dev and Verification", "servers": ["hela-mitosis", "hela-genome", "hela-membrane", "hela-nucleus", "hela-phenotype", "hela-cytosol"] },
  "android-testing": { "name": "Android Mobile QA", "servers": ["hela-mitosis", "hela-genome", "hela-nucleus", "hela-receptor", "hela-enzyme"] },
  "3d-modeling": { "name": "Blender 3D Modeling", "servers": ["hela-mitosis", "hela-genome", "hela-plastid", "hela-membrane", "hela-nucleus"] },
  "all": { "name": "All (Full 10-MCP Stack)", "servers": Object.keys(INVENTORY) }
};

function renderConfig(profileKey, clientKey) {
  const prof = PROFILES[profileKey] || PROFILES["dev-workspace"];
  const root = "/absolute/path/to/hela-mcp-ecosystem";
  const servers = prof.servers.map((k) => ({ id: k, dir: INVENTORY[k].source, entry: INVENTORY[k].entry }));

  if (["cursor", "claude", "gemini", "antigravity"].includes(clientKey)) {
    const mcpServers = {};
    for (const s of servers) mcpServers[s.id] = { command: "node", args: [root + "/" + s.dir + "/" + s.entry] };
    return JSON.stringify({ mcpServers }, null, 2);
  }
  if (clientKey === "opencode" || clientKey === "kilo") {
    const mcp = {};
    for (const s of servers) mcp[s.id] = { type: "local", enabled: true, command: ["node", root + "/" + s.dir + "/" + s.entry] };
    return JSON.stringify({ mcp }, null, 2);
  }
  if (clientKey === "zed") {
    const context_servers = {};
    for (const s of servers) context_servers[s.id] = { command: "node", args: [root + "/" + s.dir + "/" + s.entry] };
    return JSON.stringify({ context_servers }, null, 2);
  }
  if (clientKey === "codex") {
    const lines = ["# Generated Codex / ChatGPT MCP Server Configuration"];
    for (const s of servers) lines.push("\n[mcpServers." + s.id + ']\ncommand = "node"\nargs = ["' + root + "/" + s.dir + "/" + s.entry + '"]');
    return lines.join("\n");
  }
  if (clientKey === "docker") {
    const services = {};
    servers.forEach((s, i) => {
      services[s.id] = { build: { context: "../" + s.dir, dockerfile: "Dockerfile" }, ports: [(3001 + i) + ":" + (3001 + i)], networks: ["mcp-network"] };
    });
    return JSON.stringify({ version: "3.8", services, networks: { "mcp-network": { driver: "bridge" } } }, null, 2);
  }
  return "// Select a profile and client.";
}

const PAGES = [
  { title: "01 Overview", link: "index.html" },
  { title: "04 Architecture", link: "architecture.html" },
  { title: "05 Workflows", link: "workflows.html" },
  { title: "06 Profiles and Config", link: "profiles.html" },
  { title: "07 Showcase", link: "showcase.html" },
  { title: "08 Diagnostics", link: "troubleshooting.html" }
];

document.addEventListener("DOMContentLoaded", () => {
  // Configurator (profiles page only)
  const profileSelect = document.getElementById("profileSelect");
  const clientSelect = document.getElementById("clientSelect");
  const codeOutput = document.getElementById("configCode");
  function updateOutput() {
    if (!profileSelect || !clientSelect || !codeOutput) return;
    codeOutput.textContent = renderConfig(profileSelect.value, clientSelect.value);
  }
  if (profileSelect && clientSelect) {
    profileSelect.addEventListener("change", updateOutput);
    clientSelect.addEventListener("change", updateOutput);
    updateOutput();
  }

  // Copy buttons (code dossiers + configurator)
  document.querySelectorAll(".copy-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const pane = btn.closest(".code-dossier");
      const target = pane ? pane.querySelector("pre code") : null;
      const text = target ? target.textContent : "";
      const done = () => {
        const orig = btn.textContent;
        btn.textContent = "COPIED";
        setTimeout(() => { btn.textContent = orig; }, 2000);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(done).catch(done);
      } else {
        done();
      }
    });
  });

  // Command palette
  const backdrop = document.getElementById("cmdPalette");
  const cmdInput = document.getElementById("cmdInput");
  const cmdResults = document.getElementById("cmdResults");
  function matches() {
    const q = (cmdInput && cmdInput.value || "").toLowerCase().trim();
    const out = [];
    Object.keys(INVENTORY).forEach((k) => {
      const s = INVENTORY[k];
      s.tools.forEach((t) => {
        if (!q || t.toLowerCase().includes(q) || s.alias.toLowerCase().includes(q)) {
          out.push({ title: s.alias + " · " + t, tag: "tool", link: "architecture.html#srv-" + k.replace("hela-", "") });
        }
      });
    });
    PAGES.forEach((p) => {
      if (!q || p.title.toLowerCase().includes(q)) out.push({ title: p.title, tag: "page", link: p.link });
    });
    return out.slice(0, 12);
  }
  function renderMatches() {
    if (!cmdResults) return;
    cmdResults.innerHTML = matches().map((m) =>
      '<div class="cmd-item" data-link="' + m.link + '"><span>' + m.title + '</span><span class="cmd-item-tag">' + m.tag + "</span></div>"
    ).join("");
    cmdResults.querySelectorAll(".cmd-item").forEach((el) => {
      el.addEventListener("click", () => { window.location.href = el.getAttribute("data-link"); });
    });
  }
  function openPalette() {
    if (!backdrop) return;
    backdrop.style.display = "flex";
    if (cmdInput) { cmdInput.value = ""; renderMatches(); cmdInput.focus(); }
  }
  function closePalette() {
    if (backdrop) backdrop.style.display = "none";
  }
  document.querySelectorAll(".open-cmd-palette").forEach((b) => b.addEventListener("click", openPalette));
  if (backdrop) backdrop.addEventListener("click", (e) => { if (e.target === backdrop) closePalette(); });
  if (cmdInput) cmdInput.addEventListener("input", renderMatches);
  window.addEventListener("keydown", (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
      e.preventDefault();
      if (backdrop && backdrop.style.display === "flex") closePalette();
      else openPalette();
    }
    if (e.key === "Escape") closePalette();
  });
});
