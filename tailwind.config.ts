import type { Config } from 'tailwindcss';

const config: Config = {
	darkMode: 'class',
	content: [
		'./app/**/*.{js,ts,jsx,tsx,mdx}',
		'./components/**/*.{js,ts,jsx,tsx,mdx}',
		'./data/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			fontFamily: {
				display: ['var(--font-space-grotesk)', 'Space Grotesk', 'sans-serif'],
				sans: ['var(--font-manrope)', 'Manrope', 'system-ui', 'sans-serif'],
				mono: ['var(--font-jetbrains)', 'JetBrains Mono', 'monospace'],
			},
			colors: {
				cyber: {
					bg: '#090d16',
					card: 'rgba(15, 23, 42, 0.65)',
					surface: 'rgba(17, 24, 39, 0.8)',
					border: 'rgba(99, 102, 241, 0.15)',
					'border-cyan': 'rgba(6, 182, 212, 0.3)',
					'border-hover': 'rgba(6, 182, 212, 0.5)',
				},
				cyan: {
					glow: '#06b6d4',
					dim: '#0891b2',
				},
				indigo: {
					glow: '#6366f1',
					deep: '#4f46e5',
				},
				violet: {
					glow: '#8b5cf6',
					electric: '#7c3aed',
				},
				telemetry: {
					green: '#10b981',
					amber: '#f59e0b',
					cyan: '#06b6d4',
				},
			},
			boxShadow: {
				'cyan-glow': '0 0 20px -3px rgba(6, 182, 212, 0.4), 0 0 8px -2px rgba(6, 182, 212, 0.2)',
				'indigo-glow': '0 0 25px -5px rgba(99, 102, 241, 0.35)',
				'violet-glow': '0 0 25px -5px rgba(139, 92, 246, 0.35)',
				'glass-card': '0 8px 32px 0 rgba(0, 0, 0, 0.5), inset 0 0 0 1px rgba(255, 255, 255, 0.05)',
			},
			animation: {
				'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
				'radar-sweep': 'radarSweep 4s linear infinite',
				'scanline': 'scanline 8s linear infinite',
				'float': 'float 6s ease-in-out infinite',
			},
			keyframes: {
				radarSweep: {
					'0%': { transform: 'rotate(0deg)' },
					'100%': { transform: 'rotate(360deg)' },
				},
				scanline: {
					'0%': { transform: 'translateY(-100%)' },
					'100%': { transform: 'translateY(1000%)' },
				},
				float: {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-8px)' },
				},
			},
		},
	},
	plugins: [],
};

export default config;

