import React, { useState } from 'react';
import { useAdminData } from '../context/AdminDataContext';
import { uploadMediaFile, isSupabaseConfigured } from '../lib/supabase';

const TEAM_AVATAR_PRESETS = [
  { label: 'Jayvardhan Joshi', url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=500&auto=format&fit=crop' },
  { label: 'Jahanvi Trivedi', url: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=500&auto=format&fit=crop' },
  { label: 'Devansh Rathore', url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=500&auto=format&fit=crop' },
  { label: 'Aanya Sen', url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=500&auto=format&fit=crop' }
];

export default function AdminTeam({ showToast }) {
  const { data, addTeamMember, updateTeamMember, deleteTeamMember, syncToCloud } = useAdminData();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [isUploadingImage, setIsUploadingImage] = useState(false);

  const initialForm = {
    name: '',
    title: '',
    bio: '',
    img: TEAM_AVATAR_PRESETS[0].url,
    active: true,
    linkedin: '',
    instagram: ''
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
      name: item.name || '',
      title: item.title || item.role || '',
      bio: item.bio || '',
      img: item.img || item.image || '',
      active: item.active !== false,
      linkedin: item.linkedin || '',
      instagram: item.instagram || ''
    });
    setModalOpen(true);
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Direct cloud upload if Supabase is connected
    if (isSupabaseConfigured()) {
      setIsUploadingImage(true);
      if (showToast) showToast('Uploading image to Supabase Cloud CDN...');
      try {
        const res = await uploadMediaFile(file, 'team');
        setIsUploadingImage(false);
        if (res.success && res.url) {
          setFormData(prev => ({ ...prev, img: res.url }));
          if (showToast) showToast('Profile photo uploaded & synced to Cloud Storage!');
          return;
        } else {
          console.warn('Supabase storage upload error:', res.message);
          if (showToast) showToast('Cloud upload fallback: optimizing locally...');
        }
      } catch (err) {
        setIsUploadingImage(false);
        console.warn('Storage error:', err);
      }
    }

    // Local fallback optimization (saved directly into Neon database JSON state)
    const reader = new FileReader();
    reader.onload = (uploadEvent) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const maxDim = 480;
        let w = img.width;
        let h = img.height;
        if (w > h) {
          if (w > maxDim) {
            h = Math.round((h * maxDim) / w);
            w = maxDim;
          }
        } else {
          if (h > maxDim) {
            w = Math.round((w * maxDim) / h);
            h = maxDim;
          }
        }
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, w, h);
        const compressed = canvas.toDataURL('image/jpeg', 0.85);
        setFormData(prev => ({ ...prev, img: compressed }));
        showToast('Profile image uploaded! Click Save to publish to Neon.');
      };
      img.onerror = () => {
        setFormData(prev => ({ ...prev, img: uploadEvent.target.result }));
      };
      img.src = uploadEvent.target.result;
    };
    reader.readAsDataURL(file);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    const payload = {
      ...formData,
      image: formData.img || TEAM_AVATAR_PRESETS[0].url,
      img: formData.img || TEAM_AVATAR_PRESETS[0].url,
      role: formData.title,
      title: formData.title
    };

    if (editingItem) {
      updateTeamMember(editingItem.id, payload);
      showToast(`Team member "${formData.name}" updated!`);
    } else {
      addTeamMember(payload);
      showToast(`Team member "${formData.name}" added!`);
    }

    if (syncToCloud) {
      syncToCloud();
    }

    setModalOpen(false);
  };

  const handleDelete = (id, name) => {
    if (window.confirm(`Are you sure you want to remove team member "${name}"?`)) {
      deleteTeamMember(id);
      showToast(`Team member "${name}" removed.`);
      if (syncToCloud) {
        syncToCloud();
      }
    }
  };

  const team = data.teamMembers || [];

  return (
    <div>
      <div className="adm-page-header">
        <div className="adm-page-title">
          <h1>Team & Co-Founders Management</h1>
          <p>Update founder bios, team roles, photos, and social profile links.</p>
        </div>
        <button
          type="button"
          className="adm-btn adm-btn-primary"
          onClick={handleOpenAdd}
        >
          <i className="bi bi-person-plus-fill"></i>
          <span>Add Team Member</span>
        </button>
      </div>

      {team.length === 0 ? (
        <div className="adm-card" style={{ textAlign: 'center', padding: '3rem 1rem' }}>
          <i className="bi bi-people" style={{ fontSize: '3rem', color: 'var(--adm-text-muted)' }}></i>
          <h3 style={{ margin: '1rem 0 0.5rem', color: 'var(--adm-text-primary)' }}>No Team Members</h3>
          <p style={{ color: 'var(--adm-text-secondary)', marginBottom: '1.25rem' }}>Add leaders and specialists to showcase on your About page and agency footer.</p>
          <button type="button" className="adm-btn adm-btn-primary" onClick={handleOpenAdd}>
            <i className="bi bi-person-plus-fill"></i> Add Team Member
          </button>
        </div>
      ) : (
        <div className="adm-grid-4">
          {team.map((member) => (
            <div key={member.id} className="adm-item-card" style={{ textAlign: 'center' }}>
              <div style={{ position: 'relative', display: 'inline-block', margin: '0 auto 12px' }}>
                <img
                  src={member.img || member.image || TEAM_AVATAR_PRESETS[0].url}
                  alt={member.name}
                  style={{
                    width: '96px',
                    height: '96px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                    border: '3px solid #ffffff',
                    boxShadow: '0 4px 14px rgba(0, 0, 0, 0.12)'
                  }}
                  onError={(e) => { e.target.src = TEAM_AVATAR_PRESETS[0].url; }}
                />
                <span style={{
                  position: 'absolute',
                  bottom: '4px',
                  right: '4px',
                  width: '14px',
                  height: '14px',
                  borderRadius: '50%',
                  background: member.active ? '#10b981' : '#94a3b8',
                  border: '2px solid #ffffff'
                }} title={member.active ? 'Active Profile' : 'Inactive'}></span>
              </div>

              <div className="adm-item-body">
                <h4 className="adm-item-title" style={{ fontSize: '1rem' }}>{member.name}</h4>
                <div className="adm-item-subtitle" style={{ fontSize: '0.78rem', marginBottom: '8px' }}>
                  {member.title || member.role}
                </div>
                <p className="adm-item-desc" style={{ fontSize: '0.8rem', textAlign: 'left' }}>
                  {member.bio}
                </p>

                <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '10px' }}>
                  {member.linkedin && (
                    <a href={member.linkedin} target="_blank" rel="noopener noreferrer" style={{ color: '#0a66c2', fontSize: '1.1rem' }}>
                      <i className="bi bi-linkedin"></i>
                    </a>
                  )}
                  {member.instagram && (
                    <a href={member.instagram} target="_blank" rel="noopener noreferrer" style={{ color: '#e1306c', fontSize: '1.1rem' }}>
                      <i className="bi bi-instagram"></i>
                    </a>
                  )}
                </div>
              </div>

              <div className="adm-item-actions" style={{ justifyContent: 'center' }}>
                <button
                  type="button"
                  className="adm-btn adm-btn-secondary adm-btn-sm"
                  onClick={() => handleOpenEdit(member)}
                >
                  <i className="bi bi-pencil-fill"></i>
                  <span>Edit</span>
                </button>
                <button
                  type="button"
                  className="adm-btn adm-btn-danger adm-btn-sm"
                  onClick={() => handleDelete(member.id, member.name)}
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
          <form
            className="adm-modal-box"
            onSubmit={handleSave}
            style={{ maxHeight: '85vh', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}
          >
            <div className="adm-modal-header" style={{ flexShrink: 0 }}>
              <h3>{editingItem ? 'Edit Team Member' : 'Add New Team Member'}</h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <button
                  type="submit"
                  className="adm-btn adm-btn-primary adm-btn-sm"
                  title="Save Member"
                >
                  <i className="bi bi-check-lg"></i>
                  <span>{editingItem ? 'Update' : 'Save Member'}</span>
                </button>
                <button
                  type="button"
                  className="adm-modal-close"
                  onClick={() => setModalOpen(false)}
                  title="Close"
                >
                  <i className="bi bi-x-lg"></i>
                </button>
              </div>
            </div>

            <div className="adm-modal-body" style={{ overflowY: 'auto', flex: '1 1 auto', minHeight: 0 }}>
              <div className="adm-form-group">
                <label className="adm-label">Full Name</label>
                <input
                  type="text"
                  className="adm-input"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  placeholder="E.g. Jayvardhan Joshi"
                  required
                />
              </div>

              <div className="adm-form-group">
                <label className="adm-label">Role / Job Title</label>
                <input
                  type="text"
                  className="adm-input"
                  value={formData.title}
                  onChange={e => setFormData({ ...formData, title: e.target.value })}
                  placeholder="E.g. Co-Founder & Creative Director"
                  required
                />
              </div>

              <div className="adm-form-group">
                <label className="adm-label">Profile Image URL</label>
                <input
                  type="text"
                  className="adm-input"
                  value={formData.img}
                  onChange={e => setFormData({ ...formData, img: e.target.value })}
                  placeholder="Image URL or upload below"
                />
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '8px' }}>
                  <label className="adm-btn adm-btn-secondary adm-btn-sm" style={{ cursor: isUploadingImage ? 'not-allowed' : 'pointer', margin: 0, opacity: isUploadingImage ? 0.7 : 1 }}>
                    <i className={isUploadingImage ? 'spinner-border spinner-border-sm' : 'bi bi-upload'}></i>
                    <span>{isUploadingImage ? 'Uploading to Cloud CDN...' : 'Upload Photo from Device'}</span>
                    <input
                      type="file"
                      accept="image/*"
                      disabled={isUploadingImage}
                      onChange={handleImageUpload}
                      style={{ display: 'none' }}
                    />
                  </label>
                  <span style={{ fontSize: '0.76rem', color: 'var(--adm-text-muted)' }}>Or choose preset:</span>
                </div>
                <div className="adm-preset-pills">
                  {TEAM_AVATAR_PRESETS.map((p, idx) => (
                    <button
                      key={idx}
                      type="button"
                      className={`adm-preset-pill ${formData.img === p.url ? 'active' : ''}`}
                      onClick={() => setFormData({ ...formData, img: p.url })}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="adm-form-group">
                <label className="adm-label">Short Biography</label>
                <textarea
                  className="adm-textarea"
                  rows={3}
                  value={formData.bio}
                  onChange={e => setFormData({ ...formData, bio: e.target.value })}
                  placeholder="Bio, experience, and background..."
                  required
                />
              </div>

              <div className="adm-grid-2" style={{ gap: '1rem' }}>
                <div className="adm-form-group">
                  <label className="adm-label">LinkedIn URL</label>
                  <input
                    type="text"
                    className="adm-input"
                    value={formData.linkedin}
                    onChange={e => setFormData({ ...formData, linkedin: e.target.value })}
                    placeholder="https://linkedin.com/in/..."
                  />
                </div>
                <div className="adm-form-group">
                  <label className="adm-label">Instagram URL</label>
                  <input
                    type="text"
                    className="adm-input"
                    value={formData.instagram}
                    onChange={e => setFormData({ ...formData, instagram: e.target.value })}
                    placeholder="https://instagram.com/..."
                  />
                </div>
              </div>

              <div className="adm-form-group" style={{ marginBottom: 0 }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={formData.active}
                    onChange={e => setFormData({ ...formData, active: e.target.checked })}
                    style={{ width: '16px', height: '16px', accentColor: 'var(--adm-pink)' }}
                  />
                  <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>Active (Visible on public website)</span>
                </label>
              </div>
            </div>

            <div className="adm-modal-footer" style={{ flexShrink: 0 }}>
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
                <span>{editingItem ? 'Update Member' : 'Save Member'}</span>
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
