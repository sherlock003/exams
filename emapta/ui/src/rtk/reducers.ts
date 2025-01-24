/**
 * Application reducers
 * Combine all reducers in this file and export the combined reducers.
 *
 * @module Reducer
 * @category Utils
 *
 */

import { combineReducers } from '@reduxjs/toolkit';

import api from '@/rtk/apiSlice';

import ReferralReducer, { KEY as KEY_REFERRAL } from '@/rtk/referral/slice';

export const AppReducer = combineReducers({
  [api.reducerPath]: api.reducer,
  [KEY_REFERRAL]: ReferralReducer,
});

export type RootState = ReturnType<typeof AppReducer>;
export default AppReducer;
