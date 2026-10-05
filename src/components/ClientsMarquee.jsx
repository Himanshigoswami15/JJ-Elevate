import React, { useState } from 'react';
import {
  TajLogo,
  OberoiLogo,
  LeelaLogo,
  ITCLogo,
  HeritagePalaceLogo,
  VillaShantiLogo,
  SerenitySpringsLogo,
} from './clients/HotelClientLogos';
import { useAdminData } from '../context/AdminDataContext';

const HOTEL_LOGO_COMPONENTS = {
  'taj hotels & palaces': TajLogo,
  'the oberoi group': OberoiLogo,
  'the leela palaces': LeelaLogo,
  'itc hotels luxury': ITCLogo,
  'heritage palace resorts': HeritagePalaceLogo,
  'villa shanti stays': VillaShantiLogo,
  'serenity springs resort': SerenitySpringsLogo,
};

// Default Hotel & Resort Clients
const defaultHotelClients = [
  { name: 'Taj Hotels & Palaces', component: TajLogo },
  { name: 'The Oberoi Group', component: OberoiLogo },
  { name: 'The Leela Palaces', component: LeelaLogo },
  { name: 'ITC Hotels Luxury', component: ITCLogo },
  { name: 'Heritage Palace Resorts', component: HeritagePalaceLogo },
  { name: 'Villa Shanti Stays', component: VillaShantiLogo },
  { name: 'Serenity Springs Resort', component: SerenitySpringsLogo },
];

// Default Distribution & OTA Platforms from jjelevate.com
const defaultOtaPartners = [
  { name: 'Agoda', logo: '/images/clients/agoda.png' },
  { name: 'Airbnb', logo: '/images/clients/airbnb.png' },
  { name: 'Booking.com', logo: '/images/clients/booking.png' },
  { name: 'MakeMyTrip', logo: '/images/clients/makemytrip.png' },
  { name: 'Goibibo', logo: '/images/clients/goibibo.png' },
  { name: 'Cleartrip', logo: '/images/clients/cleartrip.png' },
  { name: 'Vyapar', logo: '/images/clients/vyapar.png' },
];

