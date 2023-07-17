import { configureStore } from '@reduxjs/toolkit';

import { authReducer } from './authSlice';
import { modalsReducer } from './modalsSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    modals: modalsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
