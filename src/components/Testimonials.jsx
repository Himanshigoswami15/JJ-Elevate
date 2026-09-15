import React from 'react';

/* =========================================================================
   Testimonials — Exact Sociallyin-inspired "What Our Clients Say" Section
   Theme: Signature Brand Crimson (#FF1E56) Vibrant Canvas
   Features:
   - Vibrant brand crimson gradient background (#FF235B -> #FF1E56 -> #D00B3F)
   - Crisp white dot matrix grid clusters
   - Bold uppercase header: "WHAT OUR CLIENTS SAY" in white
   - Obsidian dark "SEE MORE" button with gold lettering (#FFDE00)
   - Large elevated white testimonial cards with double border & soft depth shadows
   - Circular logo badge top-left + signature yellow quotation marks top-right
   - Authentic, detailed client testimonials with bold author titles
   - Sweeping wave divider into the next dark section (#0B0C10)
   ========================================================================= */



// Signature Sociallyin-style Double Yellow Quotation Mark Icon
function YellowQuoteMark({ className = "w-9 h-7" }) {
  return (
    <svg
      viewBox="0 0 36 28"
      fill="currentColor"
      className={`text-[#FFDE00] select-none ${className}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* First Quote Block */}
      <path d="M0 16C0 7.16 6.27 1.25 15.68 0L16.48 4.2C10.72 5.32 8.32 8.82 8.16 12.32H16V28H0V16Z" />
      {/* Second Quote Block */}
      <path d="M20 16C20 7.16 26.27 1.25 35.68 0L36.48 4.2C30.72 5.32 28.32 8.82 28.16 12.32H36V28H20V16Z" />
    </svg>
  );
}

const clientTestimonials = [
  {
    author: 'VIKRAMADITYA SINGH',
    organization: 'Heritage Palace Resorts, Jodhpur',
    avatarText: 'HP',
    logoBg: 'bg-amber-50 text-amber-700 border-amber-200',
    quote:
      "So far we've seen INSANE growth across all of our properties. Direct bookings surged by over +42%, while OTA commission dependencies dropped from 24% to under 9% in less than 90 days. Their team manages our Google Hotel Ads, Meta campaigns, and high-fashion property reels with exceptional precision and proactive communication. Highly recommended for any serious hospitality brand.",
  },
  {
    author: 'ANANYA MEHTA',
    organization: 'Villa Shanti Luxury Stays, Udaipur',
    avatarText: 'VS',
    logoBg: 'bg-rose-50 text-rose-700 border-rose-200',
    quote:
      "JJ Elevate's project management is great. We have a platform where we share all of our ideas and anything that we come up with and they're prompt and responsive. Everything is highly organized. In general, everything runs smoothly. Our teams get along well, and their communication skills are great. On top of that, JJ Elevate has been organized; they schedule things ahead, which makes the projects a lot less stressful for me. They worked very hard to meet our needs and we came away very happy.",
  },
  {
    author: 'RAJESHWAR SHARMA',
    organization: 'Desert Haven Haveli & Spa, Jaisalmer',
    avatarText: 'DH',
    logoBg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    quote:
      "The ROI on Google Search and Performance Max managed by JJ Elevate has exceeded 4.8X consistently. They don't just run ads—they engineered our direct WhatsApp rate concierge and direct booking engine. They are transparent, data-driven, and truly operate as an extension of our internal team.",
  },
  {
    author: 'ROHIT VERMA',
    organization: 'Coastal Palms Resort, Goa',
    avatarText: 'CP',
    logoBg: 'bg-sky-50 text-sky-700 border-sky-200',
    quote:
      "Our direct revenue scaled past ₹1.8 Crore within our first high season with JJ Elevate. Their cinematic 4K drone reels captured international guests, while their CRM retargeting funnels gave us near-zero checkout drop-offs. Truly the best decision we made for our resort.",
  },
];

export default function Testimonials({ onOpenConsultation }) {
  return (
    <section
      id="testimonials"
      className="resp-section relative w-full bg-gradient-to-br from-[#FF235B] via-[#FF1E56] to-[#D00B3F] text-white overflow-hidden select-none"
    >


      <div className="relative max-w-7xl mx-auto resp-container z-10">
        {/* Header Strip: Title */}
        <div className="text-center max-w-4xl mx-auto mb-10 sm:mb-16">
          <h2 className="resp-section-title font-display font-black text-white tracking-tight uppercase leading-none drop-shadow-sm">
            WHAT OUR CLIENTS SAY
          </h2>
        </div>

        {/* 2-Column Testimonials Grid (White Cards with Soft Shadows on Crimson Canvas) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-10 items-stretch">
          {clientTestimonials.slice(0, 2).map((testimonial, idx) => (
            <div
              key={idx}
              data-cursor="REVIEW"
              className="resp-card luxury-spotlight-card group relative bg-white border-2 border-white/80 shadow-[0_20px_50px_rgba(150,8,45,0.35)] hover:shadow-[0_28px_65px_rgba(150,8,45,0.5)] hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between cursor-pointer"
            >
              <div>
                {/* Top Row: Circular Badge Left + Double Yellow Quotes Right */}
                <div className="flex items-center justify-between gap-4 mb-8">
                  {/* Circular Logo/Avatar Badge with light ring */}
                  <div
                    className={`w-16 h-16 rounded-full border-2 flex items-center justify-center font-display font-black text-xl tracking-wider shadow-inner ${testimonial.logoBg}`}
                  >
                    {testimonial.avatarText}
                  </div>

                  {/* Signature Yellow Quote Marks */}
                  <YellowQuoteMark className="w-10 h-8 sm:w-11 sm:h-9" />
                </div>

                {/* Testimonial Quote Copy */}
                <p className="text-slate-700 font-normal text-sm sm:text-base lg:text-[16.5px] leading-relaxed mb-10">
                  {testimonial.quote}
                </p>
              </div>

              {/* Card Footer: Author Name in Bold Condensed Font + Organization */}
              <div className="pt-6 border-t border-black/[0.06]">
                <h3 className="font-display font-black text-xl sm:text-3xl text-jj-dark group-hover:text-jj-pink transition-colors uppercase tracking-tight leading-none mb-1.5">
                  {testimonial.author}
                </h3>
                <p className="text-slate-500 font-medium text-sm sm:text-base">
                  {testimonial.organization}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Secondary Row for More Testimonials on Scroll */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-10 items-stretch mt-6 sm:mt-10">
          {clientTestimonials.slice(2, 4).map((testimonial, idx) => (
            <div
              key={idx}
              data-cursor="REVIEW"
              className="group luxury-spotlight-card relative bg-white rounded-[24px] sm:rounded-[36px] p-6 sm:p-10 lg:p-12 border-2 border-white/80 shadow-[0_20px_50px_rgba(150,8,45,0.35)] hover:shadow-[0_28px_65px_rgba(150,8,45,0.5)] hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between cursor-pointer"
            >
              <div>
                {/* Top Row: Circular Badge Left + Double Yellow Quotes Right */}
                <div className="flex items-center justify-between gap-4 mb-8">
                  {/* Circular Logo/Avatar Badge */}
                  <div
                    className={`w-16 h-16 rounded-full border-2 flex items-center justify-center font-display font-black text-xl tracking-wider shadow-inner ${testimonial.logoBg}`}
                  >
                    {testimonial.avatarText}
                  </div>

                  {/* Signature Yellow Quote Marks */}
                  <YellowQuoteMark className="w-10 h-8 sm:w-11 sm:h-9" />
                </div>

                {/* Testimonial Quote Copy */}
                <p className="text-slate-700 font-normal text-sm sm:text-base lg:text-[16.5px] leading-relaxed mb-10">
                  {testimonial.quote}
                </p>
              </div>

              {/* Card Footer: Author Name in Bold Condensed Font + Organization */}
              <div className="pt-6 border-t border-black/[0.06]">
                <h3 className="font-display font-black text-xl sm:text-3xl text-jj-dark group-hover:text-jj-pink transition-colors uppercase tracking-tight leading-none mb-1.5">
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

      {/* Sweeping Organic Wave Bottom Shape Divider into Next Off-white Section (#FAF9F6) */}
      <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-none pointer-events-none z-10">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 137.6"
          preserveAspectRatio="none"
          className="relative block w-full h-12 sm:h-20 lg:h-24 text-[#FAF9F6]"
        >
          <path
            d="M0 137.6h1200V21.9l-66.7 26.7c-66.7 26.7-200 80-333.3 66.7S533.3 21.9 400 4.2C266.7-13.9 133.3 31.1 66.7 53L0 75.3v62.3z"
            fill="currentColor"
          />
        </svg>
      </div>
    </section>
  );
}
