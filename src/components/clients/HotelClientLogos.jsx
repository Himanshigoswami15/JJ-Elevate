import React from 'react';

export function TajLogo({ className = "h-9 w-auto" }) {
  return (
    <svg viewBox="0 0 200 60" className={className} xmlns="http://www.w3.org/2000/svg">
      {/* Taj Architectural Palace Dome in Heritage Gold */}
      <defs>
        <linearGradient id="tajGold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#DFB253" />
          <stop offset="50%" stopColor="#BC8C2E" />
          <stop offset="100%" stopColor="#966A19" />
        </linearGradient>
      </defs>
      <path d="M26 12 C26 7, 30 5, 30 5 C30 5, 34 7, 34 12 C37 15, 41 18, 41 24 C41 28, 38 31, 30 31 C22 31, 19 28, 19 24 C19 18, 23 15, 26 12 Z" fill="url(#tajGold)" />
      <path d="M22 33 H38 V36 H22 Z" fill="url(#tajGold)" />
      <path d="M16 38 H44 V41 H16 Z" fill="url(#tajGold)" />
      <path d="M29 3 L31 3 L30.5 0.5 Z" fill="#E8C370" />
      {/* TAJ Wordmark in Deep Royal Navy */}
      <text x="56" y="33" fill="#1C2430" fontFamily="Cinzel, 'Playfair Display', serif" fontSize="24" fontWeight="700" letterSpacing="0.2em">TAJ</text>
      <text x="57" y="44" fill="#A87922" fontFamily="'Plus Jakarta Sans', sans-serif" fontSize="7" fontWeight="700" letterSpacing="0.25em">HOTELS · PALACES · RESORTS</text>
    </svg>
  );
}

export function OberoiLogo({ className = "h-9 w-auto" }) {
  return (
    <svg viewBox="0 0 220 60" className={className} xmlns="http://www.w3.org/2000/svg">
      {/* Oberoi Solar Crest in Vivid Golden Sun */}
      <circle cx="26" cy="28" r="7" stroke="#D97706" strokeWidth="2.5" fill="none" />
      <circle cx="26" cy="28" r="2.5" fill="#D97706" />
      <path d="M26 12 V16 M26 40 V44 M10 28 H14 M38 28 H42 M15 17 L18 20 M34 36 L37 39 M15 39 L18 36 M34 20 L37 17" stroke="#F59E0B" strokeWidth="2.2" strokeLinecap="round" />
      {/* Oberoi Wordmark in Heritage Navy */}
      <text x="56" y="32" fill="#002D62" fontFamily="'Playfair Display', Georgia, serif" fontSize="22" fontWeight="700" letterSpacing="0.08em">Oberoi</text>
      <text x="57" y="44" fill="#B45309" fontFamily="'Plus Jakarta Sans', sans-serif" fontSize="6.5" fontWeight="700" letterSpacing="0.3em">HOTELS &amp; RESORTS</text>
    </svg>
  );
}

export function LeelaLogo({ className = "h-9 w-auto" }) {
  return (
    <svg viewBox="0 0 210 60" className={className} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="leelaSwan" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#B45309" />
        </linearGradient>
      </defs>
      {/* Royal Swan Crest in Amber Gold */}
      <path d="M26 12 C21 16, 17 22, 20 28 C22 32, 27 34, 34 32 C38 31, 41 27, 40 23 C39 19, 35 18, 32 20 C29 22, 29 25, 31 27" stroke="url(#leelaSwan)" strokeWidth="2.4" strokeLinecap="round" fill="none" />
      <path d="M18 36 C24 38, 34 38, 42 36" stroke="url(#leelaSwan)" strokeWidth="2.2" strokeLinecap="round" />
      {/* THE LEELA Wordmark in Deep Burgundy */}
      <text x="54" y="31" fill="#781D42" fontFamily="'Cinzel', 'Trajan Pro', serif" fontSize="19" fontWeight="700" letterSpacing="0.16em">THE LEELA</text>
      <text x="55" y="43" fill="#D97706" fontFamily="'Plus Jakarta Sans', sans-serif" fontSize="6.5" fontWeight="700" letterSpacing="0.26em">PALACES · HOTELS · RESORTS</text>
    </svg>
  );
}

