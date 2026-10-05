import React, { useState } from 'react';
import { useAdminData } from '../context/AdminDataContext';
import './admin.css';

export default function AdminLogin({ onLoginSuccess, onNavigateHome }) {
  const { loginAdmin } = useAdminData();
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('admin123');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    setTimeout(() => {
      const res = loginAdmin(username, password);
      setIsLoading(false);
      if (res.success) {
        if (onLoginSuccess) onLoginSuccess();
      } else {
        setError(res.message);
      }
    }, 250);
  };

  const handleFillDemo = () => {
    setUsername('admin');
    setPassword('admin123');
    setError('');
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
            Portal Administration
          </h1>
          <p style={{
            fontSize: '0.86rem',
            color: 'var(--adm-text-secondary)',
            margin: 0,
            lineHeight: 1.45
          }}>
            Manage hero video, services, case studies, viral reels, team members & client leads.
          </p>
        </div>

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
            <i className="bi bi-exclamation-triangle-fill" style={{ fontSize: '1rem' }}></i>
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit}>
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

          {/* Quick Demo Credentials Preset Button */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '1.5rem',
            padding: '8px 12px',
            background: '#f8fafc',
            border: '1px dashed var(--adm-border)',
            borderRadius: '8px'
          }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--adm-text-secondary)' }}>
              Demo: <strong>admin</strong> / <strong>admin123</strong>
            </span>
            <button
              type="button"
              onClick={handleFillDemo}
              className="adm-btn adm-btn-secondary adm-btn-sm"
              style={{ fontSize: '0.75rem', padding: '3px 8px' }}
            >
              Fill Demo
            </button>
          </div>

          <button
            type="submit"
            className="adm-btn adm-btn-primary"
            style={{ width: '100%', padding: '12px', fontSize: '0.96rem' }}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                <span>Authenticating...</span>
              </>
            ) : (
              <>
                <i className="bi bi-shield-lock-fill"></i>
                <span>Sign In to Admin Portal</span>
              </>
            )}
          </button>
        </form>

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
            AES-256 Secured
          </span>
        </div>
      </div>
    </div>
  );
}
