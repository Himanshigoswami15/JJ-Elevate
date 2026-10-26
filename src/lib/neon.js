/**
 * Client helpers for communicating with Neon PostgreSQL backend API routes
 */

export async function checkNeonHealth() {
  try {
    const res = await fetch('/api/health');
    if (!res.ok) {
      return { success: false, message: `HTTP ${res.status}: ${res.statusText}` };
    }
    const data = await res.json();
    return data;
  } catch (err) {
    return { success: false, message: err.message || 'Neon API unreachable' };
  }
}

export async function fetchNeonContent() {
  try {
    const res = await fetch('/api/content');
    if (!res.ok) {
      return null;
    }
    const json = await res.json();
    if (json && json.success && json.content) {
      return {
        content: json.content,
        updatedAt: json.updatedAt
      };
    }
    return null;
  } catch (err) {
    console.warn('fetchNeonContent error:', err);
    return null;
  }
}

export async function saveNeonContent(contentData) {
  try {
    const res = await fetch('/api/content', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(contentData)
    });
    if (!res.ok) {
      const errJson = await res.json().catch(() => ({}));
      return {
        success: false,
        message: errJson.error || `HTTP ${res.status}`
      };
    }
    const json = await res.json();
    return {
      success: true,
      timestamp: json.timestamp || new Date().toISOString()
    };
  } catch (err) {
    return {
      success: false,
      message: err.message || 'Network error saving to Neon'
    };
  }
}

export async function fetchNeonInquiries() {
  try {
    const res = await fetch('/api/inquiries');
    if (!res.ok) return [];
    const json = await res.json();
    return json.inquiries || [];
  } catch (err) {
    console.warn('fetchNeonInquiries error:', err);
    return [];
  }
}

export async function saveNeonInquiry(inquiryData) {
  try {
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(inquiryData)
    });
    const json = await res.json();
    return json;
  } catch (err) {
    return { success: false, error: err.message };
  }
}
