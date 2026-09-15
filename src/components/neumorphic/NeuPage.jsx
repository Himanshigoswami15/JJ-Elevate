import React from 'react';


import { NeuBookingCalculator } from './NeuBookingCalculator';
import { NeuTestimonialsSection } from './NeuTestimonialsSection';
import { NeuCTASection } from './NeuCTASection';

/**
 * NeuPage - Full Neumorphic (Soft UI) immersive page
 *
 * Route: /soft-ui
 *
 * Sections:
 * 1. NeuHeroSection       — Ambient rings, nested orb, floating stat cards
 * 2. NeuServicesShowcase  — 6-service tactile card grid
 * 3. NeuBookingCalculator — Interactive ROI & Commission Recapture Engine
 * 4. NeuTestimonialsSection — Social proof with carved quote wells
 * 5. NeuCTASection        — Concentric ring motif + final CTA
 *
 * The entire page is #E0E5EC — the base Neumorphic clay surface.
 * No borders are used anywhere; shadows define all edges.
 */
export const NeuPage = ({ onOpenConsultation, onNavigateHome }) => {
  return (
    <div
      className="min-h-screen font-body selection:bg-[#6C63FF]/20 selection:text-[#3D4852]"
      style={{ backgroundColor: '#E0E5EC' }}
    >
      {/* 1. ROI Calculator */}
      <NeuBookingCalculator onOpenConsultation={onOpenConsultation} />

      {/* 4. Testimonials */}
      <NeuTestimonialsSection onOpenConsultation={onOpenConsultation} />

      {/* 5. Closing CTA */}
      <NeuCTASection onOpenConsultation={onOpenConsultation} />
    </div>
  );
};

export default NeuPage;
