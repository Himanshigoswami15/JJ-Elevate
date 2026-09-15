import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Magnet, ArrowUpDown, BarChart3, Lightbulb, ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';
import MagneticButton from './motion/MagneticButton';

gsap.registerPlugin(ScrollTrigger);

export default function BigStatement({ onOpenConsultation }) {
  const sectionRef = useRef(null);
  const headlineRef = useRef(null);
  const headlineLineRef = useRef(null);
  const cardsRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Natural subtle text motion on scroll
      if (headlineLineRef.current) {
        gsap.fromTo(
          headlineLineRef.current,
          { opacity: 0, y: 12 },
          {
            opacity: 1,
            y: 0,
            duration: 0.55,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // Cards gentle staggered entrance
      const cards = cardsRef.current.querySelectorAll('.pain-card');
      gsap.fromTo(
        cards,
        { opacity: 0, y: 16 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.08,
          duration: 0.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const cardsData = [
    {
      id: '01',
      title: 'LACK OF LEADS OR DIRECT BOOKINGS?',
      description: 'High traffic from ads, but struggling to convert visitors into paid guest reservations?',
      bgColor: 'bg-jj-pink text-white shadow-jj-pink/30',
      icon: Magnet
    },
    {
      id: '02',
      title: 'STRUGGLING TO KEEP UP WITH TRENDS?',
      description: 'Falling behind on fast-changing social algorithms, Meta features, and Google Search updates?',
      bgColor: 'bg-jj-yellow text-jj-dark shadow-jj-yellow/30',
      icon: ArrowUpDown
    },
    {
      id: '03',
      title: 'UNSURE HOW TO MEASURE ROI?',
      description: 'Spending budget on ad campaigns without clear tracking linking ad spend to room revenue?',
      bgColor: 'bg-jj-dark text-jj-pink shadow-jj-dark/20',
      icon: BarChart3
    },
    {
      id: '04',
      title: 'LACKING CREATIVE PRODUCTION?',
      description: 'Inability to produce luxury video reels, drone visuals, and high-bitrate brand assets?',
      bgColor: 'bg-jj-pink text-white shadow-jj-pink/30',
      icon: Lightbulb
    }
  ];

  return (
    <section ref={sectionRef} className="py-16 sm:py-28 bg-jj-cream text-jj-dark relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center flex flex-col items-center">
        
        {/* Top Centered Section Header */}
        <div ref={headlineRef} className="max-w-4xl mb-10 sm:mb-16 space-y-3">
          <h2 ref={headlineLineRef} className="font-display text-3xl sm:text-5xl lg:text-6xl font-extrabold text-jj-dark tracking-tight uppercase leading-[1.08] sm:leading-[1.05] will-change-transform">
            TIRED OF MARKETING EFFORTS THAT <br className="hidden sm:inline" />
            <span className="text-jj-pink">DON'T DELIVER?</span>
          </h2>
        </div>

        {/* 4 Clean Shadow-Based Cards Grid */}
        <div ref={cardsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 w-full z-10">
          {cardsData.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.id}
                data-cursor="DISCOVER"
                className="pain-card luxury-spotlight-card bg-white p-6 sm:p-8 rounded-[1.8rem] sm:rounded-[2rem] shadow-[0_12px_40px_rgba(0,0,0,0.06)] hover:shadow-[0_20px_60px_rgba(255,30,86,0.12)] transition-all duration-500 border border-black/[0.04] flex flex-col justify-between items-center text-center hover:-translate-y-1.5 group will-change-transform cursor-pointer"
              >
                <div className="flex flex-col items-center">
                  {/* Icon Container */}
                  <div className={`w-16 h-16 ${card.bgColor} rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-500`}>
                    <Icon className="w-8 h-8" />
                  </div>

                  {/* Question Title */}
                  <h3 className="font-display text-xl font-extrabold text-jj-dark tracking-tight uppercase mb-3 leading-snug group-hover:text-jj-pink transition-colors duration-300">
                    {card.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-jj-dark/65 leading-relaxed font-normal">
                    {card.description}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-jj-dark/8 w-full flex items-center justify-center">
                  <span className="text-[11px] font-extrabold text-jj-pink uppercase tracking-widest flex items-center gap-1.5">
                    <span>SOLVED BY JJ ELEVATE</span>
                    <CheckCircle2 className="w-4 h-4 text-jj-pink" />
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
