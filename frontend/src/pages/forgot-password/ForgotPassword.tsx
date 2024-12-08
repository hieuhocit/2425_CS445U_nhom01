/** styles */
import styles from './ForgotPassword.module.scss';

/** react-redux */
import { useSelector } from 'react-redux';
import { themeMode } from '@/store/theme/themeSelector';

/** components */
import Header from '@/components/header/Header';

/** react-router */
import { Link, useLocation } from 'react-router-dom';

/** react */
import { useState } from 'react';

/** toastify */
import { toast } from 'react-toastify';

export default function ForgotPasswordPage() {
  const [isConfirmCode, setIsConfirmCode] = useState(false);
  const mode = useSelector(themeMode);

  const isDarkMode = mode === 'dark';

  const location = useLocation();
  const prevPath = location.state?.prevPath;

  async function handleSendEmail(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    const email = formData.get('email') as string;

    if (email.trim() === '') {
      toast.error('Vui lòng nhập email');
      return;
    }
    if (!email.trim().includes('@')) {
      toast.error('Vui lòng nhập đúng định dạng email');
      return;
    }
    await new Promise((resolve) => setTimeout(resolve, 500));
    toast.success('Đã gửi mã xác nhận, vui lòng kiểm tra email');
    setIsConfirmCode(true);
  }

  async function handleConfirmCode(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    const code = formData.get('code') as string;

    if ((code as string).trim() === '') {
      toast.error('Vui lòng nhập code');
      return;
    }

    await new Promise((resolve) => setTimeout(resolve, 500));
    if ((code as string).trim() !== '230903') {
      toast.error('Mã xác nhận không chính xác');
      return;
    }
    await new Promise((resolve) => setTimeout(resolve, 500));
    toast.success('Đã gửi mật khẩu mới vào email, vui lòng kiểm tra email');
    setIsConfirmCode(false);
  }

  return (
    <div
      className={`${styles.forgotPassword} ${
        isDarkMode ? styles.darkMode : ''
      }`}
    >
      <Header title='Quên mật khẩu' isDark={isDarkMode} path={prevPath} />

      <main className={styles.main}>
        <form
          onSubmit={!isConfirmCode ? handleSendEmail : handleConfirmCode}
          className={styles.form}
          method='POST'
        >
          {!isConfirmCode && (
            <div className={styles.inputContainer}>
              <label htmlFor='email'>Email</label>
              <input
                id='email'
                name='email'
                type='email'
                placeholder='Nhập email'
                required
              />
            </div>
          )}
          {isConfirmCode && (
            <div className={styles.inputContainer}>
              <label htmlFor='code'>Mã xác nhận</label>
              <input
                id='code'
                name='code'
                type='text'
                placeholder='Nhập mã xác nhận'
                autoComplete='off'
                required
              />
            </div>
          )}
          <div className={styles.actions}>
            <button type='submit'>
              {!isConfirmCode ? 'Gửi mã' : 'Xác nhận'}
            </button>
          </div>
          <div className={styles.login}>
            <span>Quay lại trang - </span> <Link to='/login'>Đăng nhập</Link>
          </div>
        </form>
      </main>
    </div>
  );
}
