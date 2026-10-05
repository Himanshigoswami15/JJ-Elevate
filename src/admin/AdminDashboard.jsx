import React from 'react';
import { useAdminData } from '../context/AdminDataContext';

export default function AdminDashboard({ onNavigate }) {
  const { data, markInquiryStatus } = useAdminData();

  const servicesCount = data.services?.length || 0;
  const caseStudiesCount = data.caseStudies?.length || 0;
  const teamCount = data.teamMembers?.length || 0;
  const testimonialsCount = data.testimonials?.length || 0;
  const inquiries = data.contact?.inquiries || [];
  const totalInquiries = inquiries.length;
  const newInquiries = inquiries.filter(i => i.status === 'new').length;

  return (
    <div>
      {/* Page Header */}
      <div className="adm-page-header">
        <div className="adm-page-title">
          <h1>Admin Control Center</h1>
          <p>Real-time content management for JJ Elevate hospitality growth website.</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
          <div className="adm-sync-badge">
            <span className="adm-sync-dot"></span>
            <span>Live Site Synchronized</span>
          </div>
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="adm-btn adm-btn-secondary"
          >
            <i className="bi bi-box-arrow-up-right"></i>
            <span>Open Live Site</span>
          </a>
        </div>
      </div>

      {/* Primary 4-Stat Grid */}
      <div className="adm-grid-4" style={{ marginBottom: '1.5rem' }}>
        {/* Stat 1: Hero Video */}
        <div
          className="adm-stat-card"
          style={{ cursor: 'pointer' }}
          onClick={() => onNavigate('hero')}
          title="Click to manage Hero Video & Headlines"
        >
          <div className="adm-stat-icon">
            <i className="bi bi-camera-video-fill"></i>
          </div>
          <div className="adm-stat-info">
            <div className="adm-stat-label">Hero & Media</div>
            <div className="adm-stat-value" style={{ fontSize: '1.25rem' }}>Active Video</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--adm-pink)', marginTop: '2px', fontWeight: 600 }}>
              Edit Headlines & Video →
            </div>
          </div>
        </div>

        {/* Stat 2: Services */}
        <div
          className="adm-stat-card"
          style={{ cursor: 'pointer' }}
          onClick={() => onNavigate('services')}
          title="Click to manage Services"
        >
          <div className="adm-stat-icon gold">
            <i className="bi bi-layers-fill"></i>
          </div>
          <div className="adm-stat-info">
            <div className="adm-stat-label">Services Suite</div>
            <div className="adm-stat-value">{servicesCount}</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--adm-gold-dark)', marginTop: '2px', fontWeight: 600 }}>
              Hospitality Solutions →
            </div>
          </div>
        </div>

        {/* Stat 3: Case Studies */}
        <div
          className="adm-stat-card"
          style={{ cursor: 'pointer' }}
          onClick={() => onNavigate('casestudies')}
          title="Click to manage Case Studies"
        >
          <div className="adm-stat-icon blue">
            <i className="bi bi-trophy-fill"></i>
          </div>
          <div className="adm-stat-info">
            <div className="adm-stat-label">Case Studies</div>
            <div className="adm-stat-value">{caseStudiesCount}</div>
            <div style={{ fontSize: '0.75rem', color: '#2563eb', marginTop: '2px', fontWeight: 600 }}>
              Client Proof & Metrics →
            </div>
          </div>
        </div>

        {/* Stat 4: Inquiries Inbox */}
        <div
          className="adm-stat-card"
          style={{ cursor: 'pointer' }}
          onClick={() => onNavigate('inquiries')}
          title="Click to view Leads Inbox"
        >
          <div className="adm-stat-icon green">
            <i className="bi bi-envelope-paper-fill"></i>
          </div>
          <div className="adm-stat-info">
            <div className="adm-stat-label">Leads & Inquiries</div>
            <div className="adm-stat-value" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>{totalInquiries}</span>
              {newInquiries > 0 && (
                <span style={{
                  fontSize: '0.72rem',
                  padding: '2px 8px',
                  borderRadius: '12px',
                  background: 'rgba(239, 68, 68, 0.15)',
                  color: '#dc2626',
                  fontWeight: 700
                }}>
                  {newInquiries} New
                </span>
              )}
            </div>
            <div style={{ fontSize: '0.75rem', color: '#059669', marginTop: '2px', fontWeight: 600 }}>
              Manage Client Inbox →
            </div>
          </div>
        </div>
      </div>

      {/* Secondary 3-Stat Grid */}
      <div className="adm-grid-3" style={{ marginBottom: '2rem' }}>
        {/* Viral Reels */}
        <div
          className="adm-stat-card"
          style={{ cursor: 'pointer' }}
          onClick={() => onNavigate('reels')}
        >
          <div className="adm-stat-icon">
            <i className="bi bi-lightning-charge-fill"></i>
          </div>
          <div className="adm-stat-info">
            <div className="adm-stat-label">Viral Reels Showcase</div>
            <div className="adm-stat-value" style={{ fontSize: '1.25rem' }}>{data.reels?.totalViews || '37M+'} Views</div>
            <div style={{ fontSize: '0.78rem', color: 'var(--adm-text-secondary)', marginTop: '2px' }}>
              Engagement: {data.reels?.engagementRate || '4.2x'} • Bookings: {data.reels?.bookingsGenerated || '1,450+'}
            </div>
          </div>
        </div>

        {/* Team Members */}
        <div
          className="adm-stat-card"
          style={{ cursor: 'pointer' }}
          onClick={() => onNavigate('team')}
        >
          <div className="adm-stat-icon gold">
            <i className="bi bi-people-fill"></i>
          </div>
          <div className="adm-stat-info">
            <div className="adm-stat-label">Core Team & Founders</div>
            <div className="adm-stat-value">{teamCount}</div>
            <div style={{ fontSize: '0.78rem', color: 'var(--adm-text-secondary)', marginTop: '2px' }}>
              Active leaders and creators
            </div>
          </div>
        </div>

        {/* Client Reviews */}
        <div
          className="adm-stat-card"
          style={{ cursor: 'pointer' }}
          onClick={() => onNavigate('testimonials')}
        >
          <div className="adm-stat-icon green">
            <i className="bi bi-chat-heart-fill"></i>
          </div>
          <div className="adm-stat-info">
            <div className="adm-stat-label">Client Testimonials</div>
            <div className="adm-stat-value">{testimonialsCount}</div>
            <div style={{ fontSize: '0.78rem', color: 'var(--adm-text-secondary)', marginTop: '2px' }}>
              Five-star hotel reviews & quotes
            </div>
          </div>
        </div>
      </div>

      {/* Recent Inquiries Inbox Card */}
      <div className="adm-card">
        <div className="adm-card-header">
          <h3>
            <i className="bi bi-inbox-fill" style={{ color: 'var(--adm-pink)' }}></i>
            <span>Recent Leads & Strategy Call Requests</span>
          </h3>
          <button
            type="button"
            className="adm-btn adm-btn-secondary adm-btn-sm"
            onClick={() => onNavigate('inquiries')}
          >
            <span>View All Leads ({totalInquiries})</span>
            <i className="bi bi-arrow-right"></i>
          </button>
        </div>

        {inquiries.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '2.5rem 1rem', color: 'var(--adm-text-secondary)' }}>
            <i className="bi bi-inbox" style={{ fontSize: '2.5rem', color: 'var(--adm-text-muted)' }}></i>
            <p style={{ marginTop: '0.75rem', marginBottom: 0 }}>No inquiries yet. Leads from the website booking modal will appear here instantly.</p>
          </div>
        ) : (
          <div className="adm-table-wrap">
            <table className="adm-table">
              <thead>
                <tr>
                  <th>Client / Property</th>
                  <th>Service Requested</th>
                  <th>Contact Info</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {inquiries.slice(0, 5).map((inq) => (
                  <tr key={inq.id}>
                    <td>
                      <div style={{ fontWeight: 600 }}>{inq.name}</div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--adm-text-secondary)' }}>
                        {inq.company || 'Direct Client'}
                      </div>
                    </td>
                    <td>
                      <span style={{
                        fontSize: '0.8rem',
                        padding: '3px 8px',
                        borderRadius: '6px',
                        background: '#f1f5f9',
                        color: 'var(--adm-text-primary)',
                        display: 'inline-block'
                      }}>
                        {inq.service || 'Growth Audit'}
                      </span>
                    </td>
                    <td>
                      <div style={{ fontSize: '0.82rem' }}>
                        <a href={`mailto:${inq.email}`} style={{ color: 'var(--adm-pink)', textDecoration: 'none' }}>
                          {inq.email}
                        </a>
                      </div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--adm-text-secondary)' }}>
                        {inq.phone}
                      </div>
                    </td>
                    <td style={{ fontSize: '0.8rem', color: 'var(--adm-text-secondary)', whiteSpace: 'nowrap' }}>
                      {inq.createdAt ? new Date(inq.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }) : 'Recent'}
                    </td>
                    <td>
                      <span className={`adm-status-badge ${inq.status || 'new'}`}>
                        {inq.status || 'new'}
                      </span>
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: '6px' }}>
                        <select
                          className="adm-select"
                          style={{ padding: '3px 8px', fontSize: '0.76rem', width: 'auto' }}
                          value={inq.status || 'new'}
                          onChange={(e) => markInquiryStatus(inq.id, e.target.value)}
                        >
                          <option value="new">New</option>
                          <option value="contacted">Contacted</option>
                          <option value="converted">Converted</option>
                          <option value="archived">Archived</option>
                        </select>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Quick Launch & Documentation Box */}
      <div className="adm-grid-2">
        <div className="adm-card" style={{ marginBottom: 0 }}>
          <div className="adm-card-header">
            <h3>
              <i className="bi bi-lightning-charge" style={{ color: 'var(--adm-gold)' }}></i>
              <span>Quick Content Actions</span>
            </h3>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <button
              type="button"
              className="adm-btn adm-btn-secondary"
              style={{ justifyContent: 'flex-start' }}
              onClick={() => onNavigate('services')}
            >
              <i className="bi bi-plus-circle-fill" style={{ color: 'var(--adm-pink)' }}></i>
              <span>Add New Hospitality Service</span>
            </button>
            <button
              type="button"
              className="adm-btn adm-btn-secondary"
              style={{ justifyContent: 'flex-start' }}
              onClick={() => onNavigate('casestudies')}
            >
              <i className="bi bi-plus-circle-fill" style={{ color: 'var(--adm-gold)' }}></i>
              <span>Add Hotel Case Study & ROI Metric</span>
            </button>
            <button
              type="button"
              className="adm-btn adm-btn-secondary"
              style={{ justifyContent: 'flex-start' }}
              onClick={() => onNavigate('team')}
            >
              <i className="bi bi-person-plus-fill" style={{ color: '#2563eb' }}></i>
              <span>Add New Team Member / Co-Founder</span>
            </button>
            <button
              type="button"
              className="adm-btn adm-btn-secondary"
              style={{ justifyContent: 'flex-start' }}
              onClick={() => onNavigate('contact')}
            >
              <i className="bi bi-gear-fill" style={{ color: '#059669' }}></i>
              <span>Configure Phone, WhatsApp & Office Info</span>
            </button>
          </div>
        </div>

        <div className="adm-card" style={{ marginBottom: 0 }}>
          <div className="adm-card-header">
            <h3>
              <i className="bi bi-shield-check" style={{ color: '#10b981' }}></i>
              <span>System & Data Security</span>
            </h3>
          </div>
          <p style={{ fontSize: '0.86rem', color: 'var(--adm-text-secondary)', lineHeight: 1.6 }}>
            Every modification is stored with client-side reactive state and synchronized locally in your browser storage. You can export complete snapshots to JSON backups or restore factory showcase settings anytime.
          </p>
          <div style={{
            background: '#f8fafc',
            border: '1px solid var(--adm-border)',
            borderRadius: '8px',
            padding: '12px 16px',
            marginTop: '1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            <i className="bi bi-cloud-arrow-down-fill" style={{ fontSize: '1.4rem', color: 'var(--adm-pink)' }}></i>
            <div>
              <div style={{ fontSize: '0.85rem', fontWeight: 600 }}>Zero Data Loss Backup</div>
              <div style={{ fontSize: '0.78rem', color: 'var(--adm-text-secondary)' }}>
                Download a JSON replica of all inquiries and customized copy in 1 click.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
