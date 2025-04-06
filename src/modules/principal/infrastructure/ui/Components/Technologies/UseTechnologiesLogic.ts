//
// React dependencies
//
import { useEffect, useRef, useState } from 'react';

//
// Models
//
import type { Technology } from '@principal/models/Technology';

export const useTechnologiesLogic = () => {
  //
  // Constants
  //
  const [technologies, setTechnologies] = useState<Technology[]>([]);

  const [isIntersecting, setIntersecting] = useState(false);
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!divRef.current) {
      return;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (!isIntersecting && entry.isIntersecting) {
        setIntersecting(entry.isIntersecting);
      }
    });

    observer.observe(divRef.current);

    return () => {
      observer.disconnect();
    };
  }, [isIntersecting]);

  useEffect(() => {
    if (isIntersecting) {
      const importImages = async () => {
        const docker: ImageMetadata = (await import('./utils/assets/docker.webp')).default;
        const flutter: ImageMetadata = (await import('./utils/assets/flutter.webp')).default;
        const kotlin: ImageMetadata = (await import('./utils/assets/kotlin.webp')).default;
        const swift: ImageMetadata = (await import('./utils/assets/swift.webp')).default;
        const mongodb: ImageMetadata = (await import('./utils/assets/mongodb.webp')).default;
        const nodejs: ImageMetadata = (await import('./utils/assets/nodejs.webp')).default;
        const postgresql: ImageMetadata = (await import('./utils/assets/postgresql.webp')).default;
        const react: ImageMetadata = (await import('./utils/assets/reactjs.webp')).default;
        const astro: ImageMetadata = (await import('./utils/assets/astro.webp')).default;
        const angular: ImageMetadata = (await import('./utils/assets/angular.webp')).default;
        const aws: ImageMetadata = (await import('./utils/assets/aws.webp')).default;
        const vuejs: ImageMetadata = (await import('./utils/assets/vuejs.webp')).default;
        const mysql: ImageMetadata = (await import('./utils/assets/mysql.webp')).default;
        const php: ImageMetadata = (await import('./utils/assets/php.webp')).default;
        const python: ImageMetadata = (await import('./utils/assets/python.webp')).default;

        setTechnologies([
          {
            name: 'Docker',
            icon: docker,
          },
          {
            name: 'Flutter',
            icon: flutter,
          },
          {
            name: 'Kotlin',
            icon: kotlin,
          },
          {
            name: 'Swift',
            icon: swift,
          },
          {
            name: 'MongoDB',
            icon: mongodb,
          },
          {
            name: 'NodeJS',
            icon: nodejs,
          },
          {
            name: 'PostgreSQL',
            icon: postgresql,
          },
          {
            name: 'ReactJS',
            icon: react,
          },
          {
            name: 'Astro',
            icon: astro,
          },
          {
            name: 'Angular',
            icon: angular,
          },
          {
            name: 'AWS',
            icon: aws,
          },
          {
            name: 'VueJS',
            icon: vuejs,
          },
          {
            name: 'MySQL',
            icon: mysql,
          },
          {
            name: 'PHP',
            icon: php,
          },
          {
            name: 'Python',
            icon: python,
          },
        ]);
      };
      importImages().then();
    }
  }, [isIntersecting]);

  return {
    technologies,
    isIntersecting,
    divRef,
  };
};
