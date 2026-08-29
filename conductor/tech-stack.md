# Technology Stack: HeLa MCP Ecosystem

## Core Environment & Runtime

- **Runtime**: Node.js (>= 18.0.0, recommended 20.x or 22.x LTS, ES Modules)
- **Language**: TypeScript (server implementations) & Modern JavaScript (Node.js ESM)
- **Scripting & Automation**: Bash (POSIX shell / `set -e`)
- **Package Management**: npm (`package.json`, `package-lock.json`)

## Protocols & Interfaces

- **Communication Protocol**: Model Context Protocol (MCP) over stdio JSON-RPC
- **Persistence & Knowledge Base**: SQLite3 (`memory.db`), JSON (`memory.json`)
- **Client Configuration Targets**: JSON / TOML (Cursor, Claude, Antigravity/Gemini, OpenCode, Kilo, Zed, Codex, Docker)

## External Runtime Drivers (Profile-Specific)

- **Browser Automation**: Playwright / Chromium (HeLa Cytosol)
- **Mobile Automation**: Android Debug Bridge (`adb`) & `scrcpy` (HeLa Receptor)
- **3D Modeling & Rendering**: Blender CLI (`blender --version`) (HeLa Plastid)
- **Process Orchestration**: POSIX pseudo-terminals / PTY (HeLa Ribosome)

## Quality Assurance, CI & Formatting

- **Linting & Hooks**: Pre-commit hooks (`.pre-commit-config.yaml`, `trailing-whitespace`, `end-of-file-fixer`, `check-yaml`)
- **Continuous Integration**: GitHub Actions (`.github/workflows/ci.yml`)
- **Testing**: Custom Node.js smoke test suites & cross-MCP integration tests (`test-smoke.js`, `test-integration.sh`)
