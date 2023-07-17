import cn from 'classnames';
import { InputHTMLAttributes, ReactElement } from 'react';

import { Input, InputProps } from '../Input';

import styles from './LabeledInput.module.scss';

interface LabeledInputProps extends InputProps {
  fullWidth?: boolean;
  labelClassName?: string;
  rootClassName?: string;
  label: string;
  startIcon?: ReactElement;
  id: string;
}

export const LabeledInput: React.FC<LabeledInputProps> = ({
  labelClassName,
  rootClassName,
  label,
  id,
  ...rest
}) => {
  return (
    <div className={cn(styles.root, rootClassName)}>
      <label className={cn(styles.label, labelClassName)} htmlFor={id}>
        {label}
      </label>
      <Input {...rest} id={id} />
    </div>
  );
};
