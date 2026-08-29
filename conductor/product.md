# Product Definition: HeLa MCP Ecosystem

## Vision & Summary

The **HeLa MCP Ecosystem** is a hardened, reproducible, 10-server Model Context Protocol (MCP) distribution suite. Built around a dual-backbone architecture, it couples **HeLa Mitosis** (intelligent multi-tool orchestration, task decomposition, and routing) and **HeLa Genome** (persistent project memory and SQLite knowledge graphs) with 8 specialized capability MCPs spanning workspace management, research, browser automation, UI/UX design, Android control, and 3D modeling.

The ecosystem provides a profile-driven distribution layer with deterministic commit-based snapshot releases, automated diagnostic health checking, and native configuration generation across 8 major AI agent platforms.

## Core Architectural Layers

1. **Backbone Plane (The Core Duo)**:
   - **HeLa Mitosis (`hela-mitosis` / `chaining-mcp-server`)**: Multi-tool discovery, route ranking, task decomposition, and sequential thinking workflows.
   - **HeLa Genome (`hela-genome` / `Project-Guardian-mcp-server`)**: Living SQLite knowledge graph (`memory.db`), task tracking, architectural decision records, and session continuity.
2. **Capability Plane (8 Specialized Servers)**:
   - **HeLa Membrane (`hela-membrane` / `filesystem-mcp-server`)**: Workspace filesystem boundary and file operations.
   - **HeLa Nucleus (`hela-nucleus` / `terminal-mcp-server`)**: System command execution and remote shell interaction.
   - **HeLa Ribosome (`hela-ribosome` / `menager-mcp-server`)**: POSIX pseudo-terminal (PTY) process harness multiplexing.
   - **HeLa Enzyme (`hela-enzyme` / `research-mcp-server`)**: Unified Google & Wikipedia research, analysis, and fact-checking.
   - **HeLa Cytosol (`hela-cytosol` / `browser-agent`)**: Web browser automation, DOM interaction, and visual verification.
   - **HeLa Phenotype (`hela-phenotype` / `the-designer`)**: UI/UX design tokens, Tailwind CSS, and component systems.
   - **HeLa Receptor (`hela-receptor` / `scrcpy-mcp`)**: External Android mobile device control.
   - **HeLa Plastid (`hela-plastid` / `ll3m-agent`)**: Autonomous 3D Blender modeling.

## Key Objectives & Success Criteria

1. **Strict 10-MCP Ceiling**: Exactly 10 MCP servers without architectural bloat or feature creep.
2. **Deterministic Reproducibility**: Commit-based snapshot management (`config/snapshots/v1.0.0.json`) guaranteeing identical environments on Ubuntu, macOS, and WSL.
3. **Automated Diagnostics**: Comprehensive `./setup.sh doctor` health command validating prerequisites, external binaries, and runtime permissions.
4. **End-to-End Workflow Automation**: Multi-agent integration validated across Workflows A through F.
5. **Zero-Key Graceful Degradation**: 100% operational offline fallback modes across all servers with zero crashes.
