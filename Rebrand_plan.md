# HeLa MCP Ecosystem — Rebrand Specification

## 1. Executive Summary & Objective

Rebrand the public-facing 10-server MCP stack as:

**HeLa MCP Ecosystem**

The rebrand operates strictly at the **ecosystem distribution and configuration layer**. Individual MCP repositories, source code implementations, package identities, repository names, development workflows, Git histories, and technical ownership remain 100% independent and unchanged.

The name **HeLa** is adopted as a respectful recognition of **Henrietta Lacks** and the profound scientific legacy of HeLa cells in modern biomedical research. Biological terminology is used exclusively as an architectural cellular metaphor for a modular, resilient AI agent harness stack.

---

## 2. Naming Architecture (The 4-Tier Model)

The ecosystem establishes a clean 4-tier naming separation:

```text
Tier 1: Public Identity (Human-facing documentation & landing pages)
    ↓
HeLa Genome

Tier 2: Machine-Readable Identifier (CLI, profiles, and config keys)
    ↓
hela-genome

Tier 3: Technical Source Repository (Implementation origin & directory)
    ↓
Project-Guardian-mcp-server

Tier 4: Exact Implementation Pin (Immutable reproducibility)
    ↓
commit 72bca15...
```

### Architectural Rules
1. **Public Documentation**: Uses canonical `HeLa <Component>` names (e.g. `HeLa Mitosis`, `HeLa Genome`).
2. **Configuration & Scripting**: Uses `hela-*` machine identifiers while maintaining transparent backward compatibility with legacy source keys.
3. **Repository Preservation**: Source repositories retain their existing GitHub repository names, package names, branches, and issue trackers.
4. **No Repository Migrations**: The ecosystem acts as an **alias and distribution layer**, not a fork or invasive rename.

---

## 3. Canonical HeLa Component Catalog (10 MCPs)

```
┌────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│                                       HELA MCP ECOSYSTEM TAXONOMY                                      │
├─────────────────┬───────────────┬──────────────────────────────┬─────────────┬────────────────────────┤
│ Public Name     │ Machine ID    │ Technical Source Repo        │ Scope       │ Architectural Role     │
├─────────────────┼───────────────┼──────────────────────────────┼─────────────┼────────────────────────┤
│ HeLa Mitosis    │ hela-mitosis  │ chaining-mcp-server          │ Core        │ Backbone: Orchestrator │
│ HeLa Genome     │ hela-genome   │ Project-Guardian-mcp-server  │ Core        │ Backbone: State/Memory │
│ HeLa Membrane   │ hela-membrane │ filesystem-mcp-server        │ Core        │ Workspace Filesystem   │
│ HeLa Nucleus    │ hela-nucleus  │ terminal-mcp-server          │ Core        │ Command Execution      │
│ HeLa Ribosome   │ hela-ribosome │ menager-mcp-server           │ Core        │ PTY Harness Lifecycle  │
│ HeLa Enzyme     │ hela-enzyme   │ research-mcp-server          │ Core        │ Search & Fact Checking │
│ HeLa Cytosol    │ hela-cytosol  │ browser-agent                │ Core        │ Web & DOM Interaction  │
│ HeLa Phenotype  │ hela-phenotype│ the-designer                 │ Specialized │ UI/UX Design & Tokens  │
│ HeLa Receptor   │ hela-receptor │ scrcpy-mcp                   │ Specialized │ Android Device Control │
│ HeLa Plastid    │ hela-plastid  │ ll3m-agent                   │ Specialized │ 3D Blender Modeling    │
└─────────────────┴───────────────┴──────────────────────────────┴─────────────┴────────────────────────┘
```

---

## 4. Component Metaphors & Technical Roles

### Backbone Components (The Core Duo)

