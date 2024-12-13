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

/** types */
import { IExam } from '@/types/definitions';

/** DUMMY DATA */
import { exams } from '@/data/data';

export default function ExamManagement() {
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);

  const [selectedExam, setSelectedExam] = useState<IExam | null>(null);
  const [behavior, setBehavior] = useState<'view' | 'add' | 'update'>('view');

  const mode = useSelector(themeMode);
  const isDarkMode = mode === 'dark';

  // Gọi API paginate ở đây
  // Hiện tại đang giả sử đã có sẵn data
  const ROWS = 4;
  const currentExams = exams.slice(
    (currentPage - 1) * ROWS,
    (currentPage - 1) * ROWS + ROWS
  );
  const totalPages = Math.ceil(exams.length / ROWS);

  // Operation
  function handleDeleteExam(id: number) {
    // Call API
    const deletedUser = exams.find((u) => u.id === id);
    if (!deletedUser) return;

    // Message
    toast.success('Xoá đề thi thành công');
  }

  function handleAddExam(formData: FormData) {
    // Validate data
    const title = formData.get('title');
    const licenses = formData.getAll('licenses');

    console.log(title, licenses);

    if (title === '' || licenses.length === 0) {
      toast.error('Vui lòng nhập đầy đủ thông tin!');
      return null;
    }

    toast.success('Thêm đề thi thành công');
    handleCloseModal();
    // Call API
  }

  function handleUpdateExam(id: number, formData: FormData) {
    // Validate data
    const firstName = formData.get('firstName');
    const lastName = formData.get('lastName');
    const username = formData.get('username');
    const email = formData.get('email');
    const password = formData.get('password');

    console.log(id, Object.fromEntries(formData));

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
    toast.success('Cập nhật đề thi thành công');
    handleCloseModal();
  }

  // Modal
  function handleCloseModal() {
    setShowModal(false);
    setSelectedExam(null);
  }

  function handleOpenModalAdd() {
    setShowModal(true);
    setBehavior('add');
  }

  function handleOpenModalView(id: number) {
    const exam = exams.find((e) => e.id === id);

    if (!exam) return;
    setSelectedExam(exam);
    setShowModal(true);
    setBehavior('view');
  }

  function handleOpenModalUpdate(id: number) {
    const exam = exams.find((e) => e.id === id);

    if (!exam) return;
    setSelectedExam(exam);
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
            exams={currentExams}
            rows={ROWS}
            onOpenView={handleOpenModalView}
            onOpenUpdate={handleOpenModalUpdate}
            onDelete={handleDeleteExam}
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
      <Modal
        css={{ minHeight: 'auto', height: '400px' }}
        onClose={handleCloseModal}
        isOpen={showModal}
        isDark={isDarkMode}
      >
        {showModal && (
          <Form
            onCancel={handleCloseModal}
            isDark={isDarkMode}
            behavior={behavior}
            exam={behavior === 'add' ? null : selectedExam}
            onSubmit={
              behavior === 'view'
                ? null
                : behavior === 'add'
                ? handleAddExam
                : handleUpdateExam
            }
          />
        )}
      </Modal>
    </>
  );
}
