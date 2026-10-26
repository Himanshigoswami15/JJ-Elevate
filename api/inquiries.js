import { getDb } from './_db.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, PATCH, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const sql = getDb();

    if (req.method === 'GET') {
      const rows = await sql`
        SELECT id, created_at, name, email, phone, company, service, message, status
        FROM inquiries
        ORDER BY created_at DESC
        LIMIT 100
      `;
      return res.status(200).json({
        success: true,
        inquiries: rows.map(r => ({
          id: r.id,
          createdAt: r.created_at,
          name: r.name,
          email: r.email,
          phone: r.phone || '',
          company: r.company || '',
          service: r.service || '',
          message: r.message || '',
          status: r.status || 'new'
        }))
      });
    }

    if (req.method === 'PATCH') {
      let body = req.body;
      if (typeof body === 'string') {
        try {
          body = JSON.parse(body);
        } catch {
          return res.status(400).json({ success: false, error: 'Invalid JSON' });
        }
      }
      const { id, status } = body || {};
      if (!id || !status) {
        return res.status(400).json({ success: false, error: 'id and status are required' });
      }

      await sql`
        UPDATE inquiries 
        SET status = ${status}
        WHERE id = ${id}
      `;
      return res.status(200).json({ success: true, message: 'Inquiry status updated' });
    }

    if (req.method === 'DELETE') {
      const { id } = req.query || {};
      if (!id) {
        return res.status(400).json({ success: false, error: 'id query parameter required' });
      }

      await sql`DELETE FROM inquiries WHERE id = ${id}`;
      return res.status(200).json({ success: true, message: 'Inquiry deleted' });
    }

    return res.status(405).json({ success: false, error: 'Method not allowed' });
  } catch (err) {
    console.error('Neon inquiries API error:', err);
    return res.status(500).json({ success: false, error: err.message });
  }
}
