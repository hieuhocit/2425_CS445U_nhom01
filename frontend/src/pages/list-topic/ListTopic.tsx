/** styles */
import styles from './ListTopic.module.scss';

/** react-redux */
import { useSelector } from 'react-redux';
import { themeMode } from '@/store/theme/themeSelector';

/** react-router */
import { Link } from 'react-router-dom';
import { questionsSelector } from '@/store/data/dataSelector';

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

/** DUMMY DATA */
import { topics } from '@/data/data';

export default function ListTopicPage() {
  const mode = useSelector(themeMode);
  const isDarkMode = mode === 'dark';

  const questions = useSelector(questionsSelector);

  return (
    <div className={`${styles.listTopic} ${isDarkMode ? styles.darkMode : ''}`}>
      <Header title='Chủ đề' isDark={isDarkMode} />

      <main className={styles.main}>
        <ul className={styles.list}>
          {topics.map((t, index) => {
            const numberOfQuestions =
              t.id === 0
                ? questions.length
                : t.id === 8
                ? questions.filter((q) => q.required).length
                : questions.filter((q) => q.topic_id === t.id).length;
            if (numberOfQuestions === 0) return;
            return (
              <li>
                <Link to={`/list-topic/${t.id}`} className={styles.item}>
                  {icons[index]}
                  <div className={styles.info}>
                    <h2 className={styles.title}>{t.display}</h2>
                    <p className={styles.desc}>{numberOfQuestions} câu</p>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
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
