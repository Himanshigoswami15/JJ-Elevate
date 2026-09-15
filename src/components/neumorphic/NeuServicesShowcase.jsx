import React from 'react';
import {
  Megaphone, BarChart2, Search, Star, Utensils, Target,
  ArrowRight
} from 'lucide-react';
import { NeuCard } from './NeuCard';
import { NeuButton } from './NeuButton';
import { NeuIconWell } from './NeuIconWell';

const SERVICES = [
  {
    id: 'social',
    icon: Megaphone,
    title: 'Hotel Social Media Marketing',
    description: 'Scroll-stopping content that converts followers into direct bookers. Reels, carousels, and stories built for the algorithm and your audience.',
    stat: '+68% Engagement',
    statColor: 'text-[#6C63FF]',
  },
  {
    id: 'ads',
    icon: Target,
    title: 'High-Intent Hotel Ads & PPC',
    description: 'Precision Google Ads and Meta campaigns targeting guests at the exact moment of booking intent. Maximum ROAS, minimum waste.',
    stat: '4.2x avg ROAS',
    statColor: 'text-[#38B2AC]',
  },
  {
    id: 'seo',
    icon: Search,
    title: 'Hotel & Resort SEO',
    description: 'Own the first page for every destination search your ideal guests make. Long-term organic traffic that compounds over time.',
    stat: '#1 rankings',
    statColor: 'text-[#6C63FF]',
  },
  {
    id: 'ota',
    icon: BarChart2,
    title: 'OTA Optimization & Revenue',
    description: 'Cut OTA dependency by up to 55%. Recapture commissions, boost direct bookings, and own your guest relationships.',
    stat: '-18% OTA fees',
    statColor: 'text-[#38B2AC]',
  },
  {
    id: 'restaurant',
    icon: Utensils,
    title: 'Restaurant & F&B Social Media',
    description: 'Viral food content, chef spotlights, and UGC campaigns that fill your tables and build a loyal dining community.',
    stat: '+3.2x reach',
    statColor: 'text-[#6C63FF]',
  },
  {
    id: 'perf',
    icon: Star,
    title: 'Restaurant Performance Ads',
    description: 'Google and Meta ads laser-targeted to local diners and tourists. Trackable covers, measurable reservations.',
    stat: '2.8x reservations',
    statColor: 'text-[#38B2AC]',
  },
];

/**
 * NeuServicesShowcase - Tactile 3-column service cards grid
 * Each card: Extruded container → Inset Deep icon well → Icon
 */
export const NeuServicesShowcase = ({ onOpenConsultation }) => {
  return (
    <section
      id="neu-services"
      className="bg-[#E0E5EC] py-28 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">

        {/* Section header */}
        <div className="text-center space-y-5 mb-20">
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest text-[#6B7280] font-display bg-[#E0E5EC]"
            style={{ boxShadow: 'inset 3px 3px 6px rgba(163,177,198,0.6), inset -3px -3px 6px rgba(255,255,255,0.7)' }}
          >
            Our Specializations
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-extrabold text-[#3D4852] tracking-tight leading-tight">
            Every service,<br />
            <span className="text-[#6C63FF]">molded for results.</span>
          </h2>
          <p className="text-[#6B7280] font-body text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Six specialized practices, each with a singular focus: growing your
            property's revenue and reducing dependency on intermediaries.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((svc) => (
            <NeuCard
              key={svc.id}
              className="p-8 flex flex-col gap-6 group"
              hoverEffect={true}
            >
              {/* Icon Well — Inset Deep */}
              <NeuIconWell size="lg" depth="deep" shape="rounded-2xl" className="group-hover:scale-105 transition-transform duration-300">
                <svc.icon className="w-7 h-7 text-[#6C63FF] transition-transform duration-300 group-hover:rotate-6" />
              </NeuIconWell>

              {/* Content */}
              <div className="space-y-2 flex-1">
                <h3 className="font-display text-lg font-bold text-[#3D4852] leading-snug">
                  {svc.title}
                </h3>
                <p className="font-body text-sm text-[#6B7280] leading-relaxed">
                  {svc.description}
                </p>
              </div>

              {/* Stat pill + Arrow */}
              <div className="flex items-center justify-between pt-2">
                <div
                  className={`text-xs font-extrabold uppercase tracking-wider font-display px-3 py-1.5 rounded-xl bg-[#E0E5EC] ${svc.statColor}`}
                  style={{ boxShadow: 'inset 3px 3px 6px rgba(163,177,198,0.5), inset -3px -3px 6px rgba(255,255,255,0.6)' }}
                >
                  {svc.stat}
                </div>
                <div
                  className="w-9 h-9 rounded-2xl bg-[#E0E5EC] flex items-center justify-center transition-all duration-300 group-hover:bg-[#6C63FF] group-hover:text-white"
                  style={{ boxShadow: '5px 5px 10px rgba(163,177,198,0.6), -5px -5px 10px rgba(255,255,255,0.7)' }}
                >
                  <ArrowRight className="w-4 h-4 text-[#6C63FF] group-hover:text-white transition-colors duration-300" />
                </div>
              </div>
            </NeuCard>
          ))}
        </div>

        {/* CTA below grid */}
        <div className="mt-16 flex justify-center">
          <NeuButton variant="primary" size="lg" onClick={onOpenConsultation} icon={ArrowRight} iconPosition="right">
            Get Your Custom Growth Plan
          </NeuButton>
        </div>
      </div>
    </section>
  );
};

export default NeuServicesShowcase;
