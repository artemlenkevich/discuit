import cn from 'classnames';
import { PropsWithChildren, useState } from 'react';

import { Button } from '../ui/Button';

import styles from './Comment.module.scss';
import { Vote } from './Vote';

interface CommentProps {
  prop: string;
}

export const Comment: React.FC<PropsWithChildren<CommentProps>> = ({ prop, children }) => {
  const [isOpen, setIsOpen] = useState(true);
  const onCollapseClick = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className={styles.root}>
      <button className={styles.collapse} onClick={onCollapseClick}>
        <div className={cn(styles.collapseToggle, { [styles.open]: !isOpen })} />
        <div className={styles.collapseLine} />
      </button>
      <div className={styles.content}>
        <div className={styles.head}>
          <span className={styles.author}>Frisky Dingo</span>
          <span className={styles.date}>1 day ago</span>
        </div>
        {isOpen && (
          <div className={styles.extendedContent}>
            <div className={styles.comment}>
              That is awesome i hear them often but I’ve yet to see one in person.
            </div>
            <div className={styles.actions}>
              <Vote type='up' number={14} onClick={() => console.log(1)} />
              <Vote type='down' number={14} onClick={() => console.log(1)} />
              <Button className={styles.replyBtn} variant='text'>
                Reply
              </Button>
            </div>
            <div className={styles.nested}>{children}</div>
          </div>
        )}
      </div>
    </div>
  );
};
