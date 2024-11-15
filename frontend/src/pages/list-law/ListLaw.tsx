/** styles */
import styles from './ListLaw.module.scss';

/** react-router */
import { Link } from 'react-router-dom';

/** react-redux */
import { useSelector } from 'react-redux';

/** react */
import { useState } from 'react';

/** components */
import Header from '@/components/header/Header';
import { themeMode } from '@/store/theme/themeSelector';

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

export default function ListLawPage() {
  const [selectedOption, setSelectedOption] = useState('Xe máy');

  const mode = useSelector(themeMode);
  const isDarkMode = mode === 'dark';

  function handleSelectOption(e: React.ChangeEvent<HTMLInputElement>) {
    setSelectedOption(e.target.value);
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
                onChange={handleSelectOption}
                checked={selectedOption === 'Xe máy'}
                type='radio'
                name='vehicle'
                value={'Xe máy'}
              />
              <span>Xe máy</span>
            </label>
          </div>
          <div className={styles.option}>
            <label>
              <input
                onChange={handleSelectOption}
                checked={selectedOption === 'Xe ô tô'}
                type='radio'
                name='vehicle'
                value={'Xe ô tô'}
              />
              <span>Xe ô tô</span>
            </label>
          </div>
          <div className={styles.option}>
            <label>
              <input
                onChange={handleSelectOption}
                checked={selectedOption === 'Khác'}
                type='radio'
                name='vehicle'
                value={'Khác'}
              />
              <span>Khác</span>
            </label>
          </div>
        </div>
        <ul className={styles.list}>
          <li>
            <Link to='/' className={styles.item}>
              <GiTrafficCone className={styles.icon} />
              <h2>Hiệu lệnh, chỉ dẫn</h2>
            </Link>
          </li>
          <li>
            <Link to='/' className={styles.item}>
              <PiTrafficSignThin className={styles.icon} />
              <h2>Chuyển hướng, nhường đường</h2>
            </Link>
          </li>
          <li>
            <Link to='/' className={styles.item}>
              <BsSignNoParking className={styles.icon} />
              <h2>Dừng xe, đỗ xe</h2>
            </Link>
          </li>
          <li>
            <Link to='/' className={styles.item}>
              <GrAnnounce className={styles.icon} />
              <h2>Thiết bị ưu tiên, còi</h2>
            </Link>
          </li>
          <li>
            <Link to='/' className={styles.item}>
              <MdSpeed className={styles.icon} />
              <h2>Tốc độ, khoảng cách an toàn</h2>
            </Link>
          </li>
          <li>
            <Link to='/' className={styles.item}>
              <TbTruckDelivery className={styles.icon} />
              <h2>Vận chuyển người, hàng hóa</h2>
            </Link>
          </li>
          <li>
            <Link to='/' className={styles.item}>
              <FaTools className={styles.icon} />
              <h2>Trang thiết bị phương tiện</h2>
            </Link>
          </li>
          <li>
            <Link to='/' className={styles.item}>
              <FaRoadCircleXmark className={styles.icon} />
              <h2>Đường cấm, đường một chiều</h2>
            </Link>
          </li>
          <li>
            <Link to='/' className={styles.item}>
              <PiBeerBottleFill className={styles.icon} />
              <h2>Nồng độ cồn, chất kích thích</h2>
            </Link>
          </li>
          <li>
            <Link to='/' className={styles.item}>
              <ImProfile className={styles.icon} />
              <h2>Giấy tờ xe</h2>
            </Link>
          </li>
          <li>
            <Link to='/' className={styles.item}>
              <GiWhiteBook className={styles.icon} />
              <h2>Khác</h2>
            </Link>
          </li>
        </ul>
      </main>
    </div>
  );
}
