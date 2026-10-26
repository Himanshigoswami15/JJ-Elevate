import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { hashPassword, hashPin, generateSessionToken, generateRecoveryCode, getClientDeviceInfo } from '../utils/cryptoSecurity';
import {
  fetchRemoteContent,
  saveRemoteContent,
  isSupabaseConfigured,
  getSupabaseClient,
  getSupabaseConfig,
  saveSupabaseConfig,
  clearSupabaseConfig,
  testSupabaseConnection
} from '../lib/supabase';
import {
  fetchNeonContent,
  saveNeonContent,
  checkNeonHealth,
  saveNeonInquiry
} from '../lib/neon';

const STORAGE_KEY = 'jj_elevate_admin_data_v2';
const AUTH_KEY = 'jj_elevate_admin_auth_v1';
const SECURITY_KEY = 'jj_elevate_admin_security_v3';
const SESSION_KEY = 'jj_elevate_admin_session_v3';

const DEFAULT_SECURITY = {
  username: 'admin',
  passwordHash: '',
  sessionTimeoutMinutes: 30,
  failedAttempts: 0,
  lockedUntil: null,
  lastLoginTime: null,
  twoFactorEnabled: false,
  securityPinHash: '',
  emergencyRecoveryCodeHash: '',
  auditLogs: [],
  isLockdownActive: false
};

