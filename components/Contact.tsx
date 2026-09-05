'use client';

import React, { FormEvent, useState } from 'react';
import { ArrowUpRight, Check, Mail, Copy, Send } from 'lucide-react';
import { motion } from 'framer-motion';
import { personalInfo } from '../data/portfolio-data';

export default function Contact() {
	const [formState, setFormState] = useState({ name: '', email: '', message: '' });
	const [sent, setSent] = useState(false);
	const [copied, setCopied] = useState(false);

	const handleCopyEmail = () => {
		navigator.clipboard.writeText(personalInfo.email);
		setCopied(true);
		setTimeout(() => setCopied(false), 2500);
	};

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setSent(true);
		// Prepare a direct mailto link as well
		const subject = encodeURIComponent(`Project Inquiry from ${formState.name}`);
		const body = encodeURIComponent(`${formState.message}\n\nFrom: ${formState.name} (${formState.email})`);
		window.location.href = `mailto:${personalInfo.email}?subject=${subject}&body=${body}`;
	};

	return (
		<section id="contact" className="section-shell border-t border-white/10">
			<div className="grid gap-12 lg:grid-cols-[.85fr_1.15fr] lg:items-start">
				<div>
					<p className="eyebrow">04 / Get In Touch</p>
					<h2>
						Have an ambitious<br />
						<span className="text-acid">project or vision?</span>
					</h2>
					<p className="mt-6 max-w-sm leading-relaxed text-white/60 text-sm sm:text-base">
						Whether you need a performant web platform, a cross-platform mobile app, or resilient backend engineering, let&apos;s build something exceptional together.
					</p>

					<div className="mt-8 flex flex-col gap-3">
						<a
							href={`mailto:${personalInfo.email}`}
							className="inline-flex items-center gap-3 text-paper hover:text-acid transition-colors group"
						>
							<span className="icon-box group-hover:border-acid/60">
								<Mail className="h-4 w-4" />
							</span>
							<span className="font-mono text-sm">{personalInfo.email}</span>
						</a>

						<button
							onClick={handleCopyEmail}
							className="inline-flex items-center gap-2 text-xs font-mono text-white/50 hover:text-acid transition-colors pl-1 mt-1"
						>
							{copied ? (
								<>
									<Check className="h-3.5 w-3.5 text-acid" />
									<span className="text-acid">Email copied to clipboard!</span>
								</>
							) : (
								<>
									<Copy className="h-3.5 w-3.5" />
									<span>Click to copy email address</span>
								</>
							)}
						</button>
					</div>

					<div className="mt-10 p-4 rounded-xl bg-white/[0.02] border border-white/5 max-w-sm">
						<p className="text-xs font-mono text-white/40 uppercase tracking-wider mb-1">
							Location &amp; Availability
						</p>
						<p className="text-xs text-white/80 font-mono">
							{personalInfo.location} • Async &amp; Real-time
						</p>
					</div>
				</div>

				<motion.form
					onSubmit={handleSubmit}
					className="space-y-5 glass-panel p-6 sm:p-8 rounded-2xl border border-white/10 shadow-2xl"
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.5 }}
				>
					<div>
						<label htmlFor="contact-name" className="field-label">
							Name / Company
						</label>
						<input
							id="contact-name"
							required
							name="name"
							value={formState.name}
							onChange={(e) => setFormState({ ...formState, name: e.target.value })}
							placeholder="Alex or Acme Corp"
						/>
					</div>

					<div>
						<label htmlFor="contact-email" className="field-label">
							Email Address
						</label>
						<input
							id="contact-email"
							required
							type="email"
							name="email"
							value={formState.email}
							onChange={(e) => setFormState({ ...formState, email: e.target.value })}
							placeholder="you@company.com"
						/>
					</div>

					<div>
						<label htmlFor="contact-message" className="field-label">
							Project Details / Message
						</label>
						<textarea
							id="contact-message"
							required
							name="message"
							rows={4}
							value={formState.message}
							onChange={(e) => setFormState({ ...formState, message: e.target.value })}
							placeholder="Tell me about your product, timeline, and goals..."
						/>
					</div>

					<button
						className="primary-button w-full justify-between mt-2"
						type="submit"
					>
						{sent ? (
							<>
								<span className="inline-flex items-center gap-2">
									<Check className="h-4 w-4" /> Message Dispatched
								</span>
								<span className="font-mono text-xs">Opening Email Client...</span>
							</>
						) : (
							<>
								<span className="inline-flex items-center gap-2">
									<Send className="h-4 w-4" /> Send Direct Inquiry
								</span>
								<ArrowUpRight className="h-5 w-5" />
							</>
						)}
					</button>

					{sent && (
						<p className="text-xs font-mono text-acid bg-acid/10 border border-acid/20 p-3 rounded-lg mt-3">
							Opening your email composer to finalize transmission to {personalInfo.email}.
						</p>
					)}
				</motion.form>
			</div>
		</section>
	);
}
