import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { CreatePostWidget } from '@/components/CreatePostWidget';
import { Post } from '@/components/Post';
import { useAppDispatch, useAppSelector } from '@/hooks/store';
import { getPostThunk, selectPost } from '@/store/postsSlice';

import styles from './PostLayout.module.scss';

export const PostLayout: React.FC = () => {
  const { postId } = useParams();
  const dispatch = useAppDispatch();
  const post = useAppSelector(selectPost);

  useEffect(() => {
    if (postId) {
      dispatch(getPostThunk({ postId }));
    }
  }, [dispatch, postId]);

  return (
    <div className={styles.layout}>
      <div className={styles.container}>
        <div>
          {post && (
            <Post title={post.title} name={post.name} createdAt={post.createdAt} id={post.id} />
          )}
        </div>
        <div className={styles.rightSidebar}>
          <CreatePostWidget />
        </div>
      </div>
    </div>
  );
};
