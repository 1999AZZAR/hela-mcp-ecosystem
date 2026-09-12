import http from 'node:http';
import { resolveTargetServer, DEFAULT_BACKENDS } from './router.mjs';
import { ListCache } from './cache.mjs';

/**
 * HeLa Gateway Server (P2-D2, P2-D3).
 *
 * Implements:
 * - Central gateway capability routing & header routing
 * - Deterministic-list caching (tools/list, resources/list) with TTL & purge
 * - Auth verification (Bearer / X-Api-Key)
 * - Single persistent shared HTTP connection to backends (eliminates per-session spawn RAM problem)
 */
export class HelaGateway {
  constructor(options = {}) {
    this.port = options.port ?? parseInt(process.env.HELA_GATEWAY_PORT || '8000', 10);
    this.host = options.host ?? process.env.HELA_GATEWAY_HOST ?? '0.0.0.0';
    this.authKey = options.authKey ?? process.env.HELA_GATEWAY_KEY ?? process.env.HELA_AUTH_TOKEN ?? null;
    this.backends = { ...DEFAULT_BACKENDS, ...(options.backends || {}) };
    this.cache = new ListCache(options.cacheTtlMs ?? parseInt(process.env.HELA_CACHE_TTL_MS || '300000', 10));
    this.httpServer = null;
  }

  isAuthorized(req) {
    if (!this.authKey) return true;
    const authHeader = req.headers['authorization'] || '';
    if (authHeader.startsWith('Bearer ')) {
      return authHeader.slice(7).trim() === this.authKey;
    }
    const apiKey = req.headers['x-api-key'];
    if (apiKey) {
      return apiKey === this.authKey;
    }
    return false;
  }

  async checkBackendsHealth() {
    const results = {};
    for (const [id, url] of Object.entries(this.backends)) {
      try {
        const res = await fetch(`${url}/healthz`, { signal: AbortSignal.timeout(1000) });
        results[id] = { status: res.ok ? 'up' : 'degraded', code: res.status, url };
      } catch (err) {
        results[id] = { status: 'down', error: err.message, url };
      }
    }
    return results;
  }

