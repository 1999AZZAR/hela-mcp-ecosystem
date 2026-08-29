# HeLa MCP Ecosystem Refinement & Rebrand — Intensive Execution TODO

This document translates the complete specifications in `Refinement_plan.md` and `Rebrand_plan.md` into an actionable, trackable task checklist for refining and rebranding the `mcp-ecosystem` repository into the **HeLa MCP Ecosystem** — a hardened, reproducible, 10-MCP distribution suite.

---

## Architectural Principles & Scope Boundaries

* **The 10-MCP Capability Ceiling**: Exactly 10 MCP servers (7 core headless, 3 specialized GUI/device). No MCP #11 will be added.
* **The 3-Layer Naming Architecture**:
  * **Public Identity**: `HeLa <Component>` (e.g. `HeLa Mitosis`, `HeLa Genome`)
  * **Machine Identifier (Ecosystem / CLI)**: `hela-*` (e.g. `hela-mitosis`, `hela-genome`)
  * **Technical Source Repository**: Existing repository name (`chaining-mcp-server`, `Project-Guardian-mcp-server`, etc.)
  * **Implementation Revision**: Exact Git commit hash (immutable pin)
* **The Backbone**:
  * **HeLa Mitosis (`hela-mitosis` / `chaining-mcp-server`)**: Intelligent orchestration, dynamic tool discovery, task decomposition, route ranking, and workflows.
  * **HeLa Genome (`hela-genome` / `Project-Guardian-mcp-server`)**: Persistent project state, living SQLite knowledge graph, task tracking, and decision memory.
* **The 8 Specialized Capabilities**:
  * **HeLa Membrane (`hela-membrane` / `filesystem-mcp-server`)**: Workspace filesystem boundary and file operations.
  * **HeLa Nucleus (`hela-nucleus` / `terminal-mcp-server`)**: System command execution and terminal interaction.
  * **HeLa Ribosome (`hela-ribosome` / `menager-mcp-server`)**: PTY process harness multiplexing and lifecycle coordination.
  * **HeLa Enzyme (`hela-enzyme` / `research-assistant-mcp-server`)**: Unified Google & Wikipedia research, analysis, and fact-checking.
  * **HeLa Cytosol (`hela-cytosol` / `browser-agent`)**: Web navigation, DOM interaction, and browser automation.
  * **HeLa Phenotype (`hela-phenotype` / `the-designer`)**: UI/UX design tokens, components, and Tailwind styling.
  * **HeLa Receptor (`hela-receptor` / `scrcpy-mcp`)**: External Android mobile device automation.
  * **HeLa Plastid (`hela-plastid` / `ll3m-agent`)**: Autonomous 3D Blender modeling and rendering.
* **Respectful Attribution**: The HeLa name is a respectful recognition of **Henrietta Lacks** and the scientific legacy of HeLa cells, used purely as an architectural cellular metaphor for a modular AI tooling stack.
* **Repository Independence**: Underlying repositories, package names, source code, and Git histories remain independent and unchanged.

---

## Milestone Progress Dashboard

| Milestone | Scope & Phases | Focus Area | Status | Target Deliverable |
|---|---|---|:---:|---|
| **M1: Baseline & HeLa Aliasing** | Phase 1, 2 & 3 | 10-MCP repository audit, canonical HeLa inventory, agent profiles & pre-validation | [✓ Completed] | Updated `inventory.json`, `profiles.json`, alias translation engine |
| **M2: Determinism & Doctor** | Phase 4 & 5 | Ecosystem snapshot engine (`v1.0.0.json`), deterministic setup & diagnostic tool | [✓ Completed] | `config/snapshots/`, `./setup.sh doctor` |
| **M3: Integration & Workflows** | Phase 6 & 7 | Backbone integration layer, output bounds, `test-integration.sh`, and Workflows A–F | [✓ Completed] | `scripts/test-integration.sh`, `docs/workflows.md` |
| **M4: Security, CI & Clients** | Phase 8, 9 & 10 | Security audit, multi-client configuration testing & GitHub Actions CI matrix | [✓ Completed] | Hardened `.github/workflows/ci.yml`, security report |
| **M5: Showcase & Release** | Phase 11 | Real workflow recordings, documentation website & v1.0.0 public launch | 📋 Planned | Documentation website (`docs/site`), GitHub Release |

---

## Phase 1: Complete Repository & 10-MCP Baseline Audit

