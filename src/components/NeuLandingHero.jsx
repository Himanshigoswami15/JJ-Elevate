import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowDown, Hotel, TrendingUp, ShieldCheck, Zap, Star, BarChart2 } from 'lucide-react';
import { NeuButton } from './neumorphic/NeuButton';
import { NeuCard } from './neumorphic/NeuCard';
import { NeuIconWell } from './neumorphic/NeuIconWell';

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { icon: TrendingUp, value: '+43%', label: 'Direct Bookings', color: '#38B2AC' },
  { icon: ShieldCheck, value: '$1.2M+', label: 'OTA Fees Saved', color: '#6C63FF' },
  { icon: Star, value: '4.9★', label: 'Client Rating', color: '#38B2AC' },
  { icon: BarChart2, value: '120+', label: 'Hotels Served', color: '#6C63FF' },
];

/**
 * NeuLandingHero — Full-viewport Neumorphic landing section
 *
 * Sits above the existing editorial Hero. The #E0E5EC clay surface
 * transitions smoothly into the page below via a gradient fade edge.
 *
 * Design: Nested depth orb (Extruded → Inset → Extruded) on the right,
 * headline + CTAs on the left, 4 tactile stat cards below.
 * A concentric-ring ambient decoration fills the top-right quadrant.
 */
