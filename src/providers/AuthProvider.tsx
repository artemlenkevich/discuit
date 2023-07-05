import { PropsWithChildren, useState } from 'react';

import { subscribeAuthStateChanges } from '@/features/auth';
import { useAppDispatch } from '@/hooks/store';

export const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const dispatch = useAppDispatch();

  useState(() => {
    dispatch(subscribeAuthStateChanges());
  });

  return <>{children}</>;
};
