'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Terminal, ArrowUpRight } from 'lucide-react';

const navItems = [
    { name: 'Projects', href: '#projects' },
    { name: 'Skills', href: '#skills' },
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

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 sm:px-6 lg:px-8 pt-4">
            <div
                className={`max-w-6xl mx-auto rounded-2xl transition-all duration-300 ${isScrolled
                        ? 'glass-panel shadow-2xl shadow-cyan-950/20 py-3 px-6'
                        : 'bg-transparent py-4 px-4'
                    }`}
            >
                <div className="flex items-center justify-between">
                    {/* Logo / Brand */}
                    <a
                        href="#hero"
                        className="flex items-center gap-2.5 group focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded-lg"
                    >
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-violet-600 p-[1px] flex items-center justify-center transition-transform group-hover:scale-105">
                            <div className="w-full h-full bg-slate-950 rounded-[11px] flex items-center justify-center">
                                <Terminal className="w-5 h-5 text-cyan-400 group-hover:text-cyan-300 transition-colors" />
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <span className="font-bold text-base tracking-tight text-white group-hover:text-cyan-400 transition-colors">
                                alex.thorne<span className="text-cyan-400">()</span>
                            </span>
                            <span className="text-[10px] tracking-wider uppercase text-slate-400 font-mono">
                                Full-Stack Eng
                            </span>
                        </div>
                    </a>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-1 bg-slate-900/60 p-1.5 rounded-full border border-slate-800/80">
                        {navItems.map((item) => {
                            const isActive = activeSection === item.href.substring(1);
                            return (
                                <a
                                    key={item.name}
                                    href={item.href}
                                    className={`relative px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${isActive
                                            ? 'text-white'
                                            : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                                        }`}
                                >
                                    {isActive && (
                                        <motion.div
                                            layoutId="activeNavIndicator"
                                            className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-violet-500/20 border border-cyan-500/40 rounded-full"
                                            transition={{ type: 'spring', stiffness: 380, damping: 30 }}
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
                            className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 hover:opacity-95 transition-all duration-200 active:scale-95"
                        >
                            Hire Me
                            <ArrowUpRight className="w-3.5 h-3.5" />
                        </a>

                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="md:hidden p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-300 hover:text-white focus:outline-none"
                            aria-label="Toggle navigation menu"
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
                        transition={{ duration: 0.2 }}
                        className="md:hidden mt-2 max-w-6xl mx-auto glass-panel rounded-2xl p-4 shadow-xl border border-slate-800"
                    >
                        <div className="flex flex-col gap-2">
                            {navItems.map((item) => (
                                <a
                                    key={item.name}
                                    href={item.href}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="px-4 py-2.5 rounded-xl text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800/60 transition-colors"
                                >
                                    {item.name}
                                </a>
                            ))}
                            <a
                                href="#contact"
                                onClick={() => setMobileMenuOpen(false)}
                                className="mt-2 flex items-center justify-center gap-2 text-sm font-semibold px-4 py-3 rounded-xl bg-cyan-500 text-slate-950 font-bold"
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