import React from 'react';
import { ShieldCheck, Award, Star } from 'lucide-react';

export default function TrustStrip() {
  const brandLogos = [
    { name: 'HERITAGE PALACE RESORTS', tag: 'LUXURY HERITAGE' },
    { name: 'VILLA SHANTI RESORTS', tag: 'BOUTIQUE VILLAS' },
    { name: 'THE OBEROI EXPERIENCE', tag: 'FIVE STAR' },
    { name: 'DESERT HAVEN HAVELI', tag: 'JODHPUR' },
    { name: 'ROYAL ORCHID BOUTIQUE', tag: 'VACATION HOMES' },
    { name: 'PALACE SAFARI RESORTS', tag: 'WILDLIFE LUXURY' },
    { name: 'TAJ COASTAL INN', tag: 'BEACHFRONT' },
    { name: 'SERENITY SPRINGS RESORT', tag: 'WELLNESS RETREAT' },
  ];

  return (
    <section className="py-10 bg-jj-pink text-white border-y-2 border-jj-dark overflow-hidden shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-2.5 bg-white rounded-full animate-ping"></div>
          <h2 className="text-xs font-bold uppercase tracking-[0.25em] text-white">
            TRUSTED BY AMBITIOUS HOSPITALITY BRANDS
          </h2>
        </div>
        <div className="hidden md:flex items-center gap-6 text-xs text-white/90 font-semibold tracking-wider">
          <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-white" /> Direct Booking Specialists</span>
          <span className="flex items-center gap-1.5"><Award className="w-4 h-4 text-jj-gold" /> 5+ Years Hospitality Expertise</span>
          <span className="flex items-center gap-1.5"><Star className="w-4 h-4 text-white" /> Verified Client Growth</span>
        </div>
      </div>

      {/* Infinite Scrolling Logo Marquee */}
      <div className="relative w-full flex overflow-x-hidden group">
        <div className="animate-marquee flex items-center space-x-12 sm:space-x-16 whitespace-nowrap py-2">
          {[...brandLogos, ...brandLogos].map((logo, index) => (
            <div
              key={index}
              className="inline-flex items-center gap-3 opacity-90 hover:opacity-100 transition-opacity duration-300 cursor-pointer"
            >
              <div className="w-2.5 h-2.5 bg-white rotate-45"></div>
              <span className="font-display text-xl sm:text-2xl font-bold tracking-wider text-white">
                {logo.name}
              </span>
              <span className="text-[10px] px-2.5 py-0.5 border border-white/40 text-white tracking-widest font-extrabold bg-jj-dark/20">
                {logo.tag}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
