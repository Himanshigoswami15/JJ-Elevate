import React, { useState, useEffect } from 'react';
import { useAdminData } from '../context/AdminDataContext';

const VIDEO_PRESETS = [
  {
    title: 'JJ Elevate Reels 41 MP4',
    url: '/videos/jj-elevate-reels-41.mp4',
    poster: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=1200&auto=format&fit=crop',
    label: 'Reels 41'
  },
  {
    title: 'JJ Elevate Reel Showcase MP4',
    url: '/videos/jj-elevate-reels-37.mp4',
    poster: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=1200&auto=format&fit=crop',
    label: 'Agency Reel'
  },
  {
    title: 'Luxury Resort Pool & Deck',
    url: 'https://assets.mixkit.co/videos/preview/mixkit-luxury-resort-swimming-pool-and-deck-42993-large.mp4',
    poster: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1200&auto=format&fit=crop',
    label: 'Resort Deck'
  },
  {
    title: 'Tropical Ocean Villa Sunset',
    url: 'https://assets.mixkit.co/videos/preview/mixkit-top-aerial-shot-of-seashore-with-rocks-and-clear-water-43009-large.mp4',
    poster: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=1200&auto=format&fit=crop',
    label: 'Ocean Aerial'
  },
  {
    title: 'Heritage Palace Architecture',
    url: 'https://assets.mixkit.co/videos/preview/mixkit-waves-coming-to-the-beach-5016-large.mp4',
    poster: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=1200&auto=format&fit=crop',
    label: 'Luxury Beach'
  }
];

