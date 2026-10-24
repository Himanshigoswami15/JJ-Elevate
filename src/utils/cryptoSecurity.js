/**
 * Security & Cryptography Utilities for JJ Elevate Admin Portal
 * Uses browser-native Web Crypto API (SHA-256)
 */

export async function hashPassword(plainTextPassword, salt = 'jj_elevate_secure_salt_2026') {
  if (!plainTextPassword) return '';
  const encoder = new TextEncoder();
  const data = encoder.encode(plainTextPassword + salt);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

export async function hashPin(plainTextPin, salt = 'jj_elevate_pin_salt_2026') {
  if (!plainTextPin) return '';
  const encoder = new TextEncoder();
  const data = encoder.encode(plainTextPin + salt);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

export function generateSessionToken() {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
}

export function generateRecoveryCode() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  const getChunk = (len = 4) => {
    let res = '';
    const array = new Uint8Array(len);
    crypto.getRandomValues(array);
    for (let i = 0; i < len; i++) {
      res += chars[array[i] % chars.length];
    }
    return res;
  };
  return `JJE-${getChunk(4)}-${getChunk(4)}-${getChunk(4)}`;
}

export function checkPasswordRequirements(password) {
  const p = password || '';
  return {
    minLength: p.length >= 8,
    hasUpper: /[A-Z]/.test(p),
    hasLower: /[a-z]/.test(p),
    hasNumber: /[0-9]/.test(p),
    hasSpecial: /[^A-Za-z0-9]/.test(p)
  };
}

export function calculatePasswordStrength(password) {
  if (!password) return { score: 0, label: 'None', color: '#94a3b8' };
  const reqs = checkPasswordRequirements(password);
  let score = 0;
  if (reqs.minLength) score += 1;
  if (password.length >= 12) score += 1;
  if (reqs.hasUpper && reqs.hasLower) score += 1;
  if (reqs.hasNumber) score += 1;
  if (reqs.hasSpecial) score += 1;

  if (score <= 1) return { score: 1, label: 'Weak', color: '#ef4444' };
  if (score === 2 || score === 3) return { score: 2, label: 'Fair', color: '#f59e0b' };
  if (score === 4) return { score: 3, label: 'Strong', color: '#10b981' };
  return { score: 4, label: 'Very Strong', color: '#059669' };
}

export function getClientDeviceInfo() {
  if (typeof window === 'undefined') return 'Server Environment';
  const ua = window.navigator.userAgent || '';
  let browser = 'Browser';
  if (ua.includes('Chrome')) browser = 'Chrome';
  else if (ua.includes('Safari')) browser = 'Safari';
  else if (ua.includes('Firefox')) browser = 'Firefox';
  else if (ua.includes('Edge')) browser = 'Edge';

  let os = 'OS';
  if (ua.includes('Windows')) os = 'Windows';
  else if (ua.includes('Macintosh')) os = 'macOS';
  else if (ua.includes('Linux')) os = 'Linux';
  else if (ua.includes('Android')) os = 'Android';
  else if (ua.includes('iPhone') || ua.includes('iPad')) os = 'iOS';

  return `${browser} on ${os}`;
}
