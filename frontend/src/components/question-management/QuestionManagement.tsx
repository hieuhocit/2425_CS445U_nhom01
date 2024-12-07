/** styles */
import styles from './QuestionManagement.module.scss';

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
import { IQuestion } from '@/types/definitions';

/** DUMMY DATA */
import { questions } from '@/data/data';

export default function QuestionManagement() {
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState<IQuestion | null>(
    null
  );
  const [behavior, setBehavior] = useState<'view' | 'add' | 'update'>('view');

  const mode = useSelector(themeMode);
  const isDarkMode = mode === 'dark';

  // Gọi API paginate ở đây
  // Hiện tại đang giả sử đã có sẵn data
  const ROWS = 4;
  const currentQuestions = questions.slice(
    (currentPage - 1) * ROWS,
    (currentPage - 1) * ROWS + ROWS
  );
  const totalPages = Math.ceil(questions.length / ROWS);

  // Operation
  function handleDeleteQuestion(id: number) {
    // Call API
    const deletedUser = questions.find((q) => q.id === id);
    if (!deletedUser) return;

    // Message
    toast.success('Xoá câu hỏi thành công');
  }

  function handleAddQuestion(questionData: IQuestion) {
    // Validate data
    console.log(questionData);

    toast.success('Thêm câu hỏi thành công');
    // handleCloseModal();
    // Call API
  }

  function handleUpdateQuestion(id: number, questionData: IQuestion) {
    // Validate data
    console.log(id, questionData);

    // Call API;
    toast.success('Cập nhật câu hỏi thành công');
    // handleCloseModal();
  }

  // Modal
  function handleCloseModal() {
    setShowModal(false);
    setSelectedQuestion(null);
  }

  function handleOpenModalAdd() {
    setShowModal(true);
    setBehavior('add');
  }

  function handleOpenModalView(id: number) {
    const question = questions.find((q) => q.id === id);

    if (!question) return;
    setSelectedQuestion(question);
    setShowModal(true);
    setBehavior('view');
  }

  function handleOpenModalUpdate(id: number) {
    const question = questions.find((q) => q.id === id);

    if (!question) return;
    setSelectedQuestion(question);
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
          <h2>Câu hỏi</h2>
          <button onClick={handleOpenModalAdd}>Thêm mới</button>
        </div>

        <div className={styles.body}>
          <Table
            isDark={isDarkMode}
            questions={currentQuestions}
            rows={ROWS}
            onOpenView={handleOpenModalView}
            onOpenUpdate={handleOpenModalUpdate}
            onDelete={handleDeleteQuestion}
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
            question={behavior === 'add' ? null : selectedQuestion}
            onSubmit={
              behavior === 'view'
                ? null
                : behavior === 'add'
                ? handleAddQuestion
                : handleUpdateQuestion
            }
          />
        )}
      </Modal>
    </>
  );
}
