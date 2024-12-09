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

/** react */
import { useEffect, useState } from 'react';

/** types */
import { ILawTopic, IViolation } from '@/types/definitions';

/** API */
import { getLawTopic, getViolations } from '@/services/lawApi';

export default function ListViolationPage() {
  const [lawTopic, setLawTopic] = useState<ILawTopic | null>(null);
  const [violations, setViolations] = useState<IViolation[]>([]);

  const mode = useSelector(themeMode);
  const isDarkMode = mode === 'dark';

  const { lawId } = useParams();
  const violationType = useSelector(violationTypeSelector);

  useEffect(() => {
    if (!lawId) return;

    async function getData(
      topicId: string | number,
      violationType: string | number
    ) {
      const resTopic = await getLawTopic(topicId);
      const resViolation = await getViolations(topicId, violationType);

      setLawTopic(resTopic.data);
      setViolations(resViolation.data);
    }

    getData(lawId, violationType);
  }, [lawId, violationType]);

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
          {violations.map((v) => (
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
