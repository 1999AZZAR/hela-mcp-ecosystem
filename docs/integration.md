# AZZAR MCP Server Suite Integration Guide

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
- [API Keys and Tokens Setup](#api-keys-and-tokens-setup)
  - [GitHub Token (Required for Chaining MCP)](#github-token-required-for-chaining-mcp)
  - [Google API Keys (Required for Google Search MCP)](#google-api-keys-required-for-google-search-mcp)
- [Environment Variables](#environment-variables)
  - [Global Environment Variables](#global-environment-variables)
  - [Server-Specific Variables](#server-specific-variables)
- [Docker Deployment](#docker-deployment)
  - [Prerequisites](#prerequisites)
  - [Quick Start with Docker](#quick-start-with-docker)
  - [Manual Docker Setup (Alternative)](#manual-docker-setup-alternative)
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

This guide provides detailed instructions for integrating the AZZAR MCP Server Suite into your development workflow and AI assistant setup.

## Client Integration

### Cursor IDE Integration

#### Step 1: Install Cursor IDE
1. Download and install Cursor IDE from [cursor.sh](https://cursor.sh)
2. Ensure you have Node.js >= 18.0.0 installed

#### Step 2: Setup MCP Configuration

Choose your configuration based on your research server selection:

##### Option 1: 6-Server Stack (Individual Research Servers)

This configuration uses separate Google Search and Wikipedia servers, providing maximum flexibility and granular control.

1. Create or update your `~/.cursor/mcp.json` file:

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
        "GITHUB_TOKEN": "your-github-token-here"
      }
    },
    "filesystem": {
      "command": "node",
      "args": ["/absolute/path/to/mcp-ecosystem/filesystem-mcp-server/dist/index.js"]
    },
    "google-search": {
      "command": "node",
      "args": ["/absolute/path/to/mcp-ecosystem/google-search-mcp-server/dist/index.js"],
      "env": {
        "GOOGLE_API_KEY": "your-google-api-key-here",
        "GOOGLE_SEARCH_ENGINE_ID": "your-search-engine-id-here"
      }
    },
    "project-guardian": {
      "command": "node",
      "args": ["/absolute/path/to/mcp-ecosystem/Project-Guardian-mcp-server/dist/index.js"]
    },
    "terminal": {
      "command": "node",
      "args": ["/absolute/path/to/mcp-ecosystem/terminal-mcp-server/dist/index.js"]
    },
    "wikipedia": {
      "command": "node",
      "args": ["/absolute/path/to/mcp-ecosystem/wikipedia-mcp-server/dist/index.js"]
    }
  }
}
```

**Note:** You can also merge `config/cursor-example.json` and `config/cursor-individual-research.json` to get this configuration.

##### Option 2: 5-Server Stack (Combined Research Server)

This configuration uses a unified Research MCP server that combines Google Search and Wikipedia functionality, resulting in fewer servers to manage.

1. Create or update your `~/.cursor/mcp.json` file:

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
        "GITHUB_TOKEN": "your-github-token-here"
      }
    },
    "filesystem": {
      "command": "node",
      "args": ["/absolute/path/to/mcp-ecosystem/filesystem-mcp-server/dist/index.js"]
    },
    "project-guardian": {
      "command": "node",
      "args": ["/absolute/path/to/mcp-ecosystem/Project-Guardian-mcp-server/dist/index.js"]
    },
    "research": {
      "command": "node",
      "args": ["/absolute/path/to/mcp-ecosystem/research-assistant-mcp-server/dist/index.js"],
      "env": {
        "GOOGLE_API_KEY": "your-google-api-key-here",
        "GOOGLE_CSE_ID": "your-search-engine-id-here"
      }
    },
    "terminal": {
      "command": "node",
      "args": ["/absolute/path/to/mcp-ecosystem/terminal-mcp-server/dist/index.js"]
    }
  }
}
```

**Note:** You can also merge `config/cursor-example.json` and `config/cursor-combined-research.json` to get this configuration.

2. Replace `/absolute/path/to/mcp-ecosystem` with your actual path
3. Configure the required API keys and tokens

#### Step 3: Verify Installation
1. Restart Cursor IDE
2. Open the MCP panel (usually accessible via command palette)
3. Verify servers are connected and show available tools:
   - **6-server option:** Verify all 6 servers (chaining, filesystem, google-search, project-guardian, terminal, wikipedia)
   - **5-server option:** Verify all 5 servers (chaining, filesystem, project-guardian, research, terminal)

### Claude Desktop Integration

#### Step 1: Locate Configuration File
- **macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Windows**: `%APPDATA%/Claude/claude_desktop_config.json`
- **Linux**: `~/.config/Claude/claude_desktop_config.json`

#### Step 2: Update Configuration

Choose your configuration based on your research server selection:

##### Option 1: 6-Server Stack (Individual Research Servers)

This configuration uses separate Google Search and Wikipedia servers, providing maximum flexibility and granular control.

Add the following configuration to your Claude Desktop config file:

```json
{
  "mcpServers": {
    "chaining": {
      "command": "node",
      "args": ["/absolute/path/to/mcp-ecosystem/chaining-mcp-server/dist/index.js"],
      "env": {
        "SEQUENTIAL_THINKING_AVAILABLE": "true",
        "AWESOME_COPILOT_ENABLED": "true",
        "GITHUB_TOKEN": "your-github-token-here"
      }
    },
    "filesystem": {
      "command": "node",
      "args": ["/absolute/path/to/mcp-ecosystem/filesystem-mcp-server/dist/index.js"]
    },
    "google-search": {
      "command": "node",
      "args": ["/absolute/path/to/mcp-ecosystem/google-search-mcp-server/dist/index.js"],
      "env": {
        "GOOGLE_API_KEY": "your-google-api-key-here",
        "GOOGLE_SEARCH_ENGINE_ID": "your-search-engine-id-here"
      }
    },
    "project-guardian": {
      "command": "node",
      "args": ["/absolute/path/to/mcp-ecosystem/Project-Guardian-mcp-server/dist/index.js"]
    },
    "terminal": {
      "command": "node",
      "args": ["/absolute/path/to/mcp-ecosystem/terminal-mcp-server/dist/index.js"]
    },
    "wikipedia": {
      "command": "node",
      "args": ["/absolute/path/to/mcp-ecosystem/wikipedia-mcp-server/dist/index.js"]
    }
  }
}
```

**Note:** You can also merge `config/claude-example.json` and `config/claude-individual-research.json` to get this configuration.

##### Option 2: 5-Server Stack (Combined Research Server)

This configuration uses a unified Research MCP server that combines Google Search and Wikipedia functionality, resulting in fewer servers to manage.

Add the following configuration to your Claude Desktop config file:

```json
{
  "mcpServers": {
    "chaining": {
      "command": "node",
      "args": ["/absolute/path/to/mcp-ecosystem/chaining-mcp-server/dist/index.js"],
      "env": {
        "SEQUENTIAL_THINKING_AVAILABLE": "true",
        "AWESOME_COPILOT_ENABLED": "true",
        "GITHUB_TOKEN": "your-github-token-here"
      }
    },
    "filesystem": {
      "command": "node",
      "args": ["/absolute/path/to/mcp-ecosystem/filesystem-mcp-server/dist/index.js"]
    },
    "project-guardian": {
      "command": "node",
      "args": ["/absolute/path/to/mcp-ecosystem/Project-Guardian-mcp-server/dist/index.js"]
    },
    "research": {
      "command": "node",
      "args": ["/absolute/path/to/mcp-ecosystem/research-assistant-mcp-server/dist/index.js"],
      "env": {
        "GOOGLE_API_KEY": "your-google-api-key-here",
        "GOOGLE_CSE_ID": "your-search-engine-id-here"
      }
    },
    "terminal": {
      "command": "node",
      "args": ["/absolute/path/to/mcp-ecosystem/terminal-mcp-server/dist/index.js"]
    }
  }
}
```

**Note:** You can also merge `config/claude-example.json` and `config/claude-combined-research.json` to get this configuration.

#### Step 3: Restart Claude Desktop
Restart Claude Desktop to load the new MCP server configuration.

## API Keys and Tokens Setup

### GitHub Token (Required for Chaining MCP)
1. Go to [GitHub Settings > Developer settings > Personal access tokens](https://github.com/settings/tokens)
2. Generate a new token with the following permissions:
   - `repo` (Full control of private repositories)
   - `read:org` (Read org and team membership)
3. Copy the token and set it in your MCP configuration

### Google API Keys (Required for Google Search MCP)
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable the Custom Search JSON API
4. Create credentials (API Key)
5. Create a Custom Search Engine at [cse.google.com](https://cse.google.com)
6. Get your Search Engine ID from the control panel

## Environment Variables

### Global Environment Variables
```bash
# Required for Chaining MCP
export GITHUB_TOKEN="your-github-token-here"

# Required for Google Search MCP
export GOOGLE_API_KEY="your-google-api-key-here"
export GOOGLE_SEARCH_ENGINE_ID="your-search-engine-id-here"
```

### Server-Specific Variables
```bash
# Chaining MCP Server
export SEQUENTIAL_THINKING_AVAILABLE="true"
export AWESOME_COPILOT_ENABLED="true"
export RELIABILITY_MONITORING_ENABLED="true"

# Add to your shell profile (.bashrc, .zshrc, etc.)
echo 'export GITHUB_TOKEN="your-token-here"' >> ~/.bashrc
echo 'export GOOGLE_API_KEY="your-key-here"' >> ~/.bashrc
echo 'export GOOGLE_SEARCH_ENGINE_ID="your-id-here"' >> ~/.bashrc
```

## Docker Deployment

### Prerequisites
- Docker >= 20.0.0
- Docker Compose >= 2.0.0

### Quick Start with Docker
1. Run the setup script and select "Docker Compose":
   ```bash
   ./setup.sh
   # Select option 3 (Docker Compose)
   ```
2. Edit the generated .env file with your API keys:
   ```bash
   nano .env
   ```
3. Start all services:
   ```bash
   cd config
   docker-compose up -d
   ```

### Manual Docker Setup (Alternative)
If you prefer manual setup:
1. Copy and update the environment file:
   ```bash
   cp .env.example .env
   # Edit .env with your API keys and tokens
   ```
2. Start all services:
   ```bash
   cd config
   docker-compose up -d
   ```

### Environment File (.env)
Create a `.env` file in the mcp-ecosystem root directory:

```bash
# GitHub Integration (Required for Chaining MCP Server)
GITHUB_TOKEN=your-github-token-here

# Google Search API (Required for Google Search MCP Server)
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

You can also create a `.env.example` file as a template and copy it to `.env`.

## Development Integration

### VS Code Integration
While VS Code doesn't have native MCP support, you can use extensions or create custom integrations:

1. Install VS Code extensions for MCP support
2. Configure the servers using the same JSON format
3. Use VS Code tasks to manage MCP servers

### Custom Client Integration
If you're building a custom MCP client:

```typescript
import { Client } from '@modelcontextprotocol/sdk/client/index.js';

const client = new Client({
  name: 'my-custom-client',
  version: '1.0.0'
});

// Connect to MCP servers
await client.connect();

// List available tools
const tools = await client.request({
  method: 'tools/list'
});

// Call a tool
const result = await client.request({
  method: 'tools/call',
  params: {
    name: 'search_instructions',
    arguments: { keywords: 'mcp server' }
  }
});
```

## Workflow Integration

### Development Workflow
1. **Project Setup**: Use Project Guardian to initialize project knowledge
2. **Code Analysis**: Use chaining server for comprehensive code analysis
3. **Documentation**: Use Wikipedia MCP for technical reference
4. **Research**: Use Google Search MCP for external research
5. **File Operations**: Use Filesystem MCP for project file management
6. **System Tasks**: Use Terminal MCP for build and deployment tasks

### CI/CD Integration
```yaml
# .github/workflows/mcp-integration.yml
name: MCP Integration Tests

on: [push, pull_request]

jobs:
  test-mcp-servers:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - name: Setup MCP Servers
        run: ./setup.sh
      - name: Build All Servers
        run: ./scripts/build-all.sh
      - name: Run Tests
        run: ./scripts/test-all.sh
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          GOOGLE_API_KEY: ${{ secrets.GOOGLE_API_KEY }}
          GOOGLE_SEARCH_ENGINE_ID: ${{ secrets.GOOGLE_SEARCH_ENGINE_ID }}
```

## Troubleshooting Integration Issues

### Common Issues

#### Server Won't Start
- Check Node.js version (>= 18.0.0)
- Verify all dependencies are installed (`npm install`)
- Check server logs for specific errors
- Ensure ports are not already in use

#### Tools Not Available
- Verify MCP client configuration
- Check environment variables are set
- Restart MCP client after configuration changes
- Check server logs for tool registration errors

#### API Key Issues
- Verify API keys are correctly set
- Check API key permissions and quotas
- Ensure environment variables are exported
- Test API keys independently

#### Network Issues
- Check firewall settings
- Verify DNS resolution
- Test connectivity to external services
- Check proxy configuration if applicable

### Debug Mode
Enable debug logging for troubleshooting:

```bash
# For individual servers
DEBUG=mcp:* node dist/index.js

# For chaining server with verbose logging
DEBUG=mcp:* VERBOSE=1 node dist/index.js
```

## Advanced Integration

### Custom Server Development
When adding new MCP servers to the ecosystem:

1. Follow the MCP protocol specification
2. Implement proper error handling
3. Add comprehensive tests
4. Update documentation
5. Submit pull request to the ecosystem

### Performance Optimization
- Use connection pooling for database operations
- Implement caching for frequently accessed data
- Monitor resource usage and scale accordingly
- Use async operations for I/O intensive tasks

### Security Considerations
- Store API keys securely (never in code)
- Use HTTPS for external API calls
- Implement rate limiting for API usage
- Regularly rotate API keys and tokens
- Monitor for security vulnerabilities

## Support

For integration issues and questions:
- Check the [troubleshooting guide](./troubleshooting.md)
- Open issues in individual server repositories
- Join community discussions on GitHub
- Check server-specific documentation
