import ReactModal from 'react-modal';

import { Button } from '@/components/ui/Button';
import { CloseButton } from '@/components/ui/CloseButton';
import { Input } from '@/components/ui/Input';

import styles from './BaseModal.module.scss';

export const BaseModal: React.FC = () => {
  return (
    <ReactModal
      className={styles.baseModal}
      overlayClassName={styles.overlayClassName}
      isOpen={false}
    >
      <div className={styles.header}>
        <div className={styles.title}>Login</div>
        <CloseButton />
      </div>
      <div className={styles.content}>
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
      </div>
    </ReactModal>
  );
};
