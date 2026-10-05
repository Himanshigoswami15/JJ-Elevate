import React, { useState, useEffect } from 'react';
import { useAdminData } from '../context/AdminDataContext';

export default function AdminReels({ showToast }) {
  const { data, updateReels } = useAdminData();
  const [formData, setFormData] = useState({
    videoUrl: data.reels?.videoUrl || '/videos/jj-elevate-reels-37.mp4',
    poster: data.reels?.poster || '',
    caption: data.reels?.caption || 'Private overwater infinity pool villa at sunset. Experience bespoke luxury. #luxuryresort #maldives #directbooking #hospitality',
    author: data.reels?.author || 'JJ Elevate',
    views: data.reels?.views || '20M',
    likes: data.reels?.likes || '5.1M',
    comments: data.reels?.comments || '12.1K',
    title: data.reels?.title || 'Viral Content That Fills Empty Rooms',
    subtitle: data.reels?.subtitle || 'High-Velocity Hospitality Reels',
    description: data.reels?.description || ''
  });

  useEffect(() => {
    if (data.reels) {
      setFormData({
        videoUrl: data.reels.videoUrl || '/videos/jj-elevate-reels-37.mp4',
        poster: data.reels.poster || '',
        caption: data.reels.caption || 'Private overwater infinity pool villa at sunset. Experience bespoke luxury. #luxuryresort #maldives #directbooking #hospitality',
        author: data.reels.author || 'JJ Elevate',
        views: data.reels.views || '20M',
        likes: data.reels.likes || '5.1M',
        comments: data.reels.comments || '12.1K',
        title: data.reels.title || 'Viral Content That Fills Empty Rooms',
        subtitle: data.reels.subtitle || 'High-Velocity Hospitality Reels',
        description: data.reels.description || ''
      });
    }
  }, [data.reels]);

  const handleVideoUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      setFormData(prev => ({ ...prev, videoUrl: event.target.result }));
      showToast('Video uploaded from device ready to save!');
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateReels(formData);
    showToast('Instagram Viral Reel settings updated successfully on the main page!');
  };

  return (
    <div>
      <div className="adm-page-header">
        <div className="adm-page-title">
          <h1>Instagram Reel & Viral Showcase</h1>
          <p>Change the interactive 9:16 vertical reel video, caption, views, likes, and engagement metrics on the homepage.</p>
        </div>
      </div>

      <div className="adm-grid-2">
        <div className="adm-card">
          <div className="adm-card-header">
            <h3>
              <i className="bi bi-instagram" style={{ color: '#e1306c' }}></i>
              <span>Reel Media & Caption Settings</span>
            </h3>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="adm-form-group">
              <label className="adm-label">Reel Video URL / Path</label>
              <input
                type="text"
                className="adm-input"
                value={formData.videoUrl}
                onChange={e => setFormData({ ...formData, videoUrl: e.target.value })}
                placeholder="/videos/jj-elevate-reels-37.mp4"
                required
              />
              <div style={{ marginTop: '8px' }}>
                <label className="adm-btn adm-btn-secondary adm-btn-sm" style={{ cursor: 'pointer', margin: 0 }}>
                  <i className="bi bi-upload"></i>
                  <span>Upload MP4 from Device</span>
                  <input
                    type="file"
                    accept="video/mp4,video/webm"
                    onChange={handleVideoUpload}
                    style={{ display: 'none' }}
                  />
                </label>
              </div>
            </div>

            <div className="adm-form-group">
              <label className="adm-label">Author Name</label>
              <input
                type="text"
                className="adm-input"
                value={formData.author}
                onChange={e => setFormData({ ...formData, author: e.target.value })}
                placeholder="JJ Elevate"
                required
              />
            </div>

            <div className="adm-form-group">
              <label className="adm-label">Instagram Post Caption</label>
              <textarea
                className="adm-textarea"
                rows={3}
                value={formData.caption}
                onChange={e => setFormData({ ...formData, caption: e.target.value })}
                placeholder="Enter caption with hashtags..."
                required
              />
            </div>

            <div className="adm-grid-3" style={{ gap: '10px' }}>
              <div className="adm-form-group">
                <label className="adm-label">Views Count</label>
                <input
                  type="text"
                  className="adm-input"
                  value={formData.views}
                  onChange={e => setFormData({ ...formData, views: e.target.value })}
                  placeholder="20M"
                />
              </div>
              <div className="adm-form-group">
                <label className="adm-label">Likes Count</label>
                <input
                  type="text"
                  className="adm-input"
                  value={formData.likes}
                  onChange={e => setFormData({ ...formData, likes: e.target.value })}
                  placeholder="5.1M"
                />
              </div>
              <div className="adm-form-group">
                <label className="adm-label">Comments Count</label>
                <input
                  type="text"
                  className="adm-input"
                  value={formData.comments}
                  onChange={e => setFormData({ ...formData, comments: e.target.value })}
                  placeholder="12.1K"
                />
              </div>
            </div>

            <button type="submit" className="adm-btn adm-btn-primary" style={{ width: '100%' }}>
              <i className="bi bi-check2-circle"></i>
              <span>Save & Publish Reel Changes</span>
            </button>
          </form>
        </div>

        {/* Live Vertical Player Preview */}
        <div>
          <div className="adm-card">
            <div className="adm-card-header">
              <h3>
                <i className="bi bi-phone-fill" style={{ color: 'var(--adm-pink)' }}></i>
                <span>Vertical Reel Player Preview</span>
              </h3>
            </div>

            <div style={{
              display: 'flex',
              justifyContent: 'center',
              background: '#090d16',
              borderRadius: '16px',
              padding: '1.5rem',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)'
            }}>
              <div style={{
                width: '260px',
                aspectRatio: '9/16',
                borderRadius: '16px',
                overflow: 'hidden',
                position: 'relative',
                border: '3px solid #1e293b',
                background: '#000000'
              }}>
                <video
                  key={formData.videoUrl}
                  src={formData.videoUrl}
                  autoPlay
                  loop
                  muted
                  playsInline
                  controls
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
            </div>

            <div style={{
              marginTop: '1.25rem',
              padding: '12px',
              background: '#f8fafc',
              borderRadius: '8px',
              border: '1px solid var(--adm-border)',
              fontSize: '0.82rem'
            }}>
              <div style={{ fontWeight: 700, color: 'var(--adm-text-primary)', marginBottom: '4px' }}>
                Caption Preview:
              </div>
              <div style={{ color: 'var(--adm-text-secondary)', lineHeight: 1.4 }}>
                {formData.caption}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
