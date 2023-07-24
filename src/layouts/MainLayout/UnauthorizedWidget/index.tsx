import { Button } from '@/components/ui/Button';
import { useAppDispatch } from '@/hooks/store';
import { openModal } from '@/store/modalsSlice';
import { Modals } from '@/types/modals';

import styles from './UnauthorizedWidget.module.scss';

export const UnauthorizedWidget: React.FC = () => {
  const dispatch = useAppDispatch();

  const onLogInClick = () => {
    dispatch(openModal(Modals.logInModal));
  };

  const onSignUpClick = () => {
    dispatch(openModal(Modals.signUpModal));
  };
  return (
    <div className={styles.root}>
      <Button onClick={onLogInClick} variant='text'>
        Login
      </Button>
      <Button onClick={onSignUpClick} className={styles.createAccountButton} variant='primary'>
        Create account
      </Button>
    </div>
  );
};
