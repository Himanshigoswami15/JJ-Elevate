import { neon } from '@neondatabase/serverless';
import fs from 'fs';
import path from 'path';

// Helper to get Neon database URL
export function getDatabaseUrl() {
  if (process.env.DATABASE_URL) {
    return process.env.DATABASE_URL;
  }

  // Fallback to reading .env.local if running in local environment where process.env is not populated
  try {
    const envPath = path.resolve(process.cwd(), '.env.local');
    if (fs.existsSync(envPath)) {
      const content = fs.readFileSync(envPath, 'utf-8');
      const match = content.match(/DATABASE_URL=["']?([^"'\r\n]+)["']?/);
      if (match) return match[1];
    }
  } catch {
    // ignore
  }

  return null;
}

export function getDb() {
  const url = getDatabaseUrl();
  if (!url) {
    throw new Error('DATABASE_URL is not configured.');
  }
  return neon(url);
}
