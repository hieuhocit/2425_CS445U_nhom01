/** styles */
import styles from './ListViolation.module.scss';

/** react-router */
import { Link, useParams } from 'react-router-dom';

/** react-redux */
import { useSelector } from 'react-redux';
import { themeMode } from '@/store/theme/themeSelector';
import { violationTypeSelector } from '@/store/setting/settingSelector';

/** components */
import Header from '@/components/header/Header';

/** DUMMY DATA */
import { lawTopics, violations } from '@/data/data';

export default function ListViolationPage() {
  const mode = useSelector(themeMode);
  const isDarkMode = mode === 'dark';

  const { lawId } = useParams();
  const violationType = useSelector(violationTypeSelector);

  const lawTopic = lawTopics.find((l) => l.id === Number(lawId));

  const filteredViolations = violations.filter(
    (v) => v.law_topic_id === lawTopic?.id && v.violation_type === violationType
  );

  return (
    <div
      className={`${styles.listViolation} ${
        isDarkMode ? styles.darkMode : undefined
      }`}
    >
      <Header
        title={lawTopic?.display as string}
        isDark={isDarkMode}
        path='/list-law'
      />

      <main className={styles.main}>
        <ul className={styles.list}>
          {filteredViolations.map((v) => (
            <li key={v.id}>
              <h2>{v.violation}</h2>
              <p>{v.fines}</p>
              <Link to={`${v.id}`}>Xem chi tiết</Link>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
