'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowDown, ExternalLink } from 'lucide-react';
import { TShirtMockup } from './StreetwearGraphics';
import AngelMountainStage from './AngelMountainStage';
import { projects } from '../data/portfolio-data';

interface FearlessHeroProps {
  onSelectProject: (id: string) => void;
  activeFilter: string;
}

export default function FearlessHero({
  onSelectProject,
  activeFilter,
}: FearlessHeroProps) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  // Mapped apparel deck items corresponding to projects
  const deckItems = [
    {
      id: '01',
      title: 'Gothic Angel Graphic Tee',
      projectRef: projects[0], // Compbuy
      graphicType: 'angel' as const,
      accentColor: '#ef4444',
      badge: 'Escrow Platform',
      price: '₹2,499.00',
    },
    {
      id: '02',
      title: 'Butterfly Oversized Tee',
      projectRef: projects[1], // HandyTrust
      graphicType: 'butterfly' as const,
      accentColor: '#38bdf8',
      badge: 'Artisan Trust',
      price: '₹2,300.00',
    },
    {
      id: '03',
      title: 'Cyber Matrix Security Tee',
      projectRef: projects[2], // AppMD
      graphicType: 'cyber' as const,
      accentColor: '#22c55e',
      badge: 'APK Telemetry',
      price: '₹2,199.00',
    },
    {
      id: '04',
      title: 'Studio Collage Graphic Tee',
      projectRef: projects[3], // Batch Studio
      graphicType: 'collage' as const,
      accentColor: '#c084fc',
      badge: 'Canvas WASM',
      price: '₹2,250.00',
    },
    {
      id: '05',
      title: 'AeroCAD Supersonic Tee',
      projectRef: projects[4], // AeroCAD
      graphicType: 'aero' as const,
      accentColor: '#06b6d4',
      badge: 'NACA Airfoil',
      price: '₹2,600.00',
    },
  ];

  const filteredItems = deckItems.filter((item) => {
    if (activeFilter === 'engineering') return item.id === '01' || item.id === '02';
    if (activeFilter === 'mobile_cad') return item.id === '03' || item.id === '04' || item.id === '05';
    return true;
  });

  const scrollToFeatured = () => {
    const el = document.getElementById('featured-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative w-full pt-28 pb-16 overflow-hidden flex flex-col items-center bg-[#030712]">
      {/* Dynamic Background Spotlight */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-b from-sky-600/15 via-purple-600/10 to-transparent blur-3xl pointer-events-none" />

      {/* TOP HEADER: FEARLESS SOUL (Exact typography from video) */}
      <div className="relative z-20 flex flex-col items-center text-center px-4 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="font-black text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-[0.18em] sm:tracking-[0.22em] text-white uppercase italic drop-shadow-[0_0_25px_rgba(255,255,255,0.2)]">
            FEARLESS SOUL
          </h1>
        </motion.div>

        {/* Center Pill: New Arrival Button (From Video) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mt-4 sm:mt-6"
        >
          <button
            onClick={scrollToFeatured}
            className="group flex items-center gap-2 px-6 py-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/40 backdrop-blur-xl text-xs sm:text-sm font-semibold tracking-wider text-white uppercase transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.5)]"
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-400 group-hover:rotate-12 transition-transform" />
            <span>New Arrival</span>
          </button>
        </motion.div>
      </div>

      {/* FLOATING T-SHIRT / APPAREL DECK CAROUSEL (From Video 00:00 - 00:09) */}
      <div className="relative z-25 w-full max-w-7xl px-4 sm:px-6 mt-8 sm:mt-10 mb-[-60px] md:mb-[-90px]">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-4 md:gap-5 justify-items-center">
          {filteredItems.map((item, idx) => {
            const isHovered = hoveredIdx === idx;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * idx, duration: 0.6 }}
                whileHover={{ y: -12, scale: 1.04 }}
                onHoverStart={() => setHoveredIdx(idx)}
                onHoverEnd={() => setHoveredIdx(null)}
                onClick={() => onSelectProject(item.id)}
                className="cursor-pointer group relative w-full max-w-[220px]"
              >
                {/* Floating Glow on Hover */}
                <div
                  className="absolute -inset-1 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl pointer-events-none"
                  style={{
                    background: `radial-gradient(circle, ${item.accentColor} 0%, transparent 70%)`,
                  }}
                />

                {/* T-Shirt Realistic Mockup Frame */}
                <TShirtMockup
                  graphicType={item.graphicType}
                  accentColor={item.accentColor}
                  number={item.id}
                  className="group-hover:border-white/30"
                />

                {/* Quick Details Floating Pill on Hover */}
                <div className="mt-2.5 flex flex-col items-center text-center">
                  <span className="text-xs font-bold text-white tracking-wide group-hover:text-cyan-300 transition-colors">
                    {item.projectRef?.title || item.title}
                  </span>
                  <div className="flex items-center gap-2 text-[10px] text-neutral-400 font-mono mt-0.5">
                    <span className="text-neutral-300">{item.badge}</span>
                    <span>•</span>
                    <span className="text-red-400 font-semibold">{item.price}</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* THE MAJESTIC ANGEL STATUE, MOUNTAINS, AND ORIGINALS STAGE */}
      <div className="relative w-full z-10 mt-6 md:mt-12">
        <AngelMountainStage onSelectProject={onSelectProject} />
      </div>

      {/* Down indicator */}
      <div className="mt-[-20px] z-30">
        <button
          onClick={scrollToFeatured}
          className="flex flex-col items-center gap-1 text-neutral-400 hover:text-white transition-colors animate-bounce"
        >
          <span className="text-[10px] font-mono tracking-widest uppercase">
            EXPLORE ARCHIVE
          </span>
          <ArrowDown className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
}
