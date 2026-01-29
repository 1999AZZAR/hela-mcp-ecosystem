# AZZAR MCP Server Suite

A collection of Model Context Protocol (MCP) servers developed by Azzar, designed to enhance AI assistant capabilities across development, research, project management, and system operations.

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
  - [Google Search MCP Server](#google-search-mcp-server)
  - [Project Guardian MCP Server](#project-guardian-mcp-server)
  - [Terminal MCP Server](#terminal-mcp-server)
  - [Wikipedia MCP Server](#wikipedia-mcp-server)
  - [Research MCP Server](#research-mcp-server)
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

The AZZAR MCP Server Suite provides a collection of specialized MCP servers that work together to create an effective AI assistant toolkit. Each server focuses on specific domains while maintaining interoperability through the MCP protocol.

### Core Servers

| Server                                                                                  | Purpose                        | Key Features                                                    |
| --------------------------------------------------------------------------------------- | ------------------------------ | --------------------------------------------------------------- |
| [**Chaining MCP**](https://github.com/1999AZZAR/chaining-mcp-server)                 | Intelligent tool orchestration | Route optimization, sequential thinking, workflow orchestration |
| [**Filesystem MCP**](https://github.com/1999AZZAR/filesystem-mcp-server)             | Advanced file operations       | File manipulation, directory operations, search capabilities    |
| [**Project Guardian MCP**](https://github.com/1999AZZAR/Project-Guardian-mcp-server) | Project memory management      | Knowledge graphs, task tracking, database operations            |
| [**Terminal MCP**](https://github.com/1999AZZAR/terminal-mcp-server)                 | System command execution       | Remote execution, session management, cross-platform support    |

### Research Servers (Choose One Option)

**Option 1: Individual Research Servers (6 total MCP servers)**
| Server                                                                                  | Purpose                        | Key Features                                                    |
| --------------------------------------------------------------------------------------- | ------------------------------ | --------------------------------------------------------------- |
| [**Google Search MCP**](https://github.com/1999AZZAR/Google-Search-MCP)       | Web research and analysis      | Search, content extraction, fact checking, research assistance  |
| [**Wikipedia MCP**](https://github.com/1999AZZAR/wikipedia-mcp-server)               | Knowledge base access          | Article search, content extraction, language support            |

**Option 2: Enhanced Research Server (5 total MCP servers)**
| Server                                                                                  | Purpose                        | Key Features                                                    |
| --------------------------------------------------------------------------------------- | ------------------------------ | --------------------------------------------------------------- |
| [**Research MCP**](https://github.com/1999AZZAR/research-assistant-mcp-server)                  | Combined research platform     | Unified Google Search + Wikipedia with additional analysis tools |

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
   - **Research MCP Selection:** Choose between individual research servers or combined research server
     - **Individual:** Google Search + Wikipedia servers (6 total MCP servers)
     - **Combined:** Enhanced research server with unified functionality (5 total MCP servers)
   - Prompts for MCP client selection:
     - **Cursor IDE** - Automatic configuration
     - **Claude Desktop** - Automatic configuration
     - **Docker Compose** - Container setup
     - **Skip** - Manual setup
   - Clones and builds selected MCP servers based on your choice
   - Automatically configures your selected client
   - Sets up environment variables and paths
   **What happens automatically:**
   - ✅ Clones core MCP server repositories (chaining, filesystem, project-guardian, terminal)
   - ✅ Clones research servers based on your selection:
     - **6-server option:** Clones google-search-mcp-server and wikipedia-mcp-server
     - **5-server option:** Clones research-assistant-mcp-server
   - ✅ Installs dependencies and builds all servers
   - ✅ **Interactively selects your MCP client**
   - ✅ **Automatically creates configuration files**
   - ✅ **Sets correct paths and environment variables**

3. **MCP Client Options:**

   Choose from:
   - **Cursor IDE** - Creates `~/.cursor/mcp.json` automatically
   - **Claude Desktop** - Sets up config in the correct OS-specific location
   - **Docker Compose** - Prepares containerized deployment with `.env` file
   - **Skip** - Manual configuration (see below)

   **Note:** Replace `/absolute/path/to/mcp-ecosystem` with the actual absolute path to your mcp-ecosystem directory.

   **Important:** The chaining MCP server requires a GitHub Personal Access Token for awesome-copilot integration. Get a token from [https://github.com/settings/tokens](https://github.com/settings/tokens) and replace `your-github-token-here` with your actual token.

   For detailed setup instructions, see the [Integration Guide](docs/integration.md).

### MCP Client Configuration

Choose your configuration based on your research server selection:

#### Option 1: 6-Server Stack (Individual Research Servers)

This configuration uses separate Google Search and Wikipedia servers, providing maximum flexibility and granular control.

##### For Cursor IDE (6-Server Configuration)

Add the following to `~/.cursor/mcp.json`:

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

**Note:** You can also merge [`config/cursor-example.json`](config/cursor-example.json) and [`config/cursor-individual-research.json`](config/cursor-individual-research.json) to get this configuration.

##### For Claude Desktop (6-Server Configuration)

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

**Note:** You can also merge [`config/claude-example.json`](config/claude-example.json) and [`config/claude-individual-research.json`](config/claude-individual-research.json) to get this configuration.

#### Option 2: 5-Server Stack (Combined Research Server)

This configuration uses a unified Research MCP server that combines Google Search and Wikipedia functionality, resulting in fewer servers to manage.

##### For Cursor IDE (5-Server Configuration)

Add the following to `~/.cursor/mcp.json`:

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

**Note:** You can also merge [`config/cursor-example.json`](config/cursor-example.json) and [`config/cursor-combined-research.json`](config/cursor-combined-research.json) to get this configuration.

##### For Claude Desktop (5-Server Configuration)

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

**Note:** You can also merge [`config/claude-example.json`](config/claude-example.json) and [`config/claude-combined-research.json`](config/claude-combined-research.json) to get this configuration.

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

### Google Search MCP Server

**Repository:** [Google-Search-MCP](https://github.com/1999AZZAR/Google-Search-MCP)

Web research and content analysis server offering:

- Google Custom Search integration
- Content extraction and summarization
- Fact checking with credibility analysis
- Academic research capabilities
- News monitoring and trend analysis
- Multi-site search functionality

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

### Wikipedia MCP Server

**Repository:** [wikipedia-mcp-server](https://github.com/1999AZZAR/wikipedia-mcp-server)

Knowledge base access server providing:

- Article search and content retrieval
- Multi-language support
- Category browsing and navigation
- Geographic search capabilities
- Content sections and metadata access

**Note**: Only included in Option 1 (6-server configuration).

### Research MCP Server

**Repository:** [research-assistant-mcp-server](https://github.com/1999AZZAR/research-assistant-mcp-server)

Unified research platform combining Google Search and Wikipedia functionality:

- Combined Google Search and Wikipedia access
- Enhanced analysis tools (sentiment analysis, keyword extraction)
- Research workflow management
- Academic research capabilities
- Multi-source fact checking
- Research session management

**Note**: Only included in Option 2 (5-server configuration). Replaces Google Search MCP and Wikipedia MCP servers.

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
│   ├── cursor-example.json                # Cursor IDE base configuration
│   ├── cursor-individual-research.json   # Individual research servers config
│   ├── cursor-combined-research.json     # Combined research server config
│   ├── claude-example.json                # Claude Desktop base configuration
│   ├── claude-individual-research.json   # Individual research servers config
│   ├── claude-combined-research.json     # Combined research server config
│   ├── docker-compose.yml                # Docker base configuration
│   ├── docker-compose-individual-research.yml  # Docker individual research config
│   └── docker-compose-combined-research.yml    # Docker combined research config
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

We welcome contributions to the AZZAR MCP Server Suite! See [CONTRIBUTING.md](CONTRIBUTING.md) for detailed guidelines. Here's how you can help:

### For New Contributors

1. **Choose a Server:** Pick a server that interests you from the list above
2. **Check Issues:** Look for open issues in the respective repository
3. **Fork and Clone:** Fork the repository and create a feature branch
4. **Make Changes:** Implement your improvements
5. **Test Thoroughly:** Run the test suite and ensure all tests pass
6. **Submit PR:** Create a pull request with a clear description

### Development Guidelines

- **Code Quality:** Follow TypeScript best practices and maintain test coverage
- **Documentation:** Update README and documentation for any new features
- **Compatibility:** Ensure MCP protocol compliance and cross-platform compatibility
- **Security:** Follow security best practices, especially for network operations

### Adding New Servers

To propose a new MCP server for the ecosystem:

1. **Create Repository:** Develop the server in its own repository
2. **Follow Standards:** Implement MCP protocol correctly with proper error handling
3. **Add Documentation:** Provide README and usage examples
4. **Submit Proposal:** Open an issue in this repository with server details

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
