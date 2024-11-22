/** styles */
import styles from './ListTopic.module.scss';

/** react-redux */
import { useSelector } from 'react-redux';
import { themeMode } from '@/store/theme/themeSelector';

/** react-router */
import { Link } from 'react-router-dom';

/** components */
import Header from '@/components/header/Header';

/** icons */
import { BsGrid3X2Gap } from 'react-icons/bs';
import { IoCarSportSharp, IoSpeedometerOutline } from 'react-icons/io5';
import {
  GiBreakingChain,
  GiDirectionSigns,
  GiGiftOfKnowledge,
} from 'react-icons/gi';
import { HiMiniWrenchScrewdriver } from 'react-icons/hi2';
import { ImImages } from 'react-icons/im';
import { FaRegHeart } from 'react-icons/fa';

export default function ListTopicPage() {
  const mode = useSelector(themeMode);
  const isDarkMode = mode === 'dark';

  return (
    <div className={`${styles.listTopic} ${isDarkMode ? styles.darkMode : ''}`}>
      <Header title='Chủ đề' isDark={isDarkMode} />

      <main className={styles.main}>
        <ul className={styles.list}>
          <li>
            <Link to='/' className={styles.item}>
              <div className={`${styles.iconContainer} ${styles.bgcPurple}`}>
                <BsGrid3X2Gap className={styles.icon} />
              </div>

              <div className={styles.info}>
                <h2 className={styles.title}>Toàn bộ câu hỏi</h2>
                <p className={styles.desc}>600 câu</p>
              </div>
            </Link>
          </li>
          <li>
            <Link to='/' className={styles.item}>
              <div className={`${styles.iconContainer} ${styles.bgcOrange}`}>
                <GiGiftOfKnowledge className={styles.icon} />
              </div>

              <div className={styles.info}>
                <h2 className={styles.title}>
                  Khái niệm và quy tắc giao thông
                </h2>
                <p className={styles.desc}>166 câu</p>
              </div>
            </Link>
          </li>
          <li>
            <Link to='/' className={styles.item}>
              <div className={`${styles.iconContainer} ${styles.bgcLightBlue}`}>
                <IoCarSportSharp className={styles.icon} />
              </div>

              <div className={styles.info}>
                <h2 className={styles.title}>Nghiệp vụ vận tải</h2>
                <p className={styles.desc}>26 câu</p>
              </div>
            </Link>
          </li>
          <li>
            <Link to='/' className={styles.item}>
              <div
                className={`${styles.iconContainer} ${styles.bgcLightGreen}`}
              >
                <GiBreakingChain className={styles.icon} />
              </div>

              <div className={styles.info}>
                <h2 className={styles.title}>Văn hoá và đạo đức</h2>
                <p className={styles.desc}>21 câu</p>
              </div>
            </Link>
          </li>
          <li>
            <Link to='/' className={styles.item}>
              <div className={`${styles.iconContainer} ${styles.bgcLightBlue}`}>
                <IoSpeedometerOutline className={styles.icon} />
              </div>

              <div className={styles.info}>
                <h2 className={styles.title}>Kỹ thuật lái xe</h2>
                <p className={styles.desc}>56 câu</p>
              </div>
            </Link>
          </li>
          <li>
            <Link to='/' className={styles.item}>
              <div className={`${styles.iconContainer} ${styles.bgcLightGray}`}>
                <HiMiniWrenchScrewdriver className={styles.icon} />
              </div>

              <div className={styles.info}>
                <h2 className={styles.title}>Cấu tạo và sữa chữa</h2>
                <p className={styles.desc}>35 câu</p>
              </div>
            </Link>
          </li>
          <li>
            <Link to='/' className={styles.item}>
              <div className={`${styles.iconContainer} ${styles.bgcLightRed}`}>
                <GiDirectionSigns className={styles.icon} />
              </div>

              <div className={styles.info}>
                <h2 className={styles.title}>Biển báo và đường bộ</h2>
                <p className={styles.desc}>182 câu</p>
              </div>
            </Link>
          </li>
          <li>
            <Link to='/' className={styles.item}>
              <div
                className={`${styles.iconContainer} ${styles.bgcSolidGreen}`}
              >
                <ImImages className={styles.icon} />
              </div>

              <div className={styles.info}>
                <h2 className={styles.title}>Sa hình</h2>
                <p className={styles.desc}>114 câu</p>
              </div>
            </Link>
          </li>
          <li>
            <Link to='/' className={styles.item}>
              <div className={`${styles.iconContainer} ${styles.bgcRed}`}>
                <FaRegHeart className={styles.icon} />
              </div>

              <div className={styles.info}>
                <h2 className={styles.title}>Câu liệt</h2>
                <p className={styles.desc}>60 câu</p>
              </div>
            </Link>
          </li>
        </ul>
      </main>
    </div>
  );
}
