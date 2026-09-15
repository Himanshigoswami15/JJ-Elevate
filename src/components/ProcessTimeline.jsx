import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Search, Compass, Rocket, BarChart3 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function ProcessTimeline() {
  const sectionRef = useRef(null);
  const progressBarRef = useRef(null);

  const steps = [
    {
      num: '01',
      title: 'DISCOVER & AUDIT',
      icon: Search,
      copy: 'We analyze your current channel mix, OTA commission leakages, Google Search ranking gaps, website conversion bottlenecks, and target traveler demographics.',
      deliverables: ['OTA Commission Leakage Audit', 'Competitor Rate Parity Review', 'Target Guest Persona Map']
    },
    {
      num: '02',
      title: 'STRATEGIZE & POSITION',
      icon: Compass,
      copy: 'We build a tailored 90-day direct growth roadmap, establishing your brand visual aesthetic, direct rate incentive model, and high-ROAS paid media strategy.',
      deliverables: ['Custom Growth Blueprint', 'Direct Rate Parity Strategy', 'Paid Media Budget Allocation']
    },
    {
      num: '03',
      title: 'EXECUTE & LAUNCH',
      icon: Rocket,
      copy: 'We design and deploy high-converting landing pages, produce luxury photography/video media, and launch hyper-targeted Google Search & Meta Ad campaigns.',
      deliverables: ['High-Speed Web Portal', 'Cinematic Media Assets', 'Google & Meta Campaign Launch']
    },
    {
      num: '04',
      title: 'OPTIMIZE & SCALE',
      icon: BarChart3,
      copy: 'We continuously monitor room night bookings, optimize keyword bids, perform A/B testing on booking engine checkouts, and provide weekly transparent ROI reports.',
      deliverables: ['Weekly RevPAR & ROAS Reporting', 'Continuous Conversion Optimization', 'Guest Re-engagement Automation']
    }
  ];

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        progressBarRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 50%',
            end: 'bottom 70%',
            scrub: 0.8
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="process" ref={sectionRef} className="py-32 bg-jj-dark text-white relative section-transition-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-20 border-b border-white/10 pb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="w-8 h-[2px] bg-jj-pink"></span>
              <span className="text-xs font-extrabold uppercase tracking-widest text-jj-pink">
                SCROLL PROGRESSION FRAMEWORK
              </span>
            </div>
            <h2 className="clamp-heading font-display font-extrabold text-white tracking-tight uppercase">
              HOW WE <span className="text-jj-pink">ELEVATE BRANDS.</span>
            </h2>
          </div>
          <p className="text-white/70 max-w-md text-base mt-4 lg:mt-0">
            A structured, battle-tested methodology designed to transition hotels from OTA dependency to direct booking dominance.
          </p>
        </div>

        {/* Timeline Items */}
        <div className="relative border-l-2 border-white/10 ml-4 lg:ml-8 space-y-16">
          
          {/* Animated Filling Line */}
          <div
            ref={progressBarRef}
            className="absolute top-0 left-[-2px] w-[2px] h-full bg-jj-pink origin-top"
          ></div>

          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="relative pl-8 lg:pl-12 group"
              >
                {/* Marker */}
                <div className="absolute -left-[17px] top-0 w-8 h-8 bg-jj-dark border-2 border-jj-pink text-jj-pink font-bold text-xs flex items-center justify-center rounded-full group-hover:bg-jj-pink group-hover:text-white transition-colors">
                  {step.num}
                </div>

                <div className="bg-jj-dark-card p-8 border border-white/[0.06] group-hover:border-jj-pink/40 transition-all duration-500 rounded-2xl">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 bg-jj-pink/20 text-jj-pink">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-jj-pink uppercase tracking-wider block">STAGE {step.num}</span>
                      <h3 className="font-display text-2xl sm:text-3xl font-bold uppercase text-white tracking-wider">
                        {step.title}
                      </h3>
                    </div>
                  </div>

                  <p className="text-white/80 text-base font-light leading-relaxed mb-6 max-w-3xl">
                    {step.copy}
                  </p>

                  <div className="pt-4 border-t border-white/10 flex flex-wrap items-center gap-3">
                    <span className="text-xs font-bold text-jj-pink uppercase tracking-wider mr-2">KEY DELIVERABLES:</span>
                    {step.deliverables.map((del, i) => (
                      <span key={i} className="text-xs bg-white/5 border border-white/10 px-3 py-1 text-white/90">
                        ✓ {del}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
