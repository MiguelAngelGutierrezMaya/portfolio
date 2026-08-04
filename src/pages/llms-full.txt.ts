import type { APIRoute } from 'astro';

import { GetPortfolioContent } from '@portfolio/application/use-cases/GetPortfolioContent';
import { getRuntimePortfolioRepository } from '@portfolio/infrastructure/repositories/runtimePortfolioRepository';

export const prerender = false;

export const GET: APIRoute = async () => {
  const content = await GetPortfolioContent.execute(getRuntimePortfolioRepository());
  const lines = [
    `# ${content.profile.name} — ${content.profile.jobTitle}`,
    '',
    content.profile.introduction,
    '',
    `Location: ${content.profile.location}`,
    `Availability: ${content.profile.availability}`,
    `Contact: ${content.profile.email}`,
    `WhatsApp: ${content.profile.whatsapp.href}`,
    '',
    '## Capabilities',
    '',
    ...content.capabilities.flatMap(capability => [
      `### ${capability.title}`,
      '',
      capability.description,
      '',
      `Technologies and focus areas: ${capability.keywords.join(', ')}`,
      '',
    ]),
    '## Professional experience',
    '',
    ...content.experiences.flatMap(experience => [
      `### ${experience.role} — ${experience.company}`,
      '',
      `${experience.period} (${experience.startDate} to ${experience.endDate})`,
      '',
      experience.summary,
      ...(experience.website ? ['', `Company: ${experience.website}`] : []),
      '',
    ]),
    '## Projects',
    '',
    ...content.projects.flatMap(project => [
      `### ${project.title}`,
      '',
      `Category: ${project.category}`,
      '',
      project.summary,
      '',
      `Technologies: ${project.technologies.join(', ')}`,
      ...(project.repositoryUrl ? ['', `Repository: ${project.repositoryUrl}`] : []),
      '',
    ]),
    '## Technology groups',
    '',
    ...content.skillGroups.flatMap(group => [
      `### ${group.title}`,
      '',
      group.description,
      '',
      group.skills.join(', '),
      '',
    ]),
    '## Verified profiles',
    '',
    ...content.profile.socialLinks.map(link => `- [${link.label}](${link.profileUrl})`),
    '',
  ];

  return new Response(lines.join('\n'), {
    headers: {
      'Cache-Control': 'public, max-age=3600',
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
};
