import { getDb } from './_db.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const sql = getDb();
    const result = await sql`
      SELECT 
        version(),
        current_database() as database_name,
        now() as server_time,
        (SELECT count(*) FROM information_schema.tables WHERE table_schema = 'public') as table_count
    `;

    return res.status(200).json({
      success: true,
      isConnected: true,
      status: 'healthy',
      provider: 'Neon',
      database: result[0].database_name,
      postgresVersion: result[0].version.split(' on ')[0],
      serverTime: result[0].server_time,
      publicTableCount: Number(result[0].table_count),
      branch: process.env.NEON_BRANCH || 'production'
    });
  } catch (err) {
    return res.status(500).json({
      status: 'unhealthy',
      provider: 'Neon',
      error: err.message
    });
  }
}
