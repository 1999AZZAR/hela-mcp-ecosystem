# HeLa MCP Ecosystem — Rebrand Specification

## 1. Rebrand Objective

Rebrand the public-facing MCP stack as:

**HeLa MCP Ecosystem**

The rebrand applies **only to the ecosystem/stack layer**.

The individual MCP repositories, source code, package identities, repository names, development workflows, Git history, and technical ownership remain unchanged.

The purpose of the rebrand is to give the 10-MCP stack a single coherent identity while preserving the independence and maintainability of every underlying MCP.

The name **HeLa** is chosen as a respectful recognition of **Henrietta Lacks** and the extraordinary scientific impact of HeLa cells.

The biological terminology is used as an architectural metaphor, not as a claim of scientific equivalence.

---

# 2. Naming Architecture

Use three distinct naming layers.

```text
Public Identity
    ↓
HeLa Genome

Ecosystem Identifier
    ↓
hela-genome

Technical Source
    ↓
Project-Guardian-mcp-server
```

The same model applies to every MCP.

### Rules

* Human-facing documentation uses the `HeLa <Component>` name.
* Configuration and machine-readable identifiers use the `hela-*` identifier.
* Source repositories retain their existing names.
* GitHub repository URLs remain unchanged.
* Package names remain unchanged unless an individual MCP independently changes them.
* Existing source-level imports and technical references remain unchanged.
* Commit-based revision pinning remains unchanged.
* Do not rename repositories solely because of the HeLa rebrand.

The ecosystem acts as an **alias layer**, not a fork or replacement identity.

---

# 3. Canonical HeLa Inventory

The public stack contains 10 MCPs.

```json
{
  "project_name": "HeLa MCP Ecosystem",
  "total_servers": 10,
  "core_headless_count": 7,
  "specialized_gui_count": 3,
  "inventory": {
    "hela-mitosis": {
      "alias": "HeLa Mitosis",
      "source": "chaining-mcp-server",
      "scope": "core"
    },
    "hela-membrane": {
      "alias": "HeLa Membrane",
      "source": "filesystem-mcp-server",
      "scope": "core"
    },
    "hela-genome": {
      "alias": "HeLa Genome",
      "source": "Project-Guardian-mcp-server",
      "scope": "core"
    },
    "hela-nucleus": {
      "alias": "HeLa Nucleus",
      "source": "terminal-mcp-server",
      "scope": "core"
    },
    "hela-ribosome": {
      "alias": "HeLa Ribosome",
      "source": "menager-mcp-server",
      "scope": "core"
    },
    "hela-enzyme": {
      "alias": "HeLa Enzyme",
      "source": "research-assistant-mcp-server",
      "scope": "core"
    },
    "hela-cytosol": {
      "alias": "HeLa Cytosol",
      "source": "browser-agent",
      "scope": "core"
    },
    "hela-phenotype": {
      "alias": "HeLa Phenotype",
      "source": "the-designer",
      "scope": "specialized"
    },
    "hela-receptor": {
      "alias": "HeLa Receptor",
      "source": "scrcpy-mcp",
      "scope": "specialized"
    },
    "hela-plastid": {
      "alias": "HeLa Plastid",
      "source": "ll3m-agent",
      "scope": "specialized"
    }
  }
}
```

This inventory becomes the authoritative mapping between the HeLa public identity and the existing MCP repositories.

---

# 4. Component Naming

## HeLa Mitosis

**Source:** Chaining MCP Server
**Identifier:** `hela-mitosis`
**Scope:** Core

Role:

> Orchestrates MCP capabilities and coordinates multi-step workflows.

The name references mitosis as a coordinated cellular process.

Do not describe it as literally performing biological mitosis.

---

## HeLa Membrane

**Source:** Filesystem MCP Server
**Identifier:** `hela-membrane`
**Scope:** Core

Role:

> Provides controlled interaction with the project's filesystem and workspace.

The membrane metaphor represents the boundary between the agent and its working environment.

---

## HeLa Genome

**Source:** Project Guardian MCP Server
**Identifier:** `hela-genome`
**Scope:** Core

Role:

> Preserves persistent project knowledge, state, decisions, and continuity.

This is one of the two backbone components.

The genome metaphor represents the information that carries the project's identity and accumulated state.

---

## HeLa Nucleus

**Source:** Terminal MCP Server
**Identifier:** `hela-nucleus`
**Scope:** Core

Role:

> Provides command execution and direct system interaction.

The nucleus represents a central control and execution environment.

---

## HeLa Ribosome

**Source:** Menager MCP Server
**Identifier:** `hela-ribosome`
**Scope:** Core

Role:

> Manages and coordinates processes involved in executing work.

The biological analogy should remain conceptual and should not imply that the MCP reproduces ribosomal biology.

---

## HeLa Enzyme

**Source:** Research Assistant MCP Server
**Identifier:** `hela-enzyme`
**Scope:** Core

Role:

> Performs specialized research and information-processing operations.

The enzyme metaphor represents specialized transformations that enable larger workflows.

---

## HeLa Cytosol

