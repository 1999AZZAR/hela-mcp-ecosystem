#!/bin/bash

# AZZAR MCP Server Suite Setup Script
# This script clones all MCP server repositories and sets them up

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

print_question() {
    echo -e "${BLUE}[QUESTION]${NC} $1"
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

# Function to select research MCP preference
select_research_mcp() {
    echo
    print_status "Select your research MCP server configuration:"
    echo "1) Individual servers (wikipedia-mcp-server + google-search-mcp-server)"
    echo "   - Provides 6 total MCP servers"
    echo "   - Separate Google Search and Wikipedia functionality"
    echo "2) Enhanced research server (research-assistant-mcp-server)"
    echo "   - Provides 5 total MCP servers"
    echo "   - Combined Google Search and Wikipedia with additional tools"
    echo

    while true; do
        print_question "Enter your choice (1-2): "
        read -r choice

        case $choice in
            1)
                RESEARCH_MCP="individual"
                print_success "Selected: Individual research servers"
                break
                ;;
            2)
                RESEARCH_MCP="combined"
                print_success "Selected: Enhanced research server"
                break
                ;;
            *)
                print_warning "Invalid choice. Please enter 1 or 2."
                ;;
        esac
    done
    echo
}

# Function to select MCP client
select_mcp_client() {
    echo
    print_status "Select your MCP client:"
    echo "1) Cursor IDE"
    echo "2) Claude Desktop"
    echo "3) Docker Compose"
    echo "4) Skip configuration (manual setup)"
    echo

    while true; do
        print_question "Enter your choice (1-4): "
        read -r choice

        case $choice in
            1)
                MCP_CLIENT="cursor"
                print_success "Selected: Cursor IDE"
                break
                ;;
            2)
                MCP_CLIENT="claude"
                print_success "Selected: Claude Desktop"
                break
                ;;
            3)
                MCP_CLIENT="docker"
                print_success "Selected: Docker Compose"
                break
                ;;
            4)
                MCP_CLIENT="skip"
                print_status "Skipping automatic configuration"
                break
                ;;
            *)
                print_warning "Invalid choice. Please enter 1, 2, 3, or 4."
                ;;
        esac
    done
    echo
}

# Function to configure MCP client automatically
configure_mcp_client() {
    local current_dir=$(pwd)

    case $MCP_CLIENT in
        cursor)
            configure_cursor "$current_dir"
            ;;
        claude)
            configure_claude "$current_dir"
            ;;
        docker)
            configure_docker "$current_dir"
            ;;
        skip)
            print_status "Manual configuration required. See README.md for instructions."
            ;;
    esac
}

# Function to configure Cursor IDE
configure_cursor() {
    local current_dir=$1
    local config_file="$HOME/.cursor/mcp.json"

    print_status "Configuring Cursor IDE..."

    # Create config directory if it doesn't exist
    mkdir -p "$HOME/.cursor"

    # Start with base config
    cp "config/cursor-example.json" "$config_file.tmp"

    # Add research servers based on user choice
    if [ "$RESEARCH_MCP" = "individual" ]; then
        # Append individual research servers config
        sed '$ s/}$/,/' "$config_file.tmp" > "$config_file.tmp2"
        cat "config/cursor-individual-research.json" | sed '1d;$d' >> "$config_file.tmp2"
        mv "$config_file.tmp2" "$config_file.tmp"
    else
        # Append combined research server config
        sed '$ s/}$/,/' "$config_file.tmp" > "$config_file.tmp2"
        cat "config/cursor-combined-research.json" | sed '1d;$d' >> "$config_file.tmp2"
        mv "$config_file.tmp2" "$config_file.tmp"
    fi

    # Replace placeholder paths with actual path
    sed "s|/absolute/path/to/mcp-ecosystem|$current_dir|g" "$config_file.tmp" > "$config_file"

    # Clean up temp file
    rm "$config_file.tmp"

    print_success "Cursor configuration created at: $config_file"
    print_status "Next steps:"
    if [ "$RESEARCH_MCP" = "individual" ]; then
        echo "1. Set environment variables:"
        echo "   export GITHUB_TOKEN='your-github-token'"
        echo "   export GOOGLE_API_KEY='your-google-api-key'"
        echo "   export GOOGLE_SEARCH_ENGINE_ID='your-search-engine-id'"
    else
        echo "1. Set environment variables:"
        echo "   export GITHUB_TOKEN='your-github-token'"
        echo "   export GOOGLE_API_KEY='your-google-api-key'"
        echo "   export GOOGLE_CSE_ID='your-search-engine-id'"
    fi
    echo "2. Restart Cursor IDE"
}

