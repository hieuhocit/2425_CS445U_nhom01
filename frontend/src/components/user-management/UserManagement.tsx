/** styles */
import styles from './UserManagement.module.scss';

/** react-redux */
import { useSelector } from 'react-redux';
import { themeMode } from '@/store/theme/themeSelector';

/** react */
import { useState } from 'react';

/** components */
import Pagination from '../pagination/Pagination';
import Table from './table/Table';

export default function UserManagement() {
  const [currentPage, setCurrentPage] = useState(1);

  const mode = useSelector(themeMode);
  const isDarkMode = mode === 'dark';

  // Gọi API paginate ở đây
  // Hiện tại đang giả sử đã có sẵn data
  const ROWS = 5;
  const currentUsers = users.slice(
    (currentPage - 1) * ROWS,
    (currentPage - 1) * ROWS + ROWS
  );
  const totalPages = Math.ceil(users.length / ROWS);

  // Pagination
  function handleOnClickPrev() {
    setCurrentPage((prevValue) =>
      prevValue === 1 ? prevValue : prevValue - 1
    );
  }

  function handleOnClickNext() {
    setCurrentPage((prevValue) =>
      prevValue === totalPages ? prevValue : prevValue + 1
    );
  }

  function handleOnClickGoTo(page: number) {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  }

  return (
    <div
      className={`${styles.management} ${isDarkMode ? styles.darkMode : ''}`}
    >
      <div className={styles.wrapper}>
        <Table isDark={isDarkMode} users={currentUsers} rows={ROWS} />
        <Pagination
          isDark={isDarkMode}
          currentPage={currentPage}
          totalPages={totalPages}
          onNext={handleOnClickNext}
          onPrev={handleOnClickPrev}
          onGoTo={handleOnClickGoTo}
        />
      </div>
    </div>
  );
}