**Source:** Browser Agent
**Identifier:** `hela-cytosol`
**Scope:** Core

Role:

> Provides interaction with the web and browser-based environments.

The cytosol represents the surrounding operational environment in which many cellular processes occur.

---

## HeLa Phenotype

**Source:** The Designer
**Identifier:** `hela-phenotype`
**Scope:** Specialized

Role:

> Produces and manipulates visible design and interface outcomes.

The phenotype represents the externally observable result of underlying processes.

---

## HeLa Receptor

**Source:** scrcpy MCP
**Identifier:** `hela-receptor`
**Scope:** Specialized

Role:

> Provides interaction with external Android devices.

The receptor metaphor represents an interface through which the system interacts with an external environment.

---

## HeLa Plastid

**Source:** LL3M Agent
**Identifier:** `hela-plastid`
**Scope:** Specialized

Role:

> Provides specialized 3D/Blender-oriented capabilities.

The plastid metaphor represents a specialized production subsystem.

---

# 5. Backbone Identity

The HeLa ecosystem should explicitly identify two backbone MCPs:

```text
HeLa Mitosis
       +
HeLa Genome
```

Their roles are:

```text
HeLa Mitosis
    orchestration

HeLa Genome
    persistence
```

Together:

```text
              HeLa MCP Ecosystem
                       │
              ┌────────┴────────┐
              │                 │
        HeLa Mitosis      HeLa Genome
        orchestrate          remember
              │                 │
              └────────┬────────┘
                       │
                8 capabilities
```

This distinction should appear consistently across the README, website, diagrams, profile documentation, and promotional material.

---

# 6. Public Naming Rules

Always prefer:

```text
HeLa Mitosis
HeLa Membrane
HeLa Genome
HeLa Nucleus
HeLa Ribosome
HeLa Enzyme
HeLa Cytosol
HeLa Phenotype
HeLa Receptor
HeLa Plastid
```

For CLI/configuration:

```text
hela-mitosis
hela-membrane
hela-genome
hela-nucleus
hela-ribosome
hela-enzyme
hela-cytosol
hela-phenotype
hela-receptor
hela-plastid
```

When technical clarity is required, expose the original source:

```text
HeLa Genome
Project Guardian MCP
```

or:

```text
HeLa Genome
source: Project-Guardian-mcp-server
```

Do not force users to learn the biological alias without giving them a way to identify the underlying implementation.

---

# 7. Repository Preservation

The following must remain unchanged unless independently required by the underlying project:

```text
repository names
repository URLs
Git history
branches
source package names
MCP implementation names
issue trackers
pull requests
release history
development commands
```

For example:

```text
HeLa Genome
    ↓
Project-Guardian-mcp-server
```

does not mean:

```text
Project-Guardian-mcp-server
    ↓
HeLa-Genome-mcp-server
```

The former is an ecosystem alias.

The latter would be an unnecessary repository migration.

Do not perform the latter.

---

# 8. Inventory as the Alias Boundary

The ecosystem inventory should explicitly contain:

```text
ecosystem identifier
human-facing alias
source repository
revision
scope
role
```

Example:

```json
{
  "id": "hela-genome",
  "alias": "HeLa Genome",
  "source": "Project-Guardian-mcp-server",
  "scope": "core",
  "role": "persistent-state",
  "revision": "<git-commit>"
}
```

The inventory therefore becomes the translation boundary:

```text
HeLa identity
      ↓
ecosystem inventory
      ↓
existing MCP repository
      ↓
exact Git revision
```

This allows the public naming system to evolve independently from the implementation repositories.

---

# 9. Commit-Based Identity Remains Unchanged

The rebrand must not alter the existing commit-based revision strategy.

A HeLa component still resolves to an exact Git revision:

```text
HeLa Genome
    ↓
Project-Guardian-mcp-server
    ↓
commit abc123...
```

The alias identifies **what the component is called in the ecosystem**.

The commit identifies **exactly what implementation is being used**.

These are separate concerns.

---

# 10. Backward Compatibility

Existing technical references should continue working.

Where documentation currently says:

```text
Project Guardian
```

the ecosystem documentation may introduce:

```text
HeLa Genome
(Project Guardian MCP)
```

Then progressively use:

```text
HeLa Genome
```

as the primary public name.

Do not abruptly remove technical names from documentation.

For migration purposes, maintain an explicit mapping table.

```text
HeLa Mitosis    → Chaining MCP
HeLa Membrane   → Filesystem MCP
HeLa Genome     → Project Guardian MCP
HeLa Nucleus    → Terminal MCP
HeLa Ribosome   → Menager MCP
HeLa Enzyme     → Research Assistant MCP
HeLa Cytosol    → Browser Agent
HeLa Phenotype  → The Designer
HeLa Receptor   → scrcpy MCP
HeLa Plastid    → LL3M Agent
```

---

# 11. Website Branding

The dedicated website should use **HeLa MCP Ecosystem** as the primary product identity.

The website should explain the naming directly.

Suggested section:

## Why HeLa?

