import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ArrowUpRight, Instagram, Search, Globe, Sliders, Smartphone, Palette, Target, Video } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MagneticButton from './motion/MagneticButton';
import ArrowFillButton from '@/components/ui/arrow-fill-button';

gsap.registerPlugin(ScrollTrigger);

/* ─────────────────────────────────────────────
   ServiceRow – individual accordion row
   ───────────────────────────────────────────── */
function ServiceRow({ service, idx, isSelected, onToggle, onOpenConsultation, prefersReducedMotion }) {
  const Icon = service.icon;
  const rowRef = useRef(null);
  const expandRef = useRef(null);
  const arrowRef = useRef(null);

  // ── Scroll-driven entrance for each row ──
  useEffect(() => {
    if (prefersReducedMotion) return;
    const el = rowRef.current;
    if (!el) return;

    // Alternate subtle rotation direction
    const rotDir = idx % 2 === 0 ? -1 : 1;
    const yOffset = 60 + idx * 12; // deeper rows start further away

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        {
          y: yOffset,
          opacity: 0,
          rotateZ: rotDir * 0.8,
          scale: 0.97,
        },
        {
          y: 0,
          opacity: 1,
          rotateZ: 0,
          scale: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 92%',
            end: 'top 60%',
            scrub: 0.6,
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, [idx, prefersReducedMotion]);

  // ── Parallax: rows drift at slightly different speeds while scrolling ──
  useEffect(() => {
    if (prefersReducedMotion) return;
    const el = rowRef.current;
    if (!el) return;
    const isMobile = window.innerWidth < 768;
    if (isMobile) return; // skip parallax on mobile

    const speed = 0.03 + idx * 0.012; // subtle variation

    const ctx = gsap.context(() => {
      gsap.to(el, {
        y: () => -80 * speed,
        ease: 'none',
        scrollTrigger: {
          trigger: el,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });
    }, el);

    return () => ctx.revert();
  }, [idx, prefersReducedMotion]);

  // ── Animate expanded content elements with stagger ──
  useEffect(() => {
    if (prefersReducedMotion) return;
    const container = expandRef.current;
    if (!isSelected || !container) return;

    const children = container.querySelectorAll('.srv-detail');
    if (!children.length) return;

    gsap.fromTo(
      children,
      { y: 18, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.5,
        stagger: 0.06,
        ease: 'power2.out',
      }
    );
  }, [isSelected, prefersReducedMotion]);

  // ── Arrow hover micro-interaction ──
  const handleMouseEnter = useCallback(() => {
    if (prefersReducedMotion) return;
    if (arrowRef.current) {
      gsap.to(arrowRef.current, { x: 4, y: -4, duration: 0.3, ease: 'power2.out' });
    }
  }, [prefersReducedMotion]);

  const handleMouseLeave = useCallback(() => {
    if (prefersReducedMotion) return;
    if (arrowRef.current) {
      gsap.to(arrowRef.current, { x: 0, y: 0, duration: 0.3, ease: 'power2.out' });
    }
  }, [prefersReducedMotion]);

  return (
    <div
      ref={rowRef}
      onClick={() => onToggle(idx)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      data-cursor="EXPLORE"
      className={`srv-row p-6 sm:p-8 border transition-all duration-500 cursor-pointer will-change-transform ${
        isSelected
          ? 'bg-jj-dark-card text-white border-jj-pink shadow-2xl scale-[1.005]'
          : 'bg-white/5 text-white border-white/10 hover:border-jj-pink hover:pl-10'
      }`}
      style={{ backfaceVisibility: 'hidden' }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-6">
          <span
            className={`font-bold text-base transition-colors duration-300 ${
              isSelected ? 'text-jj-pink' : 'text-white/40'
            }`}
          >
            {service.id}
          </span>
          <div className="flex items-center gap-4">
            <Icon
              className={`w-6 h-6 transition-colors duration-300 ${
                isSelected ? 'text-jj-pink' : 'text-white/70'
              }`}
            />
            <h3 className="font-display text-2xl sm:text-3xl font-bold uppercase tracking-wider">
              {service.title}
            </h3>
          </div>
        </div>

        <span ref={arrowRef} className="inline-flex will-change-transform">
          <ArrowUpRight
            className={`w-7 h-7 transition-colors duration-300 ${
              isSelected ? 'text-jj-pink' : 'text-white/40'
            }`}
          />
        </span>
      </div>

      {/* Expanded Description */}
      <div
        className={`grid transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isSelected ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className="overflow-hidden">
          <div
            ref={expandRef}
            className="mt-6 pt-6 border-t border-white/10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center"
          >
            <div className="lg:col-span-8 space-y-3">
              <p className="srv-detail text-white/80 text-base font-light leading-relaxed">
                {service.description}
              </p>
              <span className="srv-detail text-xs uppercase tracking-widest text-jj-pink font-extrabold block pt-2">
                KEY IMPACT: {service.metrics}
              </span>
            </div>

            <div className="lg:col-span-4 flex justify-start lg:justify-end srv-detail">
              <ArrowFillButton
                btnText="Explore Strategy"
                size="sm"
                variant="pink"
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenConsultation();
                }}
                className="shadow-lg shadow-jj-pink/30 font-bold tracking-wider"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Services – main section
   ───────────────────────────────────────────── */
export default function Services({ onOpenConsultation }) {
  const [activeService, setActiveService] = useState(0);
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const line1Ref = useRef(null);
  const line2Ref = useRef(null);
  const subtextRef = useRef(null);
  const badgeRef = useRef(null);
  const dividerRef = useRef(null);

  const prefersReducedMotion =
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const services = [
    {
      id: '01',
      title: 'HOTEL SOCIAL MEDIA MARKETING',
      category: 'BRAND AWARENESS',
      icon: Instagram,
      description:
        'Build iconic hotel brands through curated Instagram & Meta content, influencer partnerships, and high-impact reel campaigns that make travelers want to visit.',
      metrics: '+280% Engagement Rate Surge',
    },
    {
      id: '02',
      title: 'HIGH-INTENT GOOGLE ADS',
      category: 'PERFORMANCE SEARCH',
      icon: Search,
      description:
        'Capture travelers actively searching for "luxury resorts in Rajasthan" or "boutique hotels near me" with high-ROAS Google Search, Performance Max & Hotel Ads.',
      metrics: '4.8X Average Search ROAS',
    },
    {
      id: '03',
      title: 'HOTEL & RESORT SEO',
      category: 'ORGANIC DISCOVERY',
      icon: Globe,
      description:
        'Dominate organic search rankings for local destination queries, luxury stay keywords, and branded search terms to capture perpetual commission-free traffic.',
      metrics: '#1 Rankings for Destination Keywords',
    },
    {
      id: '04',
      title: 'OTA OPTIMIZATION & DIRECT CONVERSION',
      category: 'CHANNEL STRATEGY',
      icon: Sliders,
      description:
        'Optimize your listings on Booking.com, Agoda, and MakeMyTrip while implementing rate parity strategies and direct booking incentives on your website.',
      metrics: '35% Reduction in OTA Dependency',
    },
    {
      id: '05',
      title: 'HOSPITALITY WEBSITE DEVELOPMENT',
      category: 'DIGITAL ARCHITECTURE',
      icon: Smartphone,
      description:
        'Custom-engineered, mobile-first websites integrated seamlessly with your PMS & booking engine. Designed around luxury editorial visuals and frictionless checkout.',
      metrics: '+45% Mobile Conversion Rate',
    },
    {
      id: '06',
      title: 'BRANDING & VISUAL IDENTITY',
      category: 'ART DIRECTION',
      icon: Palette,
      description:
        "Craft timeless logo marks, typography standards, in-room collateral, menu designs, and luxury brand guidelines that express your property's heritage and character.",
      metrics: 'Full Brand Transformation',
    },
    {
      id: '07',
      title: 'PERFORMANCE PAID MEDIA',
      category: 'REVENUE SCALING',
      icon: Target,
      description:
        "Data-driven paid social retargeting campaigns on Meta & TikTok targeting affluent travelers who visited your booking engine but didn't complete their stay reservation.",
      metrics: 'Zero-Waste Ad Targeting',
    },
    {
      id: '08',
      title: 'LUXURY CONTENT & VIDEO PRODUCTION',
      category: 'VISUAL ASSETS',
      icon: Video,
      description:
        'Architectural photography, F&B imagery, cinematic drone videography, and lifestyle reel content that captures the sensory atmosphere of your hotel.',
      metrics: 'High-Bitrate 4K Media Assets',
    },
  ];

  // ── Header clip-path + y reveal ──
  useEffect(() => {
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Badge
      if (badgeRef.current) {
        gsap.fromTo(
          badgeRef.current,
          { opacity: 0, x: -30 },
          {
            opacity: 1,
            x: 0,
            duration: 0.7,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // Headline line 1: vertical clip-path reveal
      if (line1Ref.current) {
        gsap.fromTo(
          line1Ref.current,
          {
            clipPath: 'inset(100% 0% 0% 0%)',
            y: 50,
          },
          {
            clipPath: 'inset(0% 0% 0% 0%)',
            y: 0,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 78%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // Headline line 2: follows with delay
      if (line2Ref.current) {
        gsap.fromTo(
          line2Ref.current,
          {
            clipPath: 'inset(100% 0% 0% 0%)',
            y: 50,
          },
          {
            clipPath: 'inset(0% 0% 0% 0%)',
            y: 0,
            duration: 0.9,
            delay: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 78%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // Subtext
      if (subtextRef.current) {
        gsap.fromTo(
          subtextRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: 0.35,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 78%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // Divider line wipe
      if (dividerRef.current) {
        gsap.fromTo(
          dividerRef.current,
          { scaleX: 0, transformOrigin: 'left center' },
          {
            scaleX: 1,
            duration: 1,
            delay: 0.25,
            ease: 'power2.inOut',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 78%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // ── Scroll-linked header parallax: heading drifts up as you scroll through ──
      if (headerRef.current) {
        const isMobile = window.innerWidth < 768;
        if (!isMobile) {
          gsap.to(headerRef.current, {
            y: -40,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top top',
              end: 'bottom top',
              scrub: true,
            },
          });
        }
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  const handleToggle = useCallback(
    (idx) => {
      setActiveService(activeService === idx ? -1 : idx);
    },
    [activeService]
  );

  return (
    <section
      id="services"
      ref={sectionRef}
      className="py-28 bg-jj-dark text-white relative overflow-hidden section-transition-dark"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div
          ref={headerRef}
          className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 pb-8 relative"
        >
          <div>
            <div ref={badgeRef} className="flex items-center gap-3 mb-2">
              <span className="w-8 h-[2px] bg-jj-pink"></span>
              <span className="text-xs font-extrabold uppercase tracking-widest text-jj-pink">
                WHAT WE DO
              </span>
            </div>
            <h2 className="clamp-heading font-display font-extrabold text-white tracking-tight uppercase">
              <span ref={line1Ref} className="block will-change-transform">
                ONE GROWTH ENGINE.
              </span>
              <span ref={line2Ref} className="block text-jj-pink will-change-transform">
                EVERY DIGITAL TOUCHPOINT.
              </span>
            </h2>
          </div>
          <p
            ref={subtextRef}
            className="text-white/70 max-w-md text-base mt-4 lg:mt-0"
          >
            We don't offer disconnected services. We build an integrated growth
            ecosystem that turns online attention into direct guest reservations.
          </p>

          {/* Animated divider */}
          <div
            ref={dividerRef}
            className="absolute bottom-0 left-0 w-full h-[1px] bg-white/10"
          />
        </div>

        {/* Editorial Rows */}
        <div className="space-y-4">
          {services.map((service, idx) => (
            <ServiceRow
              key={service.id}
              service={service}
              idx={idx}
              isSelected={activeService === idx}
              onToggle={handleToggle}
              onOpenConsultation={onOpenConsultation}
              prefersReducedMotion={prefersReducedMotion}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
