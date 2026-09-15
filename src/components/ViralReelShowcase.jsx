import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Eye, 
  Heart, 
  MessageCircle, 
  Share2, 
  Volume2, 
  VolumeX, 
  Play, 
  Pause,
  Plane,
  Building2
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function ViralReelShowcase({
  videoSrc = 'https://assets.mixkit.co/videos/preview/mixkit-luxury-resort-swimming-pool-and-palm-trees-41487-large.mp4',
  poster = '/images/luxury_property_reel.jpg',
  caption = 'Private overwater infinity pool villa at sunset. Experience bespoke luxury. #luxuryresort #maldives #directbooking #hospitality',
  author = 'JJ Elevate · Luxury Hospitality',
  views = '20M',
  initialLikes = '5.1M',
  comments = '12.1K',
}) {
  const sectionRef = useRef(null);
  const reelCardRef = useRef(null);
  const leftElementRef = useRef(null);
  const rightElementRef = useRef(null);
  const videoRef = useRef(null);

  const [currentVideo] = useState(videoSrc);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(initialLikes);

  // Play / Pause Toggle
  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  // Sound Toggle
  const toggleMute = (e) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  };

  // Like Toggle
  const handleLike = (e) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
    setLikeCount(isLiked ? initialLikes : '5.2M');
  };

  // GSAP Animations
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Main Center Reel Entrance
      gsap.fromTo(
        reelCardRef.current,
        { scale: 0.93, y: 40, opacity: 0 },
        {
          scale: 1,
          y: 0,
          opacity: 1,
          duration: 1.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          },
        }
      );

      // Left 3D Marketing Element Entrance & Floating Motion
      if (leftElementRef.current) {
        gsap.fromTo(
          leftElementRef.current,
          { x: -50, opacity: 0, scale: 0.88 },
          {
            x: 0,
            opacity: 1,
            scale: 1,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 70%',
            },
          }
        );

        gsap.to(leftElementRef.current, {
          y: -14,
          rotate: -2.5,
          duration: 3.4,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      }

      // Right 3D Marketing Element Entrance & Floating Motion
      if (rightElementRef.current) {
        gsap.fromTo(
          rightElementRef.current,
          { x: 50, opacity: 0, scale: 0.88 },
          {
            x: 0,
            opacity: 1,
            scale: 1,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 70%',
            },
          }
        );

        gsap.to(rightElementRef.current, {
          y: 14,
          rotate: 2.5,
          duration: 3.8,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: 0.2,
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="viral-reels"
      className="relative w-full bg-[#FAF9F6] overflow-hidden select-none"
    >
      {/* =========================================================================
          FLOATING BACKGROUND DESIGN:
          - Starts exactly from the MID of the vertical reel screen
          - Sleek Black background (#0B0C10) with floating border & depth shadow
          - Pure 3D Marketing Elements in Theme Colors (Gold, White, Obsidian Black - Zero Pink)
          - Center Luxury Properties Reel
         ========================================================================= */}
      <div className="resp-reel-container relative w-full flex flex-col md:flex-row items-center justify-center">
        
        {/* The Floating Wave Background in Exact Brand Logo Color (#FF1E56) */}
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
          <svg
            viewBox="0 0 1440 720"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full object-cover"
            preserveAspectRatio="none"
          >
            <defs>
              {/* Vibrant Brand Logo Color Gradient matching the user's shared button */}
              <linearGradient id="waveBodyFill" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FF235B" />
                <stop offset="35%" stopColor="#FF1E56" />
                <stop offset="70%" stopColor="#E9124A" />
                <stop offset="100%" stopColor="#D00B3F" />
              </linearGradient>

              {/* Luminous floating border glow gradient (White & Luxury Gold) */}
              <linearGradient id="waveBorderGlow" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgba(255, 255, 255, 0.45)" />
                <stop offset="25%" stopColor="rgba(255, 255, 255, 0.95)" />
                <stop offset="50%" stopColor="rgba(255, 222, 0, 1.0)" />
                <stop offset="75%" stopColor="rgba(255, 255, 255, 0.95)" />
                <stop offset="100%" stopColor="rgba(255, 255, 255, 0.45)" />
              </linearGradient>

            </defs>

            {/* Floating Wave Body (Starts at mid-height of reel: y=310) */}
            <path
              d="M 0,220 C 220,220 460,310 720,310 C 980,310 1130,190 1270,190 C 1350,190 1410,215 1440,225 L 1440,720 L 0,720 Z"
              fill="url(#waveBodyFill)"
            />

            {/* Glowing Floating Border Along the Wave Crest */}
            <path
              d="M 0,220 C 220,220 460,310 720,310 C 980,310 1130,190 1270,190 C 1350,190 1410,215 1440,225"
              fill="none"
              stroke="url(#waveBorderGlow)"
              strokeWidth="3.5"
            />
          </svg>

          {/* Ambient inner glows inside the background area in vibrant logo colors */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-[850px] max-w-full h-[380px] bg-gradient-to-tr from-white/20 via-[#FFDE00]/15 to-transparent rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] max-w-full h-[550px] bg-[#FF1E56]/20 rounded-full blur-[140px] pointer-events-none" />
        </div>

        {/* Content Container: Left 3D Airplane + Center Luxury Reel + Right 3D Hotel */}
        <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex items-center justify-center">
          
          {/* LEFT ELEMENT — Simple White Airplane Icon */}
          <div
            ref={leftElementRef}
            className="hidden md:flex flex-col items-center gap-4 absolute left-2 lg:left-6 xl:left-10 top-[52%] -translate-y-1/2 pointer-events-none select-none z-20 will-change-transform"
          >
            <Plane className="w-40 h-40 lg:w-44 lg:h-44 xl:w-52 xl:h-52 text-white" strokeWidth={1} />
          </div>

          {/* =====================================================================
              CENTER LUXURY PROPERTIES REEL CARD
              - Straddles across the mid-height of the floating wave border
              - Top half in the off-white area, bottom half in the brand wave
              - Clean edge-to-edge vertical reel with high-res hospitality footage
             ===================================================================== */}
          <div
            ref={reelCardRef}
            className="relative flex-shrink-0 z-20 will-change-transform my-4"
          >
            {/* Ambient Backlight Aura */}
            <div className="absolute -inset-3 bg-black/50 rounded-[38px] blur-2xl pointer-events-none" />

            {/* Clean Edge-to-Edge Vertical Video Reel Card (No Phone Bezel) */}
            <div
              onClick={togglePlay}
              data-cursor={isPlaying ? "PAUSE" : "PLAY"}
              className="resp-reel-card relative aspect-[9/16] overflow-hidden bg-black shadow-[0_30px_90px_-15px_rgba(0,0,0,0.9),0_0_40px_rgba(0,0,0,0.45)] border border-white/30 group cursor-pointer select-none"
            >
              {/* Luxury Property Video / High-Res Poster */}
              <div className="absolute inset-0 w-full h-full bg-black">
                <video
                  ref={videoRef}
                  key={currentVideo}
                  src={currentVideo}
                  poster={poster}
                  autoPlay
                  loop
                  muted={isMuted}
                  playsInline
                  preload="auto"
                  className="w-full h-full object-cover"
                />
                {/* Subtle Cinematic Vignette for maximum text readability */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-transparent via-55% to-black/90 pointer-events-none" />
              </div>

              {/* Top Bar: Sound Toggle Button */}
              <div className="relative z-30 pt-4 px-4 flex justify-end pointer-events-none">
                <button
                  onClick={toggleMute}
                  className="pointer-events-auto w-8 h-8 rounded-full bg-black/60 backdrop-blur-md border border-white/25 flex items-center justify-center text-white/90 hover:text-white hover:bg-black/80 transition-all shadow-lg active:scale-90"
                  title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
                >
                  {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-[#FFDE00]" />}
                </button>
              </div>

              {/* Center Play/Pause Micro Indicator */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30">
                <div className="w-13 h-13 rounded-full bg-black/70 backdrop-blur-md border border-white/25 flex items-center justify-center text-white shadow-2xl scale-95 group-hover:scale-100 transition-transform">
                  {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 fill-white ml-0.5" />}
                </div>
              </div>

              {/* Right Action Rail (Sociallyin / TikTok Style) */}
              <div className="absolute right-3 bottom-14 flex flex-col items-center gap-3.5 z-30">
                
                {/* Views Counter */}
                <div className="flex flex-col items-center gap-0.5">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-xl border border-white/25 flex items-center justify-center text-white shadow-xl transition-all">
                    <Eye className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-bold text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">
                    {views}
                  </span>
                </div>

                {/* Like Button */}
                <button
                  onClick={handleLike}
                  className="flex flex-col items-center gap-0.5 group/btn transition-transform active:scale-85"
                  title="Like Reel"
                >
                  <div
                    className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full backdrop-blur-xl border flex items-center justify-center transition-all duration-300 shadow-xl ${
                      isLiked
                        ? 'bg-[#FF1E56] text-white scale-110 shadow-[0_0_18px_rgba(255,30,86,0.95)] border-[#FF1E56]'
                        : 'bg-white/20 hover:bg-white/30 text-white border-white/25'
                    }`}
                  >
                    <Heart
                      className={`w-4 h-4 transition-transform ${
                        isLiked ? 'fill-white stroke-white scale-110' : ''
                      }`}
                    />
                  </div>
                  <span className="text-[10px] font-bold text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">
                    {likeCount}
                  </span>
                </button>

                {/* Comments Button */}
                <div className="flex flex-col items-center gap-0.5">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-xl border border-white/25 flex items-center justify-center text-white shadow-xl transition-all">
                    <MessageCircle className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-bold text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">
                    {comments}
                  </span>
                </div>

                {/* Share Button */}
                <div className="flex flex-col items-center gap-0.5">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-xl border border-white/25 flex items-center justify-center text-white shadow-xl transition-all">
                    <Share2 className="w-4 h-4" />
                  </div>
                </div>

              </div>

              {/* Bottom Property Info & Caption */}
              <div className="absolute bottom-0 left-0 right-0 z-30 pb-3.5 px-4 pr-14 text-left">
                {/* Property / Agency Handle */}
                <p className="text-xs font-extrabold text-white tracking-tight drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)] mb-0.5">
                  {author}
                </p>

                {/* Caption */}
                <p className="text-[11px] text-white/90 leading-snug drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)] line-clamp-2">
                  {caption}
                </p>
              </div>

              {/* Video Playback Progress Bar */}
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/25 z-40 pointer-events-none">
                <div className="h-full bg-gradient-to-r from-[#FFDE00] to-white w-2/5 rounded-full shadow-[0_0_8px_rgba(255,222,0,0.9)]" />
              </div>

            </div>
          </div>

          {/* RIGHT ELEMENT — Simple White Hotel Icon */}
          <div
            ref={rightElementRef}
            className="hidden md:flex flex-col items-center gap-4 absolute right-2 lg:right-6 xl:right-10 top-[52%] -translate-y-1/2 pointer-events-none select-none z-20 will-change-transform"
          >
            <Building2 className="w-40 h-40 lg:w-44 lg:h-44 xl:w-52 xl:h-52 text-white" strokeWidth={1} />
          </div>

        </div>

        {/* Mobile View: Simple White Icons Below Reel */}
        <div className="md:hidden flex items-center justify-center gap-10 mt-5 px-4 relative z-10">
          <div className="flex flex-col items-center">
            <Plane className="w-11 h-11 text-white/90" strokeWidth={1.2} />
          </div>
          <div className="flex flex-col items-center">
            <Building2 className="w-11 h-11 text-white/90" strokeWidth={1.2} />
          </div>
        </div>

      </div>
    </section>
  );
}
