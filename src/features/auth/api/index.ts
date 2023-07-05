import {
  UserCredential,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { DocumentData, doc, getDoc, setDoc } from 'firebase/firestore';

import { auth, db } from '@/config';
import { ApiResponse, toGenericError } from '@/lib';

export interface RegisterUserOptions {
  email: string;
  password: string;
  username: string;
}

export interface LogInUserOptions {
  email: string;
  password: string;
}

export const registerUser = async ({
  email,
  password,
  username,
}: RegisterUserOptions): Promise<ApiResponse<UserCredential>> => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);

    await updateProfile(res.user, {
      displayName: username,
    });

    await setDoc(doc(db, 'users', res.user.uid), {
      role: 'user',
    });

    return { data: res, error: null };
  } catch (err) {
    return { data: null, error: toGenericError(err) };
  }
};

export const loginUser = async ({
  email,
  password,
}: LogInUserOptions): Promise<ApiResponse<UserCredential>> => {
  try {
    const res = await signInWithEmailAndPassword(auth, email, password);
    return { data: res, error: null };
  } catch (err) {
    return { data: null, error: toGenericError(err) };
  }
};

export const getUserById = async (id: string): Promise<ApiResponse<DocumentData | undefined>> => {
  try {
    const q = doc(db, 'users', id);
    const querySnapsot = await getDoc(q);
    return { data: querySnapsot.data(), error: null };
  } catch (err) {
    return { data: null, error: toGenericError(err) };
  }
};

export const logOutUser = async (): Promise<ApiResponse<null>> => {
  try {
    await signOut(auth);
    return { data: null, error: null };
  } catch (err) {
    return { data: null, error: toGenericError(err) };
  }
};
