import { getDb } from '../api/_db.js';
import { DEFAULT_ADMIN_DATA } from '../src/data/defaultAdminData.js';

async function seed() {
  const sql = getDb();
  console.log('Seeding Neon site_content table with complete website data...');
  
  await sql`
    INSERT INTO site_content (id, data, updated_at)
    VALUES ('main', ${JSON.stringify(DEFAULT_ADMIN_DATA)}, NOW())
    ON CONFLICT (id) DO UPDATE SET 
      data = EXCLUDED.data,
      updated_at = NOW();
  `;
  
  const verify = await sql`SELECT id, updated_at, jsonb_array_length(data->'teamMembers') as team_count FROM site_content WHERE id = 'main'`;
  console.log('✓ Seeding complete!');
  console.log('  Updated At:', verify[0].updated_at);
  console.log('  Team Members stored in Neon:', verify[0].team_count);
}

seed().catch(err => {
  console.error('Seed error:', err);
  process.exit(1);
});
