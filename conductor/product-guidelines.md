# Product Guidelines: HeLa MCP Ecosystem

## Voice, Tone & Formatting

- **Clarity & Precision**: Concise, high-density technical communication without marketing fluff or speculative claims.
- **Uniform Formatting**: Professional GitHub-flavored Markdown. Zero decorative emojis across all documentation and output.
- **Respectful Attribution**: Consistent recognition of Henrietta Lacks and HeLa cells as a biological cellular metaphor for modular systems.
- **Transparent 4-Tier Naming**:
  1. Public Identity (`HeLa <Component>`)
  2. Machine Identifier (`hela-*`)
  3. Technical Source Repository (`<repo-name>`)
  4. Immutable Implementation Revision (`<git-commit>`)

## Technical & Quality Standards

1. **Backbone Separation of Concerns**:
   - HeLa Mitosis handles *execution planning, tool selection, and routing*.
   - HeLa Genome handles *persistent state, memory tracking, and knowledge retrieval*.
   - Capability servers remain independently executable and focused on single domains.
2. **Deterministic Reproducibility**:
   - All production profiles pin exact Git commit hashes.
   - Setup and update scripts must be idempotent and fail fast on errors.
3. **Context Window Protection**:
   - Capability servers must bound output sizes using pagination, limits, and explicit truncation markers (`[TRUNCATED: showing 100/1500 lines]`).
4. **Security-First Architecture**:
   - Shell execution, path traversal, PTY processes, and browser boundaries must enforce strict input sanitization.
   - API keys and credentials must never be logged, echoed, or stored in world-readable locations.
5. **Zero-Key Resilience**:
   - Every tool must operate gracefully when optional API keys are absent, falling back to local heuristics or bundled catalogs without process hangs.
