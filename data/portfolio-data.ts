import type { Project, SkillCategory, SocialLink, StatItem } from '../types/portfolio';

export const personalInfo = {
	name: 'Odemuyiwa Emmanuel',
	role: 'Full-Stack & Mobile Developer',
	handle: 'odemuyiwaemmanuel',
	status: 'Available for select projects & roles',
	bioHeadline: 'I craft resilient digital systems with meticulous engineering and human-centered design.',
	bioSub: 'From responsive Next.js web applications to fluid Flutter mobile experiences and robust Node.js backend infrastructure, I turn ambitious ideas into fast, dependable products.',
	email: 'odemuyiwaemmanuel17@gmail.com',
	github: 'https://github.com/odemuyiwaemmanuel17-cmd',
	linkedin: 'https://linkedin.com/in/odemuyiwaemmanuel',
	twitter: 'https://x.com/odemuyiwa_dev',
	location: 'Lagos, Nigeria (Remote Worldwide)',
};

export const projects: Project[] = [
	{
		id: '01',
		title: 'NOVA / Operations OS',
		subtitle: 'A high-throughput command center for engineering teams.',
		description: 'A real-time telemetry and incident management dashboard designed for sub-second data propagation, keyboard-first navigation, and zero-distraction incident triaging.',
		category: 'Full-Stack',
		featured: true,
		thumbnailGradient: 'from-[#0f2824] via-[#091817] to-[#080a0c]',
		stats: [
			{ label: 'Active Users', value: '3.8k+' },
			{ label: 'Latency', value: '< 65ms' }
		],
		tags: ['Next.js 14', 'TypeScript', 'Tailwind CSS', 'Supabase', 'PostgreSQL'],
		liveUrl: 'https://github.com/odemuyiwaemmanuel17-cmd',
		githubUrl: 'https://github.com/odemuyiwaemmanuel17-cmd',
	},
	{
		id: '02',
		title: 'Field Notes Mobile',
		subtitle: 'Offline-first research companion for unpredictable environments.',
		description: 'Cross-platform mobile client engineered with Flutter and SQLite. Captures observations, audio notes, and geotags offline, syncing smoothly when network availability restores.',
		category: 'Mobile',
		featured: true,
		thumbnailGradient: 'from-[#2b2712] via-[#1a1708] to-[#080a0c]',
		stats: [
			{ label: 'Platforms', value: 'iOS + Android' },
			{ label: 'Sync engine', value: 'Offline-First' }
		],
		tags: ['Flutter', 'Dart', 'SQLite', 'Bloc', 'REST APIs'],
		liveUrl: 'https://github.com/odemuyiwaemmanuel17-cmd',
		githubUrl: 'https://github.com/odemuyiwaemmanuel17-cmd',
	},
	{
		id: '03',
		title: 'Form / Matter Archive',
		subtitle: 'Visual digital archive for experimental design and architecture.',
		description: 'Curated editorial catalog and portfolio platform combining structured search, image optimization, and micro-interactions for modern creative agencies.',
		category: 'Cloud & Systems',
		featured: true,
		thumbnailGradient: 'from-[#172233] via-[#0d141f] to-[#080a0c]',
		stats: [
			{ label: 'Entries', value: '1.2k+' },
			{ label: 'Search', value: 'Instant' }
		],
		tags: ['React', 'Next.js', 'Node.js', 'PostgreSQL', 'Tailwind CSS'],
		liveUrl: 'https://github.com/odemuyiwaemmanuel17-cmd',
		githubUrl: 'https://github.com/odemuyiwaemmanuel17-cmd',
	},
];

export const skillCategories: SkillCategory[] = [
	{
		title: 'Frontend & UI Engineering',
		description: 'Interfaces built with mathematical rigor, fluid motion, and strict accessibility standards.',
		iconName: 'Layout',
		skills: [
			{ name: 'React 18 / 19', level: 'Daily', popular: true },
			{ name: 'Next.js (App Router)', level: 'Daily', popular: true },
			{ name: 'TypeScript', level: 'Daily', popular: true },
			{ name: 'Tailwind CSS', level: 'Daily', popular: true },
			{ name: 'Framer Motion', level: 'Daily', popular: true },
			{ name: 'HTML5 & Modern CSS', level: 'Daily' },
			{ name: 'Responsive Systems', level: 'Daily' },
		],
	},
	{
		title: 'Backend & Data Architecture',
		description: 'Fault-tolerant distributed backends, RESTful/GraphQL APIs, and resilient databases.',
		iconName: 'Server',
		skills: [
			{ name: 'Node.js & Express', level: 'Daily', popular: true },
			{ name: 'PostgreSQL', level: 'Strong', popular: true },
			{ name: 'Supabase', level: 'Daily', popular: true },
			{ name: 'REST APIs', level: 'Daily', popular: true },
			{ name: 'Python', level: 'Strong' },
			{ name: 'Prisma', level: 'Strong' },
		],
	},
	{
		title: 'Mobile App Ecosystem',
		description: 'Native-feel cross-platform mobile apps with smooth 60fps animations and offline capability.',
		iconName: 'Smartphone',
		skills: [
			{ name: 'Flutter', level: 'Daily', popular: true },
			{ name: 'Dart', level: 'Daily', popular: true },
			{ name: 'State Management (Bloc)', level: 'Daily', popular: true },
			{ name: 'SQLite / Local Storage', level: 'Strong', popular: true },
			{ name: 'iOS & Android Deployment', level: 'Strong' },
		],
	},
	{
		title: 'DevOps, Tooling & Design',
		description: 'Modern development pipelines, version control mastery, and precision UI prototyping.',
		iconName: 'Cpu',
		skills: [
			{ name: 'Git & GitHub Workflows', level: 'Daily', popular: true },
			{ name: 'Docker Containers', level: 'Strong', popular: true },
			{ name: 'CI/CD Pipelines', level: 'Strong' },
			{ name: 'Linux / Shell Scripting', level: 'Daily' },
			{ name: 'Figma & Design Systems', level: 'Daily', popular: true },
		],
	},
];

export const socialLinks: SocialLink[] = [
	{ name: 'GitHub', url: personalInfo.github, icon: 'github' },
	{ name: 'LinkedIn', url: personalInfo.linkedin, icon: 'linkedin' },
	{ name: 'X / Twitter', url: personalInfo.twitter, icon: 'twitter' },
	{ name: 'Email', url: `mailto:${personalInfo.email}`, icon: 'mail' },
];

export const stats: StatItem[] = [
	{ number: '04+', label: 'Years Experience', subtext: 'Building software' },
	{ number: '20+', label: 'Shipped Solutions', subtext: 'Web & mobile apps' },
	{ number: '100%', label: 'Commitment', subtext: 'Quality & speed' },
];

