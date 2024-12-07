/** styles */
import styles from './Table.module.scss';

/** icons */
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa';

/** images */
import imagePlaceholder from '@/assets/images/image-placeholder.jpg';

/** types */
import { User } from '@/types/definitions';

export default function Table({
  isDark,
  users,
  rows,
  onOpenView,
  onOpenUpdate,
  onDelete,
}: {
  isDark: boolean;
  users: User[];
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
            <th>Tài khoản</th>
            <th>Email</th>
            <th>Vai trò</th>
            <th>Hoạt động</th>
          </tr>
        </thead>
        <tbody className={styles.tbody}>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <div className={styles.imageContainer}>
                  <img
                    src={user.avatar ? user.avatar : imagePlaceholder}
                    alt={user.first_name + ' ' + user.last_name}
                  />
                </div>
              </td>
              <td>
                <p className={styles.username}>{user.username}</p>
              </td>
              <td>
                <p className={styles.email}>{user.email}</p>
              </td>
              <td>
                <span
                  className={`${styles.role} ${
                    user.permission === 'ADMIN' ? styles.admin : styles.member
                  }`}
                >
                  <p>{(user.permission as string).toLocaleLowerCase()}</p>
                </span>
              </td>
              <td>
                <div className={styles.operation}>
                  <button onClick={onOpenView.bind(null, user.id)}>
                    <FaEye className={styles.icon} />
                  </button>
                  <button onClick={onOpenUpdate.bind(null, user.id)}>
                    <FaEdit className={styles.icon} />
                  </button>
                  <button>
                    <FaTrash
                      onClick={onDelete.bind(null, user.id)}
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
