/**
 * HeLa Gateway Deterministic-List Cache (P2-D3).
 *
 * Caches tools/list, resources/list, and prompts/list responses
 * with TTL to avoid redundant backend roundtrips and JSON serialization.
 */
export class ListCache {
  constructor(defaultTtlMs = 300000) {
    this.defaultTtlMs = defaultTtlMs;
    this.cache = new Map();
    this.stats = { hits: 0, misses: 0, sets: 0, purges: 0 };
  }

  makeKey(serverId, method) {
    return `${serverId}:${method}`;
  }

  get(serverId, method) {
    const key = this.makeKey(serverId, method);
    const entry = this.cache.get(key);
    if (!entry) {
      this.stats.misses++;
      return null;
    }
    if (Date.now() > entry.expiresAt) {
      this.cache.delete(key);
      this.stats.misses++;
      return null;
    }
    this.stats.hits++;
    return entry.data;
  }

  set(serverId, method, data, ttlMs = this.defaultTtlMs) {
    const key = this.makeKey(serverId, method);
    this.cache.set(key, {
      data,
      expiresAt: Date.now() + ttlMs,
      cachedAt: Date.now(),
    });
    this.stats.sets++;
  }

  purge(serverId = null) {
    if (serverId) {
      for (const key of this.cache.keys()) {
        if (key.startsWith(`${serverId}:`)) {
          this.cache.delete(key);
        }
      }
    } else {
      this.cache.clear();
    }
    this.stats.purges++;
  }

  getStats() {
    return {
      ...this.stats,
      size: this.cache.size,
      ttlMs: this.defaultTtlMs,
    };
  }
}
