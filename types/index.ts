export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  image: string;
  techStack: string[];
  category: string;
  github?: string;
  liveDemo?: string;
  featured: boolean;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string[];
  type: 'work' | 'education' | 'volunteer';
}

export interface Skill {
  name: string;
  level: number;
  category: 'frontend' | 'backend' | 'design' | 'tools' | 'soft' | 'ai';
  icon: string;
}

export interface Service {
  icon: string;
  title: string;
  description: string;
  features: string[];
}

export interface Testimonial {
  name: string;
  role: string;
  company: string;
  content: string;
  avatar: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  tags: string[];
  featured: boolean;
  image: string;
}
