/** styles */
import styles from './ExamManagement.module.scss';

/** react-redux */
import { useSelector } from 'react-redux';
import { themeMode } from '@/store/theme/themeSelector';

/** react */
import { useState } from 'react';

/** components */
import Pagination from '../pagination/Pagination';
import Table from './table/Table';
import Modal from '../modal/Modal';
import Form from './form/Form';

/** toastify */
import { toast } from 'react-toastify';

export default function ExamManagement() {
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);
  const [behavior, setBehavior] = useState<'view' | 'add' | 'update'>('view');

  const mode = useSelector(themeMode);
  const isDarkMode = mode === 'dark';

  // Gọi API paginate ở đây
  // Hiện tại đang giả sử đã có sẵn data
  const ROWS = 4;
  const currentUsers = users.slice(
    (currentPage - 1) * ROWS,
    (currentPage - 1) * ROWS + ROWS
  );
  const totalPages = Math.ceil(users.length / ROWS);

  // Operation
  function handleDeleteUser(id: string) {
    // Call API
    const deletedUser = users.find((u) => u.id === id);
    if (!deletedUser) return;

    // Message
    toast.success('Xoá người dùng thành công');
  }

  function handleAddUser(id: string, formData: FormData) {
    // Validate data
    const firstName = formData.get('firstName');
    const lastName = formData.get('lastName');
    const username = formData.get('username');
    const email = formData.get('email');
    const image = formData.get('image');
    const password = formData.get('password');

    console.log(id, image);

    if (
      firstName === '' ||
      lastName === '' ||
      username === '' ||
      password === '' ||
      email === ''
    ) {
      toast.error('Vui lòng nhập đầy đủ thông tin!');
      return null;
    } else if (email === 'hieuhocit2309@gmail.com') {
      toast.error('Email đã tồn tại!');
      return null;
    } else if (username === 'admin') {
      toast.error('Tên đăng nhập đã tồn tại!');
      return null;
    }

    toast.success('Thêm người dùng thành công');
    handleCloseModal();
    // Call API
  }

  function handleUpdateUser(id: string, formData: FormData) {
    // Validate data
    const firstName = formData.get('firstName');
    const lastName = formData.get('lastName');
    const username = formData.get('username');
    const email = formData.get('email');
    const image = formData.get('image');
    const password = formData.get('password');

    console.log(id, image);

    if (
      firstName === '' ||
      lastName === '' ||
      username === '' ||
      password === '' ||
      email === ''
    ) {
      toast.error('Vui lòng nhập đầy đủ thông tin!');
      return null;
    }

    // Call API;
    toast.success('Cập nhật người dùng thành công');
    handleCloseModal();
  }

  // Modal
  function handleCloseModal() {
    setShowModal(false);
    setSelectedUser(null);
  }

  function handleOpenModalAdd() {
    setShowModal(true);
    setBehavior('add');
  }

  function handleOpenModalView(id: string) {
    const viewedUser = users.find((u) => u.id === id);

    if (!viewedUser) return;
    setSelectedUser(viewedUser);
    setShowModal(true);
    setBehavior('view');
  }

  function handleOpenModalUpdate(id: string) {
    const updatedUser = users.find((u) => u.id === id);

    if (!updatedUser) return;
    setSelectedUser(updatedUser);
    setShowModal(true);
    setBehavior('update');
  }

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
    <>
      <div
        className={`${styles.management} ${isDarkMode ? styles.darkMode : ''}`}
      >
        <div className={styles.head}>
          <h2>Đề thi</h2>
          <button onClick={handleOpenModalAdd}>Thêm mới</button>
        </div>

        <div className={styles.body}>
          <Table
            isDark={isDarkMode}
            users={currentUsers}
            rows={ROWS}
            onOpenView={handleOpenModalView}
            onOpenUpdate={handleOpenModalUpdate}
            onDelete={handleDeleteUser}
          />
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
      <Modal onClose={handleCloseModal} isOpen={showModal} isDark={isDarkMode}>
        {showModal && (
          <Form
            onCancel={handleCloseModal}
            isDark={isDarkMode}
            behavior={behavior}
            user={behavior === 'add' ? null : selectedUser}
            onSubmit={
              behavior === 'view'
                ? null
                : behavior === 'add'
                ? handleAddUser
                : handleUpdateUser
            }
          />
        )}
      </Modal>
    </>
  );
}

interface IUser {
  id: string;
  image: string;
  first_name: string;
  last_name: string;
  email: string;
  role: string;
  username: string;
}