- [x] **1.1. Inventory & Remote Repository Audit**
  - [x] Audit all 10 MCP server entries against their GitHub repositories:
    - [x] `chaining-mcp-server` (`1999AZZAR/chaining-mcp-server`)
    - [x] `filesystem-mcp-server` (`1999AZZAR/filesystem-mcp-server`)
    - [x] `Project-Guardian-mcp-server` (`1999AZZAR/Project-Guardian`)
    - [x] `terminal-mcp-server` (`1999AZZAR/terminal-mcp-server`)
    - [x] `menager-mcp-server` (`1999AZZAR/menager-mcp-server`)
    - [x] `research-assistant-mcp-server` (`1999AZZAR/research-mcp-server`)
    - [x] `the-designer` (`1999AZZAR/the-designer`)
    - [x] `browser-agent` (`1999AZZAR/browser-agent`)
    - [x] `scrcpy-mcp` (`1999AZZAR/scrcpy-mcp`)
    - [x] `ll3m-agent` (`1999AZZAR/ll3m-agent`)
  - [x] Verify runtime entrypoints, build commands (`npm run build`, `tsc`), and package scripts.
  - [x] Record exact commit hashes as current baseline revisions.

- [x] **1.2. Baseline Test Run**
  - [x] Run test suite across all 10 servers and document baseline status.

---

## Phase 2: Canonical HeLa Taxonomy & Aliased Inventory System

- [x] **2.1. Update `config/inventory.json` with Canonical HeLa Metadata**
  - [x] Update `config/inventory.json` schema to include:
    - [x] `id`: Machine identifier (`hela-mitosis`, `hela-genome`, etc.)
    - [x] `alias`: Human-facing public name (`HeLa Mitosis`, `HeLa Genome`, etc.)
    - [x] `source`: Source repository key (`chaining-mcp-server`, `Project-Guardian-mcp-server`, etc.)
    - [x] `scope`: `core` (7 servers) vs. `specialized` (3 servers)
    - [x] `role`: `backbone-orchestration`, `backbone-state`, `workspace`, `knowledge`, `interaction`, `design`, `mobile`, `3d`
    - [x] `targetRequirement`: `headless-compatible`, `gui-required`, `device-required`, `runtime-required`
    - [x] `revision`: Pinned Git commit hash
    - [x] `env`: Documented environment variables and optional secret dependencies
  - [x] Ensure backward compatibility: scripts support both `hela-*` IDs and legacy source keys transparently.

- [x] **2.2. Update Core Ecosystem Scripts for HeLa Aliasing**
  - [x] Update `scripts/lib.sh` to resolve server keys by both `hela-*` ID and source repository name.
  - [x] Update `scripts/generate-config.mjs` to render client configs using clean HeLa names while executing underlying source entries.
  - [x] Update `setup.sh` and `update.sh` CLI output to display canonical `HeLa <Component>` names with underlying source attribution.

---

## Phase 3: Profile System Refinement & Agent-Oriented Profiles

- [x] **3.1. Audit & Refine Existing Profiles with HeLa Naming**
  - [x] Review all 7 profile definitions in `config/profiles.json`:
    - [x] `dev-workspace` (Full desktop workstation: Both backbones + Membrane + Nucleus + Ribosome + Enzyme + Phenotype + Cytosol)
    - [x] `headless-server` (Core 7 servers: Both backbones + Membrane + Nucleus + Ribosome + Enzyme + Phenotype)
    - [x] `research` (Dedicated research node: Both backbones + Enzyme + Membrane + Cytosol)
    - [x] `web-devops` (Web development + verification: Both backbones + Membrane + Nucleus + Phenotype + Cytosol)
    - [x] `android-testing` (Mobile automation: Both backbones + Nucleus + Receptor + Enzyme)
    - [x] `3d-modeling` (Blender 3D automation: Both backbones + Plastid + Membrane + Nucleus)
    - [x] `all` (Full 10-MCP inventory stack)
  - [x] Ensure every profile includes both backbone servers (`hela-mitosis` and `hela-genome`).

- [x] **3.2. Agent Persona & Workflow Documentation in `docs/profiles.md`**
  - [x] Document each profile with:
    - [x] Agent Persona & Purpose
    - [x] Backbone Components (`HeLa Mitosis` + `HeLa Genome`)
    - [x] Specialized Capability Set
    - [x] Target Requirements (Headless vs. GUI / Device)
    - [x] Standard End-to-End Workflow Pipeline

- [x] **3.3. Strict Profile Pre-Validation**
  - [x] Implement profile pre-validation in `scripts/lib.sh` / `setup.sh`:
    - [x] Verify profile ID exists.
    - [x] Verify every referenced server exists in `config/inventory.json`.
    - [x] Check target environment compatibility (warn/block GUI/device profiles on headless environments).
    - [x] Verify external binary prerequisites (e.g. `blender`, `adb`, `playwright`).
    - [x] Fail fast with actionable error messages before modifying disk state.

