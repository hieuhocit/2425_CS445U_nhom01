import { ITheme } from '@/types/definitions';
import { createSlice } from '@reduxjs/toolkit';

const initialState: ITheme = {
  mode:
    (localStorage.getItem('themeMode') as 'light' | 'dark' | null) || 'light',
};

const themeSlice = createSlice({
  name: 'theme',
  initialState: initialState,
  reducers: {
    toggleMode: (state) => {
      localStorage.setItem(
        'themeMode',
        state.mode === 'light' ? 'dark' : 'light'
      );

      state.mode = state.mode === 'light' ? 'dark' : 'light';
    },
  },
});

export const { toggleMode } = themeSlice.actions;
export default themeSlice.reducer;
