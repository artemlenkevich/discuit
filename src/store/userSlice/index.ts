import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { onAuthStateChanged } from 'firebase/auth';

import {
  LogInUserWithEmailAndPasswordOptions,
  RegisterUserWithEmailAndPasswordOptions,
  UpdateUserProfileOptions,
  logOutUser,
  loginUserWithEmailAndPassword,
  registerUserWithEmailAndPassword,
  updateUserProfile,
} from '@/api/user';
import { auth } from '@/lib/firebase';
import { RootState } from '@/store';
import { NormalizedError, normalizeError } from '@/utils/api-error';

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

export const userSlice = createSlice({
  name: 'user',
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

export const registerUserWithEmailAndPasswordThunk = createAsyncThunk(
  'user/registerUserWithEmailAndPasswordThunk',
  async ({ email, password }: RegisterUserWithEmailAndPasswordOptions, { dispatch }) => {
    try {
      await registerUserWithEmailAndPassword({ email, password });
    } catch (e) {
      dispatch(setError(normalizeError(e)));
    }
  }
);

export const updateUserProfileThunk = createAsyncThunk(
  'user/updateUserProfileThunk',
  async ({ name, photoURL }: UpdateUserProfileOptions, { dispatch }) => {
    try {
      await updateUserProfile({ name, photoURL });
    } catch (e) {
      dispatch(setError(normalizeError(e)));
    }
  }
);

export const logInUserWithEmailAndPasswordThunk = createAsyncThunk(
  'user/logInUserThunk',
  async ({ email, password }: LogInUserWithEmailAndPasswordOptions, { dispatch }) => {
    try {
      await loginUserWithEmailAndPassword({ email, password });
    } catch (e) {
      dispatch(setError(normalizeError(e)));
    }
  }
);

export const subscribeAuthStateChanges = createAsyncThunk(
  'user/subscribeAuthStateChanges',
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

export const logOutUserThunk = createAsyncThunk('user/logOutUser', async (_, { dispatch }) => {
  try {
    await logOutUser();
  } catch (e) {
    dispatch(setError(normalizeError(e)));
  }
});

export const { setCurrentUser, unSetCurrentUser, setError } = userSlice.actions;

export const { reducer: userReducer } = userSlice;
export const selectUser = (state: RootState) => state.user;
