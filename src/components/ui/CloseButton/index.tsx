import { ReactComponent as CloseIcon } from './assets/close-icon.svg';
import styles from './CloseButton.module.scss';

export const CloseButton: React.FC = () => {
  return (
    <button className={styles.closeButton}>
      <CloseIcon />
    </button>
  );
};
