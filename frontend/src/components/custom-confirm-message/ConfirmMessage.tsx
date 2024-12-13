/** styles */
import styles from './ConfirmMessage.module.scss';

export default function ConfirmMessage({
  title,
  isDark,
  onConfirm,
  onCancel,
}: {
  isDark: boolean;
  title: string;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  return (
    <>
      <div
        className={`${styles.confirmMessage} ${isDark ? styles.darkMode : ''}`}
      >
        <h2>{title}</h2>
        <div className={styles.actions}>
          <button onClick={onConfirm} className={styles.confirm}>
            Có
          </button>
          <button onClick={onCancel} className={styles.cancel}>
            Không
          </button>
        </div>
      </div>
    </>
  );
}
