import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowLeft, ArrowUpRight, ShieldCheck, Clock, Award } from 'lucide-react';
import ContactSection from './ContactSection';
import ClientsMarquee from './ClientsMarquee';

export default function ContactPage({ onOpenConsultation, onNavigateHome }) {
  return (
    <div className="pt-24 sm:pt-28 pb-16 bg-[#FAF9F6] text-[#0B0C10] min-h-screen">
      {/* Main Interactive Contact Section (Cards, Live Map, Send Us a Brief Form) */}
      <ContactSection onOpenConsultation={onOpenConsultation} />

      {/* Trust & Client Marquee */}
      <div className="mt-16 pt-12 border-t border-[#0B0C10]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-8">
          <span className="text-xs font-extrabold uppercase tracking-widest text-[#0B0C10]/50">
            TRUSTED BY PRESTIGIOUS HOSPITALITY & TRAVEL BRANDS
          </span>
        </div>
        <ClientsMarquee />
      </div>

    </div>
  );
}
