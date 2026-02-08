import { Pool } from 'pg';
import { createClient } from 'redis';
import { config } from './config';

// PostgreSQL connection pool
export const pool = new Pool({
  host: config.database.host,
  port: config.database.port,
  database: config.database.name,
  user: config.database.user,
  password: config.database.password,
  ssl: config.database.ssl ? { rejectUnauthorized: false } : false,
  max: config.database.maxConnections,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 10000,
});

// Redis client
export const redisClient = createClient({
  url: `redis://${config.redis.password ? `:${config.redis.password}@` : ''}${config.redis.host}:${config.redis.port}`,
});

// Track connection status
let pgConnected = false;
let redisConnected = false;

export const connectDatabases = async (): Promise<void> => {
  // Try PostgreSQL connection
  try {
    const client = await pool.connect();
    console.log('✅ PostgreSQL connected successfully');
    client.release();
    pgConnected = true;
  } catch (error) {
    console.error('⚠️ PostgreSQL connection failed (will retry on demand):', error instanceof Error ? error.message : error);
    // Don't exit - let the server start and retry connections on demand
  }

  // Try Redis connection
  try {
    await redisClient.connect();
    console.log('✅ Redis connected successfully');
    redisConnected = true;
  } catch (error) {
    console.error('⚠️ Redis connection failed (will operate without cache):', error instanceof Error ? error.message : error);
    // Don't exit - Redis is optional for basic functionality
  }

  // Only exit if ALL database connections failed in production
  if (config.env === 'production' && !pgConnected) {
    console.error('❌ Critical: PostgreSQL is required in production. Exiting.');
    process.exit(1);
  }
};

export const isPostgresConnected = (): boolean => pgConnected;
export const isRedisConnected = (): boolean => redisConnected;

export const disconnectDatabases = async (): Promise<void> => {
  try {
    await pool.end();
    if (redisConnected) {
      await redisClient.disconnect();
    }
    console.log('✅ Databases disconnected successfully');
  } catch (error) {
    console.error('❌ Error disconnecting databases:', error);
  }
};

export default pool;