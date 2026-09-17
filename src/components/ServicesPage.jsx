import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MonitorSmartphone, 
  Megaphone, 
  Search, 
  Building2, 
  UtensilsCrossed, 
  BadgePercent, 
  CheckCircle2, 
  ArrowRight,
  Sparkles,
  TrendingUp
} from 'lucide-react';
import ClientsMarquee from './ClientsMarquee';
import NewsletterCTA from './NewsletterCTA';

/* =========================================================================
   ServicesPage — Authentic Architecture from https://www.jjelevate.com/services
   - Interactive Sticky Sidebar Layout with 6 Core Channels
   - Real Photographic Images & Authentic Copy from live site
   - Excludes Cloud Kitchen per user request
   - Tuned to JJ Elevate Webpage Brand Palette (#FAF9F6, #FF1E56, #0B0C10)
   ========================================================================= */

const servicesData = [
  {
    id: "HOTELSOCIALMEDIA",
    icon: MonitorSmartphone,
    label: "Hotel Social Media",
    title: "HOTEL SOCIAL MEDIA MARKETING",
    tagline: "Make online presence With more impactful creatives.",
    description: "Enhance Your Online Presence with Compelling Restaurant Social Media Posts or Campaigns. Our Expert Social Media Management Team Delivers Engaging Creatives for Effective Audience Engagement.",
    features: [
      "Showcase Your Hotel",
      "Drive Bookings",
      "Reputation Management",
      "Visual Appeal",
      "Reach a Wider Audience",
      "Calendar Ideation",
      "Scheduling & publishing Content",
      "Linktree Account Setup",
      "Social Media Audit"
    ],
    results: [
      "+340% organic traffic in 6 months",
      "50+ #1 keyword rankings",
      "4.2x revenue from organic channel"
    ],
    img: "https://images.unsplash.com/photo-1562577309-4932fdd64cd1?q=80&w=800&auto=format&fit=crop",
    gradient: "from-jj-pink/[0.08] to-transparent",
    cta: "Start Ranking"
  },
  {
    id: "HotelADS",
    icon: Megaphone,
    label: "Hotel Ads",
    title: "HOTEL GOOGLE ADS",
    tagline: "Excel at Google Ads with India’s Leading Hotel Marketing Agency.",
    description: "Drive Revenue with Hotel Google Ads. With the Expertise of Fielmente- One of the best Hotel Marketing Companies in India to Maximize Your Online Visibility and Generate High-Conversion Bookings.",
    features: [
      "Accelerate Your Hotel’s Growth with Paid Ads",
      "Increased Visibility",
      "Targeted Advertising",
      "Cost-Effective Results",
      "Drive Direct Bookings",
      "Compete Effectively",
      "Real-Time Optimization"
    ],
    results: [
      "8.2x average ROAS",
      "62% reduction in CPL",
      "$80M+ total ad spend managed"
    ],
    img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop",
    gradient: "from-jj-pink/[0.08] to-transparent",
    cta: "Boost Your ROAS"
  },
  {
    id: "HOTELSEO",
    icon: Search,
    label: "Hotel SEO",
    title: "HOTEL SEO",
    tagline: "Skyrocket Your Hotel’s Success with Fielmente’s SEO Strategies!",
    description: "Enhance the Potential of Your Hotel with our Targeted SEO Services and a Winning Strategy.",
    features: [
      "Boost Visibility",
      "Drive Bookings",
      "Stay Competitive",
      "Targeted Traffic",
      "Enhanced User Experience",
      "Cost Effective Marketing"
    ],
    results: [
      "3.8x more organic leads",
      "Domain authority grew from 22 to 68",
      "$12M pipeline attributed to content"
    ],
    img: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=800&auto=format&fit=crop",
    gradient: "from-jj-pink/[0.08] to-transparent",
    cta: "Build Your Authority"
  },
  {
    id: "HotelOTA",
    icon: Building2,
    label: "Hotel OTA",
    title: "Hotel OTA",
    tagline: "Let’s Supercharge Your Hotel Revenue",
    description: "Fielmente Hospitality brings decades of experience and groundbreaking technology to help hoteliers worldwide Go Beyond. We are the only Revenue Management Company with a team of Industry Experts with more product solutions than any of our competitors, Fielmente ensures you have the tools you need to succeed.",
    features: [
      "Proven Expertise",
      "Data-Driven",
      "Tailored Strategy"
    ],
    results: [
      "Avg. 100/100 Lighthouse score",
      "3.4x conversion rate improvements",
      "Sub-1s First Contentful Paint"
    ],
    img: "https://images.unsplash.com/photo-1555099962-4199c345e5dd?q=80&w=800&auto=format&fit=crop",
    gradient: "from-jj-pink/[0.08] to-transparent",
    cta: "Build Your Site"
  },
  {
    id: "RESTAURANTSOCIALMEDIA",
    icon: UtensilsCrossed,
    label: "Restaurant Social Media",
    title: "RESTAURANT SOCIAL MEDIA MARKETING",
    tagline: "Make online presence With more impactful creatives.",
    description: "Enhance Your Online Presence with Compelling Restaurant Social Media Posts or Campaigns. Our Expert Social Media Management Team Delivers Engaging Creatives for Effective Audience Engagement.",
    features: [
      "Reach a Wider Audience",
      "Engage with Customers",
      "Promote Special Offers",
      "Build Brand Personality",
      "User Generated Content",
      "Stay Top of Mind",
      "Calendar Ideation",
      "Scheduling & publishing Content",
      "Linktree Account Setup",
      "Social Media Platform Audit & Remedial Action"
    ],
    results: [
      "4.8% → 1.2% user drop-off rates",
      "Avg. 230% conversion lift post-redesign",
      "NPS score improvements of +40 points"
    ],
    img: "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=800&auto=format&fit=crop",
    gradient: "from-jj-pink/[0.08] to-transparent",
    cta: "Design Your UX"
  },
  {
    id: "RestaurantGOOGLE",
    icon: BadgePercent,
    label: "Restaurant Ads",
    title: "Restaurant GOOGLE ADS",
    tagline: "Excel at Google Ads with India’s Leading Restaurant Marketing Agency.",
    description: "Drive Revenue with Restaurant Google Ads. With the Expertise of Fielmente- One of the best Restaurant Marketing Companies in India to Maximize Your Online Visibility and Generate High-Conversion Reservations.",
    features: [
      "Accelerate Your Restaurant’s Growth with Paid Ads",
      "Increased Visibility",
      "Targeted Advertising",
      "Cost-Effective Results",
      "Drive Direct Reservations",
      "Compete Effectively",
      "Real-Time Optimization"
    ],
    results: [
      "420% LinkedIn engagement increase",
      "280 qualified leads/month from social",
      "8 B2B executives hit 50K+ followers"
    ],
    img: "https://images.unsplash.com/photo-1611162616475-46b635cb6868?q=80&w=800&auto=format&fit=crop",
    gradient: "from-jj-pink/[0.08] to-transparent",
    cta: "Grow Your Audience"
  }
];

