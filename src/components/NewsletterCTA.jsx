import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

export default function NewsletterCTA() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }
    setError('');
    setSubmitted(true);
  };

  return (
    <section className="resp-section-tight resp-cta-section bg-[#FAF9F6] relative overflow-hidden pb-0">
      <div className="max-w-6xl mx-auto resp-container">
        
        {/* Main Yellow Card with Media Query Responsive Styling for Mobile, Tablet, and Desktop */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="resp-yellow-cta-box relative bg-[#F8D53A] border border-[#FEF3A9] transition-all duration-300"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Column: Bold Condensed Headline + Subscribe Form */}
            <div className="lg:col-span-8 z-10 text-left">
              <h2 className="resp-yellow-cta-title font-display font-black text-[#282A2C] tracking-tight uppercase max-w-2xl">
                JOIN 10,000+ MARKETERS GETTING AHEAD ON SOCIAL. SUBSCRIBE NOW.
              </h2>

              <div className="mt-6 sm:mt-10">
                <AnimatePresence mode="wait">
                  {!submitted ? (
                    <motion.form
                      key="form"
                      onSubmit={handleSubmit}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="space-y-1.5"
                    >
                      <label
                        htmlFor="newsletter-email-input"
                        className="block text-xs sm:text-sm font-semibold text-[#282A2C]"
                      >
                        Email Address*
                      </label>
                      
                      <div className="resp-form-row flex items-stretch max-w-xl">
                        <input
                          id="newsletter-email-input"
                          type="email"
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value);
                            if (error) setError('');
                          }}
                          placeholder="Email"
                          className="resp-form-input px-4 py-3 sm:py-3.5 bg-transparent border border-black/40 text-[#111317] placeholder:text-black/55 text-sm font-medium focus:outline-none focus:border-black transition-colors"
                          required
                        />
                        <button
                          type="submit"
                          className="resp-form-btn bg-[#000000] hover:bg-[#1A1A1A] active:scale-[0.99] text-[#F8D53A] font-display font-black uppercase text-xs sm:text-sm tracking-wider px-6 sm:px-7 py-3.5 transition-all duration-200 flex items-center shrink-0 cursor-pointer shadow-md"
                        >
                          <span>SUBSCRIBE TO NEWSLETTER</span>
                        </button>
                      </div>

                      {error && (
                        <p className="text-xs font-semibold text-red-700 mt-1">
                          {error}
                        </p>
                      )}
                    </motion.form>
                  ) : (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="inline-flex items-center gap-3 bg-[#0B0C10] text-white px-5 sm:px-6 py-3.5 sm:py-4 rounded-xl shadow-lg border border-black/10"
                    >
                      <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 text-[#F8D53A] shrink-0" />
                      <div>
                        <div className="font-bold text-xs sm:text-sm text-[#F8D53A] uppercase tracking-wide">
                          Subscription Confirmed!
                        </div>
                        <div className="text-[11px] sm:text-xs text-white/80 font-medium">
                          Welcome to the inner circle of top hospitality marketers.
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Right Column: 3D Browser Checklist Window Illustration */}
            <div className="lg:col-span-4 flex justify-center lg:justify-end z-10">
              <motion.div
                initial={{ opacity: 0, scale: 0.92 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ scale: 1.05, rotate: 1.5 }}
                className="relative cursor-pointer transition-transform duration-300"
              >
                <img
                  src="/images/newsletter-checklist-hd.webp"
                  alt="Social Media Checklist Illustration"
                  width="280"
                  height="290"
                  className="resp-cta-graphic object-contain drop-shadow-[0_16px_28px_rgba(0,0,0,0.18)] select-none"
                />
              </motion.div>
            </div>

          </div>
        </motion.div>

      </div>

      {/* Seamless Wave Shape Divider into Dark Footer (#0B0C10) */}
      <div className="w-full overflow-hidden leading-none pointer-events-none mt-12 sm:mt-20 block -mb-[2px] relative z-10">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="relative block w-full h-12 sm:h-20 lg:h-28 text-[#0B0C10] translate-y-[1px]"
        >
          <path
            d="M0,45 C180,95 380,15 600,70 C820,125 1020,35 1200,80 L1200,120 L0,120 Z"
            fill="#0B0C10"
          />
        </svg>
      </div>
    </section>
  );
}
