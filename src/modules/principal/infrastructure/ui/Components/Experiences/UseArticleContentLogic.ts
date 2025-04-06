import { useEffect, useRef, useState } from 'react';

export const useArticleContentLogic = () => {
  const [isIntersecting, setIntersecting] = useState(false);
  const articleRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!articleRef.current) {
      return;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (!isIntersecting && entry.isIntersecting) {
        setIntersecting(entry.isIntersecting);
      }
    });

    observer.observe(articleRef.current);

    return () => {
      observer.disconnect();
    };
  }, [isIntersecting]);

  return {
    isIntersecting,
    articleRef,
  };
};
