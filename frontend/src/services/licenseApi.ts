import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ILicense } from '@/types/definitions';

export interface LicenseResponse {
  statusCode: number;
  message: string;
  data: ILicense[] | ILicense | null;
}

export const licenseApi = createApi({
  reducerPath: 'licenseApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
    credentials: 'include',
  }),

  endpoints: (builder) => ({
    getLicenses: builder.query<LicenseResponse, void>({
      query: () => 'licenses',
    }),
  }),
});

export const { useGetLicensesQuery } = licenseApi;
