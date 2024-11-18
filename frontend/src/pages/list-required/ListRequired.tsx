/** styles */
import styles from './ListRequired.module.scss';

/** react-redux */
import { useSelector } from 'react-redux';
import { themeMode } from '@/store/theme/themeSelector';

/** components */
import Header from '@/components/header/Header';
import QuestionDetails from '@/components/question-details/QuestionDetails';
import ExamAction from '@/components/exam-actions/ExamActions';
import GridQuestions from '@/components/grid-questions/GridQuestions';

/** types */
import { IQuestion } from '@/types/definations';

/** react */
import { useState } from 'react';

export default function ListRequiredPage() {
  const [showGridQuestion, setShowGridQuestions] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const mode = useSelector(themeMode);
  const isDarkMode = mode === 'dark';

  const question1: IQuestion = {
    id: '1',
    title: 'Câu 17: Hành vi nào dưới đây bị nghiêm cấm?',
    answers: [
      {
        id: '1',
        title: 'Đỗ xe trên đường phố',
      },
      {
        id: '2',
        title: 'Sử dụng xe đạp đi trên các tuyến quốc lộ có tốc độ cao.',
      },
      {
        id: '3',
        title: 'Làm hỏng (cố ý) cọc tiêu, gương cầu, dải phân cách.',
      },
      {
        id: '4',
        title: 'Sử dụng còi và quay đầu xe trong khu dân cư.',
      },
    ],
    idTrueAnswer: '3',
    required: true,
  };

  const question2: IQuestion = {
    id: '2',
    title:
      'Câu 40: Người lái xe không được quay đầu xe trong các trường hợp nào dưới đây?',
    answers: [
      {
        id: 'id1',
        title:
          'Ở phần đường dành cho người đi bộ qua đường, trên cầu, đầu cầu, đường cao tốc, đường hẹp, đường dốc, tại nơi đường bộ giao nhau cùng mức với đường sắt.',
      },
      {
        id: 'id2',
        title:
          'Ở phía trước hoặc phía sau của phần đường dành cho người đi bộ qua đường, trên đường quốc lộ, tại nơi đường bộ giao nhau không cùng mức với đường sắt.',
      },
      {
        id: 'id3',
        title: 'Cả ý 1 và ý 2.',
      },
    ],
    instruction: `Hướng dẫn: Nơi giao nhau cùng mức với đường sắt không được quay đầu xe.`,
    idTrueAnswer: 'id1',
    required: true,
  };

  const requiredQuestion: IQuestion[] | null = [question1, question2];

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
        />
      )}
    </div>
  );
}
