/**
 * Setup reducer
 *
 * @module ConfigureStore
 * @category Utils
 *
 */

import { configureStore, Middleware } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

import api from '@/rtk/apiSlice';
import appReducer from '@/rtk/reducers';

const store = configureStore({
  reducer: appReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware as Middleware),
  devTools: process.env.NODE_ENV === 'development',
});

/**
 * @see https://redux-toolkit.js.org/rtk-query/api/setupListeners
 *
 */
setupListeners(store.dispatch);

export type RootState = ReturnType<typeof appReducer>;
export type AppDispatch = typeof store.dispatch;
export { store };
