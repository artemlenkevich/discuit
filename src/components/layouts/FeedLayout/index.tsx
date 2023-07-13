import { Outlet } from 'react-router-dom';

import styles from './FeedLayout.module.scss';

export const FeedLayout: React.FC = () => {
  return (
    <div className={styles.content}>
      <Outlet />
    </div>
  );
};
