import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';

import { FeedLayout, MainLayout } from '@/layouts';

import { Home } from './Home';
import { NewPost } from './NewPost';
import { PostRoute } from './PostRoute';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<MainLayout />}>
        <Route element={<FeedLayout />}>
          <Route path='/' element={<Home />}></Route>
          <Route path='subscriptions' element={<div>subscriptions</div>}></Route>
          <Route path='/posts/:postId' element={<PostRoute />}></Route>
        </Route>
      </Route>
      <Route path='/new' element={<NewPost />}></Route>
    </>
  )
);

export const AppRoutes = () => {
  return <RouterProvider router={router} />;
};
