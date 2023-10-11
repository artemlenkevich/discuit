import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';

import { FeedLayout, MainLayout } from '@/layouts';
import { PostLayout } from '@/layouts/PostLayout';

import { Home } from './Home';
import { NewPost } from './NewPost';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<MainLayout />}>
        <Route element={<FeedLayout />}>
          <Route path='/' element={<Home />}></Route>
          <Route path='subscriptions' element={<div>subscriptions</div>}></Route>
        </Route>
        <Route path='/posts/:postId' element={<PostLayout />}></Route>
      </Route>
      <Route path='/new' element={<NewPost />}></Route>
    </>
  )
);

export const AppRoutes = () => {
  return <RouterProvider router={router} />;
};
