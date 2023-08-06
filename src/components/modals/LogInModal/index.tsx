import { Form, Formik, FormikHelpers } from 'formik';
import { useState } from 'react';
import * as Yup from 'yup';

import { Button } from '@/components/ui/Button';
import { useAppDispatch, useAppSelector } from '@/hooks/store';
import { closeModal, selectModals } from '@/store/modalsSlice';
import { logInUserWithEmailAndPasswordThunk } from '@/store/userSlice';
import { Modals } from '@/types/modals';

import { BaseModal } from '../BaseModal';
import { ModalInput } from '../ModalInput';

import styles from './LogInModal.module.scss';

interface FormValues {
  email: string;
  password: string;
}

const initialValues: FormValues = {
  email: '',
  password: '',
};

const validationSchema = Yup.object({
  email: Yup.string().email('Invalid email address').required('Required'),
  password: Yup.string().min(6, 'Must be 6 characters or more').required('Required'),
});

export const LogInModal: React.FC = () => {
  const dispatch = useAppDispatch();
  const modals = useAppSelector(selectModals);
  const [errorMessage, setErrorMessage] = useState('');

  const isOpen = modals.logInModal;

  const onCloseClick = () => dispatch(closeModal(Modals.logInModal));

  const onFormChange = () => {
    if (errorMessage) setErrorMessage('');
  };

  const onFormSubmit = (
    { email, password }: FormValues,
    { resetForm }: FormikHelpers<FormValues>
  ) => {
    dispatch(logInUserWithEmailAndPasswordThunk({ email, password }))
      .unwrap()
      .then((args) => {
        if (args?.errorMessage) {
          setErrorMessage(args.errorMessage);
        } else {
          resetForm();
        }
      });
  };

  return (
    <BaseModal title='Login' isOpen={isOpen} onCloseClick={onCloseClick}>
      <Formik
        initialValues={initialValues}
        onSubmit={onFormSubmit}
        validationSchema={validationSchema}
      >
        <Form className={styles.form} onChange={onFormChange}>
          <ModalInput label='Email' type='text' name='email' />
          <ModalInput label='Password' type='text' name='password' />
          <Button fullWidth>Login</Button>
          {errorMessage && <div className={styles.errorMessage}>{errorMessage}</div>}
          <div className={styles.footer}>
            <Button fullWidth variant='text'>
              Don&apos;t have an account? Signup
            </Button>
          </div>
        </Form>
      </Formik>
    </BaseModal>
  );
};
