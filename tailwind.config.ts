import type { Config } from 'tailwindcss';

const config: Config = {
	darkMode: 'class',
	content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}', './data/**/*.{js,ts,jsx,tsx,mdx}'],
	theme: { extend: { fontFamily: { display: ['var(--font-space-grotesk)'], sans: ['var(--font-manrope)'], mono: ['var(--font-jetbrains)'] }, colors: { ink: '#0b0d0e', paper: '#f2f0e9', acid: '#d7ff55' }, boxShadow: { acid: '0 0 0 1px rgba(215,255,85,.24), 0 18px 60px rgba(215,255,85,.12)' } } },
	plugins: [],
};

export default config;
