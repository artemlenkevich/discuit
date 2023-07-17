import cn from 'classnames';
import { InputHTMLAttributes, ReactElement, CSSProperties } from 'react';

import styles from './Input.module.scss';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  startIcon?: ReactElement;
  fullWidth?: boolean;
  onStartIconClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  inputClassName?: string;
  rootClassName?: string;
  style?: CSSProperties;
}

export const Input: React.FC<InputProps> = ({
  startIcon,
  onStartIconClick,
  fullWidth,
  inputClassName,
  rootClassName,
  style,
  ...attrs
}) => {
  if (!startIcon)
    return (
      <input
        className={cn(styles.baseInput, inputClassName, rootClassName, {
          [styles.fullWidth]: fullWidth,
        })}
        style={style}
        {...attrs}
      />
    );

  return (
    <div
      className={cn(styles.wrapper, rootClassName, { [styles.fullWidth]: fullWidth })}
      style={style}
    >
      <button onClick={onStartIconClick} className={styles.startIcon}>
        {startIcon}
      </button>
      <input className={cn(styles.baseInput, inputClassName, styles.withStartIcon)} {...attrs} />
    </div>
  );
};
