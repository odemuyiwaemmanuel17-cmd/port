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
				ink: '#080a0c',
				paper: '#f2f0e9',
				acid: '#d7ff55',
				'acid-hover': '#e4ff88',
				surface: {
					DEFAULT: 'rgba(18, 22, 26, 0.72)',
					solid: '#111518',
					hover: 'rgba(26, 32, 38, 0.85)',
					border: 'rgba(255, 255, 255, 0.08)',
					'border-hover': 'rgba(215, 255, 85, 0.35)',
				},
			},
			boxShadow: {
				acid: '0 0 0 1px rgba(215,255,85,.24), 0 18px 60px rgba(215,255,85,.12)',
				glass: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
			},
			animation: {
				'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
			},
		},
	},
	plugins: [],
};

export default config;
