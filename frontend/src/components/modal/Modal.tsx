/** styles */
import styles from './Modal.module.scss';

/** react */
import { CSSProperties, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

/** icons */
import { IoCloseOutline } from 'react-icons/io5';

export default function Modal({
  children,
  isDark,
  isOpen,
  onClose,
  css,
}: {
  children: React.ReactNode;
  isDark: boolean;
  isOpen: boolean;
  onClose: () => void;
  css?: CSSProperties | undefined;
}) {
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  useEffect(() => {
    const modal = dialogRef.current;
    if (!modal) return;

    if (isOpen) {
      // modal.showModal();
      modal.show();
    } else {
      modal.close();
    }
  }, [isOpen]);

  return createPortal(
    <>
      <dialog
        style={css}
        ref={dialogRef}
        className={`${styles.dialog} ${isDark ? styles.darkMode : ''}`}
      >
        <IoCloseOutline onClick={onClose} className={styles.close} />
        {children}
      </dialog>
      <div
        className={`${styles.backdrop} ${
          isOpen ? styles.opening : styles.closing
        } ${isDark ? styles.darkMode : ''}`}
      ></div>
    </>,
    document.getElementById('modal') as HTMLDivElement
  );
}
