import {
  collection,
  doc,
  getDocs,
  query,
  serverTimestamp,
  where,
  orderBy,
  runTransaction,
  increment,
} from 'firebase/firestore';

import { db } from '@/lib/firebase';
import { GetCommentsResData } from '@/types/enpoints/comments/getComments';
import { SetCommentReqData } from '@/types/enpoints/comments/setComment';

interface GetCommentsParams {
  postId: string;
}

interface AddCommentParams {
  postId: string;
  parentId: string | null;
  author: string;
  authorId: string;
  text: string;
}

export interface Comment extends Omit<GetCommentsResData, 'createdAt'> {
  createdAt: number;
}

export const getComments = async ({ postId }: GetCommentsParams) => {
  try {
    const docRef = collection(db, 'comments');
    const q = query(docRef, where('postId', '==', postId), orderBy('createdAt', 'asc'));
    const querySnapshot = await getDocs(q);

    const comments = [] as Comment[];

    querySnapshot.forEach((doc) => {
      const postDoc = doc.data() as GetCommentsResData;
      const { createdAt, ...rest } = postDoc;
      const createdAtTimestamp = createdAt.toMillis();
      comments.push({ ...rest, createdAt: createdAtTimestamp });
    });

    return comments;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const addComment = async ({
  postId,
  parentId = null,
  author,
  text,
  authorId,
}: AddCommentParams) => {
  try {
    await runTransaction(db, async (transaction) => {
      const newCommentRef = doc(collection(db, 'comments'));

      const commentData: SetCommentReqData = {
        id: newCommentRef.id,
        postId,
        parentId,
        author,
        authorId,
        text,
        createdAt: serverTimestamp(),
      };

      await transaction.set(newCommentRef, commentData);

      const postRef = doc(db, 'posts', postId);
      await transaction.update(postRef, {
        commentsAmount: increment(1),
      });
    });
  } catch (err) {
    console.error(err);
    throw err;
  }
};
