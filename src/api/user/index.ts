import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

import { auth, db } from '@/lib/firebase';

export interface RegisterUserWithEmailAndPasswordOptions {
  email: string;
  password: string;
}

export interface LogInUserWithEmailAndPasswordOptions {
  email: string;
  password: string;
}

export interface UpdateUserProfileOptions {
  username?: string;
  photoURL?: string;
}

export const registerUserWithEmailAndPassword = async ({
  email,
  password,
}: RegisterUserWithEmailAndPasswordOptions) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    return res;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const updateUserProfile = async ({ username, photoURL }: UpdateUserProfileOptions) => {
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
}: LogInUserWithEmailAndPasswordOptions) => {
  try {
    return await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const getUserById = async (id: string) => {
  try {
    const q = doc(db, 'users', id);
    const querySnapsot = await getDoc(q);
    return querySnapsot.data();
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
