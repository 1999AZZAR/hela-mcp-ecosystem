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
1. Check internet connection.
2. Verify repository URLs are accessible.
3. Ensure you have proper SSH keys or use HTTPS.

### Node.js Version Issues

**Problem**: "Node.js version 18.0.0 or higher is required"

**Solutions**:
1. Check your current Node.js version with `node --version`.
2. Install/update Node.js using your package manager or `nvm`.

### Permission Errors

**Problem**: Permission denied when running setup scripts.

**Solutions**:
1. Make scripts executable: `chmod +x setup.sh update.sh scripts/*.sh`.
2. Ensure you have write permissions in the target directory.

## Build Issues

### Build Failures

**Problem**: `npm run build` fails for individual servers.

**Solutions**:
1. Clean and reinstall dependencies:
   ```bash
   cd <server-name>
   rm -rf node_modules package-lock.json
   npm install
   npm run build
   ```
2. Check for TypeScript errors with `npx tsc --noEmit`.

## Configuration Issues

### MCP Client Configuration

**Problem**: MCP client doesn't recognize servers.

**Solutions**:
1. **Verify configuration file location**:
   - Cursor IDE: `~/.cursor/mcp.json`
   - Claude Desktop: Check app settings.
2. **Validate JSON syntax**: `cat ~/.cursor/mcp.json | python3 -m json.tool`.
3. **Check absolute paths**: Ensure all paths in `args` are absolute.
4. **Restart MCP client** after any changes.

### Environment Variables

**Problem**: Servers fail due to missing environment variables.

**Solutions**:
1. Add variables to MCP configuration `env` block.
2. **Required**: `GITHUB_TOKEN` (Chaining), `GOOGLE_API_KEY` & `GOOGLE_SEARCH_ENGINE_ID` (Researcher).

## Runtime Issues

### Server Won't Start

**Problem**: MCP server fails to start.

**Debugging Steps**:
1. Test server manually: `cd <server-name> && node dist/index.js` (or `node src/server.js` for Browser Agent).
2. For Browser Agent, ensure Playwright is initialized: `npx playwright install`.

### Tool Calls Fail

**Problem**: Tool calls return errors.

**Common Issues**:
1. **Network connectivity** for external services.
2. **API keys** for Researcher MCP.
3. **File permissions** for Filesystem operations.

## Network Issues

### External API Access

**Problem**: External services (Researcher MCP) fail.

**Solutions**:
1. Check internet connectivity.
2. Verify API keys are valid and quotas aren't exceeded.
3. Researcher MCP uses `GOOGLE_API_KEY` and `GOOGLE_CSE_ID` (mapped from `GOOGLE_SEARCH_ENGINE_ID` in Docker).

### SSH Connection Issues (Terminal MCP)

**Problem**: Remote command execution fails.

**Solutions**:
1. Verify SSH key configuration and test manual connection.

## Database Issues (Project Guardian)

### Database Corruption

**Problem**: SQLite database corruption errors.

**Recovery**:
1. Backup `memory.db`.
2. Repair or reinitialize: `rm memory.db && node dist/index.js`.

## Getting Help

### Debug Information

Include system info, full error messages, and steps to reproduce when seeking support.

### Community Support

- Open issues in individual server repositories.
- Review READMEs and documentation in each repository.
