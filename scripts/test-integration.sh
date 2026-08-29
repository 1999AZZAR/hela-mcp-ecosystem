#!/bin/bash
# HeLa MCP Ecosystem — Master Integration Test Runner
set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
exec node "$SCRIPT_DIR/test-integration.mjs" "$@"
