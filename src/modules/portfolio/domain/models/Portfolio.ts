export type ProjectCategory = 'Frontend' | 'Backend' | 'Mobile';

export interface Project {
  readonly id: string;
  readonly title: string;
  readonly summary: string;
  readonly category: ProjectCategory;
  readonly technologies: readonly string[];
  readonly repositoryUrl?: string;
  readonly featured?: boolean;
}

export interface Experience {
  readonly company: string;
  readonly role: string;
  readonly period: string;
  readonly startDate: string;
  readonly endDate: string;
  readonly summary: string;
  readonly website?: string;
}

export interface SkillGroup {
  readonly title: string;
  readonly description: string;
  readonly skills: readonly string[];
}

export interface PortfolioContent {
  readonly projects: readonly Project[];
  readonly experiences: readonly Experience[];
  readonly skillGroups: readonly SkillGroup[];
}
