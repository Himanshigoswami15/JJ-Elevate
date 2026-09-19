import React from 'react';
import DreamTeam from './DreamTeam';

export default function AboutUs({ onOpenConsultation }) {
  return (
    <div id="about" className="scroll-mt-24 w-full">
      {/* 1. Co-Founders Creative Banner Image */}
      <section className="w-full overflow-hidden bg-[#99002B] pt-5 sm:pt-6 pb-0 m-0 border-0">
        <img 
          src="/images/about/JJ_ELEVATE_WEBSITE_CREATIVE.svg" 
          alt="JJ Elevate Website Creative — Co-Founders Chandra Vardhan Singh Jodha & Yuvraj Singh Shekhawat" 
          className="w-full h-auto block select-none m-0 p-0 border-0 rounded-none"
          loading="eager"
        />
      </section>

      {/* 2. Meet The Dream Team — Row-Wise Showcase */}
      <DreamTeam />
    </div>
  );
}
