import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, Instagram, Search, Sliders, Smartphone } from 'lucide-react';
import MagneticButton from './motion/MagneticButton';

gsap.registerPlugin(ScrollTrigger);

// Service-specific layout configurations ensuring unique, perfectly spaced compositions
const serviceConfigs = [
  // Service 01: Hotel Social Media & Influencer Marketing
  {
    desktop: {
      left: { x: -310, y: -115, rot: -7, initRot: -4, scale: 1 },
      center: { x: 0, y: -155, rot: 0, initRot: 2, scale: 1.03 },
      right: { x: 310, y: -115, rot: 7, initRot: 4, scale: 1 }
    },
    tablet: {
      left: { x: -145, y: 38, rot: -6, initRot: -3, scale: 0.96 },
      center: { x: 0, y: 16, rot: 0, initRot: 1, scale: 1.02 },
      right: { x: 145, y: 38, rot: 6, initRot: 3, scale: 0.96 }
    },
    mobile: {
      left: { x: -50, y: 26, rot: -8, initRot: -3, scale: 0.94 },
      center: { x: 0, y: 12, rot: 0, initRot: 0, scale: 1.02 },
      right: { x: 50, y: 26, rot: 8, initRot: 3, scale: 0.94 }
    }
  },
  // Service 02: High-Intent Google Ads & Performance Search
  {
    desktop: {
      left: { x: -305, y: -118, rot: -6, initRot: -3, scale: 1 },
      center: { x: 8, y: -152, rot: 1, initRot: 3, scale: 1.03 },
      right: { x: 315, y: -112, rot: 8, initRot: 5, scale: 1 }
    },
    tablet: {
      left: { x: -140, y: 40, rot: -5, initRot: -2, scale: 0.96 },
      center: { x: 4, y: 14, rot: 1, initRot: 2, scale: 1.02 },
      right: { x: 148, y: 36, rot: 7, initRot: 4, scale: 0.96 }
    },
    mobile: {
      left: { x: -48, y: 28, rot: -7, initRot: -2, scale: 0.94 },
      center: { x: 0, y: 10, rot: 1, initRot: 1, scale: 1.02 },
      right: { x: 52, y: 24, rot: 9, initRot: 3, scale: 0.94 }
    }
  },
  // Service 03: OTA Optimization & 0% Commission Engine
  {
    desktop: {
      left: { x: -315, y: -112, rot: -8, initRot: -5, scale: 1 },
      center: { x: -4, y: -158, rot: -1, initRot: 1, scale: 1.04 },
      right: { x: 305, y: -118, rot: 6, initRot: 3, scale: 1 }
    },
    tablet: {
      left: { x: -148, y: 36, rot: -7, initRot: -3, scale: 0.96 },
      center: { x: 0, y: 14, rot: -1, initRot: 1, scale: 1.02 },
      right: { x: 140, y: 40, rot: 5, initRot: 2, scale: 0.96 }
    },
    mobile: {
      left: { x: -52, y: 24, rot: -9, initRot: -3, scale: 0.94 },
      center: { x: 0, y: 10, rot: -1, initRot: 0, scale: 1.02 },
      right: { x: 48, y: 28, rot: 7, initRot: 2, scale: 0.94 }
    }
  },
  // Service 04: Hospitality Web App & SEO Dominance
  {
    desktop: {
      left: { x: -310, y: -116, rot: -7, initRot: -4, scale: 1 },
      center: { x: 0, y: -155, rot: 0, initRot: 2, scale: 1.03 },
      right: { x: 310, y: -116, rot: 7, initRot: 4, scale: 1 }
    },
    tablet: {
      left: { x: -145, y: 38, rot: -6, initRot: -3, scale: 0.96 },
      center: { x: 0, y: 16, rot: 0, initRot: 1, scale: 1.02 },
      right: { x: 145, y: 38, rot: 6, initRot: 3, scale: 0.96 }
    },
    mobile: {
      left: { x: -50, y: 26, rot: -8, initRot: -3, scale: 0.94 },
      center: { x: 0, y: 12, rot: 0, initRot: 0, scale: 1.02 },
      right: { x: 50, y: 26, rot: 8, initRot: 3, scale: 0.94 }
    }
  }
];

