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

/** API */
import { LoginError, useLoginMutation } from '@/services/authApi';

/** Validate */
import { validateLogin } from '@/utils/validateLogin';

export default function LoginPage() {
  const [login] = useLoginMutation();
  const [showPassword, setShowPassword] = useState(false);
  const mode = useSelector(themeMode);

  const navigate = useNavigate();

  const isDarkMode = mode === 'dark';

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);

    const account = formData.get('account')?.toString().trim() as string | null;
    const password = formData.get('password')?.toString().trim() as
      | string
      | null;

    toast.dismiss();

    const errors = validateLogin({ account, password });

    if (errors) {
      errors.forEach((err) => {
        toast.error(err.message, { autoClose: 5000 });
      });
      return;
    }

    try {
      const res = await login({
        account: account as string,
        password: password as string,
      }).unwrap();

      toast.success(res.message);
      navigate('/');
    } catch (error: LoginError | unknown) {
      if ((error as LoginError).status === 422) {
        (error as LoginError).data.errors?.forEach((err) => {
          toast.error(err.message, { autoClose: 5000 });
        });
      }
      if (
        (error as LoginError).status === 500 ||
        (error as LoginError).status === 401 ||
        (error as LoginError).status === 404
      ) {
        toast.error((error as LoginError).data.message, { autoClose: 5000 });
      }
    }
  }

  return (
    <div className={`${styles.login} ${isDarkMode ? styles.darkMode : ''}`}>
      <Header title='Đăng nhập' isDark={isDarkMode} />

      <main className={styles.main}>
        <form onSubmit={handleLogin} className={styles.form} method='POST'>
          <div className={styles.inputContainer}>
            <label htmlFor='account'>Tên người dùng hoặc email</label>
            <input
              id='account'
              name='account'
              type='text'
              placeholder='Tên người dùng hoặc email'
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
            <Link to='/forgot-password' state={{ prevPath: '/login' }}>
              Quên mật khẩu?
            </Link>
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
