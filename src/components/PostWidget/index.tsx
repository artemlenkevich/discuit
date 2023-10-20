import { Link } from 'react-router-dom';

import { Button } from '../ui/Button';
import { Tile } from '../ui/Tile';

import { ReactComponent as PostsIcon } from './assets/comments-icon.svg';
import styles from './PostWidget.module.scss';

interface PostWidgetProps {
  title: string;
  name: string;
  createdAt: number;
  id: string;
}

export const PostWidget: React.FC<PostWidgetProps> = ({ id, title, name }) => {
  return (
    <Tile className={styles.root}>
      <div className={styles.head}>
        <div className={styles.postedBy}>Posted by @{name}</div>
        <div className={styles.date}>6 hours ago</div>
      </div>
      <div className={styles.content}>
        <div className={styles.title}>
          <Link to={`/post/${id}`}>{title}</Link>
        </div>
      </div>
      <div className={styles.comments}>
        <Button startIcon={<PostsIcon />} variant='text'>
          0 comments
        </Button>
      </div>
    </Tile>
  );
};
