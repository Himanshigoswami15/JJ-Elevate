import React, { useState, useEffect } from 'react';
import { useAdminData } from '../context/AdminDataContext';

export default function AdminContact({ showToast }) {
  const { data, updateContact } = useAdminData();
  const [formData, setFormData] = useState({
    phone: data.contact?.phone || '+91 98765 43210',
    phoneFormatted: data.contact?.phoneFormatted || '+91 98765 43210',
    email: data.contact?.email || 'hello@jjelevate.com',
    whatsapp: data.contact?.whatsapp || '919876543210',
    address: data.contact?.address || 'JJ Elevate Media Studio, Level 4, Luxury Horizon Tower, New Delhi, India',
    workingHours: data.contact?.workingHours || 'Monday – Saturday: 9:00 AM – 7:00 PM IST',
    social: {
      instagram: data.contact?.social?.instagram || 'https://www.instagram.com/jjelevate',
      linkedin: data.contact?.social?.linkedin || 'https://www.linkedin.com/company/jj-elevate',
      youtube: data.contact?.social?.youtube || 'https://www.youtube.com/@jjelevate',
      twitter: data.contact?.social?.twitter || 'https://twitter.com/jjelevate'
    }
  });

  useEffect(() => {
    if (data.contact) {
      setFormData({
        phone: data.contact.phone || '+91 98765 43210',
        phoneFormatted: data.contact.phoneFormatted || '+91 98765 43210',
        email: data.contact.email || 'hello@jjelevate.com',
        whatsapp: data.contact.whatsapp || '919876543210',
        address: data.contact.address || 'JJ Elevate Media Studio, Level 4, Luxury Horizon Tower, New Delhi, India',
        workingHours: data.contact.workingHours || 'Monday – Saturday: 9:00 AM – 7:00 PM IST',
        social: {
          instagram: data.contact.social?.instagram || '',
          linkedin: data.contact.social?.linkedin || '',
          youtube: data.contact.social?.youtube || '',
          twitter: data.contact.social?.twitter || ''
        }
      });
    }
  }, [data.contact]);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateContact(formData);
    showToast('Contact details & social handles updated successfully!');
  };

  return (
    <div>
      <div className="adm-page-header">
        <div className="adm-page-title">
          <h1>Company Information & Social Handles</h1>
          <p>Update phone numbers, WhatsApp, emails, studio address, and social channel links across the site.</p>
        </div>
      </div>

      <div className="adm-grid-2">
        <div className="adm-card">
          <div className="adm-card-header">
            <h3>
              <i className="bi bi-geo-alt-fill" style={{ color: 'var(--adm-pink)' }}></i>
              <span>Core Communications</span>
            </h3>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="adm-grid-2" style={{ gap: '1rem' }}>
              <div className="adm-form-group">
                <label className="adm-label">Direct Phone</label>
                <input
                  type="text"
                  className="adm-input"
                  value={formData.phone}
                  onChange={e => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+91 98765 43210"
                  required
                />
              </div>

              <div className="adm-form-group">
                <label className="adm-label">WhatsApp Number (Digits Only)</label>
                <input
                  type="text"
                  className="adm-input"
                  value={formData.whatsapp}
                  onChange={e => setFormData({ ...formData, whatsapp: e.target.value.replace(/[^0-9]/g, '') })}
                  placeholder="919876543210"
                  required
                />
              </div>
            </div>

            <div className="adm-form-group">
              <label className="adm-label">Official Inquiries Email</label>
              <input
                type="email"
                className="adm-input"
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
                placeholder="hello@jjelevate.com"
                required
              />
            </div>

            <div className="adm-form-group">
              <label className="adm-label">Studio / Office Address</label>
              <textarea
                className="adm-textarea"
                rows={2}
                value={formData.address}
                onChange={e => setFormData({ ...formData, address: e.target.value })}
                placeholder="Studio building, street, city..."
                required
              />
            </div>

            <div className="adm-form-group">
              <label className="adm-label">Working Hours</label>
              <input
                type="text"
                className="adm-input"
                value={formData.workingHours}
                onChange={e => setFormData({ ...formData, workingHours: e.target.value })}
                placeholder="Monday – Saturday: 9:00 AM – 7:00 PM IST"
              />
            </div>

            <button type="submit" className="adm-btn adm-btn-primary" style={{ width: '100%' }}>
              <i className="bi bi-check2-circle"></i>
              <span>Save Contact Updates</span>
            </button>
          </form>
        </div>

        <div>
          <div className="adm-card">
            <div className="adm-card-header">
              <h3>
                <i className="bi bi-share-fill" style={{ color: 'var(--adm-gold)' }}></i>
                <span>Social Media Profiles</span>
              </h3>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="adm-form-group">
                <label className="adm-label">
                  <i className="bi bi-instagram" style={{ color: '#e1306c', marginRight: '6px' }}></i>
                  Instagram Profile URL
                </label>
                <input
                  type="url"
                  className="adm-input"
                  value={formData.social.instagram}
                  onChange={e => setFormData({
                    ...formData,
                    social: { ...formData.social, instagram: e.target.value }
                  })}
                  placeholder="https://www.instagram.com/jjelevate"
                />
              </div>

              <div className="adm-form-group">
                <label className="adm-label">
                  <i className="bi bi-linkedin" style={{ color: '#0a66c2', marginRight: '6px' }}></i>
                  LinkedIn Company URL
                </label>
                <input
                  type="url"
                  className="adm-input"
                  value={formData.social.linkedin}
                  onChange={e => setFormData({
                    ...formData,
                    social: { ...formData.social, linkedin: e.target.value }
                  })}
                  placeholder="https://www.linkedin.com/company/jj-elevate"
                />
              </div>

              <div className="adm-form-group">
                <label className="adm-label">
                  <i className="bi bi-youtube" style={{ color: '#ff0000', marginRight: '6px' }}></i>
                  YouTube Channel URL
                </label>
                <input
                  type="url"
                  className="adm-input"
                  value={formData.social.youtube}
                  onChange={e => setFormData({
                    ...formData,
                    social: { ...formData.social, youtube: e.target.value }
                  })}
                  placeholder="https://www.youtube.com/@jjelevate"
                />
              </div>

              <div className="adm-form-group" style={{ marginBottom: '1.5rem' }}>
                <label className="adm-label">
                  <i className="bi bi-twitter-x" style={{ color: '#000000', marginRight: '6px' }}></i>
                  Twitter / X Profile URL
                </label>
                <input
                  type="url"
                  className="adm-input"
                  value={formData.social.twitter}
                  onChange={e => setFormData({
                    ...formData,
                    social: { ...formData.social, twitter: e.target.value }
                  })}
                  placeholder="https://twitter.com/jjelevate"
                />
              </div>

              <button type="submit" className="adm-btn adm-btn-secondary" style={{ width: '100%' }}>
                <i className="bi bi-link-45deg"></i>
                <span>Save Social Profile Links</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
