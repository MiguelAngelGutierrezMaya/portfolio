//
// Models
//
import type { Item } from '@principal/models/Item';

const PUBLIC_FIREBASE_URL = import.meta.env.PUBLIC_FIREBASE_URL;

export const useMobileCarouselLogic = () => {
  //
  // Constants
  //
  const items: Item[] = [
    {
      title: 'Keybe App',
      description:
        'Keybe App is a multi-channel application for managing customer conversation, CRM, and events',
      githubLink: '',
      image: `${PUBLIC_FIREBASE_URL}/keybe-app.webp?alt=media&token=e3f89a4f-654c-4ed6-b7e3-a9754e036004`,
      technologies: ['flutter', 'dart', 'firebase'],
    },
    {
      title: 'Platzi Tweets',
      description:
        'Platzi Tweets is a learning project consisting of a mobile application for managing posts by adding image, text or location.',
      githubLink: 'https://github.com/MiguelAngelGutierrezMaya/platzi-tweets',
      image: `${PUBLIC_FIREBASE_URL}/tweets.webp?alt=media&token=7c9f3ca5-3364-4fbe-b1dc-2ae7e36e64b0`,
      technologies: ['swift', 'firebase'],
    },
    {
      title: 'Expense Tracker',
      description:
        'Expense Tracker is a learning project consisting of a mobile application for managing expenses.',
      githubLink: 'https://github.com/MiguelAngelGutierrezMaya/ai-expense-tracker',
      image: `${PUBLIC_FIREBASE_URL}/expense-tracker.webp?alt=media&token=f88d305b-27b5-42fd-8f65-ebe93e525e7d`,
      technologies: ['swift', 'swiftUI', 'firebase'],
    },
    {
      title: 'Messager',
      description:
        'Messager is a learning project consisting of a mobile application for messaging.',
      githubLink: 'https://github.com/MiguelAngelGutierrezMaya/Messager',
      image: `${PUBLIC_FIREBASE_URL}/messenger.webp?alt=media&token=1120f9e4-1934-4cb8-ae09-dbfdd691d231`,
      technologies: ['swift', 'UIKit', 'firebase'],
    },
    {
      title: 'Chat App',
      description:
        'Chat App is a learning project consisting of a mobile application for messaging.',
      githubLink: 'https://github.com/MiguelAngelGutierrezMaya/ChatAppIOS',
      image: `${PUBLIC_FIREBASE_URL}/chatapp.webp?alt=media&token=bc53cfd0-6dcc-4b06-8d35-996907d2f784`,
      technologies: ['swift', 'UIKit', 'firebase'],
    },
    {
      title: 'Make it so',
      description:
        'Make it so is a learning project consisting of a mobile application for managing tasks.',
      githubLink: 'https://github.com/MiguelAngelGutierrezMaya/make-it-so',
      image: `${PUBLIC_FIREBASE_URL}/make-it-so.webp?alt=media&token=82980d74-8df3-405d-a1c5-74ae71f955b4`,
      technologies: ['swift', 'swiftUI', 'firebase'],
    },
    {
      title: 'Netflix UI',
      description:
        'Netflix UI is a learning project consisting of a simple UI simulating netflix introduction and profile selection.',
      githubLink: 'https://github.com/MiguelAngelGutierrezMaya/netflix-ui',
      image: `${PUBLIC_FIREBASE_URL}/netflix.webp?alt=media&token=586feff5-231f-4ff1-a8f9-6772966bc438`,
      technologies: ['swift', 'swiftUI'],
    },
    {
      title: 'Speech to text transcribing',
      description:
        'Speech to text transcribing is a learning project consisting of a mobile application for transcribing speech to text simulating a meeting',
      githubLink: 'https://github.com/MiguelAngelGutierrezMaya/specch-to-text-transcribing',
      image: `${PUBLIC_FIREBASE_URL}/transcribe-record.webp?alt=media&token=7239cfa1-8054-44fb-9e7e-de0fbc307248`,
      technologies: ['swift', 'swiftUI'],
    },
    {
      title: 'Rick and Morty',
      description:
        "Rick and Morty is a learning project consisting of a mobile application for managing episodes and characters of the Rick and Morty' series.",
      githubLink: 'https://github.com/MiguelAngelGutierrezMaya/rick-and-morty',
      image: `${PUBLIC_FIREBASE_URL}/rick-and-morty.webp?alt=media&token=cf817f63-47a7-4d2d-9f1b-35a9f3d26f7b`,
      technologies: ['swift', 'UIKit', 'clean architecture'],
    },
  ];

  return {
    items,
  };
};
