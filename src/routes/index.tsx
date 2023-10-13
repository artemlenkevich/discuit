import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';

import { routes } from '@/constants/routes';
import { FeedLayout, MainLayout } from '@/layouts';

import { HomeRoute } from './HomeRoute';
import { NewPostRoute } from './NewPostRoute';
import { NotFoundRoute } from './NotFoundRoute';
import { PostRoute } from './PostRoute';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<MainLayout />}>
        <Route element={<FeedLayout />}>
          <Route path={routes.root} element={<HomeRoute />}></Route>
          <Route path={routes.subscriptions} element={<div>subscriptions</div>}></Route>
          <Route path={routes.post} element={<PostRoute />}></Route>
        </Route>
      </Route>
      <Route path='*' element={<NotFoundRoute />}></Route>
      <Route path={routes.newPost} element={<NewPostRoute />}></Route>
    </>
  )
);

export const AppRoutes = () => {
  return <RouterProvider router={router} />;
};
