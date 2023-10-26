import { Timestamp } from 'firebase/firestore';

export interface PostDoc {
  id: string;
  title: string;
  text: string;
  author: string;
  authorId: string;
  commentsAmount: number;
  createdAt: Timestamp;
}
