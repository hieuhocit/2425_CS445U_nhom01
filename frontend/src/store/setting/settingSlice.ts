import { ISetting } from '@/types/definitions';
import { createSlice } from '@reduxjs/toolkit';

/** DUMMY DATA */
import { licenses } from '@/data/data';

const initialState: ISetting = {
  currentLicense: licenses[0],
  licenses: licenses,
};

const settingSlice = createSlice({
  name: 'setting',
  initialState: initialState,
  reducers: {
    changeLicense: (state, action) => {
      state.currentLicense = action.payload.currentLicense;
    },
  },
});

export const { changeLicense } = settingSlice.actions;
export default settingSlice.reducer;
