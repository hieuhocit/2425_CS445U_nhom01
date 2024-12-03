/** styles */
import styles from './Table.module.scss';

/** icons */
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa';

interface IUser {
  image: string;
  first_name: string;
  last_name: string;
  email: string;
  role: string;
}

export default function Table({
  isDark,
  users,
  rows,
}: {
  isDark: boolean;
  users: IUser[];
  rows: number;
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
            <th>Họ tên</th>
            <th>Email</th>
            <th>Vai trò</th>
            <th>Hoạt động</th>
          </tr>
        </thead>
        <tbody className={styles.tbody}>
          {users.map((user, index) => (
            <tr key={index}>
              <td>
                <div className={styles.imageContainer}>
                  <img
                    src={user.image}
                    alt={user.first_name + ' ' + user.last_name}
                  />
                </div>
              </td>
              <td>
                <p
                  className={styles.name}
                >{`${user.last_name} ${user.first_name}`}</p>
              </td>
              <td>
                <p className={styles.email}>{user.email}</p>
              </td>
              <td>
                <span
                  className={`${styles.role} ${
                    user.role === 'ADMIN' ? styles.admin : styles.member
                  }`}
                >
                  <p>{user.role.toLocaleLowerCase()}</p>
                </span>
              </td>
              <td>
                <div className={styles.operation}>
                  <button>
                    <FaEye className={styles.icon} />
                  </button>
                  <button>
                    <FaEdit className={styles.icon} />
                  </button>
                  <button>
                    <FaTrash className={styles.icon} />
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
