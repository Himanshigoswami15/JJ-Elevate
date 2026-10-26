import { getDb } from '../api/_db.js';

async function check() {
  const sql = getDb();
  const rows = await sql`SELECT id, updated_at, data FROM site_content`;
  console.log('Row count:', rows.length);
  for (const r of rows) {
    console.log('ID:', r.id, 'Updated At:', r.updated_at);
    if (r.data) {
      console.log('Data keys:', Object.keys(r.data));
      console.log('Team members count:', r.data.teamMembers?.length);
    }
  }
}
check();
