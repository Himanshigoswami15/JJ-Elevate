import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  CheckCircle2, 
  Linkedin, 
  ChevronLeft, 
  ChevronRight 
} from 'lucide-react';

export const teamMembersData = [
  {
    id: 'yash',
    name: 'Yash Pareek',
    role: 'SR. GRAPHIC DESIGNER & ART DIRECTOR',
    category: 'CREATIVE',
    highlightBadge: 'CREATIVE ART DIRECTOR',
    experience: '100/100 LIGHTHOUSE',
    bio: 'Visual identity architect with an eye for luxury editorial layouts and high-converting ad graphics that stand out in crowded feeds and command premium room rates.',
    specialties: ['Luxury Brand Identity', 'Conversion Creatives', 'Visual Storytelling'],
    image: '/images/team/YASH.png',
    linkedin: 'https://www.linkedin.com/'
  },
  {
    id: 'arshad',
    name: 'Arshad Ali',
    role: 'SR. VIDEO EDITOR & DIRECTOR',
    category: 'CREATIVE',
    highlightBadge: '4K REELS DIRECTOR',
    experience: '10M+ VIRAL VIEWS',
    bio: 'Master of luxury visual pacing, sound design, and drone cinematography. Crafts fashion-grade Instagram reels and property showcases that drive instant wanderlust and direct inquiries.',
    specialties: ['Cinematic Drone Video', 'Viral Reels Pacing', 'Sound Engineering'],
    image: '/images/team/ARSHAD.png',
    linkedin: 'https://www.linkedin.com/'
  },
  {
    id: 'altaf',
    name: 'Altaf Mohammed',
    role: 'BUSINESS DEVELOPMENT MANAGER',
    category: 'LEADERSHIP',
    highlightBadge: 'HOSPITALITY PARTNERSHIPS',
    experience: '180% CLIENT GROWTH',
    bio: 'Connects luxury hotel owners, resort general managers, and boutique villa operators with tailor-made growth ecosystems that transform their direct revenue bottom line.',
    specialties: ['Revenue Partnerships', 'Client Growth Funnels', 'Hospitality Tech'],
    image: '/images/team/ALTAF.png',
    linkedin: 'https://www.linkedin.com/'
  },
  {
    id: 'pushpendra',
    name: 'Pushpendra Sharma',
    role: 'PROJECT MANAGER & PPC LEAD',
    category: 'PERFORMANCE',
    highlightBadge: 'PERFORMANCE MAX',
    experience: '$80M+ MEDIA MANAGED',
    bio: 'Manages multi-crore paid search campaigns across Google Ads and Meta. Masters precise traveler retargeting to maximize direct guest acquisition and room ADR.',
    specialties: ['Google Hotel Ads', 'Meta Retargeting', 'Budget Optimization'],
    image: '/images/team/PUSHPENDRA.png',
    linkedin: 'https://www.linkedin.com/'
  },
  {
    id: 'cvsingh',
    name: 'Chandra Vardhan Singh Jodha',
    role: 'HEAD OF SEO STRATEGY',
    category: 'PERFORMANCE',
    highlightBadge: 'EX-SEARCH ENGINEER',
    experience: '50+ #1 RANKINGS',
    bio: 'Deep technical SEO specialist. Has propelled 50+ luxury hospitality brands from Google search obscurity to #1 rankings for high-intent seasonal booking queries.',
    specialties: ['Destination Keyword SEO', 'Google Maps GBP', 'Schema Architecture'],
    image: '/images/team/CVSINGH.png',
    linkedin: 'https://www.linkedin.com/'
  },
  {
    id: 'yuvraj',
    name: 'Yuvraj Singh Shekhawat',
    role: 'CO-FOUNDER & GROWTH ARCHITECT',
    category: 'LEADERSHIP',
    highlightBadge: 'EX-HOSPITALITY DIRECTOR',
    experience: '8+ YEARS LUXURY HOTEL STRATEGY',
    bio: 'Pioneered full-funnel hospitality growth frameworks. Scaled boutique palaces, heritage Havelis, and international luxury resort chains to sustainable 75%+ direct booking volume.',
    specialties: ['Direct Booking Engines', 'RevPAR Scaling', 'Hospitality M&A'],
    image: '/images/team/YUVRAJSINGH.png',
    linkedin: 'https://www.linkedin.com/in/yuvrajshekhawat/'
  }
];

