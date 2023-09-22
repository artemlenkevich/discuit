import {
  Timestamp,
  collection,
  doc,
  getDocs,
  limit,
  orderBy,
  query,
  serverTimestamp,
  startAfter,
  setDoc,
} from 'firebase/firestore';

import { db } from '@/lib/firebase';
import { Post } from '@/store/postsSlice';

interface AddPostOptions {
  title: string;
  text: string;
  name: string;
  uid: string;
}

interface GetPostsOptions {
  lastDocParam: unknown;
  limitNumber: number;
}

interface PostDoc {
  title: string;
  text: string;
  name: string;
  uid: string;
  id: string;
  createdAt: Timestamp;
}

export const addPost = async ({ title, text, name, uid }: AddPostOptions) => {
  const newPostRef = doc(collection(db, 'posts'));

  const postRef = await setDoc(newPostRef, {
    title,
    text,
    name,
    uid,
    createdAt: serverTimestamp(),
    id: newPostRef.id,
  });

  return postRef;
};

export const getPosts = async ({ lastDocParam, limitNumber }: GetPostsOptions) => {
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
