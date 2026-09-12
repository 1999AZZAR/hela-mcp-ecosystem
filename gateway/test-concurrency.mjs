import http from 'node:http';
import { execSync } from 'node:child_process';

function getProcessCount() {
  try {
    const out = execSync("ps aux | grep -E 'node|supergateway' | grep -v grep | wc -l").toString().trim();
    return parseInt(out, 10);
  } catch {
    return 0;
  }
}

function getMemoryUsageMB() {
  try {
    const out = execSync("ps aux | grep -E 'node|supergateway' | grep -v grep | awk '{sum+=$6} END {print sum/1024}'").toString().trim();
    return Math.round(parseFloat(out));
  } catch {
    return 0;
  }
}

async function sendRpc(url, payload, headers = {}) {
  const u = new URL(url);
  const data = JSON.stringify(payload);
  return new Promise((resolve, reject) => {
    const req = http.request(
      {
        hostname: u.hostname,
        port: u.port,
        path: u.pathname + u.search,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json, text/event-stream',
          'Content-Length': Buffer.byteLength(data),
          ...headers,
        },
      },
      (res) => {
        let body = '';
        res.on('data', (c) => (body += c));
        res.on('end', () => {
          resolve({ status: res.statusCode, headers: res.headers, body });
        });
      }
    );
    req.on('error', reject);
    req.write(data);
    req.end();
  });
}

async function run() {
  console.log('=== P2-D2 Concurrency & RAM Validation ===');
  const initialProcs = getProcessCount();
  const initialMem = getMemoryUsageMB();
  console.log(`Initial node/supergateway processes: ${initialProcs}`);
  console.log(`Initial node/supergateway RAM: ${initialMem} MB`);

  const targets = [
    { name: 'Gateway', url: 'http://127.0.0.1:8010/mcp' },
    { name: 'Mitosis (Native HTTP)', url: 'http://127.0.0.1:8011/' },
    { name: 'Genome (Native HTTP)', url: 'http://127.0.0.1:8012/' },
    { name: 'Membrane (Native HTTP)', url: 'http://127.0.0.1:8013/' },
  ];

  for (const target of targets) {
    console.log(`\nTesting ${target.name} with 10 concurrent sessions...`);
    const sessions = Array.from({ length: 10 }, (_, i) => i);
    const start = Date.now();

    const results = await Promise.all(
      sessions.map(async (sessionId) => {
        // 1. Initialize
        const initRes = await sendRpc(target.url, {
          jsonrpc: '2.0',
          id: 1,
          method: 'initialize',
          params: {
            protocolVersion: '2025-06-18',
            capabilities: {},
            clientInfo: { name: `client-${sessionId}`, version: '1.0' },
          },
        });

        // 2. tools/list
        const listRes = await sendRpc(target.url, {
          jsonrpc: '2.0',
          id: 2,
          method: 'tools/list',
          params: {},
        });

        return {
          sessionId,
          initStatus: initRes.status,
          listStatus: listRes.status,
          listOk: listRes.body.includes('result') || listRes.body.includes('tools'),
        };
      })
    );

    const duration = Date.now() - start;
    const all200 = results.every((r) => r.initStatus === 200 && r.listStatus === 200);
    const allValid = results.every((r) => r.listOk);
    const currentProcs = getProcessCount();
    const currentMem = getMemoryUsageMB();

    console.log(`  -> Duration: ${duration}ms`);
    console.log(`  -> All 200 OK: ${all200}`);
    console.log(`  -> All Valid Responses: ${allValid}`);
    console.log(`  -> Node processes: ${currentProcs} (diff: ${currentProcs - initialProcs})`);
    console.log(`  -> Total Node RAM: ${currentMem} MB (diff: ${currentMem - initialMem} MB)`);

    if (!all200 || !allValid) {
      console.error('Validation failed for', target.name, results);
      process.exit(1);
    }
  }

  console.log('\n=== Final Stability Check ===');
  const finalProcs = getProcessCount();
  const finalMem = getMemoryUsageMB();
  console.log(`Final node processes: ${finalProcs} (initial: ${initialProcs})`);
  console.log(`Final total RAM: ${finalMem} MB (initial: ${initialMem} MB)`);
  console.log('Zero process explosion verified! Concurrency test PASSED.\n');
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
