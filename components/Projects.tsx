'use client';

import React from 'react';
import { ArrowUpRight, Github, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import { projects } from '../data/portfolio-data';

export default function Projects() {
	return (
		<section id="projects" className="section-shell border-t border-white/10">
			<div className="section-heading">
				<div>
					<p className="eyebrow">01 / Selected work</p>
					<h2>
						Architected for speed.<br />
						<span className="text-acid">Engineered to scale.</span>
					</h2>
				</div>
				<p className="section-intro">
					A curated collection of web applications, cross-platform mobile systems, and architectures shipped to production.
				</p>
			</div>

			<div className="grid gap-6 lg:grid-cols-3">
				{projects.map((project, index) => (
					<motion.article
						key={project.id}
						initial={{ opacity: 0, y: 24 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true, amount: 0.2 }}
						transition={{ duration: 0.5, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
						className="project-card group flex flex-col justify-between"
					>
						<div>
							{/* Visual Header */}
							<div className={`project-visual bg-gradient-to-br ${project.thumbnailGradient}`}>
								<span className="project-number font-mono">{project.id}</span>
								<div className="visual-lines">
									<span />
									<span />
									<span />
								</div>
								<div className="visual-label">{project.category}</div>
							</div>

							{/* Card Body */}
							<div className="p-6">
								<div className="flex items-start justify-between gap-4">
									<div>
										<h3 className="text-xl font-display font-bold text-paper group-hover:text-acid transition-colors">
											{project.title}
										</h3>
										<p className="mt-1 text-xs font-mono text-acid/90">
											{project.subtitle}
										</p>
									</div>
									<a
										href={project.liveUrl}
										target="_blank"
										rel="noopener noreferrer"
										aria-label={`View ${project.title}`}
										className="p-1.5 rounded-lg border border-white/10 text-white/40 hover:text-acid hover:border-acid/40 transition-colors"
									>
										<ArrowUpRight className="h-4 w-4" />
									</a>
								</div>

								<p className="mt-4 text-xs sm:text-sm leading-relaxed text-white/60">
									{project.description}
								</p>

								{/* Project Metrics / Stats */}
								{project.stats && project.stats.length > 0 && (
									<div className="mt-5 grid grid-cols-2 gap-2 p-2.5 rounded-xl bg-white/[0.02] border border-white/5 font-mono text-xs">
										{project.stats.map((stat) => (
											<div key={stat.label} className="flex flex-col">
												<span className="text-[10px] uppercase text-white/40">{stat.label}</span>
												<span className="font-semibold text-paper text-xs">{stat.value}</span>
											</div>
										))}
									</div>
								)}

								{/* Tech Tags */}
								<div className="mt-5 flex flex-wrap gap-1.5">
									{project.tags.map((tag) => (
										<span key={tag} className="tag text-[10px]">
											{tag}
										</span>
									))}
								</div>
							</div>
						</div>

						{/* Card Footer Actions */}
						<div className="px-6 pb-6 pt-2">
							<div className="flex items-center gap-4 border-t border-white/10 pt-4 font-mono text-xs">
								<a
									className="inline-flex items-center gap-1.5 font-bold text-paper hover:text-acid transition-colors"
									href={project.liveUrl}
									target="_blank"
									rel="noopener noreferrer"
								>
									Source / Preview <ExternalLink className="h-3.5 w-3.5" />
								</a>
								<a
									className="inline-flex items-center gap-1.5 text-white/50 hover:text-paper transition-colors ml-auto"
									href={project.githubUrl}
									target="_blank"
									rel="noopener noreferrer"
								>
									<Github className="h-3.5 w-3.5" /> Code
								</a>
							</div>
						</div>
					</motion.article>
				))}
			</div>
		</section>
	);
}
