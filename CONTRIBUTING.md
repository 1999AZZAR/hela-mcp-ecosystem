# Contributing to MCP Ecosystem Suite

![Blotcat carefully placing a new, glowing building block on top of an established, complex structure](assets/blotcat-contributing.jpg)
Thank you for your interest in contributing to the MCP Ecosystem Suite! This document provides guidelines and information for contributors.

## Table of Contents

- [Ways to Contribute](#ways-to-contribute)
  - [1. Code Contributions](#1-code-contributions)
  - [2. Documentation](#2-documentation)
  - [3. Testing](#3-testing)
- [Development Workflow](#development-workflow)
  - [For Existing Servers](#for-existing-servers)
  - [For New Servers](#for-new-servers)
- [Coding Standards](#coding-standards)
  - [General Guidelines](#general-guidelines)
  - [Code Style](#code-style)
  - [Commit Messages](#commit-messages)
- [Testing](#testing)
  - [Unit Tests](#unit-tests)
  - [Integration Tests](#integration-tests)
  - [Manual Testing](#manual-testing)
- [Documentation](#documentation)
  - [Code Documentation](#code-documentation)
  - [README Updates](#readme-updates)
- [Pull Request Process](#pull-request-process)
- [Review Process](#review-process)
- [Community Guidelines](#community-guidelines)
- [Getting Help](#getting-help)
- [Recognition](#recognition)

## Ways to Contribute

### 1. Code Contributions
- **Bug fixes**: Fix issues in existing MCP servers
- **New features**: Add capabilities to existing servers
- **New servers**: Propose and develop new MCP servers for the ecosystem
- **Documentation**: Improve documentation and examples
- **Tests**: Add or improve test coverage

### 2. Documentation
- **README updates**: Keep documentation current
- **Examples**: Provide usage examples and tutorials
- **Troubleshooting**: Document common issues and solutions

### 3. Testing
- **Bug reports**: Report issues with detailed reproduction steps
- **Compatibility testing**: Test with different MCP clients and environments

## Development Workflow

### For Existing Servers

1. **Choose a server** to contribute to from `config/inventory.json`
2. **Fork the repository** of the specific server you want to work on
3. **Create a feature branch**:
   ```bash
   git checkout -b feature/your-feature-name
   ```
4. **Make your changes** following the coding standards
5. **Add tests** if applicable
6. **Run the test suite** (narrow to one server with a scope flag):
   ```bash
   ./scripts/test-all.sh my-server-key
   npm test
   ```
7. **Build the project**:
   ```bash
   ./scripts/build-all.sh my-server-key
   npm run build
   ```
8. **Submit a pull request** with a clear description

### For New Servers

1. **Propose the server** by creating an issue in this repository describing:
   - Purpose and scope
   - Why it fits the ecosystem
   - GUI/device requirements (desktop-only vs. headless-friendly)
   - Technical approach
   - Integration points with existing servers

2. **Create the repository** following the established patterns:
   - Use TypeScript
   - Follow MCP protocol specifications
   - Include documentation
   - Provide test coverage
   - Use established project structure

3. **Wire it into the ecosystem**:
   - Add the server to `config/inventory.json` (repo URL, clone dir, entry file, build command, env vars, GUI/device flags). This makes it available to every profile and to the `--all` scope.
   - Add it to one or more `profiles` in `config/profiles.json` (use `system: "gui"` if it needs a display/device, otherwise `headless` or `any`).
   - Update the Server Details table and Core Servers list in `config/../README.md`.
   - Verify config rendering:
     ```bash
     node scripts/generate-config.mjs <profile> --backend print
     ```

## Coding Standards

### General Guidelines

- **TypeScript**: Use TypeScript for all new code
- **ESLint**: Follow the established linting rules
- **Testing**: Maintain or improve test coverage
- **Documentation**: Document all public APIs and complex logic
- **Error Handling**: Provide meaningful error messages
- **Security**: Follow security best practices

### Code Style

- Use 2 spaces for indentation
- Use single quotes for strings
- Use semicolons
- Follow existing naming conventions
- Keep functions small and focused
- Add comments for complex logic

### Commit Messages

Use clear, descriptive commit messages:

```
feat: add new tool for file analysis
fix: resolve memory leak in search operations
docs: update API documentation
test: add integration tests for new features
```

## Testing

### Unit Tests
- Test individual functions and modules
- Mock external dependencies
- Cover edge cases and error conditions

### Integration Tests
- Test server startup and basic functionality
- Test MCP protocol compliance
- Test integration with MCP clients

### Manual Testing
- Test with actual MCP clients (Cursor, Claude Desktop, OpenCode)
- Verify cross-platform compatibility
- Test error scenarios

## Documentation

### Code Documentation
- Use JSDoc comments for public APIs
- Document parameters, return values, and exceptions
- Provide usage examples where helpful

### README Updates
- Keep server READMEs current
- Update the main ecosystem README for new servers
- Maintain accurate configuration examples

## Pull Request Process

1. **Ensure CI passes** - All tests and linting must pass
2. **Update documentation** - README, API docs, examples
3. **Add tests** - For new features and bug fixes
4. **Squash commits** - Combine related commits into logical units
5. **Describe changes** - Provide clear PR description with:
   - What changed
   - Why it changed
   - How to test
   - Breaking changes (if any)

## Review Process

- All PRs require review from at least one maintainer
- Reviews focus on code quality, testing, and adherence to standards
- Constructive feedback is provided with suggestions for improvement
- Changes may be requested before merging

## Community Guidelines

- **Be respectful** - Treat all contributors with respect
- **Be constructive** - Provide helpful feedback and suggestions
- **Be patient** - Allow time for reviews and responses
- **Be collaborative** - Work together to improve the ecosystem

## Getting Help

- **Issues**: Use individual server repositories for bug reports and feature requests
- **Discussions**: Use GitHub Discussions for questions and general discussion
- **Documentation**: Check existing documentation first

## Recognition

Contributors are recognized through:
- GitHub contributor statistics
- Mention in release notes for significant contributions
- Credit in documentation for major features

Thank you for contributing to the MCP Ecosystem Suite! Your efforts help make AI agent harnesses more capable and useful.
