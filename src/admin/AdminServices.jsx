import React, { useState } from 'react';
import { useAdminData } from '../context/AdminDataContext';

export default function AdminServices({ showToast }) {
  const {
    data,
    updateGrowthServicesHeader,
    addService,
    updateService,
    deleteService
  } = useAdminData();

  const [headerEditing, setHeaderEditing] = useState(false);
  const [headerData, setHeaderData] = useState({
    headlineLine1: data.growthServicesHeader?.headlineLine1 || 'GROWTH SERVICES FOR',
    headlineLine2: data.growthServicesHeader?.headlineLine2 || 'HOSPITALITY BRANDS.',
    subtext: data.growthServicesHeader?.subtext || 'Explore our specialized digital marketing services built specifically for hotels, luxury resorts, and boutique stays.'
  });

  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const initialForm = {
    title: '',
    category: 'BRAND AWARENESS',
    tabLabel: 'NEW SERVICE',
    description: '',
    metricHighlight: '+250% REVENUE SURGE',
    images: {
      left: { url: '/images/social/social_pool_shoot.jpg', caption: 'SERVICE PHOTO 1' },
      center: { url: '/images/social/social_instagram_feed.jpg', caption: 'SERVICE PHOTO 2' },
      right: { url: '/images/social/social_sunset_production.jpg', caption: 'SERVICE PHOTO 3' }
    }
  };

  const [formData, setFormData] = useState(initialForm);

  const handleSaveHeader = (e) => {
    e.preventDefault();
    updateGrowthServicesHeader(headerData);
    setHeaderEditing(false);
    showToast('Growth Services section header updated!');
  };

  const handleOpenAdd = () => {
    setEditingItem(null);
    setFormData(initialForm);
    setModalOpen(true);
  };

  const handleOpenEdit = (item) => {
    setEditingItem(item);
    setFormData({
      title: item.title || '',
      category: item.category || 'BRAND AWARENESS',
      tabLabel: item.tabLabel || item.title || '',
      description: item.description || '',
      metricHighlight: item.metricHighlight || '',
      images: {
        left: {
          url: item.images?.left?.url || '/images/social/social_pool_shoot.jpg',
          caption: item.images?.left?.caption || 'PHOTO 1'
        },
        center: {
          url: item.images?.center?.url || '/images/social/social_instagram_feed.jpg',
          caption: item.images?.center?.caption || 'PHOTO 2'
        },
        right: {
          url: item.images?.right?.url || '/images/social/social_sunset_production.jpg',
          caption: item.images?.right?.caption || 'PHOTO 3'
        }
      }
    });
    setModalOpen(true);
  };

  const handleImageUpload = (slot, e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (uploadEvent) => {
      setFormData(prev => ({
        ...prev,
        images: {
          ...prev.images,
          [slot]: {
            ...prev.images[slot],
            url: uploadEvent.target.result
          }
        }
      }));
      showToast(`Image for ${slot} position uploaded successfully!`);
    };
    reader.readAsDataURL(file);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    if (editingItem) {
      updateService(editingItem.id, formData);
      showToast(`Service "${formData.title}" updated successfully!`);
    } else {
      addService(formData);
      showToast(`Service "${formData.title}" created successfully!`);
    }

    setModalOpen(false);
  };

  const handleDelete = (id, title) => {
    if (window.confirm(`Are you sure you want to remove "${title}"?`)) {
      deleteService(id);
      showToast(`Service "${title}" deleted.`);
    }
  };

  const services = data.services || [];

  return (
    <div>
      <div className="adm-page-header">
        <div className="adm-page-title">
          <h1>GROWTH SERVICES FOR HOSPITALITY BRANDS</h1>
          <p>Manage the main services section copy, scroll-scrub image reveals (3 photos per service), and metrics.</p>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            type="button"
            className="adm-btn adm-btn-secondary"
            onClick={() => setHeaderEditing(!headerEditing)}
          >
            <i className="bi bi-pencil-square"></i>
            <span>{headerEditing ? 'Close Header Edit' : 'Edit Section Header'}</span>
          </button>
          <button
            type="button"
            className="adm-btn adm-btn-primary"
            onClick={handleOpenAdd}
          >
            <i className="bi bi-plus-lg"></i>
            <span>Add New Service</span>
          </button>
        </div>
      </div>

      {/* Header Editor Card */}
      {headerEditing && (
        <div className="adm-card" style={{ borderLeft: '4px solid var(--adm-pink)', marginBottom: '1.5rem' }}>
          <div className="adm-card-header">
            <h3>
              <i className="bi bi-fonts" style={{ color: 'var(--adm-pink)' }}></i>
              <span>Edit Main Section Headline & Subtext</span>
            </h3>
          </div>
          <form onSubmit={handleSaveHeader}>
            <div className="adm-grid-2" style={{ gap: '1rem' }}>
              <div className="adm-form-group">
                <label className="adm-label">Heading Line 1</label>
                <input
                  type="text"
                  className="adm-input"
                  value={headerData.headlineLine1}
                  onChange={e => setHeaderData({ ...headerData, headlineLine1: e.target.value })}
                  placeholder="GROWTH SERVICES FOR"
                  required
                />
              </div>
              <div className="adm-form-group">
                <label className="adm-label">Heading Line 2 (Accent / Pink)</label>
                <input
                  type="text"
                  className="adm-input"
                  value={headerData.headlineLine2}
                  onChange={e => setHeaderData({ ...headerData, headlineLine2: e.target.value })}
                  placeholder="HOSPITALITY BRANDS."
                  required
                />
              </div>
            </div>
            <div className="adm-form-group">
              <label className="adm-label">Subtext Description</label>
              <textarea
                className="adm-textarea"
                rows={2}
                value={headerData.subtext}
                onChange={e => setHeaderData({ ...headerData, subtext: e.target.value })}
                required
              />
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
              <button
                type="button"
                className="adm-btn adm-btn-secondary adm-btn-sm"
                onClick={() => setHeaderEditing(false)}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="adm-btn adm-btn-primary adm-btn-sm"
              >
                <i className="bi bi-check-lg"></i> Save Header Changes
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Services List */}
      {services.length === 0 ? (
        <div className="adm-card" style={{ textAlign: 'center', padding: '3rem 1rem' }}>
          <i className="bi bi-layers" style={{ fontSize: '3rem', color: 'var(--adm-text-muted)' }}></i>
          <h3 style={{ margin: '1rem 0 0.5rem', color: 'var(--adm-text-primary)' }}>No Services Found</h3>
          <p style={{ color: 'var(--adm-text-secondary)', marginBottom: '1.25rem' }}>Add a hospitality marketing solution to display on the main page.</p>
          <button type="button" className="adm-btn adm-btn-primary" onClick={handleOpenAdd}>
            <i className="bi bi-plus-lg"></i> Add Service
          </button>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {services.map((srv, idx) => (
            <div key={srv.id} className="adm-card" style={{ marginBottom: 0, padding: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '10px', marginBottom: '1rem' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                    <span style={{
                      fontSize: '0.72rem',
                      fontWeight: 800,
                      padding: '2px 8px',
                      borderRadius: '12px',
                      background: 'rgba(249, 59, 121, 0.1)',
                      color: 'var(--adm-pink)'
                    }}>
                      SERVICE 0{idx + 1}
                    </span>
                    <span style={{ fontSize: '0.76rem', color: 'var(--adm-text-secondary)', textTransform: 'uppercase', fontWeight: 600 }}>
                      {srv.category}
                    </span>
                  </div>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 700, margin: '2px 0 6px', color: 'var(--adm-text-primary)' }}>
                    {srv.title}
                  </h3>
                  <p style={{ color: 'var(--adm-text-secondary)', fontSize: '0.88rem', margin: 0, maxWidth: '780px' }}>
                    {srv.description}
                  </p>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  {srv.metricHighlight && (
                    <span style={{
                      fontSize: '0.78rem',
                      fontWeight: 700,
                      background: '#f8fafc',
                      border: '1px solid var(--adm-border)',
                      padding: '4px 10px',
                      borderRadius: '6px'
                    }}>
                      {srv.metricHighlight}
                    </span>
                  )}
                  <button
                    type="button"
                    className="adm-btn adm-btn-secondary adm-btn-sm"
                    onClick={() => handleOpenEdit(srv)}
                  >
                    <i className="bi bi-pencil-fill"></i>
                    <span>Edit</span>
                  </button>
                  <button
                    type="button"
                    className="adm-btn adm-btn-danger adm-btn-sm"
                    onClick={() => handleDelete(srv.id, srv.title)}
                  >
                    <i className="bi bi-trash-fill"></i>
                  </button>
                </div>
              </div>

              {/* 3 Showcase Images Preview */}
              <div style={{
                background: '#f8fafc',
                border: '1px solid var(--adm-border)',
                borderRadius: '8px',
                padding: '10px 14px'
              }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--adm-text-muted)', textTransform: 'uppercase', marginBottom: '8px' }}>
                  Scroll-Scrub Revealed Images (Left, Center Dominant, Right):
                </div>
                <div className="adm-grid-3" style={{ gap: '10px' }}>
                  {['left', 'center', 'right'].map((pos) => {
                    const imgObj = srv.images?.[pos] || {};
                    return (
                      <div key={pos} style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#fff', border: '1px solid var(--adm-border)', borderRadius: '6px', padding: '6px' }}>
                        <img
                          src={imgObj.url}
                          alt={imgObj.caption || pos}
                          style={{ width: '48px', height: '48px', borderRadius: '4px', objectFit: 'cover' }}
                          onError={e => { e.target.src = '/images/social/social_pool_shoot.jpg'; }}
                        />
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--adm-pink)' }}>
                            {pos.toUpperCase()} PHOTO
                          </div>
                          <div style={{ fontSize: '0.76rem', color: 'var(--adm-text-secondary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                            {imgObj.caption || 'No caption'}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add / Edit Modal */}
      {modalOpen && (
        <div className="adm-modal-backdrop" onClick={(e) => { if (e.target === e.currentTarget) setModalOpen(false); }}>
          <div className="adm-modal-box" style={{ maxWidth: '720px' }}>
            <div className="adm-modal-header">
              <h3>{editingItem ? 'Edit Growth Service' : 'Add New Growth Service'}</h3>
              <button
                type="button"
                className="adm-modal-close"
                onClick={() => setModalOpen(false)}
              >
                <i className="bi bi-x-lg"></i>
              </button>
            </div>

            <form onSubmit={handleSave}>
              <div className="adm-modal-body">
                <div className="adm-form-group">
                  <label className="adm-label">Service Title</label>
                  <input
                    type="text"
                    className="adm-input"
                    value={formData.title}
                    onChange={e => setFormData({ ...formData, title: e.target.value })}
                    placeholder="E.g. Hotel Social Media & Influencer Marketing"
                    required
                  />
                </div>

                <div className="adm-grid-2" style={{ gap: '1rem' }}>
                  <div className="adm-form-group">
                    <label className="adm-label">Category</label>
                    <input
                      type="text"
                      className="adm-input"
                      value={formData.category}
                      onChange={e => setFormData({ ...formData, category: e.target.value })}
                      placeholder="E.g. BRAND AWARENESS"
                    />
                  </div>
                  <div className="adm-form-group">
                    <label className="adm-label">Metric Highlight Pill</label>
                    <input
                      type="text"
                      className="adm-input"
                      value={formData.metricHighlight}
                      onChange={e => setFormData({ ...formData, metricHighlight: e.target.value })}
                      placeholder="E.g. +280% ENGAGEMENT SURGE"
                    />
                  </div>
                </div>

                <div className="adm-form-group">
                  <label className="adm-label">Service Description</label>
                  <textarea
                    className="adm-textarea"
                    rows={3}
                    value={formData.description}
                    onChange={e => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Describe how this service generates revenue for hotels..."
                    required
                  />
                </div>

                {/* 3 Images Configuration */}
                <div style={{
                  background: '#f8fafc',
                  border: '1px solid var(--adm-border)',
                  borderRadius: '10px',
                  padding: '14px',
                  marginBottom: '1rem'
                }}>
                  <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--adm-text-primary)', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <i className="bi bi-images" style={{ color: 'var(--adm-pink)' }}></i>
                    <span>Scroll-Scrub Revealed Photos (Left, Center, Right)</span>
                  </div>

                  {['left', 'center', 'right'].map((slot) => (
                    <div key={slot} style={{ marginBottom: slot === 'right' ? 0 : '14px', paddingBottom: slot === 'right' ? 0 : '12px', borderBottom: slot === 'right' ? 'none' : '1px dashed var(--adm-border)' }}>
                      <div style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--adm-pink)', marginBottom: '6px' }}>
                        {slot.toUpperCase()} PHOTO
                      </div>

                      <div className="adm-grid-2" style={{ gap: '10px' }}>
                        <div>
                          <label className="adm-label" style={{ fontSize: '0.74rem' }}>Image URL or Upload Below</label>
                          <input
                            type="text"
                            className="adm-input"
                            value={formData.images[slot]?.url || ''}
                            onChange={e => setFormData({
                              ...formData,
                              images: {
                                ...formData.images,
                                [slot]: { ...formData.images[slot], url: e.target.value }
                              }
                            })}
                            placeholder="/images/... or https://..."
                          />
                        </div>
                        <div>
                          <label className="adm-label" style={{ fontSize: '0.74rem' }}>Image Caption</label>
                          <input
                            type="text"
                            className="adm-input"
                            value={formData.images[slot]?.caption || ''}
                            onChange={e => setFormData({
                              ...formData,
                              images: {
                                ...formData.images,
                                [slot]: { ...formData.images[slot], caption: e.target.value }
                              }
                            })}
                            placeholder="CAPTION"
                          />
                        </div>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '6px' }}>
                        <label className="adm-btn adm-btn-secondary adm-btn-sm" style={{ cursor: 'pointer', margin: 0 }}>
                          <i className="bi bi-upload"></i>
                          <span>Upload Photo from Device</span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={e => handleImageUpload(slot, e)}
                            style={{ display: 'none' }}
                          />
                        </label>
                        {formData.images[slot]?.url && (
                          <span style={{ fontSize: '0.75rem', color: '#10b981', display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <i className="bi bi-check-circle-fill"></i> Image Ready
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="adm-modal-footer">
                <button
                  type="button"
                  className="adm-btn adm-btn-secondary"
                  onClick={() => setModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="adm-btn adm-btn-primary"
                >
                  <i className="bi bi-check-lg"></i>
                  <span>{editingItem ? 'Update Service' : 'Save Service'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
