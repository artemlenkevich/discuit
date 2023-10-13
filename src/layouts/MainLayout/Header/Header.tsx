import { Burger } from '@/components/ui/Burger';
import { Input } from '@/components/ui/Input';

import { ProfileWidget } from '../ProfileWidget';
import { UnauthorizedWidget } from '../UnauthorizedWidget';

import { ReactComponent as SearchLogo } from './assets/logo.svg';
import styles from './Header.module.scss';
import { Link } from 'react-router-dom';

interface HeaderProps {
  onBurgerClick: () => void;
  isBurgerShown: boolean;
  isSearchShown: boolean;
  isAuthenticated: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  onBurgerClick,
  isBurgerShown,
  isSearchShown,
  isAuthenticated,
}) => {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <div className={styles.left}>
          {isBurgerShown && (
            <div className={styles.burgerWrapper}>
              <Burger onClick={onBurgerClick} />
            </div>
          )}
          <Link to='/' className={styles.logo}>
            Discuit
          </Link>
          {isSearchShown && (
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
  );
};
