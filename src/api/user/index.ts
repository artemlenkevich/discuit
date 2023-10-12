import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'firebase/auth';

import { auth } from '@/lib/firebase';

export interface RegisterUserWithEmailParams {
  email: string;
  password: string;
}

export interface LogInUserWithEmailAndPasswordParams {
  email: string;
  password: string;
}

export interface UpdateUserProfileParams {
  username?: string;
  photoURL?: string;
}

export const registerUserWithEmailAndPassword = async ({
  email,
  password,
}: RegisterUserWithEmailParams) => {
  return await createUserWithEmailAndPassword(auth, email, password);
};

export const updateUserProfile = async ({ username, photoURL }: UpdateUserProfileParams) => {
  try {
    const user = auth.currentUser;
    if (!user) throw new Error('There is no current user');
    await updateProfile(user, {
      displayName: username,
      photoURL,
    });

    return user;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const loginUserWithEmailAndPassword = async ({
  email,
  password,
}: LogInUserWithEmailAndPasswordParams) => {
  try {
    return await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const logOutUser = async () => {
  try {
    return await signOut(auth);
  } catch (err) {
    console.error(err);
    throw err;
  }
};
