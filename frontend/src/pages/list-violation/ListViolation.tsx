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

interface ILoaderResponse {
  topic: ILawTopic | null | undefined;
  violations: IViolation[] | null | undefined;
}

export async function loader({ request }: LoaderFunctionArgs) {
  const searchParams = new URL(request.url).searchParams;

  const violationTopic = searchParams.get('violationTopic');
  const violationType = searchParams.get('violationType');

  const topic = await getLawTopic(violationTopic as string);
  const resViolations = await getViolations(
    violationTopic as string,
    violationType as string
  );

  return {
    topic: topic.data,
    violations: resViolations.data,
  };
}

export default function ListViolationPage() {
  const { topic, violations }: ILoaderResponse =
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
        title={topic?.display as string}
        isDark={isDarkMode}
        path='/list-law'
      />

      <main className={styles.main}>
        <ul className={styles.list}>
          {violations?.map((v) => (
            <li key={v.id}>
              <h2>{v.violation}</h2>
              <p>{v.fines}</p>
              <Link
                to={`/violation?violationTopic=${topic?.id}&violationType=${v.violation_type}&index=${v.id}`}
              >
                Xem chi tiết
              </Link>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
