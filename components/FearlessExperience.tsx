'use client';

import React, { useState } from 'react';
import FearlessNav from './FearlessNav';
import FearlessHero from './FearlessHero';
import FeaturedGrid from './FeaturedGrid';
import ToolsUsed from './ToolsUsed';
import FearlessTerminal from './FearlessTerminal';
import FearlessFooter from './FearlessFooter';
import FearlessProjectModal from './FearlessProjectModal';
import FearlessContactModal from './FearlessContactModal';

export default function FearlessExperience() {
  const [activeTab, setActiveTab] = useState<string>('all');
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [isTerminalOpen, setIsTerminalOpen] = useState<boolean>(false);
  const [isContactOpen, setIsContactOpen] = useState<boolean>(false);

  return (
    <main className="relative min-h-screen w-full bg-[#030712] text-white selection:bg-red-500 selection:text-white">
      {/* Top Floating Navigation */}
      <FearlessNav
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onOpenTerminal={() => setIsTerminalOpen(true)}
        onOpenContact={() => setIsContactOpen(true)}
      />

      {/* Hero Section with FEARLESS SOUL, T-Shirt Deck, Angel & Mountain ORIGINALS stage */}
      <FearlessHero
        onSelectProject={(id) => setSelectedProjectId(id)}
        activeFilter={activeTab}
      />

      {/* Featured Collection Grid (Exact from video 00:10 - 00:12) */}
      <FeaturedGrid
        onSelectProject={(id) => setSelectedProjectId(id)}
        activeFilter={activeTab}
      />

      {/* Tools I Used Section (Exact from video 00:13) */}
      <ToolsUsed />

      {/* Footer with Guestbook & Social Links */}
      <FearlessFooter onOpenContact={() => setIsContactOpen(true)} />

      {/* Project Detail Modal */}
      <FearlessProjectModal
        projectId={selectedProjectId}
        onClose={() => setSelectedProjectId(null)}
      />

      {/* Contact Modal */}
      <FearlessContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />

      {/* Interactive Telemetry Terminal HUD */}
      <FearlessTerminal
        isOpen={isTerminalOpen}
        onClose={() => setIsTerminalOpen(false)}
        onSelectProject={(id) => {
          setSelectedProjectId(id);
          setIsTerminalOpen(false);
        }}
      />
    </main>
  );
}
