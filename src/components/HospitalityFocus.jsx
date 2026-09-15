import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Compass, MapPin } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function HospitalityFocus() {
  const sectionRef = useRef(null);
  const bgImgRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        bgImgRef.current,
        { scale: 1.15, opacity: 0.15 },
        {
          scale: 1,
          opacity: 0.35,
          duration: 1.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%'
          }
        }
      );

      gsap.fromTo(
        contentRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%'
          }
        }
      );

      gsap.to(bgImgRef.current, {
        y: -60,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const propertyTypes = [
    { name: 'LUXURY HERITAGE HOTELS', count: '45+ Properties' },
    { name: 'BOUTIQUE BEACH RESORTS', count: '30+ Properties' },
    { name: 'ROYAL PALACE HAVELIS', count: '25+ Properties' },
    { name: 'ECO VILLAS & GLAMPING', count: '20+ Properties' },
  ];

  return (
    <section ref={sectionRef} className="relative py-36 bg-jj-dark text-white overflow-hidden">
      {/* Full-width Resort Image */}
      <div className="absolute inset-0 z-0">
        <img
          ref={bgImgRef}
          src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1600&q=80"
          alt="Luxury Resort Infinity Pool"
          className="w-full h-full object-cover opacity-35"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-jj-dark via-jj-dark/90 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-jj-dark via-transparent to-jj-dark opacity-90"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div ref={contentRef} className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-8 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-jj-pink/20 border border-jj-pink/40 text-jj-pink text-xs font-bold uppercase tracking-widest rounded-full">
              <Compass className="w-4 h-4" />
              <span>DEEP DOMAIN SPECIALIZATION</span>
            </div>

            <div>
              <h2 className="clamp-heading font-display font-extrabold text-white tracking-tight uppercase leading-[0.9]">
                WE KNOW <br />
                <span className="text-jj-pink">HOSPITALITY.</span>
              </h2>
            </div>

            <p className="text-xl sm:text-2xl text-jj-pink font-light tracking-wide uppercase">
              HOTELS. RESORTS. VILLAS. HOMESTAYS. TRAVEL BRANDS.
            </p>

            <p className="text-base sm:text-lg text-white/80 max-w-2xl font-light leading-relaxed">
              Generic digital agencies don't understand lead time seasonality, room inventory rates, channel managers, or the psychology of high-spending travelers. We speak your language: RevPAR, ADR, occupancy rates, and direct booking engines.
            </p>

            {/* Property Types */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-white/10">
              {propertyTypes.map((prop, idx) => (
                <div key={idx} className="bg-white/5 backdrop-blur-sm p-4 border border-white/10">
                  <span className="text-[10px] font-bold text-jj-pink block tracking-wider uppercase">{prop.count}</span>
                  <span className="font-display text-sm font-bold text-white tracking-wider block mt-1">{prop.name}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-4 bg-jj-pink p-8 text-white relative shadow-2xl border-2 border-white/20">
            <div className="absolute -top-3 -left-3 bg-jj-dark text-white font-extrabold text-xs px-3 py-1 uppercase">
              OUR JODHPUR HQ
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-white" />
                <span className="font-display text-lg font-bold">BORN IN THE HEART OF HERITAGE</span>
              </div>
              <p className="text-xs text-white/90 leading-relaxed font-light">
                Headquartered in Jodhpur, India—the epicenter of royal heritage tourism—we understand authentic luxury hospitality from the ground up.
              </p>
              <div className="pt-4 border-t border-white/20 text-xs font-semibold text-white tracking-wider uppercase">
                GLOBAL MARKETING STANDARDS × INDIAN HOSPITALITY WARMTH
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
