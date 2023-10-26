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
} from 'firebase/firestore';

import { db } from '@/lib/firebase';
import { PostDoc } from '@/types/models/posts/PostDoc';

interface AddPostParams {
  title: string;
  text: string;
  name: string;
  uid: string;
}

interface GetPostsParams {
  lastDocParam: unknown;
  limitNumber: number;
}

export interface Post extends Omit<PostDoc, 'createdAt'> {
  createdAt: number;
}

interface GetPostParams {
  postId: string;
}

export const addPost = async ({ title, text, name, uid }: AddPostParams) => {
  const newPostRef = doc(collection(db, 'posts'));

  const postRef = await setDoc(newPostRef, {
    title,
    text,
    name,
    uid,
    createdAt: serverTimestamp(),
    commentsAmount: 0,
    id: newPostRef.id,
  });

  return postRef;
};

export const getPosts = async ({ lastDocParam, limitNumber }: GetPostsParams) => {
  try {
    let postsQuery = query(
      collection(db, 'posts'),
      orderBy('createdAt', 'desc'),
      limit(limitNumber)
    );

    if (lastDocParam) {
      postsQuery = query(postsQuery, startAfter(lastDocParam));
    }

    const querySnapshot = await getDocs(postsQuery);
    const posts = [] as Post[];

    querySnapshot.forEach((doc) => {
      const postDoc = doc.data() as PostDoc;
      const { createdAt, ...rest } = postDoc;
      const createdAtTimestamp = createdAt.toMillis();
      posts.push({ ...rest, createdAt: createdAtTimestamp });
    });

    return posts;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const getPost = async ({ postId }: GetPostParams) => {
  try {
    const docRef = doc(db, 'posts', postId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const postDoc = docSnap.data() as PostDoc;
      const { createdAt, ...rest } = postDoc;
      const createdAtTimestamp = createdAt.toMillis();
      const post = { ...rest, createdAt: createdAtTimestamp };
      return post;
    } else {
      // docSnap.data() will be undefined in this case
      throw new Error('No such document exists');
    }
  } catch (err) {
    console.error(err);
    throw err;
  }
};
