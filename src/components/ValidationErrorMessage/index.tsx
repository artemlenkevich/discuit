import { PropsWithChildren } from 'react';

import styles from './ValidationErrorMessage.module.scss';

interface ValidationErrorMessageProps {
  message?: string;
}

export const ValidationErrorMessage: React.FC<PropsWithChildren<ValidationErrorMessageProps>> = ({
  children,
  message,
}) => {
  return <div className={styles.root}>{message ?? children}</div>;
};
