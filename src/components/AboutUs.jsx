import React from 'react';
import DreamTeam from './DreamTeam';

export default function AboutUs({ onOpenConsultation }) {
  return (
    <div id="about" className="scroll-mt-24 w-full">
      {/* 1. Co-Founders Creative Banner Image */}
      <section className="w-full overflow-hidden bg-[#99002B] pt-5 sm:pt-6 pb-0 m-0 border-0 flex items-center justify-center">
        <picture className="w-full h-auto flex items-center justify-center select-none pointer-events-none m-0 p-0 border-0">
          <source 
            media="(min-width: 768px)" 
            type="image/webp" 
            srcSet="/images/about/about-hero-desktop-1536.webp 1536w, /images/about/about-hero-desktop-2048.webp 2048w" 
          />
          <source 
            media="(max-width: 767px)" 
            type="image/webp" 
            srcSet="/images/about/about-hero-mobile.webp" 
          />
          <img 
            src="/images/about/about-hero-desktop.webp" 
            alt="JJ Elevate Website Creative — Co-Founders Chandra Vardhan Singh Jodha & Yuvraj Singh Shekhawat" 
            className="w-full h-auto block select-none m-0 p-0 border-0 rounded-none"
            loading="eager"
            fetchPriority="high"
            decoding="async"
          />
        </picture>
      </section>

      {/* 2. Meet The Dream Team — Row-Wise Showcase */}
      <DreamTeam />
    </div>
  );
}
