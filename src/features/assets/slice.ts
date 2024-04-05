'use client';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import type { AssetsSliceState, GetAssetsParams, GetCreatorParams } from './types';

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
    creator: {
        username: '',
    },
};

export const assetsSlice = createSlice({
    name: 'assets',
    initialState,
    reducers: {
        loadAssets: (state, action: PayloadAction<GetAssetsParams>) => {},
        startLoading: (state) => {
            state.loading = true;
        },
        loadCreator: (state, action: PayloadAction<GetCreatorParams>) => {},
        finishLoading: (state) => {
            state.loading = false;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
        setData: (state, action: PayloadAction<AssetsSliceState['data']>) => {
            state.data = action.payload;
        },
        setTags: (state, action: PayloadAction<AssetsSliceState['tags']>) => {
            state.tags = action.payload;
        },
        setCreator: (state, action) => {
            state.creator.username = action.payload;
        },
    },
});

export const { actions } = assetsSlice;
export default assetsSlice.reducer;
