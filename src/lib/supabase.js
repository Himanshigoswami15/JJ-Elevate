import { createClient } from '@supabase/supabase-js';

// Configuration keys
const CONFIG_KEY = 'jj_supabase_config_v1';

/**
 * Retrieve Supabase configuration from environment variables or saved localStorage settings.
 */
export function getSupabaseConfig() {
  const envUrl = import.meta.env.VITE_SUPABASE_URL || '';
  const envKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

  if (typeof window === 'undefined') {
    return { url: envUrl, anonKey: envKey };
  }

  try {
    const saved = localStorage.getItem(CONFIG_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed.url && parsed.anonKey) {
        return {
          url: parsed.url.trim(),
          anonKey: parsed.anonKey.trim()
        };
      }
    }
  } catch {
    // fallback
  }

  return {
    url: envUrl.trim(),
    anonKey: envKey.trim()
  };
}

/**
 * Save user-entered Supabase config from admin settings
 */
export function saveSupabaseConfig({ url, anonKey }) {
  if (typeof window === 'undefined') return;
  const cleanUrl = (url || '').trim();
  const cleanKey = (anonKey || '').trim();
  localStorage.setItem(CONFIG_KEY, JSON.stringify({ url: cleanUrl, anonKey: cleanKey }));
  // Re-instantiate client
  initSupabaseClient();
}

/**
 * Clear Supabase config
 */
export function clearSupabaseConfig() {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(CONFIG_KEY);
  cachedClient = null;
}

let cachedClient = null;

export function initSupabaseClient() {
  const { url, anonKey } = getSupabaseConfig();
  if (url && anonKey) {
    try {
      cachedClient = createClient(url, anonKey, {
        auth: {
          persistSession: false
        }
      });
      return cachedClient;
    } catch (err) {
      console.warn('Failed to initialize Supabase client:', err);
      cachedClient = null;
      return null;
    }
  }
  cachedClient = null;
  return null;
}

export function getSupabaseClient() {
  if (!cachedClient) {
    initSupabaseClient();
  }
  return cachedClient;
}

export function isSupabaseConfigured() {
  const { url, anonKey } = getSupabaseConfig();
  return Boolean(url && anonKey);
}

/**
 * Test connectivity to Supabase and verify the `site_content` table exists
 */
export async function testSupabaseConnection() {
  const client = getSupabaseClient();
  if (!client) {
    return {
      success: false,
      message: 'Supabase URL and Anon Key are missing or invalid.'
    };
  }

  try {
    const { data, error } = await client
      .from('site_content')
      .select('id, updated_at')
      .eq('id', 'main')
      .maybeSingle();

    if (error) {
      if (error.code === '42P01') { // PostgreSQL table does not exist
        return {
          success: false,
          needsTable: true,
          message: 'Connected to Supabase, but the "site_content" table does not exist yet. Please run the provided SQL setup script.'
        };
      }
      return {
        success: false,
        message: `Database error: ${error.message}`
      };
    }

    return {
      success: true,
      hasRecord: Boolean(data),
      message: 'Connected to Supabase successfully! Cloud synchronization is active.'
    };
  } catch (err) {
    return {
      success: false,
      message: `Connection failed: ${err.message || 'Unknown network error'}`
    };
  }
}

/**
 * Fetch global website data from Supabase `site_content` table
 */
export async function fetchRemoteContent() {
  const client = getSupabaseClient();
  if (!client) return null;

  try {
    const { data, error } = await client
      .from('site_content')
      .select('data, updated_at')
      .eq('id', 'main')
      .maybeSingle();

    if (error) {
      console.warn('Supabase fetchRemoteContent warning:', error.message);
      return null;
    }

    if (data && data.data) {
      return {
        content: data.data,
        updatedAt: data.updated_at
      };
    }
  } catch (err) {
    console.error('Failed to fetch remote content from Supabase:', err);
  }
  return null;
}

/**
 * Upsert global website data to Supabase `site_content` table
 */
export async function saveRemoteContent(contentData) {
  const client = getSupabaseClient();
  if (!client) {
    return { success: false, message: 'Supabase is not configured.' };
  }

  try {
    const payload = {
      id: 'main',
      data: contentData,
      updated_at: new Date().toISOString()
    };

    const { error } = await client
      .from('site_content')
      .upsert(payload, { onConflict: 'id' });

    if (error) {
      console.error('Supabase saveRemoteContent error:', error);
      return { success: false, message: error.message };
    }

    return { success: true, timestamp: payload.updated_at };
  } catch (err) {
    console.error('saveRemoteContent exception:', err);
    return { success: false, message: err.message || 'Network error' };
  }
}

/**
 * Upload an image file (e.g. team member photo, case study banner) to Supabase Storage
 * Returns the permanent public CDN URL.
 */
export async function uploadMediaFile(file, folder = 'team') {
  const client = getSupabaseClient();
  if (!client) {
    return { success: false, message: 'Supabase client not initialized.' };
  }

  try {
    const bucketName = 'media';
    const ext = file.name ? file.name.split('.').pop() : 'jpg';
    const cleanExt = ext.replace(/[^a-zA-Z0-9]/g, '').toLowerCase() || 'jpg';
    const fileName = `${folder}/${Date.now()}_${Math.random().toString(36).slice(2, 8)}.${cleanExt}`;

    const { data: uploadData, error: uploadError } = await client.storage
      .from(bucketName)
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: true
      });

    if (uploadError) {
      console.error('Storage upload error:', uploadError);
      return {
        success: false,
        message: `Upload to Supabase Storage failed: ${uploadError.message}. Make sure the "${bucketName}" storage bucket exists and is set to Public.`
      };
    }

    const { data: publicUrlData } = client.storage
      .from(bucketName)
      .getPublicUrl(uploadData.path);

    if (publicUrlData && publicUrlData.publicUrl) {
      return {
        success: true,
        url: publicUrlData.publicUrl
      };
    }

    return { success: false, message: 'Could not generate public URL for uploaded media.' };
  } catch (err) {
    return { success: false, message: err.message || 'Image upload error' };
  }
}
