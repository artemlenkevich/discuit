import cn from 'classnames';
import { ReactElement, ButtonHTMLAttributes } from 'react';

import styles from './Button.module.scss';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'text';
  fullWidth?: boolean;
  startIcon?: ReactElement;
  underline?: boolean;
  as?: keyof JSX.IntrinsicElements | React.ComponentType<any>;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  fullWidth,
  underline,
  as = 'button',
  startIcon,
  className,
  ...attrs
}) => {
  const buttonClass = cn(styles.baseButton, className, {
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

  const Component = as;

  return (
    <Component className={buttonClass} {...attrs}>
      {content}
    </Component>
  );
};
