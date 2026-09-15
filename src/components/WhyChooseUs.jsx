import React from 'react';
import { ArrowRight } from 'lucide-react';

/* =========================================================================
   WhyChooseUs — High-Impact Differentiator Section (Sociallyin-inspired)
   With authentic Dotted Background Pattern & Clean Dotted Grid Clusters
   Color System: JJ Elevate Webpage Theme
   - Canvas: Warm Luxury Off-White (#FAF9F6)
   - Background Texture: Geometric Dot Matrix Grids
   - Accents: Brand Crimson (#FF1E56), Brand Gold (#FFDE00), Obsidian Dark (#0B0C10)
   ========================================================================= */



const differentiatorCards = [
  {
    title: 'AN IN-HOUSE STUDIO, NOT OUTSOURCED CREATIVE',
    bullets: [
      'Deep Dive Discovery & Goal Alignment for Luxury Properties',
      'Customized Strategies, Not Cookie-Cutter Agency Templates',
      'Continuous Creative Optimization Based on Live Booking Data',
    ],
  },
  {
    title: 'ANALYTICS-FIRST REPORTING, NOT VANITY METRICS',
    bullets: [
      'Experienced Strategists, High-Fashion Creatives & Performance Buyers',
      'Proactive Weekly Communication, Transparent Attribution & Real-Time Dashboards',
      'Obsessive Focus on Direct Guest Bookings and Cost-Per-Acquisition',
    ],
  },
  {
    title: 'REVENUE-DRIVEN BOOKINGS, NOT OTA COMMISSION DRAIN',
    bullets: [
      'Full-Funnel Architecture Designed to Cut 18-25% OTA Intermediary Fees',
      'Multi-Touch Guest Retargeting across Google Search, Meta & Instagram Reels',
      'Instant WhatsApp CRM Integration Converting Inquiries in Under 60 Seconds',
    ],
  },
  {
    title: 'HOSPITALITY SPECIALISTS, NOT GENERALIST AGENCIES',
    bullets: [
      '120+ Luxury Resorts, Heritage Haveli & Boutique Hotels Scaled Worldwide',
      'High-Production Cinematic Video Crews Capturing Bespoke Property Architecture',
      'Dedicated Senior Account Director & 24/7 White-Glove Support Desk',
    ],
  },
];

export default function WhyChooseUs({ onOpenConsultation }) {
  return (
    <section
      id="why-choose-us"
      className="resp-section relative w-full bg-[#FAF9F6] text-jj-dark overflow-hidden select-none"
    >


      <div className="relative max-w-7xl mx-auto resp-container z-10">
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-10 sm:mb-20">
          {/* Headline with Yellow/Gold Hand-Drawn Underline */}
          <h2 className="resp-section-title font-display font-black text-jj-dark tracking-tight uppercase">
            WHY CHOOSE{' '}
            <span className="text-jj-pink mx-1">
              JJ ELEVATE
            </span>{' '}
            AS YOUR DIGITAL MARKETING AGENCY?
          </h2>

          {/* Sociallyin-style Subtitle in JJ Elevate Tone */}
          <p className="mt-6 sm:mt-8 text-base sm:text-xl lg:text-2xl font-medium text-jj-dark/75 tracking-wide max-w-2xl mx-auto leading-relaxed">
            Decades of data. Millions in spend. Insights you can’t Google.
          </p>
        </div>

        {/* 2x2 Feature Cards Grid (Clean Sociallyin White Box Layout) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-10">
          {differentiatorCards.map((card, idx) => (
            <div
              key={idx}
              data-cursor="ADVANTAGE"
              className="resp-card luxury-spotlight-card group relative bg-white border-2 border-black/[0.08] hover:border-jj-pink/50 shadow-[0_14px_32px_-8px_rgba(0,0,0,0.06)] hover:shadow-[0_26px_55px_-10px_rgba(255,30,86,0.16)] hover:-translate-y-2 transition-all duration-300 flex flex-col justify-start cursor-pointer"
            >
              {/* Card Title (Bold Impact Typography) */}
              <h3 className="font-display font-black text-xl sm:text-3xl text-jj-dark group-hover:text-jj-pink transition-colors uppercase tracking-tight leading-snug mb-4 sm:mb-6">
                {card.title}
              </h3>

              {/* Bullets List with Clean Brand Dots */}
              <ul className="space-y-3 sm:space-y-4">
                {card.bullets.map((bullet, bIdx) => (
                  <li
                    key={bIdx}
                    className="flex items-start gap-2.5 sm:gap-3.5 text-jj-dark/80 text-sm sm:text-lg font-medium leading-relaxed"
                  >
                    <span className="w-2.5 h-2.5 rounded-full bg-jj-pink shrink-0 mt-2 group-hover:scale-125 transition-transform" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* CTA Strip */}
        <div className="mt-14 sm:mt-18 text-center">
          <button
            onClick={onOpenConsultation}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-6 sm:px-11 py-3.5 sm:py-5 rounded-full bg-jj-pink text-white font-display font-black text-sm sm:text-lg tracking-wider uppercase shadow-[0_12px_30px_rgba(255,30,86,0.35)] hover:bg-jj-dark hover:text-white hover:scale-105 active:scale-95 transition-all duration-300"
          >
            <span>Claim Your Free Direct Booking Audit</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
