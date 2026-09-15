import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, Play, Sparkles, TrendingUp, Hotel, Compass } from 'lucide-react';
import MagneticButton from './motion/MagneticButton';

gsap.registerPlugin(ScrollTrigger);

export default function Hero({ onOpenConsultation }) {
  const sectionRef = useRef(null);
  const headlineRef = useRef(null);
  const line1Ref = useRef(null);
  const line2Ref = useRef(null);
  const videoFrameRef = useRef(null);
  const subtextRef = useRef(null);
  const ctaRef = useRef(null);
  const statsRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // Video frame scales in smoothly
      tl.fromTo(
        videoFrameRef.current,
        { scale: 0.9, opacity: 0, y: 30 },
        { scale: 1, opacity: 1, y: 0, duration: 1.2 }
      )
      // Headline line 1: natural subtle rise
      .fromTo(
        line1Ref.current,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.65, ease: 'power2.out' },
        '-=0.5'
      )
      // Headline line 2: natural subtle rise
      .fromTo(
        line2Ref.current,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.65, ease: 'power2.out' },
        '-=0.5'
      )
      // Subtext fades in
      .fromTo(
        subtextRef.current,
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.55, ease: 'power2.out' },
        '-=0.4'
      )
      // CTA buttons
      .fromTo(
        ctaRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.7 },
        '-=0.4'
      )
      // Stats row
      .fromTo(
        statsRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.7 },
        '-=0.3'
      );

      // Interactive 3D mouse parallax tilt on the video frame
      const isDesktop = window.innerWidth >= 1024 && !('ontouchstart' in window);
      if (isDesktop && videoFrameRef.current && sectionRef.current) {
        const el = videoFrameRef.current;
        const setRotX = gsap.quickTo(el, 'rotationX', { duration: 0.5, ease: 'power2.out' });
        const setRotY = gsap.quickTo(el, 'rotationY', { duration: 0.5, ease: 'power2.out' });
        const setY = gsap.quickTo(el, 'y', { duration: 0.5, ease: 'power2.out' });

        const handleMouseMove = (e) => {
          const rect = sectionRef.current.getBoundingClientRect();
          const xNorm = (e.clientX - rect.left) / rect.width - 0.5;
          const yNorm = (e.clientY - rect.top) / rect.height - 0.5;

          setRotX(-yNorm * 7);
          setRotY(xNorm * 9);
          setY(-yNorm * 5);
        };

        const handleMouseLeave = () => {
          setRotX(0);
          setRotY(0);
          setY(0);
        };

        const currentSection = sectionRef.current;
        currentSection.addEventListener('mousemove', handleMouseMove, { passive: true });
        currentSection.addEventListener('mouseleave', handleMouseLeave);

        return () => {
          currentSection.removeEventListener('mousemove', handleMouseMove);
          currentSection.removeEventListener('mouseleave', handleMouseLeave);
        };
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="hero" className="relative pt-32 pb-28 lg:pt-40 lg:pb-36 overflow-hidden bg-jj-bg [perspective:1200px]">

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center flex flex-col items-center">
        
        {/* Marketing Video Frame with 3D Tilt */}
        <div 
          ref={videoFrameRef} 
          data-cursor="PLAY"
          className="mb-8 sm:mb-12 relative group w-full flex flex-col items-center will-change-transform cursor-pointer [transform-style:preserve-3d]"
        >
          <div className="resp-hero-video-frame relative bg-jj-dark overflow-hidden shadow-[0_25px_80px_-12px_rgba(0,0,0,0.15)] border-2 border-black/5 hover:shadow-[0_30px_90px_-12px_rgba(255,30,86,0.18)] transition-all duration-500 rounded-2xl group-hover:scale-[1.01]">
            {/* HTML5 Autoplay Resort Marketing Video Loop */}
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
              poster="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80"
            >
              <source
                src="https://assets.mixkit.co/videos/preview/mixkit-luxury-resort-swimming-pool-and-palm-trees-41487-large.mp4"
                type="video/mp4"
              />
            </video>

            {/* Video Overlay & Play Badge */}
            <div className="absolute inset-0 bg-gradient-to-t from-jj-dark/60 via-transparent to-transparent flex items-center justify-center">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-jj-pink text-white rounded-full flex items-center justify-center shadow-2xl transform group-hover:scale-110 transition-transform duration-500">
                <Play className="w-5 h-5 sm:w-6 sm:h-6 fill-white ml-0.5" />
              </div>
            </div>
          </div>
        </div>

        {/* Centered Large Headline with Clip-Path Reveal */}
        <div ref={headlineRef} className="max-w-4xl space-y-1 mb-6 sm:mb-8 will-change-transform">
          <h1 className="resp-hero-title font-body font-extrabold text-jj-dark tracking-tight">
            <span ref={line1Ref} className="block will-change-transform">
              Digital growth for
            </span>
            <span ref={line2Ref} className="block will-change-transform">
              <span className="text-jj-pink">noteworthy</span> hospitality brands
            </span>
          </h1>
        </div>

        {/* Subtext */}
        <p ref={subtextRef} className="resp-subtext text-jj-dark/70 font-normal max-w-2xl leading-relaxed mb-8 sm:mb-12">
          We help hotels, luxury resorts, boutique villas, and travel brands attract high-intent guests, scale direct bookings, and build iconic digital presences.
        </p>

        {/* Action CTAs */}
        <div ref={ctaRef} className="resp-btn-group flex items-center justify-center mb-12 sm:mb-16">
          <MagneticButton
            onClick={onOpenConsultation}
            dataCursor="TALK"
            className="resp-btn-action group bg-jj-pink text-white font-body font-bold tracking-wider hover:bg-jj-dark rounded-full shadow-xl shadow-jj-pink/20 transition-all duration-500 flex items-center"
          >
            <span className="flex items-center">
              Let's grow together
              <ArrowUpRight className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </span>
          </MagneticButton>

          <MagneticButton
            dataCursor="WORK"
            className="resp-btn-action bg-transparent border-2 border-jj-dark/20 text-jj-dark font-body font-bold tracking-wider hover:bg-jj-dark hover:text-white hover:border-jj-dark rounded-full transition-all duration-500 flex items-center"
          >
            <span>View our work</span>
          </MagneticButton>
        </div>

        {/* Micro Stats Row */}
        <div ref={statsRef} className="pt-8 border-t border-jj-dark/8 grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-12 w-full max-w-2xl">
          <div className="flex flex-col items-center">
            <span className="font-display text-3xl sm:text-4xl font-extrabold text-jj-pink">120+</span>
            <span className="text-xs uppercase font-bold text-jj-dark/50 tracking-wider mt-1">Hotels & Resorts</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="font-display text-3xl sm:text-4xl font-extrabold text-jj-dark">30-40%</span>
            <span className="text-xs uppercase font-bold text-jj-dark/50 tracking-wider mt-1">Direct Bookings</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="font-display text-3xl sm:text-4xl font-extrabold text-jj-pink">95%</span>
            <span className="text-xs uppercase font-bold text-jj-dark/50 tracking-wider mt-1">Client Retention</span>
          </div>
        </div>

      </div>
    </section>
  );
}
