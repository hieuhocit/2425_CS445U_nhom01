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

/** API */
import {
  deleteApiWithAuth,
  getApiWithAuth,
  postApiFormDataWithAuth,
  putApiWithAuth,
} from '@/config/fetchApi';

/** react-router */
import {
  LoaderFunctionArgs,
  useLoaderData,
  useRevalidator,
  useSearchParams,
} from 'react-router-dom';

/** Validate */
import { validateAddNewUser, validateUpdateUser } from '@/utils/validateUser';

type LoaderResponse = {
  statusCode: number;
  message: string;
  data: {
    users: User[];
    totalPages: number;
    totalUsers: number;
  };
};

type UserResponse = {
  statusCode: number;
  message: string;
  data?: User;
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
    `admin/users?${page ? `page=${page}&` : ''}${limit ? `limit=${limit}` : ''}`
  );

  const resData = await res.json();

  return resData;
}

export default function UserManagement() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [behavior, setBehavior] = useState<'view' | 'add' | 'update'>('view');

  const mode = useSelector(themeMode);
  const isDarkMode = mode === 'dark';

  const { data } = useLoaderData() as LoaderResponse;

  const revalidator = useRevalidator();

  const currentPage = Number(searchParams.get('page')) || 1;
  const limit = Number(searchParams.get('limit')) || 4;

  // Operation
  async function handleDeleteUser(id: number) {
    if (!Number(id)) return;
    try {
      const res = await deleteApiWithAuth(`admin/users/${id}`);

      const resData = (await res.json()) as UserResponse;

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

  async function handleAddUser(formData: FormData) {
    // Validate data
    const first_name = formData.get('first_name') as string | null;
    const last_name = formData.get('last_name') as string | null;
    const username = formData.get('username') as string | null;
    const email = formData.get('email') as string | null;
    const image = formData.get('image') as File | null;
    const password = formData.get('password') as string | null;
    const permission = formData.get('permission') as string | null;

    const errors = validateAddNewUser({
      first_name,
      last_name,
      email,
      username,
      password,
      image,
      permission,
    });

    toast.dismiss();

    if (errors) {
      errors.forEach((err) => {
        toast.error(err.message, { autoClose: 5000 });
      });
      return errors;
    }

    try {
      const res = await postApiFormDataWithAuth('admin/users', formData);
      const resData = (await res.json()) as UserResponse;
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

  async function handleUpdateUser(id: number, formData: FormData) {
    if (!id) return;
    // Validate data
    const first_name = formData.get('first_name') as string | null;
    const last_name = formData.get('last_name') as string | null;
    const email = formData.get('email') as string | null;
    const image = formData.get('image') as File | null;
    const permission = formData.get('permission') as string | null;

    const errors = validateUpdateUser({
      first_name,
      last_name,
      email,
      image,
      permission,
    });

    toast.dismiss();

    if (errors) {
      errors.forEach((err) => {
        toast.error(err.message, { autoClose: 5000 });
      });
      return errors;
    }

    try {
      const res = await putApiWithAuth(`admin/users/${id}`, formData);
      const resData = (await res.json()) as UserResponse;
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
    setSelectedUser(null);
  }

  function handleOpenModalAdd() {
    setShowModal(true);
    setBehavior('add');
  }

  function handleOpenModalView(id: number) {
    const user = data.users.find((u) => u.id === id);

    if (!user) return;
    setSelectedUser(user);
    setShowModal(true);
    setBehavior('view');
  }

  function handleOpenModalUpdate(id: number) {
    const user = data.users.find((u) => u.id === id);

    if (!user) return;
    setSelectedUser(user);
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
          <h2>Người dùng</h2>
          <button onClick={handleOpenModalAdd}>Thêm mới</button>
        </div>

        <div className={styles.body}>
          <Table
            isDark={isDarkMode}
            users={data.users}
            rows={limit}
            onOpenView={handleOpenModalView}
            onOpenUpdate={handleOpenModalUpdate}
            onDelete={handleDeleteUser}
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
