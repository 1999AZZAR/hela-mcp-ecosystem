# Implementation Plan: Milestone 4 — Security Audit, Multi-Client Matrix & CI Hardening

## Phase 1: Security Audit & Reliability Assessment (`docs/security-audit.md`)

- [x] Task: Author `docs/security-audit.md` covering path traversal, command execution, PTY cleanup, credential safety, and network isolation
- [x] Task: Audit filesystem and terminal tool boundary behaviors
- [x] Task: Phase Verification & Checkpoint

---

## Phase 2: Multi-Client Matrix Test Suite (`scripts/test-client-matrix.mjs`)

- [x] Task: Implement `scripts/test-client-matrix.mjs` verifying all 10 client backends across 7 profiles (70 matrix combinations)
- [x] Task: Implement parser validators for JSON, OpenCode, Zed, Codex TOML, and Docker Compose YAML
- [x] Task: Add `scripts/test-client-matrix.sh` bash wrapper and register `npm run test:matrix` in `package.json`
- [x] Task: Phase Verification & Checkpoint

---

## Phase 3: Hardened GitHub Actions CI Matrix (`.github/workflows/ci.yml`)

- [x] Task: Create `.github/workflows/ci.yml` matrix covering Node 18, 20, 22 on Linux and macOS
- [x] Task: Implement automated steps (doctor check, setup smoke, matrix tests, integration tests)
- [x] Task: Phase Verification & Checkpoint

---

## Phase 4: Verification, Pre-Commit & Memory Graph Synchronization

- [x] Task: Run `npm run test:matrix` and verify 70/70 passing matrix tests
- [x] Task: Run `npm test` and `./setup.sh doctor`
- [x] Task: Run pre-commit hooks across all files
- [x] Task: Update Project Guardian memory and commit changes
- [x] Task: Phase Verification & Checkpoint
