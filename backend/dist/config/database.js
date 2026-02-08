"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.disconnectDatabases = exports.connectDatabases = exports.redisClient = exports.pool = void 0;
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
    connectionTimeoutMillis: 5000,
});
exports.redisClient = (0, redis_1.createClient)({
    url: `redis://${config_1.config.redis.password ? `:${config_1.config.redis.password}@` : ''}${config_1.config.redis.host}:${config_1.config.redis.port}`,
});
const connectDatabases = async () => {
    try {
        const client = await exports.pool.connect();
        console.log('✅ PostgreSQL connected successfully');
        client.release();
        await exports.redisClient.connect();
        console.log('✅ Redis connected successfully');
    }
    catch (error) {
        console.error('❌ Database connection failed:', error);
        process.exit(1);
    }
};
exports.connectDatabases = connectDatabases;
const disconnectDatabases = async () => {
    try {
        await exports.pool.end();
        await exports.redisClient.disconnect();
        console.log('✅ Databases disconnected successfully');
    }
    catch (error) {
        console.error('❌ Error disconnecting databases:', error);
    }
};
exports.disconnectDatabases = disconnectDatabases;
exports.default = exports.pool;
//# sourceMappingURL=database.js.map