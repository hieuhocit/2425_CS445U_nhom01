import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { User } from '@/types/definitions';
import { BASE_URL } from '@/config/baseUrl';

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

export interface LogoutResponse {
  statusCode: number;
  message: string;
  data: null;
}

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/api`,
    credentials: 'include',
  }),

  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: 'user/login',
        method: 'POST',
        body: credentials,
      }),
    }),

    logout: builder.mutation<LogoutResponse, void>({
      query: () => ({
        url: 'user/logout',
        method: 'POST',
      }),
    }),

    getUser: builder.query<LoginResponse, void>({
      query: () => 'user/me',
    }),
  }),
});

export const { useLoginMutation, useLogoutMutation, useGetUserQuery } = authApi;
