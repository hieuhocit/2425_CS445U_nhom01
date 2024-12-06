/** styles */
import styles from './Exam.module.scss';

/** react-redux */
import { useSelector } from 'react-redux';
import { themeMode } from '@/store/theme/themeSelector';
import { currentLicenseSelector } from '@/store/setting/settingSelector';
import { examsSelector, questionsSelector } from '@/store/data/dataSelector';

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
import { useNavigate, useParams } from 'react-router-dom';

export default function ExamPage() {
  const [showGridQuestions, setShowGridQuestions] = useState(false);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const currentLicense = useSelector(currentLicenseSelector);
  const { examId } = useParams();

  const questionsData = useSelector(questionsSelector);
  const examsData = useSelector(examsSelector);

  const exam = examsData.find((e) => e.id === Number(examId));

  // GET Questions match Exam id && License id
  const filteredQuestions = questionsData.filter(
    (q) =>
      q.exam_ids.includes(exam?.id as number) &&
      q.license_ids.includes(currentLicense.id)
  );

  const [questions, setQuestions] = useState<IQuestion[] | null>(
    filteredQuestions
  );

  const [ms, setMs] = useState(1000 * currentLicense.timer);
  const intervalIdRef = useRef<number | undefined>(undefined);

  const navigate = useNavigate();

  const mode = useSelector(themeMode);
  const isDarkMode = mode === 'dark';

  const currentQuestion: IQuestion | undefined =
    filteredQuestions?.[currentIndex];

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

  function handleSelectAnswer(questionId: number, answerId: number) {
    const cloneQuestions: IQuestion[] | null = JSON.parse(
      JSON.stringify(questions)
    );
    if (!cloneQuestions) return;

    const currentQuestion = cloneQuestions.find((q) => q.id === questionId);
    if (!currentQuestion) return;
    currentQuestion.idSelectedAnswer = answerId;
    setQuestions(cloneQuestions);
  }

  function handleSubmitExam() {
    // Handle data before send to server
    if (!questions) return;
    // Send result to server
    // Get response from server and handle error
    // Navigate to result page

    navigate(`result`, { state: { questions } });
  }

  return (
    <div className={`${styles.exam} ${isDarkMode ? styles.darkMode : ''}`}>
      <Header title={`Đề số ${exam?.title}`} isDark={isDarkMode} />

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
          currentIndex={currentIndex}
        />
      )}
    </div>
  );
}
