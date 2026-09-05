import React from 'react';
import { ArrowUp, Github, Linkedin, Twitter, Mail } from 'lucide-react';
import { personalInfo } from '../data/portfolio-data';

export default function Footer() {
	return (
		<footer className="mx-auto flex max-w-6xl flex-col gap-6 border-t border-white/10 px-6 py-10 text-xs font-mono text-white/40 sm:flex-row sm:items-center sm:justify-between lg:px-8">
			<div className="flex flex-col gap-1">
				<p className="text-white/60">
					&copy; {new Date().getFullYear()} {personalInfo.name}. All rights reserved.
				</p>
				<p className="text-[10px] text-white/30">
					Engineered with Next.js, TypeScript &amp; Karak Design System.
				</p>
			</div>

			<div className="flex items-center gap-4">
				<a
					aria-label="GitHub"
					href={personalInfo.github}
					target="_blank"
					rel="noopener noreferrer"
					className="hover:text-acid transition-colors p-1"
				>
					<Github className="h-4 w-4" />
				</a>
				<a
					aria-label="LinkedIn"
					href={personalInfo.linkedin}
					target="_blank"
					rel="noopener noreferrer"
					className="hover:text-acid transition-colors p-1"
				>
					<Linkedin className="h-4 w-4" />
				</a>
				<a
					aria-label="X / Twitter"
					href={personalInfo.twitter}
					target="_blank"
					rel="noopener noreferrer"
					className="hover:text-acid transition-colors p-1"
				>
					<Twitter className="h-4 w-4" />
				</a>
				<a
					aria-label="Email"
					href={`mailto:${personalInfo.email}`}
					className="hover:text-acid transition-colors p-1"
				>
					<Mail className="h-4 w-4" />
				</a>
				<a
					aria-label="Back to top"
					href="#hero"
					className="ml-3 border-l border-white/10 pl-4 hover:text-acid transition-colors p-1"
				>
					<ArrowUp className="h-4 w-4" />
				</a>
			</div>
		</footer>
	);
}
