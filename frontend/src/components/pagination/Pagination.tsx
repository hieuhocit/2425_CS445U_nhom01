/** styles */
import styles from './Pagination.module.scss';

/** icons */
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6';

/** utils */
import { generatePagination } from '@/utils/generatePagination';

export default function Pagination({
  isDark,
  currentPage,
  totalPages,
  onNext,
  onPrev,
  onGoTo,
}: {
  isDark: boolean;
  currentPage: number;
  totalPages: number;
  onNext: () => void;
  onPrev: () => void;
  onGoTo: (index: number) => void;
}) {
  const pages = generatePagination(currentPage, totalPages);

  return (
    <div
      className={`${styles.paginationContainer} ${
        isDark ? styles.darkMode : ''
      }`}
    >
      <div className={styles.pagination}>
        <PaginationArrow
          direction='left'
          disabled={currentPage === 1}
          onClick={onPrev}
        />
        <div className={styles.numbers}>
          {pages.map((page, index) => (
            <PaginationNumber
              key={index}
              value={page}
              active={page === currentPage}
              disabled={page === '...'}
              onClick={onGoTo}
            />
          ))}
        </div>
        <PaginationArrow
          direction='right'
          disabled={currentPage === totalPages}
          onClick={onNext}
        />
      </div>
    </div>
  );
}

function PaginationArrow({
  direction,
  disabled,
  onClick,
}: {
  direction: 'left' | 'right';
  disabled: boolean;
  onClick: () => void;
}) {
  const icon =
    direction === 'left' ? (
      <FaAngleLeft className={styles.icon} />
    ) : (
      <FaAngleRight className={styles.icon} />
    );

  return (
    <div
      onClick={onClick}
      className={`${styles.arrow} ${disabled ? styles.disabled : ''}`}
    >
      {icon}
    </div>
  );
}

function PaginationNumber({
  value,
  active,
  disabled,
  onClick,
}: {
  value: string | number;
  active: boolean;
  disabled: boolean;
  onClick: (page: number) => void;
}) {
  return (
    <div
      onClick={typeof value === 'number' ? onClick.bind(null, value) : () => {}}
      className={`${styles.number} ${disabled ? styles.disabled : ''} ${
        active ? styles.active : ''
      }`}
    >
      {value}
    </div>
  );
}
