# MCP Ecosystem Refinement — Intensive Execution TODO

This document translates the complete 37-point specification in `Refinement_plan.md` into an actionable, trackable task checklist for refining the `mcp-ecosystem` repository into a hardened, reproducible, 10-MCP distribution suite.

---

## Architectural Principle & Scope Boundaries

* **The 10-MCP Capability Ceiling**: Exactly 10 MCP servers. No MCP #11 will be added.
* **The Backbone**:
  * **Chaining MCP**: Intelligent orchestration, dynamic tool discovery, task decomposition, route ranking, and workflows.
  * **Project Guardian MCP**: Persistent project state, living SQLite knowledge graph, task tracking, and decision memory.
* **The 8 Specialized Capabilities**:
  * **Filesystem**, **Terminal**, **Menager**, **Researcher**, **The Designer**, **Browser Agent**, **scrcpy**, **LL3M Agent**.
* **Reproducibility Mechanism**: Git commit hashes as immutable revision pins across all profiles and snapshots.

---

## Milestone Progress Dashboard

| Milestone | Scope & Phases | Focus Area | Status | Target Deliverable |
|---|---|---|:---:|---|
| **M1: Baseline & Profiles** | Phase 1 & 2 | 10-MCP repository audit, taxonomy classification, agent profiles & pre-validation | ⏳ In Progress | Updated `inventory.json`, `profiles.json`, and profile pre-validator |
| **M2: Determinism & Doctor** | Phase 3 & 4 | Ecosystem snapshot engine (`v1.0.0.json`), deterministic setup & diagnostic tool | 📋 Planned | `config/snapshots/`, `./setup.sh doctor` |
| **M3: Integration & Workflows** | Phase 5 & 6 | Backbone integration layer, large output control & Workflows A through F | 📋 Planned | `scripts/test-integration.sh`, `docs/workflows.md` |
| **M4: Security, CI & Clients** | Phase 7, 8 & 9 | Security audit, client configuration testing & GitHub Actions CI matrix | 📋 Planned | Hardened `.github/workflows/ci.yml`, security report |
| **M5: Showcase & Release** | Phase 10 | Real workflow recordings, documentation website & v1.0.0 public launch | 📋 Planned | Documentation website (`docs/site`), GitHub Release |

---

## Phase 1: Complete Repository & 10-MCP Baseline Audit

- [ ] **1.1. Inventory & Remote Repository Audit**
  - [ ] Audit all 10 MCP server entries in `config/inventory.json` against their GitHub repositories:
    - [ ] `chaining-mcp-server` (`1999AZZAR/chaining-mcp-server`)
    - [ ] `filesystem-mcp-server` (`1999AZZAR/filesystem-mcp-server`)
    - [ ] `Project-Guardian-mcp-server` (`1999AZZAR/Project-Guardian`)
    - [ ] `terminal-mcp-server` (`1999AZZAR/terminal-mcp-server`)
    - [ ] `menager-mcp-server` (`1999AZZAR/menager-mcp-server`)
    - [ ] `research-mcp-server` (`1999AZZAR/research-mcp-server`)
    - [ ] `the-designer` (`1999AZZAR/the-designer`)
    - [ ] `browser-agent` (`1999AZZAR/browser-agent`)
    - [ ] `scrcpy-mcp` (`1999AZZAR/scrcpy-mcp`)
    - [ ] `ll3m-agent` (`1999AZZAR/ll3m-agent`)
  - [ ] Verify runtime entrypoints, build commands (`npm run build`, `tsc`), and package scripts.
  - [ ] Record exact commit hashes as current baseline revisions.

- [ ] **1.2. Taxonomy & Role Classification in `inventory.json`**
  - [ ] Update `config/inventory.json` schema to explicitly categorize each server:
    - [ ] `category: "backbone"` for `chaining` and `project-guardian`
    - [ ] `category: "capability"` for the 8 specialized servers
    - [ ] `domain`: `workspace`, `knowledge`, `interaction`, `design`, `mobile`, `3d`
    - [ ] `targetRequirement`: `headless-compatible`, `gui-required`, `device-required`, `runtime-required`
  - [ ] Document all environment variables and optional secret dependencies per server.

