import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { onAuthStateChanged } from 'firebase/auth';

import {
  LogInUserWithEmailAndPasswordParams,
  UpdateUserProfileParams,
  logOutUser,
  loginUserWithEmailAndPassword,
  registerUserWithEmailAndPassword,
  updateUserProfile,
} from '@/api/user';
import { auth } from '@/lib/firebase';
import { showErrorNotification } from '@/store/notificationsSlice';
import { AppDispatch, RootState } from '@/types/redux';
import { NormalizedError, normalizeError } from '@/utils/normalize-error';
import { errorCodeToMessage, isUserInputError } from '@/utils/user-input-error';

interface UserState {
  isAuthenticated: boolean;
  email: string | null;
  name: string | null;
  uid: string | null;
  error: NormalizedError | null;
}

type UpdateUserPayload = Pick<UserState, 'email' | 'name'>;

interface RegisterUserWithEmailThunkParams {
  username: string;
  email: string;
  password: string;
}

interface ValidationError {
  errorMessage: string;
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

export const registerUserWithEmailThunk = createAsyncThunk<
  ValidationError | void,
  RegisterUserWithEmailThunkParams,
  { dispatch: AppDispatch; state: RootState }
>('user/registerUserWithEmailThunk', async ({ email, username, password }, { dispatch }) => {
  try {
    await registerUserWithEmailAndPassword({ email, password });
    await dispatch(updateUserProfileThunk({ username }));
  } catch (e) {
    if (isUserInputError(e)) {
      /* Return a validation error message to handle in onSubmit handler */
      return { errorMessage: errorCodeToMessage(e.code) };
    }

    dispatch(showErrorNotification(e));
  }
});

export const logInUserWithEmailAndPasswordThunk = createAsyncThunk<
  ValidationError | void,
  LogInUserWithEmailAndPasswordParams,
  { dispatch: AppDispatch; state: RootState }
>('user/logInUserThunk', async ({ email, password }, { dispatch }) => {
  try {
    await loginUserWithEmailAndPassword({ email, password });
  } catch (e) {
    if (isUserInputError(e)) {
      /* Return a validation error message to handle in onSubmit handler */
      return { errorMessage: errorCodeToMessage(e.code) };
    }

    dispatch(showErrorNotification(e));
  }
});

export const updateUserProfileThunk = createAsyncThunk<
  void,
  UpdateUserProfileParams,
  { dispatch: AppDispatch; state: RootState }
>('user/updateUserProfileThunk', async ({ username, photoURL }, { dispatch }) => {
  try {
    const updatedUser = await updateUserProfile({ username, photoURL });
    const { displayName, email } = updatedUser;

    dispatch(updateUser({ name: displayName, email }));
  } catch (e) {
    dispatch(showErrorNotification(e));
  }
});

export const subscribeAuthStateChanges = createAsyncThunk<
  void,
  void,
  { dispatch: AppDispatch; state: RootState }
>('user/subscribeAuthStateChanges', async (_, { dispatch }) => {
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
    dispatch(showErrorNotification(e));
  }
});

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
export const selectIsAuthenticated = (state: RootState) => state.user.isAuthenticated;
