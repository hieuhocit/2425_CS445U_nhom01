/** styles */
import styles from './TemplateTest.module.scss';

/** components */
import Header from '@/components/header/Header';
import GridQuestions from '@/components/grid-questions/GridQuestions';
import ExamAction from '@/components/exam-actions/ExamActions';
import QuestionDetails from '@/components/question-details/QuestionDetails';
import Modal from '@/components/modal/Modal';
import ConfirmMessage from '@/components/custom-confirm-message/ConfirmMessage';

/** types */
import { IQuestion } from '@/types/definitions';

/** react */
import { useEffect, useRef, useState } from 'react';

/** utils */
import { convertMsToHHMMSS } from '@/utils/time';

/** react-router */
import { useNavigate } from 'react-router-dom';

export default function TemplateTestPage({
  path,
  index,
  isDark,
  title,
  timer,
  behavior,
  questionsData,
  onChangeParams,
}: {
  isDark: boolean;
  index?: number;
  title: string;
  timer?: number;
  behavior: 'view' | 'exam';
  questionsData: IQuestion[] | null | undefined;
  onChangeParams?: (index: number) => void;
  path?: string;
}) {
  const [questions, setQuestions] = useState<IQuestion[] | null | undefined>(
    questionsData
  );

  const [showModal, setShowModal] = useState(false);

  const [currentIndex, setCurrentIndex] = useState<number>(index ? index : 0);
  const [showGridQuestions, setShowGridQuestions] = useState(false);

  const [ms, setMs] = useState(1000 * (timer ? timer : 0));
  const intervalIdRef = useRef<number | undefined>(undefined);

  const navigate = useNavigate();

  const currentQuestion: IQuestion | undefined = questions?.[currentIndex];

  useEffect(() => {
    if (behavior === 'view') return;
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
    if (typeof onChangeParams === 'function') {
      onChangeParams(currentIndex + 1);
    }
  }

  function handlePrevQuestion() {
    if (currentIndex === undefined || currentIndex === 0) return;
    setCurrentIndex(currentIndex - 1);
    if (typeof onChangeParams === 'function') {
      onChangeParams(currentIndex - 1);
    }
  }

  function handleGoToQuestion(index: number) {
    if (index < 0 || index > (questions as IQuestion[]).length - 1) return;
    setCurrentIndex(index);
    if (typeof onChangeParams === 'function') {
      onChangeParams(index);
    }
  }

  function handleSelectAnswer(questionId: number, answerId: number) {
    if (behavior === 'view') return;
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
    if (behavior === 'view') return;

    // Handle data before send to server
    if (!questions) return;
    // Send result to server
    // Get response from server and handle error
    // Navigate to result page

    setShowModal(false);
    navigate(`result`, { state: { questions } });
  }
  // Modal
  function handleCloseModal() {
    setShowModal(false);
  }

  function handleOpenModal() {
    setShowModal(true);
  }

  return (
    <>
      <div className={`${styles.template} ${isDark ? styles.darkMode : ''}`}>
        <Header title={title} isDark={isDark} path={path} />

        <main className={styles.main}>
          {behavior === 'exam' && (
            <div className={styles.head}>
              <div className={styles.top}>
                <div className={styles.timer}>
                  <p>
                    Thời gian: <span>{convertMsToHHMMSS(ms)}</span>
                  </p>
                </div>
                <div className={styles.actions}>
                  <button onClick={handleOpenModal} type='button'>
                    Nộp bài
                  </button>
                </div>
              </div>
              <div className={styles.bottom}>
                <p>{`${currentIndex + 1}/${questions?.length}`}</p>
              </div>
            </div>
          )}

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
                  isDarkMode={isDark}
                  behavior={{ type: behavior }}
                  question={(questions as IQuestion[])[currentIndex as number]}
                  onChange={handleSelectAnswer}
                />
              </div>
            )}
          </div>
        </main>

        {currentQuestion && (
          <ExamAction
            isDark={isDark}
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
            isDark={isDark}
            questions={questions}
            behavior={{ type: behavior }}
            onGoTo={handleGoToQuestion}
            close={true}
            animation={true}
            currentIndex={currentIndex}
          />
        )}
      </div>
      <Modal
        css={{
          top: '10vh',
          minHeight: 'auto',
          maxHeight: '300px',
          maxWidth: '500px',
        }}
        onClose={handleCloseModal}
        isOpen={showModal}
        isDark={isDark}
      >
        {showModal && (
          <ConfirmMessage
            title='Bạn có chắc bạn muốn nộp bài không?'
            isDark={isDark}
            onConfirm={handleSubmitExam}
            onCancel={handleCloseModal}
          />
        )}
      </Modal>
    </>
  );
}
