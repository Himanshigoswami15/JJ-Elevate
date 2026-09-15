import React from 'react';

export default function StructuralHotel({ className = '' }) {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <svg
        viewBox="0 0 340 340"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full filter drop-shadow-[0_10px_25px_rgba(255,255,255,0.35)] drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]"
      >
        <defs>
          <linearGradient id="hotelLineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
            <stop offset="70%" stopColor="#FFFFFF" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.4" />
          </linearGradient>
          <linearGradient id="hotelFillGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.10" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.02" />
          </linearGradient>
          <linearGradient id="poolGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.08" />
          </linearGradient>
        </defs>

        <g stroke="url(#hotelLineGrad)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
          {/* Base Foundation Platform Grid */}
          <polygon
            points="170,290 60,230 170,170 280,230"
            fill="url(#hotelFillGrad)"
            strokeWidth="1.5"
            strokeOpacity="0.5"
            strokeDasharray="4 4"
          />

          {/* Lower Level / Main Hotel Podium */}
          {/* Left Facade */}
          <polygon points="170,250 80,200 80,140 170,190" fill="url(#hotelFillGrad)" strokeWidth="1.75" />
          {/* Right Facade */}
          <polygon points="170,250 260,200 260,140 170,190" fill="url(#hotelFillGrad)" strokeWidth="1.75" />
          {/* Podium Roof Deck */}
          <polygon points="170,190 80,140 170,90 260,140" fill="url(#hotelFillGrad)" strokeWidth="1.5" />

          {/* Architectural Vertical Glass Mullions (Left & Right) */}
          <line x1="110" y1="183" x2="110" y2="123" strokeOpacity="0.6" strokeDasharray="3 3" />
          <line x1="140" y1="200" x2="140" y2="140" strokeOpacity="0.6" strokeDasharray="3 3" />
          <line x1="200" y1="200" x2="200" y2="140" strokeOpacity="0.6" strokeDasharray="3 3" />
          <line x1="230" y1="183" x2="230" y2="123" strokeOpacity="0.6" strokeDasharray="3 3" />

          {/* Ground Floor Grand Entrance Pillars */}
          <line x1="155" y1="242" x2="155" y2="215" strokeWidth="2.5" />
          <line x1="185" y1="242" x2="185" y2="215" strokeWidth="2.5" />
          <polygon points="170,230 145,215 170,200 195,215" fill="#FFFFFF" fillOpacity="0.25" strokeWidth="1.5" />

          {/* Upper Tier / Cantilevered Penthouse Suite */}
          {/* Left Facade */}
          <polygon points="170,165 110,130 110,80 170,115" fill="url(#hotelFillGrad)" strokeWidth="1.75" />
          {/* Right Facade */}
          <polygon points="170,165 230,130 230,80 170,115" fill="url(#hotelFillGrad)" strokeWidth="1.75" />
          {/* Penthouse Roof Deck */}
          <polygon points="170,115 110,80 170,45 230,80" fill="url(#hotelFillGrad)" strokeWidth="1.75" />

          {/* Minimalist Rooftop Infinity Pool */}
          <polygon
            points="170,75 130,55 170,35 210,55"
            fill="url(#poolGrad)"
            strokeWidth="1.5"
          />
          {/* Water Reflection Ripples */}
          <line x1="155" y1="55" x2="185" y2="55" strokeOpacity="0.7" strokeDasharray="2 2" />

          {/* Minimalist Architectural Lounge Pergola / Canopy */}
          <line x1="130" y1="55" x2="130" y2="35" strokeWidth="2" />
          <line x1="145" y1="63" x2="145" y2="43" strokeWidth="2" />
          <polygon points="130,35 145,43 160,35 145,27" fill="#FFFFFF" fillOpacity="0.2" strokeWidth="1.25" />

          {/* Subtle Balcony Railings */}
          <line x1="80" y1="135" x2="170" y2="185" strokeOpacity="0.75" strokeWidth="1.25" />
          <line x1="170" y1="185" x2="260" y2="135" strokeOpacity="0.75" strokeWidth="1.25" />

          {/* Glowing Minimalist Coordinates & Apex Pin */}
          <circle cx="170" cy="27" r="2.5" fill="#FFFFFF" />
          <line x1="170" y1="27" x2="170" y2="15" strokeDasharray="2 2" strokeOpacity="0.6" />
          <circle cx="170" cy="15" r="1.5" fill="#FFFFFF" />

          {/* Modern Blueprint Coordinate Crosses */}
          <g strokeOpacity="0.4" strokeWidth="1">
            <line x1="35" y1="50" x2="45" y2="50" />
            <line x1="40" y1="45" x2="40" y2="55" />
            <line x1="295" y1="280" x2="305" y2="280" />
            <line x1="300" y1="275" x2="300" y2="285" />
          </g>
        </g>
      </svg>
    </div>
  );
}
