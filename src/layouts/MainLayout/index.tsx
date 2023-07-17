import { PropsWithChildren } from 'react';
import { Outlet } from 'react-router-dom';

import { Burger } from '@/components/ui/Burger';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

import { ReactComponent as SearchLogo } from './assets/logo.svg';
import styles from './MainLayout.module.scss';
import { useAppDispatch } from '@/hooks/store';
import { openModal } from '@/store/modalsSlice';
import { Modals } from '@/types/modals';

export const MainLayout: React.FC = () => {
  const dispatch = useAppDispatch();

  const onLogInClick = () => {
    dispatch(openModal(Modals.logInModal));
  };

  const onSignUpClick = () => {
    dispatch(openModal(Modals.signUpModal));
  };

  return (
    <>
      <header className={styles.header}>
        <div className={styles.inner}>
          <div className={styles.left}>
            <div className={styles.burgerWrapper}>
              <Burger />
            </div>
            <a href='/' className={styles.logo}>
              Discuit
            </a>
            <div className={styles.search}>
              <Input fullWidth startIcon={<SearchLogo />} type='text' placeholder='Search' />
            </div>
          </div>
          <div className={styles.right}>
            <Button onClick={onLogInClick} variant='text'>
              Login
            </Button>
            <Button
              onClick={onSignUpClick}
              className={styles.createAccountButton}
              variant='primary'
            >
              Create account
            </Button>
          </div>
        </div>
      </header>
      <div className={styles.content}>
        <Outlet />
      </div>
    </>
  );
};
