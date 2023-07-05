import { FirebaseError } from 'firebase/app';

export type ApiResponse<D> = Success<D> | Failed;

interface Success<D> {
  error: null;
  data: D;
}

interface Failed {
  error: GenericError;
  data: null;
}

interface GenericError {
  name: string;
  message: string;
}

/* Convert an error to a common error format */
export const toGenericError = (err: unknown): GenericError => {
  if (err instanceof FirebaseError || err instanceof Error) {
    return { name: err.name, message: err.message };
  }

  return { name: 'unknown error', message: JSON.stringify(err) };
};
