import { licenseApi } from '@/services/licenseApi';
import { ILicense, ISetting } from '@/types/definitions';
import { createSlice } from '@reduxjs/toolkit';

const initialState: ISetting = {
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
        state.currentLicense = licenses[0];
      }
    );
  },
});

export const { changeLicense, changeViolationType } = settingSlice.actions;
export default settingSlice.reducer;
