/** styles */
import styles from './Login.module.scss';

/** react-redux */
import { useSelector } from 'react-redux';
import { themeMode } from '@/store/theme/themeSelector';

/** components */
import Header from '@/components/header/Header';

/** react-router */
import { Link, useNavigate } from 'react-router-dom';

/** react */
import { useState } from 'react';

/** icons */
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';

/** toastify */
import { toast } from 'react-toastify';
import { useLoginMutation } from '@/services/authApi';

export default function LoginPage() {
  const [login] = useLoginMutation();
  const [showPassword, setShowPassword] = useState(false);
  const mode = useSelector(themeMode);

  const navigate = useNavigate();

  const isDarkMode = mode === 'dark';

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const username = formData.get('username') as string;
    const password = formData.get('password') as string;

    try {
      const res = await login({
        username,
        password,
      }).unwrap();

      toast.success(res.message);
      navigate('/');
    } catch (error) {
      console.error(error);
      toast.error('Đã xảy ra lỗi');
    }
  }

  return (
    <div className={`${styles.login} ${isDarkMode ? styles.darkMode : ''}`}>
      <Header title='Đăng nhập' isDark={isDarkMode} />

      <main className={styles.main}>
        <form onSubmit={handleLogin} className={styles.form} method='POST'>
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
              {showPassword ? (
                <FaRegEye
                  onClick={() => setShowPassword(false)}
                  className={styles.icon}
                />
              ) : (
                <FaRegEyeSlash
                  onClick={() => setShowPassword(true)}
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
        </form>
      </main>
    </div>
  );
}
