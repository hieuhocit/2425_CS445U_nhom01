/* eslint-disable react-refresh/only-export-components */

/** react */
import { lazy, Suspense } from 'react';

/** react-router */
import { createBrowserRouter } from 'react-router-dom';

/** Layout */
const Layout = lazy(() => import('@/Layout'));

/** Pages */
const ListExamPage = lazy(() => import('@/pages/list-exam/ListExam'));
const HomePage = lazy(() => import('@/pages/home/Home'));
const SettingPage = lazy(() => import('@/pages/setting/Setting'));
const ListSignPage = lazy(() => import('@/pages/list-sign/ListSign'));
const SignDetailsPage = lazy(
  () => import('@/pages/list-sign/sign-details/SignDetails')
);
const ListLawPage = lazy(() => import('@/pages/list-law/ListLaw'));
const ListViolationPage = lazy(
  () => import('@/pages/list-violation/ListViolation')
);
const ViolationDetailsPage = lazy(
  () => import('@/pages/list-violation/violation-details/ViolationDetails')
);
const ListWrongPage = lazy(() => import('@/pages/list-wrong/ListWrong'));
const ListRequiredPage = lazy(
  () => import('@/pages/list-required/ListRequired')
);
const ReviewPage = lazy(() => import('@/pages/review/Review'));
const ListTopicPage = lazy(() => import('@/pages/list-topic/ListTopic'));
const TopicDetailsPage = lazy(
  () => import('@/pages/list-topic/topic-details/TopicDetails')
);
const ExamPage = lazy(() => import('@/pages/exam/Exam'));
const ExamResultPage = lazy(() => import('@/pages/exam-result/ExamResult'));
const LoginPage = lazy(() => import('@/pages/login/Login'));
const RegisterPage = lazy(() => import('@/pages/register/Register'));
const ExamHistoryPage = lazy(() => import('@/pages/exam-history/ExamHistory'));
const ProfilePage = lazy(() => import('@/pages/profile/Profile'));
const AdminPage = lazy(() => import('@/pages/admin/Admin'));
const Statistical = lazy(() => import('@/components/statistical/Statistical'));
const UserManagement = lazy(
  () => import('@/components/user-management/UserManagement')
);
const ExamManagement = lazy(
  () => import('@/components/exam-management/ExamManagement')
);
const QuestionManagement = lazy(
  () => import('@/components/question-management/QuestionManagement')
);
const PersonalInformation = lazy(
  () => import('@/components/personal-information/PersonalInformation')
);
const ChangePassword = lazy(
  () => import('@/components/change-password/ChangePassword')
);
const ForgotPasswordPage = lazy(
  () => import('@/pages/forgot-password/ForgotPassword')
);
const ProtectedRoute = lazy(
  () => import('@/components/protected-route/ProtectedRoute')
);
const ReviewDetailsPage = lazy(() => import('@/pages/review/ReviewDetails'));

/** Loaders */
import {
  loader as layoutLoader,
  revalidate as revalidateLayout,
} from '@/Layout';
import { loader as listSignLoader } from '@/pages/list-sign/ListSign';
import { loader as signDetailsLoader } from '@/pages/list-sign/sign-details/SignDetails';
import { loader as listLawLoader } from '@/pages/list-law/ListLaw';
import { loader as listViolationLoader } from '@/pages/list-violation/ListViolation';
import { loader as violationDetailsLoader } from '@/pages/list-violation/violation-details/ViolationDetails';
import { loader as listWrongLoader } from '@/pages/list-wrong/ListWrong';
import { loader as examLoader } from '@/pages/exam/Exam';
import { loader as examResultLoader } from '@/pages/exam-result/ExamResult';
import { loader as examHistoryLoader } from '@/pages/exam-history/ExamHistory';
import { loader as statisticalLoader } from '@/components/statistical/Statistical';
import { loader as userManagementLoader } from '@/components/user-management/UserManagement';
import { loader as examManagementLoader } from '@/components/exam-management/ExamManagement';
import { loader as questionsManagementLoader } from '@/components/question-management/QuestionManagement';

/** Action */
import { action as registerAction } from '@/pages/register/Register';