HeLa cells are one of the most significant human cell lines in modern biomedical research. The project adopts the cellular architecture as a metaphor for a modular AI tooling ecosystem, where specialized components perform distinct functions while operating together as one system.

The name is intended as a respectful recognition of **Henrietta Lacks** and the profound scientific legacy associated with HeLa cells.

Do not imply:

* endorsement by Henrietta Lacks' family
* ownership of HeLa
* scientific equivalence between the MCP ecosystem and biological cells
* that the project is affiliated with biomedical institutions working with HeLa cells

The reference should be respectful and factual.

---

# 12. Website Visual Language

The visual identity should communicate:

```text
cellular system
+
modular components
+
technical infrastructure
```

Avoid making the website look like a medical or pharmaceutical product.

The goal is:

```text
biological inspiration
        +
developer tooling
```

rather than:

```text
medical branding
```

The 10 HeLa components can each have a consistent visual representation while retaining their technical descriptions.

---

# 13. Documentation Presentation

Every public-facing component page should follow the same structure:

```text
HeLa Genome

Project Guardian MCP

Persistent project state and knowledge.

Scope:
Core

Role:
Backbone

Source:
Project-Guardian-mcp-server

Revision:
<commit>

Used by:
<profiles>
```

This gives the biological identity immediate technical grounding.

---

# 14. Marketing Language

Prefer concrete statements.

Good:

> A 10-MCP stack organized around two backbone components: orchestration and persistent project state.

Good:

> Choose a profile and deploy a complete MCP environment built from independently maintained servers.

Good:

> HeLa Mitosis coordinates capabilities while HeLa Genome preserves project continuity.

Avoid:

> The revolutionary biological AI operating system.

Avoid exaggerated claims that rely on the biological metaphor.

The name should make the project memorable; the implementation should make it credible.

---

# 15. Source Attribution

Each HeLa component must retain a visible connection to its original project.

For example:

```text
HeLa Genome
Project Guardian MCP

Source repository:
1999AZZAR/Project-Guardian-mcp-server
```

The same pattern should be applied to all 10 components.

This ensures that contributors can always move from the ecosystem abstraction to the actual implementation.

---

# 16. Rebrand Migration

Perform the rebrand in this order:

```text
1. Define canonical HeLa names
        ↓
2. Add alias mappings to inventory
        ↓
3. Update ecosystem configuration
        ↓
4. Update profile references
        ↓
5. Update CLI output
        ↓
6. Update README
        ↓
7. Update ecosystem documentation
        ↓
8. Update diagrams
        ↓
9. Update website branding
        ↓
10. Record real-world demos using HeLa names
```

Do not modify individual MCP repositories merely to accomplish these steps.

---

# 17. Validation

After the rebrand, verify that:

```text
[ ] All 10 MCPs have exactly one canonical HeLa alias
[ ] All aliases use consistent naming
[ ] All machine identifiers use hela-* naming
[ ] All aliases resolve to the correct source repositories
[ ] Existing repository names remain unchanged
[ ] Existing commit pins remain valid
[ ] Profiles still resolve correctly
[ ] Installation still works
[ ] Generated configurations still work
[ ] CLI output uses the intended public names
[ ] Technical source names remain discoverable
[ ] Documentation contains no stale ecosystem naming
[ ] Website uses the same canonical aliases
[ ] Backbone distinction is visible
[ ] Henrietta Lacks / HeLa attribution is respectful and accurate
```

---

# 18. Final Naming Model

The completed public identity should look like:

```text
                         HeLa MCP Ecosystem
                                  │
                  ┌───────────────┴───────────────┐
                  │                               │
             BACKBONE                       CAPABILITIES
                  │                               │
          ┌───────┴───────┐              ┌────────┴────────┐
          │               │              │                 │
     HeLa Mitosis    HeLa Genome      Core capabilities   Specialized
     Orchestration   Project State                         capabilities
          │               │
          └───────┬───────┘
                  │
             8 other MCPs
```

Public:

```text
HeLa Genome
```

Machine-readable:

```text
hela-genome
```

Technical:

```text
Project-Guardian-mcp-server
```

Implementation:

```text
exact Git commit
```

These four layers should remain distinct.

---

# 19. Definition of Done

The rebrand is complete when a new user can interact entirely with:

```text
HeLa MCP Ecosystem
HeLa Mitosis
HeLa Membrane
HeLa Genome
HeLa Nucleus
HeLa Ribosome
HeLa Enzyme
HeLa Cytosol
HeLa Phenotype
HeLa Receptor
HeLa Plastid
```

while a developer can immediately trace every component back to:

```text
original repository
+
exact Git revision
```

No underlying MCP project needs to be renamed, forked, reorganized, or rewritten.

The final relationship is:

```text
                     HeLa MCP Ecosystem
                              │
                       public identity
                              │
                       alias/inventory
                              │
                ┌─────────────┴─────────────┐
                │                           │
          HeLa component              Git revision
                │                           │
                └─────────────┬─────────────┘
                              │
                    existing MCP repository
```

The HeLa name becomes the identity of the **stack**, while the existing repositories remain the identity of the **implementations**.
