import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { User } from '@/types/definitions';
import { RootState } from '@/store/store';

type ErrorResponse = {
  field: string;
  message: string;
};

export interface LoginResponse {
  statusCode: number;
  message: string;
  errors?: ErrorResponse[];
  data?: User;
}

export interface LoginRequest {
  account: string;
  password: string;
}

export interface LoginError {
  status: number;
  data: {
    statusCode: number;
    message: string;
    errors?: ErrorResponse[];
  };
}

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
    prepareHeaders: (headers, { getState }) => {
      const access_token =
        (getState() as RootState).auth.access_token ||
        localStorage.getItem('access_token');
      const refresh_token =
        (getState() as RootState).auth.refresh_token ||
        localStorage.getItem('refresh_token');

      if (access_token) headers.set('authorization', `Bearer ${access_token}`);
      if (refresh_token) headers.set('x-refresh-token', refresh_token);

      return headers;
    },
  }),

  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: 'login',
        method: 'POST',
        body: credentials,
      }),
    }),

    logout: builder.mutation<void, void>({
      query: () => ({
        url: 'logout',
        method: 'POST',
      }),
    }),

    getUser: builder.query<LoginResponse, void>({
      query: () => 'me',
    }),
  }),
});

export const { useLoginMutation, useLogoutMutation, useGetUserQuery } = authApi;
