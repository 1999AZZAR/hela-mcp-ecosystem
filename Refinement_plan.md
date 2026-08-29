# HeLa MCP Ecosystem — Master Refinement Plan

## 1. Executive Objective

Refine the `mcp-ecosystem` repository into a hardened, reproducible, enterprise-ready distribution suite for the **HeLa MCP Ecosystem** without adding new MCP servers.

The ecosystem contains exactly **10 MCP servers** organized into two functional layers:

1. **Backbone Plane (The Core Duo)**:
   * **HeLa Mitosis (`hela-mitosis` / `chaining-mcp-server`)**: Central orchestration, tool discovery, route ranking, task decomposition, and sequential thinking.
   * **HeLa Genome (`hela-genome` / `Project-Guardian-mcp-server`)**: Persistent project memory, living SQLite knowledge graph, decision tracking, and context restoration.
2. **Specialized Capability Plane (8 Servers)**:
   * **HeLa Membrane (`hela-membrane` / `filesystem-mcp-server`)**: Workspace filesystem operations.
   * **HeLa Nucleus (`hela-nucleus` / `terminal-mcp-server`)**: System command execution.
   * **HeLa Ribosome (`hela-ribosome` / `menager-mcp-server`)**: PTY process harness lifecycle.
   * **HeLa Enzyme (`hela-enzyme` / `research-mcp-server`)**: Unified Google Search & Wikipedia research.
   * **HeLa Cytosol (`hela-cytosol` / `browser-agent`)**: Web browser automation & visual QA.
   * **HeLa Phenotype (`hela-phenotype` / `the-designer`)**: UI/UX design tokens, components & Tailwind.
   * **HeLa Receptor (`hela-receptor` / `scrcpy-mcp`)**: External Android mobile device control.
   * **HeLa Plastid (`hela-plastid` / `ll3m-agent`)**: Autonomous 3D Blender modeling.

```text
                                 AI HOST
                                    │
                                    ▼
                               HeLa Mitosis
                             (Orchestration)
                                    │
                                    ▼
                               HeLa Genome
                            (State & Memory)
                                    │
               ┌────────────────────┼────────────────────┐
               ▼                    ▼                    ▼
          [Workspace]          [Knowledge]         [Interaction]
               │                    │                    │
         HeLa Membrane         HeLa Enzyme          HeLa Cytosol
         HeLa Nucleus                               HeLa Phenotype
         HeLa Ribosome                              HeLa Receptor
                                                    HeLa Plastid
```

* **The Distribution Boundary**: The `mcp-ecosystem` repository is the integration, packaging, diagnostic, and distribution layer. Individual MCP repositories remain the implementation layer.
* **Scope Constraint**: Exactly 10 MCP servers. No MCP #11 will be added during this refinement.

---

## 2. Complete Repository & Remote Audit Baseline

Before applying changes, perform a comprehensive audit across the ecosystem repository and all 10 remote GitHub repositories.

Audit targets:
* Remote repository URLs and branches (`main` vs. `master`).
* Current pinned commit hashes (immutable baseline revisions).
* Build and package scripts (`npm run build`, `tsc`, entrypoint file existence).
* Target requirements (headless-compatible vs. GUI/device requirements).
* Environment variables, paths (`MEMORY_FILE_PATH`), and optional secrets (`OPENROUTER_API_KEY`, `GITHUB_TOKEN`, `GOOGLE_API_KEY`, `GOOGLE_CSE_ID`).
* Baseline test suite execution across all 10 servers.

---

## 3. Canonical HeLa Taxonomy & Aliased Inventory System

Make `config/inventory.json` the authoritative single source of truth for the entire ecosystem.

### The 4-Tier Naming Architecture
* **Public Identity**: `HeLa <Component>` (e.g. `HeLa Genome`)
* **Machine Identifier**: `hela-*` (e.g. `hela-genome`)
* **Technical Source**: Source repository name (`Project-Guardian-mcp-server`)
* **Implementation Pin**: Exact Git commit hash (`72bca15...`)

### Architectural Rules
* `inventory.json` acts as an alias layer mapping `hela-*` identifiers to underlying source directories and entrypoints.
* Scripts (`generate-config.mjs`, `setup.sh`, `update.sh`, `lib.sh`) support both `hela-*` identifiers and legacy source keys transparently.
* Underlying repositories retain their original names, package identities, and Git histories.

---

## 4. Agent-Oriented Profile System

Refine existing profiles in `config/profiles.json` to define explicit agent personas, execution backbones, and target requirements:

