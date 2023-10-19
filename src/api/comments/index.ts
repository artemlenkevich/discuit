import {
  collection,
  doc,
  getDocs,
  limit,
  orderBy,
  query,
  serverTimestamp,
  startAfter,
  setDoc,
  getDoc,
  where,
  Timestamp,
} from 'firebase/firestore';

import { db } from '@/lib/firebase';

interface GetCommentsParams {
  postId: string;
}

interface AddCommentParams {
  postId: string;
  parentId: string | null;
  author: string;
  text: string;
}

interface Comment {
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
    const q = query(docRef, where('postId', '==', postId));
    const querySnapshot = await getDocs(q);

    const comments = [] as Comment[];

    querySnapshot.forEach((doc) => {
      console.log(doc.id, ' => ', doc.data());

      const postDoc = doc.data() as CommentDoc;
      const { createdAt, ...rest } = postDoc;
      const createdAtTimestamp = createdAt.toMillis();
      comments.push({ ...rest, createdAt: createdAtTimestamp });
    });
  } catch (e) {
    console.warn(e);
  }
};

export const addComment = async ({ postId, parentId, author, text }: AddCommentParams) => {
  try {
    const newCommentRef = doc(collection(db, 'comments'));

    const commentRef = await setDoc(newCommentRef, {
      postId,
      parentId,
      author,
      text,
      createdAt: serverTimestamp(),
      id: newCommentRef.id,
    });

    return commentRef;
  } catch (e) {
    console.warn(e);
  }
};
