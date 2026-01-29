#!/bin/bash

# Clean All MCP Servers Script
# This script cleans build artifacts from all MCP server projects

set -e  # Exit on any error

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Function to clean a single server
clean_server() {
    local repo_name=$1

    if [ ! -d "$repo_name" ]; then
        print_warning "$repo_name directory not found. Skipping..."
        return 1
    fi

    print_status "Cleaning $repo_name..."

    cd "$repo_name"

    # Remove common build artifacts
    local cleaned=false

    # Remove dist directory
    if [ -d "dist" ]; then
        rm -rf dist
        print_status "Removed dist directory from $repo_name"
        cleaned=true
    fi

    # Remove node_modules (optional, with confirmation)
    if [ -d "node_modules" ] && [ "$FULL_CLEAN" = "true" ]; then
        rm -rf node_modules
        print_status "Removed node_modules from $repo_name"
        cleaned=true
    fi

    # Remove coverage directory
    if [ -d "coverage" ]; then
        rm -rf coverage
        print_status "Removed coverage directory from $repo_name"
        cleaned=true
    fi

    # Remove other common artifacts
    if [ -d "build" ]; then
        rm -rf build
        print_status "Removed build directory from $repo_name"
        cleaned=true
    fi

    # Remove .tsbuildinfo files if they exist
    if ls *.tsbuildinfo 2>/dev/null; then
        rm -f *.tsbuildinfo
        print_status "Removed .tsbuildinfo files from $repo_name"
        cleaned=true
    fi

    # Try npm run clean if it exists
    if [ -f "package.json" ]; then
        if npm run clean --silent 2>/dev/null; then
            print_status "Ran npm run clean for $repo_name"
            cleaned=true
        fi
    fi

    cd ..

    if [ "$cleaned" = true ]; then
        print_success "Cleaned $repo_name"
        return 0
    else
        print_warning "Nothing to clean in $repo_name"
        return 0
    fi
}

# Function to show usage
usage() {
    echo "Usage: $0 [OPTIONS]"
    echo
    echo "Clean build artifacts from all MCP servers"
    echo
    echo "Options:"
    echo "  -f, --full     Also remove node_modules directories"
    echo "  -h, --help     Show this help message"
    echo
    echo "Examples:"
    echo "  $0              Clean build artifacts only"
    echo "  $0 --full       Clean build artifacts and node_modules"
}

# Main clean function
main() {
    # Parse arguments
    FULL_CLEAN=false

    while [[ $# -gt 0 ]]; do
        case $1 in
            -f|--full)
                FULL_CLEAN=true
                shift
                ;;
            -h|--help)
                usage
                exit 0
                ;;
            *)
                echo "Unknown option: $1"
                usage
                exit 1
                ;;
        esac
    done

    if [ "$FULL_CLEAN" = true ]; then
        print_status "Starting full clean of all MCP servers (including node_modules)..."
    else
        print_status "Starting clean of all MCP servers (build artifacts only)..."
    fi

    # Define the core servers (always present)
    declare -a core_servers=(
        "chaining-mcp-server"
        "filesystem-mcp-server"
        "Project-Guardian-mcp-server"
        "terminal-mcp-server"
    )
    
    # Define research servers (user chooses one option)
    declare -a research_servers=(
        "google-search-mcp-server"
        "wikipedia-mcp-server"
        "research-assistant-mcp-server"
    )
    
    # Build list of servers to process
    declare -a servers=("${core_servers[@]}")
    
    # Add research servers that exist
    for research_server in "${research_servers[@]}"; do
        if [ -d "$research_server" ]; then
            servers+=("$research_server")
        fi
    done

    # Track success
    local cleaned_count=0
    local total_count=${#servers[@]}

    # Clean each server
    for repo_name in "${servers[@]}"; do
        if clean_server "$repo_name"; then
            ((cleaned_count++))
        fi
    done

    # Print summary
    echo
    print_status "Cleaning completed!"
    print_success "Processed $cleaned_count out of $total_count servers"

    if [ "$cleaned_count" -eq "$total_count" ]; then
        print_success "All MCP servers have been cleaned!"
    fi
}

# Run main function
main "$@"
