import type { Project, SkillCategory, SocialLink, StatItem, GuestbookEntry, TerminalCommand } from '../types/portfolio';

export const personalInfo = {
	name: 'Emmanuel Odemuyiwa',
	role: 'Aerospace Engineering Undergraduate & Full-Stack / Mobile Developer',
	institution: 'Obafemi Awolowo University (OAU)',
	handle: 'odemuyiwaemmanuel17-cmd',
	status: 'Available for engineering projects & software roles',
	headline: 'Aerospace Engineering Meets Full-Stack & Mobile Software.',
	bio: 'An ambitious engineering student at Obafemi Awolowo University combining classical aerospace principles, parametric 3D CAD modeling, and modern AI/web technology to build performant web platforms, cross-platform mobile apps, and intelligent developer tools.',
	email: 'odemuyiwaemmanuel17@gmail.com',
	github: 'https://github.com/odemuyiwaemmanuel17-cmd',
	linkedin: 'https://linkedin.com/in/odemuyiwaemmanuel',
	twitter: 'https://x.com/odemuyiwa_dev',
	location: 'Nigeria (Remote / Global Telemetry)',
	timezone: 'WAT (UTC+1)',
	statusIndicator: 'ACTIVE // READY FOR DEPLOYMENT',
};

export const projects: Project[] = [
	{
		id: '01',
		title: 'Compbuy',
		subtitle: 'Web-based digital marketplace for buying & selling vetted businesses.',
		description: 'A full-stack business acquisition platform featuring verified financials, secure seller verification pipelines, escrow negotiation states, and high-concurrency database queries.',
		longDescription: 'Compbuy is an end-to-end digital acquisitions platform engineered for transparency in online commerce. It features real-time valuation metrics, multi-party auth states, Supabase row-level security, and responsive financial breakdown visualizations.',
		category: 'Full-Stack',
		featured: true,
		thumbnailGradient: 'from-[#0e1e38] via-[#091326] to-[#090d16]',
		stats: [
			{ label: 'Database', value: 'Supabase RLS' },
			{ label: 'Latency', value: '< 45ms' }
		],
		tags: ['React', 'Next.js', 'Node.js', 'Express', 'Supabase', 'PostgreSQL', 'Tailwind CSS'],
		liveUrl: 'https://github.com/odemuyiwaemmanuel17-cmd/port',
		githubUrl: 'https://github.com/odemuyiwaemmanuel17-cmd',
		architectureHighlights: [
			'Secure Supabase Auth with Row-Level Security policies',
			'Express REST microservice for valuation & escrow state machine',
			'Optimistic UI mutations and live asset valuation telemetry',
			'Responsive analytics dashboard with chart metrics'
		],
		keyFeatures: [
			'Vetted company valuation & revenue verification engine',
			'Private deal room with buyer-seller encryption channels',
			'Multi-tier business listing filtering by revenue, MRR, and niche',
			'Automated contract generation and escrow milestones'
		],
		codeSnippet: {
			filename: 'CompbuyListingEngine.ts',
			language: 'typescript',
			code: `export async function evaluateBusinessListing(listingId: string) {
  const { data: listing, error } = await supabase
    .from('business_listings')
    .select('*, financials(*), escrow_status(*)')
    .eq('id', listingId)
    .single();

  if (error) throw new ValuationError('Listing retrieval failed');
  
  const mrrMultiple = calculateTelemetryMultiple(listing.financials.mrr, listing.niche);
  return {
    valuationEstimate: listing.financials.arr * mrrMultiple,
    escrowReady: listing.escrow_status.verified,
  };
}`
		}
	},
	{
		id: '02',
		title: 'HandyTrust',
		subtitle: 'Escrow-protected service platform connecting users with verified artisans.',
		description: 'A trust-first artisan discovery and job dispatch network with smart escrow payment milestone verification, video storyboards, and rating systems.',
		longDescription: 'HandyTrust solves client-artisan trust deficits through multi-stage payment lock-in, background identity telemetry, and video-based skill certification walkthroughs.',
		category: 'Full-Stack',
		featured: true,
		thumbnailGradient: 'from-[#141b3b] via-[#0d122b] to-[#090d16]',
		stats: [
			{ label: 'Escrow Engine', value: 'Milestone-Based' },
			{ label: 'Verification', value: 'Video KYC' }
		],
		tags: ['React', 'Node.js', 'Express', 'Video Storyboarding', 'Supabase', 'PostgreSQL'],
		liveUrl: 'https://github.com/odemuyiwaemmanuel17-cmd/port',
		githubUrl: 'https://github.com/odemuyiwaemmanuel17-cmd',
		architectureHighlights: [
			'Two-phase escrow commit protocol ensuring payment safety',
			'Video storyboard ingestion pipeline for artisan skill showcase',
			'Geospatial artisan dispatch search within 15km radii',
			'Real-time dispute arbitration state machine'
		],
		keyFeatures: [
			'Milestone-triggered funds release on job inspection',
			'Interactive artisan portfolio carousel with video reviews',
			'Direct encrypted messaging and cost estimation calculator',
			'Emergency job broadcast mode for instant dispatch'
		],
		codeSnippet: {
			filename: 'EscrowStateMachine.ts',
			language: 'typescript',
			code: `export async function triggerMilestoneRelease(jobId: string, milestoneIndex: number) {
  const job = await db.jobs.findUnique({ where: { id: jobId } });
  if (job.status !== 'INSPECTION_APPROVED') {
    throw new EscrowLockError('Client inspection approval required');
  }
  return await dispatchPayoutTransaction({
    recipient: job.artisanWallet,
    amount: job.milestones[milestoneIndex].amount,
    proofHash: job.milestones[milestoneIndex].verificationHash
  });
}`
		}
	},
	{
		id: '03',
		title: 'AppMD / APK Analysis Platform',
		subtitle: 'Deep inspection tool for parsing Android APK manifests and dynamic component analysis.',
		description: 'A security & telemetry analysis suite that parses binary AndroidManifest.xml, audits permission overreach, detects exported components, and profiles activity lifecycle risks.',
		longDescription: 'AppMD automates static and dynamic inspection for Android packages. Built with Flutter cross-platform UI and a high-speed Python/Rust bytecode parsing backend, it flags zero-day permission leaks and exportable intents.',
		category: 'Mobile',
		featured: true,
		thumbnailGradient: 'from-[#072430] via-[#071720] to-[#090d16]',
		stats: [
			{ label: 'Analysis Speed', value: '< 2.4s' },
			{ label: 'Platforms', value: 'Flutter + Engine' }
		],
		tags: ['Flutter', 'Dart', 'Android SDK', 'AXML Parser', 'Python', 'Security Telemetry'],
		liveUrl: 'https://github.com/odemuyiwaemmanuel17-cmd/port',
		githubUrl: 'https://github.com/odemuyiwaemmanuel17-cmd',
		architectureHighlights: [
			'Native AXML binary string decompiler and manifest parser',
			'Dangerous permission heuristic analyzer based on Google Play policies',
			'Exported receiver / service vulnerability threat scoring',
			'Flutter UI with interactive telemetry trees and JSON export'
		],
		keyFeatures: [
			'Instant drag-and-drop APK decompilation and manifest tree',
			'Vulnerability severity heatmaps (Critical, High, Moderate, Clean)',
			'SDK compatibility matrix inspector & target SDK risk alerts',
			'Offline-first analysis without sending sensitive bytecode to external servers'
		],
		codeSnippet: {
			filename: 'ManifestSecurityAuditor.dart',
			language: 'dart',
			code: `class ManifestSecurityAuditor {
  final ApkManifest manifest;
  ManifestSecurityAuditor(this.manifest);

  List<SecurityFinding> auditExportedComponents() {
    return manifest.activities
        .where((activity) => activity.isExported && activity.permission == null)
        .map((a) => SecurityFinding(
              severity: Severity.high,
              component: a.name,
              issue: 'Exported activity without permission protection',
            ))
        .toList();
  }
}`
		}
	},
	{
		id: '04',
		title: 'Batch Image & Collage Studio',
		subtitle: 'Automated photo grid formatting, background styling, and structured caption pipeline.',
		description: 'High-throughput client-side canvas utility for batch transforming images, applying neural color palettes, generating marketing collages, and exporting multi-resolution bundles.',
		longDescription: 'Engineered with Next.js, HTML5 Canvas API, and WebAssembly image processing routines to provide desktop-class image processing right in the browser without server upload overhead.',
		category: 'Systems & AI',
		featured: true,
		thumbnailGradient: 'from-[#1c1236] via-[#110c24] to-[#090d16]',
		stats: [
			{ label: 'Batch Processing', value: '100+ Images' },
			{ label: 'Throughput', value: '60 FPS Canvas' }
		],
		tags: ['Next.js', 'TypeScript', 'HTML5 Canvas', 'WebAssembly', 'Tailwind CSS'],
		liveUrl: 'https://github.com/odemuyiwaemmanuel17-cmd/port',
		githubUrl: 'https://github.com/odemuyiwaemmanuel17-cmd',
		architectureHighlights: [
			'Zero-latency browser-side Web Workers for non-blocking pixel manipulation',
			'Custom rasterization math for responsive dynamic grid layouts',
			'Export pipeline supporting PNG, JPEG, and WebP with EXIF retention',
			'Vector overlay and typography subtitle composition engine'
		],
		keyFeatures: [
			'Parametric grid spacing, border radiuses, and glass overlays',
			'Batch watermarking with custom cybernetic fonts & logo stamps',
			'Smart aspect ratio auto-cropping with focal point detection',
			'One-click ZIP archive generation for bulk export'
		],
		codeSnippet: {
			filename: 'CanvasBatchProcessor.ts',
			language: 'typescript',
			code: `export function renderCollageFrame(
  ctx: CanvasRenderingContext2D,
  images: HTMLImageElement[],
  layout: GridLayout
) {
  images.forEach((img, idx) => {
    const slot = layout.calculateSlot(idx, ctx.canvas.width, ctx.canvas.height);
    ctx.save();
    ctx.beginPath();
    ctx.roundRect(slot.x, slot.y, slot.w, slot.h, [8]);
    ctx.clip();
    ctx.drawImage(img, slot.sx, slot.sy, slot.sw, slot.sh, slot.x, slot.y, slot.w, slot.h);
    ctx.restore();
  });
}`
		}
	},
	{
		id: '05',
		title: 'AeroCAD Parametric Wing Modeler',
		subtitle: 'Aerodynamic airfoil profile generation and parametric 3D CAD modeling suite.',
		description: 'Engineering tool combining NACA 4-digit coordinate generation, vector calculus lift-drag equations, and Onshape/FreeCAD parametric geometry scripting.',
		longDescription: 'Developed as part of aerospace engineering explorations at OAU, this tool automates the mathematical generation of NACA airfoils, sweeps 3D wing geometries, and outputs STEP/IGES CAD geometries.',
		category: 'CAD / Hardware',
		featured: false,
		thumbnailGradient: 'from-[#0b242e] via-[#08171f] to-[#090d16]',
		stats: [
			{ label: 'NACA Profiles', value: '4 & 5-Digit' },
			{ label: 'CAD Engine', value: 'Onshape API' }
		],
		tags: ['Parametric CAD', 'Onshape API', 'FreeCAD', 'Vector Calculus', 'Python', 'Three.js'],
		liveUrl: 'https://github.com/odemuyiwaemmanuel17-cmd/port',
		githubUrl: 'https://github.com/odemuyiwaemmanuel17-cmd',
		architectureHighlights: [
			'Analytical NACA camber and thickness distribution calculation algorithms',
			'Parametric feature script generation for automated cloud CAD CAD modeling',
			'Real-time lift-to-drag telemetry estimation via boundary layer approximations',
			'Three.js WebGL interactive 3D mesh wireframe visualizer'
		],
		keyFeatures: [
			'Interactive chord, sweep angle, and dihedral angle parameter sliders',
			'Live pressure coefficient (Cp) curve plot and camber camber camber distribution',
			'Direct export to FreeCAD macro scripts and STEP file formats',
			'Aerospace telemetry HUD with Reynolds number and Mach calculations'
		],
		codeSnippet: {
			filename: 'NacaAirfoilGenerator.py',
			language: 'python',
			code: `import numpy as np

def generate_naca_4digit(m, p, t, num_points=100):
    x = np.linspace(0, 1.0, num_points)
    yt = 5 * t * (0.2969*np.sqrt(x) - 0.1260*x - 0.3516*x**2 + 0.2843*x**3 - 0.1015*x**4)
    yc = np.where(x < p, (m / p**2) * (2*p*x - x**2), (m / (1-p)**2) * ((1 - 2*p) + 2*p*x - x**2))
    theta = np.arctan(np.gradient(yc, x))
    xu, yu = x - yt * np.sin(theta), yc + yt * np.cos(theta)
    xl, yl = x + yt * np.sin(theta), yc - yt * np.cos(theta)
    return np.vstack([xu, yu]), np.vstack([xl, yl])`
		}
	}
];

