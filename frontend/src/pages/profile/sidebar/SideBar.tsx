/** styles */
import styles from './SideBar.module.scss';

/** icons */
import { FaAngleDown, FaAngleUp } from 'react-icons/fa';
import { LuSettings } from 'react-icons/lu';
import { ImProfile } from 'react-icons/im';
import { RiLockPasswordLine } from 'react-icons/ri';
import { IoLogOutOutline } from 'react-icons/io5';

/** react-router */
import { NavLink, useNavigate } from 'react-router-dom';

/** react */
import { useState } from 'react';

/** services */
import { useLogoutMutation } from '@/services/authApi';

/** toastify */
import { toast } from 'react-toastify';

/** react-redux */
import { useSelector } from 'react-redux';
import { userSelector } from '@/store/auth/authSelector';

/** images */
import profileImagePlaceholder from '@/assets/images/profile-image-placeholder.jpg';

export default function SideBar({
  isDark,
  isCollapsed,
  onClose,
}: {
  isDark: boolean;
  isCollapsed: boolean;
  onClose: () => void;
}) {
  const [indexOpen, setIndexOpen] = useState<number | null>(null);
  const [logout] = useLogoutMutation();
  const navigate = useNavigate();

  const user = useSelector(userSelector);

  function handleOpen(index: number) {
    if (indexOpen === index) setIndexOpen(null);
    else {
      setIndexOpen(index);
    }
  }

  function handleCloseSideBar() {
    // mobile
    if (window.innerWidth <= 550) {
      onClose();
    }
  }

  async function handleLogout() {
    const ok = confirm('Bạn có chắc bạn muốn đăng xuất không?');
    if (!ok) return;
    try {
      const res = await logout().unwrap();
      toast.success(res.message);
      navigate('/');
    } catch (error) {
      console.error(error);
      toast.error('Đã có lỗi xảy ra');
    }
  }

  return (
    <aside
      className={`${styles.sidebar} ${isDark ? styles.darkMode : ''} ${
        isCollapsed ? styles.collapsed : ''
      }`}
    >
      <div className={styles.nav}>
        <div
          className={`${styles.avatar} ${isCollapsed ? styles.collapsed : ''}`}
        >
          <div className={styles.imageContainer}>
            <img
              src={user?.avatar ? user?.avatar : profileImagePlaceholder}
              alt={`${user?.last_name} ${user?.first_name} avatar`}
            />
          </div>
          <p className={styles.name}>
            {user?.last_name} {user?.first_name}
          </p>
        </div>

        <div className={styles.link}>
          <div className={styles.dropdown}>
            <div className={styles.head} onClick={() => handleOpen(0)}>
              <div>
                <LuSettings className={styles.icon} />
                <p>Cài đặt</p>
              </div>
              {indexOpen === 0 ? (
                <FaAngleUp className={`${styles.icon} ${styles.canHide}`} />
              ) : (
                <FaAngleDown className={`${styles.icon} ${styles.canHide}`} />
              )}
            </div>
            <div
              className={`${styles.body} ${
                indexOpen === 0 ? '' : styles.closed
              }`}
            >
              <ul>
                <li>
                  <NavLink
                    onClick={handleCloseSideBar}
                    className={({ isActive }) =>
                      isActive ? styles.active : ''
                    }
                    to='/profile'
                    end
                    replace
                  >
                    <ImProfile className={styles.icon} />
                    <span>Thông tin cá nhân</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    onClick={handleCloseSideBar}
                    to='password'
                    className={({ isActive }) =>
                      isActive ? styles.active : ''
                    }
                    replace
                  >
                    <RiLockPasswordLine className={styles.icon} />
                    <span>Mật khẩu</span>
                  </NavLink>
                </li>
                <li>
                  <div onClick={handleLogout}>
                    <IoLogOutOutline className={styles.icon} />
                    <span>Đăng xuất</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}