/** styles */
import styles from './ExamResult.module.scss';

/** react-redux */
import { useSelector } from 'react-redux';
import { themeMode } from '@/store/theme/themeSelector';

/** components */
import Header from '@/components/header/Header';
import QuestionDetails from '@/components/question-details/QuestionDetails';

/** types */
import { IQuestion } from '@/types/definitions';

/** react-router */
import { useLocation } from 'react-router-dom';

/** icons */
import {
  FaRegCircleCheck,
  FaRegCircleXmark,
  FaCircleCheck,
  FaRegCircle,
  FaInfinity,
} from 'react-icons/fa6';
import { GoGoal } from 'react-icons/go';

export default function ExamResultPage() {
  const location = useLocation();

  const data: {
    questions: IQuestion[];
    totalTrueAnswer: number;
    totalFalseAnswer: number;
    totalRequiredAnswerTrue: number;
    totalSkipAnswer: number;
    totalQuestion: number;
  } = location.state?.data;

  const questions = data?.questions;
  const mode = useSelector(themeMode);
  const isDarkMode = mode === 'dark';

  return (
    <div
      className={`${styles.examResult} ${
        isDarkMode ? styles.darkMode : undefined
      }`}
    >
      <Header title='Kết quả bài thi' isDark={isDarkMode} path='/list-exam' />
      <main className={styles.main}>
        <div className={styles.head}>
          <div className={styles.summary}>
            <div className={styles.record}>
              <FaRegCircleCheck
                className={`${styles.icon} ${styles.colorGreen}`}
              />
              <p>
                Số câu đúng: <span>{data.totalTrueAnswer}</span>
              </p>
            </div>
            <div className={styles.record}>
              <FaRegCircleXmark
                className={`${styles.icon} ${styles.colorRed}`}
              />
              <p>
                Số câu sai: <span>{data.totalFalseAnswer}</span>
              </p>
            </div>
            <div className={styles.record}>
              <FaCircleCheck className={`${styles.icon} ${styles.colorBlue}`} />
              <p>
                Số câu liệt đúng: <span>{data.totalRequiredAnswerTrue}</span>
              </p>
            </div>
            <div className={styles.record}>
              <FaRegCircle className={`${styles.icon} ${styles.colorGray}`} />
              <p>
                Số câu không làm: <span>{data.totalSkipAnswer}</span>
              </p>
            </div>
            <div className={styles.record}>
              <FaInfinity
                className={`${styles.icon} ${styles.colorTurquoise}`}
              />
              <p>
                Tổng số câu hỏi: <span>{data.totalQuestion}</span>
              </p>
            </div>
            <div className={styles.record}>
              <GoGoal className={`${styles.icon} ${styles.colorRed}`} />
              <p>
                Kết quả:{' '}
                <span
                  className={`${styles.result} ${
                    data.totalRequiredAnswerTrue && data.totalTrueAnswer >= 2
                      ? styles.colorGreen
                      : styles.colorRed
                  }`}
                >
                  {data.totalRequiredAnswerTrue && data.totalTrueAnswer >= 2
                    ? 'ĐẠT'
                    : 'CHƯA ĐẠT'}
                </span>
              </p>
            </div>
          </div>
        </div>

        <div className={styles.body}>
          {questions && questions.length > 0 && (
            <div className={styles.list}>
              {questions.map((question) => (
                <QuestionDetails
                  key={question.id}
                  isDarkMode={isDarkMode}
                  behavior={{ type: 'view' }}
                  question={question}
                />
              ))}
            </div>
          )}

          {questions && questions.length === 0 && (
            <p>
              Hiện tại chưa có câu hỏi, vui lòng quay lại sau hoặc liên hệ với
              quản trị viên.
            </p>
          )}

          {!questions && (
            <p>
              Đã xảy ra lỗi, vui lòng thử lại sau hoặc liên hệ với quản trị
              viên.
            </p>
          )}
        </div>
      </main>
    </div>
  );
}
