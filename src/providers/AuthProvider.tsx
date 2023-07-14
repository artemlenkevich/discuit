import { PropsWithChildren, useState } from 'react';

import { useAppDispatch } from '@/hooks/store';
import { subscribeAuthStateChanges } from '@/store/authSlice';

export const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const dispatch = useAppDispatch();

  useState(() => {
    dispatch(subscribeAuthStateChanges());
  });

  return <>{children}</>;
};
