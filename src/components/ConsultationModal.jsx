import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, Check, ShieldCheck, User, Hotel, Mail, Phone, Building2 } from 'lucide-react';
import ArrowFillButton from '@/components/ui/arrow-fill-button';

const PROPERTY_TYPES = [
  'Boutique Hotel',
  'Luxury Resort',
  'Heritage Palace',
  'Business Hotel',
  'Private Villa',
  'Tour & Travel Packages',
  'Other'
];

export default function ConsultationModal({ isOpen, onClose }) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    hotelName: '',
    email: '',
    phone: '',
    propertyType: 'Boutique Hotel',
    otherType: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setTimeout(() => {
        setSubmitted(false);
        onClose();
      }, 3500);
    }, 400);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div 
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-md"
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 12 }}
          transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-lg bg-white text-jj-dark rounded-2xl sm:rounded-3xl shadow-[0_25px_80px_rgba(0,0,0,0.18)] border border-black/10 p-6 sm:p-8 overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Subtle Ambient Light */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-jj-pink/10 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/2" />

          {/* Close Pill Button */}
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="absolute top-4 right-4 z-20 flex items-center justify-center w-8 h-8 rounded-full bg-black/5 hover:bg-jj-pink text-jj-dark/60 hover:text-white transition-all duration-150 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>

          {submitted ? (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="py-10 text-center space-y-4"
            >
              <div className="w-14 h-14 rounded-full bg-jj-pink text-white flex items-center justify-center mx-auto shadow-lg shadow-jj-pink/30">
                <Check className="w-7 h-7 stroke-[3]" />
              </div>
              <span className="inline-block text-[11px] font-mono font-bold tracking-widest text-jj-dark uppercase bg-jj-yellow/25 border border-jj-yellow/40 px-3 py-1 rounded-full">
                Audit Request Received
              </span>
              <h3 className="font-outfit text-2xl font-bold uppercase text-jj-dark">
                WE'LL BE IN TOUCH SHORTLY
              </h3>
              <p className="text-xs sm:text-sm text-jj-dark/75 max-w-xs mx-auto leading-relaxed font-body">
                Thank you, <strong className="text-jj-dark">{formData.name}</strong>. Our senior hospitality growth director is reviewing <strong className="text-jj-pink">{formData.hotelName}</strong> and will reach out within 2 hours.
              </p>
              <div className="pt-2">
                <span className="text-[11px] font-mono text-jj-dark/50">
                  Confirmation dispatched to {formData.email}
                </span>
              </div>
            </motion.div>
          ) : (
            <div className="relative z-10 space-y-5">
              {/* Header */}
              <div>
                <h3 
                  style={{ fontFamily: "'Plus Jakarta Sans', 'Outfit', sans-serif" }}
                  className="text-2xl sm:text-[27px] font-bold text-jj-dark tracking-tight leading-tight !normal-case"
                >
                  Book Your <span className="text-jj-pink font-bold">Growth Audit</span>
                </h3>
                <p 
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                  className="text-xs sm:text-[13px] text-jj-dark/65 mt-1.5 leading-relaxed font-normal"
                >
                  Complimentary 30-minute direct booking audit & OTA commission breakdown.
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* 1. Property / Business Type Pills */}
                <div>
                  <label 
                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                    className="block text-xs font-semibold text-jj-dark/80 mb-2 flex items-center gap-1.5"
                  >
                    <Building2 className="w-3.5 h-3.5 text-jj-pink" />
                    <span>Property / Business Type</span>
                  </label>
                  <div className="flex flex-wrap gap-1.5">
                    {PROPERTY_TYPES.map((pt) => {
                      const isSelected = formData.propertyType === pt;
                      return (
                        <button
                          key={pt}
                          type="button"
                          onClick={() => setFormData({ ...formData, propertyType: pt })}
                          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                          className={`text-xs px-3.5 py-1.5 rounded-xl border transition-all duration-150 font-medium cursor-pointer ${
                            isSelected
                              ? 'bg-jj-pink text-white border-jj-pink font-semibold shadow-md shadow-jj-pink/25 scale-[1.02]'
                              : 'bg-[#F6F5F2] text-jj-dark/80 border-black/8 hover:border-jj-pink/40 hover:bg-black/5'
                          }`}
                        >
                          {pt}
                        </button>
                      );
                    })}
                  </div>

                  {/* Custom type input when 'Other' is selected */}
                  {formData.propertyType === 'Other' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0, y: -4 }}
                      animate={{ opacity: 1, height: 'auto', y: 0 }}
                      exit={{ opacity: 0, height: 0, y: -4 }}
                      className="pt-2"
                    >
                      <input
                        type="text"
                        required
                        placeholder="Specify business type (e.g. Tour Packages, Travel Agency, Glamping)..."
                        value={formData.otherType}
                        onChange={(e) => setFormData({ ...formData, otherType: e.target.value })}
                        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                        className="w-full px-3.5 py-2 bg-[#FAF9F7] rounded-xl border border-jj-pink/60 text-sm text-jj-dark placeholder:text-jj-dark/35 focus:bg-white focus:outline-none focus:ring-2 focus:ring-jj-pink/30 font-body transition-all"
                        autoFocus
                      />
                    </motion.div>
                  )}
                </div>

                {/* 2. Name & Hotel / Business */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label 
                      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                      className="block text-xs font-semibold text-jj-dark/75 mb-1.5 flex items-center gap-1.5"
                    >
                      <User className="w-3.5 h-3.5 text-jj-dark/40" />
                      <span>Full Name *</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Vikramaditya Singh"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                      className="w-full px-3.5 py-2 bg-[#FAF9F7] rounded-xl border border-black/10 text-sm text-jj-dark placeholder:text-jj-dark/35 focus:bg-white focus:outline-none focus:ring-2 focus:ring-jj-pink/30 focus:border-jj-pink transition-all"
                    />
                  </div>

                  <div>
                    <label 
                      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                      className="block text-xs font-semibold text-jj-dark/75 mb-1.5 flex items-center gap-1.5"
                    >
                      <Hotel className="w-3.5 h-3.5 text-jj-dark/40" />
                      <span>Hotel / Company Name *</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Royal Haveli Resort or Travel Co."
                      value={formData.hotelName}
                      onChange={(e) => setFormData({ ...formData, hotelName: e.target.value })}
                      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                      className="w-full px-3.5 py-2 bg-[#FAF9F7] rounded-xl border border-black/10 text-sm text-jj-dark placeholder:text-jj-dark/35 focus:bg-white focus:outline-none focus:ring-2 focus:ring-jj-pink/30 focus:border-jj-pink transition-all"
                    />
                  </div>
                </div>

                {/* 3. Email & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label 
                      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                      className="block text-xs font-semibold text-jj-dark/75 mb-1.5 flex items-center gap-1.5"
                    >
                      <Mail className="w-3.5 h-3.5 text-jj-dark/40" />
                      <span>Work Email *</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="vikram@resort.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                      className="w-full px-3.5 py-2 bg-[#FAF9F7] rounded-xl border border-black/10 text-sm text-jj-dark placeholder:text-jj-dark/35 focus:bg-white focus:outline-none focus:ring-2 focus:ring-jj-pink/30 focus:border-jj-pink transition-all"
                    />
                  </div>

                  <div>
                    <label 
                      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                      className="block text-xs font-semibold text-jj-dark/75 mb-1.5 flex items-center gap-1.5"
                    >
                      <Phone className="w-3.5 h-3.5 text-jj-dark/40" />
                      <span>Phone / WhatsApp *</span>
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                      className="w-full px-3.5 py-2 bg-[#FAF9F7] rounded-xl border border-black/10 text-sm text-jj-dark placeholder:text-jj-dark/35 focus:bg-white focus:outline-none focus:ring-2 focus:ring-jj-pink/30 focus:border-jj-pink transition-all"
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-2 flex justify-center">
                  <ArrowFillButton
                    type="submit"
                    btnText="Request Direct Audit"
                    size="lg"
                    variant="pink"
                    className="w-full justify-center text-[15px] font-bold"
                  />
                </div>

                {/* Confidentiality subtext */}
                <div 
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                  className="flex items-center justify-center gap-2 text-xs text-jj-dark/55 pt-1"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-jj-pink" />
                  <span>100% Confidential • Direct Senior Partner Review • No Spam</span>
                </div>
              </form>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
