import { createBrowserRouter } from 'react-router-dom';
import App from '@/App';
import Root from '@/Root';
import ListExam from '@/pages/list-exam/ListExam';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        index: true,
        element: <App />,
      },
      {
        path: 'list-exam',
        element: <ListExam />,
      },
    ],
  },
]);

export default router;
