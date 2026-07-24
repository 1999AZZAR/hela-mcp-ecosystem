# AZZAR MCP Server Suite

A collection of Model Context Protocol (MCP) servers developed by Azzar, designed to enhance AI assistant capabilities across development, research, project management, and system operations.

![Blotcat plugging MCP server cables into the central AI Hub](assets/blotcat-hero.jpg)

## Table of Contents

- [Overview](#overview)
  - [Core Servers](#core-servers)
- [Quick Start](#quick-start)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [MCP Client Options](#mcp-client-options)
  - [MCP Client Configuration](#mcp-client-configuration)
    - [For Cursor IDE](#for-cursor-ide)
    - [For Claude Desktop](#for-claude-desktop)
- [Server Details](#server-details)
  - [Chaining MCP Server](#chaining-mcp-server)
  - [Filesystem MCP Server](#filesystem-mcp-server)
  - [Project Guardian MCP Server](#project-guardian-mcp-server)
  - [Terminal MCP Server](#terminal-mcp-server)
  - [Researcher MCP Server](#researcher-mcp-server)
  - [Browser Agent MCP Server](#browser-agent-mcp-server)
- [Development](#development)
  - [Repository Structure](#repository-structure)
  - [Individual Server Development](#individual-server-development)
  - [Building All Servers](#building-all-servers)
- [Contributing](#contributing)
  - [For New Contributors](#for-new-contributors)
  - [Development Guidelines](#development-guidelines)
  - [Adding New Servers](#adding-new-servers)
- [Documentation](#documentation)
  - [Architecture Guide](docs/architecture.md)
  - [Integration Guide](docs/integration.md)
  - [Troubleshooting Guide](docs/troubleshooting.md)
- [License](#license)
- [Support](#support)
- [Updates](#updates)

## Overview

The AZZAR MCP Server Suite provides a collection of 6 specialized MCP servers that work together to create an effective AI assistant toolkit. Each server focuses on specific domains while maintaining interoperability through the MCP protocol.

### Core Servers

| Server                                                                                  | Purpose                        | Key Features                                                    |
| --------------------------------------------------------------------------------------- | ------------------------------ | --------------------------------------------------------------- |
| [**Chaining MCP**](https://github.com/1999AZZAR/chaining-mcp-server)                 | Intelligent tool orchestration | Route optimization, sequential thinking, workflow orchestration |
| [**Filesystem MCP**](https://github.com/1999AZZAR/filesystem-mcp-server)             | Advanced file operations       | File manipulation, directory operations, search capabilities    |
| [**Project Guardian MCP**](https://github.com/1999AZZAR/Project-Guardian-mcp-server) | Project memory management      | Knowledge graphs, task tracking, database operations            |
| [**Terminal MCP**](https://github.com/1999AZZAR/terminal-mcp-server)                 | System command execution       | Remote execution, session management, cross-platform support    |
| [**Researcher MCP**](https://github.com/1999AZZAR/research-assistant-mcp-server)    | Combined research platform     | Unified Google Search + Wikipedia with additional analysis tools |
| [**Browser Agent MCP**](https://github.com/1999AZZAR/browser-agent)             | Browser automation             | Playwright-based web interaction, scraping, automation          |

## Quick Start

### Prerequisites

- Node.js >= 18.0.0
- npm or yarn
- Git
- **For Docker option:** Docker and Docker Compose

### Installation

1. **Clone the AZZAR MCP Server Suite repository:**

   ```bash
   git clone https://github.com/1999AZZAR/mcp-ecosystem.git
   cd mcp-ecosystem
   ```

2. **Interactive Setup:**

   The setup script will guide you through the installation:

   ```bash
   ./setup.sh
   ```

   **Setup Process:**
   - Checks prerequisites (Node.js, Git)
   - Clones all 6 core MCP servers
   - Prompts for MCP client selection:
     - **Cursor IDE** - Automatic configuration
     - **Claude Desktop** - Automatic configuration
     - **Docker Compose** - Container setup

### MCP Client Configuration

#### For Cursor IDE

Add the following to your `mcp.json`:

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
    "terminal": {
      "command": "node",
      "args": ["/absolute/path/to/mcp-ecosystem/terminal-mcp-server/dist/index.js"]
    },
    "researcher": {
      "command": "node",
      "args": ["/absolute/path/to/mcp-ecosystem/research-assistant-mcp-server/dist/index.js"],
      "env": {
        "GOOGLE_API_KEY": "your-google-api-key-here",
        "GOOGLE_CSE_ID": "your-search-engine-id-here"
      }
    },
    "browser": {
      "command": "node",
      "args": ["/absolute/path/to/mcp-ecosystem/browser-agent/src/server.js"]
    }
  }
}
```

#### For Claude Desktop

Add the following to your `claude_desktop_config.json`:

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
    "terminal": {
      "command": "node",
      "args": ["/absolute/path/to/mcp-ecosystem/terminal-mcp-server/dist/index.js"]
    },
    "researcher": {
      "command": "node",
      "args": ["/absolute/path/to/mcp-ecosystem/research-assistant-mcp-server/dist/index.js"],
      "env": {
        "GOOGLE_API_KEY": "your-google-api-key-here",
        "GOOGLE_CSE_ID": "your-search-engine-id-here"
      }
    },
    "browser": {
      "command": "node",
      "args": ["/absolute/path/to/mcp-ecosystem/browser-agent/src/server.js"]
    }
  }
}
```

## Server Details

### Chaining MCP Server

**Repository:** [chaining-mcp-server](https://github.com/1999AZZAR/chaining-mcp-server)

Intelligent tool orchestration and workflow management server featuring:

- Server discovery and tool analysis
- Route optimization with complexity assessment
- Sequential thinking and brainstorming capabilities
- Multi-server workflow orchestration
- Time zone management and conversion
- Awesome Copilot integration for development guidance

### Filesystem MCP Server

**Repository:** [filesystem-mcp-server](https://github.com/1999AZZAR/filesystem-mcp-server)

Advanced file system operations server providing:

- File and directory operations
- Content reading with encoding support
- File search and filtering capabilities
- Archive creation and extraction
- File system monitoring and change detection

### Project Guardian MCP Server

**Repository:** [Project-Guardian-mcp-server](https://github.com/1999AZZAR/Project-Guardian-mcp-server)

Project memory and knowledge management server featuring:

- Knowledge graph for project entities and relationships
- Task tracking and progress management
- SQLite database operations
- Data import/export capabilities
- Project management workflows

### Terminal MCP Server

**Repository:** [terminal-mcp-server](https://github.com/1999AZZAR/terminal-mcp-server)

System command execution server with:

- Local and remote command execution
- SSH session management
- Cross-platform compatibility
- Command timeout and error handling
- Environment variable support

### Researcher MCP Server

**Repository:** [research-assistant-mcp-server](https://github.com/1999AZZAR/research-assistant-mcp-server)

Unified research platform combining Google Search and Wikipedia functionality:

- Combined Google Search and Wikipedia access
- Enhanced analysis tools (sentiment analysis, keyword extraction)
- Research workflow management
- Academic research capabilities
- Multi-source fact checking
- Research session management

### Browser Agent MCP Server

**Repository:** [browser-agent](https://github.com/1999AZZAR/browser-agent)

Browser automation and web interaction server featuring:

- Playwright-based browser automation
- Web scraping and content extraction
- Interactive web navigation
- Form filling and automated actions
- Visual verification and screenshots
- Session management for persistent browsing

## Development

### Repository Structure

```
mcp-ecosystem/
├── README.md                              # This file
├── CONTRIBUTING.md                        # Contribution guidelines
├── LICENSE                                # MIT License
├── setup.sh                               # Automated setup script
├── update.sh                              # Update all servers script
├── config/                                # Configuration examples
│   ├── cursor-example.json                # Cursor IDE configuration
│   ├── claude-example.json                # Claude Desktop configuration
│   └── docker-compose.yml                # Docker configuration
├── docs/                                  # Additional documentation
│   ├── architecture.md                   # System architecture overview
│   ├── integration.md                    # Comprehensive integration guides
│   └── troubleshooting.md                # Common issues and solutions
└── scripts/                               # Utility scripts
    ├── build-all.sh                      # Build all servers
    ├── test-all.sh                       # Run tests for all servers
    └── clean-all.sh                      # Clean build artifacts
```

### Individual Server Development

Each MCP server maintains its own repository for focused development:

1. **Independent Development:** Each server can be developed, tested, and deployed independently
2. **Version Management:** Individual versioning allows for flexible updates and rollbacks
3. **Specialization:** Focused repositories enable domain-specific optimizations
4. **Community Contributions:** Easier for contributors to focus on specific server improvements

### Building All Servers

```bash
# Build all servers
./scripts/build-all.sh

# Run tests for all servers
./scripts/test-all.sh

# Clean all build artifacts
./scripts/clean-all.sh
```

For more detailed information, see the [Development Documentation](docs/integration.md#development-integration).

## Contributing

We welcome contributions to the AZZAR MCP Server Suite! See [CONTRIBUTING.md](CONTRIBUTING.md) for detailed guidelines.

## Documentation

For comprehensive documentation, see:

- **[Architecture Guide](docs/architecture.md)** - System architecture, server components, and data flow diagrams
- **[Integration Guide](docs/integration.md)** - Detailed setup instructions for Cursor IDE, Claude Desktop, and Docker
- **[Troubleshooting Guide](docs/troubleshooting.md)** - Common issues and solutions

## License

The AZZAR MCP Server Suite is licensed under the MIT License. See [LICENSE](LICENSE) for details. Individual servers may have their own licenses - please check each repository for specific licensing information.

## Support

- **Issues:** Report bugs and request features in individual server repositories
- **Discussions:** Join community discussions in the respective GitHub repositories
- **Documentation:** 
  - Check individual server READMEs for detailed usage instructions
  - See [docs/integration.md](docs/integration.md) for integration help
  - See [docs/troubleshooting.md](docs/troubleshooting.md) for common issues

## Updates

To update all servers to their latest versions:

```bash
./update.sh
```

This will pull the latest changes from all server repositories and rebuild them.

---
