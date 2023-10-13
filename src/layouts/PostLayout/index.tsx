import cn from 'classnames';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { CreatePostWidget } from '@/components/CreatePostWidget';
import { Post } from '@/components/Post';
import { Breakpoints } from '@/constants/breakpoints';
import { useAppDispatch, useAppSelector } from '@/hooks/store';
import useScreenSize from '@/hooks/useScreenSize';
import { getPostThunk, selectPost } from '@/store/postsSlice';

import styles from './PostLayout.module.scss';

export const PostLayout: React.FC = () => {
  const { postId } = useParams();
  const dispatch = useAppDispatch();
  const post = useAppSelector(selectPost);
  const { width } = useScreenSize();
  const showRightBar = width > Breakpoints.lg;

  useEffect(() => {
    if (postId) {
      dispatch(getPostThunk({ postId }));
    }
  }, [dispatch, postId]);

  return (
    <div className={styles.layout}>
      <div className={styles.container}>
        <main className={cn(styles.mainContent, { [styles.disabledRigthBar]: !showRightBar })}>
          {post && (
            <Post title={post.title} name={post.name} createdAt={post.createdAt} id={post.id} />
          )}
        </main>
        {showRightBar && (
          <div className={styles.rightSidebar}>
            <CreatePostWidget />
          </div>
        )}
      </div>
    </div>
  );
};
