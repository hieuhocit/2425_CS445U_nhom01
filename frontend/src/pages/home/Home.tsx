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

import { RiAdminFill } from 'react-icons/ri';
import { CgProfile } from 'react-icons/cg';

/** react-redux */
import { useDispatch, useSelector } from 'react-redux';
import { themeMode } from '@/store/theme/themeSelector';
import { toggleMode } from '@/store/theme/themeSlice';
import { currentLicenseSelector } from '@/store/setting/settingSelector';
import { loginSelector, permissionSelector } from '@/store/auth/authSelector';

/** services */
import { useLogoutMutation } from '@/services/authApi';

/** react-router */
import { Link, useNavigate, useRouteLoaderData } from 'react-router-dom';

/** toastify */
import { toast } from 'react-toastify';

/** Utils */
import { getRandomExamId } from '@/utils/randomExam';

/** types */
import { IExam, IQuestion } from '@/types/definitions';

export default function HomePage() {
  const mode = useSelector(themeMode);
  const currentLicense = useSelector(currentLicenseSelector);
  const dispatch = useDispatch();
  const [logout] = useLogoutMutation();
  const navigate = useNavigate();

  const { questions, exams } = useRouteLoaderData('root') as {
    questions: IQuestion[] | undefined;
    exams: IExam[] | undefined;
  };

  const isLoggedIn = useSelector(loginSelector);
  const permission = useSelector(permissionSelector);

  const isAdmin = permission === 'ADMIN';

  const isDarkMode = mode === 'dark';

  function switchMode() {
    dispatch(toggleMode());
  }

  async function handleLogout() {
    const ok = confirm('Bạn có chắc bạn muốn đăng xuất không?');
    if (!ok) return;
    try {
      const res = await logout().unwrap();
      toast.success(res.message);
    } catch (error) {
      console.error(error);
      toast.error('Đã có lỗi xảy ra');
    }
  }

  function handleNavigateToRandomExam() {
    if (!exams) return;
    navigate(`/list-exam/${getRandomExamId(exams)}`);
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
            <h1 className={styles.title}>
              Ôn thi GPLX hạng {currentLicense?.code}
            </h1>
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
            <div
              onClick={handleNavigateToRandomExam}
              className={`${styles.item} ${styles.purple}`}
            >
              <FaRandom className={styles.icon} />
              <p>Đề ngẫu nhiên</p>
            </div>
            <Link
              to='/list-exam'
              className={`${styles.item} ${styles.lightPurple}`}
            >
              <FaGraduationCap className={styles.icon} />
              <p>Thi theo bộ đề</p>
            </Link>
            <Link to='/review' className={`${styles.item} ${styles.green}`}>
              <IoMdGrid className={styles.icon} />
              <p>{questions?.length} câu hỏi</p>
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
              <p>{questions?.filter((q) => q.required).length} câu liệt</p>
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
                <Link
                  to='/exam-history'
                  className={`${styles.item} ${styles.history}`}
                >
                  <MdHistory className={styles.icon} />
                  <p>Xem lịch sử thi</p>
                </Link>
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
              <Link
                to='/profile'
                className={`${styles.item} ${styles.profile}`}
              >
                <CgProfile className={styles.icon} />
                <p>Hồ sơ</p>
              </Link>
            )}
          </div>

          {isLoggedIn && isAdmin && (
            <>
              <div className={styles.card} style={{ alignItems: 'flex-start' }}>
                <>
                  <Link to='/admin' className={`${styles.item} ${styles.red}`}>
                    <RiAdminFill className={styles.icon} />
                    <p>Quản trị viên</p>
                  </Link>
                </>
              </div>
            </>
          )}
        </main>
      </div>
    </>
  );
}
