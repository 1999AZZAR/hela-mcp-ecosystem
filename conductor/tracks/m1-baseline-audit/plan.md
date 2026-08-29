# Implementation Plan: Milestone 1 — Baseline Audit & Canonical HeLa Aliasing

## Phase 1: 10-MCP Remote Audit & Baseline Verification

- [x] Task: Audit GitHub remote states and record commit revisions for all 10 MCP servers
  - [x] Inspect remote repo, latest commit, entrypoint, build scripts for `chaining-mcp-server`
  - [x] Inspect remote repo, latest commit, entrypoint, build scripts for `filesystem-mcp-server`
  - [x] Inspect remote repo, latest commit, entrypoint, build scripts for `Project-Guardian`
  - [x] Inspect remote repo, latest commit, entrypoint, build scripts for `terminal-mcp-server`
  - [x] Inspect remote repo, latest commit, entrypoint, build scripts for `menager-mcp-server`
  - [x] Inspect remote repo, latest commit, entrypoint, build scripts for `research-mcp-server`
  - [x] Inspect remote repo, latest commit, entrypoint, build scripts for `the-designer`
  - [x] Inspect remote repo, latest commit, entrypoint, build scripts for `browser-agent`
  - [x] Inspect remote repo, latest commit, entrypoint, build scripts for `scrcpy-mcp`
  - [x] Inspect remote repo, latest commit, entrypoint, build scripts for `ll3m-agent`
- [x] Task: Run baseline smoke tests across all servers and record baseline status
- [x] Task: Phase Verification & Checkpoint

---

## Phase 2: Canonical HeLa Inventory & Alias Translation Engine

- [x] Task: Update `config/inventory.json` with canonical HeLa metadata and alias mapping
  - [x] Add top-level HeLa ecosystem metadata
  - [x] Structure all 10 servers under `hela-*` IDs with full taxonomy, role, and revision fields
  - [x] Add alias lookup mapping for legacy source repository keys
- [x] Task: Update `scripts/lib.sh` for dual-key resolution (HeLa ID and source name)
- [x] Task: Update `scripts/generate-config.mjs` to render client configs with clean HeLa identifiers
- [x] Task: Update `setup.sh` and `update.sh` to display canonical `HeLa <Component>` names
- [x] Task: Phase Verification & Checkpoint

---

## Phase 3: Agent-Oriented Profiles & Pre-Validation

- [x] Task: Update `config/profiles.json` to reference canonical `hela-*` server IDs
  - [x] Verify both backbones (`hela-mitosis`, `hela-genome`) in all 7 profiles
  - [x] Verify core headless vs. specialized GUI server allocations
- [x] Task: Document agent personas and workflow pipelines in `docs/profiles.md`
- [x] Task: Implement profile pre-validation engine in `scripts/lib.sh` / `setup.sh`
- [x] Task: Phase Verification & Checkpoint

---

## Phase 4: Verification, Example Config Generation & CI Validation

- [x] Task: Re-generate all checked-in example configs in `config/` with canonical HeLa configs
- [x] Task: Run full 70-combination matrix tests (`generate-config.mjs`) across all profiles and backends
- [x] Task: Run pre-commit hooks and verify 100% pass rate
- [x] Task: Update Project Guardian memory graph and commit changes
- [x] Task: Phase Verification & Checkpoint
