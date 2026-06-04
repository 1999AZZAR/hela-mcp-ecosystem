#!/bin/bash

# Test All MCP Servers Script
# This script runs tests for all MCP server projects

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

# Function to test a single server
test_server() {
    local repo_name=$1

    if [ ! -d "$repo_name" ]; then
        print_warning "$repo_name directory not found. Skipping..."
        return 1
    fi

    print_status "Testing $repo_name..."

    cd "$repo_name"

    # Check if package.json exists
    if [ ! -f "package.json" ]; then
        print_warning "No package.json found in $repo_name. Skipping..."
        cd ..
        return 0
    fi

    # Check if test script exists in package.json
    if ! grep -q '"test"' package.json 2>/dev/null; then
        print_warning "No test script found in $repo_name. Skipping..."
        cd ..
        return 0
    fi

    # Run tests
    if npm test; then
        print_success "Tests passed for $repo_name"
        cd ..
        return 0
    else
        print_error "Tests failed for $repo_name"
        cd ..
        return 1
    fi
}

# Main test function
main() {
    print_status "Starting tests for all MCP servers..."

    # Define the core servers (always present)
    declare -a core_servers=(
        "chaining-mcp-server"
        "filesystem-mcp-server"
        "Project-Guardian-mcp-server"
        "terminal-mcp-server"
        "browser-agent"
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

    # Track success/failure
    local success_count=0
    local total_count=${#servers[@]}

    # Test each server
    for repo_name in "${servers[@]}"; do
        if test_server "$repo_name"; then
            ((success_count++))
        fi
    done

    # Print summary
    echo
    print_status "Testing completed!"
    print_success "Tests passed for $success_count out of $total_count servers"

    if [ "$success_count" -eq "$total_count" ]; then
        print_success "All MCP server tests have passed!"
    else
        print_warning "Some server tests failed. Please check the errors above."
        exit 1
    fi
}

# Run main function
main "$@"
