/** styles */
import styles from './SideBar.module.scss';

/** icons */
import { FaAngleDown, FaAngleUp } from 'react-icons/fa';
import { FaUserCog } from 'react-icons/fa';
import { LuSettings } from 'react-icons/lu';
import { PiExamFill } from 'react-icons/pi';
import { BsFillQuestionCircleFill } from 'react-icons/bs';
import { MdDashboard } from 'react-icons/md';

/** react-router */
import { NavLink } from 'react-router-dom';

/** react */
import { useState } from 'react';

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

  return (
    <aside
      className={`${styles.sidebar} ${isDark ? styles.darkMode : ''} ${
        isCollapsed ? styles.collapsed : ''
      }`}
    >
      <div className={styles.nav}>
        <div className={styles.link}>
          <div className={styles.item}>
            <NavLink
              onClick={handleCloseSideBar}
              to='/admin'
              end
              replace
              className={({ isActive }) => (isActive ? styles.active : '')}
            >
              <MdDashboard className={styles.icon} />
              <p>Bảng điều khiển</p>
            </NavLink>
          </div>
        </div>

        <div className={styles.link}>
          <div className={styles.dropdown}>
            <div className={styles.head} onClick={() => handleOpen(0)}>
              <div>
                <LuSettings className={styles.icon} />
                <p>Quản lý</p>
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
                    to='user-management?page=1&limit=4'
                    replace
                  >
                    <FaUserCog className={styles.icon} />
                    <span>Quản lý người dùng</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    onClick={handleCloseSideBar}
                    to='exam-management?page=1&limit=4'
                    className={({ isActive }) =>
                      isActive ? styles.active : ''
                    }
                    replace
                  >
                    <PiExamFill className={styles.icon} />
                    <span>Quản lý đề thi</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    onClick={handleCloseSideBar}
                    to='question-management?page=1&limit=4'
                    className={({ isActive }) =>
                      isActive ? styles.active : ''
                    }
                    replace
                  >
                    <BsFillQuestionCircleFill className={styles.icon} />
                    <span>Quản lý câu hỏi</span>
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
