import { createSlice } from '@reduxjs/toolkit';
import { AuthState, User } from '@/types/definitions';
import { authApi } from '@/services/authApi';

const authSlice = createSlice({
  name: 'auth',
  initialState: { user: null, token: null, isLoggedIn: false } as AuthState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(authApi.endpoints.login.matchFulfilled, (state, action) => {
        const user = action.payload.user as User;
        state.user = user;
        state.token = user.access_token;
        state.isLoggedIn = true;
        localStorage.setItem('token', user.access_token);
      })
      .addMatcher(authApi.endpoints.logout.matchFulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.isLoggedIn = false;
        localStorage.removeItem('token');
      })
      .addMatcher(authApi.endpoints.getUser.matchFulfilled, (state, action) => {
        const user = action.payload.user as User;
        state.user = user;
        state.token = user.access_token;
        state.isLoggedIn = true;
        localStorage.setItem('token', user.access_token);
      });
  },
});

export default authSlice.reducer;