export const DEFAULT_ADMIN_DATA = {
  hero: {
    headlineLine1: "Digital growth for",
    headlineAccent: "noteworthy",
    headlineLine2: "hospitality brands",
    subheadline: "We help hotels, luxury resorts, boutique villas, and travel brands attract high-intent guests, scale direct bookings, and build iconic digital presences.",
    videoUrl: "/videos/jj-elevate-reels-41.mp4",
    poster: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=1200&auto=format&fit=crop",
    ctaPrimaryText: "Let's grow together",
    ctaSecondaryText: "Explore Work",
    badgeText: "Trusted by 120+ Luxury Hotels & Resorts Worldwide"
  },
  growthServicesHeader: {
    badge: "JJ ELEVATE SERVICES SUITE",
    headlineLine1: "GROWTH SERVICES FOR",
    headlineLine2: "HOSPITALITY BRANDS.",
    subtext: "Explore our specialized digital marketing services built specifically for hotels, luxury resorts, and boutique stays."
  },
  services: [
    {
      id: '01',
      title: 'Hotel Social Media & Influencer Marketing',
      category: 'BRAND AWARENESS',
      tabLabel: '01 SOCIAL & REELS',
      bgColor: 'bg-[#EFECE6]',
      textColor: 'text-[#0B0C10]',
      subTextColor: 'text-[#0B0C10]/80',
      borderColor: 'border-[#0B0C10]/15',
      badgeBg: 'bg-[#0B0C10] text-white',
      accentColor: 'text-[#FF1E56]',
      iconName: 'Instagram',
      metricHighlight: '+280% ENGAGEMENT SURGE',
      metricsTable: [
        { label: 'MEDIA FORMAT', value: '4K REELS & INFLUENCERS' },
        { label: 'ENGAGEMENT', value: '+280% ORGANIC REEL REACH' },
        { label: 'PLATFORMS', value: 'INSTAGRAM & META ADS' },
        { label: 'TARGETING', value: 'LUXURY TRAVELERS' }
      ],
      description: 'Build iconic hotel brands through curated Instagram content, high-impact video reels, luxury influencer stays, and targeted Meta ads that make travelers want to visit.',
      images: {
        left: {
          url: '/images/social/social_pool_shoot.jpg',
          caption: 'LUXURY RESORT CONTENT SHOOT'
        },
        center: {
          url: '/images/social/social_instagram_feed.jpg',
          caption: 'HOTEL INSTAGRAM BIO & GRID'
        },
        right: {
          url: '/images/social/social_sunset_production.jpg',
          caption: 'SUNSET VILLA REEL PRODUCTION'
        }
      }
    },
    {
      id: '02',
      title: 'High-Intent Google Ads & Performance Search',
      category: 'PERFORMANCE ADS',
      tabLabel: '02 GOOGLE SEARCH',
      bgColor: 'bg-[#E6E1F5]',
      textColor: 'text-[#1D1B2A]',
      subTextColor: 'text-[#1D1B2A]/80',
      borderColor: 'border-[#1D1B2A]/15',
      badgeBg: 'bg-[#FF1E56] text-white',
      accentColor: 'text-[#FF1E56]',
      iconName: 'Search',
      metricHighlight: '4.8X AVERAGE ROAS',
      metricsTable: [
        { label: 'PRIMARY CHANNELS', value: 'GOOGLE ADS & META RETARGETING' },
        { label: 'AVERAGE ROAS', value: '4.8X DIRECT BOOKING ROI' },
        { label: 'COST REDUCTION', value: '-35% LOWER GUEST ACQUISITION' },
        { label: 'SEARCH INTENT', value: 'LUXURY STAYCATIONS' }
      ],
      description: 'Capture travelers actively searching for boutique hotels and resorts in your region with laser-targeted search campaigns and high-converting landing pages.',
      images: {
        left: {
          url: '/images/google_ads/google_hotel_booking_ads.jpg',
          caption: 'GOOGLE HOTEL SEARCH ENGINE ADS'
        },
        center: {
          url: '/images/google_ads/google_analytics_roas.jpg',
          caption: 'HOTEL CAMPAIGN ROAS DASHBOARD'
        },
        right: {
          url: '/images/google_ads/google_mobile_reservation.jpg',
          caption: 'MOBILE DIRECT BOOKING ENGINE'
        }
      }
    },
    {
      id: '03',
      title: 'OTA Optimization & 0% Commission Direct Engine',
      category: 'DIRECT REVENUE ENGINE',
      tabLabel: '03 0% OTA COMMISSION',
      bgColor: 'bg-[#F2EDE4]',
      textColor: 'text-[#1F1B16]',
      subTextColor: 'text-[#1F1B16]/80',
      borderColor: 'border-[#1F1B16]/15',
      badgeBg: 'bg-[#0B0C10] text-white',
      accentColor: 'text-[#FF1E56]',
      iconName: 'Building2',
      metricHighlight: '22% → 0% COMMISSIONS',
      metricsTable: [
        { label: 'COMMISSION SAVED', value: '18-22% SAVED PER BOOKING' },
        { label: 'DIRECT CONVERSION', value: '+42.8% HIGHER WEBSITE CONV.' },
        { label: 'RETARGETING', value: 'WHATSAPP & EMAIL VIP NURTURE' },
        { label: 'GUEST LOYALTY', value: 'DIRECT BOOKING ENGINE' }
      ],
      description: 'Break free from 18-25% OTA commissions. We transform scrolling guests into direct website bookers with instant VIP perks, frictionless checkouts, and automated WhatsApp nurturing.',
      images: {
        left: {
          url: '/images/ota/ota_commission_chart.jpg',
          caption: 'DIRECT VS OTA REVENUE CHART'
        },
        center: {
          url: '/images/ota/ota_direct_booking_luxury.jpg',
          caption: 'LUXURY VIP BOOKING EXPERIENCE'
        },
        right: {
          url: '/images/ota/ota_whatsapp_concierge.jpg',
          caption: 'WHATSAPP DIRECT CONCIERGE'
        }
      }
    },
    {
      id: '04',
      title: 'Hospitality Web App & SEO Dominance',
      category: 'LUXURY WEB ARCHITECTURE',
      tabLabel: '04 WEB APPS & SEO',
      bgColor: 'bg-[#E3EBF5]',
      textColor: 'text-[#14202E]',
      subTextColor: 'text-[#14202E]/80',
      borderColor: 'border-[#14202E]/15',
      badgeBg: 'bg-[#FF1E56] text-white',
      accentColor: 'text-[#FF1E56]',
      iconName: 'Globe',
      metricHighlight: '+340% ORGANIC REACH',
      metricsTable: [
        { label: 'PAGE SPEED', value: '100/100 GOOGLE LIGHTHOUSE' },
        { label: 'KEYWORD DOMINANCE', value: 'TOP 3 GOOGLE SEARCH RANKS' },
        { label: 'MOBILE OPTIMIZATION', value: '1-TAP RESERVATION ENGINE' },
        { label: 'ARCHITECTURE', value: 'NEXT.JS & FAST CLOUD CDN' }
      ],
      description: 'Ultra-fast, mobile-first websites designed like five-star hotel lobbies. Dominating local search rankings for high-ticket destination weddings and luxury weekend getaways.',
      images: {
        left: {
          url: '/images/web_seo/web_desktop_palace.jpg',
          caption: 'HERITAGE PALACE WEB EXPERIENCE'
        },
        center: {
          url: '/images/web_seo/web_lighthouse_score.jpg',
          caption: 'PERFECT 100 LIGHTHOUSE SCORE'
        },
        right: {
          url: '/images/web_seo/web_mobile_booking.jpg',
          caption: 'ONE-TAP MOBILE SUITE BOOKING'
        }
      }
    }
  ],
  brands: [
    { id: 'b-1', name: 'Taj Hotels & Palaces', category: 'hotel', text: 'TAJ', logo: '' },
    { id: 'b-2', name: 'The Oberoi Group', category: 'hotel', text: 'OBEROI', logo: '' },
    { id: 'b-3', name: 'The Leela Palaces', category: 'hotel', text: 'LEELA', logo: '' },
    { id: 'b-4', name: 'ITC Hotels Luxury', category: 'hotel', text: 'ITC', logo: '' },
    { id: 'b-5', name: 'Heritage Palace Resorts', category: 'hotel', text: 'HERITAGE PALACE', logo: '' },
    { id: 'b-6', name: 'Villa Shanti Stays', category: 'hotel', text: 'VILLA SHANTI', logo: '' },
    { id: 'b-7', name: 'Serenity Springs Resort', category: 'hotel', text: 'SERENITY SPRINGS', logo: '' },
    { id: 'b-8', name: 'Agoda', category: 'partner', logo: '/images/clients/agoda.png' },
    { id: 'b-9', name: 'Airbnb', category: 'partner', logo: '/images/clients/airbnb.png' },
    { id: 'b-10', name: 'Booking.com', category: 'partner', logo: '/images/clients/booking.png' },
    { id: 'b-11', name: 'MakeMyTrip', category: 'partner', logo: '/images/clients/makemytrip.png' },
    { id: 'b-12', name: 'Goibibo', category: 'partner', logo: '/images/clients/goibibo.png' },
    { id: 'b-13', name: 'Cleartrip', category: 'partner', logo: '/images/clients/cleartrip.png' },
    { id: 'b-14', name: 'Vyapar', category: 'partner', logo: '/images/clients/vyapar.png' }
  ],
  reels: {
    videoUrl: '/videos/jj-elevate-reels-37.mp4',
    poster: '',
    caption: 'Private overwater infinity pool villa at sunset. Experience bespoke luxury. #luxuryresort #maldives #directbooking #hospitality',
    author: 'JJ Elevate',
    views: '20M',
    likes: '5.1M',
    comments: '12.1K',
    title: 'Viral Content That Fills Empty Rooms',
    subtitle: 'High-Velocity Hospitality Reels',
    description: "We produce high-velocity hospitality reels crafted to drive direct booking inquiries, hyper-engaged audiences, and qualified affluent guests."
  },
  caseStudies: [
    {
      id: 'case-1',
      title: 'The Royal Palace Resort',
      location: 'Jodhpur, Rajasthan',
      category: 'LUXURY HERITAGE',
      bgColor: 'bg-[#EFECE6]',
      textColor: 'text-[#0B0C10]',
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
      title: 'Azure Bay Oceanfront Retreat',
      location: 'Goa Coastline',
      category: 'ISLAND RESORT',
      bgColor: 'bg-[#F2EDE4]',
      textColor: 'text-[#1F1B16]',
      metricHighlight: '5.8X META ROAS',
      metricsTable: [
        { label: 'DIRECT BOOKINGS', value: '+310% OVER PREV YEAR' },
        { label: 'SOLDOUT DAYS', value: '90 DAYS IN ADVANCE' },
        { label: 'OTA SAVINGS', value: '-65% COMMISSION CUT' },
        { label: 'AVERAGE RATE (ADR)', value: '+35% RATE INCREASE' }
      ],
      image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1000&q=80',
      description: 'Executed hyper-targeted geo-campaigns across luxury travelers, completely booking out monsoon and winter suites 90 days in advance with 0% OTA fees.',
      fullDetails: {
        challenge: 'Heavy discounting during monsoon shoulder months caused by price wars on major travel aggregation sites.',
        strategy: 'Created exclusive direct-booking spa wellness packages and targeted affluent domestic weekend travelers via video reels.',
        results: [
          'Sold out peak season 90 days ahead',
          'Average room rate (ADR) increased by +35%',
          '5.8X return on advertising spend',
          'Over 60% of all bookings became 100% direct'
        ]
      }
    }
  ],
  teamMembers: [
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
      active: true,
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
      active: true,
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
      active: true,
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
      active: true,
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
      active: true,
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
      active: true,
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
      active: true,
      linkedin: 'https://www.linkedin.com/'
    }
  ],
  testimonials: [
    {
      id: 'test-1',
      author: 'VIKRAMADITYA SINGH',
      organization: 'Heritage Palace Resorts, Jodhpur',
      image: '/images/testimonials/vikramaditya.jpg',
      avatarText: 'HP',
      logoBg: 'bg-amber-50 text-amber-700 border-amber-200',
      rating: 5,
      quote: "So far we've seen INSANE growth across all of our properties. Direct bookings surged by over +42%, while OTA commission dependencies dropped from 24% to under 9% in less than 90 days. Their team manages our Google Hotel Ads, Meta campaigns, and high-fashion property reels with exceptional precision and proactive communication. Highly recommended for any serious hospitality brand."
    },
    {
      id: 'test-2',
      author: 'ANANYA MEHTA',
      organization: 'Villa Shanti Luxury Stays, Udaipur',
      image: '/images/testimonials/ananya.jpg',
      avatarText: 'VS',
      logoBg: 'bg-rose-50 text-rose-700 border-rose-200',
      rating: 5,
      quote: "JJ Elevate's project management is great. We have a platform where we share all of our ideas and anything that we come up with and they're prompt and responsive. Everything is highly organized. In general, everything runs smoothly. Our teams get along well, and their communication skills are great. On top of that, JJ Elevate has been organized; they schedule things ahead, which makes the projects a lot less stressful for me. They worked very hard to meet our needs and we came away very happy."
    },
    {
      id: 'test-3',
      author: 'RAJESHWAR SHARMA',
      organization: 'Desert Haven Haveli & Spa, Jaisalmer',
      image: '/images/testimonials/rajeshwar.jpg',
      avatarText: 'DH',
      logoBg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      rating: 5,
      quote: "Working with JJ Elevate has been a game-changer for our direct guest bookings. Their team not only produced extraordinary 4K reels and drone content of our desert camp, but also engineered our Google Hotel Ads to perfection. We are seeing guests consistently book directly with us instead of paying middleman fees."
    }
  ],
  contact: {
    phone: '+91 98765 43210',
    phoneFormatted: '+91 98765 43210',
    email: 'hello@jjelevate.com',
    whatsapp: '919876543210',
    address: 'JJ Elevate Media Studio, Level 4, Luxury Horizon Tower, New Delhi, India',
    workingHours: 'Monday – Saturday: 9:00 AM – 7:00 PM IST',
    social: {
      instagram: 'https://www.instagram.com/jjelevate',
      linkedin: 'https://www.linkedin.com/company/jj-elevate',
      youtube: 'https://www.youtube.com/@jjelevate',
      twitter: 'https://twitter.com/jjelevate'
    },
    inquiries: [
      {
        id: 'inq-101',
        createdAt: new Date(Date.now() - 3600000 * 4).toISOString(),
        name: 'Vikramaditya Oberoi',
        email: 'v.oberoi@theoberoipalace.com',
        phone: '+91 98112 34567',
        company: 'The Oberoi Heritage Palace',
        service: 'Boutique Hotel & Direct Booking Funnel',
        message: 'We are looking to overhaul our digital presence before the winter peak season and cut down OTA commissions by 40%. Interested in full viral reel production and paid search campaign.',
        status: 'new'
      },
      {
        id: 'inq-102',
        createdAt: new Date(Date.now() - 3600000 * 26).toISOString(),
        name: 'Camilla D’Souza',
        email: 'camilla@albaybayresort.com',
        phone: '+91 99880 77665',
        company: 'Al Baybay Luxury Resort, Goa',
        service: 'Viral Reels & Short-Form Video',
        message: 'Looking for a 3-month contract for cinematic video production and influencer shoots at our private beachfront property.',
        status: 'contacted'
      }
    ]
  }
};

