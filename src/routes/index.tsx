import { createBrowserRouter } from 'react-router-dom';
import AuthPage from '../pages/auth';
import TodoPage from '../pages/todo';
import { PrivateRoutes, PublicRoutes } from './routes';
import Layout from '../Layout';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        element: <PublicRoutes />,
        children: [
          {
            path: 'auth',
            element: <AuthPage />,
          },
        ],
      },
      {
        element: <PrivateRoutes />,
        children: [
          {
            path: 'todo',
            element: <TodoPage />,
          },
        ],
      },
    ],
  },
]);

export default router;
