import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';

import { auth, db } from '@/config';

export interface RegisterUserOptions {
  email: string;
  password: string;
  username: string;
}

export interface LogInUserOptions {
  email: string;
  password: string;
}

export const registerUser = async ({ email, password, username }: RegisterUserOptions) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);

    await updateProfile(res.user, {
      displayName: username,
    });

    await setDoc(doc(db, 'users', res.user.uid), {
      role: 'user',
    });

    return res;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const loginUser = async ({ email, password }: LogInUserOptions) => {
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
