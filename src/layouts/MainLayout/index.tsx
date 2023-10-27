import { useState } from 'react';
import { Outlet } from 'react-router-dom';

import { MobileNavigation } from '@/components/MobileNavigation';
import { Breakpoints } from '@/constants/breakpoints';
import { useAppSelector } from '@/store/hooks';
import useScreenSize from '@/hooks/useScreenSize';
import { selectIsAuthenticated } from '@/store/userSlice';

import { Header } from './Header/Header';
import styles from './MainLayout.module.scss';

export const MainLayout: React.FC = () => {
  const { width } = useScreenSize();
  const [showMobileNavigation, setShowMobileNavigation] = useState(false);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  const isBurgerShown = width < Breakpoints.xl;
  const isSearchShown = width > Breakpoints.md;

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
        isBurgerShown={isBurgerShown}
        isSearchShown={isSearchShown}
        isAuthenticated={isAuthenticated}
      />
      <div className={styles.content}>
        <Outlet />
      </div>
      {showMobileNavigation && isBurgerShown && (
        <MobileNavigation onClose={onMobileNavigationClose} />
      )}
    </>
  );
};
