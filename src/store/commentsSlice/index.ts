import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { Comment, addComment, getComments } from '@/api/comments';
import { buildCommentTree } from '@/store/commentsSlice/utils/buildCommentTree';
import { showErrorNotification } from '@/store/notificationsSlice';
import { selectUser } from '@/store/userSlice';
import { AppDispatch, RootState } from '@/types/redux';

export interface CommentNode extends Comment {
  replies: CommentNode[];
}

interface CommentsState {
  comments: CommentNode[];
  length: number | null;
}

interface AddCommentParams {
  postId: string;
  parentId: string | null;
  text: string;
}

interface GetCommentParams {
  postId: string;
}

const initialState: CommentsState = {
  comments: [],
  length: null,
};

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    setComments: (state, action) => {
      state.comments = action.payload;
    },
    setLength: (state, action) => {
      state.length = action.payload;
    },
    clearComments: (state) => {
      state.comments = [];
    },
  },
});

export const addCommentThunk = createAsyncThunk<
  void,
  AddCommentParams,
  { dispatch: AppDispatch; state: RootState }
>('posts/addCommentThunk', async ({ postId, parentId, text }, { getState, dispatch }) => {
  try {
    const state = getState();
    const userState = selectUser(state);
    const { name, uid } = userState;
    if (!name || !uid) {
      throw new Error('User is not authorized');
    }
    await addComment({ postId, parentId, text, author: name, authorId: uid });
  } catch (e) {
    dispatch(showErrorNotification(e));
  }
});

export const getCommentsThunk = createAsyncThunk<
  void,
  GetCommentParams,
  { dispatch: AppDispatch; state: RootState }
>('posts/addPostThunk', async ({ postId }, { dispatch }) => {
  try {
    const comments = await getComments({ postId });
    const commentsTree = buildCommentTree(comments);

    dispatch(setComments(commentsTree));
    dispatch(setLength(comments.length));
  } catch (e) {
    dispatch(showErrorNotification(e));
  }
});

export const { setComments, setLength, clearComments } = commentsSlice.actions;

export const { reducer: commentsReducer } = commentsSlice;

export const selectComments = (state: RootState) => state.comments.comments;
export const selectCommentsLength = (state: RootState) => state.comments.length;
