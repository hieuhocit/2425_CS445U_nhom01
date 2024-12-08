/** styles */
import styles from './ProtectedRoute.module.scss';

/** react-redux */
import { loginSelector, permissionSelector } from '@/store/auth/authSelector';
import { useSelector } from 'react-redux';
import { themeMode } from '@/store/theme/themeSelector';

/** react-router */
import { Navigate, useLocation } from 'react-router-dom';

/** components */
import Header from '../header/Header';

/** GIFS */
import whatareyoudoing from '@/assets/gifs/whatareyoudoingnow.gif';

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const isLoggedIn = useSelector(loginSelector);
  const permission = useSelector(permissionSelector);

  const mode = useSelector(themeMode);
  const isDarkMode = mode === 'dark';

  const location = useLocation();
  const pathname = location.pathname;

  const isAdmin = permission === 'ADMIN';
  const isAdminPage = pathname.startsWith('/admin');

  if (!isLoggedIn) return <Navigate to={'/login'} />;

  if (isAdminPage && !isAdmin)
    return (
      <>
        <div className={styles.protectedRoute}>
          <Header
            title='Ôi dồi ôi, bạn ơi mình đi đâu thế?'
            isDark={isDarkMode}
          />
          <main className={styles.main}>
            <div className={styles.imageContainer}>
              <img
                src={whatareyoudoing}
                alt='what are you doing right now meme'
              />
            </div>
          </main>
        </div>
      </>
    );

  return children;
}
