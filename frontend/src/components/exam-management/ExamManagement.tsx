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

/** react-router*/
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
  postApiWithAuth,
  putApiWithAuth,
} from '@/config/fetchApi';

type LoaderResponse = {
  statusCode: number;
  message: string;
  data: {
    exams: IExam[];
    totalPages: number;
    totalExams: number;
  };
};

type ExamResponse = {
  statusCode: number;
  message: string;
  data?: IExam;
  errors?: {
    field: string;
    message: string;
  }[];
};

export async function loader({ request }: LoaderFunctionArgs) {
  const searchParams = new URL(request.url).searchParams;
  const page = searchParams.get('page');
  const limit = searchParams.get('limit');

  const res = await getApiWithAuth(
    `admin/exams?${page ? `page=${page}&` : ''}${limit ? `limit=${limit}` : ''}`
  );

  const resData = await res.json();

  return resData;
}

export default function ExamManagement() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [showModal, setShowModal] = useState(false);

  const [selectedExam, setSelectedExam] = useState<IExam | null>(null);
  const [behavior, setBehavior] = useState<'view' | 'add' | 'update'>('view');

  const mode = useSelector(themeMode);
  const isDarkMode = mode === 'dark';

  const { data } = useLoaderData() as LoaderResponse;

  const revalidator = useRevalidator();

  const currentPage = Number(searchParams.get('page')) || 1;
  const limit = Number(searchParams.get('limit')) || 4;

  // Operation
  async function handleDeleteExam(id: number) {
    if (!Number(id)) return;
    toast.dismiss();
    try {
      const res = await deleteApiWithAuth(`admin/exams/${id}`);

      const resData = (await res.json()) as ExamResponse;

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

  async function handleAddExam(formData: FormData) {
    // Validate data
    const title = formData.get('title') as string | null;
    const licenses = formData.getAll('licenses') as string[];

    toast.dismiss();

    if (title?.trim() === '') {
      toast.error('Vui lòng điền tiêu đề');
      return null;
    }

    if (licenses.length === 0) {
      toast.error('Vui lòng chọn ít nhất một giấy phép');
      return null;
    }

    try {
      const res = await postApiWithAuth('admin/exams', {
        title: title?.trim(),
        licenses: licenses.map((l) => Number(l)),
      });
      const resData = (await res.json()) as ExamResponse;
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

  async function handleUpdateExam(id: number, formData: FormData) {
    if (!Number(id)) return;
    // Validate data
    const title = formData.get('title') as string | null;
    const licenses = formData.getAll('licenses') as string[];

    toast.dismiss();

    if (title?.trim() === '') {
      toast.error('Vui lòng điền tiêu đề');
      return null;
    }

    if (licenses.length === 0) {
      toast.error('Vui lòng chọn ít nhất một giấy phép');
      return null;
    }

    try {
      const res = await putApiWithAuth(`admin/exams/${id}`, {
        title,
        licenses: licenses.map((l) => Number(l)),
      });

      const resData = (await res.json()) as ExamResponse;

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
      handleCloseModal();
    } catch (error) {
      console.error(error);
      toast.error('Đã xảy ra lỗi, vui lòng thử tải lại trang');
    }
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
    const exam = data.exams.find((e) => e.id === id);

    if (!exam) return;
    setSelectedExam(exam);
    setShowModal(true);
    setBehavior('view');
  }

  function handleOpenModalUpdate(id: number) {
    const exam = data.exams.find((e) => e.id === id);

    if (!exam) return;
    setSelectedExam(exam);
    setShowModal(true);
    setBehavior('update');
  }

  // Pagination
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
          <h2>Đề thi</h2>
          <button onClick={handleOpenModalAdd}>Thêm mới</button>
        </div>

        <div className={styles.body}>
          <Table
            isDark={isDarkMode}
            exams={data.exams}
            rows={limit}
            onOpenView={handleOpenModalView}
            onOpenUpdate={handleOpenModalUpdate}
            onDelete={handleDeleteExam}
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