- [ ] **1.3. Baseline Verification**
  - [ ] Run baseline test suite across all 10 servers and log current baseline passing status.

---

## Phase 2: Profile System Refinement & Agent-Oriented Profiles

- [ ] **2.1. Audit & Refine Existing Profiles**
  - [ ] Review all 7 profile definitions in `config/profiles.json`:
    - [ ] `dev-workspace` (Full desktop workstation: Backbone + Filesystem + Terminal + Menager + Researcher + Designer + Browser Agent)
    - [ ] `headless-server` (Core 7 servers: Backbone + Filesystem + Terminal + Menager + Researcher + Designer)
    - [ ] `research` (Dedicated research node: Backbone + Researcher + Filesystem + Browser Agent)
    - [ ] `web-devops` (Web development + browser verification: Backbone + Filesystem + Terminal + Designer + Browser Agent)
    - [ ] `android-testing` (Mobile automation: Backbone + Terminal + scrcpy + Researcher)
    - [ ] `3d-modeling` (Blender 3D automation: Backbone + LL3M + Filesystem + Terminal)
    - [ ] `all` (Full 10-MCP inventory stack)
  - [ ] Ensure every profile includes both backbone servers (`chaining-mcp-server` and `Project-Guardian-mcp-server`).

- [ ] **2.2. Agent Persona & Workflow Documentation in `docs/profiles.md`**
  - [ ] Document each profile with:
    - [ ] Agent Persona & Purpose
    - [ ] Backbone Components
    - [ ] Specialized Capability Set
    - [ ] Target Requirements (Headless vs. GUI / Device)
    - [ ] Standard End-to-End Workflow Pipeline

- [ ] **2.3. Strict Profile Pre-Validation**
  - [ ] Implement profile pre-validation in `scripts/lib.sh` / `setup.sh`:
    - [ ] Verify profile ID exists.
    - [ ] Verify every referenced server exists in `config/inventory.json`.
    - [ ] Check target environment compatibility (warn/block GUI/device profiles on headless environments).
    - [ ] Verify external binary prerequisites (e.g. `blender`, `adb`, `playwright`).
    - [ ] Fail fast with actionable error messages before modifying disk state.

---

## Phase 3: Deterministic Installation, Idempotence & Snapshot Management

- [ ] **3.1. Ecosystem Snapshot Specification**
  - [ ] Create `config/snapshots/` directory.
  - [ ] Create `config/snapshots/v1.0.0.json` (and `config/snapshots/latest-stable.json`) recording:
    - [ ] Ecosystem repository commit
    - [ ] Pinned commit hash for all 10 MCP servers
    - [ ] Verified profile compatibility matrix
  - [ ] Add snapshot selection support to `setup.sh` (`--snapshot <file|tag>`).

- [ ] **3.2. Deterministic Installation Engine**
  - [ ] Update `setup_server` in `setup.sh` and `scripts/lib.sh`:
    - [ ] Clone or checkout exact pinned commit hash when specified in `inventory.json` / snapshot.
    - [ ] Support `--dev` flag to track moving `main`/`master` branches for development.
    - [ ] Install dependencies with clean, reproducible installs (`npm install` / `npm ci`).
    - [ ] Verify build artifacts (`dist/index.js`, `build/index.js`) exist after build step.

- [ ] **3.3. Idempotency & Safe State Handling**
  - [ ] If server directory exists at the exact requested revision and is already built, skip re-cloning and re-building.
  - [ ] If revision differs, fetch and checkout the requested revision deterministically.
  - [ ] Ensure repeated runs of `./setup.sh --profile <id>` produce identical environments without duplicate config entries or corrupted states.
  - [ ] Retain previous known commit hash on updates for instant rollback capability.

---

## Phase 4: Diagnostic Health Command (`setup.sh doctor`)

