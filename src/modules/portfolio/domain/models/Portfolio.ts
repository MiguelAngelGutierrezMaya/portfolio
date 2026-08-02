export type ProjectCategory = 'Frontend' | 'Backend' | 'Mobile';

export interface Project {
  id: string;
  title: string;
  summary: string;
  category: ProjectCategory;
  technologies: string[];
  repositoryUrl?: string;
  featured?: boolean;
}

export interface Experience {
  company: string;
  role: string;
  period: string;
  startDate: string;
  endDate: string;
  summary: string;
  website?: string;
}

export interface SkillGroup {
  title: string;
  description: string;
  skills: string[];
}

export interface PortfolioContent {
  projects: Project[];
  experiences: Experience[];
  skillGroups: SkillGroup[];
}
