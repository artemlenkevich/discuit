import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Timestamp } from 'firebase/firestore';

import { addPost, getPost, getPosts } from '@/api/posts';
import { AppDispatch, RootState } from '@/types/redux';

interface AddPostParams {
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
  post: Post | null;
  limit: number;
};

const initialState: PostsState = {
  posts: [],
  limit: 15,
  post: null,
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
    setPost: (state, action) => {
      state.post = action.payload;
    },
  },
});

export const addPostThunk = createAsyncThunk<
  void,
  AddPostParams,
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

export const getPostThunk = createAsyncThunk<
  void,
  { postId: string },
  { dispatch: AppDispatch; state: RootState }
>('posts/getPostThunk', async ({ postId }, { getState, dispatch }) => {
  try {
    const post = await getPost({ postId });
    dispatch(setPost(post));
  } catch (e) {
    // dispatch(setError(normalizeError(e)));
    console.log(e);
  }
});

export const { setPosts, clearPosts, setPost } = postsSlice.actions;

export const { reducer: postsReducer } = postsSlice;

export const selectPosts = (state: RootState) => state.posts.posts;
export const selectPost = (state: RootState) => state.posts.post;
