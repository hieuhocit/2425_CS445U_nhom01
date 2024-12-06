/** styles */
import styles from './DetailsExamHistory.module.scss';

/** react-redux */
import { useSelector } from 'react-redux';
import { themeMode } from '@/store/theme/themeSelector';

/** components */
import Header from '@/components/header/Header';
import QuestionDetails from '@/components/question-details/QuestionDetails';

/** types */
import { IQuestion } from '@/types/definitions';

export default function DetailsExamHistoryPage() {
  const mode = useSelector(themeMode);
  const isDarkMode = mode === 'dark';

  const questions: IQuestion[] | null = [
    {
      image: '',
      text: 'Phần của đường bộ được sử dụng cho các phương tiện giao thông qua lại là gì?',
      tip: 'Lề đường không sử dụng cho các phương tiện giao thông qua lại.',
      required: false,
      id: 1,
      topic_id: 1,
      license_ids: [6, 7, 8, 9, 10, 5, 3, 4, 1, 2],
      exam_ids: [1, 9, 27, 47, 63, 67, 83, 85, 100],
      answers: [
        {
          text: 'Phần mặt đường và lề đường.',
          correct: false,
          id: 1,
          question_id: 1,
        },
        {
          text: 'Phần đường xe chạy.',
          correct: true,
          id: 2,
          question_id: 1,
        },
        {
          text: 'Phần đường xe cơ giới.',
          correct: false,
          id: 3,
          question_id: 1,
        },
      ],
      idSelectedAnswer: 1,
    },
    {
      image: '',
      text: '“Làn đường” là gì?',
      tip: 'Có bề rộng đủ cho xe chạy an toàn.',
      required: false,
      id: 2,
      topic_id: 1,
      license_ids: [6, 7, 8, 9, 10, 5, 3, 4, 1, 2],
      exam_ids: [2, 10, 28, 48, 64, 68, 84, 86, 101],
      answers: [
        {
          text: 'Là một phần của phần đường xe chạy được chia theo chiều dọc của đường, sử dụng cho xe chạy.',
          correct: false,
          id: 4,
          question_id: 2,
        },
        {
          text: 'Là một phần của phần đường xe chạy được chia theo chiều dọc của đường, có bề rộng đủ cho xe chạy an toàn.',
          correct: true,
          id: 5,
          question_id: 2,
        },
        {
          text: 'Là một phần của phần đường xe chạy được chia theo chiều dọc của đường, có đủ bề rộng cho xe ô tô chạy an toàn.',
          correct: false,
          id: 6,
          question_id: 2,
        },
      ],
      idSelectedAnswer: 5,
    },
  ];

  return (
    <div
      className={`${styles.history} ${
        isDarkMode ? styles.darkMode : undefined
      }`}
    >
      <Header title='Lịch sử thi đề A1' isDark={isDarkMode} />
      <main className={styles.main}>
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

        {(!questions || (questions && questions.length === 0)) && (
          <p>Đã xảy ra lỗi, vui lòng kiểm tra lại </p>
        )}
      </main>
    </div>
  );
}
