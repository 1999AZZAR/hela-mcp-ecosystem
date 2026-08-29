#!/bin/bash
# Shared helpers for the mcp-ecosystem scripts. Sourced by other scripts.
#
# Provides:
#   print_status/print_question/print_success/print_warning/print_error
#   profile_ids() -> one profile id per line
#   profile_name <id> / profile_system <id> / profile_servers <id>
#   inventory_field <key> <field>
#   all_servers()                            -> every inventory key
#   select_profile <target>                  -> prompts, sets $PROFILE_ID (gui|headless|any|"")
#   resolve_scope_args "$@"                  -> sets $SERVER_SCOPE (INVENTORY|PROFILE) + $PROFILE_ID + $SCOPE_ARGS
#   materialize_scope                        -> sets $SERVERS (array of "key:dir")
#
# Depends on Node.js (JSON parsing without jq).

: "${MCP_ECOSYSTEM_ROOT:="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"}"
CONFIG_DIR="$MCP_ECOSYSTEM_ROOT/config"
INVENTORY="$CONFIG_DIR/inventory.json"
PROFILES="$CONFIG_DIR/profiles.json"

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

print_status()    { echo -e "${BLUE}[INFO]${NC} $1"; }
print_question()  { echo -e "${BLUE}[QUESTION]${NC} $1"; }
print_success()   { echo -e "${GREEN}[SUCCESS]${NC} $1"; }
print_warning()   { echo -e "${YELLOW}[WARNING]${NC} $1"; }
print_error()     { echo -e "${RED}[ERROR]${NC} $1"; }

node_query() {
  node -e '
    const fs = require("fs");
    const [file, expr] = process.argv.slice(1);
    const o = JSON.parse(fs.readFileSync(file, "utf8"));
    const v = eval(expr);
    if (Array.isArray(v)) v.forEach(x => console.log(x));
    else if (typeof v === "object" && v !== null) console.log(JSON.stringify(v));
    else console.log(v);
  ' "$@"
}

profile_ids()         { node_query "$PROFILES" 'o.profiles.map(p => p.id)'; }
profile_system()      { node_query "$PROFILES" "o.profiles.find(p => p.id === \"$1\")?.system"; }
profile_name()        { node_query "$PROFILES" "o.profiles.find(p => p.id === \"$1\")?.name"; }
profile_servers()     { node_query "$PROFILES" "o.profiles.find(p => p.id === \"$1\")?.servers ?? []"; }
inventory_field() {
  node -e '
    const fs = require("fs");
    const invData = JSON.parse(fs.readFileSync(process.argv[1], "utf8"));
    const key = process.argv[2];
    const field = process.argv[3];
    const canonicalKey = invData.aliases?.[key] || key;
    const server = invData.inventory?.[canonicalKey] || invData.inventory?.[key];
    console.log(server?.[field] ?? "");
  ' "$INVENTORY" "$1" "$2"
}
all_servers() {
  node -e "const o=require('$INVENTORY');Object.keys(o.inventory).forEach(k=>console.log(k));"
}

validate_profile() {
  local id="$1"
  local exists
  exists="$(node_query "$PROFILES" "o.profiles.some(p => p.id === \"$id\")")"
  if [ "$exists" != "true" ]; then
    print_error "Profile '$id' does not exist in $PROFILES"
    return 1
  fi
  local missing=()
  local s has_server
  while IFS= read -r s; do
    if [ -n "$s" ]; then
      has_server="$(node -e '
        const inv = require("'"$INVENTORY"'");
        const key = "'"$s"'";
        const cKey = inv.aliases?.[key] || key;
        console.log(!!(inv.inventory?.[cKey] || inv.inventory?.[key]));
      ')"
      if [ "$has_server" != "true" ]; then
        missing+=("$s")
      fi
    fi
  done < <(profile_servers "$id")
  if [ "${#missing[@]}" -gt 0 ]; then
    print_error "Profile '$id' references unknown server(s): ${missing[*]}"
    return 1
  fi
  return 0
}

backup_if_exists() {
  if [ -f "$1" ] && [ ! -f "$1.bak" ]; then
    cp "$1" "$1.bak" && print_status "Backed up $1 -> $1.bak"
  fi
}

