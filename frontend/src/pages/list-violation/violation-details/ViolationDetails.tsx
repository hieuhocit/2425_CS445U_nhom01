/** styles */
import styles from './ViolationDetails.module.scss';

/** react-redux */
import { useSelector } from 'react-redux';
import { themeMode } from '@/store/theme/themeSelector';

/** components */
import Header from '@/components/header/Header';

/** react-router */
import { Link, useParams } from 'react-router-dom';

/** DUMMY DATA */
import { lawTopics, violations } from '@/data/data';

export default function ViolationDetailsPage() {
  const mode = useSelector(themeMode);
  const isDarkMode = mode === 'dark';

  const { lawId, violationId } = useParams();

  const lawTopic = lawTopics.find((l) => l.id === Number(lawId));

  const violation = violations.find((v) => v.id === Number(violationId));

  const relations = violations.filter((v) =>
    violation?.relations.includes(v.id)
  );

  const bookmarks1 = violation?.bookmarks.filter((b) => b.bookmarkType === 1);
  const bookmarks2 = violation?.bookmarks.filter((b) => b.bookmarkType === 2);
  const bookmarks3 = violation?.bookmarks.filter((b) => b.bookmarkType === 3);

  return (
    <div
      className={`${styles.violationDetails} ${
        isDarkMode ? styles.darkMode : undefined
      }`}
    >
      <Header title={lawTopic?.display as string} isDark={isDarkMode} />

      <main className={styles.main}>
        <div className={styles.sections}>
          <section className={styles.section}>
            <h2>Hành vi</h2>
            <p>{violation?.entities}</p>
            <p className={styles.bold}>{violation?.violation}</p>
          </section>
          {violation?.fines && (
            <section className={styles.section}>
              <h2>Hình phạt</h2>
              <p className={styles.colorRed}>{violation?.fines}</p>
              {bookmarks1?.map((b) => (
                <p
                  className={`${styles.bold} ${styles.smaller}`}
                  key={b.bookmarkCode}
                >
                  {b.bookmark}
                </p>
              ))}
            </section>
          )}
          {violation?.additionalPenalties && (
            <section className={styles.section}>
              <h2>Hình phạt bổ sung</h2>
              <p>{violation?.additionalPenalties}</p>
              {bookmarks2?.map((b) => (
                <p
                  className={`${styles.bold} ${styles.smaller}`}
                  key={b.bookmarkCode}
                >
                  {b.bookmark}
                </p>
              ))}
            </section>
          )}
          {violation?.otherPenalties && (
            <section className={styles.section}>
              <h2>Ghi chú</h2>
              <p>{violation?.otherPenalties}</p>
            </section>
          )}
          {violation?.remedial && (
            <section className={styles.section}>
              <h2>Khắc phục hậu quả</h2>
              <p>{violation?.remedial}</p>
              {bookmarks3?.map((b) => (
                <p
                  className={`${styles.bold} ${styles.smaller}`}
                  key={b.bookmarkCode}
                >
                  {b.bookmark}
                </p>
              ))}
            </section>
          )}
          {relations && relations.length > 0 && (
            <section className={styles.section}>
              <h2>Hành vi liên quan</h2>
              {relations.map((v) => (
                <div key={v.id}>
                  <h3>{v.violation}</h3>
                  <p className={styles.colorRed}>{v.fines}</p>
                  <Link to={`/list-law/${lawId}/list-violation/${v.id}`}>
                    Xem chi tiết
                  </Link>
                </div>
              ))}
            </section>
          )}
        </div>
      </main>
    </div>
  );
}
