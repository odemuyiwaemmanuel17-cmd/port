'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, Code, ArrowUpRight, ShieldCheck, Zap } from 'lucide-react';
import { TShirtMockup } from './StreetwearGraphics';
import { projects } from '../data/portfolio-data';
import type { Project } from '../types/portfolio';

interface FeaturedGridProps {
  onSelectProject: (id: string) => void;
  activeFilter: string;
}

export default function FeaturedGrid({
  onSelectProject,
  activeFilter,
}: FeaturedGridProps) {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const productList = [
    {
      id: '01',
      project: projects[0],
      productName: 'Gothic Angel Graphic Tee',
      productSubtitle: 'Gothic Angel Heavyweight Oversized Tee',
      price: 'MRP : ₹2,499.00',
      edition: '01/05',
      graphicType: 'angel' as const,
      accentColor: '#ef4444',
      telemetry: 'Supabase RLS • <45ms Latency',
    },
    {
      id: '02',
      project: projects[1],
      productName: 'Butterfly Oversized Tshirt',
      productSubtitle: 'Butterfly Oversized Tshirt // Trust Network',
      price: 'MRP : ₹2,300.00',
      edition: '02/05',
      graphicType: 'butterfly' as const,
      accentColor: '#38bdf8',
      telemetry: 'Milestone Escrow • Video KYC',
    },
    {
      id: '03',
      project: projects[2],
      productName: 'Cyber Matrix Security Tee',
      productSubtitle: 'Cyber Matrix Binary Decompile Tee',
      price: 'MRP : ₹2,199.00',
      edition: '03/05',
      graphicType: 'cyber' as const,
      accentColor: '#22c55e',
      telemetry: 'Flutter UI • AXML Engine',
    },
    {
      id: '04',
      project: projects[3],
      productName: 'Collage Studio Graphic Tee',
      productSubtitle: 'Collage Studio Canvas WASM Heavyweight',
      price: 'MRP : ₹2,250.00',
      edition: '04/05',
      graphicType: 'collage' as const,
      accentColor: '#c084fc',
      telemetry: '60 FPS Canvas • Zero-Latency',
    },
    {
      id: '05',
      project: projects[4],
      productName: 'AeroCAD Supersonic Tee',
      productSubtitle: 'AeroCAD NACA Profile Engineering Tee',
      price: 'MRP : ₹2,600.00',
      edition: '05/05',
      graphicType: 'aero' as const,
      accentColor: '#06b6d4',
      telemetry: 'Onshape API • Vector Calculus',
    },
  ];

  const displayedProducts = productList.filter((item) => {
    if (activeFilter === 'engineering') return item.id === '01' || item.id === '02';
    if (activeFilter === 'mobile_cad') return item.id === '03' || item.id === '04' || item.id === '05';
    if (activeCategory === 'web') return item.project?.category === 'Full-Stack';
    if (activeCategory === 'mobile') return item.project?.category === 'Mobile';
    if (activeCategory === 'cad') return item.project?.category === 'CAD / Hardware' || item.project?.category === 'Systems & AI';
    return true;
  });

  return (
    <section id="featured-section" className="relative w-full py-20 px-4 sm:px-6 lg:px-12 bg-[#030712] max-w-7xl mx-auto">
      {/* SECTION HEADER (Exact from video 00:10) */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-xs font-mono tracking-widest text-cyan-400 uppercase">
              CATALOG & CODE ARCHIVE
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white uppercase">
            Featured
          </h2>
        </div>

        {/* Sub-category Filter Tabs */}
        <div className="flex items-center gap-2 flex-wrap">
          {[
            { id: 'all', label: 'All Pieces' },
            { id: 'web', label: 'Full-Stack Web' },
            { id: 'mobile', label: 'Mobile & APK' },
            { id: 'cad', label: 'CAD & Systems' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider transition-all duration-300 ${
                activeCategory === cat.id
                  ? 'bg-white text-black shadow-lg'
                  : 'bg-white/5 text-neutral-400 hover:text-white hover:bg-white/10 border border-white/5'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* PRODUCT GRID (Exact matching cards from video 00:10 - 00:12) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {displayedProducts.map((item, idx) => {
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              onClick={() => onSelectProject(item.id)}
              className="group cursor-pointer bg-[#08090d] border border-white/10 hover:border-white/25 rounded-2xl p-5 flex flex-col justify-between transition-all duration-500 hover:shadow-[0_20px_40px_rgba(0,0,0,0.8)] relative overflow-hidden"
            >
              {/* Top ambient hover glow */}
              <div
                className="absolute -top-24 -right-24 w-48 h-48 rounded-full opacity-0 group-hover:opacity-30 blur-3xl transition-opacity duration-500 pointer-events-none"
                style={{ background: item.accentColor }}
              />

              {/* Garment / Graphic Preview Container */}
              <div className="relative mb-5 overflow-hidden rounded-xl bg-black/50 p-2">
                <TShirtMockup
                  graphicType={item.graphicType}
                  accentColor={item.accentColor}
                  number={item.edition}
                  className="w-full transition-transform duration-700 group-hover:scale-105"
                />

                {/* Inspect Overlay Trigger on Hover */}
                <div className="absolute inset-0 bg-black/60 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                  <span className="px-4 py-2 rounded-full bg-white text-black font-bold text-xs tracking-wider uppercase flex items-center gap-1.5 shadow-xl">
                    Inspect Architecture <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>

              {/* Card Meta Content (Exact matching video layout) */}
              <div className="flex flex-col gap-1.5">
                {/* Title */}
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-base sm:text-lg font-bold text-white tracking-tight group-hover:text-cyan-400 transition-colors">
                    {item.productName}
                  </h3>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-neutral-400 border border-white/5 flex-shrink-0">
                    {item.project.category}
                  </span>
                </div>

                {/* Subtitle / Description */}
                <p className="text-xs text-neutral-400 line-clamp-1">
                  {item.productSubtitle}
                </p>

                {/* Software / Project Connection */}
                <div className="mt-2 pt-3 border-t border-white/5 flex items-center justify-between">
                  {/* Price Tag (From Video: MRP : ₹2300.00) */}
                  <span className="text-sm font-black text-white font-mono tracking-wide">
                    {item.price}
                  </span>

                  <span className="text-[11px] font-mono text-neutral-400 flex items-center gap-1">
                    <Zap className="w-3 h-3 text-cyan-400" />
                    {item.telemetry}
                  </span>
                </div>

                {/* Tags */}
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {item.project.tags.slice(0, 3).map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="text-[9px] font-mono px-2 py-0.5 rounded bg-white/5 text-neutral-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
