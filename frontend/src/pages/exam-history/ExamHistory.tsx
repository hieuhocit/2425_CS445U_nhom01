/** styles */
import styles from './ExamHistory.module.scss';

/** react-redux */
import { useSelector } from 'react-redux';
import { themeMode } from '@/store/theme/themeSelector';

/** react-router */
import { Link } from 'react-router-dom';

/** components */
import Header from '@/components/header/Header';

export default function ExamHistoryPage() {
  const mode = useSelector(themeMode);
  const isDarkMode = mode === 'dark';

  return (
    <>
      <div className={`${styles.history} ${isDarkMode ? styles.darkMode : ''}`}>
        <Header title='Lịch sử thi' isDark={isDarkMode} />

        <main className={styles.main}>
          <ul className={styles.list}>
            <li className={styles.item}>
              <Link to='/exam-history/examId1'>
                <h2>Đề số 01</h2>
              </Link>
            </li>
            <li className={styles.item}>
              <Link to='/exam-history/examId2'>
                <h2>Đề số 02</h2>
              </Link>
            </li>
          </ul>
        </main>
      </div>
    </>
  );
}
