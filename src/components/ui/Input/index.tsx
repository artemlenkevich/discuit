import cn from 'classnames';
import { InputHTMLAttributes, ReactElement, CSSProperties } from 'react';

import styles from './Input.module.scss';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  startIcon?: ReactElement;
  fullWidth?: boolean;
  onStartIconClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  style?: CSSProperties;
}

export const Input: React.FC<InputProps> = ({
  startIcon,
  onStartIconClick,
  fullWidth,
  className,
  style,
  ...attr
}) => {
  if (!startIcon)
    return (
      <input
        className={cn(styles.baseInput, className, { [styles.fullWidth]: fullWidth })}
        style={style}
        {...attr}
      />
    );

  return (
    <div className={cn(styles.wrapper, className, { [styles.fullWidth]: fullWidth })} style={style}>
      <button onClick={onStartIconClick} className={styles.startIcon}>
        {startIcon}
      </button>
      <input className={styles.baseInput + ' ' + styles.withStartIcon} {...attr} />
    </div>
  );
};
