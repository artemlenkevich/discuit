import { configureStore } from '@reduxjs/toolkit';

import { commentsReducer } from './commentsSlice';
import { modalsReducer } from './modalsSlice';
import { postsReducer } from './postsSlice';
import { systemReducer } from './systemSlice';
import { userReducer } from './userSlice';

export const store = configureStore({
  reducer: {
    system: systemReducer,
    user: userReducer,
    modals: modalsReducer,
    posts: postsReducer,
    comments: commentsReducer,
  },
});
