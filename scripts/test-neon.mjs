import { neon } from '@neondatabase/serverless';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const envLocalPath = path.resolve(__dirname, '../.env.local');

let dbUrl = process.env.DATABASE_URL;
if (!dbUrl && fs.existsSync(envLocalPath)) {
  const envContent = fs.readFileSync(envLocalPath, 'utf-8');
  const match = envContent.match(/DATABASE_URL=["']?([^"'\r\n]+)["']?/);
  if (match) dbUrl = match[1];
}

console.log('Connecting to Neon with URL:', dbUrl ? dbUrl.replace(/:[^:@]+@/, ':***@') : 'NONE');

if (!dbUrl) {
  console.error('DATABASE_URL not found in environment or .env.local');
  process.exit(1);
}

const sql = neon(dbUrl);

async function main() {
  try {
    const result = await sql`SELECT version(), current_database(), now()`;
    console.log('✓ Connection successful!');
    console.log('  Database:', result[0].current_database);
    console.log('  Postgres Version:', result[0].version.split(' on ')[0]);
    console.log('  Current Timestamp:', result[0].now);

    console.log('\nCreating schema tables: site_content and inquiries...');
    await sql`
      CREATE TABLE IF NOT EXISTS site_content (
        id TEXT PRIMARY KEY,
        data JSONB NOT NULL,
        updated_at TIMESTAMPTZ DEFAULT NOW()
      );
    `;
    console.log('✓ Table site_content verified/created.');

    await sql`
      CREATE TABLE IF NOT EXISTS inquiries (
        id TEXT PRIMARY KEY,
        created_at TIMESTAMPTZ DEFAULT NOW(),
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        phone TEXT,
        company TEXT,
        service TEXT,
        message TEXT,
        status TEXT DEFAULT 'new'
      );
    `;
    console.log('✓ Table inquiries verified/created.');

    const tables = await sql`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
      ORDER BY table_name
    `;
    console.log('\n✓ Active public tables:', tables.map(t => t.table_name).join(', '));

    console.log('\nTesting read/write on site_content...');
    const testPayload = {
      test: true,
      appName: 'JJ Elevate',
      updatedAt: new Date().toISOString()
    };
    await sql`
      INSERT INTO site_content (id, data, updated_at)
      VALUES ('neon_test', ${JSON.stringify(testPayload)}, NOW())
      ON CONFLICT (id) DO UPDATE SET data = EXCLUDED.data, updated_at = NOW();
    `;
    const readBack = await sql`SELECT * FROM site_content WHERE id = 'neon_test'`;
    console.log('✓ Successfully wrote and read back record from Neon:', readBack[0].id);

    // Clean up test record
    await sql`DELETE FROM site_content WHERE id = 'neon_test'`;
    console.log('✓ Test record cleaned up.');
    console.log('\n🎉 ALL NEON POSTGRES CHECKS PASSED!');
  } catch (err) {
    console.error('Neon test failed:', err);
    process.exit(1);
  }
}

main();
