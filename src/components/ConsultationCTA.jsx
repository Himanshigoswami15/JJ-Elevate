import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, TrendingUp, Mail, ShieldCheck } from 'lucide-react';
import MagneticButton from './motion/MagneticButton';

gsap.registerPlugin(ScrollTrigger);

export default function ConsultationCTA({ onOpenConsultation }) {
  const sectionRef = useRef(null);
  const headlineRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        headlineRef.current.querySelectorAll('.cta-line'),
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%'
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-32 bg-jj-dark text-white relative overflow-hidden">
      {/* Background Shapes */}
      <div className="absolute -top-24 -right-24 w-[600px] h-[600px] bg-jj-pink/20 blob-mask-1 blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-24 -left-24 w-[500px] h-[500px] bg-jj-yellow/15 blob-mask-2 blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-jj-pink/10 border border-jj-pink/30 text-jj-pink text-xs font-bold uppercase tracking-widest mb-6 rounded-full">
          <TrendingUp className="w-4 h-4 text-jj-yellow" />
          <span>START YOUR DIRECT GROWTH JOURNEY</span>
        </div>

        <div ref={headlineRef}>
          <h2 className="clamp-hero font-display font-extrabold tracking-tight uppercase max-w-4xl mx-auto leading-[0.9]">
            <span className="block cta-line">READY TO <span className="text-jj-pink">ELEVATE</span></span>
            <span className="block cta-line text-white">YOUR HOTEL BRAND?</span>
          </h2>
        </div>

        <p className="text-xl sm:text-2xl text-white/80 max-w-2xl mx-auto font-light leading-relaxed mt-6">
          Let's build a high-conversion digital growth engine that reduces OTA commissions and turns traveler attention into direct revenue.
        </p>

        {/* Magnetic CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-10">
          <MagneticButton
            onClick={onOpenConsultation}
            dataCursor="TALK"
            className="w-full sm:w-auto px-10 py-5 bg-jj-pink text-white font-display text-xl font-bold uppercase tracking-wider hover:bg-jj-yellow hover:text-jj-dark shadow-2xl shadow-jj-pink/40"
          >
            <span className="flex items-center gap-3">
              <span>BOOK A FREE CONSULTATION</span>
              <ArrowUpRight className="w-6 h-6" />
            </span>
          </MagneticButton>

          <MagneticButton
            dataCursor="EMAIL"
            className="w-full sm:w-auto px-8 py-5 border-2 border-white/30 text-white font-display text-lg font-bold uppercase tracking-wider hover:bg-white hover:text-jj-dark"
          >
            <a href="mailto:info@jjelevate.com" className="flex items-center gap-2">
              <Mail className="w-5 h-5 text-jj-pink" />
              <span>EMAIL INFO@JJELEVATE.COM</span>
            </a>
          </MagneticButton>
        </div>

        {/* Guarantees */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-wrap items-center justify-center gap-8 text-xs text-white/60 uppercase tracking-widest font-bold">
          <span className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-jj-pink" /> Free 30-Min Strategy Audit</span>
          <span className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-jj-yellow" /> Zero Obligation</span>
          <span className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-jj-pink" /> Direct ROI Projections</span>
        </div>

      </div>
    </section>
  );
}
