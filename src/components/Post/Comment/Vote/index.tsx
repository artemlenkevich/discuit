import cn from 'classnames';

import { Button } from '@/components/ui/Button';

import { ReactComponent as VoteIcon } from './assets/vote.svg';
import styles from './Vote.module.scss';

interface VoteProps {
  type: 'up' | 'down';
  number: number;
  onClick(): void;
}

export const Vote: React.FC<VoteProps> = ({ type, number, onClick }) => {
  return (
    <div className={styles.root}>
      <Button
        onClick={onClick}
        startIcon={<VoteIcon />}
        variant='text'
        className={cn(styles.button, { [styles.upvote]: type === 'up' })}
      />
      <div className={styles.number}>{number}</div>
    </div>
  );
};
