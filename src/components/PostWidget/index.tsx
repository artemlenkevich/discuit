import { Button } from '../ui/Button';
import { Tile } from '../ui/Tile';

import { ReactComponent as PostsIcon } from './assets/comments-icon.svg';
import styles from './PostWidget.module.scss';

interface PostWidgetProps {
  prop: string;
}

export const PostWidget: React.FC<PostWidgetProps> = ({ prop }) => {
  return (
    <Tile className={styles.root}>
      <div className={styles.head}>
        <div className={styles.postedBy}>Posted by @BigMcLargeHuge</div>
        <div className={styles.date}>6 hours ago</div>
      </div>
      <div className={styles.content}>
        <div className={styles.title}>Discuit Community/User Mentions Format Poll</div>
      </div>
      <div className={styles.comments}>
        <Button startIcon={<PostsIcon />} variant='text'>
          22 comments
        </Button>
      </div>
    </Tile>
  );
};