/** Component */
import LoadingIndicator from '@/components/loading-indicator/LoadingIndicator';

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
        element: (
          <Suspense fallback={<LoadingIndicator />}>
            <HomePage />
          </Suspense>
        ),
      },
      {
        path: '/setting',
        element: (
          <Suspense fallback={<LoadingIndicator />}>
            <SettingPage />
          </Suspense>
        ),
      },
      {
        id: 'sign',
        path: '/list-sign',
        loader: listSignLoader,
        children: [
          {
            index: true,
            element: (
              <Suspense fallback={<LoadingIndicator />}>
                <ListSignPage />
              </Suspense>
            ),
          },
          {
            path: '/list-sign/:signId',
            element: (
              <Suspense fallback={<LoadingIndicator />}>
                <SignDetailsPage />
              </Suspense>
            ),
            loader: signDetailsLoader,
          },
        ],
      },
      {
        path: '/list-law',
        element: (
          <Suspense fallback={<LoadingIndicator />}>
            <ListLawPage />
          </Suspense>
        ),
        loader: listLawLoader,
      },
      {
        path: '/list-violation',
        element: (
          <Suspense fallback={<LoadingIndicator />}>
            <ListViolationPage />
          </Suspense>
        ),
        loader: listViolationLoader,
      },
      {
        path: '/violation',
        element: (
          <Suspense fallback={<LoadingIndicator />}>
            <ViolationDetailsPage />
          </Suspense>
        ),
        loader: violationDetailsLoader,
      },
      {
        path: '/list-wrong',
        element: (
          <Suspense fallback={<LoadingIndicator />}>
            <ProtectedRoute>
              <ListWrongPage />
            </ProtectedRoute>
          </Suspense>
        ),
        loader: listWrongLoader,
      },
      {
        path: '/list-required',
        element: (
          <Suspense fallback={<LoadingIndicator />}>
            <ListRequiredPage />
          </Suspense>
        ),
      },
      {
        path: '/review',
        element: (
          <Suspense fallback={<LoadingIndicator />}>
            <ReviewPage />
          </Suspense>
        ),
      },
      {
        path: '/review/questions',
        element: (
          <Suspense fallback={<LoadingIndicator />}>
            <ReviewDetailsPage />
          </Suspense>
        ),
      },
      {
        path: '/list-topic',
        element: (
          <Suspense fallback={<LoadingIndicator />}>
            <ListTopicPage />
          </Suspense>
        ),
      },
      {
        path: '/list-topic/:topicId',
        element: (
          <Suspense fallback={<LoadingIndicator />}>
            <TopicDetailsPage />
          </Suspense>
        ),
      },
      {
        path: 'list-exam',
        element: (
          <Suspense fallback={<LoadingIndicator />}>
            <ListExamPage />
          </Suspense>
        ),
      },
      {
        path: 'list-exam/:examId',
        element: (
          <Suspense fallback={<LoadingIndicator />}>
            <ExamPage />
          </Suspense>
        ),
        loader: examLoader,
      },
      {
        path: 'list-exam/:examId/result',
        element: (
          <Suspense fallback={<LoadingIndicator />}>
            <ExamResultPage />
          </Suspense>
        ),
      },
      {
        path: '/login',
        element: (
          <Suspense fallback={<LoadingIndicator />}>
            <LoginPage />
          </Suspense>
        ),
      },
      {
        path: '/register',
        element: (
          <Suspense fallback={<LoadingIndicator />}>
            <RegisterPage />
          </Suspense>
        ),
        action: registerAction,
      },
      {
        path: '/profile',
        element: (
          <Suspense fallback={<LoadingIndicator />}>
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          </Suspense>
        ),
        children: [
          {
            index: true,
            element: (
              <Suspense fallback={<LoadingIndicator />}>
                <PersonalInformation />
              </Suspense>
            ),
          },
          {
            path: 'password',
            element: (
              <Suspense fallback={<LoadingIndicator />}>
                <ChangePassword />
              </Suspense>
            ),
          },
        ],
      },
      {
        path: '/exam-history',
        element: (
          <Suspense fallback={<LoadingIndicator />}>
            <ProtectedRoute>
              <ExamHistoryPage />
            </ProtectedRoute>
          </Suspense>
        ),
        loader: examHistoryLoader,
      },
      {
        path: '/exam-history/:examHistoryId',
        element: (
          <Suspense fallback={<LoadingIndicator />}>
            <ProtectedRoute>
              <ExamResultPage />
            </ProtectedRoute>
          </Suspense>
        ),
        loader: examResultLoader,
      },
      {
        path: '/admin',
        element: (
          <Suspense fallback={<LoadingIndicator />}>
            <ProtectedRoute>
              <AdminPage />
            </ProtectedRoute>
          </Suspense>
        ),
        children: [
          {
            index: true,
            element: (
              <Suspense fallback={<LoadingIndicator />}>
                <Statistical />
              </Suspense>
            ),
            loader: statisticalLoader,
          },
          {
            path: 'user-management',
            element: (
              <Suspense fallback={<LoadingIndicator />}>
                <UserManagement />
              </Suspense>
            ),
            loader: userManagementLoader,
          },
          {
            path: 'exam-management',
            element: (
              <Suspense fallback={<LoadingIndicator />}>
                <ExamManagement />
              </Suspense>
            ),
            loader: examManagementLoader,
          },
          {
            path: 'question-management',
            element: (
              <Suspense fallback={<LoadingIndicator />}>
                <QuestionManagement />
              </Suspense>
            ),
            loader: questionsManagementLoader,
          },
        ],
      },
      {
        path: '/forgot-password',
        element: (
          <Suspense fallback={<LoadingIndicator />}>
            <ForgotPasswordPage />
          </Suspense>
        ),
      },
    ],
  },
]);

export default router;
