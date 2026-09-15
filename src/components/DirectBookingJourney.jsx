import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Search, Compass, ShieldCheck, CreditCard, HeartHandshake, ArrowRight } from 'lucide-react';
import MagneticButton from './motion/MagneticButton';

gsap.registerPlugin(ScrollTrigger);

export default function DirectBookingJourney({ onOpenConsultation }) {
  const [activeStep, setActiveStep] = useState(0);
  const sectionRef = useRef(null);

  const steps = [
    {
      num: '01',
      title: 'SEARCH',
      sub: 'Intent-Driven Discovery',
      icon: Search,
      copy: 'We capture high-intent travelers using high-ROAS Google Ads, Google Hotel Search, and targeted SEO for terms like "luxury heritage stay in Rajasthan".',
      badge: 'Zero Wasted Impressions'
    },
    {
      num: '02',
      title: 'DISCOVER',
      sub: 'Scroll-Stopping Visuals',
      icon: Compass,
      copy: 'High-speed, mobile-optimized website landing pages display cinematic video tours, villa amenities, and room galleries that instantly captivate guests.',
      badge: 'Sub-Second Page Load'
    },
    {
      num: '03',
      title: 'TRUST',
      sub: 'Best Rate Guarantee',
      icon: ShieldCheck,
      copy: 'We display transparent direct rate incentives, verified tripadvisor reviews, and instant WhatsApp inquiry widgets that build total booking confidence.',
      badge: 'Rate Parity Protection'
    },
    {
      num: '04',
      title: 'BOOK',
      sub: 'Frictionless Checkout',
      icon: CreditCard,
      copy: 'Integrated 2-click booking engine with local payment gateways (UPI, Credit Card, NetBanking) and instant AI confirmation desk.',
      badge: 'Commission Free Revenue'
    },
    {
      num: '05',
      title: 'RETURN',
      sub: 'Automated Guest Retention',
      icon: HeartHandshake,
      copy: 'Automated post-stay email nurture and loyalty WhatsApp offers turn 1-time guests into lifelong repeat direct bookers.',
      badge: 'Maximized Lifetime Value'
    }
  ];

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || window.innerWidth < 768) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: '+=250%',
        pin: true,
        scrub: 0.5,
        onUpdate: (self) => {
          const index = Math.min(
            steps.length - 1,
            Math.floor(self.progress * steps.length)
          );
          setActiveStep(index);
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [steps.length]);

  return (
    <section ref={sectionRef} className="py-28 bg-jj-cream text-jj-dark relative min-h-screen flex flex-col justify-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <span className="text-xs font-extrabold uppercase tracking-[0.2em] text-jj-pink block">
            PINNED SCROLL STORYTELLING
          </span>
          <h2 className="clamp-heading font-display font-extrabold text-jj-dark tracking-tight uppercase">
            TURN SEARCHES <span className="text-jj-pink">INTO BOOKINGS.</span>
          </h2>
          <p className="text-jj-dark/70 text-base sm:text-lg">
            Scroll to experience our 5-stage direct revenue engine.
          </p>
        </div>

        {/* Step Indicator Bar */}
        <div className="grid grid-cols-5 gap-2 mb-10 border-b-2 border-jj-dark/10 pb-6">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            const isCurrent = activeStep === idx;
            return (
              <button
                key={idx}
                onClick={() => setActiveStep(idx)}
                className={`flex flex-col items-center text-center p-3 transition-all duration-300 ${
                  isCurrent
                    ? 'border-b-4 border-jj-pink text-jj-pink bg-jj-pink/5'
                    : 'text-jj-dark/40 hover:text-jj-dark'
                }`}
              >
                <div className={`w-10 h-10 flex items-center justify-center font-bold mb-2 transition-all duration-300 ${
                  isCurrent ? 'bg-jj-pink text-white scale-110 shadow-lg shadow-jj-pink/30' : 'bg-jj-dark/10 text-jj-dark'
                }`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-xs font-bold block">{step.num}</span>
                <span className="font-display text-xs sm:text-sm font-bold uppercase tracking-wider">{step.title}</span>
              </button>
            );
          })}
        </div>

        {/* Active Stage Content Card */}
        <div className="bg-jj-dark text-white p-8 sm:p-12 shadow-2xl border-2 border-jj-dark grid grid-cols-1 lg:grid-cols-12 gap-8 items-center transition-all duration-500">
          <div className="lg:col-span-8 space-y-6">
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-jj-pink px-3 py-1 bg-white/10 uppercase">
                STAGE {steps[activeStep].num} / 05
              </span>
              <span className="text-xs font-bold text-jj-dark uppercase tracking-widest bg-jj-pink text-white px-2.5 py-1">
                {steps[activeStep].badge}
              </span>
            </div>

            <h3 className="font-display text-3xl sm:text-5xl font-extrabold uppercase text-white tracking-tight">
              {steps[activeStep].title}: <span className="text-jj-pink">{steps[activeStep].sub}</span>
            </h3>

            <p className="text-white/80 text-lg font-light leading-relaxed max-w-2xl">
              {steps[activeStep].copy}
            </p>

            <div className="pt-4 flex items-center gap-4">
              <MagneticButton
                onClick={onOpenConsultation}
                dataCursor="OPTIMIZE"
                className="px-6 py-3 bg-jj-pink text-white font-display text-sm font-bold uppercase tracking-wider hover:bg-jj-blue shadow-lg shadow-jj-pink/30"
              >
                <span className="flex items-center gap-2">
                  <span>OPTIMIZE THIS STAGE</span>
                  <ArrowRight className="w-4 h-4" />
                </span>
              </MagneticButton>
            </div>
          </div>

          <div className="lg:col-span-4 flex flex-col items-center justify-center p-8 bg-white/5 border border-white/10 text-center">
            <span className="text-xs font-bold text-jj-pink uppercase tracking-wider block mb-2">FUNNEL REVENUE SHARE</span>
            <div className="font-display text-4xl sm:text-5xl font-extrabold text-white">
              {activeStep === 0 && '100% REACH'}
              {activeStep === 1 && '68% ENGAGEMENT'}
              {activeStep === 2 && '45% INTENT'}
              {activeStep === 3 && '28% DIRECT BOOK'}
              {activeStep === 4 && '42% REPEAT STAYS'}
            </div>
            <p className="text-xs text-white/50 mt-2">Driven by JJ Elevate Growth Protocol</p>
          </div>
        </div>

      </div>
    </section>
  );
}
