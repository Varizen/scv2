"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.disconnectDatabases = exports.connectDatabases = exports.redisClient = exports.pool = void 0;
const pg_1 = require("pg");
const redis_1 = require("redis");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.pool = new pg_1.Pool({
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432'),
    database: process.env.DB_NAME || 'labor_migration_platform',
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'password',
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
});
exports.redisClient = (0, redis_1.createClient)({
    socket: {
        host: process.env.REDIS_HOST || 'localhost',
        port: parseInt(process.env.REDIS_PORT || '6379'),
    },
    password: process.env.REDIS_PASSWORD || undefined,
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