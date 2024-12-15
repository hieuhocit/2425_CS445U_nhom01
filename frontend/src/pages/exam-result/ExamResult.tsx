/** styles */
import styles from './ExamResult.module.scss';

/** react-redux */
import { useSelector } from 'react-redux';
import { themeMode } from '@/store/theme/themeSelector';
import { currentLicenseSelector } from '@/store/setting/settingSelector';

/** components */
import Header from '@/components/header/Header';
import QuestionDetails from '@/components/question-details/QuestionDetails';

/** types */
import { IAnswer, IExam, ILicense, IQuestion } from '@/types/definitions';

/** react-router */
import { useLocation, useNavigate } from 'react-router-dom';

/** react-router */
import { LoaderFunctionArgs, useLoaderData } from 'react-router-dom';

/** API */
import { getQuestions } from '@/services/historyApi';

export async function loader({ params }: LoaderFunctionArgs) {
  const { examHistoryId } = params;

  if (!examHistoryId) return null;

  const res = await getQuestions(examHistoryId as string);
  const resData = await res.json();

  return {
    exam: resData?.data?.exam,
    questions: resData?.data?.questions,
  };
}

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
  const navigate = useNavigate();

  const currentLicense = useSelector(currentLicenseSelector);

  const mode = useSelector(themeMode);
  const isDarkMode = mode === 'dark';

  let prevPath;
  let title;
  let questions;

  const loaderData = useLoaderData() as {
    exam: IExam | undefined | null;
    questions: IQuestion[] | undefined | null;
  };

  console.log(loaderData, location?.state);

  if (location?.state) {
    const state = location.state as {
      questions: IQuestion[];
      title: string;
      prevPath: string;
    };
    prevPath = state?.prevPath;
    title = state?.title;
    questions = state?.questions;
  } else {
    prevPath = '..';
    title = `Lịch sử thi ${
      Number(loaderData?.exam?.title) ? `đề số ${loaderData?.exam?.title}` : ''
    } `;
    questions = loaderData?.questions;
  }

  if (!questions || !prevPath || !title) {
    return (
      <div
        className={`${styles.examResult} ${
          isDarkMode ? styles.darkMode : undefined
        }`}
      >
        <Header title={'Đã xảy ra lỗi'} isDark={isDarkMode} path={'..'} />
        <main className={styles.main}>
          <div className={styles.body}>
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

  const totalTrueAnswer = questions?.filter((q) => {
    const trueAnswer = (q.answers as IAnswer[]).find((a) => a.correct);
    return q.idSelectedAnswer === trueAnswer?.id;
  }).length;

  const totalFalseAnswer = questions?.filter((q) => {
    const trueAnswer = (q.answers as IAnswer[]).find((a) => a.correct);
    return q.idSelectedAnswer && q.idSelectedAnswer !== trueAnswer?.id;
  }).length;

  const totalRequiredAnswerTrue = questions?.filter((q) => {
    if (q.required) {
      const trueAnswer = (q.answers as IAnswer[]).find((a) => a.correct);
      return q.idSelectedAnswer === trueAnswer?.id;
    }
    return false;
  }).length;

  const totalSkipAnswer = questions?.filter((q) => {
    return !q.idSelectedAnswer;
  }).length;

  const totalQuestion = questions?.length;

  const isWrongRequiredAnswer =
    totalRequiredAnswerTrue !== questions?.filter((q) => q.required).length;

  return (
    <div
      className={`${styles.examResult} ${
        isDarkMode ? styles.darkMode : undefined
      }`}
    >
      <Header title={title} isDark={isDarkMode} path={prevPath} />
      <main className={styles.main}>
        <div className={styles.head}>
          {questions && questions.length > 0 && (
            <div className={styles.summary}>
              <div className={styles.record}>
                <FaRegCircleCheck
                  className={`${styles.icon} ${styles.colorGreen}`}
                />
                <p>
                  Số câu đúng: <span>{totalTrueAnswer}</span>
                </p>
              </div>
              <div className={styles.record}>
                <FaRegCircleXmark
                  className={`${styles.icon} ${styles.colorRed}`}
                />
                <p>
                  Số câu sai: <span>{totalFalseAnswer}</span>
                </p>
              </div>
              <div className={styles.record}>
                <FaCircleCheck
                  className={`${styles.icon} ${styles.colorBlue}`}
                />
                <p>
                  Số câu liệt đúng: <span>{totalRequiredAnswerTrue}</span>
                </p>
              </div>
              <div className={styles.record}>
                <FaRegCircle className={`${styles.icon} ${styles.colorGray}`} />
                <p>
                  Số câu không làm: <span>{totalSkipAnswer}</span>
                </p>
              </div>
              <div className={styles.record}>
                <FaInfinity
                  className={`${styles.icon} ${styles.colorTurquoise}`}
                />
                <p>
                  Tổng số câu hỏi: <span>{totalQuestion}</span>
                </p>
              </div>
              <div className={styles.record}>
                <GoGoal className={`${styles.icon} ${styles.colorRed}`} />
                <p>
                  Kết quả:{' '}
                  <span
                    className={`${styles.result} ${
                      isWrongRequiredAnswer &&
                      totalTrueAnswer >= (currentLicense as ILicense)?.pass
                        ? styles.colorGreen
                        : styles.colorRed
                    }`}
                  >
                    {isWrongRequiredAnswer &&
                    totalTrueAnswer >= (currentLicense as ILicense)?.pass
                      ? 'ĐẠT'
                      : 'CHƯA ĐẠT'}
                  </span>
                </p>
              </div>
            </div>
          )}
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
      <footer className={styles.footer}>
        {questions && questions.length > 0 && (
          <div className={styles.actions}>
            <button onClick={() => navigate(prevPath)}>Quay lại</button>
          </div>
        )}
      </footer>
    </div>
  );
}
