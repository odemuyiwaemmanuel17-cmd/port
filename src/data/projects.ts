export interface ProjectLink {
  label: string;
  href: string;
}

export interface Project {
  id: string;
  name: string;
  tagline: string;
  description: string;
  stack: string[];
  links: ProjectLink[];
  status: 'live' | 'repository';
}

/**
 * Only verified, real information pulled from the owner's GitHub account and
 * READMEs. No invented features, screenshots, URLs or metrics.
 */
export const FLAGSHIP: Project[] = [
  {
    id: 'orbitalpulse',
    name: 'OrbitalPulse',
    tagline: 'Interactive orbital mechanics & satellite tracking',
    description:
      'A 3D scrollytelling platform for tracking satellites and exploring orbital mechanics. Live satellite positions are propagated with SGP4 in the browser, rendered as orbit polylines around a real-time globe, with telemetry HUDs and a FastAPI backend.',
    stack: ['React Three Fiber', 'SGP4 (in-browser)', 'FastAPI', 'Tailwind', 'Vercel'],
    links: [
      { label: 'Open live app', href: 'https://orbit-ten-puce.vercel.app' },
      { label: 'Source repository', href: 'https://github.com/odemuyiwaemmanuel17-cmd/orbit' },
    ],
    status: 'live',
  },
  {
    id: 'forge3d',
    name: 'Forge 3D',
    tagline: 'Browser-based parametric CAD viewer & configurator',
    description:
      'A parametric CAD viewer and configurator that runs entirely in the browser, working with glTF/GLB assemblies and parametric part definitions. Development lives in the repository; a public deployment has not been published yet, so no live URL is claimed here.',
    stack: ['TypeScript', 'Three.js', 'glTF/GLB', 'Parametric geometry'],
    links: [{ label: 'Source repository', href: 'https://github.com/odemuyiwaemmanuel17-cmd/Forge3D' }],
    status: 'repository',
  },
];

export const OTHER_PROJECTS: Project[] = [
  {
    id: 'handytrust',
    name: 'HandyTrust',
    tagline: 'Escrow-backed home services, as cinematic scroll',
    description:
      'A cinematic scroll-pinned marketing experience for an escrow-backed Nigerian home-maintenance platform — eight photographic beats driven by a critically-damped spring timeline.',
    stack: ['React', 'TypeScript', 'Scroll engine', 'Tailwind'],
    links: [
      { label: 'Source repository', href: 'https://github.com/odemuyiwaemmanuel17-cmd/Hand-n' },
    ],
    status: 'repository',
  },
  {
    id: 'bizz',
    name: 'Bizz',
    tagline: 'Marketplace platform',
    description: 'A TypeScript marketplace application with a live deployment.',
    stack: ['TypeScript'],
    links: [
      { label: 'Open live app', href: 'https://web-ten-mu-71.vercel.app' },
      { label: 'Source repository', href: 'https://github.com/odemuyiwaemmanuel17-cmd/bizz' },
    ],
    status: 'live',
  },
  {
    id: 'compbuy',
    name: 'Compbuy',
    tagline: 'Purchasing platform',
    description: 'A Python-based purchasing platform with a live deployment.',
    stack: ['Python'],
    links: [
      { label: 'Open live app', href: 'https://compbuy-app.vercel.app' },
      { label: 'Source repository', href: 'https://github.com/odemuyiwaemmanuel17-cmd/Compbuy' },
    ],
    status: 'live',
  },
  {
    id: 'echo-zero',
    name: 'ECHO-ZERO',
    tagline: 'AI-driven sci-fi game',
    description: 'A science-fiction game experience driven by AI systems, deployed live.',
    stack: ['TypeScript', 'Game AI'],
    links: [
      { label: 'Open live app', href: 'https://echo-zero-xi.vercel.app' },
      { label: 'Source repository', href: 'https://github.com/odemuyiwaemmanuel17-cmd/ECHO-ZERO' },
    ],
    status: 'live',
  },
  {
    id: 'synergymesh',
    name: 'SynergyMesh',
    tagline: 'Multi-agent society simulation',
    description: 'A Python simulation of cooperating AI agents forming an agent society.',
    stack: ['Python', 'Multi-agent AI'],
    links: [
      { label: 'Open live app', href: 'https://synergymesh.vercel.app' },
      { label: 'Source repository', href: 'https://github.com/odemuyiwaemmanuel17-cmd/synergymesh' },
    ],
    status: 'live',
  },
];

export const SKILLS: { group: string; items: string[] }[] = [
  {
    group: 'Real-time 3D & visualization',
    items: ['Three.js', 'React Three Fiber', 'Drei', 'glTF / GLB pipelines', 'Procedural geometry', 'Scroll-driven cinematics'],
  },
  {
    group: 'Engineering methods',
    items: ['Orbital mechanics (SGP4)', 'Brayton cycle analysis', 'Thin-airfoil / lifting-line models', 'Control-surface geometry', 'Systems annotation'],
  },
  {
    group: 'Web & application',
    items: ['React + TypeScript', 'Vite', 'Tailwind CSS', 'Python / FastAPI', 'Firebase', 'Vercel & Firebase Hosting'],
  },
  {
    group: 'AI engineering',
    items: ['LLM agent workflows', 'Multi-agent simulation', 'AI-assisted content pipelines'],
  },
];
