/** styles */
import styles from './ExamHistory.module.scss';

/** react-redux */
import { useSelector } from 'react-redux';
import { themeMode } from '@/store/theme/themeSelector';

/** react-router */
import { Link, useLoaderData } from 'react-router-dom';

/** components */
import Header from '@/components/header/Header';

/** API */
import store from '@/store/store';

/** API */
import { getExamHistory } from '@/services/historyApi';

/** types */
import { IExam } from '@/types/definitions';

export async function loader() {
  const licenseId =
    store.getState().setting.currentLicenseId ||
    localStorage.getItem('licenseId') ||
    1;

  const res = await getExamHistory(licenseId);
  const resData = await res.json();
  return resData?.data;
}

export default function ExamHistoryPage() {
  const mode = useSelector(themeMode);
  const isDarkMode = mode === 'dark';

  const exams = useLoaderData() as IExam[] | undefined | null;

  return (
    <>
      <div className={`${styles.history} ${isDarkMode ? styles.darkMode : ''}`}>
        <Header title='Lịch sử thi' isDark={isDarkMode} />

        <main className={styles.main}>
          {exams && exams.length > 0 && (
            <ul className={styles.list}>
              {exams.map((e) => (
                <li key={e.id} className={styles.item}>
                  <Link to={`/exam-history/${e.id}`}>
                    <h2>{Number(e.title) ? `Đề số ${e.title}` : e.title}</h2>
                  </Link>
                </li>
              ))}
            </ul>
          )}
          {exams && exams.length === 0 && (
            <p className={styles.message}>
              Hiện tại bạn chưa làm bài thi nào cho giấy phép này
            </p>
          )}
        </main>
      </div>
    </>
  );
}
