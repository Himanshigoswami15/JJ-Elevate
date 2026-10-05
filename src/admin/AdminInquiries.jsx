import React, { useState, useMemo } from 'react';
import { useAdminData } from '../context/AdminDataContext';

export default function AdminInquiries({ showToast }) {
  const { data, markInquiryStatus, deleteInquiry } = useAdminData();
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedInquiry, setSelectedInquiry] = useState(null);

  const inquiries = data.contact?.inquiries || [];

  const filteredInquiries = useMemo(() => {
    return inquiries.filter(item => {
      const matchesStatus = filterStatus === 'all' || item.status === filterStatus;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = !q ||
        (item.name && item.name.toLowerCase().includes(q)) ||
        (item.company && item.company.toLowerCase().includes(q)) ||
        (item.email && item.email.toLowerCase().includes(q)) ||
        (item.phone && item.phone.toLowerCase().includes(q)) ||
        (item.service && item.service.toLowerCase().includes(q));

      return matchesStatus && matchesSearch;
    });
  }, [inquiries, filterStatus, searchQuery]);

  const counts = useMemo(() => {
    return {
      all: inquiries.length,
      new: inquiries.filter(i => i.status === 'new').length,
      contacted: inquiries.filter(i => i.status === 'contacted').length,
      converted: inquiries.filter(i => i.status === 'converted').length,
      archived: inquiries.filter(i => i.status === 'archived').length
    };
  }, [inquiries]);

  const handleStatusChange = (id, newStatus) => {
    markInquiryStatus(id, newStatus);
    showToast(`Lead marked as ${newStatus}!`);
    if (selectedInquiry && selectedInquiry.id === id) {
      setSelectedInquiry(prev => ({ ...prev, status: newStatus }));
    }
  };

  const handleDelete = (id, name) => {
    if (window.confirm(`Are you sure you want to delete lead from "${name}"?`)) {
      deleteInquiry(id);
      showToast(`Lead from "${name}" deleted.`);
      if (selectedInquiry && selectedInquiry.id === id) {
        setSelectedInquiry(null);
      }
    }
  };

  const handleExportCSV = () => {
    if (inquiries.length === 0) {
      alert('No inquiries to export.');
      return;
    }

    const headers = ['ID', 'Date', 'Status', 'Name', 'Company / Hotel', 'Service', 'Email', 'Phone', 'Message'];
    const rows = inquiries.map(i => [
      `"${i.id}"`,
      `"${i.createdAt || ''}"`,
      `"${i.status || 'new'}"`,
      `"${(i.name || '').replace(/"/g, '""')}"`,
      `"${(i.company || '').replace(/"/g, '""')}"`,
      `"${(i.service || '').replace(/"/g, '""')}"`,
      `"${(i.email || '').replace(/"/g, '""')}"`,
      `"${(i.phone || '').replace(/"/g, '""')}"`,
      `"${(i.message || '').replace(/"/g, '""')}"`
    ]);

    const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `jj-elevate-leads-${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
    showToast('Leads CSV downloaded successfully!');
  };

  return (
    <div>
      <div className="adm-page-header">
        <div className="adm-page-title">
          <h1>Inquiries & Strategy Call Leads Inbox</h1>
          <p>Real-time pipeline of booking strategy consultations and customer contact messages.</p>
        </div>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <button
            type="button"
            className="adm-btn adm-btn-secondary"
            onClick={handleExportCSV}
          >
            <i className="bi bi-file-earmark-spreadsheet"></i>
            <span>Export to CSV</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="adm-card" style={{ padding: '1rem 1.25rem', marginBottom: '1.25rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          {/* Status Tabs */}
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
            <button
              type="button"
              className={`adm-btn adm-btn-sm ${filterStatus === 'all' ? 'adm-btn-primary' : 'adm-btn-secondary'}`}
              onClick={() => setFilterStatus('all')}
            >
              All ({counts.all})
            </button>
            <button
              type="button"
              className={`adm-btn adm-btn-sm ${filterStatus === 'new' ? 'adm-btn-primary' : 'adm-btn-secondary'}`}
              onClick={() => setFilterStatus('new')}
            >
              <span className="adm-sync-dot" style={{ width: '6px', height: '6px', background: 'var(--adm-pink)', marginRight: '4px' }}></span>
              New ({counts.new})
            </button>
            <button
              type="button"
              className={`adm-btn adm-btn-sm ${filterStatus === 'contacted' ? 'adm-btn-primary' : 'adm-btn-secondary'}`}
              onClick={() => setFilterStatus('contacted')}
            >
              Contacted ({counts.contacted})
            </button>
            <button
              type="button"
              className={`adm-btn adm-btn-sm ${filterStatus === 'converted' ? 'adm-btn-primary' : 'adm-btn-secondary'}`}
              onClick={() => setFilterStatus('converted')}
            >
              Converted ({counts.converted})
            </button>
            <button
              type="button"
              className={`adm-btn adm-btn-sm ${filterStatus === 'archived' ? 'adm-btn-primary' : 'adm-btn-secondary'}`}
              onClick={() => setFilterStatus('archived')}
            >
              Archived ({counts.archived})
            </button>
          </div>

          {/* Search Box */}
          <div style={{ position: 'relative', minWidth: '240px', maxWidth: '340px', flex: 1 }}>
            <input
              type="text"
              className="adm-input"
              style={{ paddingLeft: '34px', fontSize: '0.86rem' }}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by client, hotel, email..."
            />
            <i className="bi bi-search" style={{
              position: 'absolute',
              left: '12px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'var(--adm-text-muted)',
              fontSize: '0.9rem'
            }}></i>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="adm-card" style={{ padding: 0, overflow: 'hidden' }}>
        {filteredInquiries.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '3.5rem 1rem' }}>
            <i className="bi bi-inbox" style={{ fontSize: '3rem', color: 'var(--adm-text-muted)' }}></i>
            <h4 style={{ margin: '1rem 0 0.5rem', color: 'var(--adm-text-primary)' }}>No Inquiries Found</h4>
            <p style={{ color: 'var(--adm-text-secondary)', fontSize: '0.88rem' }}>
              {searchQuery ? 'No results matched your search keyword.' : 'No leads currently in this category.'}
            </p>
          </div>
        ) : (
          <div className="adm-table-wrap" style={{ border: 'none', borderRadius: 0 }}>
            <table className="adm-table">
              <thead>
                <tr>
                  <th>Client / Property</th>
                  <th>Service Requested</th>
                  <th>Contact Details</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredInquiries.map((inq) => {
                  const cleanPhone = (inq.phone || '').replace(/[^0-9]/g, '');
                  return (
                    <tr key={inq.id}>
                      <td>
                        <div style={{ fontWeight: 700, fontSize: '0.94rem' }}>{inq.name}</div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--adm-text-secondary)' }}>
                          <i className="bi bi-building" style={{ marginRight: '4px' }}></i>
                          {inq.company || 'Direct Hospitality Client'}
                        </div>
                      </td>

                      <td>
                        <span style={{
                          fontSize: '0.8rem',
                          padding: '4px 10px',
                          borderRadius: '6px',
                          background: '#f1f5f9',
                          color: 'var(--adm-text-primary)',
                          fontWeight: 500,
                          display: 'inline-block'
                        }}>
                          {inq.service || 'Strategy Call'}
                        </span>
                      </td>

                      <td>
                        <div style={{ fontSize: '0.84rem' }}>
                          <a href={`mailto:${inq.email}`} style={{ color: 'var(--adm-pink)', textDecoration: 'none' }}>
                            <i className="bi bi-envelope-fill" style={{ marginRight: '4px' }}></i>
                            {inq.email}
                          </a>
                        </div>
                        {inq.phone && (
                          <div style={{ fontSize: '0.8rem', color: 'var(--adm-text-secondary)', marginTop: '2px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span>
                              <i className="bi bi-telephone-fill" style={{ marginRight: '4px' }}></i>
                              {inq.phone}
                            </span>
                            {cleanPhone && (
                              <a
                                href={`https://wa.me/${cleanPhone}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{ color: '#25D366', fontSize: '0.95rem' }}
                                title="Chat on WhatsApp"
                              >
                                <i className="bi bi-whatsapp"></i>
                              </a>
                            )}
                          </div>
                        )}
                      </td>

                      <td style={{ fontSize: '0.8rem', color: 'var(--adm-text-secondary)', whiteSpace: 'nowrap' }}>
                        {inq.createdAt ? new Date(inq.createdAt).toLocaleDateString(undefined, {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        }) : 'Recent'}
                      </td>

                      <td>
                        <span className={`adm-status-badge ${inq.status || 'new'}`}>
                          {inq.status || 'new'}
                        </span>
                      </td>

                      <td style={{ textAlign: 'right', whiteSpace: 'nowrap' }}>
                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                          <button
                            type="button"
                            className="adm-btn adm-btn-secondary adm-btn-sm"
                            onClick={() => setSelectedInquiry(inq)}
                            title="View lead brief"
                          >
                            <i className="bi bi-eye-fill"></i>
                            <span>View</span>
                          </button>

                          <select
                            className="adm-select"
                            style={{ padding: '4px 8px', fontSize: '0.78rem', width: 'auto' }}
                            value={inq.status || 'new'}
                            onChange={(e) => handleStatusChange(inq.id, e.target.value)}
                          >
                            <option value="new">New</option>
                            <option value="contacted">Contacted</option>
                            <option value="converted">Converted</option>
                            <option value="archived">Archived</option>
                          </select>

                          <button
                            type="button"
                            className="adm-btn adm-btn-danger adm-btn-sm"
                            onClick={() => handleDelete(inq.id, inq.name)}
                            title="Delete lead"
                          >
                            <i className="bi bi-trash-fill"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Inquiry Detail View Modal */}
      {selectedInquiry && (
        <div className="adm-modal-backdrop" onClick={(e) => { if (e.target === e.currentTarget) setSelectedInquiry(null); }}>
          <div className="adm-modal-box">
            <div className="adm-modal-header">
              <div>
                <h3 style={{ margin: 0 }}>Lead Strategy Brief</h3>
                <div style={{ fontSize: '0.78rem', color: 'var(--adm-text-secondary)', marginTop: '2px' }}>
                  Received {selectedInquiry.createdAt ? new Date(selectedInquiry.createdAt).toLocaleString() : 'Recently'}
                </div>
              </div>
              <button
                type="button"
                className="adm-modal-close"
                onClick={() => setSelectedInquiry(null)}
              >
                <i className="bi bi-x-lg"></i>
              </button>
            </div>

            <div className="adm-modal-body">
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px 16px',
                borderRadius: '8px',
                background: '#f8fafc',
                border: '1px solid var(--adm-border)',
                marginBottom: '1.25rem'
              }}>
                <div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 700 }}>{selectedInquiry.name}</div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--adm-text-secondary)' }}>
                    {selectedInquiry.company || 'Independent Hospitality Brand'}
                  </div>
                </div>
                <div>
                  <span className={`adm-status-badge ${selectedInquiry.status || 'new'}`}>
                    {selectedInquiry.status || 'new'}
                  </span>
                </div>
              </div>

              <div className="adm-grid-2" style={{ gap: '1rem', marginBottom: '1.25rem' }}>
                <div style={{ background: '#ffffff', border: '1px solid var(--adm-border)', padding: '10px 14px', borderRadius: '8px' }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--adm-text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>Email Address</div>
                  <a href={`mailto:${selectedInquiry.email}`} style={{ color: 'var(--adm-pink)', fontWeight: 600, textDecoration: 'none' }}>
                    {selectedInquiry.email}
                  </a>
                </div>

                <div style={{ background: '#ffffff', border: '1px solid var(--adm-border)', padding: '10px 14px', borderRadius: '8px' }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--adm-text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>Phone / WhatsApp</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '2px' }}>
                    <span style={{ fontWeight: 600 }}>{selectedInquiry.phone || 'N/A'}</span>
                    {selectedInquiry.phone && (
                      <a
                        href={`https://wa.me/${selectedInquiry.phone.replace(/[^0-9]/g, '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="adm-btn adm-btn-sm"
                        style={{ background: '#25D366', color: '#fff', padding: '2px 8px', fontSize: '0.75rem' }}
                      >
                        <i className="bi bi-whatsapp"></i> Chat
                      </a>
                    )}
                  </div>
                </div>
              </div>

              <div style={{ marginBottom: '1.25rem' }}>
                <div style={{ fontSize: '0.78rem', color: 'var(--adm-text-muted)', textTransform: 'uppercase', fontWeight: 600, marginBottom: '4px' }}>
                  Target Solution Requested
                </div>
                <div style={{
                  padding: '8px 12px',
                  background: 'rgba(249, 59, 121, 0.08)',
                  color: '#c71b56',
                  borderRadius: '6px',
                  fontWeight: 600,
                  fontSize: '0.88rem'
                }}>
                  {selectedInquiry.service || 'Growth Audit / Direct Booking Funnel'}
                </div>
              </div>

              <div>
                <div style={{ fontSize: '0.78rem', color: 'var(--adm-text-muted)', textTransform: 'uppercase', fontWeight: 600, marginBottom: '6px' }}>
                  Client Message / Growth Requirements
                </div>
                <div style={{
                  padding: '14px',
                  background: '#f8fafc',
                  border: '1px solid var(--adm-border)',
                  borderRadius: '8px',
                  fontSize: '0.9rem',
                  lineHeight: 1.6,
                  whiteSpace: 'pre-wrap',
                  color: 'var(--adm-text-primary)'
                }}>
                  {selectedInquiry.message || 'No additional message provided.'}
                </div>
              </div>
            </div>

            <div className="adm-modal-footer" style={{ justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--adm-text-secondary)' }}>Status:</span>
                <select
                  className="adm-select"
                  style={{ padding: '4px 8px', fontSize: '0.8rem', width: 'auto' }}
                  value={selectedInquiry.status || 'new'}
                  onChange={(e) => handleStatusChange(selectedInquiry.id, e.target.value)}
                >
                  <option value="new">New</option>
                  <option value="contacted">Contacted</option>
                  <option value="converted">Converted</option>
                  <option value="archived">Archived</option>
                </select>
              </div>

              <div style={{ display: 'flex', gap: '8px' }}>
                <a
                  href={`mailto:${selectedInquiry.email}?subject=JJ Elevate: Response to your Hospitality Growth Inquiry`}
                  className="adm-btn adm-btn-primary adm-btn-sm"
                >
                  <i className="bi bi-reply-fill"></i>
                  <span>Reply via Email</span>
                </a>
                <button
                  type="button"
                  className="adm-btn adm-btn-secondary adm-btn-sm"
                  onClick={() => setSelectedInquiry(null)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
