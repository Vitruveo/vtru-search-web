import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Asset } from '../assets/types';
import { AssetState } from './types';

export const initialState: AssetState = {
    asset: {} as Asset,
    loading: false,
    creatorAvatar: '',
    creatorLoading: false,
    lastAssets: [],
    lastAssetsLoading: false,
    error: null,
};

export const storeSlice = createSlice({
    name: 'store',
    initialState,
    reducers: {
        getAssetRequest: (_state, _action: PayloadAction<{ id: string }>) => {},
        getCreatorRequest: (_state, _action: PayloadAction<{ id: string }>) => {},
        getLastAssetsRequest: (_state, _action: PayloadAction<{ id: string }>) => {},
        startLoading: (state) => {
            state.loading = true;
        },
        finishLoading: (state) => {
            state.loading = false;
        },
        startCreatorLoading: (state) => {
            state.creatorLoading = true;
        },
        finishCreatorLoading: (state) => {
            state.creatorLoading = false;
        },
        startLastAssetsLoading: (state) => {
            state.lastAssetsLoading = true;
        },
        finishLastAssetsLoading: (state) => {
            state.lastAssetsLoading = false;
        },
        setAsset: (state, action: PayloadAction<AssetState['asset']>) => {
            state.asset = action.payload;
        },
        setCreatorAvatar: (state, action: PayloadAction<string>) => {
            state.creatorAvatar = action.payload;
        },
        setLastAssets: (state, action: PayloadAction<AssetState['lastAssets']>) => {
            state.lastAssets = action.payload;
        },
        setError: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
        },
    },
});

export const { actions } = storeSlice;
export default storeSlice.reducer;
