import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { Post } from '@/components/Post';
import { useAppDispatch, useAppSelector } from '@/hooks/store';
import { getPostThunk, selectPost } from '@/store/postsSlice';

import styles from './PostRoute.module.scss';

export const PostRoute: React.FC = () => {
  const dispatch = useAppDispatch();
  const post = useAppSelector(selectPost);
  const { postId } = useParams();

  useEffect(() => {
    if (postId) {
      dispatch(getPostThunk({ postId }));
    }
  }, [dispatch, postId]);

  return (
    <div className={styles.root}>
      {post && <Post title={post.title} name={post.name} createdAt={post.createdAt} id={post.id} />}
    </div>
  );
};
