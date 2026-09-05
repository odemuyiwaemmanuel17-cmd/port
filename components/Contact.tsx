'use client';

import { FormEvent, useState } from 'react';
import { ArrowUpRight, Check, Mail } from 'lucide-react';
import { motion } from 'framer-motion';
import { personalInfo } from '../data/portfolio-data';

export default function Contact() {
	const [sent, setSent] = useState(false);
	function handleSubmit(event: FormEvent<HTMLFormElement>) { event.preventDefault(); setSent(true); }
	return <section id="contact" className="section-shell border-t border-white/10"><div className="grid gap-12 lg:grid-cols-[.8fr_1.2fr] lg:items-start"><div><p className="eyebrow">05 / Start a conversation</p><h2>Have a good<br /><span className="text-acid">problem?</span></h2><p className="mt-6 max-w-sm leading-7 text-white/55">Tell me what you&apos;re working on, what feels stuck, or what you&apos;re curious about. I&apos;ll get back to you within a couple of days.</p><a href={`mailto:${personalInfo.email}`} className="mt-8 inline-flex items-center gap-3 text-paper hover:text-acid"><span className="icon-box"><Mail className="h-4 w-4" /></span>{personalInfo.email}</a></div><motion.form onSubmit={handleSubmit} className="space-y-5" initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}><label className="field-label">Name<input required name="name" placeholder="Your name" /></label><label className="field-label">Email<input required type="email" name="email" placeholder="you@example.com" /></label><label className="field-label">Message<textarea required name="message" rows={5} placeholder="A few words about the idea..." /></label><button className="primary-button w-full justify-between" type="submit">{sent ? <><span className="inline-flex items-center gap-2"><Check className="h-4 w-4" /> Message noted</span><span>Thanks</span></> : <><span>Send message</span><ArrowUpRight className="h-5 w-5" /></>}</button>{sent && <p className="text-sm text-acid">Thanks for reaching out. This demo form is ready to connect to your email service.</p>}</motion.form></div></section>;
}
