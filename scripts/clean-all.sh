#!/bin/bash

# clean-all.sh - Clean build artifacts for a scope of MCP servers.
# Usage: clean-all.sh [--all | --profile ID | KEY...] [--full]

set -e
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
# shellcheck disable=SC1091
source "$SCRIPT_DIR/lib.sh"

usage() { echo "Usage: $0 [--all | --profile ID | KEY...] [--full]"; }

FULL_CLEAN=false
process_scope_args "$@"
# --full flag
if [[ " $* " == *" --full "* ]]; then FULL_CLEAN=true; fi
resolve_scope
materialize_servers

[ "${#SERVERS[@]}" -eq 0 ] && { print_error "No servers selected."; exit 1; }
print_status "Cleaning ${#SERVERS[@]} server(s)${FULL_CLEAN:+ (full)}..."

ok=0
for entry in "${SERVERS[@]}"; do
    key="${entry%%:*}"; dir="${entry##*:}"
    [ -d "$dir/dist" ] && rm -rf "$dir/dist"
    [ -d "$dir/build" ] && rm -rf "$dir/build"
    [ -d "$dir/coverage" ] && rm -rf "$dir/coverage"
    [ -d "$dir/.tmp" ] && rm -rf "$dir/.tmp"
    [ "$FULL_CLEAN" = true ] && [ -d "$dir/node_modules" ] && rm -rf "$dir/node_modules"
    if [ -f "$dir/package.json" ] && grep -q '"clean"' "$dir/package.json"; then
        ( cd "$dir" && npm run clean --silent ) 2>/dev/null || true
    fi
    print_success "Cleaned $key"
    ok=$((ok + 1))
done

echo
print_success "Cleaning complete: $ok/${#SERVERS[@]}"
