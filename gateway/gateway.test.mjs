import test from 'node:test';
import assert from 'node:assert/strict';
import http from 'node:http';
import { HelaGateway } from './server.mjs';

test('HeLa Gateway Architecture & Routing (P2-D2, P2-D3)', async (t) => {
  // Setup 2 mock backend servers (mitosis on 8981, membrane on 8982)
  let mitosisCallCount = 0;
  const mockMitosis = http.createServer((req, res) => {
    mitosisCallCount++;
    if (req.url === '/healthz') {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ status: 'ok', server: 'hela-mitosis' }));
      return;
    }
    const chunks = [];
    req.on('data', c => chunks.push(c));
    req.on('end', () => {
      const body = JSON.parse(Buffer.concat(chunks).toString());
      if (body.method === 'tools/list') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
          jsonrpc: '2.0',
          id: body.id,
          result: { tools: [{ name: 'sequentialthinking' }] }
        }));
        return;
      }
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ jsonrpc: '2.0', id: body.id, result: { executedBy: 'mitosis' } }));
    });
  });

  let membraneListCount = 0;
  const mockMembrane = http.createServer((req, res) => {
    if (req.url === '/healthz') {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ status: 'ok', server: 'hela-membrane' }));
      return;
    }
    const chunks = [];
    req.on('data', c => chunks.push(c));
    req.on('end', () => {
      const body = JSON.parse(Buffer.concat(chunks).toString());
      if (body.method === 'tools/list') {
        membraneListCount++;
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
          jsonrpc: '2.0',
          id: body.id,
          result: { tools: [{ name: 'read_file' }, { name: 'write_file' }] }
        }));
        return;
      }
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ jsonrpc: '2.0', id: body.id, result: { executedBy: 'membrane', tool: body.params?.name } }));
    });
  });

  await new Promise(r => mockMitosis.listen(8981, '127.0.0.1', r));
  await new Promise(r => mockMembrane.listen(8982, '127.0.0.1', r));

  const gatewayPort = 8980;
  const gateway = new HelaGateway({
    port: gatewayPort,
    host: '127.0.0.1',
    authKey: 'test-secret-key',
    backends: {
      'hela-mitosis': 'http://127.0.0.1:8981',
      'hela-membrane': 'http://127.0.0.1:8982',
    },
    cacheTtlMs: 5000,
  });

  await gateway.start();

  await t.test('1. Auth layer: unauthorized requests rejected with 401', async () => {
    const res = await fetch(`http://127.0.0.1:${gatewayPort}/`, {
      method: 'POST',
      body: JSON.stringify({ jsonrpc: '2.0', id: 1, method: 'tools/list' }),
    });
    assert.equal(res.status, 401);
    const body = await res.json();
    assert.equal(body.error?.code, -32001);
  });

  await t.test('2. Auth layer: Bearer token accepted', async () => {
    const res = await fetch(`http://127.0.0.1:${gatewayPort}/`, {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer test-secret-key',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ jsonrpc: '2.0', id: 1, method: 'tools/list' }),
    });
    assert.equal(res.status, 200);
  });

  await t.test('3. Capability routing: tool name routes to membrane', async () => {
    const res = await fetch(`http://127.0.0.1:${gatewayPort}/`, {
      method: 'POST',
      headers: {
        'X-Api-Key': 'test-secret-key',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        jsonrpc: '2.0',
        id: 2,
        method: 'tools/call',
        params: { name: 'read_file', arguments: { path: 'test.txt' } }
      }),
    });
    assert.equal(res.status, 200);
    assert.equal(res.headers.get('x-hela-server'), 'hela-membrane');
    const body = await res.json();
    assert.equal(body.result.executedBy, 'membrane');
  });

  await t.test('4. Header routing: Mcp-Name header routes to membrane', async () => {
    const res = await fetch(`http://127.0.0.1:${gatewayPort}/`, {
      method: 'POST',
      headers: {
        'X-Api-Key': 'test-secret-key',
        'Content-Type': 'application/json',
        'Mcp-Name': 'write_file',
      },
      body: JSON.stringify({
        jsonrpc: '2.0',
        id: 3,
        method: 'tools/call',
        params: { arguments: {} }
      }),
    });
    assert.equal(res.status, 200);
    assert.equal(res.headers.get('x-hela-server'), 'hela-membrane');
  });

  await t.test('5. Path prefix routing: /mitosis routes to mitosis', async () => {
    const res = await fetch(`http://127.0.0.1:${gatewayPort}/mitosis`, {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer test-secret-key',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        jsonrpc: '2.0',
        id: 4,
        method: 'tools/call',
        params: { name: 'any_tool' }
      }),
    });
    assert.equal(res.status, 200);
    assert.equal(res.headers.get('x-hela-server'), 'hela-mitosis');
    const body = await res.json();
    assert.equal(body.result.executedBy, 'mitosis');
  });

  await t.test('6. Deterministic-list caching: 1st MISS, 2nd HIT without backend call', async () => {
    const initialMembraneCount = membraneListCount;

    // Call 1: should MISS and query backend
    const res1 = await fetch(`http://127.0.0.1:${gatewayPort}/membrane`, {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer test-secret-key',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ jsonrpc: '2.0', id: 'call-1', method: 'tools/list' }),
    });
    assert.equal(res1.status, 200);
    assert.equal(res1.headers.get('x-cache'), 'MISS');
    assert.equal(membraneListCount, initialMembraneCount + 1);

    // Call 2: should HIT cache, membraneListCount unchanged!
    const res2 = await fetch(`http://127.0.0.1:${gatewayPort}/membrane`, {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer test-secret-key',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ jsonrpc: '2.0', id: 'call-2', method: 'tools/list' }),
    });
    assert.equal(res2.status, 200);
    assert.equal(res2.headers.get('x-cache'), 'HIT');
    assert.equal(membraneListCount, initialMembraneCount + 1); // NO extra backend call!
    const body2 = await res2.json();
    assert.equal(body2.id, 'call-2');
    assert.equal(body2.result.tools.length, 2);
  });

  await t.test('7. Cache purge: POST /cache/purge invalidates cache', async () => {
    const currentCount = membraneListCount;
    const purgeRes = await fetch(`http://127.0.0.1:${gatewayPort}/cache/purge`, {
      method: 'POST',
      headers: { 'Authorization': 'Bearer test-secret-key' }
    });
    assert.equal(purgeRes.status, 200);

    // Next call should MISS and re-query
    const res = await fetch(`http://127.0.0.1:${gatewayPort}/membrane`, {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer test-secret-key',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ jsonrpc: '2.0', id: 'call-3', method: 'tools/list' }),
    });
    assert.equal(res.status, 200);
    assert.equal(res.headers.get('x-cache'), 'MISS');
    assert.equal(membraneListCount, currentCount + 1);
  });

  await t.test('8. Healthz inspection: checks gateway and backend statuses', async () => {
    const res = await fetch(`http://127.0.0.1:${gatewayPort}/healthz`);
    assert.equal(res.status, 200);
    const body = await res.json();
    assert.equal(body.status, 'ok');
    assert.equal(body.backends['hela-mitosis'].status, 'up');
    assert.equal(body.backends['hela-membrane'].status, 'up');
  });

  await t.test('9. Concurrency: 10 concurrent requests handled with 0 process spawns', async () => {
    const promises = Array.from({ length: 10 }, (_, i) =>
      fetch(`http://127.0.0.1:${gatewayPort}/mitosis`, {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer test-secret-key',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ jsonrpc: '2.0', id: `concurrent-${i}`, method: 'tools/call' }),
      })
    );

    const responses = await Promise.all(promises);
    for (const res of responses) {
      assert.equal(res.status, 200);
      const json = await res.json();
      assert.equal(json.result?.executedBy, 'mitosis');
    }
  });

  await gateway.close();
  await new Promise(r => mockMitosis.close(r));
  await new Promise(r => mockMembrane.close(r));
});
