'use client';

import React from 'react';
import { Layout, Server, Smartphone, Cpu, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { skillCategories } from '../data/portfolio-data';

const icons: Record<string, React.ComponentType<{ className?: string }>> = {
	Layout,
	Server,
	Smartphone,
	Cpu,
};

export default function Skills() {
	return (
		<section id="skills" className="section-shell border-t border-white/10">
			<div className="section-heading">
				<div>
					<p className="eyebrow">02 / Technical Stack</p>
					<h2>
						Tools chosen for<br />
						<span className="text-acid">durability &amp; velocity.</span>
					</h2>
				</div>
				<p className="section-intro">
					Battle-tested technologies across web, mobile, and backend architectures designed to maintain agility and peak performance.
				</p>
			</div>

			<div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
				{skillCategories.map((category, index) => {
					const IconComponent = icons[category.iconName] ?? Layout;
					return (
						<motion.div
							key={category.title}
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.5, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
							className="skill-card flex flex-col justify-between group"
						>
							<div>
								<div className="mb-6 flex items-start justify-between">
									<div className="icon-box transition-transform group-hover:scale-105">
										<IconComponent className="h-5 w-5" />
									</div>
									<ArrowUpRight className="h-4 w-4 text-white/30 group-hover:text-acid group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
								</div>
								<h3 className="font-display text-lg font-bold text-paper group-hover:text-acid transition-colors">
									{category.title}
								</h3>
								<p className="mt-2 text-xs leading-5 text-white/50">
									{category.description}
								</p>
							</div>

							<div className="mt-6 flex flex-wrap gap-1.5 pt-4 border-t border-white/5">
								{category.skills.map((skill) => (
									<span key={skill.name} className="skill-pill text-[10px]">
										<span
											className={
												skill.popular
													? 'h-1.5 w-1.5 rounded-full bg-acid shadow-[0_0_6px_rgba(215,255,85,0.8)]'
													: 'h-1.5 w-1.5 rounded-full bg-white/20'
											}
										/>
										{skill.name}
									</span>
								))}
							</div>
						</motion.div>
					);
				})}
			</div>
		</section>
	);
}
