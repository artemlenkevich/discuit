import { ReactComponent as CloseIcon } from './assets/close-icon.svg';
import styles from './CloseButton.module.scss';

interface CloseButtonProps {
  onClick: () => void;
}

export const CloseButton: React.FC<CloseButtonProps> = ({ onClick }) => {
  return (
    <button className={styles.closeButton} onClick={onClick}>
      <CloseIcon />
    </button>
  );
};
