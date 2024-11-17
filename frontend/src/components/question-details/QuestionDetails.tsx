/** styles */
import styles from './QuestionDetails.module.scss';

/** types */
import { IBehavior, IQuestion } from '@/types/definations';

export default function QuestionDetails({
  isDarkMode,
  behavior,
  question,
  onChange,
}: {
  isDarkMode: boolean;
  behavior: IBehavior;
  question: IQuestion;
  onChange?: (questionId: string, answerId: string) => void;
}) {
  function handleSelectedAnswer(questionId: string, answerId: string) {
    if (typeof onChange === 'function' && behavior.type === 'exam') {
      onChange(questionId, answerId);
    }
  }

  return (
    <div
      className={`${styles.questionDetails} ${
        isDarkMode ? styles.darkMode : undefined
      } ${behavior.type === 'view' ? styles.view : undefined}
      `}
    >
      <h2 className={styles.title}>{question.title}</h2>

      {question?.image && (
        <div className={styles.imageContainer}>
          <img src={question.image} alt={question.title} />
        </div>
      )}

      <div className={styles.answers}>
        {question?.answers?.length > 0 &&
          question.answers.map((answer, index) => (
            <div className={styles.answer} key={answer.id}>
              <label
                className={`${
                  answer.id === question.idSelectedAnswer
                    ? styles.wrongAnswer
                    : undefined
                } ${
                  answer.id === question.idTrueAnswer
                    ? styles.trueAnswer
                    : undefined
                } ${
                  answer.id === question.idSelectedAnswer &&
                  question.idSelectedAnswer === question.idTrueAnswer
                    ? styles.correctAnswer
                    : undefined
                }
            `}
              >
                <input
                  type='radio'
                  name={question.id}
                  defaultValue={answer.id}
                  checked={
                    behavior.type === 'view' &&
                    answer.id === question.idSelectedAnswer
                      ? true
                      : undefined
                  }
                  disabled={behavior.type === 'view'}
                  onChange={() => handleSelectedAnswer(question.id, answer.id)}
                />
                <span>{`${index + 1}. ${answer.title}`}</span>
              </label>
            </div>
          ))}

        {(!question?.answers || question?.answers?.length === 0) && (
          <p>
            Không có câu trả lời cho câu hỏi này, vui lòng báo cáo với quản trị
            viên để thêm câu trả lời
          </p>
        )}
      </div>

      {behavior.type === 'view' && question?.instruction && (
        <div className={styles.instruction}>
          <p>{question.instruction}</p>
        </div>
      )}
    </div>
  );
}
