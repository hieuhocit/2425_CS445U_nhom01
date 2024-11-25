/** styles */
import styles from './ListExam.module.scss';

/** react-redux */
import { useSelector } from 'react-redux';
import { themeMode } from '@/store/theme/themeSelector';

/** react-router */
import { Link } from 'react-router-dom';

/** components */
import Header from '@/components/header/Header';

export default function ListExamPage() {
  const mode = useSelector(themeMode);
  const isDarkMode = mode === 'dark';

  return (
    <>
      <div
        className={`${styles.listExam} ${isDarkMode ? styles.darkMode : ''}`}
      >
        <Header title='Bộ đề thi A1' isDark={isDarkMode} />

        <main className={styles.main}>
          <p className={styles.description}>
            Phải trả lời đúng 21 câu và không sai câu liệt
          </p>
          <ul className={styles.list}>
            <li className={styles.item}>
              <Link to='/list-exam'>
                <h2>Đề số 01</h2>
              </Link>
            </li>
            <li className={styles.item}>
              <Link to='/list-exam'>
                <h2>Đề số 02</h2>
              </Link>
            </li>
          </ul>
        </main>
      </div>
    </>
  );
}
