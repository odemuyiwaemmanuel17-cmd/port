'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
    ArrowRight,
    Download,
    Github,
    Linkedin,
    Twitter,
    Mail,
    Sparkles,
    Layers,
    Smartphone,
    Cpu
} from 'lucide-react';
import { personalInfo } from '../data/portfolio-data';

export default function Hero() {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.12,
                delayChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
        },
    };

    return (
        <section id="hero" className="relative min-h-screen flex items-center pt-28 pb-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto w-full">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

                    {/* Left Column - Main Copy & CTAs */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="lg:col-span-7 flex flex-col items-start"
                    >
                        {/* Status Pill */}
                        <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-medium mb-6">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                            </span>
                            <span>{personalInfo.status}</span>
                        </motion.div>

                        {/* Main Headline */}
                        <motion.h1
                            variants={itemVariants}
                            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1] mb-6"
                        >
                            Hi, I&apos;m <span className="text-white">{personalInfo.name}</span>. <br />
                            <span className="text-gradient">
                                {personalInfo.role}
                            </span>
                        </motion.h1>

                        {/* Bio / Mission Statement */}
                        <motion.p
                            variants={itemVariants}
                            className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed mb-8"
                        >
                            {personalInfo.bioHeadline}{' '}
                            <span className="text-slate-400 font-normal block mt-2">
                                {personalInfo.bioSub}
                            </span>
                        </motion.p>

                        {/* CTAs */}
                        <motion.div
                            variants={itemVariants}
                            className="flex flex-wrap items-center gap-4 w-full sm:w-auto mb-10"
                        >
                            <a
                                href="#projects"
                                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 via-cyan-400 to-blue-500 text-slate-950 font-bold text-sm tracking-wide shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
                            >
                                View Projects
                                <ArrowRight className="w-4 h-4 text-slate-950" />
                            </a>

                            <a
                                href="#contact"
                                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl glass-panel text-slate-200 hover:text-white font-medium text-sm hover:border-slate-700 hover:bg-slate-800/50 transition-all duration-200"
                            >
                                <Download className="w-4 h-4 text-cyan-400" />
                                Resume & Contact
                            </a>
                        </motion.div>

                        {/* Social Icons Strip */}
                        <motion.div
                            variants={itemVariants}
                            className="flex items-center gap-4 pt-6 border-t border-slate-800/80 w-full"
                        >
                            <span className="text-xs uppercase tracking-wider font-mono text-slate-500">
                                Connect:
                            </span>
                            <div className="flex items-center gap-3">
                                <a
                                    href={personalInfo.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="GitHub Profile"
                                    className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-cyan-400 hover:border-cyan-500/40 transition-all duration-200"
                                >
                                    <Github className="w-4 h-4" />
                                </a>
                                <a
                                    href={personalInfo.linkedin}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="LinkedIn Profile"
                                    className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-cyan-400 hover:border-cyan-500/40 transition-all duration-200"
                                >
                                    <Linkedin className="w-4 h-4" />
                                </a>
                                <a
                                    href={personalInfo.twitter}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="Twitter Profile"
                                    className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-cyan-400 hover:border-cyan-500/40 transition-all duration-200"
                                >
                                    <Twitter className="w-4 h-4" />
                                </a>
                                <a
                                    href={`mailto:${personalInfo.email}`}
                                    aria-label="Send Email"
                                    className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-cyan-400 hover:border-cyan-500/40 transition-all duration-200"
                                >
                                    <Mail className="w-4 h-4" />
                                </a>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Right Column - Interactive Floating Mockup / Tech Visual */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="lg:col-span-5 relative"
                    >
                        {/* Glowing Accent Ring */}
                        <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 via-indigo-500 to-violet-600 rounded-3xl blur-xl opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse-slow" />

                        <div className="relative glass-panel rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-2xl">
                            {/* Window Header */}
                            <div className="flex items-center justify-between pb-6 border-b border-slate-800">
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                                    <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                                    <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                                </div>
                                <div className="text-[11px] font-mono text-slate-400 flex items-center gap-1">
                                    <Sparkles className="w-3 h-3 text-cyan-400" />
                                    <span>developer.config.ts</span>
                                </div>
                            </div>

                            {/* Code Snippet Visual */}
                            <div className="mt-5 font-mono text-xs text-slate-300 space-y-2">
                                <div className="text-slate-500">// Core Stack & Specialization</div>
                                <p>
                                    <span className="text-violet-400">const</span>{' '}
                                    <span className="text-cyan-300">architect</span> = &#123;
                                </p>
                                <p className="pl-4">
                                    <span className="text-slate-400">frontend:</span>{' '}
                                    <span className="text-emerald-300">[&apos;Next.js&apos;, &apos;React&apos;, &apos;Tailwind&apos;]</span>,
                                </p>
                                <p className="pl-4">
                                    <span className="text-slate-400">backend:</span>{' '}
                                    <span className="text-emerald-300">[&apos;Node.js&apos;, &apos;PostgreSQL&apos;, &apos;Supabase&apos;]</span>,
                                </p>
                                <p className="pl-4">
                                    <span className="text-slate-400">mobile:</span>{' '}
                                    <span className="text-emerald-300">[&apos;Flutter&apos;, &apos;Cross-Platform&apos;]</span>,
                                </p>
                                <p className="pl-4">
                                    <span className="text-slate-400">mindset:</span>{' '}
                                    <span className="text-amber-300">&apos;Relentless Optimization&apos;</span>,
                                </p>
                                <p>&#125;;</p>
                            </div>

                            {/* Floating Mini Feature Badges */}
                            <div className="mt-8 grid grid-cols-3 gap-3 pt-6 border-t border-slate-800">
                                <div className="flex flex-col items-center justify-center p-3 rounded-xl bg-slate-900/90 border border-slate-800">
                                    <Layers className="w-5 h-5 text-cyan-400 mb-1" />
                                    <span className="text-[11px] font-semibold text-slate-200">Full-Stack</span>
                                </div>
                                <div className="flex flex-col items-center justify-center p-3 rounded-xl bg-slate-900/90 border border-slate-800">
                                    <Smartphone className="w-5 h-5 text-violet-400 mb-1" />
                                    <span className="text-[11px] font-semibold text-slate-200">Mobile</span>
                                </div>
                                <div className="flex flex-col items-center justify-center p-3 rounded-xl bg-slate-900/90 border border-slate-800">
                                    <Cpu className="w-5 h-5 text-indigo-400 mb-1" />
                                    <span className="text-[11px] font-semibold text-slate-200">Scalability</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}