import { Pool } from 'pg';
import { config } from '../config/config';
import fs from 'fs';
import path from 'path';

const pool = new Pool({
  host: config.database.host,
  port: config.database.port,
  database: config.database.name,
  user: config.database.user,
  password: config.database.password,
});

interface Migration {
  filename: string;
  content: string;
}

async function getAppliedMigrations(): Promise<string[]> {
  try {
    const result = await pool.query(
      'SELECT filename FROM migrations ORDER BY applied_at DESC'
    );
    return result.rows.map((row: any) => row.filename);
  } catch (error) {
    // If migrations table doesn't exist, return empty array
    return [];
  }
}

async function recordMigration(filename: string): Promise<void> {
  await pool.query(
    'INSERT INTO migrations (filename, applied_at) VALUES ($1, CURRENT_TIMESTAMP)',
    [filename]
  );
}

async function createMigrationsTable(): Promise<void> {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS migrations (
      id SERIAL PRIMARY KEY,
      filename VARCHAR(255) UNIQUE NOT NULL,
      applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);
}

async function runMigration(migration: Migration): Promise<void> {
  console.log(`Running migration: ${migration.filename}`);

  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    await client.query(migration.content);
    await recordMigration(migration.filename);
    await client.query('COMMIT');
    console.log(`✅ Migration ${migration.filename} completed successfully`);
  } catch (error) {
    await client.query('ROLLBACK');
    console.error(`❌ Migration ${migration.filename} failed:`, error);
    throw error;
  } finally {
    client.release();
  }
}

async function loadMigrations(): Promise<Migration[]> {
  const migrationsDir = path.join(__dirname, 'migrations');
  const files = fs.readdirSync(migrationsDir)
    .filter(file => file.endsWith('.sql'))
    .sort(); // Sort to ensure consistent order

  const migrations: Migration[] = [];

  for (const filename of files) {
    const filePath = path.join(migrationsDir, filename);
    const content = fs.readFileSync(filePath, 'utf8');
    migrations.push({ filename, content });
  }

  return migrations;
}

async function runMigrations(): Promise<void> {
  try {
    console.log('🚀 Starting database migrations...');

    // Create migrations table if it doesn't exist
    await createMigrationsTable();

    const appliedMigrations = await getAppliedMigrations();
    const allMigrations = await loadMigrations();

    const pendingMigrations = allMigrations.filter(
      migration => !appliedMigrations.includes(migration.filename)
    );

    if (pendingMigrations.length === 0) {
      console.log('✨ No pending migrations found');
      return;
    }

    console.log(`📋 Found ${pendingMigrations.length} pending migrations`);

    for (const migration of pendingMigrations) {
      await runMigration(migration);
    }

    console.log('🎉 All migrations completed successfully!');
  } catch (error) {
    console.error('💥 Migration failed:', error);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

// Run migrations if this script is executed directly
if (require.main === module) {
  runMigrations();
}

export { runMigrations };