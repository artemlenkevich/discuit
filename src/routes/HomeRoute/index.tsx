import { useEffect, useRef } from 'react';

import { PostWidget } from '@/components/PostWidget';
import { SelectBar } from '@/components/SelectBar';
import { useAppDispatch, useAppSelector } from '@/hooks/store';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { clearPosts, getPostsThunk, selectPosts } from '@/store/postsSlice';

import styles from './HomeRoute.module.scss';

export const HomeRoute: React.FC = () => {
  const dispatch = useAppDispatch();
  const posts = useAppSelector(selectPosts);
  const ref = useRef<HTMLDivElement | null>(null);
  const subscribe = useIntersectionObserver({
    elementRef: ref,
    options: { threshold: 1 },
  });

  useEffect(() => {
    function intersectionHandler() {
      dispatch(getPostsThunk());
    }
    subscribe(intersectionHandler);
  }, [dispatch, subscribe]);

  useEffect(() => {
    return () => {
      dispatch(clearPosts());
    };
  }, [dispatch]);

  return (
    <div>
      <SelectBar />
      <div className={styles.posts}>
        {posts.map((p) => {
          return (
            <PostWidget
              key={p.id}
              id={p.id}
              name={p.name}
              createdAt={p.createdAt}
              title={p.title}
              commentsAmount={p.commentsAmount}
            />
          );
        })}
        <div key='observer' ref={ref}></div>
      </div>
    </div>
  );
};
