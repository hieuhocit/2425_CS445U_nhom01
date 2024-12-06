/** styles */
import styles from './SignDetails.module.scss';

/** components */
import Header from '@/components/header/Header';

/** react-redux */
import { themeMode } from '@/store/theme/themeSelector';
import { useSelector } from 'react-redux';

/** react-router */
import { useParams } from 'react-router-dom';

/** DUMMY DATA */
import { signs, signTopics } from '@/data/data';

export default function SignDetailsPage() {
  const mode = useSelector(themeMode);
  const isDarkMode = mode === 'dark';

  const { signId } = useParams();

  const signTopic = signTopics.find((st) => st.id === Number(signId));
  const list = signs.filter((s) => s.sign_topic_id === signTopic?.id);

  return (
    <div
      className={`${styles.signDetails} ${
        isDarkMode ? styles.darkMode : undefined
      }`}
    >
      <Header title={signTopic?.display as string} isDark={isDarkMode} />
      <main className={styles.main}>
        <ul className={styles.list}>
          {list.map((s) => (
            <li className={styles.item}>
              <div className={styles.head}>
                <h2>
                  {s.code}: {s.name}
                </h2>
              </div>
              <div className={styles.body}>
                <img
                  src={`https://beta.gplx.app/images/signs/sign${s.image}.png`}
                  alt={s.name + ' sign image'}
                />
                <p>{s.detail}</p>
              </div>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
