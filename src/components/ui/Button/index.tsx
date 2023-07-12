import cn from 'classnames';
import { CSSProperties, ReactElement, ButtonHTMLAttributes } from 'react';

import styles from './Button.module.scss';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'text';
  fullWidth?: boolean;
  disable?: boolean;
  startIcon?: ReactElement;
  underline?: boolean;
  children: string;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  fullWidth,
  underline,
  startIcon,
  className,
  ...attrs
}) => {
  const buttonClass = cn(className, styles.baseButton, {
    [styles.primaryButton]: variant === 'primary',
    [styles.secondaryButton]: variant === 'secondary',
    [styles.textButton]: variant === 'text',
    [styles.fullWidth]: fullWidth,
    [styles.underline]: underline,
    [styles.withStartIcon]: startIcon,
  });

  const content = startIcon ? (
    <>
      {startIcon}
      {children}
    </>
  ) : (
    children
  );

  return (
    <button className={buttonClass} {...attrs}>
      {content}
    </button>
  );
};
