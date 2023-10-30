import cn from 'classnames';
import { Outlet, useMatch } from 'react-router-dom';

import { CreatePostWidget } from '@/components/CreatePostWidget';
import { Navigation } from '@/components/Navigation';
import { routes } from '@/constants/routes';
import useScreenSize from '@/hooks/useScreenSize';

import styles from './FeedLayout.module.scss';

export const FeedLayout: React.FC = () => {
  const isPostRoute = useMatch(routes.post);
  const screen = useScreenSize('>');

  const showLeftBar = screen.xl && !isPostRoute;

  return (
    <div className={styles.layout}>
      <div className={styles.container}>
        {showLeftBar && (
          <div className={styles.leftSidebar}>
            <Navigation />
          </div>
        )}
        <main
          className={cn(styles.mainContent, {
            [styles.disableLeftBar]: !showLeftBar,
            [styles.disableRightBar]: !screen.lg,
          })}
        >
          <Outlet />
        </main>
        {screen.lg && (
          <div className={styles.rightSidebar}>
            <CreatePostWidget />
          </div>
        )}
      </div>
    </div>
  );
};
