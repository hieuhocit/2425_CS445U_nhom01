// ** React router
import { Outlet } from 'react-router-dom';

/** toastify */
import { Bounce, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

/** react-redux */
import { useDispatch, useSelector } from 'react-redux';
import { themeMode } from './store/theme/themeSelector';
import { useGetUserQuery } from './services/authApi';
import { currentLicenseSelector } from './store/setting/settingSelector';
import { changeQuestionsAndExams } from './store/data/dataSlice';

/** API */
import { getExams } from './services/examApi';
import { getQuestions } from './services/questionApi';
import { useGetLicensesQuery } from './services/licenseApi';

/** react */
import { useEffect } from 'react';

export default function Layout() {
  const mode = useSelector(themeMode);
  const isDarkMode = mode === 'dark';

  const dispatch = useDispatch();

  useGetLicensesQuery();
  const { isLoading } = useGetUserQuery();

  const licenseId = useSelector(currentLicenseSelector)?.id;

  useEffect(() => {
    if (!licenseId) return;

    async function setupData() {
      const resQuestions = await getQuestions(licenseId);
      const resExams = await getExams(licenseId);

      dispatch(
        changeQuestionsAndExams({
          exams: resExams?.data,
          questions: resQuestions?.data,
        })
      );
    }

    setupData();
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
