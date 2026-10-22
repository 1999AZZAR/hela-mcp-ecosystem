/**
 * HeLa MCP Ecosystem — Documentation Engine
 * Canonical data: config/inventory.json (mirrored here for static hosting).
 * Covers: client configurator, command palette, copy buttons.
 */

const INVENTORY = {
  "hela-mitosis": {
    "alias": "HeLa Mitosis", "source": "chaining-mcp", "scope": "core",
    "role": "Orchestrator Backbone", "entry": "dist/index.js", "toolsCount": 29,
    "tools": ["agent_run", "analyze_with_sequential_thinking", "sequentialthinking", "workflow_orchestrator", "workflow_status", "workflow_cancel", "llm_decompose_task", "llm_suggest_route", "llm_query", "llm_summarize", "list_skills", "search_skills", "get_skill", "suggest_skill_chain", "search_prompts", "get_prompt", "list_mcp_servers", "validate_tool_chain"],
    "desc": "Cognitive division and orchestration backbone. Bundled Needle 3 agent runtime, peer discovery, Needle-backed sequential reasoning, task decomposition, skills catalog, prompt templates."
  },
  "hela-genome": {
    "alias": "HeLa Genome", "source": "project-mcp", "scope": "core",
    "role": "State and Memory Backbone", "entry": "dist/index.js", "toolsCount": 38,
    "tools": ["initialize_memory", "create_entity", "create_relation", "add_observation", "search_nodes", "open_node", "get_file_context", "get_timeline", "get_session_context", "sync_central_memory", "execute_sql", "query_data", "inspect_untrusted_text", "scan_project_secrets"],
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
  "minimal": { "name": "Minimal (Mitosis + Genome + Enzyme)", "servers": ["hela-mitosis", "hela-genome", "hela-enzyme"] },
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
  { title: "08 Diagnostics", link: "troubleshooting.html" },
  { title: "09 Privacy", link: "privacy.html" },
  { title: "10 Terms", link: "terms.html" }
];


const I18N = {
  en: {
    "topbar.search": "Search",
    "nav.overview": "Overview",
    "nav.installation": "Installation",
    "nav.verify": "Verify",
    "nav.architecture": "Architecture",
    "nav.workflows": "Workflows",
    "nav.profiles": "Profiles & Config",
    "nav.showcase": "Showcase",
    "nav.diagnostics": "Diagnostics",
    "nav.privacy": "Privacy",
    "nav.terms": "Terms",
    "nav.section.started": "GETTING STARTED",
    "nav.section.reference": "REFERENCE",
    "nav.section.operate": "OPERATE",
    "nav.section.legal": "LEGAL",
    "index.title": "HeLa Cellular MCP Workbench",
    "index.lead": "A reproducible, 10-server MCP distribution suite for AI agents. Dual-backbone orchestration (reasoning + memory), deterministic stdio transport, and per-profile client configuration across 8 agent harnesses.",
    "index.what_title": "What this is",
    "index.what_desc": "Ten specialized servers, each a biological cell with one job. Two backbones coordinate them: <strong>HeLa Mitosis</strong> (task reasoning and routing) and <strong>HeLa Genome</strong> (persistent memory graph). The remaining eight cells provide filesystem, execution, processes, research, browser, design, mobile, and 3D capabilities.",
    "index.install_title": "Installation",
    "index.verify_title": "Verify",
    "index.verify_desc": "Three gates, all expected green before use:",
    "profiles.title": "Profiles & Config",
    "profiles.lead": "Eight deployment profiles. Pick the stack that matches the machine, then generate the exact client file below — 80 profile × client combinations, schema-validated.",
    "profiles.matrix_title": "Profile matrix",
    "profiles.configurator_title": "Configuration workbench",
    "profiles.label_profile": "Target profile",
    "profiles.label_client": "Client harness",
    "arch.title": "Architecture",
    "arch.lead": "Two backbones coordinate ten cells over standard MCP stdio (JSON-RPC 2.0). Mitosis routes and plans; Genome remembers. Every other cell is single-purpose.",
    "arch.backbones_title": "The dual backbone",
    "arch.servers_title": "Server reference",
    "arch.transport_title": "Transport",
    "arch.keys_title": "API keys",
    "workflows.title": "Workflows",
    "workflows.lead": "Six cross-cell pipelines demonstrated end-to-end. Every pipeline uses Mitosis to reason, Genome to record, and specialized cells to act.",
    "diag.title": "Diagnostics",
    "diag.lead": "How to diagnose, inspect, and repair any cell in the ecosystem. From the single-command doctor report to known failure modes and verified fixes.",
    "showcase.title": "Showcase",
    "showcase.lead": "Recorded verification gates and a production deployment synthesized end-to-end by the ecosystem. Proof that the cells operate together as advertised.",
    "privacy.title": "Privacy Policy",
    "privacy.lead": "Effective 2026-09-21. Short version: this site collects nothing. The software runs on your machine. We do not want your data.",
    "terms.title": "Terms of Use",
    "terms.lead": "Effective 2026-09-21. Short version: this is MIT-licensed open source software provided as-is. You run it; you are responsible for what it does."
  },
  id: {
    "topbar.search": "Cari",
    "nav.overview": "Ikhtisar",
    "nav.installation": "Instalasi",
    "nav.verify": "Verifikasi",
    "nav.architecture": "Arsitektur",
    "nav.workflows": "Alur Kerja",
    "nav.profiles": "Profil & Konfigurasi",
    "nav.showcase": "Pameran",
    "nav.diagnostics": "Diagnostik",
    "nav.privacy": "Privasi",
    "nav.terms": "Ketentuan",
    "nav.section.started": "MEMULAI",
    "nav.section.reference": "REFERENSI",
    "nav.section.operate": "PENGOPERASIAN",
    "nav.section.legal": "LEGAL & HUKUM",
    "index.title": "Meja Kerja Seluler HeLa MCP",
    "index.lead": "Rangkaian distribusi 10 server MCP yang dapat direproduksi untuk agen AI. Orkestrasi dual-backbone (penalaran + memori), transport stdio deterministik, dan konfigurasi klien per-profil di 8 harness agen.",
    "index.what_title": "Tentang Ekosistem Ini",
    "index.what_desc": "Sepuluh server terspesialisasi, masing-masing bertindak layaknya sel biologis dengan satu tugas utama. Dua backbone mengoordinasikannya: <strong>HeLa Mitosis</strong> (penalaran & perutean tugas) dan <strong>HeLa Genome</strong> (grafik memori persisten). Delapan sel lainnya menyediakan kapabilitas berkas, eksekusi perintah, proses, riset, browser, desain antarmuka, mobile, dan 3D.",
    "index.install_title": "Instalasi",
    "index.verify_title": "Verifikasi",
    "index.verify_desc": "Tiga gerbang verifikasi, semuanya diharapkan berstatus hijau sebelum digunakan:",
    "profiles.title": "Profil & Konfigurasi",
    "profiles.lead": "Delapan profil instalasi. Pilih tumpukan server yang sesuai dengan mesin Anda, lalu buat berkas konfigurasi klien yang presisi di bawah ini — 80 kombinasi profil × klien, tervalidasi skemanya.",
    "profiles.matrix_title": "Matriks Profil",
    "profiles.configurator_title": "Meja Kerja Konfigurasi",
    "profiles.label_profile": "Profil target",
    "profiles.label_client": "Klien agen",
    "arch.title": "Arsitektur",
    "arch.lead": "Dua backbone mengoordinasikan sepuluh sel melalui standar MCP stdio (JSON-RPC 2.0). Mitosis merutekan dan merencanakan; Genome mengingat. Setiap sel lainnya berfokus pada fungsi tunggal.",
    "arch.backbones_title": "Dual Backbone",
    "arch.servers_title": "Referensi Server",
    "arch.transport_title": "Transport Komunikasi",
    "arch.keys_title": "Kunci API & Akses",
    "workflows.title": "Alur Kerja",
    "workflows.lead": "Enam pipeline lintas-sel yang didemonstrasikan menyeluruh. Setiap alur kerja memanfaatkan Mitosis untuk menalar, Genome untuk mencatat, dan sel-sel terspesialisasi untuk bertindak.",
    "diag.title": "Diagnostik",
    "diag.lead": "Cara memeriksa, menganalisis, dan memperbaiki sel apa pun dalam ekosistem. Mulai dari laporan satu perintah (doctor) hingga penanganan mode kegagalan yang umum.",
    "showcase.title": "Pameran & Bukti",
    "showcase.lead": "Rekaman gerbang verifikasi dan deployment produksi yang dibangun langsung oleh ekosistem. Bukti nyata bahwa sel-sel bekerja selaras sebagaimana dirancang.",
    "privacy.title": "Kebijakan Privasi",
    "privacy.lead": "Berlaku sejak 2026-09-21. Ringkasnya: situs ini tidak mengumpulkan data apa pun. Perangkat lunak berjalan di komputer Anda sendiri. Kami tidak menginginkan data Anda.",
    "terms.title": "Ketentuan Penggunaan",
    "terms.lead": "Berlaku sejak 2026-09-21. Ringkasnya: ini adalah perangkat lunak open source berlisensi MIT yang disediakan apa adanya. Anda menjalankannya; Anda bertanggung jawab penuh atas apa yang dilakukannya."
  }
};

function getActiveLanguage() {
  return localStorage.getItem("hela_lang") || "en";
}

function setLanguage(lang) {
  if (!I18N[lang]) lang = "en";
  localStorage.setItem("hela_lang", lang);
  document.documentElement.lang = lang;

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (I18N[lang] && I18N[lang][key]) {
      el.innerHTML = I18N[lang][key];
    }
  });

  document.querySelectorAll(".lang-btn").forEach((btn) => {
    if (btn.getAttribute("data-lang") === lang) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  // Initialize language from storage or default
  setLanguage(getActiveLanguage());

  // Language switcher buttons
  document.querySelectorAll(".lang-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const lang = btn.getAttribute("data-lang");
      setLanguage(lang);
    });
  });

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

  // Right-rail table of contents from section headings
  const tocList = document.getElementById("tocList");
  if (tocList) {
    const heads = document.querySelectorAll("main.doc-content h2[id]");
    tocList.innerHTML = Array.from(heads).map((h) =>
      '<li><a href="#' + h.id + '">' + h.textContent + "</a></li>"
    ).join("");
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