# Function to configure Claude Desktop
configure_claude() {
    local current_dir=$1

    print_status "Configuring Claude Desktop..."

    # Determine Claude config location based on OS
    if [[ "$OSTYPE" == "darwin"* ]]; then
        # macOS
        local config_file="$HOME/Library/Application Support/Claude/claude_desktop_config.json"
        mkdir -p "$HOME/Library/Application Support/Claude"
    elif [[ "$OSTYPE" == "msys" ]] || [[ "$OSTYPE" == "win32" ]]; then
        # Windows
        local config_file="$APPDATA/Claude/claude_desktop_config.json"
        mkdir -p "$APPDATA/Claude"
    else
        # Linux
        local config_file="$HOME/.config/Claude/claude_desktop_config.json"
        mkdir -p "$HOME/.config/Claude"
    fi

    # Start with base config
    cp "config/claude-example.json" "$config_file.tmp"

    # Add research servers based on user choice
    if [ "$RESEARCH_MCP" = "individual" ]; then
        # Append individual research servers config
        sed '$ s/}$/,/' "$config_file.tmp" > "$config_file.tmp2"
        cat "config/claude-individual-research.json" | sed '1d;$d' >> "$config_file.tmp2"
        mv "$config_file.tmp2" "$config_file.tmp"
    else
        # Append combined research server config
        sed '$ s/}$/,/' "$config_file.tmp" > "$config_file.tmp2"
        cat "config/claude-combined-research.json" | sed '1d;$d' >> "$config_file.tmp2"
        mv "$config_file.tmp2" "$config_file.tmp"
    fi

    # Replace placeholder paths with actual path
    sed "s|/absolute/path/to/mcp-ecosystem|$current_dir|g" "$config_file.tmp" > "$config_file"

    # Clean up temp file
    rm "$config_file.tmp"

    print_success "Claude configuration created at: $config_file"
    print_status "Next steps:"
    if [ "$RESEARCH_MCP" = "individual" ]; then
        echo "1. Set environment variables:"
        echo "   export GITHUB_TOKEN='your-github-token'"
        echo "   export GOOGLE_API_KEY='your-google-api-key'"
        echo "   export GOOGLE_SEARCH_ENGINE_ID='your-search-engine-id'"
    else
        echo "1. Set environment variables:"
        echo "   export GITHUB_TOKEN='your-github-token'"
        echo "   export GOOGLE_API_KEY='your-google-api-key'"
        echo "   export GOOGLE_CSE_ID='your-search-engine-id'"
    fi
    echo "2. Restart Claude Desktop"
}

# Function to configure Docker
configure_docker() {
    local current_dir=$1

    print_status "Configuring Docker deployment..."

    # Check if Docker is available
    if ! command -v docker &> /dev/null; then
        print_error "Docker is not installed. Please install Docker first."
        print_status "Manual Docker setup instructions:"
        echo "1. Install Docker and Docker Compose"
        echo "2. Copy config/.env.example to .env and fill in your values"
        if [ "$RESEARCH_MCP" = "individual" ]; then
            echo "3. Run: cd config && docker-compose -f docker-compose.yml -f docker-compose-individual-research.yml up -d"
        else
            echo "3. Run: cd config && docker-compose -f docker-compose.yml -f docker-compose-combined-research.yml up -d"
        fi
        return 1
    fi

    # Check if Docker Compose is available
    if ! command -v docker-compose &> /dev/null && ! docker compose version &> /dev/null; then
        print_error "Docker Compose is not installed. Please install Docker Compose first."
        return 1
    fi

    print_success "Docker and Docker Compose are available"

    # Create .env file if it doesn't exist
    if [ ! -f ".env" ]; then
        if [ "$RESEARCH_MCP" = "individual" ]; then
            cat > .env << 'EOF'
# GitHub Integration (Required for Chaining MCP Server)
GITHUB_TOKEN=your-github-token-here

# Google Search API (Required for individual research servers)
GOOGLE_API_KEY=your-google-api-key-here
GOOGLE_SEARCH_ENGINE_ID=your-search-engine-id-here

# Optional: Data persistence paths
DATA_PATH=./data
WORKSPACE_PATH=./workspace

# Optional: Server-specific settings
SEQUENTIAL_THINKING_AVAILABLE=true
AWESOME_COPILOT_ENABLED=true
RELIABILITY_MONITORING_ENABLED=true
EOF
        else
            cat > .env << 'EOF'
# GitHub Integration (Required for Chaining MCP Server)
GITHUB_TOKEN=your-github-token-here

# Google Search API (Required for combined research server)
GOOGLE_API_KEY=your-google-api-key-here
GOOGLE_SEARCH_ENGINE_ID=your-search-engine-id-here
# Note: docker-compose-combined-research.yml maps GOOGLE_SEARCH_ENGINE_ID to GOOGLE_CSE_ID

# Optional: Data persistence paths
DATA_PATH=./data
WORKSPACE_PATH=./workspace

# Optional: Server-specific settings
SEQUENTIAL_THINKING_AVAILABLE=true
AWESOME_COPILOT_ENABLED=true
RELIABILITY_MONITORING_ENABLED=true
EOF
        fi
        print_success "Created .env file with template values"
    fi

    print_status "Next steps:"
    echo "1. Edit the .env file with your actual API keys and tokens:"
    echo "   nano .env"
    echo "2. Start the Docker containers:"
    if [ "$RESEARCH_MCP" = "individual" ]; then
        echo "   cd config && docker-compose -f docker-compose.yml -f docker-compose-individual-research.yml up -d"
    else
        echo "   cd config && docker-compose -f docker-compose.yml -f docker-compose-combined-research.yml up -d"
    fi
    echo "3. Check container status:"
    echo "   docker-compose ps"
}

