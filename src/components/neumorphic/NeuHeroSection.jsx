import React from 'react';
import { ArrowRight, Sparkles, TrendingUp, Hotel, Star } from 'lucide-react';
import { NeuCard } from './NeuCard';
import { NeuButton } from './NeuButton';
import { NeuIconWell } from './NeuIconWell';

/**
 * NeuHeroSection - Immersive Neumorphic Hero
 * Full-bleed #E0E5EC clay surface with concentric depth rings,
 * floating animated stat pills, and a nested Extruded/Inset/Extruded orb.
 */
export const NeuHeroSection = ({ onOpenConsultation }) => {
  return (
    <section
      id="neu-hero"
      className="min-h-[90vh] bg-[#E0E5EC] flex items-center relative overflow-hidden py-24 px-4 sm:px-6 lg:px-8"
    >
      {/* Ambient Background Ring — top right */}
      <div
        className="absolute -top-32 -right-32 w-[520px] h-[520px] rounded-full pointer-events-none select-none hidden lg:block"
        style={{ boxShadow: '40px 40px 80px rgba(163,177,198,0.5), -40px -40px 80px rgba(255,255,255,0.6)' }}
        aria-hidden="true"
      >
        <div
          className="absolute inset-12 rounded-full animate-neu-float"
          style={{ boxShadow: 'inset 20px 20px 40px rgba(163,177,198,0.55), inset -20px -20px 40px rgba(255,255,255,0.65)' }}
        >
          <div
            className="absolute inset-10 rounded-full"
            style={{ boxShadow: '12px 12px 24px rgba(163,177,198,0.6), -12px -12px 24px rgba(255,255,255,0.7)' }}
          />
        </div>
      </div>

      {/* Ambient orb — bottom left */}
      <div
        className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full pointer-events-none select-none hidden md:block"
        style={{ boxShadow: '20px 20px 50px rgba(163,177,198,0.4), -20px -20px 50px rgba(255,255,255,0.5)' }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* LEFT — Headline + CTAs */}
          <div className="space-y-10">
            <div
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#E0E5EC] text-[#6C63FF] text-xs font-bold uppercase tracking-widest font-display"
              style={{ boxShadow: 'inset 4px 4px 8px rgba(163,177,198,0.6), inset -4px -4px 8px rgba(255,255,255,0.7)' }}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Soft UI · Tactile Design System</span>
            </div>

            <div className="space-y-4">
              <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-extrabold text-[#3D4852] leading-[0.95] tracking-tight">
                Revenue that
                <br />
                <span
                  className="relative inline-block"
                  style={{ WebkitTextStroke: '2px #6C63FF', color: 'transparent' }}
                >
                  feels different.
                </span>
              </h1>
              <p className="text-base sm:text-lg text-[#6B7280] font-body leading-relaxed max-w-lg">
                A premium hospitality growth engine—crafted in Soft UI. Every
                interaction is tactile, every depth tells a story of results
                molded from the same material as your brand.
              </p>
            </div>

            <div className="flex flex-wrap gap-4 items-center">
              <NeuButton variant="primary" size="lg" onClick={onOpenConsultation} icon={ArrowRight} iconPosition="right">
                Book Strategy Call
              </NeuButton>
              <NeuButton variant="clay" size="lg">
                Explore Results
              </NeuButton>
            </div>

            <div className="flex items-center gap-3 text-[#6B7280] text-xs font-body">
              <div className="flex -space-x-1.5">
                {['#6C63FF', '#38B2AC', '#FF6B8A', '#FFCA3A'].map((c, i) => (
                  <div key={i} className="w-7 h-7 rounded-full border-2 border-[#E0E5EC]" style={{ backgroundColor: c }} />
                ))}
              </div>
              <span>Trusted by <strong className="text-[#3D4852]">120+</strong> hotels &amp; resorts globally</span>
            </div>
          </div>

          {/* RIGHT — Nested Depth Orb + Floating Stat Cards */}
          <div className="relative flex items-center justify-center h-[480px] lg:h-[520px]">

            {/* Extruded → Inset → Extruded orb */}
            <div
              className="w-64 h-64 sm:w-72 sm:h-72 rounded-full bg-[#E0E5EC] flex items-center justify-center"
              style={{ boxShadow: '20px 20px 40px rgba(163,177,198,0.65), -20px -20px 40px rgba(255,255,255,0.75)' }}
            >
              <div
                className="w-44 h-44 rounded-full bg-[#E0E5EC] flex items-center justify-center animate-neu-float"
                style={{ boxShadow: 'inset 14px 14px 28px rgba(163,177,198,0.7), inset -14px -14px 28px rgba(255,255,255,0.8)' }}
              >
                <div
                  className="w-24 h-24 rounded-full bg-[#E0E5EC] flex items-center justify-center"
                  style={{ boxShadow: '10px 10px 20px rgba(163,177,198,0.6), -10px -10px 20px rgba(255,255,255,0.7)' }}
                >
                  <Hotel className="w-10 h-10 text-[#6C63FF]" />
                </div>
              </div>
            </div>

            {/* Floating Stat — Top Right */}
            <div className="absolute top-4 right-0 sm:right-4" style={{ animation: 'neuFloat 3s ease-in-out infinite 0.5s' }}>
              <NeuCard className="px-5 py-4 flex items-center gap-3 cursor-default" hoverEffect={false}>
                <NeuIconWell size="sm" depth="deep" shape="rounded-xl">
                  <TrendingUp className="w-4 h-4 text-[#38B2AC]" />
                </NeuIconWell>
                <div>
                  <div className="text-xl font-extrabold text-[#3D4852] font-display leading-none">+43%</div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-[#6B7280] font-display mt-0.5">Direct Bookings</div>
                </div>
              </NeuCard>
            </div>

            {/* Floating Stat — Bottom Left */}
            <div className="absolute bottom-10 left-0 sm:-left-4" style={{ animation: 'neuFloat 3.5s ease-in-out infinite 1.2s' }}>
              <NeuCard className="px-5 py-4 flex items-center gap-3 cursor-default" hoverEffect={false}>
                <NeuIconWell size="sm" depth="deep" shape="rounded-xl">
                  <Star className="w-4 h-4 text-[#6C63FF]" />
                </NeuIconWell>
                <div>
                  <div className="text-xl font-extrabold text-[#3D4852] font-display leading-none">4.9★</div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-[#6B7280] font-display mt-0.5">Client Satisfaction</div>
                </div>
              </NeuCard>
            </div>

            {/* Floating Stat — Top Left */}
            <div className="absolute top-20 left-0 sm:-left-6" style={{ animation: 'neuFloat 4s ease-in-out infinite 0s' }}>
              <NeuCard className="px-4 py-3 cursor-default" hoverEffect={false}>
                <div className="text-[10px] font-bold uppercase tracking-wider text-[#6B7280] font-display">OTA Commission Saved</div>
                <div className="text-2xl font-extrabold text-[#38B2AC] font-display leading-tight">$1.2M+</div>
              </NeuCard>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NeuHeroSection;
