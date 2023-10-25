import {
  collection,
  doc,
  getDocs,
  query,
  serverTimestamp,
  where,
  Timestamp,
  orderBy,
  runTransaction,
  increment,
} from 'firebase/firestore';

import { db } from '@/lib/firebase';

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

export interface Comment {
  postId: string;
  parentId: string | null;
  author: string;
  text: string;
  createdAt: number;
  id: string;
}

interface CommentDoc {
  postId: string;
  parentId: string | null;
  author: string;
  text: string;
  createdAt: Timestamp;
  id: string;
}

export const getComments = async ({ postId }: GetCommentsParams) => {
  try {
    const docRef = collection(db, 'comments');
    const q = query(docRef, where('postId', '==', postId), orderBy('createdAt', 'asc'));
    const querySnapshot = await getDocs(q);

    const comments = [] as Comment[];

    querySnapshot.forEach((doc) => {
      const postDoc = doc.data() as CommentDoc;
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

export const addComment = async ({ postId, parentId = null, author, text }: AddCommentParams) => {
  try {
    await runTransaction(db, async (transaction) => {
      const newCommentRef = doc(collection(db, 'comments'));

      await transaction.set(newCommentRef, {
        postId,
        parentId,
        author,
        text,
        createdAt: serverTimestamp(),
        id: newCommentRef.id,
      });

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
