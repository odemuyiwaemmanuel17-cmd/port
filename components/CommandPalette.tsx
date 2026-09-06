'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Terminal, 
  Layers, 
  Cpu, 
  MessageSquare, 
  Mail, 
  Github, 
  Linkedin, 
  Twitter, 
  Copy, 
  Check, 
  Star,
  ExternalLink,
  CornerDownLeft,
  X
} from 'lucide-react';
import { personalInfo } from '../data/portfolio-data';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onStar?: () => void;
  onRunTerminalCommand?: (cmd: string) => void;
}

interface CommandItem {
  id: string;
  title: string;
  description: string;
  category: 'Navigation' | 'Telemetry' | 'External' | 'Action';
  icon: React.ComponentType<{ className?: string }>;
  action: () => void;
  shortcut?: string;
}

export default function CommandPalette({ isOpen, onClose, onStar, onRunTerminalCommand }: CommandPaletteProps) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) {
          onClose();
        } else {
          // Open handled by parent or state
        }
      }
      if (e.key === 'Escape' && isOpen) {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const copyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const scrollTo = (id: string) => {
    onClose();
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const commands: CommandItem[] = [
    {
      id: 'nav-hero',
      title: 'Telemetry Terminal & Hero',
      description: 'Jump to top overview and interactive CLI',
      category: 'Navigation',
      icon: Terminal,
      action: () => scrollTo('hero'),
      shortcut: 'H',
    },
    {
      id: 'nav-projects',
      title: 'Engineering Projects',
      description: 'Explore Compbuy, HandyTrust, AppMD, Batch Image Studio',
      category: 'Navigation',
      icon: Layers,
      action: () => scrollTo('projects'),
      shortcut: 'P',
    },
    {
      id: 'nav-skills',
      title: 'Skill & CAD Matrix',
      description: 'Inspect full-stack, mobile, and aerospace CAD capabilities',
      category: 'Navigation',
      icon: Cpu,
      action: () => scrollTo('skills'),
      shortcut: 'S',
    },
    {
      id: 'nav-guestbook',
      title: 'Live Telemetry Guestbook',
      description: 'Leave a message or endorsement on the live feed',
      category: 'Navigation',
      icon: MessageSquare,
      action: () => scrollTo('guestbook'),
      shortcut: 'G',
    },
    {
      id: 'nav-contact',
      title: 'Dispatch & Contact',
      description: 'Send direct message or request engineering consultation',
      category: 'Navigation',
      icon: Mail,
      action: () => scrollTo('contact'),
      shortcut: 'C',
    },
    {
      id: 'act-copy-email',
      title: copied ? 'Email Copied to Clipboard!' : 'Copy Email Address',
      description: personalInfo.email,
      category: 'Action',
      icon: copied ? Check : Copy,
      action: copyEmail,
      shortcut: 'Ctrl+C',
    },
    {
      id: 'act-star',
      title: 'Star this Portfolio',
      description: 'Trigger particle explosion & increment telemetry star counter',
      category: 'Action',
      icon: Star,
      action: () => {
        if (onStar) onStar();
        onClose();
      },
    },
    {
      id: 'ext-github',
      title: 'GitHub Profile',
      description: 'View repositories and open-source contributions',
      category: 'External',
      icon: Github,
      action: () => {
        window.open(personalInfo.github, '_blank');
        onClose();
      },
    },
    {
      id: 'ext-linkedin',
      title: 'LinkedIn Network',
      description: 'Connect professionally on LinkedIn',
      category: 'External',
      icon: Linkedin,
      action: () => {
        window.open(personalInfo.linkedin, '_blank');
        onClose();
      },
    },
    {
      id: 'ext-twitter',
      title: 'Twitter / X',
      description: 'Follow updates on aerospace & software builds',
      category: 'External',
      icon: Twitter,
      action: () => {
        window.open(personalInfo.twitter, '_blank');
        onClose();
      },
    },
  ];

  const filteredCommands = commands.filter((cmd) => {
    const searchStr = `${cmd.title} ${cmd.description} ${cmd.category}`.toLowerCase();
    return searchStr.includes(query.toLowerCase());
  });

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % filteredCommands.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredCommands.length) % filteredCommands.length);
    } else if (e.key === 'Enter' && filteredCommands[selectedIndex]) {
      e.preventDefault();
      filteredCommands[selectedIndex].action();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 sm:px-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#060a12]/80 backdrop-blur-md"
          />

          {/* Dialog Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -15 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-2xl bg-[#0d1322]/95 border border-cyan-500/30 rounded-2xl shadow-2xl shadow-cyan-950/60 overflow-hidden z-10 backdrop-blur-xl"
            onKeyDown={handleKeyDown}
          >
            {/* Header / Search Input */}
            <div className="relative flex items-center border-b border-indigo-500/20 px-4 py-3.5 bg-slate-900/60">
              <Search className="w-5 h-5 text-cyan-400 mr-3 flex-shrink-0" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Type a command, section, or keyword... (e.g. projects, skills, email)"
                autoFocus
                className="w-full bg-transparent text-slate-100 placeholder-slate-400 text-sm sm:text-base outline-none font-sans"
              />
              <button
                onClick={onClose}
                className="p-1 rounded-md text-slate-400 hover:text-slate-200 hover:bg-slate-800/80 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Telemetry Status Bar */}
            <div className="flex items-center justify-between px-4 py-1.5 bg-slate-950/50 border-b border-indigo-500/10 text-[10px] font-mono text-slate-400">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                COMMAND_PALETTE // v2.6.0
              </span>
              <span>PRESS ESC TO CLOSE</span>
            </div>

            {/* Command List */}
            <div className="max-h-[380px] overflow-y-auto p-2 space-y-1 terminal-scrollbar">
              {filteredCommands.length === 0 ? (
                <div className="p-8 text-center text-slate-400 font-mono text-sm">
                  <Terminal className="w-8 h-8 text-slate-600 mx-auto mb-2" />
                  No matching telemetry commands found for &quot;{query}&quot;
                </div>
              ) : (
                filteredCommands.map((cmd, index) => {
                  const isSelected = index === selectedIndex;
                  const Icon = cmd.icon;
                  return (
                    <motion.button
                      key={cmd.id}
                      onClick={cmd.action}
                      onMouseEnter={() => setSelectedIndex(index)}
                      className={`w-full flex items-center justify-between p-3 rounded-xl text-left transition-all ${
                        isSelected
                          ? 'bg-gradient-to-r from-cyan-500/15 via-indigo-500/15 to-transparent border border-cyan-500/40 text-white shadow-sm'
                          : 'text-slate-300 hover:bg-slate-800/40 border border-transparent'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div
                          className={`p-2 rounded-lg ${
                            isSelected
                              ? 'bg-cyan-500/20 text-cyan-300 shadow-cyan-glow'
                              : 'bg-slate-800/60 text-slate-400'
                          }`}
                        >
                          <Icon className="w-4 h-4 flex-shrink-0" />
                        </div>
                        <div className="min-w-0">
                          <div className="text-sm font-semibold truncate flex items-center gap-2">
                            {cmd.title}
                            <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800/80 text-slate-400 font-mono">
                              {cmd.category}
                            </span>
                          </div>
                          <div className="text-xs text-slate-400 truncate mt-0.5">
                            {cmd.description}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 flex-shrink-0 ml-3">
                        {cmd.shortcut && (
                          <kbd className="px-1.5 py-0.5 text-[10px] font-mono bg-slate-800 border border-slate-700 text-slate-400 rounded">
                            {cmd.shortcut}
                          </kbd>
                        )}
                        {isSelected && (
                          <CornerDownLeft className="w-3.5 h-3.5 text-cyan-400" />
                        )}
                      </div>
                    </motion.button>
                  );
                })
              )}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between px-4 py-2 bg-slate-950/70 border-t border-indigo-500/15 text-[11px] text-slate-400 font-mono">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <kbd className="px-1 py-0.5 bg-slate-800 rounded text-slate-300">↑</kbd>
                  <kbd className="px-1 py-0.5 bg-slate-800 rounded text-slate-300">↓</kbd> Navigate
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="px-1 py-0.5 bg-slate-800 rounded text-slate-300">↵</kbd> Select
                </span>
              </div>
              <div className="text-cyan-400/90 font-medium">
                EO // AEROSPACE TELEMETRY
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
