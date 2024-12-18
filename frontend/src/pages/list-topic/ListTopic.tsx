/** styles */
import styles from './ListTopic.module.scss';

/** react-redux */
import { useSelector } from 'react-redux';
import { themeMode } from '@/store/theme/themeSelector';

/** react-router */
import { Link, useRouteLoaderData } from 'react-router-dom';

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

/** types */
import { ITopic } from '@/types/definitions';

export default function ListTopicPage() {
  const mode = useSelector(themeMode);

  const { topics } = useRouteLoaderData('root') as {
    topics: ITopic[] | undefined;
  };

  const isDarkMode = mode === 'dark';

  return (
    <div className={`${styles.listTopic} ${isDarkMode ? styles.darkMode : ''}`}>
      <Header title='Chủ đề' isDark={isDarkMode} />

      <main className={styles.main}>
        {topics && topics.length > 0 && (
          <ul className={styles.list}>
            {topics.map((t, index) => {
              if (t.totalQuestion === 0) return;
              return (
                <li key={t.id}>
                  <Link to={`/list-topic/${t.id}`} className={styles.item}>
                    {icons[index]}
                    <div className={styles.info}>
                      <h2 className={styles.title}>{t.display}</h2>
                      <p className={styles.desc}>{t.totalQuestion} câu</p>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
        {topics && topics.length === 0 && (
          <p
            style={{
              fontSize: '1.15rem',
              textAlign: 'center',
              marginTop: '32px',
            }}
          >
            Hiện tại không có chủ đề, vui lòng quay lại sau hoặc liên hệ với
            quản trị viên.
          </p>
        )}
      </main>
    </div>
  );
}

const icons = [
  <div className={`${styles.iconContainer} ${styles.bgcPurple}`}>
    <BsGrid3X2Gap className={styles.icon} />
  </div>,
  <div className={`${styles.iconContainer} ${styles.bgcOrange}`}>
    <GiGiftOfKnowledge className={styles.icon} />
  </div>,
  <div className={`${styles.iconContainer} ${styles.bgcLightBlue}`}>
    <IoCarSportSharp className={styles.icon} />
  </div>,
  <div className={`${styles.iconContainer} ${styles.bgcLightGreen}`}>
    <GiBreakingChain className={styles.icon} />
  </div>,
  <div className={`${styles.iconContainer} ${styles.bgcLightBlue}`}>
    <IoSpeedometerOutline className={styles.icon} />
  </div>,
  <div className={`${styles.iconContainer} ${styles.bgcLightGray}`}>
    <HiMiniWrenchScrewdriver className={styles.icon} />
  </div>,
  <div className={`${styles.iconContainer} ${styles.bgcLightRed}`}>
    <GiDirectionSigns className={styles.icon} />
  </div>,
  <div className={`${styles.iconContainer} ${styles.bgcSolidGreen}`}>
    <ImImages className={styles.icon} />
  </div>,
  <div className={`${styles.iconContainer} ${styles.bgcRed}`}>
    <FaRegHeart className={styles.icon} />
  </div>,
];
