import { FieldValue } from 'firebase/firestore';

import { PostDoc } from '@/types/models/posts/PostDoc';

export interface SetPostReqData extends Omit<PostDoc, 'createdAt'> {
  createdAt: FieldValue;
}
