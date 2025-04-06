//
// Models
//
import type { Item } from '@principal/models/Item';

const PUBLIC_FIREBASE_URL = import.meta.env.PUBLIC_FIREBASE_URL;

export const useBackCarouselLogic = () => {
  //
  // Constants
  //
  const items: Item[] = [
    {
      title: 'Node auth service',
      description:
        'Node auth service is a learning project consisting of a microservice for managing user authentication and authorization.',
      githubLink: 'https://github.com/MiguelAngelGutierrezMaya/hex-architecture-node-js',
      image: `${PUBLIC_FIREBASE_URL}/backend.webp?alt=media&token=0a631641-627a-4b30-ab78-de4d93ba6324`,
      technologies: ['Node.js', 'Express', 'MongoDB', 'Docker'],
    },
    {
      title: 'Keybe chat services',
      description:
        'Keybe v6 is a microservices and event-driven architecture for managing different customer conversation channels.',
      githubLink: '',
      image: `${PUBLIC_FIREBASE_URL}/backend.webp?alt=media&token=0a631641-627a-4b30-ab78-de4d93ba6324`,
      technologies: [
        'Node.js',
        'AWS Lambda',
        'AWS SQS',
        'Redis',
        'Nest.js',
        'TypeScript',
        'MongoDB',
        'Docker',
      ],
    },
    {
      title: '4.0 Brands services',
      description:
        '4.0 Brands services is a mono-repository service that manage farmers, products, orders and inventory.',
      githubLink: '',
      image: `${PUBLIC_FIREBASE_URL}/backend.webp?alt=media&token=0a631641-627a-4b30-ab78-de4d93ba6324`,
      technologies: ['PHP', 'Laravel', 'MySQL'],
    },
    {
      title: 'Colegium microservices',
      description:
        'Colegium microservices is an architecture for the management of different services related to the educational context, digital signature service and information management.',
      githubLink: '',
      image: `${PUBLIC_FIREBASE_URL}/backend.webp?alt=media&token=0a631641-627a-4b30-ab78-de4d93ba6324`,
      technologies: ['Node.js', 'PostgreSQL', 'RabbitMQ'],
    },
    {
      title: 'Tip top english services',
      description:
        'Tip top english is a management service for meetings, materials, classes and English courses.',
      githubLink: 'https://github.com/MiguelAngelGutierrezMaya/tip-top-backend',
      image: `${PUBLIC_FIREBASE_URL}/backend.webp?alt=media&token=0a631641-627a-4b30-ab78-de4d93ba6324`,
      technologies: ['Python', 'Django', 'PostgreSQL', 'Docker'],
    },
    {
      title: 'Siellano services',
      description:
        'Siellano is a medical context management service related to appointments, patients, physicians and historical medical information.',
      githubLink: 'https://github.com/MiguelAngelGutierrezMaya/medical-history-backend',
      image: `${PUBLIC_FIREBASE_URL}/backend.webp?alt=media&token=0a631641-627a-4b30-ab78-de4d93ba6324`,
      technologies: ['Python', 'Django', 'MongoDB', 'Docker'],
    },
  ];

  return {
    items,
  };
};
