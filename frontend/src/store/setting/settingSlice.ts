import { ISetting } from '@/types/definitions';
import { createSlice } from '@reduxjs/toolkit';

const initialState: ISetting = {
  license: {
    id: 'Hạng A1',
    name: 'Hạng A1',
  },
};

const settingSlice = createSlice({
  name: 'setting',
  initialState: initialState,
  reducers: {
    changeLicense: (state, action) => {
      state.license = action.payload.license;
    },
  },
});

export const { changeLicense } = settingSlice.actions;
export default settingSlice.reducer;
