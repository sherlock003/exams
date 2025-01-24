/**
 * @module LoginEndpoints
 * @category RTK Endpoints
 *
 */

import { FormInput } from '@/providers/referral';
import api, { transformErrorResponse } from '@/rtk/apiSlice';
import { ApiSuccessResponse } from '@/types/common';
import { Referral } from '@/types/referrals';

export const referralApiSlice = api.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    list: builder.query<ApiSuccessResponse & { data: Referral[] }, void>({
      query: () => ({ url: '/api/v1/referrals', method: 'GET' }),
      providesTags: ['REFERRALS'],
      transformResponse: (
        response: ApiSuccessResponse & { data: Referral[] },
      ) => response,
      transformErrorResponse,
    }),
    get: builder.query<ApiSuccessResponse & { data: Referral }, number>({
      query: (id) => ({ url: `/api/v1/referrals/${id}`, method: 'GET' }),
      providesTags: (_result, _error, id) => [{ type: 'REFERRALS', id }],
      transformResponse: (response: ApiSuccessResponse & { data: Referral }) =>
        response,
      transformErrorResponse,
    }),
    create: builder.mutation<
      ApiSuccessResponse & { data: Referral },
      FormInput
    >({
      query: (data) => ({
        url: '/api/v1/referrals',
        method: 'POST',
        data,
      }),
      invalidatesTags: ['REFERRALS'],
      transformResponse: (response: ApiSuccessResponse & { data: Referral }) =>
        response,
      transformErrorResponse,
    }),
    update: builder.mutation<
      ApiSuccessResponse & { data: Referral },
      { data: FormInput; id: number }
    >({
      query: ({ data, id }) => ({
        url: `/api/v1/referrals/${id}`,
        method: 'PUT',
        data,
      }),
      invalidatesTags: ['REFERRALS'],
      transformResponse: (response: ApiSuccessResponse & { data: Referral }) =>
        response,
      transformErrorResponse,
    }),
    delete: builder.mutation<ApiSuccessResponse, number>({
      query: (id) => ({
        url: `/api/v1/referrals/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['REFERRALS'],
      transformResponse: (response: ApiSuccessResponse) => response,
      transformErrorResponse,
    }),
  }),
});

export const {
  useLazyListQuery,
  useLazyGetQuery,
  useCreateMutation,
  useUpdateMutation,
  useDeleteMutation,
} = referralApiSlice;
