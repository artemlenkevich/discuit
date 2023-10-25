import { Form, Formik, FormikHelpers } from 'formik';
import { useState } from 'react';
import * as Yup from 'yup';

import { Button } from '@/components/ui/Button';
import { useAppDispatch, useAppSelector } from '@/hooks/store';
import { validationConfig } from '@/lib/validationConfig';
import { closeModal, openModal, selectModals } from '@/store/modalsSlice';
import { registerUserWithEmailThunk } from '@/store/userSlice';
import { Modals } from '@/types/modals';

import { BaseModal } from '../BaseModal';
import { ModalInput } from '../ModalInput';

import styles from './SignUpModal.module.scss';

interface FormValues {
  username: string;
  email: string;
  password: string;
}

const initialValues: FormValues = {
  username: '',
  email: '',
  password: '',
};

const { username, email, password } = validationConfig;

const validationSchema = Yup.object({
  username,
  email,
  password,
});

export const SignUpModal: React.FC = () => {
  const dispatch = useAppDispatch();
  const modals = useAppSelector(selectModals);

  const [errorMessage, setErrorMessage] = useState('');

  const isOpen = modals.signUpModal;

  const onCloseClick = () => dispatch(closeModal(Modals.signUpModal));

  /* Clean an error after form values have been changed */
  const onFormChange = () => {
    if (errorMessage) setErrorMessage('');
  };

  const onFormSubmit = (
    { username, email, password }: FormValues,
    { resetForm }: FormikHelpers<FormValues>
  ) => {
    dispatch(registerUserWithEmailThunk({ username, email, password }))
      .unwrap()
      .then((args) => {
        if (args?.errorMessage) {
          setErrorMessage(args.errorMessage);
        } else {
          resetForm();
          dispatch(closeModal(Modals.signUpModal));
        }
      });
  };

  const onSignInRedirectClick = () => {
    dispatch(closeModal(Modals.signUpModal));
    dispatch(openModal(Modals.logInModal));
  };

  return (
    <BaseModal title='Signup' isOpen={isOpen} onCloseClick={onCloseClick}>
      <Formik
        initialValues={initialValues}
        onSubmit={onFormSubmit}
        validationSchema={validationSchema}
      >
        <Form className={styles.form} onChange={onFormChange}>
          <ModalInput label='Username' type='text' name='username' />
          <ModalInput label='Email' type='text' name='email' />
          <ModalInput label='Password' type='text' name='password' />
          <Button type='submit' fullWidth>
            Signup
          </Button>
          {errorMessage && <div className={styles.errorMessage}>{errorMessage}</div>}
          <Button fullWidth variant='text' onClick={onSignInRedirectClick}>
            Already have an account? Login
          </Button>
        </Form>
      </Formik>
    </BaseModal>
  );
};
