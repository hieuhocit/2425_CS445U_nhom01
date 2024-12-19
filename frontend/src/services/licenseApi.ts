import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ILicense } from '@/types/definitions';
import { BASE_URL } from '@/config/baseUrl';

export interface LicenseResponse {
  statusCode: number;
  message: string;
  data: ILicense[] | ILicense | null;
}

export const licenseApi = createApi({
  reducerPath: 'licenseApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/api`,
    credentials: 'include',
  }),

  endpoints: (builder) => ({
    getLicenses: builder.query<LicenseResponse, void>({
      query: () => 'licenses',
    }),
  }),
});

export const { useGetLicensesQuery } = licenseApi;
