'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Mail, Github, Linkedin, Twitter, Copy, Check } from 'lucide-react';
import { personalInfo } from '../data/portfolio-data';

interface FearlessContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function FearlessContactModal({
  isOpen,
  onClose,
}: FearlessContactModalProps) {
  const [copied, setCopied] = useState(false);
  const [senderName, setSenderName] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  if (!isOpen) return null;

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    const mailtoUrl = `mailto:${personalInfo.email}?subject=Project Inquiry from ${encodeURIComponent(senderName)}&body=${encodeURIComponent(`From: ${senderName} (${senderEmail})\n\n${message}`)}`;
    window.location.href = mailtoUrl;
    setSent(true);
    setTimeout(() => {
      setSent(false);
      onClose();
    }, 1500);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/85 backdrop-blur-2xl">
        <div className="fixed inset-0" onClick={onClose} />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative z-10 w-full max-w-lg bg-[#0a0b12] border border-white/15 rounded-3xl p-6 sm:p-8 shadow-[0_25px_70px_rgba(0,0,0,0.95)] flex flex-col gap-6"
        >
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-mono font-bold text-red-500 uppercase tracking-widest">
                DIRECT TELEMETRY CHANNEL
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-white mt-1">
                Get In Touch
              </h3>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-white/10 text-neutral-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Direct Email Copy Box */}
          <div className="p-3 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Mail className="w-4 h-4 text-cyan-400" />
              <span className="text-xs font-mono text-neutral-200">
                {personalInfo.email}
              </span>
            </div>
            <button
              onClick={handleCopyEmail}
              className="px-3 py-1 rounded-xl bg-white/10 hover:bg-white/20 text-neutral-300 text-xs font-mono flex items-center gap-1 transition-all"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" /> Copied!
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" /> Copy
                </>
              )}
            </button>
          </div>

          {/* Quick Message Form */}
          <form onSubmit={handleSend} className="space-y-3.5">
            <div>
              <label className="text-[11px] font-mono text-neutral-400 mb-1 block uppercase">
                Your Name
              </label>
              <input
                type="text"
                required
                value={senderName}
                onChange={(e) => setSenderName(e.target.value)}
                placeholder="e.g. Alex Vance"
                className="w-full px-4 py-2.5 rounded-xl bg-black/50 border border-white/10 text-white text-xs outline-none focus:border-red-500 font-mono"
              />
            </div>

            <div>
              <label className="text-[11px] font-mono text-neutral-400 mb-1 block uppercase">
                Your Email
              </label>
              <input
                type="email"
                required
                value={senderEmail}
                onChange={(e) => setSenderEmail(e.target.value)}
                placeholder="alex@company.com"
                className="w-full px-4 py-2.5 rounded-xl bg-black/50 border border-white/10 text-white text-xs outline-none focus:border-red-500 font-mono"
              />
            </div>

            <div>
              <label className="text-[11px] font-mono text-neutral-400 mb-1 block uppercase">
                Message / Project Details
              </label>
              <textarea
                rows={4}
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Describe your project, role, or collaboration idea..."
                className="w-full px-4 py-2.5 rounded-xl bg-black/50 border border-white/10 text-white text-xs outline-none focus:border-red-500 font-mono resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-2xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs tracking-wider uppercase flex items-center justify-center gap-2 transition-all shadow-[0_0_25px_rgba(239,68,68,0.5)]"
            >
              <Send className="w-3.5 h-3.5" />
              {sent ? 'Opening Mail Client...' : 'Dispatch Message'}
            </button>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
