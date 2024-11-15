/** styles */
import styles from './Setting.module.scss';

/** react */
import { useState } from 'react';

/** react-router */
import { useNavigate } from 'react-router-dom';

/** Icons */
import { useSelector } from 'react-redux';

/** redux */
import { themeMode } from '@/store/theme/themeSelector';

/** components */
import Header from '@/components/header/Header';

export default function SettingPage() {
  const [selectedOption, setSelectedOption] = useState('Hạng A1');
  const navigate = useNavigate();

  const mode = useSelector(themeMode);
  const isDarkMode = mode === 'dark';

  function handleSelectedOption(e: React.ChangeEvent<HTMLInputElement>) {
    setSelectedOption(e.target.value);
  }

  function handleSave() {
    navigate('/');
  }

  return (
    <>
      <div
        className={`${styles.setting} ${
          isDarkMode ? styles.darkMode : undefined
        }`}
      >
        <Header title='Cài đặt' isDark={isDarkMode} />
        <main className={styles.main}>
          <ul className={styles.listSetting}>
            <li>
              <label className={styles.item}>
                <input
                  onChange={handleSelectedOption}
                  checked={selectedOption === 'Hạng A1'}
                  type='radio'
                  name='level'
                  value='Hạng A1'
                />
                <div>
                  <h2>Hạng A1</h2>
                  <p>
                    Xe môtô 2 bánh có dung tích xi-lanh từ 50cc đến dưới 175cc
                  </p>
                </div>
              </label>
            </li>
            <li>
              <label className={styles.item}>
                <input
                  onChange={handleSelectedOption}
                  checked={selectedOption === 'Hạng A2'}
                  type='radio'
                  name='level'
                  value='Hạng A2'
                />
                <div>
                  <h2>Hạng A2</h2>
                  <p>Xe môtô 2 bánh có dung tích xi-lanh từ 175cc trở lên</p>
                </div>
              </label>
            </li>
            <li>
              <label className={styles.item}>
                <input
                  onChange={handleSelectedOption}
                  checked={selectedOption === 'Hạng A3'}
                  type='radio'
                  name='level'
                  value='Hạng A3'
                />
                <div>
                  <h2>Hạng A3</h2>
                  <p>Xe môtô 3 bánh</p>
                </div>
              </label>
            </li>
            <li>
              <label className={styles.item}>
                <input
                  onChange={handleSelectedOption}
                  checked={selectedOption === 'Hạng A4'}
                  type='radio'
                  name='level'
                  value='Hạng A4'
                />
                <div>
                  <h2>Hạng A4</h2>
                  <p>Xe máy kéo có tải trọng đến 1.000 kg</p>
                </div>
              </label>
            </li>
            <li>
              <label className={styles.item}>
                <input
                  onChange={handleSelectedOption}
                  checked={selectedOption === 'Hạng B1'}
                  type='radio'
                  name='level'
                  value='Hạng B1'
                />
                <div>
                  <h2>Hạng B1</h2>
                  <p>
                    Không hành nghề lái xe, xe đến 9 chỗ ngồi, xe trọng tải dưới
                    3.500 kg
                  </p>
                </div>
              </label>
            </li>
            <li>
              <label className={styles.item}>
                <input
                  onChange={handleSelectedOption}
                  checked={selectedOption === 'Hạng B2'}
                  type='radio'
                  name='level'
                  value='Hạng B2'
                />
                <div>
                  <h2>Hạng B2</h2>
                  <p>
                    Hành nghề lái xe, xe đến 9 chỗ ngồi, xe trọng tải dưới 3.500
                    kg
                  </p>
                </div>
              </label>
            </li>
            <li>
              <label className={styles.item}>
                <input
                  onChange={handleSelectedOption}
                  checked={selectedOption === 'Hạng C'}
                  type='radio'
                  name='level'
                  value='Hạng C'
                />
                <div>
                  <h2>Hạng C</h2>
                  <p>Xe đến 9 chỗ ngồi, xe trọng tải trên 3.500 kg</p>
                </div>
              </label>
            </li>
            <li>
              <label className={styles.item}>
                <input
                  onChange={handleSelectedOption}
                  checked={selectedOption === 'Hạng D'}
                  type='radio'
                  name='level'
                  value='Hạng D'
                />
                <div>
                  <h2>Hạng D</h2>
                  <p>Xe từ 10 đến 30 chỗ ngồi</p>
                </div>
              </label>
            </li>
            <li>
              <label className={styles.item}>
                <input
                  onChange={handleSelectedOption}
                  checked={selectedOption === 'Hạng E'}
                  type='radio'
                  name='level'
                  value='Hạng E'
                />
                <div>
                  <h2>Hạng E</h2>
                  <p>Xe trên 30 chỗ ngồi</p>
                </div>
              </label>
            </li>
            <li>
              <label className={styles.item}>
                <input
                  onChange={handleSelectedOption}
                  checked={selectedOption === 'Hạng F'}
                  type='radio'
                  name='level'
                  value='Hạng F'
                />
                <div>
                  <h2>Hạng F</h2>
                  <p>
                    Các loại xe rơ moóc có trọng tải trên 750 kg, sơ mi rơ moóc,
                    ô tô khách nối toa
                  </p>
                </div>
              </label>
            </li>
          </ul>
        </main>
        <footer className={styles.footer}>
          <div className={styles.actions}>
            <button
              onClick={() => navigate('/')}
              className={`${styles.button} ${styles.lighter}`}
            >
              <span>Cancel</span>
            </button>
            <button onClick={handleSave} className={styles.button}>
              <span>Save</span>
            </button>
          </div>
        </footer>
      </div>
    </>
  );
}
