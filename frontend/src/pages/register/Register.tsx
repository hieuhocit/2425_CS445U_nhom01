/** styles */
import styles from './Register.module.scss';

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

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();

  const firstName = formData.get('firstName');
  const lastName = formData.get('lastName');
  const username = formData.get('username');
  const password = formData.get('password');
  const confirmPassword = formData.get('confirmPassword');

  // Validate
  if (
    firstName === '' ||
    lastName === '' ||
    username === '' ||
    password === '' ||
    confirmPassword === ''
  ) {
    toast.error('Vui lòng nhập đầy đủ thông tin!');
    return null;
  } else if (username === 'admin') {
    toast.error('Tài khoản đã tồn tại!');
    return null;
  } else if (password !== confirmPassword) {
    toast.error('Mật khẩu không trùng khớp, vui lòng nhập lại!');
    return null;
  }
  toast.success('Đăng ký tài khoản thành công!');
  return redirect('/login');
}

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const mode = useSelector(themeMode);

  const isDarkMode = mode === 'dark';

  return (
    <div className={`${styles.register} ${isDarkMode ? styles.darkMode : ''}`}>
      <Header title='Đăng ký' isDark={isDarkMode} />

      <main className={styles.main}>
        <Form className={styles.form} method='POST'>
          <div className={styles.inputContainer}>
            <label htmlFor='lastName'>Họ</label>
            <input
              id='lastName'
              name='lastName'
              type='text'
              placeholder='Nhập họ'
              autoComplete='off'
            />
          </div>
          <div className={styles.inputContainer}>
            <label htmlFor='firstName'>Tên</label>
            <input
              id='firstName'
              name='firstName'
              type='text'
              placeholder='Nhập tên'
              autoComplete='off'
            />
          </div>
          <div className={styles.inputContainer}>
            <label htmlFor='username'>Tên đăng nhập</label>
            <input
              id='username'
              name='username'
              type='text'
              placeholder='Nhập tên đăng nhập'
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
          <div className={styles.inputContainer}>
            <label htmlFor='confirmPassword'>Nhập lại mật khẩu</label>
            <div>
              <input
                id='confirmPassword'
                name='confirmPassword'
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder='Nhập lại mật khẩu'
              />
              {!showConfirmPassword ? (
                <FaRegEye
                  onClick={() => setShowConfirmPassword(true)}
                  className={styles.icon}
                />
              ) : (
                <FaRegEyeSlash
                  onClick={() => setShowConfirmPassword(false)}
                  className={styles.icon}
                />
              )}
            </div>
          </div>
          <div className={styles.actions}>
            <button type='submit'>Đăng ký</button>
          </div>
          <div className={styles.login}>
            <span>Đã có tài khoản?</span>{' '}
            <Link to='/login'>Đăng nhập ngay</Link>
          </div>
        </Form>
      </main>
    </div>
  );
}
