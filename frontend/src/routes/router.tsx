/** react-router */
import { createBrowserRouter } from 'react-router-dom';

/** Layout */
import Layout from '@/Layout';

/** Pages */
import ListExam from '@/pages/list-exam/ListExam';
import HomePage from '@/pages/home/Home';
import SettingPage from '@/pages/setting/Setting';
import ListSignPage from '@/pages/list-sign/ListSign';
import SignDetailsPage from '../pages/list-sign/sign-details/SignDetails';
import ListLawPage from '@/pages/list-law/ListLaw';
import ListViolationPage from '@/pages/list-violation/ListViolation';
import ViolationDetailsPage from '@/pages/list-violation/violation-details/ViolationDetails';

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
        path: '/list-sign/:signId',
        element: <SignDetailsPage />,
      },
      {
        path: '/list-law',
        element: <ListLawPage />,
      },
      {
        path: '/list-law/list-violation',
        element: <ListViolationPage />,
      },
      {
        path: '/list-law/list-violation/:violationId',
        element: <ViolationDetailsPage />,
      },
      {
        path: 'list-exam',
        element: <ListExam />,
      },
    ],
  },
]);

export default router;
