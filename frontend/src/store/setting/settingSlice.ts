import { ISetting } from '@/types/definitions';
import { createSlice } from '@reduxjs/toolkit';

/** DUMMY DATA */
import { licenses } from '@/data/data';

const initialState: ISetting = {
  currentLicense: licenses[0],
  licenses: licenses,
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
});

export const { changeLicense, changeViolationType } = settingSlice.actions;
export default settingSlice.reducer;
