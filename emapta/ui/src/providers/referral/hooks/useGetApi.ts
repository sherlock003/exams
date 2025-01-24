/**
 * @module useGetApi
 * @category Hooks
 *
 */

import { useCallback } from 'react';
import { useSelector } from 'react-redux';

import { useLazyGetQuery } from '@/rtk/referral/apiSlice';
import { selectReferralState } from '@/rtk/referral/slice';
import { ApiSuccessResponse } from '@/types/common';
import { Referral } from '@/types/referrals';
import { API_BASE_URL } from '@/utils/constants';

const useGetApi = () => {
  const [getReferral, state] = useLazyGetQuery();
  const { list } = useSelector(selectReferralState);

  const getApi = useCallback(
    async (id: number): Promise<ApiSuccessResponse & { data?: Referral }> => {
      if (API_BASE_URL) {
        const response = await getReferral(id).unwrap();
        return response;
      }

      const referral = list.find((item) => item.id === id);
      return { message: 'Success', success: true, data: referral };
    },
    [list, getReferral],
  );

  return { getApi, ...state };
};

export default useGetApi;
