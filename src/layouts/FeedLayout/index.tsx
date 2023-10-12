import { Outlet } from 'react-router-dom';

import { CreatePostWidget } from '@/components/CreatePostWidget';
import { Navigation } from '@/components/Navigation';
import { Breakpoints } from '@/constants/breakpoints';
import useScreenSize from '@/hooks/useScreenSize';

import styles from './FeedLayout.module.scss';

export const FeedLayout: React.FC = () => {
  const { width } = useScreenSize();
  const showNavigation = width > Breakpoints.xl;

  return (
    <div className={styles.layout}>
      <div className={styles.container}>
        <div className={styles.leftSidebar}>{showNavigation && <Navigation />}</div>
        <Outlet />
        <div className={styles.rightSidebar}>
          <CreatePostWidget />
        </div>
      </div>
    </div>
  );
};
