#!/bin/bash

# update.sh - Update (pull + install + build) MCP servers for a scope.
# Usage: update.sh [--all | --profile NAME | KEY...]

set -e
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
# shellcheck disable=SC1091
source "$SCRIPT_DIR/lib.sh"

usage() { echo "Usage: $0 [--all | --profile ID | KEY...]"; }

process_scope_args "$@"
resolve_scope
materialize_servers

[ "${#SERVERS[@]}" -eq 0 ] && { print_error "No servers selected."; exit 1; }
print_status "Updating ${#SERVERS[@]} server(s)..."

for entry in "${SERVERS[@]}"; do
    key="${entry%%:*}"; dir="${entry##*:}"
    if [ ! -d "$dir" ]; then print_warning "$key ($dir) not found. Skipping."; continue; fi
    print_status "Updating $key ..."
    ( cd "$dir" && git pull --quiet origin main 2>/dev/null || git pull --quiet origin master 2>/dev/null || true )
    if [ -f "$dir/package.json" ]; then
        ( cd "$dir" && npm install --silent && npm run build )
    fi
    print_success "Updated $key"
done

echo
print_success "Update complete."
