import React, { useState, useEffect } from 'react';
import { useAdminData } from '../context/AdminDataContext';
import AdminLogin from './AdminLogin';
import AdminDashboard from './AdminDashboard';
import AdminHero from './AdminHero';
import AdminServices from './AdminServices';
import AdminBrands from './AdminBrands';
import AdminCaseStudies from './AdminCaseStudies';
import AdminReels from './AdminReels';
import AdminTeam from './AdminTeam';
import AdminTestimonials from './AdminTestimonials';
import AdminInquiries from './AdminInquiries';
import AdminContact from './AdminContact';
import AdminSecurity from './AdminSecurity';
import './admin.css';

const TAB_TITLES = {
  dashboard: 'Dashboard Overview',
  hero: 'Hero Section & Media',
  services: 'GROWTH SERVICES FOR HOSPITALITY BRANDS',
  brands: 'Brands That Grow With JJ Elevate',
  casestudies: 'Case Studies & Results',
  reels: 'Instagram Viral Reels',
  team: 'Core Team & Co-Founders',
  testimonials: 'What Our Clients Say',
  inquiries: 'Inquiries & Leads Inbox',
  contact: 'Contact Info & Social',
  security: 'Security & Access Control'
};

export default function AdminApp({ onNavigateHome }) {
  const {
    data,
    isAdminLoggedIn,
    logoutAdmin,
    resetToDefaults,
    exportData,
    importData,
    refreshSession,
    isUsingDefaultPassword,
    adminSecuritySettings,
    cloudSyncStatus,
    lastCloudSyncTime,
    syncToCloud,
    isCloudConfigured
  } = useAdminData();

  const [activeTab, setActiveTab] = useState('dashboard');
  const [toastMessage, setToastMessage] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // User activity tracker: refreshes session on user interaction
  useEffect(() => {
    if (!isAdminLoggedIn) return;

    let lastRefreshed = Date.now();
    const handleActivity = () => {
      const now = Date.now();
      if (now - lastRefreshed > 60000) { // refresh once per minute on activity
        lastRefreshed = now;
        if (refreshSession) refreshSession();
      }
    };

    window.addEventListener('mousemove', handleActivity);
    window.addEventListener('keydown', handleActivity);
    window.addEventListener('click', handleActivity);
    window.addEventListener('scroll', handleActivity);

    return () => {
      window.removeEventListener('mousemove', handleActivity);
      window.removeEventListener('keydown', handleActivity);
      window.removeEventListener('click', handleActivity);
      window.removeEventListener('scroll', handleActivity);
    };
  }, [isAdminLoggedIn, refreshSession]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage('');
    }, 3500);
  };

  const handleImportFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const res = importData(event.target.result);
      if (res.success) {
        showToast('All website data imported successfully!');
      } else {
        alert('Import failed: ' + res.error);
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  if (!isAdminLoggedIn) {
    return (
      <AdminLogin
        onLoginSuccess={() => showToast('Welcome back, Admin!')}
        onNavigateHome={onNavigateHome}
      />
    );
  }

  const newInquiriesCount = (data.contact?.inquiries || []).filter(i => i.status === 'new').length;

  const renderActiveTabContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <AdminDashboard onNavigate={(tab) => setActiveTab(tab)} />;
      case 'hero':
        return <AdminHero showToast={showToast} />;
      case 'services':
        return <AdminServices showToast={showToast} />;
      case 'brands':
        return <AdminBrands showToast={showToast} />;
      case 'casestudies':
        return <AdminCaseStudies showToast={showToast} />;
      case 'reels':
        return <AdminReels showToast={showToast} />;
      case 'team':
        return <AdminTeam showToast={showToast} />;
      case 'testimonials':
        return <AdminTestimonials showToast={showToast} />;
      case 'inquiries':
        return <AdminInquiries showToast={showToast} />;
      case 'contact':
        return <AdminContact showToast={showToast} />;
      case 'security':
        return <AdminSecurity showToast={showToast} />;
      default:
        return <AdminDashboard onNavigate={(tab) => setActiveTab(tab)} />;
    }
  };

  return (
    <div className="admin-app-root">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="adm-toast">
          <i className="bi bi-check-circle-fill" style={{ color: 'var(--adm-pink)', fontSize: '1.15rem' }}></i>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Mobile Backdrop */}
      {sidebarOpen && (
        <div
          className="adm-sidebar-backdrop"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`adm-sidebar ${sidebarOpen ? 'open' : ''}`}>
        {/* Brand Header */}
        <div className="adm-sidebar-brand">
          <div className="adm-sidebar-brand-logo">
            JJ<span>.</span>
          </div>
          <div className="adm-sidebar-brand-text">
            <h2>JJ Elevate</h2>
            <span>Admin Console</span>
          </div>
          <button
            type="button"
            className="adm-sidebar-close"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close navigation"
          >
            <i className="bi bi-x-lg"></i>
          </button>
        </div>

        {/* Navigation List */}
        <ul className="adm-nav-list">
          <li className={`adm-nav-item ${activeTab === 'dashboard' ? 'active' : ''}`}>
            <button type="button" onClick={() => { setActiveTab('dashboard'); setSidebarOpen(false); }}>
              <i className="bi bi-grid-1x2-fill"></i>
              <span>Dashboard</span>
            </button>
          </li>

          <li className={`adm-nav-item ${activeTab === 'hero' ? 'active' : ''}`}>
            <button type="button" onClick={() => { setActiveTab('hero'); setSidebarOpen(false); }}>
              <i className="bi bi-camera-video-fill"></i>
              <span>Hero & Media</span>
            </button>
          </li>

          <li className={`adm-nav-item ${activeTab === 'services' ? 'active' : ''}`}>
            <button type="button" onClick={() => { setActiveTab('services'); setSidebarOpen(false); }}>
              <i className="bi bi-layers-fill"></i>
              <span>Growth Services</span>
            </button>
          </li>

          <li className={`adm-nav-item ${activeTab === 'brands' ? 'active' : ''}`}>
            <button type="button" onClick={() => { setActiveTab('brands'); setSidebarOpen(false); }}>
              <i className="bi bi-building"></i>
              <span>Brands Marquee</span>
            </button>
          </li>

          <li className={`adm-nav-item ${activeTab === 'casestudies' ? 'active' : ''}`}>
            <button type="button" onClick={() => { setActiveTab('casestudies'); setSidebarOpen(false); }}>
              <i className="bi bi-trophy-fill"></i>
              <span>Case Studies</span>
            </button>
          </li>

          <li className={`adm-nav-item ${activeTab === 'reels' ? 'active' : ''}`}>
            <button type="button" onClick={() => { setActiveTab('reels'); setSidebarOpen(false); }}>
              <i className="bi bi-lightning-charge-fill"></i>
              <span>Viral Reels</span>
            </button>
          </li>

          <li className={`adm-nav-item ${activeTab === 'team' ? 'active' : ''}`}>
            <button type="button" onClick={() => { setActiveTab('team'); setSidebarOpen(false); }}>
              <i className="bi bi-people-fill"></i>
              <span>Team Members</span>
            </button>
          </li>

          <li className={`adm-nav-item ${activeTab === 'testimonials' ? 'active' : ''}`}>
            <button type="button" onClick={() => { setActiveTab('testimonials'); setSidebarOpen(false); }}>
              <i className="bi bi-chat-heart-fill"></i>
              <span>Testimonials</span>
            </button>
          </li>

          <li className={`adm-nav-item ${activeTab === 'inquiries' ? 'active' : ''}`}>
            <button type="button" onClick={() => { setActiveTab('inquiries'); setSidebarOpen(false); }}>
              <i className="bi bi-envelope-paper-fill"></i>
              <span>Leads Inbox</span>
              {newInquiriesCount > 0 && (
                <span className="adm-badge-count">{newInquiriesCount}</span>
              )}
            </button>
          </li>

          <li className={`adm-nav-item ${activeTab === 'contact' ? 'active' : ''}`}>
            <button type="button" onClick={() => { setActiveTab('contact'); setSidebarOpen(false); }}>
              <i className="bi bi-telephone-fill"></i>
              <span>Contact & Social</span>
            </button>
          </li>

          <li className={`adm-nav-item ${activeTab === 'security' ? 'active' : ''}`}>
            <button type="button" onClick={() => { setActiveTab('security'); setSidebarOpen(false); }}>
              <i className="bi bi-shield-lock-fill"></i>
              <span>Security & Access</span>
            </button>
          </li>
        </ul>

        {/* Sidebar Footer */}
        <div className="adm-sidebar-footer">
          <div className="adm-sidebar-user">
            <div className="adm-sidebar-user-avatar">AD</div>
            <div className="adm-sidebar-user-info">
              <div className="adm-sidebar-user-name">Administrator</div>
              <div className="adm-sidebar-user-role">Super Admin</div>
            </div>
            <button
              type="button"
              className="adm-btn-text"
              onClick={logoutAdmin}
              title="Sign Out"
            >
              <i className="bi bi-box-arrow-right" style={{ fontSize: '1.1rem', color: '#dc2626' }}></i>
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
            <button
              type="button"
              className="adm-btn adm-btn-secondary adm-btn-sm"
              onClick={exportData}
              title="Download JSON Database"
            >
              <i className="bi bi-download"></i>
              <span>Export</span>
            </button>

            <label
              className="adm-btn adm-btn-secondary adm-btn-sm"
              style={{ margin: 0, cursor: 'pointer' }}
              title="Upload JSON Database"
            >
              <i className="bi bi-upload"></i>
              <span>Import</span>
              <input
                type="file"
                accept=".json"
                onChange={handleImportFile}
                style={{ display: 'none' }}
              />
            </label>
          </div>

          <button
            type="button"
            className="adm-btn adm-btn-sm"
            style={{
              background: '#f8fafc',
              border: '1px solid var(--adm-border)',
              color: 'var(--adm-text-secondary)',
              fontSize: '0.76rem'
            }}
            onClick={() => {
              if (resetToDefaults()) {
                showToast('Reset all data to factory defaults.');
              }
            }}
          >
            <i className="bi bi-arrow-counterclockwise"></i>
            <span>Reset Factory Defaults</span>
          </button>
        </div>
      </aside>

      {/* Main App Wrapper */}
      <div className="adm-main-wrap">
        {/* Topbar */}
        <header className="adm-topbar">
          <div className="adm-topbar-left">
            <button
              type="button"
              className="adm-hamburger-btn"
              onClick={() => setSidebarOpen(true)}
              aria-label="Open sidebar menu"
            >
              <i className="bi bi-list"></i>
            </button>

            <div className="adm-breadcrumb">
              <span>Admin Console</span>
              <span>/</span>
              <strong>{TAB_TITLES[activeTab] || 'Dashboard'}</strong>
            </div>
          </div>

          <div className="adm-topbar-right">
            {/* Security Status Badge */}
            <div
              className="adm-sync-badge"
              style={{
                cursor: 'pointer',
                background: adminSecuritySettings?.twoFactorEnabled ? 'rgba(16, 185, 129, 0.1)' : 'rgba(59, 130, 246, 0.08)',
                borderColor: adminSecuritySettings?.twoFactorEnabled ? 'rgba(16, 185, 129, 0.3)' : 'rgba(59, 130, 246, 0.2)',
                color: adminSecuritySettings?.twoFactorEnabled ? '#059669' : '#2563eb'
              }}
              onClick={() => setActiveTab('security')}
              title="Click to view Security & Access Control"
            >
              <i className={`bi ${adminSecuritySettings?.twoFactorEnabled ? 'bi-shield-lock-fill' : 'bi-shield-check'}`}></i>
              <span>{adminSecuritySettings?.twoFactorEnabled ? '2FA Protected' : 'SHA-256 Protected'}</span>
            </div>

            {/* Cloud Sync Status Badge */}
            {cloudSyncStatus === 'synced' ? (
              <div
                className="adm-sync-badge"
                style={{ background: 'rgba(16, 185, 129, 0.1)', borderColor: 'rgba(16, 185, 129, 0.3)', color: '#059669', cursor: 'pointer' }}
                onClick={() => setActiveTab('security')}
                title={`Neon Cloud Sync active. Last synced: ${lastCloudSyncTime ? new Date(lastCloudSyncTime).toLocaleTimeString() : 'Recently'}`}
              >
                <span className="adm-sync-dot" style={{ background: '#10b981' }}></span>
                <span>Neon Cloud Synced</span>
              </div>
            ) : cloudSyncStatus === 'syncing' ? (
              <div className="adm-sync-badge" style={{ background: 'rgba(59, 130, 246, 0.1)', color: '#2563eb' }}>
                <span className="spinner-border spinner-border-sm" style={{ width: '10px', height: '10px', borderWidth: '1.5px', marginRight: '4px' }}></span>
                <span>Syncing to Neon...</span>
              </div>
            ) : cloudSyncStatus === 'error' ? (
              <div
                className="adm-sync-badge"
                style={{ background: '#fee2e2', borderColor: '#fca5a5', color: '#b91c1c', cursor: 'pointer' }}
                onClick={() => setActiveTab('security')}
                title="Cloud sync encountered an issue. Click to test Neon connection."
              >
                <i className="bi bi-exclamation-circle" style={{ color: '#dc2626' }}></i>
                <span>Neon Sync Warning</span>
              </div>
            ) : (
              <div
                className="adm-sync-badge"
                style={{ background: 'rgba(16, 185, 129, 0.1)', borderColor: 'rgba(16, 185, 129, 0.3)', color: '#059669', cursor: 'pointer' }}
                onClick={() => setActiveTab('security')}
              >
                <span className="adm-sync-dot" style={{ background: '#10b981' }}></span>
                <span>Neon Cloud Connected</span>
              </div>
            )}

            <button
              type="button"
              className="adm-btn adm-btn-primary adm-btn-sm"
              onClick={async () => {
                try {
                  localStorage.setItem('jj_elevate_admin_data_v2', JSON.stringify(data));
                  showToast('Publishing website data to Neon Cloud database...');
                  const res = await syncToCloud(data);
                  if (res && res.success) {
                    showToast('Website data published to Neon & synced across all systems!');
                  } else {
                    showToast(`Cloud save error: ${res?.message || 'Check connection'}`);
                  }
                } catch {
                  showToast('Data saved locally.');
                }
              }}
              title="Save all data & push to Neon Cloud database"
            >
              <i className="bi bi-cloud-arrow-up-fill"></i>
              <span>Save & Sync</span>
            </button>

            {onNavigateHome ? (
              <button
                type="button"
                className="adm-btn adm-btn-secondary adm-btn-sm"
                onClick={onNavigateHome}
              >
                <i className="bi bi-arrow-left"></i>
                <span>Back to Website</span>
              </button>
            ) : (
              <a
                href="/"
                target="_blank"
                rel="noopener noreferrer"
                className="adm-btn adm-btn-secondary adm-btn-sm"
              >
                <i className="bi bi-box-arrow-up-right"></i>
                <span>Open Live Site</span>
              </a>
            )}
          </div>
        </header>

        {/* High-Priority Security Alert if Default Credentials are active */}
        {isUsingDefaultPassword && (
          <div style={{
            background: '#fffbeb',
            borderBottom: '1px solid #fde68a',
            padding: '10px 1.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: '0.84rem',
            color: '#92400e',
            gap: '12px',
            flexWrap: 'wrap'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <i className="bi bi-shield-exclamation" style={{ fontSize: '1.15rem', color: '#d97706' }}></i>
              <span>
                <strong>Security Action Recommended:</strong> Your admin portal is currently using default credentials. Update your master password and enable 2FA to safeguard portal data.
              </span>
            </div>
            <button
              type="button"
              onClick={() => setActiveTab('security')}
              className="adm-btn adm-btn-sm"
              style={{
                background: '#d97706',
                color: '#ffffff',
                border: 'none',
                fontWeight: 600,
                padding: '4px 12px',
                fontSize: '0.78rem'
              }}
            >
              Open Security Settings →
            </button>
          </div>
        )}

        {/* Content Container */}
        <main className="adm-content-container">
          {renderActiveTabContent()}
        </main>
      </div>
    </div>
  );
}
