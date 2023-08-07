import { Outlet } from 'react-router-dom';

import { CreatePostWidget } from '@/components/CreatePostWidget';
import { Navigation } from '@/components/Navigation';

import styles from './FeedLayout.module.scss';

export const FeedLayout: React.FC = () => {
  return (
    <div className={styles.layout}>
      <div className={styles.container}>
        <div className={styles.leftSidebar}>
          <Navigation />
        </div>
        <Outlet />
        <div className={styles.rightSidebar}>
          <CreatePostWidget />
        </div>
      </div>
    </div>
  );
};
