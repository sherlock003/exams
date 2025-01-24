/**
 * @module useGetListApi
 * @category Hooks
 *
 */

import { useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';

import { useLazyListQuery } from '@/rtk/referral/apiSlice';
import { selectReferralState } from '@/rtk/referral/slice';
import { ApiSuccessResponse } from '@/types/common';
import { Referral } from '@/types/referrals';
import { API_BASE_URL } from '@/utils/constants';

const useGetListApi = () => {
  const [getList, { data, ...state }] = useLazyListQuery();
  const { list } = useSelector(selectReferralState);

  const localData = useMemo(
    () => ({ message: 'Success', success: true, data: list }),
    [list],
  );

  const getListApi = useCallback(async (): Promise<
    ApiSuccessResponse & { data?: Referral[] }
  > => {
    if (API_BASE_URL) {
      return await getList(undefined, false).unwrap();
    }
    return localData;
  }, [localData, list, getList]);

  return { getListApi, data: API_BASE_URL ? data : localData, ...state };
};

export default useGetListApi;
