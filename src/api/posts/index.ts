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
import { GetPostResData } from '@/types/enpoints/posts/getPost';
import { GetPostsResData } from '@/types/enpoints/posts/getPosts';
import { SetPostReqData } from '@/types/enpoints/posts/setPost';

interface AddPostParams {
  title: string;
  text: string;
  author: string;
  authorId: string;
}

interface GetPostsParams {
  lastDocParam: unknown;
  limitNumber: number;
}

export interface Post extends Omit<GetPostsResData, 'createdAt'> {
  createdAt: number;
}

interface GetPostParams {
  postId: string;
}

export const addPost = async ({ title, text, author, authorId }: AddPostParams) => {
  const newPostRef = doc(collection(db, 'posts'));

  const postData: SetPostReqData = {
    title,
    text,
    author,
    authorId,
    createdAt: serverTimestamp(),
    commentsAmount: 0,
    id: newPostRef.id,
  };

  await setDoc(newPostRef, postData);
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
      const postDoc = doc.data() as GetPostsResData;
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
      const postDoc = docSnap.data() as GetPostResData;
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
