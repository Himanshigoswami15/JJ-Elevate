import { getDb } from './_db.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const sql = getDb();

    if (req.method === 'GET') {
      const rows = await sql`SELECT data, updated_at FROM site_content WHERE id = 'main' LIMIT 1`;
      if (rows.length > 0) {
        return res.status(200).json({
          success: true,
          content: rows[0].data,
          data: rows[0].data,
          updatedAt: rows[0].updated_at
        });
      }
      return res.status(200).json({
        success: true,
        content: null,
        data: null,
        message: 'No saved site content found in Neon database yet.'
      });
    }

    if (req.method === 'POST') {
      let body = req.body;
      if (typeof body === 'string') {
        try {
          body = JSON.parse(body);
        } catch {
          return res.status(400).json({ success: false, error: 'Invalid JSON body' });
        }
      }

      if (!body) {
        return res.status(400).json({ success: false, error: 'Request body is required.' });
      }

      const contentToSave = body.data || body;
      const timestamp = new Date().toISOString();

      await sql`
        INSERT INTO site_content (id, data, updated_at)
        VALUES ('main', ${JSON.stringify(contentToSave)}, NOW())
        ON CONFLICT (id) DO UPDATE 
        SET data = EXCLUDED.data, updated_at = NOW();
      `;

      return res.status(200).json({
        success: true,
        updatedAt: timestamp,
        message: 'Site content synchronized to Neon Postgres successfully.'
      });
    }

    return res.status(405).json({ success: false, error: 'Method not allowed.' });
  } catch (err) {
    console.error('Neon content API error:', err);
    return res.status(500).json({
      success: false,
      error: err.message || 'Database error'
    });
  }
}
