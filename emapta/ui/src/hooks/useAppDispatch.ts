/**
 * @module useAppDispatch
 * @category Hooks
 *
 */

import { useDispatch } from 'react-redux';

import type { AppDispatch } from '@/rtk/configureStore';

/**
 * RTK useDispatch
 *
 * @category Hooks
 * @see https://react-redux.js.org/using-react-redux/usage-with-typescript#define-typed-hooks
 *
 */
export const useAppDispatch: () => AppDispatch = useDispatch;

export default useAppDispatch;
