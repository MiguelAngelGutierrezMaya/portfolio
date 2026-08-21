export type ProjectCategory = 'Frontend' | 'Backend' | 'Mobile';

export interface Link {
  readonly label: string;
  readonly href: string;
}

export interface SocialLink extends Link {
  readonly profileUrl: string;
}

export interface SectionCopy {
  readonly eyebrow: string;
  readonly title: string;
  readonly description: string;
}

export interface Profile {
  readonly name: string;
  readonly brandName: string;
  readonly jobTitle: string;
  readonly location: string;
  readonly email: string;
  readonly whatsapp: Link;
  readonly availability: string;
  readonly headline: {
    readonly lead: string;
    readonly accent: string;
  };
  readonly introduction: string;
  readonly primaryAction: Link;
  readonly secondaryAction: Link;
  readonly portrait: {
    readonly alt: string;
    readonly eyebrow: string;
    readonly label: string;
  };
  readonly metrics: readonly Metric[];
  readonly socialLinks: readonly SocialLink[];
}

export interface ManagedMediaAsset {
  readonly src: string;
  readonly alt: string;
  readonly width: number;
  readonly height: number;
}

export interface Metric {
  readonly value: string;
  readonly label: string;
}

export interface Capability {
  readonly title: string;
  readonly description: string;
  readonly keywords: readonly string[];
}

export interface PortfolioSections {
  readonly capabilities: SectionCopy;
  readonly projects: SectionCopy;
  readonly experience: SectionCopy;
  readonly skills: SectionCopy;
  readonly contact: SectionCopy;
}

export interface ContactContent {
  readonly emailPrompt: string;
}

export interface FooterContent {
  readonly tagline: string;
  readonly legalLinks: readonly Link[];
}

export interface Project {
  readonly id: string;
  readonly title: string;
  readonly summary: string;
  readonly category: ProjectCategory;
  readonly technologies: readonly string[];
  readonly repositoryUrl?: string;
  readonly preview?: ManagedMediaAsset;
  readonly featured?: boolean;
}

export interface Experience {
  readonly company: string;
  readonly role: string;
  readonly period: string;
  readonly startDate: string;
  readonly endDate: string | null;
  readonly summary: string;
  readonly website?: string;
  readonly logo?: ManagedMediaAsset;
}

export interface SkillGroup {
  readonly title: string;
  readonly description: string;
  readonly skills: readonly string[];
}

export interface PortfolioContent {
  readonly profile: Profile;
  readonly navigation: readonly Link[];
  readonly sections: PortfolioSections;
  readonly capabilities: readonly Capability[];
  readonly contact: ContactContent;
  readonly footer: FooterContent;
  readonly projects: readonly Project[];
  readonly experiences: readonly Experience[];
  readonly skillGroups: readonly SkillGroup[];
}
