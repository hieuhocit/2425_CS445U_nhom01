/** styles */
import styles from './TopicDetails.module.scss';

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

/** react-router */
import { useParams } from 'react-router-dom';

export default function TopicDetailsPage() {
  const mode = useSelector(themeMode);
  const [showGridQuestions, setShowGridQuestions] = useState(false);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const questionsData = useSelector(questionsSelector);
  const { topicId } = useParams();

  const questions =
    Number(topicId) === 0
      ? questionsData
      : Number(topicId) === 8
      ? questionsData.filter((q) => q.required)
      : questionsData.filter((q) => q.topic_id === Number(topicId));

  const isDarkMode = mode === 'dark';

  const currentQuestion: IQuestion | undefined = questions?.[currentIndex];

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
    <div
      className={`${styles.topicDetails} ${isDarkMode ? styles.darkMode : ''}`}
    >
      <Header title='Toàn bộ câu hỏi' isDark={isDarkMode} />

      <main className={styles.main}>
        {!currentQuestion && (
          <p>
            Hiện tại chưa có câu hỏi, vui lòng quay lại sau hoặc liên hệ với
            quản trị viên
          </p>
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
        />
      )}
    </div>
  );
}
