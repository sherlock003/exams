/**
 * @module ReferralSlice
 * @category RTK Reducers
 *
 */

import { createSlice } from '@reduxjs/toolkit';

import type { RootState } from '@/rtk/reducers';
import type { Referral } from '@/types/referrals';
import type { PayloadAction } from '@reduxjs/toolkit';

type State = {
  list: Referral[];
};

export const KEY = 'Referral';

export const initialState: State = {
  list: [
    {
      id: 1,
      home: 'asd',
      country: 'PH',
      postCode: '1234',
      state: 'NCR',
      street: 'street',
      suburb: 'Suburb',
      email: 'jh@email121.com',
      firstName: 'John',
      lastName: 'Johnson',
      phone: '0453-283-283',
    },

    {
      id: 2,
      home: 'asd',
      country: 'PH',
      postCode: '1234',
      state: 'NCR',
      street: 'street',
      suburb: 'Suburb',
      email: 'mat197501@gmail.com',
      firstName: 'Matthew',
      lastName: 'Lombard',
      phone: '0453-283-283',
    },

    {
      id: 3,
      home: 'asd',
      country: 'PH',
      postCode: '1234',
      state: 'NCR',
      street: 'street',
      suburb: 'Suburb',
      email: 'joe@dickson.com',
      firstName: 'Joe',
      lastName: 'Dickson',
      phone: '0453-283-283',
    },

    {
      id: 4,
      home: 'asd',
      country: 'PH',
      postCode: '1234',
      state: 'NCR',
      street: 'street',
      suburb: 'Suburb',
      email: 'scarlet@johnson.com',
      firstName: 'Scarlet',
      lastName: 'Johnson',
      phone: '0453-283-283',
    },

    {
      id: 5,
      home: 'asd',
      country: 'PH',
      postCode: '1234',
      state: 'NCR',
      street: 'street',
      suburb: 'Suburb',
      email: 'peter101@yahoo.com',
      firstName: 'Peter',
      lastName: 'Rhonda',
      phone: '0453-283-283',
    },
  ],
};

const slice = createSlice({
  name: KEY,
  initialState,
  reducers: {
    updateReferral: (state: State, action: PayloadAction<Referral>) => ({
      ...state,
      list: state.list.map((referral) => {
        return referral.id == action.payload.id ? action.payload : referral;
      }),
    }),
    addReferral: (state: State, action: PayloadAction<Referral>) => ({
      ...state,
      list: [...state.list, action.payload],
    }),
    deleteReferral: (state: State, action: PayloadAction<number>) => ({
      ...state,
      list: state.list.filter((item) => item.id !== action.payload),
    }),
  },
});

export const { updateReferral, addReferral, deleteReferral } = slice.actions;
export const selectReferralState = (state: RootState) => state[KEY];
export const { reducer } = slice;
export default slice.reducer;