export default function ServicesPage({ targetHash, onOpenConsultation, onNavigateHome }) {
  const [activeTab, setActiveTab] = useState(() => {
    const hash = targetHash || (typeof window !== 'undefined' ? window.location.hash : '');
    if (hash) {
      const hashId = hash.replace('#', '').toLowerCase();
      const match = servicesData.find(s => s.id.toLowerCase() === hashId);
      if (match) return match.id;
    }
    return servicesData[0].id;
  });

  // Sync with targetHash prop or URL hash whenever navigated
  useEffect(() => {
    const hash = targetHash || (typeof window !== 'undefined' ? window.location.hash : '');
    if (hash) {
      const hashId = hash.replace('#', '').toLowerCase();
      const match = servicesData.find(s => s.id.toLowerCase() === hashId);
      if (match) {
        setActiveTab(match.id);
        setTimeout(() => {
          const el = document.getElementById(match.id) || document.getElementById('services-showcase') || document.getElementById('service-details');
          if (el) {
            const navbarHeight = 85;
            const offset = el.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
            window.scrollTo({ top: Math.max(0, offset), behavior: 'smooth' });
          }
        }, 120);
      } else if (hashId === 'services' || hashId === 'services-showcase') {
        setTimeout(() => {
          const el = document.getElementById('services-showcase');
          if (el) {
            const navbarHeight = 85;
            const offset = el.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
            window.scrollTo({ top: Math.max(0, offset), behavior: 'smooth' });
          }
        }, 120);
      }
    }
  }, [targetHash]);

  // Also support native popstate/hashchange
  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash) {
        const hashId = window.location.hash.replace('#', '').toLowerCase();
        const match = servicesData.find(s => s.id.toLowerCase() === hashId);
        if (match) {
          setActiveTab(match.id);
        }
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const activeService = servicesData.find(s => s.id === activeTab) || servicesData[0];

  const handleSelectService = (id) => {
    setActiveTab(id);
    if (typeof window !== 'undefined') {
      window.history.replaceState(null, '', `/services#${id}`);
    }
    // On mobile and tablet screens, smoothly bring the active service into view
    if (typeof window !== 'undefined' && window.innerWidth < 1024) {
      setTimeout(() => {
        const el = document.getElementById('service-details');
        if (el) {
          const navbarHeight = 85;
          const offset = el.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
          window.scrollTo({ top: Math.max(0, offset), behavior: 'smooth' });
        }
      }, 50);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-jj-dark font-body pt-28 sm:pt-36 pb-0 overflow-hidden relative selection:bg-jj-pink/20 selection:text-jj-dark">
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        
        {/* =====================================================================
            1. HERO SECTION (Directly from jjelevate.com/services)
           ===================================================================== */}
        <section className="relative pt-6 pb-14 text-center">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto space-y-4"
          >
            <div className="inline-block px-4 py-1.5 rounded-full bg-white text-jj-pink border border-black/10 text-xs font-bold uppercase tracking-wider shadow-sm">
              WHAT WE DO
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-black text-jj-dark leading-[1.05] tracking-tight uppercase">
              SIX CHANNELS. <span className="text-jj-pink">ONE GOAL.</span>
            </h1>

            <p className="text-jj-dark/70 text-base sm:text-xl max-w-2xl mx-auto leading-relaxed font-normal">
              Every service we offer is engineered to generate measurable revenue — not just impressions.
            </p>
          </motion.div>
        </section>

        {/* =====================================================================
            2. STICKY SIDEBAR + INTERACTIVE SERVICE DETAILS
           ===================================================================== */}
        <section id="services-showcase" className="pb-24 scroll-mt-28">
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            
            {/* Left Sticky Sidebar */}
            <aside className="w-full lg:w-72 flex-shrink-0">
              <div className="lg:sticky lg:top-28 space-y-2.5 bg-white/70 backdrop-blur-md p-3 rounded-3xl border border-black/[0.08] shadow-sm">
                {servicesData.map((service) => {
                  const Icon = service.icon;
                  const isActive = service.id === activeTab;

                  return (
                    <button
                      key={service.id}
                      id={`sidebar-${service.id}`}
                      data-service-id={service.id}
                      onClick={() => handleSelectService(service.id)}
                      className={`group w-full flex items-center gap-3.5 px-4 py-3.5 rounded-2xl text-[13.5px] font-body text-left transition-all duration-300 ${
                        isActive
                          ? 'bg-white text-jj-dark font-bold border-2 border-jj-pink/40 shadow-md scale-[1.01]'
                          : 'text-jj-dark/70 font-medium hover:text-jj-dark hover:bg-black/5 border border-transparent'
                      }`}
                    >
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors shrink-0 ${
                        isActive 
                          ? 'bg-jj-pink text-white shadow-sm' 
                          : 'bg-black/[0.04] text-jj-dark/70 group-hover:text-jj-dark group-hover:bg-black/[0.08]'
                      }`}>
                        <Icon className="w-4 h-4" />
                      </div>

                      <span className="leading-snug">
                        {service.label}
                      </span>

                      {isActive && (
                        <span className="ml-auto w-2 h-2 rounded-full bg-jj-pink shrink-0 animate-pulse" />
                      )}
                    </button>
                  );
                })}
              </div>
            </aside>

            {/* Right Interactive Service Content */}
            <div id="service-details" className="flex-1 min-w-0 w-full scroll-mt-28">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeService.id}
                  id={activeService.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6 sm:space-y-8 scroll-mt-28"
                >
                  
                  {/* Top Showcase Hero Card */}
                  <div className="relative rounded-[28px] sm:rounded-[36px] overflow-hidden bg-white border border-black/10 shadow-sm p-6 sm:p-10 lg:p-12">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                      
                      {/* Left: Texts */}
                      <div className="md:col-span-7 space-y-4">
                        <div className="inline-block px-3.5 py-1.5 rounded-full bg-jj-pink/10 text-jj-pink text-xs font-bold uppercase tracking-wider border border-jj-pink/20">
                          {activeService.label}
                        </div>

                        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-black text-jj-dark tracking-tight uppercase leading-tight">
                          {activeService.title}
                        </h2>

                        <p className="text-jj-pink font-bold text-base sm:text-lg leading-snug">
                          {activeService.tagline}
                        </p>

                        <p className="text-jj-dark/75 text-sm sm:text-base leading-relaxed font-normal">
                          {activeService.description}
                        </p>
                      </div>

                      {/* Right: Photographic Image from jjelevate.com (Fully shown, uncropped) */}
                      <div className="md:col-span-5 relative rounded-2xl sm:rounded-3xl overflow-hidden bg-[#F4F4F6] border border-black/5 flex items-center justify-center p-2 sm:p-3 min-h-[240px] sm:min-h-[280px] shadow-sm">
                        <img 
                          src={activeService.img} 
                          alt={activeService.title}
                          className="w-full h-full max-h-[280px] object-contain rounded-xl sm:rounded-2xl transition-transform duration-500 hover:scale-[1.02]"
                        />
                      </div>

                    </div>
                  </div>

                  {/* Bottom 2-Column Info Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                    
                    {/* Card 1: What's Included (Col 7) */}
                    <div className="md:col-span-7 p-6 sm:p-8 rounded-[28px] bg-white border border-black/10 shadow-sm flex flex-col justify-between">
                      <div>
                        <h3 className="text-jj-dark font-display font-black text-xl sm:text-2xl uppercase tracking-tight mb-5 flex items-center gap-2">
                          <CheckCircle2 className="w-5 h-5 text-jj-pink" />
                          <span>WHAT'S INCLUDED</span>
                        </h3>

                        <ul className="space-y-3">
                          {activeService.features.map((feature, fIdx) => (
                            <li key={fIdx} className="flex items-start gap-3 text-jj-dark/80 text-sm sm:text-base font-medium leading-relaxed">
                              <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-jj-pink flex-shrink-0 mt-0.5" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Card 2: Real Results & CTA (Col 5) */}
                    <div className="md:col-span-5 space-y-5 flex flex-col justify-between">
                      <div className="p-6 sm:p-8 rounded-[28px] bg-white border border-black/10 shadow-sm flex-1">
                        <h3 className="text-jj-dark font-display font-black text-xl sm:text-2xl uppercase tracking-tight mb-5 flex items-center gap-2">
                          <TrendingUp className="w-5 h-5 text-jj-pink" />
                          <span>REAL RESULTS</span>
                        </h3>

                        <ul className="space-y-4">
                          {activeService.results.map((result, rIdx) => (
                            <li key={rIdx} className="flex items-center gap-3">
                              <div className="w-2.5 h-2.5 rounded-full bg-jj-pink flex-shrink-0" />
                              <span className="text-jj-dark/85 text-sm sm:text-base font-bold">
                                {result}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Action Button */}
                      <button
                        onClick={onOpenConsultation}
                        className="flex items-center justify-center gap-2.5 w-full px-8 py-4 sm:py-5 rounded-2xl bg-jj-pink hover:bg-jj-dark text-white font-display font-black text-sm sm:text-base uppercase tracking-wider shadow-lg shadow-jj-pink/25 hover:scale-[1.01] active:scale-[0.99] transition-all duration-300 cursor-pointer group"
                      >
                        <span>{activeService.cta}</span>
                        <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>

                  </div>

                </motion.div>
              </AnimatePresence>
            </div>

          </div>
        </section>

      </div>

      {/* =====================================================================
          3. CLIENTS MARQUEE TICKER
         ===================================================================== */}
      <div className="mb-0">
        <ClientsMarquee />
      </div>

      {/* =====================================================================
          4. NEWSLETTER CTA & FOOTER LEAD-IN
         ===================================================================== */}
      <NewsletterCTA />

    </div>
  );
}
