/** react-router */
import { createBrowserRouter } from 'react-router-dom';

/** Layout */
import Layout, {
  loader as layoutLoader,
  revalidate as revalidateLayout,
} from '@/Layout';

/** Pages */
import ListExamPage from '@/pages/list-exam/ListExam';
import HomePage from '@/pages/home/Home';
import SettingPage from '@/pages/setting/Setting';
import ListSignPage, {
  loader as listSignLoader,
} from '@/pages/list-sign/ListSign';
import SignDetailsPage, {
  loader as signDetailsLoader,
} from '../pages/list-sign/sign-details/SignDetails';
import ListLawPage, { loader as listLawLoader } from '@/pages/list-law/ListLaw';
import ListViolationPage, {
  loader as listViolationLoader,
} from '@/pages/list-violation/ListViolation';
import ViolationDetailsPage, {
  loader as violationDetailsLoader,
} from '@/pages/list-violation/violation-details/ViolationDetails';
import ListWrongPage, {
  loader as listWrongLoader,
} from '@/pages/list-wrong/ListWrong';
import ListRequiredPage from '@/pages/list-required/ListRequired';
import ReviewPage from '@/pages/review/Review';
import ListTopicPage from '@/pages/list-topic/ListTopic';
import TopicDetailsPage from '@/pages/list-topic/topic-details/TopicDetails';
import ExamPage, { loader as examLoader } from '@/pages/exam/Exam';
import ExamResultPage, {
  loader as examResultLoader,
} from '@/pages/exam-result/ExamResult';
import LoginPage from '@/pages/login/Login';
import RegisterPage, {
  action as registerAction,
} from '@/pages/register/Register';
import ExamHistoryPage, {
  loader as examHistoryLoader,
} from '@/pages/exam-history/ExamHistory';
import ProfilePage from '@/pages/profile/Profile';
import AdminPage from '@/pages/admin/Admin';
import Statistical, {
  loader as statisticalLoader,
} from '@/components/statistical/Statistical';
import UserManagement, {
  loader as userManagementLoader,
} from '@/components/user-management/UserManagement';
import ExamManagement, {
  loader as examManagementLoader,
} from '@/components/exam-management/ExamManagement';
import QuestionManagement, {
  loader as questionsManagementLoader,
} from '@/components/question-management/QuestionManagement';
import PersonalInformation from '@/components/personal-information/PersonalInformation';
import ChangePassword from '@/components/change-password/ChangePassword';
import ForgotPasswordPage from '@/pages/forgot-password/ForgotPassword';
import ProtectedRoute from '@/components/protected-route/ProtectedRoute';
import ReviewDetailsPage from '@/pages/review/ReviewDetails';

const router = createBrowserRouter([
  {
    path: '/',
    id: 'root',
    element: <Layout />,
    loader: layoutLoader,
    shouldRevalidate: revalidateLayout,
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
        id: 'sign',
        path: '/list-sign',
        loader: listSignLoader,
        children: [
          {
            index: true,
            element: <ListSignPage />,
          },
          {
            path: '/list-sign/:signId',
            element: <SignDetailsPage />,
            loader: signDetailsLoader,
          },
        ],
      },
      {
        path: '/list-law',
        element: <ListLawPage />,
        loader: listLawLoader,
      },
      {
        path: '/list-violation',
        element: <ListViolationPage />,
        loader: listViolationLoader,
      },
      {
        path: '/violation',
        element: <ViolationDetailsPage />,
        loader: violationDetailsLoader,
      },
      {
        path: '/list-wrong',
        element: (
          <ProtectedRoute>
            <ListWrongPage />
          </ProtectedRoute>
        ),
        loader: listWrongLoader,
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
        path: '/review/questions',
        element: <ReviewDetailsPage />,
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
        loader: examLoader,
      },
      {
        path: 'list-exam/:examId/result',
        element: <ExamResultPage />,
      },
      {
        path: '/login',
        element: <LoginPage />,
      },
      {
        path: '/register',
        element: <RegisterPage />,
        action: registerAction,
      },
      {
        path: '/profile',
        element: (
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        ),
        children: [
          {
            index: true,
            element: <PersonalInformation />,
          },
          {
            path: 'password',
            element: <ChangePassword />,
          },
        ],
      },
      {
        path: '/exam-history',
        element: (
          <ProtectedRoute>
            <ExamHistoryPage />
          </ProtectedRoute>
        ),
        loader: examHistoryLoader,
      },
      {
        path: '/exam-history/:examHistoryId',
        element: (
          <ProtectedRoute>
            <ExamResultPage />
          </ProtectedRoute>
        ),
        loader: examResultLoader,
      },
      {
        path: '/admin',
        element: (
          <ProtectedRoute>
            <AdminPage />
          </ProtectedRoute>
        ),
        children: [
          {
            index: true,
            element: <Statistical />,
            loader: statisticalLoader,
          },
          {
            path: 'user-management',
            element: <UserManagement />,
            loader: userManagementLoader,
          },
          {
            path: 'exam-management',
            element: <ExamManagement />,
            loader: examManagementLoader,
          },
          {
            path: 'question-management',
            element: <QuestionManagement />,
            loader: questionsManagementLoader,
          },
        ],
      },
      {
        path: '/forgot-password',
        element: <ForgotPasswordPage />,
      },
    ],
  },
]);

export default router;
