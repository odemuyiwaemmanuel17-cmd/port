import React from 'react';

export function TShirtMockup({
  graphicType,
  accentColor = '#38bdf8',
  className = '',
  title = '',
  number = '01',
}: {
  graphicType: 'butterfly' | 'angel' | 'cyber' | 'collage' | 'aero';
  accentColor?: string;
  className?: string;
  title?: string;
  number?: string;
}) {
  return (
    <div className={`relative w-full aspect-[4/5] bg-[#0c0d12] rounded-xl overflow-hidden flex items-center justify-center p-4 select-none border border-white/5 group-hover:border-white/20 transition-all duration-500 shadow-2xl ${className}`}>
      {/* Background ambient lighting */}
      <div 
        className="absolute inset-0 opacity-20 group-hover:opacity-40 transition-opacity duration-500 blur-2xl"
        style={{
          background: `radial-gradient(circle at center, ${accentColor} 0%, transparent 70%)`
        }}
      />
      
      {/* Subtle garment studio spotlight */}
      <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />

      {/* Realistic T-Shirt SVG Contour */}
      <div className="relative w-[88%] max-w-[280px] aspect-[1/1.15] filter drop-shadow-[0_15px_25px_rgba(0,0,0,0.8)] transition-transform duration-500 group-hover:scale-105">
        <svg
          viewBox="0 0 300 340"
          className="w-full h-full"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Fabric texture gradient */}
            <linearGradient id={`tshirt-grad-${graphicType}`} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#1f2026" />
              <stop offset="50%" stopColor="#121318" />
              <stop offset="100%" stopColor="#0a0a0d" />
            </linearGradient>

            {/* Collar depth */}
            <linearGradient id={`collar-grad-${graphicType}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#08080a" />
              <stop offset="100%" stopColor="#25262e" />
            </linearGradient>

            {/* Sleeve shadows */}
            <linearGradient id={`sleeve-shadow-l-${graphicType}`} x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#000000" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#000000" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Left Sleeve */}
          <path
            d="M 85,42 L 15,105 C 10,110 8,118 12,125 L 38,155 C 42,160 50,161 56,156 L 88,125 Z"
            fill={`url(#tshirt-grad-${graphicType})`}
            stroke="#2e303d"
            strokeWidth="0.8"
          />
          <path
            d="M 15,105 L 38,155"
            stroke="#3a3c4c"
            strokeWidth="1.5"
            strokeLinecap="round"
          />

          {/* Right Sleeve */}
          <path
            d="M 215,42 L 285,105 C 290,110 292,118 288,125 L 262,155 C 258,160 250,161 244,156 L 212,125 Z"
            fill={`url(#tshirt-grad-${graphicType})`}
            stroke="#2e303d"
            strokeWidth="0.8"
          />
          <path
            d="M 285,105 L 262,155"
            stroke="#3a3c4c"
            strokeWidth="1.5"
            strokeLinecap="round"
          />

          {/* Main Torso / Body of T-shirt */}
          <path
            d="M 85,42 C 100,50 120,54 150,54 C 180,54 200,50 215,42 L 212,125 C 205,175 208,245 212,320 C 212,326 206,330 200,330 L 100,330 C 94,330 88,326 88,320 C 92,245 95,175 88,125 Z"
            fill={`url(#tshirt-grad-${graphicType})`}
            stroke="#2e303d"
            strokeWidth="0.8"
          />

          {/* Crewneck Collar (Outer & Inner) */}
          <path
            d="M 115,38 C 125,58 175,58 185,38 C 172,46 128,46 115,38 Z"
            fill={`url(#collar-grad-${graphicType})`}
            stroke="#3f4254"
            strokeWidth="1.2"
          />
          <path
            d="M 118,36 C 128,52 172,52 182,36"
            stroke="#4f536b"
            strokeWidth="1"
            fill="none"
          />

          {/* Fold / Wrinkle Lines for Realism */}
          <path
            d="M 88,135 Q 110,145 130,138"
            stroke="#000000"
            strokeWidth="1.2"
            strokeOpacity="0.4"
            fill="none"
          />
          <path
            d="M 212,135 Q 190,145 170,138"
            stroke="#000000"
            strokeWidth="1.2"
            strokeOpacity="0.4"
            fill="none"
          />
          <path
            d="M 105,240 Q 150,250 195,240"
            stroke="#000000"
            strokeWidth="1"
            strokeOpacity="0.3"
            fill="none"
          />

          {/* Graphic Print Placement Area */}
          <g transform="translate(100, 80)">
            {graphicType === 'butterfly' && <ButterflyGraphic accentColor={accentColor} />}
            {graphicType === 'angel' && <AngelPrintGraphic accentColor={accentColor} />}
            {graphicType === 'cyber' && <CyberMatrixGraphic accentColor={accentColor} />}
            {graphicType === 'collage' && <CollageArtGraphic accentColor={accentColor} />}
            {graphicType === 'aero' && <AeroProfileGraphic accentColor={accentColor} />}
          </g>
        </svg>
      </div>

      {/* Streetwear Badge / Tag on Bottom */}
      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between pointer-events-none">
        <span className="text-[9px] uppercase tracking-widest text-neutral-500 font-mono">
          EDITION // {number}
        </span>
        <span className="text-[9px] font-semibold text-neutral-400 font-mono px-2 py-0.5 rounded bg-white/5 border border-white/5">
          STREETWEAR CUT
        </span>
      </div>
    </div>
  );
}

export function ButterflyGraphic({ accentColor = '#38bdf8' }: { accentColor?: string }) {
  return (
    <g className="filter drop-shadow-[0_0_12px_rgba(56,189,248,0.7)]">
      {/* Top Typography on Graphic */}
      <text x="50" y="15" textAnchor="middle" fill="#ffffff" fontSize="6.5" fontWeight="900" letterSpacing="2" opacity="0.9">
        FEARLESS SOUL
      </text>

      {/* Butterfly Wings Center */}
      <g transform="translate(50, 65) scale(0.65)">
        {/* Left Wing Upper */}
        <path
          d="M 0,0 C -30,-60 -75,-40 -70,10 C -68,30 -40,35 0,10 Z"
          fill="url(#butterfly-glow)"
          opacity="0.85"
        />
        {/* Left Wing Lower */}
        <path
          d="M 0,10 C -45,25 -60,65 -30,70 C -10,72 -5,40 0,20 Z"
          fill="url(#butterfly-glow)"
          opacity="0.75"
        />

        {/* Right Wing Upper */}
        <path
          d="M 0,0 C 30,-60 75,-40 70,10 C 68,30 40,35 0,10 Z"
          fill="url(#butterfly-glow)"
          opacity="0.85"
        />
        {/* Right Wing Lower */}
        <path
          d="M 0,10 C 45,25 60,65 30,70 C 10,72 5,40 0,20 Z"
          fill="url(#butterfly-glow)"
          opacity="0.75"
        />

        {/* Wing Veins */}
        <path
          d="M 0,0 Q -40,-25 -55,0 M 0,0 Q -30,-40 -50,-20 M 0,10 Q -30,45 -25,55"
          stroke="#ffffff"
          strokeWidth="1.2"
          strokeOpacity="0.8"
          fill="none"
        />
        <path
          d="M 0,0 Q 40,-25 55,0 M 0,0 Q 30,-40 50,-20 M 0,10 Q 30,45 25,55"
          stroke="#ffffff"
          strokeWidth="1.2"
          strokeOpacity="0.8"
          fill="none"
        />

        {/* Butterfly Body */}
        <ellipse cx="0" cy="15" rx="3" ry="25" fill="#ffffff" />
        <circle cx="0" cy="-12" r="3.5" fill="#ffffff" />
        {/* Antennae */}
        <path d="M -1,-14 Q -10,-25 -18,-22 M 1,-14 Q 10,-25 18,-22" stroke="#ffffff" strokeWidth="1" fill="none" />
      </g>

      <defs>
        <linearGradient id="butterfly-glow" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="30%" stopColor="#38bdf8" />
          <stop offset="70%" stopColor="#0284c7" />
          <stop offset="100%" stopColor="#0369a1" />
        </linearGradient>
      </defs>

      {/* Subtext */}
      <text x="50" y="125" textAnchor="middle" fill="#94a3b8" fontSize="5" letterSpacing="1.5">
        ORIGINALS // ARCHIVE
      </text>
    </g>
  );
}

export function AngelPrintGraphic({ accentColor = '#ef4444' }: { accentColor?: string }) {
  return (
    <g className="filter drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">
      <text x="50" y="15" textAnchor="middle" fill="#ef4444" fontSize="7" fontWeight="900" letterSpacing="2.5">
        ORIGINALS
      </text>

      {/* Classical Winged Statue Silhouette */}
      <g transform="translate(50, 68) scale(0.6)">
        {/* Left Angel Wing */}
        <path
          d="M 0,-10 C -25,-60 -70,-50 -60,0 C -55,25 -25,25 0,15 Z"
          fill="#e2e8f0"
          opacity="0.9"
        />
        {/* Right Angel Wing */}
        <path
          d="M 0,-10 C 25,-60 70,-50 60,0 C 55,25 25,25 0,15 Z"
          fill="#e2e8f0"
          opacity="0.9"
        />
        
        {/* Robed Figure */}
        <path
          d="M -12,0 C -15,20 -20,60 -25,75 C -10,77 10,77 25,75 C 20,60 15,20 12,0 Z"
          fill="#cbd5e1"
        />
        
        {/* Outstretched Arms */}
        <path
          d="M -10,5 L -35,-25 C -38,-28 -32,-32 -28,-28 L -5,0 Z"
          fill="#ffffff"
        />
        <path
          d="M 10,5 L 35,-25 C 38,-28 32,-32 28,-28 L 5,0 Z"
          fill="#ffffff"
        />

        {/* Head and Halo */}
        <circle cx="0" cy="-8" r="6" fill="#f8fafc" />
        <ellipse cx="0" cy="-15" rx="14" ry="4" stroke="#ffd700" strokeWidth="1.5" fill="none" opacity="0.85" />
      </g>

      <text x="50" y="125" textAnchor="middle" fill="#ffffff" fontSize="4.5" letterSpacing="2" opacity="0.7">
        ASCENSION EDITION
      </text>
    </g>
  );
}

export function CyberMatrixGraphic({ accentColor = '#22c55e' }: { accentColor?: string }) {
  return (
    <g>
      <text x="50" y="15" textAnchor="middle" fill="#4ade80" fontSize="6" fontWeight="800" letterSpacing="1.5">
        SECURITY TELEMETRY
      </text>

      {/* Cyber barcode / matrix tree */}
      <g transform="translate(15, 30)">
        {/* Vertical telemetry bars like in video */}
        {[0, 10, 20, 30, 40, 50, 60, 70].map((x, i) => (
          <rect
            key={i}
            x={x}
            y={Math.sin(i * 0.8) * 10 + 15}
            width={4}
            height={45 - Math.abs(i - 3.5) * 6}
            rx="2"
            fill="#38bdf8"
            className="filter drop-shadow-[0_0_8px_rgba(56,189,248,0.8)]"
          />
        ))}

        <path
          d="M 0,75 L 70,75"
          stroke="#4ade80"
          strokeWidth="1.5"
          strokeDasharray="3 2"
        />
      </g>

      <text x="50" y="125" textAnchor="middle" fill="#64748b" fontSize="5" letterSpacing="1">
        APPMD // ZERO-DAY INSPECT
      </text>
    </g>
  );
}

export function CollageArtGraphic({ accentColor = '#a855f7' }: { accentColor?: string }) {
  return (
    <g>
      <text x="50" y="15" textAnchor="middle" fill="#c084fc" fontSize="6.5" fontWeight="900" letterSpacing="2">
        STUDIO BATCH
      </text>

      {/* Modern Collage layout with statue bust & halftone typography */}
      <g transform="translate(20, 28)">
        <rect x="0" y="0" width="35" height="45" fill="#1e1b4b" stroke="#818cf8" strokeWidth="0.8" />
        <rect x="25" y="15" width="35" height="45" fill="#312e81" stroke="#c084fc" strokeWidth="0.8" />
        
        {/* Statue bust silhouette */}
        <circle cx="17" cy="18" r="8" fill="#e2e8f0" opacity="0.9" />
        <path d="M 8,35 C 10,25 24,25 26,35 Z" fill="#cbd5e1" />
        
        {/* Halftone grid pattern */}
        <circle cx="42" cy="30" r="1.5" fill="#ffffff" />
        <circle cx="48" cy="30" r="1.5" fill="#ffffff" />
        <circle cx="54" cy="30" r="1.5" fill="#ffffff" />
        <circle cx="42" cy="36" r="1.5" fill="#ffffff" />
        <circle cx="48" cy="36" r="1.5" fill="#ffffff" />
        <circle cx="54" cy="36" r="1.5" fill="#ffffff" />
      </g>

      <text x="50" y="125" textAnchor="middle" fill="#94a3b8" fontSize="5" letterSpacing="1">
        CANVAS WORKFLOWS
      </text>
    </g>
  );
}

export function AeroProfileGraphic({ accentColor = '#06b6d4' }: { accentColor?: string }) {
  return (
    <g>
      <text x="50" y="15" textAnchor="middle" fill="#22d3ee" fontSize="6.5" fontWeight="900" letterSpacing="2">
        AEROCAD WING
      </text>

      {/* Aerodynamic NACA Profile and Streamlines */}
      <g transform="translate(20, 40)">
        {/* Streamlines */}
        <path d="M 0,5 Q 30,-5 60,10" stroke="#0ea5e9" strokeWidth="1" strokeDasharray="4 2" fill="none" opacity="0.6" />
        <path d="M 0,25 Q 30,35 60,20" stroke="#0ea5e9" strokeWidth="1" strokeDasharray="4 2" fill="none" opacity="0.6" />
        
        {/* Airfoil Cross Section */}
        <path
          d="M 60,15 C 40,0 15,2 0,15 C 15,28 40,30 60,15 Z"
          fill="url(#airfoil-grad)"
          stroke="#38bdf8"
          strokeWidth="1.2"
          className="filter drop-shadow-[0_0_10px_rgba(56,189,248,0.7)]"
        />
      </g>

      <defs>
        <linearGradient id="airfoil-grad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#38bdf8" />
          <stop offset="60%" stopColor="#0284c7" />
          <stop offset="100%" stopColor="#082f49" />
        </linearGradient>
      </defs>

      <text x="50" y="125" textAnchor="middle" fill="#94a3b8" fontSize="5" letterSpacing="1">
        PARAMETRIC CAD // OAU
      </text>
    </g>
  );
}
