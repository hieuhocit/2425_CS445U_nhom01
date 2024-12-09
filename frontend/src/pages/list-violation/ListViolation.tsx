/** styles */
import styles from './ListViolation.module.scss';

/** react-router */
import { Link, LoaderFunctionArgs, useLoaderData } from 'react-router-dom';

/** react-redux */
import { useSelector } from 'react-redux';
import { themeMode } from '@/store/theme/themeSelector';

/** components */
import Header from '@/components/header/Header';

/** types */
import { ILawTopic, IViolation } from '@/types/definitions';

/** API */
import { getLawTopic, getViolations } from '@/services/lawApi';

/** redux store */
import store from '@/store/store';

interface ILoaderResponse {
  topic: ILawTopic | null | undefined;
  violations: IViolation[] | null | undefined;
}

export async function loader({ params }: LoaderFunctionArgs) {
  const { lawId } = params;

  const violationType = store.getState().setting.violationType;

  const resTopic = await getLawTopic(lawId as string);
  const resViolation = await getViolations(lawId as string, violationType);

  return {
    topic: resTopic.data,
    violations: resViolation.data,
  };
}

export default function ListViolationPage() {
  const { topic: lawTopic, violations }: ILoaderResponse =
    useLoaderData() as ILoaderResponse;

  const mode = useSelector(themeMode);
  const isDarkMode = mode === 'dark';

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
          {violations?.map((v) => (
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
