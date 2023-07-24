export const userInputErrorCodes: Record<string, string> = {
  'auth/wrong-password': 'The password is invalid or the user does not have a password.',
  'auth/invalid-email': 'The email address is badly formatted.',
  'auth/email-already-in-use': 'The email address is already in use by another account.',
  'auth/email-already-exists':
    'The provided email is already in use by an existing user. Each user must have a unique email.',
  'auth/invalid-display-name':
    'The provided value for the displayName user property is invalid. It must be a non-empty string.',
  'auth/invalid-password':
    'The provided value for the password user property is invalid. It must be a string with at least six characters.',
  'auth/invalid-photo-url':
    'The provided value for the photoURL user property is invalid. It must be a string URL.',
  'auth/phone-number-already-exists':
    'The provided phoneNumber is already in use by an existing user. Each user must have a unique phoneNumber.',
  'auth/credential-already-in-use':
    'The email template corresponding to this action contains invalid characters in its message. Please fix by going to the Auth email templates section in the Firebase Console.',
  'auth/invalid-phone-number':
    'The format of the phone number provided is incorrect. Please enter the phone number in a format that can be parsed into E.164 format. E.164 phone numbers are written in the format [+][country code][subscriber number including area code].',
  'auth/network-request-failed':
    'A network AuthError (such as timeout, interrupted connection or unreachable host) has occurred.',
  'auth/no-auth-event': 'An internal AuthError has occurred.',
  'auth/no-such-provider': 'User was not linked to an account with the given provider.',
};
