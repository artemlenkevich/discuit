import { addDoc, collection, doc, setDoc } from 'firebase/firestore';

import { db } from '@/lib/firebase';

interface AddPostOptions {
  title: string;
  text: string;
  creator: string;
}

export const addPost = async ({ title, text, creator }: AddPostOptions) => {
  const postRef = await addDoc(collection(db, 'posts'), {
    title,
    text,
    creator,
  });

  return postRef;
};
