'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Projects from '../components/Projects';
import Skills from '../components/Skills';
import Guestbook from '../components/Guestbook';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import CommandPalette from '../components/CommandPalette';

export default function Home() {
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);

  // Global keyboard listener for Ctrl+K / Cmd+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setCommandPaletteOpen((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <main className="relative min-h-screen selection:bg-cyan-500/30 selection:text-white">
      {/* Global Command Palette */}
      <CommandPalette
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
      />

      {/* Navigation Bar */}
      <Navbar onOpenCommandPalette={() => setCommandPaletteOpen(true)} />

      {/* Hero & Interactive Terminal Section */}
      <Hero />

      {/* Projects Showcase & Architecture Drawer */}
      <Projects />

      {/* Technical Stack & CAD Sciences Matrix */}
      <Skills />

      {/* Live Guestbook & Micro-Interactions */}
      <Guestbook />

      {/* Contact & Direct Dispatch */}
      <Contact />

      {/* Telemetry Footer */}
      <Footer />
    </main>
  );
}