export default function ResultsMetrics({ onOpenConsultation }) {
  const sectionRef = useRef(null);
  const headingContainerRef = useRef(null);
  const dividerRef = useRef(null);
  const cardRefs = useRef([]);
  const leftImgRefs = useRef([]);
  const centerImgRefs = useRef([]);
  const rightImgRefs = useRef([]);

  const [activeTab, setActiveTab] = useState(0);

  const servicesList = [
    {
      id: '01',
      title: 'Hotel Social Media & Influencer Marketing',
      category: 'BRAND AWARENESS',
      tabLabel: '01 SOCIAL & REELS',
      bgColor: 'bg-[#EFECE6]',
      textColor: 'text-[#0B0C10]',
      subTextColor: 'text-[#0B0C10]/80',
      borderColor: 'border-[#0B0C10]/15',
      badgeBg: 'bg-[#0B0C10] text-white',
      accentColor: 'text-[#FF1E56]',
      icon: Instagram,
      metricHighlight: '+280% ENGAGEMENT SURGE',
      metricsTable: [
        { label: 'MEDIA FORMAT', value: '4K REELS & INFLUENCERS' },
        { label: 'ENGAGEMENT', value: '+280% ORGANIC REEL REACH' },
        { label: 'PLATFORMS', value: 'INSTAGRAM & META ADS' },
        { label: 'TARGETING', value: 'LUXURY TRAVELERS' }
      ],
      description: 'Build iconic hotel brands through curated Instagram content, high-impact video reels, luxury influencer stays, and targeted Meta ads that make travelers want to visit.',
      images: {
        left: {
          url: '/images/social/social_pool_shoot.jpg',
          caption: 'LUXURY RESORT CONTENT SHOOT'
        },
        center: {
          url: '/images/social/social_instagram_feed.jpg',
          caption: 'HOTEL INSTAGRAM BIO & GRID'
        },
        right: {
          url: '/images/social/social_sunset_production.jpg',
          caption: 'SUNSET VILLA REEL PRODUCTION'
        }
      }
    },
    {
      id: '02',
      title: 'High-Intent Google Ads & Performance Search',
      category: 'PERFORMANCE ADS',
      tabLabel: '02 GOOGLE SEARCH',
      bgColor: 'bg-[#E6E1F5]',
      textColor: 'text-[#1D1B2A]',
      subTextColor: 'text-[#1D1B2A]/80',
      borderColor: 'border-[#1D1B2A]/15',
      badgeBg: 'bg-[#FF1E56] text-white',
      accentColor: 'text-[#FF1E56]',
      icon: Search,
      metricHighlight: '4.8X AVERAGE SEARCH ROAS',
      metricsTable: [
        { label: 'SEARCH INTENT', value: 'DESTINATION QUERY ADS' },
        { label: 'RETURN ON ADS', value: '4.8X DIRECT AD REVENUE' },
        { label: 'CAMPAIGNS', value: 'GOOGLE SEARCH & HOTEL ADS' },
        { label: 'CONVERSION', value: 'HIGH-ROAS PMAX' }
      ],
      description: 'Capture travelers actively searching for "luxury resorts in Rajasthan" or "boutique villas near me" with high-ROAS Google Search & Performance Max campaigns.',
      images: {
        left: {
          url: '/images/google_ads/google_ads_palace_day.jpg',
          caption: 'HERITAGE PALACE ESTATE & GARDENS'
        },
        center: {
          url: '/images/google_ads/google_ads_metrics_dashboard.png',
          caption: 'GOOGLE ADS PERFORMANCE CAMPAIGN DASHBOARD'
        },
        right: {
          url: '/images/google_ads/google_ads_palace_lake_sunset.jpg',
          caption: 'UDAIPUR LAKE PALACE AT TWILIGHT'
        }
      }
    },
    {
      id: '03',
      title: 'OTA Optimization & 0% Commission Engine',
      category: 'COMMISSION FREE',
      tabLabel: '03 OTA STRATEGY',
      bgColor: 'bg-[#F2ECE1]',
      textColor: 'text-[#0B0C10]',
      subTextColor: 'text-[#0B0C10]/80',
      borderColor: 'border-[#0B0C10]/15',
      badgeBg: 'bg-[#0B0C10] text-white',
      accentColor: 'text-jj-pink',
      icon: Sliders,
      metricHighlight: '35% OTA DEPENDENCY DROP',
      metricsTable: [
        { label: 'DIRECT ENGINE', value: '0% COMMISSION PER STAY' },
        { label: 'OTA SAVINGS', value: '35% REDUCTION IN FEES' },
        { label: 'RATE PARITY', value: '100% PROTECTED' },
        { label: 'GUEST DATA', value: '100% HOTEL OWNERSHIP' }
      ],
      description: 'Optimize your listings on Booking.com & Agoda while implementing rate parity strategies and direct booking incentives that turn OTA searchers into direct guests.',
      images: {
        left: {
          url: '/images/ota/ota_palace_pool.jpg',
          caption: 'PALACE REFLECTING POOL & COURTYARD'
        },
        center: {
          url: '/images/ota/ota_booking_calendar.png',
          caption: 'DIRECT BOOKING ENGINE & CALENDAR'
        },
        right: {
          url: '/images/ota/ota_presidential_suite.jpg',
          caption: 'PRESIDENTIAL LAKE VIEW SUITE'
        }
      }
    },
    {
      id: '04',
      title: 'Hospitality Web App & SEO Dominance',
      category: 'DIGITAL ARCHITECTURE',
      tabLabel: '04 WEB APP & SEO',
      bgColor: 'bg-[#0B0C10]',
      textColor: 'text-white',
      subTextColor: 'text-white/80',
      borderColor: 'border-white/15',
      badgeBg: 'bg-[#FF1E56] text-white',
      accentColor: 'text-[#FF1E56]',
      icon: Smartphone,
      metricHighlight: '+65% MOBILE CONVERSIONS',
      metricsTable: [
        { label: 'PAGE SPEED', value: '0.8s ULTRA FAST' },
        { label: 'MOBILE CHECKOUT', value: '+65% COMPLETION' },
        { label: 'SEO RANKINGS', value: '#1 DESTINATION KEYWORDS' },
        { label: 'PMS INTEGRATION', value: 'SEAMLESS REAL-TIME' }
      ],
      description: 'Custom-engineered mobile web apps integrated with your PMS & booking engine. Designed around luxury editorial visuals and frictionless 2-step checkout.',
      images: {
        left: {
          url: '/images/web_app/alpine_infinity_pool_day.jpg',
          caption: 'ALPINE RESORT PANORAMA POOL'
        },
        center: {
          url: '/images/web_app/hospitality_web_app_mockup.jpg',
          caption: 'HOSPITALITY WEB APP & BOOKING SUITE'
        },
        right: {
          url: '/images/web_app/alpine_infinity_pool_sunset.jpg',
          caption: 'SUNSET ALPINE RETREAT'
        }
      }
    }
  ];

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const mm = gsap.matchMedia(sectionRef);

    // 1. Header Entrance (All Viewports)
    if (headingContainerRef.current) {
      const badge = headingContainerRef.current.querySelector('.header-badge');
      const line1 = headingContainerRef.current.querySelector('.heading-line-1');
      const line2 = headingContainerRef.current.querySelector('.heading-line-2');
      const subtext = headingContainerRef.current.querySelector('.heading-subtext');

      const headerTl = gsap.timeline({
        scrollTrigger: {
          trigger: headingContainerRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      });

      if (badge) {
        headerTl.fromTo(badge, { opacity: 0, x: -25 }, { opacity: 1, x: 0, duration: 0.6, ease: 'power3.out' });
      }
      if (line1) {
        headerTl.fromTo(
          line1,
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
          '-=0.25'
        );
      }
      if (line2) {
        headerTl.fromTo(
          line2,
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
          '-=0.35'
        );
      }
      if (subtext) {
        headerTl.fromTo(subtext, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out' }, '-=0.3');
      }
    }

    // 2. DESKTOP (1024px and Above)
    mm.add("(min-width: 1024px)", () => {
      cardRefs.current.forEach((cardWrap, idx) => {
        if (!cardWrap) return;

        const leftImg = leftImgRefs.current[idx];
        const centerImg = centerImgRefs.current[idx];
        const rightImg = rightImgRefs.current[idx];
        const cardBody = cardWrap.querySelector('.service-card-body');
        const srvCfg = serviceConfigs[idx] || serviceConfigs[0];
        const cfg = srvCfg.desktop;
        const initialHiddenY = 260;

        if (prefersReducedMotion) {
          gsap.set(leftImg, { opacity: 1, y: cfg.left.y, x: cfg.left.x, rotate: cfg.left.rot, scale: cfg.left.scale, clipPath: 'inset(0% 0% 0% 0%)' });
          gsap.set(centerImg, { opacity: 1, y: cfg.center.y, x: cfg.center.x, rotate: cfg.center.rot, scale: cfg.center.scale, clipPath: 'inset(0% 0% 0% 0%)' });
          gsap.set(rightImg, { opacity: 1, y: cfg.right.y, x: cfg.right.x, rotate: cfg.right.rot, scale: cfg.right.scale, clipPath: 'inset(0% 0% 0% 0%)' });
          if (cardBody) gsap.set(cardBody, { y: 0, opacity: 1 });
          return;
        }

        gsap.set(leftImg, { x: 0, y: initialHiddenY, rotate: cfg.left.initRot, scale: 0.85, opacity: 0, clipPath: 'inset(100% 0% 0% 0%)' });
        gsap.set(centerImg, { x: 0, y: initialHiddenY + 25, rotate: cfg.center.initRot, scale: 0.85, opacity: 0, clipPath: 'inset(100% 0% 0% 0%)' });
        gsap.set(rightImg, { x: 0, y: initialHiddenY + 45, rotate: cfg.right.initRot, scale: 0.82, opacity: 0, clipPath: 'inset(100% 0% 0% 0%)' });
        if (cardBody) gsap.set(cardBody, { y: 25, opacity: 0.95 });

        const scrubTl = gsap.timeline({
          scrollTrigger: {
            trigger: cardWrap,
            start: 'top 85%',
            end: 'top 32%',
            scrub: 1.0,
            onUpdate: (self) => {
              if (self.progress > 0.25) setActiveTab(idx);
            }
          }
        });

        if (cardBody) {
          scrubTl.to(cardBody, { y: 0, opacity: 1, ease: 'power2.out', duration: 0.25 }, 0.0);
        }
        scrubTl.to(leftImg, { x: cfg.left.x, y: cfg.left.y, rotate: cfg.left.rot, scale: cfg.left.scale, opacity: 1, clipPath: 'inset(0% 0% 0% 0%)', ease: 'power2.out', duration: 0.46 }, 0.04);
        scrubTl.to(centerImg, { x: cfg.center.x, y: cfg.center.y, rotate: cfg.center.rot, scale: cfg.center.scale, opacity: 1, clipPath: 'inset(0% 0% 0% 0%)', ease: 'power2.out', duration: 0.50 }, 0.10);
        scrubTl.to(rightImg, { x: cfg.right.x, y: cfg.right.y, rotate: cfg.right.rot, scale: cfg.right.scale, opacity: 1, clipPath: 'inset(0% 0% 0% 0%)', ease: 'power2.out', duration: 0.46 }, 0.16);
        scrubTl.to(leftImg, { y: cfg.left.y - 22, ease: 'none', duration: 0.38 }, 0.62);
        scrubTl.to(centerImg, { y: cfg.center.y - 30, ease: 'none', duration: 0.38 }, 0.62);
        scrubTl.to(rightImg, { y: cfg.right.y - 22, ease: 'none', duration: 0.38 }, 0.62);
      });
    });

    // 3. TABLET (640px to 1023px)
    mm.add("(min-width: 640px) and (max-width: 1023px)", () => {
      cardRefs.current.forEach((cardWrap, idx) => {
        if (!cardWrap) return;

        const leftImg = leftImgRefs.current[idx];
        const centerImg = centerImgRefs.current[idx];
        const rightImg = rightImgRefs.current[idx];
        const cardBody = cardWrap.querySelector('.service-card-body');
        const srvCfg = serviceConfigs[idx] || serviceConfigs[0];
        const cfg = srvCfg.tablet;
        const initialHiddenY = 180;

        if (prefersReducedMotion) {
          gsap.set(leftImg, { opacity: 1, y: cfg.left.y, x: cfg.left.x, rotate: cfg.left.rot, scale: cfg.left.scale, clipPath: 'inset(0% 0% 0% 0%)' });
          gsap.set(centerImg, { opacity: 1, y: cfg.center.y, x: cfg.center.x, rotate: cfg.center.rot, scale: cfg.center.scale, clipPath: 'inset(0% 0% 0% 0%)' });
          gsap.set(rightImg, { opacity: 1, y: cfg.right.y, x: cfg.right.x, rotate: cfg.right.rot, scale: cfg.right.scale, clipPath: 'inset(0% 0% 0% 0%)' });
          if (cardBody) gsap.set(cardBody, { y: 0, opacity: 1 });
          return;
        }

        gsap.set(leftImg, { x: 0, y: initialHiddenY, rotate: cfg.left.initRot, scale: 0.85, opacity: 0, clipPath: 'inset(100% 0% 0% 0%)' });
        gsap.set(centerImg, { x: 0, y: initialHiddenY + 20, rotate: cfg.center.initRot, scale: 0.85, opacity: 0, clipPath: 'inset(100% 0% 0% 0%)' });
        gsap.set(rightImg, { x: 0, y: initialHiddenY + 35, rotate: cfg.right.initRot, scale: 0.82, opacity: 0, clipPath: 'inset(100% 0% 0% 0%)' });
        if (cardBody) gsap.set(cardBody, { y: 20, opacity: 0.95 });

        const scrubTl = gsap.timeline({
          scrollTrigger: {
            trigger: cardWrap,
            start: 'top 85%',
            end: 'top 36%',
            scrub: 1.0,
            onUpdate: (self) => {
              if (self.progress > 0.25) setActiveTab(idx);
            }
          }
        });

        if (cardBody) {
          scrubTl.to(cardBody, { y: 0, opacity: 1, ease: 'power2.out', duration: 0.25 }, 0.0);
        }
        scrubTl.to(leftImg, { x: cfg.left.x, y: cfg.left.y, rotate: cfg.left.rot, scale: cfg.left.scale, opacity: 1, clipPath: 'inset(0% 0% 0% 0%)', ease: 'power2.out', duration: 0.46 }, 0.04);
        scrubTl.to(centerImg, { x: cfg.center.x, y: cfg.center.y, rotate: cfg.center.rot, scale: cfg.center.scale, opacity: 1, clipPath: 'inset(0% 0% 0% 0%)', ease: 'power2.out', duration: 0.50 }, 0.10);
        scrubTl.to(rightImg, { x: cfg.right.x, y: cfg.right.y, rotate: cfg.right.rot, scale: cfg.right.scale, opacity: 1, clipPath: 'inset(0% 0% 0% 0%)', ease: 'power2.out', duration: 0.46 }, 0.16);
        scrubTl.to(leftImg, { y: cfg.left.y - 12, ease: 'none', duration: 0.38 }, 0.62);
        scrubTl.to(centerImg, { y: cfg.center.y - 16, ease: 'none', duration: 0.38 }, 0.62);
        scrubTl.to(rightImg, { y: cfg.right.y - 12, ease: 'none', duration: 0.38 }, 0.62);
      });
    });

    // 4. MOBILE (Below 640px)
    mm.add("(max-width: 639px)", () => {
      cardRefs.current.forEach((cardWrap, idx) => {
        if (!cardWrap) return;

        const leftImg = leftImgRefs.current[idx];
        const centerImg = centerImgRefs.current[idx];
        const rightImg = rightImgRefs.current[idx];
        const cardBody = cardWrap.querySelector('.service-card-body');
        const srvCfg = serviceConfigs[idx] || serviceConfigs[0];
        const cfg = srvCfg.mobile;
        const initialHiddenY = 155;

        if (prefersReducedMotion) {
          gsap.set(leftImg, { opacity: 1, y: cfg.left.y, x: cfg.left.x, rotate: cfg.left.rot, scale: cfg.left.scale, clipPath: 'inset(0% 0% 0% 0%)' });
          gsap.set(centerImg, { opacity: 1, y: cfg.center.y, x: cfg.center.x, rotate: cfg.center.rot, scale: cfg.center.scale, clipPath: 'inset(0% 0% 0% 0%)' });
          gsap.set(rightImg, { opacity: 1, y: cfg.right.y, x: cfg.right.x, rotate: cfg.right.rot, scale: cfg.right.scale, clipPath: 'inset(0% 0% 0% 0%)' });
          if (cardBody) gsap.set(cardBody, { y: 0, opacity: 1 });
          return;
        }

        gsap.set(leftImg, { x: 0, y: initialHiddenY, rotate: cfg.left.initRot, scale: 0.85, opacity: 0, clipPath: 'inset(100% 0% 0% 0%)' });
        gsap.set(centerImg, { x: 0, y: initialHiddenY + 15, rotate: cfg.center.initRot, scale: 0.85, opacity: 0, clipPath: 'inset(100% 0% 0% 0%)' });
        gsap.set(rightImg, { x: 0, y: initialHiddenY + 25, rotate: cfg.right.initRot, scale: 0.82, opacity: 0, clipPath: 'inset(100% 0% 0% 0%)' });
        if (cardBody) gsap.set(cardBody, { y: 15, opacity: 0.95 });

        const scrubTl = gsap.timeline({
          scrollTrigger: {
            trigger: cardWrap,
            start: 'top 85%',
            end: 'top 38%',
            scrub: 0.8,
            onUpdate: (self) => {
              if (self.progress > 0.25) setActiveTab(idx);
            }
          }
        });

        if (cardBody) {
          scrubTl.to(cardBody, { y: 0, opacity: 1, ease: 'power2.out', duration: 0.25 }, 0.0);
        }
        scrubTl.to(leftImg, { x: cfg.left.x, y: cfg.left.y, rotate: cfg.left.rot, scale: cfg.left.scale, opacity: 1, clipPath: 'inset(0% 0% 0% 0%)', ease: 'power2.out', duration: 0.46 }, 0.04);
        scrubTl.to(centerImg, { x: cfg.center.x, y: cfg.center.y, rotate: cfg.center.rot, scale: cfg.center.scale, opacity: 1, clipPath: 'inset(0% 0% 0% 0%)', ease: 'power2.out', duration: 0.50 }, 0.10);
        scrubTl.to(rightImg, { x: cfg.right.x, y: cfg.right.y, rotate: cfg.right.rot, scale: cfg.right.scale, opacity: 1, clipPath: 'inset(0% 0% 0% 0%)', ease: 'power2.out', duration: 0.46 }, 0.16);
        scrubTl.to(leftImg, { y: cfg.left.y - 6, ease: 'none', duration: 0.38 }, 0.62);
        scrubTl.to(centerImg, { y: cfg.center.y - 8, ease: 'none', duration: 0.38 }, 0.62);
        scrubTl.to(rightImg, { y: cfg.right.y - 6, ease: 'none', duration: 0.38 }, 0.62);
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="services"
      className="resp-services-section bg-jj-offwhite text-jj-dark relative"
    >
      <div className="resp-container max-w-7xl mx-auto resp-services-header-wrap">
        {/* Section Header */}
        <div ref={headingContainerRef} className="relative pb-4">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between">
            <div>
              <div className="header-badge flex items-center gap-3 mb-2">
                <span className="w-8 h-[2px] bg-jj-pink"></span>
                <span className="text-xs font-extrabold uppercase tracking-widest text-jj-pink">
                  JJ ELEVATE SERVICES SUITE
                </span>
              </div>
              <h2 className="clamp-heading font-display font-extrabold text-jj-dark tracking-tight uppercase leading-[0.92]">
                <span className="block heading-line-1 will-change-transform">GROWTH SERVICES FOR</span>
                <span className="block heading-line-2 text-jj-pink will-change-transform">HOSPITALITY BRANDS.</span>
              </h2>
            </div>
            <p className="heading-subtext text-jj-dark/80 max-w-md text-base mt-4 lg:mt-0 font-medium">
              Explore our specialized digital marketing services built specifically for hotels, luxury resorts, and boutique stays.
            </p>
          </div>
        </div>
      </div>

      {/* =========================================================================
          PROPER SERVICES SHOWCASE WITH SCROLL-DRIVEN IMAGE REVEAL
          Images physically emerge from behind the solid card top on scroll scrub!
          ========================================================================= */}
      <div className="resp-container max-w-5xl mx-auto flex flex-col resp-services-stack">
        {servicesList.map((srv, idx) => {
          const Icon = srv.icon;

          return (
            <div
              key={srv.id}
              ref={(el) => (cardRefs.current[idx] = el)}
              className="relative w-full resp-service-card-wrap"
            >
              {/* =========================================================
                  IMAGE LAYER CONTAINER: SITS BEHIND THE CARD (Z-INDEX 10-20)
                  Card (z-30) completely masks images when they are hidden.
                  ========================================================= */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full flex justify-center pointer-events-none z-10">
                
                {/* Image 1 (Left Photo): Emerges first */}
                <div
                  ref={(el) => (leftImgRefs.current[idx] = el)}
                  className="absolute top-0 resp-service-img-side overflow-hidden border-2 border-white/90 bg-white will-change-transform z-10 pointer-events-auto cursor-pointer shadow-lg"
                  style={{ transformOrigin: 'bottom center', clipPath: 'inset(100% 0% 0% 0%)', opacity: 0 }}
                >
                  <div className="w-full h-full transition-transform duration-300 ease-out hover:scale-[1.03] hover:rotate-0">
                    <img
                      src={srv.images.left.url}
                      alt={srv.images.left.caption}
                      className="w-full h-full object-cover object-center transition-transform duration-500 hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                </div>

                {/* Image 2 (Center Photo): Dominant center on top */}
                <div
                  ref={(el) => (centerImgRefs.current[idx] = el)}
                  className="absolute top-0 resp-service-img-center overflow-hidden border-2 border-white bg-white will-change-transform z-20 pointer-events-auto cursor-pointer shadow-xl"
                  style={{ transformOrigin: 'bottom center', clipPath: 'inset(100% 0% 0% 0%)', opacity: 0 }}
                >
                  <div className="w-full h-full transition-transform duration-300 ease-out hover:scale-[1.03] hover:rotate-0">
                    <img
                      src={srv.images.center.url}
                      alt={srv.images.center.caption}
                      className="w-full h-full object-cover object-center transition-transform duration-500 hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                </div>

                {/* Image 3 (Right Photo): Emerges third */}
                <div
                  ref={(el) => (rightImgRefs.current[idx] = el)}
                  className="absolute top-0 resp-service-img-side overflow-hidden border-2 border-white/90 bg-white will-change-transform z-10 pointer-events-auto cursor-pointer shadow-lg"
                  style={{ transformOrigin: 'bottom center', clipPath: 'inset(100% 0% 0% 0%)', opacity: 0 }}
                >
                  <div className="w-full h-full transition-transform duration-300 ease-out hover:scale-[1.03] hover:rotate-0">
                    <img
                      src={srv.images.right.url}
                      alt={srv.images.right.caption}
                      className="w-full h-full object-cover object-center transition-transform duration-500 hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                </div>

              </div>

              {/* =========================================================
                  MAIN SERVICE CARD (Sits in front at Z-INDEX 30)
                  Solid background completely covers the images beneath it.
                  ========================================================= */}
              <div
                data-cursor="EXPLORE"
                className={`service-card-body luxury-spotlight-card relative z-30 w-full ${srv.bgColor} ${srv.textColor} resp-service-card shadow-sm border border-black/10 transition-shadow duration-300 hover:shadow-md will-change-transform`}
              >
                {/* 2-Column Responsive Card Content */}
                <div className="grid resp-service-grid items-center">
                  
                  {/* Left Column (7 Cols on desktop): Icon, Badge, Title, Description, CTA */}
                  <div className="lg:col-span-7 space-y-5">
                    {/* Header Row */}
                    <div className="flex items-center justify-between gap-2 flex-wrap sm:flex-nowrap">
                      <div className="flex items-center gap-3">
                        <div className={`p-2.5 sm:p-3 rounded-2xl ${srv.badgeBg} shadow-sm`}>
                          <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                        </div>
                        <span className="text-xs font-bold tracking-wider opacity-60">
                          {srv.id}
                        </span>
                      </div>
                      <span className={`text-[9px] sm:text-[10px] font-extrabold px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full uppercase tracking-wider ${srv.badgeBg}`}>
                        {srv.category}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="font-display resp-service-title font-extrabold tracking-tight uppercase leading-snug">
                      {srv.title}
                    </h3>

                    {/* Description */}
                    <p className={`text-sm sm:text-base font-normal leading-relaxed ${srv.subTextColor}`}>
                      {srv.description}
                    </p>

                    {/* Verified Impact Pill */}
                    <div className="bg-white/20 backdrop-blur-md p-3 sm:p-3.5 rounded-2xl border border-black/10 flex items-center justify-between gap-2">
                      <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider opacity-70">VERIFIED IMPACT</span>
                      <span className={`text-xs sm:text-[13px] font-bold tracking-normal ${srv.accentColor}`}>{srv.metricHighlight}</span>
                    </div>

                    {/* CTA Button */}
                    <div className="pt-2">
                      <MagneticButton
                        onClick={onOpenConsultation}
                        className="resp-service-cta px-6 sm:px-8 py-3.5 bg-jj-dark text-white rounded-full text-xs font-extrabold uppercase tracking-wider hover:bg-jj-pink transition-colors shadow-md flex items-center justify-center gap-2 group"
                      >
                        <span>EXPLORE SERVICE STRATEGY</span>
                        <ArrowUpRight className="w-4 h-4 text-jj-yellow transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                      </MagneticButton>
                    </div>
                  </div>

                  {/* Right Column (5 Cols on desktop): Performance Metrics Breakdown Table */}
                  <div className={`lg:col-span-5 resp-service-metrics-col ${srv.borderColor} space-y-2.5 sm:space-y-3`}>
                    <div className="text-[11px] sm:text-xs font-bold tracking-wider uppercase opacity-70 mb-2">
                      KEY PERFORMANCE METRICS
                    </div>
                    {srv.metricsTable.map((row, rIdx) => (
                      <div key={rIdx} className={`flex items-center justify-between gap-3 text-xs py-2.5 sm:py-3 border-b ${srv.borderColor}`}>
                        <span className="font-semibold tracking-normal opacity-80 uppercase text-[11px] sm:text-xs shrink-0">{row.label}</span>
                        <span className="font-bold tracking-normal text-right text-xs sm:text-[13px]">{row.value}</span>
                      </div>
                    ))}
                  </div>

                </div>
              </div>

            </div>
          );
        })}
      </div>
    </section>
  );
}