---

## Phase 4: Deterministic Installation, Idempotence & Snapshot Management

- [x] **4.1. Ecosystem Snapshot Specification**
  - [x] Create `config/snapshots/` directory.
  - [x] Create `config/snapshots/v1.0.0.json` (and `config/snapshots/latest-stable.json`) recording:
    - [x] Ecosystem repository commit
    - [x] Pinned commit hashes for all 10 HeLa MCP servers
    - [x] Verified profile compatibility matrix
  - [x] Add snapshot selection support to `setup.sh` (`--snapshot <file|tag>`).

- [x] **4.2. Deterministic Installation Engine**
  - [x] Update `setup_server` in `setup.sh` and `scripts/lib.sh`:
    - [x] Clone or checkout exact pinned commit hash when specified in `inventory.json` / snapshot.
    - [x] Support `--dev` flag to track moving `main`/`master` branches for development.
    - [x] Install dependencies with clean, reproducible installs (`npm install` / `npm ci`).
    - [x] Verify build artifacts (`dist/index.js`, `build/index.js`) exist after build step.

- [x] **4.3. Idempotency & Safe State Handling**
  - [x] If server directory exists at the exact requested revision and is already built, skip re-cloning and re-building.
  - [x] If revision differs, fetch and checkout the requested revision deterministically.
  - [x] Ensure repeated runs of `./setup.sh --profile <id>` produce identical environments without duplicate config entries.
  - [x] Retain previous known commit hash on updates for instant rollback capability.

---

## Phase 5: Diagnostic Health Command (`setup.sh doctor`)

- [x] **5.1. Create Comprehensive Diagnostics Engine (`scripts/doctor.sh` / `./setup.sh doctor`)**
  - [x] **Host System Checks**:
    - [x] Operating System, Architecture, Kernel
    - [x] Node.js version (>= 18.0.0, recommend 20+ LTS)
    - [x] npm / pnpm version
    - [x] Git version (>= 2.25.0)
    - [x] SQLite3 CLI availability & writable test
    - [x] Docker & Docker Compose availability (optional)
  - [x] **Server Health & Entrypoint Checks (for selected profile or inventory)**:
    - [x] Directory existence & Git commit verification
    - [x] `package.json` and build artifacts (`dist/index.js` or `build/index.js`)
    - [x] Permissions and executable bit check
    - [x] Smoke startup test (launch node subprocess, verify clean stdio transport, exit in <500ms)
  - [x] **External Runtime & Hardware Dependency Checks**:
    - [x] Playwright / Chromium browser binary check (for `hela-cytosol`)
    - [x] Android Debug Bridge (`adb`) and device detection (for `hela-receptor`)
    - [x] Blender CLI executable check (`blender --version`) (for `hela-plastid`)
    - [x] PTY / POSIX pseudo-terminal support (for `hela-ribosome`)
  - [x] **Secret & API Key Checks**:
    - [x] OpenRouter API Key (sk-or-v1-...) -> Valid / Free offline fallback active
    - [x] GitHub Token (ghp_...) -> Valid / Bundled offline catalog active
    - [x] Google API Key & CSE ID -> Valid / Wikipedia fallback active
    - [x] Ensure keys and tokens are NEVER printed or exposed in logs.
  - [x] **Actionable Diagnostics Output**:
    - [x] Display clean summary table (`[READY]`, `[OPTIONAL MISSING]`, `[ERROR - REQUIRED MISSING]`).
    - [x] Return exit code 0 when all required components pass, non-zero when required dependencies fail.

---

## Phase 6: Backbone Auditing & Cross-MCP Integration Layer

- [x] **6.1. HeLa Mitosis Backbone Audit**
  - [x] Verify dynamic discovery of all peer MCP servers in the active client configuration.
  - [x] Verify tool analysis (`analyze_tools`) and routing suggestions (`generate_route_suggestions`, `llm_suggest_route`).
  - [x] Verify task decomposition (`llm_decompose_task`) and workflow orchestrator (`workflow_orchestrator`).
  - [x] Verify sequential thinking (`sequentialthinking`) and multi-branch reasoning trees.
  - [x] Verify telemetry and health monitoring endpoints (`chaining://health`, `chaining://cache/stats`).
  - [x] Test graceful zero-key degradation (deterministic local heuristic fallback in <30ms).