#### HeLa Mitosis (`hela-mitosis`)
* **Source:** `chaining-mcp-server` (`1999AZZAR/chaining-mcp-server`)
* **Metaphor:** Mitosis as a coordinated, multi-stage cellular division process.
* **Technical Role:** Central orchestration plane. Discovers available peer MCP servers, decomposes complex tasks into execution trees, performs AI-assisted route ranking, runs sequential thinking chains, and coordinates multi-MCP workflows. Operates with 100% offline fallback (<30ms heuristic planning).

#### HeLa Genome (`hela-genome`)
* **Source:** `Project-Guardian-mcp-server` (`1999AZZAR/Project-Guardian`)
* **Metaphor:** The genome carrying persistent genetic code, accumulated cellular identity, and generational state.
* **Technical Role:** Long-term project memory plane. Maintains SQLite-backed knowledge graphs (`memory.db`), tracks entities, relations, observations, active tasks, architectural decisions, and restores session continuity across chats.

---

### Core Workspace & Knowledge Capabilities

#### HeLa Membrane (`hela-membrane`)
* **Source:** `filesystem-mcp-server` (`1999AZZAR/filesystem-mcp-server`)
* **Metaphor:** The selective cellular membrane regulating traffic between the cell and its environment.
* **Technical Role:** Secure workspace filesystem operations: reading, writing, searching, regex patching, directory watching, and safe archive extraction.

#### HeLa Nucleus (`hela-nucleus`)
* **Source:** `terminal-mcp-server` (`1999AZZAR/terminal-mcp-server`)
* **Metaphor:** The cellular nucleus controlling command execution and transcription.
* **Technical Role:** Direct system command execution, local/remote SSH session handling, and RTK token-optimized execution.

#### HeLa Ribosome (`hela-ribosome`)
* **Source:** `menager-mcp-server` (`1999AZZAR/menager-mcp-server`)
* **Metaphor:** Ribosomes actively translating genetic code into functional proteins.
* **Technical Role:** PTY pseudo-terminal harness multiplexing, child process lifecycle supervision, non-blocking regex event hooks, and circular buffer log telemetry.

#### HeLa Enzyme (`hela-enzyme`)
* **Source:** `research-mcp-server` (`1999AZZAR/research-mcp-server`)
* **Metaphor:** Enzymes catalyzing targeted biochemical transformations.
* **Technical Role:** Deep research operations: unified Google Custom Search, Wikipedia API queries, article content extraction, sentiment analysis, and multi-source fact checking.

#### HeLa Cytosol (`hela-cytosol`)
* **Source:** `browser-agent` (`1999AZZAR/browser-agent`)
* **Metaphor:** The cytosol providing the active fluid medium in which cellular organelles operate.
* **Technical Role:** Playwright-based browser automation, interactive navigation, form filling, visual QA screenshot verification, and DOM table extraction.

---

### Specialized Capabilities

#### HeLa Phenotype (`hela-phenotype`)
* **Source:** `the-designer` (`1999AZZAR/the-designer`)
* **Metaphor:** The physical, externally observable traits of an organism.
* **Technical Role:** UI/UX design system analysis, color palette extraction, OKLCH design tokens, Tailwind CSS generation, and 8-state component verification.

#### HeLa Receptor (`hela-receptor`)
* **Source:** `scrcpy-mcp` (`1999AZZAR/scrcpy-mcp`)
* **Metaphor:** Surface receptors receiving signals from the external environment.
* **Technical Role:** Android mobile device automation via ADB and scrcpy: element inspection, touch gestures, screen capture, and app management.

#### HeLa Plastid (`hela-plastid`)
* **Source:** `ll3m-agent` (`1999AZZAR/ll3m-agent`)
* **Metaphor:** Specialized organelle subsystems for synthesis and structural fabrication.
* **Technical Role:** Autonomous 3D Blender modeling: natural language scene generation, mesh/material manipulation, iterative refinement, and rendering.

---

## 5. Backbone Operational Model

The HeLa MCP Ecosystem organizes all workflows through the Backbone:

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

---

## 6. Profile Architecture under HeLa Rebrand

All profiles compose subsets of the 10 HeLa components:

