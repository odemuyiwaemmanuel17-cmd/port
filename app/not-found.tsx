import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
	return (
		<main className="min-h-screen flex flex-col items-center justify-center text-center px-4">
			<p className="eyebrow">404 Error</p>
			<h1 className="text-5xl sm:text-7xl font-display font-bold text-paper mb-4">
				Page <span className="text-acid">Not Found</span>
			</h1>
			<p className="text-sm font-mono text-white/50 max-w-md mb-8">
				The requested resource could not be found or may have moved.
			</p>
			<Link href="/" className="primary-button inline-flex items-center gap-2">
				<ArrowLeft className="w-4 h-4" /> Return to Portfolio
			</Link>
		</main>
	);
}
