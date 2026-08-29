# HeLa MCP Ecosystem: Security & Reliability Audit

This document outlines the security architecture, threat model, mitigation strategies, and reliability standards implemented across the **HeLa MCP Ecosystem**.

---

## 1. Threat Model & Architectural Boundaries

The HeLa MCP Ecosystem operates on a multi-layer isolation model designed to safely execute autonomous AI agent workflows while protecting the host environment, developer workspaces, and API credentials.

```
                      ┌────────────────────────────────────────┐
                      │          AI Client Orchestrator        │
                      └───────────────────┬────────────────────┘
                                          │ stdio JSON-RPC
                      ┌───────────────────▼────────────────────┐
                      │       Dual-Backbone Supervision        │
                      │   HeLa Mitosis  |  HeLa Genome         │
                      └───────────────────┬────────────────────┘
                                          │
       ┌──────────────────┬───────────────┴───────────────┬──────────────────┐
       ▼                  ▼                               ▼                  ▼
┌──────────────┐   ┌──────────────┐                ┌──────────────┐   ┌──────────────┐
│hela-membrane │   │ hela-nucleus │                │hela-ribosome │   │ hela-cytosol │
│Filesystem    │   │Terminal Exec │                │PTY Lifecycle │   │Browser DOM   │
└──────┬───────┘   └──────┬───────┘                └──────┬───────┘   └──────┬───────┘
       │                  │                               │                  │
       ▼                  ▼                               ▼                  ▼
[Path Sandboxing]  [Env & Cwd Guard]               [Process Isolation] [SSRF Filter]
```

---

## 2. Capability-Specific Security Controls

### 2.1 Filesystem Sandboxing (`hela-membrane` / `filesystem-mcp-server`)
- **Path Canonicalization**: All path inputs are resolved using `path.resolve()` against the allowed workspace roots.
- **Directory Traversal Prevention**: Strict validation prevents `../` path traversal outside designated workspace directories.
- **Atomic File Writes**: Write operations employ atomic write-then-rename patterns to prevent file corruption during interrupted agent turns.
- **Output Truncation**: File reading tools enforce pagination and byte limits to prevent denial-of-service via large binary or log dumps.

### 2.2 Terminal Execution Isolation (`hela-nucleus` / `terminal-mcp-server`)
- **Command Sanitization**: Command execution wrappers enforce clean execution environments.
- **Explicit Working Directory (`cwd`)**: Every command invocation explicitly binds to an absolute, verified directory.
- **Execution Timeouts**: Subprocesses are bounded by default timeout limits (`CHAINING_TOOL_TIMEOUT_MS`) to prevent hanging zombie processes.
- **Environment Isolation**: Subprocesses inherit only explicitly declared or sanitized environment variables, preventing unintentional token leakage into build tool logs.

### 2.3 PTY Process Lifecycle & Cleanup (`hela-ribosome` / `menager-mcp-server`)
- **Process Group Tracking**: Each interactive PTY session runs within an isolated process group.
- **Graceful Teardown**: Session termination follows a phased teardown hierarchy (`SIGTERM` → 2000ms grace period → `SIGKILL`).
- **Zombie Process Prevention**: Process exit handlers ensure that dying master sessions immediately terminate and reap all child worker processes.
- **Buffer Flow Control**: Terminal output streams are buffered in ring-buffers with hard memory caps to prevent process memory exhaustion.

### 2.4 Browser Automation & SSRF Protection (`hela-cytosol` / `browser-agent`)
- **Local Network Filtering**: Internal infrastructure endpoints (e.g. `169.254.169.254`, cloud metadata services) are restricted.
- **Headless Isolation**: Browser sessions run with isolated user data directories (`--incognito` / ephemeral contexts).
- **DOM-First Analysis**: Prefer structural accessibility trees (`browser_get_accessibility_tree`) over full-screen bitmap captures to minimize token consumption and visual attack surfaces.

---

## 3. Credential & Secret Management Policy

### 3.1 Zero-Exposure Logging Standard
- **No Credential Echoing**: Tools, scripts, and logs MUST NEVER print raw API keys, bearer tokens, or database passwords to stdout/stderr.
- **Redaction in Diagnostics**: `./setup.sh doctor` and diagnostic tools report only boolean configuration presence (`[Configured]` vs `[Not set]`).
- **Snapshot Immutability**: Release snapshots (`config/snapshots/*.json`) record ONLY commit hashes and repository URLs—never developer secrets.

### 3.2 Offline-First Graceful Degradation
- All 10 HeLa MCP servers operate fully in **zero-key offline mode**:
  - `HeLa Mitosis`: Uses local deterministic heuristic routing (<30ms) when `OPENROUTER_API_KEY` is omitted.
  - `HeLa Enzyme`: Automatically routes queries to Wikipedia offline cache when Google Custom Search keys are absent.
  - `HeLa Genome`: Stores all state locally in SQLite (`memory.db`) without cloud dependencies.

---

## 4. Reliability & Idempotence Guarantees

1. **Deterministic Snapshots**: Environments can be pinned to immutable commit hashes (`--snapshot v1.0.0`), preventing breaking upstream changes from destabilizing production pipelines.
2. **Build Idempotence**: Setup tools verify existing build artifacts (`dist/index.js`, `build/index.js`) and commit hashes before rebuilding, allowing instant reconfigurations in <1s.
3. **Automated Matrix Verification**: Continuous integration runs 70/70 backend matrix tests on every pull request to ensure zero configuration regression.
