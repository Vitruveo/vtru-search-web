'use client';
import { createSlice } from '@reduxjs/toolkit';

import { AssetsSliceState } from './types';

const initialState: AssetsSliceState = {
    loading: false,
    error: null,
    data: {
        data: [],
        limit: 0,
        page: 0,
        total: 0,
        totalPage: 0,
    },
    tags: [],
};

export const assetsSlice = createSlice({
    name: 'assets',
    initialState,
    reducers: {
        loadAssets: (state, action) => {},
        startLoading: (state) => {
            state.loading = true;
        },
        finishLoading: (state) => {
            state.loading = false;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
        setData: (state, action) => {
            state.data = action.payload;
        },
        loadTags: (state) => {},
        setTags: (state, action) => {
            state.tags = action.payload;
        },
    },
});

export const { actions } = assetsSlice;
export default assetsSlice.reducer;
