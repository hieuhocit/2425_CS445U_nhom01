/** styles */
import styles from './Header.module.scss';

/** react-icons */
import { IoIosArrowBack } from 'react-icons/io';

/** react-router */
import { Link } from 'react-router-dom';

export default function Header({
  title,
  isDark,
  path,
}: {
  title: string;
  isDark: boolean;
  path?: string;
}) {
  return (
    <header
      className={`${styles.header} ${isDark ? styles.darkMode : undefined}`}
    >
      <nav className={styles.nav}>
        <Link to={path ? path : '..'} relative='path' className={styles.back}>
          <IoIosArrowBack className={styles.icon} />
        </Link>
      </nav>
      <h1 className={styles.title}>{title}</h1>
    </header>
  );
}