- [x] **6.2. HeLa Genome Backbone Audit**
  - [x] Verify session context restoration at startup (`get_session_context`).
  - [x] Verify persistent entity, relation, and observation tracking in SQLite knowledge graph (`memory.db`).
  - [x] Verify task tracking and status updates across chat sessions.
  - [x] Verify central memory synchronization (`sync_central_memory`).
  - [x] Maintain strict boundary: Genome remembers and tracks state; Mitosis plans and executes.

- [x] **6.3. Audit 8 Capability MCPs Against the Backbone**
  - [x] Verify tool naming and schema clarity across all 8 capabilities (`hela-membrane`, `hela-nucleus`, `hela-ribosome`, `hela-enzyme`, `hela-phenotype`, `hela-cytosol`, `hela-receptor`, `hela-plastid`).
  - [x] Control large output payloads: enforce pagination, line limits, and truncation warnings.
  - [x] Standardize error responses: operation, root cause, recoverability status, and suggested action.

- [x] **6.4. Ecosystem Integration Test Script (`scripts/test-integration.sh`)**
  - [x] Create automated integration test script:
    - [x] Launches selected MCP servers.
    - [x] Validates tool registration via stdio JSON-RPC.
    - [x] Executes simulated multi-MCP chain (Mitosis plan -> Capability execution -> Genome persistence).
    - [x] Asserts 100% clean shutdown without zombie processes.

---

## Phase 7: Real Cross-MCP Workflow Validation Scenarios

- [x] **7.1. Workflow A: Autonomous Software Development**
  - [x] Pipeline: HeLa Genome (restore context) -> HeLa Mitosis (decompose plan) -> HeLa Membrane (inspect repo) -> HeLa Nucleus (implement/test) -> HeLa Cytosol (verify web UI) -> HeLa Genome (record decisions).
  - [x] Document test inputs, expected outputs, and recovery steps.

- [x] **7.2. Workflow B: Deep Research & Knowledge Ingestion**
  - [x] Pipeline: HeLa Genome (restore context) -> HeLa Mitosis (plan research) -> HeLa Enzyme (gather facts) -> HeLa Membrane (write document) -> HeLa Genome (persist knowledge graph).
  - [x] Document test inputs, expected outputs, and recovery steps.

- [x] **7.3. Workflow C: UI/UX Design & Frontend Verification**
  - [x] Pipeline: HeLa Genome (restore specs) -> HeLa Mitosis (coordinate) -> HeLa Phenotype (generate tokens/Tailwind) -> HeLa Membrane (create component) -> HeLa Cytosol (visual verification) -> HeLa Genome (record design tokens).
  - [x] Document test inputs, expected outputs, and recovery steps.

- [x] **7.4. Workflow D: Android Automation & Debugging**
  - [x] Pipeline: HeLa Genome (restore issue) -> HeLa Enzyme (investigate error) -> HeLa Nucleus (inspect build/logcat) -> HeLa Receptor (drive device UI) -> HeLa Genome (record resolution).
  - [x] Document test inputs, expected outputs, and recovery steps.

- [x] **7.5. Workflow E: Multi-Agent Terminal Orchestration**
  - [x] Pipeline: HeLa Genome (restore state) -> HeLa Mitosis (distribute tasks) -> HeLa Ribosome (spawn PTY harnesses & hooks) -> HeLa Nucleus/Membrane (perform work) -> HeLa Genome (persist logs & results).
  - [x] Document test inputs, expected outputs, and recovery steps.

- [x] **7.6. Workflow F: Autonomous 3D Asset Modeling**
  - [x] Pipeline: HeLa Genome (restore 3D specs) -> HeLa Mitosis (plan stages) -> HeLa Plastid (Blender code execution & refine) -> HeLa Membrane (save `.blend` & `.png`) -> HeLa Genome (record asset relations).
  - [x] Document test inputs, expected outputs, and recovery steps.

---

## Phase 8: Security & Reliability Audit

- [x] **8.1. Terminal & PTY Security (HeLa Nucleus & HeLa Ribosome)**
  - [x] Verify shell command sanitization and prevent command injection.
  - [x] Validate working directory boundaries (`cwd`).
  - [x] Ensure clean PTY process lifecycle teardown to prevent orphan processes.

- [x] **8.2. Filesystem Security (HeLa Membrane)**
  - [x] Verify path traversal prevention (`../` escape attacks).
  - [x] Ensure safe archive extraction (`zip-slip` prevention).
  - [x] Respect file permissions and symlink boundaries.

- [x] **8.3. Browser & Interaction Security (HeLa Cytosol)**
  - [x] Prevent credential leaking into console logs or chat state.
  - [x] Enforce navigation boundaries and download sanitization.

