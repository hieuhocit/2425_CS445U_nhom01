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

const fullLicenses = [
  {
    code: 'A1',
    display: 'Xe môtô 2 bánh có dung tích xi-lanh từ 50cc đến dưới 175cc',
    timer: 900,
    pass: 21,
    randQuestions: [
      { topicCode: 1, num: 11 },
      { topicCode: 2, num: 0 },
      { topicCode: 3, num: 0 },
      { topicCode: 4, num: 2 },
      { topicCode: 5, num: 0 },
      { topicCode: 6, num: 8 },
      { topicCode: 7, num: 4 },
    ],
  },
  {
    code: 'A2',
    display: 'Xe môtô 2 bánh có dung tích xi-lanh từ 175cc trở lên',
    timer: 900,
    pass: 23,
    randQuestions: [
      { topicCode: 1, num: 8 },
      { topicCode: 2, num: 0 },
      { topicCode: 3, num: 1 },
      { topicCode: 4, num: 1 },
      { topicCode: 5, num: 1 },
      { topicCode: 6, num: 10 },
      { topicCode: 7, num: 4 },
    ],
  },
  {
    code: 'A3',
    display: 'Xe môtô 3 bánh',
    timer: 900,
    pass: 23,
    randQuestions: [
      { topicCode: 1, num: 9 },
      { topicCode: 2, num: 0 },
      { topicCode: 3, num: 1 },
      { topicCode: 4, num: 1 },
      { topicCode: 5, num: 0 },
      { topicCode: 6, num: 9 },
      { topicCode: 7, num: 5 },
    ],
  },
  {
    code: 'A4',
    display: 'Xe máy kéo có tải trọng đến 1.000 kg',
    timer: 900,
    pass: 24,
    randQuestions: [
      { topicCode: 1, num: 8 },
      { topicCode: 2, num: 0 },
      { topicCode: 3, num: 1 },
      { topicCode: 4, num: 1 },
      { topicCode: 5, num: 0 },
      { topicCode: 6, num: 9 },
      { topicCode: 7, num: 6 },
    ],
  },

  {
    code: 'B1',
    display:
      'Không hành nghề lái xe, xe đến 9 chỗ ngồi, xe trọng tải dưới 3.500 kg',
    timer: 1020,
    pass: 26,
    randQuestions: [
      { topicCode: 1, num: 9 },
      { topicCode: 2, num: 0 },
      { topicCode: 3, num: 1 },
      { topicCode: 4, num: 3 },
      { topicCode: 5, num: 1 },
      { topicCode: 6, num: 9 },
      { topicCode: 7, num: 7 },
    ],
  },
  {
    code: 'B2',
    display: 'Hành nghề lái xe, xe đến 9 chỗ ngồi, xe trọng tải dưới 3.500 kg',
    timer: 1200,
    pass: 32,
    randQuestions: [
      { topicCode: 1, num: 10 },
      { topicCode: 2, num: 1 },
      { topicCode: 3, num: 1 },
      { topicCode: 4, num: 3 },
      { topicCode: 5, num: 2 },
      { topicCode: 6, num: 10 },
      { topicCode: 7, num: 8 },
    ],
  },

  {
    code: 'C',
    display: 'Xe đến 9 chỗ ngồi, xe trọng tải trên 3.500 kg',
    timer: 1320,
    pass: 37,
    randQuestions: [
      { topicCode: 1, num: 12 },
      { topicCode: 2, num: 2 },
      { topicCode: 3, num: 4 },
      { topicCode: 4, num: 2 },
      { topicCode: 5, num: 3 },
      { topicCode: 6, num: 12 },
      { topicCode: 7, num: 7 },
    ],
  },

  {
    code: 'D',
    display: 'Xe từ 10 đến 30 chỗ ngồi',
    timer: 1500,
    pass: 42,
    randQuestions: [
      { topicCode: 1, num: 12 },
      { topicCode: 2, num: 2 },
      { topicCode: 3, num: 2 },
      { topicCode: 4, num: 4 },
      { topicCode: 5, num: 2 },
      { topicCode: 6, num: 12 },
      { topicCode: 7, num: 7 },
    ],
  },
  {
    code: 'E',
    display: 'Xe trên 30 chỗ ngồi',
    timer: 1500,
    pass: 42,
    randQuestions: [
      { topicCode: 1, num: 12 },
      { topicCode: 2, num: 2 },
      { topicCode: 3, num: 2 },
      { topicCode: 4, num: 4 },
      { topicCode: 5, num: 2 },
      { topicCode: 6, num: 12 },
      { topicCode: 7, num: 7 },
    ],
  },
  {
    code: 'F',
    display:
      'Các loại xe rơ moóc có trọng tải trên 750 kg, sơ mi rơ moóc, ô tô khách nối toa',
    timer: 1500,
    pass: 42,
    randQuestions: [
      { topicCode: 1, num: 12 },
      { topicCode: 2, num: 2 },
      { topicCode: 3, num: 2 },
      { topicCode: 4, num: 4 },
      { topicCode: 5, num: 2 },
      { topicCode: 6, num: 12 },
      { topicCode: 7, num: 7 },
    ],
  },
];

