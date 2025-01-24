/**
 * @module useCreateApi
 * @category Hooks
 *
 */

import { useCallback } from 'react';
import { useSelector } from 'react-redux';

import useAppDispatch from '@/hooks/useAppDispatch';
import { FormInput } from '@/providers/referral';
import { useCreateMutation } from '@/rtk/referral/apiSlice';
import { addReferral, selectReferralState } from '@/rtk/referral/slice';
import { ApiSuccessResponse } from '@/types/common';
import { Referral } from '@/types/referrals';
import { API_BASE_URL } from '@/utils/constants';

const useCreateApi = () => {
  const dispatch = useAppDispatch();
  const [createApi, state] = useCreateMutation();
  const { list } = useSelector(selectReferralState);

  const create = useCallback(
    async (
      payload: FormInput,
    ): Promise<ApiSuccessResponse & { data: Referral }> => {
      if (API_BASE_URL) {
        const response = await createApi(payload).unwrap();
        return response;
      }

      const referral = { ...payload, id: list.length + 1 };
      dispatch(addReferral(referral));
      return { message: 'Added Successfully', success: true, data: referral };
    },
    [list, createApi],
  );

  return { create, ...state };
};

export default useCreateApi;