- [x] **8.4. Device & 3D Security (HeLa Receptor & HeLa Plastid)**
  - [x] Sanitize ADB arguments and device serial parameters.
  - [x] Sanitize Blender script execution parameters.

- [x] **8.5. Ecosystem & Secret Protection**
  - [x] Ensure API keys and tokens are never logged or stored in world-readable files.
  - [x] Verify safe temporary file handling and automated cleanup.

---

## Phase 9: Documentation & Multi-Client Configuration Refinement

- [x] **9.1. Documentation Suite Organization**
  - [x] Maintain uniform, professional formatting (zero decorative emojis).
  - [x] Update `README.md` to introduce the **HeLa MCP Ecosystem**, the 3-layer naming architecture, and the Backbone model.
  - [x] Add Henrietta Lacks respectful recognition and cellular architecture metaphor explanation.
  - [x] Include canonical alias mapping table (`HeLa Genome` <-> `Project-Guardian-mcp-server`).
  - [x] Update `docs/architecture.md` with cellular architecture diagrams.
  - [x] Update `docs/profiles.md` with complete agent persona specifications.
  - [x] Create `docs/workflows.md` documenting Workflows A through F with concrete prompts.
  - [x] Maintain `docs/keys-and-secrets.md` (prerequisites, acquisition links, fallback modes).
  - [x] Maintain `docs/beginner-guide.md` (3-minute zero-code onboarding).
  - [x] Update `docs/troubleshooting.md` with diagnostic guides and recovery procedures.

- [x] **9.2. Generated Client Configurations**
  - [x] Verify generator accuracy across all 8 client platforms:
    - [x] Cursor IDE (`~/.cursor/mcp.json`)
    - [x] Claude Desktop / CLI (`~/.claude.json`)
    - [x] Antigravity CLI / Gemini (`~/.gemini/antigravity-cli/mcp_config.json`)
    - [x] OpenCode (`config/opencode.generated.json`)
    - [x] Kilo CLI (`~/.config/kilo/config.json`)
    - [x] Zed Editor (`~/.config/zed/settings.json`)
    - [x] Codex / ChatGPT (`~/.codex/config.toml`)
    - [x] Docker Compose (`config/docker-compose.generated.yml`)
  - [x] Ensure exact path expansion, environment variable mapping, and valid JSON/TOML syntax.

---

## Phase 10: CI/CD Hardening & Stable Snapshot Release

- [x] **10.1. CI/CD Pipeline Hardening (`.github/workflows/ci.yml`)**
  - [x] Inventory and profile syntax validation.
  - [x] Cross-check profile references against canonical inventory.
  - [x] All 70 profile × backend configuration generation matrix checks.
  - [x] Shell script syntax validation (`bash -n`).
  - [x] Pre-commit hook validation (formatting, trailing whitespace, YAML/JSON syntax).
  - [x] Ecosystem integration test runner execution (mocked/offline mode).

- [x] **10.2. Stable Snapshot Release Preparation**
  - [x] Perform clean-environment installation tests.
  - [x] Pin exact verified commit hashes for all 10 MCP servers in `config/snapshots/v1.0.0.json`.
  - [x] Verify `./setup.sh --reconfigure` and `./update.sh --all --test` on clean system.

---

## Phase 11: HeLa Showcase Recordings & Documentation Website

- [ ] **11.1. Workflow Demonstration Recordings**
  - [ ] Capture terminal casts / video demos for:
    - [ ] Workflow A (Full-stack feature development with HeLa Mitosis, Membrane, Nucleus, Cytosol, Genome)
    - [ ] Workflow B (Deep research & knowledge graph synthesis with HeLa Enzyme, Membrane, Genome)
    - [ ] Workflow C (UI design token generation & browser verification with HeLa Phenotype, Cytosol)
    - [ ] Workflow D (Mobile device automation with HeLa Receptor)
    - [ ] Workflow E (PTY terminal harness orchestration with HeLa Ribosome)
    - [ ] Workflow F (Autonomous 3D modeling with HeLa Plastid)

- [ ] **11.2. Dedicated HeLa Documentation Website**
  - [ ] Build clean, modern website in `docs/site` (or GitHub Pages):
    - [ ] Hero section with HeLa cellular architecture explanation and Henrietta Lacks recognition.
    - [ ] Interactive profile selector (Headless Server, Dev Workspace, Custom).
    - [ ] Real workflow video showcases.
    - [ ] One-liner installation guide and client configuration generator.
    - [ ] Complete API keys and offline fallback catalog.

- [ ] **11.3. Public Release**
  - [ ] Create GitHub Release `v1.0.0` with release snapshot metadata.
  - [ ] Publish documentation website and announce public release.
