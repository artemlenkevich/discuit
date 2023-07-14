import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { onAuthStateChanged } from 'firebase/auth';

import { auth } from '@/config/firebase';
import { NormalizedError, normalizeError } from '@/lib';
import { RootState } from '@/store';

import {
  LogInUserOptions,
  RegisterUserOptions,
  logOutUser,
  loginUser,
  registerUser,
} from '../../api';

interface UserState {
  isAuthenticated: boolean;
  email: string | null;
  name: string | null;
  uid: string | null;
  error: NormalizedError | null;
}

const initialState = {
  isAuthenticated: false,
  email: null,
  name: null,
  uid: null,
  error: null,
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
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const registerUserThunk = createAsyncThunk(
  'auth/registerUserThunk',
  async ({ email, password, username }: RegisterUserOptions, { dispatch }) => {
    try {
      await registerUser({ email, password, username });
    } catch (e) {
      dispatch(setError(normalizeError(e)));
    }
  }
);

export const logInUserThunk = createAsyncThunk(
  'auth/logInUserThunk',
  async ({ email, password }: LogInUserOptions, { dispatch }) => {
    try {
      await loginUser({ email, password });
    } catch (e) {
      dispatch(setError(normalizeError(e)));
    }
  }
);

export const subscribeAuthStateChanges = createAsyncThunk(
  'auth/subscribeAuthStateChanges',
  async (_, { dispatch }) => {
    try {
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
    } catch (e) {
      dispatch(setError(normalizeError(e)));
    }
  }
);

export const logOutUserThunk = createAsyncThunk('auth/logOutUser', async (_, { dispatch }) => {
  try {
    await logOutUser();
  } catch (e) {
    dispatch(setError(normalizeError(e)));
  }
});

export const { setCurrentUser, unSetCurrentUser, setError } = authSlice.actions;

export const { reducer: authReducer } = authSlice;
export const selectAuth = (state: RootState) => state.auth;
