'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function ToolsUsed() {
  const primaryTools = [
    {
      name: 'Photoshop',
      tag: 'Ps',
      bgGradient: 'from-[#001e36] to-[#001020]',
      textColor: '#31a8ff',
      border: 'border-[#31a8ff]/40',
      shadow: 'shadow-[0_0_25px_rgba(49,168,255,0.4)]',
      type: 'badge',
    },
    {
      name: 'Figma',
      icon: (
        <svg viewBox="0 0 38 57" className="w-8 h-8" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M19 28.5C19 23.2533 23.2533 19 28.5 19C33.7467 19 38 23.2533 38 28.5C38 33.7467 33.7467 38 28.5 38C23.2533 38 19 33.7467 19 28.5Z" fill="#1ABCFE"/>
          <path d="M0 47.5C0 42.2533 4.25329 38 9.5 38H19V47.5C19 52.7467 14.7467 57 9.5 57C4.25329 57 0 52.7467 0 47.5Z" fill="#0ACF83"/>
          <path d="M19 0V19H28.5C33.7467 19 38 14.7467 38 9.5C38 4.25329 33.7467 0 28.5 0H19Z" fill="#FF7262"/>
          <path d="M0 9.5C0 14.7467 4.25329 19 9.5 19H19V0H9.5C4.25329 0 0 4.25329 0 9.5Z" fill="#F24E1E"/>
          <path d="M0 28.5C0 33.7467 4.25329 38 9.5 38H19V19H9.5C4.25329 19 0 23.2533 0 28.5Z" fill="#A259FF"/>
        </svg>
      ),
      bgGradient: 'from-[#1e1e24] to-[#0d0d11]',
      border: 'border-white/10',
      shadow: 'shadow-[0_0_25px_rgba(162,89,255,0.3)]',
      type: 'figma',
    },
    {
      name: 'Framer',
      icon: (
        <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 0h16v8h-8zM4 8h8l8 8H4zM4 16h8v8z" fill="url(#framer-grad)" />
          <defs>
            <linearGradient id="framer-grad" x1="4" y1="0" x2="20" y2="24">
              <stop offset="0%" stopColor="#0055ff" />
              <stop offset="100%" stopColor="#5500ff" />
            </linearGradient>
          </defs>
        </svg>
      ),
      bgGradient: 'from-[#002244] to-[#0a0022]',
      border: 'border-blue-500/40',
      shadow: 'shadow-[0_0_25px_rgba(0,85,255,0.4)]',
      type: 'framer',
    },
  ];

  const techStack = [
    { name: 'Next.js 14/15', category: 'App Router' },
    { name: 'TypeScript', category: 'Type Safety' },
    { name: 'Three.js / WebGL', category: '3D Graphics' },
    { name: 'Flutter & Dart', category: 'Cross-Platform' },
    { name: 'Tailwind CSS', category: 'Styling' },
    { name: 'Supabase & Postgres', category: 'Database & RLS' },
    { name: 'Onshape & FreeCAD', category: 'Parametric CAD' },
    { name: 'Node.js & Express', category: 'Microservices' },
  ];

  return (
    <section className="relative w-full py-24 px-4 flex flex-col items-center justify-center bg-[#02040a] overflow-hidden border-t border-white/5">
      {/* Subtle background ambient pulse */}
      <div className="absolute w-[500px] h-[300px] rounded-full bg-cyan-600/10 blur-[100px] pointer-events-none" />

      {/* SECTION TITLE (Exact from video 00:13) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-10"
      >
        <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white mb-2">
          Tools I used
        </h3>
        <p className="text-xs font-mono text-neutral-400">
          DESIGN, PROTOTYPING & ENGINEERING SUITE
        </p>
      </motion.div>

      {/* THREE PRIMARY BIG BADGES (Photoshop, Figma, Framer) */}
      <div className="flex items-center justify-center gap-6 sm:gap-8 mb-16 flex-wrap">
        {primaryTools.map((tool, idx) => (
          <motion.div
            key={tool.name}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.15, duration: 0.5 }}
            whileHover={{ scale: 1.1, y: -5 }}
            className={`w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-gradient-to-br ${tool.bgGradient} border ${tool.border} ${tool.shadow} flex flex-col items-center justify-center cursor-pointer transition-all duration-300 relative group`}
          >
            {tool.type === 'badge' ? (
              <span
                className="text-2xl sm:text-3xl font-black font-sans tracking-tighter"
                style={{ color: tool.textColor }}
              >
                {tool.tag}
              </span>
            ) : (
              tool.icon
            )}

            {/* Hover Tooltip */}
            <span className="absolute -bottom-7 opacity-0 group-hover:opacity-100 transition-opacity text-[10px] font-mono font-semibold tracking-wider text-neutral-300 uppercase whitespace-nowrap">
              {tool.name}
            </span>
          </motion.div>
        ))}
      </div>

      {/* FULL ENGINEERING STACK CHIPS */}
      <div className="w-full max-w-4xl px-4">
        <div className="text-center mb-6">
          <span className="text-xs font-mono text-neutral-500 uppercase tracking-widest">
            ENGINEERING & COMPILER RUNTIMES
          </span>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2.5">
          {techStack.map((tech, idx) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.05 * idx }}
              className="px-4 py-2 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 hover:border-cyan-400/40 transition-all flex items-center gap-2 cursor-default group"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 group-hover:scale-125 transition-transform" />
              <span className="text-xs font-semibold text-neutral-200 group-hover:text-white">
                {tech.name}
              </span>
              <span className="text-[10px] font-mono text-neutral-500">
                // {tech.category}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
