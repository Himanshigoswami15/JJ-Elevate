import React from 'react';
import { useAdminData } from '../context/AdminDataContext';

// Signature Sociallyin-style Double Yellow Quotation Mark Icon
function YellowQuoteMark({ className = "w-9 h-7" }) {
  return (
    <svg
      viewBox="0 0 36 28"
      fill="currentColor"
      className={`text-[#FFDE00] select-none ${className}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M0 16C0 7.16 6.27 1.25 15.68 0L16.48 4.2C10.72 5.32 8.32 8.82 8.16 12.32H16V28H0V16Z" />
      <path d="M20 16C20 7.16 26.27 1.25 35.68 0L36.48 4.2C30.72 5.32 28.32 8.82 28.16 12.32H36V28H20V16Z" />
    </svg>
  );
}

const defaultTestimonials = [
  {
    author: 'VIKRAMADITYA SINGH',
    organization: 'Heritage Palace Resorts, Jodhpur',
    image: '/images/testimonials/vikramaditya.jpg',
    avatarText: 'HP',
    logoBg: 'bg-amber-50 text-amber-700 border-amber-200',
    quote:
      "So far we've seen INSANE growth across all of our properties. Direct bookings surged by over +42%, while OTA commission dependencies dropped from 24% to under 9% in less than 90 days. Their team manages our Google Hotel Ads, Meta campaigns, and high-fashion property reels with exceptional precision and proactive communication. Highly recommended for any serious hospitality brand.",
  },
  {
    author: 'ANANYA MEHTA',
    organization: 'Villa Shanti Luxury Stays, Udaipur',
    image: '/images/testimonials/ananya.jpg',
    avatarText: 'VS',
    logoBg: 'bg-rose-50 text-rose-700 border-rose-200',
    quote:
      "JJ Elevate's project management is great. We have a platform where we share all of our ideas and anything that we come up with and they're prompt and responsive. Everything is highly organized. In general, everything runs smoothly. Our teams get along well, and their communication skills are great. On top of that, JJ Elevate has been organized; they schedule things ahead, which makes the projects a lot less stressful for me. They worked very hard to meet our needs and we came away very happy.",
  },
  {
    author: 'RAJESHWAR SHARMA',
    organization: 'Desert Haven Haveli & Spa, Jaisalmer',
    image: '/images/testimonials/rajeshwar.jpg',
    avatarText: 'DH',
    logoBg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    quote:
      "The ROI on Google Search and Performance Max managed by JJ Elevate has exceeded 4.8X consistently. They don't just run ads—they engineered our direct WhatsApp rate concierge and direct booking engine. They are transparent, data-driven, and truly operate as an extension of our internal team.",
  },
  {
    author: 'ROHIT VERMA',
    organization: 'Coastal Palms Resort, Goa',
    image: '/images/testimonials/rohit.jpg',
    avatarText: 'CP',
    logoBg: 'bg-sky-50 text-sky-700 border-sky-200',
    quote:
      "Our direct revenue scaled past ₹1.8 Crore within our first high season with JJ Elevate. Their cinematic 4K drone reels captured international guests, while their CRM retargeting funnels gave us near-zero checkout drop-offs. Truly the best decision we made for our resort.",
  },
];

export default function Testimonials({ onOpenConsultation }) {
  let adminTestimonials = null;
  try {
    const adminCtx = useAdminData();
    adminTestimonials = adminCtx?.data?.testimonials;
  } catch {
    // context fallback
  }

  const activeTestimonials = (adminTestimonials && adminTestimonials.length > 0)
    ? adminTestimonials.map((t, idx) => ({
        author: t.author || t.clientName || 'HOTEL LEADER',
        organization: t.organization || t.property || 'Luxury Hospitality',
        image: t.image || t.avatar || '/images/testimonials/vikramaditya.jpg',
        avatarText: t.avatarText || (t.author ? t.author.split(' ').map(w => w[0]).join('').slice(0, 2) : 'HT'),
        logoBg: t.logoBg || (idx % 2 === 0 ? 'bg-amber-50 text-amber-700 border-amber-200' : 'bg-rose-50 text-rose-700 border-rose-200'),
        quote: t.quote || t.content || ''
      }))
    : defaultTestimonials;

  return (
    <section
      id="testimonials"
      className="resp-section relative w-full bg-gradient-to-br from-[#FF235B] via-[#FF1E56] to-[#D00B3F] text-white overflow-hidden select-none py-16 sm:py-24"
    >
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        {/* Header Strip: Title */}
        <div className="text-center max-w-4xl mx-auto mb-10 sm:mb-16">
          <h2 className="resp-section-title font-display font-black text-white tracking-tight uppercase leading-none drop-shadow-sm text-3xl sm:text-5xl lg:text-6xl">
            WHAT OUR CLIENTS SAY
          </h2>
        </div>

        {/* Dynamic Testimonials Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-10 items-stretch">
          {activeTestimonials.map((testimonial, idx) => (
            <div
              key={idx}
              data-cursor="REVIEW"
              className="resp-card luxury-spotlight-card group relative bg-white border-2 border-white/80 shadow-[0_20px_50px_rgba(150,8,45,0.35)] hover:shadow-[0_28px_65px_rgba(150,8,45,0.5)] hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between cursor-pointer rounded-2xl p-6 sm:p-8"
            >
              <div>
                {/* Top Row: Circular Badge Left + Double Yellow Quotes Right */}
                <div className="flex items-center justify-between gap-4 mb-6">
                  {/* Circular Avatar Photo */}
                  <div className="shrink-0">
                    <img
                      src={testimonial.image}
                      alt={testimonial.author}
                      className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover object-top border-2 border-white shadow-lg ring-2 ring-black/10 group-hover:ring-[#FF1E56]/40 transition-all duration-300"
                      onError={(e) => { e.target.src = '/images/testimonials/vikramaditya.jpg'; }}
                      loading="lazy"
                    />
                  </div>

                  {/* Signature Yellow Quote Marks */}
                  <YellowQuoteMark className="w-10 h-8 sm:w-11 sm:h-9" />
                </div>

                {/* Testimonial Quote Copy */}
                <p className="text-slate-700 font-normal text-sm sm:text-base lg:text-[16.5px] leading-relaxed mb-8">
                  "{testimonial.quote}"
                </p>
              </div>

              {/* Card Footer: Author Name in Bold Condensed Font + Organization */}
              <div className="pt-6 border-t border-black/[0.06]">
                <h3 className="font-display font-black text-xl sm:text-2xl text-jj-dark group-hover:text-jj-pink transition-colors uppercase tracking-tight leading-none mb-1.5">
                  {testimonial.author}
                </h3>
                <p className="text-slate-500 font-medium text-sm sm:text-base">
                  {testimonial.organization}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
