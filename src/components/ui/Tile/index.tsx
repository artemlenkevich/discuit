import cn from 'classnames';
import React, { HTMLProps, Ref } from 'react';

import styles from './Tile.module.scss';

export const Tile = React.forwardRef(
  ({ className, children, ...props }: HTMLProps<HTMLDivElement>, ref: Ref<HTMLDivElement>) => {
    return (
      <div className={cn(styles.tile, className)} ref={ref} {...props}>
        {children}
      </div>
    );
  }
);
