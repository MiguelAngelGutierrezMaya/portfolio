import type { PortfolioRepository } from '@portfolio/application/ports/PortfolioRepository';
import type {
  Experience,
  PortfolioContent,
  Project,
  SkillGroup,
} from '@portfolio/domain/models/Portfolio';

const projects: Project[] = [
  {
    id: 'keybe-v6',
    title: 'Keybe V6',
    summary:
      'Multi-channel workspace for AI-assisted conversations, CRM, campaigns and sales funnels.',
    category: 'Frontend',
    technologies: ['Vue.js', 'TypeScript', 'Tailwind CSS', 'SCSS'],
    featured: true,
  },
  {
    id: 'biky',
    title: 'Biky',
    summary:
      'Configuration platform for AI assistants, capabilities, personality and visual identity.',
    category: 'Frontend',
    technologies: ['Vue.js', 'TypeScript', 'Tailwind CSS'],
    featured: true,
  },
  {
    id: 'keybe-flows',
    title: 'Keybe Flows',
    summary: 'Visual automation builder for conversational flows and third-party integrations.',
    category: 'Frontend',
    technologies: ['React', 'TypeScript', 'Tailwind CSS'],
    featured: true,
  },
  {
    id: 'keybe-metrics',
    title: 'Keybe Metrics',
    summary: 'Interactive sales, lead and team-performance analytics for customer operations.',
    category: 'Frontend',
    technologies: ['Vue.js', 'TypeScript', 'Data visualization'],
  },
  {
    id: 'cosechapp',
    title: '4.0 Brands — Cosechapp',
    summary: 'Product, order and inventory management experience designed for agricultural teams.',
    category: 'Frontend',
    technologies: ['Vue.js', 'JavaScript', 'CSS'],
  },
  {
    id: 'syncrasy',
    title: 'Syncrasy Medcloud',
    summary: 'Medical information workspace focused on clear operational workflows.',
    category: 'Frontend',
    technologies: ['Angular', 'TypeScript', 'CSS'],
  },
  {
    id: 'tip-top-web',
    title: 'Tip Top English',
    summary: 'Course, materials, classes and meeting management for an English-learning service.',
    category: 'Frontend',
    technologies: ['React', 'JavaScript', 'CSS'],
    repositoryUrl: 'https://github.com/MiguelAngelGutierrezMaya/tip-tip-front',
  },
  {
    id: 'siellano-web',
    title: 'Siellano',
    summary: 'Medical appointments, patients and clinical-history management interface.',
    category: 'Frontend',
    technologies: ['React', 'TypeScript', 'CSS'],
    repositoryUrl: 'https://github.com/MiguelAngelGutierrezMaya/medical-history-web',
  },
  {
    id: 'node-auth',
    title: 'Node Auth Service',
    summary:
      'Authentication and authorization microservice built as a hexagonal-architecture study.',
    category: 'Backend',
    technologies: ['Node.js', 'Express', 'MongoDB', 'Docker'],
    repositoryUrl: 'https://github.com/MiguelAngelGutierrezMaya/hex-architecture-node-js',
    featured: true,
  },
  {
    id: 'keybe-chat-services',
    title: 'Keybe Chat Services',
    summary:
      'Event-driven services for orchestrating conversations across multiple customer channels.',
    category: 'Backend',
    technologies: ['NestJS', 'AWS Lambda', 'SQS', 'Redis', 'MongoDB'],
    featured: true,
  },
  {
    id: 'brands-services',
    title: '4.0 Brands Services',
    summary: 'Monorepo for agricultural products, orders, farmers and inventory operations.',
    category: 'Backend',
    technologies: ['PHP', 'Laravel', 'MySQL'],
  },
  {
    id: 'colegium-services',
    title: 'Colegium Microservices',
    summary: 'Education-domain services for data workflows and digital signatures.',
    category: 'Backend',
    technologies: ['Node.js', 'PostgreSQL', 'RabbitMQ'],
  },
  {
    id: 'tip-top-api',
    title: 'Tip Top English API',
    summary: 'Backend for courses, classes, educational materials and scheduled meetings.',
    category: 'Backend',
    technologies: ['Python', 'Django', 'PostgreSQL', 'Docker'],
    repositoryUrl: 'https://github.com/MiguelAngelGutierrezMaya/tip-top-backend',
  },
  {
    id: 'siellano-api',
    title: 'Siellano Services',
    summary: 'Clinical-domain API for appointments, professionals, patients and medical records.',
    category: 'Backend',
    technologies: ['Python', 'Django', 'MongoDB', 'Docker'],
    repositoryUrl: 'https://github.com/MiguelAngelGutierrezMaya/medical-history-backend',
  },
  {
    id: 'keybe-app',
    title: 'Keybe App',
    summary: 'Cross-platform mobile workspace for customer conversations, CRM and events.',
    category: 'Mobile',
    technologies: ['Flutter', 'Dart', 'Firebase'],
    featured: true,
  },
  {
    id: 'platzi-tweets',
    title: 'Platzi Tweets',
    summary: 'Native iOS social prototype with text, images and location-aware posts.',
    category: 'Mobile',
    technologies: ['Swift', 'UIKit', 'Firebase'],
    repositoryUrl: 'https://github.com/MiguelAngelGutierrezMaya/platzi-tweets',
  },
  {
    id: 'expense-tracker',
    title: 'Expense Tracker',
    summary: 'SwiftUI finance companion for capturing and understanding personal expenses.',
    category: 'Mobile',
    technologies: ['Swift', 'SwiftUI', 'Firebase'],
    repositoryUrl: 'https://github.com/MiguelAngelGutierrezMaya/ai-expense-tracker',
    featured: true,
  },
  {
    id: 'messager',
    title: 'Messager',
    summary: 'Native iOS real-time messaging study focused on UIKit architecture.',
    category: 'Mobile',
    technologies: ['Swift', 'UIKit', 'Firebase'],
    repositoryUrl: 'https://github.com/MiguelAngelGutierrezMaya/Messager',
  },
  {
    id: 'chat-app-ios',
    title: 'Chat App',
    summary: 'Messaging application exploring native iOS patterns and Firebase integration.',
    category: 'Mobile',
    technologies: ['Swift', 'UIKit', 'Firebase'],
    repositoryUrl: 'https://github.com/MiguelAngelGutierrezMaya/ChatAppIOS',
  },
  {
    id: 'make-it-so',
    title: 'Make It So',
    summary: 'Clean SwiftUI task manager backed by Firebase services.',
    category: 'Mobile',
    technologies: ['Swift', 'SwiftUI', 'Firebase'],
    repositoryUrl: 'https://github.com/MiguelAngelGutierrezMaya/make-it-so',
  },
  {
    id: 'netflix-ui',
    title: 'Netflix UI',
    summary: 'Motion and interface study inspired by profile-selection experiences.',
    category: 'Mobile',
    technologies: ['Swift', 'SwiftUI', 'Motion'],
    repositoryUrl: 'https://github.com/MiguelAngelGutierrezMaya/netflix-ui',
  },
  {
    id: 'speech-transcribing',
    title: 'Speech to Text',
    summary: 'Meeting-oriented voice transcription prototype for iOS.',
    category: 'Mobile',
    technologies: ['Swift', 'SwiftUI', 'Speech'],
    repositoryUrl: 'https://github.com/MiguelAngelGutierrezMaya/specch-to-text-transcribing',
  },
  {
    id: 'rick-and-morty',
    title: 'Rick and Morty',
    summary: 'Native episodes and characters explorer built with clean architecture.',
    category: 'Mobile',
    technologies: ['Swift', 'UIKit', 'Clean Architecture'],
    repositoryUrl: 'https://github.com/MiguelAngelGutierrezMaya/rick-and-morty',
  },
];

