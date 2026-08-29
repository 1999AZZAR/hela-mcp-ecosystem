# Specification: Milestone 4 — Security Audit, Multi-Client Matrix & CI Hardening

## 1. Overview & Context

Milestone 4 hardens the **HeLa MCP Ecosystem** for production deployment across diverse developer environments and continuous integration pipelines:
1. **Security & Reliability Audit**: Comprehensive security audit document (`docs/security-audit.md`) establishing sandboxing guidelines, secret redaction, and terminal command isolation.
2. **Multi-Client Configuration Test Suite (`scripts/test-client-matrix.mjs`)**: Automated verification for all 10 supported AI coding clients across all 7 profiles (70 matrix combinations).
3. **Hardened GitHub Actions CI Pipeline (`.github/workflows/ci.yml`)**: End-to-end multi-platform, multi-Node CI matrix with automated doctor health checks and integration testing.

## 2. Functional Requirements

### 2.1 Security & Reliability Audit (`docs/security-audit.md`)
- Author comprehensive security audit analyzing:
  - **Path Traversal & Sandboxing**: `hela-membrane` (filesystem operations boundary enforcement).
  - **Command Execution Safety**: `hela-nucleus` (command validation, safe shell execution).
  - **PTY Session Lifecycle**: `hela-ribosome` (process group cleanup, SIGTERM/SIGKILL hierarchy, orphan prevention).
  - **Zero-Exposure Credential Policy**: Redaction of API keys and tokens across stdout, logs, error dumps, and snapshot exports.
  - **Network & SSRF Boundaries**: `hela-cytosol` (browser automation network filtering).

### 2.2 Multi-Client Matrix Automated Validator (`scripts/test-client-matrix.mjs`)
- Implement comprehensive client matrix test script:
  - Tests all 10 client formatters (`cursor`, `claude`, `gemini`, `antigravity`, `opencode`, `kilo`, `zed`, `codex`, `docker`, `skip`) against all 7 profiles.
  - Parses generated output formats:
    - Standard JSON (`cursor`, `claude`, `gemini`, `antigravity`, `kilo`)
    - Nested OpenCode format (`opencode`)
    - Zed context servers schema (`zed`)
    - TOML configuration format (`codex`)
    - Docker Compose v3 format (`docker`)
  - Asserts valid syntax, non-empty server blocks, correct command/args, and valid environment variables.

### 2.3 Hardened GitHub Actions CI Pipeline (`.github/workflows/ci.yml`)
- Create `.github/workflows/ci.yml` supporting:
  - Matrix across Node.js versions `18.x`, `20.x`, `22.x` on `ubuntu-latest`.
  - macOS platform verification (`macos-latest` on Node 20.x).
  - Steps:
    1. Checkout repository.
    2. Set up Node.js with cache.
    3. Run pre-commit style and yaml linters.
    4. Verify snapshot consistency (`config/snapshots/v1.0.0.json`).
    5. Run `./setup.sh doctor --json`.
    6. Run `./setup.sh --profile dev-workspace --non-interactive --client cursor`.
    7. Run multi-client matrix test suite (`npm run test:matrix`).
    8. Run master integration test suite (`npm test`).

## 3. Acceptance Criteria

- [ ] `docs/security-audit.md` authored with complete vulnerability analysis and mitigation standards.
- [ ] `scripts/test-client-matrix.mjs` and `scripts/test-client-matrix.sh` pass 70/70 matrix combinations with 0 errors.
- [ ] `.github/workflows/ci.yml` authored and verified locally.
- [ ] Pre-commit hooks pass 100%.
