import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { RootState } from '@/store';
import { Modals } from '@/types/modals';

type UserState = {
  [key in keyof typeof Modals]: boolean;
};

const initialState = {
  logInModal: false,
  signUpModal: false,
} as UserState;

export const modalsSlice = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    openModal: (state, action: PayloadAction<Modals>) => {
      state[action.payload] = true;
    },
    closeModal: (state, action: PayloadAction<Modals>) => {
      state[action.payload] = false;
    },
  },
});

export const { openModal, closeModal } = modalsSlice.actions;

export const { reducer: modalsReducer } = modalsSlice;

export const selectModals = (state: RootState) => state.modals;
