import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

import { BaseModal } from '../BaseModal';

import styles from './LogInModal.module.scss';


export const LogInModal: React.FC = () => {
  return (
    <BaseModal title='Login' isOpen={true} onCloseClick={() => console.log('click')}>
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