export const skillCategories: SkillCategory[] = [
	{
		id: 'web-mobile',
		title: 'Web & Mobile Engineering',
		description: 'High-performance interactive interfaces, type-safe full-stack architectures, and smooth 60 FPS cross-platform mobile apps.',
		iconName: 'Layout',
		skills: [
			{ name: 'React 18 / 19', level: 'Core', proficiency: 96, popular: true, tags: ['Hooks', 'Context', 'Server Components'] },
			{ name: 'Next.js (App Router)', level: 'Core', proficiency: 94, popular: true, tags: ['SSR', 'API Routes', 'Turbopack'] },
			{ name: 'TypeScript', level: 'Core', proficiency: 92, popular: true, tags: ['Generics', 'Strict Mode', 'AST'] },
			{ name: 'Flutter & Dart', level: 'Core', proficiency: 90, popular: true, tags: ['Cross-Platform', 'Bloc', 'Animations'] },
			{ name: 'Node.js & Express', level: 'Advanced', proficiency: 88, popular: true, tags: ['REST', 'Auth', 'Microservices'] },
			{ name: 'Tailwind CSS & Motion', level: 'Core', proficiency: 95, popular: true, tags: ['Framer Motion', 'Cyber HUD', 'Responsive'] },
			{ name: 'JavaScript (ESNext)', level: 'Core', proficiency: 96, tags: ['Async/Await', 'DOM', 'Canvas API'] },
			{ name: 'HTML5 / Modern CSS', level: 'Core', proficiency: 98, tags: ['Grid', 'Flexbox', 'Accessibility'] },
		],
	},
	{
		id: 'databases-tools',
		title: 'Databases, Cloud & Dev Tools',
		description: 'Resilient relational databases, scalable cloud backends, version control orchestration, and modern AI coding assistants.',
		iconName: 'Database',
		skills: [
			{ name: 'Supabase', level: 'Core', proficiency: 92, popular: true, tags: ['Auth', 'Realtime', 'RLS Policies', 'Edge Functions'] },
			{ name: 'PostgreSQL', level: 'Advanced', proficiency: 87, popular: true, tags: ['Indexing', 'Constraints', 'Migrations'] },
			{ name: 'Git & GitHub', level: 'Core', proficiency: 95, popular: true, tags: ['Branches', 'CI/CD', 'Workflows'] },
			{ name: 'VS Code & Windsurf', level: 'Core', proficiency: 96, popular: true, tags: ['IDE Telemetry', 'Extensions', 'Debugging'] },
			{ name: 'Qwen Coder & AI Tooling', level: 'Advanced', proficiency: 90, popular: true, tags: ['Prompt Eng', 'Agentic Workflows', 'LLMs'] },
			{ name: 'REST APIs & WebSockets', level: 'Core', proficiency: 90, tags: ['Real-time', 'JSON', 'Webhooks'] },
			{ name: 'Linux / Bash Scripting', level: 'Advanced', proficiency: 84, tags: ['CLI', 'Automation', 'Server Mgmt'] },
		],
	},
	{
		id: 'cad-sciences',
		title: 'Engineering & CAD Sciences',
		description: 'Rigorous engineering foundations combining physics, vector mathematics, and parametric 3D computer-aided design.',
		iconName: 'Cpu',
		skills: [
			{ name: 'Parametric 3D CAD Modeling', level: 'Core', proficiency: 92, popular: true, tags: ['Onshape', 'FreeCAD', 'FeatureScript'] },
			{ name: 'Vector Calculus', level: 'Advanced', proficiency: 89, popular: true, tags: ['Gradient Fields', 'Surface Integrals', 'Flux'] },
			{ name: 'Classical Mechanics', level: 'Advanced', proficiency: 88, popular: true, tags: ['Statics', 'Dynamics', 'Aerodynamics'] },
			{ name: 'Onshape Cloud CAD API', level: 'Advanced', proficiency: 86, popular: true, tags: ['REST API', 'Feature Trees', 'Automation'] },
			{ name: 'FreeCAD Python Scripting', level: 'Advanced', proficiency: 84, tags: ['PartDesign', 'Mesh Generation', 'STEP Export'] },
			{ name: 'Computational Physics', level: 'Proficient', proficiency: 82, tags: ['Airfoil NACA', 'Lift-Drag Equations'] },
		],
	},
];

