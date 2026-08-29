#!/bin/bash

# update.sh - Update (pull + install + build) MCP servers for a scope.
# Usage: update.sh [--all | --profile NAME | KEY...] [--client CLIENT] [--test]

set -e
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
# shellcheck disable=SC1091
source "$SCRIPT_DIR/scripts/lib.sh"

RUN_TESTS=false
CLIENT_TARGET=""

usage() {
    cat <<EOF
Usage: $0 [OPTIONS] [KEY...]

Pull latest git commits, reinstall dependencies, and rebuild MCP servers.

Options:
  --all                Update all servers in the inventory
  --profile ID         Update only servers in the specified profile
  --client CLIENT      Regenerate client configuration after update
  --test               Run smoke test suite after updating
  -h, --help           Show this help
EOF
}

# Parse custom flags while leaving scope parsing to lib.sh
ARGS=()
while [[ $# -gt 0 ]]; do
    case $1 in
        --test) RUN_TESTS=true; shift ;;
        --client) CLIENT_TARGET="$2"; shift 2 ;;
        *) ARGS+=("$1"); shift ;;
    esac
done

process_scope_args "${ARGS[@]}"
resolve_scope
materialize_servers

[ "${#SERVERS[@]}" -eq 0 ] && { print_error "No servers selected."; exit 1; }
print_status "Updating ${#SERVERS[@]} server(s)..."

ok=0
failed=0
for entry in "${SERVERS[@]}"; do
    key="${entry%%:*}"
    dir="${entry##*:}"
    if [ ! -d "$dir" ]; then
        print_warning "$key ($dir) not found. Skipping."
        continue
    fi

    print_status "Updating $key ..."
    if ( cd "$dir" && ( git pull --quiet origin main 2>/dev/null || git pull --quiet origin master 2>/dev/null || true ) ); then
        build="$(inventory_field "$key" build)"
        if [ -f "$dir/package.json" ]; then
            ( cd "$dir" && npm install --silent )
            if [ -n "$build" ] && [ -n "$(node -e "try{const p=require('$dir/package.json');console.log(p.scripts?.['$build']||'')}catch(e){}")" ]; then
                print_status "Building $key ($build) ..."
                ( cd "$dir" && npm run "$build" ) || { print_error "Build failed for $key"; failed=$((failed + 1)); continue; }
            fi
        fi
        print_success "Updated $key"
        ok=$((ok + 1))
    else
        print_error "Git pull failed for $key"
        failed=$((failed + 1))
    fi
done

echo
print_success "Update complete: $ok succeeded, $failed failed."

if [ "$RUN_TESTS" = true ]; then
    echo
    print_status "Running test suite on updated servers..."
    "$SCRIPT_DIR/scripts/test-all.sh" "${ARGS[@]}"
fi

if [ -n "$CLIENT_TARGET" ]; then
    echo
    print_status "Refreshing MCP client configuration ($CLIENT_TARGET)..."
    "$SCRIPT_DIR/setup.sh" --reconfigure --client "$CLIENT_TARGET" --non-interactive ${PROFILE_ID:+--profile "$PROFILE_ID"}
fi
