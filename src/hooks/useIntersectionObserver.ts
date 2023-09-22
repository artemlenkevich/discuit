import { useEffect, useRef } from 'react';

interface IntersectionObserverParams {
  intersectionHandler: () => void;
  options?: IntersectionObserverInit;
}

export const useIntersectionObserver = ({
  intersectionHandler,
  options,
}: IntersectionObserverParams) => {
  const observerTarget = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        console.log('intersected');
        intersectionHandler();
      }
    }, options);

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current);
      }
    };
  }, [observerTarget]);

  return { observerTarget };
};
