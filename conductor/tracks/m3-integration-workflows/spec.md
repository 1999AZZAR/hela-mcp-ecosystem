# Specification: Milestone 3 — Backbone Integration Layer & Workflows A–F

## 1. Overview & Context

Milestone 3 solidifies the **dual-backbone architecture** of the HeLa MCP Ecosystem:
- **HeLa Mitosis (`hela-mitosis`)**: Dynamic workflow routing, sequential reasoning, and tool chain orchestration.
- **HeLa Genome (`hela-genome`)**: Entity-relation-observation knowledge graph, structured memory, and session context.

This track implements:
1. End-to-end multi-server integration verification test suite (`scripts/test-integration.sh` / `scripts/test-integration.mjs`).
2. Output bounds & context-window preservation enforcement.
3. Master Workflows Guide (`docs/workflows.md`) covering canonical end-to-end workflows (Workflows A through F).

## 2. Functional Requirements

### 2.1 Automated Integration Test Suite (`scripts/test-integration.sh` / `scripts/test-integration.mjs`)
- Implement a standalone Node.js integration test runner that:
  - Spawns each server over stdio JSON-RPC transport (`initialize`, `tools/list`, `ping`).
  - Tests Cross-MCP tool invocation and protocol conformance.
  - Tests Workflow A simulated flow: `hela-genome` (entity creation) -> `hela-mitosis` (chaining plan) -> `hela-membrane` (file read/write simulation).
  - Tests Workflow B simulated flow: `hela-enzyme` (Wikipedia search) -> `hela-genome` (record research observation).
  - Tests Workflow C simulated flow: `hela-phenotype` (token generation) -> `hela-cytosol` (DOM inspection readiness).
  - Emits TAP/structured output with execution time per test and exit code 0 on complete pass.

### 2.2 Output Bounds & Context Window Protection
- Ensure integration tests enforce output truncation guidelines (large outputs capped, summary fields provided) to safeguard LLM context windows against bloat.

### 2.3 Comprehensive Workflows Documentation (`docs/workflows.md`)
- Author detailed technical workflow specifications with step-by-step tool sequences, JSON schemas, persona mappings, and example prompts for:
  - **Workflow A: Autonomous Feature Engineering** (`dev-workspace` / `headless-server`): Genome -> Mitosis -> Membrane -> Nucleus -> Genome.
  - **Workflow B: Deep Research & Architecture Synthesis** (`research`): Enzyme -> Cytosol -> Mitosis -> Genome -> Membrane.
  - **Workflow C: Web Feature with Design & Browser Verification** (`web-devops` / `dev-workspace`): Phenotype -> Membrane -> Nucleus -> Cytosol -> Genome.
  - **Workflow D: Mobile App Test Automation** (`android-testing`): Genome -> Nucleus -> Receptor -> Genome.
  - **Workflow E: Autonomous 3D Asset Creation** (`3d-modeling`): Genome -> Mitosis -> Plastid -> Membrane -> Genome.
  - **Workflow F: Long-Horizon Complex Refactor with PTY Harness** (`dev-workspace` / `headless-server`): Ribosome -> Nucleus -> Genome.

## 3. Acceptance Criteria

- [ ] `scripts/test-integration.mjs` and `scripts/test-integration.sh` implemented and passing all tests across active servers.
- [ ] `docs/workflows.md` authored with complete sequence diagrams, prompts, and tool sequences for Workflows A–F.
- [ ] Pre-commit checks and CI matrix pass 100%.
