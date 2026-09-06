'use client';

import React, { useState, useEffect } from 'react';
import { ArrowUp, Github, Linkedin, Twitter, Mail, Compass, Radio } from 'lucide-react';
import { personalInfo, socialLinks } from '../data/portfolio-data';

export default function Footer() {
  const [time, setTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const d = new Date();
      setTime(d.toTimeString().split(' ')[0] + ' UTC+1');
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-indigo-500/15 bg-slate-950/80 backdrop-blur-md px-4 sm:px-6 lg:px-8 py-10 text-xs font-mono text-slate-400">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left: Brand Identity & Telemetry */}
        <div className="flex flex-col items-center md:items-start gap-1 text-center md:text-left">
          <div className="flex items-center gap-2 text-white font-bold text-sm">
            <Compass className="w-4 h-4 text-cyan-400 animate-spin-slow" />
            <span>Emmanuel Odemuyiwa</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-500/30">
              AERO // SWE
            </span>
          </div>
          <p className="text-[11px] text-slate-500 font-sans">
            Aerospace Engineering &bull; Obafemi Awolowo University (OAU) &bull; Full-Stack &amp; Mobile
          </p>
          <p className="text-[10px] text-slate-600">
            &copy; {new Date().getFullYear()} Emmanuel Odemuyiwa. Built with Next.js, TypeScript, Tailwind CSS &amp; Framer Motion.
          </p>
        </div>

        {/* Center: Live Telemetry Timestamp */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/80 border border-slate-800 text-[11px] text-cyan-300 font-mono">
          <Radio className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
          <span>SYS_TIME: {time || '00:00:00 UTC+1'}</span>
        </div>

        {/* Right: Social Channels & Back to Top */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            {socialLinks.map((s) => (
              <a
                key={s.name}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.name}
                className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-cyan-400 hover:border-cyan-500/30 transition-colors"
              >
                {s.icon === 'github' && <Github className="w-4 h-4" />}
                {s.icon === 'linkedin' && <Linkedin className="w-4 h-4" />}
                {s.icon === 'twitter' && <Twitter className="w-4 h-4" />}
                {s.icon === 'mail' && <Mail className="w-4 h-4" />}
              </a>
            ))}
          </div>

          <button
            onClick={scrollToTop}
            aria-label="Back to top"
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900 border border-cyan-500/30 text-cyan-300 hover:bg-cyan-500/20 hover:text-white transition-all shadow-sm"
          >
            <span>Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}

