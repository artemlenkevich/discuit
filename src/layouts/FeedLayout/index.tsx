import cn from 'classnames';
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
      <div className={cn(styles.container, { [styles.disableLeftBar]: !showNavigation })}>
        {showNavigation && (
          <div className={styles.leftSidebar}>
            <Navigation />
          </div>
        )}
        <Outlet />
        <div className={styles.rightSidebar}>
          <CreatePostWidget />
        </div>
      </div>
    </div>
  );
};
