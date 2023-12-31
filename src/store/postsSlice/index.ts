import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Timestamp } from 'firebase/firestore';

import { Post, addPost, getPost, getPosts } from '@/api/posts';
import { NotAuthorized } from '@/errors/not-authorized';
import { AppDispatch, RootState } from '@/store';
import { showErrorNotification } from '@/store/notificationsSlice';

interface AddPostParams {
  title: string;
  text: string;
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
>('posts/addPostThunk', async ({ title, text }, { getState, dispatch }) => {
  try {
    const {
      user: { name, uid },
    } = getState();
    if (!name || !uid) {
      throw new NotAuthorized();
    }
    await addPost({ title, text, author: name, authorId: uid });
  } catch (e) {
    dispatch(showErrorNotification(e));
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
    dispatch(showErrorNotification(e));
  }
});

export const getPostThunk = createAsyncThunk<
  void,
  { postId: string },
  { dispatch: AppDispatch; state: RootState }
>('posts/getPostThunk', async ({ postId }, { dispatch }) => {
  try {
    const post = await getPost({ postId });
    dispatch(setPost(post));
  } catch (e) {
    dispatch(showErrorNotification(e));
  }
});

export const { setPosts, clearPosts, setPost } = postsSlice.actions;

export const { reducer: postsReducer } = postsSlice;

export const selectPosts = (state: RootState) => state.posts.posts;
export const selectPost = (state: RootState) => state.posts.post;
