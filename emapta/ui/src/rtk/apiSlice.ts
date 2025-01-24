/**
 * @module RTKConfig
 * @category Utils
 *
 */

import { createApi } from '@reduxjs/toolkit/query/react';
import axios, { AxiosError, AxiosRequestConfig } from 'axios';

import type { ApiErrorResponse, AxiosErrorResponse } from '@/types/common';
import { API_BASE_URL } from '@/utils/constants';
import type { BaseQueryFn } from '@reduxjs/toolkit/query';

export const transformErrorResponse = (
  response: AxiosErrorResponse,
): ApiErrorResponse => {
  if (response.code === AxiosError.ERR_NETWORK) {
    return {
      success: false,
      message:
        "We're having trouble reaching the server. Please try again later.",
      status: response.status,
      errors: null,
    };
  }

  if (response.code === AxiosError.ETIMEDOUT) {
    return {
      success: false,
      message:
        'The server is taking too long to respond. Please try again later.',
      status: response.status,
      errors: null,
    };
  }

  if (response.code === AxiosError.ERR_INVALID_URL) {
    return {
      success: false,
      message:
        'An error occurred while processing your request. Please contact support.',
      status: response.status,
      errors: null,
    };
  }

  if (response.data) {
    return { ...response.data, success: false, status: response.status };
  }

  if (response.message === 'Network Error') {
    return {
      success: false,
      message:
        "Can't connect to the server. Please check your internet connection.",
      status: response.status,
      errors: null,
    };
  }

  return {
    success: false,
    message: 'Something went wrong. Please try again later.',
    status: response.status,
    errors: null,
  };
};

export const axiosPrivate = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
});

const axiosBaseQuery: BaseQueryFn<
  {
    url: string;
    headers?: AxiosRequestConfig['headers'];
    method: AxiosRequestConfig['method'];
    data?: AxiosRequestConfig['data'];
    params?: AxiosRequestConfig['params'];
  },
  unknown,
  unknown
> = async (args) => {
  try {
    const result = await axiosPrivate(args);
    return { data: result.data };
  } catch (axiosError) {
    const err = axiosError as AxiosError;
    return {
      error: {
        code: err.code,
        status: err.response?.status,
        message: err.message,
        data: err.response?.data,
      },
    };
  }
};

export const api = createApi({
  baseQuery: axiosBaseQuery,
  endpoints: () => ({}),
  tagTypes: ['REFERRALS'],
  refetchOnReconnect: true,
  refetchOnFocus: false, // we don't want to refetch on focus because it will cause a lot of request
  refetchOnMountOrArgChange: 86400, // 1 day to refetch again NOTE: this is not working on useLazyQuery
  reducerPath: 'RTK',
  keepUnusedDataFor: 60, // seconds
});

export default api;
