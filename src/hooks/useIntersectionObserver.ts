import { RefObject, useCallback, useEffect, useRef } from 'react';

interface IntersectionObserverParams {
  elementRef: RefObject<Element>;
  options: IntersectionObserverInit;
}

export const useIntersectionObserver = ({
  elementRef,
  options: { threshold = 0, root = null, rootMargin = '0%' },
}: IntersectionObserverParams) => {
  const handlerRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    const observerParams = { threshold, root, rootMargin };
    const observer = new IntersectionObserver(([entry]: IntersectionObserverEntry[]): void => {
      if (entry.isIntersecting) {
        handlerRef.current?.();
      }
    }, observerParams);

    let observingElement: Element;
    if (elementRef.current) {
      observingElement = elementRef.current;
      observer.observe(observingElement);
    }

    return () => {
      observer.unobserve(observingElement);
    };
  }, [elementRef, threshold, root, rootMargin]);

  const memorizedSubscribe = useCallback((callback: () => void) => {
    handlerRef.current = callback;
  }, []);

  return memorizedSubscribe;
};