1. **`dev-workspace` (Full Developer Workstation)**:
   * Backbone: `HeLa Mitosis`, `HeLa Genome`
   * Capabilities: `HeLa Membrane`, `HeLa Nucleus`, `HeLa Ribosome`, `HeLa Enzyme`, `HeLa Phenotype`, `HeLa Cytosol` (8 servers)
2. **`headless-server` (Core Headless Stack)**:
   * Backbone: `HeLa Mitosis`, `HeLa Genome`
   * Capabilities: `HeLa Membrane`, `HeLa Nucleus`, `HeLa Ribosome`, `HeLa Enzyme`, `HeLa Phenotype` (7 servers)
3. **`research` (Dedicated Research Node)**:
   * Backbone: `HeLa Mitosis`, `HeLa Genome`
   * Capabilities: `HeLa Enzyme`, `HeLa Membrane`, `HeLa Cytosol` (5 servers)
4. **`web-devops` (Web Engineering & Verification)**:
   * Backbone: `HeLa Mitosis`, `HeLa Genome`
   * Capabilities: `HeLa Membrane`, `HeLa Nucleus`, `HeLa Phenotype`, `HeLa Cytosol` (6 servers)
5. **`android-testing` (Mobile Automation Rig)**:
   * Backbone: `HeLa Mitosis`, `HeLa Genome`
   * Capabilities: `HeLa Nucleus`, `HeLa Receptor`, `HeLa Enzyme` (5 servers)
6. **`3d-modeling` (Blender 3D Production)**:
   * Backbone: `HeLa Mitosis`, `HeLa Genome`
   * Capabilities: `HeLa Plastid`, `HeLa Membrane`, `HeLa Nucleus` (5 servers)
7. **`all` (Complete 10-MCP Stack)**:
   * All 10 HeLa servers.

---

## 7. Migration & Backward Compatibility Strategy

To ensure zero breaking changes for existing users and automated pipelines:

1. **Transparent Alias Resolution in `inventory.json`**:
   Both `hela-mitosis` and `chaining-mcp-server` resolve to the same underlying directory and execution script.
2. **Dual-Key Lookup in Config Generators**:
   `scripts/generate-config.mjs` accepts both HeLa IDs and legacy repository names.
3. **Progressive Documentation Updates**:
   Documentation introduces `HeLa Genome (Project Guardian MCP)` before transitioning to `HeLa Genome` as the primary heading.
4. **Attribution & Transparency**:
   Every component page explicitly cites the original source repository:
   ```text
   HeLa Genome
   Public Identity: HeLa Genome
   Source: 1999AZZAR/Project-Guardian
   Revision: <commit>
   ```

---

## 8. Respectful Recognition & Ethical Framing

The dedicated documentation and landing website will feature a prominent, respectful statement:

> **About the HeLa Name**:
> HeLa cells are among the most significant human cell lines in modern science, enabling pivotal breakthroughs in virology, cancer research, genetics, and medicine. The project adopts the cellular architecture as a metaphor for a cohesive, self-sustaining AI agent ecosystem. The name stands as a respectful recognition of **Henrietta Lacks** and her enduring scientific legacy.

* **Strict Non-Claims**:
  * No claim of medical or scientific equivalence.
  * No claim of official endorsement by the family of Henrietta Lacks or biomedical institutions.
  * Professional, technical developer presentation without medicalized marketing fluff.

---

## 9. Definition of Done for Rebrand

The rebrand is complete when:
- [ ] `config/inventory.json` defines all 10 canonical `hela-*` entries with alias mappings to source repositories.
- [ ] `config/profiles.json` uses canonical HeLa machine identifiers.
- [ ] `scripts/generate-config.mjs`, `setup.sh`, and `update.sh` display canonical HeLa names with source attribution.
- [ ] `README.md` and `docs/` consistently communicate the HeLa MCP Ecosystem identity and 4-tier naming model.
- [ ] All 8 client configuration targets render clean, verified configurations.
- [ ] CI/CD pipeline validates both HeLa aliases and legacy backwards-compatibility keys.
