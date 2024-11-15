/** styles */
import styles from './ViolationDetails.module.scss';

/** react-redux */
import { useSelector } from 'react-redux';
import { themeMode } from '@/store/theme/themeSelector';

/** components */
import Header from '@/components/header/Header';

export default function ViolationDetailsPage() {
  const mode = useSelector(themeMode);
  const isDarkMode = mode === 'dark';

  return (
    <div
      className={`${styles.violationDetails} ${
        isDarkMode ? styles.darkMode : undefined
      }`}
    >
      <Header title='Hiệu lệnh, chỉ dẫn' isDark={isDarkMode} />

      <main className={styles.main}>
        <div className={styles.sections}>
          <section className={styles.section}>
            <h2>Hành vi</h2>
            <p>
              Người điều khiển xe mô tô, xe gắn máy (kể cả xe máy điện), các
              loại xe tương tự xe mô tô và các loại xe tương tự xe gắn máy
            </p>
            <p className={styles.bold}>
              Không chấp hành hiệu lệnh, chỉ dẫn của biển báo hiệu, vạch kẻ
              đường
            </p>
          </section>
          <section className={styles.section}>
            <h2>Hình phạt</h2>
            <p className={styles.colorRed}>
              Phạt tiền từ 100.000 đồng đến 200.000 đồng.
            </p>
          </section>
          <section className={styles.section}>
            <h2>Hình phạt bổ sung</h2>
            <p>
              Nếu gây tai nạn giao thông thì bị tước quyền sử dụng Giấy phép lái
              xe từ 02 tháng đến 04 tháng.
            </p>
          </section>
          <section className={styles.section}>
            <h2>Ghi chú</h2>
            <p>
              Trường hợp này không áp dụng đối với các hành vi vi phạm quy định
              tại điểm c, điểm đ, điểm e, điểm h khoản 2; điểm d, điểm g, điểm
              i, điểm m khoản 3; điểm a, điểm b, điểm c, điểm d, điểm e khoản 4;
              khoản 5; điểm b khoản 6; điểm a, điểm b khoản 7; điểm d khoản 8
              Điều 6 Nghị định 100/2019/NĐ-CP.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
