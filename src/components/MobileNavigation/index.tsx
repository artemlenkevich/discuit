import { useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';

import { Navigation } from '@/components/Navigation';

import { CloseButton } from '../ui/CloseButton';

import styles from './MobileNavigation.module.scss';

interface MobileNavigationProps {
  onClose: () => void;
}

export const MobileNavigation: React.FC<MobileNavigationProps> = ({ onClose }) => {
  const { key } = useLocation();
  const prevNavKey = useMemo(() => key, []);

  useEffect(() => {
    const isNavigationClicked = key !== prevNavKey;
    if (isNavigationClicked) {
      onClose();
    }
  }, [key, prevNavKey, onClose]);

  const onCloseClick = () => {
    onClose();
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.content}>
        <div className={styles.header}>
          <div className={styles.title}>Discuit</div>
          <CloseButton onClick={onCloseClick} />
        </div>
        <div className={styles.content}>
          <Navigation />
        </div>
      </div>
    </div>
  );
};
