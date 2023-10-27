import { PropsWithChildren, ReactElement, useState } from 'react';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { selectIsInitialized } from '@/store/systemSlice';
import { subscribeAuthStateChanges } from '@/store/userSlice';

interface AuthProviderProps {
  loader: ReactElement;
}

export const AuthProvider: React.FC<PropsWithChildren<AuthProviderProps>> = ({
  children,
  loader,
}) => {
  const dispatch = useAppDispatch();
  const isAppInitialized = useAppSelector(selectIsInitialized);

  useState(() => {
    dispatch(subscribeAuthStateChanges());
  });

  if (!isAppInitialized) {
    return <>{loader}</>;
  }

  return <>{children}</>;
};
