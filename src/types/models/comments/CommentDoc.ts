import { Timestamp } from 'firebase/firestore';

export interface CommentDoc {
  id: string;
  postId: string;
  parentId: string | null;
  author: string;
  authorId: string;
  text: string;
  createdAt: Timestamp;
}
