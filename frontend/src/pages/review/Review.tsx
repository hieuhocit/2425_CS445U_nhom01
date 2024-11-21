/** styles */
import styles from './Review.module.scss';

/** react-redux */
import { useSelector } from 'react-redux';
import { themeMode } from '@/store/theme/themeSelector';

/** components */
import Header from '@/components/header/Header';
import GridQuestions from '@/components/grid-questions/GridQuestions';
import ExamAction from '@/components/exam-actions/ExamActions';
import QuestionDetails from '@/components/question-details/QuestionDetails';

/** types */
import { IQuestion } from '@/types/definitions';
import { useSearchParams } from 'react-router-dom';

/** react */
import { useState } from 'react';

export default function ReviewPage() {
  const mode = useSelector(themeMode);
  const [searchParams, setSearchParams] = useSearchParams();
  const [showGridQuestions, setShowGridQuestions] = useState(false);
  const [currentIndex, setCurrentIndex] = useState<number>(
    parseInt(searchParams.get('index') || '')
  );

  const isDarkMode = mode === 'dark';
  const currentQuestion = questions?.[currentIndex];

  function handleNextQuestion() {
    if (currentIndex === (questions as IQuestion[]).length - 1) return;
    setCurrentIndex((prevIndex) => prevIndex + 1);
    setSearchParams({ index: currentIndex + 1 + '' });
  }

  function handlePrevQuestion() {
    if (currentIndex === 0) return;
    setCurrentIndex((prevIndex) => prevIndex - 1);
    setSearchParams({ index: currentIndex - 1 + '' });
  }

  function handleGoToQuestion(index: number) {
    if (index < 0 || index > (questions as IQuestion[]).length - 1) return;
    setCurrentIndex(index);
    setSearchParams({ index: index + '' });
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
              key={(questions[currentIndex] as IQuestion).id}
              isDarkMode={isDarkMode}
              behavior={{ type: 'view' }}
              question={questions[currentIndex]}
            />
          </div>
        )}
      </main>
      {currentQuestion && (
        <ExamAction
          isDark={isDarkMode}
          min={0}
          max={questions.length - 1}
          currentIndex={currentIndex}
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

// DUMMY DATA

const question1: IQuestion = {
  id: '1',
  title: 'Câu 2: “Làn đường” là gì?',
  answers: [
    {
      id: '1',
      title:
        'Là một phần của phần đường xe chạy được chia theo chiều dọc của đường, sử dụng cho xe chạy.',
    },
    {
      id: '2',
      title:
        'Là một phần của phần đường xe chạy được chia theo chiều dọc của đường, có bề rộng đủ cho xe chạy an toàn.',
    },
    {
      id: '3',
      title:
        'Là một phần của phần đường xe chạy được chia theo chiều dọc của đường, có đủ bề rộng cho xe ô tô chạy an toàn.',
    },
  ],
  instruction: 'Hướng dẫn: Có bề rộng đủ cho xe chạy an toàn.',
  idTrueAnswer: '2',
  required: true,
};

const question2: IQuestion = {
  id: '2',
  title:
    'Câu 443: Trong các biển dưới đây biển nào là biển “Hết mọi lệnh cấm”?',
  image: 'https://beta.gplx.app/images/questions/q443.png',
  answers: [
    {
      id: 'id1',
      title: 'Biển 1.',
    },
    {
      id: 'id2',
      title: 'Biển 2.',
    },
    {
      id: 'id3',
      title: 'Biển 3.',
    },
    {
      id: 'id4',
      title: 'Cả ba biển',
    },
  ],
  instruction: `Hướng dẫn: Biển 1: DP.134 “Hết hạn chế tốc độ tối đa”; Biển 2:DP.135 “Hết tất cả các lệnh cấm”; Biển 3: R.307 “Hết hạn chế tốc độ tối thiểu”.`,
  idTrueAnswer: 'id2',
  required: false,
};

const questions: IQuestion[] | null = [question1, question2];
