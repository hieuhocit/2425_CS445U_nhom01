/** styles */
import styles from './Login.module.scss';

/** react-redux */
import { useSelector } from 'react-redux';
import { themeMode } from '@/store/theme/themeSelector';

/** components */
import Header from '@/components/header/Header';

/** react-router */
import { ActionFunctionArgs, Form, Link, redirect } from 'react-router-dom';

/** react */
import { useState } from 'react';

/** icons */
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';

/** toastify */
import { toast } from 'react-toastify';

export async function action({ params, request }: ActionFunctionArgs) {
  const formData = await request.formData();

  const username = formData.get('username');
  const password = formData.get('password');

  if (username === 'admin' && password === '123') {
    toast.success('Đăng nhập thành công!');
    return redirect('/');
  }

  toast.error('Thông tin tài khoản hoặc mật khẩu không chính xác!');
  return null;
}

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const mode = useSelector(themeMode);

  const isDarkMode = mode === 'dark';

  return (
    <div className={`${styles.login} ${isDarkMode ? styles.darkMode : ''}`}>
      <Header title='Đăng nhập' isDark={isDarkMode} />

      <main className={styles.main}>
        <Form className={styles.form} method='POST'>
          <div className={styles.inputContainer}>
            <label htmlFor='username'>Tên người dùng</label>
            <input
              id='username'
              name='username'
              type='text'
              placeholder='Tên người dùng'
              autoComplete='off'
            />
          </div>
          <div className={styles.inputContainer}>
            <label htmlFor='password'>Mật khẩu</label>
            <div>
              <input
                id='password'
                name='password'
                type={showPassword ? 'text' : 'password'}
                placeholder='Mật khẩu'
              />
              {!showPassword ? (
                <FaRegEye
                  onClick={() => setShowPassword(true)}
                  className={styles.icon}
                />
              ) : (
                <FaRegEyeSlash
                  onClick={() => setShowPassword(false)}
                  className={styles.icon}
                />
              )}
            </div>
          </div>
          <div className={styles.forgotPassword}>
            <Link to='/login'>Quên mật khẩu?</Link>
          </div>
          <div className={styles.actions}>
            <button type='submit'>Đăng nhập</button>
          </div>
          <div className={styles.register}>
            <span>Chưa có tài khoản?</span>{' '}
            <Link to='/register'>Đăng ký ngay</Link>
          </div>
        </Form>
      </main>
    </div>
  );
}
