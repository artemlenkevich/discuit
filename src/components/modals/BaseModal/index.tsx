import { PropsWithChildren } from 'react';
import ReactModal from 'react-modal';

import { CloseButton } from '@/components/ui/CloseButton';

import styles from './BaseModal.module.scss';

interface BaseModalProps {
  title: string;
  isOpen: boolean;
  onCloseClick: () => void;
}

export const BaseModal: React.FC<PropsWithChildren<BaseModalProps>> = ({
  isOpen,
  children,
  title,
  onCloseClick,
}) => {
  return (
    <ReactModal
      className={styles.baseModal}
      overlayClassName={styles.overlayClassName}
      isOpen={isOpen}
    >
      <div className={styles.header}>
        <div className={styles.title}>{title}</div>
        <CloseButton onClick={onCloseClick} />
      </div>
      <div className={styles.content}>{children}</div>
    </ReactModal>
  );
};
