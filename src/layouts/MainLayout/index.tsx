import { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

import { MobileNavigation } from '@/components/MobileNavigation';
import { Burger } from '@/components/ui/Burger';
import { Input } from '@/components/ui/Input';
import { Breakpoints } from '@/constants/breakpoints';
import { useAppSelector } from '@/hooks/store';
import useScreenSize from '@/hooks/useScreenSize';
import { selectIsAuthenticated } from '@/store/userSlice';

import { ReactComponent as SearchLogo } from './assets/logo.svg';
import styles from './MainLayout.module.scss';
import { ProfileWidget } from './ProfileWidget';
import { UnauthorizedWidget } from './UnauthorizedWidget';

export const MainLayout: React.FC = () => {
  const { width } = useScreenSize();
  const [showMobileNavigation, setShowMobileNavigation] = useState(false);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const showBurger = width < Breakpoints.xl;
  const showSearch = width > Breakpoints.md;

  const onMobileNavigationClose = () => {
    setShowMobileNavigation(false);
  };

  const onBurgerClick = () => {
    setShowMobileNavigation(true);
  };

  return (
    <>
      <header className={styles.header}>
        <div className={styles.inner}>
          <div className={styles.left}>
            {showBurger && (
              <div className={styles.burgerWrapper}>
                <Burger onClick={onBurgerClick} />
              </div>
            )}
            <a href='/' className={styles.logo}>
              Discuit
            </a>
            {showSearch && (
              <div className={styles.search}>
                <Input fullWidth startIcon={<SearchLogo />} type='text' placeholder='Search' />
              </div>
            )}
          </div>
          <div className={styles.right}>
            {isAuthenticated ? <ProfileWidget /> : <UnauthorizedWidget />}
          </div>
        </div>
      </header>
      <div className={styles.content}>
        <Outlet />
      </div>
      {showMobileNavigation && showBurger && <MobileNavigation onClose={onMobileNavigationClose} />}
    </>
  );
};
