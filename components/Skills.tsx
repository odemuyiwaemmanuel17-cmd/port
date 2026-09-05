'use client';

import { Layout, Server, Smartphone, Cpu, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { skillCategories } from '../data/portfolio-data';

const icons = { Layout, Server, Smartphone, Cpu };

export default function Skills() {
	return <section id="skills" className="section-shell border-t border-white/10"><div className="section-heading"><p className="eyebrow">03 / The toolkit</p><h2>Tools are just<br /><span className="text-acid">the starting point.</span></h2><p className="section-intro">A flexible stack, chosen for the problem at hand and the people who have to live with the result.</p></div><div className="grid gap-4 md:grid-cols-3">{skillCategories.map((category, index) => { const Icon = icons[category.iconName] ?? Layout; return <motion.div key={category.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * .1 }} className="skill-card"><div className="mb-8 flex items-start justify-between"><div className="icon-box"><Icon className="h-5 w-5" /></div><ArrowUpRight className="h-4 w-4 text-white/30" /></div><h3 className="font-display text-xl font-semibold text-paper">{category.title}</h3><p className="mt-2 text-sm leading-6 text-white/45">{category.description}</p><div className="mt-7 flex flex-wrap gap-2">{category.skills.map(skill => <span key={skill.name} className="skill-pill"><span className={skill.popular ? 'h-1.5 w-1.5 rounded-full bg-acid' : 'h-1.5 w-1.5 rounded-full bg-white/20'} />{skill.name}</span>)}</div></motion.div>})}</div></section>;
}
