/** styles */
import styles from './ListViolation.module.scss';

/** react-router */
import { Link } from 'react-router-dom';

/** react-redux */
import { useSelector } from 'react-redux';
import { themeMode } from '@/store/theme/themeSelector';

/** components */
import Header from '@/components/header/Header';

export default function ListViolationPage() {
  const mode = useSelector(themeMode);
  const isDarkMode = mode === 'dark';

  return (
    <div
      className={`${styles.listViolation} ${
        isDarkMode ? styles.darkMode : undefined
      }`}
    >
      <Header title='Hiệu lệnh, chỉ dẫn' isDark={isDarkMode} />

      <main className={styles.main}>
        <ul className={styles.list}>
          <li>
            <h2>
              Không chấp hành hiệu lệnh, chỉ dẫn của biển báo hiệu, vạch kẻ
              đường
            </h2>
            <p>Phạt tiền từ 100.000 đồng đến 200.000 đồng.</p>
            <Link to='/list-law/list-violation/violationId'>Xem chi tiết</Link>
          </li>
          <li>
            <h2>
              Không chấp hành hiệu lệnh, hướng dẫn của người điều khiển giao
              thông hoặc người kiểm soát giao thông
            </h2>
            <p>Phạt tiền từ 600.000 đồng đến 1.000.000 đồng.</p>
            <Link to='/'>Xem chi tiết</Link>
          </li>
          <li>
            <h2>
              Không chấp hành hiệu lệnh, chỉ dẫn của biển báo hiệu, vạch kẻ
              đường khi đi qua đường ngang, cầu chung
            </h2>
            <p>Phạt tiền từ 200.000 đồng đến 300.000 đồng.</p>
            <Link to='/'>Xem chi tiết</Link>
          </li>
          <li>
            <h2>Vượt đường ngang, cầu chung khi đèn đỏ đã bật sáng</h2>
            <p>Phạt tiền từ 600.000 đồng đến 1.000.000 đồng.</p>
            <Link to='/'>Xem chi tiết</Link>
          </li>
          <li>
            <h2>
              Không chấp hành hiệu lệnh, chỉ dẫn của nhân viên gác đường ngang,
              cầu chung khi đi qua đường ngang, cầu chung
            </h2>
            <p>Phạt tiền từ 600.000 đồng đến 1.000.000 đồng.</p>
            <Link to='/'>Xem chi tiết</Link>
          </li>
        </ul>
      </main>
    </div>
  );
}
