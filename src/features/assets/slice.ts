'use client';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import type { AssetsSliceState, GetAssetsParams, GetCreatorParams, LastSoldAsset } from './types';

export const initialState: AssetsSliceState = {
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
    sort: {
        order: '',
        sold: '',
    },
};

export const assetsSlice = createSlice({
    name: 'assets',
    initialState,
    reducers: {
        loadAssets: (_state, _action: PayloadAction<GetAssetsParams | null>) => {},
        loadAssetsLastSold: (_state, _action: PayloadAction) => {},
        setGridId: (_state, _action: PayloadAction<string>) => {},
        startLoading: (state) => {
            state.loading = true;
        },
        loadCreator: (_state, _action: PayloadAction<GetCreatorParams>) => {},
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
        setSort: (state, action: PayloadAction<AssetsSliceState['sort']>) => {
            state.sort = action.payload;
        },
        setLoadingVideo: (state, action: PayloadAction<boolean>) => {
            state.loadingVideo = action.payload;
        },
        makeVideo: (_state, _payload) => {},
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
