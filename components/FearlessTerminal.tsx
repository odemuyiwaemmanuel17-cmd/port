'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Terminal as TerminalIcon, CornerDownLeft, Sparkles } from 'lucide-react';
import { terminalCommands, personalInfo, projects } from '../data/portfolio-data';

interface FearlessTerminalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProject: (id: string) => void;
}

export default function FearlessTerminal({
  isOpen,
  onClose,
  onSelectProject,
}: FearlessTerminalProps) {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<Array<{ command: string; output: React.ReactNode }>>([
    {
      command: 'welcome',
      output: (
        <div className="text-neutral-300 space-y-1">
          <p className="text-cyan-400 font-bold">FEARLESS SOUL // TELEMETRY TERMINAL v2.6.0</p>
          <p className="text-neutral-400 text-xs">Type <span className="text-yellow-400">help</span> for all available system commands.</p>
        </div>
      ),
    },
  ]);

  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = input.trim().toLowerCase();
    if (!cmd) return;

    let outputNode: React.ReactNode = null;

    switch (cmd) {
      case 'help':
        outputNode = (
          <div className="space-y-1.5 text-xs">
            <p className="text-cyan-400 font-bold">AVAILABLE COMMANDS:</p>
            {terminalCommands.map((c) => (
              <div key={c.command} className="grid grid-cols-3 gap-2">
                <span className="text-yellow-400 font-mono font-semibold">{c.command}</span>
                <span className="text-neutral-400 col-span-2">{c.description}</span>
              </div>
            ))}
          </div>
        );
        break;

      case 'bio':
        outputNode = (
          <div className="space-y-2 text-xs text-neutral-300">
            <p><strong className="text-white">{personalInfo.name}</strong> — {personalInfo.role}</p>
            <p className="text-neutral-400">{personalInfo.bio}</p>
            <p className="text-cyan-400 font-mono">Location: {personalInfo.location} | Timezone: {personalInfo.timezone}</p>
          </div>
        );
        break;

      case 'projects':
        outputNode = (
          <div className="space-y-2 text-xs">
            <p className="text-cyan-400 font-bold">SELECTABLE PROJECTS:</p>
            {projects.map((p) => (
              <div key={p.id} className="flex items-center justify-between p-2 rounded bg-white/5">
                <div>
                  <span className="text-yellow-400 font-bold mr-2">[{p.id}]</span>
                  <span className="text-white font-semibold">{p.title}</span>
                  <span className="text-neutral-400 text-[11px] block">{p.subtitle}</span>
                </div>
                <button
                  onClick={() => {
                    onSelectProject(p.id);
                    onClose();
                  }}
                  className="px-2.5 py-1 rounded bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500/30 text-[10px] font-mono uppercase"
                >
                  Inspect
                </button>
              </div>
            ))}
          </div>
        );
        break;

      case 'contact':
        outputNode = (
          <div className="space-y-1 text-xs text-neutral-300">
            <p>Email: <a href={`mailto:${personalInfo.email}`} className="text-cyan-400 underline">{personalInfo.email}</a></p>
            <p>GitHub: <a href={personalInfo.github} target="_blank" rel="noreferrer" className="text-cyan-400 underline">{personalInfo.github}</a></p>
            <p>LinkedIn: <a href={personalInfo.linkedin} target="_blank" rel="noreferrer" className="text-cyan-400 underline">{personalInfo.linkedin}</a></p>
          </div>
        );
        break;

      case 'clear':
        setHistory([]);
        setInput('');
        return;

      default:
        outputNode = (
          <p className="text-red-400 text-xs">
            Command not recognized: &quot;{cmd}&quot;. Type <span className="text-yellow-400">help</span> for command list.
          </p>
        );
    }

    setHistory((prev) => [...prev, { command: input, output: outputNode }]);
    setInput('');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="w-full max-w-2xl h-[520px] rounded-2xl bg-[#08090d] border border-white/15 shadow-[0_25px_60px_rgba(0,0,0,0.9)] flex flex-col overflow-hidden font-mono"
          >
            {/* Window Header */}
            <div className="px-4 py-3 bg-[#12131a] border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500/80" />
                <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <span className="w-3 h-3 rounded-full bg-green-500/80" />
                <span className="text-xs font-bold text-neutral-300 ml-2 flex items-center gap-1.5">
                  <TerminalIcon className="w-3.5 h-3.5 text-cyan-400" />
                  TELEMETRY_SHELL // EMMANUEL ODEMUYIWA
                </span>
              </div>
              <button
                onClick={onClose}
                className="p-1 rounded-lg hover:bg-white/10 text-neutral-400 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Terminal Body */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4 text-xs">
              {history.map((h, i) => (
                <div key={i} className="space-y-1">
                  <div className="flex items-center gap-2 text-neutral-400">
                    <span className="text-cyan-400 font-bold">&gt;</span>
                    <span className="text-white font-semibold">{h.command}</span>
                  </div>
                  <div className="pl-4">{h.output}</div>
                </div>
              ))}
              <div ref={bottomRef} />
            </div>

            {/* Input Bar */}
            <form onSubmit={handleCommand} className="p-3 bg-[#0d0e14] border-t border-white/10 flex items-center gap-2">
              <span className="text-cyan-400 font-bold">&gt;</span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="type 'help', 'bio', 'projects', 'contact'..."
                className="flex-1 bg-transparent text-white text-xs outline-none font-mono placeholder:text-neutral-600"
              />
              <button
                type="submit"
                className="px-3 py-1 rounded bg-white/10 hover:bg-white/20 text-neutral-300 text-[10px] font-bold"
              >
                EXEC
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
