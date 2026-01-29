#!/bin/bash

# AZZAR MCP Server Suite Update Script
# This script updates all MCP server repositories to their latest versions

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

# Function to update a single server
update_server() {
    local repo_name=$1

    if [ ! -d "$repo_name" ]; then
        print_warning "$repo_name directory not found. Skipping..."
        return 1
    fi

    print_status "Updating $repo_name..."

    cd "$repo_name"

    # Pull latest changes
    if git pull origin main 2>/dev/null; then
        print_success "Updated $repo_name (main branch)"
    elif git pull origin master 2>/dev/null; then
        print_success "Updated $repo_name (master branch)"
    else
        print_warning "No remote changes for $repo_name"
    fi

    # Check if package.json exists and if dependencies need updating
    if [ -f "package.json" ]; then
        print_status "Checking dependencies for $repo_name..."

        # Check if node_modules exists
        if [ ! -d "node_modules" ]; then
            print_status "Installing dependencies for $repo_name..."
            npm install
        else
            print_status "Dependencies already installed for $repo_name"
        fi

        # Build the project
        print_status "Building $repo_name..."
        if npm run build; then
            print_success "Built $repo_name successfully"
        else
            print_error "Failed to build $repo_name"
            cd ..
            return 1
        fi
    else
        print_warning "No package.json found in $repo_name"
    fi

    cd ..
    return 0
}

# Main update function
main() {
    print_status "Starting AZZAR MCP Server Suite update..."

    # Check if git is available
    if ! command -v git &> /dev/null; then
        print_error "Git is not installed. Please install git first."
        exit 1
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

    # Track success/failure
    local success_count=0
    local total_count=${#servers[@]}

    # Update each server
    for repo_name in "${servers[@]}"; do
        if update_server "$repo_name"; then
            ((success_count++))
        fi
    done

    # Print summary
    echo
    print_status "Update completed!"
    print_success "Successfully updated $success_count out of $total_count servers"

    if [ "$success_count" -eq "$total_count" ]; then
        print_success "All MCP servers have been successfully updated!"
    else
        print_warning "Some servers failed to update. Please check the errors above."
        exit 1
    fi
}

# Run main function
main "$@"
