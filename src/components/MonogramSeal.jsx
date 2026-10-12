import React from 'react';

export default function MonogramSeal({ className = "w-28 h-auto", initials = "A&S" }) {
  const isSA = initials.toUpperCase().replace(/\s/g, '') === 'S&A';
  const firstLetter = isSA ? 'S' : 'A';
  const secondLetter = isSA ? 'A' : 'S';

  return (
    <div className={`relative inline-flex items-center justify-center select-none ${className}`}>
      <svg 
        viewBox="0 0 240 260" 
        className="w-full h-full drop-shadow-sm transition-transform duration-500 hover:scale-105"
        aria-label={`${firstLetter} & ${secondLetter} Monogram`}
      >
        <defs>
          <linearGradient id="monogramGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#DFBA6E" />
            <stop offset="35%" stopColor="#C5A059" />
            <stop offset="70%" stopColor="#AA8C2C" />
            <stop offset="100%" stopColor="#8C6E20" />
          </linearGradient>
          <filter id="monogramSoftGlow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="1" stdDeviation="1.5" floodColor="#8C6E20" floodOpacity="0.2" />
          </filter>
        </defs>

        <g filter="url(#monogramSoftGlow)">
          {/* Fine Dual Oval Ring Borders */}
          <ellipse cx="120" cy="130" rx="82" ry="98" fill="none" stroke="url(#monogramGoldGrad)" strokeWidth="1.8" opacity="0.9" />
          <ellipse cx="120" cy="130" rx="77" ry="93" fill="none" stroke="url(#monogramGoldGrad)" strokeWidth="0.8" opacity="0.45" />

          {/* Top-Right Laurel Sprig */}
          <g fill="url(#monogramGoldGrad)" stroke="url(#monogramGoldGrad)">
            {/* Main curved branch stem */}
            <path d="M 112,48 C 142,50 178,68 188,102 C 193,118 193,136 190,152" fill="none" strokeWidth="1.8" strokeLinecap="round" />
            
            {/* Tip leaf */}
            <path d="M 190,152 C 196,160 198,168 198,168 C 198,168 191,164 187,156 Z" strokeWidth="0.5" />
            
            {/* Leaf pairs radiating along branch */}
            <path d="M 124,50 C 134,42 142,43 142,43 C 142,43 134,51 127,53 Z" strokeWidth="0.5" />
            <path d="M 123,55 C 130,60 135,66 135,66 C 135,66 127,64 122,58 Z" strokeWidth="0.5" />
            
            <path d="M 148,60 C 160,55 168,60 168,60 C 168,60 159,66 150,65 Z" strokeWidth="0.5" />
            <path d="M 146,67 C 153,75 158,83 158,83 C 158,83 150,79 143,72 Z" strokeWidth="0.5" />
            
            <path d="M 170,80 C 183,78 189,86 189,86 C 189,86 179,89 171,85 Z" strokeWidth="0.5" />
            <path d="M 166,88 C 174,98 176,108 176,108 C 176,108 168,102 162,93 Z" strokeWidth="0.5" />
            
            <path d="M 184,108 C 197,110 200,121 200,121 C 200,121 191,121 184,114 Z" strokeWidth="0.5" />
            <path d="M 179,114 C 185,126 184,136 184,136 C 184,136 178,127 175,119 Z" strokeWidth="0.5" />
          </g>

          {/* Bottom-Left Laurel Sprig */}
          <g fill="url(#monogramGoldGrad)" stroke="url(#monogramGoldGrad)">
            {/* Main curved branch stem */}
            <path d="M 128,212 C 98,210 62,192 52,158 C 47,142 47,124 50,108" fill="none" strokeWidth="1.8" strokeLinecap="round" />
            
            {/* Tip leaf */}
            <path d="M 50,108 C 44,100 42,92 42,92 C 42,92 49,96 53,104 Z" strokeWidth="0.5" />
            
            {/* Leaf pairs radiating along branch */}
            <path d="M 116,210 C 106,218 98,217 98,217 C 98,217 106,209 113,207 Z" strokeWidth="0.5" />
            <path d="M 117,205 C 110,200 105,194 105,194 C 105,194 113,196 118,202 Z" strokeWidth="0.5" />
            
            <path d="M 92,200 C 80,205 72,200 72,200 C 72,200 81,194 90,195 Z" strokeWidth="0.5" />
            <path d="M 94,193 C 87,185 82,177 82,177 C 82,177 90,181 97,188 Z" strokeWidth="0.5" />
            
            <path d="M 70,180 C 57,182 51,174 51,174 C 51,174 61,171 69,175 Z" strokeWidth="0.5" />
            <path d="M 74,172 C 66,162 64,152 64,152 C 64,152 72,158 78,167 Z" strokeWidth="0.5" />
            
            <path d="M 56,152 C 43,150 40,139 40,139 C 40,139 49,139 56,146 Z" strokeWidth="0.5" />
            <path d="M 61,146 C 55,134 56,124 56,124 C 56,124 62,133 65,141 Z" strokeWidth="0.5" />
          </g>

          {/* Classical Roman Serif Monogram Letters */}
          <text 
            x="86" 
            y="148" 
            fontFamily="'Cinzel', 'Playfair Display', 'Times New Roman', serif" 
            fontSize="58" 
            fontWeight="400" 
            fill="url(#monogramGoldGrad)" 
            textAnchor="middle" 
            letterSpacing="-1"
          >
            {firstLetter}
          </text>
          
          <text 
            x="118" 
            y="137" 
            fontFamily="'Playfair Display', 'Baskerville', 'Georgia', serif" 
            fontSize="30" 
            fontStyle="italic" 
            fontWeight="300" 
            fill="url(#monogramGoldGrad)" 
            textAnchor="middle"
          >
            &amp;
          </text>
          
          <text 
            x="150" 
            y="162" 
            fontFamily="'Cinzel', 'Playfair Display', 'Times New Roman', serif" 
            fontSize="58" 
            fontWeight="400" 
            fill="url(#monogramGoldGrad)" 
            textAnchor="middle" 
            letterSpacing="-1"
          >
            {secondLetter}
          </text>
        </g>
      </svg>
    </div>
  );
}