export function ITCLogo({ className = "h-9 w-auto" }) {
  return (
    <svg viewBox="0 0 210 60" className={className} xmlns="http://www.w3.org/2000/svg">
      {/* ITC Shield in Forest Emerald */}
      <path d="M16 14 H40 V30 C40 38, 28 44, 28 44 C28 44, 16 38, 16 30 Z" stroke="#047857" strokeWidth="2.4" fill="#047857" fillOpacity="0.1" />
      <path d="M28 17 V39 M19 26 H37" stroke="#059669" strokeWidth="1.8" strokeLinecap="round" />
      {/* ITC HOTELS Wordmark in Dark Forest Slate */}
      <text x="52" y="31" fill="#064E3B" fontFamily="'Plus Jakarta Sans', 'Arial Black', sans-serif" fontSize="19" fontWeight="800" letterSpacing="0.14em">ITC HOTELS</text>
      <text x="53" y="43" fill="#047857" fontFamily="'Plus Jakarta Sans', sans-serif" fontSize="6.5" fontWeight="700" letterSpacing="0.24em">RESPONSIBLE LUXURY</text>
    </svg>
  );
}

export function HeritagePalaceLogo({ className = "h-9 w-auto" }) {
  return (
    <svg viewBox="0 0 230 60" className={className} xmlns="http://www.w3.org/2000/svg">
      {/* Heritage Arch in Regal Crimson */}
      <path d="M16 38 V22 C16 14, 23 10, 30 10 C37 10, 44 14, 44 22 V38" stroke="#DC2626" strokeWidth="2.4" fill="none" />
      <path d="M23 38 V25 C23 20, 26 18, 30 18 C34 18, 37 20, 37 25 V38" stroke="#B91C1C" strokeWidth="2" fill="none" />
      <circle cx="30" cy="8" r="2.5" fill="#F59E0B" />
      {/* HERITAGE PALACE Wordmark */}
      <text x="56" y="30" fill="#1E293B" fontFamily="'Playfair Display', serif" fontSize="17" fontWeight="700" letterSpacing="0.12em">HERITAGE PALACE</text>
      <text x="57" y="42" fill="#DC2626" fontFamily="'Plus Jakarta Sans', sans-serif" fontSize="6.5" fontWeight="700" letterSpacing="0.25em">RESORTS &amp; VILLAS · JODHPUR</text>
    </svg>
  );
}

export function VillaShantiLogo({ className = "h-9 w-auto" }) {
  return (
    <svg viewBox="0 0 210 60" className={className} xmlns="http://www.w3.org/2000/svg">
      {/* Villa Geometric Emblem in Mediterranean Coral & Teal */}
      <path d="M16 34 L30 14 L44 34 Z" stroke="#E11D48" strokeWidth="2.4" fill="#FFE4E6" strokeLinejoin="round" />
      <path d="M24 34 V26 H36 V34" stroke="#0D9488" strokeWidth="2" fill="none" />
      <circle cx="30" cy="10" r="2.5" fill="#0D9488" />
      {/* VILLA SHANTI Wordmark */}
      <text x="54" y="30" fill="#0F172A" fontFamily="'Cinzel', serif" fontSize="18" fontWeight="700" letterSpacing="0.16em">VILLA SHANTI</text>
      <text x="55" y="42" fill="#E11D48" fontFamily="'Plus Jakarta Sans', sans-serif" fontSize="6.5" fontWeight="700" letterSpacing="0.25em">BOUTIQUE LUXURY RETREATS</text>
    </svg>
  );
}

export function SerenitySpringsLogo({ className = "h-9 w-auto" }) {
  return (
    <svg viewBox="0 0 225 60" className={className} xmlns="http://www.w3.org/2000/svg">
      {/* Lotus Wellness Emblem in Teal Emerald */}
      <path d="M28 14 C28 14, 21 22, 21 28 C21 32, 24 35, 28 35 C32 35, 35 32, 35 28 C35 22, 28 14, 28 14 Z" stroke="#059669" strokeWidth="2.2" fill="#D1FAE5" />
      <path d="M20 25 C15 26, 12 30, 14 34 C16 37, 21 37, 24 35" stroke="#10B981" strokeWidth="2" fill="none" />
      <path d="M36 25 C41 26, 44 30, 42 34 C40 37, 35 37, 32 35" stroke="#10B981" strokeWidth="2" fill="none" />
      {/* SERENITY SPRINGS Wordmark */}
      <text x="54" y="30" fill="#064E3B" fontFamily="'Playfair Display', serif" fontSize="16" fontWeight="700" letterSpacing="0.12em">SERENITY SPRINGS</text>
      <text x="55" y="42" fill="#059669" fontFamily="'Plus Jakarta Sans', sans-serif" fontSize="6.5" fontWeight="700" letterSpacing="0.25em">AYURVEDA &amp; WELLNESS RESORT</text>
    </svg>
  );
}
