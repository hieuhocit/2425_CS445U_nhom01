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
import { IExam, IQuestion } from '@/types/definitions';

/** react -router */
import {
  LoaderFunctionArgs,
  useLoaderData,
  useRevalidator,
  useSearchParams,
} from 'react-router-dom';

/** API */
import {
  deleteApiWithAuth,
  getApiWithAuth,
  postApiFormDataWithAuth,
  putApiFormDataWithAuth,
} from '@/config/fetchApi';
import { validateAddNewQuestion } from '@/utils/validateQuestion';

type QuestionResponse = {
  statusCode: number;
  message: string;
  data?: IQuestion;
  errors?: {
    field: string;
    message: string;
  }[];
};

export async function loader({ request }: LoaderFunctionArgs) {
  const searchParams = new URL(request.url).searchParams;
  const page = searchParams.get('page');
  const limit = searchParams.get('limit');

  const resQuestions = await getApiWithAuth(
    `admin/questions?${page ? `page=${page}&` : ''}${
      limit ? `limit=${limit}` : ''
    }`
  );
  const resExams = await getApiWithAuth(`admin/exams`);

  const resQuestionsData = await resQuestions.json();
  const resExamsData = await resExams.json();

  return {
    exams: resExamsData.data.exams,
    data: resQuestionsData.data,
  };
}

