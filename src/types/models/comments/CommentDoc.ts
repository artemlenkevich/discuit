import { Timestamp } from 'firebase/firestore';

export interface CommentDoc {
  postId: string;
  parentId: string | null;
  author: string;
  text: string;
  createdAt: Timestamp;
  id: string;
}
