/** styles */
import styles from './Review.module.scss';

/** react-redux */
import { useSelector } from 'react-redux';
import { themeMode } from '@/store/theme/themeSelector';

/** components */
import Header from '@/components/header/Header';
import GridQuestions from '@/components/grid-questions/GridQuestions';

/** types */
import { IQuestion } from '@/types/definitions';

/** react-router */
import { useNavigate, useRouteLoaderData } from 'react-router-dom';

export default function ReviewPage() {
  const { questions } = useRouteLoaderData('root') as {
    questions: IQuestion[] | undefined;
  };

  const navigate = useNavigate();

  const mode = useSelector(themeMode);

  const isDarkMode = mode === 'dark';

  function handleGoToQuestion(index: number) {
    if (index < 0 || index > (questions as IQuestion[]).length - 1) return;
    navigate('/review/questions', { state: { index: index } });
  }

  return (
    <>
      <div className={`${styles.review} ${isDarkMode ? styles.darkMode : ''}`}>
        <Header title='Ôn tập' isDark={isDarkMode} />

        <main className={styles.main}>
          <GridQuestions
            isDark={isDarkMode}
            behavior={{ type: 'view' }}
            questions={questions}
            css={{
              position: 'relative',
              backgroundColor: 'transparent',
            }}
            show={true}
            close={false}
            animation={false}
            onGoTo={handleGoToQuestion}
          />
        </main>
      </div>
    </>
  );
}
