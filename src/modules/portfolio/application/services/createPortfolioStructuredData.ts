import { localizedRoutes, type Locale } from '@i18n/domain/Locale';
import { getUiCopy } from '@i18n/infrastructure/uiCopy';
import type { PortfolioContent } from '@portfolio/domain/models/Portfolio';

export const createPortfolioStructuredData = (
  content: PortfolioContent,
  locale: Locale,
  configuredSite: string
): Record<string, unknown> => {
  const copy = getUiCopy(locale);
  const rootUrl = new URL('/', configuredSite).toString();
  const pageUrl = new URL(localizedRoutes[locale].home, rootUrl).toString();
  const personId = new URL('/#person', rootUrl).toString();
  const profilePageId = `${pageUrl}#profile-page`;
  const websiteId = new URL('/#website', rootUrl).toString();
  const socialImage = new URL('/og.png', rootUrl).toString();
  const structuredProjects = content.projects.filter(project => project.featured).slice(0, 12);

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': websiteId,
        url: rootUrl,
        name: content.profile.brandName,
        alternateName: copy.metadata.portfolioAlternateName,
        inLanguage: ['en', 'es'],
        publisher: { '@id': personId },
      },
      {
        '@type': 'ProfilePage',
        '@id': profilePageId,
        url: pageUrl,
        name: `${content.profile.name} — ${content.profile.jobTitle}`,
        description: content.profile.introduction,
        inLanguage: locale,
        isPartOf: { '@id': websiteId },
        mainEntity: { '@id': personId },
        primaryImageOfPage: {
          '@type': 'ImageObject',
          url: socialImage,
          caption: content.profile.portrait.alt,
        },
        hasPart: structuredProjects.map((project, index) => ({
          '@type': 'CreativeWork',
          position: index + 1,
          name: project.title,
          description: project.summary,
          inLanguage: locale,
          url: project.repositoryUrl ?? `${pageUrl}#work`,
          keywords: project.technologies.join(', '),
          creator: { '@id': personId },
        })),
      },
      {
        '@type': 'Person',
        '@id': personId,
        name: content.profile.name,
        alternateName: content.profile.brandName,
        url: rootUrl,
        image: socialImage,
        jobTitle: content.profile.jobTitle,
        email: `mailto:${content.profile.email}`,
        contactPoint: {
          '@type': 'ContactPoint',
          contactType: copy.metadata.professionalInquiries,
          url: content.profile.whatsapp.href,
          availableLanguage: ['English', 'Spanish'],
        },
        homeLocation: {
          '@type': 'Place',
          name: 'Cali, Colombia',
        },
        sameAs: content.profile.socialLinks.map(link => link.profileUrl),
        knowsAbout: [...new Set(content.skillGroups.flatMap(group => group.skills))],
      },
    ],
  };
};
