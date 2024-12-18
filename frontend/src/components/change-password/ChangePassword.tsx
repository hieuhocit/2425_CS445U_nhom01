/** styles */
import styles from './ChangePassword.module.scss';

/** react-redux */
import { useSelector } from 'react-redux';
import { themeMode } from '@/store/theme/themeSelector';

/** tostify */
import { toast } from 'react-toastify';

/** react */
import { useState } from 'react';

/** icons */
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';

/** react-router */
import { Link } from 'react-router-dom';

/** validate */
import { validateChangePassword } from '@/utils/validateChangePassword';

/** API */
import { postApiWithAuth } from '@/config/fetchApi';

/** Types */
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

export default function ChangePassword() {
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const mode = useSelector(themeMode);
  const isDarkMode = mode === 'dark';

  async function handleChangePassword(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);

    const old_password = formData.get('old_password') as string | null;
    const new_password = formData.get('new_password') as string | null;
    const confirm_new_password = formData.get('confirm_new_password') as
      | string
      | null;

    const errors = validateChangePassword({
      old_password,
      new_password,
      confirm_new_password,
    });

    toast.dismiss();

    if (errors) {
      errors.forEach((err) => {
        toast.error(err.message, { autoClose: 5000 });
      });
      return errors;
    }

    try {
      const res = await postApiWithAuth('user/password', {
        old_password,
        new_password,
        confirm_new_password,
      });
      const resData = (await res.json()) as UpdateProfileResponse;

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
      (e.target as HTMLFormElement).reset();
    } catch (error) {
      console.error(error);
      toast.error('Đã xảy ra lỗi, vui lòng thử tải lại trang');
    }
  }

  return (
    <div
      className={`${styles.changePassword} ${
        isDarkMode ? styles.darkMode : ''
      }`}
    >
      <form
        onSubmit={handleChangePassword}
        className={styles.form}
        method='POST'
      >
        <div className={styles.inputContainer}>
          <label htmlFor='old_password'>Mật khẩu cũ</label>
          <div>
            <input
              id='old_password'
              name='old_password'
              type={showOldPassword ? 'text' : 'password'}
              placeholder='Mật khẩu'
            />
            {showOldPassword ? (
              <FaRegEye
                onClick={() => setShowOldPassword(false)}
                className={styles.icon}
              />
            ) : (
              <FaRegEyeSlash
                onClick={() => setShowOldPassword(true)}
                className={styles.icon}
              />
            )}
          </div>
        </div>
        <div className={styles.inputContainer}>
          <label htmlFor='new_password'>Mật khẩu mới</label>
          <div>
            <input
              id='new_password'
              name='new_password'
              type={showNewPassword ? 'text' : 'password'}
              placeholder='Mật khẩu'
            />
            {showNewPassword ? (
              <FaRegEye
                onClick={() => setShowNewPassword(false)}
                className={styles.icon}
              />
            ) : (
              <FaRegEyeSlash
                onClick={() => setShowNewPassword(true)}
                className={styles.icon}
              />
            )}
          </div>
        </div>
        <div className={styles.inputContainer}>
          <label htmlFor='confirm_new_password'>Nhập lại mật khẩu mới</label>
          <div>
            <input
              id='confirm_new_password'
              name='confirm_new_password'
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder='Nhập lại mật khẩu'
            />
            {showConfirmPassword ? (
              <FaRegEye
                onClick={() => setShowConfirmPassword(false)}
                className={styles.icon}
              />
            ) : (
              <FaRegEyeSlash
                onClick={() => setShowConfirmPassword(true)}
                className={styles.icon}
              />
            )}
          </div>
        </div>
        <div className={styles.forgotPassword}>
          <Link to='/forgot-password' state={{ prevPath: '/profile/password' }}>
            Quên mật khẩu?
          </Link>
        </div>
        <div className={styles.actions}>
          <button type='submit'>Đổi mật khẩu</button>
        </div>
      </form>
    </div>
  );
}