- [ ] **4.1. Create Comprehensive Diagnostics Engine (`scripts/doctor.sh` / `./setup.sh doctor`)**
  - [ ] **Host System Checks**:
    - [ ] Operating System, Architecture, Kernel
    - [ ] Node.js version (>= 18.0.0, recommend 20+ LTS)
    - [ ] npm / pnpm version
    - [ ] Git version (>= 2.25.0)
    - [ ] SQLite3 CLI availability & writable test
    - [ ] Docker & Docker Compose availability (optional)
  - [ ] **Server Health & Entrypoint Checks (for selected profile or inventory)**:
    - [ ] Directory existence & Git commit verification
    - [ ] `package.json` and build artifacts (`dist/index.js` or `build/index.js`)
    - [ ] Permissions and executable bit check
    - [ ] Smoke startup test (launch node subprocess, verify clean stdio transport, exit in <500ms)
  - [ ] **External Runtime & Hardware Dependency Checks**:
    - [ ] Playwright / Chromium browser binary check (for `browser-agent`)
    - [ ] Android Debug Bridge (`adb`) and device detection (for `scrcpy-mcp`)
    - [ ] Blender CLI executable check (`blender --version`) (for `ll3m-agent`)
    - [ ] PTY / POSIX pseudo-terminal support (for `menager-mcp-server`)
  - [ ] **Secret & API Key Checks**:
    - [ ] OpenRouter API Key (sk-or-v1-...) -> Valid / Free offline fallback active
    - [ ] GitHub Token (ghp_...) -> Valid / Bundled offline catalog active
    - [ ] Google API Key & CSE ID -> Valid / Wikipedia fallback active
    - [ ] Ensure keys and tokens are NEVER printed or exposed in logs.
  - [ ] **Actionable Diagnostics Output**:
    - [ ] Display clean summary table (`[READY]`, `[OPTIONAL MISSING]`, `[ERROR - REQUIRED MISSING]`).
    - [ ] Return exit code 0 when all required components pass, non-zero when required dependencies fail.

---

## Phase 5: Backbone Auditing & Cross-MCP Integration Layer

- [ ] **5.1. Chaining Backbone Audit**
  - [ ] Verify dynamic discovery of all peer MCP servers in the active client configuration.
  - [ ] Verify tool analysis (`analyze_tools`) and routing suggestions (`generate_route_suggestions`, `llm_suggest_route`).
  - [ ] Verify task decomposition (`llm_decompose_task`) and linear/staged workflow orchestrator (`workflow_orchestrator`).
  - [ ] Verify sequential thinking (`sequentialthinking`) and multi-branch reasoning trees.
  - [ ] Verify telemetry and health monitoring endpoints (`chaining://health`, `chaining://cache/stats`).
  - [ ] Test graceful zero-key degradation (deterministic local heuristic fallback in <30ms).

- [ ] **5.2. Project Guardian Backbone Audit**
  - [ ] Verify session context restoration at startup (`get_session_context`).
  - [ ] Verify persistent entity, relation, and observation tracking in SQLite knowledge graph (`memory.db`).
  - [ ] Verify task tracking and status updates across chat sessions.
  - [ ] Verify central memory synchronization (`sync_central_memory`).
  - [ ] Maintain strict boundary: Guardian remembers and tracks state; Chaining plans and executes.

- [ ] **5.3. Audit 8 Capability MCPs Against the Backbone**
  - [ ] Verify tool naming and schema clarity across:
    - [ ] `filesystem-mcp-server` (read, write, list, search, patch, archive, watch)
    - [ ] `terminal-mcp-server` (execute, transfer, ls, grep, cat)
    - [ ] `menager-mcp-server` (PTY sessions, regex hooks, circular buffer logs)
    - [ ] `research-mcp-server` (Google search, Wikipedia search, sentiment, fact-check)
    - [ ] `the-designer` (rules, tokens, Tailwind, components, accessibility, pre-flight scan)
    - [ ] `browser-agent` (navigate, click, type, screenshot, evaluate, extract table)
    - [ ] `scrcpy-mcp` (device list, tap, swipe, key events, ui dump, app control)
    - [ ] `ll3m-agent` (Blender modeling plan, execute code, scene summary, render)
  - [ ] Control large output payloads: enforce pagination, line limits, and truncation warnings.
  - [ ] Standardize error responses: operation, root cause, recoverability status, and suggested action.

