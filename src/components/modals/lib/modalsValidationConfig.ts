import * as Yup from 'yup';

export const modalsValidationConfig = {
  username: Yup.string()
    .max(15, 'Must be 15 characters or less')
    .min(3, 'Must be 3 characters or more')
    .required('Required'),
  email: Yup.string().email('Invalid email address').required('Required'),
  password: Yup.string().min(6, 'Must be 6 characters or more').required('Required'),
};
