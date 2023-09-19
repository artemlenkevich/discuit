import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { addPost } from '@/api/posts';
import { AppDispatch, RootState } from '@/types/redux';

interface AddPostOptions {
  title: string;
  text: string;
}

type PostsState = {
  posts: any;
};

const initialState: PostsState = {
  posts: null,
};

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
});

export const addPostThunk = createAsyncThunk<
  void,
  AddPostOptions,
  { dispatch: AppDispatch; state: RootState }
>('posts/addPostThunk', async ({ title, text }, { getState }) => {
  try {
    const {
      user: { name },
    } = getState();
    if (!name) {
      throw new Error('User is not authorized');
    }
    await addPost({ title, text, creator: name });
  } catch (e) {
    // dispatch(setError(normalizeError(e)));
    console.log(e);
  }
});

// export const {} = postsSlice.actions;

export const { reducer: postsReducer } = postsSlice;

export const selectPosts = (state: RootState) => state.posts;
