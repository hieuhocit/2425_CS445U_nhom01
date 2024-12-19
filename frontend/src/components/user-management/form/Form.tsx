/** styles */
import styles from './Form.module.scss';

/** react */
import { useState } from 'react';

/** icons */
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';

/** types */
import { User } from '@/types/definitions';

import { BASE_URL } from '@/config/baseUrl';

type onSubmit =
  | null
  | ((id: number, data: FormData) => void)
  | ((data: FormData) => void);

export default function Form({
  isDark,
  isNotInModal,
  user,
  behavior,
  onCancel,
  onSubmit,
}: {
  isDark: boolean;
  isNotInModal?: boolean;
  user?: User | null;
  behavior: 'view' | 'update' | 'add' | 'profile';
  onCancel: () => void;
  onSubmit: onSubmit;
}) {
  const [selectedImage, setSelectedImage] = useState<File | undefined>(
    undefined
  );
  const [showPassword, setShowPassword] = useState(false);

  function handleChangeImage(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    const image = files?.[0];
    if (!image) return;
    setSelectedImage(image);
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!onSubmit || behavior === 'view') return;

    const formData = new FormData(e.target as HTMLFormElement);

    if (behavior === 'update' || behavior === 'profile') {
      if (selectedImage) formData.set('image', selectedImage);

      (onSubmit as (id: number, data: FormData) => void)(
        (user as User).id,
        formData
      );
    } else if (behavior === 'add') {
      (onSubmit as (data: FormData) => void)(formData);
    }
  }

  return (
    <form
      method='POST'
      onSubmit={handleSubmit}
      className={`${styles.form} ${isDark ? styles.darkMode : ''}`}
    >
      <div className={styles.inputContainer}>
        <label htmlFor='last_name'>Họ</label>
        <input
          id='last_name'
          name='last_name'
          type='text'
          placeholder='Nhập họ'
          autoComplete='off'
          defaultValue={user?.last_name || ''}
          disabled={behavior === 'view'}
        />
      </div>
      <div className={styles.inputContainer}>
        <label htmlFor='first_name'>Tên</label>
        <input
          id='first_name'
          name='first_name'
          type='text'
          placeholder='Nhập tên'
          autoComplete='off'
          defaultValue={user?.first_name || ''}
          disabled={behavior === 'view'}
        />
      </div>
      <div className={styles.inputContainer}>
        <label htmlFor='email'>Email</label>

        <input
          id='email'
          name='email'
          type='email'
          placeholder='Nhập email'
          defaultValue={user?.email || ''}
          disabled={behavior === 'view'}
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
          defaultValue={user?.username || ''}
          disabled={
            behavior === 'view' ||
            behavior === 'update' ||
            behavior === 'profile'
          }
        />
      </div>
      {behavior === 'add' && (
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
      )}
      {behavior !== 'profile' && (
        <div className={styles.inputContainer}>
          <label htmlFor='permission'>Vai trò</label>
          <select
            id='permission'
            name='permission'
            disabled={behavior === 'view'}
            defaultValue={user?.permission || ''}
          >
            <option value='MEMBER'>MEMBER</option>
            <option value='ADMIN'>ADMIN</option>
          </select>
        </div>
      )}
      <div className={styles.inputContainer}>
        <label>Hình ảnh</label>
        <input
          className={styles.inputImage}
          id='image'
          name='image'
          type='file'
          onChange={handleChangeImage}
        />
        <label
          className={`${styles.pickImage} ${
            behavior === 'view' ? styles.view : ''
          }`}
          htmlFor='image'
        >
          <ImageCustom
            behavior={behavior}
            imageUrl={
              selectedImage
                ? URL.createObjectURL(selectedImage)
                : user?.avatar && `${BASE_URL}/images/users/${user?.avatar}`
            }
          />
        </label>
      </div>

      <div className={styles.actions}>
        {!isNotInModal && (
          <button onClick={onCancel} type='button'>
            Huỷ
          </button>
        )}
        {behavior !== 'view' && (
          <button type='submit'>
            {behavior === 'add' ? 'Thêm' : 'Cập nhật'}
          </button>
        )}
      </div>
    </form>
  );
}

function ImageCustom({
  behavior,
  imageUrl,
}: {
  behavior: 'view' | 'update' | 'add' | 'profile';
  imageUrl: string | undefined | null;
}) {
  if (behavior === 'view') {
    return imageUrl ? (
      <img src={imageUrl} alt='preview image' />
    ) : (
      <p>Không có hình ảnh</p>
    );
  }
  return imageUrl ? (
    <img src={imageUrl} alt='preview image' />
  ) : (
    <p>Chọn hình ảnh</p>
  );
}
