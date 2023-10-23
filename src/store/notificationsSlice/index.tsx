import { createAsyncThunk } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';

import { ErrorNotification } from '@/components/ErrorNotification';
import { AppDispatch, RootState } from '@/types/redux';
import { normalizeError } from '@/utils/normalize-error';

/* A distinct slice is used to inversion a dependency(react-toasts library) */
export const showErrorNotification = createAsyncThunk<
  void,
  unknown,
  { dispatch: AppDispatch; state: RootState }
>('notifications/showErrorNotification', async (e) => {
  console.error(e);
  const { message, name } = normalizeError(e);
  toast.error(() => <ErrorNotification name={name} message={message} />, { duration: 100000 });
});
