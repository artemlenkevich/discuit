import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';

import { FeedLayout, MainLayout } from '@/components/layouts';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<MainLayout />}>
      <Route element={<FeedLayout />}>
        <Route path='/' element={<div>x</div>}></Route>
      </Route>
    </Route>
  )
);

export const AppRoutes = () => {
  return <RouterProvider router={router} />;
};
