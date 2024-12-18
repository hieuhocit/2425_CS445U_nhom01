import { createSlice } from '@reduxjs/toolkit';
import { AuthState, User } from '@/types/definitions';
import { authApi } from '@/services/authApi';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    isLoggedIn: false,
  } as AuthState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(authApi.endpoints.login.matchFulfilled, (state, action) => {
        const user = action.payload.data as User;
        state.user = user;
        state.isLoggedIn = true;
      })
      .addMatcher(authApi.endpoints.logout.matchFulfilled, (state) => {
        state.user = null;
        state.isLoggedIn = false;
      })
      .addMatcher(authApi.endpoints.getUser.matchFulfilled, (state, action) => {
        const user = action.payload.data as User;
        state.user = user;
        state.isLoggedIn = true;
      });
  },
});

export default authSlice.reducer;