export const guestbookEntries: GuestbookEntry[] = [
	{
		id: 'g-1',
		name: 'Dr. Adeyemi K.',
		role: 'Aerospace Engineering Faculty',
		company: 'OAU Tech Lab',
		message: 'Emmanuel is one of the rarest talents who bridges fundamental aerospace mathematical mechanics with ultra-fast modern web applications seamlessly.',
		timestamp: '2 days ago',
		avatarInitials: 'AK',
		isPinned: true,
	},
	{
		id: 'g-2',
		name: 'Tunde Bakare',
		role: 'Lead Mobile Architect',
		company: 'Fintech Vanguard',
		message: 'The APK analysis platform (AppMD) and HandyTrust escrow architecture are built with serious production discipline. Incredible eye for system design!',
		timestamp: '4 days ago',
		avatarInitials: 'TB',
	},
	{
		id: 'g-3',
		name: 'Elena Rostova',
		role: 'Senior UI/UX Engineer',
		company: 'Studio Cybernetic',
		message: 'Loving the cybernetic telemetry aesthetic, keyboard shortcuts, and responsiveness. Emmanuel brings hardware-grade precision to the web.',
		timestamp: '1 week ago',
		avatarInitials: 'ER',
	},
];

export const terminalCommands: TerminalCommand[] = [
	{ command: 'help', description: 'Lists all available telemetry terminal commands' },
	{ command: 'bio', description: 'Displays Emmanuel’s background as an aerospace student & full-stack engineer' },
	{ command: 'stack', description: 'Outputs full technical stack & software proficiencies' },
	{ command: 'projects', description: 'Lists featured software platforms with direct navigation' },
	{ command: 'cad', description: 'Shows parametric 3D CAD modeling and aerospace engineering capabilities' },
	{ command: 'contact', description: 'Prints direct communication channels and email' },
	{ command: 'socials', description: 'Displays links to GitHub, LinkedIn, and Twitter/X' },
	{ command: 'whoami', description: 'Prints visitor telemetry connection info' },
	{ command: 'quote', description: 'Outputs an inspirational quote on engineering and space exploration' },
	{ command: 'clear', description: 'Clears the terminal console buffer' },
];

export const socialLinks: SocialLink[] = [
	{ name: 'GitHub', url: personalInfo.github, icon: 'github', handle: '@odemuyiwaemmanuel17-cmd' },
	{ name: 'LinkedIn', url: personalInfo.linkedin, icon: 'linkedin', handle: 'in/odemuyiwaemmanuel' },
	{ name: 'Twitter / X', url: personalInfo.twitter, icon: 'twitter', handle: '@odemuyiwa_dev' },
	{ name: 'Email', url: `mailto:${personalInfo.email}`, icon: 'mail', handle: personalInfo.email },
];

export const stats: StatItem[] = [
	{ number: '04+', label: 'Years Engineering', subtext: 'Aerospace & Software', telemetryCode: 'EXP_SYS.04' },
	{ number: '15+', label: 'Shipped Systems', subtext: 'Web, Mobile & CLI Tools', telemetryCode: 'DEPLOY.15' },
	{ number: '100%', label: 'Type-Safe Delivery', subtext: 'TypeScript & Dart Codebases', telemetryCode: 'CODE_HEALTH.100' },
	{ number: '24/7', label: 'Telemetry Uptime', subtext: 'Available for Innovation', telemetryCode: 'STATUS.ACTIVE' },
];


