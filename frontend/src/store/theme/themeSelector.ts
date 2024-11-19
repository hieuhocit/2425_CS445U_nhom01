import { IStoreState } from '@/types/definitions';
import { createSelector } from '@reduxjs/toolkit';

const selectTheme = (state: IStoreState) => state.theme;

const themeMode = createSelector(selectTheme, (theme) => theme.mode);

export { themeMode };
