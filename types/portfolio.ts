export type ProjectCategory = 'All' | 'Full-Stack' | 'Mobile' | 'CAD / Hardware' | 'Systems & AI';

export interface CodeSnippet {
  language: string;
  filename: string;
  code: string;
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  longDescription: string;
  category: 'Full-Stack' | 'Mobile' | 'CAD / Hardware' | 'Systems & AI';
  featured: boolean;
  thumbnailGradient: string;
  stats?: { label: string; value: string }[];
  tags: string[];
  liveUrl: string;
  githubUrl: string;
  architectureHighlights: string[];
  keyFeatures: string[];
  codeSnippet?: CodeSnippet;
}

export interface SkillItem {
  name: string;
  level: 'Core' | 'Advanced' | 'Proficient' | 'Exploring';
  proficiency: number; // 0 - 100%
  popular?: boolean;
  tags?: string[];
  icon?: string;
}

export interface SkillCategory {
  id: string;
  title: string;
  description: string;
  iconName: 'Layout' | 'Server' | 'Smartphone' | 'Cpu' | 'Compass' | 'Database';
  skills: SkillItem[];
}

export interface SocialLink {
  name: string;
  url: string;
  icon: 'github' | 'linkedin' | 'twitter' | 'mail' | 'terminal';
  handle?: string;
}

export interface StatItem {
  number: string;
  label: string;
  subtext: string;
  telemetryCode?: string;
}

export interface GuestbookEntry {
  id: string;
  name: string;
  role: string;
  company?: string;
  message: string;
  timestamp: string;
  avatarInitials: string;
  isPinned?: boolean;
}

export interface TerminalCommand {
  command: string;
  description: string;
  usage?: string;
  category?: 'system' | 'navigation' | 'telemetry' | 'fun';
}