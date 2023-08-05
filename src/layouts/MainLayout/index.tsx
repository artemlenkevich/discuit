import { Outlet } from 'react-router-dom';

import { Burger } from '@/components/ui/Burger';
import { Input } from '@/components/ui/Input';
import { useAppSelector } from '@/hooks/store';
import { selectIsAuthenticated } from '@/store/userSlice';

import { ReactComponent as SearchLogo } from './assets/logo.svg';
import styles from './MainLayout.module.scss';
import { ProfileWidget } from './ProfileWidget';
import { UnauthorizedWidget } from './UnauthorizedWidget';

export const MainLayout: React.FC = () => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
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
            {isAuthenticated ? <ProfileWidget /> : <UnauthorizedWidget />}
          </div>
        </div>
      </header>
      <div className={styles.content}>
        <Outlet />
      </div>
    </>
  );
};
