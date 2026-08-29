#!/bin/bash

# build-all.sh - Build MCP servers for a scope (all inventory, a profile, or explicit keys).
# Usage: build-all.sh [--all | --profile ID | KEY...]

set -e
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
# shellcheck disable=SC1091
source "$SCRIPT_DIR/lib.sh"

usage() { echo "Usage: $0 [--all | --profile ID | KEY...]"; }

process_scope_args "$@"
resolve_scope
materialize_servers

[ "${#SERVERS[@]}" -eq 0 ] && { print_error "No servers selected."; exit 1; }
print_status "Building ${#SERVERS[@]} server(s)..."

ok=0
for entry in "${SERVERS[@]}"; do
    key="${entry%%:*}"; dir="${entry##*:}"
    if [ ! -d "$dir" ]; then print_warning "$key ($dir) not found. Skipping."; continue; fi
    if [ ! -f "$dir/package.json" ]; then print_warning "$key has no package.json. Skipping build."; continue; fi
    print_status "Building $key ..."
    if ( cd "$dir" && npm run build ); then
        print_success "Built $key"
        ok=$((ok + 1))
    else
        print_error "Build failed: $key"
    fi
done

echo
print_success "Build complete: $ok/${#SERVERS[@]}"
