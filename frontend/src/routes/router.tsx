/** react-router */
import { createBrowserRouter } from 'react-router-dom';

/** Layout */
import Layout from '@/Layout';

/** Pages */
import ListExamPage from '@/pages/list-exam/ListExam';
import HomePage from '@/pages/home/Home';
import SettingPage from '@/pages/setting/Setting';
import ListSignPage from '@/pages/list-sign/ListSign';
import SignDetailsPage from '../pages/list-sign/sign-details/SignDetails';
import ListLawPage from '@/pages/list-law/ListLaw';
import ListViolationPage from '@/pages/list-violation/ListViolation';
import ViolationDetailsPage from '@/pages/list-violation/violation-details/ViolationDetails';
import ListWrongPage from '@/pages/list-wrong/ListWrong';
import ListRequiredPage from '@/pages/list-required/ListRequired';
import ReviewPage from '@/pages/review/Review';
import ListTopicPage from '@/pages/list-topic/ListTopic';
import TopicDetailsPage from '@/pages/list-topic/topic-details/TopicDetails';
import ExamPage from '@/pages/exam/Exam';
import ExamResultPage from '@/pages/exam-result/ExamResult';
import LoginPage, { action as loginAction } from '@/pages/login/Login';

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
        path: '/list-wrong',
        element: <ListWrongPage />,
      },
      {
        path: '/list-required',
        element: <ListRequiredPage />,
      },
      {
        path: '/review',
        element: <ReviewPage />,
      },
      {
        path: '/list-topic',
        element: <ListTopicPage />,
      },
      {
        path: '/list-topic/:topicId',
        element: <TopicDetailsPage />,
      },
      {
        path: 'list-exam',
        element: <ListExamPage />,
      },
      {
        path: 'list-exam/:examId',
        element: <ExamPage />,
      },
      {
        path: 'list-exam/:examId/result',
        element: <ExamResultPage />,
      },
      {
        path: '/login',
        element: <LoginPage />,
        action: loginAction,
      },
    ],
  },
]);

export default router;
