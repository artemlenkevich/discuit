import { FirebaseError } from 'firebase/app';

export interface NormalizedError {
  name: string;
  message: string;
}

/* Convert an error to a common error format before saving to a store*/
export const normalizeError = (err: unknown): NormalizedError => {
  if (err instanceof FirebaseError || err instanceof Error) {
    return { name: err.name, message: err.message };
  }

  return { name: 'unknown error', message: JSON.stringify(err) };
};
