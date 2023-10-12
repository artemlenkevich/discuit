import { Timestamp } from 'firebase/firestore';

export interface PostDoc {
  title: string;
  text: string;
  name: string;
  uid: string;
  id: string;
  createdAt: Timestamp;
}
