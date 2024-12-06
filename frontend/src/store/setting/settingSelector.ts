import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';

const selectSetting = (state: RootState) => state.setting;

const licensesSelector = createSelector(
  selectSetting,
  (setting) => setting.licenses
);

const currentLicenseSelector = createSelector(
  selectSetting,
  (setting) => setting.currentLicense
);

export { selectSetting, licensesSelector, currentLicenseSelector };
