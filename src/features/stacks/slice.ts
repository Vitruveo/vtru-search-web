'use client';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { StackSliceState } from './types';

export const initialState: StackSliceState = {
    loading: false,
    error: null,
    data: {
        data: [],
        limit: 25,
        page: 1,
        total: 0,
        totalPage: 0,
    },
    spotlight: [],
    sort: 'latest',
};

export const stacksSlice = createSlice({
    name: 'stacks',
    initialState,
    reducers: {
        loadStacks: () => {},
        loadStacksSpotlight: () => {},
        startLoading: (state) => {
            state.loading = true;
        },
        finishLoading: (state) => {
            state.loading = false;
        },
        setData: (state, action: PayloadAction<StackSliceState['data']>) => {
            state.data = action.payload;
        },
        setPage: (state, action: PayloadAction<number>) => {
            state.data.page = action.payload;
        },
        setLimit: (state, action: PayloadAction<number>) => {
            state.data.limit = action.payload;
        },
        setSort: (state, action: PayloadAction<string>) => {
            state.sort = action.payload;
        },
        setSpotlight: (state, action: PayloadAction<StackSliceState['spotlight']>) => {
            state.spotlight = action.payload;
        },
    },
});

export const { actions } = stacksSlice;
export default stacksSlice.reducer;
