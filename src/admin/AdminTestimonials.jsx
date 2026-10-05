import React, { useState } from 'react';
import { useAdminData } from '../context/AdminDataContext';

const AVATAR_PRESETS = [
  { label: 'Hotelier Male 1', url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=300&auto=format&fit=crop' },
  { label: 'Executive Female 1', url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=300&auto=format&fit=crop' },
  { label: 'Managing Director', url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=300&auto=format&fit=crop' },
  { label: 'Resort Owner', url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=300&auto=format&fit=crop' }
];

export default function AdminTestimonials({ showToast }) {
  const { data, addTestimonial, updateTestimonial, deleteTestimonial } = useAdminData();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const initialForm = {
    clientName: '',
    role: 'General Manager',
    property: '',
    content: '',
    rating: 5,
    avatar: AVATAR_PRESETS[0].url
  };

  const [formData, setFormData] = useState(initialForm);

  const handleOpenAdd = () => {
    setEditingItem(null);
    setFormData(initialForm);
    setModalOpen(true);
  };

  const handleOpenEdit = (item) => {
    setEditingItem(item);
    setFormData({
      clientName: item.clientName || '',
      role: item.role || '',
      property: item.property || '',
      content: item.content || '',
      rating: item.rating || 5,
      avatar: item.avatar || ''
    });
    setModalOpen(true);
  };

  const handleAvatarUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (uploadEvent) => {
      setFormData(prev => ({ ...prev, avatar: uploadEvent.target.result }));
      showToast('Avatar uploaded successfully!');
    };
    reader.readAsDataURL(file);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!formData.clientName.trim()) return;

    if (editingItem) {
      updateTestimonial(editingItem.id, formData);
      showToast(`Testimonial from "${formData.clientName}" updated!`);
    } else {
      addTestimonial(formData);
      showToast(`Testimonial from "${formData.clientName}" added!`);
    }

    setModalOpen(false);
  };

  const handleDelete = (id, name) => {
    if (window.confirm(`Are you sure you want to delete testimonial from "${name}"?`)) {
      deleteTestimonial(id);
      showToast(`Testimonial from "${name}" deleted.`);
    }
  };

  const testimonials = data.testimonials || [];

  return (
    <div>
      <div className="adm-page-header">
        <div className="adm-page-title">
          <h1>Client Testimonials & Reviews</h1>
          <p>Manage five-star endorsements from hotel general managers, luxury owners, and partners.</p>
        </div>
        <button
          type="button"
          className="adm-btn adm-btn-primary"
          onClick={handleOpenAdd}
        >
          <i className="bi bi-plus-lg"></i>
          <span>Add Testimonial</span>
        </button>
      </div>

      {testimonials.length === 0 ? (
        <div className="adm-card" style={{ textAlign: 'center', padding: '3rem 1rem' }}>
          <i className="bi bi-chat-quote" style={{ fontSize: '3rem', color: 'var(--adm-text-muted)' }}></i>
          <h3 style={{ margin: '1rem 0 0.5rem', color: 'var(--adm-text-primary)' }}>No Testimonials Found</h3>
          <p style={{ color: 'var(--adm-text-secondary)', marginBottom: '1.25rem' }}>Add client endorsements to display on the homepage social proof strip.</p>
          <button type="button" className="adm-btn adm-btn-primary" onClick={handleOpenAdd}>
            <i className="bi bi-plus-lg"></i> Add Testimonial
          </button>
        </div>
      ) : (
        <div className="adm-grid-3">
          {testimonials.map((item) => (
            <div key={item.id} className="adm-item-card">
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                <img
                  src={item.avatar || AVATAR_PRESETS[0].url}
                  alt={item.clientName}
                  style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover' }}
                  onError={(e) => { e.target.src = AVATAR_PRESETS[0].url; }}
                />
                <div>
                  <h4 className="adm-item-title" style={{ fontSize: '0.98rem' }}>{item.clientName}</h4>
                  <div style={{ fontSize: '0.78rem', color: 'var(--adm-text-secondary)' }}>
                    {item.role}, {item.property}
                  </div>
                </div>
              </div>

              <div style={{ color: '#eab308', marginBottom: '8px', fontSize: '0.9rem' }}>
                {Array.from({ length: item.rating || 5 }).map((_, i) => (
                  <i key={i} className="bi bi-star-fill" style={{ marginRight: '2px' }}></i>
                ))}
              </div>

              <p className="adm-item-desc" style={{ fontStyle: 'italic' }}>
                "{item.content}"
              </p>

              <div className="adm-item-actions">
                <button
                  type="button"
                  className="adm-btn adm-btn-secondary adm-btn-sm"
                  onClick={() => handleOpenEdit(item)}
                >
                  <i className="bi bi-pencil-fill"></i>
                  <span>Edit</span>
                </button>
                <button
                  type="button"
                  className="adm-btn adm-btn-danger adm-btn-sm"
                  onClick={() => handleDelete(item.id, item.clientName)}
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
              <h3>{editingItem ? 'Edit Testimonial' : 'Add New Client Testimonial'}</h3>
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
                  <label className="adm-label">Client Name</label>
                  <input
                    type="text"
                    className="adm-input"
                    value={formData.clientName}
                    onChange={e => setFormData({ ...formData, clientName: e.target.value })}
                    placeholder="E.g. Rajeev Malhotra"
                    required
                  />
                </div>

                <div className="adm-grid-2" style={{ gap: '1rem' }}>
                  <div className="adm-form-group">
                    <label className="adm-label">Role / Position</label>
                    <input
                      type="text"
                      className="adm-input"
                      value={formData.role}
                      onChange={e => setFormData({ ...formData, role: e.target.value })}
                      placeholder="E.g. Managing Director"
                      required
                    />
                  </div>
                  <div className="adm-form-group">
                    <label className="adm-label">Hotel / Brand</label>
                    <input
                      type="text"
                      className="adm-input"
                      value={formData.property}
                      onChange={e => setFormData({ ...formData, property: e.target.value })}
                      placeholder="E.g. The Royal Haveli Udaipur"
                      required
                    />
                  </div>
                </div>

                <div className="adm-form-group">
                  <label className="adm-label">Star Rating</label>
                  <select
                    className="adm-select"
                    value={formData.rating}
                    onChange={e => setFormData({ ...formData, rating: Number(e.target.value) })}
                  >
                    <option value={5}>5 Stars (★★★★★)</option>
                    <option value={4}>4 Stars (★★★★☆)</option>
                    <option value={3}>3 Stars (★★★☆☆)</option>
                  </select>
                </div>

                <div className="adm-form-group">
                  <label className="adm-label">Client Avatar URL</label>
                  <input
                    type="text"
                    className="adm-input"
                    value={formData.avatar}
                    onChange={e => setFormData({ ...formData, avatar: e.target.value })}
                    placeholder="Avatar image URL"
                  />
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '8px' }}>
                    <label className="adm-btn adm-btn-secondary adm-btn-sm" style={{ cursor: 'pointer', margin: 0 }}>
                      <i className="bi bi-upload"></i>
                      <span>Upload Avatar</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleAvatarUpload}
                        style={{ display: 'none' }}
                      />
                    </label>
                    <span style={{ fontSize: '0.76rem', color: 'var(--adm-text-muted)' }}>Presets:</span>
                  </div>
                  <div className="adm-preset-pills">
                    {AVATAR_PRESETS.map((p, idx) => (
                      <button
                        key={idx}
                        type="button"
                        className={`adm-preset-pill ${formData.avatar === p.url ? 'active' : ''}`}
                        onClick={() => setFormData({ ...formData, avatar: p.url })}
                      >
                        {p.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="adm-form-group" style={{ marginBottom: 0 }}>
                  <label className="adm-label">Testimonial Quote / Feedback</label>
                  <textarea
                    className="adm-textarea"
                    rows={3}
                    value={formData.content}
                    onChange={e => setFormData({ ...formData, content: e.target.value })}
                    placeholder="Enter what the client said about JJ Elevate..."
                    required
                  />
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
                  <span>{editingItem ? 'Update Testimonial' : 'Save Testimonial'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
