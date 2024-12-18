import { licenseApi } from '@/services/licenseApi';
import { ILicense, ISetting } from '@/types/definitions';
import { createSlice } from '@reduxjs/toolkit';

const initialState: ISetting = {
  currentLicenseId: localStorage.getItem('licenseId'),
  currentLicense: null,
  licenses: [],
  violationType: 1,
};

const settingSlice = createSlice({
  name: 'setting',
  initialState: initialState,
  reducers: {
    changeLicense: (state, action) => {
      state.currentLicense = action.payload.currentLicense;
      state.currentLicenseId = action.payload.currentLicense.id;
      localStorage.setItem('licenseId', action.payload.currentLicense.id);
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
        state.currentLicense = !state.currentLicenseId
          ? licenses[0]
          : licenses.find((l) => l.id === Number(state.currentLicenseId));
      }
    );
  },
});

export const { changeLicense, changeViolationType } = settingSlice.actions;
export default settingSlice.reducer;
