//
// React dependencies
//
import { useEffect, useRef, useState } from 'react';

interface UseLazyComponentOptions {
  rootMargin?: string;
  threshold?: number;
}

export const useLazyComponent = (options: UseLazyComponentOptions = {}) => {
  const { rootMargin = '200px', threshold = 0.1 } = options;
  const [shouldLoad, setShouldLoad] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element || shouldLoad) return;

    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin, threshold }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shouldLoad]);

  return { shouldLoad, elementRef };
};
