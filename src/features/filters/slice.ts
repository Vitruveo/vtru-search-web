'use client';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { FilterSliceState } from './types';
import { DeepPartial } from '../common/types';

const initialState: FilterSliceState = {};

export const filterSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        change: (state, action: PayloadAction<DeepPartial<FilterSliceState>>) => {},
    },
});

export const userActionsCreators = filterSlice.actions;
