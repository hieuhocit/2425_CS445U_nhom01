/** styles */
import styles from './Layout.module.scss';

/** react-redux */
import { useSelector } from 'react-redux';
import { themeMode } from '@/store/theme/themeSelector';

/** components */
import SideBar from '@/components/sidebar/SideBar';

/** react-router */
import { Link } from 'react-router-dom';

/** icons */
import { FaCarSide } from 'react-icons/fa6';
import { MdMenuOpen, MdMenu } from 'react-icons/md';

/** react */
import { useState } from 'react';

export default function Layout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(
    window.innerWidth > 1024 ? false : true
  );
  const mode = useSelector(themeMode);
  const isDarkMode = mode === 'dark';

  return (
    <div className={`${styles.admin} ${isDarkMode ? styles.darkMode : ''}`}>
      <header className={styles.header}>
        <nav className={styles.nav}>
          <div className={styles.back} onClick={() => setCollapsed(!collapsed)}>
            {!collapsed ? (
              <MdMenuOpen className={styles.icon} />
            ) : (
              <MdMenu className={styles.icon} />
            )}
          </div>
        </nav>
        <Link to='/' className={styles.logo}>
          <FaCarSide className={styles.icon} />
          <p>GPLX</p>
        </Link>
        <h1 className={styles.title}>Quản trị viên</h1>
      </header>

      <SideBar
        isDark={isDarkMode}
        isCollapsed={collapsed}
        onClose={() => setCollapsed(true)}
      />

      <main className={styles.main}>
        <div
          className={`${styles.placeholder} ${
            collapsed ? styles.collapsed : ''
          }`}
        ></div>
        <div className={styles.content}>{children}</div>
      </main>
    </div>
  );
}
