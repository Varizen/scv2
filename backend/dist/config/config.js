"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.config = {
    env: process.env.NODE_ENV || 'development',
    port: parseInt(process.env.PORT || '3000'),
    database: {
        host: process.env.DB_HOST || 'localhost',
        port: parseInt(process.env.DB_PORT || '5432'),
        name: process.env.DB_NAME || 'labor_migration_platform',
        user: process.env.DB_USER || 'postgres',
        password: process.env.DB_PASSWORD || '',
        ssl: process.env.DB_SSL === 'true',
        maxConnections: parseInt(process.env.DB_MAX_CONNECTIONS || '20'),
    },
    redis: {
        host: process.env.REDIS_HOST || 'localhost',
        port: parseInt(process.env.REDIS_PORT || '6379'),
        password: process.env.REDIS_PASSWORD || '',
        db: parseInt(process.env.REDIS_DB || '0'),
    },
    jwt: {
        secret: process.env.JWT_SECRET || (process.env.NODE_ENV === 'production' ? (() => { throw new Error('JWT_SECRET must be set in production'); })() : 'fallback-secret-key'),
        refreshSecret: process.env.JWT_REFRESH_SECRET || (process.env.NODE_ENV === 'production' ? (() => { throw new Error('JWT_REFRESH_SECRET must be set in production'); })() : 'fallback-refresh-secret-key'),
        expiresIn: process.env.JWT_EXPIRES_IN || '15m',
        refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d',
    },
    cors: {
        origin: process.env.CORS_ORIGIN?.split(',') || (process.env.NODE_ENV === 'production' ? [] : ['http://localhost:3000', 'http://localhost:3001']),
        credentials: true,
    },
    smtp: {
        enabled: process.env.SMTP_ENABLED === 'true',
        host: process.env.SMTP_HOST || 'smtp.gmail.com',
        port: parseInt(process.env.SMTP_PORT || '587'),
        user: process.env.SMTP_USER || '',
        password: process.env.SMTP_PASSWORD || '',
        from: process.env.SMTP_FROM || 'noreply@labormigration.com',
    },
    stripe: {
        enabled: process.env.STRIPE_ENABLED === 'true',
        secretKey: process.env.STRIPE_SECRET_KEY || '',
        publishableKey: process.env.STRIPE_PUBLISHABLE_KEY || '',
        webhookSecret: process.env.STRIPE_WEBHOOK_SECRET || '',
    },
    aws: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
        region: process.env.AWS_REGION || 'us-east-1',
        s3Bucket: process.env.AWS_S3_BUCKET || '',
    },
    migrationCosts: {
        registration: parseInt(process.env.MIGRATION_COST_REGISTRATION || '50'),
        jobMatching: parseInt(process.env.MIGRATION_COST_JOB_MATCHING || '500'),
        documentation: parseInt(process.env.MIGRATION_COST_DOCUMENTATION || '300'),
        visaProcessing: parseInt(process.env.MIGRATION_COST_VISA_PROCESSING || '800'),
        preDeparture: parseInt(process.env.MIGRATION_COST_PRE_DEPARTURE || '400'),
        postArrival: parseInt(process.env.MIGRATION_COST_POST_ARRIVAL || '200'),
        employerServices: parseInt(process.env.MIGRATION_COST_EMPLOYER_SERVICES || '1000'),
    },
    fileUpload: {
        maxSize: parseInt(process.env.MAX_FILE_SIZE || '10485760'),
        allowedTypes: process.env.ALLOWED_FILE_TYPES?.split(',') || ['pdf', 'jpg', 'jpeg', 'png', 'doc', 'docx'],
    },
};
//# sourceMappingURL=config.js.map