/** styles */
import styles from './ListWrong.module.scss';

/** react-redux */
import { useSelector } from 'react-redux';
import { themeMode } from '@/store/theme/themeSelector';

/** components */
import Header from '@/components/header/Header';
import QuestionDetails from '@/components/question-details/QuestionDetails';

/** types */
import { IQuestion } from '@/types/definitions';

/** store */
import store from '@/store/store';

/** API */
import { getWrongAnswers } from '@/services/historyApi';

/** react-router */
import { useLoaderData } from 'react-router-dom';

export async function loader() {
  const licenseId =
    store.getState().setting.currentLicenseId ||
    localStorage.getItem('licenseId') ||
    1;

  const res = await getWrongAnswers(licenseId);
  const resData = await res.json();
  return resData?.data;
}

export default function ListWrongPage() {
  const mode = useSelector(themeMode);
  const isDarkMode = mode === 'dark';

  const wrongQuestions = useLoaderData() as IQuestion[] | null | undefined;

  return (
    <div
      className={`${styles.listWrongPage} ${
        isDarkMode ? styles.darkMode : undefined
      }`}
    >
      <Header title='Các câu sai' isDark={isDarkMode} />
      <main className={styles.main}>
        {wrongQuestions && wrongQuestions.length > 0 && (
          <div className={styles.list}>
            {wrongQuestions.map((question) => (
              <QuestionDetails
                key={question.id}
                isDarkMode={isDarkMode}
                behavior={{ type: 'view' }}
                question={question}
              />
            ))}
          </div>
        )}

        {(!wrongQuestions ||
          (wrongQuestions && wrongQuestions.length === 0)) && (
          <p>Xin chúc mừng, hiện tại bạn không có câu nào làm sai!</p>
        )}
      </main>
    </div>
  );
}
