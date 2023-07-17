import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useAppDispatch, useAppSelector } from '@/hooks/store';
import { closeModal, selectModals } from '@/store/modalsSlice';
import { Modals } from '@/types/modals';

import { BaseModal } from '../BaseModal';

import styles from './LogInModal.module.scss';

export const LogInModal: React.FC = () => {
  const dispatch = useAppDispatch();
  const modals = useAppSelector(selectModals);
  const isOpen = modals.logInModal;

  const onCloseClick = () => dispatch(closeModal(Modals.logInModal));

  return (
    <BaseModal title='Login' isOpen={isOpen} onCloseClick={onCloseClick}>
      <form className={styles.form}>
        <Input fullWidth label='Username' id='username' />
        <Input fullWidth label='Password' id='password' />
        <Button fullWidth>Login</Button>
      </form>
      <div className={styles.footer}>
        <Button fullWidth variant='text'>
          Don&apos;t have an account? Signup
        </Button>
      </div>
    </BaseModal>
  );
};
