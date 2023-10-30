import { useState } from 'react';
import { Outlet } from 'react-router-dom';

import { MobileNavigation } from '@/components/MobileNavigation';
import useScreenSize from '@/hooks/useScreenSize';
import { useAppSelector } from '@/store/hooks';
import { selectIsAuthenticated } from '@/store/userSlice';

import { Header } from './Header/Header';
import styles from './MainLayout.module.scss';

export const MainLayout: React.FC = () => {
  const screen = useScreenSize('>');
  const [showMobileNavigation, setShowMobileNavigation] = useState(false);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  const onMobileNavigationClose = () => {
    setShowMobileNavigation(false);
  };

  const onBurgerClick = () => {
    setShowMobileNavigation(true);
  };

  return (
    <>
      <Header
        onBurgerClick={onBurgerClick}
        isBurgerShown={!screen.xl}
        isSearchShown={screen.md}
        isAuthenticated={isAuthenticated}
      />
      <div className={styles.content}>
        <Outlet />
      </div>
      {showMobileNavigation && !screen.xl && <MobileNavigation onClose={onMobileNavigationClose} />}
    </>
  );
};
