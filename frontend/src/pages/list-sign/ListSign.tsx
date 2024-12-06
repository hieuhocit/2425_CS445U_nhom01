/** styles */
import styles from './ListSign.module.scss';

/** components */
import Header from '@/components/header/Header';

/** react-redux */
import { useSelector } from 'react-redux';
import { themeMode } from '@/store/theme/themeSelector';
import { Link } from 'react-router-dom';

/** DUMMY DATA */
import { signTopics } from '@/data/data';

export default function ListSignPage() {
  const mode = useSelector(themeMode);
  const isDarkMode = mode === 'dark';

  return (
    <>
      <div
        className={`${styles.listSign} ${
          isDarkMode ? styles.darkMode : undefined
        }`}
      >
        <Header title='Biển báo' isDark={isDarkMode} />
        <main className={styles.main}>
          <ul className={styles.list}>
            {signTopics.map((st, index) => (
              <li key={st.id}>
                <Link to={`/list-sign/${st.id}`} className={styles.item}>
                  <div className={styles.head}>
                    <img
                      src={`https://beta.gplx.app/images/assets/topic_sign_${index}.png`}
                      alt={st.display + ' image'}
                    />
                    <h2>{st.display}</h2>
                  </div>
                  <div className={styles.body}>
                    <p>{st.subTitle}</p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </main>
      </div>
    </>
  );
}
