import { createBrowserRouter } from 'react-router-dom';
import ListExam from '@/pages/list-exam/ListExam';
import Layout from '@/Layout';
import HomePage from '@/pages/home/Home';
import SettingPage from '@/pages/setting/Setting';
import ListSignPage from '@/pages/list-sign/ListSign';

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
        path: '/list-sign',
        element: <ListSignPage />,
      },
      {
        path: 'list-exam',
        element: <ListExam />,
      },
    ],
  },
]);

export default router;
