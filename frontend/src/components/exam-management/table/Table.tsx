/** styles */
import styles from './Table.module.scss';

/** icons */
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa';

/** types */
import { IExam } from '@/types/definitions';

/** react-redux */
import { useSelector } from 'react-redux';
import { licensesSelector } from '@/store/setting/settingSelector';

export default function Table({
  isDark,
  exams,
  rows,
  onOpenView,
  onOpenUpdate,
  onDelete,
}: {
  isDark: boolean;
  exams: IExam[];
  rows: number;
  onOpenView: (id: number) => void;
  onOpenUpdate: (id: number) => void;
  onDelete: (id: number) => void;
}) {
  const minHeight = (rows + 1) * 65 + (rows + 2) * 16 + 16 + 'px';

  const licenses = useSelector(licensesSelector);

  return (
    <div
      style={{ minHeight: minHeight }}
      className={`${styles.tableContainer} ${isDark ? styles.darkMode : ''}`}
    >
      <table className={`${styles.table} ${isDark ? styles.darkMode : ''}`}>
        <thead className={styles.thead}>
          <tr>
            <th>Tiêu đề</th>
            <th>Thuộc giấy phép</th>
            <th>Hoạt động</th>
          </tr>
        </thead>
        <tbody className={styles.tbody}>
          {exams.map((exam) => (
            <tr key={exam.id}>
              <td>
                <p className={styles.title}>
                  {Number(exam.title) ? 'Đề số ' : ''}
                  {exam.title}
                </p>
              </td>
              <td>
                <div className={styles.licenses}>
                  {exam.license_ids.map((license_id, index) => {
                    const license = licenses.find((lc) => lc.id === license_id);
                    return (
                      <span key={license_id}>
                        Hạng {license?.code}
                        {index < exam.license_ids.length - 1 ? ', ' : ' '}
                      </span>
                    );
                  })}
                </div>
              </td>
              <td>
                <div className={styles.operation}>
                  <button onClick={onOpenView.bind(null, exam.id)}>
                    <FaEye className={styles.icon} />
                  </button>
                  <button onClick={onOpenUpdate.bind(null, exam.id)}>
                    <FaEdit className={styles.icon} />
                  </button>
                  <button>
                    <FaTrash
                      onClick={onDelete.bind(null, exam.id)}
                      className={styles.icon}
                    />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
