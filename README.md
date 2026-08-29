# HeLa MCP Ecosystem

A modular, immortal cellular AI tooling ecosystem built on the Model Context Protocol (MCP), engineered by Azzar to equip AI agents with full-spectrum autonomous capabilities across reasoning, persistent memory, workspace management, system execution, research, design, device automation, and 3D modeling.

> **New to MCP or non-technical?** Read the **[Beginner's Step-by-Step Guide](docs/beginner-guide.md)** for a 3-minute, zero-code onboarding walkthrough.

![Blotcat plugging MCP server cables into the central AI Hub](assets/blotcat-hero.jpg)

---

## Respectful Attribution & Metaphor

The **HeLa MCP Ecosystem** is named in respectful recognition of **Henrietta Lacks** (1920–1951) and the immortal scientific legacy of HeLa cells, which transformed global biomedical research. In this software architecture, HeLa serves as a **cellular biology metaphor**:

* **Cellular Modularity**: Just as biological cells contain specialized organelles coordinated by the nucleus and genome, the HeLa MCP Ecosystem deploys specialized tool servers coordinated by a dual backbone.
* **Continuous Replicability & Immortality**: Environments can be snapshot-pinned, reproduced deterministically on any machine, and restored cleanly without state degradation.
* **Component Independence**: Underlying repositories, technical package names, and Git commit histories remain autonomous and unaltered while functioning as a harmonious organism.

---

## Dual-Backbone Architecture

Every profile in the HeLa ecosystem is anchored by two core backbone servers:

```
                  ┌─────────────────────────────────┐
                  │    Agent / LLM Orchestrator     │
                  └───────────────┬─────────────────┘
                                  │ stdio JSON-RPC
         ┌────────────────────────┴────────────────────────┐
         │                                                 │
         ▼                                                 ▼
┌──────────────────┐                              ┌──────────────────┐
│   HeLa Mitosis   │                              │   HeLa Genome    │
│  (Orchestrator)  │                              │ (State & Memory) │
├──────────────────┤                              ├──────────────────┤
│ • Dynamic Routing│                              │ • Knowledge Graph│
│ • Step Reasoning │◄────── Shared Context ──────►│ • Entities/Relns │
│ • Tool Planning  │                              │ • Observations   │
└────────┬─────────┘                              └────────┬─────────┘
         │                                                 │
         └────────────────────────┬────────────────────────┘
                                  │
               Dispatches to Specialized Capability Cells
                                  │
    ┌──────────────┬──────────────┼──────────────┬──────────────┐
    ▼              ▼              ▼              ▼              ▼
[Membrane]     [Nucleus]      [Ribosome]      [Enzyme]      [Cytosol]
Workspace FS   Command Exec   PTY Harness    Research/Wiki   Browser DOM
```

* **HeLa Mitosis (`hela-mitosis`)**: Cellular division and orchestration backbone. Handles dynamic tool routing, prompt decomposition, step-by-step reasoning (`sequentialthinking`), and multi-tool planning.
* **HeLa Genome (`hela-genome`)**: Cellular memory and state backbone. Maintains the persistent SQLite knowledge graph (`memory.db`), entity-relation tracking, session restoration, and project milestones.

---

## 10-MCP Component Taxonomy

| Canonical Identity | Machine ID (`id`) | Technical Source Repo | Scope | Cellular Metaphor & Role |
|---|---|---|---|---|
| **HeLa Mitosis** | `hela-mitosis` | [`chaining-mcp-server`](https://github.com/1999AZZAR/chaining-mcp-server) | Core | **Orchestrator**: Dynamic routing, sequential reasoning, 42 bundled prompt templates |
| **HeLa Genome** | `hela-genome` | [`Project-Guardian-mcp-server`](https://github.com/1999AZZAR/project-guardian-mcp-server) | Core | **State Backbone**: Entity-relation knowledge graph, milestone tracking, memory persistence |
| **HeLa Membrane** | `hela-membrane` | [`filesystem-mcp-server`](https://github.com/1999AZZAR/filesystem-mcp-server) | Core | **Workspace**: Sandboxed filesystem operations, recursive search, archive extraction |
| **HeLa Nucleus** | `hela-nucleus` | [`terminal-mcp-server`](https://github.com/1999AZZAR/terminal-mcp-server) | Core | **Execution**: Command execution, subshell isolation, RTK token-optimized execution |
| **HeLa Ribosome** | `hela-ribosome` | [`menager-mcp-server`](https://github.com/1999AZZAR/menager-mcp-server) | Core | **Process Harness**: Interactive PTY multiplexing, Regex hooks, lifecycle management |
| **HeLa Enzyme** | `hela-enzyme` | [`research-assistant-mcp-server`](https://github.com/1999AZZAR/research-assistant-mcp-server) | Core | **Knowledge**: Unified Google Custom Search + cached Wikipedia synthesis and fact-checking |
| **HeLa Cytosol** | `hela-cytosol` | [`Browser-Agent`](https://github.com/1999AZZAR/Browser-Agent) | Core | **Interaction**: Playwright browser automation, accessibility trees, DOM perception |
| **HeLa Phenotype** | `hela-phenotype` | [`the-designer`](https://github.com/1999AZZAR/the-designer) | Specialized | **Design**: UI/UX design tokens, OKLCH color palettes, Tailwind and component synthesis |
| **HeLa Receptor** | `hela-receptor` | [`scrcpy-mcp`](https://github.com/1999AZZAR/scrcpy-mcp) | Specialized | **Mobile**: Android device automation, ADB bridge, XML view hierarchy inspection |
| **HeLa Plastid** | `hela-plastid` | [`ll3m-agent`](https://github.com/1999AZZAR/ll3m-agent) | Specialized | **3D Modeling**: Autonomous Blender procedural modeling, materials, and render pipeline |

---

## Quick Start

### 1. Prerequisites
* **Node.js**: `>= 18.0.0` (v20+ LTS recommended)
* **Git**: `>= 2.25.0`
* **SQLite3**: System CLI or built-in Node SQLite bindings

### 2. Run Diagnostics (`setup.sh doctor`)
Check your host environment, compiler readiness, external runtimes, and API key fallbacks:

```bash
git clone https://github.com/1999AZZAR/hela-mcp-ecosystem.git
cd hela-mcp-ecosystem
./setup.sh doctor
```

### 3. Interactive Installation & Profile Selection
```bash
./setup.sh
```

### 4. Non-Interactive One-Liners

**Full Developer Desktop (Cursor IDE):**
```bash
./setup.sh --profile dev-workspace --client cursor --non-interactive
```

**Headless Linux Server (Claude Desktop / CLI):**
```bash
./setup.sh --profile headless-server --client claude --non-interactive
```

**Pinned Immutable Release Snapshot:**
```bash
./setup.sh --profile dev-workspace --client cursor --snapshot v1.0.0 --non-interactive
```

---

## Supported AI Clients & Output Formats

The HeLa MCP Ecosystem generates tailored, valid configuration formats across 10 client backends:

| Client Platform | Output Config Location | Format |
|---|---|---|
| **Cursor IDE** | `~/.cursor/mcp.json` | JSON (`mcpServers`) |
| **Claude Desktop / CLI** | `~/.claude.json` | JSON (`mcpServers`) |
| **Gemini CLI** | `~/.gemini/antigravity-cli/mcp_config.json` | JSON (`mcpServers`) |
| **Antigravity CLI** | `~/.gemini/antigravity-cli/mcp_config.json` | JSON (`mcpServers`) |
| **OpenCode** | `~/.config/opencode/opencode.json` | JSON (`mcp`) |
| **Kilo CLI** | `~/.config/kilo/config.json` | JSON (`mcp`) |
| **Zed Editor** | `~/.config/zed/settings.json` | JSON (`context_servers`) |
| **Codex / ChatGPT** | `~/.codex/config.toml` | TOML (`[mcpServers.*]`) |
| **Docker Compose** | `config/docker-compose.generated.yml` | Docker Compose v3 |

---

## Available Agent Profiles

| Profile ID | Target System | Backbone Included | Servers Included | Focus Area |
|---|---|---|---|---|
| `dev-workspace` | Any (GUI recommended) | Mitosis + Genome | Membrane, Nucleus, Ribosome, Enzyme, Phenotype, Cytosol | Full-stack software engineering, testing, web UI |
| `headless-server` | Headless Linux | Mitosis + Genome | Membrane, Nucleus, Ribosome, Enzyme, Phenotype | Cloud server administration, CI/CD, headless dev |
| `research` | Headless or GUI | Mitosis + Genome | Enzyme, Membrane, Cytosol | Deep literature research, document synthesis, web crawling |
| `web-devops` | Headless or GUI | Mitosis + Genome | Membrane, Nucleus, Phenotype, Cytosol | Frontend development, Tailwind styling, DOM verification |
| `android-testing` | Device connected | Mitosis + Genome | Nucleus, Receptor, Enzyme | Mobile QA testing, ADB automation, APK validation |
| `3d-modeling` | GUI (Blender installed) | Mitosis + Genome | Plastid, Membrane, Nucleus | 3D procedural modeling, materials, rendering |
| `all` | Full workstation | Mitosis + Genome | All 10 HeLa MCP servers | Complete full-spectrum AI agent capabilities |

For complete persona guides and pipeline specifications, see **[Profiles Catalog](docs/profiles.md)**.

---

## Operational Workflows (Workflows A–F)

The ecosystem is built for structured multi-server agent workflows:
* **Workflow A: Autonomous Feature Engineering**: Genome (restore) → Mitosis (decompose) → Membrane (code) → Nucleus (test) → Genome (persist).
* **Workflow B: Deep Research & Architecture Synthesis**: Enzyme (search) → Cytosol (scrape) → Mitosis (synthesize) → Genome (record) → Membrane (write).
* **Workflow C: Web Feature with Design & Browser Verification**: Phenotype (tokens) → Membrane (build) → Nucleus (serve) → Cytosol (DOM QA) → Genome (record).
* **Workflow D: Mobile App Test Automation**: Genome (issue) → Nucleus (adb) → Receptor (drive UI) → Genome (record pass).
* **Workflow E: Autonomous 3D Asset Creation & Render Pipeline**: Genome (spec) → Mitosis (plan) → Plastid (Blender) → Membrane (save) → Genome (record).
* **Workflow F: Long-Horizon Complex Refactor with PTY Harness**: Ribosome (PTY) → Nucleus (exec) → Genome (persist).

For step-by-step tool invocation sequences, schemas, and diagrams, see **[Workflows & Integration Guide](docs/workflows.md)**.

---

## Project Health & Diagnostics

```bash
# Run system and server diagnostic health check
npm run doctor
# or
./setup.sh doctor

# Run 70-combination multi-client matrix test suite
npm run test:matrix

# Run master integration test suite (295 tools across all 10 servers)
npm test
```

---

## Documentation Index

* **[Beginner's Step-by-Step Guide](docs/beginner-guide.md)**: 3-minute, zero-code onboarding.
* **[Keys & Secrets Guide](docs/keys-and-secrets.md)**: API key setup, sign-up URLs, and zero-key offline fallbacks.
* **[Profiles Reference](docs/profiles.md)**: Full persona reference and capability mappings.
* **[Workflows & Integration Guide](docs/workflows.md)**: Cross-MCP workflow pipelines (Workflows A–F).
* **[Security & Reliability Audit](docs/security-audit.md)**: Threat model, sandboxing, and isolation standards.
* **[Architecture Guide](docs/architecture.md)**: In-depth cellular architecture and communication topologies.
* **[Troubleshooting Guide](docs/troubleshooting.md)**: Common issues, diagnostic codes, and recovery procedures.

---

## License & Attribution

Distributed under the MIT License. Underlying repositories remain independently copyrighted by their respective authors.

The HeLa project respectfully recognizes **Henrietta Lacks** and the enduring scientific legacy of HeLa cells.