export default function DreamTeam({ className = '' }) {
  // Order so that in cover-flow: Arshad (left), Yash (center), Altaf (right)
  // Let team order be: Arshad, Yash, Altaf, Pushpendra, CVSingh, Yuvraj
  const orderedTeam = [
    teamMembersData[1], // Arshad
    teamMembersData[0], // Yash
    teamMembersData[2], // Altaf
    teamMembersData[3], // Pushpendra
    teamMembersData[4], // CVSingh
    teamMembersData[5], // Yuvraj
  ];

  const [activeTeamIndex, setActiveTeamIndex] = useState(1); // Default to Yash (index 1) in center
  const [isTeamPaused, setIsTeamPaused] = useState(false);

  const nextTeamCard = () => {
    if (orderedTeam.length <= 1) return;
    setActiveTeamIndex((prev) => (prev + 1) % orderedTeam.length);
  };

  const prevTeamCard = () => {
    if (orderedTeam.length <= 1) return;
    setActiveTeamIndex((prev) => (prev - 1 + orderedTeam.length) % orderedTeam.length);
  };

  // Continuous smooth auto-advance rotation across team members (pauses on hover/touch)
  useEffect(() => {
    if (isTeamPaused || orderedTeam.length <= 1) return;
    const timer = setInterval(() => {
      nextTeamCard();
    }, 4200);
    return () => clearInterval(timer);
  }, [isTeamPaused, orderedTeam.length, activeTeamIndex]);

  return (
    <section className={`relative w-full py-14 sm:py-20 overflow-hidden bg-[#FAF9F6] ${className}`}>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-black/10 text-xs font-black uppercase tracking-widest text-jj-pink mb-4 shadow-sm">
            <Users className="w-3.5 h-3.5 text-jj-pink" />
            <span>THE ARCHITECTS OF DIRECT REVENUE</span>
          </div>
          
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black uppercase text-jj-dark tracking-tight leading-none mb-4">
            MEET THE{' '}
            <span className="text-jj-pink relative inline-block">
              DREAM TEAM
              <span className="absolute -bottom-1.5 left-0 right-0 h-1.5 bg-[#FFDE00] rounded-full" />
            </span>
          </h2>
          
          <p className="text-base sm:text-lg text-jj-dark/75 mt-3 font-normal max-w-2xl mx-auto leading-relaxed">
            Senior growth architects, search engineers, and creative directors scaling direct booking revenue for premier hotels and resorts.
          </p>
        </div>

        {/* Dribbble Horizontal Scrolling 3D Cover-Flow Carousel Showcase */}
        <div 
          onMouseEnter={() => setIsTeamPaused(true)}
          onMouseLeave={() => setIsTeamPaused(false)}
          onTouchStart={() => setIsTeamPaused(true)}
          onTouchEnd={() => setIsTeamPaused(false)}
          className="relative w-full max-w-5xl mx-auto h-[480px] sm:h-[520px] md:h-[550px] flex items-center justify-center overflow-visible select-none py-2"
        >
          {/* Ambient Center Glow */}
          <div className="absolute w-[320px] sm:w-[420px] h-[320px] sm:h-[420px] rounded-full bg-jj-pink/[0.07] blur-3xl pointer-events-none z-0" />

          {/* Centered Depth Cards Presentation */}
          {orderedTeam.map((member, idx) => {
            const total = orderedTeam.length;
            let diff = idx - activeTeamIndex;
            if (diff > total / 2) diff -= total;
            if (diff < -total / 2) diff += total;

            const isCenter = diff === 0;

            // Responsive slide offsets
            const xOffset = diff === 0 ? "0%" : diff === -1 ? "-74%" : diff === 1 ? "74%" : diff > 0 ? "150%" : "-150%";

            return (
              <motion.div
                key={member.id}
                animate={{
                  x: xOffset,
                  scale: diff === 0 ? 1 : Math.abs(diff) === 1 ? 0.82 : 0.65,
                  opacity: diff === 0 ? 1 : Math.abs(diff) === 1 ? 0.42 : 0,
                  zIndex: diff === 0 ? 30 : Math.abs(diff) === 1 ? 20 : 10,
                  filter: diff === 0 ? "blur(0px)" : "blur(0.8px)"
                }}
                transition={{
                  type: "spring",
                  stiffness: 280,
                  damping: 28,
                  mass: 0.8
                }}
                drag={isCenter ? "x" : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.25}
                onDragEnd={(e, { offset, velocity }) => {
                  if (offset.x < -50 || velocity.x < -250) {
                    nextTeamCard();
                  } else if (offset.x > 50 || velocity.x > 250) {
                    prevTeamCard();
                  }
                }}
                onClick={() => {
                  if (diff === 0) {
                    nextTeamCard();
                  } else if (diff < 0) {
                    prevTeamCard();
                  } else {
                    nextTeamCard();
                  }
                }}
                className={`absolute w-[285px] sm:w-[340px] md:w-[370px] h-[450px] sm:h-[490px] md:h-[520px] bg-white rounded-[28px] sm:rounded-[34px] border border-black/[0.08] overflow-hidden flex flex-col justify-between transition-shadow duration-300 cursor-pointer group ${
                  isCenter 
                    ? "shadow-[0_25px_60px_-15px_rgba(0,0,0,0.16),0_10px_20px_-5px_rgba(0,0,0,0.06)] hover:shadow-[0_30px_70px_-15px_rgba(0,0,0,0.22)]" 
                    : "shadow-[0_10px_30px_-5px_rgba(0,0,0,0.06)] hover:opacity-75"
                }`}
              >
                {/* Card Top: High-Fidelity Portrait Photo */}
                <div>
                  <div 
                    onClick={(e) => {
                      e.stopPropagation();
                      if (diff === 0) {
                        nextTeamCard();
                      } else if (diff < 0) {
                        prevTeamCard();
                      } else {
                        nextTeamCard();
                      }
                    }}
                    className="relative h-72 sm:h-80 md:h-[340px] overflow-hidden bg-gradient-to-b from-[#F2F4F7] via-[#F8F9FB] to-white flex items-end justify-center select-none pt-3 cursor-pointer"
                  >
                    {/* Ambient card glow */}
                    <div className="absolute top-4 w-44 h-44 rounded-full bg-jj-pink/[0.06] blur-xl pointer-events-none" />

                    {/* Portrait Image of Team Member */}
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover object-top z-0 pointer-events-none transition-transform duration-500 ease-out group-hover:scale-105"
                      loading="lazy"
                    />

                    {/* Bottom soft gradient blend */}
                    <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none" />
                  </div>

                  {/* Downside of the Photo: Name & Role */}
                  <div className="p-5 sm:p-6 pt-3 pb-2">
                    <h3 className="font-display font-black text-xl sm:text-2xl text-[#0B0C10] tracking-tight uppercase leading-tight mb-1">
                      {member.name}
                    </h3>

                    <div>
                      <span className="text-[11px] font-bold tracking-wider text-jj-pink uppercase block">
                        {member.role}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Card Bottom Bar: Active Status & LinkedIn Connect */}
                <div className="p-5 sm:p-6 pt-0 pb-4">
                  <div className="pt-3 border-t border-black/[0.07] flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-jj-pink" />
                      <span className="text-[10px] sm:text-[11px] font-bold text-jj-dark/65 uppercase tracking-wider">
                        Active on Accounts
                      </span>
                    </div>

                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="p-2 rounded-full bg-[#FAF9F6] hover:bg-jj-pink hover:text-white text-jj-dark/70 transition-all duration-200 border border-black/[0.08] shadow-xs"
                      title={`Connect with ${member.name} on LinkedIn`}
                    >
                      <Linkedin className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Dribbble Centered Pagination Dots & Carousel Navigation */}
        <div className="flex items-center justify-center gap-3 sm:gap-4 mt-6 sm:mt-8 z-20 relative">
          <button
            onClick={prevTeamCard}
            className="p-2 sm:p-2.5 rounded-full bg-white hover:bg-[#0B0C10] hover:text-[#FFDE00] text-jj-dark border border-black/10 shadow-xs hover:shadow-md hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
            title="Previous Team Member"
          >
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          <div className="flex items-center gap-2">
            {orderedTeam.map((_, dotIdx) => (
              <button
                key={dotIdx}
                onClick={() => setActiveTeamIndex(dotIdx)}
                className={`transition-all duration-300 rounded-full cursor-pointer ${
                  dotIdx === activeTeamIndex
                    ? 'w-8 sm:w-9 h-2.5 bg-jj-pink shadow-xs'
                    : 'w-2.5 h-2.5 bg-black/20 hover:bg-black/40'
                }`}
                aria-label={`Go to slide ${dotIdx + 1}`}
              />
            ))}
          </div>

          <button
            onClick={nextTeamCard}
            className="p-2 sm:p-2.5 rounded-full bg-white hover:bg-[#0B0C10] hover:text-[#FFDE00] text-jj-dark border border-black/10 shadow-xs hover:shadow-md hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
            title="Next Team Member"
          >
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>

      </div>
    </section>
  );
}
