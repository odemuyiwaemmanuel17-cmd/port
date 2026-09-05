'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Terminal, ArrowUpRight } from 'lucide-react';
import { personalInfo } from '../data/portfolio-data';

const navItems = [
    { name: 'Work', href: '#projects' },
    { name: 'Toolkit', href: '#skills' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' },
];

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('hero');

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);

            const sections = ['hero', 'projects', 'skills', 'about', 'contact'];
            const scrollPosition = window.scrollY + 200;

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

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setMobileMenuOpen(false);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    return (
        <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 sm:px-6 lg:px-8 pt-4">
            <div
                className={`max-w-6xl mx-auto rounded-2xl transition-all duration-300 ${
                    isScrolled
                        ? 'glass-panel shadow-2xl shadow-black/40 py-3 px-5 sm:px-6'
                        : 'bg-transparent py-4 px-3 sm:px-4'
                }`}
            >
                <div className="flex items-center justify-between">
                    {/* Logo / Brand */}
                    <a
                        href="#hero"
                        className="flex items-center gap-2.5 group focus:outline-none focus-visible:ring-2 focus-visible:ring-acid rounded-lg"
                    >
                        <div className="w-9 h-9 rounded-xl border border-acid/30 bg-acid/10 p-[1px] flex items-center justify-center transition-all duration-200 group-hover:border-acid/60 group-hover:bg-acid/20">
                            <Terminal className="w-4 h-4 text-acid transition-transform group-hover:scale-110" />
                        </div>
                        <div className="flex flex-col">
                            <span className="font-display font-bold text-sm tracking-tight text-paper group-hover:text-acid transition-colors">
                                emmanuel<span className="text-acid">.dev</span>
                            </span>
                            <span className="text-[10px] tracking-wider uppercase text-white/40 font-mono">
                                Full-Stack &amp; Mobile
                            </span>
                        </div>
                    </a>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-1 bg-surface-solid/80 p-1.5 rounded-full border border-white/10 backdrop-blur-md">
                        {navItems.map((item) => {
                            const sectionId = item.href.substring(1);
                            const isActive = activeSection === sectionId;
                            return (
                                <a
                                    key={item.name}
                                    href={item.href}
                                    className={`relative px-4 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider transition-all duration-200 ${
                                        isActive
                                            ? 'text-paper font-semibold'
                                            : 'text-white/50 hover:text-paper hover:bg-white/5'
                                    }`}
                                >
                                    {isActive && (
                                        <motion.div
                                            layoutId="activeNavIndicator"
                                            className="absolute inset-0 bg-white/10 border border-acid/40 rounded-full"
                                            transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                                        />
                                    )}
                                    <span className="relative z-10">{item.name}</span>
                                </a>
                            );
                        })}
                    </nav>

                    {/* CTA & Mobile Toggle */}
                    <div className="flex items-center gap-3">
                        <a
                            href="#contact"
                            className="hidden sm:inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider px-4 py-2 rounded-xl bg-acid text-ink hover:bg-acid-hover shadow-lg shadow-acid/10 hover:shadow-acid/20 transition-all duration-200 active:scale-95"
                        >
                            Get in Touch
                            <ArrowUpRight className="w-3.5 h-3.5" />
                        </a>

                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="md:hidden p-2 rounded-xl bg-surface-solid border border-white/10 text-white/70 hover:text-paper focus:outline-none focus-visible:ring-2 focus-visible:ring-acid"
                            aria-label="Toggle navigation menu"
                            aria-expanded={mobileMenuOpen}
                        >
                            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Dropdown */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.18, ease: 'easeOut' }}
                        className="md:hidden mt-2 max-w-6xl mx-auto glass-panel rounded-2xl p-4 shadow-2xl border border-white/15"
                    >
                        <div className="flex flex-col gap-1.5">
                            {navItems.map((item) => (
                                <a
                                    key={item.name}
                                    href={item.href}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="px-4 py-2.5 rounded-xl text-sm font-mono text-white/70 hover:text-paper hover:bg-white/5 transition-colors"
                                >
                                    {item.name}
                                </a>
                            ))}
                            <a
                                href="#contact"
                                onClick={() => setMobileMenuOpen(false)}
                                className="mt-2 flex items-center justify-center gap-2 text-xs font-mono font-bold uppercase tracking-wider px-4 py-3 rounded-xl bg-acid text-ink"
                            >
                                Get In Touch
                                <ArrowUpRight className="w-4 h-4" />
                            </a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}