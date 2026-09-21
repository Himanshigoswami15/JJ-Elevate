import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowUpRight, 
  ArrowRight,
  CheckCircle2, 
  Award, 
  Compass, 
  TrendingUp, 
  Video, 
  Users, 
  Target, 
  ShieldCheck, 
  Building2, 
  Calendar,
  Layers,
  Zap,
  PhoneCall,
  Search,
  MessageSquare,
  Eye,
  Heart,
  ChevronLeft,
  ChevronRight,
  Star,
  Quote,
  Linkedin,
  Instagram,
  Laptop,
  UtensilsCrossed,
  Sparkles,
  Play,
  Check
} from 'lucide-react';
import MagneticButton from './motion/MagneticButton';
import ClientsMarquee from './ClientsMarquee';
import NewsletterCTA from './NewsletterCTA';
import CoFoundersAnimatedShowcase from './CoFoundersAnimatedShowcase';
import DreamTeam from './DreamTeam';

/* =========================================================================
   AboutPage — Sociallyin-inspired High-Impact Agency Architecture
   Content & Data: Authentically extracted from www.jjelevate.com
   Theme: JJ Elevate Official Luxury Brand System
   - Canvas: Warm Luxury Off-White (#FAF9F6) & Crisp Pure White (#FFFFFF)
   - Brand Accents: Signature Crimson (#FF1E56), Luxury Gold (#FFDE00), Obsidian Dark (#0B0C10)
   ========================================================================= */

// 3D Bullseye Target with Teal Dart (Signature Sociallyin decorative element)
function DartTarget({ className = "", rotation = "0deg" }) {
  return (
    <div className={`relative select-none pointer-events-none ${className}`} style={{ transform: `rotate(${rotation})` }}>
      {/* 3D Bullseye Target */}
      <svg width="74" height="74" viewBox="0 0 74 74" fill="none" className="filter drop-shadow-xl overflow-visible">
        {/* Soft Drop Shadow */}
        <circle cx="37" cy="39" r="31" fill="rgba(0,0,0,0.12)" />
        {/* Outer Crimson Ring */}
        <circle cx="37" cy="37" r="33" fill="#FF1E56" stroke="#FFFFFF" strokeWidth="3" />
        {/* White Ring */}
        <circle cx="37" cy="37" r="24" fill="#FFFFFF" />
        {/* Middle Crimson Ring */}
        <circle cx="37" cy="37" r="16" fill="#FF1E56" />
        {/* Inner White Ring */}
        <circle cx="37" cy="37" r="9.5" fill="#FFFFFF" />
        {/* Center Bullseye */}
        <circle cx="37" cy="37" r="4.5" fill="#FF1E56" />
        {/* 3D Gloss Curve */}
        <ellipse cx="37" cy="18" rx="20" ry="8" fill="#FFFFFF" fillOpacity="0.25" />
      </svg>
      {/* 3D Dart Stuck into Center */}
      <svg
        width="54"
        height="54"
        viewBox="0 0 54 54"
        fill="none"
        className="absolute -top-4 -left-4 filter drop-shadow-md overflow-visible"
        style={{ transform: "rotate(-25deg)" }}
      >
        {/* Dart Body Shaft */}
        <path d="M14 14 L37 37" stroke="#334155" strokeWidth="3.5" strokeLinecap="round" />
        {/* Metallic Barrel */}
        <path d="M26 26 L35 35" stroke="#94A3B8" strokeWidth="5" strokeLinecap="round" />
        {/* Dart Point Tip */}
        <path d="M35 35 L41 41" stroke="#CBD5E1" strokeWidth="2.5" strokeLinecap="round" />
        {/* Teal/Cyan Flights Feathers */}
        <path d="M14 14 L5 8 L9 18 Z" fill="#06B6D4" stroke="#0891B2" strokeWidth="1.2" />
        <path d="M14 14 L18 5 L8 9 Z" fill="#22D3EE" stroke="#0891B2" strokeWidth="1.2" />
        <path d="M14 14 L9 22 L18 18 Z" fill="#0891B2" stroke="#0e7490" strokeWidth="1.2" />
      </svg>
    </div>
  );
}



