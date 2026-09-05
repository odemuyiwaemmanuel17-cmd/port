'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
    ArrowRight,
    FileText,
    Github,
    Linkedin,
    Twitter,
    Mail,
    Sparkles,
    Layers,
    Smartphone,
    Cpu,
    CheckCircle2
} from 'lucide-react';
import { personalInfo } from '../data/portfolio-data';

export default function Hero() {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.15,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 18 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
        },
    };

    return (
        <section id="hero" className="relative min-h-[92vh] flex items-center pt-28 pb-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto w-full">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

                    {/* Left Column - Main Copy & CTAs */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="lg:col-span-7 flex flex-col items-start"
                    >
                        {/* Status Pill */}
                        <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-acid/10 border border-acid/30 text-acid text-xs font-mono font-medium mb-6">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-acid opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-acid"></span>
                            </span>
                            <span>{personalInfo.status}</span>
                        </motion.div>

                        {/* Main Headline */}
                        <motion.h1
                            variants={itemVariants}
                            className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-paper leading-[1.08] mb-6"
                        >
                            Hi, I&apos;m <span className="text-paper">{personalInfo.name}</span>. <br />
                            <span className="text-acid">
                                {personalInfo.role}
                            </span>
                        </motion.h1>

                        {/* Bio / Mission Statement */}
                        <motion.p
                            variants={itemVariants}
                            className="text-base sm:text-lg text-white/75 max-w-2xl leading-relaxed mb-8"
                        >
                            {personalInfo.bioHeadline}{' '}
                            <span className="text-white/50 font-normal block mt-2 text-sm sm:text-base">
                                {personalInfo.bioSub}
                            </span>
                        </motion.p>

                        {/* CTAs */}
                        <motion.div
                            variants={itemVariants}
                            className="flex flex-wrap items-center gap-3.5 w-full sm:w-auto mb-10"
                        >
                            <a
                                href="#projects"
                                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-acid text-ink font-mono text-xs font-bold uppercase tracking-wider shadow-lg shadow-acid/15 hover:bg-acid-hover hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
                            >
                                Explore Selected Work
                                <ArrowRight className="w-4 h-4 text-ink" />
                            </a>

                            <a
                                href="#contact"
                                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl glass-panel text-paper hover:text-acid font-mono text-xs font-medium uppercase tracking-wider hover:border-acid/40 hover:bg-white/5 transition-all duration-200"
                            >
                                <FileText className="w-3.5 h-3.5 text-acid" />
                                Contact &amp; Resume
                            </a>
                        </motion.div>

                        {/* Social Icons Strip */}
                        <motion.div
                            variants={itemVariants}
                            className="flex items-center gap-4 pt-6 border-t border-white/10 w-full"
                        >
                            <span className="text-[11px] uppercase tracking-widest font-mono text-white/40 font-medium">
                                Direct links:
                            </span>
                            <div className="flex items-center gap-2.5">
                                <a
                                    href={personalInfo.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="GitHub Profile"
                                    className="p-2.5 rounded-xl bg-surface-solid border border-white/10 text-white/60 hover:text-acid hover:border-acid/40 hover:bg-acid/5 transition-all duration-200"
                                >
                                    <Github className="w-4 h-4" />
                                </a>
                                <a
                                    href={personalInfo.linkedin}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="LinkedIn Profile"
                                    className="p-2.5 rounded-xl bg-surface-solid border border-white/10 text-white/60 hover:text-acid hover:border-acid/40 hover:bg-acid/5 transition-all duration-200"
                                >
                                    <Linkedin className="w-4 h-4" />
                                </a>
                                <a
                                    href={personalInfo.twitter}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="Twitter / X Profile"
                                    className="p-2.5 rounded-xl bg-surface-solid border border-white/10 text-white/60 hover:text-acid hover:border-acid/40 hover:bg-acid/5 transition-all duration-200"
                                >
                                    <Twitter className="w-4 h-4" />
                                </a>
                                <a
                                    href={`mailto:${personalInfo.email}`}
                                    aria-label="Direct Email"
                                    className="p-2.5 rounded-xl bg-surface-solid border border-white/10 text-white/60 hover:text-acid hover:border-acid/40 hover:bg-acid/5 transition-all duration-200"
                                >
                                    <Mail className="w-4 h-4" />
                                </a>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Right Column - Architecture Terminal Visual */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        className="lg:col-span-5 relative"
                    >
                        {/* Subtle Ambient Radial Backlight */}
                        <div className="absolute -inset-2 bg-gradient-to-br from-acid/15 via-emerald-500/10 to-transparent rounded-3xl blur-2xl opacity-60 pointer-events-none" />

                        <div className="relative glass-panel rounded-2xl p-5 sm:p-7 border border-white/10 shadow-2xl">
                            {/* Window Header */}
                            <div className="flex items-center justify-between pb-4 border-b border-white/10">
                                <div className="flex items-center gap-2">
                                    <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                                    <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                                </div>
                                <div className="text-[11px] font-mono text-white/50 flex items-center gap-1.5">
                                    <Sparkles className="w-3 h-3 text-acid" />
                                    <span>engineer.stack.ts</span>
                                </div>
                            </div>

                            {/* Code Snippet Visual */}
                            <div className="mt-4 font-mono text-xs text-white/80 space-y-2 leading-relaxed">
                                <div className="text-white/40">{`// Engineering Profile & Core Systems`}</div>
                                <p>
                                    <span className="text-acid/90">const</span>{' '}
                                    <span className="text-paper font-semibold">developer</span> = &#123;
                                </p>
                                <p className="pl-4">
                                    <span className="text-white/50">name:</span>{' '}
                                    <span className="text-acid">&apos;Odemuyiwa Emmanuel&apos;</span>,
                                </p>
                                <p className="pl-4">
                                    <span className="text-white/50">frontend:</span>{' '}
                                    <span className="text-white/90">[&apos;Next.js 14&apos;, &apos;React&apos;, &apos;TypeScript&apos;]</span>,
                                </p>
                                <p className="pl-4">
                                    <span className="text-white/50">mobile:</span>{' '}
                                    <span className="text-white/90">[&apos;Flutter&apos;, &apos;Dart&apos;, &apos;Offline-First&apos;]</span>,
                                </p>
                                <p className="pl-4">
                                    <span className="text-white/50">backend:</span>{' '}
                                    <span className="text-white/90">[&apos;Node.js&apos;, &apos;PostgreSQL&apos;, &apos;Supabase&apos;]</span>,
                                </p>
                                <p className="pl-4">
                                    <span className="text-white/50">philosophy:</span>{' '}
                                    <span className="text-emerald-300">&apos;Pixel-Precision &amp; High Reliability&apos;</span>,
                                </p>
                                <p>&#125;;</p>
                            </div>

                            {/* Live Execution Metric */}
                            <div className="mt-5 p-3 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-between text-[11px] font-mono">
                                <div className="flex items-center gap-2 text-white/60">
                                    <CheckCircle2 className="w-3.5 h-3.5 text-acid" />
                                    <span>Production Readiness</span>
                                </div>
                                <span className="text-acid font-bold">100% Vetted</span>
                            </div>

                            {/* Floating Mini Feature Badges */}
                            <div className="mt-5 grid grid-cols-3 gap-2.5 pt-5 border-t border-white/10">
                                <div className="flex flex-col items-center justify-center p-3 rounded-xl bg-white/[0.02] border border-white/5">
                                    <Layers className="w-4 h-4 text-acid mb-1" />
                                    <span className="text-[11px] font-mono text-white/80">Full-Stack</span>
                                </div>
                                <div className="flex flex-col items-center justify-center p-3 rounded-xl bg-white/[0.02] border border-white/5">
                                    <Smartphone className="w-4 h-4 text-emerald-400 mb-1" />
                                    <span className="text-[11px] font-mono text-white/80">Flutter</span>
                                </div>
                                <div className="flex flex-col items-center justify-center p-3 rounded-xl bg-white/[0.02] border border-white/5">
                                    <Cpu className="w-4 h-4 text-paper mb-1" />
                                    <span className="text-[11px] font-mono text-white/80">Systems</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}