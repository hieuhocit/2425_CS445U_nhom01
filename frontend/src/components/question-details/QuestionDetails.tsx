/** styles */
import styles from './QuestionDetails.module.scss';

/** types */
import { IAnswer, IBehavior, IQuestion } from '@/types/definitions';

import { BASE_URL } from '@/config/baseUrl';

export default function QuestionDetails({
  isDarkMode,
  behavior,
  question,
  onChange,
}: {
  isDarkMode: boolean;
  behavior: IBehavior;
  question: IQuestion;
  onChange?: (questionId: number, answerId: number) => void;
}) {
  function handleSelectedAnswer(questionId: number, answerId: number) {
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
      <h2
        className={`${styles.title} ${
          question.required ? styles.required : undefined
        }`}
      >
        {`Câu ${question.id}: ${question.text}`}
      </h2>

      {question?.image && (
        <div className={styles.imageContainer}>
          <img
            src={`${BASE_URL}/images/questions/${question.image}`}
            alt={question.text}
          />
        </div>
      )}

      <div className={styles.answers}>
        {question?.answers &&
          question?.answers?.length > 0 &&
          question.answers.map((answer, index) => {
            let className = '';

            // lấy câu trả lời đúng
            const trueAnswer = (question.answers as IAnswer[]).find(
              (a) => a.correct
            );

            // Nếu là câu trả lời của người dùng
            if (answer.id === question.idSelectedAnswer) {
              // Kiểm tra nếu câu trả lời là đúng
              if (question.idSelectedAnswer === trueAnswer?.id) {
                className = styles.correctAnswer;
              } else {
                // Ngược lại nếu sai
                className = styles.wrongAnswer;
              }
            } else {
              // Nếu không phải câu trả lời người dùng
              // thì kiểm tra có phải là câu trả lời đúng không nếu đúng thì hiển thị
              className = answer.id === trueAnswer?.id ? styles.trueAnswer : '';
            }

            let checked = undefined;

            // Nếu đg ở chế độ xem
            if (behavior.type === 'view') {
              // Nếu có câu trả lời của người dùng (thg nằm trong list wrong answer)
              if (question.idSelectedAnswer) {
                // Nếu có thì kiểm tra câu hiện tại có phải là câu trả lời người dùng không, nếu có thì hiển thị
                checked =
                  answer.id === question.idSelectedAnswer ? true : undefined;
              } else {
                // Nếu không có câu trả lời của người dùng thì hiển thị câu trả lời đúng
                checked = answer.id === trueAnswer?.id ? true : undefined;
              }
            } else {
              // Nếu đg làm bài thi
              // thì hiển thị câu trả lời người dùng đã chọn (checked) nếu có.
              checked = answer.id === question.idSelectedAnswer;
            }

            return (
              <div className={styles.answer} key={answer.id}>
                <label className={className}>
                  <input
                    type='radio'
                    name={question.id + ''}
                    defaultValue={answer.id as number}
                    checked={checked}
                    disabled={behavior.type === 'view'}
                    onChange={() =>
                      handleSelectedAnswer(
                        question.id as number,
                        answer.id as number
                      )
                    }
                  />
                  <span>{`${index + 1}. ${answer.text}`}</span>
                </label>
              </div>
            );
          })}

        {(!question?.answers || question?.answers?.length === 0) && (
          <p>
            Không có câu trả lời cho câu hỏi này, vui lòng báo cáo với quản trị
            viên để thêm câu trả lời
          </p>
        )}
      </div>

      {behavior.type === 'view' && question?.tip && (
        <div className={styles.instruction}>
          <p>Hướng dẫn: {question.tip}</p>
        </div>
      )}
    </div>
  );
}
