const { createClient } = require('redis');

let isConnected = false;
const inMemoryFallback = new Map();

const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379';

const redisClient = createClient({
  url: redisUrl,
  socket: {
    reconnectStrategy: (retries) => {
      // Retry up to 3 times on boot, then fall back to in-memory gracefully
      if (retries > 3) {
        return new Error('Redis connection retry limit reached');
      }
      return Math.min(retries * 500, 2000);
    },
    connectTimeout: 5000,
  },
});

redisClient.on('error', (err) => {
  // Prevent unhandled error crashes
  isConnected = false;
  if (process.env.NODE_ENV !== 'production' && !process.env.REDIS_URL) {
    // Only log brief warning if local Redis is not running
    // console.warn('⚠️ Redis offline (using in-memory fallback):', err.message);
  } else {
    console.error('❌ Redis Client Error:', err.message);
  }
});

redisClient.on('connect', () => {
  console.log('🔄 Connecting to Redis...');
});

redisClient.on('ready', () => {
  isConnected = true;
  console.log('✅ Redis Connected & Ready!');
});

redisClient.on('end', () => {
  isConnected = false;
});

/**
 * Connect to Redis on server startup
 */
const connectRedis = async () => {
  try {
    if (!process.env.REDIS_URL && process.env.NODE_ENV === 'production') {
      console.log('ℹ️ No REDIS_URL configured; skipping Redis connection.');
      return false;
    }
    await redisClient.connect();
    isConnected = true;
    return true;
  } catch (err) {
    isConnected = false;
    console.warn(`⚠️ Could not connect to Redis at ${redisUrl}: ${err.message}`);
    console.log('👉 Falling back to fast server in-memory caching.');
    return false;
  }
};

/**
 * Get cached value (from Redis or fallback)
 */
const getCache = async (key) => {
  try {
    if (isConnected && redisClient.isReady) {
      const data = await redisClient.get(key);
      return data ? JSON.parse(data) : null;
    }
  } catch (err) {
    console.error('Redis getCache error:', err.message);
  }

  // Fallback to in-memory cache
  const cached = inMemoryFallback.get(key);
  if (cached && cached.expiresAt > Date.now()) {
    return cached.value;
  }
  return null;
};

/**
 * Set cache with TTL in seconds (default: 60s)
 */
const setCache = async (key, value, ttlSeconds = 60) => {
  try {
    if (isConnected && redisClient.isReady) {
      await redisClient.set(key, JSON.stringify(value), { EX: ttlSeconds });
      return;
    }
  } catch (err) {
    console.error('Redis setCache error:', err.message);
  }

  // Fallback to in-memory cache
  inMemoryFallback.set(key, {
    value,
    expiresAt: Date.now() + (ttlSeconds * 1000),
  });
};

/**
 * Delete a specific cache key
 */
const delCache = async (key) => {
  try {
    if (isConnected && redisClient.isReady) {
      await redisClient.del(key);
    }
  } catch (err) {
    console.error('Redis delCache error:', err.message);
  }
  inMemoryFallback.delete(key);
};

/**
 * Clear all cache or matching keys
 */
const clearCache = async (pattern = '*') => {
  try {
    if (isConnected && redisClient.isReady) {
      if (pattern === '*' || !pattern) {
        await redisClient.flushDb();
      } else {
        const keys = await redisClient.keys(pattern);
        if (keys.length > 0) {
          await redisClient.del(keys);
        }
      }
    }
  } catch (err) {
    console.error('Redis clearCache error:', err.message);
  }
  inMemoryFallback.clear();
};

/**
 * Check if Redis is connected
 */
const isRedisReady = () => isConnected && redisClient.isReady;

module.exports = {
  redisClient,
  connectRedis,
  getCache,
  setCache,
  delCache,
  clearCache,
  isRedisReady,
};