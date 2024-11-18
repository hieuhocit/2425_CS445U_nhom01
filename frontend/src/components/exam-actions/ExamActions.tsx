/** styles */
import styles from './ExamActions.module.scss';

/** icons */
import { IoIosArrowBack, IoIosArrowForward, IoMdGrid } from 'react-icons/io';

export default function ExamAction({
  isDark,
  min,
  max,
  currentIndex,
  onNext,
  onPrev,
  onShow,
}: {
  isDark: boolean;
  min: number;
  max: number;
  currentIndex: number;
  onNext: () => void;
  onPrev: () => void;
  onShow: () => void;
}) {
  return (
    <footer
      className={`${styles.footer} ${isDark ? styles.darkMode : undefined}`}
    >
      <div className={styles.actions}>
        <button
          disabled={currentIndex === min}
          onClick={onPrev}
          className={styles.button}
        >
          <IoIosArrowBack className={styles.icon} />
        </button>
        <button onClick={onShow} className={styles.button}>
          <IoMdGrid className={styles.icon} />
        </button>
        <button
          disabled={currentIndex === max}
          onClick={onNext}
          className={styles.button}
        >
          <IoIosArrowForward className={styles.icon} />
        </button>
      </div>
    </footer>
  );
}