1. **`dev-workspace` (Full Developer Workstation)**:
   * Persona: Autonomous software engineer and full-stack developer.
   * Backbone: `HeLa Mitosis`, `HeLa Genome`
   * Capabilities: `HeLa Membrane`, `HeLa Nucleus`, `HeLa Ribosome`, `HeLa Enzyme`, `HeLa Phenotype`, `HeLa Cytosol` (8 servers)
2. **`headless-server` (Core Headless Stack)**:
   * Persona: Cloud agent, CI/CD runner, or headless server assistant.
   * Backbone: `HeLa Mitosis`, `HeLa Genome`
   * Capabilities: `HeLa Membrane`, `HeLa Nucleus`, `HeLa Ribosome`, `HeLa Enzyme`, `HeLa Phenotype` (7 servers)
3. **`research` (Dedicated Research Node)**:
   * Persona: Deep investigator and technical documentation synthesizer.
   * Backbone: `HeLa Mitosis`, `HeLa Genome`
   * Capabilities: `HeLa Enzyme`, `HeLa Membrane`, `HeLa Cytosol` (5 servers)
4. **`web-devops` (Web Engineering & Verification)**:
   * Persona: Frontend engineer and web deployment automation agent.
   * Backbone: `HeLa Mitosis`, `HeLa Genome`
   * Capabilities: `HeLa Membrane`, `HeLa Nucleus`, `HeLa Phenotype`, `HeLa Cytosol` (6 servers)
5. **`android-testing` (Mobile Automation Rig)**:
   * Persona: Mobile QA tester and Android device automation engineer.
   * Backbone: `HeLa Mitosis`, `HeLa Genome`
   * Capabilities: `HeLa Nucleus`, `HeLa Receptor`, `HeLa Enzyme` (5 servers)
6. **`3d-modeling` (Blender 3D Production)**:
   * Persona: Autonomous 3D generative artist and scene architect.
   * Backbone: `HeLa Mitosis`, `HeLa Genome`
   * Capabilities: `HeLa Plastid`, `HeLa Membrane`, `HeLa Nucleus` (5 servers)
7. **`all` (Complete Inventory)**:
   * All 10 HeLa servers.

---

## 5. Deterministic Installation, Idempotence & Snapshots

### Commit-Based Pinning (vs. SemVer)
* Dependencies are pinned by exact immutable Git commit hashes rather than floating branches or SemVer ranges.
* Snapshot metadata in `config/snapshots/v1.0.0.json` records the ecosystem commit and all 10 MCP commit pins.

### Idempotency & Safety
* If a server directory exists at the requested commit revision and its build artifacts are valid, `setup.sh` reuses it without re-cloning or re-building.
* If revisions differ, `setup.sh` fetches and checks out the requested commit deterministically.
* Retain the previous known commit hash on updates for instant rollback capability.

---

## 6. Ecosystem Diagnostic Health Command (`setup.sh doctor`)

Implement `./setup.sh doctor` (and `scripts/doctor.sh`) to validate the host environment and server readiness:

1. **Host Environment Checks**:
   * OS, Architecture, Node.js (>= 18.0.0, 20+ LTS recommended), npm, Git, SQLite3 CLI.
2. **Server Health & Build Verification**:
   * Directory existence, commit hash verification, `package.json`, build artifacts (`dist/index.js` or `build/index.js`), and executable permissions.
3. **External Runtime & Binary Detection**:
   * Chromium / Playwright binaries for `hela-cytosol`.
   * ADB executable and device connections for `hela-receptor`.
   * Blender executable (`blender --version`) for `hela-plastid`.
   * POSIX pseudo-terminal (PTY) support for `hela-ribosome`.
4. **Secret Status & Offline Fallback Indicators**:
   * OpenRouter, GitHub, and Google keys checked without logging or exposing secrets.
5. **Output**:
   * Clean table with `[READY]`, `[OPTIONAL MISSING]`, and `[ERROR - REQUIRED MISSING]`. Exit code 0 on full readiness.

---

## 7. Backbone Auditing & Cross-MCP Integration Layer

### HeLa Mitosis (Orchestration Backbone)
* Dynamic discovery of all active peer MCP servers.
* Task decomposition (`llm_decompose_task`), route ranking (`generate_route_suggestions`, `llm_suggest_route`), and sequential thinking (`sequentialthinking`).
* 100% zero-key offline fallback (<30ms heuristic route ranking).

### HeLa Genome (State & Memory Backbone)
* Session context restoration (`get_session_context`) at startup.
* Living SQLite knowledge graph (`memory.db`), entity/relation/observation tracking, task lifecycle management.
* Central memory synchronization (`sync_central_memory`).

### Payload & Truncation Bounds
* Enforce pagination and output limits across Terminal (`hela-nucleus`), Filesystem (`hela-membrane`), and Researcher (`hela-enzyme`) to protect LLM context windows.
* Explicit truncation markers: `[TRUNCATED: showing 100/1500 lines]`.

