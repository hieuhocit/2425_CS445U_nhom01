/** styles */
import styles from './PersonalInformation.module.scss';

/** react-redux */
import { useSelector } from 'react-redux';
import { themeMode } from '@/store/theme/themeSelector';
import { userSelector } from '@/store/auth/authSelector';

/** Component */
import Form from '../user-management/form/Form';

/** tostify */
import { toast } from 'react-toastify';

/** API */
import { putApiFormDataWithAuth } from '@/config/fetchApi';
import { useGetUserQuery } from '@/services/authApi';

/** validate */
import { validateUpdateProfile } from '@/utils/validateUser';

/** types */
import { User } from '@/types/definitions';

type ErrorResponse = {
  field: string;
  message: string;
};

type UpdateProfileResponse = {
  statusCode: number;
  message: string;
  errors?: ErrorResponse[];
  data?: User;
};

export default function PersonalInformation() {
  const mode = useSelector(themeMode);
  const isDarkMode = mode === 'dark';

  const user = useSelector(userSelector);

  const { refetch } = useGetUserQuery();

  async function handleUpdateUser(id: number, data: FormData) {
    const errors = validateUpdateProfile({
      email: data.get('email') as string | null,
      firstName: data.get('firstName') as string | null,
      lastName: data.get('lastName') as string | null,
      image: data.get('image') as File | null,
    });

    toast.dismiss();

    if (errors) {
      errors.forEach((err) => {
        toast.error(err.message, { autoClose: 5000 });
      });
      return errors;
    }

    try {
      data.set('id', id + '');
      const res = await putApiFormDataWithAuth('user/profile', data);
      const resData = (await res.json()) as UpdateProfileResponse;

      if (resData.statusCode === 500 || resData.statusCode === 409) {
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
      refetch();
    } catch (error) {
      console.error(error);
      toast.error('Đã xảy ra lỗi, vui lòng thử tải lại trang');
    }
  }

  return (
    <div className={styles.personalInformation}>
      <Form
        user={user}
        behavior='update'
        isNotInModal={true}
        isDark={isDarkMode}
        onCancel={() => {}}
        onSubmit={handleUpdateUser}
      />
    </div>
  );
}
