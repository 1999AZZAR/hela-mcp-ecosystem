/**
 * HeLa Gateway Capability Router
 *
 * Routes incoming requests to specialized HeLa MCP servers based on:
 * 1. Path prefix (/mitosis, /genome, /membrane, etc.)
 * 2. Header Mcp-Name (tool name) or X-Hela-Server
 * 3. JSON-RPC body tool name or capability prefix
 */

export const DEFAULT_BACKENDS = {
  'hela-mitosis': 'http://127.0.0.1:8011',
  'hela-genome': 'http://127.0.0.1:8012',
  'hela-membrane': 'http://127.0.0.1:8013',
  'hela-nucleus': 'http://127.0.0.1:8014',
  'hela-ribosome': 'http://127.0.0.1:8015',
  'hela-enzyme': 'http://127.0.0.1:8016',
  'hela-phenotype': 'http://127.0.0.1:8017',
};

// Aliases for path prefixes
export const PATH_PREFIX_MAP = {
  '/mitosis': 'hela-mitosis',
  '/hela-mitosis': 'hela-mitosis',
  '/genome': 'hela-genome',
  '/hela-genome': 'hela-genome',
  '/membrane': 'hela-membrane',
  '/hela-membrane': 'hela-membrane',
  '/nucleus': 'hela-nucleus',
  '/hela-nucleus': 'hela-nucleus',
  '/ribosome': 'hela-ribosome',
  '/hela-ribosome': 'hela-ribosome',
  '/enzyme': 'hela-enzyme',
  '/hela-enzyme': 'hela-enzyme',
  '/phenotype': 'hela-phenotype',
  '/hela-phenotype': 'hela-phenotype',
};

// Tool name -> server mapping
export const TOOL_SERVER_MAP = {
  // Membrane (filesystem)
  'read_file': 'hela-membrane',
  'write_file': 'hela-membrane',
  'delete_file': 'hela-membrane',
  'copy_file': 'hela-membrane',
  'move_file': 'hela-membrane',
  'create_directory': 'hela-membrane',
  'list_directory': 'hela-membrane',
  'find_files': 'hela-membrane',
  'search_in_files': 'hela-membrane',
  'watch_file': 'hela-membrane',
  'stop_watching': 'hela-membrane',
  'compare_files': 'hela-membrane',
  'archive_files': 'hela-membrane',
  'extract_archive': 'hela-membrane',
  'get_file_info': 'hela-membrane',
  'get_directory_size': 'hela-membrane',

  // Nucleus (terminal)
  'execute_command': 'hela-nucleus',
  'read_output': 'hela-nucleus',
  'transfer_file': 'hela-nucleus',

  // Genome (memory & knowledge graph)
  'execute_sql': 'hela-genome',
  'delete_data': 'hela-genome',
  'create_entities': 'hela-genome',
  'read_graph': 'hela-genome',
  'read_graph_stream': 'hela-genome',
  'search_nodes': 'hela-genome',
  'open_nodes': 'hela-genome',
  'add_observations': 'hela-genome',
  'delete_observations': 'hela-genome',
  'sync_central_memory': 'hela-genome',
  'start_ui': 'hela-genome',

  // Mitosis (orchestration & reasoning)
  'sequentialthinking': 'hela-mitosis',
  'workflow_orchestrator': 'hela-mitosis',
  'workflow_status': 'hela-mitosis',
  'workflow_cancel': 'hela-mitosis',
  'llm_query': 'hela-mitosis',
  'llm_decompose_task': 'hela-mitosis',
  'llm_suggest_route': 'hela-mitosis',
  'llm_summarize': 'hela-mitosis',
  'list_skills': 'hela-mitosis',
  'get_skill': 'hela-mitosis',
  'search_skills': 'hela-mitosis',
  'get_current_time': 'hela-mitosis',
  'convert_time': 'hela-mitosis',
  'brainstorming': 'hela-mitosis',

  // Enzyme (research)
  'research_brief': 'hela-enzyme',
  'search_google': 'hela-enzyme',
  'get_wikipedia_article': 'hela-enzyme',
  'search_wikipedia': 'hela-enzyme',

  // Phenotype (design)
  'generate_palette': 'hela-phenotype',
  'tailwind_component': 'hela-phenotype',
  'validate_combo': 'hela-phenotype',
  'list_options': 'hela-phenotype',

  // Ribosome (PTY / agent process)
  'session_spawn': 'hela-ribosome',
  'agent_spawn': 'hela-ribosome',
  'agent_send': 'hela-ribosome',
  'agent_fork': 'hela-ribosome',
  'agent_list': 'hela-ribosome',
};

// Capability prefix -> server mapping
export const CAPABILITY_PREFIX_MAP = {
  'filesystem': 'hela-membrane',
  'file': 'hela-membrane',
  'terminal': 'hela-nucleus',
  'shell': 'hela-nucleus',
  'project': 'hela-genome',
  'memory': 'hela-genome',
  'graph': 'hela-genome',
  'orchestration': 'hela-mitosis',
  'mitosis': 'hela-mitosis',
  'agent': 'hela-mitosis',
  'research': 'hela-enzyme',
  'design': 'hela-phenotype',
  'pty': 'hela-ribosome',
};

/**
 * Resolve target backend server for a request
 */
export function resolveTargetServer(req, body = null, backends = DEFAULT_BACKENDS) {
  const url = new URL(req.url || '/', 'http://localhost');
  const pathname = url.pathname;

  // 1. Check path prefix (/mitosis, /genome, etc.)
  for (const [prefix, serverId] of Object.entries(PATH_PREFIX_MAP)) {
    if (pathname === prefix || pathname.startsWith(prefix + '/')) {
      return { serverId, targetUrl: backends[serverId], strippedPath: pathname.slice(prefix.length) || '/' };
    }
  }

  // 2. Check X-Hela-Server header
  const headerServer = req.headers['x-hela-server'];
  if (headerServer && backends[headerServer]) {
    return { serverId: headerServer, targetUrl: backends[headerServer], strippedPath: pathname };
  }

  // 3. Check Mcp-Name header
  const mcpName = req.headers['mcp-name'];
  if (mcpName) {
    const serverId = TOOL_SERVER_MAP[mcpName];
    if (serverId && backends[serverId]) {
      return { serverId, targetUrl: backends[serverId], strippedPath: pathname };
    }
  }

  // 4. Check JSON-RPC body tool name or capability prefix
  if (body) {
    const toolName = body.params?.name;
    if (toolName) {
      // Direct tool match
      const serverId = TOOL_SERVER_MAP[toolName];
      if (serverId && backends[serverId]) {
        return { serverId, targetUrl: backends[serverId], strippedPath: pathname };
      }

      // Prefix match (e.g. filesystem.read_file or file_read)
      const parts = toolName.split(/[._-]/);
      const prefix = parts[0]?.toLowerCase();
      if (prefix && CAPABILITY_PREFIX_MAP[prefix]) {
        const sid = CAPABILITY_PREFIX_MAP[prefix];
        if (backends[sid]) {
          return { serverId: sid, targetUrl: backends[sid], strippedPath: pathname };
        }
      }
    }
  }

  // Default fallback: route to Mitosis (control plane backbone)
  return { serverId: 'hela-mitosis', targetUrl: backends['hela-mitosis'], strippedPath: pathname };
}
