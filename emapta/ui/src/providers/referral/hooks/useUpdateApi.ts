/**
 * @module useUpdateApi
 * @category Hooks
 *
 */

import { useCallback } from 'react';

import useAppDispatch from '@/hooks/useAppDispatch';
import { FormInput } from '@/providers/referral';
import { useUpdateMutation } from '@/rtk/referral/apiSlice';
import { updateReferral } from '@/rtk/referral/slice';
import { ApiSuccessResponse } from '@/types/common';
import { Referral } from '@/types/referrals';
import { API_BASE_URL } from '@/utils/constants';

const useUpdateApi = () => {
  const dispatch = useAppDispatch();
  const [updateApi, state] = useUpdateMutation();

  const update = useCallback(
    async (
      id: number,
      payload: FormInput,
    ): Promise<ApiSuccessResponse & { data: Referral }> => {
      if (API_BASE_URL) {
        const response = await updateApi({ id, data: payload }).unwrap();
        return response;
      }
      const referral = { ...payload, id };
      dispatch(updateReferral(referral));
      return { message: 'Update Successfully', success: true, data: referral };
    },
    [updateApi, dispatch],
  );

  return { update, ...state };
};

export default useUpdateApi;
