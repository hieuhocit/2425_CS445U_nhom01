/** styles */
import styles from './ListSign.module.scss';

/** components */
import Header from '@/components/header/Header';

/** react-redux */
import { useSelector } from 'react-redux';
import { themeMode } from '@/store/theme/themeSelector';
import { Link, useRouteLoaderData } from 'react-router-dom';

/** types */
import { ISignTopic } from '@/types/definitions';

/** API */
import { getSignTopics } from '@/services/signApi';

export async function loader() {
  const resSignTopics = await getSignTopics();
  return resSignTopics.data;
}

export default function ListSignPage() {
  const signTopics = useRouteLoaderData('sign') as ISignTopic[];

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
            {signTopics?.map((st) => (
              <li key={st.id}>
                <Link to={`/list-sign/${st.id}`} className={styles.item}>
                  <div className={styles.head}>
                    <img
                      src={`${
                        import.meta.env.VITE_API_ORIGIN_URL
                      }/images/sign_topics/${st.image}`}
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
