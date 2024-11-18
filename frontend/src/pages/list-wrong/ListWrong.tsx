/** styles */
import styles from './ListWrong.module.scss';

/** react-redux */
import { useSelector } from 'react-redux';
import { themeMode } from '@/store/theme/themeSelector';

/** components */
import Header from '@/components/header/Header';
import QuestionDetails from '@/components/question-details/QuestionDetails';

/** types */
import { IQuestion } from '@/types/definations';

export default function ListWrongPage() {
  const mode = useSelector(themeMode);
  const isDarkMode = mode === 'dark';

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
    idSelectedAnswer: '1',
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
    idSelectedAnswer: 'id4',
    required: false,
  };

  const wrongQuestions: IQuestion[] | null = [question1, question2];

  return (
    <div
      className={`${styles.listWrongPage} ${
        isDarkMode ? styles.darkMode : undefined
      }`}
    >
      <Header title='Các câu sai' isDark={isDarkMode} />
      <main className={styles.main}>
        {wrongQuestions && wrongQuestions.length > 0 && (
          <div className={styles.list}>
            {wrongQuestions.map((question) => (
              <QuestionDetails
                key={question.id}
                isDarkMode={isDarkMode}
                behavior={{ type: 'view' }}
                question={question}
              />
            ))}
          </div>
        )}

        {(!wrongQuestions ||
          (wrongQuestions && wrongQuestions.length === 0)) && (
          <p>Xin chúc mừng, hiện tại bạn không có câu nào làm sai!</p>
        )}
      </main>
    </div>
  );
}
