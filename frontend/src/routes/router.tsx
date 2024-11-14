import { createBrowserRouter } from 'react-router-dom';
import ListExam from '@/pages/list-exam/ListExam';
import Layout from '@/Layout';
import HomePage from '@/pages/home/Home';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'list-exam',
        element: <ListExam />,
      },
    ],
  },
]);

export default router;
