import cn from 'classnames';
import { PropsWithChildren } from 'react';

import styles from './Tile.module.scss';

interface TileProps {
  className: string;
}

export const Tile: React.FC<PropsWithChildren<TileProps>> = ({ className, children }) => {
  return <div className={cn(styles.tile, className)}>{children}</div>;
};
