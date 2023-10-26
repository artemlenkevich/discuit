import { Link } from 'react-router-dom';

import { timestampToTimeAgo } from '@/utils/time/timestampToTimeAgo';

import { Button } from '../ui/Button';
import { Tile } from '../ui/Tile';

import { ReactComponent as PostsIcon } from './assets/comments-icon.svg';
import styles from './PostWidget.module.scss';

interface PostWidgetProps {
  title: string;
  name: string;
  createdAt: number;
  commentsAmount: number;
  id: string;
}

export const PostWidget: React.FC<PostWidgetProps> = ({
  id,
  title,
  name,
  commentsAmount,
  createdAt,
}) => {
  const timeAgo = timestampToTimeAgo(createdAt);

  return (
    <Tile className={styles.root}>
      <div className={styles.head}>
        <div className={styles.postedBy}>Posted by @{name}</div>
        <div className={styles.date}>{timeAgo}</div>
      </div>
      <div className={styles.content}>
        <div className={styles.title}>
          <Link to={`/post/${id}`}>{title}</Link>
        </div>
      </div>
      <div className={styles.comments}>
        <Button startIcon={<PostsIcon />} variant='text'>
          {commentsAmount} comments
        </Button>
      </div>
    </Tile>
  );
};
