/** styles */
import styles from './Home.module.scss';

/** Icons */
import {
  IoMdGrid,
  IoMdSettings,
  IoIosLogIn,
  IoIosLogOut,
} from 'react-icons/io';

import {
  FaRandom,
  FaCubes,
  FaHeart,
  FaSign,
  FaBalanceScale,
} from 'react-icons/fa';

import {
  FaGraduationCap,
  FaCircleXmark,
  FaRegRegistered,
} from 'react-icons/fa6';

import {
  MdOutlineDarkMode,
  MdHistory,
  MdOutlineLightMode,
} from 'react-icons/md';

import { CgProfile } from 'react-icons/cg';

/** react-redux */
import { useDispatch, useSelector } from 'react-redux';
import { themeMode } from '@/store/theme/themeSelector';
import { toggleMode } from '@/store/theme/themeSlice';
import { useState } from 'react';

/** react-router */
import { Link } from 'react-router-dom';

export default function HomePage() {
  const mode = useSelector(themeMode);
  const dispatch = useDispatch();

  const [user, setUser] = useState(false);

  const isDarkMode = mode === 'dark';

  function switchMode() {
    dispatch(toggleMode());
  }

  function handleClick() {
    setUser(!user);
  }

  return (
    <>
      <div
        className={`${styles.homepage} ${
          isDarkMode ? styles.darkMode : undefined
        }`}
      >
        <header className={styles.header}>
          <div className={styles.top}>
            <h1 className={styles.title}>Ôn thi GPLX hạng A1</h1>
            <Link to='/setting'>
              <IoMdSettings className={styles.icon} />
            </Link>
          </div>
          <div className={styles.bottom}>
            <p className={styles.addition}>
              (Nhấn vào bánh răng để chọn ôn thi các hạng lái xe khác)
            </p>
          </div>
        </header>
        <main className={styles.main}>
          <div className={styles.card}>
            <div className={`${styles.item} ${styles.purple}`}>
              <FaRandom className={styles.icon} />
              <p>Đề ngẫu nhiên</p>
            </div>
            <div className={`${styles.item} ${styles.lightPurple}`}>
              <FaGraduationCap className={styles.icon} />
              <p>Thi theo bộ đề</p>
            </div>
            <div className={`${styles.item} ${styles.green}`}>
              <IoMdGrid className={styles.icon} />
              <p>200 câu hỏi</p>
            </div>
            <div className={`${styles.item} ${styles.solidGren}`}>
              <FaCubes className={styles.icon} />
              <p>Chủ đề</p>
            </div>
          </div>

          <div className={styles.card}>
            <div className={`${styles.item} ${styles.red}`}>
              <FaHeart className={styles.icon} />
              <p>20 câu liệt</p>
            </div>
            {user && (
              <div className={`${styles.item} ${styles.solidOrange}`}>
                <FaCircleXmark className={styles.icon} />
                <p>Các câu sai</p>
              </div>
            )}
            <Link
              to='list-sign'
              className={`${styles.item} ${styles.solidBlue}`}
            >
              <FaSign className={styles.icon} />
              <p>Biển báo</p>
            </Link>
            <Link
              to='/list-law'
              className={`${styles.item} ${styles.solidPink}`}
            >
              <FaBalanceScale className={styles.icon} />
              <p>Luật</p>
            </Link>
          </div>

          <div className={styles.card}>
            {user && (
              <>
                <div className={`${styles.item} ${styles.history}`}>
                  <MdHistory className={styles.icon} />
                  <p>Xem lịch sử thi</p>
                </div>
                <div
                  onClick={handleClick}
                  className={`${styles.item} ${styles.login}`}
                >
                  <IoIosLogOut className={styles.icon} />
                  <p>Đăng xuất</p>
                </div>
              </>
            )}
            {!user && (
              <>
                <div className={`${styles.item} ${styles.register}`}>
                  <FaRegRegistered className={styles.icon} />
                  <p>Đăng ký</p>
                </div>
                <div
                  onClick={handleClick}
                  className={`${styles.item} ${styles.login}`}
                >
                  <IoIosLogIn className={styles.icon} />
                  <p>Đăng nhập</p>
                </div>
              </>
            )}
            <div
              onClick={switchMode}
              className={`${styles.item} ${styles.dark}`}
            >
              {isDarkMode ? (
                <MdOutlineLightMode className={styles.icon} />
              ) : (
                <MdOutlineDarkMode className={styles.icon} />
              )}
              <p>{isDarkMode ? 'Sáng' : 'Tối'}</p>
            </div>
            {user && (
              <div className={`${styles.item} ${styles.profile}`}>
                <CgProfile className={styles.icon} />
                <p>Hồ sơ</p>
              </div>
            )}
          </div>
        </main>
      </div>
    </>
  );
}
