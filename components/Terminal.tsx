'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Terminal as TerminalIcon, 
  CornerDownLeft, 
  Trash2, 
  Maximize2, 
  Minimize2, 
  Check, 
  Copy,
  Sparkles,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { personalInfo, projects, skillCategories, terminalCommands } from '../data/portfolio-data';

interface CommandOutput {
  id: string;
  command: string;
  output: React.ReactNode;
  timestamp: string;
}

export default function Terminal() {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [isCopied, setIsCopied] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const terminalEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const initialWelcome = (
    <div className="space-y-1.5 text-slate-300">
      <div className="text-cyan-400 font-bold text-xs tracking-wider">
        EMMANUEL ODEMUYIWA // AEROSPACE TELEMETRY CLI [v3.4.0]
      </div>
      <p className="text-xs text-slate-400 leading-relaxed">
        System initialized. Dual-core pipeline active: Aerospace Engineering &times; Full-Stack / Mobile Software.
      </p>
      <p className="text-xs text-cyan-300/90">
        Type <span className="text-cyan-400 font-bold bg-cyan-950/60 px-1.5 py-0.5 rounded border border-cyan-500/30">help</span> to view available telemetry commands, or click the quick action chips below.
      </p>
    </div>
  );

  const [outputs, setOutputs] = useState<CommandOutput[]>([
    {
      id: 'init-1',
      command: 'sys.init --profile',
      output: initialWelcome,
      timestamp: '00:00:01',
    },
  ]);

  const getTimeString = () => {
    const d = new Date();
    return d.toTimeString().split(' ')[0];
  };

  const scrollToBottom = () => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [outputs]);

  const handleCommand = (rawCmd: string) => {
    const cmd = rawCmd.trim().toLowerCase();
    if (!cmd) return;

    // Add to history
    setHistory((prev) => [...prev, rawCmd]);
    setHistoryIndex(-1);

    const timestamp = getTimeString();
    let responseNode: React.ReactNode;

    switch (cmd) {
      case 'help':
        responseNode = (
          <div className="space-y-2 text-xs">
            <div className="text-cyan-400 font-semibold border-b border-slate-800 pb-1">
              AVAILABLE TELEMETRY COMMANDS:
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1.5">
              {terminalCommands.map((c) => (
                <div key={c.command} className="flex items-start gap-2">
                  <span className="text-cyan-300 font-bold w-16 flex-shrink-0">
                    {c.command}
                  </span>
                  <span className="text-slate-400 truncate">{c.description}</span>
                </div>
              ))}
            </div>
          </div>
        );
        break;

      case 'bio':
        responseNode = (
          <div className="space-y-2 text-xs text-slate-300">
            <div className="text-cyan-300 font-bold">
              PROFILE // {personalInfo.name.toUpperCase()}
            </div>
            <p className="text-slate-300 leading-relaxed">
              🎓 <span className="text-white font-semibold">Aerospace Engineering Undergraduate</span> at{' '}
              <span className="text-cyan-400">Obafemi Awolowo University (OAU)</span>.
            </p>
            <p className="text-slate-300 leading-relaxed">
              🚀 Combining aerodynamic telemetry, classical mechanics, vector calculus, and parametric 3D CAD modeling (Onshape &amp; FreeCAD) with modern full-stack web architectures (React, Next.js, TypeScript, Node.js) and high-performance cross-platform mobile systems (Flutter/Dart).
            </p>
            <div className="pt-1 flex flex-wrap gap-2 text-[11px] font-mono">
              <span className="px-2 py-0.5 rounded bg-cyan-950/80 text-cyan-300 border border-cyan-500/30">OAU_AERO</span>
              <span className="px-2 py-0.5 rounded bg-indigo-950/80 text-indigo-300 border border-indigo-500/30">FULL_STACK</span>
              <span className="px-2 py-0.5 rounded bg-purple-950/80 text-purple-300 border border-purple-500/30">FLUTTER_MOBILE</span>
              <span className="px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-300 border border-emerald-500/30">PARAMETRIC_CAD</span>
            </div>
          </div>
        );
        break;

      case 'stack':
        responseNode = (
          <div className="space-y-3 text-xs">
            <div className="text-cyan-300 font-bold border-b border-slate-800 pb-1">
              ACTIVE ENGINEERING STACK &amp; CAPABILITIES:
            </div>
            {skillCategories.map((cat) => (
              <div key={cat.id} className="space-y-1">
                <div className="text-indigo-300 font-semibold">{cat.title}:</div>
                <div className="flex flex-wrap gap-1.5">
                  {cat.skills.map((s) => (
                    <span
                      key={s.name}
                      className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300 font-mono text-[11px]"
                    >
                      {s.name} <span className="text-cyan-400 text-[10px]">({s.proficiency}%)</span>
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        );
        break;

      case 'projects':
        responseNode = (
          <div className="space-y-2.5 text-xs">
            <div className="text-cyan-300 font-bold border-b border-slate-800 pb-1">
              FEATURED ENGINEERING SYSTEMS:
            </div>
            <div className="space-y-2">
              {projects.map((p, idx) => (
                <div
                  key={p.id}
                  className="p-2 rounded-lg bg-slate-900/80 border border-slate-800/80 hover:border-cyan-500/30 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-cyan-300 font-bold font-mono">
                      {idx + 1}. {p.title}
                    </span>
                    <span className="text-[10px] px-1.5 py-0.2 bg-slate-800 text-slate-400 rounded font-mono">
                      {p.category}
                    </span>
                  </div>
                  <p className="text-slate-400 text-[11px] mt-0.5">{p.subtitle}</p>
                  <div className="flex items-center gap-2 mt-1 text-[10px] text-cyan-400">
                    <a
                      href={`#projects`}
                      className="hover:underline flex items-center gap-1"
                    >
                      Jump to card <ExternalLink className="w-2.5 h-2.5" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
        break;

      case 'cad':
        responseNode = (
          <div className="space-y-2 text-xs text-slate-300">
            <div className="text-cyan-300 font-bold">
              CAD &amp; AEROSPACE SIMULATION MATRIX:
            </div>
            <p className="text-slate-300 leading-relaxed">
              📐 <span className="text-white font-semibold">Parametric 3D CAD:</span> High-precision geometry modeling with Onshape Cloud CAD &amp; FreeCAD Python scripting.
            </p>
            <p className="text-slate-300 leading-relaxed">
              ✈️ <span className="text-white font-semibold">Airfoil Math:</span> NACA 4-digit and 5-digit camber/thickness curves, boundary layer velocity profiles, and vector calculus lift calculations.
            </p>
            <div className="p-2 rounded bg-slate-950 font-mono text-[11px] text-cyan-400 border border-slate-800">
              $ yt = 5 * t * (0.2969*sqrt(x) - 0.1260*x - 0.3516*x^2 + 0.2843*x^3 - 0.1015*x^4)
            </div>
          </div>
        );
        break;

      case 'contact':
        responseNode = (
          <div className="space-y-1.5 text-xs text-slate-300">
            <div className="text-cyan-300 font-bold">COMMUNICATION CHANNELS:</div>
            <p>
              📧 Email: <a href={`mailto:${personalInfo.email}`} className="text-cyan-400 underline">{personalInfo.email}</a>
            </p>
            <p>
              🌐 Location: <span className="text-slate-200">{personalInfo.location}</span> ({personalInfo.timezone})
            </p>
            <p>
              ⚡ Status: <span className="text-emerald-400 font-bold">{personalInfo.status}</span>
            </p>
          </div>
        );
        break;

      case 'socials':
        responseNode = (
          <div className="space-y-1.5 text-xs text-slate-300">
            <div className="text-cyan-300 font-bold">DISPATCH NETWORKS:</div>
            <p>
              🐙 GitHub:{' '}
              <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="text-cyan-400 underline">
                {personalInfo.github}
              </a>
            </p>
            <p>
              💼 LinkedIn:{' '}
              <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="text-cyan-400 underline">
                {personalInfo.linkedin}
              </a>
            </p>
            <p>
              🐦 Twitter/X:{' '}
              <a href={personalInfo.twitter} target="_blank" rel="noopener noreferrer" className="text-cyan-400 underline">
                {personalInfo.twitter}
              </a>
            </p>
          </div>
        );
        break;

      case 'whoami':
        responseNode = (
          <div className="text-xs text-slate-300 space-y-1">
            <div className="text-cyan-400 font-mono">
              CLIENT // REMOTE_GUEST_SESSION
            </div>
            <p className="text-slate-400">
              Protocol: HTTPS/3 Telemetry Node &bull; Host: {typeof window !== 'undefined' ? window.location.host : 'localhost'}
            </p>
            <p className="text-emerald-400">Connection state: SECURE // OPTIMAL_THROUGHPUT</p>
          </div>
        );
        break;

      case 'quote':
        responseNode = (
          <div className="p-2.5 rounded bg-slate-900/90 border-l-2 border-cyan-400 text-xs italic text-slate-300 space-y-1">
            &ldquo;Aerodynamics is the art of giving physics a form that dances with the sky. Software is the soul that navigates it.&rdquo;
            <div className="text-[10px] font-mono text-cyan-400 not-italic">— Emmanuel Odemuyiwa</div>
          </div>
        );
        break;

      case 'clear':
        setOutputs([]);
        return;

      default:
        responseNode = (
          <div className="text-xs text-red-400 space-y-1">
            <span>Unknown telemetry command: &quot;{rawCmd}&quot;.</span>
            <div className="text-slate-400">
              Type <span className="text-cyan-400 font-mono font-bold">help</span> to view all available commands.
            </div>
          </div>
        );
        break;
    }

    setOutputs((prev) => [
      ...prev,
      {
        id: `cmd-${Date.now()}`,
        command: rawCmd,
        output: responseNode,
        timestamp,
      },
    ]);

    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleCommand(input);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length > 0) {
        const nextIndex = historyIndex === -1 ? history.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(nextIndex);
        setInput(history[nextIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex !== -1) {
        const nextIndex = historyIndex + 1;
        if (nextIndex >= history.length) {
          setHistoryIndex(-1);
          setInput('');
        } else {
          setHistoryIndex(nextIndex);
          setInput(history[nextIndex]);
        }
      }
    }
  };

  const copyTerminalLogs = () => {
    const text = outputs.map((o) => `[${o.timestamp}] > ${o.command}`).join('\n');
    navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const quickCommands = ['help', 'bio', 'stack', 'projects', 'cad', 'contact', 'clear'];

  return (
    <div
      className={`cyber-panel border-cyan-500/30 rounded-2xl overflow-hidden shadow-2xl transition-all duration-300 flex flex-col ${
        isExpanded ? 'h-[580px]' : 'h-[440px] sm:h-[480px]'
      }`}
    >
      {/* Terminal Title Bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-slate-950/80 border-b border-indigo-500/20 text-xs font-mono text-slate-300 select-none">
        <div className="flex items-center gap-2">
          {/* Mac-like Cyber Lights */}
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-rose-500/80 border border-rose-600/40 inline-block" />
            <span className="w-3 h-3 rounded-full bg-amber-500/80 border border-amber-600/40 inline-block" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/80 border border-emerald-600/40 inline-block" />
          </div>
          <span className="ml-2 text-slate-400 flex items-center gap-1 text-[11px]">
            <TerminalIcon className="w-3.5 h-3.5 text-cyan-400" />
            telemetry@odemuyiwa-terminal:~$
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={copyTerminalLogs}
            title="Copy Terminal Logs"
            className="p-1 rounded text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
          >
            {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
          <button
            onClick={() => setOutputs([])}
            title="Clear Console"
            className="p-1 rounded text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            title={isExpanded ? 'Collapse' : 'Expand'}
            className="p-1 rounded text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
          >
            {isExpanded ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Terminal Output Area */}
      <div 
        onClick={() => inputRef.current?.focus()}
        className="flex-1 overflow-y-auto p-4 space-y-3 font-mono text-sm bg-slate-950/90 terminal-scrollbar cursor-text"
      >
        {outputs.map((out) => (
          <div key={out.id} className="space-y-1.5 animate-fadeIn">
            <div className="flex items-center gap-2 text-[11px] text-slate-500">
              <span>[{out.timestamp}]</span>
              <span className="text-cyan-400 font-semibold">guest@aero-telemetry:~$</span>
              <span className="text-slate-200 font-bold">{out.command}</span>
            </div>
            <div className="pl-3 sm:pl-4 border-l border-cyan-500/20">{out.output}</div>
          </div>
        ))}
        <div ref={terminalEndRef} />
      </div>

      {/* Quick Action Chips for Instant Tapping */}
      <div className="px-3 py-2 bg-slate-950/60 border-t border-indigo-500/10 flex items-center gap-1.5 overflow-x-auto text-[11px] font-mono terminal-scrollbar">
        <span className="text-slate-500 text-[10px] uppercase font-bold flex-shrink-0">Quick Cmds:</span>
        {quickCommands.map((q) => (
          <button
            key={q}
            onClick={() => handleCommand(q)}
            className="px-2.5 py-1 rounded bg-slate-900 border border-cyan-500/20 text-cyan-300 hover:bg-cyan-500/20 hover:border-cyan-400/50 transition-all flex-shrink-0 active:scale-95"
          >
            {q}
          </button>
        ))}
      </div>

      {/* Input Prompt */}
      <div className="p-3 bg-slate-950 border-t border-indigo-500/20 flex items-center gap-2 font-mono text-xs">
        <div className="flex items-center gap-1 text-cyan-400 font-bold flex-shrink-0">
          <span>emmanuel@telemetry:~$</span>
          <ChevronRight className="w-3.5 h-3.5 text-cyan-400" />
        </div>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="type 'help', 'bio', 'stack', 'projects'..."
          className="flex-1 bg-transparent text-slate-100 placeholder-slate-600 outline-none font-mono text-xs"
        />
        <button
          onClick={() => handleCommand(input)}
          className="p-1 rounded text-cyan-400 hover:bg-cyan-500/20 transition-colors"
          title="Execute Command"
        >
          <CornerDownLeft className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
