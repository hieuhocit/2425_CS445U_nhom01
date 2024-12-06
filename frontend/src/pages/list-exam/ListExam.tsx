/** styles */
import styles from './ListExam.module.scss';

/** react-redux */
import { useSelector } from 'react-redux';
import { themeMode } from '@/store/theme/themeSelector';

/** react-router */
import { Link } from 'react-router-dom';

/** components */
import Header from '@/components/header/Header';
import { currentLicenseSelector } from '@/store/setting/settingSelector';
import { examsSelector } from '@/store/data/dataSelector';

export default function ListExamPage() {
  const mode = useSelector(themeMode);
  const isDarkMode = mode === 'dark';

  const currentLicense = useSelector(currentLicenseSelector);
  const exams = useSelector(examsSelector);

  return (
    <>
      <div
        className={`${styles.listExam} ${isDarkMode ? styles.darkMode : ''}`}
      >
        <Header
          title={`Bộ đề thi ${currentLicense.code}`}
          isDark={isDarkMode}
        />

        <main className={styles.main}>
          <p className={styles.description}>
            Phải trả lời đúng {currentLicense.pass} câu và không sai câu liệt
          </p>
          <ul className={styles.list}>
            {exams.map((e) => (
              <li key={e.id} className={styles.item}>
                <Link to={`/list-exam/${e.id}`}>
                  <h2>Đề số {e.title}</h2>
                </Link>
              </li>
            ))}
          </ul>
        </main>
      </div>
    </>
  );
}
