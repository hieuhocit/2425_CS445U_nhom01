import { createBrowserRouter } from 'react-router-dom';
import ListExam from '@/pages/list-exam/ListExam';
import Layout from '@/Layout';
import HomePage from '@/pages/home/Home';
import SettingPage from '@/pages/setting/Setting';

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
        path: '/setting',
        element: <SettingPage />,
      },
      {
        path: 'list-exam',
        element: <ListExam />,
      },
    ],
  },
]);

export default router;