const experiences: Experience[] = [
  {
    company: 'Keybe',
    role: 'Fullstack & mobile developer · Frontend team lead',
    period: 'Sep 2021 — Jul 2024',
    startDate: '2021-09-13',
    endDate: '2024-07-03',
    summary:
      'Built web and mobile conversation products, led frontend delivery and introduced scalable practices for AI-centered customer experiences.',
    website: 'https://keybe.us/',
  },
  {
    company: 'Colegium',
    role: 'Backend developer',
    period: 'Jan 2021 — Sep 2021',
    startDate: '2021-01-01',
    endDate: '2021-09-12',
    summary:
      'Delivered capabilities and production support for cloud education products and proposed improvements across service operations.',
    website: 'https://www.colegium.com/',
  },
  {
    company: 'PCA Ingeniería',
    role: 'Fullstack developer',
    period: 'Jun 2019 — Dec 2020',
    startDate: '2019-06-18',
    endDate: '2020-12-31',
    summary:
      'Designed custom applications for multiple clients and modernized systems maintained across partner organizations.',
    website: 'https://pcaingenieria.com/site/',
  },
  {
    company: 'Créalo Digital',
    role: 'Fullstack developer',
    period: 'Mar 2019 — Jun 2019',
    startDate: '2019-03-02',
    endDate: '2019-06-17',
    summary:
      'Owned analysis, implementation, documentation, training and support for client-facing software initiatives.',
    website: 'https://crealodigital.com/',
  },
  {
    company: 'JetSet Viajes',
    role: 'Fullstack developer',
    period: 'Dec 2018 — Mar 2019',
    startDate: '2018-12-01',
    endDate: '2019-03-01',
    summary:
      'Maintained business systems, resolved production issues and developed new operational modules from user requirements.',
  },
];

const skillGroups: SkillGroup[] = [
  {
    title: 'Product interfaces',
    description:
      'Accessible, responsive products with thoughtful motion and resilient component systems.',
    skills: ['React', 'Vue.js', 'Angular', 'Astro', 'TypeScript'],
  },
  {
    title: 'Services & cloud',
    description: 'Maintainable APIs, event-driven systems and pragmatic infrastructure decisions.',
    skills: ['Node.js', 'Python', 'PHP', 'AWS', 'Docker', 'PostgreSQL', 'MongoDB', 'MySQL'],
  },
  {
    title: 'Mobile experiences',
    description: 'Native and cross-platform mobile products with clean, user-centered flows.',
    skills: ['Swift', 'SwiftUI', 'UIKit', 'Flutter', 'Kotlin', 'Firebase'],
  },
];

export class StaticPortfolioRepository implements PortfolioRepository {
  getContent(): PortfolioContent {
    return { projects, experiences, skillGroups };
  }
}
