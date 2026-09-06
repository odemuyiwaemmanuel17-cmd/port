'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowUpRight, 
  Github, 
  Layers, 
  Terminal as TerminalIcon, 
  Cpu, 
  Code2, 
  Maximize2,
  Filter,
  Sparkles
} from 'lucide-react';
import { projects } from '../data/portfolio-data';
import type { Project, ProjectCategory } from '../types/portfolio';
import ProjectModal from './ProjectModal';

const categories: { label: string; value: ProjectCategory }[] = [
  { label: 'All Projects', value: 'All' },
  { label: 'Full-Stack Platforms', value: 'Full-Stack' },
  { label: 'Mobile & APK Tools', value: 'Mobile' },
  { label: 'CAD / Hardware', value: 'CAD / Hardware' },
  { label: 'Systems & AI', value: 'Systems & AI' },
];

export default function Projects() {
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>('All');
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);

  const filteredProjects = projects.filter((project) => {
    if (selectedCategory === 'All') return true;
    return project.category === selectedCategory;
  });

  return (
    <section id="projects" className="section-shell border-t border-indigo-500/15 relative">
      {/* Telemetry Reticle & Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div>
          <div className="telemetry-eyebrow">
            01 // ENGINEERING SYSTEMS &amp; PLATFORMS
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            High-Performance Platforms.<br />
            <span className="text-gradient-telemetry">
              Aerospace-Grade Precision.
            </span>
          </h2>
        </div>
        <p className="max-w-md text-sm text-slate-400 font-sans leading-relaxed">
          From full-stack business acquisition platforms and escrow dispatch engines to Android manifest bytecode inspectors and parametric 3D CAD modeling.
        </p>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 terminal-scrollbar">
        <Filter className="w-4 h-4 text-cyan-400 mr-1 flex-shrink-0" />
        {categories.map((cat) => {
          const isSelected = selectedCategory === cat.value;
          return (
            <button
              key={cat.value}
              onClick={() => setSelectedCategory(cat.value)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-mono whitespace-nowrap transition-all flex items-center gap-1.5 ${
                isSelected
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-cyan-glow font-bold'
                  : 'bg-slate-900/60 border border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800/80'
              }`}
            >
              <span>{cat.label}</span>
              {isSelected && (
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              )}
            </button>
          );
        })}
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, index) => (
            <motion.article
              key={project.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="cyber-panel cyber-panel-hover rounded-2xl overflow-hidden flex flex-col justify-between group border-indigo-500/20 hover:border-cyan-500/50"
            >
              <div>
                {/* Visual Header / Telemetry Banner */}
                <div className={`relative h-44 bg-gradient-to-br ${project.thumbnailGradient} p-4 border-b border-indigo-500/15 overflow-hidden`}>
                  {/* Background Telemetry Grid Lines */}
                  <div className="absolute inset-0 bg-cyber-grid opacity-40 pointer-events-none" />
                  
                  {/* Top Status Indicators */}
                  <div className="relative z-10 flex items-center justify-between text-[11px] font-mono">
                    <span className="px-2 py-0.5 rounded bg-slate-950/80 text-cyan-400 border border-cyan-500/30">
                      ID: {project.id}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-slate-950/80 text-slate-300 border border-slate-800">
                      {project.category}
                    </span>
                  </div>

                  {/* Visual Center Hologram Cue */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20 group-hover:opacity-40 transition-opacity">
                    <div className="w-24 h-24 rounded-full border border-cyan-400 border-dashed animate-spin-slow" />
                  </div>

                  {/* Bottom Subtitle / Quick Tag */}
                  <div className="absolute bottom-3 left-4 right-4 z-10">
                    <h3 className="text-lg font-display font-bold text-white group-hover:text-cyan-300 transition-colors flex items-center gap-1.5">
                      {project.title}
                      {project.featured && (
                        <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                      )}
                    </h3>
                  </div>
                </div>

                {/* Card Content Body */}
                <div className="p-5 space-y-4">
                  <p className="text-xs font-mono text-cyan-400/90 font-medium">
                    {project.subtitle}
                  </p>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans line-clamp-3">
                    {project.description}
                  </p>

                  {/* Telemetry Metrics */}
                  {project.stats && project.stats.length > 0 && (
                    <div className="grid grid-cols-2 gap-2 p-2.5 rounded-xl bg-slate-950/70 border border-indigo-500/15 text-[11px] font-mono">
                      {project.stats.map((st) => (
                        <div key={st.label} className="flex flex-col">
                          <span className="text-[10px] text-slate-500 uppercase">{st.label}</span>
                          <span className="text-slate-200 font-bold">{st.value}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Tech Stack Pills */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded-md bg-slate-900/80 border border-slate-800 text-[10px] font-mono text-slate-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="p-5 pt-2 border-t border-indigo-500/10 flex items-center justify-between text-xs font-mono">
                <button
                  onClick={() => setActiveModalProject(project)}
                  className="inline-flex items-center gap-1.5 text-cyan-400 hover:text-cyan-300 font-semibold transition-colors"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span>Inspect Architecture</span>
                </button>

                <div className="flex items-center gap-2.5">
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`GitHub repo for ${project.title}`}
                    className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-cyan-500/30 transition-colors"
                  >
                    <Github className="w-3.5 h-3.5" />
                  </a>
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Live demo for ${project.title}`}
                    className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-cyan-300 hover:border-cyan-500/30 transition-colors"
                  >
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </motion.article>
          ))}
        </AnimatePresence>
      </div>

      {/* Project Deep Dive Modal */}
      <ProjectModal
        project={activeModalProject}
        isOpen={Boolean(activeModalProject)}
        onClose={() => setActiveModalProject(null)}
      />
    </section>
  );
}