### Automated Integration Test Runner (`scripts/test-integration.sh`)
* Validates multi-server coordination (Mitosis plans -> Capability executes -> Genome persists) via stdio JSON-RPC.

---

## 8. Real Cross-MCP Workflow Validation Scenarios

Validate the ecosystem with 6 real-world end-to-end multi-agent workflows:

* **Workflow A: Autonomous Software Development**:
  * Genome (restore context) -> Mitosis (decompose plan) -> Membrane (inspect repo) -> Nucleus (implement & test) -> Cytosol (verify web UI) -> Genome (persist decisions).
* **Workflow B: Deep Research & Knowledge Ingestion**:
  * Genome (restore context) -> Mitosis (plan research) -> Enzyme (gather facts) -> Membrane (write summary) -> Genome (persist knowledge graph).
* **Workflow C: UI/UX Design & Frontend Verification**:
  * Genome (restore specs) -> Mitosis (coordinate) -> Phenotype (generate tokens/Tailwind) -> Membrane (create component) -> Cytosol (visual QA) -> Genome (record design tokens).
* **Workflow D: Android Automation & Debugging**:
  * Genome (restore issue) -> Enzyme (investigate logs) -> Nucleus (inspect APK/build) -> Receptor (drive mobile UI) -> Genome (record bugfix).
* **Workflow E: Multi-Agent Terminal Orchestration**:
  * Genome (restore state) -> Mitosis (distribute tasks) -> Ribosome (spawn PTY harnesses & hooks) -> Nucleus/Membrane (perform work) -> Genome (persist session history).
* **Workflow F: Autonomous 3D Asset Modeling**:
  * Genome (restore 3D specs) -> Mitosis (plan stages) -> Plastid (Blender code generation & refine) -> Membrane (save asset) -> Genome (record asset metadata).

---

## 9. Security & Reliability Protocols

1. **Terminal & PTY Security**: Shell command sanitization, argument escaping, strict working directory boundaries, and clean child process lifecycle teardown.
2. **Filesystem Security**: Strict path traversal prevention (`../` escape attacks), symlink confinement, and safe archive extraction (`zip-slip` prevention).
3. **Browser & Device Security**: Credential masking, sandbox navigation boundaries, and sanitized ADB/Blender subprocess commands.
4. **Secret Protection**: Zero API key logging; credentials never stored in world-readable files or committed to Git.

---

## 10. Documentation Suite & Multi-Client Support

1. **Clean, Professional Documentation**:
   * Zero decorative emojis across all documentation files.
   * `README.md`: Unified HeLa MCP Ecosystem presentation, cellular architecture diagrams, and quickstart guides.
   * `docs/architecture.md`: Updated backbone-to-capabilities architectural diagrams.
   * `docs/profiles.md`: Complete agent persona & workflow reference.
   * `docs/workflows.md`: Detailed specifications for Workflows A through F.
   * `docs/keys-and-secrets.md`: Prerequisites, acquisition links, and offline fallback modes.
   * `docs/beginner-guide.md`: 3-minute zero-code onboarding.
   * `docs/troubleshooting.md`: Diagnostics, common failure modes, and recovery steps.
2. **Multi-Client Verification**:
   * Verified configuration generators for Cursor, Claude Desktop/CLI, Antigravity/Gemini, OpenCode, Kilo, Zed, Codex/ChatGPT, and Docker Compose.

---

## 11. Ecosystem CI/CD & Stable Release Snapshot

1. **CI/CD Hardening (`.github/workflows/ci.yml`)**:
   * Automated inventory and profile syntax checks.
   * Cross-check profile references against canonical inventory.
   * 70-combination profile × backend configuration generation matrix validation.
   * Shell script syntax checks (`bash -n`) and pre-commit hook validation.
   * Integration test suite execution in mock/offline mode.
2. **Stable Snapshot Release**:
   * Tag and publish `v1.0.0` release snapshot (`config/snapshots/v1.0.0.json`).
   * Verify clean-machine installation on Ubuntu, macOS, and WSL.

---

## 12. Showcase Demos & Dedicated Documentation Website

1. **Workflow Demonstrations**:
   * Record terminal casts and video demonstrations for Workflows A through F.
2. **Dedicated Documentation Website (`docs/site`)**:
   * Hero section explaining the HeLa cellular architecture metaphor and Henrietta Lacks respectful recognition.
   * Interactive profile selector (Headless Server, Dev Workspace, Custom).
   * Embedded real workflow video showcases and one-liner setup commands.
3. **Public Release & Community Onboarding**:
   * Launch documentation website and publish GitHub Release `v1.0.0`.
