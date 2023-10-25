import { useEffect, useRef } from 'react';

export const useOutsideClick = <T extends HTMLElement = HTMLElement>(callback: () => void) => {
  const elementRef = useRef<T | null>(null);

  useEffect(() => {
    const clickHandler = (e: MouseEvent) => {
      const observingElement = elementRef.current;
      if (!observingElement?.contains(e.target as Node)) {
        callback();
      }
    };
    document.addEventListener('click', clickHandler);
    return () => {
      document.removeEventListener('click', clickHandler);
    };
  }, [elementRef, callback]);

  return elementRef;
};
