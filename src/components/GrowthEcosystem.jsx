import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Zap, Filter, Video, Users, Target, TrendingUp, Award } from 'lucide-react';
import MagneticButton from './motion/MagneticButton';

gsap.registerPlugin(ScrollTrigger);

export default function GrowthEcosystem({ onOpenConsultation }) {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const cardsRef = useRef([]);

  const growthPillars = [
    {
      id: '01',
      title: 'ADMISSION & DIRECT BOOKING FUNNEL',
      icon: Filter,
      bullets: [
        'High-Converting Commission-Free Direct Guest Journey',
        'Frictionless 2-Step Mobile Reservation & Rate Parity Shield',
        'Automated Room Upgrades & Curated Experience Funnels',
        'Direct PMS & Multi-Currency Payment Gateway Integration'
      ],
      metric: '0% OTA COMMISSION'
    },
    {
      id: '02',
      title: 'SOCIAL CONTENT PRODUCTION & BRANDING',
      icon: Video,
      bullets: [
        '4K Cinematic Reels & Drone Villa Architecture Tours',
        'Engaging Visual Storytelling & High-Converting Travel Copy',
        'Curated Luxury Creator Residencies & Influencer Collabs',
        'Platform-Tailored Content Pillars for Instagram & YouTube'
      ],
      metric: '+280% ENGAGEMENT SURGE'
    },
    {
      id: '03',
      title: 'HOSPITALITY CRM & GUEST JOURNEY',
      icon: Users,
      bullets: [
        'Centralized Guest Profiles & Lifetime Booking History',
        'Automated Pre-Arrival Itineraries & WhatsApp Concierge',
        'Post-Stay Personalized Retargeting & Repeat Stays Engine',
        'Seamless PMS Sync for Instant Room & Dining Preferences'
      ],
      metric: '42% REPEAT DIRECT STAYS'
    },
    {
      id: '04',
      title: 'GUEST LEAD GENERATION & ACQUISITION',
      icon: Target,
      bullets: [
        'Hyper-Targeted Ads Capturing High-Spending Travelers',
        'Destination Wedding & Corporate Buyout Lead Funnels',
        'Real-Time Inbound Qualification & Fast Concierge Routing',
        'Multi-Touch Omnichannel Retargeting for Incomplete Bookings'
      ],
      metric: '4.8X AVERAGE DIRECT ROAS'
    },
    {
      id: '05',
      title: 'PERFORMANCE MARKETING & PPC ADS',
      icon: TrendingUp,
      bullets: [
        'Precision Google Hotel Ads & Meta Travel Ads Bidding',
        'High-Intent Destination Keyword Dominance & Competitor Defense',
        'Negative Keyword Shielding & Real-Time ROAS Optimization',
        'Transparent Live Revenue Attribution & Booking Metrics'
      ],
      metric: 'TOP QUERY RANKINGS'
    },
    {
      id: '06',
      title: '5-STAR REVIEW PORTAL & REPUTATION',
      icon: Award,
      bullets: [
        'Automated Post-Checkout Review Requests via WhatsApp & SMS',
        'Rapid Surge of Verified 5-Star Google & TripAdvisor Ratings',
        'Private Unhappy Feedback Interception to Protect Public ADR',
        '24/7 AI-Assisted Brand Reputation & Executive Response Monitoring'
      ],
      metric: '+320% 5-STAR REVIEWS'
    }
  ];

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Header entrance - subtle micro-motion
      if (headingRef.current) {
        gsap.fromTo(
          headingRef.current.children,
          { y: 12, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            stagger: 0.08,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: headingRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // Cards staggered entrance - natural gentle reveal
      if (cardsRef.current.length) {
        gsap.fromTo(
          cardsRef.current,
          { y: 16, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            stagger: 0.08,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="services"
      className="pt-16 sm:pt-20 pb-28 sm:pb-32 bg-[#FAF9F6] text-jj-dark relative overflow-hidden"
    >


      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Centered Section Header */}
        <div ref={headingRef} className="text-center max-w-4xl mx-auto mb-10 sm:mb-12 space-y-3">
          <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-extrabold text-jj-dark tracking-tight leading-[1.1] uppercase">
            HOW WE DRIVE{' '}
            <span className="text-jj-pink">
              YOUR GROWTH
            </span>
          </h2>

          <p className="text-base sm:text-lg text-jj-dark/70 font-normal max-w-2xl mx-auto leading-relaxed pt-2">
            The end-to-end direct booking ecosystem: high-converting funnels, viral social production, CRM automation, and high-velocity 5-star reputation.
          </p>
        </div>

        {/* 6 Cards Grid - Clean, Normal, Light, Matched to JJ Elevate Theme */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 items-stretch pt-6">
          {growthPillars.map((item, idx) => {
            const IconComponent = item.icon;
            return (
              <div
                key={item.id}
                ref={(el) => (cardsRef.current[idx] = el)}
                data-cursor="GROWTH"
                className="bg-white border-2 border-black/[0.08] hover:border-black/20 rounded-[28px] sm:rounded-[32px] pt-8 pb-8 px-7 sm:px-8 shadow-[0_8px_24px_-6px_rgba(0,0,0,0.05)] hover:shadow-[0_16px_36px_-8px_rgba(0,0,0,0.1)] hover:-translate-y-1 transition-all duration-300 ease-out flex flex-col justify-between group will-change-transform relative"
              >
                <div>
                  {/* Top Bar: Pillar Number + Icon Badge (Always Crystal Clear, Never Red Box) */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-jj-dark/50 bg-black/[0.04] px-3 py-1 rounded-full">
                      PILLAR {item.id}
                    </span>
                    <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-2xl bg-[#FFF0F4] border-2 border-jj-pink/20 flex items-center justify-center text-jj-pink shadow-sm group-hover:scale-105 transition-transform duration-300">
                      <IconComponent className="w-7 h-7 stroke-[2.2] text-jj-pink" />
                    </div>
                  </div>

                  {/* Card Title (Bold, High Contrast, Always Clear) */}
                  <h3 className="font-display text-xl sm:text-[22px] font-extrabold uppercase text-jj-dark tracking-tight leading-snug mb-5 text-left">
                    {item.title}
                  </h3>

                  {/* Bulleted Roadmap List */}
                  <ul className="space-y-3 text-left">
                    {item.bullets.map((bullet, bIdx) => (
                      <li key={bIdx} className="flex items-start gap-2.5 text-jj-dark/80 text-[13.5px] sm:text-[14px] leading-relaxed">
                        <span className="text-jj-pink font-extrabold text-base leading-none select-none mt-0.5">
                          •
                        </span>
                        <span className="font-medium text-jj-dark/85">
                          {bullet}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Bottom Metric Pill */}
                <div className="pt-5 mt-6 border-t border-black/5 flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-jj-dark/40">
                    BENCHMARK
                  </span>
                  <span className="text-xs font-bold text-jj-dark bg-jj-yellow/35 px-3 py-1 rounded-lg">
                    {item.metric}
                  </span>
                </div>

              </div>
            );
          })}
        </div>



      </div>
    </section>
  );
}

