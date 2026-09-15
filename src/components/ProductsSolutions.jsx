import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Cpu, Bot, CreditCard, MessageSquare, Mail, MapPin, Layout, Calendar, ArrowUpRight } from 'lucide-react';
import MagneticButton from './motion/MagneticButton';

gsap.registerPlugin(ScrollTrigger);

export default function ProductsSolutions({ onOpenConsultation }) {
  const sectionRef = useRef(null);
  const scrollTrackRef = useRef(null);

  const products = [
    {
      title: 'HOSPITALITY CMS',
      badge: 'PROPRIETARY ENGINE',
      icon: Layout,
      description: 'Lightning-fast resort website content manager tailored for room inventory, dynamic rate display, and seasonal package updates.'
    },
    {
      title: 'DIRECT BOOKING ENGINE',
      badge: 'COMMISSION-FREE',
      icon: Calendar,
      description: 'Frictionless 2-step booking interface with real-time rate parity guarantees, add-on spa upsells, and instant SMS voucher delivery.'
    },
    {
      title: 'AI RESERVATION DESK',
      badge: '24/7 AUTOMATED',
      icon: Bot,
      description: 'Smart AI agent that instantly answers traveler rate queries, room availability, and villa policies across website & WhatsApp.'
    },
    {
      title: 'HYPER-PAYMENT GATEWAY',
      badge: 'LOCAL & GLOBAL',
      icon: CreditCard,
      description: 'Instant zero-drop checkout supporting UPI, Credit/Debit cards, NetBanking, and multicurrency international guest payments.'
    },
    {
      title: 'WHATSAPP REVENUE ENGINE',
      badge: '98% OPEN RATE',
      icon: MessageSquare,
      description: 'Automated broadcast campaigns for long weekend discounts, wedding venue inquiries, and direct guest re-booking incentives.'
    },
    {
      title: 'HOTEL LOCAL SEO ENGINE',
      badge: 'MAPS DOMINANCE',
      icon: MapPin,
      description: 'Automated local business listing optimization ensuring top placement on Google Maps for "best resorts near me".'
    },
    {
      title: 'AUTOMATED EMAIL NURTURE',
      badge: 'LIFETIME VALUE',
      icon: Mail,
      description: 'Pre-arrival itinerary drip emails and post-stay review requests that build 5-star Google & TripAdvisor reputations.'
    },
    {
      title: 'AI FRONT DESK & CONCIERGE',
      badge: 'IN-PROPERTY TECH',
      icon: Cpu,
      description: 'Digital room service menu, spa appointment booking, and instant guest concierge assistant accessible via QR code.'
    }
  ];

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || window.innerWidth < 1024) return;

    const ctx = gsap.context(() => {
      const track = scrollTrackRef.current;
      const getScrollAmount = () => -(track.scrollWidth - window.innerWidth + 80);

      gsap.to(track, {
        x: getScrollAmount,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: () => `+=${track.scrollWidth - window.innerWidth}`,
          pin: true,
          scrub: 0.5,
          invalidateOnRefresh: true
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="products" className="py-28 bg-jj-dark text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between border-b border-white/10 pb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="w-8 h-[2px] bg-jj-pink"></span>
              <span className="text-xs font-extrabold uppercase tracking-widest text-jj-pink">
                HORIZONTAL SCROLL TECH SUITE
              </span>
            </div>
            <h2 className="clamp-heading font-display font-extrabold text-white tracking-tight uppercase">
              TECHNOLOGY THAT <br />
              <span className="text-jj-pink">ELEVATES HOSPITALITY.</span>
            </h2>
          </div>
          <p className="text-white/70 max-w-md text-base mt-4 lg:mt-0">
            Scroll vertically to navigate horizontally through our digital hospitality solutions.
          </p>
        </div>
      </div>

      {/* Horizontal Scroll Track */}
      <div className="w-full overflow-hidden">
        <div
          ref={scrollTrackRef}
          className="flex gap-6 px-4 sm:px-6 lg:px-8 w-max transition-transform duration-100 ease-linear"
        >
          {products.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="w-[320px] sm:w-[380px] bg-jj-dark-card p-8 border border-white/10 flex flex-col justify-between hover:border-jj-pink transition-all duration-300 group shrink-0"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="p-3.5 bg-jj-pink/20 text-jj-pink group-hover:bg-jj-pink group-hover:text-white transition-colors">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-bold text-jj-pink border border-jj-pink/30 px-2.5 py-1 uppercase tracking-wider">
                      {item.badge}
                    </span>
                  </div>

                  <h3 className="font-display text-2xl font-bold uppercase text-white tracking-wider mb-3 group-hover:text-jj-pink transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-sm text-white/70 leading-relaxed font-light">
                    {item.description}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-white/10">
                  <MagneticButton
                    onClick={onOpenConsultation}
                    dataCursor="DEMO"
                    className="w-full py-3 bg-white/5 border border-white/10 hover:bg-jj-pink text-xs font-bold uppercase tracking-wider text-white flex items-center justify-between px-4"
                  >
                    <span>REQUEST TECH DEMO</span>
                    <ArrowUpRight className="w-4 h-4 text-white" />
                  </MagneticButton>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </section>
  );
}
