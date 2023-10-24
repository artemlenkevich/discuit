import {
  collection,
  doc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  where,
  Timestamp,
  orderBy,
  addDoc,
  getDoc,
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
      comments.push({ ...rest, createdAt: createdAtTimestamp, id: doc.id });
    });

    return comments;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const addComment = async ({ postId, parentId = null, author, text }: AddCommentParams) => {
  try {
    const newCommentRef = doc(collection(db, 'comments'));

    await setDoc(newCommentRef, {
      postId,
      parentId,
      author,
      text,
      createdAt: serverTimestamp(),
    });
  } catch (err) {
    console.error(err);
    throw err;
  }
};
