# Specification: Milestone 2 — Deterministic Snapshots & Doctor Command

## 1. Overview & Context

Milestone 2 introduces two core capabilities to the **HeLa MCP Ecosystem**:
1. **Ecosystem Snapshot Management & Deterministic Installation**: Immutable Git commit-pinned snapshot system (`config/snapshots/v1.0.0.json`) guaranteeing 100% reproducible environments across diverse machines with idempotent installation and rollback support.
2. **Ecosystem Diagnostic Health Command (`setup.sh doctor` / `scripts/doctor.sh`)**: An automated system diagnostic tool that validates host prerequisites, Node.js version, SQLite3 CLI, server build artifacts, profile compatibility, external runtimes (`playwright`, `adb`, `blender`, PTY), and API key status without exposing credentials.

## 2. Functional Requirements

### 2.1 Ecosystem Snapshot Specification
- Create `config/snapshots/` directory.
- Create `config/snapshots/v1.0.0.json` and `config/snapshots/latest-stable.json` capturing:
  - `snapshot_version`: `1.0.0`
  - `release_date`: `2026-08-29`
  - `ecosystem_commit`: Exact Git commit hash of `mcp-ecosystem`
  - `servers`: Pinned Git commit hashes for all 10 HeLa MCP servers (`hela-mitosis`, `hela-genome`, `hela-membrane`, `hela-nucleus`, `hela-ribosome`, `hela-enzyme`, `hela-cytosol`, `hela-phenotype`, `hela-receptor`, `hela-plastid`).
  - `verified_profiles`: Array of verified profile IDs.
- Support `--snapshot <file|tag>` flag in `setup.sh` to install or verify against a specific snapshot.

### 2.2 Deterministic & Idempotent Installation Engine
- In `setup.sh` and `scripts/lib.sh`:
  - When a commit revision is specified in `inventory.json` or snapshot, fetch and checkout the exact commit hash.
  - If server directory is already at the target commit hash and built (`dist/index.js` or `build/index.js` exists and is newer than source files), reuse without re-building.
  - Support `--dev` flag to track moving `main`/`master` branches for active development.
  - Provide safe rollback: retain previous known commit hash on updates in `.rollback_state.json`.

### 2.3 Comprehensive Diagnostic Health Command (`./setup.sh doctor` & `scripts/doctor.sh`)
- Provide `./setup.sh doctor [--profile <id>] [--json]` and `scripts/doctor.sh`:
  - **Host System Diagnostics**:
    - OS type, Architecture, Kernel version.
    - Node.js (>= 18.0.0, recommend 20+ LTS).
    - npm / pnpm version.
    - Git version (>= 2.25.0).
    - SQLite3 CLI availability & writable test.
  - **Server Component Health Checks**:
    - Directory existence & Git commit hash verification against pinned revision.
    - Entrypoint and build artifact verification (`dist/index.js` or `build/index.js`).
    - Permission checks.
    - Stdio JSON-RPC startup smoke test (node subprocess start, transport check, terminate in <500ms).
  - **External Binary & Hardware Dependency Checks**:
    - `hela-cytosol`: Playwright / Chromium browser binary check.
    - `hela-receptor`: Android Debug Bridge (`adb`) binary & connected device detection.
    - `hela-plastid`: Blender executable check (`blender --version`).
    - `hela-ribosome`: POSIX pseudo-terminal (PTY) support.
  - **API Key & Secret Status (Safe Diagnostics)**:
    - `OPENROUTER_API_KEY`: Detected / Offline fallback mode active.
    - `GITHUB_TOKEN`: Detected / Offline bundled catalog active.
    - `GOOGLE_API_KEY` & `GOOGLE_CSE_ID`: Detected / Wikipedia offline fallback active.
    - **Security Rule**: Never log or print full credentials.
  - **Actionable Output**:
    - Output structured, aligned table with `[READY]`, `[OPTIONAL MISSING]`, and `[ERROR - REQUIRED MISSING]`.
    - Provide exact copy-paste fix commands for any missing dependencies.
    - Exit code 0 if all required components pass, non-zero if required components fail.

## 3. Acceptance Criteria

- [ ] `config/snapshots/v1.0.0.json` and `config/snapshots/latest-stable.json` created and validated.
- [ ] `./setup.sh doctor` executes and produces clear, actionable diagnostics.
- [ ] `./setup.sh --snapshot v1.0.0` installs exact pinned commit hashes.
- [ ] Idempotent re-runs skip unnecessary builds when commits match and artifacts are valid.
- [ ] Doctor exits with code 0 on healthy setup and non-zero on missing required dependencies.
- [ ] Pre-commit checks and CI matrix pass 100%.