export default function AdminHero({ showToast }) {
  const { data, updateHero } = useAdminData();
  const [formData, setFormData] = useState({
    headlineLine1: data.hero.headlineLine1 || 'ELEVATE YOUR',
    headlineAccent: data.hero.headlineAccent || 'HOSPITALITY BRAND',
    headlineLine2: data.hero.headlineLine2 || 'INTO DIRECT REVENUE',
    subheadline: data.hero.subheadline || '',
    badgeText: data.hero.badgeText || '',
    videoUrl: data.hero.videoUrl || '',
    poster: data.hero.poster || '',
    ctaPrimaryText: data.hero.ctaPrimaryText || 'Book Growth Audit',
    ctaSecondaryText: data.hero.ctaSecondaryText || 'Explore Case Studies'
  });

  useEffect(() => {
    setFormData({
      headlineLine1: data.hero.headlineLine1 || 'ELEVATE YOUR',
      headlineAccent: data.hero.headlineAccent || 'HOSPITALITY BRAND',
      headlineLine2: data.hero.headlineLine2 || 'INTO DIRECT REVENUE',
      subheadline: data.hero.subheadline || '',
      badgeText: data.hero.badgeText || '',
      videoUrl: data.hero.videoUrl || '',
      poster: data.hero.poster || '',
      ctaPrimaryText: data.hero.ctaPrimaryText || 'Book Growth Audit',
      ctaSecondaryText: data.hero.ctaSecondaryText || 'Explore Case Studies'
    });
  }, [data.hero]);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateHero(formData);
    showToast('Hero section & video configuration updated successfully!');
  };

  const handleApplyPreset = (preset) => {
    setFormData(prev => ({
      ...prev,
      videoUrl: preset.url,
      poster: preset.poster
    }));
    showToast(`Preset "${preset.title}" selected! Click Save to apply.`);
  };

  return (
    <div>
      <div className="adm-page-header">
        <div className="adm-page-title">
          <h1>Hero Section & Video Media</h1>
          <p>Control hero headlines, video background reel, CTA buttons, and trust badges.</p>
        </div>
      </div>

      <div className="adm-grid-2">
        {/* Form Panel */}
        <div className="adm-card">
          <div className="adm-card-header">
            <h3>
              <i className="bi bi-pencil-square" style={{ color: 'var(--adm-pink)' }}></i>
              <span>Hero Copy & Media Settings</span>
            </h3>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="adm-form-group">
              <label className="adm-label">Headline Line 1</label>
              <input
                type="text"
                className="adm-input"
                value={formData.headlineLine1}
                onChange={e => setFormData({ ...formData, headlineLine1: e.target.value })}
                placeholder="E.g. ELEVATE YOUR"
                required
              />
            </div>

            <div className="adm-form-group">
              <label className="adm-label">Headline Accent (Pink/Highlight)</label>
              <input
                type="text"
                className="adm-input"
                value={formData.headlineAccent}
                onChange={e => setFormData({ ...formData, headlineAccent: e.target.value })}
                placeholder="E.g. HOSPITALITY BRAND"
                required
              />
            </div>

            <div className="adm-form-group">
              <label className="adm-label">Headline Line 2</label>
              <input
                type="text"
                className="adm-input"
                value={formData.headlineLine2}
                onChange={e => setFormData({ ...formData, headlineLine2: e.target.value })}
                placeholder="E.g. INTO DIRECT REVENUE"
              />
            </div>

            <div className="adm-form-group">
              <label className="adm-label">Hero Subheadline</label>
              <textarea
                className="adm-textarea"
                rows={3}
                value={formData.subheadline}
                onChange={e => setFormData({ ...formData, subheadline: e.target.value })}
                placeholder="Description text underneath the headline..."
                required
              />
            </div>

            <div className="adm-form-group">
              <label className="adm-label">Trust Badge Text</label>
              <input
                type="text"
                className="adm-input"
                value={formData.badgeText}
                onChange={e => setFormData({ ...formData, badgeText: e.target.value })}
                placeholder="E.g. Trusted by 50+ Luxury Hotels & Resorts Worldwide"
              />
            </div>

            <div className="adm-form-group">
              <label className="adm-label">Background Video MP4 URL</label>
              <input
                type="text"
                className="adm-input"
                value={formData.videoUrl}
                onChange={e => setFormData({ ...formData, videoUrl: e.target.value })}
                placeholder="Direct MP4 video URL or relative path"
                required
              />
              <div className="adm-help-text">
                Select from ready-to-use luxury hospitality video presets:
              </div>
              <div className="adm-preset-pills">
                {VIDEO_PRESETS.map((preset, idx) => (
                  <button
                    key={idx}
                    type="button"
                    className={`adm-preset-pill ${formData.videoUrl === preset.url ? 'active' : ''}`}
                    onClick={() => handleApplyPreset(preset)}
                  >
                    <i className="bi bi-play-circle" style={{ marginRight: '4px' }}></i>
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="adm-form-group">
              <label className="adm-label">Poster Image Fallback URL</label>
              <input
                type="text"
                className="adm-input"
                value={formData.poster}
                onChange={e => setFormData({ ...formData, poster: e.target.value })}
                placeholder="High-resolution poster image URL"
              />
            </div>

            <div className="adm-grid-2" style={{ gap: '1rem', marginBottom: '1.25rem' }}>
              <div className="adm-form-group" style={{ marginBottom: 0 }}>
                <label className="adm-label">Primary CTA Button</label>
                <input
                  type="text"
                  className="adm-input"
                  value={formData.ctaPrimaryText}
                  onChange={e => setFormData({ ...formData, ctaPrimaryText: e.target.value })}
                  placeholder="Button text"
                />
              </div>
              <div className="adm-form-group" style={{ marginBottom: 0 }}>
                <label className="adm-label">Secondary CTA Button</label>
                <input
                  type="text"
                  className="adm-input"
                  value={formData.ctaSecondaryText}
                  onChange={e => setFormData({ ...formData, ctaSecondaryText: e.target.value })}
                  placeholder="Button text"
                />
              </div>
            </div>

            <button type="submit" className="adm-btn adm-btn-primary" style={{ width: '100%' }}>
              <i className="bi bi-check2-circle"></i>
              <span>Save & Publish Hero Changes</span>
            </button>
          </form>
        </div>

        {/* Live Preview Panel */}
        <div>
          <div className="adm-card">
            <div className="adm-card-header">
              <h3>
                <i className="bi bi-display" style={{ color: 'var(--adm-gold)' }}></i>
                <span>Live Hero Preview</span>
              </h3>
              <span className="adm-status-badge converted">Real-Time Simulation</span>
            </div>

            <div style={{
              position: 'relative',
              borderRadius: '12px',
              overflow: 'hidden',
              background: '#090d16',
              boxShadow: '0 8px 30px rgba(0, 0, 0, 0.25)',
              minHeight: '340px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              padding: '2rem'
            }}>
              {/* Video Element */}
              <video
                key={formData.videoUrl}
                src={formData.videoUrl}
                poster={formData.poster}
                autoPlay
                loop
                muted
                playsInline
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  opacity: 0.42
                }}
              />

              {/* Dark Gradient Overlay */}
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(9, 13, 22, 0.95), rgba(9, 13, 22, 0.4))'
              }}></div>

              {/* Foreground Content */}
              <div style={{ position: 'relative', zIndex: 2 }}>
                {formData.badgeText && (
                  <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '4px 12px',
                    borderRadius: '20px',
                    background: 'rgba(255, 255, 255, 0.12)',
                    backdropFilter: 'blur(8px)',
                    color: '#ffffff',
                    fontSize: '0.74rem',
                    fontWeight: 600,
                    marginBottom: '1rem',
                    border: '1px solid rgba(255, 255, 255, 0.15)'
                  }}>
                    <i className="bi bi-shield-check" style={{ color: 'var(--adm-pink)' }}></i>
                    <span>{formData.badgeText}</span>
                  </div>
                )}

                <h2 style={{
                  color: '#ffffff',
                  fontSize: '1.6rem',
                  fontWeight: 800,
                  lineHeight: 1.15,
                  margin: '0 0 10px',
                  textTransform: 'uppercase'
                }}>
                  {formData.headlineLine1}{' '}
                  <span style={{ color: 'var(--adm-pink)' }}>{formData.headlineAccent}</span>{' '}
                  {formData.headlineLine2}
                </h2>

                <p style={{
                  color: 'rgba(255, 255, 255, 0.85)',
                  fontSize: '0.85rem',
                  lineHeight: 1.5,
                  maxWidth: '460px',
                  marginBottom: '1.25rem'
                }}>
                  {formData.subheadline}
                </p>

                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  <button type="button" className="adm-btn adm-btn-primary adm-btn-sm" style={{ pointerEvents: 'none' }}>
                    {formData.ctaPrimaryText}
                  </button>
                  <button type="button" className="adm-btn adm-btn-secondary adm-btn-sm" style={{ pointerEvents: 'none', background: 'rgba(255, 255, 255, 0.15)', color: '#fff', borderColor: 'rgba(255, 255, 255, 0.25)' }}>
                    {formData.ctaSecondaryText}
                  </button>
                </div>
              </div>
            </div>

            <div style={{
              marginTop: '1.25rem',
              padding: '12px 16px',
              borderRadius: '8px',
              background: '#f8fafc',
              border: '1px solid var(--adm-border)',
              fontSize: '0.82rem',
              color: 'var(--adm-text-secondary)',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}>
              <i className="bi bi-info-circle-fill" style={{ color: 'var(--adm-pink)', fontSize: '1.1rem' }}></i>
              <span>Changes made here update the top of the homepage in real-time.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
