import { createSlice } from '@reduxjs/toolkit';

import { RootState } from '@/store';

interface SystemState {
  isInitialized: boolean;
}

const initialState = {
  isInitialized: false,
} as SystemState;

export const systemSlice = createSlice({
  name: 'system',
  initialState,
  reducers: {
    setIsInitialized: (state, action) => {
      state.isInitialized = action.payload;
    },
  },
});

export const { setIsInitialized } = systemSlice.actions;

export const { reducer: systemReducer } = systemSlice;

export const selectIsInitialized = (state: RootState) => state.system.isInitialized;
