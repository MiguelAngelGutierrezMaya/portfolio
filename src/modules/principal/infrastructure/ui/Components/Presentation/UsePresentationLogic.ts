//
// React dependencies
//
import { useEffect, useMemo, useRef, useState } from 'react';

//
// Hooks
//
import { useReduceMotion } from '@shared/infrastructure/hooks/useReduceMotion';
import { useIsServerSide } from '@shared/infrastructure/hooks/useIsServerSide';

export const usePresentationLogic = () => {
  //
  // Hooks
  //
  const intervalRef = useRef<number>();
  const prefersReduceMotion = useReduceMotion();
  const isServerSide = useIsServerSide();
  const [keywordIndex, setKeywordIndex] = useState(0);
  const [letterIndex, setLetterIndex] = useState(0);

  //
  // Constants
  //
  const about: string =
    'Full stack developer with B2 English and more than 5+ years of experience developing and maintaining web technology solutions and backend services, also more than 3+ years of experience developing cross-platform mobile solutions to address small business requirements.\n' +
    'Experience leading and teaching small frontend teams to achieve business goals by developing scalable solutions, addressing business use cases and applying clean code techniques.\n' +
    'I am fully interested in mobile native development, constant growth, continuous learning and AI at the core in my work experience using development tools with generative AI and vendor services to address different use cases related to AI interactions and actions';

  const keywords = useMemo(
    () => ['Frontend developer', 'Backend developer', 'Mobile developer'],
    []
  );
  const title = `${
    prefersReduceMotion ? keywords[keywordIndex] : keywords[keywordIndex].substring(0, letterIndex)
  }`;
  const fullTitle: string = 'Frontend developer, Backend developer, Mobile developer';

  //
  // Hooks
  //
  useEffect(() => {
    intervalRef.current = window.setInterval(() => {
      setLetterIndex(prev => prev + 1);
    }, 100);

    return () => window.clearInterval(intervalRef.current);
  }, [keywordIndex]);

  useEffect(() => {
    if (!prefersReduceMotion && letterIndex > keywords[keywordIndex].length) {
      clearInterval(intervalRef.current);
      setTimeout(() => {
        setKeywordIndex(prev => {
          if (prev + 1 === keywords.length) {
            return 0;
          }

          return prev + 1;
        });
        setLetterIndex(0);
      }, 1000);
    }
  }, [letterIndex, prefersReduceMotion, keywordIndex, keywords]);

  useEffect(() => {
    if (prefersReduceMotion) {
      const interval = setInterval(() => {
        setKeywordIndex(prev => {
          if (prev + 1 === keywords.length) {
            return 0;
          }

          return prev + 1;
        });
      }, 2000);

      return () => {
        clearInterval(interval);
      };
    }
  }, [prefersReduceMotion, keywords.length]);

  return {
    about,
    title,
    fullTitle,
    isServerSide,
    keywords,
  };
};
