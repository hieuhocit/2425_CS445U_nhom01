import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';

const selectAuth = (state: RootState) => state.auth;

const userSelector = createSelector(selectAuth, (auth) => auth.user);
const loginSelector = createSelector(selectAuth, (auth) => auth.isLoggedIn);
const isAdminSelector = createSelector(
  selectAuth,
  (auth) => auth.user?.isAdmin
);

export { selectAuth, userSelector, loginSelector, isAdminSelector };
