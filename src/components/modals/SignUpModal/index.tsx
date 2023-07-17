import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useAppDispatch, useAppSelector } from '@/hooks/store';
import { closeModal, selectModals } from '@/store/modalsSlice';
import { Modals } from '@/types/modals';

import { BaseModal } from '../BaseModal';

import styles from './SignUpModal.module.scss';

export const SignUpModal: React.FC = () => {
  const dispatch = useAppDispatch();
  const modals = useAppSelector(selectModals);

  const isOpen = modals.signUpModal;

  const onCloseClick = () => dispatch(closeModal(Modals.signUpModal));

  return (
    <BaseModal title='Signup' isOpen={isOpen} onCloseClick={onCloseClick}>
      <form className={styles.form}>
        <Input fullWidth label='Username' />
        <Input fullWidth label='Password' />
        <Input fullWidth label='Repeat password' />
        <Button fullWidth>Signup</Button>
      </form>
    </BaseModal>
  );
};
