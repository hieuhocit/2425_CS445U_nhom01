import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';

const selectTheme = (state: RootState) => state.theme;

const themeMode = createSelector(selectTheme, (theme) => theme.mode);

export { selectTheme, themeMode };
