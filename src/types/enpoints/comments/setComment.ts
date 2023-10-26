import { FieldValue } from 'firebase/firestore';

import { CommentDoc } from '@/types/models/comments/CommentDoc';

export interface SetCommentReqData extends Omit<CommentDoc, 'createdAt'> {
  createdAt: FieldValue;
}
