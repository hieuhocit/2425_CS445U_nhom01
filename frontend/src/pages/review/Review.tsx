/** styles */
import styles from './Review.module.scss';

/** react-redux */
import { useSelector } from 'react-redux';
import { themeMode } from '@/store/theme/themeSelector';
import { questionsSelector } from '@/store/data/dataSelector';

/** components */
import Header from '@/components/header/Header';
import GridQuestions from '@/components/grid-questions/GridQuestions';
import ExamAction from '@/components/exam-actions/ExamActions';
import QuestionDetails from '@/components/question-details/QuestionDetails';

/** types */
import { IQuestion } from '@/types/definitions';

/** react */
import { useState } from 'react';

export default function ReviewPage() {
  const mode = useSelector(themeMode);
  const [showGridQuestions, setShowGridQuestions] = useState(false);
  const [currentIndex, setCurrentIndex] = useState<number | undefined>(
    undefined
  );

  const questions = useSelector(questionsSelector);

  const isDarkMode = mode === 'dark';

  let currentQuestion = undefined;
  if (currentIndex !== undefined) {
    currentQuestion = questions?.[currentIndex];
  }

  function handleNextQuestion() {
    if (
      currentIndex === undefined ||
      currentIndex === (questions as IQuestion[]).length - 1
    )
      return;
    setCurrentIndex(currentIndex + 1);
  }

  function handlePrevQuestion() {
    if (currentIndex === undefined || currentIndex === 0) return;
    setCurrentIndex(currentIndex - 1);
  }

  function handleGoToQuestion(index: number) {
    if (index < 0 || index > (questions as IQuestion[]).length - 1) return;
    setCurrentIndex(index);
  }

  return (
    <div className={`${styles.review} ${isDarkMode ? styles.darkMode : ''}`}>
      <Header title='Ôn tập' isDark={isDarkMode} />

      <main className={styles.main}>
        {!currentQuestion && (
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
        )}

        {currentQuestion && (
          <div className={styles.list}>
            <QuestionDetails
              key={(questions as IQuestion[])[currentIndex as number].id}
              isDarkMode={isDarkMode}
              behavior={{ type: 'view' }}
              question={(questions as IQuestion[])[currentIndex as number]}
            />
          </div>
        )}
      </main>
      {currentQuestion && (
        <ExamAction
          isDark={isDarkMode}
          min={0}
          max={(questions as IQuestion[]).length - 1}
          currentIndex={currentIndex as number}
          onNext={handleNextQuestion}
          onPrev={handlePrevQuestion}
          onShow={() => setShowGridQuestions(true)}
        />
      )}
      {currentQuestion && showGridQuestions && (
        <GridQuestions
          show={showGridQuestions}
          onClose={() => setShowGridQuestions(false)}
          isDark={isDarkMode}
          questions={questions}
          behavior={{ type: 'view' }}
          onGoTo={handleGoToQuestion}
          close={true}
          animation={true}
          currentIndex={currentIndex as number}
        />
      )}
    </div>
  );
}