export default function ClientsMarquee() {
  const [activeTab, setActiveTab] = useState('all'); // 'all' | 'hotels' | 'partners'

  let adminBrands = null;
  try {
    const adminCtx = useAdminData();
    adminBrands = adminCtx?.data?.brands;
  } catch {
    // context fallback
  }

  // Build active lists from admin context or default
  let hotelClients = defaultHotelClients;
  let otaPartners = defaultOtaPartners;

  if (adminBrands && adminBrands.length > 0) {
    const dynamicHotels = adminBrands.filter(b => b.category === 'hotel').map(b => {
      const key = (b.name || '').toLowerCase().trim();
      return {
        name: b.name,
        logo: b.logo,
        text: b.text || b.name,
        component: HOTEL_LOGO_COMPONENTS[key] || null
      };
    });

    const dynamicOtas = adminBrands.filter(b => b.category === 'partner').map(b => ({
      name: b.name,
      logo: b.logo || '/images/clients/booking.png',
      text: b.text || b.name
    }));

    if (dynamicHotels.length > 0) hotelClients = dynamicHotels;
    if (dynamicOtas.length > 0) otaPartners = dynamicOtas;
  }

  // Triple items for continuous infinite scroll
  const marqueeHotels = [...hotelClients, ...hotelClients, ...hotelClients, ...hotelClients];
  const marqueeOtas = [...otaPartners, ...otaPartners, ...otaPartners, ...otaPartners];

  return (
    <section
      id="clients"
      className="relative w-full bg-white py-12 sm:py-16 md:py-20 border-y border-neutral-100 overflow-hidden"
    >
      {/* Header & Tabs */}
      <div className="max-w-7xl mx-auto px-6 text-center mb-10">
        <p className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.28em] text-neutral-400 mb-3">
          Trusted by 120+ Hospitality Leaders &amp; Global Booking Channels
        </p>
        <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold text-jj-dark tracking-tight">
          Brands That Grow With <span className="text-jj-pink">JJ Elevate</span>
        </h3>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 mt-6 max-w-xl mx-auto">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-[11px] sm:text-xs font-bold uppercase tracking-wider transition-all duration-300 min-h-[38px] flex items-center justify-center ${
              activeTab === 'all'
                ? 'bg-jj-dark text-white shadow-sm'
                : 'bg-neutral-100 text-neutral-500 hover:bg-neutral-200'
            }`}
          >
            All Brands
          </button>
          <button
            onClick={() => setActiveTab('hotels')}
            className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-[11px] sm:text-xs font-bold uppercase tracking-wider transition-all duration-300 min-h-[38px] flex items-center justify-center ${
              activeTab === 'hotels'
                ? 'bg-jj-dark text-white shadow-sm'
                : 'bg-neutral-100 text-neutral-500 hover:bg-neutral-200'
            }`}
          >
            Hotels &amp; Luxury Resorts
          </button>
          <button
            onClick={() => setActiveTab('partners')}
            className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-[11px] sm:text-xs font-bold uppercase tracking-wider transition-all duration-300 min-h-[38px] flex items-center justify-center ${
              activeTab === 'partners'
                ? 'bg-jj-dark text-white shadow-sm'
                : 'bg-neutral-100 text-neutral-500 hover:bg-neutral-200'
            }`}
          >
            OTA &amp; Booking Platforms
          </button>
        </div>
      </div>

      {/* Marquee Track Container */}
      <div className="relative w-full space-y-6 sm:space-y-8 overflow-hidden">
        {/* Left & Right edge gradient fades */}
        <div className="absolute left-0 top-0 bottom-0 w-28 sm:w-48 bg-gradient-to-r from-white via-white/85 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-28 sm:w-48 bg-gradient-to-l from-white via-white/85 to-transparent z-10 pointer-events-none" />

        {/* Row 1: Hotel & Resort Clients (scrolls left) */}
        {(activeTab === 'all' || activeTab === 'hotels') && (
          <div className="relative w-full overflow-hidden">
            <div
              data-cursor="PAUSE"
              className="flex items-center whitespace-nowrap will-change-transform cursor-grab active:cursor-grabbing"
              style={{ animation: 'marquee-left 36s linear infinite' }}
              onMouseEnter={(e) => (e.currentTarget.style.animationPlayState = 'paused')}
              onMouseLeave={(e) => (e.currentTarget.style.animationPlayState = 'running')}
            >
              {marqueeHotels.map((client, idx) => {
                const LogoComp = client.component;
                return (
                  <div
                    key={`hotel-${idx}`}
                    className="inline-flex items-center justify-center mx-8 sm:mx-12 shrink-0 group cursor-pointer"
                  >
                    <div className="h-12 sm:h-14 flex items-center justify-center px-5 py-2 rounded-2xl bg-neutral-50/70 border border-neutral-100/80 shadow-[0_2px_8px_rgba(0,0,0,0.03)] transition-all duration-300 group-hover:bg-white group-hover:shadow-[0_8px_20px_rgba(0,0,0,0.06)] group-hover:scale-105">
                      {LogoComp ? (
                        <LogoComp className="h-8 sm:h-10 w-auto" />
                      ) : client.logo ? (
                        <img
                          src={client.logo}
                          alt={client.name}
                          className="h-8 sm:h-10 w-auto max-w-[130px] object-contain"
                        />
                      ) : (
                        <span className="font-serif font-bold text-xs sm:text-sm tracking-widest text-neutral-800 uppercase">
                          {client.text || client.name}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Row 2: Booking Channels & Platforms (scrolls right for dynamic motion) */}
        {(activeTab === 'all' || activeTab === 'partners') && (
          <div className="relative w-full overflow-hidden">
            <div
              data-cursor="PAUSE"
              className="flex items-center whitespace-nowrap will-change-transform cursor-grab active:cursor-grabbing"
              style={{
                animation: activeTab === 'all' ? 'marquee-right 32s linear infinite' : 'marquee-left 32s linear infinite',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.animationPlayState = 'paused')}
              onMouseLeave={(e) => (e.currentTarget.style.animationPlayState = 'running')}
            >
              {marqueeOtas.map((partner, idx) => (
                <div
                  key={`ota-${idx}`}
                  className="inline-flex items-center justify-center mx-8 sm:mx-12 shrink-0 group cursor-pointer"
                >
                  <div className="h-12 sm:h-14 flex items-center justify-center px-5 py-2 rounded-2xl bg-neutral-50/70 border border-neutral-100/80 shadow-[0_2px_8px_rgba(0,0,0,0.03)] transition-all duration-300 group-hover:bg-white group-hover:shadow-[0_8px_20px_rgba(0,0,0,0.06)] group-hover:scale-105">
                    {partner.logo ? (
                      <img
                        src={partner.logo}
                        alt={`${partner.name} logo`}
                        loading="lazy"
                        className="h-7 sm:h-9 md:h-10 w-auto max-w-[130px] sm:max-w-[150px] object-contain transition-all duration-300 group-hover:scale-105"
                      />
                    ) : (
                      <span className="font-serif font-bold text-xs sm:text-sm tracking-widest text-neutral-800 uppercase">
                        {partner.text || partner.name}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* CSS Keyframes for left and right scrolling */}
      <style>{`
        @keyframes marquee-left {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        @keyframes marquee-right {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0);
          }
        }
      `}</style>
    </section>
  );
}
