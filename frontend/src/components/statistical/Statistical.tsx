/** styles */
import { useSelector } from 'react-redux';
import styles from './Statistical.module.scss';

/** recharts */
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import { themeMode } from '@/store/theme/themeSelector';

/** icons */
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';
import { IoIosPeople } from 'react-icons/io';
import { PiExamFill } from 'react-icons/pi';
import { BsFillQuestionCircleFill } from 'react-icons/bs';
import { FaMapLocationDot } from 'react-icons/fa6';

export default function Statistical() {
  const mode = useSelector(themeMode);
  const isDarkMode = mode === 'dark';

  const users = [
    {
      month: 'Jan',
      users: 2,
    },
    {
      month: 'Feb',
      users: 3,
    },
    {
      month: 'Mar',
      users: 2,
    },
    {
      month: 'Apr',
      users: 5,
    },
    {
      month: 'May',
      users: 1,
    },
    {
      month: 'Jun',
      users: 8,
    },
    {
      month: 'Jul',
      users: 4,
    },
    {
      month: 'Aug',
      users: 6,
    },
    {
      month: 'Sep',
      users: 7,
    },
    {
      month: 'Oct',
      users: 3,
    },
    {
      month: 'Nov',
      users: 6,
    },
    {
      month: 'Dec',
      users: 4,
    },
  ];
  return (
    <>
      <div
        className={`${styles.statistical} ${isDarkMode ? styles.darkMode : ''}`}
      >
        <div className={styles.showAll}>
          <div className={styles.item}>
            <div className={styles.top}>
              <div className={styles.info}>
                <h2>Người dùng</h2>
                <p>1.234</p>
                <div
                  className={`${styles.bar} ${styles.backgroundBlue1}`}
                ></div>
              </div>
              <div
                className={`${styles.iconContainer} ${styles.backgroundBlue2}`}
              >
                <IoIosPeople className={`${styles.icon} ${styles.colorBlue}`} />
              </div>
            </div>
            <div className={styles.bottom}>
              <FaArrowUp className={`${styles.icon} ${styles.colorGreen}`} />
              <p className={styles.description}>
                <span className={styles.colorGreen}>+6,5%</span> Kể từ tuần
                trước
              </p>
            </div>
          </div>
          <div className={styles.item}>
            <div className={styles.top}>
              <div className={styles.info}>
                <h2>Đề thi</h2>
                <p>4.567</p>
                <div
                  className={`${styles.bar} ${styles.backgroundTurquoise1}`}
                ></div>
              </div>
              <div
                className={`${styles.iconContainer} ${styles.backgroundTurquoise2}`}
              >
                <PiExamFill
                  className={`${styles.icon} ${styles.colorTurquoise}`}
                />
              </div>
            </div>
            <div className={styles.bottom}>
              <FaArrowDown className={`${styles.icon} ${styles.colorRed}`} />
              <p className={styles.description}>
                <span className={styles.colorRed}>-0,10%</span> Kể từ tuần trước
              </p>
            </div>
          </div>
          <div className={styles.item}>
            <div className={styles.top}>
              <div className={styles.info}>
                <h2>Câu hỏi</h2>
                <p>6.789</p>
                <div
                  className={`${styles.bar} ${styles.backgroundPurple1}`}
                ></div>
              </div>
              <div
                className={`${styles.iconContainer} ${styles.backgroundPurple2}`}
              >
                <BsFillQuestionCircleFill
                  className={`${styles.icon} ${styles.colorPurple}`}
                />
              </div>
            </div>
            <div className={styles.bottom}>
              <FaArrowDown className={`${styles.icon} ${styles.colorRed}`} />
              <p className={styles.description}>
                <span className={styles.colorRed}>-0,02%</span> Kể từ tuần trước
              </p>
            </div>
          </div>
          <div className={styles.item}>
            <div className={styles.top}>
              <div className={styles.info}>
                <h2>Lượt truy cập</h2>
                <p>1.456</p>
                <div
                  className={`${styles.bar} ${styles.backgroundBrown1}`}
                ></div>
              </div>
              <div
                className={`${styles.iconContainer} ${styles.backgroundBrown2}`}
              >
                <FaMapLocationDot
                  className={`${styles.icon} ${styles.colorBrown}`}
                />
              </div>
            </div>
            <div className={styles.bottom}>
              <FaArrowUp className={`${styles.icon} ${styles.colorGreen}`} />
              <p className={styles.description}>
                <span className={styles.colorGreen}>+0,5%</span> Kể từ tuần
                trước
              </p>
            </div>
          </div>
        </div>
        <div className={styles.chart}>
          <h2>Thống kê người dùng đăng ký theo từng tháng</h2>
          <ResponsiveContainer width={'100%'} height={300}>
            <AreaChart
              width={320}
              height={300}
              data={users}
              margin={{
                top: 10,
                right: 0,
                left: -10,
                bottom: 0,
              }}
            >
              <defs>
                <linearGradient id='colorUsers' x1='0' y1='0' x2='0' y2='1'>
                  <stop offset='5%' stopColor='#8884d8' stopOpacity={0.8} />
                  <stop offset='95%' stopColor='#8884d8' stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray='1 1'
                stroke={isDarkMode ? '#ced4da' : '#adb5bd'}
              />
              <XAxis
                dataKey='month'
                stroke={isDarkMode ? '#ced4da' : '#6c757d'}
              />
              <YAxis stroke={isDarkMode ? '#ced4da' : '#6c757d'} />
              <Tooltip />
              <Legend />
              <Area
                type='monotone'
                dataKey='users'
                stroke='#8884d8'
                fillOpacity={1}
                fill='url(#colorUsers)'
                activeDot={{ r: 6 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  );
}
