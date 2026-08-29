# Prerequisites, Keys & Secrets Guide

This document explains system prerequisites, all optional API keys/secrets across the MCP Ecosystem Suite, where to get them, and what happens if you don't have them (consequences & offline fallback modes).

---

## 📋 System Prerequisites

Before running the setup, ensure your system has the following installed:

| Prerequisite | Minimum Version | Recommended | Installation Command |
|---|---|---|---|
| **Node.js** | `>= 18.0.0` | `20.x` or `22.x` LTS | `curl -fsSL https://deb.nodesource.com/setup_20.x \| sudo -E bash - && sudo apt-get install -y nodejs` |
| **npm** | `>= 8.0.0` | `>= 10.0.0` | Bundled with Node.js (`npm install -g npm@latest`) |
| **Git** | `>= 2.25.0` | Latest | `sudo apt install git` / `brew install git` |
| **SQLite3** | `>= 3.30.0` | Latest | Bundled with system / `sudo apt install sqlite3` |
| **Docker** *(Optional)* | `>= 20.10.0` | Latest with Compose v2 | `sudo apt install docker-compose-plugin` |

---

## 🔑 Keys & Secrets Catalog

All keys and secrets in this ecosystem are **100% OPTIONAL**. The entire suite is engineered with graceful degradation and offline fallbacks. You can run all servers out of the box with zero keys.

```
┌────────────────────────────────────────────────────────────────────────┐
│                        MCP ECOSYSTEM KEY MATRIX                        │
├───────────────────────┬──────────────────────┬─────────────┬───────────┤
│ Secret Name           │ Target MCP Server    │ Necessity   │ Fallback  │
├───────────────────────┼──────────────────────┼─────────────┼───────────┤
│ OPENROUTER_API_KEY    │ chaining-mcp-server  │ Optional    │ Heuristic │
│ GITHUB_TOKEN          │ chaining-mcp-server  │ Optional    │ Bundled   │
│ GOOGLE_API_KEY        │ research-mcp-server  │ Optional    │ Wikipedia │
│ GOOGLE_CSE_ID         │ research-mcp-server  │ Optional    │ Wikipedia │
└───────────────────────┴──────────────────────┴─────────────┴───────────┘
```

---

### 1. `OPENROUTER_API_KEY`

* **Target Server**: `chaining-mcp-server`
* **Purpose**: Powers the built-in LLM intelligence engine for task decomposition (`llm_decompose_task`), AI route ranking (`llm_suggest_route`), fast text summarization (`llm_summarize`), and internal query routing (`llm_query`).
* **Where to get it**:
  1. Visit [OpenRouter API Keys](https://openrouter.ai/keys).
  2. Create a free account.
  3. Generate a new API key (`sk-or-v1-...`).
  4. *Note*: OpenRouter provides completely free models (e.g. `openrouter/free` / `openrouter/auto`) that do not require credit card top-ups.
* **If you DO NOT have it**:
  * **Consequence**: The server will not make external LLM calls.
  * **Fallback Behavior**: `chaining-mcp-server` automatically and instantly falls back to its deterministic local heuristic optimizer. `llm_suggest_route` returns heuristic rankings in `<30ms`, `llm_decompose_task` returns rule-based subtasks, and `llm_summarize` performs local text compression. **Zero crashes, zero process hangs.**

---

### 2. `GITHUB_TOKEN`

* **Target Server**: `chaining-mcp-server` (Awesome Copilot integration)
* **Purpose**: Synchronizes the latest community prompt collections, guidelines, and chatmodes from GitHub repositories at runtime.
* **Where to get it**:
  1. Visit [GitHub Personal Access Tokens](https://github.com/settings/tokens).
  2. Generate a token (Classic or Fine-grained) with `public_repo` or read-only public access.
* **If you DO NOT have it**:
  * **Consequence**: Live GitHub syncing is disabled.
  * **Fallback Behavior**: The server operates 100% offline from its bundled local catalog (3 comprehensive collections and pre-indexed instructions). `search_instructions` and `load_instruction` respond in `<1ms`.

---

### 3. `GOOGLE_API_KEY` & `GOOGLE_CSE_ID`

* **Target Server**: `research-mcp-server`
* **Purpose**: Live web search queries via the Google Custom Search JSON API.
* **Where to get them**:
  1. **API Key**: Create an API key at [Google Cloud Console](https://console.cloud.google.com/apis/credentials). Enable the *Custom Search API* (100 free searches/day).
  2. **CSE ID**: Create a Search Engine ID at [Programmable Search Engine](https://programmablesearchengine.google.com/controlpanel/all) (set Search the entire web = ON).
* **If you DO NOT have them**:
  * **Consequence**: Live Google search queries will return a configuration notice.
  * **Fallback Behavior**: Wikipedia search, article summaries, deep-content extraction, multi-language pages, keyword extraction, and sentiment analysis work 100% without keys.

---

## ⚡ Zero-Touch Interactive Configuration

You never have to manually edit JSON or TOML configuration files. 

### Initial Setup
Run the setup script:
```bash
./setup.sh
```
The wizard will:
1. Detect your environment and system type (GUI vs. Headless).
2. Let you choose an installation profile (e.g. `headless-server` or `dev-workspace`).
3. Interactively ask for your keys (with an option to hit `Enter` to skip / use offline defaults).
4. Automatically write the clean configuration directly to your preferred AI agent client.

### Reconfiguring Keys & Targets Anytime
To reconfigure keys or switch clients on an already-installed ecosystem:
```bash
./setup.sh --reconfigure
```
Or specify parameters directly via flags:
```bash
./setup.sh --profile headless-server --client cursor --openrouter-key "sk-or-v1-..." --github-token "ghp_..."
```
