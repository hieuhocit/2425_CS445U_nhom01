/** styles */
import styles from './ListRequired.module.scss';

/** react-redux */
import { useSelector } from 'react-redux';
import { themeMode } from '@/store/theme/themeSelector';
import { questionsSelector } from '@/store/data/dataSelector';

/** components */
import Header from '@/components/header/Header';
import QuestionDetails from '@/components/question-details/QuestionDetails';
import ExamAction from '@/components/exam-actions/ExamActions';
import GridQuestions from '@/components/grid-questions/GridQuestions';

/** types */
import { IQuestion } from '@/types/definitions';

/** react */
import { useState } from 'react';

export default function ListRequiredPage() {
  const [showGridQuestion, setShowGridQuestions] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const mode = useSelector(themeMode);
  const isDarkMode = mode === 'dark';

  const questions = useSelector(questionsSelector);

  const requiredQuestion: IQuestion[] | null = questions.filter(
    (q) => q.required
  );

  const currentQuestion: IQuestion | undefined =
    requiredQuestion?.[currentIndex];

  function handleNextQuestion() {
    if (currentIndex === (requiredQuestion as IQuestion[]).length - 1) return;
    setCurrentIndex((prevIndex) => prevIndex + 1);
  }

  function handlePrevQuestion() {
    if (currentIndex === 0) return;
    setCurrentIndex((prevIndex) => prevIndex - 1);
  }

  function handleGoToQuestion(index: number) {
    if (index < 0 || index > (requiredQuestion as IQuestion[]).length - 1)
      return;
    setCurrentIndex(index);
  }

  function handleShowGridQuestions() {
    setShowGridQuestions(true);
  }

  function handleCloseGridQuestions() {
    setShowGridQuestions(false);
  }

  return (
    <div
      className={`${styles.listRequiredPage} ${
        isDarkMode ? styles.darkMode : undefined
      }`}
    >
      <Header title='Câu liệt' isDark={isDarkMode} />
      <main className={styles.main}>
        {currentQuestion && (
          <div className={styles.list}>
            <QuestionDetails
              key={(currentQuestion as IQuestion).id}
              isDarkMode={isDarkMode}
              behavior={{ type: 'view' }}
              question={currentQuestion}
            />
          </div>
        )}

        {!currentQuestion && (
          <p>Hiện tại chưa có câu hỏi, vui lòng quay lại sau!</p>
        )}
      </main>
      {requiredQuestion && (
        <ExamAction
          isDark={isDarkMode}
          min={0}
          max={requiredQuestion.length - 1}
          currentIndex={currentIndex}
          onNext={handleNextQuestion}
          onPrev={handlePrevQuestion}
          onShow={handleShowGridQuestions}
        />
      )}
      {showGridQuestion && (
        <GridQuestions
          show={showGridQuestion}
          onClose={handleCloseGridQuestions}
          isDark={isDarkMode}
          questions={requiredQuestion}
          behavior={{ type: 'view' }}
          onGoTo={handleGoToQuestion}
          close={true}
          animation={true}
          currentIndex={currentIndex}
        />
      )}
    </div>
  );
}
