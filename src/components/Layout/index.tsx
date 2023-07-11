import { PropsWithChildren } from 'react';

import { Button } from '@/components';

import { ReactComponent as SearchLogo } from './assets/logo.svg';
import styles from './Layout.module.scss';

export const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <header className={styles.header}>
        <div className={styles.inner}>
          <div className={styles.left}>
            <a href='/' className={styles.logo}>
              Discuit
            </a>
            <div className={styles.search}>
              <button className={styles.searchButton}>
                <SearchLogo />
              </button>
              <input className={styles.searchInput} type='text' placeholder='Search' />
            </div>
          </div>
          <div className={styles.right}>
            <Button variant='text'>Login</Button>
            <Button className={styles.createAccountButton} variant='primary'>
              Create account
            </Button>
          </div>
        </div>
      </header>
      <div className={styles.content}>{children}</div>
    </>
  );
};
