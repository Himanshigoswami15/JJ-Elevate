import React, { useState } from 'react';
import { useAdminData } from '../context/AdminDataContext';

export default function AdminBrands({ showToast }) {
  const { data, addBrand, updateBrand, deleteBrand } = useAdminData();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingBrand, setEditingBrand] = useState(null);
  const [filterType, setFilterType] = useState('all');

  const initialForm = {
    name: '',
    category: 'hotel',
    logo: '',
    text: ''
  };

  const [formData, setFormData] = useState(initialForm);

  const handleOpenAdd = () => {
    setEditingBrand(null);
    setFormData(initialForm);
    setModalOpen(true);
  };

  const handleOpenEdit = (brand) => {
    setEditingBrand(brand);
    setFormData({
      name: brand.name || '',
      category: brand.category || 'hotel',
      logo: brand.logo || '',
      text: brand.text || brand.name?.toUpperCase() || ''
    });
    setModalOpen(true);
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      setFormData(prev => ({ ...prev, logo: event.target.result }));
      showToast('Brand logo image uploaded from device!');
    };
    reader.readAsDataURL(file);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    const payload = {
      ...formData,
      text: formData.text.trim() || formData.name.toUpperCase()
    };

    if (editingBrand) {
      updateBrand(editingBrand.id, payload);
      showToast(`Brand "${formData.name}" updated successfully!`);
    } else {
      addBrand(payload);
      showToast(`Brand "${formData.name}" added to marquee ticker!`);
    }

    setModalOpen(false);
  };

  const handleDelete = (id, name) => {
    if (window.confirm(`Are you sure you want to remove "${name}" from the client brands marquee?`)) {
      deleteBrand(id);
      showToast(`Brand "${name}" removed.`);
    }
  };

  const brands = data.brands || [];

  const filteredBrands = brands.filter(b => {
    if (filterType === 'all') return true;
    return b.category === filterType;
  });

  return (
    <div>
      <div className="adm-page-header">
        <div className="adm-page-title">
          <h1>Brands That Grow With JJ Elevate</h1>
          <p>Manage the hotel client logos and global booking distribution channel logos displayed in the marquee.</p>
        </div>
        <button
          type="button"
          className="adm-btn adm-btn-primary"
          onClick={handleOpenAdd}
        >
          <i className="bi bi-plus-lg"></i>
          <span>Add New Brand</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="adm-card" style={{ padding: '0.75rem 1.25rem', marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            type="button"
            className={`adm-btn adm-btn-sm ${filterType === 'all' ? 'adm-btn-primary' : 'adm-btn-secondary'}`}
            onClick={() => setFilterType('all')}
          >
            All Brands ({brands.length})
          </button>
          <button
            type="button"
            className={`adm-btn adm-btn-sm ${filterType === 'hotel' ? 'adm-btn-primary' : 'adm-btn-secondary'}`}
            onClick={() => setFilterType('hotel')}
          >
            Luxury Hotels ({brands.filter(b => b.category === 'hotel').length})
          </button>
          <button
            type="button"
            className={`adm-btn adm-btn-sm ${filterType === 'partner' ? 'adm-btn-primary' : 'adm-btn-secondary'}`}
            onClick={() => setFilterType('partner')}
          >
            OTAs & Booking Partners ({brands.filter(b => b.category === 'partner').length})
          </button>
        </div>
      </div>

      {/* Brand Grid */}
      {filteredBrands.length === 0 ? (
        <div className="adm-card" style={{ textAlign: 'center', padding: '3rem 1rem' }}>
          <i className="bi bi-building" style={{ fontSize: '3rem', color: 'var(--adm-text-muted)' }}></i>
          <h3 style={{ margin: '1rem 0 0.5rem', color: 'var(--adm-text-primary)' }}>No Brands Found</h3>
          <p style={{ color: 'var(--adm-text-secondary)', marginBottom: '1.25rem' }}>Add hotel brands or booking platforms to showcase in the ticker.</p>
          <button type="button" className="adm-btn adm-btn-primary" onClick={handleOpenAdd}>
            <i className="bi bi-plus-lg"></i> Add Brand
          </button>
        </div>
      ) : (
        <div className="adm-grid-4">
          {filteredBrands.map((b) => (
            <div key={b.id} className="adm-item-card" style={{ alignItems: 'center', textAlign: 'center' }}>
              <div style={{
                width: '100%',
                height: '70px',
                borderRadius: '8px',
                background: '#f8fafc',
                border: '1px solid var(--adm-border)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '10px',
                padding: '8px'
              }}>
                {b.logo ? (
                  <img
                    src={b.logo}
                    alt={b.name}
                    style={{ maxHeight: '42px', maxWidth: '100%', objectFit: 'contain' }}
                  />
                ) : (
                  <div style={{
                    fontWeight: 800,
                    fontSize: '0.95rem',
                    letterSpacing: '0.12em',
                    color: 'var(--adm-dark)',
                    fontFamily: 'serif'
                  }}>
                    {b.text || b.name}
                  </div>
                )}
              </div>

              <div className="adm-item-body" style={{ width: '100%' }}>
                <h4 className="adm-item-title" style={{ fontSize: '0.92rem', marginBottom: '2px' }}>{b.name}</h4>
                <div style={{
                  fontSize: '0.74rem',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  color: b.category === 'hotel' ? 'var(--adm-pink)' : '#2563eb',
                  marginBottom: '10px'
                }}>
                  {b.category === 'hotel' ? 'Hotel / Resort' : 'Booking / Distribution'}
                </div>
              </div>

              <div className="adm-item-actions" style={{ width: '100%', justifyContent: 'center' }}>
                <button
                  type="button"
                  className="adm-btn adm-btn-secondary adm-btn-sm"
                  onClick={() => handleOpenEdit(b)}
                >
                  <i className="bi bi-pencil-fill"></i>
                  <span>Edit</span>
                </button>
                <button
                  type="button"
                  className="adm-btn adm-btn-danger adm-btn-sm"
                  onClick={() => handleDelete(b.id, b.name)}
                >
                  <i className="bi bi-trash-fill"></i>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {modalOpen && (
        <div className="adm-modal-backdrop" onClick={(e) => { if (e.target === e.currentTarget) setModalOpen(false); }}>
          <div className="adm-modal-box">
            <div className="adm-modal-header">
              <h3>{editingBrand ? 'Edit Client Brand' : 'Add Brand to Marquee'}</h3>
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
                  <label className="adm-label">Brand Name</label>
                  <input
                    type="text"
                    className="adm-input"
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    placeholder="E.g. Taj Hotels or Booking.com"
                    required
                  />
                </div>

                <div className="adm-form-group">
                  <label className="adm-label">Brand Category</label>
                  <select
                    className="adm-select"
                    value={formData.category}
                    onChange={e => setFormData({ ...formData, category: e.target.value })}
                  >
                    <option value="hotel">Luxury Hotel & Resort Client</option>
                    <option value="partner">OTA & Booking Distribution Channel</option>
                  </select>
                </div>

                <div className="adm-form-group">
                  <label className="adm-label">Text Monogram / Fallback Display</label>
                  <input
                    type="text"
                    className="adm-input"
                    value={formData.text}
                    onChange={e => setFormData({ ...formData, text: e.target.value })}
                    placeholder="E.g. TAJ or OBEROI or LEELA"
                  />
                  <div className="adm-help-text">
                    Used if no image logo is uploaded, displayed with elegant luxury typography.
                  </div>
                </div>

                <div className="adm-form-group" style={{ marginBottom: 0 }}>
                  <label className="adm-label">Brand Logo Image URL (PNG/SVG with transparent background)</label>
                  <input
                    type="text"
                    className="adm-input"
                    value={formData.logo}
                    onChange={e => setFormData({ ...formData, logo: e.target.value })}
                    placeholder="Logo image URL"
                  />
                  <div style={{ marginTop: '8px' }}>
                    <label className="adm-btn adm-btn-secondary adm-btn-sm" style={{ cursor: 'pointer', margin: 0 }}>
                      <i className="bi bi-upload"></i>
                      <span>Upload Logo from Device</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleLogoUpload}
                        style={{ display: 'none' }}
                      />
                    </label>
                  </div>
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
                  <span>{editingBrand ? 'Update Brand' : 'Save Brand'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
