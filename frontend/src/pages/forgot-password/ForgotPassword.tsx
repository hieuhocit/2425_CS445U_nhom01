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

/** API */
import { postApi } from '@/config/fetchApi';

type ErrorResponse = {
  field: string;
  message: string;
};

type TResponse = {
  statusCode: number;
  message: string;
  errors?: ErrorResponse[];
  data?: null;
};

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [isConfirmCode, setIsConfirmCode] = useState(false);
  const mode = useSelector(themeMode);

  const isDarkMode = mode === 'dark';

  const location = useLocation();
  const prevPath = location.state?.prevPath;

  async function handleSendEmail(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    toast.dismiss();

    if (email.trim() === '') {
      toast.error('Vui lòng nhập email');
      return;
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailRegex.test(email)) {
      toast.error('Vui lòng nhập đúng định dạng email');
      return;
    }

    try {
      const res = await postApi('user/send-code', { email });

      const resData = (await res.json()) as TResponse;

      if (resData.statusCode === 500 || resData.statusCode === 404) {
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
      setCode('');
      setIsConfirmCode(true);
    } catch (error) {
      console.error(error);
      toast.error('Đã xảy ra lỗi, vui lòng thử tải lại trang');
    }
  }

  async function handleConfirmCode(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    toast.dismiss();

    if (code.trim() === '') {
      toast.error('Vui lòng nhập mã xác nhận');
      return;
    }

    if (code.trim().length < 6 || code.trim().length > 6) {
      toast.error('Mã xác nhận bao gồm 6 chữ số');
      return;
    }

    try {
      const res = await postApi('user/verify-code', { email, code });

      const resData = (await res.json()) as TResponse;

      if (
        resData.statusCode === 500 ||
        resData.statusCode === 404 ||
        resData.statusCode === 400
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
      setEmail('');
      setCode('');
      setIsConfirmCode(false);
    } catch (error) {
      console.error(error);
      toast.error('Đã xảy ra lỗi, vui lòng thử tải lại trang');
    }
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />
            </div>
          )}
          <div className={styles.actions}>
            <button type='submit'>
              {!isConfirmCode ? 'Gửi mã' : 'Xác nhận'}
            </button>
          </div>
          {!isConfirmCode && (
            <div className={styles.login}>
              <span>Quay lại trang - </span> <Link to='/login'>Đăng nhập</Link>
            </div>
          )}
          {isConfirmCode && (
            <div className={styles.tryAgain}>
              <span>Không nhận được mã? - </span>{' '}
              <div onClick={() => setIsConfirmCode(false)}>Thử lại</div>
            </div>
          )}
        </form>
      </main>
    </div>
  );
}
