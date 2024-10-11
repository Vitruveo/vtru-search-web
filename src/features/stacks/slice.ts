'use client';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { StackSliceState } from './types';

export const initialState: StackSliceState = {
    loading: false,
    error: null,
    data: {
        data: [],
        limit: 0,
        page: 0,
        total: 0,
        totalPage: 0,
    },
    sort: 'latest',
};

export const stacksSlice = createSlice({
    name: 'stacks',
    initialState,
    reducers: {
        loadStacks: () => {},
        startLoading: (state) => {
            state.loading = true;
        },
        finishLoading: (state) => {
            state.loading = false;
        },
        setData: (state, action: PayloadAction<StackSliceState['data']>) => {
            state.data = action.payload;
        },
    },
});

export const { actions } = stacksSlice;
export default stacksSlice.reducer;
