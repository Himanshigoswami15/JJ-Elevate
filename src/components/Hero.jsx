import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, Volume2, VolumeX, Sparkles, TrendingUp, Hotel, Compass } from 'lucide-react';
import MagneticButton from './motion/MagneticButton';

gsap.registerPlugin(ScrollTrigger);

export default function Hero({ onOpenConsultation }) {
  const sectionRef = useRef(null);
  const headlineRef = useRef(null);
  const line1Ref = useRef(null);
  const line2Ref = useRef(null);
  const videoFrameRef = useRef(null);
  const videoRef = useRef(null);
  const subtextRef = useRef(null);
  const ctaRef = useRef(null);
  const statsRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.muted = false;
      setIsMuted(false);
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = (e) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  };

  // Ensure music is unmuted and plays automatically
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = false;
    video.volume = 1;
    const playPromise = video.play();

    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsMuted(false);
        })
        .catch(() => {
          // If browser restricts unmuted autoplay before first user gesture,
          // play with temporary mute and immediately unmute on first gesture anywhere on the page
          video.muted = true;
          setIsMuted(true);
          video.play().catch(() => {});

          const handleFirstInteraction = () => {
            if (videoRef.current) {
              videoRef.current.muted = false;
              videoRef.current.volume = 1;
              setIsMuted(false);
              videoRef.current.play().catch(() => {});
            }
            window.removeEventListener('click', handleFirstInteraction);
            window.removeEventListener('touchstart', handleFirstInteraction);
            window.removeEventListener('keydown', handleFirstInteraction);
            window.removeEventListener('scroll', handleFirstInteraction);
          };

          window.addEventListener('click', handleFirstInteraction, { once: true, passive: true });
          window.addEventListener('touchstart', handleFirstInteraction, { once: true, passive: true });
          window.addEventListener('keydown', handleFirstInteraction, { once: true, passive: true });
          window.addEventListener('scroll', handleFirstInteraction, { once: true, passive: true });
        });
    }
  }, []);

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
          data-cursor={isPlaying ? "PAUSE" : "PLAY"}
          onClick={togglePlay}
          className="mb-8 sm:mb-12 relative group w-full flex flex-col items-center will-change-transform cursor-pointer [transform-style:preserve-3d]"
        >
          <div className="resp-hero-video-frame relative bg-jj-dark overflow-hidden shadow-[0_25px_80px_-12px_rgba(0,0,0,0.15)] border-2 border-black/5 hover:shadow-[0_30px_90px_-12px_rgba(255,30,86,0.18)] transition-all duration-500 rounded-2xl group-hover:scale-[1.01]">
            {/* HTML5 Autoplay JJ Elevate Portfolio Video Loop */}
            <video
              ref={videoRef}
              autoPlay
              loop
              muted={isMuted}
              playsInline
              preload="auto"
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              className="w-full h-full object-cover"
            >
              <source
                src="/videos/jj-elevate-portfolio.mp4"
                type="video/mp4"
              />
            </video>

            {/* Top Right Sound Toggle */}
            <div className="absolute top-3.5 right-3.5 sm:top-4 sm:right-4 z-20">
              <button
                type="button"
                onClick={toggleMute}
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black/60 hover:bg-black/85 backdrop-blur-md border border-white/20 flex items-center justify-center text-white transition-all duration-300 shadow-xl active:scale-95"
                title={isMuted ? "Unmute Audio" : "Mute Audio"}
                aria-label={isMuted ? "Unmute Audio" : "Mute Audio"}
              >
                {isMuted ? (
                  <VolumeX className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-white/90" />
                ) : (
                  <Volume2 className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-[#FFDE00]" />
                )}
              </button>
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
