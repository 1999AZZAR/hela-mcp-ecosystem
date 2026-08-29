# Implementation Plan: Milestone 1 — Baseline Audit & Canonical HeLa Aliasing

## Phase 1: 10-MCP Remote Audit & Baseline Verification

- [ ] Task: Audit GitHub remote states and record commit revisions for all 10 MCP servers
  - [ ] Inspect remote repo, latest commit, entrypoint, build scripts for `chaining-mcp-server`
  - [ ] Inspect remote repo, latest commit, entrypoint, build scripts for `filesystem-mcp-server`
  - [ ] Inspect remote repo, latest commit, entrypoint, build scripts for `Project-Guardian`
  - [ ] Inspect remote repo, latest commit, entrypoint, build scripts for `terminal-mcp-server`
  - [ ] Inspect remote repo, latest commit, entrypoint, build scripts for `menager-mcp-server`
  - [ ] Inspect remote repo, latest commit, entrypoint, build scripts for `research-mcp-server`
  - [ ] Inspect remote repo, latest commit, entrypoint, build scripts for `the-designer`
  - [ ] Inspect remote repo, latest commit, entrypoint, build scripts for `browser-agent`
  - [ ] Inspect remote repo, latest commit, entrypoint, build scripts for `scrcpy-mcp`
  - [ ] Inspect remote repo, latest commit, entrypoint, build scripts for `ll3m-agent`
- [ ] Task: Run baseline smoke tests across all servers and record baseline status
- [ ] Task: Phase Verification & Checkpoint

---

## Phase 2: Canonical HeLa Inventory & Alias Translation Engine

- [ ] Task: Update `config/inventory.json` with canonical HeLa metadata and alias mapping
  - [ ] Add top-level HeLa ecosystem metadata
  - [ ] Structure all 10 servers under `hela-*` IDs with full taxonomy, role, and revision fields
  - [ ] Add alias lookup mapping for legacy source repository keys
- [ ] Task: Update `scripts/lib.sh` for dual-key resolution (HeLa ID and source name)
- [ ] Task: Update `scripts/generate-config.mjs` to render client configs with clean HeLa identifiers
- [ ] Task: Update `setup.sh` and `update.sh` to display canonical `HeLa <Component>` names
- [ ] Task: Phase Verification & Checkpoint

---

## Phase 3: Agent-Oriented Profiles & Pre-Validation

- [ ] Task: Update `config/profiles.json` to reference canonical `hela-*` server IDs
  - [ ] Verify both backbones (`hela-mitosis`, `hela-genome`) in all 7 profiles
  - [ ] Verify core headless vs. specialized GUI server allocations
- [ ] Task: Document agent personas and workflow pipelines in `docs/profiles.md`
- [ ] Task: Implement profile pre-validation engine in `scripts/lib.sh` / `setup.sh`
- [ ] Task: Phase Verification & Checkpoint

---

## Phase 4: Verification, Example Config Generation & CI Validation

- [ ] Task: Re-generate all checked-in example configs in `config/` with canonical HeLa configs
- [ ] Task: Run full 70-combination matrix tests (`generate-config.mjs`) across all profiles and backends
- [ ] Task: Run pre-commit hooks and verify 100% pass rate
- [ ] Task: Update Project Guardian memory graph and commit changes
- [ ] Task: Phase Verification & Checkpoint
