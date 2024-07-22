'use client';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import type { AssetsSliceState, GetAssetsParams, GetCreatorParams, LastSoldAsset } from './types';

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
    lastSold: [],
    tags: [],
    creator: {
        username: '',
        avatar: '',
    },
    video: '',
    loadingVideo: false,
    maxPrice: 0, // this is used to mark the max price of the price range slider
};

export const assetsSlice = createSlice({
    name: 'assets',
    initialState,
    reducers: {
        loadAssets: (state, action: PayloadAction<GetAssetsParams | null>) => {},
        loadAssetsLastSold: (state, action: PayloadAction) => {},
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
        setVideo: (state, action: PayloadAction<string>) => {
            state.video = action.payload;
        },
        setData: (state, action: PayloadAction<AssetsSliceState['data']>) => {
            state.data = action.payload;
        },
        setLoadingVideo: (state, action: PayloadAction<boolean>) => {
            state.loadingVideo = action.payload;
        },
        makeVideo: (state, payload) => {},
        setTags: (state, action: PayloadAction<AssetsSliceState['tags']>) => {
            state.tags = action.payload;
        },
        setCreator: (state, action) => {
            state.creator = action.payload;
        },
        setMaxPrice: (state, action: PayloadAction<number>) => {
            state.maxPrice = action.payload;
        },
        setCurrentPage: (state, action: PayloadAction<number>) => {
            state.data.page = action.payload;
        },
        setLastSold: (state, action: PayloadAction<LastSoldAsset[]>) => {
            state.lastSold = action.payload;
        },
    },
});

export const { actions } = assetsSlice;
export default assetsSlice.reducer;
