import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';

import { routes } from '@/constants/routes';
import { FeedLayout, MainLayout } from '@/layouts';
import { HomePage } from '@/pages/HomePage';
import { NewPostPage } from '@/pages/NewPostPage';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { PostPage } from '@/pages/PostPage';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<MainLayout />}>
        <Route element={<FeedLayout />}>
          <Route path={routes.root} element={<HomePage />}></Route>
          <Route path={routes.subscriptions} element={<div>subscriptions</div>}></Route>
          <Route path={routes.post} element={<PostPage />}></Route>
        </Route>
      </Route>
      <Route path='*' element={<NotFoundPage />}></Route>
      <Route path={routes.newPost} element={<NewPostPage />}></Route>
    </>
  )
);

export const AppRoutes = () => {
  return <RouterProvider router={router} />;
};
