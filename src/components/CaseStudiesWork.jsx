import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, CheckCircle2, X, Maximize2, Minimize2 } from 'lucide-react';
import MagneticButton from './motion/MagneticButton';

gsap.registerPlugin(ScrollTrigger);

export default function CaseStudiesWork({ onOpenConsultation }) {
  const [selectedCase, setSelectedCase] = useState(null);
  const [isFullScreenModal, setIsFullScreenModal] = useState(false);
  const sectionRef = useRef(null);
  const cardsContainerRef = useRef(null);

  const projects = [
    {
      id: 'case-1',
      title: 'The Royal Palace Resort',
      location: 'Jodhpur, Rajasthan',
      category: 'LUXURY HERITAGE',
      bgColor: 'bg-[#EFECE6]',
      textColor: 'text-[#0B0C10]',
      subTextColor: 'text-[#0B0C10]/80',
      borderColor: 'border-[#0B0C10]/15',
      badgeBg: 'bg-[#0B0C10] text-white',
      accentColor: 'text-[#FF1E56]',
      metricHighlight: '+340% ORGANIC TRAFFIC',
      metricsTable: [
        { label: 'TIMELINE', value: '5 YEARS PARTNERSHIP' },
        { label: 'DIRECT REVENUE', value: '₹0 → ₹18.4M REV ↑' },
        { label: 'OTA COMMISSIONS', value: '22% → 0% SAVED' },
        { label: 'SEARCH ROAS', value: '4.9X AD RETURN' }
      ],
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1000&q=80',
      description: 'Co-engineered a complete direct booking engine and luxury digital presence for a heritage palace resort in Jodhpur. Reduced OTA commission fees by ₹18.4 Lakhs annually while scaling organic search discovery.',
      fullDetails: {
        challenge: 'High reliance on Booking.com charging 22% commissions, resulting in compressed profit margins despite 85% seasonal occupancy.',
        strategy: 'Implemented local destination keyword SEO, built a fast 2-step direct reservation engine, and ran Meta retargeting campaigns targeting wedding venue planners.',
        results: [
          '+340% increase in direct organic search traffic',
          '+42.8% rise in direct website booking revenue',
          '₹18.4 Lakhs saved in annual OTA commissions',
          '4.9X ROAS on targeted Google Search campaigns'
        ]
      }
    },
    {
      id: 'case-2',
      title: 'Serenity Springs Villas',
      location: 'Udaipur, India',
      category: 'BOUTIQUE VILLAS',
      bgColor: 'bg-[#E6E1F5]',
      textColor: 'text-[#1D1B2A]',
      subTextColor: 'text-[#1D1B2A]/80',
      borderColor: 'border-[#1D1B2A]/15',
      badgeBg: 'bg-[#FF1E56] text-white',
      accentColor: 'text-[#FF1E56]',
      metricHighlight: '4.8X ADS ROAS',
      metricsTable: [
        { label: 'VIDEO REEL VIEWS', value: '1.2M+ ORGANIC ↑' },
        { label: 'WEEKEND OCCUPANCY', value: '100% IN 45 DAYS' },
        { label: 'INSTAGRAM GROWTH', value: '+15,000 FANS ↑' },
        { label: 'RETURN ON AD SPEND', value: '4.8X DIRECT ROAS' }
      ],
      image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1000&q=80',
      description: 'Launched a high-aesthetic luxury video campaign on Instagram featuring architectural highlights and private pool villa experiences. Generated over 1.2 million views and 100% weekend room occupancy.',
      fullDetails: {
        challenge: 'A newly launched boutique luxury villa needed instant market awareness and weekend staycation bookings without waiting 6 months for SEO maturity.',
        strategy: 'Created cinematic drone footage & aesthetic lifestyle reels. Deployed Meta conversion ads with custom booking offers.',
        results: [
          'Over 1.2 million organic and paid reel views',
          '100% weekend room occupancy achieved in 45 days',
          '4.8X return on ad spend (ROAS)',
          '+15,000 engaged Instagram followers'
        ]
      }
    },
    {
      id: 'case-3',
      title: 'Desert Haven Haveli & Spa',
      location: 'Jaisalmer, Rajasthan',
      category: 'HERITAGE HAVELI',
      bgColor: 'bg-[#FF1E56]',
      textColor: 'text-white',
      subTextColor: 'text-white/85',
      borderColor: 'border-white/20',
      badgeBg: 'bg-[#0B0C10] text-white',
      accentColor: 'text-jj-yellow',
      metricHighlight: '#1 GOOGLE RANKING',
      metricsTable: [
        { label: 'GOOGLE RANKINGS', value: '#1 FOR 14 KEYWORDS' },
        { label: 'WHATSAPP LEADS', value: '+180% INQUIRIES ↑' },
        { label: 'AVERAGE DAILY RATE', value: '+38% ADR INCREASE' },
        { label: 'DIRECT BOOKINGS', value: '62% OF TOTAL STAYS' }
      ],
      image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1000&q=80',
      description: 'Captured high-value seasonal desert safari travelers searching for authentic boutique haveli stays. Outranked aggregators to rank #1 on Google for 14 destination keywords.',
      fullDetails: {
        challenge: 'Outranked by major hotel aggregators on Google Search for top destination queries.',
        strategy: 'Executed schema-structured hotel SEO, optimized Google Business Profile, and launched multilingual landing pages.',
        results: [
          'Ranked #1 for 14 high-intent desert luxury stay keywords',
          '+180% surge in direct WhatsApp inquiry leads',
          '+38% increase in Average Daily Rate (ADR)'
        ]
      }
    },
    {
      id: 'case-4',
      title: 'Coastal Palms Resort',
      location: 'Goa, India',
      category: 'BEACH RESORT',
      bgColor: 'bg-[#0B0C10]',
      textColor: 'text-white',
      subTextColor: 'text-white/80',
      borderColor: 'border-white/15',
      badgeBg: 'bg-[#FF1E56] text-white',
      accentColor: 'text-[#FF1E56]',
      metricHighlight: '+65% MOBILE CONVERSION',
      metricsTable: [
        { label: 'MOBILE CHECKOUT', value: '+65% COMPLETION ↑' },
        { label: 'PAGE LOAD SPEED', value: '5.4s → 0.8s FAST' },
        { label: 'CART DROP-OFFS', value: '0% PAYMENT FAILS' },
        { label: 'RATE PARITY', value: '100% PROTECTED' }
      ],
      image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1000&q=80',
      description: 'Re-engineered a clunky resort website into an ultra-fast mobile booking experience integrated with instant WhatsApp rate assistance and zero checkout drop-offs.',
      fullDetails: {
        challenge: '78% of website traffic was on mobile, but cart abandonment on the old booking portal exceeded 88%.',
        strategy: 'Engineered a modern mobile web app with 2-click booking, UPI integration, and automated pre-arrival WhatsApp concierge.',
        results: [
          '+65% increase in mobile booking completion',
          'Average page load time reduced from 5.4s to 0.8s',
          'Zero cart abandonment due to payment drop-offs'
        ]
      }
    }
  ];

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || window.innerWidth < 1024) return;

    const ctx = gsap.context(() => {
      const cards = cardsContainerRef.current.querySelectorAll('.abhay-card');

      cards.forEach((card, index) => {
        if (index === 0) return;

        gsap.fromTo(
          card,
          { y: '100%', scale: 0.98, opacity: 0.95 },
          {
            y: '0%',
            scale: 1,
            opacity: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: cardsContainerRef.current,
              start: () => `top+=${index * 680} 80px`,
              end: () => `top+=${(index + 1) * 680} 80px`,
              scrub: 0.5
            }
          }
        );
      });

      ScrollTrigger.create({
        trigger: cardsContainerRef.current,
        start: 'top 80px',
        end: () => `+=${cards.length * 700}`,
        pin: true,
        scrub: 0.5
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="cases" data-section="work" className="py-16 sm:py-20 lg:py-24 bg-jj-offwhite text-jj-dark relative scroll-mt-24">
      <span id="work" className="absolute -top-24 opacity-0 pointer-events-none" />
      <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-14 mb-12">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between border-b border-jj-dark/10 pb-8 mb-10">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="w-8 h-[2px] bg-jj-pink"></span>
              <span className="text-xs font-extrabold uppercase tracking-widest text-jj-pink">
                FEATURED CASE STUDIES
              </span>
            </div>
            <h2 className="clamp-heading font-display font-extrabold text-jj-dark tracking-tight uppercase">
              CASES THAT <br />
              <span className="text-jj-pink">MOVE THE NEEDLE.</span>
            </h2>
          </div>
          <p className="text-jj-dark/80 max-w-md text-base mt-4 lg:mt-0 font-medium">
            Explore our real hospitality case studies, verified metrics, and transformation playbooks.
          </p>
        </div>

        {/* Abhay Singh Inspired Property & Marketing Showcase Photo Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          <div className="relative rounded-3xl overflow-hidden aspect-[4/3] group border-2 border-jj-dark/15 bg-white">
            <img
              src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80"
              alt="Luxury Heritage Resort"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-jj-dark/80 via-transparent to-transparent opacity-90"></div>
            <div className="absolute bottom-3 left-3 right-3 text-white">
              <span className="text-[10px] font-extrabold text-jj-yellow block uppercase tracking-wider">HERITAGE PALACE</span>
              <span className="font-display text-sm font-bold block uppercase">JODHPUR, INDIA</span>
            </div>
          </div>

          <div className="relative rounded-3xl overflow-hidden aspect-[4/3] group border-2 border-jj-dark/15 bg-white">
            <img
              src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80"
              alt="Boutique Villa Suite"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-jj-dark/80 via-transparent to-transparent opacity-90"></div>
            <div className="absolute bottom-3 left-3 right-3 text-white">
              <span className="text-[10px] font-extrabold text-jj-pink block uppercase tracking-wider">BOUTIQUE VILLA</span>
              <span className="font-display text-sm font-bold block uppercase">UDAIPUR, INDIA</span>
            </div>
          </div>

          <div className="relative rounded-3xl overflow-hidden aspect-[4/3] group border-2 border-jj-dark/15 bg-white">
            <img
              src="https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=600&q=80"
              alt="Desert Haveli Spa"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-jj-dark/80 via-transparent to-transparent opacity-90"></div>
            <div className="absolute bottom-3 left-3 right-3 text-white">
              <span className="text-[10px] font-extrabold text-jj-yellow block uppercase tracking-wider">DESERT HAVELI</span>
              <span className="font-display text-sm font-bold block uppercase">JAISALMER, INDIA</span>
            </div>
          </div>

          <div className="relative rounded-3xl overflow-hidden aspect-[4/3] group border-2 border-jj-dark/15 bg-white">
            <img
              src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=600&q=80"
              alt="Beachfront Resort Pool"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-jj-dark/80 via-transparent to-transparent opacity-90"></div>
            <div className="absolute bottom-3 left-3 right-3 text-white">
              <span className="text-[10px] font-extrabold text-jj-pink block uppercase tracking-wider">BEACHFRONT RESORT</span>
              <span className="font-display text-sm font-bold block uppercase">GOA, INDIA</span>
            </div>
          </div>
        </div>
      </div>

      {/* Full-Screen Portfolio Card Container */}
      <div ref={cardsContainerRef} className="w-full max-w-[1720px] mx-auto px-3 sm:px-6 lg:px-10 xl:px-14 relative min-h-[86vh] lg:h-[88vh]">
        {projects.map((project, idx) => (
          <div
            key={project.id}
            onClick={() => setSelectedCase(project)}
            data-cursor="VIEW"
            className={`abhay-card ${idx > 0 ? 'absolute inset-0' : 'relative'} w-full h-full ${project.bgColor} ${project.textColor} rounded-[2rem] sm:rounded-[2.5rem] lg:rounded-[3rem] overflow-hidden cursor-pointer p-6 sm:p-10 lg:p-12 xl:p-14 border-2 border-black/15 flex flex-col justify-between shadow-2xl transition-shadow duration-300 hover:shadow-3xl`}
          >
            {/* 2-Column Split: Left (Text & Metrics) + Right (Visual Hero Artwork) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 xl:gap-14 items-stretch h-full">
              
              {/* Left Column (~5 cols): Title, Summary, Pill Button, Metrics Table */}
              <div className="lg:col-span-5 flex flex-col justify-between h-full space-y-4 sm:space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider opacity-60">
                      {project.location}
                    </span>
                    <span className={`text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider ${project.badgeBg}`}>
                      {project.category}
                    </span>
                  </div>

                  <h3 className="font-body text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold tracking-tight leading-none">
                    {project.title}
                  </h3>

                  <p className={`text-sm sm:text-base lg:text-lg font-normal leading-relaxed ${project.subTextColor}`}>
                    {project.description}
                  </p>

                  {/* Case Study Pill Triggers */}
                  <div className="flex items-center gap-3 pt-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedCase(project);
                      }}
                      className="inline-flex items-center gap-2 bg-[#0B0C10] text-white px-6 py-3 rounded-full text-xs font-extrabold uppercase tracking-wider hover:bg-jj-pink transition-colors border border-black/20 shadow-md"
                    >
                      <span>CASE STUDY</span>
                      <ArrowUpRight className="w-4 h-4 text-jj-yellow" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsFullScreenModal(true);
                        setSelectedCase(project);
                      }}
                      className="inline-flex items-center gap-2 bg-white/90 hover:bg-white text-jj-dark px-4 py-3 rounded-full text-xs font-bold uppercase tracking-wider transition-colors border border-black/15 shadow-sm"
                      title="Expand to Full Screen View"
                    >
                      <Maximize2 className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">FULL SCREEN</span>
                    </button>
                  </div>
                </div>

                {/* Performance Metrics Breakdown Table (Clean spacing, no cutoffs) */}
                <div className={`pt-4 border-t ${project.borderColor} space-y-2`}>
                  {project.metricsTable.map((row, rIdx) => (
                    <div key={rIdx} className={`flex items-center justify-between text-xs py-2 border-b ${project.borderColor}`}>
                      <span className="font-semibold tracking-normal opacity-80 uppercase text-[11px] sm:text-xs">{row.label}</span>
                      <span className="font-bold tracking-normal text-xs sm:text-[13px]">{row.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column (~7 cols): High-Impact Visual Hero Canvas */}
              <div className="lg:col-span-7 relative h-[320px] sm:h-[400px] lg:h-full min-h-[340px] lg:min-h-[480px] rounded-2xl sm:rounded-3xl overflow-hidden border-2 border-black/15 shadow-inner">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

                {/* Floating Metric Highlight Pill */}
                <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6 bg-white/95 backdrop-blur-md text-jj-dark p-4 sm:p-5 rounded-2xl flex items-center justify-between border-2 border-jj-dark/15 shadow-xl">
                  <div>
                    <span className="text-[10px] sm:text-xs font-extrabold text-jj-pink uppercase tracking-widest block">VERIFIED OUTCOME</span>
                    <span className="font-display text-xl sm:text-2xl lg:text-3xl font-extrabold text-jj-dark">{project.metricHighlight}</span>
                  </div>
                  <span className="text-[11px] sm:text-xs font-bold bg-jj-pink text-white px-3 sm:px-4 py-1.5 rounded-full shadow-sm">
                    JJ ELEVATE
                  </span>
                </div>
              </div>

            </div>
          </div>
        ))}
      </div>

      {/* Detail Modal / Full-Screen Mode */}
      {selectedCase && (
        <div className={`fixed inset-0 z-50 flex items-center justify-center ${isFullScreenModal ? 'p-0' : 'p-4 sm:p-6'} bg-jj-dark/85 backdrop-blur-md transition-all duration-300`}>
          <div className={`bg-white text-jj-dark ${isFullScreenModal ? 'w-full h-full rounded-none max-h-screen' : 'max-w-4xl w-full max-h-[92vh] rounded-[2rem]'} overflow-y-auto border-4 border-jj-dark relative p-6 sm:p-10 lg:p-12 transition-all duration-300`}>
            <div className="absolute top-6 right-6 flex items-center gap-2 z-10">
              <button
                onClick={() => setIsFullScreenModal(!isFullScreenModal)}
                className="p-2.5 bg-gray-100 hover:bg-gray-200 text-jj-dark rounded-full transition-colors border border-black/10 shadow-sm"
                title={isFullScreenModal ? 'Exit Full Screen' : 'Toggle Full Screen'}
              >
                {isFullScreenModal ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
              </button>
              <button
                onClick={() => {
                  setSelectedCase(null);
                  setIsFullScreenModal(false);
                }}
                className="p-2.5 bg-jj-dark text-white rounded-full hover:bg-jj-pink transition-colors shadow-sm"
                title="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2 mb-6 pr-20">
              <span className="text-xs font-bold text-jj-pink uppercase tracking-widest">
                CASE STUDY DETAILS • {selectedCase.location}
              </span>
              <h3 className="font-body text-3xl sm:text-4xl lg:text-5xl font-extrabold text-jj-dark">
                {selectedCase.title}
              </h3>
            </div>

            <div className="bg-jj-pink text-white p-6 sm:p-8 mb-8 rounded-2xl border border-white/20 shadow-lg flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold text-white/90 uppercase tracking-widest block mb-1">VERIFIED METRIC RESULT</span>
                <div className="font-display text-4xl sm:text-5xl font-extrabold text-white">{selectedCase.metricHighlight}</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-xl text-xs font-extrabold uppercase tracking-wider text-white">
                {selectedCase.category}
              </div>
            </div>

            <div className="space-y-8 mb-8">
              <div>
                <h4 className="font-display text-xl sm:text-2xl font-bold uppercase text-jj-dark border-b border-jj-dark/10 pb-2 mb-3">
                  THE CHALLENGE
                </h4>
                <p className="text-base sm:text-lg text-jj-dark/90 font-normal leading-relaxed">
                  {selectedCase.fullDetails.challenge}
                </p>
              </div>

              <div>
                <h4 className="font-display text-xl sm:text-2xl font-bold uppercase text-jj-dark border-b border-jj-dark/10 pb-2 mb-3">
                  JJ ELEVATE EXECUTION & STRATEGY
                </h4>
                <p className="text-base sm:text-lg text-jj-dark/90 font-normal leading-relaxed">
                  {selectedCase.fullDetails.strategy}
                </p>
              </div>

              <div>
                <h4 className="font-display text-xl sm:text-2xl font-bold uppercase text-jj-dark border-b border-jj-dark/10 pb-2 mb-4">
                  MEASURABLE RESULTS
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {selectedCase.fullDetails.results.map((res, i) => (
                    <div key={i} className="flex items-center gap-3 bg-jj-offwhite p-4 rounded-xl border border-jj-dark/10 shadow-sm">
                      <CheckCircle2 className="w-5 h-5 text-jj-pink shrink-0" />
                      <span className="text-sm sm:text-base font-bold text-jj-dark">{res}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Showcase Image inside modal */}
              <div className="rounded-2xl overflow-hidden border-2 border-black/15 shadow-md">
                <img
                  src={selectedCase.image}
                  alt={selectedCase.title}
                  className="w-full h-64 sm:h-96 object-cover"
                />
              </div>
            </div>

            <div className="pt-6 border-t border-jj-dark/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-xs text-jj-dark/70 font-bold uppercase">READY TO REPLICATE THESE RESULTS FOR YOUR HOTEL?</span>
              <MagneticButton
                onClick={() => {
                  setSelectedCase(null);
                  setIsFullScreenModal(false);
                  onOpenConsultation();
                }}
                className="w-full sm:w-auto px-6 py-3 bg-jj-pink text-white font-display text-sm font-bold uppercase tracking-wider hover:bg-jj-dark rounded-full border border-white/20 shadow-md"
              >
                SCHEDULE STRATEGY CALL →
              </MagneticButton>
            </div>
          </div>
        </div>
      )}

    </section>
  );
}
