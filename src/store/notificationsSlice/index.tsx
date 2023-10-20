import { createAsyncThunk } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';

import { ErrorNotification } from '@/components/ErrorNotification';
import { AppDispatch, RootState } from '@/types/redux';
import { NormalizedError } from '@/utils/api-error';

/* A distinct slice is used to inversion a dependency(react-toasts library) */
export const showErrorNotification = createAsyncThunk<
  void,
  NormalizedError,
  { dispatch: AppDispatch; state: RootState }
>('notifications/showErrorNotification', async (err) => {
  const { message, name } = err;

  toast(() => <ErrorNotification name={name} message={message} />);
});