export default function QuestionManagement() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [showModal, setShowModal] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState<IQuestion | null>(
    null
  );
  const [behavior, setBehavior] = useState<'view' | 'add' | 'update'>('view');

  const mode = useSelector(themeMode);
  const isDarkMode = mode === 'dark';

  const { data, exams } = useLoaderData() as {
    data: {
      questions: IQuestion[];
      totalPages: number;
      totalQuestions: number;
    };
    exams: IExam[];
  };

  const revalidator = useRevalidator();

  const currentPage = Number(searchParams.get('page')) || 1;
  const limit = Number(searchParams.get('limit')) || 4;

  // Operation
  async function handleDeleteQuestion(id: number) {
    if (!Number(id)) return;
    toast.dismiss();
    try {
      const res = await deleteApiWithAuth(`admin/questions/${id}`);

      const resData = (await res.json()) as QuestionResponse;

      if (
        resData.statusCode === 500 ||
        resData.statusCode === 409 ||
        resData.statusCode === 400 ||
        resData.statusCode === 401
      ) {
        toast.error(resData.message);
        return null;
      }

      toast.success(resData.message);
      revalidator.revalidate();
    } catch (error) {
      console.error(error);
      toast.error('Đã xảy ra lỗi, vui lòng thử tải lại trang');
    }
  }

  async function handleAddQuestion(questionData: IQuestion) {
    // Validate data
    const errors = validateAddNewQuestion({
      text: questionData.text,
      topic_id: questionData.topic_id,
      answers: questionData.answers,
      exam_ids: questionData.exam_ids,
      license_ids: questionData.license_ids,
      image: questionData.image as File | null,
    });

    toast.dismiss();

    if (errors) {
      errors.forEach((err) => {
        toast.error(err.message, { autoClose: 5000 });
      });
      return errors;
    }

    try {
      const formData = new FormData();
      formData.set('image', questionData.image);
      formData.set('text', questionData.text);
      formData.set('tip', questionData.tip);
      formData.set('required', questionData.required + '');
      formData.set('topic_id', questionData.topic_id + '');
      formData.set('answers', JSON.stringify(questionData.answers));
      formData.set('exam_ids', JSON.stringify(questionData.exam_ids));
      formData.set('license_ids', JSON.stringify(questionData.license_ids));

      const res = await postApiFormDataWithAuth('admin/questions', formData);
      const resData = (await res.json()) as QuestionResponse;
      console.log(resData);
      if (
        resData.statusCode === 500 ||
        resData.statusCode === 409 ||
        resData.statusCode === 401
      ) {
        toast.error(resData.message);
        return null;
      }

      if (resData.statusCode === 422 && resData.errors) {
        resData.errors.forEach((err) => {
          toast.error(err.message, { autoClose: 5000 });
        });
        return null;
      }

      toast.success(resData.message);
      revalidator.revalidate();
      handleCloseModal();
    } catch (error) {
      console.error(error);
      toast.error('Đã xảy ra lỗi, vui lòng thử tải lại trang');
    }
  }

  async function handleUpdateQuestion(id: number, questionData: IQuestion) {
    // Validate data
    const errors = validateAddNewQuestion({
      text: questionData.text,
      topic_id: questionData.topic_id,
      answers: questionData.answers,
      exam_ids: questionData.exam_ids,
      license_ids: questionData.license_ids,
      image: questionData.image as File | null,
    });

    toast.dismiss();

    if (errors) {
      errors.forEach((err) => {
        toast.error(err.message, { autoClose: 5000 });
      });
      return errors;
    }

    try {
      const formData = new FormData();
      formData.set('image', questionData.image);
      formData.set('text', questionData.text);
      formData.set('tip', questionData.tip);
      formData.set('required', questionData.required + '');
      formData.set('topic_id', questionData.topic_id + '');
      formData.set('answers', JSON.stringify(questionData.answers));
      formData.set('exam_ids', JSON.stringify(questionData.exam_ids));
      formData.set('license_ids', JSON.stringify(questionData.license_ids));

      const res = await putApiFormDataWithAuth(
        `admin/questions/${id}`,
        formData
      );
      const resData = (await res.json()) as QuestionResponse;
      console.log(resData);
      if (
        resData.statusCode === 500 ||
        resData.statusCode === 409 ||
        resData.statusCode === 401
      ) {
        toast.error(resData.message);
        return null;
      }

      if (resData.statusCode === 422 && resData.errors) {
        resData.errors.forEach((err) => {
          toast.error(err.message, { autoClose: 5000 });
        });
        return null;
      }

      toast.success(resData.message);
      revalidator.revalidate();
      handleCloseModal();
    } catch (error) {
      console.error(error);
      toast.error('Đã xảy ra lỗi, vui lòng thử tải lại trang');
    }
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
    const question = data.questions.find((q) => q.id === id);

    if (!question) return;
    setSelectedQuestion(question);
    setShowModal(true);
    setBehavior('view');
  }

  function handleOpenModalUpdate(id: number) {
    const question = data.questions.find((q) => q.id === id);

    if (!question) return;
    setSelectedQuestion(question);
    setShowModal(true);
    setBehavior('update');
  }

  // Pagination
  function handleOnClickPrev() {
    if (+currentPage === 1) return;
    const newParams = new URLSearchParams(searchParams);
    newParams.set('page', currentPage - 1 + '');
    setSearchParams(newParams);
  }

  function handleOnClickNext() {
    if (+currentPage === data.totalPages) return;
    const newParams = new URLSearchParams(searchParams);
    newParams.set('page', currentPage + 1 + '');
    setSearchParams(newParams);
  }

  function handleOnClickGoTo(page: number) {
    if (+currentPage < 1 || +currentPage > data.totalPages) return;
    const newParams = new URLSearchParams(searchParams);
    newParams.set('page', page + '');
    setSearchParams(newParams);
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
            questions={data.questions}
            rows={limit}
            onOpenView={handleOpenModalView}
            onOpenUpdate={handleOpenModalUpdate}
            onDelete={handleDeleteQuestion}
          />
          <Pagination
            isDark={isDarkMode}
            currentPage={currentPage}
            totalPages={data.totalPages}
            onNext={handleOnClickNext}
            onPrev={handleOnClickPrev}
            onGoTo={handleOnClickGoTo}
          />
        </div>
      </div>
      <Modal onClose={handleCloseModal} isOpen={showModal} isDark={isDarkMode}>
        {showModal && (
          <Form
            exams={exams}
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
