import { useState } from 'react';

import { Button } from '@/components/ui/Button';
import { Tile } from '@/components/ui/Tile';
import { useAppDispatch } from '@/hooks/store';
import { logOutUserThunk } from '@/store/userSlice';

import styles from './ProfileWidget.module.scss';

export const ProfileWidget: React.FC = () => {
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState(false);

  const onWidgetClick = () => {
    setIsOpen((prevState) => !prevState);
  };

  const onLogoutClick = () => {
    dispatch(logOutUserThunk());
    console.log('click');
  };

  return (
    <div
      role='button'
      className={styles.root}
      onClick={onWidgetClick}
      onKeyDown={onWidgetClick}
      tabIndex={0}
    >
      <span className={styles.username}>vano</span>
      {isOpen && (
        <Tile className={styles.dropdown}>
          <Button onClick={onLogoutClick} className={styles.logoutButton} fullWidth variant='text'>
            Logout
          </Button>
        </Tile>
      )}
    </div>
  );
};