- [ ] **5.4. Ecosystem Integration Test Script (`scripts/test-integration.sh`)**
  - [ ] Create automated integration test script that:
    - [ ] Launches selected MCP servers.
    - [ ] Validates tool registration via stdio JSON-RPC.
    - [ ] Executes a simulated multi-MCP chain (Chaining plan -> Capability execution -> Guardian persistence).
    - [ ] Asserts 100% clean shutdown without zombie processes.

---

## Phase 6: Real Cross-MCP Workflow Validation Scenarios

- [ ] **6.1. Workflow A: Autonomous Software Development**
  - [ ] Scenario: Create, test, and verify a full-stack feature.
  - [ ] Pipeline: Guardian (restore context) -> Chaining (decompose plan) -> Filesystem (inspect repo) -> Terminal (implement/test) -> Browser Agent (verify web UI) -> Guardian (record decisions).
  - [ ] Document test inputs, expected outputs, and recovery steps.

- [ ] **6.2. Workflow B: Deep Research & Knowledge Ingestion**
  - [ ] Scenario: Research a complex technical topic and create documentation.
  - [ ] Pipeline: Guardian (restore context) -> Chaining (plan research) -> Researcher (gather facts) -> Filesystem (write document) -> Guardian (persist knowledge graph).
  - [ ] Document test inputs, expected outputs, and recovery steps.

- [ ] **6.3. Workflow C: UI/UX Design & Frontend Verification**
  - [ ] Scenario: Design a responsive component with design tokens and test in browser.
  - [ ] Pipeline: Guardian (restore specs) -> Chaining (coordinate) -> The Designer (generate tokens/Tailwind) -> Filesystem (create component) -> Browser Agent (visual verification) -> Guardian (record design tokens).
  - [ ] Document test inputs, expected outputs, and recovery steps.

- [ ] **6.4. Workflow D: Android Automation & Debugging**
  - [ ] Scenario: Investigate mobile app bug, inspect logs, and test UI interaction.
  - [ ] Pipeline: Guardian (restore issue) -> Researcher (investigate error) -> Terminal (inspect build/logcat) -> scrcpy (drive device UI) -> Guardian (record resolution).
  - [ ] Document test inputs, expected outputs, and recovery steps.

- [ ] **6.5. Workflow E: Multi-Agent Terminal Orchestration**
  - [ ] Scenario: Run and monitor long-running background tasks across multiple PTY sessions.
  - [ ] Pipeline: Guardian (restore state) -> Chaining (distribute tasks) -> Menager (spawn PTY harnesses & hooks) -> Terminal/Filesystem (perform work) -> Guardian (persist logs & results).
  - [ ] Document test inputs, expected outputs, and recovery steps.

- [ ] **6.6. Workflow F: Autonomous 3D Asset Modeling**
  - [ ] Scenario: Generate a 3D asset from natural language and export render.
  - [ ] Pipeline: Guardian (restore 3D specs) -> Chaining (plan stages) -> LL3M Agent (Blender code execution & refine) -> Filesystem (save `.blend` & `.png`) -> Guardian (record asset relations).
  - [ ] Document test inputs, expected outputs, and recovery steps.

---

## Phase 7: Security & Reliability Audit

- [ ] **7.1. Terminal & Menager Security**
  - [ ] Verify shell command sanitization and prevent command injection.
  - [ ] Validate working directory boundaries (`cwd`).
  - [ ] Ensure clean PTY process lifecycle teardown to prevent orphan processes.

- [ ] **7.2. Filesystem Security**
  - [ ] Verify path traversal prevention (`../` escape attacks).
  - [ ] Ensure safe archive extraction (`zip-slip` prevention).
  - [ ] Respect file permissions and symlink boundaries.

- [ ] **7.3. Browser & Interaction Security**
  - [ ] Prevent credential leaking into console logs or chat state.
  - [ ] Enforce navigation boundaries and download sanitization.

- [ ] **7.4. Device & External Process Security**
  - [ ] Sanitize ADB arguments and device serial parameters in `scrcpy-mcp`.
  - [ ] Sanitize Blender script execution parameters in `ll3m-agent`.

