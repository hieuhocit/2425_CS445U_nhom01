import { configureStore } from '@reduxjs/toolkit';
import { authApi } from '@/services/authApi';
import authReducer from './auth/authSlice';
import themeReducer from './theme/themeSlice';
import settingReducer from './setting/settingSlice';
import dataReducer from './data/dataSlice';
import { licenseApi } from '@/services/licenseApi';

const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [licenseApi.reducerPath]: licenseApi.reducer,
    theme: themeReducer,
    setting: settingReducer,
    auth: authReducer,
    data: dataReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(licenseApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
