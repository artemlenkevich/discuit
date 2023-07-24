import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { FirebaseError } from 'firebase/app';
import { onAuthStateChanged } from 'firebase/auth';

import {
  LogInUserWithEmailAndPasswordOptions,
  UpdateUserProfileOptions,
  logOutUser,
  loginUserWithEmailAndPassword,
  registerUserWithEmailAndPassword,
  updateUserProfile,
} from '@/api/user';
import { auth } from '@/lib/firebase';
import { RootState } from '@/store';
import { NormalizedError, normalizeError } from '@/utils/api-error';
import { errorCodeToMessage, isUserInputError } from '@/utils/user-input-error';

interface UserState {
  isAuthenticated: boolean;
  email: string | null;
  name: string | null;
  uid: string | null;
  error: NormalizedError | null;
}

type UpdateUserPayload = Pick<UserState, 'email' | 'name'>;

interface RegisterUserWithEmailThunkOptions {
  username: string;
  email: string;
  password: string;
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
    setUser: (state, action) => {
      state.isAuthenticated = true;
      state.email = action.payload.email;
      state.name = action.payload.name;
      state.uid = action.payload.uid;
    },
    unSetUser: (state) => {
      state.isAuthenticated = false;
      state.email = null;
      state.name = null;
      state.uid = null;
    },
    updateUser: (state, action: PayloadAction<UpdateUserPayload>) => {
      state.email = action.payload.email;
      state.name = action.payload.name;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const registerUserWithEmailThunk = createAsyncThunk(
  'user/registerUserWithEmailThunk',
  async ({ email, username, password }: RegisterUserWithEmailThunkOptions, { dispatch }) => {
    try {
      await registerUserWithEmailAndPassword({ email, password });
      await dispatch(updateUserProfileThunk({ username }));
    } catch (e) {
      if (e instanceof FirebaseError && isUserInputError(e)) {
        /* Return a error message to handle in onSubmit handler */
        return { errorMessage: errorCodeToMessage(e.code) };
      }

      dispatch(setError(normalizeError(e)));
    }
  }
);

export const updateUserProfileThunk = createAsyncThunk(
  'user/updateUserProfileThunk',
  async ({ username, photoURL }: UpdateUserProfileOptions, { dispatch }) => {
    try {
      const updatedUser = await updateUserProfile({ username, photoURL });
      const { displayName, email } = updatedUser;

      dispatch(updateUser({ name: displayName, email }));
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
            setUser({
              name: displayName,
              email,
              uid,
            })
          );
        } else {
          dispatch(unSetUser());
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

export const { setUser, unSetUser, updateUser, setError } = userSlice.actions;

export const { reducer: userReducer } = userSlice;
export const selectUser = (state: RootState) => state.user;
