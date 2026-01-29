# Troubleshooting Guide

## Table of Contents

- [Setup Issues](#setup-issues)
  - [Git Clone Failures](#git-clone-failures)
  - [Node.js Version Issues](#nodejs-version-issues)
  - [Permission Errors](#permission-errors)
- [Build Issues](#build-issues)
  - [Build Failures](#build-failures)
  - [Missing Build Tools](#missing-build-tools)
- [Configuration Issues](#configuration-issues)
  - [MCP Client Configuration](#mcp-client-configuration)
  - [Environment Variables](#environment-variables)
- [Runtime Issues](#runtime-issues)
  - [Server Won't Start](#server-wont-start)
  - [Tool Calls Fail](#tool-calls-fail)
  - [Performance Issues](#performance-issues)
- [Network Issues](#network-issues)
  - [External API Access](#external-api-access)
  - [SSH Connection Issues (Terminal MCP)](#ssh-connection-issues-terminal-mcp)
- [Database Issues (Project Guardian)](#database-issues-project-guardian)
  - [Database Corruption](#database-corruption)
  - [Permission Issues](#permission-issues)
- [Update Issues](#update-issues)
  - [Update Script Failures](#update-script-failures)
- [Development Issues](#development-issues)
  - [Testing Failures](#testing-failures)
  - [Linting Errors](#linting-errors)
- [Getting Help](#getting-help)
  - [Debug Information](#debug-information)
  - [Community Support](#community-support)
  - [Emergency Recovery](#emergency-recovery)

This guide helps you resolve common issues when setting up and using the AZZAR MCP Server Suite.

## Setup Issues

### Git Clone Failures

**Problem**: `git clone` commands fail during setup.

**Solutions**:
1. Check internet connection
2. Verify repository URLs are accessible
3. Ensure you have proper SSH keys for private repositories
4. Try using HTTPS instead of SSH:
   ```bash
   git config --global url."https://github.com/".insteadOf git@github.com:
   ```

### Node.js Version Issues

**Problem**: "Node.js version 18.0.0 or higher is required"

**Solutions**:
1. Check your current Node.js version:
   ```bash
   node --version
   ```
2. Install/update Node.js using your package manager:
   ```bash
   # Ubuntu/Debian
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs

   # macOS with Homebrew
   brew install node

   # Or use nvm (recommended)
   curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
   nvm install 18
   nvm use 18
   ```

### Permission Errors

**Problem**: Permission denied when running setup scripts.

**Solutions**:
1. Make scripts executable:
   ```bash
   chmod +x setup.sh update.sh scripts/*.sh
   ```
2. Check directory permissions:
   ```bash
   ls -la
   ```
3. Ensure you have write permissions in the target directory

## Build Issues

### Build Failures

**Problem**: `npm run build` fails for individual servers.

**Common Causes**:
1. Missing dependencies
2. TypeScript compilation errors
3. Outdated packages

**Solutions**:
1. Clean and reinstall dependencies:
   ```bash
   cd <server-name>
   rm -rf node_modules package-lock.json
   npm install
   npm run build
   ```

2. Check for TypeScript errors:
   ```bash
   npx tsc --noEmit
   ```

3. Update dependencies:
   ```bash
   npm update
   ```

### Missing Build Tools

**Problem**: Build tools not found.

**Solutions**:
1. Install TypeScript globally:
   ```bash
   npm install -g typescript
   ```

2. Install build tools for your platform

## Configuration Issues

### MCP Client Configuration

**Problem**: MCP client doesn't recognize servers.

**Solutions**:

1. **Verify configuration file location**:
   - Cursor IDE: `~/.cursor/mcp.json`
   - Claude Desktop: Check app settings for configuration file location

2. **Validate JSON syntax**:
   ```bash
   cat ~/.cursor/mcp.json | python3 -m json.tool
   ```

3. **Check absolute paths**:
   - Ensure all paths in `args` are absolute paths
   - Example: `/home/user/mcp-ecosystem/chaining-mcp-server/dist/index.js`

4. **Restart MCP client** after configuration changes

### Environment Variables

**Problem**: Servers fail due to missing environment variables.

**Required Variables**:
- **Google Search MCP**: `GOOGLE_API_KEY`, `GOOGLE_SEARCH_ENGINE_ID`
- **Chaining MCP**: `SEQUENTIAL_THINKING_AVAILABLE=true`

**Solutions**:
1. Add variables to MCP configuration:
   ```json
   {
     "mcpServers": {
       "google-search": {
         "command": "node",
         "args": ["/path/to/google-search-mcp-server/dist/index.js"],
         "env": {
           "GOOGLE_API_KEY": "your-api-key",
           "GOOGLE_SEARCH_ENGINE_ID": "your-search-engine-id"
         }
       }
     }
   }
   ```

## Runtime Issues

### Server Won't Start

**Problem**: MCP server fails to start.

**Debugging Steps**:
1. Test server manually:
   ```bash
   cd <server-name>
   node dist/index.js
   ```

2. Check for error messages in terminal

3. Verify Node.js compatibility:
   ```bash
   cd <server-name>
   node --version
   cat package.json | grep '"node"'
   ```

### Tool Calls Fail

**Problem**: Tool calls return errors.

**Common Issues**:
1. **Network connectivity** for external services
2. **API keys** for services like Google Search
3. **File permissions** for filesystem operations
4. **Database issues** for Project Guardian

**Debugging**:
1. Check server logs (if available)
2. Test individual tools manually
3. Verify API keys and permissions

### Performance Issues

**Problem**: Slow response times or high resource usage.

**Solutions**:
1. **Check system resources**:
   ```bash
   top
   df -h
   free -h
   ```

2. **Optimize configuration**:
   - Reduce concurrent operations
   - Enable caching where available
   - Monitor resource usage

3. **Database optimization** (for Project Guardian):
   ```bash
   cd Project-Guardian-mcp-server
   sqlite3 memory.db "VACUUM;"
   sqlite3 memory.db "ANALYZE;"
   ```

## Network Issues

### External API Access

**Problem**: External services (Google Search, Wikipedia, or Research MCP) fail.

**Note**: If you're using the 5-server stack with the combined Research MCP server, replace references to "Google Search" and "Wikipedia" with "Research MCP" in the troubleshooting steps below.

**Solutions**:
1. Check internet connectivity:
   ```bash
   ping google.com
   ```

2. Verify API keys are valid and have proper permissions

3. Check rate limits and quotas for external services

4. Configure proxy settings if needed:
   ```bash
   export HTTP_PROXY=http://proxy.company.com:8080
   export HTTPS_PROXY=http://proxy.company.com:8080
   ```

### SSH Connection Issues (Terminal MCP)

**Problem**: Remote command execution fails.

**Solutions**:
1. Verify SSH key configuration:
   ```bash
   ssh-keygen -t rsa -b 4096
   ssh-copy-id user@remote-host
   ```

2. Test SSH connection manually:
   ```bash
   ssh user@remote-host
   ```

3. Check SSH configuration:
   ```bash
   cat ~/.ssh/config
   ```

## Database Issues (Project Guardian)

### Database Corruption

**Problem**: SQLite database corruption errors.

**Recovery Steps**:
1. Create backup:
   ```bash
   cp memory.db memory.db.backup
   ```

2. Repair database:
   ```bash
   sqlite3 memory.db "PRAGMA integrity_check;"
   sqlite3 memory.db "REAGMA foreign_key_check;"
   ```

3. Reinitialize if needed:
   ```bash
   cd Project-Guardian-mcp-server
   rm memory.db
   npm run build
   node dist/index.js # This will recreate the database
   ```

### Permission Issues

**Problem**: Cannot access database file.

**Solutions**:
1. Check file permissions:
   ```bash
   ls -la memory.db
   ```

2. Fix permissions:
   ```bash
   chmod 644 memory.db
   ```

3. Check directory permissions:
   ```bash
   ls -ld Project-Guardian-mcp-server/
   ```

## Update Issues

### Update Script Failures

**Problem**: `./update.sh` fails to update servers.

**Solutions**:
1. Check git repository status:
   ```bash
   cd <server-name>
   git status
   git remote -v
   ```

2. Manually update if needed:
   ```bash
   cd <server-name>
   git pull origin main
   npm install
   npm run build
   ```

## Development Issues

### Testing Failures

**Problem**: `npm test` fails.

**Solutions**:
1. Install test dependencies:
   ```bash
   npm install
   ```

2. Check test configuration:
   ```bash
   cat jest.config.js
   ```

3. Run tests with verbose output:
   ```bash
   npm test -- --verbose
   ```

### Linting Errors

**Problem**: Code quality checks fail.

**Solutions**:
1. Run linter manually:
   ```bash
   npx eslint src/ --ext .ts
   ```

2. Auto-fix issues:
   ```bash
   npx eslint src/ --ext .ts --fix
   ```

3. Check TypeScript errors:
   ```bash
   npx tsc --noEmit
   ```

## Getting Help

### Debug Information

When reporting issues, please include:

1. **System Information**:
   ```bash
   uname -a
   node --version
   npm --version
   ```

2. **Error Messages**: Full error output

3. **Configuration**: Relevant MCP configuration (with sensitive data removed)

4. **Steps to Reproduce**: Detailed reproduction steps

### Community Support

- Check individual server repositories for known issues
- Review documentation in each server repository
- Create issues in the appropriate repository with detailed information

### Emergency Recovery

If all else fails, you can:

1. **Clean reinstall**:
   ```bash
   cd ..
   rm -rf mcp-ecosystem
   git clone <repository-url> mcp-ecosystem
   cd mcp-ecosystem
   ./setup.sh
   ```

2. **Individual server reset**:
   ```bash
   cd <problematic-server>
   rm -rf node_modules dist
   npm install
   npm run build
   ```

Remember to backup important data (like Project Guardian's memory.db) before performing destructive operations.
