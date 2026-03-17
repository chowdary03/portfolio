export interface Profile {
  name: string;
  title: string;
  tagline: string;
  /** Optional short headline (e.g. "Nice to meet you.") */
  headline?: string;
  intro?: string;
  email: string;
  linkedin: string;
  github: string;
  location: string;
  availability: string;
  profileImage?: string | null;
  resumeUrl?: string | null;
  focusAreas?: string[];
  stats: {
    yearsExperience: string;
    projectsHighlighted: number;
    accuracyHighlight: string;
    hackathonPlace: string;
  };
  about: string;
}

export interface ProjectMetric {
  label: string;
  value: string;
}

export interface Project {
  id: string;
  title: string;
  period: string;
  description: string;
  highlight?: string;
  metrics: ProjectMetric[];
  tech: string[];
  category: string;
  academic?: boolean;
  image?: string | null;
  githubUrl: string | null;
  liveUrl: string | null;
}

export interface Experience {
  role: string;
  company: string;
  location: string;
  start: string;
  end: string;
  points: string[];
  tech: string[];
}

export interface Education {
  degree: string;
  institution: string;
  location: string;
  start: string;
  end: string;
  gpa: string | null;
  coursework: string[];
}

export interface Achievement {
  title: string;
  detail: string;
}

export interface Publication {
  title: string;
  journal: string;
  status: string;
}

export interface Certification {
  name: string;
  issuer: string;
  period: string;
  summary?: string;
  /** Link to official verification page or PDF */
  credentialUrl?: string | null;
  /** Image of the certificate: path in public (e.g. /certificates/name.png) or full URL */
  imageUrl?: string | null;
}

export interface SkillsCategory {
  name: string;
  items: string[];
}
