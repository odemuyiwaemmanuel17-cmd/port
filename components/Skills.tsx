'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Layout, 
  Database, 
  Cpu, 
  Smartphone, 
  Server, 
  Compass, 
  Sparkles,
  Zap,
  CheckCircle2,
  Terminal as TerminalIcon
} from 'lucide-react';
import { skillCategories } from '../data/portfolio-data';
import type { SkillItem } from '../types/portfolio';

const categoryIcons = {
  Layout: Layout,
  Database: Database,
  Cpu: Cpu,
  Smartphone: Smartphone,
  Server: Server,
  Compass: Compass,
};

export default function Skills() {
  const [selectedCategory, setSelectedCategory] = useState<string>('web-mobile');
  const [hoveredSkill, setHoveredSkill] = useState<SkillItem | null>(null);

  const activeCategory = skillCategories.find((c) => c.id === selectedCategory) || skillCategories[0];

  return (
    <section id="skills" className="section-shell border-t border-indigo-500/15 relative">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <div className="telemetry-eyebrow">
            02 // TECHNICAL STACK &amp; CAPABILITY MATRIX
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            Engineering Rigor.<br />
            <span className="text-gradient-telemetry">
              Hardware to Full-Stack Web.
            </span>
          </h2>
        </div>
        <p className="max-w-md text-sm text-slate-400 font-sans leading-relaxed">
          Combining aerospace mathematical modeling and CAD design with modern reactive frontends, distributed databases, and cross-platform mobile systems.
        </p>
      </div>

      {/* Category Switcher Tabs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {skillCategories.map((category) => {
          const isSelected = category.id === selectedCategory;
          const Icon = categoryIcons[category.iconName as keyof typeof categoryIcons] || Layout;
          return (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`p-5 rounded-2xl text-left transition-all relative overflow-hidden ${
                isSelected
                  ? 'bg-slate-900/90 border-2 border-cyan-400 shadow-cyan-glow'
                  : 'cyber-panel border-indigo-500/20 hover:border-cyan-500/40 opacity-80 hover:opacity-100'
              }`}
            >
              {isSelected && (
                <div className="absolute top-0 right-0 w-20 h-20 bg-cyan-500/10 blur-xl pointer-events-none" />
              )}
              <div className="flex items-center justify-between mb-3">
                <div
                  className={`p-2.5 rounded-xl ${
                    isSelected
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                      : 'bg-slate-800/80 text-slate-400'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-950 text-slate-400 border border-slate-800">
                  {category.skills.length} MODULES
                </span>
              </div>
              <h3 className="text-base font-display font-bold text-white mb-1">
                {category.title}
              </h3>
              <p className="text-xs text-slate-400 line-clamp-2">
                {category.description}
              </p>
            </button>
          );
        })}
      </div>

      {/* Interactive Active Category Skill Matrix */}
      <motion.div
        key={activeCategory.id}
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="cyber-panel border-cyan-500/30 rounded-3xl p-6 sm:p-8 relative overflow-hidden"
      >
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-indigo-500/15">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider">
              ACTIVE MATRIX: {activeCategory.title}
            </span>
          </div>
          <span className="text-[11px] font-mono text-slate-400">
            Click or hover on a skill to inspect telemetry tags
          </span>
        </div>

        {/* Skills Grid with Visual Proficiency Bars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {activeCategory.skills.map((skill) => {
            const isHovered = hoveredSkill?.name === skill.name;
            return (
              <div
                key={skill.name}
                onMouseEnter={() => setHoveredSkill(skill)}
                onMouseLeave={() => setHoveredSkill(null)}
                className={`p-4 rounded-xl transition-all relative overflow-hidden cursor-pointer ${
                  isHovered
                    ? 'bg-slate-800/90 border border-cyan-400 shadow-md -translate-y-1'
                    : 'bg-slate-950/60 border border-slate-800/80 hover:border-slate-700'
                }`}
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="font-semibold text-sm text-white flex items-center gap-1.5">
                    {skill.name}
                    {skill.popular && (
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#06b6d4]" />
                    )}
                  </div>
                  <span className="text-[11px] font-mono font-bold text-cyan-400 flex-shrink-0">
                    {skill.proficiency}%
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden mb-3 border border-slate-800">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.proficiency}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    className="h-full bg-gradient-to-r from-cyan-500 via-indigo-500 to-purple-500 rounded-full"
                  />
                </div>

                {/* Tags */}
                {skill.tags && skill.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {skill.tags.map((t) => (
                      <span
                        key={t}
                        className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-800"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Selected Skill Telemetry Details Footer */}
        {hoveredSkill && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mt-6 pt-4 border-t border-indigo-500/15 flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-cyan-300"
          >
            <div className="flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>
                TELEMETRY INSPECTION: <strong className="text-white">{hoveredSkill.name}</strong> &bull; Level: <span className="text-emerald-400">{hoveredSkill.level}</span>
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-400 text-[11px]">
              <span>Proficiency Score:</span>
              <span className="text-cyan-400 font-bold">{hoveredSkill.proficiency} / 100</span>
            </div>
          </motion.div>
        )}
      </motion.div>
    </section>
  );
}