export default function NeuLandingHero({ onOpenConsultation }) {
  const sectionRef = useRef(null);
  const orbRef = useRef(null);
  const headlineRef = useRef(null);
  const statsRef = useRef(null);
  const decorRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // Orb scales in from center
      tl.fromTo(orbRef.current,
        { scale: 0.7, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.1 }
      )
      // Decoration fades in
      .fromTo(decorRef.current,
        { opacity: 0, scale: 0.85 },
        { opacity: 1, scale: 1, duration: 1.0 },
        '-=0.8'
      )
      // Headline slides up
      .fromTo(headlineRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.85 },
        '-=0.7'
      )
      // Stat cards stagger in
      .fromTo('.neu-stat-card',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.1 },
        '-=0.5'
      );

      // Parallax: orb drifts up on scroll
      if (window.innerWidth >= 768) {
        gsap.to(orbRef.current, {
          y: -80,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1,
          },
        });
        gsap.to(decorRef.current, {
          y: -40,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 0.6,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const scrollToHero = () => {
    const hero = document.getElementById('hero');
    if (hero) hero.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      ref={sectionRef}
      id="top"
      className="relative min-h-screen flex flex-col justify-between overflow-hidden"
      style={{ backgroundColor: '#E0E5EC' }}
    >
      {/* ── Ambient top-right concentric ring decoration ── */}
      <div
        ref={decorRef}
        className="absolute -top-40 -right-40 w-[560px] h-[560px] rounded-full pointer-events-none select-none hidden lg:block will-change-transform"
        style={{ boxShadow: '50px 50px 100px rgba(163,177,198,0.45), -50px -50px 100px rgba(255,255,255,0.55)' }}
        aria-hidden="true"
      >
        <div
          className="absolute inset-14 rounded-full"
          style={{ boxShadow: 'inset 24px 24px 48px rgba(163,177,198,0.5), inset -24px -24px 48px rgba(255,255,255,0.6)' }}
        >
          <div
            className="absolute inset-12 rounded-full"
            style={{ boxShadow: '16px 16px 32px rgba(163,177,198,0.55), -16px -16px 32px rgba(255,255,255,0.65)' }}
          />
        </div>
      </div>

      {/* ── Bottom-left ambient orb ── */}
      <div
        className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full pointer-events-none select-none hidden md:block"
        style={{ boxShadow: '24px 24px 56px rgba(163,177,198,0.4), -24px -24px 56px rgba(255,255,255,0.5)' }}
        aria-hidden="true"
      />

      {/* ── Main content grid ── */}
      <div className="flex-1 flex items-center max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-28 lg:py-0 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center w-full">

          {/* LEFT — Badge, Headline, CTAs */}
          <div ref={headlineRef} className="space-y-8 lg:space-y-10">
            {/* Inset pill badge */}
            <div
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-[0.18em] font-display"
              style={{
                backgroundColor: '#E0E5EC',
                color: '#6C63FF',
                boxShadow: 'inset 4px 4px 8px rgba(163,177,198,0.6), inset -4px -4px 8px rgba(255,255,255,0.7)',
              }}
            >
              <Zap className="w-3.5 h-3.5" />
              <span>Soft UI · Hospitality Growth</span>
            </div>

            {/* Headline */}
            <div className="space-y-3">
              <h1
                className="font-display font-extrabold leading-[0.92] tracking-tight"
                style={{
                  fontSize: 'clamp(2.8rem, 6vw, 5.5rem)',
                  color: '#3D4852',
                }}
              >
                Digital growth
                <br />
                for{' '}
                <span
                  style={{
                    WebkitTextStroke: '2px #6C63FF',
                    color: 'transparent',
                  }}
                >
                  noteworthy
                </span>
                <br />
                hospitality brands
              </h1>
              <p
                className="font-body leading-relaxed max-w-lg"
                style={{
                  fontSize: 'clamp(1rem, 1.2vw + 0.4rem, 1.2rem)',
                  color: '#6B7280',
                }}
              >
                We help hotels, resorts &amp; travel brands attract high-intent guests,
                scale direct bookings, and slash OTA dependency—through precision
                digital marketing.
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 items-center">
              <NeuButton
                variant="primary"
                size="lg"
                onClick={onOpenConsultation}
              >
                Book Strategy Call
              </NeuButton>
              <NeuButton variant="clay" size="lg" onClick={scrollToHero}>
                See Our Work ↓
              </NeuButton>
            </div>

            {/* Trust avatars row */}
            <div className="flex items-center gap-3" style={{ color: '#6B7280', fontSize: '0.75rem' }}>
              <div className="flex -space-x-2">
                {['#6C63FF', '#38B2AC', '#FF6B8A', '#FFCA3A', '#FF1E56'].map((c, i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full border-2"
                    style={{ backgroundColor: c, borderColor: '#E0E5EC' }}
                  />
                ))}
              </div>
              <span className="font-body">
                Trusted by <strong style={{ color: '#3D4852' }}>120+</strong> hotels &amp; resorts globally
              </span>
            </div>
          </div>

          {/* RIGHT — Nested depth orb */}
          <div ref={orbRef} className="relative flex items-center justify-center h-[420px] lg:h-[500px] will-change-transform">

            {/* OUTERMOST — Extruded */}
            <div
              className="w-72 h-72 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-full flex items-center justify-center"
              style={{
                backgroundColor: '#E0E5EC',
                boxShadow: '24px 24px 48px rgba(163,177,198,0.65), -24px -24px 48px rgba(255,255,255,0.75)',
              }}
            >
              {/* MIDDLE — Inset */}
              <div
                className="w-52 h-52 sm:w-60 sm:h-60 lg:w-72 lg:h-72 rounded-full flex items-center justify-center"
                style={{
                  backgroundColor: '#E0E5EC',
                  boxShadow: 'inset 16px 16px 32px rgba(163,177,198,0.7), inset -16px -16px 32px rgba(255,255,255,0.8)',
                  animation: 'neuFloat 3.5s ease-in-out infinite',
                }}
              >
                {/* INNER — Extruded */}
                <div
                  className="w-32 h-32 sm:w-36 sm:h-36 lg:w-44 lg:h-44 rounded-full flex items-center justify-center"
                  style={{
                    backgroundColor: '#E0E5EC',
                    boxShadow: '12px 12px 24px rgba(163,177,198,0.6), -12px -12px 24px rgba(255,255,255,0.7)',
                  }}
                >
                  <Hotel className="text-[#6C63FF]" style={{ width: '2.5rem', height: '2.5rem' }} />
                </div>
              </div>
            </div>

            {/* Floating stat pill — Top Right */}
            <div
              className="absolute top-6 right-2 sm:right-0 neu-stat-card"
              style={{ animation: 'neuFloat 3s ease-in-out infinite 0.4s' }}
            >
              <NeuCard className="px-5 py-3.5 flex items-center gap-3 cursor-default" hoverEffect={false}>
                <NeuIconWell size="sm" depth="deep" shape="rounded-xl">
                  <TrendingUp className="w-4 h-4 text-[#38B2AC]" />
                </NeuIconWell>
                <div>
                  <div className="text-lg font-extrabold leading-none font-display" style={{ color: '#3D4852' }}>+43%</div>
                  <div className="text-[10px] font-bold uppercase tracking-wider mt-0.5 font-display" style={{ color: '#6B7280' }}>Direct Bookings</div>
                </div>
              </NeuCard>
            </div>

            {/* Floating stat pill — Bottom Left */}
            <div
              className="absolute bottom-12 -left-2 sm:left-0 neu-stat-card"
              style={{ animation: 'neuFloat 4s ease-in-out infinite 1s' }}
            >
              <NeuCard className="px-5 py-3.5 flex items-center gap-3 cursor-default" hoverEffect={false}>
                <NeuIconWell size="sm" depth="deep" shape="rounded-xl">
                  <ShieldCheck className="w-4 h-4 text-[#6C63FF]" />
                </NeuIconWell>
                <div>
                  <div className="text-lg font-extrabold leading-none font-display" style={{ color: '#3D4852' }}>$1.2M+</div>
                  <div className="text-[10px] font-bold uppercase tracking-wider mt-0.5 font-display" style={{ color: '#6B7280' }}>OTA Fees Saved</div>
                </div>
              </NeuCard>
            </div>

            {/* Floating stat pill — Top Left */}
            <div
              className="absolute top-24 -left-4 sm:left-0 neu-stat-card"
              style={{ animation: 'neuFloat 3.7s ease-in-out infinite 1.8s' }}
            >
              <NeuCard className="px-4 py-3 cursor-default" hoverEffect={false}>
                <div className="text-[10px] font-bold uppercase tracking-wider font-display" style={{ color: '#6B7280' }}>Client Rating</div>
                <div className="text-xl font-extrabold font-display" style={{ color: '#38B2AC' }}>4.9 ★</div>
              </NeuCard>
            </div>
          </div>
        </div>
      </div>

      {/* ── Stat cards row ── */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pb-12 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {STATS.map((s, i) => (
            <div key={i} className="neu-stat-card">
              <NeuCard className="px-5 py-5 flex items-center gap-4 cursor-default" hoverEffect={false}>
                <NeuIconWell size="md" depth="deep" shape="rounded-xl">
                  <s.icon className="w-5 h-5" style={{ color: s.color }} />
                </NeuIconWell>
                <div>
                  <div className="text-xl sm:text-2xl font-extrabold leading-none font-display" style={{ color: s.color }}>{s.value}</div>
                  <div className="text-[10px] sm:text-xs font-bold uppercase tracking-wider mt-1 font-display" style={{ color: '#6B7280' }}>{s.label}</div>
                </div>
              </NeuCard>
            </div>
          ))}
        </div>
      </div>

      {/* ── Scroll cue ── */}
      <button
        onClick={scrollToHero}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 cursor-pointer focus:outline-none group"
        aria-label="Scroll to site"
        style={{ color: '#6B7280' }}
      >
        <span className="text-[10px] font-bold uppercase tracking-[0.2em] font-display">scroll</span>
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:-translate-y-1"
          style={{
            backgroundColor: '#E0E5EC',
            boxShadow: '5px 5px 10px rgba(163,177,198,0.6), -5px -5px 10px rgba(255,255,255,0.7)',
          }}
        >
          <ArrowDown className="w-4 h-4" style={{ color: '#6C63FF' }} />
        </div>
      </button>

      {/* ── Smooth transition edge into the site below ── */}
      <div
        className="absolute bottom-0 left-0 right-0 h-28 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, transparent, #FAF9F7)',
        }}
        aria-hidden="true"
      />
    </section>
  );
}
