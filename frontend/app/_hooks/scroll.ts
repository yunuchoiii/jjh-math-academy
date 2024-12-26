import { useCallback, useEffect, useRef } from 'react';

const useScrollAnimation = (threshold = 0.4) => {
  const observer = useRef<IntersectionObserver | null>(null);
  const elementsRef = useRef<Array<HTMLDivElement | null>>([]);

  const setRef = useCallback((node: HTMLDivElement | null) => {
    if (node) {
      elementsRef.current.push(node);
    }
  }, []);

  useEffect(() => {
    observer.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold }
    );

    elementsRef.current.forEach((el) => {
      // null 체크 추가
      if (el && observer.current) observer.current.observe(el);
    });

    return () => {
      // null 체크 추가
      if (observer.current) {
        elementsRef.current.forEach((el) => {
          if (el) observer.current!.unobserve(el);
        });
      }
    };
  }, [threshold]);

  return setRef;
};

export default useScrollAnimation;
