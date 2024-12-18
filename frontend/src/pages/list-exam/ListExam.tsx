/** styles */
import styles from './ListExam.module.scss';

/** react-redux */
import { useSelector } from 'react-redux';
import { themeMode } from '@/store/theme/themeSelector';
import { currentLicenseSelector } from '@/store/setting/settingSelector';

/** react-router */
import { Link, useRouteLoaderData } from 'react-router-dom';

/** components */
import Header from '@/components/header/Header';

/** types */
import { IExam } from '@/types/definitions';

export default function ListExamPage() {
  const mode = useSelector(themeMode);
  const isDarkMode = mode === 'dark';

  const currentLicense = useSelector(currentLicenseSelector);

  const { exams } = useRouteLoaderData('root') as {
    exams: IExam[] | undefined;
  };

  return (
    <>
      <div
        className={`${styles.listExam} ${isDarkMode ? styles.darkMode : ''}`}
      >
        <Header
          title={`Bộ đề thi ${currentLicense?.code}`}
          isDark={isDarkMode}
        />

        <main className={styles.main}>
          <p className={styles.description}>
            Phải trả lời đúng {currentLicense?.pass} câu và không sai câu liệt
          </p>
          <ul className={styles.list}>
            {exams &&
              exams.map((e) => (
                <li key={e.id} className={styles.item}>
                  <Link to={`/list-exam/${e.id}`}>
                    <h2>{Number(e.title) ? `Đề số ${e.title}` : e.title}</h2>
                  </Link>
                </li>
              ))}
          </ul>
        </main>
      </div>
    </>
  );
}
