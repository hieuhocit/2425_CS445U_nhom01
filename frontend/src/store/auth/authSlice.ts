import { createSlice } from '@reduxjs/toolkit';
import { AuthState, User } from '@/types/definitions';
import { authApi } from '@/services/authApi';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    isLoggedIn: false,
    access_token: null,
    refresh_token: null,
  } as AuthState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(authApi.endpoints.login.matchFulfilled, (state, action) => {
        const user = action.payload.user as User;
        state.user = user;

        state.access_token = user.access_token;
        state.refresh_token = user.refresh_token;
        state.isLoggedIn = true;

        localStorage.setItem('access_token', user.access_token);
        localStorage.setItem('refresh_token', user.refresh_token);
      })
      .addMatcher(authApi.endpoints.logout.matchFulfilled, (state) => {
        state.user = null;

        state.access_token = null;
        state.refresh_token = null;
        state.isLoggedIn = false;

        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
      })
      .addMatcher(authApi.endpoints.getUser.matchFulfilled, (state, action) => {
        const user = action.payload.user as User;
        state.user = user;

        state.access_token = user.access_token;
        state.refresh_token = user.refresh_token;
        state.isLoggedIn = true;

        localStorage.setItem('access_token', user.access_token);
        localStorage.setItem('refresh_token', user.refresh_token);
      });
  },
});

export default authSlice.reducer;
