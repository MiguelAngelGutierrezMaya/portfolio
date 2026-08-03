import { z } from 'zod';

const projectSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  summary: z.string().min(20),
  category: z.enum(['Frontend', 'Backend', 'Mobile']),
  technologies: z.array(z.string().min(1)).min(1),
  repositoryUrl: z.url().optional(),
  featured: z.boolean().optional(),
});

const experienceSchema = z.object({
  company: z.string().min(1),
  role: z.string().min(1),
  period: z.string().min(1),
  startDate: z.iso.date(),
  endDate: z.iso.date(),
  summary: z.string().min(20),
  website: z.url().optional(),
});

const skillGroupSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(20),
  skills: z.array(z.string().min(1)).min(1),
});

export const portfolioContentSchema = z
  .object({
    schemaVersion: z.literal(1),
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
      if (experience.startDate > experience.endDate) {
        context.addIssue({
          code: 'custom',
          message: 'Experience startDate must be before endDate',
          path: ['experiences', index, 'startDate'],
        });
      }
    });
  });
