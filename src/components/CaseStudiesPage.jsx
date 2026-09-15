import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowLeft, ArrowUpRight, Award, TrendingUp, ShieldCheck } from 'lucide-react';
import CaseStudiesWork from './CaseStudiesWork';
import ClientsMarquee from './ClientsMarquee';
import NewsletterCTA from './NewsletterCTA';

export default function CaseStudiesPage({ onOpenConsultation, onNavigateHome }) {
  return (
    <div className="pt-24 sm:pt-28 pb-0 bg-[#FAF9F6] text-[#0B0C10] min-h-screen">
      {/* Hero Banner */}
      <section className="pt-6 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#0B0C10]/15 text-xs font-extrabold uppercase tracking-widest text-[#FF1E56] mb-6">
              <TrendingUp className="w-4 h-4 text-[#FF1E56]" />
              <span>PROVEN HOSPITALITY IMPACT</span>
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-extrabold uppercase tracking-tight text-[#0B0C10] leading-[1.05] max-w-4xl mb-6">
              MEASURABLE IMPACT & <br />
              <span className="text-[#FF1E56]">CLIENT PLAYBOOKS.</span>
            </h1>

            <p className="text-[#0B0C10]/70 text-lg sm:text-xl max-w-2xl leading-relaxed font-normal">
              Explore verified revenue outcomes, distribution shifts, and direct booking engines engineered for premier hotels, heritage palaces, and luxury retreats.
            </p>

            {/* Quick KPI stats strip */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10 pt-8 border-t border-[#0B0C10]/10">
              <div className="bg-white p-5 rounded-2xl border border-[#0B0C10]/10">
                <span className="text-xs font-bold text-[#FF1E56] uppercase tracking-wider block mb-1">DIRECT REVENUE</span>
                <span className="font-display text-3xl font-black text-[#0B0C10]">₹18.4M+</span>
                <p className="text-xs text-[#0B0C10]/60 mt-1">Generated without OTAs</p>
              </div>
              <div className="bg-white p-5 rounded-2xl border border-[#0B0C10]/10">
                <span className="text-xs font-bold text-[#FF1E56] uppercase tracking-wider block mb-1">ORGANIC REACH</span>
                <span className="font-display text-3xl font-black text-[#0B0C10]">+340%</span>
                <p className="text-xs text-[#0B0C10]/60 mt-1">Search traffic growth</p>
              </div>
              <div className="bg-white p-5 rounded-2xl border border-[#0B0C10]/10">
                <span className="text-xs font-bold text-[#FF1E56] uppercase tracking-wider block mb-1">PAID ROAS</span>
                <span className="font-display text-3xl font-black text-[#0B0C10]">4.8X</span>
                <p className="text-xs text-[#0B0C10]/60 mt-1">Direct return on ad spend</p>
              </div>
              <div className="bg-white p-5 rounded-2xl border border-[#0B0C10]/10">
                <span className="text-xs font-bold text-[#FF1E56] uppercase tracking-wider block mb-1">CONVERSIONS</span>
                <span className="font-display text-3xl font-black text-[#0B0C10]">+65%</span>
                <p className="text-xs text-[#0B0C10]/60 mt-1">Mobile checkout rate</p>
              </div>
            </div>

          </motion.div>
        </div>
      </section>

      {/* Main Interactive Case Studies Work Component */}
      <CaseStudiesWork onOpenConsultation={onOpenConsultation} />

      {/* Clients Marquee */}
      <div className="mt-16 pt-12 border-t border-[#0B0C10]/10">
        <ClientsMarquee />
      </div>

      {/* Newsletter / CTA */}
      <div className="mt-12">
        <NewsletterCTA />
      </div>

    </div>
  );
}
