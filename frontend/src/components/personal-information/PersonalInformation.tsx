/** styles */
import styles from './PersonalInformation.module.scss';

/** react-redux */
import { useSelector } from 'react-redux';
import { themeMode } from '@/store/theme/themeSelector';
import { userSelector } from '@/store/auth/authSelector';

/** Component */
import Form from '../user-management/form/Form';

/** tostify */
import { toast } from 'react-toastify';

export default function PersonalInformation() {
  const mode = useSelector(themeMode);
  const isDarkMode = mode === 'dark';

  const user = useSelector(userSelector);

  function handleUpdateUser(id: number, data: FormData) {
    console.log(id, Object.fromEntries(data));
    toast.success('Cập nhật thông tin thành công');
  }

  return (
    <div className={styles.personalInformation}>
      <Form
        user={user}
        behavior='update'
        isNotInModal={true}
        isDark={isDarkMode}
        onCancel={() => {}}
        onSubmit={handleUpdateUser}
      />
    </div>
  );
}
