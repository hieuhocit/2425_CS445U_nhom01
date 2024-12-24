import { licenseApi } from '@/services/licenseApi';
import { ILicense, ISetting } from '@/types/definitions';
import { createSlice } from '@reduxjs/toolkit';

const initialState: ISetting = {
  currentLicenseId: Number(localStorage.getItem('licenseId') || 1),
  currentLicense: null,
  licenses: [],
  violationType: 1,
};

const settingSlice = createSlice({
  name: 'setting',
  initialState: initialState,
  reducers: {
    changeLicense: (state, action) => {
      const license = action.payload.currentLicense as ILicense;
      state.currentLicense = license;
      state.currentLicenseId = license.id;
      localStorage.setItem('licenseId', license.id + '');
    },
    changeViolationType: (state, action) => {
      state.violationType = action.payload.violationType;
    },
  },
  extraReducers(builder) {
    builder.addMatcher(
      licenseApi.endpoints.getLicenses.matchFulfilled,
      (state, action) => {
        const licenses = action.payload.data as ILicense[];
        state.licenses = licenses;

        if (!state?.currentLicenseId) {
          state.currentLicense = licenses[0];
          state.currentLicenseId = licenses[0].id;
          localStorage.setItem('licenseId', licenses[0].id + '');
        } else {
          const l = licenses.find(
            (l) => l.id === Number(state.currentLicenseId)
          ) as ILicense;

          state.currentLicense = l;
          state.currentLicenseId = l.id;
          localStorage.setItem('licenseId', l.id + '');
        }
      }
    );
  },
});

export const { changeLicense, changeViolationType } = settingSlice.actions;
export default settingSlice.reducer;
