import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Timestamp } from 'firebase/firestore';

import { addPost, getPosts } from '@/api/posts';
import { AppDispatch, RootState } from '@/types/redux';

interface AddPostOptions {
  title: string;
  text: string;
}

export interface Post {
  title: string;
  text: string;
  name: string;
  uid: string;
  createdAt: number;
  id: string;
}

type PostsState = {
  posts: Post[];
  limit: number;
};

const initialState: PostsState = {
  posts: [],
  limit: 10,
};

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPosts: (state, action) => {
      state.posts = state.posts.concat(action.payload);
    },
    clearPosts: (state) => {
      state.posts = [];
    },
  },
});

export const addPostThunk = createAsyncThunk<
  void,
  AddPostOptions,
  { dispatch: AppDispatch; state: RootState }
>('posts/addPostThunk', async ({ title, text }, { getState }) => {
  try {
    const {
      user: { name, uid },
    } = getState();
    if (!name || !uid) {
      throw new Error('User is not authorized');
    }
    await addPost({ title, text, name, uid });
  } catch (e) {
    // dispatch(setError(normalizeError(e)));
    console.log(e);
  }
});

export const getPostsThunk = createAsyncThunk<
  void,
  void,
  { dispatch: AppDispatch; state: RootState }
>('posts/addPostThunk', async (_, { getState, dispatch }) => {
  try {
    const {
      posts: { limit, posts },
    } = getState();

    const lastDoc = posts.at(-1);
    let lastDocParam: Timestamp | undefined;

    if (lastDoc) {
      lastDocParam = Timestamp.fromMillis(lastDoc.createdAt);
    }

    const newPosts = await getPosts({ lastDocParam, limitNumber: limit });
    dispatch(setPosts(newPosts));
  } catch (e) {
    // dispatch(setError(normalizeError(e)));
    console.log(e);
  }
});

export const { setPosts, clearPosts } = postsSlice.actions;

export const { reducer: postsReducer } = postsSlice;

export const selectPosts = (state: RootState) => state.posts.posts;
