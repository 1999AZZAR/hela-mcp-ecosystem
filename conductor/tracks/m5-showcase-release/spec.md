# Specification: Milestone 5 — Showcase Recordings, Documentation Landing Site & v1.0.0 Release

## Overview
Milestone 5 delivers the public-facing showcase and interactive landing experience for the **HeLa MCP Ecosystem**. It integrates real recorded workflow demonstrations (YouTube video showcases and uploaded Asciinema terminal casts), creates a self-contained, responsive documentation landing site in `docs/site/`, and finalizes the release documentation.

---

## Functional Requirements

### 1. Workflow Showcase Assets & Terminal Recordings
* **External Video Showcases**:
  * Integrate user's YouTube showcase recordings:
    * `https://youtu.be/BnbDg1-be4g`
    * `https://youtu.be/O6nYKjmlaGk`
* **Asciinema Terminal Casts**:
  * Record terminal sessions using `asciinema rec` covering:
    1. **Ecosystem Health & Diagnostics**: `./setup.sh doctor` demonstrating system checks, entrypoint validation, and offline fallbacks.
    2. **Multi-Client Matrix Verification**: `npm run test:matrix` validating 70 client x profile combinations in real-time.
    3. **Master Integration Suite**: `npm test` verifying stdio JSON-RPC handshake across all 10 servers and 295 active tools.
    4. **Deterministic Setup & Profile Engine**: `./setup.sh --profile dev-workspace --non-interactive` showing idempotent installation.
  * Upload terminal casts via `asciinema upload` or embed lightweight JSON cast players.

### 2. Dedicated Documentation Landing Site (`docs/site/`)
* Create a modern, standalone static website in `docs/site/`:
  * **Hero Section**: Cellular AI tooling narrative, Henrietta Lacks respectful tribute, and quick copy-paste install commands.
  * **Dual-Backbone Architecture Explorer**: Visual interactive diagram of HeLa Mitosis (orchestrator) and HeLa Genome (memory) dispatching to the 8 capability cells.
  * **Interactive Profile Configurator**: Interactive UI allowing users to select their target client (Cursor, Claude, Gemini, Antigravity, OpenCode, Kilo, Zed, Codex, Docker) and profile to generate live configuration snippets.
  * **Video & Terminal Showcase Gallery**: Responsive grid embedding YouTube videos and Asciinema casts.
  * **Component Directory**: Searchable reference of all 10 canonical HeLa components with tools, source repos, and fallback behaviors.
  * **Zero External Build Step Dependency**: Pure HTML5, CSS (modern CSS grid, flexbox, custom properties), and vanilla JS that runs directly or via GitHub Pages without npm build overhead.

### 3. Release Finalization
* Update `docs/site` deployment instructions.
* Prepare `RELEASE_NOTES.md` and update `conductor/tracks.md`.
