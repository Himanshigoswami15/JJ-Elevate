import React, { useState } from 'react';
import { useAdminData } from '../context/AdminDataContext';
import './admin.css';

export default function AdminLogin({ onLoginSuccess, onNavigateHome }) {
  const {
    loginAdmin,
    verify2FALogin,
    adminSecuritySettings,
    disableEmergencyLockdown
  } = useAdminData();

  // Step: 'credentials' | '2fa' | 'unlock_lockdown'
  const [authStep, setAuthStep] = useState(
    adminSecuritySettings?.isLockdownActive ? 'unlock_lockdown' : 'credentials'
  );

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // 2FA state
  const [pin, setPin] = useState('');
  const [isUsingRecoveryCode, setIsUsingRecoveryCode] = useState(false);
  const [recoveryCode, setRecoveryCode] = useState('');

  // Lockdown unlock state
  const [unlockPassword, setUnlockPassword] = useState('');
  const [showUnlockPass, setShowUnlockPass] = useState(false);

  const [error, setError] = useState('');
  const [infoMessage, setInfoMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleCredentialsSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setInfoMessage('');
    setIsLoading(true);

    try {
      const res = await loginAdmin(username, password);
      setIsLoading(false);

      if (res.isLockdown) {
        setAuthStep('unlock_lockdown');
        setError(res.message);
        return;
      }

      if (res.requires2FA) {
        setAuthStep('2fa');
        setInfoMessage('Master password accepted. Please enter your 6-digit PIN.');
        return;
      }

      if (res.success) {
        if (onLoginSuccess) onLoginSuccess();
      } else {
        setError(res.message || 'Invalid username or password.');
      }
    } catch {
      setIsLoading(false);
      setError('An unexpected error occurred during authentication.');
    }
  };

  const handle2FASubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const tokenToVerify = isUsingRecoveryCode ? recoveryCode : pin;
      const res = await verify2FALogin(tokenToVerify);
      setIsLoading(false);

      if (res.success) {
        if (onLoginSuccess) onLoginSuccess();
      } else {
        setError(res.message || 'Invalid 6-digit PIN or Recovery Code.');
      }
    } catch {
      setIsLoading(false);
      setError('An error occurred during two-factor verification.');
    }
  };

  const handleUnlockLockdown = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const res = await disableEmergencyLockdown(unlockPassword);
      setIsLoading(false);

      if (res.success) {
        setAuthStep('credentials');
        setUnlockPassword('');
        setInfoMessage('Emergency lockdown deactivated successfully. Please sign in.');
      } else {
        setError(res.message || 'Failed to deactivate lockdown.');
      }
    } catch {
      setIsLoading(false);
      setError('An error occurred while lifting lockdown.');
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'var(--adm-bg)',
      padding: '1.5rem',
      fontFamily: "var(--adm-font)"
    }}>
      <div style={{
        width: '100%',
        maxWidth: '440px',
        background: '#ffffff',
        border: '1px solid var(--adm-border)',
        borderRadius: '16px',
        padding: '2.5rem',
        boxShadow: '0 20px 45px -10px rgba(15, 23, 42, 0.1), 0 2px 6px rgba(15, 23, 42, 0.04)',
        color: 'var(--adm-text-primary)'
      }}>
        {/* Brand header */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: '#0f172a',
            border: '1px solid var(--adm-border)',
            padding: '8px 18px',
            borderRadius: '12px',
            marginBottom: '1.25rem',
            boxShadow: '0 4px 12px rgba(15, 23, 42, 0.12)'
          }}>
            <span style={{
              color: '#ffffff',
              fontWeight: 800,
              fontSize: '1.15rem',
              letterSpacing: '-0.5px'
            }}>
              JJ <span style={{ color: 'var(--adm-pink)' }}>ELEVATE</span>
            </span>
          </div>

          <h1 style={{
            fontSize: '1.45rem',
            fontWeight: 700,
            margin: '0 0 6px 0',
            color: 'var(--adm-text-primary)'
          }}>
            {authStep === '2fa'
              ? 'Two-Factor Verification'
              : authStep === 'unlock_lockdown'
              ? 'Portal Lockdown Active'
              : 'Portal Administration'}
          </h1>

          <p style={{
            fontSize: '0.86rem',
            color: 'var(--adm-text-secondary)',
            margin: 0,
            lineHeight: 1.45
          }}>
            {authStep === '2fa'
              ? 'Enter your 6-digit Master PIN or Emergency Recovery Code to confirm identity.'
              : authStep === 'unlock_lockdown'
              ? 'The admin portal has been locked down for security. Enter master password to lift lockdown.'
              : 'Manage hero video, services, case studies, viral reels, team members & client leads.'}
          </p>
        </div>

        {/* Informational Message */}
        {infoMessage && (
          <div style={{
            background: 'rgba(59, 130, 246, 0.1)',
            border: '1px solid rgba(59, 130, 246, 0.3)',
            color: '#2563eb',
            padding: '10px 14px',
            borderRadius: '8px',
            fontSize: '0.85rem',
            marginBottom: '1.25rem',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <i className="bi bi-info-circle-fill" style={{ fontSize: '1rem' }}></i>
            <span>{infoMessage}</span>
          </div>
        )}

        {/* Error Alert */}
        {error && (
          <div style={{
            background: 'rgba(239, 68, 68, 0.1)',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            color: '#dc2626',
            padding: '10px 14px',
            borderRadius: '8px',
            fontSize: '0.85rem',
            marginBottom: '1.25rem',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <i className="bi bi-exclamation-triangle-fill" style={{ fontSize: '1rem', flexShrink: 0 }}></i>
            <span>{error}</span>
          </div>
        )}

        {/* STEP 1: Username & Password */}
        {authStep === 'credentials' && (
          <form onSubmit={handleCredentialsSubmit}>
            <div className="adm-form-group">
              <label className="adm-label" htmlFor="adm-username">Username</label>
              <div style={{ position: 'relative' }}>
                <input
                  id="adm-username"
                  type="text"
                  className="adm-input"
                  style={{ paddingLeft: '38px' }}
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter admin username"
                  required
                  autoFocus
                />
                <i className="bi bi-person-fill" style={{
                  position: 'absolute',
                  left: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'var(--adm-text-muted)',
                  fontSize: '1.1rem'
                }}></i>
              </div>
            </div>

            <div className="adm-form-group">
              <label className="adm-label" htmlFor="adm-password">Password</label>
              <div style={{ position: 'relative' }}>
                <input
                  id="adm-password"
                  type={showPassword ? 'text' : 'password'}
                  className="adm-input"
                  style={{ paddingLeft: '38px', paddingRight: '40px' }}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter admin password"
                  required
                />
                <i className="bi bi-lock-fill" style={{
                  position: 'absolute',
                  left: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'var(--adm-text-muted)',
                  fontSize: '1.05rem'
                }}></i>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute',
                    right: '10px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'transparent',
                    border: 'none',
                    color: 'var(--adm-text-muted)',
                    cursor: 'pointer',
                    padding: '4px',
                    fontSize: '1.05rem'
                  }}
                  title={showPassword ? "Hide password" : "Show password"}
                >
                  <i className={`bi ${showPassword ? 'bi-eye-slash-fill' : 'bi-eye-fill'}`}></i>
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="adm-btn adm-btn-primary"
              style={{ width: '100%', padding: '12px', fontSize: '0.96rem', marginTop: '0.5rem' }}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  <span>Verifying Credentials...</span>
                </>
              ) : (
                <>
                  <i className="bi bi-shield-lock-fill"></i>
                  <span>Sign In to Admin Portal</span>
                </>
              )}
            </button>
          </form>
        )}

        {/* STEP 2: Two-Factor Verification */}
        {authStep === '2fa' && (
          <form onSubmit={handle2FASubmit}>
            <div style={{
              background: '#f8fafc',
              border: '1px solid #e2e8f0',
              borderRadius: '10px',
              padding: '14px',
              marginBottom: '1.25rem',
              textAlign: 'center'
            }}>
              <i className="bi bi-shield-check" style={{ fontSize: '2rem', color: '#10b981' }}></i>
              <div style={{ fontSize: '0.84rem', fontWeight: 600, color: 'var(--adm-text-primary)', marginTop: '4px' }}>
                Account: <span style={{ color: 'var(--adm-pink)' }}>{username || 'Administrator'}</span>
              </div>
            </div>

            {!isUsingRecoveryCode ? (
              <div className="adm-form-group">
                <label className="adm-label" htmlFor="adm-pin">
                  6-Digit Master Security PIN
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    id="adm-pin"
                    type="password"
                    inputMode="numeric"
                    maxLength={6}
                    pattern="[0-9]*"
                    className="adm-input"
                    style={{
                      paddingLeft: '38px',
                      letterSpacing: '0.5em',
                      fontSize: '1.25rem',
                      textAlign: 'center',
                      fontWeight: 700
                    }}
                    value={pin}
                    onChange={(e) => setPin(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    placeholder="••••••"
                    required
                    autoFocus
                  />
                  <i className="bi bi-dialpad" style={{
                    position: 'absolute',
                    left: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: 'var(--adm-text-muted)',
                    fontSize: '1.1rem'
                  }}></i>
                </div>
              </div>
            ) : (
              <div className="adm-form-group">
                <label className="adm-label" htmlFor="adm-recovery">
                  Emergency Recovery Code (e.g. JJE-XXXX-YYYY-ZZZZ)
                </label>
                <input
                  id="adm-recovery"
                  type="text"
                  className="adm-input"
                  style={{ textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600 }}
                  value={recoveryCode}
                  onChange={(e) => setRecoveryCode(e.target.value.toUpperCase())}
                  placeholder="JJE-XXXX-YYYY-ZZZZ"
                  required
                  autoFocus
                />
              </div>
            )}

            <button
              type="submit"
              className="adm-btn adm-btn-primary"
              style={{ width: '100%', padding: '12px', fontSize: '0.96rem', marginTop: '0.5rem' }}
              disabled={isLoading || (!isUsingRecoveryCode ? pin.length !== 6 : !recoveryCode.trim())}
            >
              {isLoading ? (
                <>
                  <span className="spinner-border spinner-border-sm" role="status"></span>
                  <span>Verifying PIN...</span>
                </>
              ) : (
                <>
                  <i className="bi bi-shield-fill-check"></i>
                  <span>Confirm & Unlock Portal</span>
                </>
              )}
            </button>

            <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <button
                type="button"
                onClick={() => {
                  setIsUsingRecoveryCode(!isUsingRecoveryCode);
                  setError('');
                }}
                className="adm-btn-text"
                style={{ fontSize: '0.8rem', color: 'var(--adm-text-secondary)' }}
              >
                {isUsingRecoveryCode ? 'Use 6-Digit PIN instead' : 'Lost PIN? Use Recovery Code'}
              </button>

              <button
                type="button"
                onClick={() => {
                  setAuthStep('credentials');
                  setError('');
                  setInfoMessage('');
                }}
                className="adm-btn-text"
                style={{ fontSize: '0.8rem' }}
              >
                ← Back
              </button>
            </div>
          </form>
        )}

        {/* STEP 3: Unlock Emergency Lockdown */}
        {authStep === 'unlock_lockdown' && (
          <form onSubmit={handleUnlockLockdown}>
            <div style={{
              background: '#fef2f2',
              border: '1px solid #fecaca',
              borderRadius: '10px',
              padding: '14px',
              marginBottom: '1.25rem',
              color: '#991b1b',
              fontSize: '0.85rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700, marginBottom: '4px' }}>
                <i className="bi bi-shield-slash-fill" style={{ fontSize: '1.2rem', color: '#dc2626' }}></i>
                <span>Emergency Lockdown Active</span>
              </div>
              <p style={{ margin: 0, lineHeight: 1.4 }}>
                This console was put into emergency lockdown to protect against unauthorized access. Enter your master password to reactivate access.
              </p>
            </div>

            <div className="adm-form-group">
              <label className="adm-label">Master Password</label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showUnlockPass ? 'text' : 'password'}
                  className="adm-input"
                  style={{ paddingLeft: '38px', paddingRight: '40px' }}
                  value={unlockPassword}
                  onChange={(e) => setUnlockPassword(e.target.value)}
                  placeholder="Enter master password"
                  required
                  autoFocus
                />
                <i className="bi bi-key-fill" style={{
                  position: 'absolute',
                  left: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'var(--adm-text-muted)'
                }}></i>
                <button
                  type="button"
                  onClick={() => setShowUnlockPass(!showUnlockPass)}
                  style={{
                    position: 'absolute',
                    right: '10px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'transparent',
                    border: 'none',
                    color: 'var(--adm-text-muted)',
                    cursor: 'pointer'
                  }}
                >
                  <i className={`bi ${showUnlockPass ? 'bi-eye-slash-fill' : 'bi-eye-fill'}`}></i>
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="adm-btn adm-btn-primary"
              style={{ width: '100%', padding: '12px' }}
              disabled={isLoading || !unlockPassword}
            >
              {isLoading ? 'Deactivating Lockdown...' : 'Unlock Portal Access'}
            </button>
          </form>
        )}

        {/* Footer info */}
        <div style={{
          marginTop: '1.75rem',
          paddingTop: '1.25rem',
          borderTop: '1px solid var(--adm-border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          {onNavigateHome && (
            <button
              type="button"
              onClick={onNavigateHome}
              className="adm-btn-text"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
            >
              <i className="bi bi-arrow-left"></i>
              <span>Back to Website</span>
            </button>
          )}

          <span style={{
            fontSize: '0.75rem',
            color: 'var(--adm-text-muted)',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px',
            marginLeft: 'auto'
          }}>
            <i className="bi bi-shield-check" style={{ color: 'var(--adm-accent-green)' }}></i>
            SHA-256 + 2FA Protected
          </span>
        </div>
      </div>
    </div>
  );
}
