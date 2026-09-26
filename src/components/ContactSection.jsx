import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Mail, 
  MapPin, 
  Phone, 
  Send, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  Clock, 
  Linkedin, 
  Twitter, 
  Instagram,
  Calendar,
  ShieldCheck
} from 'lucide-react';

export default function ContactSection({ onOpenConsultation }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    service: '',
    budget: '₹25,000 – ₹1,00,000',
    message: ''
  });

  const [honeypot, setHoneypot] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const servicesList = [
    'Search Engine Optimization (SEO)',
    'Performance PPC & Paid Media',
    'Content Strategy & Creation',
    'Web Development',
    'UI/UX Design',
    'Social Media Marketing',
    'Full-Service Partnership',
    'Other / Not Sure Yet'
  ];

  const budgetOptions = [
    '₹25,000 – ₹1,00,000',
    '₹1,00,000 – ₹2,50,000',
    '₹2,50,000 – ₹5,00,000',
    '₹5,00,000 – ₹10,00,000',
    '₹10,00,000+'
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setErrorMessage('Please fill in all required fields (Name, Email, Message).');
      return;
    }

    setErrorMessage('');
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          formType: 'Contact Brief',
          name: formData.name.trim(),
          email: formData.email.trim(),
          company: formData.company.trim(),
          service: formData.service || 'Not specified',
          budget: formData.budget,
          message: formData.message.trim(),
          sourceUrl: typeof window !== 'undefined' ? window.location.href : 'https://www.jjelevate.com/contact',
          _hp: honeypot
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (response.ok && data.success) {
        setSubmitted(true);
        setFormData({
          name: '',
          email: '',
          company: '',
          service: '',
          budget: '₹25,000 – ₹1,00,000',
          message: ''
        });
        setHoneypot('');
      } else {
        setErrorMessage(data.error || 'Something went wrong. Please try again or contact us directly.');
      }
    } catch {
      setErrorMessage('Something went wrong. Please try again or contact us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-8 sm:py-14 bg-[#FAF9F6] text-[#0B0C10] relative scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          
          {/* Left Column (5 cols): "Get In Touch", Exact Phone, Email, Address, Map */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <h3 className="font-display text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-[#0B0C10]">
                GET IN TOUCH
              </h3>
              <p className="text-sm text-[#0B0C10]/70 mt-1.5 leading-relaxed font-normal">
                Ready to stop leaving revenue on the table? Reach out through any channel and a senior strategist will follow up personally.
              </p>
            </div>

            {/* Contact Channels (Authentic JJ Elevate details) */}
            <div className="space-y-4">
              
              {/* Email Card */}
              <a 
                href="mailto:info@jjelevate.com"
                className="group flex items-start gap-4 p-5 rounded-2xl bg-white border-2 border-[#0B0C10]/15 hover:border-[#FF1E56] transition-all duration-300 block"
              >
                <div className="w-12 h-12 rounded-xl bg-[#FAF9F6] border border-[#0B0C10]/10 flex items-center justify-center shrink-0 group-hover:bg-[#FF1E56]/10 transition-colors">
                  <Mail className="w-5 h-5 text-[#FF1E56]" />
                </div>
                <div>
                  <p className="text-[11px] text-[#0B0C10]/60 font-extrabold uppercase tracking-wider">
                    EMAIL US
                  </p>
                  <p className="text-base font-bold text-[#0B0C10] group-hover:text-[#FF1E56] transition-colors">
                    info@jjelevate.com
                  </p>
                  <p className="text-xs text-[#0B0C10]/55 mt-0.5">
                    We respond within 2 business hours
                  </p>
                </div>
              </a>

              {/* Phone Card */}
              <div 
                className="group flex items-start gap-4 p-5 rounded-2xl bg-white border-2 border-[#0B0C10]/15 hover:border-[#FF1E56] transition-all duration-300 block"
              >
                <div className="w-12 h-12 rounded-xl bg-[#FAF9F6] border border-[#0B0C10]/10 flex items-center justify-center shrink-0 group-hover:bg-[#FF1E56]/10 transition-colors">
                  <Phone className="w-5 h-5 text-[#FF1E56]" />
                </div>
                <div className="flex-1">
                  <p className="text-[11px] text-[#0B0C10]/60 font-extrabold uppercase tracking-wider mb-1.5">
                    CALL US
                  </p>
                  <div className="space-y-1">
                    <a 
                      href="tel:+917850027373"
                      className="block text-base font-bold text-[#0B0C10] hover:text-[#FF1E56] transition-colors"
                    >
                      +91 78500 27373
                    </a>
                    <a 
                      href="tel:+919462739909"
                      className="block text-base font-bold text-[#0B0C10] hover:text-[#FF1E56] transition-colors"
                    >
                      +91 94627 39909
                    </a>
                    <a 
                      href="tel:+919680382257"
                      className="block text-base font-bold text-[#0B0C10] hover:text-[#FF1E56] transition-colors"
                    >
                      +91 96803 82257
                    </a>
                    <a 
                      href="tel:+918302388436"
                      className="block text-base font-bold text-[#0B0C10] hover:text-[#FF1E56] transition-colors"
                    >
                      +91 83023 88436
                    </a>
                  </div>
                  <p className="text-xs text-[#0B0C10]/55 mt-2">
                    Mon–Fri, 9AM–6PM IST
                  </p>
                </div>
              </div>

              {/* Address Card */}
              <div className="flex items-start gap-4 p-5 rounded-2xl bg-white border-2 border-[#0B0C10]/15">
                <div className="w-12 h-12 rounded-xl bg-[#FAF9F6] border border-[#0B0C10]/10 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-[#FF1E56]" />
                </div>
                <div>
                  <p className="text-[11px] text-[#0B0C10]/60 font-extrabold uppercase tracking-wider">
                    VISIT US
                  </p>
                  <p className="text-sm font-bold text-[#0B0C10] mt-0.5 leading-snug">
                    226, Pal Rd, near 56 Bhog Sweets, opposite Samrat Ashok Udhyan, Keshavnagar, Jodhpur, Rajasthan 342001
                  </p>
                  <p className="text-xs text-[#0B0C10]/55 mt-1">
                    By appointment only
                  </p>
                </div>
              </div>

            </div>

            {/* Social Links */}
            <div>
              <p className="text-[11px] font-extrabold uppercase tracking-widest text-[#0B0C10]/60 mb-3">
                FIND US ON
              </p>
              <div className="flex gap-3">
                <a 
                  href="https://linkedin.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="w-11 h-11 rounded-xl bg-white border-2 border-[#0B0C10]/15 flex items-center justify-center text-[#0B0C10]/70 hover:text-[#FF1E56] hover:border-[#FF1E56] transition-all"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a 
                  href="https://twitter.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label="Twitter"
                  className="w-11 h-11 rounded-xl bg-white border-2 border-[#0B0C10]/15 flex items-center justify-center text-[#0B0C10]/70 hover:text-[#FF1E56] hover:border-[#FF1E56] transition-all"
                >
                  <Twitter className="w-5 h-5" />
                </a>
                <a 
                  href="https://instagram.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="w-11 h-11 rounded-xl bg-white border-2 border-[#0B0C10]/15 flex items-center justify-center text-[#0B0C10]/70 hover:text-[#FF1E56] hover:border-[#FF1E56] transition-all"
                >
                  <Instagram className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Exact Google Maps Embed from jjelevate.com/contact */}
            <div className="rounded-2xl overflow-hidden border-2 border-[#0B0C10]/15 h-52 bg-white">
              <iframe
                title="JJ Elevate Jodhpur Office Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2986.5690363340937!2d72.9805652!3d26.2521926!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4743a4545a6802a9%3A0x6869c086efd31a97!2sJJ%20Elevate%20%7C%20Digital%20Marketing%20Agency%7C%20Branding%20%7C%20Advertising%20%7C%20Jodhpur!5e1!3m2!1sen!2sin!4v1782110017662!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              ></iframe>
            </div>

          </div>

          {/* Right Column (7 cols): Send Us a Brief Form */}
          <div className="lg:col-span-7 bg-white border-2 border-[#0B0C10]/15 rounded-3xl p-6 sm:p-10 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#FF1E56] via-[#F8D53A] to-[#FF1E56]"></div>
            
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success-box"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center py-12 px-4 space-y-6"
                >
                  <div className="w-16 h-16 rounded-full bg-[#FF1E56]/10 border-2 border-[#FF1E56] flex items-center justify-center mx-auto text-[#FF1E56]">
                    <CheckCircle2 className="w-8 h-8 text-[#FF1E56]" />
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="font-display text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-[#0B0C10]">
                      MESSAGE SENT.
                    </h3>
                    <p className="text-sm sm:text-base text-[#0B0C10]/75 max-w-md mx-auto leading-relaxed">
                      Thank you! Your enquiry has been submitted successfully. We will contact you soon.
                    </p>
                  </div>

                  <div className="pt-4">
                    <button
                      type="button"
                      onClick={() => {
                        setSubmitted(false);
                        setFormData({
                          name: '',
                          email: '',
                          company: '',
                          service: '',
                          budget: '₹25,000 – ₹1,00,000',
                          message: ''
                        });
                      }}
                      className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-[#FF1E56] hover:underline"
                    >
                      ← SEND ANOTHER BRIEF
                    </button>
                  </div>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  
                  {/* Honeypot field for spam bot protection */}
                  <input
                    type="text"
                    name="_hp"
                    tabIndex="-1"
                    autoComplete="off"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                    style={{ display: 'none', position: 'absolute', left: '-9999px' }}
                    aria-hidden="true"
                  />

                  <div>
                    <h3 className="font-display text-2xl font-extrabold uppercase tracking-tight text-[#0B0C10]">
                      SEND US A BRIEF
                    </h3>
                    <p className="text-xs sm:text-sm text-[#0B0C10]/60 mt-1 font-normal">
                      The more detail you share, the better we can tailor our response.
                    </p>
                  </div>

                  {errorMessage && (
                    <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl font-medium">
                      {errorMessage}
                    </div>
                  )}

                  {/* 2-Column: Full Name & Work Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label 
                        htmlFor="brief-name"
                        className="block text-xs font-extrabold uppercase tracking-wider text-[#0B0C10] mb-1.5"
                      >
                        Full Name *
                      </label>
                      <input
                        id="brief-name"
                        type="text"
                        required
                        placeholder="Alex Johnson"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-[#FAF9F6] border border-[#0B0C10]/20 rounded-xl px-4 py-3.5 text-sm text-[#0B0C10] placeholder:text-[#0B0C10]/35 focus:outline-none focus:border-[#FF1E56] focus:bg-white transition-all"
                      />
                    </div>

                    <div>
                      <label 
                        htmlFor="brief-email"
                        className="block text-xs font-extrabold uppercase tracking-wider text-[#0B0C10] mb-1.5"
                      >
                        Work Email *
                      </label>
                      <input
                        id="brief-email"
                        type="email"
                        required
                        placeholder="alex@company.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-[#FAF9F6] border border-[#0B0C10]/20 rounded-xl px-4 py-3.5 text-sm text-[#0B0C10] placeholder:text-[#0B0C10]/35 focus:outline-none focus:border-[#FF1E56] focus:bg-white transition-all"
                      />
                    </div>
                  </div>

                  {/* Company Name */}
                  <div>
                    <label 
                      htmlFor="brief-company"
                      className="block text-xs font-extrabold uppercase tracking-wider text-[#0B0C10] mb-1.5"
                    >
                      Company / Property Name
                    </label>
                    <input
                      id="brief-company"
                      type="text"
                      placeholder="Acme Corp. or Luxury Resort Name"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full bg-[#FAF9F6] border border-[#0B0C10]/20 rounded-xl px-4 py-3.5 text-sm text-[#0B0C10] placeholder:text-[#0B0C10]/35 focus:outline-none focus:border-[#FF1E56] focus:bg-white transition-all"
                    />
                  </div>

                  {/* Service Needed Select */}
                  <div>
                    <label 
                      htmlFor="brief-service"
                      className="block text-xs font-extrabold uppercase tracking-wider text-[#0B0C10] mb-1.5"
                    >
                      Service Needed *
                    </label>
                    <select
                      id="brief-service"
                      required
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full bg-[#FAF9F6] border border-[#0B0C10]/20 rounded-xl px-4 py-3.5 text-sm text-[#0B0C10] focus:outline-none focus:border-[#FF1E56] focus:bg-white transition-all cursor-pointer"
                    >
                      <option value="" disabled>Select a service...</option>
                      {servicesList.map((srv, idx) => (
                        <option key={idx} value={srv}>
                          {srv}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Monthly Budget Select */}
                  <div>
                    <label 
                      htmlFor="brief-budget"
                      className="block text-xs font-extrabold uppercase tracking-wider text-[#0B0C10] mb-1.5"
                    >
                      Monthly Budget
                    </label>
                    <select
                      id="brief-budget"
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      className="w-full bg-[#FAF9F6] border border-[#0B0C10]/20 rounded-xl px-4 py-3.5 text-sm text-[#0B0C10] focus:outline-none focus:border-[#FF1E56] focus:bg-white transition-all cursor-pointer"
                    >
                      {budgetOptions.map((bgt, idx) => (
                        <option key={idx} value={bgt}>
                          {bgt}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Tell Us About Your Goals */}
                  <div>
                    <label 
                      htmlFor="brief-message"
                      className="block text-xs font-extrabold uppercase tracking-wider text-[#0B0C10] mb-1.5"
                    >
                      Tell Us About Your Goals *
                    </label>
                    <textarea
                      id="brief-message"
                      required
                      rows={4}
                      placeholder="What are your main marketing challenges? What does success look like in 6 months?"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-[#FAF9F6] border border-[#0B0C10]/20 rounded-xl px-4 py-3.5 text-sm text-[#0B0C10] placeholder:text-[#0B0C10]/35 focus:outline-none focus:border-[#FF1E56] focus:bg-white transition-all resize-none"
                    ></textarea>
                  </div>

                  {/* Submit Button */}
                  <div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-[#FF1E56] hover:bg-[#0B0C10] text-white font-extrabold text-xs uppercase tracking-widest py-4 px-8 rounded-full transition-all duration-300 flex items-center justify-center gap-3 cursor-pointer group disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      <Send className="w-4 h-4 text-white" />
                      <span>{isSubmitting ? 'Sending...' : 'SEND MESSAGE'}</span>
                      <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform" />
                    </button>
                    <p className="text-[11px] text-[#0B0C10]/50 text-center mt-2.5">
                      Guaranteed response from a senior strategist within 2 business hours.
                    </p>
                  </div>

                </form>
              )}
            </AnimatePresence>

          </div>

        </div>

      </div>
    </section>
  );
}
