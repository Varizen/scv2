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
  connectionTimeoutMillis: 5000,
});

// Redis client
export const redisClient = createClient({
  url: `redis://${config.redis.password ? `:${config.redis.password}@` : ''}${config.redis.host}:${config.redis.port}`,
});

export const connectDatabases = async (): Promise<void> => {
  try {
    // Test PostgreSQL connection
    const client = await pool.connect();
    console.log('✅ PostgreSQL connected successfully');
    client.release();

    // Connect to Redis
    await redisClient.connect();
    console.log('✅ Redis connected successfully');
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    process.exit(1);
  }
};

export const disconnectDatabases = async (): Promise<void> => {
  try {
    await pool.end();
    await redisClient.disconnect();
    console.log('✅ Databases disconnected successfully');
  } catch (error) {
    console.error('❌ Error disconnecting databases:', error);
  }
};

export default pool;