const users = [
  {
    image:
      'https://i.pinimg.com/736x/19/ec/38/19ec3897543e0a7e6678d3597d590370.jpg',
    first_name: 'Hiếu',
    last_name: 'Trần',
    email: 'hieuhocit2309@gmail.com',
    role: 'ADMIN',
  },
  {
    image:
      'https://i.pinimg.com/736x/19/ec/38/19ec3897543e0a7e6678d3597d590370.jpg',
    first_name: 'Hiếu',
    last_name: 'Trần',
    email: 'hieuhocit2309@gmail.com',
    role: 'ADMIN',
  },
  {
    image:
      'https://i.pinimg.com/736x/c7/34/44/c734442de9a2cb88d5a5e15708746e3c.jpg',
    first_name: 'Trần',
    last_name: 'Hiếu',
    email: 'hieuhocit2309@gmail.com',
    role: 'ADMIN',
  },
  {
    image:
      'https://i.pinimg.com/736x/19/ec/38/19ec3897543e0a7e6678d3597d590370.jpg',
    first_name: 'Hiếu',
    last_name: 'Trần',
    email: 'hieuhocit2309@gmail.com',
    role: 'ADMIN',
  },
  {
    image:
      'https://i.pinimg.com/736x/c7/34/44/c734442de9a2cb88d5a5e15708746e3c.jpg',
    first_name: 'Trần',
    last_name: 'Hiếu',
    email: 'hieuhocit2309@gmail.com',
    role: 'ADMIN',
  },
  {
    image:
      'https://i.pinimg.com/736x/19/ec/38/19ec3897543e0a7e6678d3597d590370.jpg',
    first_name: 'Hiếu',
    last_name: 'Trần',
    email: 'hieuhocit2309@gmail.com',
    role: 'ADMIN',
  },
  {
    image:
      'https://i.pinimg.com/736x/c7/34/44/c734442de9a2cb88d5a5e15708746e3c.jpg',
    first_name: 'Trần',
    last_name: 'Hiếu',
    email: 'hieuhocit2309@gmail.com',
    role: 'ADMIN',
  },
  {
    image:
      'https://i.pinimg.com/736x/19/ec/38/19ec3897543e0a7e6678d3597d590370.jpg',
    first_name: 'Hiếu',
    last_name: 'Trần',
    email: 'hieuhocit2309@gmail.com',
    role: 'ADMIN',
  },
  {
    image:
      'https://i.pinimg.com/736x/c7/34/44/c734442de9a2cb88d5a5e15708746e3c.jpg',
    first_name: 'Trần',
    last_name: 'Hiếu',
    email: 'hieuhocit2309@gmail.com',
    role: 'ADMIN',
  },
  {
    image:
      'https://i.pinimg.com/736x/19/ec/38/19ec3897543e0a7e6678d3597d590370.jpg',
    first_name: 'Hiếu',
    last_name: 'Trần',
    email: 'hieuhocit2309@gmail.com',
    role: 'ADMIN',
  },
  {
    image:
      'https://i.pinimg.com/736x/c7/34/44/c734442de9a2cb88d5a5e15708746e3c.jpg',
    first_name: 'Trần',
    last_name: 'Hiếu',
    email: 'hieuhocit2309@gmail.com',
    role: 'ADMIN',
  },
  {
    image:
      'https://i.pinimg.com/736x/19/ec/38/19ec3897543e0a7e6678d3597d590370.jpg',
    first_name: 'Hiếu',
    last_name: 'Trần',
    email: 'hieuhocit2309@gmail.com',
    role: 'ADMIN',
  },
  {
    image:
      'https://i.pinimg.com/736x/c7/34/44/c734442de9a2cb88d5a5e15708746e3c.jpg',
    first_name: 'Trần',
    last_name: 'Hiếu',
    email: 'hieuhocit2309@gmail.com',
    role: 'ADMIN',
  },
  {
    image:
      'https://i.pinimg.com/736x/19/ec/38/19ec3897543e0a7e6678d3597d590370.jpg',
    first_name: 'Hiếu',
    last_name: 'Trần',
    email: 'hieuhocit2309@gmail.com',
    role: 'ADMIN',
  },
  {
    image:
      'https://i.pinimg.com/736x/c7/34/44/c734442de9a2cb88d5a5e15708746e3c.jpg',
    first_name: 'Trần',
    last_name: 'Hiếu',
    email: 'hieuhocit2309@gmail.com',
    role: 'ADMIN',
  },
  {
    image:
      'https://i.pinimg.com/736x/19/ec/38/19ec3897543e0a7e6678d3597d590370.jpg',
    first_name: 'Hiếu',
    last_name: 'Trần',
    email: 'hieuhocit2309@gmail.com',
    role: 'ADMIN',
  },
  {
    image:
      'https://i.pinimg.com/736x/c7/34/44/c734442de9a2cb88d5a5e15708746e3c.jpg',
    first_name: 'Trần',
    last_name: 'Hiếu',
    email: 'hieuhocit2309@gmail.com',
    role: 'ADMIN',
  },
  {
    image:
      'https://i.pinimg.com/736x/19/ec/38/19ec3897543e0a7e6678d3597d590370.jpg',
    first_name: 'Hiếu',
    last_name: 'Trần',
    email: 'hieuhocit2309@gmail.com',
    role: 'ADMIN',
  },
  {
    image:
      'https://i.pinimg.com/736x/c7/34/44/c734442de9a2cb88d5a5e15708746e3c.jpg',
    first_name: 'Trần',
    last_name: 'Hiếu',
    email: 'hieuhocit2309@gmail.com',
    role: 'ADMIN',
  },
  {
    image:
      'https://i.pinimg.com/736x/19/ec/38/19ec3897543e0a7e6678d3597d590370.jpg',
    first_name: 'Hiếu',
    last_name: 'Trần',
    email: 'hieuhocit2309@gmail.com',
    role: 'ADMIN',
  },
  {
    image:
      'https://i.pinimg.com/736x/c7/34/44/c734442de9a2cb88d5a5e15708746e3c.jpg',
    first_name: 'Trần',
    last_name: 'Hiếu',
    email: 'hieuhocit2309@gmail.com',
    role: 'ADMIN',
  },
  {
    image:
      'https://i.pinimg.com/736x/19/ec/38/19ec3897543e0a7e6678d3597d590370.jpg',
    first_name: 'Hiếu',
    last_name: 'Trần',
    email: 'hieuhocit2309@gmail.com',
    role: 'ADMIN',
  },
  {
    image:
      'https://i.pinimg.com/736x/c7/34/44/c734442de9a2cb88d5a5e15708746e3c.jpg',
    first_name: 'Trần',
    last_name: 'Hiếu',
    email: 'hieuhocit2309@gmail.com',
    role: 'ADMIN',
  },
  {
    image:
      'https://i.pinimg.com/736x/19/ec/38/19ec3897543e0a7e6678d3597d590370.jpg',
    first_name: 'Hiếu',
    last_name: 'Trần',
    email: 'hieuhocit2309@gmail.com',
    role: 'ADMIN',
  },
  {
    image:
      'https://i.pinimg.com/736x/c7/34/44/c734442de9a2cb88d5a5e15708746e3c.jpg',
    first_name: 'Trần',
    last_name: 'Hiếu',
    email: 'hieuhocit2309@gmail.com',
    role: 'ADMIN',
  },
  {
    image:
      'https://i.pinimg.com/736x/19/ec/38/19ec3897543e0a7e6678d3597d590370.jpg',
    first_name: 'Hiếu',
    last_name: 'Trần',
    email: 'hieuhocit2309@gmail.com',
    role: 'ADMIN',
  },
  {
    image:
      'https://i.pinimg.com/736x/c7/34/44/c734442de9a2cb88d5a5e15708746e3c.jpg',
    first_name: 'Trần',
    last_name: 'Hiếu',
    email: 'hieuhocit2309@gmail.com',
    role: 'ADMIN',
  },
  {
    image:
      'https://i.pinimg.com/736x/19/ec/38/19ec3897543e0a7e6678d3597d590370.jpg',
    first_name: 'Hiếu',
    last_name: 'Trần',
    email: 'hieuhocit2309@gmail.com',
    role: 'ADMIN',
  },
  {
    image:
      'https://i.pinimg.com/736x/c7/34/44/c734442de9a2cb88d5a5e15708746e3c.jpg',
    first_name: 'Trần',
    last_name: 'Hiếu',
    email: 'hieuhocit2309@gmail.com',
    role: 'ADMIN',
  },
].map((user, index) => ({ ...user, first_name: user.first_name + index }));
