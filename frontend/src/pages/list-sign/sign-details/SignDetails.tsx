/** styles */
import styles from './SignDetails.module.scss';

/** components */
import Header from '@/components/header/Header';

/** react-redux */
import { themeMode } from '@/store/theme/themeSelector';
import { useSelector } from 'react-redux';

export default function SignDetailsPage() {
  const mode = useSelector(themeMode);
  const isDarkMode = mode === 'dark';

  return (
    <div
      className={`${styles.signDetails} ${
        isDarkMode ? styles.darkMode : undefined
      }`}
    >
      <Header title='Biển báo cấm' isDark={isDarkMode} />
      <main className={styles.main}>
        <ul className={styles.list}>
          <li className={styles.item}>
            <div className={styles.head}>
              <h2>P.101: Đường cấm</h2>
            </div>
            <div className={styles.body}>
              <img
                src='https://beta.gplx.app/images/signs/signP101.png'
                alt='sign image'
              />
              <p>
                Biển báo đường cấm tất cả các loại phương tiện tham gia giao
                thông đi lại cả hai hướng, trừ xe ưu tiên theo luật định.
              </p>
            </div>
          </li>
          <li className={styles.item}>
            <div className={styles.head}>
              <h2>P.102: Cấm đi ngược chiều</h2>
            </div>
            <div className={styles.body}>
              <img
                src='https://beta.gplx.app/images/signs/signP102.png'
                alt='sign image'
              />
              <p>
                Biển báo đường cấm tất cả các loại phương tiện tham gia giao
                thông đi vào theo chiều đặt biển.
              </p>
            </div>
          </li>
          <li className={styles.item}>
            <div className={styles.head}>
              <h2>P.103a: Cấm ô tô</h2>
            </div>
            <div className={styles.body}>
              <img
                src='https://beta.gplx.app/images/signs/signP103a.png'
                alt='sign image'
              />
              <p>
                Biển báo đường cấm tất cả các loại xe cơ giới kể cả mô tô 3 bánh
                có thùng đi qua, trừ xe mô tô 2 bánh, xe gắn máy (kể cả xe máy
                điện) và các xe được ưu tiên theo Luật Giao thông đường bộ.
              </p>
            </div>
          </li>
          <li className={styles.item}>
            <div className={styles.head}>
              <h2>P.103b: Cấm ô tô rẽ phải</h2>
            </div>
            <div className={styles.body}>
              <img
                src='https://beta.gplx.app/images/signs/signP103b.png'
                alt='sign image'
              />
              {/* <p>
                Biển báo đường cấm xe ô tô rẽ phải ( kể cả xe mô tô ba bánh),
                trừ các xe được ưu tiên theo Luật Giao thông đường bộ.
              </p> */}
            </div>
          </li>
          <li className={styles.item}>
            <div className={styles.head}>
              <h2>P.103a: Cấm ô tô</h2>
            </div>
            <div className={styles.body}>
              <img
                src='https://beta.gplx.app/images/signs/signP103a.png'
                alt='sign image'
              />
              <p>
                Biển báo đường cấm tất cả các loại xe cơ giới kể cả mô tô 3 bánh
                có thùng đi qua, trừ xe mô tô 2 bánh, xe gắn máy (kể cả xe máy
                điện) và các xe được ưu tiên theo Luật Giao thông đường bộ.
              </p>
            </div>
          </li>
          <li className={styles.item}>
            <div className={styles.head}>
              <h2>P.103b: Cấm ô tô rẽ phải</h2>
            </div>
            <div className={styles.body}>
              <img
                src='https://beta.gplx.app/images/signs/signP103b.png'
                alt='sign image'
              />
              {/* <p>
                Biển báo đường cấm xe ô tô rẽ phải ( kể cả xe mô tô ba bánh),
                trừ các xe được ưu tiên theo Luật Giao thông đường bộ.
              </p> */}
            </div>
          </li>
        </ul>
      </main>
    </div>
  );
}
