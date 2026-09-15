import React, { useState } from 'react';
import { Plus, Minus, ArrowRight, CheckCircle2 } from 'lucide-react';

/* =========================================================================
   PartnershipModels — Sociallyin-inspired Partnership & Investment Section
   Referenced from Sociallyin's "Understanding Our Partnership Models & Investment"
   Theme: JJ Elevate Webpage Colors (#FAF9F6, #0B0C10, #FF1E56, #FFDE00)
   ========================================================================= */

// 3D Target with Bullseye Dart SVG Sticker (Matches the exact sticker in user's screenshot)
function TargetDartSticker({ className = "w-20 h-20" }) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={`select-none filter drop-shadow-[0_10px_18px_rgba(0,0,0,0.25)] ${className}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Target Base (Tilted Red & White Concentric Rings) */}
      <ellipse cx="46" cy="65" rx="34" ry="24" fill="#B91C1C" />
      <ellipse cx="46" cy="65" rx="27" ry="19" fill="#FFFFFF" />
      <ellipse cx="46" cy="65" rx="20" ry="14" fill="#DC2626" />
      <ellipse cx="46" cy="65" rx="13" ry="9" fill="#FFFFFF" />
      <ellipse cx="46" cy="65" rx="6" ry="4" fill="#EF4444" />

      {/* Bullseye Dart Body (Cyan/Turquoise shaft & feathers flying into center) */}
      <g transform="rotate(-35 46 65)">
        {/* Dart Shaft */}
        <line x1="46" y1="65" x2="46" y2="20" stroke="#0891B2" strokeWidth="4" strokeLinecap="round" />
        <line x1="46" y1="20" x2="46" y2="8" stroke="#0E7490" strokeWidth="2.5" />
        {/* Dart Flights / Feathers in Vibrant Cyan */}
        <polygon points="46,18 36,6 46,12" fill="#06B6D4" />
        <polygon points="46,18 56,6 46,12" fill="#22D3EE" />
        <polygon points="46,24 38,16 46,20" fill="#0891B2" />
        <polygon points="46,24 54,16 46,20" fill="#06B6D4" />
        {/* Metal Tip */}
        <circle cx="46" cy="65" r="3" fill="#1E293B" />
      </g>
    </svg>
  );
}

const partnershipAccordion = [
  {
    id: 1,
    title: 'FLEXIBLE SOLUTIONS TAILORED TO YOUR NEEDS',
    bullets: [
      'Custom Packages Based on Property Scope, Room Inventory & Direct Booking Goals',
      'Retainer, Project-Based, and Revenue-Share Direct Booking Funnel Options',
      'Scalable Dedicated Growth Squads for Multi-Property Portfolios & Luxury Chains',
    ],
  },
  {
    id: 2,
    title: 'TRANSPARENT PRICING FOCUSED ON VALUE',
    bullets: [
      'Zero Hidden Markups or Retainer Surcharges on Paid Media Spend',
      'Direct ROI Benchmarking Tied to Verified PMS Reservations & Saved Commission',
      '100% Client Ownership of All Ad Accounts, Creative Assets & Guest Data',
    ],
  },
  {
    id: 3,
    title: 'DEDICATED SENIOR STRATEGY & RAPID ONBOARDING',
    bullets: [
      'Direct Access to Senior Hospitality Directors, Not Junior Account Coordinators',
      '14-Day Fast-Track Deployment from Technical Audit to Live Ad Campaigns',
      'Proactive Weekly Performance Syncs & Dedicated Direct WhatsApp Hotline',
    ],
  },
];

export default function PartnershipModels({ onOpenConsultation }) {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <section
      id="partnership-models"
      className="relative w-full bg-[#FAF9F6] text-jj-dark py-24 sm:py-32 lg:py-36 overflow-hidden select-none"
    >
      {/* Subtle Background Accent Glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-1/4 -left-28 w-96 h-96 bg-jj-pink/[0.04] rounded-full blur-[140px]" />
        <div className="absolute bottom-1/4 -right-28 w-96 h-96 bg-jj-gold/[0.05] rounded-full blur-[140px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          
          {/* =========================================================================
              LEFT COLUMN: Strategist Photo with Floating 3D Dart Target Sticker
              ========================================================================= */}
          <div className="lg:col-span-6 relative">
            {/* Main Photo Card */}
            <div className="relative rounded-[32px] sm:rounded-[40px] overflow-hidden border-2 border-black/[0.08] shadow-[0_20px_50px_rgba(0,0,0,0.1)] bg-neutral-100 group">
              <img
                src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1000&q=80"
                alt="JJ Elevate Hospitality Marketing Strategist at Whiteboard"
                className="w-full h-[460px] sm:h-[540px] lg:h-[600px] object-cover object-top filter brightness-105 contrast-[1.02] group-hover:scale-102 transition-transform duration-700 ease-out"
                loading="lazy"
              />

              {/* Subtle inner gradient overlay at the base */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

              {/* Photo Bottom Tag */}
              <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-white z-10 pointer-events-none">
                <div className="backdrop-blur-md bg-black/40 border border-white/20 px-4 py-2 rounded-2xl">
                  <span className="text-xs font-extrabold uppercase tracking-widest text-[#FFDE00] block">
                    IN-HOUSE STRATEGY LAB
                  </span>
                  <span className="text-xs font-semibold text-white/90">
                    Bespoke Hospitality Growth Architecture
                  </span>
                </div>
              </div>
            </div>

            {/* Floating 3D Target with Dart Sticker (Exact Position as in Screenshot) */}
            <div className="absolute -bottom-6 sm:-bottom-8 left-1/2 -translate-x-1/2 sm:translate-x-0 sm:left-14 z-20 hover:rotate-6 hover:scale-110 transition-transform duration-300 cursor-pointer">
              <TargetDartSticker className="w-24 h-24 sm:w-28 sm:h-28" />
            </div>
          </div>

          {/* =========================================================================
              RIGHT COLUMN: Header + Interactive Accordion Cards + Proposal CTA
              ========================================================================= */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            
            {/* Main Headline (Exact Copy from Screenshot) */}
            <h2 className="font-display font-black text-3xl sm:text-5xl lg:text-[54px] text-jj-dark tracking-tight uppercase leading-[1.08] sm:leading-[1.04] mb-8 lg:mb-10">
              UNDERSTANDING OUR <br className="hidden sm:inline" />
              PARTNERSHIP MODELS <br className="hidden sm:inline" />
              <span className="text-jj-pink">&amp; INVESTMENT</span>
            </h2>

            {/* Accordion List */}
            <div className="space-y-4 sm:space-y-5 mb-9 sm:mb-10">
              {partnershipAccordion.map((item, index) => {
                const isOpen = openIndex === index;

                return (
                  <div
                    key={item.id}
                    className={`relative rounded-[24px] sm:rounded-[28px] transition-all duration-300 overflow-hidden ${
                      isOpen
                        ? 'bg-gradient-to-br from-white to-[#FFF5F7] border-2 border-jj-pink/40 shadow-[4px_6px_0px_rgba(255,30,86,0.18)] p-6 sm:p-7'
                        : 'bg-white border-2 border-black/[0.08] hover:border-jj-pink/30 shadow-sm p-5 sm:p-6'
                    }`}
                  >
                    {/* Accordion Toggle Header */}
                    <button
                      onClick={() => toggleAccordion(index)}
                      className="w-full flex items-center justify-between gap-4 text-left focus:outline-none cursor-pointer"
                      aria-expanded={isOpen}
                    >
                      <span
                        className={`font-display font-black text-lg sm:text-xl lg:text-[22px] tracking-tight uppercase leading-snug transition-colors ${
                          isOpen ? 'text-jj-pink' : 'text-jj-dark hover:text-jj-pink'
                        }`}
                      >
                        {item.title}
                      </span>

                      {/* Icon Toggle Box (Minus when open, Plus button when closed) */}
                      <div
                        className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 ${
                          isOpen
                            ? 'bg-jj-pink text-white shadow-sm'
                            : 'bg-neutral-100 text-jj-dark hover:bg-neutral-200'
                        }`}
                      >
                        {isOpen ? (
                          <Minus className="w-5 h-5 stroke-[2.5]" />
                        ) : (
                          <Plus className="w-5 h-5 stroke-[2.5]" />
                        )}
                      </div>
                    </button>

                    {/* Accordion Content (Revealed when open) */}
                    {isOpen && (
                      <div className="mt-5 pt-4 border-t border-jj-pink/15 animate-fadeIn">
                        <ul className="space-y-3">
                          {item.bullets.map((bullet, bIdx) => (
                            <li
                              key={bIdx}
                              className="flex items-start gap-3 text-slate-700 text-sm sm:text-base font-medium leading-relaxed"
                            >
                              <span className="w-2 h-2 rounded-full bg-jj-pink shrink-0 mt-2" />
                              <span>{bullet}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Bottom Dark CTA Button (Exact Copy from Screenshot) */}
            <div>
              <button
                onClick={onOpenConsultation}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 sm:px-10 py-4 sm:py-5 rounded-2xl bg-jj-dark text-[#FFDE00] font-display font-black text-sm sm:text-base tracking-widest uppercase shadow-[0_12px_28px_rgba(0,0,0,0.25)] hover:bg-jj-pink hover:text-white transition-all duration-300 hover:scale-105 active:scale-95"
              >
                <span>REQUEST YOUR CUSTOM PROPOSAL</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
