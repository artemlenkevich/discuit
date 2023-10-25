import cn from 'classnames';

import styles from './Loader.module.scss';

interface LoaderProps {
  size: 'sm' | 'md' | 'lg';
  className?: string;
}

export const Loader: React.FC<LoaderProps> = ({ size, className }) => {
  return <div className={cn(styles.root, className, styles[size])} />;
};
