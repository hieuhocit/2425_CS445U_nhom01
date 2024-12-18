/** styles */
import styles from './Form.module.scss';

/** types */
import { IExam } from '@/types/definitions';

/** react-redux */
import { useSelector } from 'react-redux';
import { licensesSelector } from '@/store/setting/settingSelector';

type onSubmit =
  | null
  | ((id: number, data: FormData) => void)
  | ((data: FormData) => void);

export default function Form({
  isDark,
  exam,
  behavior,
  onCancel,
  onSubmit,
}: {
  isDark: boolean;
  exam?: IExam | null;
  behavior: 'view' | 'update' | 'add';
  onCancel: () => void;
  onSubmit: onSubmit;
}) {
  const licenses = useSelector(licensesSelector);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!onSubmit || behavior === 'view') return;

    const formData = new FormData(e.target as HTMLFormElement);

    if (behavior === 'update') {
      (onSubmit as (id: number, data: FormData) => void)(
        (exam as IExam).id,
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
        <label htmlFor='title'>Tiêu đề</label>
        <input
          id='title'
          name='title'
          type='text'
          placeholder='Nhập tiêu đề'
          autoComplete='off'
          defaultValue={exam?.title || ''}
          disabled={behavior === 'view'}
        />
      </div>
      <div className={styles.inputContainer}>
        <label htmlFor=''>Giấy phép</label>
        <div className={styles.checkboxes}>
          {licenses.map((lc) => (
            <div
              key={lc.id}
              className={`${styles.checkbox} ${
                behavior === 'view' ? styles.disabled : ''
              }`}
            >
              <input
                type='checkbox'
                id={lc.id + ''}
                name={'licenses'}
                value={lc.id + ''}
                defaultChecked={exam?.license_ids.includes(lc.id)}
                disabled={behavior === 'view'}
              />
              <label htmlFor={lc.id + ''}>Hạng {lc.code}</label>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.actions}>
        <button onClick={onCancel} type='button'>
          Huỷ
        </button>
        {behavior !== 'view' && (
          <button type='submit'>
            {behavior === 'add' ? 'Thêm' : 'Cập nhật'}
          </button>
        )}
      </div>
    </form>
  );
}
