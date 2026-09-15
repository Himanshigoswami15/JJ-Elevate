import React from 'react';

export default function StructuralAirplane({ className = '' }) {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <svg
        viewBox="0 0 340 340"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full filter drop-shadow-[0_10px_25px_rgba(255,255,255,0.35)] drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]"
      >
        <defs>
          <linearGradient id="planeLineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
            <stop offset="70%" stopColor="#FFFFFF" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.4" />
          </linearGradient>
          <linearGradient id="planeFillGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.02" />
          </linearGradient>
        </defs>

        <g stroke="url(#planeLineGrad)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
          {/* Main Fuselage Body - Sleek Aerodynamic Structural Lines */}
          <path
            d="M 50 240 Q 150 170 280 80"
            strokeWidth="2.25"
          />
          <path
            d="M 50 240 C 90 260 210 160 280 80"
            fill="url(#planeFillGrad)"
            strokeWidth="1.5"
          />
          
          {/* Fuselage Contour Ribs (3D Wireframe Form) */}
          <path d="M 85 220 Q 95 240 110 230" strokeOpacity="0.6" strokeDasharray="3 3" />
          <path d="M 130 185 Q 145 205 160 195" strokeOpacity="0.7" />
          <path d="M 180 150 Q 195 170 210 160" strokeOpacity="0.7" />
          <path d="M 230 115 Q 242 132 254 124" strokeOpacity="0.6" />

          {/* Cockpit Glass Canopy Wireframe */}
          <polygon
            points="245,105 275,82 255,95"
            fill="#FFFFFF"
            fillOpacity="0.25"
            strokeWidth="1.5"
          />

          {/* Left Wing - Structural Ribs & Edges */}
          <polygon
            points="120,190 35,145 85,135 165,160"
            fill="url(#planeFillGrad)"
            strokeWidth="1.75"
          />
          <line x1="60" y1="140" x2="140" y2="175" strokeOpacity="0.5" strokeDasharray="3 3" />
          <line x1="35" y1="145" x2="42" y2="132" strokeWidth="2.5" /> {/* Winglet */}

          {/* Right Wing - Structural Ribs & Edges */}
          <polygon
            points="155,165 235,265 265,250 195,140"
            fill="url(#planeFillGrad)"
            strokeWidth="1.75"
          />
          <line x1="175" y1="152" x2="250" y2="257" strokeOpacity="0.5" strokeDasharray="3 3" />
          <line x1="235" y1="265" x2="246" y2="275" strokeWidth="2.5" /> {/* Winglet */}

          {/* Twin Jet Engine Pods (Wireframe Cylinders) */}
          <rect
            x="115"
            y="185"
            width="28"
            height="14"
            rx="7"
            transform="rotate(40 129 192)"
            fill="#FFFFFF"
            fillOpacity="0.15"
            strokeWidth="1.5"
          />
          <rect
            x="165"
            y="135"
            width="28"
            height="14"
            rx="7"
            transform="rotate(40 179 142)"
            fill="#FFFFFF"
            fillOpacity="0.15"
            strokeWidth="1.5"
          />

          {/* T-Tail & Vertical Stabilizer */}
          <polygon
            points="65,225 35,175 60,175 85,215"
            fill="url(#planeFillGrad)"
            strokeWidth="1.75"
          />
          {/* Horizontal Stabilizers */}
          <line x1="35" y1="175" x2="15" y2="165" strokeWidth="2" />
          <line x1="35" y1="175" x2="52" y2="190" strokeWidth="2" />

          {/* Flight Path Vector Trail */}
          <path
            d="M 285 75 L 320 50"
            stroke="#FFFFFF"
            strokeWidth="1.5"
            strokeDasharray="4 4"
            strokeOpacity="0.7"
          />
          <circle cx="320" cy="50" r="3" fill="#FFFFFF" />

          {/* Modern Blueprint Coordinate Crosses */}
          <g strokeOpacity="0.4" strokeWidth="1">
            <line x1="25" y1="40" x2="35" y2="40" />
            <line x1="30" y1="35" x2="30" y2="45" />
            <line x1="290" y1="300" x2="300" y2="300" />
            <line x1="295" y1="295" x2="295" y2="305" />
          </g>
        </g>
      </svg>
    </div>
  );
}
