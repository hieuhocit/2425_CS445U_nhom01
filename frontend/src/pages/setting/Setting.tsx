/** styles */
import styles from './Setting.module.scss';

/** react-router */
import { useNavigate } from 'react-router-dom';

/** react */
import { useState } from 'react';

/** redux */
import { themeMode } from '@/store/theme/themeSelector';
import { useDispatch, useSelector } from 'react-redux';
import {
  currentLicenseSelector,
  licensesSelector,
} from '@/store/setting/settingSelector';

/** types */
import { changeLicense } from '@/store/setting/settingSlice';

/** components */
import Header from '@/components/header/Header';
import { ILicense } from '@/types/definitions';
import { changeQuestions } from '@/store/data/dataSlice';

export default function SettingPage() {
  const licenses = useSelector(licensesSelector);
  const currentLicense = useSelector(currentLicenseSelector);

  const [selectedOption, setSelectedOption] =
    useState<ILicense>(currentLicense);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const mode = useSelector(themeMode);
  const isDarkMode = mode === 'dark';

  function handleOnChange(license: ILicense) {
    setSelectedOption({ ...license });
  }

  function handleSave() {
    dispatch(
      changeLicense({
        currentLicense: selectedOption,
      })
    );
    dispatch(
      changeQuestions({
        licenseId: selectedOption.id,
      })
    );
    navigate('/');
  }

  return (
    <>
      <div
        className={`${styles.setting} ${
          isDarkMode ? styles.darkMode : undefined
        }`}
      >
        <Header title='Cài đặt' isDark={isDarkMode} />
        <main className={styles.main}>
          <ul className={styles.listSetting}>
            {licenses.map((l) => {
              return (
                <li key={l.id}>
                  <label className={styles.item}>
                    <input
                      onChange={handleOnChange.bind(null, l)}
                      checked={selectedOption.id === l.id}
                      type='radio'
                      name='level'
                      value={l.id}
                    />
                    <div>
                      <h2>Hạng {l.code}</h2>
                      <p>{l.display}</p>
                    </div>
                  </label>
                </li>
              );
            })}
          </ul>
        </main>
        <footer className={styles.footer}>
          <div className={styles.actions}>
            <button
              onClick={() => navigate('/')}
              className={`${styles.button} ${styles.lighter}`}
            >
              <span>Cancel</span>
            </button>
            <button onClick={handleSave} className={styles.button}>
              <span>Save</span>
            </button>
          </div>
        </footer>
      </div>
    </>
  );
}
