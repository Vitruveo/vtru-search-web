'use client';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import type { AssetsSliceState, GetAssetsParams, GetCreatorParams, LastSoldAsset, MakeVideoParams } from './types';
import { extractObjects } from '@/utils/extractObjects';

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
    maxPrice: 0, // this is used to mark the max price of the price range slider.
    sort: {
        order: '',
        sold: '',
    },
    groupByCreator: {
        active: true,
        name: '',
    },
    paused: false,
};

export const assetsSlice = createSlice({
    name: 'assets',
    initialState,
    reducers: {
        initialParams: (state, action: PayloadAction<Record<string, string>>) => {
            state.loading = false;
            state.error = null;
            state.data = {
                data: [],
                limit: 0,
                page: 0,
                total: 0,
                totalPage: 0,
            };
            state.lastSold = [];
            state.tags = [];
            state.creator = {
                username: '',
                avatar: '',
            };
            state.video = '';
            state.loadingVideo = false;
            state.maxPrice = 0;
            state.sort = {
                order: '',
                sold: '',
            };
            state.groupByCreator = {
                active: true,
                name: '',
            };
            state.paused = false;

            const payload = extractObjects(initialState);

            Object.entries(action.payload).forEach(([key, value]) => {
                if (typeof payload[key] === 'string') {
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    state[key] = action.payload[key];
                } else if (Array.isArray(payload[key]) || typeof payload[key] === 'number') {
                    const [parent, item] = key.split('_');

                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    state[parent][item] = action.payload[key].split(',');
                }
            });
        },
        loadAssets: (_state, _action: PayloadAction<GetAssetsParams | null>) => {},
        loadAssetsLastSold: (_state, _action: PayloadAction) => {},
        setGridId: (_state, _action: PayloadAction<string>) => {},
        startLoading: (state) => {
            state.loading = true;
        },
        setPaused: (state, action: PayloadAction<boolean>) => {
            state.paused = action.payload;
        },
        setGroupByCreator: (
            state,
            action: PayloadAction<{
                active: boolean;
                name: string;
            }>
        ) => {
            state.groupByCreator = action.payload;
        },
        noGroupByCreator: (state) => {
            state.groupByCreator = {
                active: false,
                name: '',
            };
            state.data.page = 1;
            state.sort.order = 'latest';
            state.sort.sold = 'no';
        },
        resetGroupByCreator: (state) => {
            state.groupByCreator = {
                active: true,
                name: '',
            };
            state.data.page = 1;
            state.sort.order = 'latest';
            state.sort.sold = 'no';
        },
        changeGroupByCreatorName: (state, action: PayloadAction<string>) => {
            state.groupByCreator.name = action.payload;
        },
        loadCreator: (_state, _action: PayloadAction<GetCreatorParams>) => {},
        finishLoading: (state) => {
            state.loading = false;
        },
        initialPage: (state) => {
            state.data.page = 1;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
        setVideoId: (state, action: PayloadAction<string>) => {},
        setVideoUrl: (state, action: PayloadAction<string>) => {
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
        makeVideo: (_state, _payload: PayloadAction<MakeVideoParams>) => {},
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
        setInitialPage: (state) => {
            state.data.page = 1;
        },
        setLastSold: (state, action: PayloadAction<LastSoldAsset[]>) => {
            state.lastSold = action.payload;
        },
    },
});

export const { actions } = assetsSlice;
export default assetsSlice.reducer;
