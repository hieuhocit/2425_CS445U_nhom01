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

/** Validate */
import { validateUser } from '@/utils/validateUser';

/** API */
import { postApi } from '@/config/fetchApi';

type ErrorResponse = {
  field: string;
  message: string;
};

type RegisterResponse = {
  statusCode: number;
  message: string;
  errors?: ErrorResponse[];
  data?: {
    username: string;
    permission: string;
    first_name: string;
    last_name: string;
    email: string;
  };
};

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();

  const first_name = formData.get('firstName') as string | null;
  const last_name = formData.get('lastName') as string | null;
  const email = formData.get('email') as string | null;
  const username = formData.get('username') as string | null;
  const password = formData.get('password') as string | null;
  const confirm_password = formData.get('confirmPassword') as string | null;
  const permission = 'MEMBER';

  const errors = validateUser({
    first_name,
    last_name,
    email,
    username,
    password,
    confirm_password,
  });

  toast.dismiss();

  if (errors) {
    errors.forEach((err) => {
      toast.error(err.message, { autoClose: 5000 });
    });
    return errors;
  }

  try {
    const res = await postApi('register', {
      first_name,
      last_name,
      email,
      username,
      password,
      permission,
    });

    const resData = (await res.json()) as RegisterResponse;

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
    return redirect('/login');
  } catch (error) {
    console.error(error);
    toast.error('Đã xảy ra lỗi, vui lòng thử lại');
  }
  return null;
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
            <label htmlFor='email'>Email</label>
            <input
              id='email'
              name='email'
              type='email'
              placeholder='Nhập email'
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
          <div className={styles.inputContainer}>
            <label htmlFor='confirmPassword'>Nhập lại mật khẩu</label>
            <div>
              <input
                id='confirmPassword'
                name='confirmPassword'
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
