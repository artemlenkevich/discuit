import cn from 'classnames';
import { HTMLProps } from 'react';

import styles from './Textarea.module.scss';

interface TextareaProps extends HTMLProps<HTMLTextAreaElement> {
  autoGrow?: boolean;
}

export const Textarea: React.FC<TextareaProps> = ({ className, autoGrow, ...props }) => {
  const onInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (autoGrow) {
      const element = e.target;
      element.style.height = 'auto';
      element.style.height = element.scrollHeight + 'px';
    }
    props.onInput?.(e);
  };
  return <textarea className={cn(styles.root, className)} onInput={onInput} {...props}></textarea>;
};
