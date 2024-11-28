import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';

const selectSetting = (state: RootState) => state.setting;

const licenseSelector = createSelector(
  selectSetting,
  (setting) => setting.license
);

export { selectSetting, licenseSelector };
