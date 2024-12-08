/** styles */
import styles from './ChangePassword.module.scss';

/** react-redux */
import { useSelector } from 'react-redux';
import { themeMode } from '@/store/theme/themeSelector';
import { userSelector } from '@/store/auth/authSelector';

/** tostify */
import { toast } from 'react-toastify';

/** react */
import { useState } from 'react';

/** icons */
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';

/** react-router */
import { Link } from 'react-router-dom';

export default function ChangePassword() {
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const mode = useSelector(themeMode);
  const isDarkMode = mode === 'dark';

  const user = useSelector(userSelector);

  function handleChangePassword(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);

    const old_password = formData.get('old_password');
    const new_password = formData.get('new_password');
    const confirm_new_password = formData.get('confirm_new_password');

    if (
      (old_password as string).trim() === '' ||
      (new_password as string).trim() === '' ||
      (confirm_new_password as string).trim() === ''
    ) {
      toast.error('Vui lòng nhập đầy đủ thông tin');
      return;
    }

    if (
      (new_password as string).trim() !==
      (confirm_new_password as string).trim()
    ) {
      toast.error('Mật khẩu xác nhận không chính xác');
      return;
    }

    console.log(user?.id, Object.fromEntries(formData));
    toast.success('Đổi mật khẩu thành công');
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
          <Link to='/forgot-password'>Quên mật khẩu?</Link>
        </div>
        <div className={styles.actions}>
          <button type='submit'>Đổi mật khẩu</button>
        </div>
      </form>
    </div>
  );
}
