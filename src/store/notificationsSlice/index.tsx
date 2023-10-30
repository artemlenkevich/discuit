import { createAsyncThunk } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';

import { Notification } from '@/components/Notification';
import { AppDispatch, RootState } from '@/store';
import { normalizeError } from '@/utils/normalize-error';

/* A distinct slice is used to inversion a dependency(react-toasts library) */
export const showErrorNotification = createAsyncThunk<
  void,
  unknown,
  { dispatch: AppDispatch; state: RootState }
>('notifications/showErrorNotification', async (e) => {
  console.error(e);
  const { message, name } = normalizeError(e);
  toast.error(() => <Notification name={name} message={message} />);
});

export const showWarnNotification = createAsyncThunk<
  void,
  { name: string; message: string },
  { dispatch: AppDispatch; state: RootState }
>('notifications/showWarnNotification', async ({ name, message }) => {
  toast(() => <Notification name={name} message={message} />);
});