# Interactive profile selection. $1 = target filter ("gui"|"headless"|"any"|"")
select_profile() {
  local target="${1:-any}"
  local -a menu=()
  local id sys
  for id in $(profile_ids); do
    sys="$(profile_system "$id")"
    if [ "$target" = "any" ] || [ "$target" = "" ] || [ "$sys" = "$target" ] || [ "$sys" = "any" ]; then
      menu+=("$id")
    fi
  done
  if [ "${#menu[@]}" -eq 0 ]; then
    print_error "No profiles for target: $target"
    return 1
  fi
  echo
  print_status "Available profiles${target:+ ($target)}:"
  local i
  for i in "${!menu[@]}"; do
    echo "  $((i+1))) $(profile_name "${menu[$i]}")  [$(profile_system "${menu[$i]}")]"
  done
  while true; do
    print_question "Enter profile number (1-${#menu[@]}): "
    read -r choice
    if [[ "$choice" =~ ^[0-9]+$ ]] && [ "$choice" -ge 1 ] && [ "$choice" -le "${#menu[@]}" ]; then
      PROFILE_ID="${menu[$((choice-1))]}"
      print_success "Selected: $(profile_name "$PROFILE_ID")"
      return 0
    fi
    print_warning "Invalid choice. Enter 1-${#menu[@]}."
  done
}

# Parse scope CLI args. Sets: SERVER_SCOPE (INVENTORY|PROFILE) and PROFILE_ID
process_scope_args() {
  SERVER_SCOPE=""
  PROFILE_ID=""
  SCOPE_ARGS=()
  while [[ $# -gt 0 ]]; do
    case $1 in
      --all)      SERVER_SCOPE=INVENTORY; shift ;;
      --profile)  PROFILE_ID="$2"; SERVER_SCOPE=PROFILE; shift 2 ;;
      --help|-h)  usage; exit 0 ;;
      *)          SCOPE_ARGS+=("$1"); shift ;;
    esac
  done
}

# Interactive scope selection if none given on CLI. Sets SERVER_SCOPE/PROFILE_ID/SCOPE_ARGS.
resolve_scope() {
  if [ -n "$SERVER_SCOPE" ] || [ "${#SCOPE_ARGS[@]}" -gt 0 ]; then return 0; fi
  echo
  print_status "Select scope:"
  echo "  1) All servers (inventory)"
  echo "  2) A specific profile"
  echo "  3) Manually specify server keys"
  print_question "Choice (1-3): "
  read -r scope
  case "$scope" in
    2) select_profile "" || exit 1; SERVER_SCOPE=PROFILE ;;
    3) read -r -a SCOPE_ARGS ;;
    *) SERVER_SCOPE=INVENTORY ;;
  esac
}

# Materialize server list into $SERVERS as "key:dir" entries.
materialize_servers() {
  local keys=()
  if [ "$SERVER_SCOPE" = "PROFILE" ]; then
    mapfile -t keys < <(profile_servers "$PROFILE_ID")
  elif [ "$SERVER_SCOPE" = "INVENTORY" ]; then
    mapfile -t keys < <(all_servers)
  else
    keys=("${SCOPE_ARGS[@]}")
  fi
  SERVERS=()
  local k rel_dir resolved_dir
  for k in "${keys[@]}"; do
    rel_dir="$(inventory_field "$k" dir)"
    local short_dir="${rel_dir%-mcp-server}"
    short_dir="${short_dir%-mcp}"
    if [ -n "$rel_dir" ] && [ -d "$MCP_ECOSYSTEM_ROOT/$rel_dir" ]; then
      resolved_dir="$MCP_ECOSYSTEM_ROOT/$rel_dir"
    elif [ -n "$rel_dir" ] && [ -d "$MCP_ECOSYSTEM_ROOT/../$rel_dir" ]; then
      resolved_dir="$MCP_ECOSYSTEM_ROOT/../$rel_dir"
    elif [ -n "$short_dir" ] && [ -d "$MCP_ECOSYSTEM_ROOT/$short_dir" ]; then
      resolved_dir="$MCP_ECOSYSTEM_ROOT/$short_dir"
    elif [ -n "$short_dir" ] && [ -d "$MCP_ECOSYSTEM_ROOT/../$short_dir" ]; then
      resolved_dir="$MCP_ECOSYSTEM_ROOT/../$short_dir"
    elif [ -d "$MCP_ECOSYSTEM_ROOT/$k" ]; then
      resolved_dir="$MCP_ECOSYSTEM_ROOT/$k"
    elif [ -d "$MCP_ECOSYSTEM_ROOT/../$k" ]; then
      resolved_dir="$MCP_ECOSYSTEM_ROOT/../$k"
    else
      resolved_dir="$MCP_ECOSYSTEM_ROOT/$rel_dir"
    fi
    SERVERS+=("$k:$resolved_dir")
  done
}
