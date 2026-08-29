#!/bin/bash

# test-all.sh - Run tests for a scope of MCP servers.
# Usage: test-all.sh [--all | --profile NAME | KEY...]

set -e
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
# shellcheck disable=SC1091
source "$SCRIPT_DIR/lib.sh"

usage() { echo "Usage: $0 [--all | --profile ID | KEY...]"; }

process_scope_args "$@"
resolve_scope
materialize_servers

[ "${#SERVERS[@]}" -eq 0 ] && { print_error "No servers selected."; exit 1; }
print_status "Testing ${#SERVERS[@]} server(s)..."

ok=0
for entry in "${SERVERS[@]}"; do
    key="${entry%%:*}"; dir="${entry##*:}"
    if [ ! -d "$dir" ]; then print_warning "$key not found. Skipping."; continue; fi
    if [ ! -f "$dir/package.json" ] || ! grep -q '"test"' "$dir/package.json"; then
        print_warning "$key has no test script. Skipping."; continue
    fi
    print_status "Testing $key ..."
    if ( cd "$dir" && npm test ); then
        print_success "Tests passed: $key"
        ok=$((ok + 1))
    else
        print_error "Tests failed: $key"
    fi
done

echo
print_success "Testing complete: $ok passed."