- [ ] **7.5. Ecosystem & Secret Protection**
  - [ ] Ensure API keys and tokens are never logged or stored in world-readable files.
  - [ ] Verify safe temporary file handling and automated cleanup.

---

## Phase 8: Documentation & Client Configuration Refinement

- [ ] **8.1. Documentation Suite Organization**
  - [ ] Maintain uniform, professional formatting (zero decorative emojis).
  - [ ] Update `README.md` to communicate the 10-MCP Architecture, Backbone distinction, and Quick Start.
  - [ ] Update `docs/architecture.md` with updated system and data flow diagrams.
  - [ ] Update `docs/profiles.md` with complete agent persona specifications.
  - [ ] Create `docs/workflows.md` documenting Workflows A through F with concrete prompts.
  - [ ] Maintain `docs/keys-and-secrets.md` (prerequisites, acquisition links, fallback modes).
  - [ ] Maintain `docs/beginner-guide.md` (3-minute zero-code onboarding).
  - [ ] Update `docs/troubleshooting.md` with diagnostic guides and recovery procedures.

- [ ] **8.2. Generated Client Configurations**
  - [ ] Verify generator accuracy across all 8 client platforms:
    - [ ] Cursor IDE (`~/.cursor/mcp.json`)
    - [ ] Claude Desktop / CLI (`~/.claude.json`)
    - [ ] Antigravity CLI / Gemini (`~/.gemini/antigravity-cli/mcp_config.json`)
    - [ ] OpenCode (`config/opencode.generated.json`)
    - [ ] Kilo CLI (`~/.config/kilo/config.json`)
    - [ ] Zed Editor (`~/.config/zed/settings.json`)
    - [ ] Codex / ChatGPT (`~/.codex/config.toml`)
    - [ ] Docker Compose (`config/docker-compose.generated.yml`)
  - [ ] Ensure exact path expansion, environment variable mapping, and valid JSON/TOML syntax.

---

## Phase 9: Ecosystem CI/CD & Final Release Snapshot

- [ ] **9.1. CI/CD Pipeline Hardening (`.github/workflows/ci.yml`)**
  - [ ] Inventory and profile syntax validation.
  - [ ] Cross-check profile references against inventory.
  - [ ] All 70 profile × backend configuration generation matrix checks.
  - [ ] Shell script syntax validation (`bash -n`).
  - [ ] Pre-commit hook validation (formatting, trailing whitespace, YAML/JSON syntax).
  - [ ] Ecosystem integration test runner execution (mocked/offline mode).

- [ ] **9.2. Stable Snapshot Release Preparation**
  - [ ] Perform clean-environment installation tests.
  - [ ] Pin exact verified commit hashes for all 10 MCP servers in `config/snapshots/v1.0.0.json`.
  - [ ] Verify `./setup.sh --reconfigure` and `./update.sh --all --test` on clean system.

---

## Phase 10: Showcase Recordings & Documentation Website

- [ ] **10.1. Workflow Demonstration Recordings**
  - [ ] Capture terminal casts / video demos for:
    - [ ] Workflow A (Full-stack feature development)
    - [ ] Workflow B (Deep research & knowledge graph synthesis)
    - [ ] Workflow C (UI design token generation & browser verification)
    - [ ] Workflow D (Mobile device automation with scrcpy)
    - [ ] Workflow E (PTY terminal harness orchestration with Menager)
    - [ ] Workflow F (Autonomous 3D modeling with LL3M)

- [ ] **10.2. Dedicated Documentation Website**
  - [ ] Build clean, modern website in `docs/site` (or GitHub Pages):
    - [ ] Hero section with ecosystem architecture explanation.
    - [ ] Interactive profile chooser (Headless vs. GUI vs. Custom).
    - [ ] Real workflow video showcases.
    - [ ] One-liner installation guide and client configuration generator.
    - [ ] Complete API keys and offline fallback catalog.

- [ ] **10.3. Public Release**
  - [ ] Create GitHub Release `v1.0.0` with release snapshot metadata.
  - [ ] Publish documentation website and announce public release.
