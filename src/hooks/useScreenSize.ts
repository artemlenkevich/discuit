import { debounce } from 'lodash';
import { useState, useEffect } from 'react';

import { Breakpoints } from '@/constants/breakpoints';

type BreakpointsState = {
  [key in keyof typeof Breakpoints]: boolean;
};

interface SizesState {
  w: number;
  h: number;
}

type Sign = '<' | '>';

const calculateBreakpoints = (screenWidth: number, sign: Sign) => {
  const screenSizes = {} as BreakpointsState;

  for (const key in Breakpoints) {
    //Iterate only non-number keys
    if (isNaN(+key)) {
      switch (sign) {
        case '<':
          screenSizes[key] = screenWidth < +Breakpoints[key];
          break;
        case '>':
          screenSizes[key] = screenWidth > +Breakpoints[key];
          break;
      }
    }
  }

  return screenSizes;
};

const initializeState = (sign: Sign) => () => {
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;
  const screenSizes = {
    w: screenWidth,
    h: screenHeight,
  };
  const screenBreakpoints = calculateBreakpoints(screenWidth, sign);

  return { ...screenSizes, ...screenBreakpoints };
};

// A sign argument determines a sign for a Breakpoints match calculation;
const useScreenSize = (sign: Sign = '<') => {
  const [screenSize, setScreenSize] = useState<BreakpointsState & SizesState>(
    initializeState(sign)
  );

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;

      const screenBreakpoints = calculateBreakpoints(screenWidth, sign);

      setScreenSize({
        w: screenWidth,
        h: screenHeight,
        ...screenBreakpoints,
      });
    };
    const debouncedHandleResie = debounce(handleResize, 100);

    window.addEventListener('resize', debouncedHandleResie);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [sign]);

  return screenSize;
};

export default useScreenSize;
