import { Comment } from '@/components/Comment';
import { Textarea } from '@/components/ui/Textarea/indext';
import { Tile } from '@/components/ui/Tile';

import styles from './Post.module.scss';

interface PostProps {
  title: string;
  name: string;
  createdAt: number;
  id: string;
}

export const Post: React.FC<PostProps> = ({ id, title, name, createdAt }) => {
  return (
    <Tile className={styles.root}>
      <div className={styles.wrapper}>
        <div className={styles.head}>
          <div className={styles.postedBy}>Posted by @{name}</div>
          <div className={styles.date}>6 hours ago</div>
        </div>
        <div className={styles.content}>
          <div className={styles.title}>{title}</div>
        </div>
      </div>
      <hr className={styles.separator} />
      <div className={styles.wrapper}>
        <div className={styles.commentsNumber}>8 comments</div>
        <Textarea className={styles.textarea} rows={5} autoGrow placeholder='Add a new comment' />
        <div className={styles.commentsTree}>
          <Comment prop='d'>
            <Comment prop='s' />
          </Comment>
        </div>
      </div>
    </Tile>
  );
};
