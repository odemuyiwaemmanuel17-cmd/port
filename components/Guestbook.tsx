'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageSquare, 
  Send, 
  Star, 
  Sparkles, 
  Pin, 
  CheckCircle2, 
  Heart,
  Radio,
  UserCheck
} from 'lucide-react';
import { guestbookEntries as initialEntries } from '../data/portfolio-data';
import type { GuestbookEntry } from '../types/portfolio';

interface Particle {
  id: number;
  x: number;
  y: number;
  scale: number;
  color: string;
}

export default function Guestbook() {
  const [entries, setEntries] = useState<GuestbookEntry[]>(initialEntries);
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [starCount, setStarCount] = useState(148);
  const [hasStarred, setHasStarred] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);

  // Load local storage entries & star count
  useEffect(() => {
    try {
      const savedEntries = localStorage.getItem('eo_guestbook_entries');
      if (savedEntries) {
        const parsed = JSON.parse(savedEntries);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setEntries(parsed);
        }
      }

      const savedStars = localStorage.getItem('eo_portfolio_stars');
      if (savedStars) {
        setStarCount(parseInt(savedStars, 10));
      }

      const userStarred = localStorage.getItem('eo_user_has_starred');
      if (userStarred === 'true') {
        setHasStarred(true);
      }
    } catch (e) {
      console.error('LocalStorage error', e);
    }
  }, []);

  const handleStar = (e: React.MouseEvent<HTMLButtonElement>) => {
    const nextCount = hasStarred ? starCount : starCount + 1;
    setStarCount(nextCount);
    setHasStarred(true);

    try {
      localStorage.setItem('eo_portfolio_stars', nextCount.toString());
      localStorage.setItem('eo_user_has_starred', 'true');
    } catch (err) {}

    // Generate Burst Particles
    const rect = e.currentTarget.getBoundingClientRect();
    const newParticles: Particle[] = Array.from({ length: 12 }).map((_, i) => ({
      id: Date.now() + i,
      x: (Math.random() - 0.5) * 160,
      y: (Math.random() - 0.5) * 160,
      scale: Math.random() * 0.8 + 0.6,
      color: ['#06b6d4', '#6366f1', '#8b5cf6', '#10b981', '#fbbf24'][Math.floor(Math.random() * 5)],
    }));

    setParticles(newParticles);
    setTimeout(() => setParticles([]), 900);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      const initials = name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2) || 'EO';

      const newEntry: GuestbookEntry = {
        id: `g-${Date.now()}`,
        name: name.trim(),
        role: role.trim() || 'Visitor / Engineer',
        message: message.trim(),
        timestamp: 'Just now',
        avatarInitials: initials,
      };

      const updated = [newEntry, ...entries];
      setEntries(updated);

      try {
        localStorage.setItem('eo_guestbook_entries', JSON.stringify(updated));
      } catch (err) {}

      setName('');
      setRole('');
      setMessage('');
      setIsSubmitting(false);
      setIsSubmitted(true);
      setTimeout(() => setIsSubmitted(false), 3000);
    }, 600);
  };

  return (
    <section id="guestbook" className="section-shell border-t border-indigo-500/15 relative">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <div className="telemetry-eyebrow">
            03 // LIVE COMMUNITY &amp; ENDORSEMENTS
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            Telemetry Guestbook.<br />
            <span className="text-gradient-telemetry">
              Leave a Signal on the Mesh.
            </span>
          </h2>
        </div>

        {/* Micro-Interaction: Star This Portfolio */}
        <div className="relative">
          <motion.button
            onClick={handleStar}
            whileTap={{ scale: 0.94 }}
            className={`relative flex items-center gap-2.5 px-5 py-3 rounded-2xl border font-mono text-xs font-bold transition-all shadow-lg ${
              hasStarred
                ? 'bg-gradient-to-r from-amber-500/20 via-cyan-500/20 to-purple-500/20 border-amber-400/50 text-amber-300 shadow-amber-950/40'
                : 'bg-slate-900/90 border-cyan-500/30 hover:border-cyan-400 text-slate-200 hover:text-white shadow-cyan-950/50'
            }`}
          >
            <Star className={`w-4 h-4 ${hasStarred ? 'fill-amber-400 text-amber-400' : 'text-cyan-400'}`} />
            <span>Star this Portfolio</span>
            <span className="px-2 py-0.5 rounded-lg bg-slate-950 text-cyan-300 border border-cyan-500/30">
              {starCount}
            </span>
          </motion.button>

          {/* Particle Explosion */}
          <div className="absolute top-1/2 left-1/2 pointer-events-none -translate-x-1/2 -translate-y-1/2">
            {particles.map((p) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 1, scale: p.scale, x: 0, y: 0 }}
                animate={{ opacity: 0, scale: 0.1, x: p.x, y: p.y }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                style={{ backgroundColor: p.color }}
                className="absolute w-2.5 h-2.5 rounded-full shadow-sm"
              />
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Comment Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-5 cyber-panel border-cyan-500/30 rounded-2xl p-6 sm:p-7 relative overflow-hidden"
        >
          <div className="flex items-center gap-2 mb-2">
            <Radio className="w-4 h-4 text-cyan-400 animate-pulse" />
            <h3 className="font-display font-bold text-lg text-white">
              Broadcast a Message
            </h3>
          </div>
          <p className="text-xs text-slate-400 font-sans mb-6">
            Leave feedback, say hello, or transmit an endorsement. Your note appears live on this portfolio.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-1.5 font-semibold">
                Your Name *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Sarah Connor / Lead Engineer"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/80 border border-slate-800 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 text-slate-100 placeholder-slate-600 text-xs sm:text-sm outline-none font-sans"
              />
            </div>

            <div>
              <label className="block text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-1.5 font-semibold">
                Role / Company (Optional)
              </label>
              <input
                type="text"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="e.g. Founder at TechVentures / OAU Peer"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/80 border border-slate-800 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 text-slate-100 placeholder-slate-600 text-xs sm:text-sm outline-none font-sans"
              />
            </div>

            <div>
              <label className="block text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-1.5 font-semibold">
                Telemetry Message *
              </label>
              <textarea
                required
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Share your thoughts on the aerospace & full-stack work..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/80 border border-slate-800 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 text-slate-100 placeholder-slate-600 text-xs sm:text-sm outline-none font-sans resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full telemetry-btn-primary !py-2.5 !text-xs !rounded-xl"
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <span className="w-3 h-3 border-2 border-slate-900 border-t-transparent rounded-full animate-spin" />
                  Transmitting Signal...
                </span>
              ) : isSubmitted ? (
                <span className="flex items-center gap-2 text-emerald-950 font-bold">
                  <CheckCircle2 className="w-4 h-4" /> Message Broadcasted!
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Send className="w-3.5 h-3.5" /> Transmit to Guestbook
                </span>
              )}
            </button>
          </form>
        </motion.div>

        {/* Right Column: Live Message Feed */}
        <div className="lg:col-span-7 space-y-3.5 max-h-[520px] overflow-y-auto pr-1 terminal-scrollbar">
          <AnimatePresence initial={false}>
            {entries.map((entry) => (
              <motion.div
                key={entry.id}
                initial={{ opacity: 0, y: -15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className={`p-5 rounded-2xl cyber-panel border-indigo-500/20 relative ${
                  entry.isPinned ? 'border-cyan-500/40 bg-slate-900/80' : ''
                }`}
              >
                <div className="flex items-start justify-between gap-3 mb-2.5">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500/20 to-indigo-500/20 border border-cyan-500/30 flex items-center justify-center font-mono font-bold text-cyan-300 text-xs flex-shrink-0">
                      {entry.avatarInitials}
                    </div>
                    <div>
                      <div className="font-display font-bold text-sm text-white flex items-center gap-1.5">
                        {entry.name}
                        {entry.isPinned && (
                          <span className="px-1.5 py-0.2 rounded bg-cyan-950 border border-cyan-500/40 text-cyan-400 text-[9px] font-mono flex items-center gap-0.5">
                            <Pin className="w-2.5 h-2.5" /> PINNED
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] font-mono text-slate-400">
                        {entry.role} {entry.company && `&bull; ${entry.company}`}
                      </div>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-slate-500 flex-shrink-0">
                    {entry.timestamp}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pl-12 font-sans">
                  &ldquo;{entry.message}&rdquo;
                </p>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
