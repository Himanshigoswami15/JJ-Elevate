import React, { useState } from 'react';
import { useAdminData } from '../context/AdminDataContext';

const IMAGE_PRESETS = [
  { label: 'Heritage Palace Resort', url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1000&q=80' },
  { label: 'Udaipur Boutique Villas', url: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1000&q=80' },
  { label: 'Island Beachfront Retreat', url: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1000&q=80' },
  { label: 'Forest Eco-Lodge', url: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1000&q=80' }
];

export default function AdminCaseStudies({ showToast }) {
  const { data, addCaseStudy, updateCaseStudy, deleteCaseStudy } = useAdminData();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const initialForm = {
    title: '',
    location: 'Rajasthan, India',
    category: 'LUXURY HERITAGE',
    metricHighlight: '+340% ORGANIC TRAFFIC',
    description: '',
    image: IMAGE_PRESETS[0].url,
    challenge: '',
    strategy: '',
    results: '+340% direct search traffic, 4.9X ROAS on ads'
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
      title: item.title || '',
      location: item.location || '',
      category: item.category || 'LUXURY HERITAGE',
      metricHighlight: item.metricHighlight || '',
      description: item.description || '',
      image: item.image || '',
      challenge: item.fullDetails?.challenge || '',
      strategy: item.fullDetails?.strategy || '',
      results: Array.isArray(item.fullDetails?.results) ? item.fullDetails.results.join(', ') : (item.fullDetails?.results || '')
    });
    setModalOpen(true);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (uploadEvent) => {
      setFormData(prev => ({ ...prev, image: uploadEvent.target.result }));
      showToast('Case study image uploaded successfully from device!');
    };
    reader.readAsDataURL(file);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    const payload = {
      title: formData.title,
      location: formData.location,
      category: formData.category,
      metricHighlight: formData.metricHighlight,
      description: formData.description,
      image: formData.image,
      fullDetails: {
        challenge: formData.challenge,
        strategy: formData.strategy,
        results: formData.results.split(',').map(r => r.trim()).filter(Boolean)
      }
    };

    if (editingItem) {
      updateCaseStudy(editingItem.id, payload);
      showToast(`Case study "${formData.title}" updated successfully!`);
    } else {
      addCaseStudy(payload);
      showToast(`Case study "${formData.title}" created successfully!`);
    }

    setModalOpen(false);
  };

  const handleDelete = (id, title) => {
    if (window.confirm(`Are you sure you want to delete case study "${title}"?`)) {
      deleteCaseStudy(id);
      showToast(`Case study "${title}" deleted.`);
    }
  };

  const caseStudies = data.caseStudies || [];

  return (
    <div>
      <div className="adm-page-header">
        <div className="adm-page-title">
          <h1>Case Studies & Hotel Results</h1>
          <p>Add client transformations, upload luxury property photos, and highlight direct booking metrics.</p>
        </div>
        <button
          type="button"
          className="adm-btn adm-btn-primary"
          onClick={handleOpenAdd}
        >
          <i className="bi bi-plus-lg"></i>
          <span>Add New Case Study</span>
        </button>
      </div>

      {caseStudies.length === 0 ? (
        <div className="adm-card" style={{ textAlign: 'center', padding: '3rem 1rem' }}>
          <i className="bi bi-trophy" style={{ fontSize: '3rem', color: 'var(--adm-text-muted)' }}></i>
          <h3 style={{ margin: '1rem 0 0.5rem', color: 'var(--adm-text-primary)' }}>No Case Studies Found</h3>
          <p style={{ color: 'var(--adm-text-secondary)', marginBottom: '1.25rem' }}>Add your first hotel case study to display on the case studies page.</p>
          <button type="button" className="adm-btn adm-btn-primary" onClick={handleOpenAdd}>
            <i className="bi bi-plus-lg"></i> Add Case Study
          </button>
        </div>
      ) : (
        <div className="adm-grid-3">
          {caseStudies.map((cs) => (
            <div key={cs.id} className="adm-item-card">
              <img
                src={cs.image || IMAGE_PRESETS[0].url}
                alt={cs.title}
                className="adm-item-thumb"
                onError={(e) => { e.target.src = IMAGE_PRESETS[0].url; }}
              />

              <div className="adm-item-body">
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <span style={{ fontSize: '0.74rem', fontWeight: 600, color: 'var(--adm-text-muted)', textTransform: 'uppercase' }}>
                    {cs.category}
                  </span>
                  <span style={{
                    fontSize: '0.8rem',
                    fontWeight: 800,
                    color: 'var(--adm-pink)',
                    background: 'rgba(249, 59, 121, 0.1)',
                    padding: '2px 8px',
                    borderRadius: '12px'
                  }}>
                    {cs.metricHighlight}
                  </span>
                </div>

                <h4 className="adm-item-title">{cs.title}</h4>
                <div style={{ fontSize: '0.8rem', color: 'var(--adm-text-secondary)', marginBottom: '8px' }}>
                  <i className="bi bi-geo-alt" style={{ marginRight: '4px' }}></i>
                  {cs.location}
                </div>

                <p className="adm-item-desc">{cs.description}</p>
              </div>

              <div className="adm-item-actions">
                <button
                  type="button"
                  className="adm-btn adm-btn-secondary adm-btn-sm"
                  onClick={() => handleOpenEdit(cs)}
                >
                  <i className="bi bi-pencil-fill"></i>
                  <span>Edit</span>
                </button>
                <button
                  type="button"
                  className="adm-btn adm-btn-danger adm-btn-sm"
                  onClick={() => handleDelete(cs.id, cs.title)}
                  title="Delete case study"
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
              <h3>{editingItem ? 'Edit Case Study' : 'Add New Client Case Study'}</h3>
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
                  <label className="adm-label">Property / Resort Title</label>
                  <input
                    type="text"
                    className="adm-input"
                    value={formData.title}
                    onChange={e => setFormData({ ...formData, title: e.target.value })}
                    placeholder="E.g. The Royal Palace Resort"
                    required
                  />
                </div>

                <div className="adm-grid-2" style={{ gap: '1rem' }}>
                  <div className="adm-form-group">
                    <label className="adm-label">Location</label>
                    <input
                      type="text"
                      className="adm-input"
                      value={formData.location}
                      onChange={e => setFormData({ ...formData, location: e.target.value })}
                      placeholder="E.g. Jodhpur, Rajasthan"
                      required
                    />
                  </div>
                  <div className="adm-form-group">
                    <label className="adm-label">Category</label>
                    <input
                      type="text"
                      className="adm-input"
                      value={formData.category}
                      onChange={e => setFormData({ ...formData, category: e.target.value })}
                      placeholder="E.g. LUXURY HERITAGE or BOUTIQUE VILLAS"
                    />
                  </div>
                </div>

                <div className="adm-form-group">
                  <label className="adm-label">Key Metric Highlight</label>
                  <input
                    type="text"
                    className="adm-input"
                    value={formData.metricHighlight}
                    onChange={e => setFormData({ ...formData, metricHighlight: e.target.value })}
                    placeholder="E.g. +340% ORGANIC TRAFFIC or 4.8X ADS ROAS"
                    required
                  />
                </div>

                <div className="adm-form-group">
                  <label className="adm-label">Case Study Image URL</label>
                  <input
                    type="text"
                    className="adm-input"
                    value={formData.image}
                    onChange={e => setFormData({ ...formData, image: e.target.value })}
                    placeholder="Image URL or upload from device below"
                  />
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '8px' }}>
                    <label className="adm-btn adm-btn-secondary adm-btn-sm" style={{ cursor: 'pointer', margin: 0 }}>
                      <i className="bi bi-upload"></i>
                      <span>Upload Photo from Device</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        style={{ display: 'none' }}
                      />
                    </label>
                    <span style={{ fontSize: '0.76rem', color: 'var(--adm-text-muted)' }}>Or choose preset:</span>
                  </div>
                  <div className="adm-preset-pills">
                    {IMAGE_PRESETS.map((p, idx) => (
                      <button
                        key={idx}
                        type="button"
                        className={`adm-preset-pill ${formData.image === p.url ? 'active' : ''}`}
                        onClick={() => setFormData({ ...formData, image: p.url })}
                      >
                        {p.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="adm-form-group">
                  <label className="adm-label">Case Description</label>
                  <textarea
                    className="adm-textarea"
                    rows={3}
                    value={formData.description}
                    onChange={e => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Summary of direct booking transformation..."
                    required
                  />
                </div>

                <div className="adm-form-group">
                  <label className="adm-label">Hotel Challenge</label>
                  <input
                    type="text"
                    className="adm-input"
                    value={formData.challenge}
                    onChange={e => setFormData({ ...formData, challenge: e.target.value })}
                    placeholder="E.g. High OTA commission fees compressing room margins..."
                  />
                </div>

                <div className="adm-form-group">
                  <label className="adm-label">Our Strategy</label>
                  <input
                    type="text"
                    className="adm-input"
                    value={formData.strategy}
                    onChange={e => setFormData({ ...formData, strategy: e.target.value })}
                    placeholder="E.g. Deployed 4K viral reels and 2-step direct reservation engine..."
                  />
                </div>

                <div className="adm-form-group" style={{ marginBottom: 0 }}>
                  <label className="adm-label">Results (comma-separated bullets)</label>
                  <textarea
                    className="adm-textarea"
                    rows={2}
                    value={formData.results}
                    onChange={e => setFormData({ ...formData, results: e.target.value })}
                    placeholder="Over 1.2M views, 100% occupancy in 45 days, 4.8X ROAS"
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
                  <span>{editingItem ? 'Update Case Study' : 'Save Case Study'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
