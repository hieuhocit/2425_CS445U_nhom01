/** styles */
import styles from './ListLaw.module.scss';

/** react-router */
import { Link } from 'react-router-dom';

/** react-redux */
import { useDispatch, useSelector } from 'react-redux';
import { violationTypeSelector } from '@/store/setting/settingSelector';
import { changeViolationType } from '@/store/setting/settingSlice';
import { themeMode } from '@/store/theme/themeSelector';

/** components */
import Header from '@/components/header/Header';

/** icons */
import { GiTrafficCone } from 'react-icons/gi';
import { PiTrafficSignThin } from 'react-icons/pi';
import { BsSignNoParking } from 'react-icons/bs';
import { GrAnnounce } from 'react-icons/gr';
import { MdSpeed } from 'react-icons/md';
import { TbTruckDelivery } from 'react-icons/tb';
import { FaTools } from 'react-icons/fa';
import { FaRoadCircleXmark } from 'react-icons/fa6';
import { PiBeerBottleFill } from 'react-icons/pi';
import { ImProfile } from 'react-icons/im';
import { GiWhiteBook } from 'react-icons/gi';

/** DUMMY DATA */
import { lawTopics } from '@/data/data';

const icons = [
  <GiTrafficCone className={styles.icon} />,
  <PiTrafficSignThin className={styles.icon} />,
  <BsSignNoParking className={styles.icon} />,
  <GrAnnounce className={styles.icon} />,
  <MdSpeed className={styles.icon} />,
  <TbTruckDelivery className={styles.icon} />,
  <FaTools className={styles.icon} />,
  <FaRoadCircleXmark className={styles.icon} />,
  <PiBeerBottleFill className={styles.icon} />,
  <ImProfile className={styles.icon} />,
  <GiWhiteBook className={styles.icon} />,
];

export default function ListLawPage() {
  const violationType = useSelector(violationTypeSelector);
  const dispatch = useDispatch();

  const mode = useSelector(themeMode);
  const isDarkMode = mode === 'dark';

  function handleChangeViolationType(e: React.ChangeEvent<HTMLInputElement>) {
    dispatch(
      changeViolationType({
        violationType: Number(e.target.value),
      })
    );
  }

  return (
    <div
      className={`${styles.listLawPage} ${
        isDarkMode ? styles.darkMode : undefined
      }`}
    >
      <Header title='Luật giao thông' isDark={isDarkMode} />
      <main className={styles.main}>
        <div className={styles.options}>
          <div className={styles.option}>
            <label>
              <input
                onChange={handleChangeViolationType}
                checked={violationType === 1}
                type='radio'
                name='vehicle'
                value={1}
              />
              <span>Xe máy</span>
            </label>
          </div>
          <div className={styles.option}>
            <label>
              <input
                onChange={handleChangeViolationType}
                checked={violationType === 2}
                type='radio'
                name='vehicle'
                value={2}
              />
              <span>Xe ô tô</span>
            </label>
          </div>
          <div className={styles.option}>
            <label>
              <input
                onChange={handleChangeViolationType}
                checked={violationType === 3}
                type='radio'
                name='vehicle'
                value={3}
              />
              <span>Khác</span>
            </label>
          </div>
        </div>
        <ul className={styles.list}>
          {lawTopics.map((lt, index) => (
            <li key={lt.id}>
              <Link
                to={`/list-law/${lt.id}/list-violation`}
                className={styles.item}
              >
                {icons[index]}
                <h2>{lt.display}</h2>
              </Link>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
