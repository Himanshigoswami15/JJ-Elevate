import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  CheckCircle2, 
  Linkedin 
} from 'lucide-react';
import { useAdminData } from '../context/AdminDataContext';

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
    image: '/images/team/YASH.webp',
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
    image: '/images/team/ARSHAD.webp',
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
    image: '/images/team/ALTAF.webp',
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
    image: '/images/team/PUSHPENDRA.webp',
    linkedin: 'https://www.linkedin.com/'
  },
  {
    id: 'jaideep',
    name: 'Jaideep Singh Rajpurohit',
    role: 'GRAPHICS DESIGNER',
    category: 'CREATIVE',
    highlightBadge: 'BRAND & VISUAL DESIGN',
    experience: 'CREATIVE EXCELLENCE',
    bio: 'Crafts bespoke digital visual assets, luxury marketing collaterals, and high-impact brand identities that elevate hospitality aesthetics and captivate modern travelers.',
    specialties: ['Brand Identity', 'Social Media Creatives', 'Marketing Collateral'],
    image: '/images/team/JAIDEEP.webp',
    linkedin: 'https://www.linkedin.com/'
  },
  {
    id: 'himanshi',
    name: 'Himanshi Goswami',
    role: 'SOFTWARE DEVELOPER & TECH LEAD',
    category: 'ENGINEERING',
    highlightBadge: 'FULL-STACK ENGINEER',
    experience: 'FAST DIRECT ENGINES',
    bio: 'Architects high-performance booking engines, seamless PMS integrations, and responsive web experiences engineered to maximize direct reservation conversions for luxury hospitality brands.',
    specialties: ['Direct Booking Engines', 'Full-Stack Architecture', 'Performance Optimization'],
    image: '/images/team/HIMANSHI.webp',
    linkedin: 'https://www.linkedin.com/in/himanshi-goswami-a444a3304'
  },
  {
    id: 'shivani',
    name: 'Shivani Mehra',
    role: 'SOCIAL MEDIA MANAGER',
    category: 'MARKETING',
    highlightBadge: 'SOCIAL MEDIA STRATEGY',
    experience: 'VIRAL CAMPAIGNS',
    bio: 'Orchestrates multi-channel hospitality social media presence, high-impact influencer collaborations, and vibrant community engagement that turn active travelers into loyal direct guests.',
    specialties: ['Social Media Strategy', 'Influencer Partnerships', 'Community Engagement'],
    image: '/images/team/SHIVANI.webp',
    linkedin: 'https://www.linkedin.com/'
  }
];

export default function DreamTeam({ className = '' }) {
  const [syncedTeam, setSyncedTeam] = useState(() => {
    try {
      const stored = localStorage.getItem('jj_elevate_admin_data_v2');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed?.teamMembers) && parsed.teamMembers.length > 0) {
          return parsed.teamMembers;
        }
      }
    } catch (e) {
      // fallback
    }
    return null;
  });

  let adminTeam = null;
  try {
    const adminCtx = useAdminData();
    adminTeam = adminCtx?.data?.teamMembers;
  } catch {
    // context fallback
  }

  // Cross-tab and local real-time synchronization listener
  useEffect(() => {
    const handleSync = () => {
      try {
        const stored = localStorage.getItem('jj_elevate_admin_data_v2');
        if (stored) {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed?.teamMembers)) {
            setSyncedTeam(parsed.teamMembers);
          }
        }
      } catch (e) {
        console.error('Error syncing team data:', e);
      }
    };

    window.addEventListener('storage', handleSync);
    window.addEventListener('jj-admin-data-sync', handleSync);
    return () => {
      window.removeEventListener('storage', handleSync);
      window.removeEventListener('jj-admin-data-sync', handleSync);
    };
  }, []);

  const rawTeam = syncedTeam || adminTeam;

  const activeTeamMembers = (rawTeam && rawTeam.length > 0)
    ? rawTeam.filter(m => m.active !== false).map((m, idx) => ({
        id: m.id || `tm-${idx}`,
        name: m.name,
        role: m.role || m.title || 'HOSPITALITY SPECIALIST',
        category: m.category || 'LEADERSHIP',
        highlightBadge: m.highlightBadge || m.role || 'CORE TEAM',
        experience: m.experience || 'EXPERT',
        bio: m.bio || '',
        specialties: m.specialties || ['Hospitality Growth', 'Direct Bookings'],
        image: m.image || m.img || '/images/team/YASH.webp',
        linkedin: m.linkedin || 'https://www.linkedin.com/'
      }))
    : teamMembersData;

  const orderedTeam = activeTeamMembers;

  return (
    <section id="team" className={`relative w-full py-14 sm:py-20 overflow-hidden bg-[#FAF9F6] scroll-mt-20 ${className}`}>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
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

        {/* Responsive Grid Showcase: All team members always rendered and visible */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-7 max-w-7xl mx-auto">
          {orderedTeam.map((member) => (
            <motion.div
              key={member.id}
              whileHover={{ y: -6 }}
              className="bg-white rounded-[24px] border border-black/[0.08] overflow-hidden flex flex-col justify-between shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)] hover:shadow-[0_20px_40px_-8px_rgba(0,0,0,0.12)] transition-all duration-300 group"
            >
              <div>
                <div className="relative h-64 overflow-hidden bg-gradient-to-b from-[#F2F4F7] via-[#F8F9FB] to-white flex items-end justify-center pt-3">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = '/images/team/YASH.webp';
                    }}
                  />
                  <div className="absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-white via-white/80 to-transparent" />
                </div>

                <div className="p-5">
                  <h3 className="font-display font-black text-xl text-[#0B0C10] tracking-tight uppercase leading-tight mb-1">
                    {member.name}
                  </h3>
                  <span className="text-[11px] font-bold tracking-wider text-jj-pink uppercase block mb-2.5">
                    {member.role}
                  </span>
                  {member.bio && (
                    <p className="text-xs text-jj-dark/70 font-normal leading-relaxed line-clamp-3">
                      {member.bio}
                    </p>
                  )}
                </div>
              </div>

              <div className="p-5 pt-0">
                <div className="pt-3 border-t border-black/[0.07] flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-jj-pink" />
                    <span className="text-[10px] font-bold text-jj-dark/65 uppercase tracking-wider">
                      Active Team
                    </span>
                  </div>
                  {member.linkedin && (
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-full bg-[#FAF9F6] hover:bg-jj-pink hover:text-white text-jj-dark/70 transition-all duration-200 border border-black/[0.08]"
                      title={`Connect with ${member.name} on LinkedIn`}
                    >
                      <Linkedin className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