export default function AboutPage({ onOpenConsultation, onNavigateHome }) {
  // Active Why Choose Us tab (0 to 4)
  const [activeChooseTab, setActiveChooseTab] = useState(0);

  // Active category filter for What We Do Bento Showcase
  const [activeServiceFilter, setActiveServiceFilter] = useState('all');

  const serviceFilterTabs = [
    { id: 'all', label: 'All Disciplines', count: '08' },
    { id: 'acquisition', label: 'Guest Acquisition', count: '03' },
    { id: 'tech', label: 'Direct Booking Tech', count: '02' },
    { id: 'creative', label: 'Creative & Retention', count: '03' }
  ];

  // 8 Core Hospitality Services Suite
  const whatWeDoServices = [
    {
      id: '01',
      title: 'Hotel Social Media & Luxury Influencers',
      category: 'Brand & Social Reach',
      group: 'acquisition',
      icon: Instagram,
      description: 'Curated high-impact Instagram Reels, luxury creator stays, and guest storytelling that turn followers into profitable direct reservations.',
      deliverables: ['4K Drone & Villa Reels', 'Creator Stay Coordination', 'Direct Booking Bio Funnels']
    },
    {
      id: '02',
      title: 'High-Intent Hotel Ads & PPC',
      category: 'Performance Marketing',
      group: 'acquisition',
      icon: Target,
      description: 'Google Hotel Ads, Meta Performance Max, and dynamic retargeting capturing affluent travelers searching for luxury stays.',
      deliverables: ['Google Hotel Ads Setup', 'Meta Retargeting Campaigns', 'Audience Segmentation']
    },
    {
      id: '03',
      title: 'Hotel & Resort SEO Dominance',
      category: 'Search Architecture',
      group: 'acquisition',
      icon: Search,
      description: 'Technical and local search architecture elevating properties to Position #1 for high-value destination search queries.',
      deliverables: ['Destination Keyword Strategy', 'Google Business Profile Optimization', 'Technical Speed & Core Web Vitals']
    },
    {
      id: '04',
      title: 'Hospitality Websites & Direct Booking Engines',
      category: 'Direct Booking Tech',
      group: 'tech',
      icon: Laptop,
      description: 'Custom-engineered, ultra-fast websites integrated with your PMS and payment gateway for seamless, 0% commission direct reservations.',
      deliverables: ['Cloudbeds / Opera / Sirvoy Integration', 'Sub-Second Mobile Checkout', 'Zero Commission Engine']
    },
    {
      id: '05',
      title: 'OTA Optimization & Direct Shift',
      category: 'Revenue Management',
      group: 'tech',
      icon: TrendingUp,
      description: 'Master distribution on Booking.com, Agoda, and MakeMyTrip while implementing strict rate parity and direct booking incentives.',
      deliverables: ['Strict Rate Parity Audits', 'Listing Conversion Copy', 'Direct-Booking Perks Strategy']
    },
    {
      id: '06',
      title: 'Cinematic 4K Drone & Villa Media',
      category: 'Creative Production',
      group: 'creative',
      icon: Video,
      description: 'High-bitrate 4K drone videography, architectural villa walkthroughs, and sensory visual assets capturing luxury atmospheres.',
      deliverables: ['4K 60FPS Drone Cinematography', 'Suite & Villa Architectural Tours', 'Social Video Cutdowns']
    },
    {
      id: '07',
      title: 'Restaurant & F&B Culinary Marketing',
      category: 'Dining & Gastronomy',
      group: 'creative',
      icon: UtensilsCrossed,
      description: 'Sensory gastronomy visuals, signature chef reels, and table reservation funnels that pack dining rooms and rooftop lounges.',
      deliverables: ['Signature Dish Visuals', 'Chef & Cocktail Reels', 'Table Reservation Funnels']
    },
    {
      id: '08',
      title: 'VIP Hospitality CRM & WhatsApp Concierge',
      category: 'Guest Retention & LTV',
      group: 'creative',
      icon: MessageSquare,
      description: 'Automated pre-arrival itineraries, VIP WhatsApp concierge workflows, and post-stay retargeting that generate repeat direct stays.',
      deliverables: ['Pre-Arrival Itinerary Automation', 'WhatsApp Concierge Workflows', 'Post-Stay Direct Loyalty Loops']
    }
  ];

  // 5 Interactive Why Choose Us Accordion Items (exact Sociallyin structure & logo theme)
  const whyChooseUsData = [
    {
      id: 'studio',
      tab: 'DEDICATED SOCIAL STUDIO',
      title: 'DEDICATED SOCIAL STUDIO',
      description: 'Our studio produces social content your audience actually WANTS to see. Videos, photos, text, and the sweet spot where they meet-we do it all. From viral 4K drone reels to curated luxury narratives that travelers crave, share, and book.',
      badge: 'CONTENT STUDIO',
      benchmark: '4K CINEMATIC REELS'
    },
    {
      id: 'agency',
      tab: 'THE SOCIAL MEDIA AGENCY',
      title: 'THE 100% HOSPITALITY AGENCY',
      description: 'We don’t do generic eCommerce or SaaS. Our entire agency lives and breathes luxury hotel seasonality curves, ADR optimization, weekend getaway windows, and direct guest acquisition.',
      badge: 'HOSPITALITY ONLY',
      benchmark: '100% TRAVEL FOCUS'
    },
    {
      id: 'clients',
      tab: 'WORLD-CLASS CLIENTS',
      title: 'WORLD-CLASS CLIENTS',
      description: 'From iconic 5-star boutique retreats and heritage palace estates to private villa collections, we partner with visionary hospitality leaders who demand best-in-class creative standards and commercial growth.',
      badge: 'PROVEN EXCELLENCE',
      benchmark: '85+ LUXURY PROPERTIES'
    },
    {
      id: 'results',
      tab: 'RESULTS DRIVEN',
      title: 'RELENTLESSLY RESULTS DRIVEN',
      description: 'Every rupee of ad spend, every influencer campaign, and every reel is directly accountable to verified direct bookings, higher RevPAR, and commission-free revenue deposited straight into your account.',
      badge: 'DIRECT ROI',
      benchmark: '2.5X–5X DIRECT ROAS'
    },
    {
      id: 'diverse',
      tab: 'DIVERSE',
      title: 'DIVERSE GROWTH CAPABILITIES',
      description: 'Our agile team unites high-intent performance media buyers, fashion-grade art directors, hotel SEO architects, and conversion specialists operating collaboratively under one senior-led roof.',
      badge: 'AGILE TALENT',
      benchmark: 'FULL-STACK TEAM'
    }
  ];



  return (
    <div className="min-h-screen bg-[#FAF9F6] text-jj-dark font-body pt-0 pb-0 overflow-hidden relative selection:bg-jj-pink/20 selection:text-jj-dark">

      {/* =====================================================================
          TOP FULL-SCREEN CREATIVE HERO BANNER (Responsive Mobile / Desktop Media Query)
         ===================================================================== */}
      <section className="relative w-full overflow-hidden mt-[40px] pt-0 pb-0 border-0 flex items-center justify-center bg-[#99002B]">
        <picture className="w-full h-auto flex items-center justify-center select-none pointer-events-none m-0 p-0 border-0">
          {/* Tablet & Desktop Screen (>= 768px): JJ ELEVATE WEBSITE CREATIVE-12.svg */}
          <source 
            media="(min-width: 768px)" 
            srcSet="/images/about/about-hero-desktop.svg" 
          />
          {/* Mobile Phone Screen (< 768px): JJ ELEVATE WEBSITE CREATIVE-13.svg */}
          <source 
            media="(max-width: 767px)" 
            srcSet="/images/about/about-hero-mobile.svg" 
          />
          {/* Default Image */}
          <img 
            src="/images/about/about-hero-desktop.svg" 
            alt="JJ Elevate Official Website Creative — Co-Founders Chandra Vardhan Singh Jodha & Yuvraj Singh Shekhawat" 
            className="w-full h-auto max-h-[calc(100svh-40px)] sm:max-h-none object-contain mx-auto block select-none pointer-events-none m-0 p-0 border-0 rounded-none"
            loading="eager"
            fetchPriority="high"
          />
        </picture>
      </section>

      {/* =====================================================================
          MEET THE DREAM TEAM (Immediately After Co-Founder Image)
         ===================================================================== */}
      <DreamTeam />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10 pt-10 sm:pt-14">
        
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-jj-dark/50 mb-8 sm:mb-12">
          <button 
            onClick={onNavigateHome}
            className="hover:text-jj-pink transition-colors font-bold flex items-center gap-1 cursor-pointer"
          >
            HOME
          </button>
          <span>/</span>
          <span className="text-jj-pink font-bold">ABOUT US</span>
        </div>

        {/* =====================================================================
            1. HERO SECTION — EXACT SOCIALLYIN 2-COLUMN SHOWCASE (JJ Elevate Theme)
           ===================================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center mb-20 sm:mb-28">
          
          {/* Left Column: Stacked Sociallyin Typography & Proposal CTA */}
          <div className="lg:col-span-6 relative z-10">
            
            {/* 3-Tier Stacked Sociallyin Headline */}
            <div className="mb-6 space-y-1 sm:space-y-2">
              {/* Line 1: RESULTS DRIVEN */}
              <div>
                <h1 className="font-display font-black text-4xl sm:text-6xl lg:text-[62px] xl:text-[74px] text-jj-yellow tracking-tight uppercase leading-[0.94]">
                  RESULTS DRIVEN
                </h1>
              </div>

              {/* Line 2: DIGITAL MARKETING */}
              <div>
                <span className="font-display font-black text-4xl sm:text-6xl lg:text-[62px] xl:text-[74px] text-jj-pink tracking-tight uppercase leading-[0.94] block">
                  DIGITAL MARKETING
                </span>
              </div>

              {/* Line 3: FOR HOSPITALITY */}
              <div>
                <span className="font-display font-black text-4xl sm:text-6xl lg:text-[62px] xl:text-[74px] text-jj-dark tracking-tight uppercase leading-[0.94] block">
                  FOR HOSPITALITY
                </span>
              </div>
            </div>

            {/* Authentic JJ Elevate Marketing Copy */}
            <p className="text-base sm:text-xl text-jj-dark/80 font-normal leading-relaxed mb-6 max-w-xl">
              We engineer <strong className="font-extrabold text-jj-pink">high-ROI paid media</strong>, <strong className="font-extrabold text-jj-pink">viral social content</strong>, and <strong className="font-extrabold text-jj-dark">technical hospitality SEO</strong> to generate <strong className="font-extrabold text-jj-dark">2–5X direct revenue</strong> and eliminate 18–25% OTA commission fees.
            </p>

            {/* Signature Yellow Proposal Button */}
            <div>
              <MagneticButton
                onClick={onOpenConsultation}
                dataCursor="TALK"
                className="px-8 py-4 bg-jj-yellow text-jj-dark hover:bg-jj-pink hover:text-white font-display text-sm sm:text-base font-extrabold uppercase tracking-wider rounded-xl transition-all duration-300 shadow-xl shadow-jj-yellow/35 flex items-center gap-2 group cursor-pointer"
              >
                <span>GET YOUR FREE MARKETING PROPOSAL</span>
                <ArrowUpRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
              </MagneticButton>
            </div>
          </div>

          {/* Right Column: High-Impact Digital Marketing Visual Card with Typography & Layered Mini Card */}
          <div className="lg:col-span-6 relative flex justify-center lg:justify-end mt-6 lg:mt-0">
            
            {/* Main Rounded Showcase Card: Creative Digital Marketing Agency Team & Campaign Strategy */}
            <div className="relative w-full max-w-md lg:max-w-[480px] rounded-[32px] sm:rounded-[40px] overflow-hidden shadow-2xl border-2 border-black/5 bg-jj-dark aspect-[4/5] group">
              {/* Creative Marketing Agency Strategy Team Image */}
              <img
                src="/images/about/marketing_hero.jpg"
                alt="JJ Elevate Digital Marketing Agency Team & Luxury Travel Campaigns"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
              />
              
              {/* Atmospheric Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/25 pointer-events-none" />

              {/* Bold Typographic Poster Overlay: "SCALE THE REVENUE" */}
              <div className="absolute top-8 sm:top-10 left-7 sm:left-9 right-7 z-10 select-none">
                <span className="font-display font-black text-4xl sm:text-6xl lg:text-7xl text-white tracking-tight uppercase leading-[0.9] block drop-shadow-md">
                  SCALE
                </span>
                <span className="font-display font-black text-4xl sm:text-6xl lg:text-7xl text-jj-pink tracking-tight uppercase leading-[0.9] block drop-shadow-lg">
                  THE REVENUE
                </span>
              </div>
            </div>

            {/* Overlapping Floating Mini Card at Bottom Left */}
            <div className="absolute -bottom-6 sm:-bottom-8 -left-2 sm:left-2 lg:-left-6 w-52 sm:w-64 h-36 sm:h-44 rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border-4 border-white z-20 bg-jj-dark group/mini">
              <img
                src="/images/about/terrace_villa_pool.jpg"
                alt="Luxury Resort Villa Terrace & Infinity Pool"
                className="w-full h-full object-cover group-hover/mini:scale-105 transition-transform duration-500"
              />
            </div>

          </div>

        </div>

        {/* =====================================================================
            2. OUR STORY SECTION — EXACT SOCIALLYIN STORY ARCHITECTURE
           ===================================================================== */}
        <div className="relative py-16 sm:py-24 mb-16 sm:mb-24 overflow-visible">
          
          {/* Subtle Topographic Contour Waves (Signature Sociallyin watermark) */}
          <div className="absolute -left-20 top-1/2 -translate-y-1/2 pointer-events-none opacity-20 select-none hidden sm:block">
            <svg width="340" height="340" viewBox="0 0 340 340" fill="none" stroke="#FF1E56" strokeWidth="1.2">
              <path d="M10 170 Q 80 40, 170 170 T 330 170" />
              <path d="M10 200 Q 80 70, 170 200 T 330 200" />
              <path d="M10 230 Q 80 100, 170 230 T 330 230" />
              <path d="M10 260 Q 80 130, 170 260 T 330 260" />
              <path d="M10 290 Q 80 160, 170 290 T 330 290" />
            </svg>
          </div>
          <div className="absolute -right-20 top-1/2 -translate-y-1/2 pointer-events-none opacity-20 select-none hidden sm:block">
            <svg width="340" height="340" viewBox="0 0 340 340" fill="none" stroke="#94A3B8" strokeWidth="1.2">
              <path d="M10 170 Q 80 40, 170 170 T 330 170" />
              <path d="M10 200 Q 80 70, 170 200 T 330 200" />
              <path d="M10 230 Q 80 100, 170 230 T 330 230" />
              <path d="M10 260 Q 80 130, 170 260 T 330 260" />
              <path d="M10 290 Q 80 160, 170 290 T 330 290" />
            </svg>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Column: Team Showcase Card */}
            <div className="lg:col-span-6 relative flex justify-center py-2">
              
              {/* Main Card Frame */}
              <div className="relative w-full max-w-md rounded-[32px] sm:rounded-[40px] border border-black/10 bg-white overflow-hidden">

                {/* Heritage & Story Photo */}
                <div className="w-full aspect-[3/4] rounded-[30px] sm:rounded-[38px] overflow-hidden group shadow-lg">
                  <img
                    src="/images/about/our_story_heritage.jpg"
                    alt="JJ Elevate Heritage & Hospitality Story — Blue City Jodhpur, Rajasthan"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>

              </div>

            </div>

            {/* Right Column: Editorial Story Copy */}
            <div className="lg:col-span-6 flex flex-col justify-center">

              {/* Big Bold Headline: OUR STORY */}
              <h2 className="font-display font-black text-5xl sm:text-6xl lg:text-7xl uppercase tracking-tight text-jj-pink mb-6 sm:mb-8 leading-none">
                OUR STORY
              </h2>

              {/* Lead Paragraph */}
              <p className="text-xl sm:text-2xl text-jj-dark font-medium leading-relaxed mb-6">
                We partner with global brands and independent hospitality leaders to deliver social media content efficiently and effectively, reaching a wide audience.
              </p>

              {/* Second Paragraph */}
              <p className="text-base sm:text-lg text-jj-dark/75 font-normal leading-relaxed mb-6">
                Our creative production studios and performance marketing operations showcase our agile, high-standard execution—seamlessly uniting cinematic 4K property reels, data-driven paid advertising, and technical search dominance.
              </p>

              {/* Third Paragraph */}
              <p className="text-base sm:text-lg text-jj-dark/75 font-normal leading-relaxed">
                Expansion has always been at the core of our journey. By connecting with more people, both online and in person, we continue to grow and create high-margin direct booking opportunities for hotels. We are eager to learn about your story and assist you in sharing it with your audience.
              </p>

            </div>

          </div>

        </div>

        {/* =====================================================================
            3. WHY CHOOSE US — EXACT SOCIALLYIN INTERACTIVE ACCORDION (Logo Color Theme)
           ===================================================================== */}
        <div className="relative bg-gradient-to-br from-[#FFE8EE] via-[#FFF0F4] to-[#FFE4EC] rounded-[36px] sm:rounded-[48px] p-6 sm:p-12 lg:p-16 mb-16 sm:mb-24 border border-jj-pink/15 shadow-sm overflow-hidden">
          
          {/* Section Heading: WHY CHOOSE US */}
          <div className="mb-8 sm:mb-12">
            <h2 className="font-display font-black text-4xl sm:text-6xl lg:text-7xl uppercase tracking-tight text-jj-pink leading-none">
              WHY CHOOSE US
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Column: 5 Interactive Switcher Tabs */}
            <div className="lg:col-span-6 space-y-3 sm:space-y-4">
              {whyChooseUsData.map((item, idx) => {
                const isActive = activeChooseTab === idx;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveChooseTab(idx)}
                    className={`w-full flex items-center justify-between px-6 sm:px-8 py-4 sm:py-5 rounded-2xl sm:rounded-3xl font-display text-base sm:text-xl font-extrabold uppercase tracking-wide transition-all duration-300 cursor-pointer text-left ${
                      isActive
                        ? 'bg-jj-pink text-white shadow-xl shadow-jj-pink/30 scale-[1.01]'
                        : 'bg-white text-jj-dark hover:bg-white/95 shadow-sm hover:shadow-md border border-black/5'
                    }`}
                  >
                    <span>{item.tab}</span>
                    <div className={`w-9 h-9 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl flex items-center justify-center shrink-0 transition-transform duration-300 ${
                      isActive
                        ? 'bg-white/20 text-white'
                        : 'bg-[#FFF0F4] text-jj-pink'
                    }`}>
                      <ArrowRight className="w-5 h-5" />
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Right Column: White Content Card with 3D Dartboard Target Pins */}
            <div className="lg:col-span-6 relative pt-6 sm:pt-0">
              
              {/* Top-Left 3D Dartboard Pin */}
              <div className="absolute -top-7 sm:-top-8 -left-3 sm:-left-5 z-20">
                <DartTarget rotation="-12deg" />
              </div>

              {/* Bottom-Right 3D Dartboard Pin */}
              <div className="absolute -bottom-7 sm:-bottom-8 -right-3 sm:-right-5 z-20">
                <DartTarget rotation="22deg" />
              </div>

              {/* The White Content Card */}
              <div className="relative bg-white rounded-[32px] sm:rounded-[40px] p-8 sm:p-14 shadow-2xl border-2 border-jj-pink/10 min-h-[380px] sm:min-h-[440px] flex flex-col justify-center overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeChooseTab}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-6"
                  >
                    <h3 className="font-display font-black text-3xl sm:text-5xl uppercase tracking-tight text-jj-pink leading-tight">
                      {whyChooseUsData[activeChooseTab].title}
                    </h3>

                    <p className="text-base sm:text-xl text-jj-dark/80 font-normal leading-relaxed">
                      {whyChooseUsData[activeChooseTab].description}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>

            </div>

          </div>

        </div>

        {/* =====================================================================
            4. WHO WE ARE — JJ ELEVATE BRAND THEME SECTION (Image 1)
           ===================================================================== */}
        <div className="relative bg-gradient-to-br from-[#FF1E56] via-[#E11448] to-[#C9083A] rounded-[36px] sm:rounded-[48px] p-8 sm:p-14 lg:p-20 mb-16 sm:mb-24 shadow-2xl overflow-hidden text-white">
          
          {/* Top subtle triangle notch like Sociallyin Image 1 */}
          <div className="absolute top-0 left-0 right-0 h-6 sm:h-8 overflow-hidden pointer-events-none">
            <svg viewBox="0 0 1440 32" fill="none" preserveAspectRatio="none" className="w-full h-full text-[#FAF9F6] fill-current">
              <polygon points="0,0 720,28 1440,0" />
            </svg>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center pt-4 sm:pt-6">
            
            {/* Left Column: 3 Overlapping Production Photo Cards */}
            <div className="lg:col-span-6 relative flex flex-col items-center">
              
              {/* Top Photo: Team Working at Desks */}
              <div className="relative z-20 w-48 sm:w-60 -mb-10 sm:-mb-14 mr-6 sm:mr-10">
                <div className="bg-white p-1 rounded-2xl sm:rounded-3xl shadow-2xl border-2 border-white overflow-hidden transform -rotate-1 hover:rotate-0 transition-transform duration-300">
                  <img
                    src="/images/about/team_working_desk.jpg"
                    alt="JJ Elevate Team Working at Desks"
                    className="w-full h-32 sm:h-40 object-cover rounded-xl sm:rounded-2xl"
                  />
                </div>
              </div>

              {/* Center Main Photo: Team Group in White Framed Card */}
              <div className="relative z-10 w-full max-w-md sm:max-w-lg">
                <div className="bg-white p-2 sm:p-2.5 rounded-[28px] sm:rounded-[36px] shadow-2xl border-4 border-white overflow-hidden">
                  <img
                    src="/images/about/team_group_photo.jpg"
                    alt="JJ Elevate Team Group"
                    className="w-full h-56 sm:h-72 object-cover object-top rounded-[22px] sm:rounded-[30px]"
                  />
                </div>
              </div>

              {/* Bottom Photo: Camera & Studio Monitor (Unchanged as requested) */}
              <div className="relative z-20 w-48 sm:w-60 -mt-8 sm:-mt-12 ml-6 sm:ml-10">
                <div className="bg-white p-1 rounded-2xl sm:rounded-3xl shadow-2xl border-2 border-white overflow-hidden transform rotate-1 hover:rotate-0 transition-transform duration-300">
                  <img
                    src="/images/about/camera_monitor_studio.jpg"
                    alt="Video Production Studio"
                    className="w-full h-24 sm:h-32 object-cover rounded-xl sm:rounded-2xl"
                  />
                </div>
              </div>

            </div>

            {/* Right Column: Editorial Copy */}
            <div className="lg:col-span-6 text-left">
              
              <h2 className="font-display font-black text-5xl sm:text-6xl lg:text-7xl uppercase text-white tracking-tight leading-none mb-8">
                WHO WE ARE
              </h2>

              <p className="text-white text-base sm:text-lg lg:text-xl font-medium leading-relaxed mb-6">
                Connection is at the heart of everything we do, with YOUR audience and within OUR team. We combine diverse perspectives with targeted strategies to create social campaigns that stand out and make an impact.
              </p>

              <p className="text-white/90 text-sm sm:text-base lg:text-lg font-normal leading-relaxed">
                As one of the few agencies built specifically for social media, we bring fresh angles and opportunities others overlook. Whatever you do, your audience is online, and we can help you find them.
              </p>

            </div>

          </div>

        </div>

      </div>

      {/* =====================================================================
          4.5. CO-FOUNDERS LEADERSHIP PROFILES (Strategy Call & Bio Cards)
         ===================================================================== */}
      <CoFoundersAnimatedShowcase onOpenConsultation={onOpenConsultation} showBanner={false} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        {/* =====================================================================
            6. WHAT WE DO — INTERACTIVE HOSPITALITY BENTO SHOWCASE
           ===================================================================== */}
        <div className="mb-20 sm:mb-28">

          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 sm:mb-10">
            <div className="max-w-2xl">
              <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl uppercase text-[#0B0C10] tracking-tight leading-[1.05]">
                WHAT WE <span className="text-jj-pink relative inline-block">
                  DO
                  <span className="absolute -bottom-1 left-0 right-0 h-1 bg-[#FFDE00] rounded-full" />
                </span>
              </h2>
              <p 
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                className="text-sm sm:text-base text-jj-dark/70 mt-3.5 leading-relaxed font-normal max-w-xl"
              >
                8 interconnected direct revenue engines engineered to eliminate OTA commissions, elevate search ranking, and scale luxury hotel portfolios.
              </p>
            </div>

            <div className="shrink-0">
              <button
                onClick={onOpenConsultation}
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-[#0B0C10] hover:bg-jj-pink text-white text-xs sm:text-sm font-semibold tracking-wide transition-all duration-300 shadow-sm hover:shadow-lg hover:shadow-jj-pink/20 group cursor-pointer border-0"
              >
                <span>Request Strategic Audit</span>
                <ArrowRight className="w-4 h-4 text-jj-pink group-hover:text-white transition-all group-hover:translate-x-1" />
              </button>
            </div>
          </div>

          {/* Interactive Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 mb-8 sm:mb-10">
            {serviceFilterTabs.map((tab) => {
              const isActive = activeServiceFilter === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveServiceFilter(tab.id)}
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                  className={`inline-flex items-center gap-2 px-4 sm:px-4.5 py-2 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-[#0B0C10] text-white shadow-md'
                      : 'bg-white text-jj-dark/70 hover:text-jj-dark border border-black/[0.08] hover:border-black/20'
                  }`}
                >
                  <span>{tab.label}</span>
                  <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded-full ${
                    isActive ? 'bg-white/20 text-white' : 'bg-black/[0.05] text-jj-dark/50'
                  }`}>
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Clean Custom 2-Column Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-7">
            {whatWeDoServices
              .filter(srv => activeServiceFilter === 'all' || srv.group === activeServiceFilter)
              .map((srv) => {
                return (
                  <motion.div
                    key={srv.id}
                    layout
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25 }}
                    onClick={onOpenConsultation}
                    className="group bg-white rounded-2xl p-7 sm:p-8 border border-black/[0.08] hover:border-black/30 shadow-[0_2px_12px_-2px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_28px_-6px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between cursor-pointer"
                  >
                    <div>
                      {/* Card Top: Simple Clean Normal Typography (No AI Pills or Icons) */}
                      <div className="flex items-center justify-between pb-3.5 border-b border-black/[0.06] mb-5">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-jj-pink">
                          {srv.category}
                        </span>
                        <span className="font-mono text-xs font-semibold text-black/30">
                          /{srv.id}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 
                        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", textTransform: 'none' }}
                        className="text-xl sm:text-[22px] font-bold text-[#0B0C10] group-hover:text-jj-pink transition-colors tracking-tight leading-snug mb-3 !normal-case"
                      >
                        {srv.title}
                      </h3>

                      {/* Description */}
                      <p 
                        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                        className="text-sm text-jj-dark/70 leading-relaxed font-normal mb-6"
                      >
                        {srv.description}
                      </p>

                      {/* Deliverables: Clean Normal Agency Tags */}
                      <div className="pt-4 border-t border-black/[0.06] mb-6">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-black/40 block mb-2.5">
                          What We Deliver
                        </span>
                        <div className="flex flex-wrap gap-2">
                          {srv.deliverables.map((item, i) => (
                            <span 
                              key={i} 
                              className="px-2.5 py-1 rounded-md bg-black/[0.03] text-xs font-medium text-jj-dark/75 border border-black/[0.04]"
                            >
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Card Footer: Action */}
                    <div className="pt-4 border-t border-black/[0.06] flex items-center justify-between text-xs font-semibold text-[#0B0C10]">
                      <span className="group-hover:text-jj-pink transition-colors">Inquire for your property</span>
                      <span className="w-7 h-7 rounded-full bg-black/[0.04] group-hover:bg-[#0B0C10] text-black/60 group-hover:text-white flex items-center justify-center transition-all group-hover:translate-x-1">
                        <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </motion.div>
                );
              })}
          </div>

        </div>

      </div>

      {/* =====================================================================
          7. TRUSTED BY — CLIENTS MARQUEE (Moving ticker identical to Home page)
         ===================================================================== */}
      <div className="mb-0">
        <ClientsMarquee />
      </div>

      {/* =====================================================================
          8. YELLOW NEWSLETTER CTA & SEAMLESS WAVE INTO FOOTER
         ===================================================================== */}
      <NewsletterCTA />

    </div>
  );
}
