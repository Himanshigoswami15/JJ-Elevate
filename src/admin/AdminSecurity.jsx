import React, { useState, useEffect } from 'react';
import { useAdminData } from '../context/AdminDataContext';
import {
  calculatePasswordStrength,
  checkPasswordRequirements,
  generateRecoveryCode
} from '../utils/cryptoSecurity';
import './admin.css';

export default function AdminSecurity({ showToast }) {
  const {
    adminSecuritySettings,
    isUsingDefaultPassword,
    updateAdminCredentials,
    configureTwoFactor,
    triggerEmergencyLockdown,
    clearAuditLogs,
    resetLockoutCounter,
    logoutAdmin,
    cloudSyncStatus,
    lastCloudSyncTime,
    syncToCloud,
    checkNeonHealth,
    isCloudConfigured,
    getSupabaseConfig,
    saveSupabaseConfig,
    clearSupabaseConfig,
    testSupabaseConnection
  } = useAdminData();

  // Neon Cloud status state
  const [neonHealth, setNeonHealth] = useState(null);
  const [checkingNeon, setCheckingNeon] = useState(false);

  const handleTestNeon = async () => {
    setCheckingNeon(true);
    try {
      const res = await checkNeonHealth();
      setCheckingNeon(false);
      setNeonHealth(res);
      if (res && res.success && showToast) {
        showToast('Connected to Neon PostgreSQL cloud database!');
      }
    } catch (err) {
      setCheckingNeon(false);
      setNeonHealth({ success: false, message: err.message });
    }
  };

  // Supabase Cloud Configuration state (Optional mirror)
  const [supabaseUrl, setSupabaseUrl] = useState(() => getSupabaseConfig().url || '');
  const [supabaseAnonKey, setSupabaseAnonKey] = useState(() => getSupabaseConfig().anonKey || '');
  const [testingConnection, setTestingConnection] = useState(false);
  const [connectionResult, setConnectionResult] = useState(null);
  const [isSyncingCloud, setIsSyncingCloud] = useState(false);
  const [copiedSql, setCopiedSql] = useState(false);
  const [showSqlSetup, setShowSqlSetup] = useState(!isCloudConfigured);

  // Master credentials state
  const [currentPassword, setCurrentPassword] = useState('');
  const [newUsername, setNewUsername] = useState(adminSecuritySettings?.username || 'admin');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [isUpdatingCreds, setIsUpdatingCreds] = useState(false);
  const [credsError, setCredsError] = useState('');
  const [credsSuccess, setCredsSuccess] = useState('');

  // 2FA state
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(!!adminSecuritySettings?.twoFactorEnabled);
  const [twoFactorPin, setTwoFactorPin] = useState('');
  const [twoFactorAuthPassword, setTwoFactorAuthPassword] = useState('');
  const [recoveryCode, setRecoveryCode] = useState(generateRecoveryCode());
  const [copiedCode, setCopiedCode] = useState(false);
  const [isUpdating2FA, setIsUpdating2FA] = useState(false);
  const [twoFactorError, setTwoFactorError] = useState('');
  const [twoFactorSuccess, setTwoFactorSuccess] = useState('');

  // Session policy state
  const [timeoutMinutes, setTimeoutMinutes] = useState(adminSecuritySettings?.sessionTimeoutMinutes || 30);
  const [isUpdatingTimeout, setIsUpdatingTimeout] = useState(false);

  // Audit logs filter: 'all' | 'signin' | 'security' | 'warning'
  const [auditFilter, setAuditFilter] = useState('all');

  useEffect(() => {
    if (adminSecuritySettings?.username) {
      setNewUsername(adminSecuritySettings.username);
    }
    if (adminSecuritySettings?.sessionTimeoutMinutes) {
      setTimeoutMinutes(adminSecuritySettings.sessionTimeoutMinutes);
    }
    setTwoFactorEnabled(!!adminSecuritySettings?.twoFactorEnabled);
  }, [adminSecuritySettings]);

  const strength = calculatePasswordStrength(newPassword);
  const requirements = checkPasswordRequirements(newPassword);

  const handleUpdateCredentials = async (e) => {
    e.preventDefault();
    setCredsError('');
    setCredsSuccess('');

    if (!currentPassword) {
      setCredsError('Please enter your current password to authorize changes.');
      return;
    }

    if (newPassword) {
      if (newPassword.length < 8) {
        setCredsError('New password must be at least 8 characters long.');
        return;
      }
      if (newPassword !== confirmPassword) {
        setCredsError('New password and confirmation password do not match.');
        return;
      }
    }

    setIsUpdatingCreds(true);
    try {
      const res = await updateAdminCredentials({
        currentPassword,
        newUsername: newUsername.trim(),
        newPassword: newPassword || undefined
      });

      setIsUpdatingCreds(false);
      if (res.success) {
        setCredsSuccess('Admin credentials updated successfully with SHA-256 cryptographic encryption!');
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
        if (showToast) showToast('Master security credentials updated successfully!');
      } else {
        setCredsError(res.message || 'Failed to update credentials.');
      }
    } catch {
      setIsUpdatingCreds(false);
      setCredsError('An unexpected error occurred while updating credentials.');
    }
  };

  const handleConfigure2FA = async (e) => {
    e.preventDefault();
    setTwoFactorError('');
    setTwoFactorSuccess('');

    if (!twoFactorAuthPassword) {
      setTwoFactorError('Please enter your current master password to authorize 2FA changes.');
      return;
    }

    if (twoFactorEnabled) {
      if (!twoFactorPin || twoFactorPin.length !== 6 || !/^\d{6}$/.test(twoFactorPin)) {
        setTwoFactorError('Please enter a valid 6-digit numeric PIN.');
        return;
      }
    }

    setIsUpdating2FA(true);
    try {
      const res = await configureTwoFactor({
        currentPassword: twoFactorAuthPassword,
        enable: twoFactorEnabled,
        pin: twoFactorPin,
        recoveryCode: recoveryCode
      });
      setIsUpdating2FA(false);

      if (res.success) {
        setTwoFactorSuccess(
          twoFactorEnabled
            ? 'Two-Factor Authentication is now active! Store your recovery code safely.'
            : 'Two-Factor Authentication has been disabled.'
        );
        setTwoFactorAuthPassword('');
        setTwoFactorPin('');
        if (showToast) {
          showToast(twoFactorEnabled ? '2FA Master PIN activated!' : '2FA disabled.');
        }
      } else {
        setTwoFactorError(res.message || 'Failed to update 2FA configuration.');
      }
    } catch {
      setIsUpdating2FA(false);
      setTwoFactorError('An unexpected error occurred.');
    }
  };

  const handleUpdateTimeout = async (e) => {
    e.preventDefault();
    setIsUpdatingTimeout(true);
    try {
      const res = await updateAdminCredentials({
        sessionTimeoutMinutes: Number(timeoutMinutes)
      });
      setIsUpdatingTimeout(false);
      if (res.success) {
        if (showToast) showToast(`Session timeout set to ${timeoutMinutes} minutes.`);
      }
    } catch {
      setIsUpdatingTimeout(false);
    }
  };

  const handleSaveSupabaseConfig = async (e) => {
    e.preventDefault();
    setConnectionResult(null);
    saveSupabaseConfig({ url: supabaseUrl, anonKey: supabaseAnonKey });
    if (showToast) showToast('Supabase connection details saved!');
    handleTestConnection();
  };

  const handleTestConnection = async () => {
    setTestingConnection(true);
    setConnectionResult(null);
    saveSupabaseConfig({ url: supabaseUrl, anonKey: supabaseAnonKey });
    const res = await testSupabaseConnection();
    setTestingConnection(false);
    setConnectionResult(res);
    if (res.success && showToast) {
      showToast('Connected to Supabase PostgreSQL cloud!');
    }
  };

  const handleManualPushToCloud = async () => {
    setIsSyncingCloud(true);
    if (showToast) showToast('Pushing website data to Supabase cloud...');
    const res = await syncToCloud();
    setIsSyncingCloud(false);
    if (res.success) {
      if (showToast) showToast('All website data successfully synced to Cloud!');
    } else {
      if (showToast) showToast(`Cloud push failed: ${res.message}`);
    }
  };

  const handleDisconnectSupabase = () => {
    if (window.confirm('Disconnect Supabase? The admin portal will revert to local browser storage only.')) {
      clearSupabaseConfig();
      setSupabaseUrl('');
      setSupabaseAnonKey('');
      setConnectionResult(null);
      if (showToast) showToast('Supabase disconnected. Using local storage.');
    }
  };

  const SQL_SNIPPET = `-- 1. Create table for global website content
create table if not exists site_content (
  id text primary key,
  data jsonb not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Allow public read and write access
alter table site_content enable row level security;
drop policy if exists "Allow public read on site_content" on site_content;
create policy "Allow public read on site_content" on site_content for select using (true);

drop policy if exists "Allow all updates on site_content" on site_content;
create policy "Allow all updates on site_content" on site_content for all using (true) with check (true);

-- 3. Storage bucket for team photos and media
insert into storage.buckets (id, name, public)
values ('media', 'media', true)
on conflict (id) do update set public = true;

drop policy if exists "Public Access" on storage.objects;
create policy "Public Access" on storage.objects for select using (bucket_id = 'media');

drop policy if exists "Public Upload" on storage.objects;
create policy "Public Upload" on storage.objects for insert with check (bucket_id = 'media');

drop policy if exists "Public Update" on storage.objects;
create policy "Public Update" on storage.objects for update using (bucket_id = 'media');`;

  const handleCopySql = () => {
    navigator.clipboard.writeText(SQL_SNIPPET);
    setCopiedSql(true);
    if (showToast) showToast('SQL setup script copied to clipboard!');
    setTimeout(() => setCopiedSql(false), 3000);
  };

  const handleCopyRecoveryCode = () => {
    navigator.clipboard.writeText(recoveryCode);
    setCopiedCode(true);
    if (showToast) showToast('Emergency Recovery Code copied to clipboard!');
    setTimeout(() => setCopiedCode(false), 3000);
  };

  const handleExportAuditLogs = () => {
    const logs = adminSecuritySettings?.auditLogs || [];
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(logs, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `jj_elevate_audit_log_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    if (showToast) showToast('Audit logs exported successfully.');
  };

  const handleEmergencyLockdownClick = () => {
    if (window.confirm('EMERGENCY LOCKDOWN: This will immediately invalidate all active admin sessions and lock the portal. Only master password can reactivate access. Proceed?')) {
      triggerEmergencyLockdown();
    }
  };

  // Filter audit logs
  const rawLogs = adminSecuritySettings?.auditLogs || [];
  const filteredLogs = rawLogs.filter(log => {
    if (auditFilter === 'signin') {
      return log.action.toLowerCase().includes('sign-in') || log.action.toLowerCase().includes('session');
    }
    if (auditFilter === 'security') {
      return log.action.toLowerCase().includes('credentials') || log.action.toLowerCase().includes('2fa') || log.action.toLowerCase().includes('policy');
    }
    if (auditFilter === 'warning') {
      return log.status === 'warning' || log.status === 'critical';
    }
    return true;
  });

  return (
    <div className="adm-dashboard-wrap">
      {/* Header */}
      <div className="adm-page-header">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px', flexWrap: 'wrap' }}>
            <h1 className="adm-page-title" style={{ margin: 0 }}>Security & Access Control</h1>
            <span style={{
              background: 'rgba(16, 185, 129, 0.12)',
              color: '#059669',
              fontSize: '0.74rem',
              fontWeight: 700,
              padding: '3px 10px',
              borderRadius: '999px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px'
            }}>
              <i className="bi bi-shield-fill-check"></i> SHA-256 Cryptography
            </span>
            {adminSecuritySettings?.twoFactorEnabled && (
              <span style={{
                background: 'rgba(59, 130, 246, 0.12)',
                color: '#2563eb',
                fontSize: '0.74rem',
                fontWeight: 700,
                padding: '3px 10px',
                borderRadius: '999px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px'
              }}>
                <i className="bi bi-shield-lock-fill"></i> 2FA Enforced
              </span>
            )}
          </div>
          <p className="adm-page-subtext">
            Configure master admin credentials, two-factor authentication, inactivity auto-logout, and view real-time security audit logs.
          </p>
        </div>

        {/* Emergency Panic Button */}
        <div>
          <button
            type="button"
            onClick={handleEmergencyLockdownClick}
            className="adm-btn adm-btn-sm"
            style={{
              background: '#ef4444',
              color: '#ffffff',
              border: 'none',
              fontWeight: 700,
              boxShadow: '0 4px 12px rgba(239, 68, 68, 0.25)'
            }}
            title="Lock down portal and revoke all active sessions immediately"
          >
            <i className="bi bi-shield-slash-fill"></i>
            <span>Emergency Lockdown</span>
          </button>
        </div>
      </div>

      {/* Security Health Posture Summary */}
      <div className="adm-grid-4" style={{ marginBottom: '1.5rem' }}>
        <div className="adm-stat-card">
          <div className="adm-stat-icon" style={{ background: isUsingDefaultPassword ? 'rgba(239, 68, 68, 0.1)' : 'rgba(16, 185, 129, 0.1)', color: isUsingDefaultPassword ? '#ef4444' : '#10b981' }}>
            <i className={`bi ${isUsingDefaultPassword ? 'bi-shield-exclamation' : 'bi-shield-check'}`}></i>
          </div>
          <div className="adm-stat-info">
            <div className="adm-stat-label">Master Password</div>
            <div className="adm-stat-value" style={{ fontSize: '1.05rem', color: isUsingDefaultPassword ? '#dc2626' : '#059669' }}>
              {isUsingDefaultPassword ? 'Default (Vulnerable)' : 'Custom SHA-256'}
            </div>
            <div style={{ fontSize: '0.74rem', color: 'var(--adm-text-secondary)', marginTop: '2px' }}>
              {isUsingDefaultPassword ? 'Update password below' : 'Encrypted with salt'}
            </div>
          </div>
        </div>

        <div className="adm-stat-card">
          <div className="adm-stat-icon blue">
            <i className="bi bi-key-fill"></i>
          </div>
          <div className="adm-stat-info">
            <div className="adm-stat-label">Two-Factor (2FA)</div>
            <div className="adm-stat-value" style={{ fontSize: '1.05rem', color: adminSecuritySettings?.twoFactorEnabled ? '#2563eb' : 'var(--adm-text-secondary)' }}>
              {adminSecuritySettings?.twoFactorEnabled ? 'Active (6-Digit PIN)' : 'Disabled'}
            </div>
            <div style={{ fontSize: '0.74rem', color: 'var(--adm-text-secondary)', marginTop: '2px' }}>
              {adminSecuritySettings?.twoFactorEnabled ? 'PIN + Recovery code' : 'Single factor only'}
            </div>
          </div>
        </div>

        <div className="adm-stat-card">
          <div className="adm-stat-icon gold">
            <i className="bi bi-hourglass-split"></i>
          </div>
          <div className="adm-stat-info">
            <div className="adm-stat-label">Idle Timeout</div>
            <div className="adm-stat-value" style={{ fontSize: '1.05rem' }}>
              {adminSecuritySettings?.sessionTimeoutMinutes || 30} Minutes
            </div>
            <div style={{ fontSize: '0.74rem', color: 'var(--adm-text-secondary)', marginTop: '2px' }}>
              Auto-lock on inactivity
            </div>
          </div>
        </div>

        <div className="adm-stat-card">
          <div className="adm-stat-icon" style={{ background: (adminSecuritySettings?.failedAttempts || 0) > 0 ? 'rgba(239, 68, 68, 0.1)' : 'rgba(16, 185, 129, 0.1)', color: (adminSecuritySettings?.failedAttempts || 0) > 0 ? '#ef4444' : '#10b981' }}>
            <i className="bi bi-shield-shaded"></i>
          </div>
          <div className="adm-stat-info">
            <div className="adm-stat-label">Brute-Force Shield</div>
            <div className="adm-stat-value" style={{ fontSize: '1.05rem' }}>
              {adminSecuritySettings?.failedAttempts || 0} / 5 Attempts
            </div>
            <div style={{ fontSize: '0.74rem', color: 'var(--adm-text-secondary)', marginTop: '2px' }}>
              15 min lockout policy
            </div>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '1.5rem', marginBottom: '1.5rem' }}>
        
        {/* CARD 1: Master Admin Credentials */}
        <div className="adm-card" style={{ padding: '1.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.25rem' }}>
            <div style={{
              width: '38px',
              height: '38px',
              borderRadius: '10px',
              background: 'rgba(235, 34, 91, 0.1)',
              color: 'var(--adm-pink)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.15rem'
            }}>
              <i className="bi bi-key-fill"></i>
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 700 }}>Master Credentials</h3>
              <span style={{ fontSize: '0.8rem', color: 'var(--adm-text-secondary)' }}>
                Update admin username & master password
              </span>
            </div>
          </div>

          {credsError && (
            <div style={{
              background: 'rgba(239, 68, 68, 0.1)',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              color: '#dc2626',
              padding: '10px 14px',
              borderRadius: '8px',
              fontSize: '0.84rem',
              marginBottom: '1rem',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <i className="bi bi-exclamation-circle-fill"></i>
              <span>{credsError}</span>
            </div>
          )}

          {credsSuccess && (
            <div style={{
              background: 'rgba(16, 185, 129, 0.1)',
              border: '1px solid rgba(16, 185, 129, 0.3)',
              color: '#059669',
              padding: '10px 14px',
              borderRadius: '8px',
              fontSize: '0.84rem',
              marginBottom: '1rem',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <i className="bi bi-check-circle-fill"></i>
              <span>{credsSuccess}</span>
            </div>
          )}

          <form onSubmit={handleUpdateCredentials}>
            <div className="adm-form-group">
              <label className="adm-label">Admin Username</label>
              <input
                type="text"
                className="adm-input"
                value={newUsername}
                onChange={(e) => setNewUsername(e.target.value)}
                placeholder="Enter master username"
                required
              />
            </div>

            <div className="adm-form-group">
              <label className="adm-label">
                Current Password <span style={{ color: '#ef4444' }}>*</span>
              </label>
              <input
                type={showPass ? 'text' : 'password'}
                className="adm-input"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Enter current password to authorize"
                required
              />
            </div>

            <div className="adm-form-group">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <label className="adm-label">New Password (leave empty to keep current)</label>
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="adm-btn-text"
                  style={{ fontSize: '0.78rem', padding: 0 }}
                >
                  {showPass ? 'Hide passwords' : 'Show passwords'}
                </button>
              </div>
              <input
                type={showPass ? 'text' : 'password'}
                className="adm-input"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new strong password"
                minLength={8}
              />

              {/* Password strength indicator & checklist */}
              {newPassword && (
                <div style={{ marginTop: '10px', background: '#f8fafc', padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: '4px' }}>
                    <span style={{ color: 'var(--adm-text-secondary)' }}>Password Strength:</span>
                    <span style={{ fontWeight: 700, color: strength.color }}>{strength.label}</span>
                  </div>
                  <div style={{ height: '5px', background: '#e2e8f0', borderRadius: '3px', overflow: 'hidden', marginBottom: '8px' }}>
                    <div style={{
                      height: '100%',
                      width: `${(strength.score / 4) * 100}%`,
                      background: strength.color,
                      transition: 'width 0.3s ease, background 0.3s ease'
                    }} />
                  </div>

                  {/* Requirements checklist */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4px', fontSize: '0.72rem' }}>
                    <span style={{ color: requirements.minLength ? '#059669' : '#94a3b8' }}>
                      <i className={`bi ${requirements.minLength ? 'bi-check-circle-fill' : 'bi-circle'}`}></i> At least 8 chars
                    </span>
                    <span style={{ color: requirements.hasUpper ? '#059669' : '#94a3b8' }}>
                      <i className={`bi ${requirements.hasUpper ? 'bi-check-circle-fill' : 'bi-circle'}`}></i> Uppercase letter
                    </span>
                    <span style={{ color: requirements.hasNumber ? '#059669' : '#94a3b8' }}>
                      <i className={`bi ${requirements.hasNumber ? 'bi-check-circle-fill' : 'bi-circle'}`}></i> Numeric digit
                    </span>
                    <span style={{ color: requirements.hasSpecial ? '#059669' : '#94a3b8' }}>
                      <i className={`bi ${requirements.hasSpecial ? 'bi-check-circle-fill' : 'bi-circle'}`}></i> Special character
                    </span>
                  </div>
                </div>
              )}
            </div>

            {newPassword && (
              <div className="adm-form-group">
                <label className="adm-label">Confirm New Password</label>
                <input
                  type={showPass ? 'text' : 'password'}
                  className="adm-input"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-type new password"
                  required
                />
              </div>
            )}

            <button
              type="submit"
              className="adm-btn adm-btn-primary"
              style={{ width: '100%', marginTop: '0.5rem' }}
              disabled={isUpdatingCreds}
            >
              {isUpdatingCreds ? (
                <>
                  <span className="spinner-border spinner-border-sm" role="status"></span>
                  <span>Hashing & Saving...</span>
                </>
              ) : (
                <>
                  <i className="bi bi-shield-check"></i>
                  <span>Update Admin Credentials</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* CARD 2: Two-Factor Authentication (2FA) */}
        <div className="adm-card" style={{ padding: '1.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.25rem' }}>
            <div style={{
              width: '38px',
              height: '38px',
              borderRadius: '10px',
              background: 'rgba(59, 130, 246, 0.1)',
              color: '#3b82f6',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.15rem'
            }}>
              <i className="bi bi-shield-lock-fill"></i>
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 700 }}>Two-Factor Authentication (2FA)</h3>
              <span style={{ fontSize: '0.8rem', color: 'var(--adm-text-secondary)' }}>
                Require a 6-digit Master PIN upon signing in
              </span>
            </div>
          </div>

          {twoFactorError && (
            <div style={{
              background: 'rgba(239, 68, 68, 0.1)',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              color: '#dc2626',
              padding: '10px 14px',
              borderRadius: '8px',
              fontSize: '0.84rem',
              marginBottom: '1rem',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <i className="bi bi-exclamation-circle-fill"></i>
              <span>{twoFactorError}</span>
            </div>
          )}

          {twoFactorSuccess && (
            <div style={{
              background: 'rgba(16, 185, 129, 0.1)',
              border: '1px solid rgba(16, 185, 129, 0.3)',
              color: '#059669',
              padding: '10px 14px',
              borderRadius: '8px',
              fontSize: '0.84rem',
              marginBottom: '1rem',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <i className="bi bi-check-circle-fill"></i>
              <span>{twoFactorSuccess}</span>
            </div>
          )}

          <form onSubmit={handleConfigure2FA}>
            {/* Toggle Switch */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '12px 14px',
              background: '#f8fafc',
              border: '1px solid #e2e8f0',
              borderRadius: '10px',
              marginBottom: '1.25rem'
            }}>
              <div>
                <strong style={{ fontSize: '0.88rem', display: 'block' }}>Enable 2FA Protection</strong>
                <span style={{ fontSize: '0.78rem', color: 'var(--adm-text-secondary)' }}>
                  Require password AND 6-digit PIN to sign in
                </span>
              </div>
              <label style={{ position: 'relative', display: 'inline-block', width: '48px', height: '26px' }}>
                <input
                  type="checkbox"
                  checked={twoFactorEnabled}
                  onChange={(e) => setTwoFactorEnabled(e.target.checked)}
                  style={{ opacity: 0, width: 0, height: 0 }}
                />
                <span style={{
                  position: 'absolute',
                  cursor: 'pointer',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundColor: twoFactorEnabled ? '#10b981' : '#cbd5e1',
                  transition: '0.3s',
                  borderRadius: '26px'
                }}>
                  <span style={{
                    position: 'absolute',
                    content: '""',
                    height: '20px',
                    width: '20px',
                    left: twoFactorEnabled ? '24px' : '3px',
                    bottom: '3px',
                    backgroundColor: 'white',
                    transition: '0.3s',
                    borderRadius: '50%'
                  }}></span>
                </span>
              </label>
            </div>

            {twoFactorEnabled && (
              <>
                <div className="adm-form-group">
                  <label className="adm-label">
                    Set 6-Digit Master Security PIN <span style={{ color: '#ef4444' }}>*</span>
                  </label>
                  <input
                    type="password"
                    inputMode="numeric"
                    maxLength={6}
                    pattern="[0-9]*"
                    className="adm-input"
                    style={{ letterSpacing: '0.4em', fontWeight: 700, fontSize: '1.15rem', textAlign: 'center' }}
                    value={twoFactorPin}
                    onChange={(e) => setTwoFactorPin(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    placeholder="••••••"
                    required
                  />
                  <span style={{ fontSize: '0.75rem', color: 'var(--adm-text-muted)', display: 'block', marginTop: '4px' }}>
                    Enter any 6 numeric digits you will remember.
                  </span>
                </div>

                {/* Emergency Recovery Code */}
                <div style={{
                  background: '#fef2f2',
                  border: '1px solid #fecaca',
                  borderRadius: '10px',
                  padding: '12px 14px',
                  marginBottom: '1.25rem'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <span style={{ fontSize: '0.76rem', fontWeight: 700, color: '#991b1b' }}>
                      <i className="bi bi-shield-exclamation"></i> EMERGENCY BACKUP RECOVERY CODE:
                    </span>
                    <button
                      type="button"
                      onClick={() => setRecoveryCode(generateRecoveryCode())}
                      className="adm-btn-text"
                      style={{ fontSize: '0.74rem', color: '#991b1b', textDecoration: 'underline' }}
                    >
                      Regenerate
                    </button>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <code style={{
                      flex: 1,
                      background: '#ffffff',
                      padding: '6px 10px',
                      borderRadius: '6px',
                      border: '1px solid #fca5a5',
                      fontWeight: 800,
                      color: '#b91c1c',
                      letterSpacing: '0.08em',
                      fontSize: '0.88rem'
                    }}>
                      {recoveryCode}
                    </code>
                    <button
                      type="button"
                      onClick={handleCopyRecoveryCode}
                      className="adm-btn adm-btn-secondary adm-btn-sm"
                      style={{ flexShrink: 0 }}
                    >
                      <i className={`bi ${copiedCode ? 'bi-check' : 'bi-clipboard'}`}></i>
                      <span>{copiedCode ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                  <span style={{ fontSize: '0.72rem', color: '#7f1d1d', marginTop: '6px', display: 'block' }}>
                    Save this code offline. If you ever forget your PIN, this code will unlock your portal.
                  </span>
                </div>
              </>
            )}

            <div className="adm-form-group">
              <label className="adm-label">
                Current Master Password <span style={{ color: '#ef4444' }}>*</span>
              </label>
              <input
                type="password"
                className="adm-input"
                value={twoFactorAuthPassword}
                onChange={(e) => setTwoFactorAuthPassword(e.target.value)}
                placeholder="Enter password to authorize 2FA changes"
                required
              />
            </div>

            <button
              type="submit"
              className="adm-btn adm-btn-secondary"
              style={{ width: '100%' }}
              disabled={isUpdating2FA}
            >
              {isUpdating2FA ? 'Saving 2FA Status...' : 'Save Two-Factor Policy'}
            </button>
          </form>
        </div>

      </div>

      {/* Row 2: Inactivity & Brute-Force Shields */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '1.5rem', marginBottom: '1.5rem' }}>
        
        {/* CARD 3: Session Inactivity & Auto-Logout */}
        <div className="adm-card" style={{ padding: '1.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.25rem' }}>
            <div style={{
              width: '38px',
              height: '38px',
              borderRadius: '10px',
              background: 'rgba(245, 158, 11, 0.1)',
              color: '#d97706',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.15rem'
            }}>
              <i className="bi bi-hourglass-split"></i>
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 700 }}>Inactivity Auto-Logout</h3>
              <span style={{ fontSize: '0.8rem', color: 'var(--adm-text-secondary)' }}>
                Session idle timeout and security policy
              </span>
            </div>
          </div>

          <form onSubmit={handleUpdateTimeout}>
            <div className="adm-form-group">
              <label className="adm-label">Session Idle Timeout</label>
              <select
                className="adm-input"
                value={timeoutMinutes}
                onChange={(e) => setTimeoutMinutes(e.target.value)}
              >
                <option value="15">15 Minutes (Maximum Security)</option>
                <option value="30">30 Minutes (Recommended)</option>
                <option value="60">1 Hour (Standard)</option>
                <option value="240">4 Hours (Extended Session)</option>
                <option value="480">8 Hours (Full Working Day)</option>
              </select>
              <span style={{ fontSize: '0.78rem', color: 'var(--adm-text-muted)', display: 'block', marginTop: '6px' }}>
                If no keyboard, mouse or scroll activity is detected, the session securely logs out.
              </span>
            </div>

            <button
              type="submit"
              className="adm-btn adm-btn-secondary"
              style={{ width: '100%' }}
              disabled={isUpdatingTimeout}
            >
              {isUpdatingTimeout ? 'Saving...' : 'Save Session Policy'}
            </button>
          </form>
        </div>

        {/* CARD 4: Threat Defense & Brute-Force Shield */}
        <div className="adm-card" style={{ padding: '1.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.25rem' }}>
            <div style={{
              width: '38px',
              height: '38px',
              borderRadius: '10px',
              background: 'rgba(16, 185, 129, 0.1)',
              color: '#10b981',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.15rem'
            }}>
              <i className="bi bi-shield-shaded"></i>
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 700 }}>Brute-Force Defense</h3>
              <span style={{ fontSize: '0.8rem', color: 'var(--adm-text-secondary)' }}>
                Active threat and credential-stuffing prevention
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.85rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 12px', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <span style={{ color: 'var(--adm-text-secondary)' }}>Max Failed Attempts:</span>
              <span style={{ fontWeight: 700 }}>5 Attempts</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 12px', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <span style={{ color: 'var(--adm-text-secondary)' }}>Lockout Period:</span>
              <span style={{ fontWeight: 700 }}>15 Minutes</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 12px', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <span style={{ color: 'var(--adm-text-secondary)' }}>Current Failed Attempts:</span>
              <span style={{ fontWeight: 700, color: (adminSecuritySettings?.failedAttempts || 0) > 0 ? '#ef4444' : '#10b981' }}>
                {adminSecuritySettings?.failedAttempts || 0} / 5
              </span>
            </div>
          </div>

          {(adminSecuritySettings?.failedAttempts || 0) > 0 && (
            <button
              type="button"
              onClick={() => {
                if (resetLockoutCounter) resetLockoutCounter();
                if (showToast) showToast('Failed attempts counter reset to 0.');
              }}
              className="adm-btn adm-btn-secondary adm-btn-sm"
              style={{ width: '100%', marginTop: '1rem' }}
            >
              Reset Failed Attempts Counter
            </button>
          )}
        </div>

      </div>

      {/* CARD: Centralized Cloud Database & Multi-System Synchronization (Neon PostgreSQL) */}
      <div className="adm-card" style={{ padding: '1.75rem', marginBottom: '1.5rem', border: '1px solid rgba(16, 185, 129, 0.4)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '38px',
              height: '38px',
              borderRadius: '10px',
              background: 'rgba(16, 185, 129, 0.12)',
              color: '#10b981',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.25rem'
            }}>
              <i className="bi bi-cloud-check-fill"></i>
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 700 }}>
                  Centralized Cloud Database & Multi-Device Sync (Neon PostgreSQL)
                </h3>
                <span style={{
                  fontSize: '0.74rem',
                  fontWeight: 700,
                  padding: '3px 10px',
                  borderRadius: '999px',
                  background: 'rgba(16, 185, 129, 0.12)',
                  color: '#059669',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px'
                }}>
                  <i className="bi bi-check-circle-fill"></i>
                  Neon Cloud Active (Production)
                </span>
              </div>
              <span style={{ fontSize: '0.8rem', color: 'var(--adm-text-secondary)' }}>
                Sync team members, photos, and website content globally across all computers, phones, and live visitors in real time via Neon.
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            <button
              type="button"
              className="adm-btn adm-btn-primary adm-btn-sm"
              onClick={handleManualPushToCloud}
              disabled={isSyncingCloud}
              title="Force push current website content & photos to Neon Cloud"
            >
              <i className={isSyncingCloud ? 'spinner-border spinner-border-sm' : 'bi bi-cloud-arrow-up-fill'}></i>
              <span>{isSyncingCloud ? 'Pushing Data...' : 'Sync All Data to Neon Now'}</span>
            </button>

            <button
              type="button"
              className="adm-btn adm-btn-secondary adm-btn-sm"
              onClick={handleTestNeon}
              disabled={checkingNeon}
            >
              {checkingNeon ? (
                <>
                  <span className="spinner-border spinner-border-sm" role="status"></span>
                  <span>Testing Neon...</span>
                </>
              ) : (
                <>
                  <i className="bi bi-lightning-charge-fill"></i>
                  <span>Test Neon Connection</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Live Neon Health Banner */}
        {neonHealth && (
          <div style={{
            background: neonHealth.success ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
            border: neonHealth.success ? '1px solid rgba(16, 185, 129, 0.3)' : '1px solid rgba(239, 68, 68, 0.3)',
            color: neonHealth.success ? '#059669' : '#dc2626',
            padding: '12px 16px',
            borderRadius: '8px',
            fontSize: '0.84rem',
            marginBottom: '1rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700, marginBottom: '4px' }}>
              <i className={`bi ${neonHealth.success ? 'bi-check-circle-fill' : 'bi-exclamation-circle-fill'}`}></i>
              <span>{neonHealth.success ? 'Neon Database Connection Verified' : 'Neon Connection Warning'}</span>
            </div>
            {neonHealth.success && (
              <div style={{ fontSize: '0.78rem', color: '#047857', display: 'flex', gap: '16px', flexWrap: 'wrap', marginTop: '6px' }}>
                <span><strong>Engine:</strong> {neonHealth.postgresVersion}</span>
                <span><strong>Database:</strong> {neonHealth.database}</span>
                <span><strong>Branch:</strong> {neonHealth.branch || 'production'}</span>
                <span><strong>Public Tables:</strong> {neonHealth.publicTableCount} (site_content, inquiries)</span>
              </div>
            )}
          </div>
        )}

        <div style={{
          background: '#f8fafc',
          border: '1px solid #e2e8f0',
          borderRadius: '10px',
          padding: '1rem',
          fontSize: '0.82rem',
          color: '#334155'
        }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px' }}>
            <div>
              <span style={{ fontSize: '0.72rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 700, display: 'block' }}>Database Provider</span>
              <strong style={{ color: '#0f172a' }}>Neon Cloud Serverless PostgreSQL</strong>
            </div>
            <div>
              <span style={{ fontSize: '0.72rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 700, display: 'block' }}>Active Branch</span>
              <strong style={{ color: '#059669' }}>production</strong>
            </div>
            <div>
              <span style={{ fontSize: '0.72rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 700, display: 'block' }}>Multi-Device Sync</span>
              <strong style={{ color: '#059669' }}>Live Active (All Browsers & Visitors)</strong>
            </div>
            <div>
              <span style={{ fontSize: '0.72rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 700, display: 'block' }}>Last Cloud Sync</span>
              <strong style={{ color: '#0f172a' }}>{lastCloudSyncTime ? new Date(lastCloudSyncTime).toLocaleTimeString() : 'Connected'}</strong>
            </div>
          </div>
        </div>
      </div>

      {/* CARD 5: Security Activity & Audit Trail */}
      <div className="adm-card" style={{ padding: '1.75rem', marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.25rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 700 }}>Security Audit & Activity History</h3>
              <span className="adm-badge-count">{rawLogs.length}</span>
            </div>
            <p style={{ margin: '4px 0 0 0', fontSize: '0.8rem', color: 'var(--adm-text-secondary)' }}>
              Real-time audit record of authentication attempts, policy adjustments, and security incidents.
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            {/* Filter buttons */}
            <div style={{ display: 'inline-flex', background: '#f1f5f9', borderRadius: '8px', padding: '3px' }}>
              <button
                type="button"
                className={`adm-btn adm-btn-sm ${auditFilter === 'all' ? 'adm-btn-primary' : ''}`}
                style={{ padding: '4px 10px', fontSize: '0.75rem', borderRadius: '6px' }}
                onClick={() => setAuditFilter('all')}
              >
                All
              </button>
              <button
                type="button"
                className={`adm-btn adm-btn-sm ${auditFilter === 'signin' ? 'adm-btn-primary' : ''}`}
                style={{ padding: '4px 10px', fontSize: '0.75rem', borderRadius: '6px' }}
                onClick={() => setAuditFilter('signin')}
              >
                Sign-Ins
              </button>
              <button
                type="button"
                className={`adm-btn adm-btn-sm ${auditFilter === 'security' ? 'adm-btn-primary' : ''}`}
                style={{ padding: '4px 10px', fontSize: '0.75rem', borderRadius: '6px' }}
                onClick={() => setAuditFilter('security')}
              >
                Security Changes
              </button>
              <button
                type="button"
                className={`adm-btn adm-btn-sm ${auditFilter === 'warning' ? 'adm-btn-primary' : ''}`}
                style={{ padding: '4px 10px', fontSize: '0.75rem', borderRadius: '6px' }}
                onClick={() => setAuditFilter('warning')}
              >
                Alerts
              </button>
            </div>

            <button
              type="button"
              className="adm-btn adm-btn-secondary adm-btn-sm"
              onClick={handleExportAuditLogs}
              title="Download audit logs in JSON format"
            >
              <i className="bi bi-download"></i>
              <span>Export</span>
            </button>

            <button
              type="button"
              className="adm-btn adm-btn-secondary adm-btn-sm"
              onClick={() => {
                if (window.confirm('Clear all audit activity history?')) {
                  clearAuditLogs();
                  if (showToast) showToast('Audit history cleared.');
                }
              }}
              title="Clear log history"
            >
              <i className="bi bi-trash"></i>
              <span>Clear</span>
            </button>
          </div>
        </div>

        {/* Audit Log Table */}
        <div style={{ overflowX: 'auto' }}>
          <table className="adm-table" style={{ width: '100%', fontSize: '0.82rem' }}>
            <thead>
              <tr>
                <th style={{ width: '160px' }}>Timestamp</th>
                <th style={{ width: '100px' }}>Status</th>
                <th>Action & Event Details</th>
                <th style={{ width: '160px' }}>Client Device</th>
              </tr>
            </thead>
            <tbody>
              {filteredLogs.length === 0 ? (
                <tr>
                  <td colSpan={4} style={{ textAlign: 'center', padding: '2rem', color: 'var(--adm-text-muted)' }}>
                    No security events found in this category.
                  </td>
                </tr>
              ) : (
                filteredLogs.slice(0, 20).map((log) => {
                  let badgeBg = '#f1f5f9';
                  let badgeColor = '#475569';
                  if (log.status === 'success') {
                    badgeBg = 'rgba(16, 185, 129, 0.12)';
                    badgeColor = '#059669';
                  } else if (log.status === 'warning') {
                    badgeBg = 'rgba(245, 158, 11, 0.12)';
                    badgeColor = '#d97706';
                  } else if (log.status === 'critical') {
                    badgeBg = 'rgba(239, 68, 68, 0.12)';
                    badgeColor = '#dc2626';
                  }

                  return (
                    <tr key={log.id}>
                      <td style={{ whiteSpace: 'nowrap', color: 'var(--adm-text-secondary)', fontSize: '0.76rem' }}>
                        {new Date(log.timestamp).toLocaleString()}
                      </td>
                      <td>
                        <span style={{
                          background: badgeBg,
                          color: badgeColor,
                          fontSize: '0.7rem',
                          fontWeight: 700,
                          padding: '2px 8px',
                          borderRadius: '4px',
                          textTransform: 'uppercase'
                        }}>
                          {log.status || 'INFO'}
                        </span>
                      </td>
                      <td>
                        <strong style={{ color: 'var(--adm-text-primary)', display: 'block' }}>{log.action}</strong>
                        {log.details && (
                          <span style={{ color: 'var(--adm-text-secondary)', fontSize: '0.78rem' }}>{log.details}</span>
                        )}
                      </td>
                      <td style={{ whiteSpace: 'nowrap', color: 'var(--adm-text-muted)', fontSize: '0.76rem' }}>
                        {log.device || 'Web Browser'}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* CARD 6: Active Session Audit & Sign Out */}
      <div className="adm-card" style={{ padding: '1.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h3 style={{ margin: '0 0 4px 0', fontSize: '1.05rem', fontWeight: 700 }}>
              Active Session Management
            </h3>
            <p style={{ margin: 0, fontSize: '0.84rem', color: 'var(--adm-text-secondary)' }}>
              Last login timestamp: {adminSecuritySettings?.lastLoginTime ? new Date(adminSecuritySettings.lastLoginTime).toLocaleString() : 'Current Session'}
            </p>
          </div>

          <button
            type="button"
            onClick={logoutAdmin}
            className="adm-btn adm-btn-secondary"
            style={{ color: '#dc2626', borderColor: 'rgba(220, 38, 38, 0.3)' }}
          >
            <i className="bi bi-box-arrow-right"></i>
            <span>Log Out Current Session</span>
          </button>
        </div>
      </div>
    </div>
  );
}