  start() {
    this.httpServer = http.createServer(async (req, res) => {
      try {
        const url = new URL(req.url || '/', `http://${req.headers.host || 'localhost'}`);
        const pathname = url.pathname;

        // Healthz (no auth required)
        if (req.method === 'GET' && pathname === '/healthz') {
          const backends = await this.checkBackendsHealth();
          res.writeHead(200, { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' });
          res.end(JSON.stringify({
            status: 'ok',
            gateway: 'hela-gateway',
            version: '1.0.0',
            cache: this.cache.getStats(),
            backends,
          }));
          return;
        }

        // Cache stats (no auth required)
        if (req.method === 'GET' && pathname === '/cache/stats') {
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify(this.cache.getStats()));
          return;
        }

        // Authenticate all other endpoints if authKey configured
        if (!this.isAuthorized(req)) {
          res.writeHead(401, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({
            jsonrpc: '2.0',
            error: { code: -32001, message: 'Unauthorized: Invalid or missing authorization token' },
            id: null,
          }));
          return;
        }

        // Cache purge endpoint
        if (req.method === 'POST' && pathname === '/cache/purge') {
          this.cache.purge();
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ ok: true, message: 'List cache purged' }));
          return;
        }

        // Discovery endpoint
        if (req.method === 'GET' && (pathname === '/discovery' || pathname === '/mcp')) {
          res.writeHead(200, {
            'Content-Type': 'application/json',
            'Cache-Control': 'public, max-age=300',
            'mcp-protocol-version': '2026-07-28',
          });
          res.end(JSON.stringify({
            name: 'hela-gateway',
            version: '1.0.0',
            protocolVersion: '2026-07-28',
            backends: Object.keys(this.backends),
            capabilities: {
              routing: 'capability-first',
              cache: { tools: { ttlMs: this.cache.defaultTtlMs } },
            },
          }));
          return;
        }

        // Read POST request body
        if (req.method === 'POST') {
          const bodyChunks = [];
          req.on('data', chunk => bodyChunks.push(chunk));
          req.on('end', async () => {
            const rawBody = Buffer.concat(bodyChunks).toString('utf8');
            let body = null;
            try {
              body = rawBody ? JSON.parse(rawBody) : null;
            } catch {
              body = null;
            }

            const method = body?.method || req.headers['mcp-method'] || '';

            // Resolve target backend
            const route = resolveTargetServer(req, body, this.backends);
            const { serverId, targetUrl, strippedPath } = route;

            if (!targetUrl) {
              res.writeHead(502, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({
                jsonrpc: '2.0',
                error: { code: -32002, message: `Unknown target server '${serverId}'` },
                id: body?.id ?? null,
              }));
              return;
            }

            // Deterministic-List Caching for tools/list, resources/list, prompts/list
            if (method === 'tools/list' || method === 'resources/list' || method === 'prompts/list') {
              const cached = this.cache.get(serverId, method);
              if (cached) {
                res.writeHead(200, {
                  'Content-Type': 'application/json',
                  'X-Cache': 'HIT',
                  'Cache-Control': 'public, max-age=300',
                  'X-Hela-Server': serverId,
                  'mcp-method': method,
                  'mcp-protocol-version': '2026-07-28',
                });
                // Ensure the cached response has the current request's ID
                const responseData = { ...cached, id: body?.id ?? cached.id ?? null };
                res.end(JSON.stringify(responseData));
                return;
              }
            }

            // Forward to target backend via HTTP
            const targetEndpoint = `${targetUrl}${strippedPath === '/' ? '' : strippedPath}`;
            const forwardHeaders = {
              'Content-Type': 'application/json',
              'Accept': 'application/json, text/event-stream',
              'mcp-protocol-version': req.headers['mcp-protocol-version'] || '2026-07-28',
            };
            if (method) forwardHeaders['mcp-method'] = method;
            if (req.headers['mcp-name']) forwardHeaders['mcp-name'] = req.headers['mcp-name'];

            try {
              const backendRes = await fetch(targetEndpoint, {
                method: 'POST',
                headers: forwardHeaders,
                body: rawBody,
              });

              const backendText = await backendRes.text();
              let backendJson = null;
              try {
                backendJson = JSON.parse(backendText);
              } catch {
                backendJson = null;
              }

              // Cache successful list responses
              if (backendRes.ok && backendJson && (method === 'tools/list' || method === 'resources/list' || method === 'prompts/list')) {
                this.cache.set(serverId, method, backendJson);
              }

              res.writeHead(backendRes.status, {
                'Content-Type': 'application/json',
                'X-Cache': 'MISS',
                'X-Hela-Server': serverId,
                'mcp-method': method,
                'mcp-protocol-version': backendRes.headers.get('mcp-protocol-version') || '2026-07-28',
              });
              res.end(backendText);
            } catch (backendErr) {
              res.writeHead(502, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({
                jsonrpc: '2.0',
                error: { code: -32003, message: `Backend '${serverId}' unreachable at ${targetUrl}: ${backendErr.message}` },
                id: body?.id ?? null,
              }));
            }
          });
          return;
        }

        // If GET on SSE or discovery forward
        if (req.method === 'GET') {
          const route = resolveTargetServer(req, null, this.backends);
          const targetEndpoint = `${route.targetUrl}${route.strippedPath === '/' ? '' : route.strippedPath}`;
          try {
            const bRes = await fetch(targetEndpoint, { headers: req.headers });
            res.writeHead(bRes.status, Object.fromEntries(bRes.headers.entries()));
            const text = await bRes.text();
            res.end(text);
          } catch (err) {
            res.writeHead(502, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: err.message }));
          }
          return;
        }

        res.writeHead(405, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Method Not Allowed' }));
      } catch (err) {
        console.error('Gateway request error:', err);
        if (!res.headersSent) {
          res.writeHead(500, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Internal Gateway Error', details: err.message }));
        }
      }
    });

    return new Promise((resolve, reject) => {
      this.httpServer.listen(this.port, this.host, () => {
        console.error(`HeLa Gateway listening on http://${this.host}:${this.port}`);
        resolve();
      });
      this.httpServer.on('error', reject);
    });
  }

  async close() {
    if (this.httpServer) {
      await new Promise(resolve => this.httpServer.close(() => resolve()));
    }
  }
}

// Standalone execution
if (process.argv[1] && process.argv[1].endsWith('server.mjs')) {
  const portIdx = process.argv.indexOf('--port');
  const port = portIdx !== -1 ? parseInt(process.argv[portIdx + 1], 10) : undefined;
  const gateway = new HelaGateway({ port });
  gateway.start().catch(err => {
    console.error('Failed to start gateway:', err);
    process.exit(1);
  });
}
