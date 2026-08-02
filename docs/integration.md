# MCP Ecosystem Suite Integration Guide

## Table of Contents

- [Overview](#overview)
- [Client Integration](#client-integration)
  - [Cursor IDE Integration](#cursor-ide-integration)
    - [Step 1: Install Cursor IDE](#step-1-install-cursor-ide)
    - [Step 2: Setup MCP Configuration](#step-2-setup-mcp-configuration)
    - [Step 3: Verify Installation](#step-3-verify-installation)
  - [Claude Desktop Integration](#claude-desktop-integration)
    - [Step 1: Locate Configuration File](#step-1-locate-configuration-file)
    - [Step 2: Update Configuration](#step-2-update-configuration)
    - [Step 3: Restart Claude Desktop](#step-3-restart-claude-desktop)
- [Step 1: Locate Configuration File](#step-1-locate-configuration-file)
    - [Step 2: Update Configuration](#step-2-update-configuration)
    - [Step 3: Restart Claude Desktop](#step-3-restart-claude-desktop)
  - [OpenCode Integration](#opencode-integration)
    - [Step 1: Locate Configuration File](#step-1-locate-configuration-file-1)
    - [Step 2: Update Configuration](#step-2-update-configuration-1)
    - [Step 3: Restart OpenCode](#step-3-restart-opencode)
- [API Keys and Tokens Setup](#api-keys-and-tokens-setup)
  - [GitHub Token (Required for Chaining MCP)](#github-token-required-for-chaining-mcp)
  - [Google API Keys (Required for Researcher MCP)](#google-api-keys-required-for-researcher-mcp)
- [Environment Variables](#environment-variables)
  - [Global Environment Variables](#global-environment-variables)
  - [Server-Specific Variables](#server-specific-variables)
- [Docker Deployment](#docker-deployment)
  - [Prerequisites](#prerequisites)
  - [Quick Start with Docker](#quick-start-with-docker)
  - [Environment File (.env)](#environment-file-env)
- [Development Integration](#development-integration)
  - [VS Code Integration](#vs-code-integration)
  - [Custom Client Integration](#custom-client-integration)
- [Workflow Integration](#workflow-integration)
  - [Development Workflow](#development-workflow)
  - [CI/CD Integration](#cicd-integration)
- [Troubleshooting Integration Issues](#troubleshooting-integration-issues)
  - [Common Issues](#common-issues)
    - [Server Won't Start](#server-wont-start)
    - [Tools Not Available](#tools-not-available)
    - [API Key Issues](#api-key-issues)
    - [Network Issues](#network-issues)
  - [Debug Mode](#debug-mode)
- [Advanced Integration](#advanced-integration)
  - [Custom Server Development](#custom-server-development)
  - [Performance Optimization](#performance-optimization)
  - [Security Considerations](#security-considerations)
- [Support](#support)

## Overview

This guide provides detailed instructions for integrating the MCP Ecosystem Suite into your development workflow and AI agent harness setup. The suite is **profile-driven**: you choose a profile that best fits your use case and target system (GUI desktop or headless server), and the setup tool installs only the servers in that profile.

The profile-driven configuration is generated automatically during `./setup.sh`, or on demand:

```bash
node scripts/generate-config.mjs <profile> --backend <cursor|claude|opencode|docker>
```

See [Profiles](profiles.md) for the list of profiles and how to create custom ones.

## Client Integration

### Cursor IDE Integration

#### Step 1: Install Cursor IDE
1. Download and install Cursor IDE from [cursor.sh](https://cursor.sh)
2. Ensure you have Node.js >= 18.0.0 installed

#### Step 2: Setup MCP Configuration

The MCP Ecosystem Suite uses a profile-based configuration. Create or update your `~/.cursor/mcp.json` file, ideally generated via `scripts/generate-config.mjs`:

```json
{
  "mcpServers": {
    "chaining": {
      "command": "node",
      "args": ["/absolute/path/to/mcp-ecosystem/chaining-mcp-server/dist/index.js"],
      "env": {
        "SEQUENTIAL_THINKING_AVAILABLE": "true",
        "AWESOME_COPILOT_ENABLED": "true",
        "RELIABILITY_MONITORING_ENABLED": "true",
        "GITHUB_TOKEN": "your-github-token"
      }
    },
    "filesystem": {
      "command": "node",
      "args": ["/absolute/path/to/mcp-ecosystem/filesystem-mcp-server/dist/index.js"]
    },
    "Project-Guardian": {
      "command": "node",
      "args": ["/absolute/path/to/mcp-ecosystem/Project-Guardian-mcp-server/dist/index.js"]
    },
    "terminal": {
      "command": "node",
      "args": ["/absolute/path/to/mcp-ecosystem/terminal-mcp-server/build/index.js"]
    },
    "research": {
      "command": "node",
      "args": ["/absolute/path/to/mcp-ecosystem/research-mcp-server/dist/index.js"],
      "env": {
        "GOOGLE_API_KEY": "your-google-api-key",
        "GOOGLE_CSE_ID": "your-google-cse-id"
      }
    },
    "browser-agent": {
      "command": "node",
      "args": ["/absolute/path/to/mcp-ecosystem/browser-agent/src/server.js"]
    },
    "the-designer": {
      "command": "node",
      "args": ["/absolute/path/to/mcp-ecosystem/the-designer/dist/index.js"]
    }
  }
}
```

This matches the `dev-workspace` profile. The authoritative copy is `config/cursor-example.json` — regenerate it (and any other profile) with:

```bash
node scripts/generate-config.mjs <profile> --backend cursor --root /absolute/path/to/mcp-ecosystem --out config/cursor-example.json
```

1. Replace `/absolute/path/to/mcp-ecosystem` with your actual path.
2. Configure the required API keys and tokens.

#### Step 3: Verify Installation
1. Restart Cursor IDE.
2. Open the MCP panel and verify the profile's servers are connected and show available tools.

### Claude Desktop Integration

#### Step 1: Locate Configuration File
- **macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Windows**: `%APPDATA%/Claude/claude_desktop_config.json`
- **Linux**: `~/.config/Claude/claude_desktop_config.json`

#### Step 2: Update Configuration

Add your profile's servers to the Claude Desktop config file. For the `dev-workspace` profile:

```json
{
  "mcpServers": {
    "chaining": {
      "command": "node",
      "args": ["/absolute/path/to/mcp-ecosystem/chaining-mcp-server/dist/index.js"],
      "env": {
        "SEQUENTIAL_THINKING_AVAILABLE": "true",
        "AWESOME_COPILOT_ENABLED": "true",
        "RELIABILITY_MONITORING_ENABLED": "true",
        "GITHUB_TOKEN": "your-github-token"
      }
    },
    "filesystem": {
      "command": "node",
      "args": ["/absolute/path/to/mcp-ecosystem/filesystem-mcp-server/dist/index.js"]
    },
    "Project-Guardian": {
      "command": "node",
      "args": ["/absolute/path/to/mcp-ecosystem/Project-Guardian-mcp-server/dist/index.js"]
    },
    "terminal": {
      "command": "node",
      "args": ["/absolute/path/to/mcp-ecosystem/terminal-mcp-server/build/index.js"]
    },
    "research": {
      "command": "node",
      "args": ["/absolute/path/to/mcp-ecosystem/research-mcp-server/dist/index.js"],
      "env": {
        "GOOGLE_API_KEY": "your-google-api-key",
        "GOOGLE_CSE_ID": "your-google-cse-id"
      }
    },
    "browser-agent": {
      "command": "node",
      "args": ["/absolute/path/to/mcp-ecosystem/browser-agent/src/server.js"]
    },
    "the-designer": {
      "command": "node",
      "args": ["/absolute/path/to/mcp-ecosystem/the-designer/dist/index.js"]
    }
  }
}
```

Or generate it from a profile:

```bash
node scripts/generate-config.mjs <profile> --backend claude --root /absolute/path/to/mcp-ecosystem --out config/claude-example.json
```

#### Step 3: Restart Claude Desktop
Restart Claude Desktop to load the new MCP server configuration.

### OpenCode Integration

#### Step 1: Locate Configuration File
- **Linux/macOS**: `~/.config/opencode/opencode.json`

#### Step 2: Update Configuration

OpenCode uses a distinct schema: servers live under `mcp` with `type: "local"`, a `command` array, and `environment` (not `env`). Generate it from a profile:

```bash
node scripts/generate-config.mjs <profile> --backend opencode --root /absolute/path/to/mcp-ecosystem --out /tmp/opencode-mcp.json
```

Example (`dev-workspace`):

```json
{
  "mcp": {
    "research": {
      "type": "local",
      "enabled": true,
      "command": ["node", "/absolute/path/to/mcp-ecosystem/research-mcp-server/dist/index.js"],
      "environment": {
        "GOOGLE_API_KEY": "your-google-api-key",
        "GOOGLE_CSE_ID": "your-google-cse-id"
      }
    }
  }
}
```

OpenCode merges config files, so add the `mcp` object to your `~/.config/opencode/opencode.json` without overwriting its `provider`/`model` settings. The authoritative `dev-workspace` example is at `config/opencode-example.json`.

#### Step 3: Restart OpenCode
Restart OpenCode to pick up the new MCP servers.

## API Keys and Tokens Setup

### GitHub Token (Required for Chaining MCP)
1. Go to [GitHub Settings > Developer settings > Personal access tokens](https://github.com/settings/tokens)
2. Generate a new token with `repo` and `read:org` permissions.

### Google API Keys (Required for Researcher MCP)
1. Go to [Google Cloud Console](https://console.cloud.google.com/) and enable the Custom Search JSON API.
2. Create an API Key.
3. Create a Custom Search Engine at [cse.google.com](https://cse.google.com) and get your Search Engine ID.

## Environment Variables

### Global Environment Variables
```bash
# Required for Chaining MCP
export GITHUB_TOKEN="your-github-token-here"

# Required for Researcher MCP
export GOOGLE_API_KEY="your-google-api-key-here"
export GOOGLE_SEARCH_ENGINE_ID="your-search-engine-id-here"
```

## Docker Deployment

### Prerequisites
- Docker >= 20.0.0
- Docker Compose >= 2.0.0

### Quick Start with Docker
1. Run the setup script and select "Docker Compose":
   ```bash
   ./setup.sh
   # Select option 4 (Docker Compose)
   ```
2. The setup tool writes a profile-specific compose file to `config/docker-compose.generated.yml`. Edit the `config/docker-compose.yml` template (or the generated file) with your API keys:
   ```bash
   nano config/docker-compose.yml
   ```
3. Start all services:
   ```bash
   cd config
   docker-compose -f docker-compose.generated.yml up -d
   ```

### Environment File (.env)
Create a `.env` file in the mcp-ecosystem root directory:

```bash
# GitHub Integration (Required for Chaining MCP Server)
GITHUB_TOKEN=your-github-token-here

# Google Search API (Required for Researcher MCP Server)
GOOGLE_API_KEY=your-google-api-key-here
GOOGLE_SEARCH_ENGINE_ID=your-search-engine-id-here

# Optional: Data persistence paths
DATA_PATH=./data
WORKSPACE_PATH=./workspace

# Optional: Server-specific settings
SEQUENTIAL_THINKING_AVAILABLE=true
AWESOME_COPILOT_ENABLED=true
RELIABILITY_MONITORING_ENABLED=true
```

## Workflow Integration

### Development Workflow
1. **Project Setup**: Use Project Guardian to initialize project knowledge.
2. **Code Analysis**: Use chaining server for comprehensive code analysis.
3. **Research**: Use Researcher MCP for unified web and knowledge base research.
4. **Browser Automation**: Use Browser Agent for interactive web tasks and verification.
5. **File Operations**: Use Filesystem MCP for project file management.
6. **System Tasks**: Use Terminal MCP for build and deployment tasks.

## Troubleshooting Integration Issues

### Common Issues

#### Server Won't Start
- Check Node.js version (>= 18.0.0)
- Verify all dependencies are installed (`npm install`)
- For Browser Agent, ensure Playwright dependencies are installed or use Docker.

#### Tools Not Available
- Verify MCP client configuration and absolute paths.
- Check environment variables are correctly set.
- Restart MCP client after any configuration changes.

## Support

For integration issues and questions:
- Check the [troubleshooting guide](./troubleshooting.md)
- Open issues in individual server repositories.
