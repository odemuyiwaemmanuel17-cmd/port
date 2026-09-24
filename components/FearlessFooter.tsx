'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter, Mail, Send, CheckCircle2, MessageSquare } from 'lucide-react';
import { personalInfo, guestbookEntries } from '../data/portfolio-data';

interface FearlessFooterProps {
  onOpenContact: () => void;
}

export default function FearlessFooter({ onOpenContact }: FearlessFooterProps) {
  const [entries, setEntries] = useState(guestbookEntries);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSignGuestbook = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    const newEntry = {
      id: `local-${Date.now()}`,
      name: name.trim(),
      role: 'Engineer / Visitor',
      company: 'Remote Telemetry',
      message: message.trim(),
      timestamp: 'Just now',
      avatarInitials: name.slice(0, 2).toUpperCase(),
    };

    setEntries([newEntry, ...entries]);
    setName('');
    setMessage('');
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <footer className="relative w-full bg-[#020307] border-t border-white/10 pt-20 pb-12 px-4 sm:px-8 lg:px-16 text-neutral-400">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
        {/* LEFT COLUMN: Personal Info & Status */}
        <div className="lg:col-span-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-red-600 via-white to-cyan-400 flex items-center justify-center text-black font-black text-xs shadow-lg">
                EO
              </div>
              <h3 className="text-xl font-black tracking-wider text-white uppercase">
                EMMANUEL ODEMUYIWA
              </h3>
            </div>

            <p className="text-sm text-neutral-300 mb-6 leading-relaxed">
              Aerospace Engineering undergraduate at Obafemi Awolowo University combining parametric 3D CAD modeling with production-grade full-stack & mobile software architectures.
            </p>

            <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono mb-8">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              {personalInfo.statusIndicator}
            </div>
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-3">
            {[
              { icon: Github, url: personalInfo.github, label: 'GitHub' },
              { icon: Linkedin, url: personalInfo.linkedin, label: 'LinkedIn' },
              { icon: Twitter, url: personalInfo.twitter, label: 'Twitter / X' },
              { icon: Mail, url: `mailto:${personalInfo.email}`, label: 'Email' },
            ].map((soc) => (
              <a
                key={soc.label}
                href={soc.url}
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 hover:border-white/30 flex items-center justify-center text-white transition-all shadow-md hover:scale-110"
                title={soc.label}
              >
                <soc.icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>

        {/* RIGHT COLUMN: Guestbook & Direct Message */}
        <div className="lg:col-span-7 bg-[#08090f] border border-white/10 rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-2xl">
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-cyan-400" />
                <h4 className="text-sm font-bold text-white uppercase tracking-wider">
                  Guestbook Telemetry
                </h4>
              </div>
              <span className="text-[10px] font-mono text-neutral-500">
                {entries.length} LOGGED SIGNATURES
              </span>
            </div>

            {/* Scrollable Guestbook Entries */}
            <div className="max-h-48 overflow-y-auto space-y-3 pr-2 mb-6">
              {entries.slice(0, 3).map((entry) => (
                <div
                  key={entry.id}
                  className="p-3 rounded-xl bg-white/[0.03] border border-white/5 text-xs flex flex-col gap-1"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-neutral-200">
                      {entry.name}{' '}
                      <span className="text-[10px] font-normal text-neutral-500">
                        • {entry.company}
                      </span>
                    </span>
                    <span className="text-[9px] font-mono text-neutral-500">
                      {entry.timestamp}
                    </span>
                  </div>
                  <p className="text-neutral-400 italic">
                    &quot;{entry.message}&quot;
                  </p>
                </div>
              ))}
            </div>

            {/* Quick Sign Form */}
            <form onSubmit={handleSignGuestbook} className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Your Name / Handle"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="px-3.5 py-2 rounded-xl bg-black/50 border border-white/10 text-white text-xs outline-none focus:border-cyan-400 font-mono"
                />
                <input
                  type="text"
                  placeholder="Leave a short note or feedback"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="px-3.5 py-2 rounded-xl bg-black/50 border border-white/10 text-white text-xs outline-none focus:border-cyan-400 font-mono"
                />
              </div>
              <div className="flex items-center justify-between pt-1">
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs tracking-wider uppercase flex items-center gap-1.5 transition-all shadow-lg"
                >
                  <Send className="w-3 h-3" /> Sign Log
                </button>
                {submitted && (
                  <span className="text-xs text-emerald-400 flex items-center gap-1 font-mono">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Entry logged!
                  </span>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* BOTTOM COPYRIGHT */}
      <div className="max-w-7xl mx-auto pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-neutral-500">
        <p>© 2026 EMMANUEL ODEMUYIWA. ALL RIGHTS RESERVED.</p>
        <p>FEARLESS SOUL STREETWEAR & ENGINEERING ARCHIVE</p>
      </div>
    </footer>
  );
}
