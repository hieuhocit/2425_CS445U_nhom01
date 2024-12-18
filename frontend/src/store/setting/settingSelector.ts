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

const currentLicenseIdSelector = createSelector(
  selectSetting,
  (setting) => setting.currentLicenseId
);

const violationTypeSelector = createSelector(
  selectSetting,
  (setting) => setting.violationType
);

export {
  selectSetting,
  licensesSelector,
  currentLicenseSelector,
  violationTypeSelector,
  currentLicenseIdSelector,
};