const users: IUser[] = [
  {
    image: '',
    first_name: 'Hiếu',
    last_name: 'Trần',
    email: 'hieuhocit2309@gmail.com',
    role: 'MEMBER',
    username: 'hieuhocit',
  },
  {
    image:
      'https://i.pinimg.com/736x/19/ec/38/19ec3897543e0a7e6678d3597d590370.jpg',
    first_name: 'Hiếu',
    last_name: 'Trần',
    email: 'hieuhocit2309@gmail.com',
    role: 'ADMIN',
    username: 'trantrunghieu',
  },
  {
    image:
      'https://i.pinimg.com/736x/19/ec/38/19ec3897543e0a7e6678d3597d590370.jpg',
    first_name: 'Hiếu',
    last_name: 'Trần',
    email: 'hieuhocit2309@gmail.com',
    role: 'MEMBER',
    username: 'hieuhocit',
  },
  {
    image:
      'https://i.pinimg.com/736x/19/ec/38/19ec3897543e0a7e6678d3597d590370.jpg',
    first_name: 'Hiếu',
    last_name: 'Trần',
    email: 'hieuhocit2309@gmail.com',
    role: 'ADMIN',
    username: 'trantrunghieu',
  },
  {
    image:
      'https://i.pinimg.com/736x/19/ec/38/19ec3897543e0a7e6678d3597d590370.jpg',
    first_name: 'Hiếu',
    last_name: 'Trần',
    email: 'hieuhocit2309@gmail.com',
    role: 'MEMBER',
    username: 'hieuhocit',
  },
  {
    image:
      'https://i.pinimg.com/736x/19/ec/38/19ec3897543e0a7e6678d3597d590370.jpg',
    first_name: 'Hiếu',
    last_name: 'Trần',
    email: 'hieuhocit2309@gmail.com',
    role: 'ADMIN',
    username: 'trantrunghieu',
  },
  {
    image:
      'https://i.pinimg.com/736x/19/ec/38/19ec3897543e0a7e6678d3597d590370.jpg',
    first_name: 'Hiếu',
    last_name: 'Trần',
    email: 'hieuhocit2309@gmail.com',
    role: 'MEMBER',
    username: 'hieuhocit',
  },
  {
    image:
      'https://i.pinimg.com/736x/19/ec/38/19ec3897543e0a7e6678d3597d590370.jpg',
    first_name: 'Hiếu',
    last_name: 'Trần',
    email: 'hieuhocit2309@gmail.com',
    role: 'ADMIN',
    username: 'trantrunghieu',
  },
  {
    image:
      'https://i.pinimg.com/736x/19/ec/38/19ec3897543e0a7e6678d3597d590370.jpg',
    first_name: 'Hiếu',
    last_name: 'Trần',
    email: 'hieuhocit2309@gmail.com',
    role: 'MEMBER',
    username: 'hieuhocit',
  },
  {
    image:
      'https://i.pinimg.com/736x/19/ec/38/19ec3897543e0a7e6678d3597d590370.jpg',
    first_name: 'Hiếu',
    last_name: 'Trần',
    email: 'hieuhocit2309@gmail.com',
    role: 'ADMIN',
    username: 'trantrunghieu',
  },
  {
    image:
      'https://i.pinimg.com/736x/19/ec/38/19ec3897543e0a7e6678d3597d590370.jpg',
    first_name: 'Hiếu',
    last_name: 'Trần',
    email: 'hieuhocit2309@gmail.com',
    role: 'MEMBER',
    username: 'hieuhocit',
  },
  {
    image:
      'https://i.pinimg.com/736x/19/ec/38/19ec3897543e0a7e6678d3597d590370.jpg',
    first_name: 'Hiếu',
    last_name: 'Trần',
    email: 'hieuhocit2309@gmail.com',
    role: 'ADMIN',
    username: 'trantrunghieu',
  },
  {
    image:
      'https://i.pinimg.com/736x/19/ec/38/19ec3897543e0a7e6678d3597d590370.jpg',
    first_name: 'Hiếu',
    last_name: 'Trần',
    email: 'hieuhocit2309@gmail.com',
    role: 'MEMBER',
    username: 'hieuhocit',
  },
  {
    image:
      'https://i.pinimg.com/736x/19/ec/38/19ec3897543e0a7e6678d3597d590370.jpg',
    first_name: 'Hiếu',
    last_name: 'Trần',
    email: 'hieuhocit2309@gmail.com',
    role: 'ADMIN',
    username: 'trantrunghieu',
  },
  {
    image:
      'https://i.pinimg.com/736x/19/ec/38/19ec3897543e0a7e6678d3597d590370.jpg',
    first_name: 'Hiếu',
    last_name: 'Trần',
    email: 'hieuhocit2309@gmail.com',
    role: 'MEMBER',
    username: 'hieuhocit',
  },
  {
    image:
      'https://i.pinimg.com/736x/19/ec/38/19ec3897543e0a7e6678d3597d590370.jpg',
    first_name: 'Hiếu',
    last_name: 'Trần',
    email: 'hieuhocit2309@gmail.com',
    role: 'ADMIN',
    username: 'trantrunghieu',
  },
  {
    image:
      'https://i.pinimg.com/736x/19/ec/38/19ec3897543e0a7e6678d3597d590370.jpg',
    first_name: 'Hiếu',
    last_name: 'Trần',
    email: 'hieuhocit2309@gmail.com',
    role: 'MEMBER',
    username: 'hieuhocit',
  },
  {
    image:
      'https://i.pinimg.com/736x/19/ec/38/19ec3897543e0a7e6678d3597d590370.jpg',
    first_name: 'Hiếu',
    last_name: 'Trần',
    email: 'hieuhocit2309@gmail.com',
    role: 'ADMIN',
    username: 'trantrunghieu',
  },
  {
    image:
      'https://i.pinimg.com/736x/19/ec/38/19ec3897543e0a7e6678d3597d590370.jpg',
    first_name: 'Hiếu',
    last_name: 'Trần',
    email: 'hieuhocit2309@gmail.com',
    role: 'MEMBER',
    username: 'hieuhocit',
  },
  {
    image:
      'https://i.pinimg.com/736x/19/ec/38/19ec3897543e0a7e6678d3597d590370.jpg',
    first_name: 'Hiếu',
    last_name: 'Trần',
    email: 'hieuhocit2309@gmail.com',
    role: 'ADMIN',
    username: 'trantrunghieu',
  },
  {
    image:
      'https://i.pinimg.com/736x/19/ec/38/19ec3897543e0a7e6678d3597d590370.jpg',
    first_name: 'Hiếu',
    last_name: 'Trần',
    email: 'hieuhocit2309@gmail.com',
    role: 'MEMBER',
    username: 'hieuhocit',
  },
  {
    image:
      'https://i.pinimg.com/736x/19/ec/38/19ec3897543e0a7e6678d3597d590370.jpg',
    first_name: 'Hiếu',
    last_name: 'Trần',
    email: 'hieuhocit2309@gmail.com',
    role: 'ADMIN',
    username: 'trantrunghieu',
  },
  {
    image:
      'https://i.pinimg.com/736x/19/ec/38/19ec3897543e0a7e6678d3597d590370.jpg',
    first_name: 'Hiếu',
    last_name: 'Trần',
    email: 'hieuhocit2309@gmail.com',
    role: 'MEMBER',
    username: 'hieuhocit',
  },
  {
    image:
      'https://i.pinimg.com/736x/19/ec/38/19ec3897543e0a7e6678d3597d590370.jpg',
    first_name: 'Hiếu',
    last_name: 'Trần',
    email: 'hieuhocit2309@gmail.com',
    role: 'ADMIN',
    username: 'trantrunghieu',
  },
  {
    image:
      'https://i.pinimg.com/736x/19/ec/38/19ec3897543e0a7e6678d3597d590370.jpg',
    first_name: 'Hiếu',
    last_name: 'Trần',
    email: 'hieuhocit2309@gmail.com',
    role: 'MEMBER',
    username: 'hieuhocit',
  },
  {
    image:
      'https://i.pinimg.com/736x/19/ec/38/19ec3897543e0a7e6678d3597d590370.jpg',
    first_name: 'Hiếu',
    last_name: 'Trần',
    email: 'hieuhocit2309@gmail.com',
    role: 'ADMIN',
    username: 'trantrunghieu',
  },
  {
    image:
      'https://i.pinimg.com/736x/19/ec/38/19ec3897543e0a7e6678d3597d590370.jpg',
    first_name: 'Hiếu',
    last_name: 'Trần',
    email: 'hieuhocit2309@gmail.com',
    role: 'MEMBER',
    username: 'hieuhocit',
  },
  {
    image:
      'https://i.pinimg.com/736x/19/ec/38/19ec3897543e0a7e6678d3597d590370.jpg',
    first_name: 'Hiếu',
    last_name: 'Trần',
    email: 'hieuhocit2309@gmail.com',
    role: 'ADMIN',
    username: 'trantrunghieu',
  },
  {
    image:
      'https://i.pinimg.com/736x/19/ec/38/19ec3897543e0a7e6678d3597d590370.jpg',
    first_name: 'Hiếu',
    last_name: 'Trần',
    email: 'hieuhocit2309@gmail.com',
    role: 'MEMBER',
    username: 'hieuhocit',
  },
  {
    image:
      'https://i.pinimg.com/736x/19/ec/38/19ec3897543e0a7e6678d3597d590370.jpg',
    first_name: 'Hiếu',
    last_name: 'Trần',
    email: 'hieuhocit2309@gmail.com',
    role: 'ADMIN',
    username: 'trantrunghieu',
  },
].map((user, index) => ({
  ...user,
  id: user.username + index,
  username: user.username + index,
}));
