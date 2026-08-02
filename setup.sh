#!/bin/bash

# mcp-ecosystem Setup Script
# Profile-driven installer. Picks a target system + profile (from config/profiles.json),
# clones/installs/builds the servers in that profile (via config/inventory.json),
# and generates the MCP client configuration.

set -e

# shellcheck source=scripts/lib.sh
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
# shellcheck disable=SC1091
source "$SCRIPT_DIR/scripts/lib.sh"

# Default selection (overridable via env/flags)
TARGET_SYSTEM="${TARGET_SYSTEM:-any}"   # gui | headless | any
MCP_CLIENT="${MCP_CLIENT:-}"
PROFILE_ID="${PROFILE_ID:-}"
NON_INTERACTIVE=false

usage() {
    cat <<EOF
Usage: $0 [OPTIONS]

Profile-driven installer for the MCP server suite.

Options:
  --profile ID         Select a profile (see config/profiles.json) instead of prompting
  --system SYS         Filter profiles by target: gui | headless | any
  --client C           Backend to configure: cursor | claude | opencode | docker | skip
  --non-interactive     Skip client-generation prompt; just setup servers
  -h, --help           Show this help
EOF
}

parse_args() {
    while [[ $# -gt 0 ]]; do
        case $1 in
            --help|-h) usage; exit 0 ;;
            --profile) PROFILE_ID="$2"; shift 2 ;;
            --system)  TARGET_SYSTEM="$2"; shift 2 ;;
            --client)  MCP_CLIENT="$2"; shift 2 ;;
            --non-interactive)
      MCP_CLIENT="skip"
      shift
      ;;
            *) echo "Unknown option: $1"; usage; exit 1 ;;
        esac
    done
}

check_prereqs() {
    if ! command -v git >/dev/null; then print_error "git is required."; exit 1; fi
    if ! command -v node >/dev/null; then print_error "Node.js is required."; exit 1; fi
    NODE_MAJOR="$(node --version | sed 's/v//' | cut -d. -f1)"
    if [ "$NODE_MAJOR" -lt 18 ]; then
        print_error "Node.js 18+ required (found $(node --version))."
        exit 1
    fi
    print_success "Prerequisites OK (Node.js $(node --version))"
}

setup_server() {
    local key="$1"
    local dir repo
    dir="$(inventory_field "$key" dir)"
    repo="$(inventory_field "$key" repo)"
    build="$(inventory_field "$key" build)"

    print_status "Setting up $key ..."
    if [ -d "$dir" ]; then
        print_warning "$dir exists. Pulling latest..."
        if ( cd "$dir" && git pull --quiet origin main 2>/dev/null || git pull --quiet origin master 2>/dev/null || true ); then :; fi
    else
        print_status "Cloning $dir ..."
        git clone --quiet "$repo" "$dir" || { print_error "Failed to clone $repo"; return 1; }
    fi

    cd "$dir"
    if [ -f "package.json" ]; then
        if [ ! -d node_modules ]; then
            print_status "Installing dependencies for $dir ..."
            npm install --silent
        fi
        if [ -n "$build" ] && [ -n "$(node -e "try{const p=require('./package.json');console.log(p.scripts?.['$build']||'')}catch(e){}")" ]; then
            print_status "Building $dir ($build) ..."
            npm run "$build" || { print_error "Build failed for $dir"; cd ..; return 1; }
        fi
    else
        print_warning "No package.json in $dir; skipping npm."
    fi
    cd "$MCP_ECOSYSTEM_ROOT"
    print_success "Done: $key"
}

generate_client_config() {
    local client="$1"
    local out
    case "$client" in
        cursor) out="$HOME/.cursor/mcp.json" ;;
        claude)
            if [[ "$OSTYPE" == "darwin"* ]]; then out="$HOME/Library/Application Support/Claude/claude_desktop_config.json";
            elif [[ "$OSTYPE" == "msys"* ]] || [[ "$OSTYPE" == "win32" ]]; then out="$APPDATA/Claude/claude_desktop_config.json";
            else out="$HOME/.config/Claude/claude_desktop_config.json"; fi ;;
        opencode) out="$HOME/.config/opencode/opencode.json" ;;
        skip) return 0 ;;
        *) return 0 ;;
    esac
    local mkdirp
    mkdirp="$(dirname "$out")"
    mkdir -p "$mkdirp"
    backup_if_exists "$out"
    node "$SCRIPT_DIR/scripts/generate-config.mjs" "$PROFILE_ID" --backend "$client" --root "$MCP_ECOSYSTEM_ROOT" --out "$out"
    print_success "Wrote $client config to $out"
}

main() {
    parse_args "$@"
    print_status "mcp-ecosystem setup"
    check_prereqs

    # Resolve profile
    if [ -z "$PROFILE_ID" ]; then
        select_profile "$TARGET_SYSTEM"
    fi
    print_status "Using profile: $PROFILE_ID ($(profile_name "$PROFILE_ID"))"

    # Setup each server in the profile
    local ok=0 total=0 key
    mapfile -t servers < <(profile_servers "$PROFILE_ID")
    total="${#servers[@]}"
    if [ "$total" -eq 0 ]; then print_error "No servers in profile $PROFILE_ID."; exit 1; fi
    for key in "${servers[@]}"; do
        if setup_server "$key"; then ((ok++)); else print_error "Failed: $key"; fi
    done

    echo
    print_status "Setup complete: $ok/$total servers ready"
    [ "$ok" -ne "$total" ] && print_warning "Some servers failed. Check output above." && exit 1

    if [ -z "$MCP_CLIENT" ]; then
        echo
        print_status "Generate MCP client config?"
        echo "  1) Cursor IDE"
        echo "  2) Claude Desktop"
        echo "  3) OpenCode"
        echo "  4) Docker Compose"
        echo "  5) Skip"
        print_question "Choice (1-5): "
        read -r MCP_CLIENT
        case "$MCP_CLIENT" in 1) MCP_CLIENT=cursor;; 2) MCP_CLIENT=claude;; 3) MCP_CLIENT=opencode;; 4) MCP_CLIENT=docker;; *) MCP_CLIENT=skip;; esac
    fi
    generate_client_config "$MCP_CLIENT"
    print_success "Done. Restart your MCP client to pick up the new config."
}

main "$@"