import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { onAuthStateChanged } from 'firebase/auth';

import { auth } from '@/config/firebase';
import { RootState } from '@/store';

import { LogInUserOptions, RegisterUserOptions, logOutUser, loginUser, registerUser } from '../api';

interface UserState {
  isAuthenticated: boolean;
  email: string | null;
  name: string | null;
  uid: string | null;
}

const initialState = {
  isAuthenticated: false,
  email: null,
  name: null,
  uid: null,
} as UserState;

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      state.isAuthenticated = true;
      state.email = action.payload.email;
      state.name = action.payload.name;
      state.uid = action.payload.uid;
    },
    unSetCurrentUser: (state) => {
      state.isAuthenticated = false;
      state.email = null;
      state.name = null;
      state.uid = null;
    },
  },
});

export const registerUserThunk = createAsyncThunk(
  'auth/registerUserThunk',
  async ({ email, password, username }: RegisterUserOptions) => {
    await registerUser({ email, password, username });
  }
);

export const logInUserThunk = createAsyncThunk(
  'auth/logInUserThunk',
  async ({ email, password }: LogInUserOptions) => {
    await loginUser({ email, password });
  }
);

export const subscribeAuthStateChanges = createAsyncThunk(
  'auth/subscribeAuthStateChanges',
  async (_, { dispatch }) => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const { email, displayName, uid } = user;

        await dispatch(
          setCurrentUser({
            name: displayName,
            email,
            uid,
          })
        );
      } else {
        dispatch(unSetCurrentUser());
      }
    });
  }
);

export const logOutUserThunk = createAsyncThunk('auth/logOutUser', async () => {
  const response = await logOutUser();
  return response;
});

export const { setCurrentUser, unSetCurrentUser } = authSlice.actions;

export const { reducer: authReducer } = authSlice;
export const selectAuth = (state: RootState) => state.auth;
