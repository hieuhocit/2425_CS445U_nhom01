/** styles */
import styles from './Exam.module.scss';

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

/** react */
import { useEffect, useRef, useState } from 'react';

/** utils */
import { convertMsToHHMMSS } from '@/utils/time';

/** react-router */
import { useNavigate } from 'react-router-dom';

export default function ExamPage() {
  const [questions, setQuestions] = useState(DUMMY_DATA);
  const [showGridQuestions, setShowGridQuestions] = useState(false);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const [ms, setMs] = useState(1000 * 60 * 20);
  const intervalIdRef = useRef<number | undefined>(undefined);

  const navigate = useNavigate();

  const mode = useSelector(themeMode);
  const isDarkMode = mode === 'dark';

  const currentQuestion: IQuestion | undefined = questions?.[currentIndex];

  useEffect(() => {
    intervalIdRef.current = window.setInterval(() => {
      if (ms > 0) {
        setMs((prevMs) => prevMs - 1000);
      } else {
        // Nếu hết thời gian thì tự động nộp bài
        handleSubmitExam();
      }
    }, 1000);

    return () => {
      clearInterval(intervalIdRef.current);
    };
  }, [ms]);

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

  function handleSelectAnswer(questionId: string, answerId: string) {
    const cloneQuestions: IQuestion[] | null = JSON.parse(
      JSON.stringify(questions)
    );
    const currentQuestion = cloneQuestions?.find((q) => q.id === questionId);
    if (!currentQuestion) return;
    currentQuestion.idSelectedAnswer = answerId;
    setQuestions(cloneQuestions);
  }

  function handleSubmitExam() {
    // Handle data before send to server
    if (!questions) return;
    // Send result to server
    // Get response from server and handle error

    // Suppose data sent back from the server has true answers, the number of true answers, the number of false answers, the number of required true answers,...
    questions[0].idTrueAnswer = '2';
    questions[1].idTrueAnswer = 'id2';
    questions[2].idTrueAnswer = 'id3';
    const data: {
      questions: IQuestion[];
      totalTrueAnswer: number;
      totalFalseAnswer: number;
      totalRequiredAnswerTrue: number;
      totalSkipAnswer: number;
      totalQuestion: number;
    } = {
      questions: JSON.parse(JSON.stringify(questions)),
      totalTrueAnswer: questions.filter(
        (q) => q.idSelectedAnswer === q.idTrueAnswer
      ).length,
      totalFalseAnswer: questions.filter((q) =>
        q.idSelectedAnswer ? q.idSelectedAnswer !== q.idTrueAnswer : false
      ).length,
      totalRequiredAnswerTrue: questions.filter((q) =>
        q.required ? q.idSelectedAnswer === q.idTrueAnswer : false
      ).length,
      totalSkipAnswer: questions.filter((q) => !q.idSelectedAnswer).length,
      totalQuestion: questions.length,
    };
    // Navigate to result page
    navigate(`result`, { state: { data } });
  }

  return (
    <div className={`${styles.exam} ${isDarkMode ? styles.darkMode : ''}`}>
      <Header title='Đề số 01' isDark={isDarkMode} />

      <main className={styles.main}>
        <div className={styles.head}>
          <div className={styles.top}>
            <div className={styles.timer}>
              <p>
                Thời gian: <span>{convertMsToHHMMSS(ms)}</span>
              </p>
            </div>
            <div className={styles.actions}>
              <button
                onClick={() => {
                  const ok = confirm('Bạn có chắc bạn muốn nộp bài không?');
                  if (ok) handleSubmitExam();
                }}
                type='button'
              >
                Nộp bài
              </button>
            </div>
          </div>
          <div className={styles.bottom}>
            <p>{`${currentIndex + 1}/${questions?.length}`}</p>
          </div>
        </div>

        <div className={styles.body}>
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
                behavior={{ type: 'exam' }}
                question={(questions as IQuestion[])[currentIndex as number]}
                onChange={handleSelectAnswer}
              />
            </div>
          )}
        </div>
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
          behavior={{ type: 'exam' }}
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
  required: false,
};

const question3: IQuestion = {
  id: '3',
  title:
    'Câu 41: Biển báo hiệu hình tròn có nền xanh lam có hình vẽ màu trắng là loại biển gì dưới đây?',
  image: 'https://beta.gplx.app/images/questions/q74.png',
  answers: [
    {
      id: 'id1',
      title: 'Biển báo nguy hiểm.',
    },
    {
      id: 'id2',
      title: 'Biển báo cấm.',
    },
    {
      id: 'id3',
      title: 'Biển báo hiệu lệnh phải thi hành.',
    },
    {
      id: 'id4',
      title: 'Biển báo chỉ dẫn.',
    },
  ],
  required: false,
};

const DUMMY_DATA: IQuestion[] | null = [question1, question2, question3];
