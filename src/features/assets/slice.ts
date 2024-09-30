'use client';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import type {
    AssetsSliceState,
    GenerateSlideshowParams,
    GetAssetsParams,
    GetCreatorParams,
    LastSoldAsset,
    MakeVideoParams,
    SpotlightAsset,
} from './types';

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
    spotlight: [],
    lastSold: [],
    tags: [],
    creator: {
        username: '',
        avatar: '',
    },
    slideshow: '',
    video: '',
    loadingVideo: false,
    maxPrice: 0, // this is used to mark the max price of the price range slider.
    sort: {
        order: '',
        sold: '',
    },
    groupByCreator: {
        active: 'no',
        name: '',
    },
    paused: false,
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
        setPaused: (state, action: PayloadAction<boolean>) => {
            state.paused = action.payload;
        },
        setGroupByCreator: (
            state,
            action: PayloadAction<{
                active: string;
                name: string;
            }>
        ) => {
            state.groupByCreator = action.payload;
        },
        noGroupByCreator: (state) => {
            state.groupByCreator = {
                active: 'no',
                name: '',
            };
            state.data.page = 1;
            state.sort.order = 'latest';
            state.sort.sold = 'no';
        },
        resetGroupByCreator: (state) => {
            state.groupByCreator = {
                active: 'no',
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
        setSlideshowId: (state, action: PayloadAction<string>) => {},
        setTabNavigation: (state, action: PayloadAction<string>) => {},
        setVideoUrl: (state, action: PayloadAction<string>) => {
            state.video = action.payload;
        },
        setData: (state, action: PayloadAction<AssetsSliceState['data']>) => {
            state.data = action.payload;
        },
        setLimit: (state, action: PayloadAction<number>) => {
            state.data.limit = action.payload;
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
        setSpotlight: (state, action: PayloadAction<SpotlightAsset[]>) => {
            state.spotlight = action.payload;
        },
        setLastSold: (state, action: PayloadAction<LastSoldAsset[]>) => {
            state.lastSold = action.payload;
        },
        startNormal: (state) => {
            state.groupByCreator.active = 'no';
            state.groupByCreator.name = '';
        },
        startGrouped: (state, action: PayloadAction<string>) => {
            state.groupByCreator.active = action.payload;
            state.groupByCreator.name = '';
        },
        initialSort: (state, action: PayloadAction<AssetsSliceState['sort']>) => {
            state.sort = action.payload;
        },
        generateSlideshow: (state, action: PayloadAction<GenerateSlideshowParams>) => {},
        setSlideshow: (state, action: PayloadAction<string>) => {
            state.slideshow = action.payload;
        },
    },
});

export const { actions } = assetsSlice;
export default assetsSlice.reducer;
