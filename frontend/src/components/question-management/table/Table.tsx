/** styles */
import styles from './Table.module.scss';

/** icons */
import { FaEye, FaEdit, FaTrash, FaCheck } from 'react-icons/fa';
import { FaXmark } from 'react-icons/fa6';

/** images */
import imagePlaceholder from '@/assets/images/image-placeholder.jpg';

/** types */
import { IQuestion } from '@/types/definitions';

/** DUMMY DATA */
import { topics } from '@/data/data';

export default function Table({
  isDark,
  questions,
  rows,
  onOpenView,
  onOpenUpdate,
  onDelete,
}: {
  isDark: boolean;
  questions: IQuestion[];
  rows: number;
  onOpenView: (id: number) => void;
  onOpenUpdate: (id: number) => void;
  onDelete: (id: number) => void;
}) {
  const minHeight = (rows + 1) * 65 + (rows + 2) * 16 + 16 + 'px';

  return (
    <div
      style={{ minHeight: minHeight }}
      className={`${styles.tableContainer} ${isDark ? styles.darkMode : ''}`}
    >
      <table className={`${styles.table} ${isDark ? styles.darkMode : ''}`}>
        <thead className={styles.thead}>
          <tr>
            <th>Ảnh</th>
            <th>Tiêu đề</th>
            <th>Chủ đề</th>
            <th>Câu liệt</th>
            <th>Hoạt động</th>
          </tr>
        </thead>
        <tbody className={styles.tbody}>
          {questions.map((q) => {
            const topic = topics.find((t) => t.id === q.topic_id);
            return (
              <tr key={q.id}>
                <td>
                  <div className={styles.imageContainer}>
                    <img
                      src={
                        q.image
                          ? `https://beta.gplx.app/images/questions/${q.image}`
                          : imagePlaceholder
                      }
                      alt={q.text}
                    />
                  </div>
                </td>

                <td>
                  <p className={styles.username}>{q.text}</p>
                </td>

                <td>
                  <p className={styles.username}>{topic?.display}</p>
                </td>

                <td>
                  <p>{q.required ? <FaCheck /> : <FaXmark />}</p>
                </td>

                <td>
                  <div className={styles.operation}>
                    <button onClick={onOpenView.bind(null, q.id)}>
                      <FaEye className={styles.icon} />
                    </button>
                    <button onClick={onOpenUpdate.bind(null, q.id)}>
                      <FaEdit className={styles.icon} />
                    </button>
                    <button>
                      <FaTrash
                        onClick={onDelete.bind(null, q.id)}
                        className={styles.icon}
                      />
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
