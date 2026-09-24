'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

export default function AngelMountainStage({
  onSelectProject,
}: {
  onSelectProject?: (id: string) => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Smooth mouse parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 120 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Parallax transforms for different depth layers
  const mountainsX = useTransform(smoothX, [-0.5, 0.5], [15, -15]);
  const mountainsY = useTransform(smoothY, [-0.5, 0.5], [10, -10]);

  const originalsX = useTransform(smoothX, [-0.5, 0.5], [25, -25]);
  const originalsY = useTransform(smoothY, [-0.5, 0.5], [15, -15]);

  const angelX = useTransform(smoothX, [-0.5, 0.5], [35, -35]);
  const angelY = useTransform(smoothY, [-0.5, 0.5], [20, -20]);

  const cloudsX = useTransform(smoothX, [-0.5, 0.5], [45, -45]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full h-[480px] md:h-[580px] lg:h-[650px] overflow-hidden flex items-center justify-center select-none"
    >
      {/* Deep atmospheric backdrop glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#030712]/40 via-[#070e1e]/60 to-[#030712] pointer-events-none" />
      
      {/* Atmospheric Star / Dust field */}
      <div className="absolute inset-0 opacity-40 mix-blend-screen bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

      {/* LAYER 1: Mountain Peaks Layer (Background) */}
      <motion.div
        style={{ x: mountainsX, y: mountainsY }}
        className="absolute inset-x-0 bottom-0 h-[380px] md:h-[450px] pointer-events-none flex items-end justify-between px-[-5%]"
      >
        <svg
          viewBox="0 0 1400 500"
          className="w-full h-full object-cover filter brightness-[0.7] contrast-125"
          fill="none"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="mountain-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#475569" />
              <stop offset="30%" stopColor="#1e293b" />
              <stop offset="70%" stopColor="#0f172a" />
              <stop offset="100%" stopColor="#020617" />
            </linearGradient>

            <linearGradient id="snow-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="40%" stopColor="#cbd5e1" />
              <stop offset="100%" stopColor="#64748b" stopOpacity="0" />
            </linearGradient>

            <linearGradient id="cloud-glow" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0" />
              <stop offset="50%" stopColor="#38bdf8" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#38bdf8" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Left Mountain Range */}
          <path
            d="M -100,500 L 50,220 L 160,290 L 290,140 L 420,310 L 540,190 L 680,480 L 700,500 Z"
            fill="url(#mountain-grad)"
          />
          {/* Left Mountain Snow Caps */}
          <path
            d="M 50,220 L 70,250 L 50,260 L 30,245 Z"
            fill="url(#snow-grad)"
          />
          <path
            d="M 290,140 L 320,190 L 295,210 L 265,190 Z"
            fill="url(#snow-grad)"
          />
          <path
            d="M 540,190 L 570,230 L 540,245 L 515,225 Z"
            fill="url(#snow-grad)"
          />

          {/* Right Mountain Range */}
          <path
            d="M 720,500 L 860,190 L 980,310 L 1110,140 L 1240,290 L 1350,220 L 1500,500 Z"
            fill="url(#mountain-grad)"
          />
          {/* Right Mountain Snow Caps */}
          <path
            d="M 860,190 L 890,230 L 860,245 L 835,225 Z"
            fill="url(#snow-grad)"
          />
          <path
            d="M 1110,140 L 1140,190 L 1115,210 L 1085,190 Z"
            fill="url(#snow-grad)"
          />
          <path
            d="M 1350,220 L 1370,250 L 1350,260 L 1330,245 Z"
            fill="url(#snow-grad)"
          />

          {/* Mountain Ridge Highlights */}
          <path
            d="M 290,140 L 350,320 M 540,190 L 470,330 M 1110,140 L 1050,320 M 860,190 L 930,330"
            stroke="#94a3b8"
            strokeWidth="1.5"
            strokeOpacity="0.4"
            fill="none"
          />
        </svg>
      </motion.div>

      {/* LAYER 2: Glowing Bold Red ORIGINALS Typography (Behind the Angel) */}
      <motion.div
        style={{ x: originalsX, y: originalsY }}
        className="absolute bottom-28 md:bottom-32 lg:bottom-36 z-10 flex flex-col items-center justify-center pointer-events-none"
      >
        <div className="relative">
          {/* Ambient red neon glow backplate */}
          <div className="absolute inset-0 blur-3xl opacity-80 bg-red-600/40 rounded-full scale-125" />
          
          <h1 className="relative font-black text-5xl sm:text-7xl md:text-8xl lg:text-9xl tracking-[0.25em] text-[#ff1e38] uppercase italic drop-shadow-[0_0_35px_rgba(255,30,56,0.9)] select-none">
            ORIGINALS
          </h1>

          {/* Secondary glowing overlay */}
          <h1 className="absolute inset-0 font-black text-5xl sm:text-7xl md:text-8xl lg:text-9xl tracking-[0.25em] text-white/30 uppercase italic mix-blend-overlay">
            ORIGINALS
          </h1>
        </div>
      </motion.div>

      {/* LAYER 3: Rolling Fog / Atmospheric Mist Behind Angel */}
      <motion.div
        style={{ x: cloudsX }}
        className="absolute inset-x-0 bottom-12 h-56 pointer-events-none opacity-60 z-15"
      >
        <div className="w-full h-full bg-gradient-to-t from-[#030712] via-[#38bdf8]/15 to-transparent blur-2xl animate-pulse" />
      </motion.div>

      {/* LAYER 4: The Majestic Winged Angel Marble Statue */}
      <motion.div
        style={{ x: angelX, y: angelY }}
        className="relative z-20 w-[290px] sm:w-[350px] md:w-[420px] lg:w-[480px] h-[360px] sm:h-[430px] md:h-[500px] lg:h-[560px] flex items-center justify-center pointer-events-none"
      >
        {/* Divine halo glow around angel */}
        <div className="absolute top-1/4 w-48 h-48 rounded-full bg-cyan-400/20 blur-3xl" />
        <div className="absolute top-1/3 w-64 h-64 rounded-full bg-white/15 blur-2xl" />

        <svg
          viewBox="0 0 500 600"
          className="w-full h-full filter drop-shadow-[0_20px_35px_rgba(0,0,0,0.9)] drop-shadow-[0_0_20px_rgba(255,255,255,0.25)]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Angel Marble Material */}
            <linearGradient id="marble-base" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="25%" stopColor="#f1f5f9" />
              <stop offset="55%" stopColor="#cbd5e1" />
              <stop offset="85%" stopColor="#94a3b8" />
              <stop offset="100%" stopColor="#475569" />
            </linearGradient>

            {/* Wing Feather Shading */}
            <linearGradient id="wing-grad-left" x1="1" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="35%" stopColor="#e2e8f0" />
              <stop offset="70%" stopColor="#94a3b8" />
              <stop offset="100%" stopColor="#334155" />
            </linearGradient>

            <linearGradient id="wing-grad-right" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="35%" stopColor="#e2e8f0" />
              <stop offset="70%" stopColor="#94a3b8" />
              <stop offset="100%" stopColor="#334155" />
            </linearGradient>

            {/* Dramatic Underlighting from Red ORIGINALS text */}
            <linearGradient id="red-reflection" x1="0" y1="1" x2="0" y2="0">
              <stop offset="0%" stopColor="#ef4444" stopOpacity="0.4" />
              <stop offset="30%" stopColor="#ef4444" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* LEFT EXPANSIVE WING */}
          <g className="filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.6)]">
            <path
              d="M 240,240 
                 C 200,160 120,60 30,50 
                 C 10,48 5,65 18,78 
                 C 50,110 90,160 110,210 
                 C 80,180 50,160 35,175 
                 C 25,185 35,200 65,225 
                 C 95,250 140,290 180,330 
                 C 130,300 95,300 85,315 
                 C 75,330 95,345 130,365 
                 C 170,390 220,410 245,415 Z"
              fill="url(#wing-grad-left)"
              stroke="#e2e8f0"
              strokeWidth="0.8"
            />
            {/* Left Wing Feather Textures */}
            <path
              d="M 60,75 C 90,120 150,190 220,250 
                 M 90,130 C 130,180 180,230 230,280 
                 M 120,190 C 150,230 190,270 235,320"
              stroke="#475569"
              strokeWidth="1.2"
              strokeOpacity="0.6"
              fill="none"
            />
          </g>

          {/* RIGHT EXPANSIVE WING */}
          <g className="filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.6)]">
            <path
              d="M 260,240 
                 C 300,160 380,60 470,50 
                 C 490,48 495,65 482,78 
                 C 450,110 410,160 390,210 
                 C 420,180 450,160 465,175 
                 C 475,185 465,200 435,225 
                 C 405,250 360,290 320,330 
                 C 370,300 405,300 415,315 
                 C 425,330 405,345 370,365 
                 C 330,390 280,410 255,415 Z"
              fill="url(#wing-grad-right)"
              stroke="#e2e8f0"
              strokeWidth="0.8"
            />
            {/* Right Wing Feather Textures */}
            <path
              d="M 440,75 C 410,120 350,190 280,250 
                 M 410,130 C 370,180 320,230 270,280 
                 M 380,190 C 350,230 310,270 265,320"
              stroke="#475569"
              strokeWidth="1.2"
              strokeOpacity="0.6"
              fill="none"
            />
          </g>

          {/* STATUE TORSO AND FLOWING ROBES */}
          <g id="statue-body">
            {/* Flowing Gown / Robes */}
            <path
              d="M 225,230 
                 C 215,280 200,380 180,470 
                 C 175,490 190,520 250,525 
                 C 310,520 325,490 320,470 
                 C 300,380 285,280 275,230 Z"
              fill="url(#marble-base)"
              stroke="#cbd5e1"
              strokeWidth="1"
            />

            {/* Robe Drapery Folds */}
            <path
              d="M 235,240 C 220,320 210,420 205,500 
                 M 250,245 C 248,340 248,440 250,520 
                 M 265,240 C 280,320 290,420 295,500"
              stroke="#334155"
              strokeWidth="1.8"
              strokeOpacity="0.5"
              fill="none"
            />

            {/* Left Upraised Arm (Reaching toward heavens) */}
            <path
              d="M 225,210 
                 C 205,170 175,110 150,60 
                 C 145,50 158,45 165,55 
                 C 185,90 220,150 235,190 Z"
              fill="url(#marble-base)"
              stroke="#ffffff"
              strokeWidth="0.8"
            />
            {/* Left Hand open palm */}
            <path
              d="M 150,60 C 145,50 140,40 135,30 C 138,28 148,32 152,42 C 158,50 162,56 165,55 Z"
              fill="#ffffff"
            />

            {/* Right Upraised Arm (Reaching toward heavens) */}
            <path
              d="M 275,210 
                 C 295,170 325,110 350,60 
                 C 355,50 342,45 335,55 
                 C 315,90 280,150 265,190 Z"
              fill="url(#marble-base)"
              stroke="#ffffff"
              strokeWidth="0.8"
            />
            {/* Right Hand open palm */}
            <path
              d="M 350,60 C 355,50 360,40 365,30 C 362,28 352,32 348,42 C 342,50 338,56 335,55 Z"
              fill="#ffffff"
            />

            {/* Head & Classical Facial Contour */}
            <path
              d="M 240,165 
                 C 238,150 242,130 250,130 
                 C 258,130 262,150 260,165 
                 C 255,175 245,175 240,165 Z"
              fill="#ffffff"
            />
            {/* Classical Hair Crown */}
            <path
              d="M 236,145 C 235,130 245,120 250,120 C 255,120 265,130 264,145 C 260,138 240,138 236,145 Z"
              fill="#94a3b8"
            />

            {/* Red Underglow Reflection applied to bottom of statue */}
            <rect x="180" y="380" width="140" height="150" fill="url(#red-reflection)" style={{ mixBlendMode: 'screen' }} />
          </g>
        </svg>
      </motion.div>

      {/* LAYER 5: Foreground Rolling Clouds / Mist at the Bottom */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#030712] via-[#030712]/90 to-transparent z-30 pointer-events-none" />

      <div className="absolute bottom-4 z-35 flex items-center gap-3">
        <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
        <span className="text-[11px] font-mono tracking-widest text-neutral-400 uppercase">
          ORIGINAL EDITIONS // CURATED BY EMMANUEL ODEMUYIWA
        </span>
      </div>
    </div>
  );
}
