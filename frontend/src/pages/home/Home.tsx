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
import { licenseSelector } from '@/store/setting/settingSelector';

/** react-router */
import { Link } from 'react-router-dom';
import { loginSelector } from '@/store/auth/authSelector';
import { useLogoutMutation } from '@/services/authApi';

/** toastify */
import { toast } from 'react-toastify';

export default function HomePage() {
  const mode = useSelector(themeMode);
  const license = useSelector(licenseSelector);
  const dispatch = useDispatch();
  const [logout] = useLogoutMutation();

  const isLoggedIn = useSelector(loginSelector);

  const isDarkMode = mode === 'dark';

  function switchMode() {
    dispatch(toggleMode());
  }

  async function handleLogout() {
    try {
      const res = await logout().unwrap();
      toast.success(res.message);
    } catch (error) {
      console.error(error);
      toast.error('Đã có lỗi xảy ra');
    }
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
            <h1 className={styles.title}>Ôn thi GPLX {license.name}</h1>
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
            <Link
              to='/list-exam/examRandomId'
              className={`${styles.item} ${styles.purple}`}
            >
              <FaRandom className={styles.icon} />
              <p>Đề ngẫu nhiên</p>
            </Link>
            <Link
              to='/list-exam'
              className={`${styles.item} ${styles.lightPurple}`}
            >
              <FaGraduationCap className={styles.icon} />
              <p>Thi theo bộ đề</p>
            </Link>
            <Link to='/review' className={`${styles.item} ${styles.green}`}>
              <IoMdGrid className={styles.icon} />
              <p>200 câu hỏi</p>
            </Link>
            <Link
              to='/list-topic'
              className={`${styles.item} ${styles.solidGren}`}
            >
              <FaCubes className={styles.icon} />
              <p>Chủ đề</p>
            </Link>
          </div>

          <div className={styles.card}>
            <Link
              to='/list-required'
              className={`${styles.item} ${styles.red}`}
            >
              <FaHeart className={styles.icon} />
              <p>20 câu liệt</p>
            </Link>
            {isLoggedIn && (
              <Link
                to='/list-wrong'
                className={`${styles.item} ${styles.solidOrange}`}
              >
                <FaCircleXmark className={styles.icon} />
                <p>Các câu sai</p>
              </Link>
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
            {isLoggedIn && (
              <>
                <div className={`${styles.item} ${styles.history}`}>
                  <MdHistory className={styles.icon} />
                  <p>Xem lịch sử thi</p>
                </div>
                <div
                  onClick={handleLogout}
                  className={`${styles.item} ${styles.login}`}
                >
                  <IoIosLogOut className={styles.icon} />
                  <p>Đăng xuất</p>
                </div>
              </>
            )}
            {!isLoggedIn && (
              <>
                <Link
                  to='/register'
                  className={`${styles.item} ${styles.register}`}
                >
                  <FaRegRegistered className={styles.icon} />
                  <p>Đăng ký</p>
                </Link>
                <Link to='/login' className={`${styles.item} ${styles.login}`}>
                  <IoIosLogIn className={styles.icon} />
                  <p>Đăng nhập</p>
                </Link>
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
            {isLoggedIn && (
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
