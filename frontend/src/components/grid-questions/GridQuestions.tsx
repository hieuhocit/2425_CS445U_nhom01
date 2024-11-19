/** styles */
import styles from './GridQuestions.module.scss';

/** types */
import { IBehavior, IQuestion } from '@/types/definitions';

/** icons */
import { IoCloseOutline } from 'react-icons/io5';

/** react */
import { useRef } from 'react';

export default function GridQuestions({
  isDark,
  show,
  questions,
  onClose,
  behavior,
  onGoTo,
}: {
  isDark: boolean;
  show: boolean;
  onClose: () => void;
  questions: IQuestion[] | null | undefined;
  behavior: IBehavior;
  onGoTo: (index: number) => void;
}) {
  const gridRef = useRef<null | HTMLDivElement>(null);

  function handleClose() {
    if (gridRef.current) {
      gridRef.current.classList.remove(styles.show);
      gridRef.current.onanimationend = () => {
        onClose();
      };
    }
  }

  function handleGoTo(index: number) {
    handleClose();
    onGoTo(index);
  }

  return (
    <div
      ref={gridRef}
      className={`${styles.gridQuestions} ${
        isDark ? styles.darkMode : undefined
      } ${show ? styles.show : undefined}`}
    >
      {questions && questions.length > 0 && (
        <div className={styles.grid}>
          {questions.map((q, index) => {
            const className = `${styles.question} ${
              behavior.type === 'view'
                ? ''
                : q.idSelectedAnswer
                ? styles.done
                : ''
            }`;

            return (
              <div
                key={q.id}
                onClick={handleGoTo.bind(null, index)}
                className={className}
              >
                {index + 1}
              </div>
            );
          })}
        </div>
      )}
      {/* <div className={`${styles.question} ${styles.done}`}>1</div>
        <div className={`${styles.question} ${styles.true}`}>2</div>
        <div className={`${styles.question} ${styles.wrong}`}>3</div> */}
      {(!questions || questions.length === 0) && (
        <p>
          Hiện tại chưa có câu hỏi, vui lòng quay lại sau hoặc liên hệ với quản
          trị viên.
        </p>
      )}
      <div onClick={handleClose} className={styles.close}>
        <IoCloseOutline />
      </div>
    </div>
  );
}
