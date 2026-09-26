import React from 'react';
import { Quote, Star } from 'lucide-react';
import { NeuCard } from './NeuCard';
import { NeuIconWell } from './NeuIconWell';
import { NeuButton } from './NeuButton';
import { ArrowRight } from 'lucide-react';

const TESTIMONIALS = [
  {
    id: 1,
    name: 'Priya Sharma',
    role: 'General Manager',
    property: 'The Oberoi Udaipur',
    image: '/images/testimonials/ananya.jpg',
    rating: 5,
    quote: 'JJ Elevate reduced our OTA dependency from 72% to 41% in just 8 months. The direct booking revenue we recaptured paid for the entire engagement 6x over.',
    accentColor: '#6C63FF',
    initials: 'PS',
  },
  {
    id: 2,
    name: 'Rajan Mehta',
    role: 'Revenue Director',
    property: 'Leela Palace Bangalore',
    image: '/images/testimonials/vikramaditya.jpg',
    rating: 5,
    quote: 'The Google Ads and Meta campaigns they built for us drove a 4.2x ROAS consistently. Our cost-per-acquisition dropped 38% in the first quarter alone.',
    accentColor: '#38B2AC',
    initials: 'RM',
  },
  {
    id: 3,
    name: 'Rohit Verma',
    role: 'Marketing Head',
    property: 'Coastal Palms Resort, Goa',
    image: '/images/testimonials/rohit.jpg',
    rating: 5,
    quote: 'Our social media went from an afterthought to our top acquisition channel. The content team truly understands the luxury hospitality audience.',
    accentColor: '#6C63FF',
    initials: 'RV',
  },
];

const RatingPips = ({ count }) => (
  <div className="flex items-center gap-1">
    {Array.from({ length: count }).map((_, i) => (
      <div
        key={i}
        className="w-5 h-5 rounded-full bg-[#E0E5EC] flex items-center justify-center"
        style={{ boxShadow: '2px 2px 5px rgba(163,177,198,0.6), -2px -2px 5px rgba(255,255,255,0.7)' }}
      >
        <Star className="w-2.5 h-2.5 fill-[#6C63FF] text-[#6C63FF]" />
      </div>
    ))}
  </div>
);

/**
 * NeuTestimonialsSection - Tactile social proof cards
 * Quote icon in a deep inset well, avatar puck in extruded surface,
 * rating pips as individual extruded dots.
 */
export const NeuTestimonialsSection = ({ onOpenConsultation }) => {
  return (
    <section
      id="neu-testimonials"
      className="bg-[#E0E5EC] py-28 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
    >
      {/* Background decoration */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none select-none opacity-40"
        style={{ boxShadow: '0 0 120px rgba(108,99,255,0.08)' }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center space-y-5 mb-20">
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest text-[#6B7280] font-display bg-[#E0E5EC]"
            style={{ boxShadow: 'inset 3px 3px 6px rgba(163,177,198,0.6), inset -3px -3px 6px rgba(255,255,255,0.7)' }}
          >
            Client Stories
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-extrabold text-[#3D4852] tracking-tight">
            Results that<br />
            <span className="text-[#6C63FF]">speak for themselves.</span>
          </h2>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t) => (
            <NeuCard key={t.id} className="p-8 flex flex-col gap-6 group">
              {/* Quote icon well */}
              <div className="flex items-center justify-between">
                <NeuIconWell size="md" depth="deep" shape="rounded-xl" className="group-hover:scale-105 transition-transform duration-300">
                  <Quote className="w-5 h-5 text-[#6C63FF]" />
                </NeuIconWell>
                <RatingPips count={t.rating} />
              </div>

              {/* Quote text */}
              <blockquote className="font-body text-sm sm:text-base text-[#3D4852] leading-relaxed flex-1">
                "{t.quote}"
              </blockquote>

              {/* Author row */}
              <div className="flex items-center gap-4 pt-2 border-t border-transparent">
                {/* Avatar — Indian Portrait Image with sculpted ring */}
                <div className="relative shrink-0">
                  <img
                    src={t.image}
                    alt={t.name}
                    className="w-12 h-12 rounded-full object-cover object-top border-2 border-white shadow-md ring-2 ring-[#6C63FF]/30"
                  />
                </div>
                <div>
                  <div className="font-display text-sm font-bold text-[#3D4852]">{t.name}</div>
                  <div className="font-body text-xs text-[#6B7280]">{t.role} · {t.property}</div>
                </div>
              </div>
            </NeuCard>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 flex justify-center">
          <NeuButton variant="clay" size="lg" onClick={onOpenConsultation} icon={ArrowRight} iconPosition="right">
            Read All Case Studies
          </NeuButton>
        </div>
      </div>
    </section>
  );
};

export default NeuTestimonialsSection;
