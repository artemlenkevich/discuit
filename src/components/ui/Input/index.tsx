import cn from 'classnames';
import { InputHTMLAttributes, ReactElement, CSSProperties } from 'react';

import styles from './Input.module.scss';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  startIcon?: ReactElement;
  fullWidth?: boolean;
  onStartIconClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  inputClassName?: string;
  labelClassName?: string;
  rootClassName?: string;
  style?: CSSProperties;
}

export const Input: React.FC<InputProps> = ({
  label,
  startIcon,
  onStartIconClick,
  fullWidth,
  inputClassName,
  labelClassName,
  rootClassName,
  style,
  id,
  ...attrs
}) => {
  return (
    <div className={cn(styles.root, { [styles.fullWidth]: fullWidth })}>
      {label && (
        <label className={cn(styles.label, labelClassName)} htmlFor={id}>
          {label}
        </label>
      )}
      <div className={cn(styles.inputWrapper, rootClassName)} style={style}>
        {startIcon && (
          <button onClick={onStartIconClick} className={styles.startIcon}>
            {startIcon}
          </button>
        )}
        <input
          className={cn(styles.input, inputClassName, {
            [styles.withStartIcon]: startIcon,
          })}
          id={id}
          {...attrs}
        />
      </div>
    </div>
  );
};
