'use client';

import { motion } from 'framer-motion';
import { stats } from '../data/portfolio-data';

export default function About() {
	return <section id="about" className="section-shell border-t border-white/10"><div className="grid gap-12 lg:grid-cols-[.8fr_1.2fr] lg:items-start"><div><p className="eyebrow">04 / A little context</p><h2 className="max-w-lg">Engineer brain.<br /><span className="text-acid">Human-first work.</span></h2></div><div><p className="max-w-2xl text-xl leading-9 text-white/75">I started out taking things apart to understand how they worked. Engineering school gave that instinct a language; product development gave it a reason.</p><p className="mt-6 max-w-2xl leading-8 text-white/45">Now I build web and mobile experiences that make complicated things feel approachable. I care about the unglamorous details: resilient systems, accessible interfaces, and the little moments that tell someone they&apos;re in good hands. When I&apos;m not shipping, you&apos;ll find me at a hackathon or learning a new way to make an idea tangible.</p><div className="mt-12 grid grid-cols-3 gap-4 border-t border-white/10 pt-6">{stats.map((stat, index) => <motion.div key={stat.label} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: index * .1 }}><p className="font-display text-3xl font-semibold text-acid">{stat.number}</p><p className="mt-2 text-sm text-paper">{stat.label}</p><p className="mt-1 text-xs text-white/35">{stat.subtext}</p></motion.div>)}</div></div></div></section>;
}
