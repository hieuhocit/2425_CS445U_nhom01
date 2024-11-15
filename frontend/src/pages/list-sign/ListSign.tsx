/** styles */
import styles from './ListSign.module.scss';

/** components */
import Header from '@/components/header/Header';

/** react-redux */
import { useSelector } from 'react-redux';
import { themeMode } from '@/store/theme/themeSelector';
import { Link } from 'react-router-dom';

export default function ListSignPage() {
  const mode = useSelector(themeMode);
  const isDarkMode = mode === 'dark';

  return (
    <>
      <div
        className={`${styles.listSign} ${
          isDarkMode ? styles.darkMode : undefined
        }`}
      >
        <Header title='Biển báo' isDark={isDarkMode} />
        <main className={styles.main}>
          <ul className={styles.list}>
            <li>
              <Link to='/list-sign/idhere' className={styles.item}>
                <div className={styles.head}>
                  <img
                    src='https://beta.gplx.app/images/assets/topic_sign_0.png'
                    alt='sign image'
                  />
                  <h2>Biển báo cấm</h2>
                </div>
                <div className={styles.body}>
                  <p>
                    Biển báo có dạng tròn viền đỏ, nền màu trắng, trên nền có
                    hình vẽ màu đen đặc trưng cho điều cấm hoặc hạn chế sự đi
                    lại
                  </p>
                </div>
              </Link>
            </li>
            <li>
              <Link to='/' className={styles.item}>
                <div className={styles.head}>
                  <img
                    src='https://beta.gplx.app/images/assets/topic_sign_1.png'
                    alt='sign image'
                  />
                  <h2>Biển báo nguy hiểm</h2>
                </div>
                <div className={styles.body}>
                  <p>
                    Biển báo có dạng hình tam giác đều, viền đỏ, nền màu vàng,
                    trên có hình vẽ màu đen mô tả sự việc báo hiệu nhằm báo cho
                    người sử dụng đường biết trước tính chất các sự nguy hiểm
                    trên đường để có biện pháp phòng ngừa, xử trí
                  </p>
                </div>
              </Link>
            </li>
            <li>
              <Link to='/' className={styles.item}>
                <div className={styles.head}>
                  <img
                    src='https://beta.gplx.app/images/assets/topic_sign_2.png'
                    alt='sign image'
                  />
                  <h2>Biển chỉ dẫn</h2>
                </div>
                <div className={styles.body}>
                  <p>
                    Biển báo có dạng hình vuông hoặc hình chữ nhật, nền xanh,
                    hình vẽ màu trắng. Biển chỉ dẫn để chỉ dẫn hướng đi hoặc các
                    điều cần biết nhằm thông báo cho những người sử dụng đường
                    biết những định hướng cần thiết hoặc những điều có ích khác,
                    đồng thời có tác dụng giúp cho việc điều khiển và hướng dẫn
                    giao thông trên đường được thuận lợi, đảm bảo an toàn chuyển
                    động
                  </p>
                </div>
              </Link>
            </li>
            <li>
              <Link to='/' className={styles.item}>
                <div className={styles.head}>
                  <img
                    src='https://beta.gplx.app/images/assets/topic_sign_3.png'
                    alt='sign image'
                  />
                  <h2>Biển hiệu lệnh</h2>
                </div>
                <div className={styles.body}>
                  <p>
                    Biển báo có dạng hình tròn, nền xanh với hình vẽ màu trắng.
                    Chúng đưa ra những hiệu lệnh mà người đi đường phải thực
                    hiện
                  </p>
                </div>
              </Link>
            </li>
            <li>
              <Link to='/' className={styles.item}>
                <div className={styles.head}>
                  <img
                    src='https://beta.gplx.app/images/assets/topic_sign_4.png'
                    alt='sign image'
                  />
                  <h2>Biển báo phụ</h2>
                </div>
                <div className={styles.body}>
                  <p>
                    Biển báo có dạng hình vuông hoặc hình chữ nhật, viền đen,
                    nền trắng, hình vẽ màu đen, thường nằm dưới các biển chính
                    để bổ sung làm rõ ý nghĩa các biển chính
                  </p>
                </div>
              </Link>
            </li>
          </ul>
        </main>
      </div>
    </>
  );
}
