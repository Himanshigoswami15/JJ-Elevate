import React from 'react';
import { ArrowRight, Zap, ShieldCheck, TrendingUp } from 'lucide-react';
import { NeuCard } from './NeuCard';
import { NeuButton } from './NeuButton';
import { NeuIconWell } from './NeuIconWell';

const PROOF_POINTS = [
  { icon: TrendingUp, label: 'Avg Direct Booking Lift', value: '+43%', color: '#38B2AC' },
  { icon: ShieldCheck, label: 'OTA Fees Eliminated', value: '$1.2M+', color: '#6C63FF' },
  { icon: Zap, label: 'Avg Time to Results', value: '60 Days', color: '#38B2AC' },
];

/**
 * NeuCTASection - Closing call-to-action with concentric ring motif
 * Large extruded card with a central inset well for the headline,
 * three tactile proof-point pucks, and a primary CTA.
 */
export const NeuCTASection = ({ onOpenConsultation }) => {
  return (
    <section
      id="neu-cta"
      className="bg-[#E0E5EC] py-28 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
    >
      {/* Decorative concentric rings — bottom right */}
      <div
        className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full pointer-events-none select-none hidden lg:block"
        style={{ boxShadow: '30px 30px 60px rgba(163,177,198,0.45), -30px -30px 60px rgba(255,255,255,0.55)' }}
        aria-hidden="true"
      >
        <div
          className="absolute inset-10 rounded-full animate-neu-float"
          style={{ boxShadow: 'inset 16px 16px 32px rgba(163,177,198,0.5), inset -16px -16px 32px rgba(255,255,255,0.6)' }}
        >
          <div
            className="absolute inset-8 rounded-full"
            style={{ boxShadow: '10px 10px 20px rgba(163,177,198,0.55), -10px -10px 20px rgba(255,255,255,0.65)' }}
          />
        </div>
      </div>

      {/* Decorative ring — top left */}
      <div
        className="absolute -top-16 -left-16 w-64 h-64 rounded-full pointer-events-none select-none hidden md:block"
        style={{ boxShadow: '20px 20px 40px rgba(163,177,198,0.4), -20px -20px 40px rgba(255,255,255,0.5)' }}
        aria-hidden="true"
      />

      <div className="max-w-5xl mx-auto relative z-10">
        <NeuCard className="p-10 sm:p-16 lg:p-20 text-center" hoverEffect={false}>

          {/* Inner inset badge */}
          <div
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest text-[#6C63FF] font-display bg-[#E0E5EC] mb-8"
            style={{ boxShadow: 'inset 4px 4px 8px rgba(163,177,198,0.6), inset -4px -4px 8px rgba(255,255,255,0.7)' }}
          >
            <Zap className="w-3.5 h-3.5" />
            Free Strategy Session
          </div>

          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#3D4852] tracking-tight leading-tight mb-6">
            Ready to reduce OTA fees<br />
            <span style={{ WebkitTextStroke: '2px #6C63FF', color: 'transparent' }}>
              and own your bookings?
            </span>
          </h2>

          <p className="font-body text-base sm:text-lg text-[#6B7280] leading-relaxed max-w-2xl mx-auto mb-12">
            Book a free 30-minute strategy call. We'll audit your current booking mix,
            identify your biggest commission drain, and outline a custom plan to
            shift 30–55% of bookings to direct in 90 days.
          </p>

          {/* Proof points */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
            {PROOF_POINTS.map((pt) => (
              <div key={pt.label} className="flex flex-col items-center gap-4">
                <NeuIconWell size="lg" depth="deep" shape="rounded-2xl">
                  <pt.icon className="w-6 h-6" style={{ color: pt.color }} />
                </NeuIconWell>
                <div>
                  <div className="font-display text-2xl font-extrabold text-[#3D4852]" style={{ color: pt.color }}>
                    {pt.value}
                  </div>
                  <div className="font-body text-xs text-[#6B7280] uppercase tracking-wider mt-0.5">
                    {pt.label}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 justify-center">
            <NeuButton
              variant="primary"
              size="lg"
              onClick={onOpenConsultation}
              icon={ArrowRight}
              iconPosition="right"
            >
              Book Free Strategy Call
            </NeuButton>
            <NeuButton variant="clay" size="lg">
              See Case Studies
            </NeuButton>
          </div>

          {/* Micro trust line */}
          <p className="mt-8 text-xs text-[#6B7280] font-body tracking-wider">
            No commitment required · Results-backed guarantee · Response within 24 hours
          </p>
        </NeuCard>
      </div>
    </section>
  );
};

export default NeuCTASection;
