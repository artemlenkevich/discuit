import { Comment } from '@/api/comments';
import { CommentNode } from '@/store/commentsSlice';

/* Builds a tree of comments from a flat data structure */
export function buildCommentTree(flatComments: Comment[]): CommentNode[] {
  const commentMap: { [ket: string]: CommentNode } = {};
  const commentTree: CommentNode[] = [];

  flatComments.forEach((comment) => {
    const commentNode: CommentNode = { ...comment, replies: [] };
    commentMap[comment.id] = commentNode;

    if (comment.parentId === null) {
      commentTree.push(commentNode);
    } else {
      const parent = commentMap[comment.parentId];
      parent.replies.push(commentNode);
    }
  });

  return commentTree;
}
