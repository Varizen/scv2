"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.disconnectDatabases = exports.isRedisConnected = exports.isPostgresConnected = exports.connectDatabases = exports.redisClient = exports.pool = void 0;
const pg_1 = require("pg");
const redis_1 = require("redis");
const config_1 = require("./config");
exports.pool = new pg_1.Pool({
    host: config_1.config.database.host,
    port: config_1.config.database.port,
    database: config_1.config.database.name,
    user: config_1.config.database.user,
    password: config_1.config.database.password,
    ssl: config_1.config.database.ssl ? { rejectUnauthorized: false } : false,
    max: config_1.config.database.maxConnections,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 10000,
});
exports.redisClient = (0, redis_1.createClient)({
    url: `redis://${config_1.config.redis.password ? `:${config_1.config.redis.password}@` : ''}${config_1.config.redis.host}:${config_1.config.redis.port}`,
});
let pgConnected = false;
let redisConnected = false;
const connectDatabases = async () => {
    try {
        const client = await exports.pool.connect();
        console.log('✅ PostgreSQL connected successfully');
        client.release();
        pgConnected = true;
    }
    catch (error) {
        console.error('⚠️ PostgreSQL connection failed (will retry on demand):', error instanceof Error ? error.message : error);
    }
    try {
        await exports.redisClient.connect();
        console.log('✅ Redis connected successfully');
        redisConnected = true;
    }
    catch (error) {
        console.error('⚠️ Redis connection failed (will operate without cache):', error instanceof Error ? error.message : error);
    }
    if (config_1.config.env === 'production' && !pgConnected) {
        console.error('❌ Critical: PostgreSQL is required in production. Exiting.');
        process.exit(1);
    }
};
exports.connectDatabases = connectDatabases;
const isPostgresConnected = () => pgConnected;
exports.isPostgresConnected = isPostgresConnected;
const isRedisConnected = () => redisConnected;
exports.isRedisConnected = isRedisConnected;
const disconnectDatabases = async () => {
    try {
        await exports.pool.end();
        if (redisConnected) {
            await exports.redisClient.disconnect();
        }
        console.log('✅ Databases disconnected successfully');
    }
    catch (error) {
        console.error('❌ Error disconnecting databases:', error);
    }
};
exports.disconnectDatabases = disconnectDatabases;
exports.default = exports.pool;
//# sourceMappingURL=database.js.map