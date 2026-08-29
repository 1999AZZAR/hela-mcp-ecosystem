# Specification: Milestone 1 — Baseline Audit & Canonical HeLa Aliasing

## 1. Overview & Context

Milestone 1 establishes the canonical foundation for the **HeLa MCP Ecosystem**. It audits the exact remote GitHub states of all 10 MCP servers, introduces the 4-tier naming model (Public Identity, Machine Identifier `hela-*`, Technical Source Repo, Implementation Commit Pin), builds transparent alias translation into inventory and config generators, refines agent-oriented profiles in `config/profiles.json`, and implements strict profile pre-validation.

## 2. Functional Requirements

1. **Remote Repository & Baseline Audit**:
   - Audit all 10 MCP repositories against GitHub remotes (`1999AZZAR/*`).
   - Verify build commands, package entrypoints, runtime requirements, and environment variables.
   - Record exact Git commit hashes as current baseline revisions.
   - Run baseline test suite across all servers.
2. **Canonical HeLa Inventory Schema (`config/inventory.json`)**:
   - Add top-level ecosystem metadata (`project_name: "HeLa MCP Ecosystem"`, `total_servers: 10`).
   - Define canonical `hela-*` identifiers for all 10 servers with fields: `id`, `alias`, `source`, `scope`, `role`, `targetRequirement`, `dir`, `repo`, `entry`, `build`, `runtime`, `env`, `revision`.
   - Maintain full backward compatibility for legacy repository keys.
3. **Core Tooling Alias Translation**:
   - Update `scripts/lib.sh` to resolve server keys by both `hela-*` ID and source repository name.
   - Update `scripts/generate-config.mjs` to render client configurations using clean HeLa names while executing underlying source entries.
   - Update `setup.sh` and `update.sh` CLI output to display canonical `HeLa <Component>` names with underlying source attribution.
4. **Agent-Oriented Profiles (`config/profiles.json` & `docs/profiles.md`)**:
   - Update all 7 profiles in `config/profiles.json` to use canonical `hela-*` server IDs.
   - Ensure every profile explicitly includes both backbone servers (`hela-mitosis` and `hela-genome`).
   - Document agent persona, purpose, backbone, capabilities, and target requirements in `docs/profiles.md`.
5. **Profile Pre-Validation Engine**:
   - Implement pre-validation in `scripts/lib.sh` / `setup.sh` to check profile existence, inventory references, target compatibility, and binary prerequisites before modifying disk state.

## 3. Acceptance Criteria

- [ ] All 10 MCP repositories audited and baseline commit hashes recorded.
- [ ] `config/inventory.json` updated with canonical HeLa metadata and alias mapping.
- [ ] `scripts/generate-config.mjs` successfully renders configs for both `hela-*` and legacy keys across all 10 backends.
- [ ] `config/profiles.json` updated with canonical HeLa identifiers across all 7 profiles.
- [ ] `docs/profiles.md` documents complete agent personas for all profiles.
- [ ] Profile pre-validator correctly detects valid profiles and rejects invalid / missing dependencies.
- [ ] GitHub Actions CI workflow and pre-commit hooks pass 100%.
