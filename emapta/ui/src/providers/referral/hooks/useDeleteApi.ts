/**
 * @module useDeleteApi
 * @category Hooks
 *
 */

import { useCallback } from 'react';

import useAppDispatch from '@/hooks/useAppDispatch';
import { useConfirmationContext } from '@/providers/confirmation';
import { useDeleteMutation } from '@/rtk/referral/apiSlice';
import { deleteReferral } from '@/rtk/referral/slice';
import { ApiSuccessResponse } from '@/types/common';
import { API_BASE_URL } from '@/utils/constants';

const useDeleteApi = () => {
  const dispatch = useAppDispatch();
  const [deleteMutation, state] = useDeleteMutation();
  const { showConfirmation } = useConfirmationContext();

  const deleteApi = useCallback(
    async (id: number): Promise<ApiSuccessResponse | undefined> => {
      const confirm = await showConfirmation({
        ButtonConfirmProps: { color: 'error' },
        title: 'Delete Referral',
        description: 'Are you sure you want to delete?',
        confirmText: 'Delete',
        cancelText: 'Cancel',
      });
      if (!confirm) return;

      if (API_BASE_URL) {
        const response = await deleteMutation(id).unwrap();
        return response;
      }

      dispatch(deleteReferral(id));
      return { message: 'Deleted Successfully', success: true };
    },
    [dispatch, showConfirmation, deleteMutation],
  );

  return { deleteApi, ...state };
};

export default useDeleteApi;
