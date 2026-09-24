'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Terminal, Sparkles, Send, Github, Linkedin, Twitter } from 'lucide-react';

interface FearlessNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  onOpenTerminal: () => void;
  onOpenContact: () => void;
}

export default function FearlessNav({
  activeTab,
  onTabChange,
  onOpenTerminal,
  onOpenContact,
}: FearlessNavProps) {
  const tabs = [
    { id: 'all', label: 'New & Featured' },
    { id: 'engineering', label: 'Men' },
    { id: 'mobile_cad', label: 'Women' },
  ];

  return (
    <header className="fixed top-0 inset-x-0 z-50 px-4 sm:px-8 py-4 flex items-center justify-between pointer-events-none">
      {/* LEFT: Streetwear Monogram Brand */}
      <div className="flex items-center gap-3 pointer-events-auto">
        <a
          href="#"
          className="group flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-xl border border-white/10 hover:border-white/30 transition-all shadow-lg"
        >
          <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-red-600 via-white to-cyan-400 flex items-center justify-center text-black font-black text-xs">
            EO
          </div>
          <div className="flex flex-col text-left">
            <span className="text-xs font-black tracking-widest text-white uppercase group-hover:text-cyan-400 transition-colors">
              ODEMUYIWA
            </span>
            <span className="text-[9px] font-mono text-neutral-400">
              AEROSPACE & TECH
            </span>
          </div>
        </a>
      </div>

      {/* CENTER: Floating Pill Menu (Exact visual from video) */}
      <div className="pointer-events-auto">
        <nav className="flex items-center gap-1 p-1 rounded-full bg-black/70 backdrop-blur-2xl border border-white/15 shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`relative px-4 sm:px-6 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 ${
                  isActive
                    ? 'text-white shadow-md'
                    : 'text-neutral-400 hover:text-neutral-200'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="active-pill-indicator"
                    className="absolute inset-0 rounded-full bg-white/15 border border-white/20 backdrop-blur-md"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* RIGHT: Quick Terminal & Contact Trigger */}
      <div className="flex items-center gap-2 pointer-events-auto">
        <button
          onClick={onOpenTerminal}
          className="flex items-center gap-2 px-3 py-2 rounded-full bg-black/60 backdrop-blur-xl border border-white/10 hover:border-cyan-400/50 hover:text-cyan-400 text-neutral-300 text-xs font-mono transition-all shadow-lg group"
          title="Open Telemetry Terminal"
        >
          <Terminal className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
          <span className="hidden md:inline">TERMINAL</span>
        </button>

        <button
          onClick={onOpenContact}
          className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-red-600/90 hover:bg-red-500 text-white text-xs font-bold tracking-wider uppercase transition-all shadow-[0_0_20px_rgba(239,68,68,0.4)] hover:shadow-[0_0_25px_rgba(239,68,68,0.7)]"
        >
          <Send className="w-3 h-3" />
          <span className="hidden sm:inline">CONTACT</span>
        </button>
      </div>
    </header>
  );
}
