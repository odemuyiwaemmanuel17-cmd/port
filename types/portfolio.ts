export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  category: 'Full-Stack' | 'Mobile' | 'Cloud & Systems';
  featured: boolean;
  thumbnailGradient: string;
  stats?: { label: string; value: string }[];
  tags: string[];
  liveUrl: string;
  githubUrl: string;
}

export interface SkillCategory {
  title: string;
  description: string;
  iconName: 'Layout' | 'Server' | 'Smartphone' | 'Cpu';
  skills: {
    name: string;
    level: string;
    popular?: boolean;
  }[];
}

export interface SocialLink {
  name: string;
  url: string;
  icon: 'github' | 'linkedin' | 'twitter' | 'mail';
}

export interface StatItem {
  number: string;
  label: string;
  subtext: string;
}