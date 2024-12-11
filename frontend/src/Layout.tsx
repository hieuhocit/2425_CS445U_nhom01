// ** React router
import {
  Outlet,
  ShouldRevalidateFunctionArgs,
  useNavigate,
} from 'react-router-dom';

/** toastify */
import { Bounce, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

/** react-redux */
import { useSelector } from 'react-redux';
import { themeMode } from './store/theme/themeSelector';
import { useGetUserQuery } from './services/authApi';
import { currentLicenseIdSelector } from './store/setting/settingSelector';

/** API */
import { getExams } from './services/examApi';
import { getQuestions } from './services/questionApi';
import { useGetLicensesQuery } from './services/licenseApi';
import { getTopics } from './services/topicApi';

/** react */
import { useEffect, useState } from 'react';

/** store */
import store from './store/store';

export async function loader() {
  const licenseId = store.getState().setting.currentLicenseId || 1;

  const resQuestions = await getQuestions(licenseId);
  const resExams = await getExams(licenseId);
  const resTopics = await getTopics(licenseId);

  return {
    topics: resTopics?.data,
    exams: resExams?.data,
    questions: resQuestions?.data?.questions,
  };
}

export function revalidate(args: ShouldRevalidateFunctionArgs) {
  const currentPathname = args.currentUrl.pathname;
  return args.defaultShouldRevalidate && currentPathname === '/';
}

export default function Layout() {
  const [firstRun, setFirstRun] = useState(true);

  const mode = useSelector(themeMode);
  const isDarkMode = mode === 'dark';

  const navigate = useNavigate();

  useGetLicensesQuery();

  const { isLoading } = useGetUserQuery();

  const licenseId = useSelector(currentLicenseIdSelector);

  useEffect(() => {
    if (!licenseId || firstRun) {
      setFirstRun(false);
      return;
    }
    navigate('/', { replace: true });
  }, [licenseId]);

  return (
    <>
      {!isLoading && <Outlet />}
      <ToastContainer
        position='top-right'
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={isDarkMode ? 'dark' : 'light'}
        transition={Bounce}
      />
    </>
  );
}
