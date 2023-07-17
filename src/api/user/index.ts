import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';

import { auth, db } from '@/lib/firebase';

export interface RegisterUserWithEmailAndPasswordOptions {
  email: string;
  password: string;
  username: string;
}

export interface LogInUserWithEmailAndPasswordOptions {
  email: string;
  password: string;
}

export const registerUserWithEmailAndPassword = async ({
  email,
  password,
  username,
}: RegisterUserWithEmailAndPasswordOptions) => {
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
