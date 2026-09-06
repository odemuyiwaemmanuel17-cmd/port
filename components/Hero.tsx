'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Mail,
  Sparkles,
  Layers,
  Smartphone,
  Cpu,
  Compass,
  Radio,
  ExternalLink,
  FileCode,
  CheckCircle2,
  Terminal as TerminalIcon
} from 'lucide-react';
import { personalInfo, stats, socialLinks } from '../data/portfolio-data';
import Terminal from './Terminal';

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
    },
  };

  return (
    <section id="hero" className="relative min-h-screen flex flex-col justify-center pt-28 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto w-full">
        {/* Aerospace Telemetry Top Ribbon */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-8 pb-3 border-b border-indigo-500/15 text-[11px] font-mono text-slate-400">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-cyan-400 font-semibold">
              <Radio className="w-3.5 h-3.5 animate-pulse text-cyan-400" />
              TELEMETRY HUD // NODE-01
            </span>
            <span className="hidden sm:inline-block text-slate-600">|</span>
            <span className="hidden sm:inline-block">INSTITUTION: OBAFEMI AWOLOWO UNIVERSITY</span>
          </div>
          <div className="flex items-center gap-2 text-[10px] text-cyan-300">
            <span className="px-2 py-0.5 rounded bg-cyan-950/60 border border-cyan-500/30">
              SYS_OK // LATENCY &lt; 20ms
            </span>
            <span className="hidden md:inline-block px-2 py-0.5 rounded bg-indigo-950/60 border border-indigo-500/30 text-indigo-300">
              CAD &amp; SWE TELEMETRY
            </span>
          </div>
        </div>

        {/* Hero Grid: Left Copy & Right Interactive Terminal */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Column - Core Pitch & CTAs */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-6 xl:col-span-7 flex flex-col items-start"
          >
            {/* Live Status Pill */}
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-5 shadow-cyan-glow">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
              </span>
              <span className="font-semibold text-white">Emmanuel Odemuyiwa</span>
              <span className="text-slate-500">&bull;</span>
              <span className="text-emerald-400">{personalInfo.status}</span>
            </motion.div>

            {/* Dynamic Headline */}
            <motion.h1
              variants={itemVariants}
              className="font-display text-4xl sm:text-5xl lg:text-5xl xl:text-6xl font-bold tracking-tight text-white leading-[1.08] mb-6"
            >
              Aerospace Engineering{' '}
              <span className="text-gradient-telemetry block">
                Meets Full-Stack &amp; Mobile Software.
              </span>
            </motion.h1>

            {/* Bio Narrative */}
            <motion.p
              variants={itemVariants}
              className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed mb-6"
            >
              An ambitious engineering student at <span className="text-cyan-400 font-semibold">Obafemi Awolowo University</span> combining classical aerospace principles, parametric 3D CAD modeling, and modern AI/web technology to build performant web platforms, cross-platform mobile apps, and intelligent developer tools.
            </motion.p>

            {/* Feature Pills */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-2 mb-8"
            >
              <div className="telemetry-badge">
                <Layers className="w-3 h-3 text-cyan-400" />
                <span>Next.js &amp; TypeScript</span>
              </div>
              <div className="telemetry-badge">
                <Smartphone className="w-3 h-3 text-indigo-400" />
                <span>Flutter &amp; Dart</span>
              </div>
              <div className="telemetry-badge">
                <Cpu className="w-3 h-3 text-purple-400" />
                <span>Onshape &amp; FreeCAD</span>
              </div>
              <div className="telemetry-badge">
                <Sparkles className="w-3 h-3 text-emerald-400" />
                <span>AI &amp; Agentic Dev</span>
              </div>
            </motion.div>

            {/* CTAs */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap items-center gap-3.5 w-full sm:w-auto mb-10"
            >
              <a
                href="#projects"
                className="w-full sm:w-auto telemetry-btn-primary group"
              >
                <span>Explore Selected Work</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href="#contact"
                className="w-full sm:w-auto telemetry-btn-secondary"
              >
                <Mail className="w-4 h-4 text-cyan-400" />
                <span>Get in Touch</span>
              </a>
            </motion.div>

            {/* Direct Social Links */}
            <motion.div
              variants={itemVariants}
              className="flex items-center gap-3 pt-6 border-t border-indigo-500/15 w-full text-xs font-mono text-slate-400"
            >
              <span className="uppercase text-[11px] tracking-wider text-slate-500">
                Direct Channels:
              </span>
              <div className="flex items-center gap-2">
                {socialLinks.map((s) => (
                  <a
                    key={s.name}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-cyan-400 hover:border-cyan-500/40 hover:bg-slate-800 transition-all"
                  >
                    {s.name}
                  </a>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column - Live Interactive Terminal Widget */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 xl:col-span-5 relative"
          >
            {/* Ambient Background Aura */}
            <div className="absolute -inset-2 bg-gradient-to-tr from-cyan-500/20 via-indigo-600/15 to-purple-600/20 rounded-3xl blur-2xl opacity-75 pointer-events-none" />
            
            {/* Terminal Card */}
            <Terminal />
          </motion.div>
        </div>

        {/* Bottom Telemetry Stats Bar Ribbon */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-4 p-5 sm:p-6 rounded-2xl cyber-panel border-cyan-500/20"
        >
          {stats.map((stat, idx) => (
            <div
              key={stat.label}
              className={`p-3 rounded-xl bg-slate-900/40 border border-slate-800/60 ${
                idx === 0 ? 'border-l-2 border-l-cyan-400' : ''
              }`}
            >
              <div className="flex items-center justify-between text-[10px] font-mono text-cyan-400 mb-1">
                <span>{stat.telemetryCode || `METRIC.0${idx + 1}`}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              </div>
              <div className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight">
                {stat.number}
              </div>
              <div className="text-xs font-semibold text-slate-200 mt-0.5">
                {stat.label}
              </div>
              <div className="text-[11px] text-slate-400 mt-0.5">
                {stat.subtext}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}