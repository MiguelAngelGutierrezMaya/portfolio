import { z } from 'zod';

const internalHrefSchema = z.string().regex(/^(#|\/)[a-z0-9/#.-]*$/i);

const linkSchema = z.object({
  label: z.string().min(1),
  href: internalHrefSchema,
});

const socialLinkSchema = linkSchema.extend({
  href: z.url(),
  profileUrl: z.url(),
});

const whatsappLinkSchema = z.object({
  label: z.string().min(1),
  href: z.string().regex(/^https:\/\/wa\.me\/[1-9]\d{7,14}$/),
});

const managedMediaSchema = (collection: 'projects' | 'companies') =>
  z.object({
    src: z.string().regex(new RegExp(`^/media/${collection}/[a-z0-9._-]+$`, 'i')),
    alt: z.string().min(5),
    width: z.number().int().positive().max(4000),
    height: z.number().int().positive().max(4000),
  });

const projectPreviewSchema = managedMediaSchema('projects').extend({
  presentation: z.enum(['showcase', 'generic']).optional(),
});

const sectionCopySchema = z.object({
  eyebrow: z.string().min(1),
  title: z.string().min(10),
  description: z.string().min(20),
});

const profileSchema = z.object({
  name: z.string().min(1),
  brandName: z.string().min(1),
  jobTitle: z.string().min(1),
  location: z.string().min(1),
  email: z.email(),
  whatsapp: whatsappLinkSchema,
  availability: z.string().min(1),
  headline: z.object({
    lead: z.string().min(10),
    accent: z.string().min(5),
  }),
  introduction: z.string().min(30),
  primaryAction: linkSchema,
  secondaryAction: linkSchema,
  portrait: z.object({
    alt: z.string().min(10),
    eyebrow: z.string().min(1),
    label: z.string().min(1),
  }),
  metrics: z.array(z.object({ value: z.string().min(1), label: z.string().min(1) })).min(1),
  socialLinks: z.array(socialLinkSchema).min(1),
});

const capabilitySchema = z.object({
  title: z.string().min(1),
  description: z.string().min(20),
  keywords: z.array(z.string().min(1)).min(1),
});

const projectSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  summary: z.string().min(20),
  category: z.enum(['Frontend', 'Backend', 'Mobile']),
  technologies: z.array(z.string().min(1)).min(1),
  repositoryUrl: z.url().optional(),
  preview: projectPreviewSchema.optional(),
  featured: z.boolean().optional(),
});

const experienceSchema = z.object({
  company: z.string().min(1),
  role: z.string().min(1),
  period: z.string().min(1),
  startDate: z.iso.date(),
  endDate: z.iso.date().nullable(),
  summary: z.string().min(20),
  website: z.url().optional(),
  logo: managedMediaSchema('companies').optional(),
});

const skillGroupSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(20),
  skills: z.array(z.string().min(1)).min(1),
});

export const portfolioContentSchema = z
  .object({
    schemaVersion: z.literal(1),
    profile: profileSchema,
    navigation: z.array(linkSchema).min(1),
    sections: z.object({
      capabilities: sectionCopySchema,
      projects: sectionCopySchema,
      experience: sectionCopySchema,
      skills: sectionCopySchema,
      contact: sectionCopySchema,
    }),
    capabilities: z.array(capabilitySchema).min(1),
    contact: z.object({ emailPrompt: z.string().min(1) }),
    footer: z.object({
      tagline: z.string().min(10),
      legalLinks: z.array(linkSchema).min(1),
    }),
    projects: z.array(projectSchema).min(1),
    experiences: z.array(experienceSchema).min(1),
    skillGroups: z.array(skillGroupSchema).min(1),
  })
  .superRefine((content, context) => {
    const projectIds = new Set<string>();

    content.projects.forEach((project, index) => {
      if (projectIds.has(project.id)) {
        context.addIssue({
          code: 'custom',
          message: `Duplicate project id: ${project.id}`,
          path: ['projects', index, 'id'],
        });
      }
      projectIds.add(project.id);
    });

    content.experiences.forEach((experience, index) => {
      if (experience.endDate && experience.startDate > experience.endDate) {
        context.addIssue({
          code: 'custom',
          message: 'Experience startDate must be before endDate',
          path: ['experiences', index, 'startDate'],
        });
      }
    });
  });
