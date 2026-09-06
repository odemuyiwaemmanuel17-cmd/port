'use client';

import React, { FormEvent, useState } from 'react';
import { 
  ArrowUpRight, 
  Check, 
  Mail, 
  Copy, 
  Send, 
  Github, 
  Linkedin, 
  Twitter, 
  Terminal as TerminalIcon, 
  Radio, 
  Sparkles,
  AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { personalInfo, socialLinks } from '../data/portfolio-data';

export default function Contact() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionLogs, setSubmissionLogs] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setCopied(true);
    showToast('Email address copied to clipboard!');
    setTimeout(() => setCopied(false), 2500);
  };

  const validate = () => {
    const errs: { [key: string]: string } = {};
    if (!formState.name.trim()) errs.name = 'Please provide your name';
    if (!formState.email.trim()) {
      errs.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(formState.email)) {
      errs.email = 'Please enter a valid email format';
    }
    if (!formState.subject.trim()) errs.subject = 'Please provide a subject line';
    if (!formState.message.trim() || formState.message.length < 10) {
      errs.message = 'Message must be at least 10 characters';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setSubmissionLogs(['[00:00:01] Validating telemetry payload...']);

    setTimeout(() => {
      setSubmissionLogs((prev) => [...prev, '[00:00:02] Establishing secure HTTPS transmission socket...']);
    }, 400);

    setTimeout(() => {
      setSubmissionLogs((prev) => [...prev, '[00:00:03] Message packet encoded // Ready for dispatch.']);
      setIsSubmitting(false);
      showToast('Transmission confirmed! Dispatching email client...');

      // Trigger mailto client
      const subject = encodeURIComponent(`[Telemetry Inquiry] ${formState.subject} - from ${formState.name}`);
      const body = encodeURIComponent(
        `Hi Emmanuel,\n\n${formState.message}\n\n---\nSender: ${formState.name}\nContact Email: ${formState.email}`
      );
      window.location.href = `mailto:${personalInfo.email}?subject=${subject}&body=${body}`;
    }, 1200);
  };

  return (
    <section id="contact" className="section-shell border-t border-indigo-500/15 relative">
      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-50 px-4 py-3 rounded-2xl bg-cyan-950/95 border border-cyan-400 text-cyan-200 text-xs font-mono shadow-2xl shadow-cyan-950 flex items-center gap-2.5 backdrop-blur-xl"
          >
            <Check className="w-4 h-4 text-cyan-400" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid gap-12 lg:grid-cols-12 lg:items-start">
        {/* Left Column: Telemetry Channels & Quick Copy */}
        <div className="lg:col-span-5 space-y-6">
          <div>
            <div className="telemetry-eyebrow">
              04 // DIRECT DISPATCH &amp; CONSULTATION
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
              Ready to Build.<br />
              <span className="text-gradient-telemetry">
                Let&apos;s Connect.
              </span>
            </h2>
            <p className="mt-4 text-slate-300 font-sans text-sm sm:text-base leading-relaxed">
              Whether you need high-throughput full-stack web platforms, fluid Flutter mobile apps, or parametric 3D CAD modeling, I am available for select engineering collaborations and full-time software roles.
            </p>
          </div>

          {/* Quick Action: Copy Email Card */}
          <div className="p-5 rounded-2xl cyber-panel border-cyan-500/30 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono text-cyan-400 uppercase font-semibold">
                Direct Email Terminal
              </span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            </div>

            <div className="flex items-center justify-between gap-2 p-3 rounded-xl bg-slate-950/80 border border-slate-800">
              <span className="font-mono text-xs sm:text-sm text-slate-200 truncate">
                {personalInfo.email}
              </span>
              <button
                onClick={handleCopyEmail}
                className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500/25 transition-colors flex-shrink-0"
                title="Copy Email"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Location & Status Card */}
          <div className="grid grid-cols-2 gap-3 p-4 rounded-2xl bg-slate-900/40 border border-indigo-500/15 text-xs font-mono">
            <div>
              <span className="text-[10px] text-slate-500 uppercase block mb-1">
                Node Location
              </span>
              <span className="text-slate-200 font-medium">{personalInfo.location}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-500 uppercase block mb-1">
                Active Timezone
              </span>
              <span className="text-cyan-400 font-medium">{personalInfo.timezone}</span>
            </div>
          </div>

          {/* Social Badges */}
          <div>
            <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block mb-3 font-semibold">
              External Telemetry Channels
            </span>
            <div className="flex flex-wrap gap-2">
              {socialLinks.map((s) => (
                <a
                  key={s.name}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2 rounded-xl bg-slate-900/90 border border-slate-800 text-slate-300 hover:text-white hover:border-cyan-500/40 hover:bg-slate-800 transition-all text-xs font-mono flex items-center gap-2"
                >
                  {s.icon === 'github' && <Github className="w-3.5 h-3.5 text-cyan-400" />}
                  {s.icon === 'linkedin' && <Linkedin className="w-3.5 h-3.5 text-indigo-400" />}
                  {s.icon === 'twitter' && <Twitter className="w-3.5 h-3.5 text-purple-400" />}
                  {s.icon === 'mail' && <Mail className="w-3.5 h-3.5 text-emerald-400" />}
                  <span>{s.name}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Contact Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-7 cyber-panel border-cyan-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-5 relative"
        >
          <div className="flex items-center justify-between pb-3 border-b border-indigo-500/15">
            <div className="flex items-center gap-2">
              <Radio className="w-4 h-4 text-cyan-400 animate-pulse" />
              <h3 className="font-display font-bold text-lg text-white">
                Dispatch Direct Transmission
              </h3>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-950 text-cyan-400 border border-cyan-500/20">
              ENCRYPTED // TLS
            </span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Name Field */}
              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-1.5 font-semibold">
                  Name / Identifier *
                </label>
                <input
                  type="text"
                  value={formState.name}
                  onChange={(e) => {
                    setFormState({ ...formState, name: e.target.value });
                    if (errors.name) setErrors({ ...errors, name: '' });
                  }}
                  placeholder="e.g. Elena Rostova"
                  className={`w-full px-3.5 py-2.5 rounded-xl bg-slate-950/80 border text-slate-100 placeholder-slate-600 text-xs sm:text-sm outline-none font-sans ${
                    errors.name ? 'border-rose-500 ring-1 ring-rose-500' : 'border-slate-800 focus:border-cyan-400'
                  }`}
                />
                {errors.name && (
                  <span className="text-[10px] text-rose-400 font-mono mt-1 flex items-center gap-1">
                    <AlertCircle className="w-2.5 h-2.5" /> {errors.name}
                  </span>
                )}
              </div>

              {/* Email Field */}
              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-1.5 font-semibold">
                  Contact Email *
                </label>
                <input
                  type="email"
                  value={formState.email}
                  onChange={(e) => {
                    setFormState({ ...formState, email: e.target.value });
                    if (errors.email) setErrors({ ...errors, email: '' });
                  }}
                  placeholder="elena@company.com"
                  className={`w-full px-3.5 py-2.5 rounded-xl bg-slate-950/80 border text-slate-100 placeholder-slate-600 text-xs sm:text-sm outline-none font-sans ${
                    errors.email ? 'border-rose-500 ring-1 ring-rose-500' : 'border-slate-800 focus:border-cyan-400'
                  }`}
                />
                {errors.email && (
                  <span className="text-[10px] text-rose-400 font-mono mt-1 flex items-center gap-1">
                    <AlertCircle className="w-2.5 h-2.5" /> {errors.email}
                  </span>
                )}
              </div>
            </div>

            {/* Subject Field */}
            <div>
              <label className="block text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-1.5 font-semibold">
                Subject / Project Focus *
              </label>
              <input
                type="text"
                value={formState.subject}
                onChange={(e) => {
                  setFormState({ ...formState, subject: e.target.value });
                  if (errors.subject) setErrors({ ...errors, subject: '' });
                }}
                placeholder="e.g. Next.js SaaS Platform / Flutter Mobile App / Engineering Role"
                className={`w-full px-3.5 py-2.5 rounded-xl bg-slate-950/80 border text-slate-100 placeholder-slate-600 text-xs sm:text-sm outline-none font-sans ${
                  errors.subject ? 'border-rose-500 ring-1 ring-rose-500' : 'border-slate-800 focus:border-cyan-400'
                }`}
              />
              {errors.subject && (
                <span className="text-[10px] text-rose-400 font-mono mt-1 flex items-center gap-1">
                  <AlertCircle className="w-2.5 h-2.5" /> {errors.subject}
                </span>
              )}
            </div>

            {/* Message Field */}
            <div>
              <label className="block text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-1.5 font-semibold">
                Project Scope &amp; Details *
              </label>
              <textarea
                rows={4}
                value={formState.message}
                onChange={(e) => {
                  setFormState({ ...formState, message: e.target.value });
                  if (errors.message) setErrors({ ...errors, message: '' });
                }}
                placeholder="Describe your technical requirements, timelines, and product vision..."
                className={`w-full px-3.5 py-2.5 rounded-xl bg-slate-950/80 border text-slate-100 placeholder-slate-600 text-xs sm:text-sm outline-none font-sans resize-none ${
                  errors.message ? 'border-rose-500 ring-1 ring-rose-500' : 'border-slate-800 focus:border-cyan-400'
                }`}
              />
              {errors.message && (
                <span className="text-[10px] text-rose-400 font-mono mt-1 flex items-center gap-1">
                  <AlertCircle className="w-2.5 h-2.5" /> {errors.message}
                </span>
              )}
            </div>

            {/* Simulated Transmission Console Logs */}
            {submissionLogs.length > 0 && (
              <div className="p-3 rounded-xl bg-slate-950 border border-cyan-500/20 font-mono text-[11px] text-cyan-300 space-y-1">
                {submissionLogs.map((log, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <span className="text-slate-500">&gt;</span>
                    <span>{log}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full telemetry-btn-primary !py-3 !text-sm !rounded-xl"
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-slate-900 border-t-transparent rounded-full animate-spin" />
                  Transmitting Payload...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <Send className="w-4 h-4" /> Send Direct Inquiry &amp; Dispatch
                  <ArrowUpRight className="w-4 h-4" />
                </span>
              )}
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}