const fullExams = [
  {
    licenseCode: 'A1',
    exam: 1,
    questionNo: 1,
  },
  {
    licenseCode: 'A1',
    exam: 1,
    questionNo: 10,
  },
  {
    licenseCode: 'A1',
    exam: 1,
    questionNo: 23,
  },
  {
    licenseCode: 'A1',
    exam: 1,
    questionNo: 39,
  },
  {
    licenseCode: 'A1',
    exam: 1,
    questionNo: 52,
  },
  {
    licenseCode: 'A1',
    exam: 1,
    questionNo: 74,
  },
  {
    licenseCode: 'A1',
    exam: 1,
    questionNo: 88,
  },
  {
    licenseCode: 'A1',
    exam: 1,
    questionNo: 104,
  },
  {
    licenseCode: 'A1',
    exam: 1,
    questionNo: 117,
  },
  {
    licenseCode: 'A1',
    exam: 1,
    questionNo: 140,
  },
  {
    licenseCode: 'A1',
    exam: 1,
    questionNo: 159,
  },
  {
    licenseCode: 'A1',
    exam: 1,
    questionNo: 214,
  },
  {
    licenseCode: 'A1',
    exam: 1,
    questionNo: 266,
  },
  {
    licenseCode: 'A1',
    exam: 1,
    questionNo: 318,
  },
  {
    licenseCode: 'A1',
    exam: 1,
    questionNo: 330,
  },
  {
    licenseCode: 'A1',
    exam: 1,
    questionNo: 354,
  },
  {
    licenseCode: 'A1',
    exam: 1,
    questionNo: 377,
  },
  {
    licenseCode: 'A1',
    exam: 1,
    questionNo: 391,
  },
  {
    licenseCode: 'A1',
    exam: 1,
    questionNo: 416,
  },
  {
    licenseCode: 'A1',
    exam: 1,
    questionNo: 442,
  },
  {
    licenseCode: 'A1',
    exam: 1,
    questionNo: 479,
  },
  {
    licenseCode: 'A1',
    exam: 1,
    questionNo: 495,
  },
  {
    licenseCode: 'A1',
    exam: 1,
    questionNo: 510,
  },
  {
    licenseCode: 'A1',
    exam: 1,
    questionNo: 539,
  },
  {
    licenseCode: 'A1',
    exam: 1,
    questionNo: 562,
  },
  {
    licenseCode: 'A1',
    exam: 2,
    questionNo: 2,
  },
  {
    licenseCode: 'A1',
    exam: 2,
    questionNo: 11,
  },
  {
    licenseCode: 'A1',
    exam: 2,
    questionNo: 24,
  },
  {
    licenseCode: 'A1',
    exam: 2,
    questionNo: 45,
  },
  {
    licenseCode: 'A1',
    exam: 2,
    questionNo: 59,
  },
  {
    licenseCode: 'A1',
    exam: 2,
    questionNo: 75,
  },
  {
    licenseCode: 'A1',
    exam: 2,
    questionNo: 89,
  },
  {
    licenseCode: 'A1',
    exam: 2,
    questionNo: 109,
  },
  {
    licenseCode: 'A1',
    exam: 2,
    questionNo: 120,
  },
  {
    licenseCode: 'A1',
    exam: 2,
    questionNo: 141,
  },
  {
    licenseCode: 'A1',
    exam: 2,
    questionNo: 165,
  },
  {
    licenseCode: 'A1',
    exam: 2,
    questionNo: 218,
  },
  {
    licenseCode: 'A1',
    exam: 2,
    questionNo: 267,
  },
  {
    licenseCode: 'A1',
    exam: 2,
    questionNo: 319,
  },
  {
    licenseCode: 'A1',
    exam: 2,
    questionNo: 333,
  },
  {
    licenseCode: 'A1',
    exam: 2,
    questionNo: 365,
  },
  {
    licenseCode: 'A1',
    exam: 2,
    questionNo: 378,
  },
  {
    licenseCode: 'A1',
    exam: 2,
    questionNo: 396,
  },
  {
    licenseCode: 'A1',
    exam: 2,
    questionNo: 424,
  },
  {
    licenseCode: 'A1',
    exam: 2,
    questionNo: 443,
  },
  {
    licenseCode: 'A1',
    exam: 2,
    questionNo: 480,
  },
  {
    licenseCode: 'A1',
    exam: 2,
    questionNo: 499,
  },
  {
    licenseCode: 'A1',
    exam: 2,
    questionNo: 517,
  },
  {
    licenseCode: 'A1',
    exam: 2,
    questionNo: 540,
  },
  {
    licenseCode: 'A1',
    exam: 2,
    questionNo: 565,
  },
  {
    licenseCode: 'A1',
    exam: 3,
    questionNo: 4,
  },
  {
    licenseCode: 'A1',
    exam: 3,
    questionNo: 12,
  },
  {
    licenseCode: 'A1',
    exam: 3,
    questionNo: 26,
  },
  {
    licenseCode: 'A1',
    exam: 3,
    questionNo: 46,
  },
  {
    licenseCode: 'A1',
    exam: 3,
    questionNo: 55,
  },
  {
    licenseCode: 'A1',
    exam: 3,
    questionNo: 81,
  },
  {
    licenseCode: 'A1',
    exam: 3,
    questionNo: 92,
  },
  {
    licenseCode: 'A1',
    exam: 3,
    questionNo: 110,
  },
  {
    licenseCode: 'A1',
    exam: 3,
    questionNo: 122,
  },
  {
    licenseCode: 'A1',
    exam: 3,
    questionNo: 144,
  },
  {
    licenseCode: 'A1',
    exam: 3,
    questionNo: 166,
  },
  {
    licenseCode: 'A1',
    exam: 3,
    questionNo: 219,
  },
  {
    licenseCode: 'A1',
    exam: 3,
    questionNo: 268,
  },
  {
    licenseCode: 'A1',
    exam: 3,
    questionNo: 321,
  },
  {
    licenseCode: 'A1',
    exam: 3,
    questionNo: 334,
  },
  {
    licenseCode: 'A1',
    exam: 3,
    questionNo: 371,
  },
  {
    licenseCode: 'A1',
    exam: 3,
    questionNo: 379,
  },
  {
    licenseCode: 'A1',
    exam: 3,
    questionNo: 397,
  },
  {
    licenseCode: 'A1',
    exam: 3,
    questionNo: 436,
  },
  {
    licenseCode: 'A1',
    exam: 3,
    questionNo: 454,
  },
  {
    licenseCode: 'A1',
    exam: 3,
    questionNo: 481,
  },
  {
    licenseCode: 'A1',
    exam: 3,
    questionNo: 503,
  },
  {
    licenseCode: 'A1',
    exam: 3,
    questionNo: 520,
  },
  {
    licenseCode: 'A1',
    exam: 3,
    questionNo: 543,
  },
  {
    licenseCode: 'A1',
    exam: 3,
    questionNo: 567,
  },
  {
    licenseCode: 'A1',
    exam: 4,
    questionNo: 5,
  },
  {
    licenseCode: 'A1',
    exam: 4,
    questionNo: 13,
  },
  {
    licenseCode: 'A1',
    exam: 4,
    questionNo: 31,
  },
  {
    licenseCode: 'A1',
    exam: 4,
    questionNo: 47,
  },
  {
    licenseCode: 'A1',
    exam: 4,
    questionNo: 53,
  },
  {
    licenseCode: 'A1',
    exam: 4,
    questionNo: 82,
  },
  {
    licenseCode: 'A1',
    exam: 4,
    questionNo: 95,
  },
  {
    licenseCode: 'A1',
    exam: 4,
    questionNo: 111,
  },
  {
    licenseCode: 'A1',
    exam: 4,
    questionNo: 123,
  },
  {
    licenseCode: 'A1',
    exam: 4,
    questionNo: 146,
  },
  {
    licenseCode: 'A1',
    exam: 4,
    questionNo: 197,
  },
  {
    licenseCode: 'A1',
    exam: 4,
    questionNo: 223,
  },
  {
    licenseCode: 'A1',
    exam: 4,
    questionNo: 269,
  },
  {
    licenseCode: 'A1',
    exam: 4,
    questionNo: 322,
  },
  {
    licenseCode: 'A1',
    exam: 4,
    questionNo: 336,
  },
  {
    licenseCode: 'A1',
    exam: 4,
    questionNo: 372,
  },
  {
    licenseCode: 'A1',
    exam: 4,
    questionNo: 385,
  },
  {
    licenseCode: 'A1',
    exam: 4,
    questionNo: 399,
  },
  {
    licenseCode: 'A1',
    exam: 4,
    questionNo: 437,
  },
  {
    licenseCode: 'A1',
    exam: 4,
    questionNo: 455,
  },
  {
    licenseCode: 'A1',
    exam: 4,
    questionNo: 483,
  },
  {
    licenseCode: 'A1',
    exam: 4,
    questionNo: 504,
  },
  {
    licenseCode: 'A1',
    exam: 4,
    questionNo: 525,
  },
  {
    licenseCode: 'A1',
    exam: 4,
    questionNo: 548,
  },
  {
    licenseCode: 'A1',
    exam: 4,
    questionNo: 568,
  },
  {
    licenseCode: 'A1',
    exam: 5,
    questionNo: 6,
  },
  {
    licenseCode: 'A1',
    exam: 5,
    questionNo: 14,
  },
  {
    licenseCode: 'A1',
    exam: 5,
    questionNo: 32,
  },
  {
    licenseCode: 'A1',
    exam: 5,
    questionNo: 48,
  },
  {
    licenseCode: 'A1',
    exam: 5,
    questionNo: 60,
  },
  {
    licenseCode: 'A1',
    exam: 5,
    questionNo: 83,
  },
  {
    licenseCode: 'A1',
    exam: 5,
    questionNo: 96,
  },
  {
    licenseCode: 'A1',
    exam: 5,
    questionNo: 112,
  },
  {
    licenseCode: 'A1',
    exam: 5,
    questionNo: 124,
  },
  {
    licenseCode: 'A1',
    exam: 5,
    questionNo: 150,
  },
  {
    licenseCode: 'A1',
    exam: 5,
    questionNo: 203,
  },
  {
    licenseCode: 'A1',
    exam: 5,
    questionNo: 250,
  },
  {
    licenseCode: 'A1',
    exam: 5,
    questionNo: 309,
  },
  {
    licenseCode: 'A1',
    exam: 5,
    questionNo: 326,
  },
  {
    licenseCode: 'A1',
    exam: 5,
    questionNo: 337,
  },
  {
    licenseCode: 'A1',
    exam: 5,
    questionNo: 373,
  },
  {
    licenseCode: 'A1',
    exam: 5,
    questionNo: 386,
  },
  {
    licenseCode: 'A1',
    exam: 5,
    questionNo: 400,
  },
  {
    licenseCode: 'A1',
    exam: 5,
    questionNo: 438,
  },
  {
    licenseCode: 'A1',
    exam: 5,
    questionNo: 456,
  },
  {
    licenseCode: 'A1',
    exam: 5,
    questionNo: 486,
  },
  {
    licenseCode: 'A1',
    exam: 5,
    questionNo: 505,
  },
  {
    licenseCode: 'A1',
    exam: 5,
    questionNo: 527,
  },
  {
    licenseCode: 'A1',
    exam: 5,
    questionNo: 556,
  },
  {
    licenseCode: 'A1',
    exam: 5,
    questionNo: 572,
  },
  {
    licenseCode: 'A1',
    exam: 6,
    questionNo: 7,
  },
  {
    licenseCode: 'A1',
    exam: 6,
    questionNo: 15,
  },
  {
    licenseCode: 'A1',
    exam: 6,
    questionNo: 34,
  },
  {
    licenseCode: 'A1',
    exam: 6,
    questionNo: 49,
  },
  {
    licenseCode: 'A1',
    exam: 6,
    questionNo: 61,
  },
  {
    licenseCode: 'A1',
    exam: 6,
    questionNo: 85,
  },
  {
    licenseCode: 'A1',
    exam: 6,
    questionNo: 97,
  },
  {
    licenseCode: 'A1',
    exam: 6,
    questionNo: 113,
  },
  {
    licenseCode: 'A1',
    exam: 6,
    questionNo: 125,
  },
  {
    licenseCode: 'A1',
    exam: 6,
    questionNo: 152,
  },
  {
    licenseCode: 'A1',
    exam: 6,
    questionNo: 204,
  },
  {
    licenseCode: 'A1',
    exam: 6,
    questionNo: 262,
  },
  {
    licenseCode: 'A1',
    exam: 6,
    questionNo: 310,
  },
  {
    licenseCode: 'A1',
    exam: 6,
    questionNo: 327,
  },
  {
    licenseCode: 'A1',
    exam: 6,
    questionNo: 339,
  },
  {
    licenseCode: 'A1',
    exam: 6,
    questionNo: 374,
  },
  {
    licenseCode: 'A1',
    exam: 6,
    questionNo: 387,
  },
  {
    licenseCode: 'A1',
    exam: 6,
    questionNo: 401,
  },
  {
    licenseCode: 'A1',
    exam: 6,
    questionNo: 439,
  },
  {
    licenseCode: 'A1',
    exam: 6,
    questionNo: 458,
  },
  {
    licenseCode: 'A1',
    exam: 6,
    questionNo: 487,
  },
  {
    licenseCode: 'A1',
    exam: 6,
    questionNo: 507,
  },
  {
    licenseCode: 'A1',
    exam: 6,
    questionNo: 528,
  },
  {
    licenseCode: 'A1',
    exam: 6,
    questionNo: 559,
  },
  {
    licenseCode: 'A1',
    exam: 6,
    questionNo: 592,
  },
  {
    licenseCode: 'A1',
    exam: 7,
    questionNo: 8,
  },
  {
    licenseCode: 'A1',
    exam: 7,
    questionNo: 19,
  },
  {
    licenseCode: 'A1',
    exam: 7,
    questionNo: 37,
  },
  {
    licenseCode: 'A1',
    exam: 7,
    questionNo: 50,
  },
  {
    licenseCode: 'A1',
    exam: 7,
    questionNo: 72,
  },
  {
    licenseCode: 'A1',
    exam: 7,
    questionNo: 86,
  },
  {
    licenseCode: 'A1',
    exam: 7,
    questionNo: 98,
  },
  {
    licenseCode: 'A1',
    exam: 7,
    questionNo: 115,
  },
  {
    licenseCode: 'A1',
    exam: 7,
    questionNo: 126,
  },
  {
    licenseCode: 'A1',
    exam: 7,
    questionNo: 157,
  },
  {
    licenseCode: 'A1',
    exam: 7,
    questionNo: 207,
  },
  {
    licenseCode: 'A1',
    exam: 7,
    questionNo: 263,
  },
  {
    licenseCode: 'A1',
    exam: 7,
    questionNo: 311,
  },
  {
    licenseCode: 'A1',
    exam: 7,
    questionNo: 328,
  },
  {
    licenseCode: 'A1',
    exam: 7,
    questionNo: 352,
  },
  {
    licenseCode: 'A1',
    exam: 7,
    questionNo: 375,
  },
  {
    licenseCode: 'A1',
    exam: 7,
    questionNo: 388,
  },
  {
    licenseCode: 'A1',
    exam: 7,
    questionNo: 402,
  },
  {
    licenseCode: 'A1',
    exam: 7,
    questionNo: 440,
  },
  {
    licenseCode: 'A1',
    exam: 7,
    questionNo: 462,
  },
  {
    licenseCode: 'A1',
    exam: 7,
    questionNo: 490,
  },
  {
    licenseCode: 'A1',
    exam: 7,
    questionNo: 508,
  },
  {
    licenseCode: 'A1',
    exam: 7,
    questionNo: 529,
  },
  {
    licenseCode: 'A1',
    exam: 7,
    questionNo: 560,
  },
  {
    licenseCode: 'A1',
    exam: 7,
    questionNo: 596,
  },
  {
    licenseCode: 'A1',
    exam: 8,
    questionNo: 9,
  },
  {
    licenseCode: 'A1',
    exam: 8,
    questionNo: 20,
  },
  {
    licenseCode: 'A1',
    exam: 8,
    questionNo: 38,
  },
  {
    licenseCode: 'A1',
    exam: 8,
    questionNo: 51,
  },
  {
    licenseCode: 'A1',
    exam: 8,
    questionNo: 73,
  },
  {
    licenseCode: 'A1',
    exam: 8,
    questionNo: 87,
  },
  {
    licenseCode: 'A1',
    exam: 8,
    questionNo: 100,
  },
  {
    licenseCode: 'A1',
    exam: 8,
    questionNo: 116,
  },
  {
    licenseCode: 'A1',
    exam: 8,
    questionNo: 127,
  },
  {
    licenseCode: 'A1',
    exam: 8,
    questionNo: 158,
  },
  {
    licenseCode: 'A1',
    exam: 8,
    questionNo: 213,
  },
  {
    licenseCode: 'A1',
    exam: 8,
    questionNo: 265,
  },
  {
    licenseCode: 'A1',
    exam: 8,
    questionNo: 317,
  },
  {
    licenseCode: 'A1',
    exam: 8,
    questionNo: 329,
  },
  {
    licenseCode: 'A1',
    exam: 8,
    questionNo: 353,
  },
  {
    licenseCode: 'A1',
    exam: 8,
    questionNo: 376,
  },
  {
    licenseCode: 'A1',
    exam: 8,
    questionNo: 389,
  },
  {
    licenseCode: 'A1',
    exam: 8,
    questionNo: 415,
  },
  {
    licenseCode: 'A1',
    exam: 8,
    questionNo: 441,
  },
  {
    licenseCode: 'A1',
    exam: 8,
    questionNo: 478,
  },
  {
    licenseCode: 'A1',
    exam: 8,
    questionNo: 492,
  },
  {
    licenseCode: 'A1',
    exam: 8,
    questionNo: 509,
  },
  {
    licenseCode: 'A1',
    exam: 8,
    questionNo: 538,
  },
];
