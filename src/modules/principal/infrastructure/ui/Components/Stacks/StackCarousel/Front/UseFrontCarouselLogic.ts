//
// Models
//
import type { Item } from '@principal/models/Item';

const PUBLIC_FIREBASE_URL = import.meta.env.PUBLIC_FIREBASE_URL;

export const useFrontCarouselLogic = () => {
  //
  // Constants
  //
  const items: Item[] = [
    {
      title: 'Keybe v6',
      description:
        'Keybe v6 is a multi-channel application for managing customer conversation, CRM, campaigns and funnel management using AI at the core.',
      githubLink: '',
      image: `${PUBLIC_FIREBASE_URL}/keybe-v6.webp?alt=media&token=63bb9f19-c579-4021-92a9-049e0d257fa3`,
      technologies: ['Vue.js', 'scss', 'tailwindcss', 'javascript', 'typescript'],
    },
    {
      title: 'Biky',
      description:
        'Biky is a platform where customers can configure their AI assistant, manage its capabilities and customize its appearance.',
      githubLink: '',
      image: `${PUBLIC_FIREBASE_URL}/biky.webp?alt=media&token=3e37eca5-95a1-4aa1-ba23-f3dd835e60a6`,
      technologies: ['Vue.js', 'scss', 'tailwindcss', 'javascript', 'typescript'],
    },
    {
      title: 'Keybe Flows',
      description:
        'Flows is a platform where customers can configure bot flows and manage integrations to store information with external third-party services.',
      githubLink: '',
      image: `${PUBLIC_FIREBASE_URL}/flows.webp?alt=media&token=c294fd2f-0970-4632-841e-6a5c1c1f6250`,
      technologies: ['scss', 'tailwindcss', 'React js', 'javascript', 'typescript'],
    },
    {
      title: 'Keybe Metrics',
      description:
        'Metrics is a platform where customers can interactively review their sales information, lead information and team performance.',
      githubLink: '',
      image: `${PUBLIC_FIREBASE_URL}/metrics.webp?alt=media&token=6797e6b7-0db2-45b7-984b-2afbfd153f87`,
      technologies: ['Vue.js', 'scss', 'tailwindcss', 'javascript', 'typescript'],
    },
    {
      title: '4.0 Brands (Cosechapp)',
      description:
        '4.0 Cosechapp is a platform where farmers can manage their products, orders, and products inventory',
      githubLink: '',
      image: `${PUBLIC_FIREBASE_URL}/4.0%20brands.webp?alt=media&token=09231754-c5b9-415c-bc18-34b4a2245d10`,
      technologies: ['HTML', 'css', 'javascript', 'Vue.js'],
    },
    {
      title: 'Syncrasy medcloud',
      description:
        'Syncrasy is a platform where customers can manage their information related with medical issues',
      githubLink: '',
      image: `${PUBLIC_FIREBASE_URL}/syncrasy.webp?alt=media&token=0bdf0230-cef5-4705-b836-f2cfd28f2d9f`,
      technologies: ['Angular.js', 'css', 'javascript', 'typescript'],
    },
    {
      title: 'Tip top english',
      description:
        'Tip top english is a platform to manage meetings, materials, classes and English courses',
      githubLink: 'https://github.com/MiguelAngelGutierrezMaya/tip-tip-front',
      image: `${PUBLIC_FIREBASE_URL}/tip-top.webp?alt=media&token=0d3a4136-6e07-48ad-9c37-abbaedc2beac`,
      technologies: ['css', 'javascript', 'React.js'],
    },
    {
      title: 'Siellano',
      description:
        'Siellano is a platform for managing medical contexts related to appointments, patients, physicians and historical medical information.',
      githubLink: 'https://github.com/MiguelAngelGutierrezMaya/medical-history-web',
      image: `${PUBLIC_FIREBASE_URL}/siellano.webp?alt=media&token=33c036ca-c39f-4acf-8640-4e84a894492a`,
      technologies: ['css', 'javascript', 'React.js', 'typescript'],
    },
  ];

  return {
    items,
  };
};
