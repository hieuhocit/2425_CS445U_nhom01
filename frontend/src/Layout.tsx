// ** React router
import { Outlet } from 'react-router-dom';

/** toastify */
import { Bounce, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

/** react-redux */
import { useSelector } from 'react-redux';
import { themeMode } from './store/theme/themeSelector';

export default function Layout() {
  const mode = useSelector(themeMode);
  const isDarkMode = mode === 'dark';

  return (
    <>
      <Outlet />
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
