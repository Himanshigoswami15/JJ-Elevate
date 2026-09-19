import React from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  Search, 
  Linkedin, 
  ChevronRight, 
  ArrowUpRight 
} from 'lucide-react';
import MagneticButton from './motion/MagneticButton';

export default function CoFoundersAnimatedShowcase({ onOpenConsultation, showBanner = true }) {
  return (
    <section className="relative w-full mb-16 sm:mb-24 overflow-hidden">
      
      {/* 
        Full-Screen / Edge-to-Edge Co-Founders Creative Banner (Ultra High Definition 3072px)
        Exact 1024:486 aspect ratio matching latest high quality creative, crisp typography
      */}
      {showBanner && (
        <div className="relative w-full overflow-hidden bg-[#99002B]">
          <div className="relative w-full aspect-[1536/730]">
            <picture className="w-full h-full block">
              <source 
                type="image/svg+xml" 
                srcSet="/images/about/JJ_ELEVATE_WEBSITE_CREATIVE.svg" 
              />
              <source 
                type="image/webp" 
                srcSet="/images/about/co_founders_uhd.webp 3072w, /images/about/co_founders_hd.webp 2048w" 
                sizes="100vw" 
              />
              <source 
                type="image/png" 
                srcSet="/images/about/co_founders_uhd.png 3072w" 
                sizes="100vw" 
              />
              <img
                src="/images/about/JJ_ELEVATE_WEBSITE_CREATIVE.svg"
                alt="JJ Elevate Co-Founders: Yuvraj Singh Shekhawat and Chandra Vardhan Singh Jodha"
                className="w-full h-full object-cover block select-none pointer-events-none"
                loading="eager"
                fetchPriority="high"
              />
            </picture>
          </div>
        </div>
      )}

      {/* Founder Profile Details & Booking CTA Container (Aligned with site layout) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 sm:mt-14">
        
        {/* Profile Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          
          {/* Card 1: Yuvraj Singh Shekhawat */}
          <motion.div 
            whileHover={{ y: -3 }}
            className="p-5 sm:p-6 rounded-[24px] sm:rounded-[28px] bg-white border border-black/10 shadow-lg hover:shadow-xl transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FF1E56]/10 text-jj-pink text-xs font-black uppercase tracking-wider">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>Growth & Marketing Director</span>
                </div>
                <a 
                  href="https://www.linkedin.com/in/yuvrajshekhawat/" 
                  target="_blank" 
                  rel="noreferrer"
                  className="w-8 h-8 rounded-full bg-black/5 hover:bg-jj-pink hover:text-white flex items-center justify-center text-jj-dark transition-colors"
                  title="Yuvraj Singh Shekhawat LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              </div>

              <h3 className="font-display font-black text-2xl text-jj-dark tracking-tight mb-1">
                Yuvraj Singh Shekhawat
              </h3>
              <p className="text-xs font-bold uppercase tracking-widest text-jj-pink mb-3">
                Co-Founder of JJ Elevate
              </p>
              <p className="text-sm text-jj-dark/75 leading-relaxed font-normal">
                Driving innovative digital strategies that help brands grow, connect, and stand out. Architect of direct-revenue booking engines and high-conversion luxury hospitality campaigns.
              </p>
            </div>

            <div className="pt-4 mt-4 border-t border-black/5 flex items-center justify-between">
              <span className="text-xs font-bold text-jj-dark/60">15+ Years Travel Focus</span>
              <a 
                href="https://www.linkedin.com/in/yuvrajshekhawat/" 
                target="_blank" 
                rel="noreferrer"
                className="text-xs font-bold text-jj-pink flex items-center gap-1 hover:underline"
              >
                Connect on LinkedIn <ChevronRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </motion.div>

          {/* Card 2: Chandra Vardhan Singh Jodha */}
          <motion.div 
            whileHover={{ y: -3 }}
            className="p-5 sm:p-6 rounded-[24px] sm:rounded-[28px] bg-white border border-black/10 shadow-lg hover:shadow-xl transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFDE00]/30 text-amber-900 text-xs font-black uppercase tracking-wider">
                  <Search className="w-3.5 h-3.5" />
                  <span>Head of SEO Strategy</span>
                </div>
                <a 
                  href="https://www.linkedin.com/" 
                  target="_blank" 
                  rel="noreferrer"
                  className="w-8 h-8 rounded-full bg-black/5 hover:bg-jj-pink hover:text-white flex items-center justify-center text-jj-dark transition-colors"
                  title="Chandra Vardhan Singh Jodha LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              </div>

              <h3 className="font-display font-black text-2xl text-jj-dark tracking-tight mb-1">
                Chandra Vardhan Singh Jodha
              </h3>
              <p className="text-xs font-bold uppercase tracking-widest text-jj-pink mb-3">
                Co-Founder of JJ Elevate
              </p>
              <p className="text-sm text-jj-dark/75 leading-relaxed font-normal">
                Driving innovative digital strategies that help brands grow, connect, and stand out. Specialized in technical search architecture and propelling 50+ luxury hospitality brands to #1 rankings.
              </p>
            </div>

            <div className="pt-4 mt-4 border-t border-black/5 flex items-center justify-between">
              <span className="text-xs font-bold text-jj-dark/60">50+ #1 Hospitality Rankings</span>
              <a 
                href="https://www.linkedin.com/" 
                target="_blank" 
                rel="noreferrer"
                className="text-xs font-bold text-jj-pink flex items-center gap-1 hover:underline"
              >
                Connect on LinkedIn <ChevronRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </motion.div>

        </div>

        {/* Direct Access CTA Bar */}
        <div className="mt-8 p-6 sm:p-8 rounded-[28px] bg-gradient-to-r from-jj-dark via-[#1A030A] to-jj-dark text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div>
            <div className="text-xs font-black uppercase tracking-widest text-[#FFDE00] mb-1">
              Direct Access to Leadership
            </div>
            <div className="font-display font-black text-xl sm:text-2xl tracking-tight">
              Ready to scale your hotel's direct bookings with our co-founders?
            </div>
          </div>
          <MagneticButton
            onClick={onOpenConsultation}
            className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-gradient-to-r from-[#FF1E56] to-[#E11448] text-white font-black text-xs uppercase tracking-widest shadow-lg hover:shadow-jj-pink/40 hover:scale-105 transition-all flex items-center justify-center gap-2 flex-shrink-0"
          >
            <span>Book Strategy Session</span>
            <ArrowUpRight className="w-4 h-4" />
          </MagneticButton>
        </div>

      </div>

    </section>
  );
}
