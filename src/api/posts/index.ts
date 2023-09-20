import { addDoc, collection } from 'firebase/firestore';

import { db } from '@/lib/firebase';

interface AddPostOptions {
  title: string;
  text: string;
  name: string;
  uid: string;
}

export const addPost = async ({ title, text, name, uid }: AddPostOptions) => {
  const postRef = await addDoc(collection(db, 'posts'), {
    title,
    text,
    name,
    uid,
  });

  return postRef;
};
