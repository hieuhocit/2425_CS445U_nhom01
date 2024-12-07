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
import Modal from '../modal/Modal';
import Form from './form/Form';

/** toastify */
import { toast } from 'react-toastify';

/** types */
import { User } from '@/types/definitions';

export default function UserManagement() {
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
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
  function handleDeleteUser(id: number) {
    // Call API
    const deletedUser = users.find((u) => u.id === id);
    if (!deletedUser) return;

    // Message
    toast.success('Xoá người dùng thành công');
  }

  function handleAddUser(formData: FormData) {
    // Validate data
    const firstName = formData.get('firstName');
    const lastName = formData.get('lastName');
    const username = formData.get('username');
    const email = formData.get('email');
    const image = formData.get('image');
    const password = formData.get('password');

    console.log(image);

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

  function handleUpdateUser(id: number, formData: FormData) {
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

  function handleOpenModalView(id: number) {
    const viewedUser = users.find((u) => u.id === id);

    if (!viewedUser) return;
    setSelectedUser(viewedUser);
    setShowModal(true);
    setBehavior('view');
  }

  function handleOpenModalUpdate(id: number) {
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
          <h2>Người dùng</h2>
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

const users: User[] = [
  {
    username: 'hieuhocit0',
    first_name: 'Hiếu',
    last_name: 'Trần',
    avatar: '',
    email: 'hieuhocit2309@gmail.com',
    created_at: '2024-11-08 19:00:26.146',
    updated_at: '2024-11-08 19:00:26.146',
    permission: 'ADMIN',
    access_token: 'hieuhocit',
    refresh_token: 'refresh_token',
    id: 1,
  },
  {
    username: 'hieuhocit1',
    first_name: 'Hiếu',
    last_name: 'Trần',
    avatar:
      'https://i.pinimg.com/736x/19/ec/38/19ec3897543e0a7e6678d3597d590370.jpg',
    email: 'hieuhocit2309@gmail.com',
    created_at: '2024-11-08 19:00:26.146',
    updated_at: '2024-11-08 19:00:26.146',
    permission: 'MEMBER',
    access_token: 'hieuhocit',
    refresh_token: 'refresh_token',
    id: 2,
  },
  {
    username: 'hieuhocit2',
    first_name: 'Hiếu',
    last_name: 'Trần',
    avatar:
      'https://i.pinimg.com/736x/71/70/bf/7170bf6475b589f09e2757d1fbdef232.jpg',
    email: 'hieuhocit2309@gmail.com',
    created_at: '2024-11-08 19:00:26.146',
    updated_at: '2024-11-08 19:00:26.146',
    permission: 'ADMIN',
    access_token: 'hieuhocit',
    refresh_token: 'refresh_token',
    id: 3,
  },
  {
    username: 'hieuhocit3',
    first_name: 'Hiếu',
    last_name: 'Trần',
    avatar: '',
    email: 'hieuhocit2309@gmail.com',
    created_at: '2024-11-08 19:00:26.146',
    updated_at: '2024-11-08 19:00:26.146',
    permission: 'ADMIN',
    access_token: 'hieuhocit',
    refresh_token: 'refresh_token',
    id: 4,
  },
  {
    username: 'hieuhocit4',
    first_name: 'Hiếu',
    last_name: 'Trần',
    avatar:
      'https://i.pinimg.com/736x/19/ec/38/19ec3897543e0a7e6678d3597d590370.jpg',
    email: 'hieuhocit2309@gmail.com',
    created_at: '2024-11-08 19:00:26.146',
    updated_at: '2024-11-08 19:00:26.146',
    permission: 'MEMBER',
    access_token: 'hieuhocit',
    refresh_token: 'refresh_token',
    id: 5,
  },
  {
    username: 'hieuhocit5',
    first_name: 'Hiếu',
    last_name: 'Trần',
    avatar:
      'https://i.pinimg.com/736x/71/70/bf/7170bf6475b589f09e2757d1fbdef232.jpg',
    email: 'hieuhocit2309@gmail.com',
    created_at: '2024-11-08 19:00:26.146',
    updated_at: '2024-11-08 19:00:26.146',
    permission: 'ADMIN',
    access_token: 'hieuhocit',
    refresh_token: 'refresh_token',
    id: 6,
  },
  {
    username: 'hieuhocit6',
    first_name: 'Hiếu',
    last_name: 'Trần',
    avatar: '',
    email: 'hieuhocit2309@gmail.com',
    created_at: '2024-11-08 19:00:26.146',
    updated_at: '2024-11-08 19:00:26.146',
    permission: 'ADMIN',
    access_token: 'hieuhocit',
    refresh_token: 'refresh_token',
    id: 7,
  },
  {
    username: 'hieuhocit7',
    first_name: 'Hiếu',
    last_name: 'Trần',
    avatar:
      'https://i.pinimg.com/736x/19/ec/38/19ec3897543e0a7e6678d3597d590370.jpg',
    email: 'hieuhocit2309@gmail.com',
    created_at: '2024-11-08 19:00:26.146',
    updated_at: '2024-11-08 19:00:26.146',
    permission: 'MEMBER',
    access_token: 'hieuhocit',
    refresh_token: 'refresh_token',
    id: 8,
  },
  {
    username: 'hieuhocit8',
    first_name: 'Hiếu',
    last_name: 'Trần',
    avatar:
      'https://i.pinimg.com/736x/71/70/bf/7170bf6475b589f09e2757d1fbdef232.jpg',
    email: 'hieuhocit2309@gmail.com',
    created_at: '2024-11-08 19:00:26.146',
    updated_at: '2024-11-08 19:00:26.146',
    permission: 'ADMIN',
    access_token: 'hieuhocit',
    refresh_token: 'refresh_token',
    id: 9,
  },
  {
    username: 'hieuhocit9',
    first_name: 'Hiếu',
    last_name: 'Trần',
    avatar: '',
    email: 'hieuhocit2309@gmail.com',
    created_at: '2024-11-08 19:00:26.146',
    updated_at: '2024-11-08 19:00:26.146',
    permission: 'ADMIN',
    access_token: 'hieuhocit',
    refresh_token: 'refresh_token',
    id: 10,
  },
  {
    username: 'hieuhocit10',
    first_name: 'Hiếu',
    last_name: 'Trần',
    avatar:
      'https://i.pinimg.com/736x/19/ec/38/19ec3897543e0a7e6678d3597d590370.jpg',
    email: 'hieuhocit2309@gmail.com',
    created_at: '2024-11-08 19:00:26.146',
    updated_at: '2024-11-08 19:00:26.146',
    permission: 'MEMBER',
    access_token: 'hieuhocit',
    refresh_token: 'refresh_token',
    id: 11,
  },
  {
    username: 'hieuhocit11',
    first_name: 'Hiếu',
    last_name: 'Trần',
    avatar:
      'https://i.pinimg.com/736x/71/70/bf/7170bf6475b589f09e2757d1fbdef232.jpg',
    email: 'hieuhocit2309@gmail.com',
    created_at: '2024-11-08 19:00:26.146',
    updated_at: '2024-11-08 19:00:26.146',
    permission: 'ADMIN',
    access_token: 'hieuhocit',
    refresh_token: 'refresh_token',
    id: 12,
  },
  {
    username: 'hieuhocit12',
    first_name: 'Hiếu',
    last_name: 'Trần',
    avatar: '',
    email: 'hieuhocit2309@gmail.com',
    created_at: '2024-11-08 19:00:26.146',
    updated_at: '2024-11-08 19:00:26.146',
    permission: 'ADMIN',
    access_token: 'hieuhocit',
    refresh_token: 'refresh_token',
    id: 13,
  },
  {
    username: 'hieuhocit13',
    first_name: 'Hiếu',
    last_name: 'Trần',
    avatar:
      'https://i.pinimg.com/736x/19/ec/38/19ec3897543e0a7e6678d3597d590370.jpg',
    email: 'hieuhocit2309@gmail.com',
    created_at: '2024-11-08 19:00:26.146',
    updated_at: '2024-11-08 19:00:26.146',
    permission: 'MEMBER',
    access_token: 'hieuhocit',
    refresh_token: 'refresh_token',
    id: 14,
  },
  {
    username: 'hieuhocit14',
    first_name: 'Hiếu',
    last_name: 'Trần',
    avatar:
      'https://i.pinimg.com/736x/71/70/bf/7170bf6475b589f09e2757d1fbdef232.jpg',
    email: 'hieuhocit2309@gmail.com',
    created_at: '2024-11-08 19:00:26.146',
    updated_at: '2024-11-08 19:00:26.146',
    permission: 'ADMIN',
    access_token: 'hieuhocit',
    refresh_token: 'refresh_token',
    id: 15,
  },
  {
    username: 'hieuhocit15',
    first_name: 'Hiếu',
    last_name: 'Trần',
    avatar: '',
    email: 'hieuhocit2309@gmail.com',
    created_at: '2024-11-08 19:00:26.146',
    updated_at: '2024-11-08 19:00:26.146',
    permission: 'ADMIN',
    access_token: 'hieuhocit',
    refresh_token: 'refresh_token',
    id: 16,
  },
  {
    username: 'hieuhocit16',
    first_name: 'Hiếu',
    last_name: 'Trần',
    avatar:
      'https://i.pinimg.com/736x/19/ec/38/19ec3897543e0a7e6678d3597d590370.jpg',
    email: 'hieuhocit2309@gmail.com',
    created_at: '2024-11-08 19:00:26.146',
    updated_at: '2024-11-08 19:00:26.146',
    permission: 'MEMBER',
    access_token: 'hieuhocit',
    refresh_token: 'refresh_token',
    id: 17,
  },
  {
    username: 'hieuhocit17',
    first_name: 'Hiếu',
    last_name: 'Trần',
    avatar:
      'https://i.pinimg.com/736x/71/70/bf/7170bf6475b589f09e2757d1fbdef232.jpg',
    email: 'hieuhocit2309@gmail.com',
    created_at: '2024-11-08 19:00:26.146',
    updated_at: '2024-11-08 19:00:26.146',
    permission: 'ADMIN',
    access_token: 'hieuhocit',
    refresh_token: 'refresh_token',
    id: 18,
  },
  {
    username: 'hieuhocit18',
    first_name: 'Hiếu',
    last_name: 'Trần',
    avatar: '',
    email: 'hieuhocit2309@gmail.com',
    created_at: '2024-11-08 19:00:26.146',
    updated_at: '2024-11-08 19:00:26.146',
    permission: 'ADMIN',
    access_token: 'hieuhocit',
    refresh_token: 'refresh_token',
    id: 19,
  },
  {
    username: 'hieuhocit19',
    first_name: 'Hiếu',
    last_name: 'Trần',
    avatar:
      'https://i.pinimg.com/736x/19/ec/38/19ec3897543e0a7e6678d3597d590370.jpg',
    email: 'hieuhocit2309@gmail.com',
    created_at: '2024-11-08 19:00:26.146',
    updated_at: '2024-11-08 19:00:26.146',
    permission: 'MEMBER',
    access_token: 'hieuhocit',
    refresh_token: 'refresh_token',
    id: 20,
  },
  {
    username: 'hieuhocit20',
    first_name: 'Hiếu',
    last_name: 'Trần',
    avatar:
      'https://i.pinimg.com/736x/71/70/bf/7170bf6475b589f09e2757d1fbdef232.jpg',
    email: 'hieuhocit2309@gmail.com',
    created_at: '2024-11-08 19:00:26.146',
    updated_at: '2024-11-08 19:00:26.146',
    permission: 'ADMIN',
    access_token: 'hieuhocit',
    refresh_token: 'refresh_token',
    id: 21,
  },
];
