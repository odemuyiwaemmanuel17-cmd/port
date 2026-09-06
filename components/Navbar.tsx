'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Terminal, 
  Layers, 
  Cpu, 
  MessageSquare, 
  Mail, 
  Search, 
  Menu, 
  X, 
  Sparkles,
  Compass
} from 'lucide-react';
import { personalInfo } from '../data/portfolio-data';

interface NavbarProps {
  onOpenCommandPalette: () => void;
}

const navItems = [
  { name: 'Terminal', href: '#hero', icon: Terminal },
  { name: 'Projects', href: '#projects', icon: Layers },
  { name: 'Skills & CAD', href: '#skills', icon: Cpu },
  { name: 'Guestbook', href: '#guestbook', icon: MessageSquare },
  { name: 'Contact', href: '#contact', icon: Mail },
];

export default function Navbar({ onOpenCommandPalette }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = ['hero', 'projects', 'skills', 'guestbook', 'contact'];
      const scrollPosition = window.scrollY + 250;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-40 px-3 sm:px-6 lg:px-8 pt-3 sm:pt-4 transition-all duration-300">
      <div
        className={`max-w-7xl mx-auto rounded-2xl transition-all duration-300 ${
          isScrolled
            ? 'cyber-panel border-cyan-500/30 shadow-2xl py-2.5 px-4 sm:px-6'
            : 'bg-slate-950/40 backdrop-blur-md border border-slate-800/80 py-3 px-3 sm:px-5'
        }`}
      >
        <div className="flex items-center justify-between gap-2">
          {/* Brand Logo & Telemetry Status */}
          <div className="flex items-center gap-3 sm:gap-4">
            <a
              href="#hero"
              className="flex items-center gap-2.5 group focus:outline-none rounded-xl"
            >
              <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-cyan-500/20 via-indigo-500/20 to-purple-500/20 border border-cyan-500/40 flex items-center justify-center transition-transform group-hover:scale-105 shadow-cyan-glow">
                <Compass className="w-5 h-5 text-cyan-400 animate-spin-slow group-hover:rotate-45 transition-transform duration-500" />
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-[#090d16]" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="font-display font-bold text-sm sm:text-base tracking-tight text-white group-hover:text-cyan-300 transition-colors">
                    Emmanuel Odemuyiwa
                  </span>
                  <span className="hidden xl:inline-block text-[10px] font-mono px-1.5 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                    AERO // SWE
                  </span>
                </div>
                <span className="text-[10px] sm:text-[11px] text-slate-400 font-mono tracking-wider">
                  Aerospace Eng. &amp; Full-Stack
                </span>
              </div>
            </a>

            {/* Live Status Badge (Desktop) */}
            <div className="hidden lg:flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/40 border border-emerald-500/30 text-emerald-400 text-xs font-mono">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="truncate max-w-[260px]">
                Available for engineering projects &amp; software roles
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-900/80 p-1.5 rounded-xl border border-indigo-500/20 backdrop-blur-md">
            {navItems.map((item) => {
              const sectionId = item.href.substring(1);
              const isActive = activeSection === sectionId;
              const Icon = item.icon;
              return (
                <a
                  key={item.name}
                  href={item.href}
                  className={`relative flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-mono tracking-wider transition-all duration-200 ${
                    isActive
                      ? 'text-cyan-300 font-semibold shadow-sm'
                      : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/60'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute inset-0 bg-cyan-500/15 border border-cyan-500/40 rounded-lg"
                      transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                    />
                  )}
                  <Icon className="w-3.5 h-3.5 relative z-10" />
                  <span className="relative z-10">{item.name}</span>
                </a>
              );
            })}
          </nav>

          {/* Right Controls: Command Palette Trigger & Menu */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Global Command Palette Trigger Button */}
            <button
              onClick={onOpenCommandPalette}
              aria-label="Open Command Palette"
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/90 border border-cyan-500/30 hover:border-cyan-400/60 text-slate-300 hover:text-white transition-all shadow-sm hover:shadow-cyan-glow group"
            >
              <Search className="w-3.5 h-3.5 text-cyan-400 group-hover:scale-110 transition-transform" />
              <span className="hidden sm:inline text-xs font-mono">Command</span>
              <kbd className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-cyan-300">
                ⌘K
              </kbd>
            </button>

            {/* Direct Contact Button */}
            <a
              href="#contact"
              className="hidden sm:inline-flex telemetry-btn-primary !py-1.5 !px-3.5 !text-xs !rounded-xl"
            >
              <Mail className="w-3.5 h-3.5" />
              Dispatch
            </a>

            {/* Mobile Hamburger Menu */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-cyan-400" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Status Strip */}
        <div className="lg:hidden mt-2 pt-2 border-t border-slate-800/60 flex items-center justify-between text-[10px] font-mono text-emerald-400">
          <div className="flex items-center gap-1.5">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
            </span>
            <span>Available for projects &amp; roles</span>
          </div>
          <span className="text-slate-400">UTC+1 // ACTIVE</span>
        </div>
      </div>

      {/* Mobile Drawer Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.18 }}
            className="md:hidden mt-2 max-w-7xl mx-auto cyber-panel border-cyan-500/30 rounded-2xl p-4 shadow-2xl space-y-2"
          >
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-mono text-slate-300 hover:text-cyan-300 hover:bg-slate-800/60 transition-colors"
                >
                  <Icon className="w-4 h-4 text-cyan-400" />
                  {item.name}
                </a>
              );
            })}
            <div className="pt-2 border-t border-slate-800 flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenCommandPalette();
                }}
                className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl bg-slate-900 border border-cyan-500/30 text-xs font-mono text-cyan-300"
              >
                <span className="flex items-center gap-2">
                  <Search className="w-4 h-4" /> Open Command Palette
                </span>
                <kbd className="px-1.5 py-0.5 bg-slate-800 rounded">Ctrl+K</kbd>
              </button>
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="telemetry-btn-primary w-full text-center"
              >
                Get In Touch / Dispatch
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}