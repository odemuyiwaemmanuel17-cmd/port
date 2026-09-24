'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Github, Code, CheckCircle, Cpu, Database, Layers } from 'lucide-react';
import { projects } from '../data/portfolio-data';
import { TShirtMockup } from './StreetwearGraphics';

interface FearlessProjectModalProps {
  projectId: string | null;
  onClose: () => void;
}

export default function FearlessProjectModal({
  projectId,
  onClose,
}: FearlessProjectModalProps) {
  if (!projectId) return null;

  const project = projects.find((p) => p.id === projectId) || projects[0];

  const getGraphicType = (id: string): 'angel' | 'butterfly' | 'cyber' | 'collage' | 'aero' => {
    switch (id) {
      case '01': return 'angel';
      case '02': return 'butterfly';
      case '03': return 'cyber';
      case '04': return 'collage';
      default: return 'aero';
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-2xl overflow-y-auto">
        {/* Backdrop click to close */}
        <div className="fixed inset-0" onClick={onClose} />

        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 30 }}
          className="relative z-10 w-full max-w-4xl max-h-[90vh] bg-[#090a10] border border-white/15 rounded-3xl shadow-[0_30px_90px_rgba(0,0,0,0.95)] overflow-hidden flex flex-col my-auto"
        >
          {/* Header Bar */}
          <div className="px-6 py-4 bg-[#11121b] border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-cyan-400">
                PROJECT_ARCHIVE // {project.id}
              </span>
              <span className="text-neutral-500">•</span>
              <span className="text-xs font-mono text-neutral-400">
                {project.category}
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-white/10 text-neutral-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Content Scroll Area */}
          <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-8">
            {/* Top Showcase Banner */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              <div className="md:col-span-5 flex justify-center">
                <TShirtMockup
                  graphicType={getGraphicType(project.id)}
                  number={project.id}
                  className="max-w-[240px]"
                />
              </div>

              <div className="md:col-span-7 flex flex-col gap-3">
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-red-500">
                  FLAGSHIP ARCHITECTURE
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-white">
                  {project.title}
                </h2>
                <p className="text-sm font-medium text-cyan-300">
                  {project.subtitle}
                </p>
                <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                  {project.longDescription || project.description}
                </p>

                {/* Stats / Metrics */}
                <div className="grid grid-cols-2 gap-3 pt-2">
                  {project.stats?.map((st, i) => (
                    <div key={i} className="p-2.5 rounded-xl bg-white/5 border border-white/5">
                      <span className="text-[10px] font-mono text-neutral-400 block uppercase">
                        {st.label}
                      </span>
                      <span className="text-xs sm:text-sm font-bold text-white font-mono">
                        {st.value}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Direct Action Links */}
                <div className="flex items-center gap-3 pt-2">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="px-4 py-2 rounded-full bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-xs tracking-wider uppercase flex items-center gap-1.5 transition-all shadow-lg"
                    >
                      <ExternalLink className="w-3.5 h-3.5" /> Live Repository
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold text-xs tracking-wider uppercase flex items-center gap-1.5 transition-all border border-white/10"
                    >
                      <Github className="w-3.5 h-3.5" /> Source
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* Architecture Highlights & Key Features */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-white/10">
              {/* Architecture */}
              <div className="space-y-3">
                <h4 className="text-xs font-mono font-bold tracking-wider text-cyan-400 uppercase flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5" /> Architecture Highlights
                </h4>
                <div className="space-y-2">
                  {project.architectureHighlights?.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-neutral-300">
                      <CheckCircle className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Key Features */}
              <div className="space-y-3">
                <h4 className="text-xs font-mono font-bold tracking-wider text-red-400 uppercase flex items-center gap-1.5">
                  <Cpu className="w-3.5 h-3.5" /> System Capabilities
                </h4>
                <div className="space-y-2">
                  {project.keyFeatures?.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-neutral-300">
                      <CheckCircle className="w-3.5 h-3.5 text-red-400 flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Code Excerpt Snippet */}
            {project.codeSnippet && (
              <div className="space-y-2 pt-4 border-t border-white/10">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-mono font-bold tracking-wider text-neutral-300 uppercase flex items-center gap-1.5">
                    <Code className="w-3.5 h-3.5 text-yellow-400" />
                    {project.codeSnippet.filename}
                  </h4>
                  <span className="text-[10px] font-mono text-neutral-500 uppercase">
                    {project.codeSnippet.language}
                  </span>
                </div>
                <div className="p-4 rounded-xl bg-black/80 border border-white/10 overflow-x-auto">
                  <pre className="text-xs font-mono text-neutral-200">
                    <code>{project.codeSnippet.code}</code>
                  </pre>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