# Function to setup a single server
setup_server() {
    local repo_name=$1
    local repo_url=$2

    print_status "Setting up $repo_name..."

    if [ -d "$repo_name" ]; then
        print_warning "$repo_name directory already exists. Pulling latest changes..."
        cd "$repo_name"
        git pull origin main 2>/dev/null || git pull origin master 2>/dev/null || true
        cd ..
    else
        print_status "Cloning $repo_name..."
        if git clone "$repo_url" "$repo_name"; then
            print_success "Cloned $repo_name successfully"
        else
            print_error "Failed to clone $repo_name"
            return 1
        fi
    fi

    # Enter the server directory
    cd "$repo_name"

    # Check if package.json exists
    if [ ! -f "package.json" ]; then
        print_warning "No package.json found in $repo_name. Skipping npm operations."
        cd ..
        return 0
    fi

    # Install dependencies
    print_status "Installing dependencies for $repo_name..."
    if npm install; then
        print_success "Dependencies installed for $repo_name"
    else
        print_error "Failed to install dependencies for $repo_name"
        cd ..
        return 1
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

    # Go back to the ecosystem root
    cd ..
}

# Main setup function
main() {
    print_status "Starting AZZAR MCP Server Suite setup..."

    # Check if git is available
    if ! command -v git &> /dev/null; then
        print_error "Git is not installed. Please install git first."
        exit 1
    fi

    # Check if node is available
    if ! command -v node &> /dev/null; then
        print_error "Node.js is not installed. Please install Node.js >= 18.0.0 first."
        exit 1
    fi

    # Check Node.js version
    NODE_VERSION=$(node --version | sed 's/v//' | cut -d. -f1)
    if [ "$NODE_VERSION" -lt 18 ]; then
        print_error "Node.js version 18.0.0 or higher is required. Current version: $(node --version)"
        exit 1
    fi

    print_success "Prerequisites check passed. Node.js version: $(node --version)"

    # Interactive research MCP selection
    select_research_mcp

    # Interactive client selection
    select_mcp_client

    # Define the base servers
    declare -a base_servers=(
        "chaining-mcp-server:https://github.com/1999AZZAR/chaining-mcp-server.git"
        "filesystem-mcp-server:https://github.com/1999AZZAR/filesystem-mcp-server.git"
        "Project-Guardian-mcp-server:https://github.com/1999AZZAR/Project-Guardian-mcp-server.git"
        "terminal-mcp-server:https://github.com/1999AZZAR/terminal-mcp-server.git"
        "browser-agent:https://github.com/1999AZZAR/browser-agent.git"
    )

    # Define research servers based on user choice
    declare -a research_servers
    if [ "$RESEARCH_MCP" = "individual" ]; then
        research_servers=(
            "google-search-mcp-server:https://github.com/1999AZZAR/Google-Search-MCP.git"
            "wikipedia-mcp-server:https://github.com/1999AZZAR/wikipedia-mcp-server.git"
        )
        print_status "Using individual research servers: 6 total MCP servers"
    else
        research_servers=(
            "research-assistant-mcp-server:https://github.com/1999AZZAR/research-assistant-mcp-server.git"
        )
        print_status "Using enhanced research server: 5 total MCP servers"
    fi

    # Combine base servers with research servers
    declare -a servers=("${base_servers[@]}" "${research_servers[@]}")

    # Track success/failure
    local success_count=0
    local total_count=${#servers[@]}

    # Setup each server
    for server_info in "${servers[@]}"; do
        IFS=':' read -r repo_name repo_url <<< "$server_info"

        if setup_server "$repo_name" "$repo_url"; then
            ((success_count++))
        fi
    done

    # Print summary
    echo
    print_status "Setup completed!"
    print_success "Successfully set up $success_count out of $total_count servers"

    if [ "$success_count" -eq "$total_count" ]; then
        echo
        print_success "All MCP servers have been successfully set up!"
        echo

        # Automatic configuration
        configure_mcp_client

        echo
        print_success "🎉 Setup complete! Your MCP server ecosystem is ready to use."
        echo
        print_status "For more information, see the README.md and documentation files in docs/"
    else
        print_warning "Some servers failed to setup. Please check the errors above and try again."
        exit 1
    fi
}

# Run main function
main "$@"
