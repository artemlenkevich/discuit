import { useEffect } from 'react';

import { Navigation } from '@/components/Navigation';
import { useIsLocationHasChanged } from '@/hooks/useIsLocationChanged';

import { CloseButton } from '../ui/CloseButton';

import styles from './MobileNavigation.module.scss';

interface MobileNavigationProps {
  onClose: () => void;
}

export const MobileNavigation: React.FC<MobileNavigationProps> = ({ onClose }) => {
  const isLocationHasChanged = useIsLocationHasChanged();
  useEffect(() => {
    if (isLocationHasChanged) {
      onClose();
    }
  }, [onClose, isLocationHasChanged]);

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
