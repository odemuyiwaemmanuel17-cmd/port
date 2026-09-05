'use client';

import { ArrowUpRight, Github } from 'lucide-react';
import { motion } from 'framer-motion';
import { projects } from '../data/portfolio-data';

export default function Projects() {
	return <section id="projects" className="section-shell border-t border-white/10">
		<div className="section-heading"><p className="eyebrow">02 / Selected work</p><h2>Small teams.<br /><span className="text-acid">Big swings.</span></h2><p className="section-intro">A few things I&apos;ve helped bring from fuzzy first thought to something people can actually use.</p></div>
		<div className="grid gap-6 lg:grid-cols-3">
			{projects.map((project, index) => <motion.article key={project.id} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ delay: index * 0.08 }} className="project-card group">
				<div className={`project-visual bg-gradient-to-br ${project.thumbnailGradient}`}><span className="project-number">{project.id}</span><div className="visual-lines"><span /><span /><span /></div><div className="visual-label">{project.category}</div></div>
				<div className="p-6"><div className="flex items-start justify-between gap-4"><div><h3 className="text-2xl font-display font-semibold text-paper">{project.title}</h3><p className="mt-1 text-sm text-acid">{project.subtitle}</p></div><ArrowUpRight className="mt-1 h-5 w-5 shrink-0 text-white/40 transition group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-acid" /></div><p className="mt-5 text-sm leading-7 text-white/60">{project.description}</p><div className="mt-5 flex flex-wrap gap-2">{project.tags.map(tag => <span key={tag} className="tag">{tag}</span>)}</div><div className="mt-7 flex items-center gap-4 border-t border-white/10 pt-4"><a className="inline-flex items-center gap-2 text-sm font-semibold text-paper hover:text-acid" href={project.liveUrl}>Live demo <span aria-hidden="true">↗</span></a><a className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-white" href={project.githubUrl}><Github className="h-4 w-4" /> Repo</a></div></div>
			</motion.article>)}
		</div>
	</section>;
}
