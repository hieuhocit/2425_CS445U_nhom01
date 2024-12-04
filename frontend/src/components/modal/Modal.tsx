/** styles */
import { useEffect, useRef } from 'react';
import styles from './Modal.module.scss';

/** react */
import { createPortal } from 'react-dom';

/** icons */
import { IoCloseOutline } from 'react-icons/io5';

export default function Modal({
  children,
  isDark,
  isOpen,
  onClose,
}: {
  children: React.ReactNode;
  isDark: boolean;
  isOpen: boolean;
  onClose: () => void;
}) {
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  useEffect(() => {
    const modal = dialogRef.current;
    if (!modal) return;

    if (isOpen) {
      modal.showModal();
    } else {
      modal.close();
    }
  }, [isOpen]);

  return createPortal(
    <dialog
      ref={dialogRef}
      className={`${styles.dialog} ${isDark ? styles.darkMode : ''}`}
    >
      <IoCloseOutline onClick={onClose} className={styles.close} />
      {children}
    </dialog>,
    document.getElementById('modal') as HTMLDivElement
  );
}
