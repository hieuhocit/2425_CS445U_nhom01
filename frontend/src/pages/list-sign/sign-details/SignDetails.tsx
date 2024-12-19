/** styles */
import styles from './SignDetails.module.scss';

/** components */
import Header from '@/components/header/Header';

/** react-redux */
import { themeMode } from '@/store/theme/themeSelector';
import { useSelector } from 'react-redux';

/** react-router */
import {
  LoaderFunctionArgs,
  useLoaderData,
  useParams,
  useRouteLoaderData,
} from 'react-router-dom';

/** types */
import { ISign, ISignTopic } from '@/types/definitions';
import { getSigns } from '@/services/signApi';

import { BASE_URL } from '@/config/baseUrl';

export async function loader({ params }: LoaderFunctionArgs) {
  const { signId } = params;

  const resSigns = await getSigns(signId);

  return resSigns.data;
}

export default function SignDetailsPage() {
  const mode = useSelector(themeMode);
  const isDarkMode = mode === 'dark';

  const signTopics = useRouteLoaderData('sign') as ISignTopic[];
  const signs = useLoaderData() as ISign[];

  const { signId } = useParams();

  const signTopic = signTopics.find((st) => st.id === Number(signId));

  return (
    <div
      className={`${styles.signDetails} ${
        isDarkMode ? styles.darkMode : undefined
      }`}
    >
      <Header title={signTopic?.display as string} isDark={isDarkMode} />
      <main className={styles.main}>
        <ul className={styles.list}>
          {signs.map((s) => (
            <li key={s.id} className={styles.item}>
              <div className={styles.head}>
                <h2>
                  {s.code}: {s.name}
                </h2>
              </div>
              <div className={styles.body}>
                <img
                  src={`${BASE_URL}/images/signs/${s.image}`}
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
