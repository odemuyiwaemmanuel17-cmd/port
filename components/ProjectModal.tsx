'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  ExternalLink, 
  Github, 
  Layers, 
  CheckCircle2, 
  FileCode, 
  Terminal as TerminalIcon,
  Cpu,
  Sparkles,
  ArrowUpRight
} from 'lucide-react';
import type { Project } from '../types/portfolio';

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  const [activeTab, setActiveTab] = useState<'architecture' | 'features' | 'code'>('architecture');

  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-8 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#050811]/85 backdrop-blur-md"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 20 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-3xl max-h-[90vh] flex flex-col bg-[#0b101d] border border-cyan-500/30 rounded-2xl shadow-2xl shadow-cyan-950/70 overflow-hidden z-10"
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between p-5 sm:p-6 bg-slate-950/80 border-b border-indigo-500/20">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 uppercase">
                    SYS_ID: {project.id} &bull; {project.category}
                  </span>
                  {project.featured && (
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                      <Sparkles className="w-2.5 h-2.5" /> FEATURED
                    </span>
                  )}
                </div>
                <h3 className="text-xl sm:text-2xl font-display font-bold text-white">
                  {project.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 font-sans max-w-xl">
                  {project.subtitle}
                </p>
              </div>

              <button
                onClick={onClose}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Navigation Tabs */}
            <div className="flex items-center gap-1 px-5 sm:px-6 pt-3 bg-slate-950/40 border-b border-indigo-500/10 text-xs font-mono">
              <button
                onClick={() => setActiveTab('architecture')}
                className={`pb-2.5 px-3 border-b-2 font-semibold transition-all ${
                  activeTab === 'architecture'
                    ? 'border-cyan-400 text-cyan-300'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <div className="flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5" />
                  <span>Architecture</span>
                </div>
              </button>

              <button
                onClick={() => setActiveTab('features')}
                className={`pb-2.5 px-3 border-b-2 font-semibold transition-all ${
                  activeTab === 'features'
                    ? 'border-cyan-400 text-cyan-300'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Key Features</span>
                </div>
              </button>

              {project.codeSnippet && (
                <button
                  onClick={() => setActiveTab('code')}
                  className={`pb-2.5 px-3 border-b-2 font-semibold transition-all ${
                    activeTab === 'code'
                      ? 'border-cyan-400 text-cyan-300'
                      : 'border-transparent text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    <FileCode className="w-3.5 h-3.5" />
                    <span>Source Preview</span>
                  </div>
                </button>
              )}
            </div>

            {/* Modal Body Content */}
            <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-5 terminal-scrollbar text-xs sm:text-sm">
              {/* Tab 1: Architecture Overview */}
              {activeTab === 'architecture' && (
                <div className="space-y-4">
                  <div>
                    <h4 className="text-xs uppercase font-mono text-cyan-400 font-bold mb-1">
                      System Narrative &amp; Purpose
                    </h4>
                    <p className="text-slate-300 leading-relaxed font-sans">
                      {project.longDescription}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-xs uppercase font-mono text-cyan-400 font-bold mb-2">
                      Architectural Highlights &amp; Telemetry
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {project.architectureHighlights.map((arch, i) => (
                        <div
                          key={i}
                          className="p-3 rounded-xl bg-slate-900/60 border border-indigo-500/15 flex items-start gap-2.5"
                        >
                          <div className="w-5 h-5 rounded-md bg-cyan-950 border border-cyan-500/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <span className="text-[10px] font-mono font-bold text-cyan-400">
                              0{i + 1}
                            </span>
                          </div>
                          <span className="text-slate-300 text-xs leading-snug">
                            {arch}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tech Badges */}
                  <div>
                    <h4 className="text-xs uppercase font-mono text-slate-400 font-bold mb-2">
                      Technologies &amp; Libraries
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-700/60 text-slate-300 font-mono text-[11px]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 2: Key Features */}
              {activeTab === 'features' && (
                <div className="space-y-3">
                  <h4 className="text-xs uppercase font-mono text-cyan-400 font-bold">
                    Core Capabilities &amp; System Features
                  </h4>
                  <div className="space-y-2.5">
                    {project.keyFeatures.map((feat, i) => (
                      <div
                        key={i}
                        className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800 flex items-start gap-3"
                      >
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                        <span className="text-slate-200 text-xs sm:text-sm leading-relaxed">
                          {feat}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tab 3: Code Snippet */}
              {activeTab === 'code' && project.codeSnippet && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                    <span className="text-cyan-400 font-semibold">
                      FILE: {project.codeSnippet.filename}
                    </span>
                    <span className="uppercase text-[10px] px-2 py-0.5 rounded bg-slate-900 border border-slate-800">
                      {project.codeSnippet.language}
                    </span>
                  </div>
                  <pre className="p-4 rounded-xl bg-slate-950 border border-cyan-500/20 text-slate-200 font-mono text-xs overflow-x-auto terminal-scrollbar leading-relaxed">
                    <code>{project.codeSnippet.code}</code>
                  </pre>
                </div>
              )}
            </div>

            {/* Modal Footer / Actions */}
            <div className="flex flex-wrap items-center justify-between gap-3 p-4 sm:p-5 bg-slate-950/90 border-t border-indigo-500/20">
              <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                <TerminalIcon className="w-3.5 h-3.5 text-cyan-400" />
                <span>SOURCE_STATUS: VERIFIED</span>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs font-mono text-slate-300 hover:text-white hover:border-cyan-500/40 transition-all"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>GitHub Repository</span>
                </a>

                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="telemetry-btn-primary !py-2 !px-4 !text-xs !rounded-xl"
                >
                  <span>Launch Live</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
