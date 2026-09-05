'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { stats } from '../data/portfolio-data';

export default function About() {
	return (
		<section id="about" className="section-shell border-t border-white/10">
			<div className="grid gap-12 lg:grid-cols-[.85fr_1.15fr] lg:items-start">
				<div>
					<p className="eyebrow">03 / Philosophy &amp; Background</p>
					<h2 className="max-w-lg">
						Engineered for speed.<br />
						<span className="text-acid">Designed for humans.</span>
					</h2>
				</div>

				<div>
					<p className="max-w-2xl text-lg sm:text-xl leading-relaxed text-white/80">
						I build software with a focus on structural elegance and real-world durability. Whether engineering complex web architectures with Next.js or crafting native-feel cross-platform mobile apps with Flutter, I aim for solutions that feel instant, intuitive, and rock-solid.
					</p>
					<p className="mt-6 max-w-2xl text-sm sm:text-base leading-relaxed text-white/50">
						My engineering process prioritizes clean component contracts, type-safe data flows, and performance-first rendering. I care about the nuanced details: micro-interactions that communicate state without confusion, accessible DOM trees, predictable offline-first syncing, and backends that scale without downtime.
					</p>

					{/* Metrics / Stats Grid with Responsive Layout */}
					<div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 border-t border-white/10 pt-8">
						{stats.map((stat, index) => (
							<motion.div
								key={stat.label}
								initial={{ opacity: 0, y: 15 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ duration: 0.4, delay: index * 0.1 }}
								className="p-4 rounded-xl bg-white/[0.02] border border-white/5"
							>
								<p className="font-display text-3xl sm:text-4xl font-bold text-acid tracking-tight">
									{stat.number}
								</p>
								<p className="mt-2 text-sm font-semibold text-paper">
									{stat.label}
								</p>
								<p className="mt-1 text-xs text-white/40 font-mono">
									{stat.subtext}
								</p>
							</motion.div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
