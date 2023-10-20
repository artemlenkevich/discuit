import { useRef } from 'react';
import { Location, useLocation } from 'react-router-dom';

export const useIsLocationHasChanged = () => {
  const ref = useRef<Location | null>(null);
  const location = useLocation();
  if (ref.current === null) {
    ref.current = location;
    return false;
  } else if (location !== ref.current) {
    return true;
  }
};
