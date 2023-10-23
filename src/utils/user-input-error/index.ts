import { FirebaseError } from 'firebase/app';

import { userInputErrorCodes } from '@/constants/user-input-error-codes';

export const errorCodeToMessage = (code: string) => {
  return userInputErrorCodes[code];
};

/* Check whether error was caused by user wrong input */
export const isUserInputError = (e: unknown): e is FirebaseError => {
  if (e instanceof FirebaseError && e.code in userInputErrorCodes) {
    return true;
  }
  return false;
};
