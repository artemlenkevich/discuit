import { useFormik } from 'formik';

import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useAppDispatch, useAppSelector } from '@/hooks/store';
import { closeModal, selectModals } from '@/store/modalsSlice';
import { registerUserWithEmailAndPasswordThunk, updateUserProfileThunk } from '@/store/userSlice';
import { Modals } from '@/types/modals';

import { BaseModal } from '../BaseModal';

import styles from './SignUpModal.module.scss';

interface FormValues {
  username: string;
  email: string;
  password: string;
  // repeatPassword: string;
}

const initialValues: FormValues = {
  username: '',
  email: '',
  password: '',
  // repeatPassword: '',
};

export const SignUpModal: React.FC = () => {
  const dispatch = useAppDispatch();
  const modals = useAppSelector(selectModals);

  const isOpen = modals.signUpModal;

  const onCloseClick = () => dispatch(closeModal(Modals.signUpModal));

  const formik = useFormik({
    initialValues,
    onSubmit: ({ username, email, password }, { resetForm }) => {
      dispatch(registerUserWithEmailAndPasswordThunk({ email, password }))
        .unwrap()
        .then(() => {
          dispatch(updateUserProfileThunk({ username }));
          // dispatch(closeModal(Modals.signUpModal));
          resetForm();
        });
    },
  });

  return (
    <BaseModal title='Signup' isOpen={isOpen} onCloseClick={onCloseClick}>
      <form className={styles.form} onSubmit={formik.handleSubmit}>
        <Input fullWidth label='Username' type='text' {...formik.getFieldProps('username')} />
        <Input fullWidth label='Email' type='text' {...formik.getFieldProps('email')} />
        <Input fullWidth label='Password' type='text' {...formik.getFieldProps('password')} />
        {/* <Input fullWidth label='Repeat password' /> */}
        <Button type='submit' fullWidth>
          Signup
        </Button>
      </form>
    </BaseModal>
  );
};
