#!/bin/bash
# HeLa MCP Ecosystem — Multi-Client Configuration Matrix Validator
set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
exec node "$SCRIPT_DIR/test-client-matrix.mjs" "$@"
