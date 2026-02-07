"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.runMigrations = runMigrations;
const pg_1 = require("pg");
const config_1 = require("../config/config");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const pool = new pg_1.Pool({
    host: config_1.config.database.host,
    port: config_1.config.database.port,
    database: config_1.config.database.name,
    user: config_1.config.database.user,
    password: config_1.config.database.password,
});
async function getAppliedMigrations() {
    try {
        const result = await pool.query('SELECT filename FROM migrations ORDER BY applied_at DESC');
        return result.rows.map(row => row.filename);
    }
    catch (error) {
        return [];
    }
}
async function recordMigration(filename) {
    await pool.query('INSERT INTO migrations (filename, applied_at) VALUES ($1, CURRENT_TIMESTAMP)', [filename]);
}
async function createMigrationsTable() {
    await pool.query(`
    CREATE TABLE IF NOT EXISTS migrations (
      id SERIAL PRIMARY KEY,
      filename VARCHAR(255) UNIQUE NOT NULL,
      applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);
}
async function runMigration(migration) {
    console.log(`Running migration: ${migration.filename}`);
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        await client.query(migration.content);
        await recordMigration(migration.filename);
        await client.query('COMMIT');
        console.log(`✅ Migration ${migration.filename} completed successfully`);
    }
    catch (error) {
        await client.query('ROLLBACK');
        console.error(`❌ Migration ${migration.filename} failed:`, error);
        throw error;
    }
    finally {
        client.release();
    }
}
async function loadMigrations() {
    const migrationsDir = path_1.default.join(__dirname, 'migrations');
    const files = fs_1.default.readdirSync(migrationsDir)
        .filter(file => file.endsWith('.sql'))
        .sort();
    const migrations = [];
    for (const filename of files) {
        const filePath = path_1.default.join(migrationsDir, filename);
        const content = fs_1.default.readFileSync(filePath, 'utf8');
        migrations.push({ filename, content });
    }
    return migrations;
}
async function runMigrations() {
    try {
        console.log('🚀 Starting database migrations...');
        await createMigrationsTable();
        const appliedMigrations = await getAppliedMigrations();
        const allMigrations = await loadMigrations();
        const pendingMigrations = allMigrations.filter(migration => !appliedMigrations.includes(migration.filename));
        if (pendingMigrations.length === 0) {
            console.log('✨ No pending migrations found');
            return;
        }
        console.log(`📋 Found ${pendingMigrations.length} pending migrations`);
        for (const migration of pendingMigrations) {
            await runMigration(migration);
        }
        console.log('🎉 All migrations completed successfully!');
    }
    catch (error) {
        console.error('💥 Migration failed:', error);
        process.exit(1);
    }
    finally {
        await pool.end();
    }
}
if (require.main === module) {
    runMigrations();
}
//# sourceMappingURL=runMigrations.js.map