import cn from 'classnames';
import { PropsWithChildren, useState } from 'react';

import { Button } from '@/components/ui/Button';
import { CommentNode } from '@/store/commentsSlice';
import { timestampToTimeAgo } from '@/utils/time/timestampToTimeAgo';

import { NewComment } from '../NewComment';

import styles from './Comment.module.scss';
import { Vote } from './Vote';

interface CommentProps {
  comment: CommentNode;
}

export const Comment: React.FC<PropsWithChildren<CommentProps>> = ({ comment }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [isRelyOpen, setIsReplyOpen] = useState(false);

  const { postId, author, text, createdAt, replies, id } = comment;
  const timeAgo = timestampToTimeAgo(createdAt);

  const onCollapseClick = () => {
    setIsOpen((prev) => !prev);
  };

  const onReplyClick = () => {
    setIsReplyOpen((prev) => !prev);
  };

  const onNewCommentCancel = () => {
    setIsReplyOpen(false);
  };

  return (
    <div className={styles.root}>
      <button className={styles.collapse} onClick={onCollapseClick}>
        <div className={cn(styles.collapseToggle, { [styles.open]: !isOpen })} />
        <div className={styles.collapseLine} />
      </button>
      <div className={styles.content}>
        <div className={styles.head}>
          <span className={styles.author}>{author}</span>
          <span className={styles.date}>{timeAgo}</span>
        </div>
        {isOpen && (
          <div className={styles.extendedContent}>
            <div className={styles.comment}>{text}</div>
            <div className={styles.actions}>
              <Vote type='up' number={14} onClick={() => console.log(1)} />
              <Vote type='down' number={14} onClick={() => console.log(1)} />
              <Button className={styles.replyBtn} variant='text' onClick={onReplyClick}>
                Reply
              </Button>
            </div>
            {isRelyOpen && (
              <div className={styles.reply}>
                <NewComment onCancel={onNewCommentCancel} postId={postId} parentId={id} />
              </div>
            )}
            {replies.length > 0 && (
              <div className={styles.nested}>
                {replies.map((r) => {
                  return <Comment key={r.id} comment={r} />;
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
