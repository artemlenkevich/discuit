import { useEffect } from 'react';

import { Tile } from '@/components/ui/Tile';
import { useAppDispatch, useAppSelector } from '@/hooks/store';
import {
  clearComments,
  getCommentsThunk,
  selectComments,
  selectCommentsLength,
} from '@/store/commentsSlice';
import { timestampToTimeAgo } from '@/utils/time/timestampToTimeAgo';

import { Comment } from './Comment';
import { NewComment } from './NewComment';
import styles from './Post.module.scss';

interface PostProps {
  title: string;
  name: string;
  createdAt: number;
  id: string;
}

export const Post: React.FC<PostProps> = ({ title, name, id, createdAt }) => {
  const dispatch = useAppDispatch();
  const comments = useAppSelector(selectComments);
  const commentsLength = useAppSelector(selectCommentsLength);

  const timeAgo = timestampToTimeAgo(createdAt);

  useEffect(() => {
    dispatch(getCommentsThunk({ postId: id }));
    return () => {
      dispatch(clearComments());
    };
  }, [id, dispatch]);
  return (
    <Tile className={styles.root}>
      <div className={styles.wrapper}>
        <div className={styles.head}>
          <div className={styles.postedBy}>Posted by @{name}</div>
          <div className={styles.date}>{timeAgo}</div>
        </div>
        <div className={styles.content}>
          <div className={styles.title}>{title}</div>
        </div>
      </div>
      <hr className={styles.separator} />
      <div className={styles.wrapper}>
        <div className={styles.commentsNumber}>{commentsLength} comments</div>
        <div className={styles.addCommentWrapper}>
          <NewComment postId={id} />
        </div>
        {comments.length > 0 && (
          <div className={styles.commentsTree}>
            {comments.map((c) => {
              return <Comment key={c.id} comment={c} />;
            })}
          </div>
        )}
      </div>
    </Tile>
  );
};