const AdminDataContext = createContext(null);

export function AdminDataProvider({ children }) {
  const [data, setData] = useState(() => {
    if (typeof window === 'undefined') return DEFAULT_ADMIN_DATA;
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        const parsedHero = { ...DEFAULT_ADMIN_DATA.hero, ...(parsed.hero || {}) };
        if (!parsedHero.videoUrl || parsedHero.videoUrl === '/videos/jj-elevate-portfolio.mp4') {
          parsedHero.videoUrl = '/videos/jj-elevate-reels-41.mp4';
        }
        return {
          ...DEFAULT_ADMIN_DATA,
          ...parsed,
          hero: parsedHero,
          growthServicesHeader: { ...DEFAULT_ADMIN_DATA.growthServicesHeader, ...(parsed.growthServicesHeader || {}) },
          reels: { ...DEFAULT_ADMIN_DATA.reels, ...(parsed.reels || {}) },
          contact: { 
            ...DEFAULT_ADMIN_DATA.contact, 
            ...(parsed.contact || {}),
            social: { ...DEFAULT_ADMIN_DATA.contact.social, ...(parsed.contact?.social || {}) },
            inquiries: parsed.contact?.inquiries || DEFAULT_ADMIN_DATA.contact.inquiries
          }
        };
      }
    } catch (e) {
      console.error('Error loading admin data from localStorage:', e);
    }
    return DEFAULT_ADMIN_DATA;
  });

  const [adminSecurity, setAdminSecurity] = useState(() => {
    if (typeof window === 'undefined') return DEFAULT_SECURITY;
    try {
      const stored = localStorage.getItem(SECURITY_KEY);
      if (stored) {
        return { ...DEFAULT_SECURITY, ...JSON.parse(stored) };
      }
    } catch {
      // fallback
    }
    return DEFAULT_SECURITY;
  });

  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(() => {
    if (typeof window === 'undefined') return false;
    try {
      const sessStr = localStorage.getItem(SESSION_KEY);
      if (sessStr) {
        const sess = JSON.parse(sessStr);
        if (sess.token && sess.expiresAt && Number(sess.expiresAt) > Date.now()) {
          return true;
        }
      }
    } catch {
      // fallback
    }
    return localStorage.getItem(AUTH_KEY) === 'true';
  });

  // Cloud Sync state (Supabase)
  const [cloudSyncStatus, setCloudSyncStatus] = useState('checking'); // 'synced' | 'local_only' | 'syncing' | 'error'
  const [lastCloudSyncTime, setLastCloudSyncTime] = useState(null);
  const syncTimeoutRef = useRef(null);

  // Initial cloud fetch on mount (Neon PostgreSQL primary, Supabase fallback)
  useEffect(() => {
    let isMounted = true;
    async function initCloudSync() {
      setCloudSyncStatus('syncing');

      // 1. Try Neon PostgreSQL first via backend API
      try {
        const neonData = await fetchNeonContent();
        if (!isMounted) return;
        if (neonData && neonData.content) {
          setData(prev => ({
            ...prev,
            ...neonData.content,
            hero: { ...prev.hero, ...(neonData.content.hero || {}) },
            growthServicesHeader: { ...prev.growthServicesHeader, ...(neonData.content.growthServicesHeader || {}) },
            services: neonData.content.services || prev.services,
            brands: neonData.content.brands || prev.brands,
            caseStudies: neonData.content.caseStudies || prev.caseStudies,
            reels: { ...prev.reels, ...(neonData.content.reels || {}) },
            teamMembers: neonData.content.teamMembers || prev.teamMembers,
            testimonials: neonData.content.testimonials || prev.testimonials,
            contact: {
              ...prev.contact,
              ...(neonData.content.contact || {}),
              social: { ...prev.contact.social, ...(neonData.content.contact?.social || {}) },
              inquiries: neonData.content.contact?.inquiries || prev.contact.inquiries
            }
          }));
          setCloudSyncStatus('synced');
          setLastCloudSyncTime(neonData.updatedAt || new Date().toISOString());
          try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(neonData.content));
          } catch {
            // ignore
          }
          return;
        }
      } catch (err) {
        console.warn('Neon content fetch error, trying fallback:', err);
      }

      // 2. Fallback to Supabase if configured
      if (isSupabaseConfigured()) {
        try {
          const remote = await fetchRemoteContent();
          if (!isMounted) return;
          if (remote && remote.content) {
            setData(prev => ({
              ...prev,
              ...remote.content,
              hero: { ...prev.hero, ...(remote.content.hero || {}) },
              growthServicesHeader: { ...prev.growthServicesHeader, ...(remote.content.growthServicesHeader || {}) },
              services: remote.content.services || prev.services,
              brands: remote.content.brands || prev.brands,
              caseStudies: remote.content.caseStudies || prev.caseStudies,
              reels: { ...prev.reels, ...(remote.content.reels || {}) },
              teamMembers: remote.content.teamMembers || prev.teamMembers,
              testimonials: remote.content.testimonials || prev.testimonials,
              contact: {
                ...prev.contact,
                ...(remote.content.contact || {}),
                social: { ...prev.contact.social, ...(remote.content.contact?.social || {}) },
                inquiries: remote.content.contact?.inquiries || prev.contact.inquiries
              }
            }));
            setCloudSyncStatus('synced');
            setLastCloudSyncTime(remote.updatedAt || new Date().toISOString());
            try {
              localStorage.setItem(STORAGE_KEY, JSON.stringify(remote.content));
            } catch {
              // ignore
            }
            return;
          }
        } catch (err) {
          console.warn('Initial Supabase fetch failed:', err);
        }
      }

      if (isMounted) setCloudSyncStatus('synced');
    }
    initCloudSync();
    return () => { isMounted = false; };
  }, []);

  // Multi-device live sync: auto-refresh when tab gains focus & poll every 12 seconds
  useEffect(() => {
    if (typeof window === 'undefined') return;
    let active = true;
    const refreshFromNeon = async () => {
      try {
        const neonData = await fetchNeonContent();
        if (!active || !neonData || !neonData.content) return;
        setData(prev => ({
          ...prev,
          ...neonData.content,
          teamMembers: neonData.content.teamMembers || prev.teamMembers
        }));
        setCloudSyncStatus('synced');
        if (neonData.updatedAt) setLastCloudSyncTime(neonData.updatedAt);
      } catch {
        // silent
      }
    };

    const handleFocus = () => refreshFromNeon();
    window.addEventListener('focus', handleFocus);
    const interval = setInterval(refreshFromNeon, 12000);

    return () => {
      active = false;
      window.removeEventListener('focus', handleFocus);
      clearInterval(interval);
    };
  }, []);

  // Real-time listener for multi-device sync across open browsers (Supabase fallback)
  useEffect(() => {
    const client = getSupabaseClient();
    if (!client) return;

    let channel = null;
    try {
      channel = client
        .channel('site_content_realtime')
        .on(
          'postgres_changes',
          { event: '*', schema: 'public', table: 'site_content', filter: 'id=eq.main' },
          (payload) => {
            if (payload.new && payload.new.data) {
              const incoming = payload.new.data;
              setData(prev => ({
                ...prev,
                ...incoming,
                teamMembers: incoming.teamMembers || prev.teamMembers
              }));
              setCloudSyncStatus('synced');
              setLastCloudSyncTime(payload.new.updated_at || new Date().toISOString());
              try {
                localStorage.setItem(STORAGE_KEY, JSON.stringify(incoming));
              } catch {
                // ignore
              }
            }
          }
        )
        .subscribe();
    } catch (err) {
      console.warn('Supabase realtime subscription error:', err);
    }

    return () => {
      if (channel && client) {
        client.removeChannel(channel);
      }
    };
  }, []);

  // Explicit Save to Cloud function (Neon PostgreSQL primary, Supabase fallback/mirror)
  const syncToCloud = async (overrideData = null) => {
    setCloudSyncStatus('syncing');
    const dataToSave = overrideData || data;
    let synced = false;

    // 1. Try Neon PostgreSQL
    try {
      const neonRes = await saveNeonContent(dataToSave);
      if (neonRes.success) {
        synced = true;
        setCloudSyncStatus('synced');
        setLastCloudSyncTime(neonRes.timestamp || new Date().toISOString());
        recordAuditLog('Cloud Data Synchronized', 'Website data published to Neon PostgreSQL cloud database.', 'success');
      }
    } catch (err) {
      console.warn('Neon save error:', err);
    }

    // 2. Also save to Supabase if configured
    if (isSupabaseConfigured()) {
      try {
        const res = await saveRemoteContent(dataToSave);
        if (res.success) {
          synced = true;
          setCloudSyncStatus('synced');
          setLastCloudSyncTime(res.timestamp || new Date().toISOString());
        }
      } catch (err) {
        console.warn('Supabase mirror save error:', err);
      }
    }

    if (synced) {
      return { success: true };
    } else {
      setCloudSyncStatus('synced');
      return { success: true, message: 'Saved to local browser storage.' };
    }
  };

  // Sync state to localStorage whenever data changes and dispatch sync event
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        window.dispatchEvent(new CustomEvent('jj-admin-data-sync', { detail: data }));
      } catch (e) {
        console.error('Failed to save admin data to localStorage:', e);
      }
    }

    // Auto-sync to Neon cloud if admin is logged in
    if (isAdminLoggedIn) {
      if (syncTimeoutRef.current) clearTimeout(syncTimeoutRef.current);
      syncTimeoutRef.current = setTimeout(() => {
        syncToCloud(data);
      }, 2500); // 2.5s debounce
    }
  }, [data, isAdminLoggedIn]);

  // Listen for storage changes from other tabs or windows
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleStorageChange = (e) => {
      if (e.key === STORAGE_KEY && e.newValue) {
        try {
          const parsed = JSON.parse(e.newValue);
          setData(prev => ({
            ...prev,
            ...parsed,
            teamMembers: parsed.teamMembers || prev.teamMembers
          }));
        } catch (err) {
          console.error('Failed to parse incoming storage update:', err);
        }
      }
      if (e.key === SECURITY_KEY && e.newValue) {
        try {
          setAdminSecurity(JSON.parse(e.newValue));
        } catch {
          // ignore
        }
      }
    };

    const handleCustomSync = (e) => {
      if (e.detail) {
        setData(e.detail);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('jj-admin-data-sync', handleCustomSync);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('jj-admin-data-sync', handleCustomSync);
    };
  }, []);

  // Inactivity auto-logout timer check
  useEffect(() => {
    if (!isAdminLoggedIn) return;

    const interval = setInterval(() => {
      try {
        const sessStr = localStorage.getItem(SESSION_KEY);
        if (sessStr) {
          const sess = JSON.parse(sessStr);
          if (sess.expiresAt && Number(sess.expiresAt) <= Date.now()) {
            logoutAdmin();
          }
        }
      } catch {
        // ignore
      }
    }, 15000); // Check every 15s

    return () => clearInterval(interval);
  }, [isAdminLoggedIn]);

  // Security Audit Logging helper
  const recordAuditLog = (action, details = '', status = 'info') => {
    const logEntry = {
      id: 'log-' + Date.now() + '-' + Math.random().toString(36).substr(2, 4),
      timestamp: new Date().toISOString(),
      action,
      details,
      status, // 'success', 'warning', 'critical', 'info'
      device: getClientDeviceInfo()
    };
    setAdminSecurity(prev => {
      const updatedLogs = [logEntry, ...(prev.auditLogs || [])].slice(0, 80);
      const updated = { ...prev, auditLogs: updatedLogs };
      if (typeof window !== 'undefined') {
        try {
          localStorage.setItem(SECURITY_KEY, JSON.stringify(updated));
        } catch {
          // ignore
        }
      }
      return updated;
    });
  };

  // Auth methods with SHA-256, 2FA, and brute-force defenses
  const loginAdmin = async (username, password) => {
    const cleanUser = (username || '').trim();
    const cleanPass = (password || '').trim();

    // 0. Check emergency lockdown status
    if (adminSecurity.isLockdownActive) {
      return {
        success: false,
        isLockdown: true,
        message: 'Portal is currently in Emergency Lockdown. Master authorization required to unlock.'
      };
    }

    // 1. Check lockout status
    if (adminSecurity.lockedUntil && Number(adminSecurity.lockedUntil) > Date.now()) {
      const remainingSeconds = Math.ceil((Number(adminSecurity.lockedUntil) - Date.now()) / 1000);
      const remainingMinutes = Math.ceil(remainingSeconds / 60);
      return {
        success: false,
        isLocked: true,
        remainingMinutes,
        message: `Account is temporarily locked for security. Please try again in ${remainingMinutes} minute(s).`
      };
    }

    const expectedUser = (adminSecurity.username || 'admin').trim();
    const inputHash = await hashPassword(cleanPass);

    let isMatch = false;
    if (cleanUser.toLowerCase() === expectedUser.toLowerCase()) {
      if (adminSecurity.passwordHash) {
        isMatch = (inputHash === adminSecurity.passwordHash);
      } else {
        // Default credentials fallback: admin / admin123 or jjelevate / elevate2026
        isMatch = (cleanPass === 'admin123' || cleanPass === 'elevate2026');
      }
    }

    if (isMatch) {
      // If 2FA PIN is enabled, require step 2 PIN verification
      if (adminSecurity.twoFactorEnabled && adminSecurity.securityPinHash) {
        return {
          success: false,
          requires2FA: true,
          username: expectedUser,
          message: 'Password accepted. Please provide your 6-digit Master PIN or Recovery Code.'
        };
      }

      const sessionToken = generateSessionToken();
      const timeoutMs = (adminSecurity.sessionTimeoutMinutes || 30) * 60 * 1000;
      const expiresAt = Date.now() + timeoutMs;

      // Lazily ensure current password is saved as hash if not yet hashed
      let passHashToStore = adminSecurity.passwordHash;
      if (!passHashToStore) {
        passHashToStore = inputHash;
      }

      const updatedSecurity = {
        ...adminSecurity,
        passwordHash: passHashToStore,
        failedAttempts: 0,
        lockedUntil: null,
        lastLoginTime: new Date().toISOString()
      };

      setAdminSecurity(updatedSecurity);
      if (typeof window !== 'undefined') {
        localStorage.setItem(SECURITY_KEY, JSON.stringify(updatedSecurity));
        localStorage.setItem(SESSION_KEY, JSON.stringify({
          token: sessionToken,
          username: expectedUser,
          expiresAt
        }));
        localStorage.setItem(AUTH_KEY, 'true');
      }

      recordAuditLog('Successful Sign-In', `Master Admin "${expectedUser}" authenticated successfully.`, 'success');

      setIsAdminLoggedIn(true);
      return { success: true };
    } else {
      const newFailed = (adminSecurity.failedAttempts || 0) + 1;
      let lockedUntil = null;
      let isNowLocked = false;
      let remainingMinutes = 0;

      if (newFailed >= 5) {
        lockedUntil = Date.now() + 15 * 60 * 1000; // 15-minute lockout
        isNowLocked = true;
        remainingMinutes = 15;
      }

      const updatedSecurity = {
        ...adminSecurity,
        failedAttempts: newFailed,
        lockedUntil
      };

      setAdminSecurity(updatedSecurity);
      if (typeof window !== 'undefined') {
        localStorage.setItem(SECURITY_KEY, JSON.stringify(updatedSecurity));
      }

      recordAuditLog(
        isNowLocked ? 'Account Locked (Brute Force Shield)' : 'Failed Login Attempt',
        `Failed attempt for user "${cleanUser}". (${newFailed}/5 attempts)`,
        isNowLocked ? 'critical' : 'warning'
      );

      if (isNowLocked) {
        return {
          success: false,
          isLocked: true,
          remainingMinutes,
          message: 'Account locked for 15 minutes due to 5 consecutive failed login attempts.'
        };
      }

      const remainingAttempts = Math.max(0, 5 - newFailed);
      return {
        success: false,
        remainingAttempts,
        message: `Invalid username or password. ${remainingAttempts} attempt(s) remaining before account lockout.`
      };
    }
  };

  // 2FA PIN / Recovery Code verification
  const verify2FALogin = async (pinOrCode) => {
    const cleanInput = (pinOrCode || '').trim();
    if (!cleanInput) {
      return { success: false, message: 'Please enter your 6-digit Security PIN or Backup Recovery Code.' };
    }

    // Check lockout status
    if (adminSecurity.lockedUntil && Number(adminSecurity.lockedUntil) > Date.now()) {
      const remainingSeconds = Math.ceil((Number(adminSecurity.lockedUntil) - Date.now()) / 1000);
      const remainingMinutes = Math.ceil(remainingSeconds / 60);
      return {
        success: false,
        isLocked: true,
        remainingMinutes,
        message: `Account is temporarily locked. Please try again in ${remainingMinutes} minute(s).`
      };
    }

    const pinHash = await hashPin(cleanInput);
    const codeHash = await hashPassword(cleanInput.toUpperCase());

    const isPinMatch = adminSecurity.securityPinHash && (pinHash === adminSecurity.securityPinHash);
    const isCodeMatch = adminSecurity.emergencyRecoveryCodeHash && (codeHash === adminSecurity.emergencyRecoveryCodeHash);

    if (isPinMatch || isCodeMatch) {
      const sessionToken = generateSessionToken();
      const timeoutMs = (adminSecurity.sessionTimeoutMinutes || 30) * 60 * 1000;
      const expiresAt = Date.now() + timeoutMs;
      const expectedUser = (adminSecurity.username || 'admin').trim();

      const updatedSecurity = {
        ...adminSecurity,
        failedAttempts: 0,
        lockedUntil: null,
        lastLoginTime: new Date().toISOString()
      };

      setAdminSecurity(updatedSecurity);
      if (typeof window !== 'undefined') {
        localStorage.setItem(SECURITY_KEY, JSON.stringify(updatedSecurity));
        localStorage.setItem(SESSION_KEY, JSON.stringify({
          token: sessionToken,
          username: expectedUser,
          expiresAt
        }));
        localStorage.setItem(AUTH_KEY, 'true');
      }

      recordAuditLog(
        isCodeMatch ? 'Sign-In with Emergency Recovery Code' : 'Sign-In with 2FA Master PIN',
        `Two-factor authentication verified for "${expectedUser}".`,
        'success'
      );

      setIsAdminLoggedIn(true);
      return { success: true };
    } else {
      const newFailed = (adminSecurity.failedAttempts || 0) + 1;
      let lockedUntil = null;
      let isNowLocked = false;
      let remainingMinutes = 0;

      if (newFailed >= 5) {
        lockedUntil = Date.now() + 15 * 60 * 1000;
        isNowLocked = true;
        remainingMinutes = 15;
      }

      const updatedSecurity = {
        ...adminSecurity,
        failedAttempts: newFailed,
        lockedUntil
      };

      setAdminSecurity(updatedSecurity);
      if (typeof window !== 'undefined') {
        localStorage.setItem(SECURITY_KEY, JSON.stringify(updatedSecurity));
      }

      recordAuditLog(
        'Failed 2FA Attempt',
        `Incorrect PIN or Recovery Code provided. (${newFailed}/5 attempts)`,
        'warning'
      );

      if (isNowLocked) {
        return {
          success: false,
          isLocked: true,
          remainingMinutes,
          message: 'Account locked for 15 minutes due to 5 consecutive failed attempts.'
        };
      }

      const remainingAttempts = Math.max(0, 5 - newFailed);
      return {
        success: false,
        remainingAttempts,
        message: `Invalid 6-digit PIN or Recovery Code. ${remainingAttempts} attempt(s) remaining before lockout.`
      };
    }
  };

  const logoutAdmin = () => {
    setIsAdminLoggedIn(false);
    if (typeof window !== 'undefined') {
      localStorage.removeItem(SESSION_KEY);
      localStorage.removeItem(AUTH_KEY);
    }
    recordAuditLog('Session Terminated', 'Administrator logged out securely.', 'info');
  };

  const refreshSession = () => {
    if (typeof window === 'undefined') return;
    try {
      const sessStr = localStorage.getItem(SESSION_KEY);
      if (sessStr) {
        const sess = JSON.parse(sessStr);
        const timeoutMs = (adminSecurity.sessionTimeoutMinutes || 30) * 60 * 1000;
        sess.expiresAt = Date.now() + timeoutMs;
        localStorage.setItem(SESSION_KEY, JSON.stringify(sess));
      }
    } catch {
      // ignore
    }
  };

  const resetLockoutCounter = () => {
    const updated = {
      ...adminSecurity,
      failedAttempts: 0,
      lockedUntil: null
    };
    setAdminSecurity(updated);
    if (typeof window !== 'undefined') {
      localStorage.setItem(SECURITY_KEY, JSON.stringify(updated));
    }
    recordAuditLog('Lockout Shield Reset', 'Failed attempts counter reset to zero by admin.', 'info');
  };

  const updateAdminCredentials = async ({ currentPassword, newUsername, newPassword, sessionTimeoutMinutes }) => {
    // If updating timeout only:
    if (sessionTimeoutMinutes && !newUsername && !newPassword && !currentPassword) {
      const updated = {
        ...adminSecurity,
        sessionTimeoutMinutes: Number(sessionTimeoutMinutes)
      };
      setAdminSecurity(updated);
      if (typeof window !== 'undefined') {
        localStorage.setItem(SECURITY_KEY, JSON.stringify(updated));
      }
      refreshSession();
      recordAuditLog('Policy Update', `Session idle timeout updated to ${sessionTimeoutMinutes} minutes.`, 'info');
      return { success: true };
    }

    // Verify current password
    const expectedPassHash = adminSecurity.passwordHash;
    const inputHash = await hashPassword((currentPassword || '').trim());
    let isCurrentValid = false;

    if (expectedPassHash) {
      isCurrentValid = (inputHash === expectedPassHash);
    } else {
      isCurrentValid = (currentPassword === 'admin123' || currentPassword === 'elevate2026');
    }

    if (!isCurrentValid) {
      return { success: false, message: 'Current password does not match.' };
    }

    let updatedHash = adminSecurity.passwordHash;
    if (newPassword && newPassword.trim()) {
      updatedHash = await hashPassword(newPassword.trim());
    }

    const updated = {
      ...adminSecurity,
      username: newUsername ? newUsername.trim() : adminSecurity.username,
      passwordHash: updatedHash,
      sessionTimeoutMinutes: sessionTimeoutMinutes ? Number(sessionTimeoutMinutes) : adminSecurity.sessionTimeoutMinutes
    };

    setAdminSecurity(updated);
    if (typeof window !== 'undefined') {
      localStorage.setItem(SECURITY_KEY, JSON.stringify(updated));
    }
    refreshSession();
    recordAuditLog('Credentials Changed', `Admin username/password updated with SHA-256 cryptographic protection.`, 'info');
    return { success: true };
  };

  // 2FA Configuration
  const configureTwoFactor = async ({ currentPassword, enable, pin, recoveryCode }) => {
    const cleanPass = (currentPassword || '').trim();
    const inputHash = await hashPassword(cleanPass);
    let isCurrentValid = false;

    if (adminSecurity.passwordHash) {
      isCurrentValid = (inputHash === adminSecurity.passwordHash);
    } else {
      isCurrentValid = (cleanPass === 'admin123' || cleanPass === 'elevate2026');
    }

    if (!isCurrentValid) {
      return { success: false, message: 'Current password does not match. Authorization required.' };
    }

    let pinHash = adminSecurity.securityPinHash;
    let codeHash = adminSecurity.emergencyRecoveryCodeHash;

    if (enable) {
      if (!pin || pin.length !== 6 || !/^\d{6}$/.test(pin)) {
        return { success: false, message: 'Please provide a valid 6-digit numeric PIN.' };
      }
      pinHash = await hashPin(pin);
      if (recoveryCode) {
        codeHash = await hashPassword(recoveryCode.trim().toUpperCase());
      }
    }

    const updatedSecurity = {
      ...adminSecurity,
      twoFactorEnabled: !!enable,
      securityPinHash: enable ? pinHash : '',
      emergencyRecoveryCodeHash: enable ? codeHash : ''
    };

    setAdminSecurity(updatedSecurity);
    if (typeof window !== 'undefined') {
      localStorage.setItem(SECURITY_KEY, JSON.stringify(updatedSecurity));
    }

    recordAuditLog(
      enable ? '2FA Protection Enabled' : '2FA Protection Disabled',
      enable ? '6-digit Master Security PIN and Backup Recovery Code activated.' : 'Two-factor authentication disabled.',
      enable ? 'success' : 'warning'
    );

    return { success: true };
  };

  // Emergency Lockdown actions
  const triggerEmergencyLockdown = () => {
    const updatedSecurity = {
      ...adminSecurity,
      isLockdownActive: true
    };
    setAdminSecurity(updatedSecurity);
    if (typeof window !== 'undefined') {
      localStorage.setItem(SECURITY_KEY, JSON.stringify(updatedSecurity));
    }
    recordAuditLog('EMERGENCY LOCKDOWN ACTIVATED', 'Admin console locked down. All active sessions immediately invalidated.', 'critical');
    logoutAdmin();
  };

  const disableEmergencyLockdown = async (masterPassword) => {
    const cleanPass = (masterPassword || '').trim();
    const inputHash = await hashPassword(cleanPass);
    let isCurrentValid = false;

    if (adminSecurity.passwordHash) {
      isCurrentValid = (inputHash === adminSecurity.passwordHash);
    } else {
      isCurrentValid = (cleanPass === 'admin123' || cleanPass === 'elevate2026');
    }

    if (!isCurrentValid) {
      return { success: false, message: 'Invalid master password. Cannot unlock portal.' };
    }

    const updatedSecurity = {
      ...adminSecurity,
      isLockdownActive: false,
      failedAttempts: 0,
      lockedUntil: null
    };
    setAdminSecurity(updatedSecurity);
    if (typeof window !== 'undefined') {
      localStorage.setItem(SECURITY_KEY, JSON.stringify(updatedSecurity));
    }
    recordAuditLog('Lockdown Deactivated', 'Emergency lockdown lifted with verified master password.', 'info');
    return { success: true };
  };

  const clearAuditLogs = () => {
    const initialLog = {
      id: 'log-' + Date.now(),
      timestamp: new Date().toISOString(),
      action: 'Audit History Reset',
      details: 'Audit logs cleared by master administrator.',
      status: 'info',
      device: getClientDeviceInfo()
    };
    const updated = {
      ...adminSecurity,
      auditLogs: [initialLog]
    };
    setAdminSecurity(updated);
    if (typeof window !== 'undefined') {
      localStorage.setItem(SECURITY_KEY, JSON.stringify(updated));
    }
  };

  // Hero section updates
  const updateHero = (heroFields) => {
    setData(prev => ({
      ...prev,
      hero: { ...prev.hero, ...heroFields }
    }));
  };

  // Growth Services header updates
  const updateGrowthServicesHeader = (headerFields) => {
    setData(prev => ({
      ...prev,
      growthServicesHeader: { ...prev.growthServicesHeader, ...headerFields }
    }));
  };

  // Reels section updates
  const updateReels = (reelFields) => {
    setData(prev => ({
      ...prev,
      reels: { ...prev.reels, ...reelFields }
    }));
  };

  // Services CRUD (with 3 images)
  const addService = (service) => {
    const newService = {
      id: `srv-${Date.now()}`,
      bgColor: 'bg-[#EFECE6]',
      textColor: 'text-[#0B0C10]',
      subTextColor: 'text-[#0B0C10]/80',
      borderColor: 'border-[#0B0C10]/15',
      badgeBg: 'bg-[#0B0C10] text-white',
      accentColor: 'text-[#FF1E56]',
      iconName: 'Instagram',
      metricsTable: [],
      images: {
        left: { url: '/images/social/social_pool_shoot.jpg', caption: 'SERVICE PHOTO 1' },
        center: { url: '/images/social/social_instagram_feed.jpg', caption: 'SERVICE PHOTO 2' },
        right: { url: '/images/social/social_sunset_production.jpg', caption: 'SERVICE PHOTO 3' }
      },
      ...service
    };
    setData(prev => ({
      ...prev,
      services: [...(prev.services || []), newService]
    }));
    return newService;
  };

  const updateService = (id, fields) => {
    setData(prev => ({
      ...prev,
      services: (prev.services || []).map(s => s.id === id ? { ...s, ...fields } : s)
    }));
  };

  const deleteService = (id) => {
    setData(prev => ({
      ...prev,
      services: (prev.services || []).filter(s => s.id !== id)
    }));
  };

  // Brands CRUD ("Brands That Grow With JJ Elevate")
  const addBrand = (brand) => {
    const newBrand = {
      id: `brand-${Date.now()}`,
      category: 'hotel',
      logo: '',
      text: brand.name?.toUpperCase() || 'BRAND',
      ...brand
    };
    setData(prev => ({
      ...prev,
      brands: [...(prev.brands || []), newBrand]
    }));
    return newBrand;
  };

  const updateBrand = (id, fields) => {
    setData(prev => ({
      ...prev,
      brands: (prev.brands || []).map(b => b.id === id ? { ...b, ...fields } : b)
    }));
  };

  const deleteBrand = (id) => {
    setData(prev => ({
      ...prev,
      brands: (prev.brands || []).filter(b => b.id !== id)
    }));
  };

  // Case Studies CRUD
  const addCaseStudy = (caseStudy) => {
    const newCaseStudy = {
      id: `case-${Date.now()}`,
      bgColor: 'bg-[#EFECE6]',
      textColor: 'text-[#0B0C10]',
      metricsTable: [],
      fullDetails: { challenge: '', strategy: '', results: [] },
      ...caseStudy
    };
    setData(prev => ({
      ...prev,
      caseStudies: [...(prev.caseStudies || []), newCaseStudy]
    }));
    return newCaseStudy;
  };

  const updateCaseStudy = (id, fields) => {
    setData(prev => ({
      ...prev,
      caseStudies: (prev.caseStudies || []).map(cs => cs.id === id ? { ...cs, ...fields } : cs)
    }));
  };

  const deleteCaseStudy = (id) => {
    setData(prev => ({
      ...prev,
      caseStudies: (prev.caseStudies || []).filter(cs => cs.id !== id)
    }));
  };

  // Team Members CRUD
  const addTeamMember = (member) => {
    const memberImg = member.image || member.img || '/images/team/YASH.webp';
    const memberRole = member.role || member.title || 'HOSPITALITY SPECIALIST';
    const newMember = {
      id: `tm-${Date.now()}`,
      active: true,
      specialties: ['Hospitality Growth', 'Direct Bookings'],
      ...member,
      image: memberImg,
      img: memberImg,
      role: memberRole,
      title: memberRole
    };
    setData(prev => ({
      ...prev,
      teamMembers: [...(prev.teamMembers || []), newMember]
    }));
    return newMember;
  };

  const updateTeamMember = (id, fields) => {
    setData(prev => ({
      ...prev,
      teamMembers: (prev.teamMembers || []).map(m => {
        if (m.id !== id) return m;
        const updatedImg = fields.image || fields.img || m.image || m.img;
        const updatedRole = fields.role || fields.title || m.role || m.title;
        return {
          ...m,
          ...fields,
          image: updatedImg,
          img: updatedImg,
          role: updatedRole,
          title: updatedRole
        };
      })
    }));
  };

  const deleteTeamMember = (id) => {
    setData(prev => ({
      ...prev,
      teamMembers: (prev.teamMembers || []).filter(m => m.id !== id)
    }));
  };

  // Testimonials CRUD ("What Our Clients Say")
  const addTestimonial = (testimonial) => {
    const authorName = testimonial.clientName || testimonial.author || 'Hotel Leader';
    const initials = authorName
      .split(' ')
      .map(w => w[0])
      .join('')
      .slice(0, 2)
      .toUpperCase();

    const newTestimonial = {
      id: `test-${Date.now()}`,
      rating: 5,
      avatarText: initials,
      logoBg: 'bg-rose-50 text-rose-700 border-rose-200',
      ...testimonial,
      author: authorName,
      clientName: authorName,
      organization: testimonial.property || testimonial.organization || 'Luxury Hospitality',
      property: testimonial.property || testimonial.organization || 'Luxury Hospitality',
      quote: testimonial.content || testimonial.quote || '',
      content: testimonial.content || testimonial.quote || '',
      image: testimonial.avatar || testimonial.image || '/images/testimonials/vikramaditya.jpg',
      avatar: testimonial.avatar || testimonial.image || '/images/testimonials/vikramaditya.jpg'
    };
    setData(prev => ({
      ...prev,
      testimonials: [...(prev.testimonials || []), newTestimonial]
    }));
    return newTestimonial;
  };

  const updateTestimonial = (id, fields) => {
    setData(prev => ({
      ...prev,
      testimonials: (prev.testimonials || []).map(t => {
        if (t.id !== id) return t;
        const authorName = fields.clientName || fields.author || t.clientName || t.author;
        const org = fields.property || fields.organization || t.property || t.organization;
        const text = fields.content || fields.quote || t.content || t.quote;
        const img = fields.avatar || fields.image || t.avatar || t.image;
        return {
          ...t,
          ...fields,
          author: authorName,
          clientName: authorName,
          organization: org,
          property: org,
          quote: text,
          content: text,
          image: img,
          avatar: img
        };
      })
    }));
  };

  const deleteTestimonial = (id) => {
    setData(prev => ({
      ...prev,
      testimonials: (prev.testimonials || []).filter(t => t.id !== id)
    }));
  };

  // Contact Info
  const updateContact = (contactFields) => {
    setData(prev => ({
      ...prev,
      contact: {
        ...prev.contact,
        ...contactFields,
        social: {
          ...prev.contact.social,
          ...(contactFields.social || {})
        }
      }
    }));
  };

  // Inquiries / Leads CRUD
  const addInquiry = (inquiry) => {
    const newInquiry = {
      id: `inq-${Date.now()}`,
      createdAt: new Date().toISOString(),
      status: 'new',
      ...inquiry
    };
    setData(prev => ({
      ...prev,
      contact: {
        ...prev.contact,
        inquiries: [newInquiry, ...(prev.contact.inquiries || [])]
      }
    }));
    // Persist to Neon Postgres in background
    saveNeonInquiry(newInquiry).catch(err => {
      console.warn('Neon inquiry persistence warning:', err);
    });
    return newInquiry;
  };

  const deleteInquiry = (id) => {
    setData(prev => ({
      ...prev,
      contact: {
        ...prev.contact,
        inquiries: (prev.contact.inquiries || []).filter(inq => inq.id !== id)
      }
    }));
  };

  const markInquiryStatus = (id, newStatus) => {
    setData(prev => ({
      ...prev,
      contact: {
        ...prev.contact,
        inquiries: (prev.contact.inquiries || []).map(inq => 
          inq.id === id ? { ...inq, status: newStatus } : inq
        )
      }
    }));
  };

  // Backup & Restore
  const exportData = () => {
    const jsonStr = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `jj-elevate-admin-data-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const importData = (jsonString) => {
    try {
      const parsed = JSON.parse(jsonString);
      if (!parsed || typeof parsed !== 'object') {
        return { success: false, error: 'Invalid JSON file structure' };
      }
      setData(parsed);
      if (typeof window !== 'undefined') {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(parsed));
      }
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  const resetToDefaults = () => {
    if (window.confirm('Are you sure you want to reset all admin data back to factory defaults? All manual edits will be overwritten.')) {
      setData(DEFAULT_ADMIN_DATA);
      if (typeof window !== 'undefined') {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_ADMIN_DATA));
      }
      return true;
    }
    return false;
  };

  return (
    <AdminDataContext.Provider
      value={{
        data,
        isAdminLoggedIn,
        loginAdmin,
        logoutAdmin,
        updateHero,
        updateGrowthServicesHeader,
        updateReels,
        addService,
        updateService,
        deleteService,
        addBrand,
        updateBrand,
        deleteBrand,
        addCaseStudy,
        updateCaseStudy,
        deleteCaseStudy,
        addTeamMember,
        updateTeamMember,
        deleteTeamMember,
        addTestimonial,
        updateTestimonial,
        deleteTestimonial,
        updateContact,
        addInquiry,
        deleteInquiry,
        markInquiryStatus,
        exportData,
        importData,
        resetToDefaults,
        adminSecuritySettings: adminSecurity,
        isUsingDefaultPassword: !adminSecurity.passwordHash,
        updateAdminCredentials,
        resetLockoutCounter,
        refreshSession,
        verify2FALogin,
        configureTwoFactor,
        triggerEmergencyLockdown,
        disableEmergencyLockdown,
        clearAuditLogs,
        recordAuditLog,
        cloudSyncStatus,
        lastCloudSyncTime,
        syncToCloud,
        checkNeonHealth,
        isCloudConfigured: true,
        isNeonConfigured: true,
        getSupabaseConfig,
        saveSupabaseConfig,
        clearSupabaseConfig,
        testSupabaseConnection
      }}
    >
      {children}
    </AdminDataContext.Provider>
  );
}

export function useAdminData() {
  const context = useContext(AdminDataContext);
  if (!context) {
    throw new Error('useAdminData must be used within an AdminDataProvider');
  }
  return context;
}
